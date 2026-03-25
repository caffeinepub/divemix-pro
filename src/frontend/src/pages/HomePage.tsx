import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  Anchor,
  BookOpen,
  Calculator,
  FlaskConical,
  ShieldCheck,
  Star,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section
        className="relative min-h-[540px] flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom, rgba(7,27,42,0.7) 0%, rgba(7,27,42,0.85) 100%), url('/assets/generated/hero-diving.dim_1200x600.jpg') center/cover no-repeat`,
        }}
      >
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Anchor className="w-5 h-5 text-gold" />
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              Indian Navy Certified Approach
            </span>
            <Anchor className="w-5 h-5 text-gold" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Precision Gas Mixing
            <br />
            <span className="text-gold">for Professional Divers</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Real scientific formulas. Accurate calculations for Air, Nitrox,
            Trimix, and Heliox. Trusted by Indian Navy divers, built for
            aspiring professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator">
              <Button
                data-ocid="home.primary_button"
                size="lg"
                className="bg-gold text-navy font-bold text-base hover:bg-gold/90 px-8"
              >
                Calculate Your Mix
              </Button>
            </Link>
            <Link to="/gas-guide">
              <Button
                data-ocid="home.secondary_button"
                size="lg"
                variant="outline"
                className="border-gold text-gold hover:bg-gold/10 px-8"
              >
                Gas Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-gold/10 border-y border-gold/30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {[
            "5 Gas Mixes",
            "Real Formulas",
            "Navy Certified",
            "Dark Mode",
            "Save Calculations",
          ].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <Star className="w-3 h-3 text-gold fill-gold" />
              <span className="text-gold text-sm font-medium">{s}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why DiveMix Pro?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built with the scientific precision of the Indian Navy, designed for
            every diver from trainee to technical.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <FlaskConical className="w-8 h-8 text-gold" />,
              title: "Scientific Accuracy",
              desc: "Uses real partial pressure blending formulas (Dalton's Law), MOD calculations, EAD, and END \u2014 the same methods used by professional dive teams.",
            },
            {
              icon: <Calculator className="w-8 h-8 text-gold" />,
              title: "MOD Calculator",
              desc: "Instantly calculates Maximum Operating Depth at 1.4 and 1.6 ppO\u2082, Equivalent Air Depth, and Equivalent Narcotic Depth for all mix types.",
            },
            {
              icon: <BookOpen className="w-8 h-8 text-gold" />,
              title: "Save Calculations",
              desc: "Store your custom gas blends for quick reference. Review and manage saved mixes in your personal calculation history.",
            },
          ].map((f) => (
            <Card
              key={f.title}
              className="bg-card border-border hover:border-gold/50 transition-colors"
            >
              <CardContent className="p-6">
                <div className="mb-4">{f.icon}</div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-gold" />
                <span className="text-gold text-sm font-semibold uppercase tracking-widest">
                  Professional Grade
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Know Your Equipment
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Understanding your cylinder specifications is critical for safe
                gas blending. DiveMix Pro includes detailed information on
                common dive cylinders\u2014aluminum and steel\u2014with working
                pressures, water capacities, and best-use recommendations.
              </p>
              <Link to="/tanks">
                <Button
                  data-ocid="home.secondary_button"
                  variant="outline"
                  className="border-gold text-gold hover:bg-gold/10"
                >
                  View Tank Information
                </Button>
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden border border-gold/30 shadow-gold">
              <img
                src="/assets/generated/diving-equipment.dim_800x500.jpg"
                alt="Scuba diving equipment"
                className="w-full h-64 lg:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
            Ready to Mix with Precision?
          </h2>
          <p className="text-muted-foreground mb-8">
            Use the same gas calculations trusted by Indian Navy divers. Start
            your calculation now.
          </p>
          <Link to="/calculator">
            <Button
              data-ocid="home.primary_button"
              size="lg"
              className="bg-gold text-navy font-bold hover:bg-gold/90 px-10"
            >
              Open Gas Calculator
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
