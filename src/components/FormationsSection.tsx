import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, Award, Loader2, BookOpen, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FormationsSection = () => {
  const { data: formations, isLoading } = useQuery({
    queryKey: ["formations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("formations")
        .select("*")
        .eq("is_available", true)
        .order("created_at", { ascending: false });
      
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

  return (
    <section id="formations" className="relative py-24 px-4">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Programmes de Formation</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Nos Formations
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Des programmes d'excellence pour préparer votre avenir professionnel au Maroc
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : formations && formations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {formations.map((formation, index) => {
              const IconComponent = getIcon(formation.title, formation.type);
              return (
                <div
                  key={formation.id}
                  className="group relative bg-card/40 backdrop-blur-sm rounded-2xl p-6 border border-border/40 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 animate-fade-in overflow-hidden"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    {/* Icon and Badge */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <Badge 
                        variant={formation.type === 'diplomante' ? 'default' : 'secondary'}
                        className="text-xs font-medium"
                      >
                        {formation.type === 'diplomante' ? 'Diplômante' : 'Qualifiante'}
                      </Badge>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-display font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {formation.title}
                    </h3>
                    
                    <p className="text-sm text-foreground/60 leading-relaxed line-clamp-3">
                      {formation.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-card/30 backdrop-blur-sm rounded-2xl border border-border/30">
            <GraduationCap className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
            <p className="text-foreground/60">Aucune formation disponible pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FormationsSection;