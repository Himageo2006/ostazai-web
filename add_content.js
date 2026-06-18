// Comprehensive content injection script
// Adds examTips, commonMistakes, workedExample to all topics missing them

import { readFileSync, writeFileSync } from 'fs';

const file = 'app.js';
let src = readFileSync(file, 'utf8');

// ── Subject-level default tips & mistakes ──────────────────────────
const SUBJ_TIPS = {
  maths:['Show all working step by step — method marks awarded even if final answer wrong','Check answer by substituting back into original equation or expression'],
  physics:['State the equation first, then substitute values with correct units','Check units are consistent throughout — convert km/h to m/s, cm to m, etc. before calculating'],
  chemistry:['Balance the equation before attempting any calculations','Include state symbols (s), (l), (g), (aq) in all equations where required'],
  biology:['Use precise scientific terminology — do not use everyday language (e.g. say "cell membrane" not "wall" for animal cells)','Learn key definitions word-for-word — examiners check for specific command words'],
  cs:['Use correct technical vocabulary — "increment variable" not "add one to the number"','Trace tables: complete each column in order; show every step, including unchanged variables'],
  economics:['Always use a diagram to support your explanation — clearly label axes, curves, and equilibrium points','Evaluate both sides before reaching a conclusion — one-sided answers cap at lower mark bands'],
  english:['Embed short quotes inside your analysis sentence — do not block-quote then comment separately','Use the technique → quote → effect structure: name the device, quote it, explain its impact on the reader'],
  history:['Use specific dates, names and statistics as evidence — vague statements lose marks','Structure extended answers: argue → counter-argue → reach a supported judgement'],
  geography:['Name specific case study examples with dates and statistics — generic answers score lower marks','Use geographical terminology: relief, precipitation, urbanisation, deforestation — not everyday words'],
  business:['Always apply theory to the specific business in the question — do not write generic definitions alone','Evaluate: for every advantage state a limitation, then conclude which outweighs the other and why'],
  add_maths:['Show every algebraic step — examiners award marks for correct method even with arithmetic errors','Verify answers: substitute back into the original equation to confirm correctness'],
  accounting:['Use correct accounting layout — headings, subtotals, double-underline totals — presentation marks are real','Distinguish between capital expenditure (long-term asset) and revenue expenditure (day-to-day cost)'],
  sociology:['Reference named sociologists and specific studies — "Durkheim argued..." scores higher than "some sociologists say"','Evaluate: always challenge your own argument with a counter-view before reaching a conclusion'],
  psychology:['Name the specific psychologist and study — "Milgram (1963) found..." earns AO1 marks','State strength AND weakness of any method — examiners look for balanced evaluation'],
  ict:['Use precise technical terms — "data" vs "information", "bit" vs "byte", "hardware" vs "software"','Give specific examples for every advantage or disadvantage you state'],
  literature:['Every paragraph needs: a point, a well-chosen embedded quote, and analysis of effect on the reader','Avoid plot summary — ask yourself how the writer presents this, not what happens'],
  french:['Use at least three tenses in writing tasks — past, present, future — to access higher mark bands','Check adjective agreement before submitting: gender and number must match the noun'],
  arabic_lang:['Read the questions before the passage to know what to look for','Quote directly from the text to support comprehension answers — do not paraphrase without evidence'],
  religious_studies:['Present at least two different religious perspectives on every ethical issue','Structure evaluate questions: agree (3 reasons) → disagree (3 reasons) → balanced conclusion with your judgement'],
  environmental:['Link every environmental problem to a specific human activity as its cause','Suggest realistic, specific solutions — not just "reduce pollution" but "switch to renewable energy sources"'],
  spanish:['Use a range of tenses in all writing tasks — include at least preterite, present, and future','Check gender agreement for all adjectives — masculine and feminine forms differ for most adjectives'],
};

