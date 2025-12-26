import { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { GraduationCap, Calendar, Camera, ArrowRight } from "lucide-react";

const Index = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("light", !isDark);
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      
      <main className="relative z-10">
        <HeroSection />
        
        {/* Quick Links Section */}
        <section className="py-20 px-4">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Formations Card */}
              <Link to="/formations" className="group">
                <div className="relative bg-card/40 backdrop-blur-sm rounded-2xl p-8 border border-border/40 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      Formations
                    </h3>
                    <p className="text-foreground/60 mb-6">
                      Découvrez nos formations diplômantes et qualifiantes pour préparer votre avenir professionnel.
                    </p>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <span>Voir toutes les formations</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Events Card */}
              <Link to="/evenements" className="group">
                <div className="relative bg-card/40 backdrop-blur-sm rounded-2xl p-8 border border-border/40 hover:border-secondary/50 transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">
                      Événements
                    </h3>
                    <p className="text-foreground/60 mb-6">
                      Restez informé des journées portes ouvertes, conférences et activités de l'établissement.
                    </p>
                    <div className="flex items-center gap-2 text-secondary font-medium">
                      <span>Voir tous les événements</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Gallery Card */}
              <Link to="/galerie" className="group">
                <div className="relative bg-card/40 backdrop-blur-sm rounded-2xl p-8 border border-border/40 hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Camera className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                      Galerie
                    </h3>
                    <p className="text-foreground/60 mb-6">
                      Parcourez les photos et souvenirs de nos événements et moments forts.
                    </p>
                    <div className="flex items-center gap-2 text-accent font-medium">
                      <span>Voir la galerie</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <TestimonialsSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;