# Logic Audit: Portfolio V2 Optimization Lane

## 1. Criteria for `v2-optimization`

A CSV row (after being matched to a pain point and turned into a Product Brief) is tagged **Portfolio V2 Optimization** when **Strategic Fit** says the concept is very similar to what we already sell:

- **Condition:** `Total Similarity >= 0.7` (70%).
- **Total Similarity** is a weighted score from `calculateStrategicFit(proposed, brand)`:
  - **Ingredient Overlap (40%):** Share of proposed actives that appear in any portfolio SKU (fuzzy-matched).
  - **Format Match (20%):** 1 if the delivery format (e.g. Serum, Gummies) exactly matches a portfolio SKU format (normalized), else 0.
  - **Persona Alignment (20%):** Jaccard similarity between proposed persona and portfolio persona text.
  - **Claim Match (20%):** Jaccard similarity between proposed white space/positioning and portfolio claims.

When that total is **≥ 0.7**, the engine applies the **Cannibalization Penalty** (0.5× to opportunity score) and sets:

- `swimlane = 'v2-optimization'`
- `scannerTag = 'portfolio-optimization'`

So: **a concept lands in the V2 lane when it is at least 70% similar to our current portfolio** (ingredients + format + persona + claims).

---

## 2. Example product we already have (portfolio-ref.md)

- **Be Bodywise · Rosemary & Redensyl Hair Serum**  
  - Format: Serum  
  - Actives: Rosemary Oil, Redensyl, Anagain, Caffeine  
  - Persona: Women with early-stage hair thinning  
  - Claims: Hair regrowth, increased density, reduced shedding  

So a CSV row that describes the same kind of product (e.g. “rosemary hair serum for thinning”) should score high similarity to this SKU.

---

## 3. Why a CSV row with that product might NOT have shown in the V2 lane before

- **Threshold was 0.6 (60%).** So only rows with **> 0.6** similarity triggered V2. Slightly different wording (e.g. “hair fall” vs “hair thinning”), or a different format string (e.g. “Tonic” vs “Serum”) could keep similarity just below 0.6 and the brief would default to **high-signal** instead of V2.
- **Single “best” SKU:** Similarity is computed as the **maximum** over all portfolio SKUs. If the best match was 0.58 (e.g. format or claims not quite matching), the row would not be classified as V2.
- **Keyword → pain → brief:** The row must first match a BRAND_LOGIC pain (e.g. “Hair Thinning”). That pain’s actives are “Biotin, Saw Palmetto, Caffeine” (different from “Rosemary & Redensyl”). So the **proposed** brief had different actives than the “Rosemary & Redensyl Hair Serum” SKU, which could lower ingredient overlap and total similarity below the old 0.6 threshold.

So the combination of a **strict threshold (0.6)** and **pain-driven actives** (not the exact portfolio product) could prevent an “our product” row from appearing in the V2 lane.

---

## 4. Change made so the V2 section is not empty when relevant data exists

- **Threshold updated from 0.6 to 0.7** in the **opposite direction** of strictness: the condition is now **`totalSimilarity >= 0.7`** (i.e. **≥ 70%** similarity) to assign the **Cannibalization Penalty** and the V2 lane.
- So:
  - **≥ 70% similarity** → **Portfolio V2 Optimization** (cannibalization penalty applied).
  - **&lt; 70%** → no penalty; the brief stays in high-signal or can get the format-gap or white-space bonus instead.

This makes the V2 lane **more** likely to capture concepts that are clearly “like our current portfolio” (e.g. same format + high ingredient and claim overlap), so the section is not empty when the CSV actually contains such products.
