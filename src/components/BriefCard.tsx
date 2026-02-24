import { Brief, BrandName } from "@/lib/npd-engine";
import { FlaskConical, Quote, Target, User, Tag, TrendingUp, Swords, Beaker, CheckCircle, AlertTriangle } from "lucide-react";

const brandGlassMap: Record<BrandName, string> = {
  "Man Matters": "border-l-brand-mm bg-gradient-to-br from-brand-mm-light/80 to-card/90",
  "Be Bodywise": "border-l-brand-bw bg-gradient-to-br from-brand-bw-light/80 to-card/90",
  "Little Joys": "border-l-brand-lj bg-gradient-to-br from-brand-lj-light/80 to-card/90",
};

const brandAccentMap: Record<BrandName, string> = {
  "Man Matters": "text-brand-mm",
  "Be Bodywise": "text-brand-bw",
  "Little Joys": "text-brand-lj",
};

const brandBadgeMap: Record<BrandName, string> = {
  "Man Matters": "bg-brand-mm text-brand-mm-foreground",
  "Be Bodywise": "bg-brand-bw text-brand-bw-foreground",
  "Little Joys": "bg-brand-lj text-brand-lj-foreground",
};

interface BriefCardProps {
  brief: Brief;
  brand: BrandName;
  index: number;
}

export default function BriefCard({ brief, brand, index }: BriefCardProps) {
  return (
    <div
      className={`relative rounded-2xl border border-border/50 border-l-4 ${brandGlassMap[brand]} p-6 opacity-0 animate-fade-in-up backdrop-blur-md shadow-sm hover:shadow-lg transition-all duration-300`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {brief.isDecisionReady && (
              <span className="text-[10px] uppercase tracking-widest font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Decision Ready
              </span>
            )}
            {brief.isLowSignal && (
              <span className="text-[10px] uppercase tracking-widest font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Low Signal — R&D Required
              </span>
            )}
          </div>
          <h3 className="font-display text-lg font-bold text-foreground leading-tight">
            {brief.dynamicName}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">ref: {brief.conceptName}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${brief.isDecisionReady ? "bg-emerald-500 text-white" : brandBadgeMap[brand]}`}>
            <TrendingUp className="inline w-3 h-3 mr-1 -mt-0.5" />
            {brief.score}/10
          </span>
        </div>
      </div>

      <div className="space-y-3.5">
        {/* Target Consumer */}
        <Row icon={User} label="Target Consumer" accentClass={brandAccentMap[brand]}>
          <p className="text-sm text-foreground/85">{brief.targetConsumer}</p>
        </Row>

        {/* White Space */}
        <Row icon={Target} label="White Space" accentClass={brandAccentMap[brand]}>
          <p className="text-sm text-foreground">{brief.whiteSpace}</p>
        </Row>

        {/* Format & Formulation */}
        <Row icon={Beaker} label="Format & Formulation" accentClass={brandAccentMap[brand]}>
          <p className="text-sm text-foreground/85">
            <span className="font-semibold">{brief.formatFormulation}</span> — {brief.ingredients.join(", ")}
          </p>
        </Row>

        {/* Price Point */}
        <Row icon={Tag} label="Suggested MRP" accentClass={brandAccentMap[brand]}>
          <p className="text-sm font-semibold text-foreground">{brief.mrpRange}</p>
        </Row>

        {/* Competitive Positioning */}
        <Row icon={Swords} label="Competitive Positioning" accentClass={brandAccentMap[brand]}>
          <p className="text-sm text-foreground/80">{brief.positioning}</p>
        </Row>

        {/* Consumer Evidence */}
        <Row icon={Quote} label="Consumer Evidence" accentClass={brandAccentMap[brand]}>
          <p className="text-sm text-foreground/75 italic line-clamp-2">"{brief.citation}"</p>
        </Row>

        {/* Active Ingredients pills */}
        <Row icon={FlaskConical} label="Active Ingredients" accentClass={brandAccentMap[brand]}>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {brief.ingredients.map((ing) => (
              <span
                key={ing}
                className="text-xs px-2 py-0.5 rounded-md bg-muted/80 text-muted-foreground font-medium backdrop-blur-sm"
              >
                {ing}
              </span>
            ))}
          </div>
        </Row>
      </div>

      {/* Evidence Panel (Audit Trail) */}
      <div className="mt-5 p-3 rounded-lg bg-muted/60 border border-border/50">
        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Audit Trail</h4>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-[10px] text-muted-foreground">Marketplace Hits</p>
            <p className="font-display font-bold text-sm text-foreground">{brief.auditTrail.marketplaceHits} Rows</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">Reddit Buzz</p>
            <p className="font-display font-bold text-sm text-foreground">{brief.auditTrail.redditBuzz} Mentions</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">Competition</p>
            <p className={`font-display font-bold text-sm ${
              brief.auditTrail.competitionDensity === "High" ? "text-destructive" :
              brief.auditTrail.competitionDensity === "Medium" ? "text-brand-lj" : "text-emerald-600"
            }`}>{brief.auditTrail.competitionDensity}</p>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-border/50">
          <p className="text-[10px] font-mono text-muted-foreground">Formula: {brief.auditTrail.formulaString}</p>
        </div>
      </div>

      {/* Glassmorphism shimmer accent */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl" />
      </div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  accentClass,
  children,
}: {
  icon: React.ElementType;
  label: string;
  accentClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${accentClass}`} />
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
        {children}
      </div>
    </div>
  );
}
