import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, Award, Loader2 } from "lucide-react";
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

  return (
    <section id="formations" className="relative py-24 px-4">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-black mb-4">
            Nos <span className="gradient-text">Formations</span> & Programmes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des programmes d'excellence pour préparer votre avenir professionnel
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : formations && formations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formations.map((formation, index) => (
              <div
                key={formation.id}
                className="group glass-card rounded-2xl p-8 hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
                    style={{ background: 'linear-gradient(135deg, hsl(185 100% 50% / 0.2), hsl(330 100% 50% / 0.2))' }}
                  />
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {formation.type === 'diplomante' ? (
                        <Award className="w-7 h-7 text-primary" />
                      ) : (
                        <GraduationCap className="w-7 h-7 text-secondary" />
                      )}
                    </div>
                    <Badge 
                      variant={formation.type === 'diplomante' ? 'default' : 'secondary'}
                      className="font-semibold"
                    >
                      {formation.type === 'diplomante' ? 'Diplômante' : 'Qualifiante'}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-display font-bold mb-4 gradient-text">
                    {formation.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {formation.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass-card rounded-2xl">
            <GraduationCap className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">Aucune formation disponible pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FormationsSection;
