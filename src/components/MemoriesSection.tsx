import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ImageIcon, Loader2, X, Camera } from "lucide-react";
import { useState } from "react";

const MemoriesSection = () => {
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  const { data: memories, isLoading } = useQuery({
    queryKey: ["memories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("memories")
        .select("*, events(title)")
        .order("created_at", { ascending: false })
        .limit(8);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="memories" className="relative py-24 px-4">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Camera className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Photos & Souvenirs</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Galerie
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Les meilleurs moments capturés lors de nos événements et formations
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : memories && memories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {memories.map((memory, index) => (
              <div
                key={memory.id}
                className="group relative rounded-xl overflow-hidden cursor-pointer bg-card/30 border border-border/30 hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 60}ms` }}
                onClick={() => setSelectedImage({ url: memory.image_url, title: memory.title })}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={memory.image_url}
                    alt={memory.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
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
          <div className="text-center py-16 bg-card/30 backdrop-blur-sm rounded-2xl border border-border/30">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
            <p className="text-foreground/60">Aucune photo disponible pour le moment.</p>
          </div>
        )}
      </div>

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
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
            <p className="text-center mt-4 text-lg font-medium text-foreground">{selectedImage.title}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default MemoriesSection;