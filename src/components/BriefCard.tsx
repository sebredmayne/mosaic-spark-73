import { ProductBrief, BrandName } from "@/lib/npd-engine";
import { FlaskConical, Quote, Target, User, Tag, TrendingUp, Swords, Beaker, Sparkles } from "lucide-react";

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
  brief: ProductBrief;
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
            {brief.isExploratory && (
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                Exploratory
              </span>
            )}
          </div>
          <h3 className="font-display text-lg font-bold text-foreground leading-tight">
            {brief.conceptName}
          </h3>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${brandBadgeMap[brand]}`}>
            <TrendingUp className="inline w-3 h-3 mr-1 -mt-0.5" />
            {brief.innovationScore}/10
          </span>
          {brief.signalStrength > 0 && (
            <span className="text-[10px] text-muted-foreground font-medium">
              Signal: {brief.signalStrength}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3.5">
        {/* Target Consumer */}
        <Row icon={User} label="Target Consumer" accentClass={brandAccentMap[brand]}>
          <p className="text-sm text-foreground/85">{brief.persona}</p>
        </Row>

        {/* White Space */}
        <Row icon={Target} label="White Space" accentClass={brandAccentMap[brand]}>
          <p className="text-sm text-foreground">{brief.whiteSpace}</p>
        </Row>

        {/* Format & Formulation */}
        <Row icon={Beaker} label="Format & Formulation" accentClass={brandAccentMap[brand]}>
          <p className="text-sm text-foreground/85">
            <span className="font-semibold">{brief.format}</span> — {brief.ingredients.join(", ")}
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
