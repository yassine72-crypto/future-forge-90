import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative py-12 px-4 border-t border-border/50">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-display font-bold text-background">
              IR
            </div>
            <span className="font-display font-bold gradient-text">
              ISTA Roches Noires
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <Link to="/#formations" className="hover:text-primary transition-colors">Formations</Link>
            <Link to="/#events" className="hover:text-primary transition-colors">Événements</Link>
            <Link to="/#memories" className="hover:text-primary transition-colors">Galerie</Link>
          </nav>

          <p className="text-sm text-muted-foreground">
            © ISTA Roches Noires – Tous droits réservés • {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
