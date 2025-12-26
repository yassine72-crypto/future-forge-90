import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, MapPin, Clock, Loader2, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const Events = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("light", !isDark);
  };

  const { data: events, isLoading } = useQuery({
    queryKey: ["all-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const upcomingEvents = events?.filter(e => e.is_upcoming) || [];
  const pastEvents = events?.filter(e => !e.is_upcoming) || [];

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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
                <Calendar className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-secondary">Activités & Événements</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-foreground">
                Nos Événements
              </h1>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Restez informé des événements, journées portes ouvertes et activités de notre établissement
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-16">
              {/* Upcoming Events */}
              {upcomingEvents.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                      Événements à venir
                    </h2>
                    <Badge className="bg-accent text-accent-foreground ml-2">{upcomingEvents.length}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingEvents.map((event, index) => (
                      <div
                        key={event.id}
                        className="group bg-card/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/40 hover:border-accent/50 transition-all duration-300 animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {event.image_url ? (
                          <div className="relative h-56 overflow-hidden">
                            <img 
                              src={event.image_url} 
                              alt={event.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                              À venir
                            </Badge>
                          </div>
                        ) : (
                          <div className="h-40 bg-gradient-to-br from-accent/10 to-secondary/10 flex items-center justify-center relative">
                            <Calendar className="w-16 h-16 text-accent/30" />
                            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                              À venir
                            </Badge>
                          </div>
                        )}

                        <div className="p-6">
                          <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                            {event.title}
                          </h3>

                          <p className="text-foreground/60 mb-5 line-clamp-3">
                            {event.description}
                          </p>

                          <div className="flex flex-wrap gap-3 text-sm">
                            <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-full">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span className="text-foreground/70">{format(new Date(event.event_date), "d MMMM yyyy", { locale: fr })}</span>
                            </div>
                            {event.event_time && (
                              <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-full">
                                <Clock className="w-4 h-4 text-primary" />
                                <span className="text-foreground/70">{event.event_time}</span>
                              </div>
                            )}
                            {event.location && (
                              <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-full">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span className="text-foreground/70">{event.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                      Événements passés
                    </h2>
                    <Badge variant="secondary" className="ml-2">{pastEvents.length}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastEvents.map((event, index) => (
                      <div
                        key={event.id}
                        className="group bg-card/30 backdrop-blur-sm rounded-xl overflow-hidden border border-border/30 hover:border-primary/30 transition-all duration-300 animate-fade-in opacity-80 hover:opacity-100"
                        style={{ animationDelay: `${index * 80}ms` }}
                      >
                        {event.image_url && (
                          <div className="h-40 overflow-hidden">
                            <img 
                              src={event.image_url} 
                              alt={event.title}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                          </div>
                        )}

                        <div className="p-5">
                          <h3 className="text-lg font-display font-bold text-foreground mb-2">
                            {event.title}
                          </h3>

                          <p className="text-foreground/50 text-sm mb-3 line-clamp-2">
                            {event.description}
                          </p>

                          <div className="flex items-center gap-2 text-xs text-foreground/40">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{format(new Date(event.event_date), "d MMM yyyy", { locale: fr })}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {events?.length === 0 && (
                <div className="text-center py-20 bg-card/30 backdrop-blur-sm rounded-2xl border border-border/30">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
                  <p className="text-foreground/60">Aucun événement programmé pour le moment.</p>
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

export default Events;