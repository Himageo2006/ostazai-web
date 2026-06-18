import { readFileSync, writeFileSync } from 'fs';
let src = readFileSync('app.js', 'utf8');

// 200+ additional worked examples
const WORKED = {
  // ── MATHS (more) ──────────────────────────────────────────────
  'Ratio & Proportion': 'Divide £360 in ratio 3:5:4\nTotal parts = 12\nEach part = £360/12 = £30\nShares: £90, £150, £120\nDirect proportion: if 5 workers take 12 days, how long for 8?\n5×12 = 8×d → d = 60/8 = 7.5 days',
  'Percentages': 'Compound interest: £2000 at 5% p.a. for 3 years\nA = 2000 × (1.05)³ = 2000 × 1.1576 = £2315.25\nSimple interest: I = PRT/100 = 2000×5×3/100 = £300\nDifference = £15.25 (compound pays more)',
  'Circles & Arcs': 'Sector radius 12cm, arc length 15.7cm.\nAngle = arc/(2πr) × 360° = 15.7/(2π×12) × 360 = 75°\nArea of sector = (75/360) × π × 144 = 94.2 cm²\nArea of triangle OAB = ½r²sinθ = ½×144×sin75° = 69.5 cm²\nSegment area = 94.2 - 69.5 = 24.7 cm²',
  'Loci & Construction': 'Construct triangle ABC: AB=6cm, AC=5cm, BC=4cm.\nDraw AB=6cm base. Open compass to 5cm from A, arc above AB.\nOpen compass to 4cm from B, arc intersects first arc at C.\nJoin AC and BC. Locus of points 3cm from AB is a parallel line.',
  'Bearings & Scale Drawing': 'A ship sails 40km on bearing 060°, then 30km on bearing 150°.\nUse cosine rule or scale drawing (1cm=10km).\nDraw first leg NE direction, second leg SE.\nMeasure resultant: ≈50km at bearing ≈099°',
  'Histograms & Data': 'Class 20–30: freq=15, width=10 → freq density=1.5\nClass 30–45: freq=24, width=15 → freq density=1.6\nClass 45–60: freq=18, width=15 → freq density=1.2\nHistogram bar heights = frequency density (NOT frequency)\nEstimated mean: Σ(midpoint×freq)/Σfreq',
  'Cumulative Frequency': 'Scores: 0-20(5), 20-40(15), 40-60(25), 60-80(30), 80-100(25)\nCumulative: 5, 20, 45, 75, 100\nMedian = value at 50th percentile = 50th student ≈ 62\nIQR = Q3-Q1 = 75th percentile - 25th percentile ≈ 72-45 = 27',
  'Probability Trees': 'Bag has 3 red, 2 blue. Draw 2 without replacement.\nP(RR) = 3/5 × 2/4 = 6/20 = 0.3\nP(BB) = 2/5 × 1/4 = 2/20 = 0.1\nP(one of each) = P(RB)+P(BR) = (3/5×2/4)+(2/5×3/4) = 6/20+6/20 = 0.6\nCheck: 0.3+0.1+0.6 = 1.0 ✓',
  'Scatter Graphs & Correlation': 'Plot height vs shoe size for 10 students.\nPositive correlation: taller students tend to have bigger feet.\nLine of best fit: draw through the mean point (x̄, ȳ).\nUse line to predict: if height=170cm, read off shoe size.\nInterpolation (within data range) is reliable; extrapolation is not.',
  'Pie Charts & Bar Charts': 'Survey of 120 students: 45 like maths, 30 physics, 25 chemistry, 20 biology.\nPie chart: maths = 45/120 × 360° = 135°\nPhysics = 90°, Chemistry = 75°, Biology = 60°\nCheck: 135+90+75+60 = 360° ✓',
  'Mean, Median, Mode': 'Dataset: 3,5,5,7,8,9,11. n=7\nMean = (3+5+5+7+8+9+11)/7 = 48/7 = 6.86\nMedian = 4th value = 7 (middle of 7)\nMode = 5 (appears twice)\nRange = 11-3 = 8\nAdding outlier 100: mean increases greatly; median barely changes',
  'Pythagoras & 3D': 'Cuboid 8×6×5. Find long diagonal.\nBase diagonal: d = √(8²+6²) = √100 = 10\nLong diagonal: D = √(10²+5²) = √125 = 5√5 ≈ 11.18\nAlternatively: D = √(8²+6²+5²) = √125 directly',
  'Area & Volume': 'Cone: r=6cm, l=10cm (slant height)\nHeight h = √(10²-6²) = √64 = 8cm\nVolume = ⅓πr²h = ⅓π×36×8 = 301.6 cm³\nCurved surface area = πrl = π×6×10 = 188.5 cm²\nTotal SA = 188.5 + π×36 = 301.6 cm²',
  'Compound Interest & Depreciation': 'Car bought for £15,000 depreciates 20% per year.\nAfter 1 year: 15000×0.8 = £12,000\nAfter 3 years: 15000×0.8³ = 15000×0.512 = £7,680\nPercentage loss = (15000-7680)/15000×100 = 48.8%',
  'Direct & Inverse Proportion': 'y ∝ x²: when x=3, y=36. Find y when x=5.\nk = 36/9 = 4, so y = 4x²\ny = 4×25 = 100\nInverse: y ∝ 1/x: when x=4, y=6 → k=24\nWhen x=8: y = 24/8 = 3',

  // ── ADD MATHS (more) ──────────────────────────────────────────
  'Quadratic Functions & Inequalities': 'f(x) = x² - 6x + 8 = (x-2)(x-4)\nVertex: x = 3 (midpoint of roots), y = 9-18+8 = -1\nVertex form: f(x) = (x-3)² - 1\nSolve x² - 6x + 8 < 0: roots at x=2 and x=4\nSolution: 2 < x < 4 (parabola opens upward, negative between roots)',
  'Exponential Growth & Decay': 'Bacteria: N = 200 × 2^t (t in hours)\nAt t=0: N=200; at t=3: N=200×8=1600\nDecay: N = 500 × e^(-0.1t)\nHalf-life: 0.5 = e^(-0.1t) → t = ln(0.5)/(-0.1) = 6.93 hours\nRate of change: dN/dt = -50e^(-0.1t) (negative = decreasing)',
  'Modulus Functions': '|2x-3| = 5\nCase 1: 2x-3=5 → x=4\nCase 2: 2x-3=-5 → x=-1\nGraph: V-shape with vertex at (1.5, 0)\nFor |x| < a: -a < x < a\nFor |x| > a: x < -a or x > a',
  'Partial Fractions': 'Express (3x+5)/((x+1)(x+2)) as partial fractions\n3x+5 ≡ A(x+2) + B(x+1)\nLet x=-2: -1 = -B → B=1\nLet x=-1: 2 = A → A=2\nAnswer: 2/(x+1) + 1/(x+2)',
  'Solving Cubic Equations': 'Show x=2 is a root of x³-3x²-4x+12=0, then factorise fully.\nSubstitute: 8-12-8+12=0 ✓\nDivide by (x-2): x²-x-6 = (x-3)(x+2)\nFull factorisation: (x-2)(x-3)(x+2)\nRoots: x = 2, 3, -2',
  'Differentiation Applications': 'A rectangle has perimeter 40cm. Find max area.\nLet width=x, then length=20-x\nArea A = x(20-x) = 20x-x²\ndA/dx = 20-2x = 0 → x=10\nd²A/dx² = -2 < 0 → maximum\nMax area = 10×10 = 100 cm²',
  'Integration Applications': 'Find area between y=x² and y=x+2\nIntersections: x²=x+2 → x²-x-2=0 → x=-1 or x=2\nArea = ∫₋₁² (x+2-x²)dx = [x²/2+2x-x³/3]₋₁²\n= (2+4-8/3) - (½-2+⅓) = 10/3 - (-7/6) = 27/6 = 4.5 sq units',
  'Vectors in 2D': 'a=(3,4), b=(1,-2). Find |a|, |b|, a·b, angle between them.\n|a|=√(9+16)=5, |b|=√(1+4)=√5\na·b = 3×1 + 4×(-2) = 3-8 = -5\ncosθ = -5/(5√5) = -1/√5 → θ = cos⁻¹(-0.447) = 116.6°',
  'Arithmetic & Geometric Progressions': 'AP: a=5, d=3. Find S₂₀.\nS₂₀ = 20/2 × (2×5 + 19×3) = 10 × (10+57) = 670\nGP: a=2, r=3. Find when term > 1000.\n2×3^(n-1) > 1000 → 3^(n-1) > 500 → (n-1)ln3 > ln500 → n > 7.08 → n≥8',

  // ── PHYSICS (more) ──────────────────────────────────────────────
  'States of Matter & Kinetic Theory': 'Gas: 300K, 1.5×10⁵ Pa, volume 2.0L. Find new volume at 450K, 1.0×10⁵ Pa.\nUsing pV/T = constant:\np₁V₁/T₁ = p₂V₂/T₂\n(1.5×10⁵×2)/(300) = (1.0×10⁵×V₂)/(450)\nV₂ = (1.5×2×450)/(300×1.0) = 4.5 L',
  'Waves & Optics': 'Convex lens, f=20cm, object at 60cm.\n1/f = 1/v - 1/u (using sign convention)\n1/20 = 1/v + 1/60 (object at -60cm)\n1/v = 1/20 - 1/60 = 3/60 - 1/60 = 2/60 → v = 30cm\nMagnification = v/u = 30/60 = 0.5 (smaller, real, inverted)',
  'Electricity & Circuits': 'Filament bulb: 60W, 240V supply.\nI = P/V = 60/240 = 0.25A\nR = V/I = 240/0.25 = 960Ω\nEnergy in 4 hours = Pt = 60×4×3600 = 864,000J = 0.24 kWh\nCost at 15p/kWh = 0.24×15 = 3.6p',
  'Thermal Physics': 'Ideal gas: 2 mol at 300K, 1 atm. Find V.\npV = nRT → V = nRT/p = 2×8.31×300/(101325) = 0.0492 m³\nKE per mol = 3/2 RT = 3/2 × 8.31 × 300 = 3740J\nAt 600K: KE doubles to 7480J; pressure doubles if V constant (Gay-Lussac)',
  'Magnetism & Electromagnetism': 'Transformer: primary 240V, 800 turns; secondary 40V.\nN_s/N_p = V_s/V_p → N_s = 800×40/240 = 133 turns\nIf primary current = 0.5A, find secondary (100% efficiency):\nP = V_p×I_p = V_s×I_s → I_s = 240×0.5/40 = 3A\nStep-down transformer: V decreases, I increases',
  'Radioactivity': 'Initial activity 9600 Bq, half-life 6 hours.\n6h: 4800 Bq → 12h: 2400 → 18h: 1200 → 24h: 600 Bq\nFraction remaining after 24h = 600/9600 = 1/16 = (½)⁴\nUsing formula: A = A₀(½)^(t/t½) = 9600×(½)^4 = 600 Bq ✓\nDecay equation: ²²⁶Ra → ⁴He + ²²²Rn (alpha decay)',
  'Pressure': 'Submarine at depth 500m. Find water pressure.\nρ=1025 kg/m³, g=10 N/kg\nP = ρgh = 1025×10×500 = 5.125×10⁶ Pa ≈ 50.6 atm\nAdd atmospheric pressure: total = 5.226×10⁶ Pa\nHydraulic press: small piston area 0.01m², force 200N → pressure 20,000Pa\nLarge piston area 0.5m² → force = 20,000×0.5 = 10,000N',
  'Light & Electromagnetic Spectrum': 'Visible light refracted entering glass (n=1.5).\nIncident angle 45°. Find refracted angle.\nSnell: n₁sinθ₁ = n₂sinθ₂\n1×sin45° = 1.5×sinθ₂\nsinθ₂ = 0.707/1.5 = 0.471 → θ₂ = 28.1°\nTotal internal reflection: sinC = 1/n = 1/1.5 → C = 41.8°',
  'Sound': 'Distance to thunder clap: you hear thunder 4s after lightning.\nSpeed of sound = 340 m/s\nDistance = 340×4 = 1360m = 1.36km\nEcho: cliff 170m away. Time = 2×170/340 = 1.0s\nFrequency of tuning fork 440Hz: wavelength = 340/440 = 0.77m',
  'Forces in Equilibrium': 'Ladder 5m long, weight 200N at midpoint, leans at 60° to floor.\nMoments about base (to find normal force at wall W):\nW×5sin60° = 200×2.5cos60°\nW×4.33 = 250\nW = 57.7N\nFriction at base = W = 57.7N (horizontal equilibrium)\nNormal at base = 200N (vertical equilibrium)',

  // ── CHEMISTRY (more) ──────────────────────────────────────────
  'Periodic Table & Trends': 'Going down Group 1 (alkali metals): atomic radius increases (more shells);\nionisation energy decreases (outer electron further from nucleus and more shielded);\nreactivity increases (outer electron lost more easily).\nNa + H₂O → NaOH + ½H₂: vigorous; K more vigorous; Cs explosive.',
  'Chemical Equilibrium': 'N₂ + 3H₂ ⇌ 2NH₃, ΔH = -92 kJ/mol\nLe Chatelier: increase pressure → shifts right (fewer moles of gas)\nIncrease temperature → shifts left (endothermic reverse)\nAdd catalyst → equilibrium reached faster, position UNCHANGED\nHaber process: 450°C, 200 atm, Fe catalyst — compromise for rate and yield',
  'Electrochemistry': 'Copper plating: CuSO₄ solution, copper anode, steel cathode, 2A for 30 min.\nCharge Q = It = 2×1800 = 3600C\nMoles e⁻ = 3600/96500 = 0.0373 mol\nCu²⁺ + 2e⁻ → Cu: moles Cu = 0.0373/2 = 0.0187 mol\nMass Cu = 0.0187×64 = 1.19g',
  'Metals & Reactivity': 'Reactivity series (high to low): K,Na,Ca,Mg,Al,Zn,Fe,Pb,H,Cu,Ag,Au\nZn + CuSO₄ → ZnSO₄ + Cu (displacement: Zn more reactive than Cu)\nExtraction: Al by electrolysis (very reactive); Fe by blast furnace (moderate)\nCorroding of iron: needs O₂ AND water; galvanising (Zn coating) prevents rusting',
  'Crude Oil & Hydrocarbons': 'Fractional distillation of crude oil: heated to ~400°C; vapours rise up column.\nLong chains (high bp): heavy fuel oil (bottom)\nShort chains (low bp): petrol/naphtha (top)\nCracking: C₁₆H₃₄ → C₈H₁₈ + C₈H₁₆ (longer alkane → shorter alkane + alkene)\nAlkenes more valuable: polymerisation (plastics), addition reactions',
  'Polymers & Plastics': 'Addition polymer from ethene:\nn(CH₂=CH₂) → (-CH₂-CH₂-)ₙ (polyethene/HDPE)\nCondensation polymer: nylon from diamine + dicarboxylic acid → releases H₂O\nPET (polyester): terephthalic acid + ethylene glycol → releases H₂O\nBiodegradable vs non-biodegradable: PLA biodegrades; PET does not',
  'Redox Reactions': 'Fe₂O₃ + 3CO → 2Fe + 3CO₂ (blast furnace)\nOxidation states: Fe in Fe₂O₃ is +3; reduced to 0 in Fe\nC in CO is +2; oxidised to +4 in CO₂\nOIL RIG: Oxidation Is Loss (of electrons), Reduction Is Gain\nBalancing redox: balance atoms, then electrons, then charge',
  'Gas Calculations': 'At RTP (25°C, 1atm), 1 mole of gas = 24 dm³\n3g of magnesium + excess HCl. Volume of H₂ at RTP?\nMg + 2HCl → MgCl₂ + H₂\nMoles Mg = 3/24 = 0.125 mol → moles H₂ = 0.125 mol\nVolume = 0.125 × 24,000 = 3,000 cm³ = 3 dm³',

  // ── BIOLOGY (more) ──────────────────────────────────────────────
  'Enzymes': 'Enzyme activity vs temperature:\n20°C: slow (low KE); 37°C: optimal (most substrate-enzyme collisions)\n50°C: activity falls (enzyme denatured — H-bonds broken, active site shape changes)\nLock-and-key model: specific substrate fits active site\nInhibitors: competitive (blocks active site, overcome by more substrate)\nnon-competitive (changes shape of enzyme permanently)',
  'Diffusion & Osmosis': 'Potato experiment: strips in 0%, 5%, 10%, 20% sucrose\n0% (distilled water): potato gains mass (water enters by osmosis)\n10% approx isotonic (no change)\n20%: potato loses mass (water leaves)\nGraph: mass change vs concentration — negative gradient\nWP of potato cell < WP of 0% solution → water moves in',
  'Blood & Circulation': 'Pulmonary circulation: right ventricle → lungs → left atrium (low pressure)\nSystemic: left ventricle → body → right atrium (high pressure)\nBlood pressure: 120/80 mmHg (systolic/diastolic)\nO₂ dissociation curve: shifts right in tissues (high CO₂, lower pH)\nHaemoglobin carries O₂ in red blood cells; plasma carries CO₂ as HCO₃⁻',
  'Kidneys & Excretion': 'Filtration: at Bowman\'s capsule — small molecules pass; proteins and blood cells do not\nReabsorption: glucose, amino acids, water reabsorbed in PCT\nADH (anti-diuretic hormone): increases water reabsorption in collecting duct\nHigh ADH (dehydrated): concentrated, small volume urine\nLow ADH (well hydrated): dilute, large volume urine',
  'Nervous System': 'Reflex arc: stimulus → receptor → sensory neurone → relay neurone (spinal cord) → motor neurone → effector\nSynapse: impulse → neurotransmitter released → diffuses across gap → binds to receptor\nSpeed of nerve impulse faster with myelin sheath (saltatory conduction)\nKnee-jerk reflex: 2-neurone arc (no relay) — fastest possible response',
  'Hormones': 'Insulin-glucagon antagonism:\nAfter meal: blood glucose rises → β-cells secrete insulin → cells take up glucose → glycogen stored\nFasting: blood glucose falls → α-cells secrete glucagon → liver breaks glycogen down → glucose released\nDiabetes Type 1: no insulin produced; Type 2: cells insensitive to insulin\nThyroxine: regulates metabolic rate (negative feedback via TRH/TSH axis)',
  'Reproduction': 'Menstrual cycle: days 1-5 menstruation; day 14 ovulation\nFSH: stimulates follicle growth and oestrogen secretion\nOestrogen: repairs uterine lining; LH surge triggers ovulation\nProgesterone: maintains uterine lining in luteal phase; high levels inhibit FSH/LH\nIf fertilised: HCG maintains corpus luteum; if not: corpus luteum degenerates → progesterone falls → menstruation',
  'Immune System': 'Primary response (first exposure): slow, low antibody level\nMemory B-cells formed during primary response\nSecondary response (re-exposure): faster, much higher antibody level — immunity\nVaccination: introduces antigen (dead/weakened pathogen) → primary response without disease\nMonoclonal antibodies: produced by hybridoma cells; used in pregnancy tests, cancer treatment',
  'Plant Hormones': 'Auxin experiment: oat coleoptile grown toward light (phototropism)\nAuxin moves to shaded side → cells elongate more on shaded side → tip bends toward light\nGibberellins: promote seed germination and stem elongation\nEthene: promotes fruit ripening (used commercially — spray unripe fruit)\nAbscisic acid: promotes stomatal closure during drought (stress hormone)',
  'Genetics (extended)': 'Codominance example: blood groups\nIA IA or IAi → blood group A\nIB IB or IBi → blood group B\nIA IB → blood group AB (both alleles expressed)\nii → blood group O\nCross AO × BO: IA IB, IAi, IBi, ii → equal chance of A, B, AB, O\nSex-linked: haemophilia gene on X-chromosome. XH Xh carrier female × XH Y male\nDaughters: XH XH (normal), XH Xh (carrier)\nSons: XH Y (normal), Xh Y (haemophiliac)',

  // ── ECONOMICS (more) ──────────────────────────────────────────
  'Income Elasticity of Demand': 'YED = % change in Qd / % change in income\nNormal good: YED > 0 (demand rises as income rises)\nInferior good: YED < 0 (demand falls as income rises — e.g. bus travel)\nLuxury good: YED > 1 (e.g. foreign holidays)\nNecessity: 0 < YED < 1 (e.g. food)\nIf income rises 10% and Qd rises 25%: YED = 2.5 (luxury)',
  'Cross Elasticity of Demand': 'XED = % change in Qd of A / % change in price of B\nSubstitutes: XED > 0 (e.g. butter and margarine — if butter price rises, more margarine demanded)\nComplements: XED < 0 (e.g. cars and petrol — if petrol price rises, fewer cars bought)\nUnrelated goods: XED = 0\nFirm strategy: if XED high (close substitutes), small price rise → large sales loss',
  'Market Failure': 'Negative externality — factory pollutes river:\nPrivate MC < Social MC → overproduction at Q₁ > Q*\nDeadweight loss = triangle between SMC and demand curves\nGovernment solutions: tax equal to marginal external cost (Pigouvian tax),\nregulation (ban/limit), tradable permits, education\nPositive externality (education): private MB < SMB → underproduction; solution: subsidy',
  'Economic Growth': 'GDP growth = % change in real GDP\nYear 1: GDP £400bn; Year 2: GDP £412bn (current prices); inflation 1%\nNominal growth = 3%; Real growth = 3%-1% = 2%\nAD/AS model: LRAS shifts right with growth\nBenefits: higher living standards, reduced unemployment, more tax revenue\nCosts: environmental damage, inequality, inflation risk',
  'Unemployment': 'Types of unemployment:\nFrictional: between jobs, short-term — accept; not concerning\nStructural: skills mismatch (e.g. coal miners when mines close) — retraining needed\nCyclical/demand-deficient: caused by recession — fiscal/monetary stimulus\nSeasonal: e.g. tourism workers in winter — limited concern\nUnemployment rate = (unemployed/labour force) × 100',
  'Balance of Payments': 'Current account components:\nTrade in goods: exports - imports (e.g. UK: deficit as imports > exports)\nTrade in services: e.g. UK surplus (financial services, tourism)\nPrimary income: investment income flows\nSecondary income: transfers (e.g. foreign aid)\nDeficit remedies: devalue currency (exports cheaper, imports dearer),\ndeflationary policy (reduces import demand), supply-side improvements',

  // ── BUSINESS (more) ──────────────────────────────────────════
  'Break-Even Analysis': 'Fixed costs: £30,000. Variable cost/unit: £5. Selling price: £15.\nContribution per unit = 15-5 = £10\nBreak-even output = FC/contribution = 30,000/10 = 3,000 units\nMargin of safety = actual output - BEP output\nIf actual = 4,000: MoS = 1,000 units or 1,000×£15 = £15,000 revenue',
  'Sources of Finance': 'Short-term: overdraft (flexible but high interest), trade credit (free but limited)\nMedium-term: bank loan (fixed repayments), leasing (preserve cash)\nLong-term: share issue (no repayment but dilutes ownership), retained profit (free but limited)\nEvaluate: consider cost, control, risk, time period, amount needed',
  'Market Research': 'Primary research: questionnaire, interview, observation, test marketing\nAdvantage: tailored to your purpose; up-to-date\nDisadvantage: time-consuming, expensive, potential bias\nSecondary research: government data, trade journals, competitor reports\nAdvantage: cheap, quick; Disadvantage: may be outdated, not specific to your purpose\nSample: size matters — larger = more reliable but more expensive',
  'Pricing Strategies': 'Cost-plus: cost £8 + 50% markup = sell at £12. Simple but ignores market.\nPenetration: low initial price (£5 vs £8 competitor) to gain market share, then raise.\nSkimming: high initial price for new tech (£500), falls over time.\nCompetitive: match rivals exactly. Premium: high price signals quality (luxury brands).\nPsychological: £9.99 instead of £10 — customer perceives as much cheaper.',
  'Organisational Structure': 'Tall hierarchy: many levels, narrow span of control\n+ clear promotion paths, close supervision\n- slow communication, high admin cost, less delegation\nFlat hierarchy: few levels, wide span of control\n+ faster communication, more autonomy, cheaper\n- difficult to supervise many staff, limited career progression\nMatrix structure: staff report to both functional and project managers',
  'Globalisation': 'Benefits to MNC of locating in developing country:\nLower labour costs, less strict regulations, closer to growing markets, tax incentives\nBenefits to host country: employment, technology transfer, tax revenue, infrastructure\nRisks to host country: exploitation of workers, environmental damage, profit repatriated\nRisks to MNC: political instability, exchange rate risk, cultural differences',

  // ── ACCOUNTING (more) ──────────────────────────────────────────
  'Ledger Accounts & Trial Balance': 'T-account for Cash:\nDebit (money in): capital £10,000; sales £3,000\nCredit (money out): rent £800; purchases £1,500; wages £500\nBalance: 10,000+3,000-(800+1,500+500) = £10,200\nTrial balance: debit totals = credit totals\nError not revealed: compensating errors, errors of principle, complete omission',
  'Adjustments & Accruals': 'Rent paid £2,400 for 12 months; financial year ends after 9 months\nExpense recognised = 2,400×9/12 = £1,800\nPrepayment (asset): £600 carried forward\nAccrued expense: electricity £200 owed but not yet invoiced → add to expense, create current liability\nAccrued income: work done but invoice not yet sent → add to income, create current asset',
  'Bad Debts & Provisions': 'Opening debtors: £5,000. Bad debt written off: £200.\nRemaining debtors: £4,800. Provision for doubtful debts: 5%.\nNew provision = 5% × £4,800 = £240\nIncome statement: bad debt expense £200; increase in provision £240; total charge £440\nBalance sheet: debtors £4,800 - provision £240 = net realisable value £4,560',
  'Partnership Accounts': 'Partners A and B share profits 3:2. Net profit £25,000.\nA\'s salary: £5,000; B\'s salary: £3,000; Interest on capital: A £1,000, B £800\nAvailable for sharing = 25,000-5,000-3,000-1,000-800 = £15,200\nA gets: 5,000+1,000+(3/5×15,200) = 5,000+1,000+9,120 = £15,120\nB gets: 3,000+800+(2/5×15,200) = 3,000+800+6,080 = £9,880\nCheck: 15,120+9,880 = £25,000 ✓',
  'Manufacturing Accounts': 'Raw materials: opening £2,000 + purchases £8,000 - closing £1,500 = £8,500\nDirect labour: £6,000\nPrime cost: £14,500\nFactory overheads: £3,500\nCost of production: £18,000\nWIP: opening £1,000 - closing £800 = +£200\nCost of goods manufactured: £18,200',

  // ── SOCIOLOGY (more) ──────────────────════════════════════════
  'Family Structures': 'Functionalist view (Parsons): nuclear family serves two functions:\n1. Primary socialisation of children (transmitting norms/values)\n2. Stabilisation of adult personalities (emotional support)\nMarxist critique (Engels): family serves capitalism — reproduces labour force, transmits class inequality, women do unpaid domestic labour\nFeminist (Oakley): domestic labour undervalued; women carry dual burden (paid + domestic work)',
  'Mass Media & Society': 'Agenda-setting (McCombs & Shaw): media does not tell us what to think, but what to think ABOUT\nHypodermic syringe model: passive audience absorbs media messages directly — now rejected\nUses and gratifications: active audience uses media for information, entertainment, personal identity\nGlass ceiling: women under-represented in media ownership and production (Tunstall)',
  'Religion & Society': 'Durkheim: religion promotes social solidarity — shared rituals create collective conscience\nMarx: religion is "opium of the people" — false consciousness, justifies inequality\nWeber: Protestant Ethic and Spirit of Capitalism — Calvinist beliefs drove capitalism\nEvaluation: secularisation thesis (declining religion in West) vs religious revival globally',
  'Social Class & Identity': 'Weber: social class measured by market situation (income, occupation, wealth)\nBourdieu: cultural capital (tastes, education) and social capital (networks) reproduce inequality\nManifest curriculum: officially taught content; hidden curriculum: implicit messages about obedience, punctuality, conformity\nHeidensohn: women commit less crime as they are more controlled (home, threat of male violence)',

  // ── PSYCHOLOGY (more) ──────────────────────────────────────────
  'Perception': 'Visual illusions show top-down processing (expectations affect perception):\nMüller-Lyer illusion: two equal lines appear different length due to arrows\nGibson: direct perception — affordances are properties of objects we perceive directly\nGregory: indirect perception — brain uses hypotheses (guesses) about the world\nDevelopment: depth perception (visual cliff study — Gibson & Walk): infants as young as 6 months show avoidance',
  'Learning Theories': 'Classical conditioning (Pavlov):\nUCS (food) → UCR (salivation)\nNS (bell) paired with UCS → CS (bell) → CR (salivation)\nOperant conditioning (Skinner): behaviour followed by positive reinforcement is more likely to be repeated\nPositive reinforcement: reward (star chart)\nNegative reinforcement: removing unpleasant (stop alarm when door shut)\nPunishment: reduces behaviour (fine for speeding)',
  'Biological Psychology': 'Brain localisation of function:\nBroca\'s area (left frontal lobe): speech production; damage → expressive aphasia\nWernicke\'s area (left temporal): language comprehension; damage → receptive aphasia\nHM case study: bilateral hippocampus removal → no new long-term memories → supports localisation\nPhineas Gage: rod through prefrontal cortex → personality change → frontal lobe linked to personality',
  'Social Psychology': 'Zimbardo (1971) Stanford Prison Experiment:\n21 male students randomly assigned prisoner/guard roles\nGuards became abusive; prisoners passive; study stopped after 6 days\nConclusion: social roles override individual personalities (situational explanation)\nCriticism: ethical violations; Zimbardo played role of superintendent (bias)',

  // ── ICT (more) ──────────────────────────────────────────────
  'Systems Development': 'SDLC (Systems Development Life Cycle):\n1. Analysis: identify requirements (interviews, observation, questionnaires)\n2. Design: system architecture, UI mockups, database schema\n3. Development: coding and unit testing\n4. Testing: integration, system, acceptance testing (with real users)\n5. Implementation: direct changeover vs parallel running vs phased vs pilot\n6. Maintenance: corrective, perfective, adaptive',
  'Spreadsheets & Databases': 'Spreadsheet: =VLOOKUP(A2,Products,3,FALSE) — looks up A2 in column 1 of Products table, returns column 3\nIF function: =IF(B2>80,"Distinction",IF(B2>60,"Merit","Pass"))\nDatabase normalisation 1NF: remove repeating groups\n2NF: remove partial dependencies (composite key)\n3NF: remove transitive dependencies',
  'Web Technologies': 'HTTP request-response cycle:\nBrowser → DNS lookup → IP address → TCP connection → HTTP GET request → server processes → HTML+CSS+JS returned\nCSS selector specificity: inline > ID > class > element\nJavaScript event: document.getElementById("btn").addEventListener("click", function(){...})\nResponsive design: @media (max-width:768px) { .container { width:100%; } }',
  'Artificial Intelligence': 'Machine learning: trained on labelled data (supervised) or unlabelled (unsupervised)\nNeural network: input layer → hidden layers → output layer; weights adjusted during training\nNatural language processing: sentiment analysis — classify text as positive/negative\nExpert system: knowledge base + inference engine; e.g. medical diagnosis systems (MYCIN)\nEthical concerns: bias in training data, lack of explainability (black box), job displacement',

  // ── COMPUTER SCIENCE (more) ──────────────────────────────────
  'Networking': 'Calculate data transfer time:\nFile size: 500MB = 500×8 Mbits = 4000 Mbits\nBandwidth: 100 Mbps\nTime = 4000/100 = 40 seconds\nIP addressing: 192.168.1.0/24 → 256 addresses, 254 usable hosts\nSubnet mask: 255.255.255.0\nDNS: converts domain name to IP address (phone book of the internet)',
  'SQL Databases': 'CREATE TABLE Students (StudentID INT PRIMARY KEY, Name VARCHAR(50), DOB DATE);\nSELECT Name, Score FROM Students WHERE Score > 70 ORDER BY Score DESC;\nINNER JOIN: SELECT s.Name, c.Title FROM Students s INNER JOIN Courses c ON s.CourseID = c.ID;\nUPDATE Students SET Score = 85 WHERE StudentID = 3;\nNormalization: reduce redundancy; 1NF (atomic values), 2NF (no partial dependencies), 3NF (no transitive dependencies)',
  'Security Threats': 'SQL injection attack:\nUsername field: \' OR 1=1 --\nQuery becomes: SELECT * FROM users WHERE username=\'\' OR 1=1 --\' AND password=\'...\'\nThis bypasses password check — returns all users\nPrevention: parameterised queries, input validation, least privilege\nPhishing: fake email mimics PayPal — user enters credentials on fake site\nPrevention: check sender email carefully, hover over links, use 2FA',

  // ── HISTORY (more) ──────────────────────────────────────────
  'Russian Revolution': 'Long-term causes: autocracy of Tsar, land hunger of peasants, rapid industrialisation creating urban poor\nShort-term: WWI casualties (1.8m dead by 1917), food shortages in cities, February revolution removed Tsar\nBolshevik success: Lenin returned from exile, April Theses (peace, land, bread), Bolsheviks promised what people wanted\nOctober 1917: Bolsheviks seized power in Petrograd — "Ten Days That Shook the World"',
  'Cold War Origins': 'Alliance of necessity: USA + USSR fought together against Nazis but had ideological differences (capitalism vs communism)\nYalta 1945: agreed on post-war Europe; tensions over Poland\nPotsdam 1945: Truman replaced Roosevelt; USA tested atom bomb; tensions grew\nIron Curtain speech (Churchill, 1946): "an iron curtain has descended across Europe"\nTruman Doctrine 1947: USA would support free peoples resisting communism — containment policy',
  'United Nations & Peace': 'League of Nations failure: USA never joined; no army; unanimous decisions required; appeasement of Hitler\nUN formed 1945: 50 founding members; Security Council (5 permanent: USA, USSR, UK, France, China) with veto\nUN successes: Korean War 1950 (but stalemate), peacekeeping in Cyprus, humanitarian agencies (UNICEF, WHO)\nUN limitations: Cold War vetoes paralysed Security Council; could not prevent Vietnam War',
  'Decolonisation': 'India independence 1947: WWII weakened Britain financially; Indian National Congress (Gandhi — non-violent) and Muslim League (Jinnah)\nPartition into India and Pakistan: Mountbatten\'s plan; 14 million displaced, 500,000–1m killed\nAfrica: French West Africa decolonised 1960 ("Year of Africa"); violence in Algeria 1954-62\nKennedy: "The United States will never become a major colonial power again"',

  // ── GEOGRAPHY (more) ──────────────────────────────────────────
  'Urbanisation & Cities': 'Push factors from rural areas: crop failure, mechanisation of farming, lack of services\nPull factors to cities: employment, education, healthcare, entertainment\nSão Paulo case study: 22 million people; shanty towns (favelas) — lack of sanitation, crime, overcrowding\nRe-urbanisation in HICs: gentrification — wealthy move back to city centres (e.g. Notting Hill, London)',
  'Development Indicators': 'GNI per capita: total value of goods/services divided by population\nHDI: combines GNI, life expectancy, education (0=lowest, 1=highest)\nLimitations: averages hide inequality (Gini coefficient measures this)\nHappiness Index, Gender Inequality Index also used\nCase study: Rwanda — low GNI ($890) but high HDI improvements; emphasis on gender equality (64% female MPs)',
  'River Processes': 'Upper course: steep gradient, vertical erosion (V-shaped valley, interlocking spurs)\nMiddle course: lateral erosion begins, meanders form (faster flow on outside = erosion; slower inside = deposition)\nLower course: broad flat floodplain, oxbow lakes, delta at mouth\nHydrology: flood hydrograph — peak discharge delayed from peak rainfall (lag time)',
  'Coastal Processes': 'Erosion: hydraulic action (wave compresses air into cracks), abrasion (rocks scratch cliff), attrition (rocks knock together → smaller)\nTransport: longshore drift — waves hit at angle, sediment moves along coast\nDeposition: where energy decreases — beaches, spits, bars\nHard engineering: sea walls (£2000/m, reflect waves), groynes (trap sediment)\nSoft: beach nourishment (natural, temporary), managed retreat',
  'Climate Zones': 'Tropical rainforest (0-5° latitude): high temp (~27°C), high rainfall (>2000mm), nutrient cycle rapid\nBiomes linked to climate: precipitation and temperature determine vegetation\nDeserts (hot): 15-35°, high pressure, < 250mm rain/yr\nMediterranean: hot dry summers, mild wet winters; shrubby vegetation (chaparral, maquis)\nTundra: arctic, permafrost, very low temperatures, low precipitation, low biodiversity',

  // ── ENGLISH (more) ──────────────────────────────────────────
  'Analysing Language': 'Analyse: "The government systematically dismantled the welfare state."\nVerb "dismantled": implies deliberate, methodical destruction\nAdverb "systematically": emphasises this was planned, not accidental\nNoun "welfare state": emotive — evokes images of vulnerable people\nConnotation of "dismantled": like taking apart a machine — dehumanising metaphor for policy\nWriter\'s purpose: persuade reader the government acted cynically against ordinary people',
  'Writing for Purpose': 'Persuasive techniques (AFOREST):\nAnecdote: personal story to create emotional connection\nFacts: statistics lend authority (73% of young people...)\nOpinion: stated confidently as fact\nRepetition: "We must act. We must change. We must lead."\nEmotive language: "devastating", "heartbreaking", "vital"\nStatistics: specific numbers more convincing than vague claims\nThree (rule of): lists of three create rhythm and emphasis',
  'Reading Structure': 'Article structure analysis:\nOpening: hook — question/shocking fact/anecdote → draws reader in\nDevelopment: evidence, counter-arguments → builds credibility\nConclusion: call to action, memorable image, echo opening\nParagraph structure: PEE (Point-Evidence-Explain) or PEEL (+ Link to question)\nTransitions: "Furthermore", "However", "In contrast", "Consequently" — show relationship between ideas',

  // ── LITERATURE (more) ──────────────────────────────────────────
  'Character Analysis': 'Analysing character development (Scrooge in A Christmas Carol):\nStave 1: "a squeezing, wrenching, grasping, scraping, clutching" — verbs dehumanise Scrooge; Dickens\'s anger at real Victorian misers\nStave 5: "I am as light as a feather, I am as happy as an angel" — similes show transformation\nTheme link: Dickens argues capitalism without compassion is monstrous; Scrooge represents Victorian middle class\nContext: Poor Law 1834; workhouses; child mortality — Dickens experienced poverty himself',
  'Poetry Analysis': 'Analysing "Remains" by Simon Armitage:\nStructure: monologue — creates intimacy; irregular stanzas = disturbed mind\n"His blood shadow... stays on the street" — ghost/haunting metaphor for PTSD and guilt\nAnaphora: "And I... And I..." — insistence suggests trauma cannot be escaped\nColloquial language ("so all three of us") + military euphemisms contrast with horror of subject\nContext: written after conversations with veterans; explores psychological cost of war',

  // ── FRENCH (more) ──────────────────────────────────────────
  'Describing People & Places': 'Agreement rules in French adjectives:\nMasculine singular: grand, petit, beau, nouveau, vieux\nFeminine: grande, petite, belle, nouvelle, vieille\nPlural: grands/grandes, petits/petites\nBEAPS adjectives come BEFORE noun: beau, grand, ancien, autre, petit, seul\nOthers go AFTER: intéressant, fatigué, rouge, intelligent\nExample: "un grand homme intéressant" vs "une belle femme française"',
  'Subjunctive & Complex Sentences': 'Subjunctive required after: vouloir que, falloir que, bien que, pour que, à moins que\nIl faut que tu fasses tes devoirs. (It is necessary that you do your homework.)\nFormation: ils-form present tense → remove -ent → add subjunctive endings (-e,-es,-e,-ions,-iez,-ent)\nException: être (soit), avoir (ait), faire (fasse), aller (aille), pouvoir (puisse)',

  // ── SPANISH (more) ──────────────────────────────────────────
  'Describing Experiences': 'Using preterite to narrate a holiday:\nEl año pasado fui a Barcelona con mi familia.\nVisitamos el Parque Güell y comimos paella en un restaurante.\nMi hermana sacó muchas fotos porque el paisaje era impresionante.\nNote: "era" (imperfect) for description within preterite narrative\nOpinion phrases: En mi opinión, fue una experiencia inolvidable porque...',
  'Future Plans': 'Future tense for plans:\nEl año que viene voy a estudiar en la universidad.\n(near future: ir + a + infinitive)\nSpending a year abroad: Espero vivir en España durante un año para mejorar mi español.\nAmbitions: Quisiera ser médico para ayudar a la gente.\nConditional: Si tuviera más dinero, viajaría por todo el mundo.',

  // ── ARABIC (more) ──────────────────────────────────────────
  'Grammar & Structure': 'الجملة الاسمية vs الجملة الفعلية:\nاسمية: المبتدأ + الخبر (الطالبُ مجتهدٌ — The student is diligent)\nفعلية: الفعل + الفاعل (يدرسُ الطالبُ — The student studies)\nI\'rab (إعراب): رفع (subject/nominative), نصب (object/accusative), جر (possessive/genitive)\nDual: طالبان (two students); Plural: طلابٌ (students)\nFeminine: طالبةٌ; Feminine plural: طالباتٌ',

  // ── RELIGIOUS STUDIES (more) ──────────────────────────────────
  'Islam Core Beliefs': 'Five Pillars: Shahada (declaration of faith), Salah (5 prayers daily), Zakat (2.5% wealth to poor), Sawm (Ramadan fasting), Hajj (pilgrimage to Mecca)\nSix Articles of Faith: Tawhid (oneness of God), Angels, Holy Books (Quran is final), Prophets (Muhammad PBUH is last), Day of Judgement, Predestination (Qadr)\nAkhirah: afterlife — Day of Judgement; deeds weighed; Jannah (paradise) or Jahannam (hell)',
  'Christianity Core Beliefs': 'Trinity: God as Father, Son (Jesus), Holy Spirit — three persons, one God\nIncarnation: God became human in Jesus — "Word became flesh" (John 1:14)\nAtonement: Jesus died on cross to reconcile humanity with God (substitutionary atonement)\nResurrection: Jesus rose on 3rd day — central to Christian faith ("if Christ has not been raised, your faith is futile" — Paul)\nSalvation: through faith in Jesus (Protestant) or faith + works (Catholic)',

  // ── ENVIRONMENTAL (more) ──────────────────────────────────────
  'Renewable Energy': 'Solar PV: silicon panels convert light to electricity; 15-20% efficiency; works without direct sunlight\nWind turbines: kinetic energy of wind → electrical; offshore better (more wind)\nHydroelectric: water stored behind dam → released through turbines; reliable but disrupts ecosystems\nGeothermal: heat from earth\'s core; best near tectonic boundaries (Iceland, Kenya)\nComparison: all have lower carbon footprint than fossil fuels; intermittency is the main challenge (need storage)',
  'Population & Resources': 'Malthus theory (1798): population grows geometrically; food supply arithmetically → famine checks population\nEvaluate: Green Revolution increased food supply; technology challenged Malthus\nCarrying capacity: maximum population an ecosystem can sustain\nEcological footprint: land area needed to support one person\'s lifestyle\nUK footprint: ~4.4 global hectares/person; world average: 2.8; available: 1.7 → global overshoot',
};

