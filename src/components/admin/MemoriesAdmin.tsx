import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const MemoriesAdmin = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  const { data: memories, isLoading } = useQuery({
    queryKey: ["admin-memories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("memories").select("*").order("created_at", { ascending: false });
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
    if (error) { toast.error("Erreur upload"); setUploading(false); return; }
    const { data } = supabase.storage.from("images").getPublicUrl(`memories/${fileName}`);
    setImageUrl(data.publicUrl);
    setUploading(false);
    toast.success("Image uploadée!");
  };

  const createMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("memories").insert({ title, description: description || null, image_url: imageUrl });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-memories"] });
      queryClient.invalidateQueries({ queryKey: ["memories"] });
      toast.success("Photo ajoutée!");
      setTitle(""); setDescription(""); setImageUrl(""); setOpen(false);
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

  return (
    <div className="glass-card-strong rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Galerie & Souvenirs</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="btn-gradient gap-2"><Plus className="w-4 h-4" />Ajouter</Button></DialogTrigger>
          <DialogContent className="glass-card-strong border-border">
            <DialogHeader><DialogTitle>Nouvelle Photo</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Textarea placeholder="Description (optionnel)" value={description} onChange={(e) => setDescription(e.target.value)} />
              <div className="space-y-2">
                <label className="text-sm font-medium">Image *</label>
                <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                {uploading && <Loader2 className="w-5 h-5 animate-spin" />}
                {imageUrl && <img src={imageUrl} alt="" className="h-32 rounded-lg object-cover" />}
              </div>
              <Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending || !title || !imageUrl} className="w-full btn-gradient">
                {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enregistrer"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {memories?.map((m) => (
            <div key={m.id} className="relative group rounded-xl overflow-hidden">
              <img src={m.image_url} alt={m.title} className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteMutation.mutate(m.id)}><Trash2 className="w-5 h-5" /></Button>
              </div>
              <p className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-background text-xs font-medium truncate">{m.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoriesAdmin;
