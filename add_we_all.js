// Add workedExamples to all remaining topics
const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');
const lines = code.split('\n');

// Map of title → workedExample text
const WE = {
// Chemistry
'Metals & Reactivity': `Reactivity series: K > Na > Ca > Mg > Al > Zn > Fe > Cu > Ag
Displacement: Fe + CuSO₄ → FeSO₄ + Cu (iron displaces copper — more reactive)
Extraction: metals above carbon extracted by electrolysis (Al, Na)
Metals below carbon extracted by reduction with carbon (Fe in blast furnace)`,

'Polymers & Reactions': `Addition polymerisation of ethene:
n(CH₂=CH₂) → −(CH₂−CH₂)n− (poly(ethene))
Condensation polymerisation: monomers lose H₂O (e.g. nylon, polyester)
Polyester from diol + dicarboxylic acid: HO−R−OH + HOOC−R'−COOH → ester links + H₂O`,

'Bonding Types & Properties': `NaCl: ionic — high mp (789°C), conducts when molten/dissolved, giant lattice
CO₂: covalent molecular — low mp (−78°C), does not conduct, simple molecules
SiO₂: covalent giant — very high mp, does not conduct, hard
Graphite: covalent layers, delocalised electrons → conducts electricity (unlike diamond)`,

'Organic Chemistry': `Homologous series of alkanes: CₙH₂ₙ₊₂
Ethanol → ethanoic acid: oxidation with acidified K₂Cr₂O₇ (orange → green)
Esterification: ethanol + ethanoic acid ⇌ ethyl ethanoate + H₂O (conc. H₂SO₄ catalyst)
Saponification: ester + NaOH → alcohol + sodium salt of acid`,

'Titration & Electrolysis': `Titration: 25 cm³ NaOH of unknown concentration requires 20 cm³ of 0.1 mol/dm³ HCl
Moles HCl = 0.1 × 0.02 = 0.002 mol; NaOH : HCl = 1:1
Moles NaOH = 0.002 mol; Concentration = 0.002/0.025 = 0.08 mol/dm³
Electrolysis of brine: cathode → H₂, anode → Cl₂, solution → NaOH`,

// Biology
'Cell Structure': `Animal cell: nucleus, cytoplasm, cell membrane, mitochondria, ribosomes
Plant cell: all of above + cell wall (cellulose), chloroplasts, large vacuole
Scale: use eyepiece graticule — actual size = image size ÷ magnification
μm conversion: 1 mm = 1000 μm; cell of 50 μm at ×400 = 20 mm image`,

'Transpiration & Transport': `Water pathway: root hair → cortex → xylem → leaf → stomata (evaporation)
Factors increasing transpiration rate: high temperature, low humidity, wind, light
Potometer measures rate of water uptake (approximates transpiration)
Phloem transports sugars (sucrose) — bidirectional, requires energy (active transport)`,

'Plant Reproduction': `Wind pollinated: light pollen, feathery stigma, no petals, no nectaries
Insect pollinated: bright petals, nectar, scent, sticky pollen
Fertilisation: pollen tube grows down style → male nucleus + female nucleus → zygote
Seed dispersal: wind (sycamore), animal (berries), water (coconut), explosion (peas)`,

'Transport in Cells': `Diffusion: O₂ moves from high to low concentration across cell membrane (passive)
Osmosis: water moves from dilute to concentrated solution through semi-permeable membrane
Active transport: minerals absorbed by root hair cells against concentration gradient (requires ATP)
Factors affecting diffusion rate: concentration gradient, surface area, distance, temperature`,

'The Heart & Circulation': `Blood flow: vena cava → right atrium → right ventricle → pulmonary artery → lungs
→ pulmonary vein → left atrium → left ventricle → aorta → body
Left ventricle has thicker wall (pumps to whole body at higher pressure)
Valves (bicuspid, tricuspid, semilunar) prevent backflow`,

'Respiration & Gas Exchange': `Gas exchange in alveoli: O₂ diffuses into blood, CO₂ diffuses out
Adaptations: large surface area, thin walls (one cell thick), good blood supply, moist
Spirometer measures tidal volume, vital capacity, breathing rate
Exercise: increased CO₂ → detected by medulla → increases breathing rate`,

'Photosynthesis & Respiration': `Limiting factors for photosynthesis: light intensity, CO₂ concentration, temperature
Rate ∝ light until another factor limits (plateau on graph)
Compensation point: where photosynthesis rate = respiration rate (net O₂ exchange = 0)
At night only respiration occurs; during day both occur simultaneously`,

// CS / ICT
'Number Systems': `Denary 75 → Binary: 75÷2=37r1, 37÷2=18r1, 18÷2=9r0, 9÷2=4r1, 4÷2=2r0, 2÷2=1r0, 1÷2=0r1
Read remainders bottom-up: 1001011₂ = 64+8+2+1 = 75 ✓
Hex: 75 = 4×16+11 = 4B₁₆
Binary addition: 1011 + 0110 = 10001 (carry the 1s)`,

'Algorithm Design': `Bubble sort trace: [5,3,8,1]
Pass 1: [3,5,1,8] (compare pairs, swap if left>right)
Pass 2: [3,1,5,8]
Pass 3: [1,3,5,8] — sorted!
Binary search: find 7 in [1,3,5,7,9,11] → mid=5, 7>5 → search right half → mid=9, 7<9 → found 7`,

'Computer Architecture': `Von Neumann: CPU, memory, I/O, single bus
Fetch: PC → MAR → memory → MDR → CIR; PC increments
Decode: control unit interprets instruction in CIR
Execute: ALU performs operation, result stored in accumulator
Cache speeds up CPU by storing frequently used data closer to processor`,

'Networks': `Client sends HTTP GET request → DNS resolves domain → TCP/IP routes packets
Router: operates at layer 3, uses IP addresses to forward packets
Switch: layer 2, uses MAC addresses within LAN
Packet switching: data split into packets, each routed independently, reassembled at destination`,

'Cyber Security': `Phishing: deceptive email tricks user into revealing credentials
Brute force: tries all password combinations — prevented by account lockout
SQL injection: ' OR '1'='1 — input sanitisation/parameterised queries prevent this
Encryption: symmetric (AES, same key), asymmetric (RSA, public/private key pair)`,

'Programming Fundamentals': `Pseudocode for linear search:
FOR i ← 0 TO length(array)−1
  IF array[i] = target THEN
    RETURN i
  ENDIF
ENDFOR
RETURN −1`,

'Arrays & File Handling': `Python 2D array: grid = [[0]*3 for _ in range(3)]
Access: grid[1][2] = 5 (row 1, column 2)
File read: with open('data.txt','r') as f: lines = f.readlines()
File write: with open('out.txt','w') as f: f.write('Hello\n')`,

'CPU Architecture': `Clock speed: 3 GHz = 3×10⁹ cycles/second — more cycles = more instructions per second
Cores: dual-core can run 2 threads simultaneously → better multitasking
Cache: L1 (fastest, smallest ~32KB) → L2 → L3 (slowest, largest ~8MB)
RAM: volatile, fast, temporary storage; ROM: non-volatile, stores boot instructions`,

'Binary & Hexadecimal': `Convert hex 3F to binary: 3=0011, F=1111 → 00111111₂ = 32+16+8+4+2+1 = 63
Convert 255 to hex: 255÷16=15r15 → FF₁₆
Add binary: 01101011 + 00110101 = 10100000 (with carries)
Two's complement −5 in 8 bits: 5=00000101, flip=11111010, +1=11111011`,

'Network Types & Topologies': `Star topology: all devices connect to central switch
Advantages: failure of one cable doesn't affect others; easy to add devices
Disadvantages: switch failure = whole network down; more cable needed
Mesh: every device connects to every other — high reliability, very expensive`,

'Data Representation': `Image: 3 pixels × 3 pixels, 8-bit colour = 9 × 8 = 72 bits = 9 bytes
Sound: sample rate 44100 Hz × bit depth 16 × 2 channels = 1,411,200 bits/s = 1.4 Mbps (CD quality)
Text: ASCII 'A' = 65 = 01000001₂ = 41₁₆
Compression: lossy (MP3, JPEG) removes data; lossless (PNG, ZIP) fully recoverable`,

'Network Fundamentals': `IP address: 192.168.1.1 — 4 octets, each 0–255, identifies device on network
Subnet mask: 255.255.255.0 — defines network vs host portion
DNS: translates domain names (google.com) to IP addresses
HTTP(S): application layer protocol; port 80 (HTTP), 443 (HTTPS)`,

'Programming Concepts': `Variable vs constant: variable changes (score = 0; score += 10); constant fixed (PI = 3.14159)
Iteration: FOR loop (known count), WHILE loop (condition-based)
Function: def calculate_area(r): return 3.14159 * r * r
Exception handling: try: ... except ValueError: print('Invalid input')`,

'Database Concepts': `Table: Students (StudentID PK, Name, DOB, CourseID FK)
SQL: SELECT Name FROM Students WHERE CourseID = 3 ORDER BY Name ASC
JOIN: SELECT Name, CourseName FROM Students JOIN Courses ON Students.CourseID = Courses.CourseID
Normalisation: remove redundancy — 1NF (atomic values), 2NF (no partial deps), 3NF (no transitive deps)`,

// Economics
'Scarcity & Opportunity Cost': `Government has £10bn budget. Options: NHS (£10bn) or Defence (£8bn) + Schools (£2bn)
If chooses NHS: opportunity cost = the Defence+Schools option foregone
Scarcity: unlimited wants (better healthcare, defence, education) vs limited resources (£10bn budget)
PPC: producing more guns means fewer butter — opportunity cost increases (bowed-out curve)`,

'Supply': `Supply schedule: at £5, 100 units supplied; at £10, 200 units supplied
Supply curve shifts right when: production costs fall, better technology, subsidies given
Price of related goods: if wheat price rises, farmers switch from barley → barley supply falls
Elasticity of supply: PES = %ΔQs / %ΔP; if PES>1 supply is elastic (responsive to price)`,

'Trade & Globalisation': `Comparative advantage: UK produces wheat at 2 hours/unit, cloth at 3 hours; Portugal: 1 hour, 1.5 hours
Portugal has absolute advantage in both, but lower opportunity cost in cloth (1.5/1 < 2/3)
UK has comparative advantage in wheat — both gain from specialisation and trade
Free trade area (e.g. EU): eliminates tariffs between members, increases competition`,

'Business Objectives & Types': `Sole trader: unlimited liability — personal assets at risk if business fails
Limited company (Ltd): shareholders' liability limited to investment; needs 2+ directors
PLC: can sell shares on stock exchange; greater access to capital but more regulation
Business objectives may conflict: profit maximisation vs CSR vs employee welfare`,

'Demand & Supply': `Equilibrium: Qd = Qs at P*
Demand increases (shifts right) → new equilibrium: higher price AND higher quantity
Supply decreases (shifts left) → higher price, lower quantity
Price ceiling below equilibrium → excess demand (shortage); price floor above → excess supply`,

'Market Failure & Intervention': `Negative externality: factory pollutes river (cost to society > private cost)
Government response: tax equal to marginal external cost (Pigouvian tax) → internalise externality
Public good: non-rival + non-excludable (e.g. national defence) → free rider problem → state provides
Merit good: under-consumed if left to market (e.g. education) → government subsidises`,

'Trade & Protectionism': `Tariff of 20% on imported steel: raises price from £100 to £120
Domestic producers gain (higher price), consumers lose (pay more), government gains (tariff revenue)
Deadweight loss: allocative inefficiency from restricting trade
Quota: limits import quantity → same effects as tariff but no revenue for government`,

'Economic Development': `HDI = composite of: life expectancy, education (mean/expected years of schooling), GNI per capita
HDI >0.8 = very high (Norway 0.96); <0.55 = low (Chad 0.40)
Lorenz curve: further from 45° line → more inequality; Gini coefficient: 0=perfect equality, 1=maximum
Harrod-Domar: growth = savings rate / capital-output ratio; needs investment and aid`,

'Personal Finance (Edexcel-specific)': `Budget: income £2,000/month; rent £700, food £300, transport £150, leisure £200 → savings £650
Interest calculation: 5% p.a. on £1,000 = £50 (simple); compound after 3 years: 1000×1.05³ = £1,157.63
Mortgage: £200,000 at 3% over 25 years → monthly payment ≈ £948
Insurance: premium vs excess trade-off; higher excess = lower premium`,

'Business Finance & Enterprise': `Break-even: Fixed costs = £10,000; selling price = £50; variable cost = £30
Contribution per unit = £50−£30 = £20
Break-even = £10,000 / £20 = 500 units
Margin of safety = actual sales (600) − break-even (500) = 100 units`,

'National Income & Economic Performance': `GDP = C + I + G + (X−M) (expenditure approach)
Real GDP adjusts for inflation: if nominal GDP = £2.1tn and price level +5%, real GDP = £2.0tn
Economic growth: sustained rise in real GDP per capita
Negative output gap: actual GDP < potential GDP → spare capacity, unemployment`,

'Government Policy': `Expansionary fiscal policy: cut taxes + increase spending → AD shifts right → GDP rises, unemployment falls
Risk: inflation if economy near full capacity; budget deficit increases
Monetary policy: central bank cuts interest rates → cheaper borrowing → C and I rise → AD increases
Supply-side: cut income tax → incentive to work; deregulation → lower business costs`,

'Oxford AQA Economics Exam Technique': `4-mark analysis question: define term → explain mechanism → use diagram → link to context
8-mark evaluation: give two arguments for, two against, make a justified judgement
Diagram tips: always label axes, show shift direction with arrows, mark new equilibrium P* and Q*
Use chain of reasoning: if X → then Y because Z → therefore impact on economy`,

// English Language
'Comprehension & Inference': `Inference question: "What does the writer imply about the character's feelings?"
Step 1: find relevant quotation from text
Step 2: state what is implied (not explicitly said)
Step 3: explain the inference with evidence: "The phrase 'clenched fists' implies suppressed anger, suggesting..."
AQA: inference = reading between the lines; always quote and explain`,

'Grammar & Punctuation': `Comma splice error: "It was raining, we stayed inside."
Fix: use semi-colon, conjunction, or two sentences: "It was raining; we stayed inside."
Apostrophe: possession (the dog's lead = one dog; the dogs' lead = multiple dogs)
Colon introduces: a list, an explanation, or a quotation
Dash — used for parenthesis or emphasis — more informal than brackets`,

'Spelling & Common Errors': `Commonly misspelled: separate (not seperate), definitely (not definately), necessary (1 collar, 2 socks: neCeSSary)
Their/there/they're: possession / place / they are
Affect (verb) vs effect (noun): "the weather affected her mood; the effect was severe"
Practice (noun) vs practise (verb): "I need practice; I must practise daily"`,

'Analysing Non-Fiction Texts': `Method: AQA reading question — use PETER: Point, Evidence, Technique, Effect, Reader
Example: "The writer uses the metaphor 'life is a battlefield' to convey..."
Effect: creates image of struggle/conflict → reader understands hardship
Always comment on WHY the writer chose this technique (purpose)`,

'Comparing Texts': `Compare structure: Source A uses chronological narrative; Source B uses flashbacks for contrast
Compare language: A uses formal register ("moreover"); B uses colloquialisms ("you know")
Comparison connectives: similarly, in contrast, whereas, both writers, unlike A, B...
AQA Q4: compare how writers present perspectives — always compare throughout, not A then B separately`,

'Reading Paper Strategy': `Time management AQA Paper 1: Q1 (4 min), Q2 (8 min), Q3 (8 min), Q4 (20 min), Q5 (45 min)
Read question before text — know what to look for
Annotate: underline key quotations, note techniques as you read
Never waste time re-reading whole text — find specific sections needed`,

'Reading Non-Fiction Texts': `Non-fiction features: rhetorical questions, statistics, personal anecdote, expert opinion, direct address (you)
Analyse purpose: to persuade, to inform, to advise, to argue, to entertain
Audience: formal language → educated adult; colloquial → younger reader
Always identify the TEXT TYPE (article, letter, report, speech) and how it shapes language`,

'Analysing Language & Structure': `Language analysis: P.E.E. (Point, Evidence, Explanation)
Structure: how does the text open and close? How are paragraphs sequenced?
Sentence structure: short sentences = tension/urgency; long sentences = description/complexity
Viewpoint shift: first person → third person; past tense → present tense (immediacy)`,

'Transactional Writing Forms': `Letter: Dear Sir/Yours faithfully (unknown); Dear Mr Smith/Yours sincerely (known)
Report: heading, subheadings, formal tone, no personal pronouns
Speech: direct address (you), rhetorical devices, inclusive (we), signposting (firstly, finally)
Article: headline, subheading, columns, drop capitals, quotation from expert`,

'Responding to Literature': `AQA Paper 2 Q5: write from character's perspective or in response to theme
Use evidence from text — embedded quotations (not just dropped in)
Match register to task: if writing a diary, use first person, emotional language, informal
Show understanding of social/historical context in extended responses`,

'Exam Technique for Edexcel English': `Paper 1 (Fiction): 80 mins — 40 mins reading (Qs 1–4), 40 mins writing (Q5)
Paper 2 (Non-fiction): 80 mins — 35 mins reading, 45 mins writing
Key error: writing too much on Q1 (only 4 marks) — use remaining time on Q5
Grade 9 writing: varied vocabulary, complex sentences, deliberate structural choices, consistent voice`,

'Oxford AQA Paper Structure': `Paper 1: Reading (fiction, 40 marks) + Writing (40 marks) = 80 marks total
Paper 2: Reading (non-fiction, 40 marks) + Writing (40 marks) = 80 marks total
Timing: approximately 1 mark per minute is a useful guide
All questions are compulsory — no choice. Read all prompts before starting.`,

'Language & Structure Analysis': `Structure zoom out → zoom in: writer opens with wide description then focuses on one detail
Cyclical structure: ending returns to the opening image — sense of inevitability or resolution
Contrast: light imagery in opening vs darkness in ending — shows character's decline
Sentence variety: "She ran. And ran. And ran." Repetition + short sentences → breathless urgency`,

'Argument & Persuasion': `Rhetorical devices: Rule of three ("liberty, equality, fraternity"), anaphora ("We shall fight...")
Counter-argument then refutation: "Some claim X; however, the evidence clearly shows Y"
Ethos (credibility), Pathos (emotion), Logos (logic) — use all three for strongest argument
Discourse markers signal argument structure: furthermore, nevertheless, consequently, in conclusion`,

'Exam Strategy & Timing': `Paper 1 Q4 (20 marks, AQA): spend 20 minutes; write 3–4 paragraphs
Each paragraph: Point + Evidence + Analysis of language/structure + Effect on reader
Q5 writing: plan in 5 minutes, write for 35 minutes, check for 5 minutes
Common mistake: all narration, no technique — examiners reward deliberate craft choices`,

// History
'The Treaty of Versailles': `Big Three disagreements: Wilson (14 Points, lenient), Clemenceau (punish Germany), Lloyd George (middle ground)
Germany's losses: 13% territory, 10% population, all colonies, Rhineland demilitarised
War guilt clause (Article 231) → reparations £6.6 billion
German reaction: "diktat" (dictated peace) — humiliation → resentment that Hitler exploited`,

'Rise of Hitler & the Nazi Party': `1923 Munich Putsch fails → Hitler imprisoned → writes Mein Kampf
1929 Wall Street Crash → mass unemployment → Nazi support surges
1932: Nazis = largest party (37% of vote) but no majority
January 1933: Hindenburg appoints Hitler Chancellor — conservatives believed they could control him`,

'The Holocaust': `Escalation of persecution:
1933: Jews banned from civil service jobs
1935: Nuremberg Laws — Jews lose citizenship, marriage to non-Jews forbidden
1938: Kristallnacht — synagogues burned, 30,000 arrested
1941: Einsatzgruppen mass shootings begin; 1942: Wannsee Conference → "Final Solution" — systematic murder in death camps (Auschwitz)`,

'Origins of the Cold War': `Yalta (Feb 1945): Poland to have free elections; Germany divided into 4 zones; USSR joins war against Japan
Potsdam (July 1945): Truman replaces Roosevelt; atomic bomb tested; disagreement over Germany
Iron Curtain speech (Churchill, 1946): warned of Soviet domination of Eastern Europe
Truman Doctrine (1947): USA would support free peoples resisting subjugation → containment policy`,

'Key Cold War Crises': `Berlin Blockade (1948–49): USSR blocks all land routes to West Berlin; USA airlifts supplies for 11 months → Stalin backs down
Korean War (1950–53): North (communist) invades South → USA/UN intervenes; armistice restores border at 38th parallel
Cuban Missile Crisis (1962): US discovers Soviet missiles in Cuba; naval blockade; 13 days of tension; Khrushchev removes missiles, USA promises not to invade Cuba`,

'Evaluating Historical Sources': `Provenance = origin + purpose + author + date
Useful because: contemporary evidence, written by eyewitness, reflects public mood
Limitations: biased (propaganda), only one perspective, written for specific audience
Utility question: consider both what the source SAYS and its NATURE/ORIGIN/PURPOSE`,

'Renaissance Medicine (c1500–c1700)': `Vesalius (1543): dissected human bodies → proved Galen wrong about anatomy (e.g. jaw is one bone not two)
Harvey (1628): proved blood circulates (heart pumps blood continuously) — disproved Galen's idea it was made in liver
Paré: used ligatures to tie arteries instead of cauterisation — less painful, fewer deaths
Still no understanding of germs — treatments still humoural and supernatural`,

'The Plains Indians': `Nomadic lifestyle: followed buffalo herds; tipi — portable, practical
Buffalo central to life: food, clothing, shelter, tools, fuel (dried dung)
Tribal government: chiefs advised by warrior societies; decisions by consensus
Land ownership: Great Plains = shared resource, not private property — clash with settlers`,

'Conflict on the Plains': `Homestead Act (1862): 160 acres free to settlers who farmed for 5 years → mass migration onto Plains
Impact on Indians: settlers killed buffalo (for hides, railway clearance), broke up migration routes
Fort Laramie Treaty (1851): defined tribal territories → broken when gold found in Black Hills (1874)
Little Bighorn (1876): Sioux + Cheyenne defeat Custer → shocked US public → military retaliation → Indian resistance crushed by 1890`,

'Weimar Republic 1918–1933': `1919: Spartacist uprising (communist) crushed by Freikorps
1920: Kapp Putsch (right-wing) — workers' general strike defeats it
1923: Ruhr crisis → hyperinflation (1 dollar = 4.2 trillion marks by Nov 1923)
Stresemann era (1923–29): Dawes Plan, Locarno Pact, League of Nations membership → Weimar stabilises
1929 crash → 6 million unemployed by 1932 → Weimar democracy collapses`,

'Origins & Early Cold War': `Ideological conflict: USA (capitalism, democracy) vs USSR (communism, one-party state)
WWII alliance of convenience — broke down over post-war Europe
Marshall Plan (1947): $13bn US aid to rebuild Western Europe — Truman wanted stable democracies, not communist revolutions
Cominform (1947): Stalin's response — coordinate communist parties in Eastern Europe → satellite states`,

'Escalation & Crises': `Berlin Wall (1961): built to stop East Germans fleeing West (2.6m fled 1949–61)
Vietnam (1955–75): USA's containment strategy — fear of domino effect; 58,000 US deaths; ended in communist victory
Détente (1970s): SALT I (1972), Helsinki Accords (1975) — superpower tension eased
Afghanistan (1979): Soviet invasion → USA boycotts Moscow Olympics, funds mujahideen → "Soviet Vietnam"`,

'Origins & Course of World War Two': `Appeasement: Munich Agreement (1938) — Chamberlain gives Hitler Sudetenland in exchange for "peace in our time"
Reasons for appeasement: fear of another war, sympathy for German grievances, USSR seen as greater threat
September 1939: Germany invades Poland → Britain and France declare war
Blitzkrieg: fast-moving combined arms (tanks + aircraft + infantry) → France falls in 6 weeks (1940)`,

'Origins of the Cold War 1945–1949': `Long Telegram (Kennan, 1946): USSR aggressive, expansionist → USA must contain it
Novikov Telegram (Soviet, 1946): USA imperialist, seeks world domination
Berlin Blockade (1948): USSR tests Western resolve → airlift succeeds → NATO formed (1949)
China falls to communism (1949): Mao's revolution → US fears spreading communism`,

'Oxford AQA History Paper Skills': `Source analysis: OPVL (Origin, Purpose, Value, Limitation)
Extended writing: argument → evidence → analysis → counter-argument → judgement
Never just describe — always explain significance and make a judgement
Causation: explain why causes are linked, not just list them; identify most important cause with justification`,

// Geography
'Population Growth & Distribution': `World population: 1800=1bn, 1927=2bn, 1999=6bn, 2023=8bn
DTM Stage 2: birth rate high, death rate falls → rapid population growth (e.g. Ethiopia)
Distribution: uneven — high density in river valleys (Nile, Ganges), coastal areas, temperate climates
Sparse: deserts (Sahara), tundra, mountains — hostile physical environment`,

'Settlement & Urbanisation': `Rural-urban migration causes: push (poverty, lack of services, natural disasters) + pull (jobs, education, hospitals)
Urbanisation: % population living in cities increases; 2008 = first time more urban than rural globally
Megacity: >10 million population (e.g. Tokyo 37m, Lagos 15m)
Counterurbanisation: movement from cities to rural areas — cars, internet, lower house prices`,

'Plate Tectonics': `Destructive plate boundary: oceanic (dense) subducts under continental → trench + volcanoes + earthquakes
Constructive: plates move apart → magma fills gap → new crust (mid-Atlantic Ridge)
Conservative: plates slide past each other → no crust created/destroyed → earthquakes (San Andreas fault)
Evidence for Plate Tectonics: matching coastlines, same fossils on different continents, seafloor spreading`,

'Rivers & Coasts': `River long profile: source (steep, high energy) → middle (meanders form) → mouth (wide, depositing)
Meander formation: fastest flow on outside (erosion → river cliff) → slowest inside (deposition → slip-off slope)
Coastal erosion processes: hydraulic action, abrasion, attrition, solution
Longshore drift: waves approach at angle → swash up beach at angle, backwash straight down → net movement of sediment`,

'Weather & Climate': `Depressions (low pressure): warm and cold fronts, cloud and rain, lower pressure, winds blow inward anticlockwise (N hemisphere)
Anticyclones (high pressure): clear skies, light winds, dry — hot in summer, cold and foggy in winter
Relief rainfall: moist air forced over mountains → cools → condenses → rain on windward side → rain shadow leeward
ITCZ: belt of low pressure, heavy rainfall near equator → tropical rainforest climate`,

'Development & Indicators': `GNI per capita: total income of country's residents divided by population
Limitations of GNI: ignores inequality (Gini), doesn't measure quality of life, PPP needed for comparison
HDI: combines health (life expectancy), education, standard of living
Rostow's model: 5 stages traditional → take-off → mass consumption (linear, controversial)`,

'Impacts & Responses to Climate Change': `Evidence: rising temperatures (+1.1°C since pre-industrial), retreating glaciers, rising sea levels (+20cm since 1900)
Mitigation: reduce emissions (renewables, efficiency, carbon capture), international agreements (Paris 2015, limit to 1.5°C)
Adaptation: sea walls, drought-resistant crops, managed retreat, flood-resilient buildings
Maldives: 1.2m above sea level → existential threat from sea level rise`,

'Water Resources & Management': `Water stress: <1,700 m³ per person per year (e.g. India 1,500 m³)
Physical scarcity: not enough water (deserts); economic scarcity: water available but can't access it (poverty)
Water transfer: China's South-North Water Diversion (longest in world, 1,277 km)
Sustainable management: drip irrigation, grey water recycling, desalination, demand management`,

'River Processes': `Erosion: hydraulic action (force of water), abrasion (material scrapes bed), attrition (particles collide + round), solution (minerals dissolved)
Transportation: traction (rolling), saltation (bouncing), suspension (carried), solution (dissolved)
Deposition: when river loses energy — wider valley floor, shallow gradient, increased load
Hjulstrom curve: shows velocity needed to erode, transport, deposit particles of different sizes`,

'Coastal Processes': `Erosion: hydraulic action (wave pressure in cracks), abrasion, attrition, corrosion (chemical)
Wave-cut platform: cliff retreats, platform left behind by erosion
Fetch: distance over which wind blows over sea → longer fetch = more powerful waves
Constructive waves: low frequency, gentle slope, strong swash → build beaches
Destructive waves: high frequency, steep, strong backwash → erode beaches`,

'Coastal Landforms & Management': `Headland and bay: hard rock resists erosion → headland; soft rock erodes faster → bay
Cave → arch → stack → stump (progressive erosion)
Spit: longshore drift deposits material beyond a headland → hook shape if winds change
Hard engineering: sea walls (£6000/m), groynes; soft: beach nourishment, managed retreat`,

'Urbanisation': `Global south: rapid urbanisation — migration + natural increase
Squatter settlements (favelas, slums): lack clean water, sanitation, tenure security
Dharavi, Mumbai: 600,000 people in 2.1 km²; economy worth £600m/year (informal sector thriving)
NEE urbanisation: China — 100 cities over 1 million; rural-urban migration controlled by hukou system`,

'Urban Issues & Solutions': `Traffic congestion: London congestion charge (2003) reduced traffic by 30% in zone
Urban sprawl: loss of greenfield land — greenbelts limit sprawl
Urban regeneration: London Docklands (LDDC) — private investment, new housing, Canary Wharf
Sustainable cities: Curitiba, Brazil — BRT system, recycling, green spaces, social housing`,

'Global Development Differences': `Core-periphery model (Wallerstein): developed core exploits developing periphery
Dependency theory: colonialism left LICs dependent on HICs for trade and aid
Rostow's modernisation theory: all countries follow same path to development
Trade vs aid debate: "trade not aid" — fair trade empowers producers; aid can create dependency`,

'Tourism & Development': `Mass tourism: economic multiplier effect — tourist spending → local jobs → wages spent locally
Leakage: money leaves country (foreign-owned hotels, imported food) — can exceed 80% in some LICs
Ecotourism: small-scale, sustainable, benefits local communities, conserves environment
Butrint, Albania: UNESCO site, managed to balance conservation and tourism revenue`,

'Weather, Climate & Ecosystems': `Tropical rainforest: near equator, 2000mm+ rain, 25–28°C all year, nutrient cycle rapid
Nutrient cycle: decomposers break down litter rapidly → nutrients absorbed quickly by shallow roots
Deforestation impact: disrupts water cycle (less transpiration → less rain), soil erosion, loss of biodiversity
Hot desert: <250mm rain/year, extreme temperatures; cacti store water, camels conserve water in fat hump`,

'Urbanisation & Urban Issues': `Push factors from rural: lack of jobs, poor schools/hospitals, natural disasters
Pull to cities: employment, services, social opportunities
Urban problems: overcrowding, pollution, traffic, lack of affordable housing, crime
Solutions: investment in public transport, social housing programmes, creating satellite towns`,

'Population & Resources': `Malthus (1798): population grows geometrically, food arithmetically → inevitable famine
Boserup: population pressure drives innovation → increased food production (refutes Malthus)
Carrying capacity: max population environment can sustain sustainably
Ageing population (Japan): 28% over 65 → pension costs rise, worker-to-retiree ratio falls → immigration needed`,

'Oxford AQA Geography Exam Technique': `6-mark question: AQA command words — evaluate (weigh up), assess (consider value), explain (give reasons)
Case study answer: name + location + specific data + evaluate effectiveness
9-mark question: structured essay — introduction, 3 developed points, conclusion with overall judgement
Use geographical terminology: attrition, carbonation, eutrophication, multiplier effect, leakage`,

'Urbanisation & Economic Development': `Informal sector: unregistered, untaxed businesses (street vendors, waste pickers)
Dharavi, Mumbai: informal leather, recycling, pottery industries → $665m economy
As countries develop: formal sector grows, urbanisation slows, suburbanisation begins
Gentrification: wealthier residents displace poorer in regenerated urban areas → social issues`,

// Business
'Purpose & Types of Business': `Sole trader advantages: owner keeps all profit, easy to set up, flexible decisions
Disadvantages: unlimited liability, hard to raise capital, relies on one person
Partnership: 2–20 partners, shared expertise and capital, but unlimited liability and disagreements
Company (Ltd/PLC): limited liability → risk reduced; easier to raise capital through share issue`,

'Business Objectives & Stakeholders': `Stakeholder conflict example: shareholders want profit maximisation → cut worker wages → employees unhappy
Short-term vs long-term objectives: cutting prices boosts sales now but harms profit margin long-term
Objectives by stage: start-up → survival; established → profit; large → market share or growth
Social enterprise: primary objective is social impact (e.g. environmental charity), not profit`,

'The Marketing Mix (4Ps)': `Product: USP (unique selling point) — what makes it different from competitors?
Price: penetration pricing (low to enter market), skimming (high for new premium product)
Place: distribution channels — manufacturer → wholesaler → retailer → consumer, or direct (e-commerce)
Promotion: above-the-line (TV ads), below-the-line (loyalty cards, social media influencers)`,

'Market Research': `Primary research: surveys, focus groups, observations, interviews — first-hand data, expensive
Secondary research: market reports, competitor analysis, government statistics — cheaper but may be outdated
Quantitative: numerical data (sales figures, survey percentages) — easy to analyse statistically
Qualitative: opinions, motivations (focus groups) — richer data but harder to analyse`,

'Recruitment & Training': `Internal recruitment: promote existing staff — cheaper, no induction needed, but limits new ideas
External: wider talent pool, fresh perspectives, but costly (advertising, agency fees)
On-the-job training: learns while working, relevant, cheaper; off-the-job: courses, wider skills
Induction: introduces new employee to company — reduces mistakes, improves confidence`,

'Production Methods': `Job production: custom, one-off items (wedding dress) — high quality, high cost, slow
Batch: groups of identical items (bakery) — moderate flexibility, some economies of scale
Flow/mass: continuous production line (cars, bottled drinks) — very efficient, low unit cost, inflexible
Lean production: eliminate waste (muda), Just-in-time delivery, Kaizen (continuous improvement)`,

'Location & Growth': `Location factors: labour costs, skilled workers, transport links, proximity to customers/suppliers, government grants
E-commerce shift: less need for physical location; global market access with low overheads
Organic growth: expand from within (open new branches, launch new products) — slow but less risky
External growth: merger, acquisition, joint venture — faster growth but integration challenges`,

'Ethics & CSR in Business': `CSR activities: reduce carbon footprint, fair trade sourcing, community investment, ethical supply chains
Business case for CSR: improves brand reputation → attracts customers + employees + investors
Ethical dilemma: outsource production to low-wage country → lower costs but potential exploitation
Triple bottom line: People (social) + Planet (environmental) + Profit — measure success on all three`,

'Purpose of Business': `Functions of business: produce goods/services, create jobs, pay taxes, meet consumer needs
Private sector: profit motive (Tesco, Apple); Public sector: government services (NHS, police)
Voluntary/charity sector: social objectives (Oxfam, RSPCA), not-for-profit
Start-up entrepreneur: takes risk, innovates, creates value — may fail (50% of UK businesses fail in first 3 years)`,

'Stakeholders': `Internal: employees, managers, owners — directly involved in running the business
External: customers, suppliers, government, local community, pressure groups
Shareholders: want dividends + share price growth → pressure management to maximise profit
Conflict: local community vs business — factory expansion brings jobs but increases noise/traffic`,

'Market Segmentation & Targeting': `Segmentation variables: demographic (age, gender), geographic (region), psychographic (lifestyle), behavioural (usage rate)
Example: Nike segments by age (youth sports), income (premium range), lifestyle (performance athletes)
Targeting: mass marketing (one product for all — Coca-Cola); niche (specific segment — organic dog food)
Positioning: create perception in consumer's mind — BMW = luxury performance, IKEA = affordable Scandinavian`,

'Recruitment, Training & HR': `Human Resource Management: workforce planning, recruitment, training, performance management
Retention strategies: competitive pay, career development, flexible working, good culture
Motivation theories: Maslow (hierarchy of needs), Herzberg (hygiene + motivators), Taylor (scientific management)
Employment law: contracts, minimum wage, anti-discrimination, health and safety — compliance is non-negotiable`,

'Business Finance': `Sources of finance — short-term: overdraft, trade credit; long-term: mortgage, share issue, debentures
Cash flow forecast: plan inflows and outflows — avoid running out of cash (profitable business can still fail!)
Break-even: Total revenue = Total costs; Profit = Revenue − Total costs
Retained profit: cheapest source of finance, no interest, but limits dividends to shareholders`,

'What is Enterprise?': `Entrepreneur: someone who takes financial risk to start a business hoping for profit
Key entrepreneurial skills: innovation, risk-taking, decision-making, leadership, resilience
Business plan: executive summary, market research, financial forecasts, marketing plan, operational plan
Risk vs reward: higher risk (new market, innovative product) → potential higher reward, but also higher failure probability`,

'Business Objectives': `SMART objectives: Specific, Measurable, Achievable, Realistic, Time-bound
E.g. "Increase market share from 15% to 20% within 2 years" (SMART) vs "grow the business" (not SMART)
Objectives change with business cycle: startup (survival) → growth (market share) → maturity (profit/efficiency)
Stakeholder objectives can conflict: shareholders (profit) vs employees (higher wages) vs customers (lower prices)`,

'Revenue, Costs & Profit': `Revenue = Price × Quantity sold
Fixed costs: rent, salaries (don't change with output)
Variable costs: raw materials, packaging (change with output)
Profit = Revenue − Total costs; Gross profit = Revenue − Cost of sales; Net profit = Gross profit − expenses
Example: sell 1000 units at £20; fixed costs £5,000; variable £10/unit → Profit = £20,000−£5,000−£10,000 = £5,000`,

// Additional Maths
'Quadratic Functions': `f(x) = x² − 5x + 6 = (x−2)(x−3); roots at x=2 and x=3
Vertex: x = −b/2a = 5/2 = 2.5; f(2.5) = 6.25−12.5+6 = −0.25 → vertex (2.5, −0.25)
Completing the square: x²−5x+6 = (x−2.5)²−0.25 → confirms vertex
Discriminant: b²−4ac = 25−24 = 1 > 0 → two distinct real roots`,

'Indices & Surds': `Simplify √48: √(16×3) = 4√3
Rationalise 1/√3: multiply by √3/√3 = √3/3
(2+√3)(2−√3) = 4−3 = 1 (difference of squares)
Solve 2^(2x) = 32: 2^(2x) = 2^5 → 2x = 5 → x = 2.5`,

'Simultaneous Equations (Linear & Non-linear)': `Solve: y = x² and y = x + 2
Substitute: x² = x + 2 → x²−x−2 = 0 → (x−2)(x+1) = 0
x = 2 → y = 4; x = −1 → y = 1 → solutions: (2,4) and (−1,1)
Check: 4 = 2+2 ✓ and 1 = −1+2 ✓`,

'Trigonometric Functions & Identities': `Solve 2sin²θ + sinθ − 1 = 0 for 0° ≤ θ ≤ 360°
Let s = sinθ: 2s²+s−1 = (2s−1)(s+1) = 0
s = 0.5 → θ = 30°, 150°; s = −1 → θ = 270°
Identity check: sin²θ + cos²θ = 1 → cos²θ = 1 − sin²θ`,

'Solving Trigonometric Equations': `Solve cosθ = −0.5 for 0 ≤ θ ≤ 2π
Reference angle: cos⁻¹(0.5) = π/3
cosine negative in 2nd and 3rd quadrants
θ = π − π/3 = 2π/3 and θ = π + π/3 = 4π/3`,

'Permutations & Combinations': `How many ways to arrange 5 people in a line? 5! = 120
Choose 3 from 8: C(8,3) = 8!/(3!×5!) = 56
Arrange 3 from 8: P(8,3) = 8!/(5!) = 336
Password: 4 digits from 0–9, no repetition: P(10,4) = 10×9×8×7 = 5040`,

'Functions — Domain, Range & Inverse': `f(x) = 1/(x−2): domain x≠2; range f(x)≠0
Inverse: y = 1/(x−2) → swap x,y: x = 1/(y−2) → y−2 = 1/x → f⁻¹(x) = 1/x + 2
Composite: fg(x) where g(x)=x+1, f(x)=x²: fg(x) = (x+1)²
Domain of fg: all real numbers (no restrictions)`,

'Radians & Advanced Trig': `Convert 150° to radians: 150 × π/180 = 5π/6 rad
Arc length: s = rθ = 5 × (π/3) = 5π/3 cm
Area of sector: A = ½r²θ = ½×25×(π/3) = 25π/6 cm²
sinusoidal graph: y = 3sin(2x + π/4): amplitude 3, period π, phase shift −π/8`,

'Solving Trig Equations': `Solve 3tanx = √3 for 0° ≤ x ≤ 360°
tanx = √3/3 = 1/√3 → reference angle = 30°
tan positive in 1st and 3rd quadrants: x = 30° or x = 210°`,

'Functions — Mappings, Domain & Range': `One-to-one: f(x) = 2x+3 — each input has unique output; inverse exists
Many-to-one: f(x) = x² — two inputs (±3) give same output (9); inverse only works with restricted domain
Composite gf(x): apply f first, then g; gf ≠ fg in general
Example: f(x)=x+2, g(x)=3x: gf(x) = g(x+2) = 3(x+2) = 3x+6; fg(x) = f(3x) = 3x+2`,

'Oxford AQA Additional Maths Exam Strategy': `Timing: 2 hours for 100 marks → roughly 1.2 mins per mark
Show all working — method marks available even if final answer wrong
Calculus: always state what you're doing (differentiating, integrating); include constant of integration (+c)
Trig: always check all solutions in given range; use CAST diagram or unit circle
Check answers: substitute back into original equation to verify`,

// Accounting
'Purpose & Concepts': `Accounting provides financial information to stakeholders for decision-making
Going concern: assumes business will continue operating indefinitely
Accruals concept: income and expenses matched to period they relate to (not when cash changes hands)
Prudence: do not overstate assets or income; anticipate losses but not gains`,

'Trial Balance': `A trial balance lists all ledger account balances: debit total must equal credit total
Errors NOT revealed by trial balance: errors of omission, commission, principle, original entry, compensating errors
If trial balance doesn't balance: check for arithmetic errors, missing entries, wrong side postings
Purpose: check the accuracy of double-entry bookkeeping before preparing financial statements`,

'Interpreting Financial Information': `Gross profit margin = (Gross profit / Revenue) × 100 → higher = more profitable per sale
Net profit margin = (Net profit / Revenue) × 100 → considers overheads
Return on capital employed (ROCE) = (Net profit / Capital employed) × 100 → measures efficiency of investment
Example: Revenue £500k, Gross profit £200k, Net profit £80k → GPM = 40%, NPM = 16%`,

'Purpose & Concepts (Accounting 2)': `Double entry: every transaction has equal debit and credit entry
Assets = Liabilities + Capital (accounting equation — must always balance)
Depreciation: spreading cost of asset over its useful life (straight-line or reducing balance method)
Bad debt: written off as expense; provision for doubtful debts: estimate of likely bad debts`,

'Profitability & Liquidity Ratios': `Current ratio = Current assets / Current liabilities; ideal ≈ 1.5:1 to 2:1
Acid test ratio = (Current assets − Inventory) / Current liabilities; ideal ≈ 1:1 (more conservative)
Example: CA = £60,000, inventory = £20,000, CL = £30,000
Current ratio = 2:1 ✓; Acid test = 40,000/30,000 = 1.33:1 ✓`,

'The Purpose of Accounting': `Financial accounting: historical records (income statement, balance sheet) → for external stakeholders
Management accounting: internal decision-making, budgets, forecasts → for managers
Auditing: independent examination of accounts → increases reliability for investors
Taxation: HMRC requires accurate records to calculate tax liability`,

'Cash Flow & Decision Making': `Cash flow statement shows: operating activities + investing activities + financing activities
Positive operating cash flow but loss possible (if high depreciation)
Example: profitable business can fail if customers don't pay on time → cash flow crisis
Solutions: invoice factoring, extended supplier credit, overdraft, reduce stock levels`,

'Oxford AQA Accounting Exam Approach': `Prepare income statement: Gross profit = Sales − Cost of sales; Net profit = Gross profit − Expenses
Balance sheet: Non-current assets + Current assets − Current liabilities − Non-current liabilities = Capital
Always show workings for ratios; state formula first, then substitute, then calculate
Analysis: don't just state the ratio — compare to previous year or industry benchmark and explain what it means`,

// Sociology
'Sociological Perspectives': `Functionalism (Durkheim): society is a system; institutions work together to maintain order
Marxism (conflict theory): society divided by class; ruling class exploits working class
Feminism: society patriarchal; women face systematic disadvantage
Interactionism (Weber, Mead): focus on small-scale interactions; how meaning is created in everyday life`,

'Research Methods': `Quantitative methods: questionnaires, structured interviews, official statistics → reliability
Qualitative methods: unstructured interviews, observation, case studies → validity
Ethical considerations: informed consent, anonymity, no harm, right to withdraw
Hawthorne effect: participants change behaviour when they know they're being observed → affects validity`,

'Family Structures & Functions': `Nuclear family: parents + children; extended: nuclear + grandparents/relatives
Functionalist view (Parsons): family socialises children, provides emotional stability
Marxist view: family reproduces labour force for capitalism; ideological control
Feminist view: family reproduces patriarchy; women do unpaid domestic labour (dual burden)`,

'Marriage, Divorce & Changing Patterns': `Divorce rate UK: increased after 1969 Divorce Reform Act (easier to divorce); 42% of marriages end in divorce
Reasons: changing attitudes, women's economic independence, less stigma, secularisation
Cohabitation: 1 in 5 UK families; increasing as alternative to marriage
Lone parent families: 90% headed by women; higher poverty risk; linked to divorce and never-married mothers`,

'Role of Education': `Functionalist (Durkheim): education transmits shared values (social solidarity); allocates people to roles (meritocracy)
Marxist (Bowles & Gintis): hidden curriculum teaches obedience/punctuality → prepares workers for capitalism
Feminist: education still channelling girls into female-dominated subjects (science gender gap narrowing but not gone)
Interactionist: labelling theory (Becker) — teachers label pupils → self-fulfilling prophecy`,

'Factors Affecting Achievement': `Social class: middle-class pupils outperform working-class; cultural capital (Bourdieu), material deprivation
Gender: girls outperform boys at GCSE; girls more mature, work harder, read more; laddish culture harms boys
Ethnicity: Chinese and Indian pupils achieve highest; Black Caribbean pupils underachieve → institutional racism, exclusion
School factors: setting and streaming, teacher expectations, school ethos, resources`,

'Theories of Crime': `Functionalist (Durkheim): crime is normal and functional — reinforces norms, promotes social solidarity
Strain theory (Merton): crime results from gap between success goals and legitimate means (anomie)
Labelling theory (Becker): criminal is one who has been successfully labelled; deviance is socially constructed
Marxist: laws protect ruling class interests; working class criminalised for petty crimes while white-collar crime ignored`,

'Social Control & Patterns of Crime': `Formal control: police, courts, prison → official sanctions
Informal control: family, peers, media, education → socialisation of norms
Self-report studies: people admit offences → shows official stats under-record crime (dark figure)
Victim surveys (BCS): ask people about crimes experienced → also reveals under-reporting
Moral panic: media exaggerates crime → public fear → increased policing → more arrests → confirms panic`,

'Media & Its Influence': `Hypodermic syringe model: media directly injects messages into passive audience → behaviour changes
Two-step flow (Lazarsfeld): opinion leaders filter media → pass to wider audience
Uses and gratifications: audience actively selects media for their needs (entertainment, information, identity)
Representation: women often sexualised; ethnic minorities stereotyped; media can reinforce or challenge inequality`,

'Representation in Media': `Underrepresentation: women as protagonists in films improving (28% leads in 2023 Hollywood)
Stereotypes: older people as frail/confused; working class as criminal/lazy; global majority as criminal or exotic
Social media: allows marginalised groups to challenge mainstream representation (Black Lives Matter, #MeToo)
Glasgow Media Group: news coverage biases towards powerful; strikes covered from management perspective`,

'Social Class & Inequality': `Occupation-based class: NS-SEC categories 1–7 from higher managerial to long-term unemployed
Underclass (Murray): welfare-dependent, deviant — controversial, blamed as victim-blaming
Social mobility: UK has low social mobility compared to Nordic countries; private schools perpetuate privilege
Intersectionality (Crenshaw): class + gender + ethnicity interact — compound disadvantages`,

'Gender Inequality': `Gender pay gap UK: women earn 14.9% less than men (full-time, 2023) — due to occupational segregation, career breaks, glass ceiling
Domestic violence: 1 in 4 women experience DV in lifetime; gendered crime
Feminism waves: 1st (suffrage), 2nd (equal rights, 1960s), 3rd (intersectionality), 4th (online, #MeToo)
Hegemonic masculinity (Connell): dominant form of masculinity — tough, unemotional — harmful to men and women`,

'Ethnicity & Race': `Institutional racism (Macpherson Report 1999): Metropolitan Police institutionally racist after Stephen Lawrence murder
Stop and search: Black people 9× more likely to be stopped (England & Wales, 2020) → disproportionality
Achievement gap: Pakistani/Bangladeshi pupils underachieve relative to Chinese/Indian → not about race, but class, language, discrimination
Ethnic minority poverty: more likely to live in deprived areas, face employment discrimination`,

'Family Structures & Diversity': `Chester (1985): nuclear family still dominant; Rapoport identified 5 types of diversity (organisational, cultural, social class, life course, cohort)
New Right (Murray): lone parent families = social problem, lack of male role model → delinquency
Postmodernist: diversity is positive; individuals choose family arrangements; no single ideal
Chosen families: LGBTQ+ partnerships, friendship networks as family — challenges traditional definition`,

'Marriage, Divorce & Changing Families': `Secularisation → less religious opposition to divorce
Women's movement → financial independence → can leave unhappy marriages
Empty shell marriages: couples stay together despite breakdown (social pressure, children, finances)
Reconstituted families (step-families): increasingly common; UK 1 in 3 children experience parental separation`,

'Educational Achievement & Inequality': `Pupil premium: extra funding for disadvantaged pupils (free school meals) — reduces gap but not eliminates it
Academy schools: freed from local authority control → mixed evidence on improving outcomes
Private schools: 7% of pupils, but 65% of senior judges and 71% of barristers privately educated → privilege perpetuates
Ofsted: inspects schools; "outstanding" schools disproportionately in wealthier areas`,

'Defining Crime & Deviance': `Crime: behaviour that breaks laws of society and is punishable by state
Deviance: behaviour that breaks social norms but not necessarily law (e.g. tattoos, nudism)
Social construction of crime: what counts as crime varies across time and cultures (e.g. cannabis in different countries)
Victimless crime: no direct victim (e.g. drug use) — debated whether state should criminalise`,

'Explanations for Crime': `Right realism (Wilson & Kelling): broken windows — disorder leads to crime; zero tolerance policing
Left realism (Lea & Young): relative deprivation + marginalisation + subculture → crime
Feminist: masculinity crisis explains male crime; domestic violence ignored by patriarchal police/courts
Globalisation: transnational organised crime (trafficking, cybercrime) harder to police nationally`,

'Poverty & Inequality': `Absolute poverty: below minimum needed to survive (World Bank: <$2.15/day)
Relative poverty: below 60% of median income (UK measure); about 22% of UK children in relative poverty
Cycle of deprivation: poverty → poor education → low-paid work → poverty (self-reinforcing)
Welfare state debate: universalism (all receive, reduces stigma) vs means-testing (targets those in need, lower cost)`,

'The Family': `Alternatives to the family: communes, kibbutzim — challenges idea that nuclear family is universal
Global perspectives: different family structures across cultures (polygamy, extended families)
State intervention in family: tax credits, free childcare, parenting classes — reflects ideological views of family
Functionalists vs Marxists: family = beneficial socialisation vs family = reproduces class inequality`,

'Education': `Selection: grammar schools — 11+ exam; evidence shows increases inequality (middle-class advantage in tutoring)
Hidden curriculum: informal messages (competitive individualism, acceptance of hierarchy) reinforced daily
Resistance: Willis's lads (Learning to Labour) reject school culture but end up in working-class jobs → reproduce inequality
Globalisation of education: league tables, PISA rankings — international benchmarking, marketisation of education`,

'Crime & Deviance': `Official crime statistics: under-record crime (reporting rates low, police discretion in recording)
Self-report studies (e.g. Farrington): reveal most people have committed some offence → crime is widespread
Labelling: Cicourel — police patrol working-class areas more → more arrests → confirms stereotype
Moral panic: folk devils (hoodies, ravers) — media amplification → increased policing → more arrests → crime seems to rise`,

'Social Stratification': `Caste system: birth determines status, closed, India — although constitutionally abolished, persists socially
Class system: open (theoretically), based on economic position, social mobility possible
Meritocracy: talent + effort = success (functionalist ideal) — Marxists argue it's a myth that legitimises inequality
Wealth vs income: wealth (assets) more unequally distributed than income; top 1% own 23% of UK wealth`,

'Social Change & Globalisation': `Globalisation: increased flows of people, goods, ideas across borders
Cultural homogenisation: McDonaldisation (Ritzer) — global culture becoming uniform, dominated by US values
Glocalism: global products adapted for local markets (McDonalds India has no beef burgers)
Migration: EU freedom of movement → population diversity in UK; Brexit changed rules — net migration still high`,

'Oxford AQA Sociology Exam Skills': `Short answer (4 marks): define + example + explain + link to context
Extended writing (12 marks): two developed arguments + evaluation/counter-argument + overall judgement
Use sociological terminology: anomie, social capital, hegemony, intersectionality, meritocracy
Evaluate: strengths and limitations of each perspective — avoid one-sided answers for higher marks`,

// Psychology
'Research Methods': `Experiment: IV manipulated, DV measured, extraneous variables controlled
Lab experiment: high control, replicable, but artificial → low ecological validity
Field experiment: natural setting → higher ecological validity but less control
Correlation: relationship between variables, not cause and effect; +1 perfect positive, -1 perfect negative`,

'Key Research Concepts': `Reliability: consistency of results (can they be replicated?)
Validity: does the test measure what it claims to measure?
Sampling: random (every person equal chance), opportunity (available participants), stratified (proportional)
Ethical guidelines: BPS code — consent, confidentiality, right to withdraw, protection from harm, debriefing`,

'Models of Memory': `Multi-store model (Atkinson & Shiffrin): sensory → STM (7±2 items, 15–30 sec) → LTM (unlimited capacity, permanent)
Encoding: STM = acoustic; LTM = semantic
Working memory model (Baddeley): central executive + phonological loop + visuospatial sketchpad + episodic buffer
Evaluation: WMM explains why we can do two tasks (if different slave systems) — more flexible than MSM`,

'Obedience (Milgram)': `Milgram (1963): 65% of participants delivered maximum 450V shock to "learner"
Situational factors: legitimate authority (lab coat), proximity of learner, presence of others who refuse (drops to 10%)
Ethical issues: deception, psychological harm (stress), right to withdraw not clear
Application: explains atrocities (Holocaust) — "just following orders" — situational not dispositional`,

'Brain & Behaviour': `Phineas Gage: iron rod through frontal lobe → personality changed (impulsive, antisocial) → evidence for localisation
Broca's area (left frontal): speech production — damage → Broca's aphasia (understand but can't speak)
Wernicke's area (temporal): speech comprehension — damage → Wernicke's aphasia (fluent but meaningless speech)
Split-brain research (Sperry): corpus callosum severed → left and right hemispheres function independently`,

'Intelligence': `Psychometric approach (Spearman): g factor — general intelligence underlies all cognitive abilities
Gardner's multiple intelligences: 8 types (linguistic, mathematical, musical, spatial, etc.) — more inclusive
IQ test: standardised with mean 100, SD 15; controversial — cultural bias, only measures certain abilities
Nature vs nurture debate: twin studies suggest ~50% heritable; environment also crucial (e.g. education)`,

'Visual Perception': `Gregory's constructivist theory: perception is active, top-down, using stored knowledge to interpret ambiguous stimuli
Gibson's ecological theory: direct perception — information in the environment is sufficient, no inference needed
Perceptual set: expectation influences what we see (e.g. seeing what we expect in an ambiguous figure)
Müller-Lyer illusion: explains cultural differences in perception — people who live in carpentered environments more susceptible`,

'Dreaming': `Freud: dreams are wish fulfilment — unconscious desires expressed symbolically (manifest vs latent content)
Hobson & McCarley (activation-synthesis): dreams are random brain activity during REM; brain tries to make sense of signals
REM sleep: 90-minute cycles; most vivid dreams occur in REM; if deprived of REM → increased anxiety, poor concentration
Memory consolidation theory: dreams help store memories — sleep improves recall of learned material`,

'Memory Models': `Encoding specificity (Tulving): recall better when context matches encoding conditions (e.g. learned underwater → recalled underwater)
Forgetting: trace decay (STM), interference (LTM — proactive: old info interferes with new; retroactive: new interferes with old)
Repression (Freud): motivated forgetting of traumatic/threatening memories — pushed into unconscious
Flashbulb memories: vivid, detailed memories for emotionally significant events (e.g. 9/11) — but not always accurate`,

'Classical & Operant Conditioning': `Classical (Pavlov): NS + UCS → UCR; after conditioning NS → CS → CR
Example: bell (NS) + food (UCS) → salivation (UCR); after: bell (CS) → salivation (CR)
Operant (Skinner): positive reinforcement (reward → repeat); negative reinforcement (remove unpleasant → repeat); punishment (reduce behaviour)
Token economy: secondary reinforcers (tokens) exchanged for primary rewards — used in prisons, schools`,

'Social Learning Theory': `Bandura: learning through observation and imitation of role models
Conditions: attention, retention, reproduction, motivation (ARRM)
Bobo doll study: children who observed aggressive adult → showed 3× more aggression than controls
Vicarious reinforcement: observing model being rewarded → increases imitation; being punished → reduces imitation`,

'Obedience & Authority': `Agentic state (Milgram): person sees themselves as agent of authority, not responsible for actions
Authoritarian personality (Adorno): measured by F-scale; rigid thinking, submissive to authority, prejudiced
Bystander apathy (Latané & Darley): diffusion of responsibility — more bystanders → less likely each will help
Pluralistic ignorance: when others appear unconcerned, we assume situation isn't serious → no one helps`,

'Prosocial Behaviour & Bystander Effect': `Kitty Genovese case (1964): 38 witnesses to murder, no one called police — sparked research into bystander effect
Cost-benefit analysis: weigh up cost of helping (danger, time) vs benefit (moral satisfaction, avoid guilt)
Arousal: cognitive labelling theory — physiological arousal + explanation = specific emotion (Schachter)
Piliavin (subway experiment): help increased when victim appeared ill (not drunk), when alone, when similar to helper`,

'Biological Approach': `Assumptions: behaviour has biological causes; genes, hormones, neurotransmitters, brain structure
Serotonin: low levels linked to depression and aggression
Dopamine: linked to reward, motivation; excess linked to schizophrenia; low linked to Parkinson's disease
Twin studies: MZ twins share 100% DNA; if MZ concordance >> DZ (50% DNA) → genetic influence on trait`,

'Social Influence': `Conformity types: compliance (public agreement, private disagreement), internalisation (genuine belief change)
Informational influence: conform because others have more information (e.g. fire drill)
Normative influence: conform to fit in, avoid rejection (e.g. fashion)
Asch (1956): 75% conformed at least once on line task; reduced when one other person dissented`,

'Development (Oxford AQA)': `Piaget's stages: sensorimotor (0–2), preoperational (2–7), concrete operational (7–11), formal operational (11+)
Conservation (Piaget): preoperational children fail conservation tasks (number, liquid volume) — centration
Vygotsky: zone of proximal development (ZPD) — what child can do with help; scaffolding by more knowledgeable other
Attachment (Bowlby): monotropy — primary attachment figure; critical period; maternal deprivation → long-term damage`,

'Psychological Applications': `CBT (cognitive behavioural therapy): challenge negative automatic thoughts → change behaviour; used for depression, anxiety
Systematic desensitisation: gradual exposure to feared stimulus while relaxed → treats phobias
Drug therapy: SSRIs (fluoxetine) increase serotonin → treat depression; evaluate: treats symptoms not cause
Token economy: operant conditioning principles in institutional settings → modify behaviour`,

'Oxford AQA Psychology Paper Skills': `Short answer (4 marks): define → apply to context → explain mechanism → conclude
Evaluate (6 marks): strength with evidence + limitation with evidence + overall evaluation of approach
Research design question: state IV and DV, explain controls, predict results, state ethical issues to address
Always use psychological terminology: ecological validity, demand characteristics, confounding variable`,

// ICT
'Data Types & Input Devices': `Data types: integer (whole number), real/float (decimal), char (single character), string (text), boolean (true/false)
Input devices: keyboard (text entry), mouse (pointing), barcode scanner (retail), biometric (security: fingerprint)
Sensor: temperature sensor → analogue signal → ADC → digital value stored
Validation: range check (age 0–120), type check (name is text), presence check (field not empty)`,

'Storage Devices': `Magnetic: HDD — high capacity (4TB), low cost, slow, mechanical failure risk
Solid state: SSD — fast, reliable (no moving parts), more expensive, lower capacity
Optical: CD/DVD/Blu-ray — portable, read-only (CD-ROM) or writable (CD-R), easily scratched
Cloud storage: accessible anywhere, scalable, requires internet, privacy/security concerns`,

'Internet & Communication': `HTTP: HyperText Transfer Protocol — transfers web pages; HTTPS adds SSL/TLS encryption
Email protocol: SMTP (send), POP3 (download and delete), IMAP (access on server, multiple devices)
Packet switching: data split into packets with header (source, destination, sequence); routed independently; reassembled
VoIP (Voice over IP): audio converted to digital packets → sent over internet → Skype, Zoom, Teams`,

'Types of Software': `System software: OS (manages hardware/software), utility programs (antivirus, disk defragmenter, backup)
Application software: word processing, spreadsheet, database, browser, media player
Open source: source code available, free to modify (Linux, LibreOffice); proprietary: closed code, paid licence (Windows, MS Office)
Programming languages: low-level (machine code, assembly) — fast; high-level (Python, Java) — easier to write, needs compiler/interpreter`,

'Ethical & Legal Issues': `Data Protection Act 2018 / GDPR: data must be accurate, secure, used fairly, not kept longer than necessary
Computer Misuse Act 1990: unauthorised access, data modification, DDoS attacks — criminal offence
Copyright: you cannot copy software without licence; freeware (free, no source), shareware (trial), open source (modifiable)
AI ethics: bias in algorithms, job displacement, surveillance, autonomous weapons — ongoing societal debate`,

'Systems Analysis & Design': `SDLC phases: Analysis → Design → Implementation → Testing → Evaluation → Maintenance
Requirements specification: what the system must do (functional) and how well (non-functional: speed, reliability)
Prototyping: build working model, get user feedback, refine → iterative design
Testing: black box (test from user perspective); white box (test internal logic); alpha (internal), beta (external users)`,

'Multimedia Components': `Image: resolution (pixels per inch/cm), colour depth (bits per pixel), file size = width × height × colour depth
Sound: sample rate (Hz — how often sound measured), bit depth (bits per sample); higher = better quality, larger file
Video: frame rate (fps), resolution, compression crucial for streaming (H.264 codec)
Compression: lossy (JPEG, MP3) — some data lost; lossless (PNG, FLAC) — no data lost, larger files`,

'Presentation & Web Design': `HTML: structure (headings h1–h6, paragraphs p, links a href, images img src)
CSS: style (colour, font, layout: flexbox, grid)
Responsive design: media queries → website adapts to screen size (mobile-first approach)
Accessibility: alt text for images, high contrast, keyboard navigation — WCAG guidelines`,

'Operating Systems & Software': `OS functions: memory management, process management, file management, device management, user interface
Types: single-user (Windows), multi-user (Linux server), real-time (RTOS — hospital equipment), mobile (iOS, Android)
File management: hierarchical directory structure; file permissions (read, write, execute)
Virtual memory: uses hard disk as extension of RAM when RAM full → slower but prevents crash`,

'Networking Concepts': `LAN (Local Area Network): within one building; WAN (Wide Area Network): across large geographic area (internet)
Wi-Fi: wireless LAN using radio waves; Ethernet: wired LAN using twisted pair cable
Bandwidth: maximum data transfer rate (e.g. 1 Gbps ethernet); throughput: actual data rate achieved
Firewall: monitors and filters incoming/outgoing traffic based on rules; hardware or software`,

'Databases': `Database: organised collection of related data; DBMS (e.g. MySQL, Access) manages access
Table: rows = records, columns = fields; Primary key: unique identifier for each record
SQL query: SELECT FirstName, LastName FROM Customers WHERE City = 'London' ORDER BY LastName
Entity-relationship diagram: shows tables and relationships (one-to-many, many-to-many)`,

'Spreadsheets': `Cell referencing: relative (A1 — changes when copied), absolute ($A$1 — stays fixed)
Functions: =SUM(A1:A10), =AVERAGE(B1:B10), =IF(C1>50,"Pass","Fail"), =VLOOKUP(D1,A:B,2,FALSE)
Charts: bar chart (compare categories), line graph (trend over time), pie chart (proportions — avoid if >5 slices)
Data validation: dropdown list, restrict number range, custom formula → reduces input errors`,

'Communication Technologies': `Bluetooth: short-range (10m), low power, PAN (personal area network) — headphones, keyboards
NFC (Near Field Communication): very short range (4cm) — contactless payment, access cards
5G: fifth generation mobile network; faster (20 Gbps), lower latency (1ms), more devices simultaneously
Satellite communication: GPS (positioning), satellite TV, weather forecasting, global internet (Starlink)`,

'Legal, Ethical & Environmental Issues': `Environmental impact of ICT: e-waste (toxic materials), data centres use enormous electricity, planned obsolescence
Green computing: energy-efficient hardware, cloud computing, recycling, paperless office
Cybercrime: phishing, ransomware, identity theft — cost UK economy £27bn/year
Digital divide: gap between those with access to technology and those without — age, poverty, geography, disability`,

'Number Systems & Data': `Binary: base 2 (0s and 1s); Hexadecimal: base 16 (0–9, A–F)
Convert 1010 1101₂ to hex: split into nibbles: 1010=A, 1101=D → AD₁₆
ASCII: 7-bit code for characters; 'A'=65, 'a'=97, '0'=48
Unicode: extends ASCII to cover all world languages; UTF-8 most common on web`,

'Online Safety & Ethics': `Cyberbullying: using technology to harass — emotional harm, anonymous, 24/7 access
Digital footprint: data trail left online — permanent, shared, used by employers, advertisers
Fake news: misinformation spreads rapidly on social media — fact-check with multiple sources
Safe online practices: strong unique passwords, 2FA, privacy settings, recognise phishing, don't overshare`,

'Spreadsheet Skills': `IF function: =IF(A1>=60,"Distinction",IF(A1>=40,"Pass","Fail")) — nested IFs for multiple conditions
COUNTIF: =COUNTIF(B2:B20,"Pass") — counts cells meeting a criterion
SUMIF: =SUMIF(A:A,"Science",B:B) — sums column B where column A = "Science"
Pivot table: summarise and analyse large datasets; drag fields to rows, columns, values areas`,

'Networks & Communication': `Network security: firewall, encryption (HTTPS/TLS), antivirus, access control, physical security
Encryption: Caesar cipher (simple shift); RSA (asymmetric, used in HTTPS); AES (symmetric, fast)
Wi-Fi security: WPA2/WPA3 encryption; avoid public unsecured Wi-Fi for banking
Social engineering: manipulating people rather than hacking systems — most common attack vector`,

'Oxford AQA ICT Exam Technique': `Read scenario carefully — answer must relate to the given context (not generic)
6-mark question: six distinct points; bullet points acceptable; use technical vocabulary
Compare: always mention both options with advantage/disadvantage for each (not just one)
Define: give the technical definition + example from the scenario to show understanding`,

// Literature
'How to Analyse Poetry': `SLIMS framework: Subject, Language, Imagery, Movement (rhythm/rhyme), Structure
Always ask: WHY has the poet made this choice? What effect does it create?
Comment on sound devices: alliteration (repeated consonants), assonance (repeated vowel sounds), onomatopoeia
Example: "The ploughman homeward plods his weary way" — alliteration + assonance → sense of slow, heavy trudging`,

'Key Poetic Techniques': `Enjambment: sentence continues across line break → creates momentum, flow, mimics thought
Caesura: pause mid-line (punctuation) → creates break, emphasises what follows
Volta: turn in the poem (argument shifts) — often at line 9 of a sonnet
Pathetic fallacy: weather/nature reflects character's emotions ("the dark, stormy night mirrored her despair")`,

'Comparing Poems': `Comparison connectives: both poets..., whereas X uses..., Y alternatively..., in contrast...
Compare: theme, tone, structure, language, context — not just one element
Never compare poems separately — integrate comparison throughout each paragraph
Example: "Both Duffy and Owen use war imagery, though Duffy focuses on domestic devastation while Owen depicts battlefield trauma"`,

'Analysing Prose Fiction': `Narrative voice: first person (intimate, unreliable?), third person omniscient (knows all), limited (one character's perspective)
Setting: creates atmosphere; symbolic settings reflect themes
Characterisation: direct (narrator tells us), indirect (shown through dialogue, action, reaction of others)
Structure: linear, non-linear, cyclical; in medias res opening creates immediate tension`,

'Analysing Drama Texts': `Stage directions: reveal character, atmosphere, relationship dynamics — don't ignore
Dramatic irony: audience knows something character doesn't → creates tension
Soliloquy: character speaks thoughts aloud alone on stage → reveals true feelings, private inner world
Subtext: what is not said — implied meaning beneath surface dialogue (particularly important in Pinter, Chekhov)`,

'Common Literary Themes': `Power: who has it, how it's used/abused, how it corrupts (Animal Farm, Macbeth)
Identity: sense of self, belonging, outsider vs insider (To Kill a Mockingbird, A Raisin in the Sun)
Conflict: internal (character vs self) vs external (character vs society/nature/others)
Love and loss: romantic love, parental love, grief — how they shape characters and drive narrative`,

'Context in Literature': `Victorian context: class hierarchy, industrialisation, role of women, religious doubt (Great Expectations, Jane Eyre)
Post-war: trauma, disillusionment, loss of innocence (The Kite Runner, Lord of the Flies)
Historical context shapes: themes the author explores, constraints on characters, language choices
Context must be linked to text: "Dickens experienced the workhouse system first-hand, which explains why he depicts it so vividly in Oliver Twist"`,

'Edexcel Poetry Anthology': `Analysing anthology poem: read twice → annotate techniques → identify theme → structure paragraph with PEE
Linking to unseen poem: find thematic or structural connection → compare how each poet conveys the idea
Avoid retelling: don't summarise the poem — analyse HOW it creates meaning
Contextual knowledge: knowing poet's biography and historical context enriches analysis but must be relevant`,

'Prose Analysis': `Quotation integration: embed short quotes rather than dropping in long blocks
Example: The writer creates tension through "the silence pressed down like a weight", suggesting an oppressive atmosphere
Lexical choice: comment on individual word choices (connotations, register, tone)
Narrative time: summary (covers long period quickly) vs scene (moment-by-moment) — why this choice?`,

'Contextual Analysis': `New Historicism: literature reflects power structures of its time; read texts as cultural documents
Feminist reading: how are women represented? Whose perspective dominates? What is absent?
Post-colonial reading: how does text reflect or challenge colonial ideology? Who is othered?
Always ground contextual readings in textual evidence — context enriches, not replaces, close analysis`,

'Unseen Text & Comparing Texts': `Step 1: read the unseen text — annotate for technique, tone, theme, structure
Step 2: identify the key idea/theme — what is the text REALLY about?
Step 3: find comparison point with studied text — same theme, contrasting approach
Step 4: write integrated comparison — don't do all of text A then all of text B`,

'Oxford AQA Poetry Approach': `AOs: AO1 (argument/ideas), AO2 (language/structure/form), AO3 (context), AO4 (comparison)
Structure answer: opening statement → close analysis of language → form/structure → context → comparison
Mark scheme values: sustained, convincing argument over long description; specific quotation over vague reference
Time: 45 mins for comparison question → roughly 10 mins planning, 30 mins writing, 5 mins checking`,

'Unseen Poetry Skills': `First read: get overall sense of subject and tone (sad? celebratory? ironic?)
Second read: annotate techniques, key images, structural choices
Question usually asks HOW poet conveys emotion/idea → methods, not just what
Typical techniques to find: imagery, form (sonnet = 14 lines, volta at line 9), voice, tense, sound devices`,

'Themes in Prose': `Death and mortality: how characters face death — reveals their values and fears
Social class: characters defined by, and struggling against, class boundaries
Coming of age: protagonist learns about the world — loss of innocence, assumption of responsibility
Power dynamics: between parent/child, employer/employee, oppressor/oppressed — often central to plot`,

'Analysing Drama': `Genre conventions: tragedy (hero's fatal flaw → downfall), comedy (errors/misunderstandings → resolution), problem play (social issues)
Scene openings: how does the playwright establish atmosphere and conflict from the first lines?
Status: who holds power in each scene? How does this change? (track through dialogue and stage position)
Greek theatre influence: chorus, catharsis (emotional release), hamartia (fatal flaw), hubris (excessive pride)`,

'Studied Text Revision': `Prioritise key scenes/chapters — exam often focuses on specific extract plus broader discussion
Know key quotations: 2–3 per major theme and character; short, precise quotes most effective
Understand author's context and purpose — what is Steinbeck DOING in Of Mice and Men?
Practise extract questions: read, annotate, plan, write one timed response per studied text`,

// French
'Negatives & Questions': `Negation: ne...pas (not), ne...jamais (never), ne...rien (nothing), ne...personne (nobody), ne...plus (no longer)
Example: Je ne mange jamais de viande. (I never eat meat.)
Questions: inversion (Parlez-vous français?), est-ce que (Est-ce que vous parlez français?), intonation (Vous parlez français?)
Indirect questions: Je ne sais pas ce qu'il fait. (word order: subject + verb, not inverted)`,

'Personal Life & Identity': `Key vocabulary: la famille (family), les amis (friends), les loisirs (hobbies), les valeurs (values)
Talking about relationships: Je m'entends bien avec mon frère (I get on well with my brother)
Identity phrases: Je suis... (I am), J'ai... ans (I am ... years old), Je viens de... (I come from)
Opinion phrases: À mon avis, (in my opinion), Je pense que, (I think that), Il me semble que (It seems to me that)`,

'School & Future Plans': `School: le collège (11–15), le lycée (15–18), les matières (subjects), les devoirs (homework), les examens
Future tense regular: infinitive + -ai, -as, -a, -ons, -ez, -ont (e.g. je travaillerai = I will work)
Irregular futures: être → ser-, avoir → aur-, aller → ir-, faire → fer-
Career phrases: Je voudrais devenir... (I would like to become...), À l'avenir, j'espère... (In the future, I hope...)`,

'Listening & Reading Strategies': `Listening: read questions before the audio; focus on key words; listen for negatives (ne...pas)
Don't panic at unknown words — use context to infer meaning
Reading: cognates help (most -tion words are the same in French); prefixes and suffixes give clues
In exam: answer in the language asked; match level of detail to marks available`,

'Key Verb Tables': `Present: être (suis, es, est, sommes, êtes, sont); avoir (ai, as, a, avons, avez, ont)
Perfect: avoir/être + past participle; movement/reflexive verbs use être (je suis allé/allée)
Imperfect: stem from nous present + -ais, -ais, -ait, -ions, -iez, -aient
Conditional: infinitive + -ais, -ais, -ait, -ions, -iez, -aient (e.g. je voudrais = I would like)`,

'Expressing Opinions': `Agreement: Je suis d'accord (I agree), Tout à fait (Absolutely), C'est vrai (That's true)
Disagreement: Je ne suis pas d'accord (I disagree), Au contraire (On the contrary), Ce n'est pas vrai (That's not true)
Justifying: parce que (because), car (for/because), puisque (since), donc (therefore), c'est pourquoi (that's why)
Range: use different opinion phrases and justify with reasons for higher marks`,

'Paper Overview': `AQA French GCSE: Paper 1 Listening (35 mins, 50 marks), Paper 3 Reading (45 mins, 60 marks)
Paper 2 Speaking (teacher-assessed): role play + photo card + general conversation
Paper 4 Writing: 1hr 20min — translation, structured question, essay/letter
Higher tier: more complex language expected; Foundation: more support provided`,

'Adjectives, Pronouns & Negatives': `Agreement: adjectives agree in gender and number (petit/petite/petits/petites)
Position: most adjectives FOLLOW noun (une voiture rouge); BAGS adjectives precede (beau, ancien, grand, bon, etc.)
Direct object pronouns: le/la/les replace the direct object; come BEFORE the verb (Je le mange)
Indirect: lui/leur (to him/her/them): Je lui parle (I speak to him/her)`,

'Subjunctive & Advanced Structures': `Subjunctive triggered by: il faut que, vouloir que, bien que (although), pour que (so that), avant que (before)
Formation: ils form of present → drop -ent → add subjunctive endings
Example: Il faut que tu fasses tes devoirs. (You must do your homework.)
Relative pronouns: qui (subject), que (object), dont (of which/whose), où (where/when)`,

'Identity, Family & Relationships': `Describing appearance: grand(e), petit(e), les cheveux (hair), les yeux (eyes), mince (slim), âgé(e) (elderly)
Personality: sympa (nice), paresseux/paresseuse (lazy), travailleur/travailleuse (hardworking)
Family: les parents (parents), le beau-père (stepfather), la demi-sœur (half-sister)
Relationships: se disputer avec (to argue with), se réconcilier (to make up), avoir confiance en (to trust)`,

'School, Work & Future Plans': `GCSE to A-level: Je passe mes examens en juin. Après le lycée, j'espère aller à l'université.
Professions: médecin, ingénieur (no agreement needed after être), infirmier/infirmière
Conditional for dreams: Je voyagerais partout dans le monde. (I would travel everywhere in the world.)
Conditional for politeness: Je voudrais un café, s'il vous plaît. (I would like a coffee, please.)`,

'Listening Strategies': `Before listening: read all questions and underline key words
During: listen for answer immediately; note-take; don't leave gaps — eliminate wrong answers
Numbers/dates: practise listening for key numbers; année (year) vs an (year after number)
Accents change meaning: ou (or) vs où (where); a (has) vs à (at/to); la (the) vs là (there)`,

'Reading Strategies': `Skimming: read quickly for general gist; scanning: search for specific information
False friends: actuellement (currently, NOT actually), rester (to stay, NOT to rest), sensible (sensitive, NOT sensible)
Cognates: téléphone, musique, université, important — use these as anchors
For translation: read full sentence before translating; maintain natural English in your answer`,

'Speaking Exam Preparation': `Photo card: describe what you see → what is happening, where, who, what → give opinion
Role play: learn key functional language (asking for information, making purchases, solving problems)
General conversation: prepare 10–15 sentences per theme; practise with timer (give full answers, not one word)
Improve grade: use complex structures (subjunctive, conditional, relative clauses), expand answers with reasons and opinions`,

// English (Composition)
'Comprehension Strategies': `Active reading: highlight key words; identify topic sentence of each paragraph
Inference: "What does the text suggest?" — read between the lines, use evidence from text
Paraphrase: restate in your own words — shows understanding not just copying
Summary skills: identify main points, not supporting details; use own words; stay within word limit`,

'Text Types & Features': `Formal letter: address, date, salutation (Dear Mr/Ms), formal language, sign-off (Yours faithfully/sincerely)
Report: title, subheadings, objective tone, no personal pronouns, bullet points for recommendations
Narrative: setting, character development, conflict, climax, resolution; use varied sentence structure and descriptive language
Argumentative essay: introduction with thesis, body paragraphs (point + evidence + explanation), counter-argument, conclusion`,

'Formal Writing (Composition)': `Paragraph structure: TEEL (Topic sentence, Explanation, Evidence, Link back)
Vocabulary range: avoid repetition — use synonyms; vary sentence openers (Having considered... / Despite this... / Consequently...)
Formal register: avoid contractions (don't → do not), slang, first person unless required
Proofreading: check subject-verb agreement, tense consistency, punctuation (especially commas and apostrophes)`,

// Religious Studies
'Beliefs & Practices': `Tawhid (Islamic monotheism): Allah is one, indivisible, has no partners
Five Pillars: Shahada (declaration of faith), Salah (prayer 5x daily), Zakah (charity 2.5%), Sawm (Ramadan fasting), Hajj (pilgrimage)
Sunni vs Shia: succession after Muhammad (Sunni: Abu Bakr; Shia: Ali); 85% Sunni globally
Prayer (Salah): face Mecca, wudu (ritual cleansing) beforehand, specific rak'ahs for each prayer`,

'Ethics & Application': `Sanctity of life: life is sacred, God-given → basis for opposition to abortion, euthanasia, capital punishment
Just War Theory (Aquinas): just cause, last resort, right intention, proportionality, probability of success, declared by authority
Stewardship: humans are caretakers of creation → duty to protect environment (religious motivation for environmentalism)
Utilitarianism (Mill): greatest happiness for greatest number → consequentialist → may justify controversial actions`,

'Christian Ethics': `Situation ethics (Fletcher): the most loving action is always right → agape (unconditional love) determines ethics
Absolute ethics (Natural Law, Aquinas): some acts intrinsically right/wrong regardless of consequences
Golden Rule: "Do unto others as you would have them do unto you" (Matthew 7:12) — basis for Christian ethics
Social justice: preferential option for the poor (Liberation Theology); Jesus's concern for marginalised`,

'Ethical Theories': `Kantian ethics (Categorical Imperative): act only according to maxim you could universalise; treat people as ends, not means
Virtue ethics (Aristotle): focus on character — what kind of person should I be? Develop virtues (courage, justice, honesty)
Divine command theory: morality based on God's commands — what God says is good is good because God said it
Natural moral law (Aquinas): reason reveals God's moral law through nature; primary precepts include life, reproduction, knowledge`,

'Life & Death Issues': `Sanctity of life vs quality of life — central tension in medical ethics
Abortion: Humanist (woman's rights, quality of life); Catholic (life begins at conception, always wrong); CoE (sometimes permissible)
Euthanasia: voluntary assisted dying legal in some countries; religious opposition based on sanctity of life; "playing God"
Capital punishment: retribution vs rehabilitation; Catholics oppose; some Christian denominations accept in extreme cases`,

'War & Peace': `Pacifism: all violence is wrong; Quakers are pacifists; Jesus "blessed are the peacemakers"
Holy war: fought for religious reasons; jihad (greater = spiritual struggle; lesser = physical defence)
Just War criteria: must meet all criteria to be morally justified — proportionality, last resort, right intention, etc.
Nuclear weapons: mass destruction means no war can be truly "just" (proportionality violated) → Church of England`,

'Poverty & Wealth': `Christian view: money not evil but love of money is (1 Timothy 6:10); wealth is stewardship responsibility
Parable of the Talents: use gifts responsibly; Good Samaritan: help those in need regardless of background
Zakat (Islam): 2.5% of savings given to eight specified categories of recipient (poor, debtors, travellers, etc.)
Liberation theology: God has preferential option for the poor; Christians must work for social justice, not just charity`,

'Buddhist Beliefs & Practices': `Four Noble Truths: Dukkha (suffering exists), Samudaya (caused by craving/tanha), Nirodha (cessation possible), Magga (Eightfold Path)
Eightfold Path: right understanding, intention, speech, action, livelihood, effort, mindfulness, concentration
Three Marks of Existence: impermanence (anicca), suffering (dukkha), no-self (anatta)
Karma: intentional actions create consequences; Nirvana: liberation from cycle of rebirth (samsara)`,

'Jewish Ethics & Modern Issues': `Tikkun Olam: repairing the world — Jewish obligation to pursue social justice
Pikuach nefesh: preservation of life overrides almost all other commandments (e.g. breaking Sabbath to save life)
Environmental ethics: Bal tashchit — do not destroy (unnecessarily); Jews have duty to protect creation
Euthanasia: most Orthodox oppose (life belongs to God); some Progressive Jews accept in extreme cases`,

'Christian Beliefs': `Trinity: Father, Son, Holy Spirit — three persons, one God (not three gods)
Incarnation: God became human in Jesus (John 1:14) — "the Word became flesh"
Atonement: Jesus's death repairs relationship between humanity and God (substitutionary, moral influence, Christus Victor theories)
Resurrection: bodily resurrection of Jesus on third day — central to Christian faith (1 Corinthians 15:14: "if Christ has not been raised, your faith is futile")`,

'Christian Practices': `Baptism: initiation into Church; infant (Catholic, Anglican) or believer's (Baptist, Evangelical)
Eucharist/Communion: remembering Last Supper; Catholic = transubstantiation; Protestant = symbolic
Prayer: ACTS (Adoration, Confession, Thanksgiving, Supplication) — private and communal
Pilgrimage: Lourdes (healing), Jerusalem, Santiago de Compostela — spiritual journey`,

'Christian Views on Life & Death': `Soul: non-physical aspect of person; survives death; basis for belief in afterlife
Heaven: eternal life with God for those who accept salvation; Hell: separation from God
Purgatory (Catholic): cleansing after death before Heaven; Protestants reject purgatory
Near-death experiences: evidence cited for afterlife; alternative = physiological explanation (brain oxygen deprivation)`,

'Christian Views on Peace & Justice': `Forgiveness: central — "Forgive us our trespasses as we forgive those who trespass against us" (Lord's Prayer)
Reconciliation: working to restore broken relationships — Desmond Tutu, Truth and Reconciliation Commission
Justice: restorative vs retributive — many Christians prefer rehabilitation over punishment
Martin Luther King: non-violent civil disobedience rooted in Christian love (agape) and justice`,

'Islamic Beliefs': `Allah (God): Tawhid — absolute monotheism; 99 names of Allah describe his attributes
Angels: created from light, have no free will, carry out Allah's commands (Jibril brought Quran to Muhammad)
Prophethood: 25 prophets named in Quran; Muhammad is Seal of Prophets (final messenger)
Predestination (Al-Qadr): Allah has knowledge of all things; debate about free will vs determinism in Islam`,

'Islamic Views on Life & Death': `Akhirah (afterlife): resurrection on Day of Judgement; deeds weighed; Jannah (paradise) or Jahannam (hell)
Barzakh: intermediate state between death and resurrection; soul waits for judgement
Sanctity of life: life is gift from Allah; suicide is haram; euthanasia generally forbidden
Qur'an 5:32: "whoever saves one life, it is as if he has saved all of mankind"`,

'Christian Beliefs & Practices': `Liturgical worship: follows set order (Catholic Mass, Anglican Communion) — structure, tradition, sacraments central
Non-liturgical: spontaneous, spirit-led worship (Pentecostal, Baptist) — more informal, emphasis on personal response
World Church (ecumenism): different denominations working together; World Council of Churches (1948)
Mission and evangelism: sharing the gospel; Great Commission (Matthew 28:19) — "Go and make disciples of all nations"`,

'Christian Ethics & Social Issues': `Racism and equality: "There is neither Jew nor Gentile...for you are all one in Christ Jesus" (Galatians 3:28)
Gender equality: complementarian (different but equal roles) vs egalitarian (same roles); ordination of women debated
LGBTQ+ issues: spectrum from full inclusion (liberal denominations) to celibacy requirement (traditional view)
Environment: stewardship — humans are caretakers of God's creation; ecological sin concept emerging in Catholic teaching`,

'Islamic Beliefs & Practices': `Mosque: place of worship and community; minaret (call to prayer), mihrab (direction of Mecca), wudu area
Friday Jumu'ah prayer: obligatory for men; imam leads prayer, delivers khutbah (sermon)
Quran: revealed to Muhammad over 23 years; memorised (hafiz); Arabic is sacred language; no translation = Quran
Hadith: recorded sayings and actions of Muhammad; second source of Islamic law (Shari'ah) after Quran`,

'Arguments for the Existence of God': `Cosmological argument (Aquinas): everything has a cause → chain cannot be infinite → must be a first uncaused cause = God
Teleological argument (Paley): watch analogy → complexity of universe implies designer = God
Ontological argument (Anselm): God = greatest conceivable being → must exist in reality as well as concept
Criticisms: Hume — universe could be uncaused; Dawkins — complexity explained by evolution; Kant — existence is not a predicate`,

'Religious & Ethical Themes': `Conscience: voice of God (Newman)? or socialised moral sense (Freud)? Central to Catholic moral teaching
Free will: necessary for moral responsibility; if God determines everything → no real moral choice
Evil and suffering: theodicy problem — if God is omnipotent and omnibenevolent, why does evil exist?
Irenaeus: soul-making theodicy — suffering is necessary for spiritual growth and development`,

'Science & Religion': `Conflict model: science and religion at war (Draper, White) — Darwin vs Church narrative (oversimplified)
Independence model: different domains — science = how, religion = why (NOMA, Gould)
Integration model: science and religion complement each other; many scientists are religious
Big Bang and Genesis 1: not necessarily incompatible — "days" may be epochs; God could use evolution as mechanism`,

'Peace, Conflict & Social Justice': `Ahimsa: non-violence in Buddhism and Hinduism; Gandhi's use in Indian independence movement
Reconciliation: Northern Ireland peace process involved religious leaders (churches, mixed-faith groups)
Forgiveness vs justice: can one forgive without justice? (e.g. restorative justice programmes in prisons)
Poverty: religious organisations provide aid (Christian Aid, Islamic Relief) and challenge structural causes`,

'Oxford AQA Religious Studies Exam Technique': `4-mark question: state two beliefs with brief explanation each; use religious vocabulary
12-mark question: examine both sides thoroughly; use religious teachings and scholarly/philosophical views
Evaluation (final 3 marks): state your view clearly and justify with reasons; acknowledge strongest counter-argument
Common mistake: describing without evaluating — examiners want you to assess, judge, and justify`,

// Environmental Management
'Climate Change & The Atmosphere': `Greenhouse gases: CO₂ (fossil fuels), CH₄ (livestock, landfill), N₂O (fertilisers), water vapour (natural)
Enhanced greenhouse effect: human emissions → more heat trapped → global warming
Evidence: rising CO₂ (280ppm pre-industrial → 420ppm 2023), temperature anomalies, ice cores, glacier retreat
Feedback loops: Arctic ice melts → less albedo (reflection) → more warming → more melt (positive feedback)`,

'Water Resources & Pollution': `Water pollution sources: agricultural runoff (nitrates, pesticides), industrial effluent, sewage, oil spills
Eutrophication: excess nitrates/phosphates → algal bloom → decomposition uses up O₂ → fish die
Sewage treatment: primary (sedimentation), secondary (biological — bacteria break down organics), tertiary (chemical)
Water treatment: screening, sedimentation, filtration, chlorination → safe drinking water`,

'Energy Sources': `Non-renewable: coal, oil, natural gas (fossil fuels) — high energy density, reliable, but finite and polluting
Renewable: solar (PV panels), wind turbines, hydroelectric, geothermal, tidal, biomass
Nuclear: low carbon but radioactive waste, high cost, accident risk (Chernobyl, Fukushima)
Energy mix: most countries use combination; transition to renewables needed to meet climate targets`,

'Population & Development': `Demographic dividend: working-age population grows faster than dependants → economic growth opportunity (e.g. India)
Ageing population: more elderly dependants → healthcare costs, pension burden, labour shortages
Urbanisation pressure: cities grow faster than infrastructure → slums, pollution, congestion
Sustainable development (Brundtland): "meets needs of present without compromising ability of future generations to meet their needs"`,

// Spanish
'Understanding Spoken Spanish': `Listen for gist first; then specific information (numbers, names, time, place)
False cognates: embarazada (pregnant, not embarrassed), éxito (success, not exit), librería (bookshop, not library)
Numbers: cien (100), mil (1000); dates: el tres de mayo de 2024
Register: formal (usted) vs informal (tú) — listen for this clue about the relationship between speakers`,

'Reading Comprehension': `Scan for cognates first: interesante, importante, natural, popular, comunicación
Look for negatives (no, nunca, jamás, ni...ni) — change meaning completely
Time markers: ayer (yesterday), mañana (tomorrow), el año pasado (last year), dentro de poco (soon)
Inference: what does the text imply? Use context clues for unknown vocabulary`,

'Writing Skills': `Essay structure: introducción → desarrollo (3 puntos) → conclusión
Connectives: además (furthermore), sin embargo (however), por otro lado (on the other hand), por eso (therefore)
Opinion phrases: En mi opinión, Creo que, Pienso que, Desde mi punto de vista (from my point of view)
Justify opinions: porque, ya que (since/because), dado que (given that), a causa de (because of)`,

'Key IGCSE Topics': `Environment: el calentamiento global, la contaminación, las energías renovables, el reciclaje
Technology: las redes sociales, el móvil, Internet, los beneficios y desventajas
Health: llevar una vida sana, hacer ejercicio, comer bien, evitar el estrés, el tabaco
Travel: el transporte público, viajar al extranjero, las vacaciones, el turismo`,

'Tenses (Edexcel Spanish)': `Present: regular -ar/-er/-ir endings; irregular: ser/estar/tener/ir/hacer/venir/poder/querer
Preterite: -é,-aste,-ó,-amos,-asteis,-aron (-ar); -í,-iste,-ió,-imos,-isteis,-ieron (-er/-ir)
Imperfect: -aba endings (-ar); -ía endings (-er/-ir); used for description/habitual past
Future: infinitive + -é,-ás,-á,-emos,-éis,-án; irregulars: tener→tendr-, hacer→har-, ir→ir-`,

'Listening & Reading (Edexcel)': `Paper 1 (Listening): 45 minutes; range of Spanish accents; Part A (Foundation tasks) + Part B (Higher extension)
Paper 3 (Reading): 60 minutes; texts in Spanish; answer in English or Spanish depending on question
Key skill: identifying specific information quickly; don't panic at unfamiliar vocabulary — use context
Check answers: does your answer actually answer the question asked? Match length to marks available`,

'Oxford AQA Key Grammar Points': `Ser vs estar: ser = permanent characteristics (nationality, profession, physical); estar = temporary state, location
Para vs por: para = purpose/recipient ("for someone"); por = reason/exchange/duration ("because of/in exchange for")
Reflexive verbs: me llamo, se llama; levantarse → me levanto (I get up)
Subjunctive: quiero que vengas (I want you to come); ojalá (hopefully) + subjunctive`,

'Themes (Oxford AQA)': `Theme 1: Identity and culture (family, technology, music, cinema, traditions)
Theme 2: Local, national, international and global areas of interest (travel, environment, social issues, global problems)
Theme 3: Current and future study and employment (school, future plans, careers)
Vocabulary range: aim for 2000+ words at Higher tier; learn topic-specific vocabulary in context, not lists`,

'Exam Structure (Oxford AQA)': `4 papers: Listening (35%), Speaking (25%), Reading (25%), Writing (15%)
Speaking: role play (5 min prep, 2 min performance), photo card (12 min), general conversation
Writing: 60 mins — Form completion + short message + structured question + essay (minimum 130 words)
Grading: 9–1 scale; Higher tier: grades 4–9 targeted; Foundation: 1–5 targeted`,

'Speaking Preparation': `Role play: practise unexpected question (one question always unprepared); use set phrases
Photo card: describe → explain → speculate → give opinion; use all tenses
General conversation: practise spontaneous answers; extend every answer with opinions and reasons
Pronunciation: practise difficult sounds (rr, j, ñ, ll); stress patterns — penultimate syllable usually stressed`,
};

// Find topics missing workedExample (ends with ]}) and add them
let count = 0;
const codeLines = code.split('\n');
const result = [];

for (let i = 0; i < codeLines.length; i++) {
  const m = codeLines[i].match(/^(\s+)\{ title:'([^']+)', points:\[/);
  if (m) {
    const title = m[2];
    if (WE[title]) {
      // check if next few lines have workedExample
      let hasWE = false;
      for (let j = i+1; j < Math.min(i+35, codeLines.length); j++) {
        if (codeLines[j].match(/\], workedExample/)) { hasWE = true; break; }
        if (codeLines[j].match(/^\s+\]\}/)) { break; }
      }
      if (!hasWE) {
        // Find the closing ]} and insert workedExample before it
        for (let j = i+1; j < Math.min(i+35, codeLines.length); j++) {
          if (codeLines[j].match(/^\s+\]\}/)) {
            codeLines[j] = codeLines[j].replace(']},', `], workedExample:\`${WE[title]}\`},`).replace(']}', `], workedExample:\`${WE[title]}\`}`);
            count++;
            break;
          }
        }
      }
    }
  }
}

fs.writeFileSync('app.js', codeLines.join('\n'));
console.log('Added worked examples:', count);
