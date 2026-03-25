import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  FlaskConical,
  Save,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

interface MixInputs {
  tankVolume: number;
  currentPressure: number;
  targetPressure: number;
  targetO2: number;
  targetHe: number;
  currentO2: number;
  currentHe: number;
}

function calcMix(inputs: MixInputs) {
  const {
    tankVolume,
    currentPressure,
    targetPressure,
    targetO2,
    targetHe,
    currentO2,
    currentHe,
  } = inputs;
  const FO2 = targetO2 / 100;
  const FHe = targetHe / 100;
  const FN2 = Math.max(0, 1 - FO2 - FHe);

  const P_He_add = Math.max(
    0,
    targetPressure * FHe - (currentPressure * currentHe) / 100,
  );
  const P_O2_add = Math.max(
    0,
    targetPressure * FO2 - (currentPressure * currentO2) / 100,
  );
  const P_air_add = Math.max(
    0,
    targetPressure - currentPressure - P_He_add - P_O2_add,
  );

  const V_He = (P_He_add * tankVolume) / 10;
  const V_O2 = (P_O2_add * tankVolume) / 10;
  const V_air = (P_air_add * tankVolume) / 10;

  const MOD_14 = FO2 > 0 ? (1.4 / FO2 - 1) * 10 : 0;
  const MOD_16 = FO2 > 0 ? (1.6 / FO2 - 1) * 10 : 0;
  const EAD = (FN2 / 0.79) * (MOD_14 + 10) - 10;
  const END = (FN2 + FO2) * (MOD_14 + 10) - 10;
  const ppO2_MOD14 = FO2 * (MOD_14 / 10 + 1);

  const totalBarAdded = P_He_add + P_O2_add + P_air_add;
  const totalBar = currentPressure + totalBarAdded;
  const finalO2 =
    totalBar > 0
      ? (((currentPressure * currentO2) / 100 + P_O2_add + P_air_add * 0.21) /
          totalBar) *
        100
      : targetO2;
  const finalHe =
    totalBar > 0
      ? (((currentPressure * currentHe) / 100 + P_He_add) / totalBar) * 100
      : targetHe;
  const finalN2 = Math.max(0, 100 - finalO2 - finalHe);

  return {
    P_He_add,
    P_O2_add,
    P_air_add,
    V_He,
    V_O2,
    V_air,
    MOD_14,
    MOD_16,
    EAD,
    END,
    ppO2_MOD14,
    FO2,
    FHe,
    FN2,
    finalO2,
    finalHe,
    finalN2,
  };
}

interface CalcFormProps {
  label: string;
  mixType: string;
  defaultO2: number;
  defaultHe: number;
  minO2: number;
  maxO2: number;
  maxHe: number;
  presets: Array<{ label: string; o2: number; he: number }>;
  showHe?: boolean;
  heAuto?: boolean;
}

