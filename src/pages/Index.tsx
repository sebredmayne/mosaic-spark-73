import { useState, useCallback } from "react";
import { BrandName, AnalysisResult, runAnalysis } from "@/lib/npd-engine";
import BrandSelector from "@/components/BrandSelector";
import CsvUploader from "@/components/CsvUploader";
import BriefCard from "@/components/BriefCard";
import { Rocket, AlertTriangle, Sparkles } from "lucide-react";

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
    // Simulate a brief processing delay for UX
    setTimeout(() => {
      const res = runAnalysis(selectedBrand, csvRows);
      setResult(res);
      setIsAnalyzing(false);
    }, 800);
  }, [selectedBrand, csvRows]);

  const canAnalyze = selectedBrand && csvRows.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-foreground flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-foreground leading-none">Mosaic Wellness</h1>
            <p className="text-xs text-muted-foreground">NPD Dynamic Discovery Engine</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Step 1: Brand */}
        <section>
          <StepHeader number={1} title="Select Brand Sector" subtitle="Choose the innovation lens for analysis" />
          <BrandSelector selected={selectedBrand} onSelect={setSelectedBrand} />
        </section>

        {/* Step 2: Upload */}
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
            {isAnalyzing ? "Analyzing…" : "Generate Innovation Pipeline"}
          </button>
        </section>

        {/* Results */}
        {result && (
          <section>
            {result.noData ? (
              <div className="rounded-xl border border-border bg-card p-8 text-center animate-fade-in-up">
                <AlertTriangle className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                <h3 className="font-display text-lg font-bold text-foreground mb-1">No Specific Gaps Found</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  No specific gaps found for <strong>{result.brand}</strong> in this dataset.
                  Try uploading data with more consumer reviews related to {result.brand} categories,
                  or consider "Adjacent Opportunities" based on general wellness trends.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">Innovation Pipeline</h2>
                    <p className="text-sm text-muted-foreground">
                      {result.briefs.length} concepts generated for {result.brand} · Source: {csvName}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {result.briefs.map((brief, i) => (
                    <BriefCard key={brief.conceptName} brief={brief} brand={result.brand} index={i} />
                  ))}
                </div>
              </>
            )}
          </section>
        )}
      </main>
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