const SUBJ_MISTAKES = {
  maths:['Forgetting to check whether an answer is reasonable — always sanity-check (e.g. length cannot be negative)','Making sign errors when expanding brackets or rearranging — write each step on a new line'],
  physics:['Using the wrong equation — always identify what is given and what is needed before choosing a formula','Omitting units in answers — every numerical answer must have a unit unless it is a ratio'],
  chemistry:['Writing unbalanced equations — check atom count for every element on both sides','Confusing physical change (no new substance) with chemical change (new substance formed)'],
  biology:['Confusing plant and animal cell organelles — plant cells have cell wall, chloroplasts, large vacuole; animal cells do not','Writing "the cell does..." instead of naming the specific organelle responsible'],
  cs:['Writing pseudocode that skips initialisation of variables — always declare and set starting values','Confusing iteration (loop) with selection (if/else) — read the problem carefully to identify which is needed'],
  economics:['Drawing demand/supply shifts in the wrong direction — always ask "does this increase or decrease demand/supply?"','Confusing movement along a curve (price change) with a shift of the curve (non-price factor change)'],
  english:['Writing about what the text says (summary) instead of how the writer uses language (analysis)','Using vague praise: "this is effective" — always specify WHAT effect it creates and for WHOM'],
  history:['Describing events without analysing their significance or cause — always answer "so what?"','Confusing dates or attributing actions to the wrong leader — double-check specific facts in revision'],
  geography:['Giving generic answers without case study evidence — always name a specific place with supporting data','Confusing push factors (reasons to leave) and pull factors (reasons to move somewhere)'],
  business:['Stating both sides then failing to reach a conclusion — always end with a justified judgement','Defining a term correctly but not applying it to the specific business in the question'],
  add_maths:['Forgetting +c when integrating indefinitely — this mark is often lost for no reason','Applying the chain rule incorrectly — always identify the inner function and multiply by its derivative'],
  accounting:['Treating cash flow and profit as the same — they are fundamentally different concepts','Misplacing items in financial statements — current assets (under 1 year) vs non-current assets (over 1 year)'],
  sociology:['Describing society in general terms without linking to a specific sociological theory or concept','Forgetting to evaluate — AO2 marks require engaging with counter-arguments, not just listing points'],
  psychology:['Describing findings without naming the specific study or researcher — always include "who, what, when"','Using everyday language instead of psychological terminology — "people copy others" vs "social learning through observation"'],
  ict:['Confusing RAM (volatile, temporary) with ROM (non-volatile, permanent) or storage (hard drive, SSD)','Giving advantages without disadvantages — technology questions almost always require evaluation of both'],
  literature:['Retelling plot instead of analysing the writer craft — always answer how the writer presents the theme','Using long block quotes without analysis — short embedded quotes with detailed analysis score more marks'],
  french:['Confusing passé composé (single completed event) and imparfait (habitual/continuous past)','Forgetting être verbs in passé composé: all agree in gender/number with the subject (elle est allée, not allé)'],
  arabic_lang:['Answering comprehension questions from general knowledge rather than text evidence','Losing marks by translating too literally — maintain the meaning and natural flow in the target language'],
  religious_studies:['Presenting only one religious viewpoint — always show diversity within and between traditions','Writing "religious people think..." without naming the specific religion or denomination'],
  environmental:['Confusing mitigation (reducing the cause of climate change) with adaptation (adjusting to its effects)','Stating environmental problems without linking to specific causes or suggesting specific solutions'],
  spanish:['Confusing ser (permanent/identity) and estar (temporary state/location) — these are tested heavily','Using masculine adjective forms for feminine nouns — check the gender of the noun first'],
};

