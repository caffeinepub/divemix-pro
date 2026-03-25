import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle, Flame, Snowflake, Wind } from "lucide-react";

const noaaTable = [
  { ppo2: 0.6, time: 720 },
  { ppo2: 0.7, time: 570 },
  { ppo2: 0.8, time: 450 },
  { ppo2: 0.9, time: 360 },
  { ppo2: 1.0, time: 300 },
  { ppo2: 1.1, time: 240 },
  { ppo2: 1.2, time: 210 },
  { ppo2: 1.3, time: 180 },
  { ppo2: 1.4, time: 150 },
  { ppo2: 1.5, time: 120 },
  { ppo2: 1.6, time: 45 },
];

const mixTable = [
  { mix: "Air", o2: 21, he: 0, n2: 79, mod: 56.7, use: "Recreational" },
  { mix: "Nitrox 32%", o2: 32, he: 0, n2: 68, mod: 33.8, use: "Extended rec" },
  { mix: "Nitrox 36%", o2: 36, he: 0, n2: 64, mod: 28.9, use: "Shallow rec" },
  {
    mix: "Trimix 21/35",
    o2: 21,
    he: 35,
    n2: 44,
    mod: 56.7,
    use: "Deep technical",
  },
  {
    mix: "Trimix 18/45",
    o2: 18,
    he: 45,
    n2: 37,
    mod: 67.8,
    use: "Deep technical",
  },
  {
    mix: "Heliox 16/84",
    o2: 16,
    he: 84,
    n2: 0,
    mod: 77.5,
    use: "Extreme depth",
  },
];

