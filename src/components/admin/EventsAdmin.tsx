import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Trash2, Loader2, Edit2, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const EventsAdmin = () => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUpcoming, setIsUpcoming] = useState(true);
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  const { data: events, isLoading } = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*").order("event_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("images").upload(`events/${fileName}`, file);
    if (error) { toast.error("Erreur upload"); setUploading(false); return; }
    const { data } = supabase.storage.from("images").getPublicUrl(`events/${fileName}`);
    setImageUrl(data.publicUrl);
    setUploading(false);
    toast.success("Image uploadée!");
  };

  const createMutation = useMutation({
    mutationFn: async () => {
      const payload = { title, description, event_date: eventDate, event_time: eventTime || null, location: location || null, image_url: imageUrl || null, is_upcoming: isUpcoming };
      if (editingId) {
        const { error } = await supabase.from("events").update(payload).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("events").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success(editingId ? "Événement modifié!" : "Événement ajouté!");
      resetForm();
    },
    onError: (error) => toast.error("Erreur: " + error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Événement supprimé!");
    },
  });

  const resetForm = () => {
    setTitle(""); setDescription(""); setEventDate(""); setEventTime(""); setLocation(""); setImageUrl(""); setIsUpcoming(true); setEditingId(null); setOpen(false);
  };

  const handleEdit = (e: any) => {
    setEditingId(e.id); setTitle(e.title); setDescription(e.description); setEventDate(e.event_date); setEventTime(e.event_time || ""); setLocation(e.location || ""); setImageUrl(e.image_url || ""); setIsUpcoming(e.is_upcoming); setOpen(true);
  };

  return (
    <div className="glass-card-strong rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Gérer les Événements</h2>
        <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); setOpen(v); }}>
          <DialogTrigger asChild><Button className="btn-gradient gap-2"><Plus className="w-4 h-4" />Ajouter</Button></DialogTrigger>
          <DialogContent className="glass-card-strong border-border max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editingId ? "Modifier" : "Nouvel"} Événement</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                <Input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
              </div>
              <Input placeholder="Lieu" value={location} onChange={(e) => setLocation(e.target.value)} />
              <div className="space-y-2">
                <label className="text-sm font-medium">Image</label>
                <div className="flex gap-2">
                  <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="flex-1" />
                  {uploading && <Loader2 className="w-5 h-5 animate-spin" />}
                </div>
                {imageUrl && <img src={imageUrl} alt="" className="h-20 rounded-lg object-cover" />}
              </div>
              <div className="flex items-center gap-2"><Switch checked={isUpcoming} onCheckedChange={setIsUpcoming} /><span className="text-sm">À venir</span></div>
              <Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending || !title || !description || !eventDate} className="w-full btn-gradient">
                {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enregistrer"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div> : (
        <div className="space-y-3">
          {events?.map((e) => (
            <div key={e.id} className="flex items-center justify-between p-4 glass-card rounded-xl">
              <div className="flex items-center gap-4">
                {e.image_url && <img src={e.image_url} alt="" className="w-12 h-12 rounded-lg object-cover" />}
                <div><h3 className="font-semibold">{e.title}</h3><p className="text-sm text-muted-foreground">{e.event_date} • {e.location}</p></div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => handleEdit(e)}><Edit2 className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteMutation.mutate(e.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsAdmin;