function CalcForm({
  label,
  mixType,
  defaultO2,
  defaultHe,
  minO2,
  maxO2,
  maxHe,
  presets,
  showHe,
  heAuto,
}: CalcFormProps) {
  const [tankVolume, setTankVolume] = useState(12);
  const [currentPressure, setCurrentPressure] = useState(0);
  const [targetPressure, setTargetPressure] = useState(200);
  const [targetO2, setTargetO2] = useState(defaultO2);
  const [targetHe, setTargetHe] = useState(defaultHe);
  const [currentO2, setCurrentO2] = useState(21);
  const [currentHe, setCurrentHe] = useState(0);
  const [saveName, setSaveName] = useState("");
  const [showFormulas, setShowFormulas] = useState(false);
  const queryClient = useQueryClient();
  const { actor } = useActor();
  const effectiveHe = heAuto ? Math.max(0, 100 - targetO2) : targetHe;

  const result = useMemo(
    () =>
      calcMix({
        tankVolume,
        currentPressure,
        targetPressure,
        targetO2,
        targetHe: effectiveHe,
        currentO2,
        currentHe,
      }),
    [
      tankVolume,
      currentPressure,
      targetPressure,
      targetO2,
      effectiveHe,
      currentO2,
      currentHe,
    ],
  );

  const warnings: string[] = [];
  if (result.FO2 + effectiveHe / 100 > 1)
    warnings.push("O\u2082 + He exceeds 100%");
  if (result.ppO2_MOD14 > 1.6)
    warnings.push("ppO\u2082 exceeds 1.6 \u2014 CNS toxicity risk!");
  if (result.ppO2_MOD14 > 1.4)
    warnings.push("ppO\u2082 exceeds 1.4 \u2014 use caution");
  if (targetPressure > 300)
    warnings.push("Target pressure exceeds typical tank max (300 bar)");

  const { data: savedCalcs = [] } = useQuery({
    queryKey: ["calculations"],
    queryFn: () => (actor ? actor.getAllCalculations() : Promise.resolve([])),
    enabled: !!actor,
  });

  const saveMut = useMutation({
    mutationFn: () =>
      actor!.saveCalculation(
        saveName || `${label} ${new Date().toLocaleDateString()}`,
        mixType,
        BigInt(Math.round(tankVolume)),
        BigInt(Math.round(targetPressure)),
        BigInt(Math.round(targetO2)),
        BigInt(Math.round(effectiveHe)),
        BigInt(Math.round(100 - targetO2 - effectiveHe)),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calculations"] });
      toast.success("Calculation saved!");
      setSaveName("");
    },
    onError: () => toast.error("Failed to save"),
  });

  const deleteMut = useMutation({
    mutationFn: (i: bigint) => actor!.deleteCalculation(i),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["calculations"] }),
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <FlaskConical className="w-5 h-5 text-gold" />
            {label} Input Parameters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">
              Quick Presets
            </Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {presets.map((p) => (
                <Button
                  key={p.label}
                  variant="outline"
                  size="sm"
                  data-ocid="calculator.secondary_button"
                  className="border-gold/50 text-gold hover:bg-gold/10 text-xs"
                  onClick={() => {
                    setTargetO2(p.o2);
                    if (!heAuto) setTargetHe(p.he);
                  }}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor={`tv-${mixType}`}>Tank Volume (L)</Label>
              <Input
                id={`tv-${mixType}`}
                type="number"
                min={1}
                max={50}
                value={tankVolume}
                onChange={(e) => setTankVolume(Number(e.target.value))}
                data-ocid="calculator.input"
                className="bg-input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`cp-${mixType}`}>Current Pressure (bar)</Label>
              <Input
                id={`cp-${mixType}`}
                type="number"
                min={0}
                max={300}
                value={currentPressure}
                onChange={(e) => setCurrentPressure(Number(e.target.value))}
                data-ocid="calculator.input"
                className="bg-input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`tp-${mixType}`}>Target Pressure (bar)</Label>
              <Input
                id={`tp-${mixType}`}
                type="number"
                min={1}
                max={350}
                value={targetPressure}
                onChange={(e) => setTargetPressure(Number(e.target.value))}
                data-ocid="calculator.input"
                className="bg-input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`co2-${mixType}`}>
                Current O\u2082 % (in tank)
              </Label>
              <Input
                id={`co2-${mixType}`}
                type="number"
                min={0}
                max={100}
                value={currentO2}
                onChange={(e) => setCurrentO2(Number(e.target.value))}
                data-ocid="calculator.input"
                className="bg-input"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor={`o2-${mixType}`}>
              Target O\u2082 % ({minO2}\u2013{maxO2}%)
            </Label>
            <Input
              id={`o2-${mixType}`}
              type="number"
              min={minO2}
              max={maxO2}
              value={targetO2}
              onChange={(e) => setTargetO2(Number(e.target.value))}
              data-ocid="calculator.input"
              className="bg-input"
            />
          </div>

          {showHe && !heAuto && (
            <div className="space-y-1">
              <Label htmlFor={`he-${mixType}`}>
                Target He % (0\u2013{maxHe}%)
              </Label>
              <Input
                id={`he-${mixType}`}
                type="number"
                min={0}
                max={maxHe}
                value={targetHe}
                onChange={(e) => setTargetHe(Number(e.target.value))}
                data-ocid="calculator.input"
                className="bg-input"
              />
            </div>
          )}
          {showHe && heAuto && (
            <div className="p-3 rounded-md bg-secondary/50 text-sm">
              <span className="text-muted-foreground">He (auto) = </span>
              <span className="text-gold font-bold">{effectiveHe}%</span>
              <span className="text-muted-foreground ml-2">
                (100% \u2212 O\u2082%)
              </span>
            </div>
          )}
          {showHe && (
            <div className="space-y-1">
              <Label htmlFor={`che-${mixType}`}>Current He % (in tank)</Label>
              <Input
                id={`che-${mixType}`}
                type="number"
                min={0}
                max={100}
                value={currentHe}
                onChange={(e) => setCurrentHe(Number(e.target.value))}
                data-ocid="calculator.input"
                className="bg-input"
              />
            </div>
          )}

          {warnings.length > 0 && (
            <div className="space-y-1" data-ocid="calculator.error_state">
              {warnings.map((w) => (
                <div
                  key={w}
                  className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded p-2"
                >
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  {w}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-gold" />
              Calculation Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                Final Mixture Composition
              </Label>
              <div
                className="h-8 rounded-md overflow-hidden flex text-xs font-bold"
                aria-label="Gas mixture bar"
              >
                {result.finalO2 > 0 && (
                  <div
                    className="flex items-center justify-center text-white"
                    style={{
                      width: `${result.finalO2}%`,
                      background: "#1a6cb5",
                    }}
                  >
                    {result.finalO2 > 5 ? `${result.finalO2.toFixed(0)}%` : ""}
                  </div>
                )}
                {result.finalHe > 0 && (
                  <div
                    className="flex items-center justify-center text-navy"
                    style={{
                      width: `${result.finalHe}%`,
                      background: "#D4AF37",
                    }}
                  >
                    {result.finalHe > 5 ? `${result.finalHe.toFixed(0)}%` : ""}
                  </div>
                )}
                {result.finalN2 > 0 && (
                  <div
                    className="flex items-center justify-center text-white"
                    style={{
                      width: `${result.finalN2}%`,
                      background: "#4a5568",
                    }}
                  >
                    {result.finalN2 > 5 ? `${result.finalN2.toFixed(0)}%` : ""}
                  </div>
                )}
              </div>
              <div className="flex gap-4 mt-2 text-xs">
                <div className="flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ background: "#1a6cb5" }}
                  />
                  <span className="text-muted-foreground">
                    O\u2082 {result.finalO2.toFixed(1)}%
                  </span>
                </div>
                {result.finalHe > 0 && (
                  <div className="flex items-center gap-1">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ background: "#D4AF37" }}
                    />
                    <span className="text-muted-foreground">
                      He {result.finalHe.toFixed(1)}%
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ background: "#4a5568" }}
                  />
                  <span className="text-muted-foreground">
                    N\u2082 {result.finalN2.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              {result.P_He_add > 0 && (
                <ResultRow
                  label="He to add"
                  value={`${result.P_He_add.toFixed(1)} bar`}
                  sub={`${result.V_He.toFixed(1)} L`}
                  color="text-gold"
                />
              )}
              <ResultRow
                label="O\u2082 to add"
                value={`${result.P_O2_add.toFixed(1)} bar`}
                sub={`${result.V_O2.toFixed(1)} L`}
                color="text-blue-400"
              />
              <ResultRow
                label="Air to add"
                value={`${result.P_air_add.toFixed(1)} bar`}
                sub={`${result.V_air.toFixed(1)} L`}
                color="text-muted-foreground"
              />
              <ResultRow
                label="MOD @ 1.4 ppO\u2082"
                value={`${result.MOD_14.toFixed(1)} m`}
                color="text-green-400"
              />
              <ResultRow
                label="MOD @ 1.6 ppO\u2082"
                value={`${result.MOD_16.toFixed(1)} m`}
                color="text-yellow-400"
              />
              {mixType !== "air" && mixType !== "heliox" && (
                <ResultRow
                  label="EAD"
                  value={`${result.EAD.toFixed(1)} m`}
                  color="text-purple-400"
                />
              )}
              {(mixType === "trimix" || mixType === "heliox") && (
                <ResultRow
                  label="END"
                  value={`${result.END.toFixed(1)} m`}
                  color="text-orange-400"
                />
              )}
            </div>
          </CardContent>
        </Card>

        <Collapsible open={showFormulas} onOpenChange={setShowFormulas}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full border-gold/40 text-gold hover:bg-gold/10"
              data-ocid="calculator.secondary_button"
            >
              <span>Formula Reference</span>
              <ChevronDown
                className={`ml-2 w-4 h-4 transition-transform ${showFormulas ? "rotate-180" : ""}`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="bg-card border-border mt-2">
              <CardContent className="p-4 space-y-3 text-sm font-mono">
                <FormulaBlock title="Partial Pressure Blending (Dalton's Law)">
                  <div>P_total = P\u2081 + P\u2082 + P\u2083</div>
                  <div>P_gas = F_gas \u00d7 P_total</div>
                  <div className="text-muted-foreground text-xs mt-1">
                    where F_gas = fraction (0\u20131), P = pressure (bar)
                  </div>
                </FormulaBlock>
                <FormulaBlock title="Gas to Add">
                  <div>
                    P_He_add = (P_target \u00d7 F_He) \u2212 (P_current \u00d7
                    F_He_current)
                  </div>
                  <div>
                    P_O\u2082_add = (P_target \u00d7 F_O\u2082) \u2212
                    (P_current \u00d7 F_O\u2082_current)
                  </div>
                  <div>
                    P_Air_add = P_target \u2212 P_current \u2212 P_He_add \u2212
                    P_O\u2082_add
                  </div>
                </FormulaBlock>
                <FormulaBlock title="Volume at Surface (Boyle's Law)">
                  <div>V_gas = P_add \u00d7 V_tank / 10</div>
                  <div className="text-muted-foreground text-xs mt-1">
                    V_tank in liters, P in bar, result in liters at surface
                  </div>
                </FormulaBlock>
                <FormulaBlock title="Maximum Operating Depth (MOD)">
                  <div>
                    MOD = (ppO\u2082_max / F_O\u2082 \u2212 1) \u00d7 10 metres
                  </div>
                  <div className="text-muted-foreground text-xs mt-1">
                    ppO\u2082_max = 1.4 (working) or 1.6 (contingency)
                  </div>
                </FormulaBlock>
                <FormulaBlock title="Equivalent Air Depth (EAD)">
                  <div>
                    EAD = ((F_N\u2082 / 0.79) \u00d7 (depth + 10)) \u2212 10
                  </div>
                  <div className="text-muted-foreground text-xs mt-1">
                    Nitrox: depth = MOD@1.4
                  </div>
                </FormulaBlock>
                <FormulaBlock title="Equivalent Narcotic Depth (END)">
                  <div>
                    END = ((F_N\u2082 + F_O\u2082) \u00d7 (depth + 10)) \u2212
                    10
                  </div>
                  <div className="text-muted-foreground text-xs mt-1">
                    Trimix/Heliox: narcotic = O\u2082 + N\u2082
                  </div>
                </FormulaBlock>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Name this calculation..."
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                data-ocid="calculator.input"
                className="bg-input"
              />
              <Button
                onClick={() => saveMut.mutate()}
                disabled={saveMut.isPending}
                data-ocid="calculator.save_button"
                className="bg-gold text-navy hover:bg-gold/90 shrink-0"
              >
                <Save className="w-4 h-4 mr-1" /> Save
              </Button>
            </div>
          </CardContent>
        </Card>

        {savedCalcs.length > 0 && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm text-foreground">
                Saved Calculations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2" data-ocid="calculator.list">
              {savedCalcs.map((c, i) => (
                <div
                  key={c.name + String(c.timestamp)}
                  className="flex items-center justify-between p-2 rounded bg-secondary/50"
                  data-ocid={`calculator.item.${i + 1}`}
                >
                  <div className="text-sm">
                    <span className="font-medium text-foreground">
                      {c.name}
                    </span>
                    <span className="text-muted-foreground ml-2 text-xs">
                      {Number(c.tankSize)}L @ {Number(c.workingPressure)} bar
                      \u00b7 {c.mixType} \u00b7 O\u2082{" "}
                      {Number(c.oxygenPercentage)}% He{" "}
                      {Number(c.heliumPercentage)}%
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    data-ocid={`calculator.delete_button.${i + 1}`}
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteMut.mutate(BigInt(i))}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  sub,
  color,
}: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="bg-secondary/50 rounded-md p-3">
      <div className="text-muted-foreground text-xs mb-1">{label}</div>
      <div className={`font-bold text-base ${color || "text-foreground"}`}>
        {value}
      </div>
      {sub && <div className="text-muted-foreground text-xs">{sub}</div>}
    </div>
  );
}

function FormulaBlock({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-gold text-xs font-semibold mb-1 not-italic">
        {title}
      </div>
      <div className="bg-secondary/60 rounded p-2 space-y-0.5 text-foreground/80">
        {children}
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          Gas Mixture Calculator
        </h1>
        <p className="text-muted-foreground">
          Partial pressure blending calculations using Dalton's Law. All
          formulas shown for verification.
        </p>
      </div>
      <Tabs defaultValue="nitrox" data-ocid="calculator.tab">
        <TabsList className="mb-6 bg-secondary">
          <TabsTrigger value="air" data-ocid="calculator.tab">
            Air
          </TabsTrigger>
          <TabsTrigger value="nitrox" data-ocid="calculator.tab">
            Nitrox (EANx)
          </TabsTrigger>
          <TabsTrigger value="trimix" data-ocid="calculator.tab">
            Trimix
          </TabsTrigger>
          <TabsTrigger value="heliox" data-ocid="calculator.tab">
            Heliox
          </TabsTrigger>
        </TabsList>
        <TabsContent value="air">
          <CalcForm
            label="Air"
            mixType="air"
            defaultO2={21}
            defaultHe={0}
            minO2={21}
            maxO2={21}
            maxHe={0}
            presets={[{ label: "Air 21%", o2: 21, he: 0 }]}
          />
        </TabsContent>
        <TabsContent value="nitrox">
          <CalcForm
            label="Nitrox"
            mixType="nitrox"
            defaultO2={32}
            defaultHe={0}
            minO2={21}
            maxO2={40}
            maxHe={0}
            presets={[
              { label: "Air 21%", o2: 21, he: 0 },
              { label: "EANx32", o2: 32, he: 0 },
              { label: "EANx36", o2: 36, he: 0 },
              { label: "EANx40", o2: 40, he: 0 },
            ]}
          />
        </TabsContent>
        <TabsContent value="trimix">
          <CalcForm
            label="Trimix"
            mixType="trimix"
            defaultO2={21}
            defaultHe={35}
            minO2={18}
            maxO2={25}
            maxHe={60}
            showHe
            presets={[
              { label: "21/35", o2: 21, he: 35 },
              { label: "18/45", o2: 18, he: 45 },
              { label: "15/55", o2: 15, he: 55 },
            ]}
          />
        </TabsContent>
        <TabsContent value="heliox">
          <CalcForm
            label="Heliox"
            mixType="heliox"
            defaultO2={16}
            defaultHe={84}
            minO2={16}
            maxO2={21}
            maxHe={84}
            showHe
            heAuto
            presets={[
              { label: "16/84", o2: 16, he: 84 },
              { label: "18/82", o2: 18, he: 82 },
              { label: "21/79", o2: 21, he: 79 },
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
