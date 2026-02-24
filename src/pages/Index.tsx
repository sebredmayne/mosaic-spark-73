import { useState, useCallback } from "react";
import { BrandName, AnalysisResult, runAnalysis, generateExecutiveSummary, generateMarkdownReport } from "@/lib/npd-engine";
import BrandSelector from "@/components/BrandSelector";
import CsvUploader from "@/components/CsvUploader";
import BriefCard from "@/components/BriefCard";
import { Rocket, AlertTriangle, Sparkles, Database, ScanSearch, Zap, Download, Shield, BarChart3, Star, FileCheck } from "lucide-react";

export default function Index() {
  const [selectedBrand, setSelectedBrand] = useState<BrandName | null>(null);
  const [csvRows, setCsvRows] = useState<Record<string, string>[]>([]);
  const [csvName, setCsvName] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDataLoaded = useCallback((rows: Record<string, string>[], fileName: string) => {
    setCsvRows(rows);
    setCsvName(fileName);
    setResult(null);
  }, []);

  const handleAnalyze = useCallback(() => {
    if (!selectedBrand || csvRows.length === 0) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const res = runAnalysis(selectedBrand, csvRows);
      setResult(res);
      setIsAnalyzing(false);
    }, 800);
  }, [selectedBrand, csvRows]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const md = generateMarkdownReport(result);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.brand.replace(/\s+/g, "_")}_NPD_Report.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [result]);

  const canAnalyze = selectedBrand && csvRows.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-foreground flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-foreground leading-none">Mosaic Wellness</h1>
            <p className="text-xs text-muted-foreground">NPD Decision Engine · Audit Grade · 2026</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* Step 1 */}
        <section>
          <StepHeader number={1} title="Select Brand Sector" subtitle="Choose the innovation lens for analysis" />
          <BrandSelector selected={selectedBrand} onSelect={setSelectedBrand} />
        </section>

        {/* Step 2 */}
        <section>
          <StepHeader number={2} title="Upload Consumer Data" subtitle="CSV with consumer reviews, Reddit posts, or survey responses" />
          <CsvUploader onDataLoaded={handleDataLoaded} />
        </section>

        {/* Step 3: Analyze */}
        <section className="flex justify-center">
          <button
            onClick={handleAnalyze}
            disabled={!canAnalyze || isAnalyzing}
            className={`inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-display font-semibold text-base transition-all duration-200 ${
              canAnalyze
                ? "bg-foreground text-background hover:opacity-90 shadow-lg hover:shadow-xl active:scale-[0.98]"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            <Rocket className={`w-5 h-5 ${isAnalyzing ? "animate-bounce" : ""}`} />
            {isAnalyzing ? "Analyzing…" : "Generate Decision Pipeline"}
          </button>
        </section>

        {/* Results */}
        {result && (
          <section className="space-y-8 animate-fade-in-up">
            {result.noData ? (
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <AlertTriangle className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                <h3 className="font-display text-lg font-bold text-foreground mb-1">No Specific Gaps Found</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  No specific gaps found for <strong>{result.brand}</strong> in this dataset.
                </p>
              </div>
            ) : (
              <>
                {/* Data Intelligence Bar */}
                <div className="rounded-xl border border-border bg-card/80 backdrop-blur-md p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatPill icon={Database} label="Datasets Analyzed" value={result.stats.datasetsAnalyzed} />
                    <StatPill icon={ScanSearch} label="Rows Scanned" value={result.stats.totalRows.toLocaleString()} />
                    <StatPill icon={Zap} label="High-Intensity Gaps" value={result.stats.highIntensityGaps} />
                  </div>
                </div>

                {/* Pipeline header + download */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">Decision Pipeline</h2>
                    <p className="text-sm text-muted-foreground">
                      {result.briefs.length} concepts for {result.brand} · Source: {csvName}
                    </p>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background font-display font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                </div>

                {/* Strategic Lanes Sections */}
                <StrategicLanes result={result} csvName={csvName} />

                {/* Executive Summary (Audit Grade) */}
                <ExecutiveSummary result={result} />
              </>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

/* --- Sub-components --- */

function StrategicLane({ title, subtitle, icon, items, brand, emptyText }: { 
  title: string; 
  subtitle: string; 
  icon: string; 
  items: any[]; 
  brand: BrandName; 
  emptyText?: string; 
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <h2 className="font-display text-xl font-bold text-foreground">{title}</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">{subtitle}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length > 0 ? (
          items.map((brief, idx) => (
            <BriefCard key={brief.conceptName + brief.dynamicName + idx} brief={brief} brand={brand} index={idx} />
          ))
        ) : (
          <div className="col-span-full p-8 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center bg-muted/30 text-center">
            <p className="text-sm text-muted-foreground italic">{emptyText || "No Gaps Identified in this lane."}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StrategicLanes({ result, csvName }: { result: AnalysisResult; csvName: string }) {
  const innovationBriefs = result.briefs.filter(b => b.swimlane === 'high-signal' && !b.isLowSignal);
  const loveMarkBriefs = result.briefs.filter(b => b.swimlane === 'competitor-lovemark' && !b.isLowSignal);
  const v2Briefs = result.briefs.filter(b => b.swimlane === 'v2-optimization' && !b.isLowSignal);
  const lowSignalBriefs = result.briefs.filter(b => b.isLowSignal === true);

  return (
    <div className="space-y-10">
      <StrategicLane 
        icon="🚀"
        title="High-Signal Innovation"
        subtitle="White space with no portfolio overlap; blue-ocean opportunities."
        items={innovationBriefs}
        brand={result.brand}
      />

      <StrategicLane 
        icon="🎯"
        title="Competitor Love-Mark Gaps"
        subtitle="Winning competitor formats we haven't launched; science repackaged for market share."
        items={loveMarkBriefs}
        brand={result.brand}
      />

      <StrategicLane 
        icon="🔧"
        title="Portfolio V2 Optimization"
        subtitle="High overlap with current SKUs; fix friction or improve dosage via V2 iterations."
        items={v2Briefs}
        brand={result.brand}
      />

      <hr className="my-12 border-border" />

      <div className="bg-muted/50 p-8 rounded-2xl border border-border">
        <div className="mb-6">
          <h2 className="font-display text-lg font-bold text-foreground">Audit: Low Priority</h2>
          <p className="text-sm text-muted-foreground">Low-signal or trend-only concepts flagged to prevent premature R&D spend.</p>
        </div>
        {lowSignalBriefs.length === 0 ? (
          <div className="p-6 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center bg-card/50">
            <p className="text-sm text-muted-foreground italic">No low-priority items</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowSignalBriefs.map((brief, idx) => (
              <div key={brief.conceptName + idx} className="opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <BriefCard brief={brief} brand={result.brand} index={idx} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StepHeader({ number, title, subtitle }: { number: number; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-foreground text-background text-xs font-bold font-display">
        {number}
      </span>
      <div>
        <h2 className="font-display text-base font-bold text-foreground leading-none">{title}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

function StatPill({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
      <div className="w-9 h-9 rounded-lg bg-foreground/10 flex items-center justify-center">
        <Icon className="w-4.5 h-4.5 text-foreground" />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{label}</p>
        <p className="font-display text-lg font-bold text-foreground leading-tight">{value}</p>
      </div>
    </div>
  );
}

function ExecutiveSummary({ result }: { result: AnalysisResult }) {
  const summary = generateExecutiveSummary(result);

  return (
    <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-md p-8 space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
        <Star className="w-5 h-5 text-brand-lj" />
        Strategic Executive Summary (Audit Grade)
      </h2>

      <div className="space-y-5">
        <SummaryBlock icon={FileCheck} title="Data Integrity" text={summary.dataIntegrity} />
        <SummaryBlock icon={BarChart3} title="Opportunity Score Logic" text={summary.opportunityLogic} />
        <SummaryBlock icon={Shield} title="Format Compliance" text={summary.formatCompliance} />
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-foreground" />
            <h3 className="font-display text-sm font-bold text-foreground">High-Priority for Immediate R&D</h3>
          </div>
          <ul className="space-y-1.5 ml-6">
            {summary.highPriority.map((item, i) => (
              <li key={i} className="text-sm text-foreground/85 list-disc">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SummaryBlock({ icon: Icon, title, text }: { icon: React.ElementType; title: string; text: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className="w-4 h-4 text-foreground" />
        <h3 className="font-display text-sm font-bold text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed ml-6">{text}</p>
    </div>
  );
}