export default function GasGuidePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          Gas Guide
        </h1>
        <p className="text-muted-foreground">
          Understanding the gases used in scuba diving — properties, risks, and
          safe limits.
        </p>
      </div>

      {/* Oxygen */}
      <Card className="border-[#1a6cb5]/50 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 font-serif text-2xl">
            <div className="w-10 h-10 rounded-full bg-[#1a6cb5]/20 flex items-center justify-center">
              <Flame className="w-5 h-5 text-[#4a9fd4]" />
            </div>
            <span>Oxygen (O₂)</span>
            <Badge className="bg-[#1a6cb5]/20 text-[#4a9fd4] border-[#1a6cb5]/40">
              21% in Air
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Oxygen is essential for cellular metabolism. In diving, partial
            pressure of oxygen (ppO₂) is the critical measure — too high causes
            Central Nervous System (CNS) toxicity and pulmonary toxicity; too
            low causes hypoxia. Standard air is 21% O₂, while Nitrox increases
            this fraction for longer no-decompression limits at shallower
            depths.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400" /> CNS
                Toxicity Signs (VENTID)
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {[
                  "V — Vision: tunnel vision, blurring",
                  "E — Ears: tinnitus, ringing",
                  "N — Nausea / dizziness",
                  "T — Twitching of facial muscles",
                  "I — Irritability, mood change",
                  "D — Dizziness, convulsions (final)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">›</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">
                NOAA ppO₂ Time Limits
              </h3>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {noaaTable.map((row) => (
                  <div
                    key={row.ppo2}
                    className={`flex justify-between p-1.5 rounded ${
                      row.ppo2 >= 1.6
                        ? "bg-red-500/20 text-red-400"
                        : row.ppo2 >= 1.4
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-secondary/50 text-muted-foreground"
                    }`}
                  >
                    <span>ppO₂ {row.ppo2}</span>
                    <span className="font-medium">{row.time} min</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-md border border-[#1a6cb5]/30 bg-[#1a6cb5]/10 text-sm">
            <span className="text-[#4a9fd4] font-semibold">Safe Limits: </span>
            <span className="text-muted-foreground">
              Working limit ppO₂ = 1.4 bar. Contingency limit = 1.6 bar (never
              exceed). Hypoxia risk below ppO₂ 0.16.
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Nitrogen */}
      <Card className="border-muted/60 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 font-serif text-2xl">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Wind className="w-5 h-5 text-muted-foreground" />
            </div>
            <span>Nitrogen (N₂)</span>
            <Badge
              variant="outline"
              className="text-muted-foreground border-muted"
            >
              79% in Air
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Nitrogen is inert metabolically but narcotic under pressure
            (Meyer-Overton hypothesis). Nitrogen narcosis impairs judgment
            similarly to alcohol — at 30m depth breathing air, the narcotic
            effect approximates ~2 glasses of wine. It also dissolves in tissues
            and must be carefully managed to prevent Decompression Sickness
            (DCS).
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">
                Narcosis Depth Guide
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { depth: "10m", effect: "Mild euphoria (like 1 drink)" },
                  { depth: "20m", effect: "Noticeable impairment" },
                  { depth: "30m", effect: "≈ 2 glasses wine" },
                  {
                    depth: "40m",
                    effect: "≈ 4 glasses wine — significant risk",
                  },
                  {
                    depth: "50m+",
                    effect: "Severe impairment — incapacitation risk",
                  },
                ].map((r) => (
                  <div
                    key={r.depth}
                    className="flex justify-between p-2 bg-secondary/50 rounded"
                  >
                    <span className="font-medium text-foreground">
                      {r.depth}
                    </span>
                    <span className="text-muted-foreground">{r.effect}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  DCS Risk Factors
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {[
                    "Rapid ascent",
                    "Repetitive diving",
                    "Cold water",
                    "Dehydration",
                    "Physical exertion",
                    "Patent Foramen Ovale (PFO)",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-destructive">•</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3 rounded-md border border-border bg-secondary/30 text-sm">
                <span className="text-foreground font-semibold">
                  Safe Ascent:{" "}
                </span>
                <span className="text-muted-foreground">
                  Max 9 m/min. Safety stop: 3 min at 5m on every dive &gt;10m.
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Helium */}
      <Card className="border-gold/40 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 font-serif text-2xl">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
              <Snowflake className="w-5 h-5 text-gold" />
            </div>
            <span>Helium (He)</span>
            <Badge className="bg-gold/20 text-gold border-gold/40">
              Inert Diluent
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Helium replaces narcotic nitrogen at depth, dramatically improving
            cognitive function in technical and deep dives. It has very low
            density (reduces breathing resistance) and minimal narcotic
            potential. However, it introduces unique risks at extreme depths.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {[
              {
                icon: "🧊",
                title: "Thermal Loss",
                desc: "Helium conducts heat 6× faster than nitrogen — increases chilling risk. Heated undersuit recommended below 100m.",
              },
              {
                icon: "⚡",
                title: "HPNS Risk",
                desc: "High Pressure Nervous Syndrome appears at 150m+ — tremors, vertigo, nausea. Mitigated by slow descent rate.",
              },
              {
                icon: "💰",
                title: "Cost Factor",
                desc: "Helium is significantly more expensive than O₂ or N₂. Careful calculation prevents waste in technical fills.",
              },
            ].map((item) => (
              <div key={item.title} className="p-3 bg-secondary/50 rounded-md">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-semibold text-foreground mb-1">
                  {item.title}
                </div>
                <div className="text-muted-foreground text-xs leading-relaxed">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mixture comparison */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
          Mixture Comparison Table
        </h2>
        <Card className="bg-card border-border">
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  {["Mix", "O₂ %", "He %", "N₂ %", "MOD @ 1.4", "Best Use"].map(
                    (h) => (
                      <TableHead key={h} className="text-muted-foreground">
                        {h}
                      </TableHead>
                    ),
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {mixTable.map((row, i) => (
                  <TableRow
                    key={row.mix}
                    className="border-border hover:bg-secondary/30"
                    data-ocid={`gasguide.item.${i + 1}`}
                  >
                    <TableCell className="font-medium text-foreground">
                      {row.mix}
                    </TableCell>
                    <TableCell>
                      <span className="text-[#4a9fd4] font-bold">
                        {row.o2}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gold font-bold">{row.he}%</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">{row.n2}%</span>
                    </TableCell>
                    <TableCell className="text-green-400 font-bold">
                      {row.mod}m
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-xs border-border"
                      >
                        {row.use}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
