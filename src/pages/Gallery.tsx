import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ImageIcon, Loader2, X, Camera, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Gallery = () => {
  const [isDark, setIsDark] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; event?: string } | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("light", !isDark);
  };

  const { data: memories, isLoading } = useQuery({
    queryKey: ["all-memories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("memories")
        .select("*, events(id, title)")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: events } = useQuery({
    queryKey: ["events-filter"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("id, title")
        .order("event_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filteredMemories = filter === "all" 
    ? memories 
    : filter === "no-event"
    ? memories?.filter(m => !m.event_id)
    : memories?.filter(m => m.event_id === filter);

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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <Camera className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Photos & Souvenirs</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-foreground">
                Galerie
              </h1>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Les meilleurs moments capturés lors de nos événements et formations
              </p>
            </div>
          </div>

          {/* Filter */}
          {events && events.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
                className="rounded-full"
              >
                Toutes les photos
              </Button>
              {events.map((event) => (
                <Button
                  key={event.id}
                  variant={filter === event.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(event.id)}
                  className="rounded-full"
                >
                  {event.title}
                </Button>
              ))}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : filteredMemories && filteredMemories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMemories.map((memory, index) => (
                <div
                  key={memory.id}
                  className="group relative rounded-xl overflow-hidden cursor-pointer bg-card/30 border border-border/30 hover:border-primary/50 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 40}ms` }}
                  onClick={() => setSelectedImage({ 
                    url: memory.image_url, 
                    title: memory.title,
                    event: memory.events?.title 
                  })}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={memory.image_url}
                      alt={memory.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-sm font-semibold text-foreground line-clamp-1">
                      {memory.title}
                    </h3>
                    {memory.events?.title && (
                      <p className="text-xs text-primary mt-1">
                        {memory.events.title}
                      </p>
                    )}
                  </div>

                  {/* Hover icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ImageIcon className="w-4 h-4 text-foreground" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card/30 backdrop-blur-sm rounded-2xl border border-border/30">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
              <p className="text-foreground/60">
                {filter !== "all" ? "Aucune photo pour cet événement." : "Aucune photo disponible pour le moment."}
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full max-h-[75vh] object-contain rounded-2xl"
            />
            <div className="text-center mt-4">
              <p className="text-lg font-medium text-foreground">{selectedImage.title}</p>
              {selectedImage.event && (
                <p className="text-sm text-primary mt-1">{selectedImage.event}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;