import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import logoOfppt from "@/assets/logo-ofppt.png";

const Footer = () => {
  return (
    <footer className="relative py-16 px-4 border-t border-border/30 bg-card/20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full overflow-hidden bg-white shadow-md">
                <img 
                  src={logoOfppt} 
                  alt="OFPPT" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <span className="font-display font-bold text-foreground block">
                  ISTA Roches Noires
                </span>
                <span className="text-xs text-foreground/60">OFPPT</span>
              </div>
            </div>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Institut Spécialisé de Technologie Appliquée - Excellence en formation professionnelle au Maroc.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link to="/" className="text-foreground/60 hover:text-primary transition-colors">Accueil</Link>
              <Link to="/#formations" className="text-foreground/60 hover:text-primary transition-colors">Formations</Link>
              <Link to="/#events" className="text-foreground/60 hover:text-primary transition-colors">Événements</Link>
              <Link to="/#memories" className="text-foreground/60 hover:text-primary transition-colors">Galerie</Link>
              <Link to="/#testimonials" className="text-foreground/60 hover:text-primary transition-colors">Témoignages</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground/60">Roches Noires, Casablanca, Maroc</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-foreground/60">+212 5XX-XXXXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-foreground/60">contact@ista-rochesnoires.ma</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Suivez-nous</h4>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/50">
          <p>© {new Date().getFullYear()} ISTA Roches Noires - OFPPT. Tous droits réservés.</p>
          <p>Développé avec ❤️ pour les stagiaires</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;