// ── Topic-specific overrides (highest priority) ────────────────────
const TOPIC_OVERRIDES = {
  // MATHS
  'Types of Numbers & Operations':{ examTips:['BODMAS/BIDMAS: work out Brackets first, then Orders, Division, Multiplication, Addition, Subtraction — left to right for same priority','Prime factorisation: use a factor tree; HCF = product of common prime factors; LCM = product of all prime factors (highest power)'], commonMistakes:['Applying operations in wrong order — always follow BODMAS strictly','Confusing HCF (highest common factor) with LCM (lowest common multiple) — HCF divides both; LCM is divisible by both'] },
  'Powers, Roots & Standard Form':{ examTips:['Standard form: coefficient must be between 1 and 10 — check A × 10ⁿ where 1 ≤ A < 10','Index laws: when multiplying, ADD powers; dividing, SUBTRACT; bracket, MULTIPLY — do not mix these up'], commonMistakes:['Adding instead of multiplying powers when multiplying: aᵐ × aⁿ = aᵐ⁺ⁿ NOT a²ᵐⁿ','Writing standard form with coefficient ≥ 10 or < 1 — always adjust the power to fix this'] },
  'Fractions, Decimals & Percentages':{ examTips:['Percentage change = (change ÷ original) × 100 — not change ÷ new value','Recurring decimals: multiply by 10ⁿ to eliminate the recurring part, then subtract'], commonMistakes:['Finding percentage of a wrong base amount — always go back to the original value for percentage change','Adding fractions by adding numerators AND denominators separately — must find common denominator first'] },
  'Algebra & Equations':{ examTips:['When solving equations, perform the SAME operation to both sides — write each step clearly','Expand before simplifying — never try to simplify inside brackets that are not yet expanded'], commonMistakes:['Sign errors when moving terms: x − 5 = 3 → x = 3 + 5 (add 5 to BOTH sides)','Expanding (a+b)² as a²+b² — must include the 2ab middle term: (a+b)² = a²+2ab+b²'] },
  'Geometry & Measurement':{ examTips:['Circle theorems: learn all 8 with diagrams — state the theorem name when using it in proofs','Bearings: always measured clockwise from North; always given as 3 digits (e.g. 045°, not 45°)'], commonMistakes:['Using diameter instead of radius in area/circumference formulas — A = πr², C = 2πr','Confusing perimeter (distance around) with area (space inside) — check the question carefully'] },
  'Statistics & Probability':{ examTips:['Mean from frequency table: Σ(midpoint × frequency) ÷ Σfrequency — use midpoints of class intervals','P(A or B) = P(A) + P(B) − P(A and B) for non-mutually exclusive events'], commonMistakes:['Using class boundaries instead of midpoints when calculating estimated mean from grouped data','Probability > 1 is impossible — if your answer > 1, recheck your calculation immediately'] },
  // PHYSICS
  'Speed, Velocity & Acceleration':{ examTips:['Distance-time graph: gradient = speed; velocity-time graph: gradient = acceleration, AREA = distance','Label positive direction at start — deceleration means acceleration is NEGATIVE, not a separate concept'], commonMistakes:['Reading gradient of distance-time graph as velocity without dividing rise by run correctly','Confusing distance (scalar) with displacement (vector) — displacement has direction, distance does not'] },
  'Forces & Newton\'s Laws':{ examTips:['Free body diagrams: draw all forces FROM the object with labelled arrows — not near the object','Newton\'s 3rd Law pairs: same type of force, equal magnitude, opposite direction, on DIFFERENT objects'], commonMistakes:['Saying action and reaction cancel out — they act on different objects so cannot cancel','Confusing mass (kg, constant) with weight (N, = mg, depends on gravitational field)'] },
  'Work, Energy & Power':{ examTips:['Energy conservation: always check energy IN = energy OUT + losses (as heat/sound)','Efficiency: express as decimal (0.75) or percentage (75%) — specify which the question asks for'], commonMistakes:['Using total distance instead of displacement in work done — W = Fs (force × displacement in direction of force)','Confusing power (rate of energy transfer, watts) with energy (joules) — P = E/t'] },
  'Cell Structure':{ examTips:['Animal vs plant cells: plant has cell wall (cellulose), chloroplasts, large permanent vacuole — animals have none of these','Electron microscope vs light microscope: electron has greater magnification AND resolution — both differences matter'], commonMistakes:['Saying plants have a cell membrane but no cell wall — plants have BOTH','Confusing magnification (how much bigger image appears) with resolution (minimum detail that can be distinguished)'] },
  'Photosynthesis':{ examTips:['Word equation: carbon dioxide + water → glucose + oxygen (light and chlorophyll required)','Limiting factors: at low light, increasing light helps; at high light, CO₂ or temperature becomes limiting'], commonMistakes:['Saying chlorophyll produces glucose — it only absorbs light energy; the Calvin cycle makes glucose','Confusing reactants (CO₂ and H₂O) with products (glucose and O₂) — plants take in CO₂, not O₂, for photosynthesis'] },
  'Respiration':{ examTips:['Aerobic vs anaerobic: aerobic needs oxygen and releases more ATP; anaerobic produces lactic acid (animals) or ethanol+CO₂ (yeast)','Respiration happens in ALL living cells ALL the time — not just when exercising'], commonMistakes:['Confusing breathing (gas exchange, mechanical) with respiration (cellular energy release, chemical)','Writing the photosynthesis equation for respiration — respiration is the REVERSE: glucose + O₂ → CO₂ + water'] },
  // CHEMISTRY
  'Atomic Structure & Bonding':{ examTips:['Electronic configuration: fill lowest energy levels first — 2,8,8,18... for the shells','Ionic bonds: metal + non-metal; covalent: non-metal + non-metal; metallic: metal + metal — identify by elements involved'], commonMistakes:['Drawing dot-and-cross with dots in the wrong shells — draw the correct electron configuration first','Confusing ions: Na⁺ has 10 electrons (lost 1); Cl⁻ has 18 electrons (gained 1)'] },
  'Rates of Reaction':{ examTips:['Rate factors: temperature, concentration, surface area, catalyst — know HOW each affects collision frequency and energy','Graph interpretation: steeper gradient = faster rate; horizontal line = reaction complete'], commonMistakes:['Saying a catalyst lowers activation energy so less energy is needed — correct, but also state it is unchanged itself (not used up)','Confusing rate of reaction with amount of product — higher rate = faster reaction, not necessarily MORE product'] },
  // COMPUTER SCIENCE
  'Programming Concepts':{ examTips:['Pseudocode: use clear indentation for loops and conditions — examiners check structure as well as logic','Trace through your algorithm with simple test values before writing the final answer'], commonMistakes:['Off-by-one errors in loops: FOR i = 1 TO 10 runs 10 times; FOR i = 0 TO 9 also runs 10 times','Using = for comparison in pseudocode — use == or = consistently as specified by your syllabus'] },
  'Data Representation':{ examTips:['Binary to denary: write column values (128,64,32,16,8,4,2,1) first, then sum where there is a 1','Hexadecimal: each hex digit = 4 binary bits — convert in groups of 4'], commonMistakes:['Dividing by 2 but writing quotient wrong in binary conversion — write remainders from bottom to top','Confusing sign-magnitude and two\'s complement representations of negative binary numbers'] },
};

