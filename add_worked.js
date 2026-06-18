// Inject workedExample into all topics that are missing one
import { readFileSync, writeFileSync } from 'fs';

const file = 'app.js';
let src = readFileSync(file, 'utf8');

// Comprehensive worked examples keyed by topic title
const WORKED = {
  // ── MATHS ──────────────────────────────────────────────────────
  'Types of Numbers & Operations':
`Find the HCF and LCM of 24 and 36.
24 = 2³ × 3    |    36 = 2² × 3²
HCF = 2² × 3 = 12  (product of SHARED prime factors, lowest power)
LCM = 2³ × 3² = 72 (product of ALL prime factors, highest power)
Check: 72 ÷ 24 = 3 ✓   72 ÷ 36 = 2 ✓`,

  'Powers, Roots & Standard Form':
`Write 0.000456 in standard form and evaluate (2×10³) × (3×10⁻⁵).
0.000456 = 4.56 × 10⁻⁴  (move decimal 4 places right)
(2×10³) × (3×10⁻⁵) = 6 × 10³⁺⁽⁻⁵⁾ = 6 × 10⁻² = 0.06`,

  'Fractions, Decimals & Percentages':
`A jacket costs £84 after a 30% discount. Find the original price.
84 = 70% of original → original = 84 ÷ 0.70 = £120
Percentage increase from £95 to £114:
Change = 19; % increase = (19/95) × 100 = 20%`,

  'Algebra & Equations':
`Solve 3(2x − 1) = 4x + 9
6x − 3 = 4x + 9
2x = 12 → x = 6
Check: 3(11) = 33 = 4(6)+9 = 33 ✓`,

  'Quadratic Equations':
`Solve 2x² − 7x + 3 = 0 using the formula.
a=2, b=−7, c=3
x = (7 ± √(49−24)) / 4 = (7 ± √25) / 4 = (7 ± 5) / 4
x = 3  or  x = 0.5`,

  'Simultaneous Equations':
`Solve: 3x + 2y = 16 and x − y = 2
From 2nd equation: x = y + 2
Substitute: 3(y+2) + 2y = 16 → 5y = 10 → y = 2
x = 4    Check: 12+4=16 ✓  4−2=2 ✓`,

  'Sequences & Series':
`The 3rd term of a GP is 12 and the 6th term is 96. Find the common ratio.
T₆/T₃ = r³ = 96/12 = 8 → r = 2
T₃ = a × r² = 12 → a = 3
nth term = 3 × 2^(n−1)`,

  'Functions & Graphs':
`f(x) = 2x + 3. Find f⁻¹(x).
Let y = 2x + 3 → x = (y−3)/2
f⁻¹(x) = (x−3)/2
Check: f(f⁻¹(5)) = f(1) = 5 ✓`,

  'Geometry & Measurement':
`Find the area of a sector with radius 8cm and angle 135°.
Area = (θ/360) × πr² = (135/360) × π × 64 = 75.4 cm²
Arc length = (135/360) × 2π × 8 = 18.85 cm`,

  'Trigonometry':
`From a point 50m from the base of a building, the angle of elevation is 32°.
tan 32° = height / 50
height = 50 × tan 32° = 50 × 0.6249 = 31.2 m`,

  'Vectors':
`A = (1,3), B = (5,7). Find |AB| and the unit vector.
AB = B − A = (4, 4)
|AB| = √(16+16) = √32 = 4√2 ≈ 5.66
Unit vector = (4,4) / 4√2 = (1/√2, 1/√2)`,

  'Matrices':
`Find the inverse of M = [[3,1],[5,2]]
det(M) = 3×2 − 1×5 = 1
M⁻¹ = (1/1) × [[2,−1],[−5,3]] = [[2,−1],[−5,3]]
Check: M × M⁻¹ = I ✓`,

  'Statistics & Probability':
`P(A) = 0.4, P(B) = 0.3, P(A∩B) = 0.12. Find P(A∪B).
P(A∪B) = P(A) + P(B) − P(A∩B) = 0.4 + 0.3 − 0.12 = 0.58
Are they independent? P(A)×P(B) = 0.12 = P(A∩B) → YES, independent`,

  'Circle Theorems':
`Angle at centre = 2 × angle at circumference.
O is centre; angle AOB = 110°. Find angle ACB (C on major arc).
Angle ACB = 110° / 2 = 55°
Opposite angles in cyclic quad: ∠A + ∠C = 180° → ∠C = 180° − ∠A`,

  'Transformations':
`Triangle P has vertices (1,1),(3,1),(2,3). Reflect in y = x.
Rule: (x,y) → (y,x)
P' = (1,1),(1,3),(3,2)
Then rotate 90° clockwise about origin: (x,y) → (y,−x)
P'' = (1,−1),(3,−1),(2,−3)`,

  'Inequalities':
`Solve 2x − 3 ≤ 7 and x > 1. Represent on number line.
2x ≤ 10 → x ≤ 5
Combined: 1 < x ≤ 5
Integer solutions: {2, 3, 4, 5}`,

  // ── ADD MATHS ──────────────────────────────────────────────────
  'Differentiation':
`Differentiate y = 3x⁴ − 5x² + 2x − 7
dy/dx = 12x³ − 10x + 2
Find stationary points: 12x³ − 10x + 2 = 0
At x=0: dy/dx = 2 ≠ 0 (not stationary there)
Use d²y/dx² to classify: if > 0 → minimum, < 0 → maximum`,

  'Integration':
`Find ∫(3x² − 4x + 1)dx
= x³ − 2x² + x + c   (always add +c for indefinite integrals)
Definite: ∫₁³ (3x²−4x+1)dx = [x³−2x²+x]₁³
= (27−18+3) − (1−2+1) = 12 − 0 = 12`,

  'Binomial Expansion':
`Expand (1 + 2x)⁴ using binomial theorem.
= C(4,0)(2x)⁰ + C(4,1)(2x)¹ + C(4,2)(2x)² + C(4,3)(2x)³ + C(4,4)(2x)⁴
= 1 + 4(2x) + 6(4x²) + 4(8x³) + 16x⁴
= 1 + 8x + 24x² + 32x³ + 16x⁴`,

  'Trigonometric Functions':
`Solve sin 2θ = 0.5 for 0° ≤ θ ≤ 360°
2θ = sin⁻¹(0.5) = 30° or 150° (in range 0° to 720°)
Also: 30°+360°=390°, 150°+360°=510°
θ = 15°, 75°, 195°, 255°`,

  'Logarithms & Exponentials':
`Solve 3^(x+1) = 7^x
Take log: (x+1)log3 = x log7
x log3 + log3 = x log7
x(log7 − log3) = log3
x = log3/(log7−log3) = 0.4771/0.3680 = 1.296`,

  'Coordinate Geometry':
`Line L₁: 3x − y = 5. Find the line L₂ through (2,4) perpendicular to L₁.
Gradient of L₁ = 3; gradient of L₂ = −1/3
L₂: y − 4 = −⅓(x − 2) → y = −x/3 + 14/3
Or: x + 3y = 14`,

  'Polynomials':
`Divide 2x³ − 3x² + x + 2 by (x − 2).
Using synthetic division with root 2:
2 | 2  −3   1   2
  |    4    2   6
  | 2   1   3 | 8
Quotient = 2x² + x + 3, Remainder = 8`,

  'Permutations & Combinations':
`How many ways to arrange 5 people in a row if 2 specific people must be together?
Treat the pair as 1 unit → 4! arrangements of 4 units = 24
The pair can swap internally: × 2
Total = 24 × 2 = 48`,

  // ── PHYSICS ──────────────────────────────────────────────────
  'Speed, Velocity & Acceleration':
`A car accelerates from rest to 20 m/s in 8 s, then decelerates to stop in 5 s.
Acceleration phase: a = (20−0)/8 = 2.5 m/s²
Deceleration: a = (0−20)/5 = −4 m/s²
Distance (area under v-t graph):
Phase 1: ½ × 8 × 20 = 80 m
Phase 2: ½ × 5 × 20 = 50 m
Total = 130 m`,

  'Forces & Newton\'s Laws':
`A 5 kg box is pulled by 30N on a surface with friction force 10N.
Net force = 30 − 10 = 20 N
a = F/m = 20/5 = 4 m/s²
Normal reaction = weight = 5 × 10 = 50 N
Coefficient of friction μ = 10/50 = 0.2`,

  'Work, Energy & Power':
`A 60W motor lifts a 15 kg crate 3m in 9 seconds.
Useful work done = mgh = 15 × 10 × 3 = 450 J
Energy input = P × t = 60 × 9 = 540 J
Efficiency = 450/540 × 100 = 83.3%`,

  'Pressure & Moments':
`A uniform 4m plank (weight 200N) has a 500N load 1m from left end. Find support reactions.
Take moments about left support:
R_right × 4 = 200 × 2 + 500 × 1 = 900
R_right = 225 N
R_left = 200 + 500 − 225 = 475 N
Check: 475 + 225 = 700N = total load ✓`,

  'Waves & Optics':
`A wave has frequency 500 Hz and wavelength 0.68 m. Find wave speed.
v = fλ = 500 × 0.68 = 340 m/s (speed of sound in air)
If incident angle = 40° and n = 1.5, find refraction angle:
sin r = sin 40° / 1.5 = 0.643/1.5 = 0.429 → r = 25.4°`,

  'Electricity & Circuits':
`Three resistors: 4Ω, 6Ω in parallel, then in series with 5Ω. Find total resistance and current if V=12V.
Parallel: 1/R = 1/4 + 1/6 = 5/12 → R_parallel = 2.4Ω
Total: R = 2.4 + 5 = 7.4Ω
I = V/R = 12/7.4 = 1.62 A`,

  'Thermal Physics':
`100g of ice at −10°C heated to steam at 100°C. Find total energy. (c_ice=2100, c_water=4200, L_f=336000, L_v=2260000 J/kg)
Q1 (warm ice): 0.1 × 2100 × 10 = 2100 J
Q2 (melt ice): 0.1 × 336000 = 33600 J
Q3 (warm water): 0.1 × 4200 × 100 = 42000 J
Q4 (boil water): 0.1 × 2260000 = 226000 J
Total = 303700 J ≈ 304 kJ`,

  'Magnetism & Electromagnetism':
`A wire of length 0.3m carries 4A in a field of 0.5T (perpendicular). Find the force.
F = BIL = 0.5 × 4 × 0.3 = 0.6 N
Use Fleming\'s Left Hand rule to find direction:
Thumb = force, Index = field, Middle = current`,

  'Radioactivity':
`A sample has half-life 8 days. Find activity remaining after 24 days if initial activity = 4000 Bq.
Number of half-lives = 24/8 = 3
Activity = 4000 × (½)³ = 4000/8 = 500 Bq`,

  // ── CHEMISTRY ──────────────────────────────────────────────────
  'Atomic Structure & Bonding':
`Draw the dot-and-cross for HCl (covalent).
H has 1 electron; Cl has 7 outer electrons.
Shared pair shown between H and Cl.
Cl has 3 lone pairs.
Bond angle: linear (180°) — only 2 electron domains`,

  'States of Matter & Kinetic Theory':
`Calculate the pressure of a gas if volume doubles at constant temperature (Boyle\'s Law).
P₁V₁ = P₂V₂
If P₁ = 200 kPa, V₁ = 3 L:
200 × 3 = P₂ × 6 → P₂ = 100 kPa
Pressure halved when volume doubled ✓`,

  'Moles & Calculations':
`What volume of CO₂ at STP is produced from 25g of CaCO₃?
CaCO₃ → CaO + CO₂  (Mr CaCO₃ = 100)
Moles CaCO₃ = 25/100 = 0.25 mol
Moles CO₂ = 0.25 mol (1:1)
Volume at STP = 0.25 × 22.4 L = 5.6 L`,

  'Rates of Reaction':
`Rate = k[A][B]. If [A] doubles: rate doubles (first order in A). If [B] triples: rate triples (first order in B). If both double: rate × 4.
Activation energy: use Arrhenius or just state that catalysts provide an alternative pathway with lower Ea`,

  'Acids, Bases & pH':
`0.05 mol/dm³ H₂SO₄ (strong, diprotic). Find pH.
H₂SO₄ → 2H⁺ + SO₄²⁻
[H⁺] = 2 × 0.05 = 0.1 mol/dm³
pH = −log(0.1) = 1`,

  'Titration & Electrolysis':
`25.0 cm³ of Na₂CO₃ neutralised by 20.0 cm³ of 0.25 mol/dm³ HCl.
Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂  (1:2 ratio)
Moles HCl = 0.020 × 0.25 = 0.005 mol
Moles Na₂CO₃ = 0.005/2 = 0.0025 mol
[Na₂CO₃] = 0.0025/0.025 = 0.10 mol/dm³`,

  'Organic Chemistry':
`Propan-1-ol → propanoic acid (oxidation)
CH₃CH₂CH₂OH → [O] → CH₃CH₂COOH
Reagent: acidified KMnO₄ or K₂Cr₂O₇
Propene → 1-bromopropane:
CH₃CH=CH₂ + HBr → CH₃CH₂CH₂Br (Markovnikov: major) or CH₃CHBrCH₃ (minor)`,

  'Energy Changes':
`Calculate ΔH for C + O₂ → CO₂ using bond energies.
Bond energies: C=O (743), O=O (498), C-C (347) — use given values
ΔH = Σ(bonds broken) − Σ(bonds formed)
Breaking: O=O = +498
Forming: 2(C=O) = −2×743 = −1486
ΔH = 498 − 1486 = −988 kJ/mol (exothermic)`,

  'Electrochemistry':
`In electrolysis of CuSO₄ with copper electrodes:
Cathode: Cu²⁺ + 2e⁻ → Cu (copper deposited)
Anode: Cu → Cu²⁺ + 2e⁻ (copper dissolved)
Net effect: copper transferred from anode to cathode — used in electroplating`,

  // ── BIOLOGY ──────────────────────────────────────────────────
  'Cell Structure':
`Calculate magnification.
Actual size of cell = 0.05 mm; image size = 35 mm
Magnification = image / actual = 35/0.05 = ×700
Or: Actual size = image size / magnification
= 40 mm / 1000 = 0.04 mm = 40 μm`,

  'Photosynthesis':
`An experiment shows at 20°C with 1000 lux: rate = 30 units.
At 30°C with 1000 lux: rate = 45 units.
Since temperature change increased rate at high light — temperature was a limiting factor.
At low light, rate = 10 units regardless of temperature → light is limiting`,

  'Respiration':
`RQ (Respiratory Quotient) = CO₂ released / O₂ consumed
Glucose: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O
RQ = 6/6 = 1.0 (pure carbohydrate)
Fat: RQ ≈ 0.7; Protein: RQ ≈ 0.9
Anaerobic (yeast): C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂
No O₂ used → RQ = undefined/infinite`,

  'Genetics & Inheritance':
`Cross Tt × Tt (Tt = tall, tt = short):
Gametes: T, t  ×  T, t
Punnett square: TT, Tt, Tt, tt
Phenotype ratio: 3 tall : 1 short
Genotype ratio: 1 TT : 2 Tt : 1 tt
Probability of tt = 25%`,

  'Natural Selection & Evolution':
`Peppered moth example:
Before industrialisation: pale moths camouflaged on pale bark → survive → reproduce → pale allele frequency high
After: bark darkened by soot → pale moths visible to predators → dark moths survive → dark allele frequency increases
This is natural selection — environmental change drove allele frequency change`,

  'Transport in Plants':
`Transpiration rate factors:
Light: stomata open wider → faster
Temperature: ↑ evaporation → faster
Humidity: ↑ → smaller concentration gradient → slower
Wind: removes water vapour → faster
Potometer measures water uptake (not directly transpiration, but correlated)`,

  'Digestion & Nutrition':
`Benedict\'s test for reducing sugars:
Add equal volume of Benedict\'s reagent; heat in water bath.
Positive (glucose present): blue → brick-red precipitate
Negative: stays blue
Iodine test: starch present → blue-black; absent → orange-brown`,

  'Homeostasis':
`Blood glucose regulation:
High glucose → pancreas secretes INSULIN → cells take up glucose → glycogen stored in liver → glucose level falls
Low glucose → pancreas secretes GLUCAGON → liver breaks down glycogen → glucose released → level rises
This is NEGATIVE FEEDBACK`,

  // ── ECONOMICS ──────────────────────────────────────────────────
  'Market Demand & Supply':
`Demand for coffee rises (income rises — normal good).
Demand curve shifts RIGHT (D₁ → D₂) at all prices.
New equilibrium: P rises from P₁ to P₂; Q rises from Q₁ to Q₂.
Producers benefit (higher revenue); consumers pay more.
Diagram: label both axes, both curves, both equilibria.`,

  'Price Elasticity':
`PED = % change in Qd / % change in P
Price rises from £10 to £12 (+20%); Qd falls from 500 to 400 (−20%).
PED = −20/+20 = −1 (unit elastic)
Revenue: £10×500=£5000 vs £12×400=£4800 → revenue fell (PED > 1 in effect)`,

  'Market Structures':
`Monopoly vs Perfect Competition:
PC: P = MC = minimum ATC (long run); zero economic profit
Monopoly: P > MC; positive economic profit (abnormal profit)
Deadweight loss in monopoly = area of triangle between demand curve, supply (MC), and monopoly quantity
Diagram: show both equilibria on same axes`,

  'Government Intervention':
`Price ceiling below equilibrium (e.g. rent control):
Qs < Qd → shortage = Qd − Qs at the ceiling price
Consumer surplus: some gain (those who get the good at lower price)
Producer surplus: falls
Total welfare: net loss (deadweight loss) — show triangle on diagram`,

  'National Income & GDP':
`GDP by expenditure: GDP = C + I + G + (X−M)
C=£800bn, I=£200bn, G=£350bn, X=£300bn, M=£250bn
GDP = 800+200+350+(300−250) = £1,400bn
Real GDP at base year prices removes inflation effect — use to compare growth over time`,

  'Inflation':
`CPI basket: 40% food (food inflation 6%), 30% housing (3%), 30% transport (2%)
Weighted inflation = 0.4×6 + 0.3×3 + 0.3×2 = 2.4 + 0.9 + 0.6 = 3.9%
If nominal wage rises 2%: real wage = 2 − 3.9 = −1.9% (purchasing power fell)`,

  'Fiscal & Monetary Policy':
`To reduce inflation (demand-pull):
Monetary: Central bank raises interest rates → borrowing ↑cost → C and I fall → AD shifts left → P falls, Y falls
Fiscal: Government raises taxes / cuts spending → disposable income falls → C falls → AD shifts left
Trade-off: lower inflation achieved at cost of higher unemployment (Phillips curve short run)`,

  'International Trade':
`Country A: 1 unit of labour produces 10 wheat OR 5 cloth
Country B: 1 unit produces 6 wheat OR 4 cloth
Opportunity cost of cloth: A = 10/5 = 2 wheat; B = 6/4 = 1.5 wheat
B has comparative advantage in cloth (lower OC) → B should specialise in cloth, A in wheat`,

  // ── BUSINESS ──────────────────────────────────────────────────
  'Cash Flow & Decision Making':
`Month:        Jan    Feb    Mar
Inflows:     £8000  £6000  £9000
Outflows:    £7000  £8500  £7500
Net CF:      +£1000 −£2500 +£1500
Opening bal:  £500  £1500  −£1000
Closing bal: £1500  −£1000  £500
Feb closing is negative → overdraft needed → bank must be contacted in advance`,

  'Financial Statements':
`Revenue: £120,000
Cost of Sales: £72,000
Gross Profit: £48,000  (GP margin = 40%)
Operating expenses: £28,000
Operating Profit: £20,000  (OP margin = 16.7%)
Interest: £2,000
Net Profit before tax: £18,000  (NP margin = 15%)`,

  'Marketing Mix':
`A new chocolate bar. Apply 4Ps:
Product: unique flavour, premium packaging, clear USP
Price: penetration pricing £0.80 (below competition) to gain market share
Place: mass distribution — supermarkets, newsagents, online
Promotion: social media campaign, free samples in stores
All 4Ps must be consistent with target market (teenagers, impulse buy)`,

  'Business Growth & Strategy':
`Ansoff Matrix:
Market penetration: existing product, existing market (sell more Cola in UK)
Market development: existing product, new market (sell Cola in India)
Product development: new product, existing market (Diet Cola for UK)
Diversification: new product, new market (highest risk)
Recommend based on risk appetite and resources available`,

  'Human Resources':
`Maslow\'s Hierarchy: Physiological → Safety → Social → Esteem → Self-actualisation
Apply to motivation: paying fair wages meets physiological needs; job security meets safety; teamwork meets social; recognition meets esteem; autonomy/promotion meets self-actualisation.
Taylor (scientific management): pay per piece as sole motivator — criticised as too simplistic`,

  // ── ACCOUNTING ──────────────────────────────────────────────────
  'Income Statement & Balance Sheet':
`Trading Account:
Sales £95,000 − Returns inward £3,000 = Net Sales £92,000
Cost of Sales: Opening stock £8,000 + Purchases £60,000 − Closing stock £10,000 = £58,000
Gross Profit = £92,000 − £58,000 = £34,000
Less expenses: Rent £6,000, Wages £12,000 = £18,000
Net Profit = £34,000 − £18,000 = £16,000`,

  'Double Entry Bookkeeping':
`Buy goods on credit £2,000 from supplier A:
DR Purchases £2,000  (purchases account increases — debit)
CR Accounts Payable £2,000  (liability increases — credit)
Pay supplier A £2,000 by cheque:
DR Accounts Payable £2,000  (liability decreases — debit)
CR Bank £2,000  (asset decreases — credit)`,

  'Depreciation':
`Machine cost £10,000; residual value £1,000; useful life 5 years.
Straight-line: (10,000−1,000)/5 = £1,800/year
Reducing balance at 30%:
Year 1: 10,000 × 30% = £3,000 depreciation; NBV = £7,000
Year 2: 7,000 × 30% = £2,100; NBV = £4,900`,

  'Ratio Analysis':
`Net Profit Margin = Net Profit / Revenue × 100 = £18,000/£90,000 × 100 = 20%
Current Ratio = Current Assets / Current Liabilities = £25,000/£12,000 = 2.08:1 (healthy — above 1.5:1)
Acid Test = (CA − Inventory) / CL = (25,000−8,000)/12,000 = 1.42:1
Return on Capital Employed = Net Profit / Capital Employed × 100`,

  'Control Accounts':
`Sales Ledger Control Account:
Opening balance (debtors): £12,000
Add: Credit sales £45,000
Less: Cash received from debtors £38,000
Less: Discount allowed £500
Less: Returns inward £1,200
Less: Bad debts written off £300
Closing balance: £17,000 ✓`,

  // ── SOCIOLOGY ──────────────────────────────────────────────────
  'Research Methods':
`Questionnaire on attitudes to education:
Strength: large sample quickly — high representativeness; easy to quantify; cheap
Weakness: low response rate; respondents may not answer honestly (social desirability bias)
Positivists prefer questionnaires (quantitative); Interpretivists prefer interviews (qualitative — deeper meaning)`,

  'Social Stratification':
`Marx: bourgeoisie (own means of production) exploit proletariat (sell labour)
→ class conflict inevitable → revolution → communism
Weber: THREE dimensions of stratification — class (economic), status (social prestige), power (political)
Weber: more nuanced — one can have high status but low income (e.g. vicar)`,

  'Crime & Deviance':
`Merton\'s Strain Theory: crime results from gap between cultural goals (success) and legitimate means.
Adaptations: conformity, innovation (crime), ritualism, retreatism, rebellion
Cohen: subcultures — working-class boys fail in school → form delinquent subcultures → gain status through crime
Labelling (Becker): being labelled deviant leads to master status → self-fulfilling prophecy → more crime`,

  'Education':
`Functionalist view (Durkheim): education passes on shared values; social solidarity; role allocation by meritocracy
Marxist view (Althusser): education is ideological state apparatus; hidden curriculum reproduces capitalist values; legitimises inequality
Evaluation: evidence of inequality (social class gap in attainment) supports Marxist view`,

  // ── PSYCHOLOGY ──────────────────────────────────────────────────
  'Memory':
`Multi-Store Model (Atkinson & Shiffrin):
Stimulus → Sensory Register (very brief, large capacity) → STM (rehearsal) → LTM (permanent)
STM: capacity 7±2 items (Miller); duration ~30 sec without rehearsal
LTM: unlimited capacity and duration
Evaluation: supported by HM case study (hippocampus damage → no new LTM) but oversimplified`,

  'Obedience & Conformity':
`Milgram (1963): 65% gave 450V shock to learner when ordered by authority figure
Factors increasing obedience: proximity of authority, legitimacy, gradual commitment (foot-in-door)
Asch (1951): 75% conformed at least once in line-length task with confederates
Factors: group size (up to 3), unanimity (ally reduces conformity), task difficulty`,

  'Stress':
`Selye\'s General Adaptation Syndrome (GAS):
Stage 1 — Alarm: adrenaline released, heart rate ↑, cortisol released
Stage 2 — Resistance: body adapts and copes
Stage 3 — Exhaustion: resources depleted → illness
Holmes & Rahe SRRS: stressful life events score correlates with illness onset
Evaluation: correlation not causation; individual differences ignored`,

  'Development':
`Piaget\'s stages:
Sensorimotor (0–2): object permanence develops
Pre-operational (2–7): egocentrism, no conservation
Concrete operational (7–11): conservation mastered, logic with concrete objects
Formal operational (11+): abstract and hypothetical thinking
Evaluation: underestimated children (McGarrigle & Donaldson showed children can conserve earlier in natural context)`,

  // ── ICT ──────────────────────────────────────────────────────
  'Data Representation':
`Convert decimal 195 to binary:
195 ÷ 2 = 97 r 1
97 ÷ 2 = 48 r 1
48 ÷ 2 = 24 r 0
24 ÷ 2 = 12 r 0
12 ÷ 2 = 6  r 0
6  ÷ 2 = 3  r 0
3  ÷ 2 = 1  r 1
1  ÷ 2 = 0  r 1
Reading remainders bottom-up: 11000011₂
Hex: split into nibbles: 1100 = C, 0011 = 3 → 0xC3`,

  'Networks & Internet':
`IP address 192.168.1.0/24:
Subnet mask: 255.255.255.0
Network address: 192.168.1.0
Broadcast: 192.168.1.255
Usable hosts: 192.168.1.1 to 192.168.1.254 = 254 hosts
Data packet travels: source → switch → router → ISP → internet → destination ISP → router → switch → destination`,

  'Security & Ethics':
`Caesar cipher: shift each letter by 3
"HELLO" → H+3=K, E+3=H, L+3=O, L+3=O, O+3=R → "KHOOR"
Decrypt: shift back by 3
RSA asymmetric encryption: public key encrypts (anyone can send), private key decrypts (only receiver)
Symmetric (AES): same key both ends — faster but key exchange is the security challenge`,

  'Databases':
`Entity-Relationship: Student(StudentID PK, Name, DOB) takes Course(CourseID PK, Title) through Enrolment(StudentID FK, CourseID FK, Grade)
SQL query:
SELECT Student.Name, Course.Title, Enrolment.Grade
FROM Student JOIN Enrolment ON Student.StudentID = Enrolment.StudentID
JOIN Course ON Enrolment.CourseID = Course.CourseID
WHERE Grade = 'A'`,

  // ── COMPUTER SCIENCE ──────────────────────────────────────────
  'Programming Concepts':
`Bubble sort trace: [5, 3, 8, 1]
Pass 1: [3,5,8,1] → [3,5,8,1] → [3,5,1,8]
Pass 2: [3,5,1,8] → [3,1,5,8]
Pass 3: [1,3,5,8] ← sorted
Comparisons = n(n−1)/2 = 6 for n=4
Best case (already sorted): O(n); Worst: O(n²)`,

  'Algorithms & Pseudocode':
`Binary search for 42 in [10,15,22,31,42,58,67]:
mid = index 3 → value 31 → 42 > 31, search right half
mid = index 5 → value 58 → 42 < 58, search left
mid = index 4 → value 42 → FOUND ✓
Maximum comparisons: log₂(7) ≈ 3 (vs 7 for linear search)`,

  'Data Structures':
`Stack (LIFO) for undo operations:
PUSH A, PUSH B, PUSH C → stack: [A, B, C] (C on top)
POP → returns C; stack: [A, B]
Queue (FIFO) for print jobs:
ENQUEUE Job1, Job2, Job3
DEQUEUE → returns Job1; queue: [Job2, Job3]`,

  // ── HISTORY ──────────────────────────────────────────────────
  'Causes of WWI':
`MAIN framework:
M — Militarism: European arms race, especially Anglo-German naval race
A — Alliances: Triple Alliance (Germany, Austria-Hungary, Italy) vs Triple Entente (France, Russia, Britain)
I — Imperialism: competition for colonies created tensions
N — Nationalism: Serbian nationalism threatened Austria-Hungary; pan-Slavism alarmed Austria
Trigger: assassination of Franz Ferdinand, June 1914 → alliance system escalated local conflict to world war`,

  'Rise of Hitler':
`1919: Germany accepts Treaty of Versailles — humiliation, reparations £6.6bn, loss of 13% territory
1923: hyperinflation — wheelbarrow of money for bread
1929: Great Depression — 6 million unemployed by 1932
1933: Hitler appointed Chancellor — 43.9% Nazi vote in Nov 1932 elections
Key: economic crisis + resentment of Versailles + Nazi propaganda + Weimar instability`,

  // ── GEOGRAPHY ──────────────────────────────────────────────────
  'Tectonic Hazards':
`2010 Haiti earthquake vs 2011 Japan earthquake:
Haiti: magnitude 7.0, 230,000 deaths — LIC, poor building codes, no early warning system
Japan: magnitude 9.0, 20,000 deaths — HIC, strict building codes, tsunami warning system
Lesson: wealth and preparedness reduce death toll more than earthquake magnitude`,

  'Climate & Weather':
`Depression (mid-latitude cyclone) sequence:
1. Warm front arrives: cloud thickens, rain starts
2. Warm sector: mild, drizzle
3. Cold front: heavy rain, thunderstorms, temperature drops sharply
4. Cold air mass follows: bright spells, showers
Anticyclone: high pressure, diverging air, clear skies, cold nights in winter, warm in summer`,

  'Population':
`DTM (Demographic Transition Model):
Stage 1: High BR, High DR → low growth (pre-industrial)
Stage 2: High BR, Falling DR → rapid growth (improving healthcare)
Stage 3: Falling BR, Low DR → slow growth (urbanisation, education)
Stage 4: Low BR, Low DR → stable (developed world)
Stage 5: BR < DR → population decline (some European countries)`,

  // ── ENGLISH ──────────────────────────────────────────────────
  'Reading Non-Fiction':
`Analyse: "The city devoured the night with its blazing neon hunger."
Technique: personification ("devoured"), metaphor (city as living creature), noun phrase ("blazing neon hunger")
Effect: creates impression of city as aggressive, insatiable — overwhelms natural world (night)
AO2 mark: "The verb 'devoured' gives the city predatory, animalistic qualities, suggesting it destroys the natural world."`,

  'Writing Skills':
`Effective opening techniques:
1. Shocking statistic: "Every 40 seconds, someone takes their own life."
2. Rhetorical question: "How long will we ignore what is right in front of us?"
3. In medias res: "The letter arrived on a Tuesday. Everything changed by Wednesday."
4. Anecdote: Brief, vivid personal story to hook reader
Avoid: starting with "I am going to write about..." — too weak`,

  // ── LITERATURE ──────────────────────────────────────────────────
  'Themes & Context':
`Analysing theme of power in Macbeth:
Point: Shakespeare presents power as ultimately destructive.
Evidence: "I am in blood stepped in so far that should I wade no more, returning were as tedious as go o\'er"
Analysis: The metaphor of wading through blood suggests Macbeth is trapped — power has dragged him into irreversible moral corruption. The word "tedious" shockingly reduces mass murder to mere inconvenience, revealing his complete moral collapse.
Context: Jacobean audience would see this as divine punishment for ambition against God\'s order.`,

  // ── ENVIRONMENTAL ─────────────────────────────────────────────
  'Climate Change & Global Warming':
`Carbon footprint calculation:
Flight London–New York: ~1 tonne CO₂ per passenger
Diet (meat-eater): ~2.5 tonnes CO₂/year vs vegetarian ~1.5 tonnes
Car (petrol, 10,000 miles): ~2.4 tonnes CO₂
Total average UK: ~10 tonnes/person/year; target: 2 tonnes by 2050
Mitigation: switch to renewable energy, electric vehicles, reduce aviation`,

  'Ecosystems & Biodiversity':
`Food chain energy flow:
Grass → Rabbit → Fox → Eagle
Energy lost at each step: ~90% (as heat, movement, waste)
100,000 kJ grass → 10,000 kJ rabbit → 1,000 kJ fox → 100 kJ eagle
This is why food chains rarely have more than 5 levels
Biodiversity index = species richness × evenness — higher = more stable ecosystem`,

  // ── FRENCH ────────────────────────────────────────────────────
  'Passé Composé & Imparfait':
`J'allais au marché (imparfait — habitual past action)
Je suis allé(e) au marché hier (passé composé — specific completed event)
Être verbs (MRS VANDERTRAMPP): aller, venir, partir, arriver, naître, mourir...
Agreement: Elle est partie ✓ (not parti)  |  Ils sont allés ✓
Avoir verbs: no agreement unless direct object precedes: "Les lettres qu\'il a écrites"`,

  'Future & Conditional':
`Futur simple: infinitive + endings (ai, as, a, ons, ez, ont)
Je mangerai demain. (I will eat tomorrow)
Irregular stems: aller → ir-, être → ser-, avoir → aur-, faire → fer-
Conditional: ir- + imperfect endings → je mangerais (I would eat)
Si + imparfait → conditionnel: Si j\'avais de l\'argent, j\'achèterais une voiture.`,

  // ── SPANISH ───────────────────────────────────────────────────
  'Preterite & Imperfect':
`Preterite (pretérito indefinido) — completed specific event:
Ayer comí pizza. (Yesterday I ate pizza.)
Regular -AR: hablé, hablaste, habló, hablamos, hablasteis, hablaron
Irregular: ser/ir → fui, fuiste, fue... (same forms!)
Imperfect — habitual/ongoing past:
Cuando era niño, jugaba al fútbol. (When I was a child, I used to play football.)`,

  'Subjunctive & Complex Grammar':
`Subjunctive after: querer que, esperar que, dudar que, es importante que
Quiero que vengas. (I want you to come — NOT venir)
Formation -AR: hablar → hable, hables, hable, hablemos, habléis, hablen
Trigger: changed subject + clause expressing desire/doubt/emotion/impersonal expression`,

  // ── ARABIC ───────────────────────────────────────────────────
  'Comprehension Skills':
`Strategy for Arabic comprehension:
1. Read questions FIRST to know what information to find
2. Skim passage for main idea (المعنى العام)
3. Read carefully for specific details
4. Quote directly from text — copy accurately including short vowels
5. Inference questions: justify with textual evidence even if not stated explicitly
6. Check word count for summary questions — do not exceed limit`,

  'Writing & Composition':
`Formal Arabic letter structure:
Opening: المحترم/المحترمة + title + name
Introduction: أكتب إليكم بخصوص...
Paragraphs: point → elaboration → example (use روابط: أولاً، ثانياً، علاوة على ذلك)
Conclusion: أتطلع إلى ردكم... / شاكراً حسن تعاونكم
Closing: تفضلوا بقبول فائق الاحترام والتقدير
Use فصحى throughout — avoid عامية`,

  // ── RELIGIOUS STUDIES ─────────────────────────────────────────
  'Ethics & Moral Philosophy':
`Issue: Is capital punishment ever justified?
Christian perspectives:
FOR: Genesis 9:6 "whoever sheds human blood, by humans shall their blood be shed" — retributive justice
AGAINST: "Thou shalt not kill" (Exodus); sanctity of human life; forgiveness central to Christianity
Islamic perspective:
FOR: Qisas (equal retaliation) permitted in Quran (2:178) for murder; deterrence protects society
AGAINST: Must meet very high evidential standard; forgiveness (عفو) preferred; possibility of error
Conclusion: Both traditions allow it but strongly prefer rehabilitation and forgiveness`,
};

