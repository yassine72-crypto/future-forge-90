import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const MemoriesAdmin = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [eventId, setEventId] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  const { data: memories, isLoading } = useQuery({
    queryKey: ["admin-memories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("memories")
        .select("*, events(title)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: events } = useQuery({
    queryKey: ["events-for-memories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("id, title")
        .order("event_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("images").upload(`memories/${fileName}`, file);
    if (error) { 
      toast.error("Erreur lors de l'upload"); 
      setUploading(false); 
      return; 
    }
    const { data } = supabase.storage.from("images").getPublicUrl(`memories/${fileName}`);
    setImageUrl(data.publicUrl);
    setUploading(false);
    toast.success("Image uploadée avec succès!");
  };

  const createMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("memories").insert({ 
        title, 
        description: description || null, 
        image_url: imageUrl,
        event_id: eventId || null
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-memories"] });
      queryClient.invalidateQueries({ queryKey: ["memories"] });
      toast.success("Photo ajoutée à la galerie!");
      resetForm();
    },
    onError: (error) => toast.error("Erreur: " + error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("memories").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-memories"] });
      queryClient.invalidateQueries({ queryKey: ["memories"] });
      toast.success("Photo supprimée!");
    },
  });

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImageUrl("");
    setEventId("");
    setOpen(false);
  };

  return (
    <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-6 border border-border/40">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Galerie & Souvenirs</h2>
          <p className="text-sm text-foreground/60">Gérez les photos de vos événements</p>
        </div>
        <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); setOpen(v); }}>
          <DialogTrigger asChild>
            <Button className="btn-gradient gap-2">
              <Plus className="w-4 h-4" />
              Ajouter une photo
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>Nouvelle Photo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Titre *</label>
                <Input 
                  placeholder="Ex: Journée portes ouvertes 2024" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Événement associé</label>
                <Select value={eventId} onValueChange={setEventId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un événement (optionnel)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Aucun événement</SelectItem>
                    {events?.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                <Textarea 
                  placeholder="Description de la photo (optionnel)" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Image *</label>
                <Input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  disabled={uploading}
                  className="cursor-pointer"
                />
                {uploading && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-foreground/60">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Upload en cours...
                  </div>
                )}
                {imageUrl && (
                  <img src={imageUrl} alt="Preview" className="mt-3 h-32 w-full object-cover rounded-lg" />
                )}
              </div>

              <Button 
                onClick={() => createMutation.mutate()} 
                disabled={createMutation.isPending || !title || !imageUrl} 
                className="w-full btn-gradient"
              >
                {createMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Enregistrer"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : memories && memories.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {memories.map((m) => (
            <div key={m.id} className="relative group rounded-xl overflow-hidden border border-border/40 bg-muted/20">
              <img src={m.image_url} alt={m.title} className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center">
                <p className="text-sm font-medium text-foreground mb-1 line-clamp-2">{m.title}</p>
                {m.events?.title && (
                  <p className="text-xs text-primary mb-3">{m.events.title}</p>
                )}
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => deleteMutation.mutate(m.id)}
                  className="gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Supprimer
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-foreground/60">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Aucune photo dans la galerie</p>
        </div>
      )}
    </div>
  );
};

export default MemoriesAdmin;