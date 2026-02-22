// NPD Engine - Ported from Python

export type BrandName = "Man Matters" | "Be Bodywise" | "Little Joys";

export interface NovelPivot {
  conceptName: string;
  ingredients: string[];
}

export interface BrandLogic {
  categories: string[];
  pains: Record<string, string[]>;
  novelPivots: Record<string, NovelPivot>;
}

export interface ProductBrief {
  conceptName: string;
  whiteSpace: string;
  signalStrength: number;
  noveltyRationale: string;
  ingredients: string[];
  citation: string;
}

export interface AnalysisResult {
  brand: BrandName;
  briefs: ProductBrief[];
  noData: boolean;
}

export const BRAND_LOGIC: Record<BrandName, BrandLogic> = {
  "Man Matters": {
    categories: ["Hair", "Performance", "Beard"],
    pains: {
      "Hard Water Hairfall": ["hard water", "hair fall", "thinning", "receding", "scalp"],
      "Performance Stamina": ["stamina", "energy", "workout", "fatigue", "gym"],
      "Patchy Beard": ["patchy", "beard growth", "stubble", "itchy"],
    },
    novelPivots: {
      "Hard Water Hairfall": { conceptName: "Chelating Scalp Mist", ingredients: ["Redensyl", "Procapil", "EDTA"] },
      "Performance Stamina": { conceptName: "Effervescent Shilajit Tablets", ingredients: ["Fulvic Acid", "Ashwagandha"] },
      "Patchy Beard": { conceptName: "Beard Growth Activator Gel", ingredients: ["BeardMax", "Clover Oil"] },
    },
  },
  "Be Bodywise": {
    categories: ["Skin", "PCOS", "Body Care"],
    pains: {
      "Hormonal Acne": ["acne", "pcos", "pimple", "hormonal", "breakout"],
      "Humidity Greasiness": ["oily", "greasy", "sweat", "sticky", "humidity"],
      "Strawberry Skin": ["bumpy", "ingrown", "strawberry skin", "rough"],
    },
    novelPivots: {
      "Hormonal Acne": { conceptName: "Aczero-Powered Skin Clarifying Gummies", ingredients: ["Inositol", "Niacinamide"] },
      "Humidity Greasiness": { conceptName: "Invisible Weightless Sun-Gel", ingredients: ["Salicylic Acid", "SPF 50"] },
      "Strawberry Skin": { conceptName: "Lactic Acid Body Peel Mist", ingredients: ["Urea", "Lactic Acid"] },
    },
  },
  "Little Joys": {
    categories: ["Kids Nutrition", "Moms Health"],
    pains: {
      "Picky Eating": ["picky", "growth", "height", "appetite", "weight gain"],
      "Post-partum Fatigue": ["mom", "lactation", "post-partum", "delivery", "energy"],
      "Sugar Concerns": ["sugar", "sweet", "unhealthy", "cavity", "chocolate"],
    },
    novelPivots: {
      "Picky Eating": { conceptName: "Nutrimix with DigeZyme & Millets", ingredients: ["Ragi", "Bajra", "Probiotics"] },
      "Post-partum Fatigue": { conceptName: "Shatavari & Iron Recovery Shake", ingredients: ["Shatavari", "Folic Acid"] },
      "Sugar Concerns": { conceptName: "Jaggery-based Vitamin Gummies", ingredients: ["DHA", "Vitamin D3"] },
    },
  },
};

/**
 * Dynamically find the content and impact columns from CSV headers.
 */
function detectColumns(headers: string[]): { contentCol: string | null; impactCol: string | null } {
  const contentKeywords = ["body", "text", "comment", "review", "content", "title", "selftext", "description"];
  const impactKeywords = ["score", "upvotes", "likes", "ups", "votes", "points"];

  const lower = headers.map((h) => h.toLowerCase().trim());

  let contentCol: string | null = null;
  let impactCol: string | null = null;

  for (let i = 0; i < lower.length; i++) {
    if (!contentCol && contentKeywords.some((k) => lower[i].includes(k))) {
      contentCol = headers[i];
    }
    if (!impactCol && impactKeywords.some((k) => lower[i].includes(k))) {
      impactCol = headers[i];
    }
  }

  return { contentCol, impactCol };
}

/**
 * Parse CSV text into rows.
 */
export function parseCSV(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];

  // Simple CSV parser handling quoted fields
  function parseLine(line: string): string[] {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    result.push(current.trim());
    return result;
  }

  const headers = parseLine(lines[0]);
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseLine(lines[i]);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || "";
    });
    rows.push(row);
  }
  return rows;
}

/**
 * Run the NPD analysis for the selected brand on the parsed CSV data.
 */
export function runAnalysis(brand: BrandName, rows: Record<string, string>[]): AnalysisResult {
  const logic = BRAND_LOGIC[brand];
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];
  const { contentCol, impactCol } = detectColumns(headers);

  const scores: Record<string, number> = {};
  const citations: Record<string, { text: string; score: number }[]> = {};

  for (const row of rows) {
    // Build the text to search — prefer detected content column, fallback to all values
    const text = contentCol
      ? (row[contentCol] || "").toLowerCase()
      : Object.values(row).join(" ").toLowerCase();

    const impact = impactCol ? parseInt(row[impactCol] || "1", 10) || 1 : 1;

    for (const [painLabel, keywords] of Object.entries(logic.pains)) {
      if (keywords.some((k) => text.includes(k))) {
        scores[painLabel] = (scores[painLabel] || 0) + impact;
        if (!citations[painLabel]) citations[painLabel] = [];
        citations[painLabel].push({
          text: (contentCol ? row[contentCol] : Object.values(row).join(" ")).slice(0, 200),
          score: impact,
        });
      }
    }
  }

  // Sort citations by score descending and keep top ones
  for (const key of Object.keys(citations)) {
    citations[key].sort((a, b) => b.score - a.score);
  }

  const sortedPains = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 10);

  if (sortedPains.length === 0) {
    return { brand, briefs: [], noData: true };
  }

  const briefs: ProductBrief[] = sortedPains.map(([painLabel, score]) => {
    const pivot = logic.novelPivots[painLabel];
    const topCitation = citations[painLabel]?.[0]?.text || "N/A";
    const format = pivot.conceptName.split(" ").pop() || "format";

    return {
      conceptName: pivot.conceptName,
      whiteSpace: painLabel,
      signalStrength: score,
      noveltyRationale: `Pivoting from standard formats to a localized ${format} to improve compliance and address the "${painLabel}" friction discovered in consumer data.`,
      ingredients: pivot.ingredients,
      citation: topCitation,
    };
  });

  return { brand, briefs, noData: false };
}
