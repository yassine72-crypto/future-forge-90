import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, GraduationCap, Calendar, Image, Loader2 } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import FormationsAdmin from "@/components/admin/FormationsAdmin";
import EventsAdmin from "@/components/admin/EventsAdmin";
import MemoriesAdmin from "@/components/admin/MemoriesAdmin";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold gradient-text">
                Tableau de Bord
              </h1>
              <p className="text-muted-foreground mt-1">
                {isAdmin ? "Administrateur" : "Utilisateur"} - {user.email}
              </p>
            </div>
            <Button variant="outline" onClick={signOut} className="gap-2">
              <LogOut className="w-4 h-4" />
              Déconnexion
            </Button>
          </div>

          {isAdmin ? (
            <Tabs defaultValue="formations" className="space-y-6">
              <TabsList className="glass-card-strong p-1 rounded-xl">
                <TabsTrigger value="formations" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                  <GraduationCap className="w-4 h-4" />
                  Formations
                </TabsTrigger>
                <TabsTrigger value="events" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                  <Calendar className="w-4 h-4" />
                  Événements
                </TabsTrigger>
                <TabsTrigger value="memories" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                  <Image className="w-4 h-4" />
                  Galerie
                </TabsTrigger>
              </TabsList>

              <TabsContent value="formations">
                <FormationsAdmin />
              </TabsContent>
              <TabsContent value="events">
                <EventsAdmin />
              </TabsContent>
              <TabsContent value="memories">
                <MemoriesAdmin />
              </TabsContent>
            </Tabs>
          ) : (
            <div className="glass-card-strong rounded-2xl p-8 text-center">
              <p className="text-muted-foreground">
                Vous n'avez pas les droits d'administrateur. Contactez un administrateur pour obtenir l'accès.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
