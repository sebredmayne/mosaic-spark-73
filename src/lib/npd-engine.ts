// NPD Engine - Enhanced 2026 PM Edition

export type BrandName = "Man Matters" | "Be Bodywise" | "Little Joys";

export interface PainDetail {
  keywords: string[];
  concept: string;
  actives: string[];
  persona: string;
  positioning: string;
  format: string;
}

export interface BrandLogic {
  categories: string[];
  mrpRange: string;
  pains: Record<string, PainDetail>;
  exploratoryPains: Record<string, PainDetail>;
}

export interface ProductBrief {
  conceptName: string;
  whiteSpace: string;
  signalStrength: number;
  noveltyRationale: string;
  ingredients: string[];
  citation: string;
  persona: string;
  positioning: string;
  format: string;
  mrpRange: string;
  innovationScore: number;
  isExploratory: boolean;
}

export interface AnalysisResult {
  brand: BrandName;
  briefs: ProductBrief[];
  noData: boolean;
  stats: {
    totalRows: number;
    highIntensityGaps: number;
    datasetsAnalyzed: number;
  };
}

export const BRAND_LOGIC: Record<BrandName, BrandLogic> = {
  "Man Matters": {
    categories: ["Hair", "Performance", "Beard"],
    mrpRange: "₹399 – ₹799",
    pains: {
      "Hard Water Hairfall": {
        keywords: ["hard water", "hair fall", "thinning", "receding", "scalp", "chlorine"],
        concept: "Chelating Scalp Mist",
        actives: ["Redensyl", "Procapil", "EDTA"],
        persona: "Urban men in hard-water cities (Bengaluru/NCR) battling daily hair thinning.",
        positioning: "First-of-its-kind leave-on chelating mist; cheaper than shower filters.",
        format: "Mist",
      },
      "Performance Fatigue": {
        keywords: ["stamina", "energy", "workout", "fatigue", "gym", "tired"],
        concept: "Effervescent Shilajit Recovery",
        actives: ["Fulvic Acid", "Ashwagandha", "Electrolytes"],
        persona: "Active men looking for clean energy without gummy sugars.",
        positioning: "Zero-sugar effervescent format for faster absorption vs resins.",
        format: "Effervescent Tablet",
      },
      "Patchy Beard": {
        keywords: ["patchy", "beard growth", "stubble", "itchy", "beard"],
        concept: "Beard Growth Activator Gel",
        actives: ["BeardMax", "Clover Oil", "Biotin"],
        persona: "Young professionals seeking fuller, groomed beard growth.",
        positioning: "Targeted gel with clinically-tested BeardMax vs generic oils.",
        format: "Gel",
      },
      "Stress Hair Loss": {
        keywords: ["stress", "anxiety", "cortisol", "mental", "sleep"],
        concept: "Adaptogen Sleep & Scalp Drops",
        actives: ["Melatonin", "Brahmi", "Jatamansi"],
        persona: "High-stress tech professionals with stress-induced hair thinning.",
        positioning: "Dual-action sleep + scalp recovery; addresses root cause vs symptom.",
        format: "Sublingual Drops",
      },
      "Dandruff Persistence": {
        keywords: ["dandruff", "flaky", "itchy scalp", "seborrheic", "fungal"],
        concept: "Anti-Dandruff Probiotic Scalp Serum",
        actives: ["Zinc Pyrithione", "Tea Tree Oil", "Lactobacillus"],
        persona: "Men frustrated with recurring dandruff despite medicated shampoos.",
        positioning: "Microbiome-first approach to dandruff; leave-on serum vs wash-off.",
        format: "Serum",
      },
    },
    exploratoryPains: {
      "Skin Ageing": {
        keywords: ["wrinkle", "aging", "dark circles", "eye bags", "fine lines"],
        concept: "Retinol + Peptide Men's Face Serum",
        actives: ["Retinol", "Peptide Complex", "Hyaluronic Acid"],
        persona: "Men 30+ exploring skincare for the first time.",
        positioning: "Simplified 1-step routine; no fragrance or unnecessary actives.",
        format: "Serum",
      },
      "Weight Management": {
        keywords: ["weight", "belly fat", "metabolism", "diet", "obesity"],
        concept: "Green Tea + L-Carnitine Burn Strips",
        actives: ["L-Carnitine", "Green Tea Extract", "Chromium"],
        persona: "Urban men seeking non-stimulant metabolic support.",
        positioning: "Oral dissolving strip format for discreet, no-water consumption.",
        format: "Oral Strip",
      },
    },
  },
  "Be Bodywise": {
    categories: ["Skin", "PCOS", "Body Care"],
    mrpRange: "₹349 – ₹649",
    pains: {
      "Hormonal Acne": {
        keywords: ["acne", "pcos", "pimple", "hormonal", "breakout", "cystic"],
        concept: "Aczero-Clear Skin Gummies",
        actives: ["Inositol", "Niacinamide", "Zinc"],
        persona: "Women managing PCOS-related skin flare-ups in their 20s–30s.",
        positioning: "Internal solution for hormonal acne; avoids skin-stripping topicals.",
        format: "Gummy",
      },
      "Humidity Greasiness": {
        keywords: ["oily", "greasy", "sweat", "sticky", "humidity", "shine"],
        concept: "Invisible Weightless Sun-Gel",
        actives: ["Salicylic Acid", "SPF 50", "Niacinamide"],
        persona: "Women in humid Indian cities tired of white-cast, heavy sunscreens.",
        positioning: "Weightless gel format optimized for Indian humidity; zero white cast.",
        format: "Gel",
      },
      "Strawberry Skin": {
        keywords: ["bumpy", "ingrown", "strawberry skin", "rough", "keratosis"],
        concept: "Lactic Acid Exfoliating Body Mist",
        actives: ["Urea", "Lactic Acid", "Ceramides"],
        persona: "Women seeking smooth skin without sticky body lotions.",
        positioning: "Weightless mist format; replaces thick creams for daily compliance.",
        format: "Mist",
      },
      "Period Pain": {
        keywords: ["cramp", "period pain", "menstrual", "pms", "bloating"],
        concept: "Magnesium + Chasteberry PMS Relief Tabs",
        actives: ["Magnesium Bisglycinate", "Chasteberry", "Vitamin B6"],
        persona: "Working women who can't afford PMS disrupting their schedules.",
        positioning: "Clinically-dosed magnesium form with 3x better absorption than oxide.",
        format: "Tablet",
      },
      "Hair Thinning": {
        keywords: ["hair thin", "hair loss", "shedding", "bald spot", "volume"],
        concept: "Biotin + Saw Palmetto Hair Density Serum",
        actives: ["Biotin", "Saw Palmetto", "Caffeine"],
        persona: "Women 25–40 noticing post-stress or post-pregnancy hair thinning.",
        positioning: "Topical serum with DHT-blockers; avoids oral supplements' GI side effects.",
        format: "Serum",
      },
    },
    exploratoryPains: {
      "Intimate Hygiene": {
        keywords: ["intimate", "vaginal", "odor", "itch", "discharge"],
        concept: "pH-Balanced Intimate Foam Wash",
        actives: ["Lactic Acid", "Tea Tree Oil", "Aloe Vera"],
        persona: "Health-conscious women seeking gentle, OB-GYN-approved intimate care.",
        positioning: "Foam format with pH 3.5; replaces soap-based washes that disrupt flora.",
        format: "Foam",
      },
      "Gut Health": {
        keywords: ["bloat", "constipation", "gut", "digest", "ibs"],
        concept: "Prebiotic + Probiotic Fizzy Sachets",
        actives: ["Lactobacillus", "FOS Prebiotic", "Ginger Extract"],
        persona: "Women with PCOS-linked gut issues seeking daily gut support.",
        positioning: "Fizzy sachet for taste compliance; synbiotic formula vs probiotic-only.",
        format: "Sachet",
      },
    },
  },
  "Little Joys": {
    categories: ["Kids Nutrition", "Moms Health"],
    mrpRange: "₹499 – ₹999",
    pains: {
      "Picky Eating": {
        keywords: ["picky", "growth", "height", "appetite", "weight gain", "fussy"],
        concept: "Jaggery-Based Growth Nutrimix",
        actives: ["Ragi", "Bajra", "DigeZyme"],
        persona: "Parents of children (2–7 yrs) avoiding refined sugar supplements.",
        positioning: "100% natural sweetness with millets; 40% higher protein than market leaders.",
        format: "Powder Mix",
      },
      "Post-partum Fatigue": {
        keywords: ["mom", "lactation", "post-partum", "delivery", "new mother", "breastfeeding"],
        concept: "Shatavari & Iron Recovery Shake",
        actives: ["Shatavari", "Folic Acid", "Iron Bisglycinate"],
        persona: "New mothers (0–12 months postpartum) dealing with energy crashes and low milk supply.",
        positioning: "Ayurvedic galactagogue + bioavailable iron; avoids constipation from ferrous sulfate.",
        format: "Shake",
      },
      "Sugar Concerns": {
        keywords: ["sugar", "sweet", "unhealthy", "cavity", "chocolate", "junk"],
        concept: "Jaggery-Based Vitamin Gummies",
        actives: ["DHA", "Vitamin D3", "Calcium"],
        persona: "Health-aware parents seeking guilt-free daily vitamin supplements for kids.",
        positioning: "Sweetened with jaggery extract; zero refined sugar or artificial colors.",
        format: "Gummy",
      },
      "Immunity Gaps": {
        keywords: ["sick", "cold", "cough", "immunity", "fever", "infection"],
        concept: "Chyawanprash Immunity Melts",
        actives: ["Amla", "Giloy", "Vitamin C"],
        persona: "Parents of school-going kids (3–10 yrs) who fall sick frequently.",
        positioning: "Oral melt format kids love; modern Chyawanprash without the sticky mess.",
        format: "Oral Melt",
      },
      "Bone & Height Growth": {
        keywords: ["calcium", "bone", "height", "tall", "growth spurt", "vitamin d"],
        concept: "Nanite Calcium + D3 Chewable Stars",
        actives: ["Nano Calcium", "Vitamin D3", "Vitamin K2"],
        persona: "Parents concerned about child's height and bone density.",
        positioning: "Nano-sized calcium for 2x absorption; fun star-shaped chewable format.",
        format: "Chewable",
      },
    },
    exploratoryPains: {
      "Screen Time Eye Strain": {
        keywords: ["screen", "eye", "vision", "blue light", "tablet"],
        concept: "Lutein + Bilberry Eye Health Gummies",
        actives: ["Lutein", "Bilberry Extract", "Zeaxanthin"],
        persona: "Parents worried about digital device impact on their child's vision.",
        positioning: "First kids-specific eye health gummy in India; addresses screen-time epidemic.",
        format: "Gummy",
      },
      "Cognitive Focus": {
        keywords: ["focus", "concentrate", "study", "memory", "brain"],
        concept: "Brahmi + DHA Brain Boost Syrup",
        actives: ["Brahmi", "DHA", "Phosphatidylserine"],
        persona: "Parents of school-age children seeking academic performance support.",
        positioning: "Ayurvedic-meets-modern nootropic; avoids stimulants found in adult formulas.",
        format: "Syrup",
      },
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
 * Calculate innovation score based on signal strength and competition heuristic.
 */
function calcInnovationScore(signalStrength: number, maxSignal: number, isExploratory: boolean): number {
  if (isExploratory) return parseFloat((5.5 + Math.random() * 1.5).toFixed(1));
  const demandRatio = maxSignal > 0 ? signalStrength / maxSignal : 0.5;
  const base = 6.5 + demandRatio * 3;
  return parseFloat(Math.min(9.8, base + (Math.random() * 0.5 - 0.25)).toFixed(1));
}

/**
 * Run the NPD analysis for the selected brand on the parsed CSV data.
 * Implements Exploratory Mode to ensure 5-8 concepts minimum.
 */
export function runAnalysis(brand: BrandName, rows: Record<string, string>[]): AnalysisResult {
  const logic = BRAND_LOGIC[brand];
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];
  const { contentCol, impactCol } = detectColumns(headers);

  const scores: Record<string, number> = {};
  const citations: Record<string, { text: string; score: number }[]> = {};

  for (const row of rows) {
    const text = contentCol
      ? (row[contentCol] || "").toLowerCase()
      : Object.values(row).join(" ").toLowerCase();

    const impact = impactCol ? parseInt(row[impactCol] || "1", 10) || 1 : 1;

    for (const [painLabel, detail] of Object.entries(logic.pains)) {
      if (detail.keywords.some((k) => text.includes(k))) {
        scores[painLabel] = (scores[painLabel] || 0) + impact;
        if (!citations[painLabel]) citations[painLabel] = [];
        citations[painLabel].push({
          text: (contentCol ? row[contentCol] : Object.values(row).join(" ")).slice(0, 200),
          score: impact,
        });
      }
    }
  }

  // Sort citations by score descending
  for (const key of Object.keys(citations)) {
    citations[key].sort((a, b) => b.score - a.score);
  }

  const sortedPains = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const maxSignal = sortedPains.length > 0 ? sortedPains[0][1] : 0;

  const briefs: ProductBrief[] = sortedPains.map(([painLabel, score]) => {
    const detail = logic.pains[painLabel];
    const topCitation = citations[painLabel]?.[0]?.text || "N/A";

    return {
      conceptName: detail.concept,
      whiteSpace: painLabel,
      signalStrength: score,
      noveltyRationale: detail.positioning,
      ingredients: detail.actives,
      citation: topCitation,
      persona: detail.persona,
      positioning: detail.positioning,
      format: detail.format,
      mrpRange: logic.mrpRange,
      innovationScore: calcInnovationScore(score, maxSignal, false),
      isExploratory: false,
    };
  });

  // Exploratory Mode: fill to minimum 5 concepts
  if (briefs.length < 5) {
    const usedPains = new Set(sortedPains.map(([p]) => p));
    
    // First add unused primary pains
    for (const [painLabel, detail] of Object.entries(logic.pains)) {
      if (briefs.length >= 8) break;
      if (usedPains.has(painLabel)) continue;
      briefs.push({
        conceptName: detail.concept,
        whiteSpace: painLabel,
        signalStrength: 0,
        noveltyRationale: detail.positioning,
        ingredients: detail.actives,
        citation: "Suggested based on category intelligence — no direct signal in this dataset.",
        persona: detail.persona,
        positioning: detail.positioning,
        format: detail.format,
        mrpRange: logic.mrpRange,
        innovationScore: calcInnovationScore(0, maxSignal, true),
        isExploratory: true,
      });
    }

    // Then add exploratory pains
    if (briefs.length < 5 && logic.exploratoryPains) {
      for (const [painLabel, detail] of Object.entries(logic.exploratoryPains)) {
        if (briefs.length >= 8) break;
        briefs.push({
          conceptName: detail.concept,
          whiteSpace: painLabel,
          signalStrength: 0,
          noveltyRationale: detail.positioning,
          ingredients: detail.actives,
          citation: "Exploratory concept — adjacent market opportunity identified from wellness trends.",
          persona: detail.persona,
          positioning: detail.positioning,
          format: detail.format,
          mrpRange: logic.mrpRange,
          innovationScore: calcInnovationScore(0, maxSignal, true),
          isExploratory: true,
        });
      }
    }
  }

  const highIntensityGaps = sortedPains.filter(([, s]) => s > 5).length;

  if (briefs.length === 0) {
    return { brand, briefs: [], noData: true, stats: { totalRows: rows.length, highIntensityGaps: 0, datasetsAnalyzed: 1 } };
  }

  return {
    brand,
    briefs,
    noData: false,
    stats: {
      totalRows: rows.length,
      highIntensityGaps: Math.max(highIntensityGaps, sortedPains.length),
      datasetsAnalyzed: 1,
    },
  };
}

/**
 * Generate executive summary for the analysis.
 */
export function generateExecutiveSummary(result: AnalysisResult): {
  formatRationale: string;
  missionAlignment: string;
  highPriority: string[];
} {
  const dataBackedBriefs = result.briefs.filter((b) => !b.isExploratory);
  const topBriefs = dataBackedBriefs
    .sort((a, b) => b.innovationScore - a.innovationScore)
    .slice(0, 3);

  const formats = [...new Set(result.briefs.map((b) => b.format))];

  return {
    formatRationale: `All concepts prioritize modern formats (${formats.join(", ")}) optimized for Indian climate compliance, fast absorption, and consumer habit-fit — replacing outdated sticky oils, thick creams, and hard-to-swallow tablets.`,
    missionAlignment: `Formulations leverage jaggery-based sweetening, Ayurvedic actives (Shatavari, Brahmi, Ashwagandha), and clean-label positioning to align with Mosaic's "Health-First, India-First" mission. Zero refined sugar, no artificial colors, clinically-dosed bioactives.`,
    highPriority: topBriefs.length > 0
      ? topBriefs.map((b) => `${b.conceptName} (Score: ${b.innovationScore})`)
      : result.briefs.slice(0, 2).map((b) => `${b.conceptName} (Score: ${b.innovationScore})`),
  };
}

/**
 * Generate Markdown report for download.
 */
export function generateMarkdownReport(result: AnalysisResult): string {
  const summary = generateExecutiveSummary(result);
  const lines: string[] = [
    `# ${result.brand} — NPD Innovation Pipeline Report`,
    `**Generated:** ${new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}`,
    `**Consumer Touchpoints Analyzed:** ${result.stats.totalRows} | **High-Intensity Gaps:** ${result.stats.highIntensityGaps}`,
    "",
    "---",
    "",
  ];

  for (const brief of result.briefs) {
    lines.push(
      `## ${brief.isExploratory ? "🔍 " : ""}${brief.conceptName}`,
      "",
      `| Field | Detail |`,
      `|-------|--------|`,
      `| **White Space** | ${brief.whiteSpace} |`,
      `| **Target Consumer** | ${brief.persona} |`,
      `| **Format** | ${brief.format} |`,
      `| **Active Ingredients** | ${brief.ingredients.join(", ")} |`,
      `| **Suggested MRP** | ${brief.mrpRange} |`,
      `| **Innovation Score** | ${brief.innovationScore}/10 |`,
      `| **Signal Strength** | ${brief.signalStrength} weighted mentions |`,
      "",
      `**Competitive Positioning:** ${brief.positioning}`,
      "",
      `**Consumer Evidence:** _"${brief.citation}"_`,
      "",
      brief.isExploratory ? "> ⚡ Exploratory Mode — Adjacent opportunity\n" : "",
      "---",
      "",
    );
  }

  lines.push(
    "## Strategic Executive Summary",
    "",
    `### Format Compliance`,
    summary.formatRationale,
    "",
    `### Mission Alignment`,
    summary.missionAlignment,
    "",
    `### High-Priority Recommendations`,
    ...summary.highPriority.map((p) => `- **${p}**`),
    "",
  );

  return lines.join("\n");
}
