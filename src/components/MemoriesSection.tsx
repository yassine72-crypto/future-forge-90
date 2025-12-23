import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ImageIcon, Loader2, X } from "lucide-react";
import { useState } from "react";

const MemoriesSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: memories, isLoading } = useQuery({
    queryKey: ["memories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("memories")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="memories" className="relative py-24 px-4">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-black mb-4">
            <span className="gradient-text">Galerie</span> & Souvenirs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Les meilleurs moments capturés lors de nos événements et formations
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : memories && memories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.map((memory, index) => (
              <div
                key={memory.id}
                className="group relative rounded-2xl overflow-hidden cursor-pointer glass-card hover:border-secondary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedImage(memory.image_url)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={memory.image_url}
                    alt={memory.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {memory.title}
                    </h3>
                    {memory.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {memory.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass-card rounded-2xl">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">Aucune photo disponible pour le moment.</p>
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
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-background font-bold hover:scale-110 transition-transform"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedImage}
            alt="Memory"
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl border-4 border-secondary/50"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default MemoriesSection;
