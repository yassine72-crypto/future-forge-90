import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import logoOfppt from "@/assets/logo-ofppt.png";

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navbar = ({ isDark, toggleTheme }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/#formations", label: "Formations" },
    { href: "/#events", label: "Événements" },
    { href: "/#memories", label: "Galerie" },
    { href: "/#testimonials", label: "Avis" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/#")) {
      const elementId = href.replace("/#", "");
      if (location.pathname === "/") {
        const element = document.getElementById(elementId);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/90 border-b border-border/50 shadow-sm"
          : "backdrop-blur-sm bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand with Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-14 w-14 rounded-full overflow-hidden bg-white shadow-md group-hover:scale-105 transition-transform">
              <img 
                src={logoOfppt} 
                alt="OFPPT ISTA Roches Noires" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-display font-bold text-base text-foreground leading-tight">
                ISTA Roches Noires
              </span>
              <span className="text-xs text-foreground/70">
                Formation Professionnelle
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href.startsWith("/#") && location.pathname === "/" ? link.href : link.href.startsWith("/#") ? "/" : link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-foreground font-medium hover:text-primary transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {isAdmin && (
              <Link to="/admin">
                <Button variant="outline" size="sm" className="hidden sm:flex gap-2 rounded-full">
                  <Shield className="w-4 h-4" />
                  Admin
                </Button>
              </Link>
            )}

            {user ? (
              <Link to="/admin">
                <Button className="btn-gradient rounded-full px-6 hidden sm:block">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button className="btn-gradient rounded-full px-6 hidden sm:block">
                  Connexion
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href.startsWith("/#") ? "/" : link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="block py-2 text-foreground font-medium hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4 border-t border-border/50 flex gap-3">
                {isAdmin && (
                  <Link to="/admin" className="flex-1">
                    <Button variant="outline" className="w-full gap-2 rounded-full">
                      <Shield className="w-4 h-4" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Link to={user ? "/admin" : "/auth"} className="flex-1">
                  <Button className="btn-gradient w-full rounded-full">
                    {user ? "Dashboard" : "Connexion"}
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;