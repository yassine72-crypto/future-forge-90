import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
      {/* Hero Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Glowing orb effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl animate-glow"
            style={{ background: 'linear-gradient(135deg, hsl(185 100% 50%), hsl(330 100% 50%))' }}
          />

          {/* Content Card */}
          <div className="relative glass-card-strong rounded-3xl p-8 md:p-12 lg:p-16 animate-fade-in">
            <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-6 leading-tight">
              <span className="gradient-text">Excellence</span> en Formation
              <br />
              <span className="text-foreground">Professionnelle</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              ISTA Roches Noires prépare les futurs talents du Maroc avec des formations 
              qualifiantes et diplômantes de haute qualité.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                className="btn-gradient rounded-full px-8 py-6 text-lg font-bold"
                onClick={() => scrollToSection("formations")}
              >
                Découvrir nos formations
              </Button>
              <Button 
                variant="outline"
                className="rounded-full px-8 py-6 text-lg font-bold border-border/50 hover:border-primary hover:text-primary transition-all"
                onClick={() => scrollToSection("events")}
              >
                Nos événements
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection("formations")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary animate-bounce cursor-pointer z-10"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </header>
  );
};

export default HeroSection;
