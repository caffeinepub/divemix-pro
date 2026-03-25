import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cylinder } from "lucide-react";

const tanks = [
  {
    name: "AL80 Aluminum",
    material: "Aluminum",
    volume: 11.1,
    workingPressure: 207,
    testPressure: Math.round(207 * 1.5),
    waterCapacity: 11.1,
    bestFor: "Recreational diving, warm water, beginner divers",
    color: "#6B9FC8",
    fillPct: 60,
  },
  {
    name: "Steel 12L",
    material: "Steel",
    volume: 12,
    workingPressure: 232,
    testPressure: Math.round(232 * 1.5),
    waterCapacity: 12,
    bestFor: "Technical diving, longer dives, cold water",
    color: "#8E9BAB",
    fillPct: 70,
  },
  {
    name: "Steel 15L",
    material: "Steel",
    volume: 15,
    workingPressure: 232,
    testPressure: Math.round(232 * 1.5),
    waterCapacity: 15,
    bestFor: "Extended dive missions, technical training",
    color: "#7A8B9A",
    fillPct: 75,
  },
  {
    name: "LP95 Low Pressure",
    material: "Steel",
    volume: 16,
    workingPressure: 179,
    testPressure: Math.round(179 * 1.5),
    waterCapacity: 16,
    bestFor: "High-volume recreational dives, dive masters",
    color: "#9BAAB5",
    fillPct: 55,
  },
  {
    name: "Twinset 2×12L",
    material: "Steel",
    volume: 24,
    workingPressure: 232,
    testPressure: Math.round(232 * 1.5),
    waterCapacity: 24,
    bestFor: "Deep technical diving, cave diving, extended decompression",
    color: "#5E8FA8",
    fillPct: 85,
  },
];

export default function TanksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          Tank Information
        </h1>
        <p className="text-muted-foreground">
          Common dive cylinder specifications. Hydrostatic test pressure = 1.5×
          working pressure per ISO 10461.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        data-ocid="tanks.list"
      >
        {tanks.map((tank, i) => (
          <Card
            key={tank.name}
            className="bg-card border-border hover:border-gold/50 transition-colors"
            data-ocid={`tanks.item.${i + 1}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-foreground font-serif text-lg">
                    {tank.name}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="mt-1 border-gold/50 text-gold text-xs"
                  >
                    {tank.material}
                  </Badge>
                </div>
                <Cylinder className="w-8 h-8 text-gold/60" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Stat label="Water Capacity" value={`${tank.volume} L`} />
                <Stat
                  label="Working Pressure"
                  value={`${tank.workingPressure} bar`}
                />
                <Stat
                  label="Test Pressure"
                  value={`${tank.testPressure} bar`}
                />
                <Stat
                  label="Total Capacity"
                  value={`${((tank.volume * tank.workingPressure) / 10).toFixed(0)} L`}
                />
              </div>

              {/* Pressure bar */}
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Working Pressure</span>
                  <span>{tank.workingPressure} bar</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${tank.fillPct}%`, background: "#D4AF37" }}
                  />
                </div>
              </div>

              <div className="p-2 rounded bg-secondary/50 text-xs">
                <span className="text-muted-foreground">Best For: </span>
                <span className="text-foreground">{tank.bestFor}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info note */}
      <div className="mt-8 p-4 rounded-lg border border-gold/30 bg-gold/5">
        <p className="text-sm text-muted-foreground">
          <span className="text-gold font-semibold">⚠ Safety Note: </span>
          Always verify cylinder test dates (hydro test every 5 years in most
          jurisdictions). Visual inspection annually. Never fill a cylinder past
          its marked working pressure. Total gas volume = Water Capacity (L) ×
          Working Pressure (bar) / 10.
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-secondary/50 rounded p-2">
      <div className="text-muted-foreground text-xs">{label}</div>
      <div className="text-foreground font-semibold mt-0.5">{value}</div>
    </div>
  );
}
