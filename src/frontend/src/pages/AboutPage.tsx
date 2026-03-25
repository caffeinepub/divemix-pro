import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  Anchor,
  BookOpen,
  Shield,
  Target,
  Users,
} from "lucide-react";

const safetyRules = [
  {
    icon: <Users className="w-5 h-5 text-gold" />,
    title: "Buddy System",
    desc: "Never dive alone. Always use the buddy system — your dive partner may be the difference between life and death.",
  },
  {
    icon: <Shield className="w-5 h-5 text-gold" />,
    title: "Verify Gas Mixture",
    desc: "Always analyze your gas mixture with an O₂ analyzer before every dive. Verify against the dive plan.",
  },
  {
    icon: <Target className="w-5 h-5 text-gold" />,
    title: "Know Your MOD",
    desc: "Calculate and memorize your Maximum Operating Depth. Never exceed it — CNS oxygen toxicity can cause instant unconsciousness underwater.",
  },
  {
    icon: <BookOpen className="w-5 h-5 text-gold" />,
    title: "Decompression Stops",
    desc: "Plan all decompression stops before entering the water. Never skip a mandatory deco stop regardless of gas supply.",
  },
  {
    icon: <AlertTriangle className="w-5 h-5 text-gold" />,
    title: "The 1/3 Rule",
    desc: "1/3 gas for descent/bottom, 1/3 for ascent, 1/3 emergency reserve. Applies to all technical diving.",
  },
  {
    icon: <Anchor className="w-5 h-5 text-gold" />,
    title: "STOP · THINK · ACT",
    desc: "In any underwater emergency: Stop all movement, Think through options, Act decisively. Panic kills divers.",
  },
  {
    icon: <Shield className="w-5 h-5 text-gold" />,
    title: "Safe Ascent Rate",
    desc: "Maximum ascent rate: 9 metres/minute. Slower is always safer. Your computer will alert if you ascend too fast.",
  },
  {
    icon: <Target className="w-5 h-5 text-gold" />,
    title: "5m Safety Stop",
    desc: "Perform a 3-minute safety stop at 5 metres on every dive deeper than 10 metres, regardless of dive tables.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-14">
      {/* Creator hero */}
      <section>
        <div className="rounded-2xl overflow-hidden border border-gold/40 bg-gradient-to-br from-navy to-navy-2 shadow-gold">
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
              {/* Photo */}
              <div className="flex flex-col items-center text-center">
                <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-gold shadow-gold mb-4">
                  <img
                    src="/assets/uploads/whatsapp_image_2026-01-01_at_5.47.52_pm-019d2472-c096-7521-a1d5-c95b837fe74a-1.jpeg"
                    alt="Lieutenant Vipin Dahiya"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="font-serif text-2xl font-bold text-gold mb-1">
                  Lieutenant Vipin Dahiya
                </h2>
                <p className="text-white/80 text-sm mb-3">Indian Navy</p>
                <Badge className="bg-gold text-navy font-bold text-sm px-4 py-1">
                  🥇 Best Overall Diver
                </Badge>
                <div className="mt-4 flex flex-col gap-1 text-xs text-white/60">
                  <span>🏛 Naval Academy — Top Merit</span>
                  <span>🌊 Professional Diving Excellence</span>
                  <span>📍 Haryana, India</span>
                </div>
              </div>

              {/* Bio */}
              <div className="md:col-span-2 space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Anchor className="w-4 h-4 text-gold" />
                    <span className="text-gold text-xs font-semibold uppercase tracking-widest">
                      About the Creator
                    </span>
                  </div>
                  <p className="text-white/85 leading-relaxed">
                    Lt Vipin Dahiya is an officer in the Indian Navy with an
                    exceptional diving career. Born in Haryana, he has
                    consistently excelled—from top merit ranks at his naval
                    academy to being awarded{" "}
                    <span className="text-gold font-semibold">
                      'Best Overall Diver'
                    </span>{" "}
                    during his professional training. His passion for diving was
                    ignited by his father, a proud ex-serviceman and experienced
                    diver himself, continuing a remarkable family tradition of
                    service and excellence.
                  </p>
                  <p className="text-white/85 leading-relaxed mt-3">
                    Lt Dahiya built{" "}
                    <span className="text-gold font-semibold">DiveMix Pro</span>{" "}
                    to give aspiring young divers in India access to
                    professional-grade gas calculation tools—the same scientific
                    precision used by navy divers, now available to everyone.
                    His mission: to inspire India's youth to pursue diving as a
                    career, equipped with the right knowledge and tools.
                  </p>
                </div>

                {/* Family Legacy */}
                <div className="p-4 rounded-xl bg-white/5 border border-gold/20">
                  <h4 className="text-gold font-semibold mb-2 flex items-center gap-2">
                    <span>🇮🇳</span> A Family Legacy of Service
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Lt Dahiya's father, himself an ex-serviceman and
                    accomplished diver, was his first inspiration. Growing up
                    watching his father's discipline, courage, and love for the
                    sea, Vipin channeled that family legacy into his own naval
                    career — graduating top of his class and earning recognition
                    as the finest diver of his training cohort.
                  </p>
                </div>

                {/* Quote */}
                <blockquote className="border-l-4 border-gold pl-4 py-1">
                  <p className="text-white/90 italic leading-relaxed text-base">
                    "Diving is not just a skill — it is a discipline of mind,
                    body, and science. This app is my contribution to the next
                    generation of Indian divers."
                  </p>
                  <footer className="mt-2 text-gold text-sm font-semibold">
                    — Lt Vipin Dahiya, Indian Navy
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the App */}
      <section>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
          About DiveMix Pro
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardContent className="p-6 space-y-3">
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Purpose
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                DiveMix Pro provides professional-grade scuba gas mixture
                calculations using scientifically accurate partial pressure
                blending formulas. It is designed to make advanced diving
                calculations accessible to every diver — from trainees to
                technical professionals.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6 space-y-3">
              <h3 className="font-serif text-lg font-semibold text-foreground">
                For India's Youth
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                India has vast maritime potential. DiveMix Pro is built to
                inspire young Indians to pursue diving as a professional career
                — in the Navy, coast guard, commercial diving, and recreational
                instruction. Professional tools should be accessible to all.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6 space-y-3">
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Indian Navy Context
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The Indian Navy's diving programme is among the most rigorous in
                Asia. Officers undergo extensive training in gas physics,
                decompression theory, and practical deep diving. DiveMix Pro
                reflects the precision and discipline of that training.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6 space-y-3">
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Scientific Accuracy
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                All calculations use Dalton's Law of Partial Pressures, NOAA
                oxygen exposure limits, and standard partial pressure blending
                methods. Formulas are displayed openly so users can verify every
                result independently.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Safety Guidelines */}
      <section>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
          Safety Guidelines
        </h2>
        <p className="text-muted-foreground mb-6">
          Essential rules for every dive. Memorize them. Follow them. They save
          lives.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {safetyRules.map((rule, i) => (
            <Card
              key={rule.title}
              className="bg-card border-border hover:border-gold/40 transition-colors"
              data-ocid={`about.item.${i + 1}`}
            >
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  {rule.icon}
                  <span className="font-semibold text-sm text-foreground">
                    {rule.title}
                  </span>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {rule.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="p-4 rounded-lg border border-destructive/40 bg-destructive/5">
        <p className="text-sm text-muted-foreground">
          <span className="text-destructive font-semibold">⚠ Disclaimer: </span>
          DiveMix Pro is a calculation aid and educational tool. It does not
          replace formal diving training, certified equipment, or professional
          supervision. Always get certified by a recognized agency (PADI, SSI,
          CMAS, or Indian Navy) before diving with enriched gases or mixed
          gases.
        </p>
      </div>
    </div>
  );
}
