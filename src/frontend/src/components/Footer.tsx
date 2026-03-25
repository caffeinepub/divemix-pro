import { Link } from "@tanstack/react-router";
import { Heart, Waves } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-navy border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Waves className="w-5 h-5 text-gold" />
              <span className="font-serif font-bold text-lg text-gold">
                DiveMix Pro
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Professional-grade scuba diving gas mixture calculations. Indian
              Navy certified approach, accessible to all.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Navigation</h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/calculator", label: "Gas Calculator" },
                { to: "/tanks", label: "Tank Information" },
                { to: "/gas-guide", label: "Gas Guide" },
                { to: "/about", label: "About & Safety" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Safety First</h4>
            <p className="text-white/60 text-sm leading-relaxed">
              Always verify gas mixtures with certified equipment. Never exceed
              your Maximum Operating Depth. Dive safe.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-gold rounded-full" />
              <span className="text-gold/80 text-xs">
                Indian Navy Certified Approach
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/40 text-sm">
          <span>
            \u00a9 {year} DiveMix Pro. Created by Lt Vipin Dahiya, Indian Navy.
          </span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-gold transition-colors"
          >
            Built with <Heart className="w-3 h-3 fill-current text-gold" />{" "}
            using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