// ── Worked example generator ───────────────────────────────────────
const WORKED_EXAMPLES = {
  'Fractions, Decimals & Percentages':'Convert 0.̄3̄6̄ (0.363636...) to fraction:\nLet x = 0.363636...\n100x = 36.363636...\n100x - x = 36 → 99x = 36 → x = 36/99 = 4/11',
  'Sequences & Series':'Find nth term of: 5, 8, 11, 14...\nCommon difference d = 3; first term a = 5\nnth term = a + (n−1)d = 5 + 3(n−1) = 5 + 3n − 3 = 3n + 2\nCheck: n=1 → 5✓, n=4 → 14✓',
  'Quadratic Equations':'Solve x² + 5x + 6 = 0\nFactor: (x+2)(x+3) = 0\nx = −2 or x = −3\nOr use formula: x = (−5 ± √(25−24))/2 = (−5 ± 1)/2 → x = −2 or −3',
  'Trigonometry':'In triangle ABC, angle A = 35°, BC = 8cm. Find AB.\nsin A = opposite/hypotenuse → sin 35° = BC/AB\nAB = BC/sin 35° = 8/0.574 = 13.9 cm',
  'Pressure & Moments':'A 3m beam has a 20N weight at 1m from pivot. Find balancing force at 2.5m from pivot.\nClockwise moment = 20 × 1 = 20 Nm\nAnticlockwise: F × 2.5 = 20 → F = 20/2.5 = 8N',
  'States of Matter & Kinetic Theory':'Explain why gas pressure increases when temperature rises (constant volume):\nHigher temperature → particles have more kinetic energy → move faster → collide with container walls more frequently AND with greater force → pressure increases',
  'Acids, Bases & pH':'Calculate pH of 0.01 mol/dm³ HCl solution.\nHCl is strong acid: fully dissociates → [H⁺] = 0.01 = 10⁻² mol/dm³\npH = −log[H⁺] = −log(10⁻²) = 2',
  'Market Demand & Supply':'A rise in income increases demand for smartphones. Show the effect:\nDemand curve shifts RIGHT (D₁ → D₂)\nAt original price P₁: excess demand (Q₂ > Q₁)\nPrice rises to P₂, quantity rises to Q₂ → new equilibrium (P₂, Q₂)',
  'Cash Flow & Decision Making':'Month 1: Inflows £5,000; Outflows £6,500\nNet cash flow = 5,000 − 6,500 = −£1,500\nOpening balance = £2,000\nClosing balance = 2,000 + (−1,500) = £500',
  'Moles & Calculations':'Find mass of CaCO₃ that produces 4.4g of CO₂ (CaCO₃ → CaO + CO₂; Mr: CaCO₃=100, CO₂=44)\nMoles CO₂ = 4.4÷44 = 0.1 mol\nRatio 1:1 → moles CaCO₃ = 0.1 mol\nMass CaCO₃ = 0.1 × 100 = 10g',
  'Titration & Electrolysis':'25.0cm³ of NaOH neutralised by 20.0cm³ of 0.5 mol/dm³ HCl. Find [NaOH].\nMoles HCl = (20/1000) × 0.5 = 0.01 mol\nNaOH + HCl → NaCl + H₂O (1:1 ratio)\nMoles NaOH = 0.01 mol\n[NaOH] = 0.01/(25/1000) = 0.4 mol/dm³',
  'Income Statement & Balance Sheet':'Gross Profit = Revenue − Cost of Sales = £80,000 − £50,000 = £30,000\nNet Profit = Gross Profit − Expenses = £30,000 − £12,000 = £18,000\nNet Profit Margin = (18,000/80,000) × 100 = 22.5%',
};

