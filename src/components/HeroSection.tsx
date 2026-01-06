import { ChevronDown, GraduationCap, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroMain from "@/assets/hero-main.jpg";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Single Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroMain}
          alt="ISTA Roches Noires"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Professional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/60 to-background z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40 z-[1]" />

      <div className="container relative z-10 pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card/70 backdrop-blur-lg border border-border/40">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-sm font-medium text-foreground">OFPPT - Formation Professionnelle</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-display font-extrabold mb-4 tracking-tight text-foreground">
              ISTA
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Roches Noires
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              L'excellence en formation professionnelle au Maroc. 
              Préparez votre avenir avec des formations de haute qualité.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button 
              className="btn-gradient rounded-full px-8 py-6 text-base md:text-lg font-semibold"
              onClick={() => scrollToSection("formations")}
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Découvrir nos formations
            </Button>
            <Button 
              variant="outline"
              className="rounded-full px-8 py-6 text-base md:text-lg font-semibold bg-card/50 backdrop-blur-lg border-border/50 hover:bg-card/70 hover:border-primary/50 transition-all"
              onClick={() => scrollToSection("events")}
            >
              Nos événements
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="glass-hero rounded-2xl p-6 text-center card-hover">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-1">15+</div>
              <div className="text-sm text-muted-foreground">Formations Disponibles</div>
            </div>
            <div className="glass-hero rounded-2xl p-6 text-center card-hover">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text-secondary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Stagiaires Formés</div>
            </div>
            <div className="glass-hero rounded-2xl p-6 text-center card-hover">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text-accent mb-1">95%</div>
              <div className="text-sm text-muted-foreground">Taux de Réussite</div>
            </div>
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