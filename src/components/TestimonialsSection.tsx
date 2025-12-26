import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    text: "Excellente formation, pédagogie de qualité et stage chez un partenaire reconnu. J'ai pu décrocher mon premier emploi grâce aux compétences acquises.",
    author: "Amina B.",
    role: "Développement Digital - Promo 2023",
    avatar: "A",
  },
  {
    id: 2,
    text: "Les enseignants sont très impliqués, beaucoup de pratique et de projets réels. L'encadrement est vraiment professionnel.",
    author: "Youssef M.",
    role: "Infrastructure Digitale - Promo 2022",
    avatar: "Y",
  },
  {
    id: 3,
    text: "Bon accompagnement professionnel, préparation CV et simulations d'entretiens. Je recommande vivement cet établissement.",
    author: "Leila K.",
    role: "Gestion des Entreprises - Promo 2023",
    avatar: "L",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative py-24 px-4">
      <div className="container max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Quote className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Ce qu'ils disent</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Témoignages
          </h2>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 rounded-full bg-card/50 border border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary hidden md:flex"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 rounded-full bg-card/50 border border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary hidden md:flex"
            onClick={nextSlide}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Slides */}
          <div className="overflow-hidden rounded-3xl">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-card/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/40 transition-all duration-500 ${
                  index === current ? "block animate-fade-in" : "hidden"
                }`}
              >
                <Quote className="w-10 h-10 text-primary/30 mb-6" />
                
                <blockquote className="text-xl md:text-2xl font-medium text-foreground mb-8 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-foreground/60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-primary w-8"
                    : "bg-foreground/20 w-2 hover:bg-foreground/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;