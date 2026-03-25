import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Moon, Sun, Waves, X } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

function NavLink({
  to,
  label,
  onClick,
}: { to: string; label: string; onClick?: () => void }) {
  const routerState = useRouterState();
  const isActive =
    routerState.location.pathname === to ||
    (to !== "/" && routerState.location.pathname.startsWith(to));
  return (
    <Link
      to={to}
      data-ocid="nav.link"
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? "text-gold bg-white/10"
          : "text-white/80 hover:text-gold hover:bg-white/5"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Header({ darkMode, onToggleDark }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/calculator", label: "Calculator" },
    { to: "/tanks", label: "Tank Info" },
    { to: "/gas-guide", label: "Gas Guide" },
    { to: "/about", label: "About" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md shadow-lg shadow-black/30"
          : "bg-navy"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2" data-ocid="nav.link">
            <Waves className="w-6 h-6 text-gold" />
            <span className="font-serif font-bold text-xl text-gold">
              DiveMix Pro
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} label={link.label} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleDark}
              data-ocid="darkmode.toggle"
              className="p-2 rounded-md text-white/70 hover:text-gold transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <Link to="/calculator" className="hidden sm:block">
              <Button
                data-ocid="nav.primary_button"
                size="sm"
                className="bg-gold text-navy font-semibold hover:bg-gold/90"
              >
                Calculate Now
              </Button>
            </Link>
            <button
              type="button"
              className="md:hidden p-2 text-white/70 hover:text-gold"
              onClick={() => setMobileOpen((o) => !o)}
              data-ocid="nav.toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-navy-2 border-t border-white/10 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              label={link.label}
              onClick={() => setMobileOpen(false)}
            />
          ))}
          <Link to="/calculator" onClick={() => setMobileOpen(false)}>
            <Button
              size="sm"
              className="w-full mt-2 bg-gold text-navy font-semibold"
            >
              Calculate Now
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
