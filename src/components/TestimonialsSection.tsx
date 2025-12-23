import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Excellente formation, pédagogie de qualité et stage chez un partenaire reconnu.",
    author: "Amina",
    role: "Développement Web (Promo 2023)",
  },
  {
    id: 2,
    text: "Les enseignants sont très impliqués, beaucoup de pratique et de projets réels.",
    author: "Youssef",
    role: "Réseaux (Promo 2022)",
  },
  {
    id: 3,
    text: "Bon accompagnement professionnel, préparation CV et simulations d'entretiens.",
    author: "Leila",
    role: "Gestion (Promo 2021)",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  return (
    <section id="testimonials" className="relative py-24 px-4">
      <div className="container max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-display font-black text-center mb-12">
          <span className="gradient-text">Témoignages</span> de nos Étudiants
        </h2>

        <div className="relative">
          {/* Slides */}
          <div className="overflow-hidden rounded-3xl">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`glass-card-strong rounded-3xl p-8 md:p-12 transition-all duration-500 ${
                  index === current ? "block animate-fade-in" : "hidden"
                }`}
              >
                <Quote className="w-12 h-12 text-primary/50 mb-6" />
                
                <blockquote className="text-xl md:text-2xl font-medium text-foreground mb-8 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-background font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-primary">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-gradient-to-r from-primary to-secondary w-8 glow-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
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
