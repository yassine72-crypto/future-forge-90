import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, Award, Loader2, BookOpen, Briefcase, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const Formations = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("light", !isDark);
  };

  const { data: formations, isLoading } = useQuery({
    queryKey: ["formations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("formations")
        .select("*")
        .eq("is_available", true)
        .order("type", { ascending: true })
        .order("title", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const getIcon = (title: string, type: string) => {
    if (title.toLowerCase().includes('digital') || title.toLowerCase().includes('développement')) return BookOpen;
    if (title.toLowerCase().includes('gestion') || title.toLowerCase().includes('commerce')) return Briefcase;
    if (type === 'diplomante') return Award;
    return GraduationCap;
  };

  const diplomantes = formations?.filter(f => f.type === 'diplomante') || [];
  const qualifiantes = formations?.filter(f => f.type === 'qualifiante') || [];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="container px-4">
          {/* Header */}
          <div className="mb-12">
            <Link to="/">
              <Button variant="ghost" className="mb-6 gap-2 text-foreground/70 hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                Retour à l'accueil
              </Button>
            </Link>
            
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">OFPPT - Formation Professionnelle</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-foreground">
                Nos Formations
              </h1>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Découvrez toutes nos formations diplômantes et qualifiantes pour préparer votre avenir professionnel
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-16">
              {/* Formations Diplômantes */}
              {diplomantes.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <Award className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                      Formations Diplômantes
                    </h2>
                    <Badge className="ml-2">{diplomantes.length}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {diplomantes.map((formation, index) => {
                      const IconComponent = getIcon(formation.title, formation.type);
                      return (
                        <div
                          key={formation.id}
                          className="group relative bg-card/40 backdrop-blur-sm rounded-2xl p-6 border border-border/40 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                          style={{ animationDelay: `${index * 80}ms` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                          
                          <div className="relative">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                              <IconComponent className="w-7 h-7 text-primary" />
                            </div>

                            <h3 className="text-xl font-display font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                              {formation.title}
                            </h3>
                            
                            <p className="text-foreground/60 leading-relaxed">
                              {formation.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Formations Qualifiantes */}
              {qualifiantes.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <GraduationCap className="w-6 h-6 text-secondary" />
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                      Formations Qualifiantes
                    </h2>
                    <Badge variant="secondary" className="ml-2">{qualifiantes.length}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {qualifiantes.map((formation, index) => {
                      const IconComponent = getIcon(formation.title, formation.type);
                      return (
                        <div
                          key={formation.id}
                          className="group relative bg-card/40 backdrop-blur-sm rounded-2xl p-6 border border-border/40 hover:border-secondary/50 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                          style={{ animationDelay: `${index * 80}ms` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                          
                          <div className="relative">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                              <IconComponent className="w-7 h-7 text-secondary" />
                            </div>

                            <h3 className="text-xl font-display font-bold mb-3 text-foreground group-hover:text-secondary transition-colors">
                              {formation.title}
                            </h3>
                            
                            <p className="text-foreground/60 leading-relaxed">
                              {formation.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {formations?.length === 0 && (
                <div className="text-center py-20 bg-card/30 backdrop-blur-sm rounded-2xl border border-border/30">
                  <GraduationCap className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
                  <p className="text-foreground/60">Aucune formation disponible pour le moment.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Formations;