// ── Main injection logic ───────────────────────────────────────────
const subjMatch = src.match(/const IGCSE_SUBJECTS\s*=\s*(\{[\s\S]*?\n\})\s*;/);
let subjects;
eval('subjects = ' + subjMatch[1]);

let added = 0;

for (const [sk, subj] of Object.entries(subjects)) {
  for (const b of subj.boards) {
    const chs = subj.chapters[b] || [];
    for (const ch of chs) {
      for (const tp of ch.topics) {
        if (tp.workedExample) continue; // already has one
        const we = WORKED[tp.title];
        if (!we) continue;

        // Find topic in source
        const titleIdx = src.indexOf(`title:'${tp.title}'`);
        if (titleIdx === -1) continue;

        // Find points array end
        const pointsStart = src.indexOf('points:[', titleIdx);
        if (pointsStart === -1 || pointsStart - titleIdx > 200) continue;

        let depth = 0;
        let i = pointsStart + 7;
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

        // Find the last field's closing position
        let lastFieldEnd = pointsEnd;

        const checkArray = (keyword) => {
          const start = src.indexOf(keyword, lastFieldEnd);
          if (start === -1 || start - lastFieldEnd > 500) return;
          let d = 0, j = start + keyword.length - 1; // position at [
          while (j < src.length) {
            if (src[j] === '[') d++;
            else if (src[j] === ']') {
              if (d === 0) { lastFieldEnd = j; return; }
              d--;
            }
            j++;
          }
        };

        checkArray('examTips:[');
        checkArray('commonMistakes:[');

        // Check for existing workedExample backtick (should not exist but be safe)
        const wePos = src.indexOf('workedExample:`', lastFieldEnd);
        if (wePos !== -1 && wePos - lastFieldEnd < 500) {
          // find closing backtick
          let j = wePos + 15;
          while (j < src.length && src[j] !== '`') j++;
          lastFieldEnd = j;
        }

        const insertPos = lastFieldEnd + 1;
        const safeWe = we.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
        const injection = `, workedExample:\`${safeWe}\``;

        src = src.slice(0, insertPos) + injection + src.slice(insertPos);
        added++;
      }
    }
  }
}

console.log(`workedExample added: ${added}`);

try {
  new Function(src);
  console.log('SYNTAX OK');
  writeFileSync(file, src);
  console.log('File written successfully');
} catch(e) {
  console.log('SYNTAX ERROR:', e.message);
  // Find the line
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    try { new Function(lines.slice(0, i+1).join('\n')); } catch(e2) {
      if (e2.message === e.message) {
        console.log('Error near line', i+1, ':', lines[i].substring(0, 120));
        break;
      }
    }
  }
  writeFileSync(file + '.we_bak', src);
}