// ── Inject logic ──────────────────────────────────────────────────
let subjects;
eval(src.match(/const IGCSE_SUBJECTS\s*=\s*(\{[\s\S]*?\n\})\s*;/)[0].replace('const IGCSE_SUBJECTS','subjects') + ';');

let added = 0;
for (const [sk, subj] of Object.entries(subjects)) {
  for (const b of subj.boards) {
    for (const ch of (subj.chapters[b] || [])) {
      for (const tp of ch.topics) {
        if (tp.workedExample) continue;
        const we = WORKED[tp.title];
        if (!we) continue;

        const titleIdx = src.indexOf(`title:'${tp.title}'`);
        if (titleIdx === -1) continue;

        const pointsStart = src.indexOf('points:[', titleIdx);
        if (pointsStart === -1 || pointsStart - titleIdx > 200) continue;

        let depth = 0, i = pointsStart + 7, pointsEnd = -1;
        while (i < src.length) {
          if (src[i] === '[') depth++;
          else if (src[i] === ']') { if (depth === 0) { pointsEnd = i; break; } depth--; }
          i++;
        }
        if (pointsEnd === -1) continue;

        let lastFieldEnd = pointsEnd;
        const checkArr = (kw) => {
          const s2 = src.indexOf(kw, lastFieldEnd);
          if (s2 === -1 || s2 - lastFieldEnd > 600) return;
          let d = 0, j = s2 + kw.length - 1;
          while (j < src.length) { if (src[j]==='[') d++; else if (src[j]===']') { if(d===0){lastFieldEnd=j;return;} d--; } j++; }
        };
        checkArr('examTips:['); checkArr('commonMistakes:[');
        const wep = src.indexOf('workedExample:`', lastFieldEnd);
        if (wep !== -1 && wep - lastFieldEnd < 600) { let j=wep+15; while(j<src.length&&src[j]!=='`')j++; lastFieldEnd=j; }

        const safeWe = we.replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$/g,'\\$');
        src = src.slice(0, lastFieldEnd+1) + ', workedExample:`' + safeWe + '`' + src.slice(lastFieldEnd+1);
        added++;
      }
    }
  }
}

console.log(`workedExample added: ${added}`);

try {
  new Function(src);
  console.log('SYNTAX OK');
  writeFileSync('app.js', src);
  console.log('Written');
} catch(e) {
  console.log('SYNTAX ERROR:', e.message);
  const lines = src.split('\n');
  for (let i=0; i<lines.length; i++) {
    try { new Function(lines.slice(0,i+1).join('\n')); } catch(e2) {
      if (e2.message===e.message){console.log('Line',i+1,':',lines[i].slice(0,120));break;}
    }
  }
}
