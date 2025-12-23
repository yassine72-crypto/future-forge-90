import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Trash2, Loader2, Edit2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const FormationsAdmin = () => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"qualifiante" | "diplomante">("qualifiante");
  const [isAvailable, setIsAvailable] = useState(true);
  const queryClient = useQueryClient();

  const { data: formations, isLoading } = useQuery({
    queryKey: ["admin-formations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("formations").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      if (editingId) {
        const { error } = await supabase.from("formations").update({ title, description, type, is_available: isAvailable }).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("formations").insert({ title, description, type, is_available: isAvailable });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-formations"] });
      queryClient.invalidateQueries({ queryKey: ["formations"] });
      toast.success(editingId ? "Formation modifiée!" : "Formation ajoutée!");
      resetForm();
    },
    onError: (error) => toast.error("Erreur: " + error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("formations").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-formations"] });
      queryClient.invalidateQueries({ queryKey: ["formations"] });
      toast.success("Formation supprimée!");
    },
    onError: (error) => toast.error("Erreur: " + error.message),
  });

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setType("qualifiante");
    setIsAvailable(true);
    setEditingId(null);
    setOpen(false);
  };

  const handleEdit = (formation: any) => {
    setEditingId(formation.id);
    setTitle(formation.title);
    setDescription(formation.description);
    setType(formation.type);
    setIsAvailable(formation.is_available);
    setOpen(true);
  };

  return (
    <div className="glass-card-strong rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Gérer les Formations</h2>
        <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); setOpen(v); }}>
          <DialogTrigger asChild>
            <Button className="btn-gradient gap-2"><Plus className="w-4 h-4" />Ajouter</Button>
          </DialogTrigger>
          <DialogContent className="glass-card-strong border-border">
            <DialogHeader>
              <DialogTitle>{editingId ? "Modifier" : "Nouvelle"} Formation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              <Select value={type} onValueChange={(v) => setType(v as any)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="qualifiante">Qualifiante</SelectItem>
                  <SelectItem value="diplomante">Diplômante</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
                <span className="text-sm">Disponible</span>
              </div>
              <Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending || !title || !description} className="w-full btn-gradient">
                {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enregistrer"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-3">
          {formations?.map((f) => (
            <div key={f.id} className="flex items-center justify-between p-4 glass-card rounded-xl">
              <div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.type} • {f.is_available ? "Actif" : "Inactif"}</p>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => handleEdit(f)}><Edit2 className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteMutation.mutate(f.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormationsAdmin;
