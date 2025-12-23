import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, MapPin, Clock, Loader2, Flame } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";

const EventsSection = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="events" className="relative py-24 px-4">
      <div className="container max-w-4xl">
        <div className="glass-card-strong rounded-3xl p-8 md:p-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-black text-center mb-12 gradient-text">
            Événements
          </h2>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : events && events.length > 0 ? (
            <div className="space-y-6">
              {events.map((event, index) => (
                <Link
                  key={event.id}
                  to={`/event/${event.id}`}
                  className="block group"
                >
                  <div 
                    className="glass-card rounded-2xl p-6 md:p-8 hover:border-secondary/50 hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Event Image */}
                      {event.image_url && (
                        <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                          <img 
                            src={event.image_url} 
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      )}

                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-secondary font-bold text-sm mb-2 uppercase tracking-wider">
                          {event.is_upcoming && (
                            <>
                              <Flame className="w-4 h-4" />
                              <span>Événement à venir</span>
                            </>
                          )}
                        </div>

                        <h3 className="text-2xl md:text-3xl font-display font-black gradient-text mb-3">
                          {event.title}
                        </h3>

                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {event.description}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>
                              {format(new Date(event.event_date), "d MMMM yyyy", { locale: fr })}
                            </span>
                          </div>
                          {event.event_time && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-primary" />
                              <span>{event.event_time}</span>
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground">Aucun événement programmé pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
