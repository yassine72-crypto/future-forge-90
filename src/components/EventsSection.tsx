import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, MapPin, Clock, Loader2, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

const EventsSection = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true })
        .limit(4);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="events" className="relative py-24 px-4">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
            <Calendar className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Activités & Événements</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Nos Événements
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Restez informé des événements, journées portes ouvertes et activités de notre établissement
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : events && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {events.map((event, index) => (
              <div
                key={event.id}
                className="group relative bg-card/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/40 hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Event Image */}
                {event.image_url ? (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={event.image_url} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    {event.is_upcoming && (
                      <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                        À venir
                      </Badge>
                    )}
                  </div>
                ) : (
                  <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-primary/30" />
                    {event.is_upcoming && (
                      <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                        À venir
                      </Badge>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-foreground/60 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-3 text-xs text-foreground/50">
                    <div className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1.5 rounded-full">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{format(new Date(event.event_date), "d MMM yyyy", { locale: fr })}</span>
                    </div>
                    {event.event_time && (
                      <div className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1.5 rounded-full">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span>{event.event_time}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1.5 rounded-full">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card/30 backdrop-blur-sm rounded-2xl border border-border/30 max-w-2xl mx-auto">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
            <p className="text-foreground/60">Aucun événement programmé pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;