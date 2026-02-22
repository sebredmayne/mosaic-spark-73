import { ProductBrief, BrandName } from "@/lib/npd-engine";
import { FlaskConical, Quote, Lightbulb, BarChart3, Target } from "lucide-react";

const brandColorMap: Record<BrandName, string> = {
  "Man Matters": "border-l-brand-mm",
  "Be Bodywise": "border-l-brand-bw",
  "Little Joys": "border-l-brand-lj",
};

const brandBadgeMap: Record<BrandName, string> = {
  "Man Matters": "bg-brand-mm-light text-foreground",
  "Be Bodywise": "bg-brand-bw-light text-foreground",
  "Little Joys": "bg-brand-lj-light text-foreground",
};

interface BriefCardProps {
  brief: ProductBrief;
  brand: BrandName;
  index: number;
}

export default function BriefCard({ brief, brand, index }: BriefCardProps) {
  return (
    <div
      className={`bg-card rounded-xl border border-border border-l-4 ${brandColorMap[brand]} p-6 opacity-0 animate-fade-in-up shadow-sm hover:shadow-md transition-shadow`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="font-display text-lg font-bold text-foreground leading-tight">
          {brief.conceptName}
        </h3>
        <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${brandBadgeMap[brand]}`}>
          <BarChart3 className="inline w-3 h-3 mr-1 -mt-0.5" />
          {brief.signalStrength}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <Target className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">White Space</p>
            <p className="text-sm text-foreground">{brief.whiteSpace}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Quote className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Consumer Signal</p>
            <p className="text-sm text-foreground/80 italic line-clamp-2">"{brief.citation}"</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Lightbulb className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Novelty Rationale</p>
            <p className="text-sm text-foreground/80">{brief.noveltyRationale}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <FlaskConical className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Active Ingredients</p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {brief.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
