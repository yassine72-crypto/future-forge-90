import { useState, useEffect } from "react";
import { ChevronDown, GraduationCap, Users, Award } from "lucide-react";
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
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-screen Slideshow Background */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[2000ms] ease-out ${
            index === currentImageIndex 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-105"
          }`}
        >
          <img
            src={image}
            alt={`ISTA Roches Noires ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Gradient Overlay - Professional dark overlay to make text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 z-[1]" />
      
      {/* Subtle color accent overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 z-[1]" />

      <div className="container relative z-10 pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card/60 backdrop-blur-lg border border-border/40 shadow-lg">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-foreground/90">OFPPT - Formation Professionnelle</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-display font-extrabold mb-4 tracking-tight">
              <span className="gradient-text">ISTA</span>
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Roches Noires
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              L'excellence en formation professionnelle au Maroc. 
              Préparez votre avenir avec des formations de haute qualité.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button 
              className="btn-gradient rounded-full px-8 py-6 text-base md:text-lg font-semibold shadow-lg"
              onClick={() => scrollToSection("formations")}
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Découvrir nos formations
            </Button>
            <Button 
              variant="outline"
              className="rounded-full px-8 py-6 text-base md:text-lg font-semibold bg-card/40 backdrop-blur-lg border-border/50 hover:bg-card/60 hover:border-primary/50 transition-all"
              onClick={() => scrollToSection("events")}
            >
              Nos événements
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="glass-hero rounded-2xl p-6 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-1">15+</div>
              <div className="text-sm text-muted-foreground">Formations Disponibles</div>
            </div>
            <div className="glass-hero rounded-2xl p-6 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text-secondary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Stagiaires Formés</div>
            </div>
            <div className="glass-hero rounded-2xl p-6 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text-gold mb-1">95%</div>
              <div className="text-sm text-muted-foreground">Taux de Réussite</div>
            </div>
          </div>

          {/* Image Navigation Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentImageIndex 
                    ? "bg-primary w-10" 
                    : "bg-foreground/20 w-2 hover:bg-foreground/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection("formations")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 p-3 rounded-full glass-card hover:bg-primary/20 transition-colors animate-bounce"
        aria-label="Scroll to formations"
      >
        <ChevronDown className="w-6 h-6 text-primary" />
      </button>
    </header>
  );
};

export default HeroSection;
