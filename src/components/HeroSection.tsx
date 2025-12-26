import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroSchool1 from "@/assets/hero-school-1.jpg";
import heroSchool2 from "@/assets/hero-school-2.jpg";
import heroSchool3 from "@/assets/hero-school-3.jpg";

const heroImages = [heroSchool1, heroSchool2, heroSchool3];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Slideshow Background */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`ISTA Roches Noires ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 z-[1]" />

      {/* Animated Accent Lines */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-pulse" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container relative z-10 pt-20 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Floating Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">OFPPT - Formation Professionnelle</span>
          </div>

          {/* Main Content Card */}
          <div className="relative glass-card-strong rounded-3xl p-8 md:p-12 lg:p-16 animate-fade-in backdrop-blur-xl border border-white/10">
            {/* Top accent line */}
            <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/50 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-accent/50 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-accent/50 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/50 rounded-br-lg" />

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black mb-6 leading-tight">
              <span className="gradient-text">ISTA</span>
              <br />
              <span className="text-foreground">Roches Noires</span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              L'excellence en formation professionnelle. Préparez votre avenir avec des 
              <span className="text-primary font-semibold"> formations qualifiantes</span> et 
              <span className="text-accent font-semibold"> diplômantes</span> de haute qualité.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                className="btn-gradient rounded-full px-8 py-6 text-lg font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105"
                onClick={() => scrollToSection("formations")}
              >
                Découvrir nos formations
              </Button>
              <Button 
                variant="outline"
                className="rounded-full px-8 py-6 text-lg font-bold border-2 border-border/50 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all hover:scale-105"
                onClick={() => scrollToSection("events")}
              >
                Nos événements
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-border/30">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black gradient-text">15+</div>
                <div className="text-sm text-muted-foreground">Formations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black gradient-text">500+</div>
                <div className="text-sm text-muted-foreground">Stagiaires</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black gradient-text">95%</div>
                <div className="text-sm text-muted-foreground">Réussite</div>
              </div>
            </div>
          </div>

          {/* Image Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? "bg-primary w-8" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection("formations")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary animate-bounce cursor-pointer z-10 glass-card p-3 rounded-full"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </header>
  );
};

export default HeroSection;