// ── Inject content into source ─────────────────────────────────────
// Strategy: find topic objects, detect which fields they have, inject missing ones.
// We locate each topic by its title string, find the end of its points array,
// then insert after it.

// Parse subjects to know what each topic needs
const subjMatch = src.match(/const IGCSE_SUBJECTS\s*=\s*(\{[\s\S]*?\n\})\s*;/);
let subjects;
eval('subjects = ' + subjMatch[1]);

let injected = 0;
let examTipsAdded = 0;
let mistakesAdded = 0;
let workedAdded = 0;

for (const [sk, subj] of Object.entries(subjects)) {
  const defTips = SUBJ_TIPS[sk] || SUBJ_TIPS.maths;
  const defMistakes = SUBJ_MISTAKES[sk] || SUBJ_MISTAKES.maths;

  for (const b of subj.boards) {
    const chs = subj.chapters[b] || [];
    for (const ch of chs) {
      for (const tp of ch.topics) {
        const needsTips = !tp.examTips || tp.examTips.length === 0;
        const needsMistakes = !tp.commonMistakes;
        const needsWorked = !tp.workedExample;

        if (!needsTips && !needsMistakes && !needsWorked) continue;

        // Get content to inject
        const override = TOPIC_OVERRIDES[tp.title];
        const tips = override?.examTips || defTips;
        const mistakes = override?.commonMistakes || defMistakes;
        const worked = WORKED_EXAMPLES[tp.title];

        // Escape single quotes in string content
        const esc = s => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

        // Build the injection string
        let injection = '';
        if (needsTips) {
          injection += `, examTips:[\n            '${esc(tips[0])}',\n            '${esc(tips[1])}',\n          ]`;
          examTipsAdded++;
        }
        if (needsMistakes) {
          injection += `, commonMistakes:[\n            '${esc(mistakes[0])}',\n            '${esc(mistakes[1])}',\n          ]`;
          mistakesAdded++;
        }
        if (needsWorked && worked) {
          // Escape backticks in worked example
          const safeWorked = worked.replace(/`/g, '\\`');
          injection += `, workedExample:\`${safeWorked}\``;
          workedAdded++;
        }

        if (!injection) continue;

        // Find this topic in the source and inject
        // Strategy: find `{ title:'TITLE',` then find the closing `]},` of its points array
        // Escape special regex chars in title
        const escapedTitle = tp.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/'/g, "\\'");

        // Pattern: topic object that has the title, followed by points array
        // We need to find the END of the points array for this specific topic
        // The points array closing is: ], followed by either } or other fields

        // Find the topic title occurrence in the source
        const titleIdx = src.indexOf(`title:'${tp.title}'`);
        if (titleIdx === -1) continue;

        // From titleIdx, find the points array and its closing
        const pointsStart = src.indexOf('points:[', titleIdx);
        if (pointsStart === -1 || pointsStart - titleIdx > 200) continue;

        // Find the matching closing ] for the points array
        // Count brackets from pointsStart
        let depth = 0;
        let i = pointsStart + 7; // skip 'points['
        let pointsEnd = -1;
        while (i < src.length) {
          if (src[i] === '[') depth++;
          else if (src[i] === ']') {
            if (depth === 0) { pointsEnd = i; break; }
            depth--;
          }
          i++;
        }
        if (pointsEnd === -1) continue;

        // Check what's after the closing ]
        // Get the text right after ]
        const afterPoints = src.slice(pointsEnd + 1, pointsEnd + 20).trim();

        // If it already has examTips right after and we need tips, skip tips injection
        // If it starts with , examTips we know it has it
        // We need to inject before the }, that closes the topic

        // Find the topic's closing },
        // From pointsEnd, scan forward to find the topic object close
        // The topic object starts with { title:'...' and ends with },
        // After the points array close, there may be other fields, then },

        // Build new injection: insert after the closing ] of points array
        // (or after the last existing field's closing ])

        // Find where to insert: after the last field's ] before the topic closes
        // Simple approach: find the LAST ], followed by }, within ~2000 chars of titleIdx
        // that closes the topic

        // Actually: find `]},` or `]}\n` pattern after pointsEnd that closes the topic
        let insertPos = -1;

        // Scan from pointsEnd to find the topic's closing
        let searchFrom = pointsEnd;

        // Check if there are additional fields (examTips, commonMistakes, workedExample)
        // by looking for their patterns after pointsEnd
        let lastFieldEnd = pointsEnd;

        // Look for examTips closing
        if (!needsTips) {
          // Already has examTips - find where it ends
          const etStart = src.indexOf('examTips:[', pointsEnd);
          if (etStart !== -1 && etStart - pointsEnd < 100) {
            let d = 0;
            let j = etStart + 9;
            while (j < src.length) {
              if (src[j] === '[') d++;
              else if (src[j] === ']') {
                if (d === 0) { lastFieldEnd = j; break; }
                d--;
              }
              j++;
            }
          }
        }

        // Look for commonMistakes closing
        if (!needsMistakes) {
          const cmStart = src.indexOf('commonMistakes:[', lastFieldEnd);
          if (cmStart !== -1 && cmStart - lastFieldEnd < 100) {
            let d = 0;
            let j = cmStart + 15;
            while (j < src.length) {
              if (src[j] === '[') d++;
              else if (src[j] === ']') {
                if (d === 0) { lastFieldEnd = j; break; }
                d--;
              }
              j++;
            }
          }
        }

        // Look for workedExample closing
        if (!needsWorked) {
          const weStart = src.indexOf('workedExample:`', lastFieldEnd);
          if (weStart !== -1 && weStart - lastFieldEnd < 200) {
            // Find closing backtick
            let j = weStart + 15;
            while (j < src.length && src[j] !== '`') j++;
            if (j < src.length) lastFieldEnd = j;
          }
        }

        insertPos = lastFieldEnd + 1;

        // Do the injection
        const before = src.slice(0, insertPos);
        const after = src.slice(insertPos);
        src = before + injection + after;
        injected++;
      }
    }
  }
}

console.log(`Injected content for ${injected} topics`);
console.log(`examTips added: ${examTipsAdded}`);
console.log(`commonMistakes added: ${mistakesAdded}`);
console.log(`workedExample added: ${workedAdded}`);

// Validate syntax
try {
  new Function(src);
  console.log('SYNTAX OK');
  writeFileSync(file, src);
  console.log('File written successfully');
} catch(e) {
  console.log('SYNTAX ERROR:', e.message);
  writeFileSync(file + '.bak', src);
  console.log('Backup written to app.js.bak');
}
