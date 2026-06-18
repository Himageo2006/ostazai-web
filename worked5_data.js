export const WORKED5 = {
'Human Reproductive System': `Describe fertilisation and early development in humans.
1. Sperm travel through fallopian tube to meet egg after ovulation.
2. One sperm penetrates egg → fertilisation → zygote (diploid: 46 chromosomes).
3. Zygote divides by mitosis → embryo travels to uterus (3-4 days).
4. Embryo implants in uterine wall (endometrium) → placenta develops.
Placenta: exchanges O₂, glucose, nutrients and CO₂, urea between mother and foetus.`,

'Pathogens & Disease': `Explain how HIV causes AIDS.
HIV = Human Immunodeficiency Virus (retrovirus — uses RNA).
HIV attacks helper T-cells (CD4 lymphocytes) that coordinate immune responses.
Virus inserts DNA copy into T-cell genome → T-cell produces more HIV → T-cell destroyed.
AIDS: T-cell count drops below 200/mm³ → immune system collapses → opportunistic infections (e.g. pneumonia) become fatal.
Treatment: Antiretroviral therapy (ART) — not a cure, but suppresses viral replication.`,

'Selective Breeding': `Describe how a farmer selectively breeds cattle for higher milk yield.
1. Identify cattle with highest milk yield (desirable trait).
2. Breed these together — select best offspring with highest milk yield.
3. Repeat over many generations — frequency of alleles for high yield increases.
4. After many generations, most cattle produce significantly more milk.
Risk: reduced genetic diversity → vulnerability to new diseases (gene pool narrows).`,

'Ecosystems & Interdependence': `Describe a food web and explain the effect of removing one species.
Food web: grass → rabbit → fox; grass → rabbit → owl; grass → deer → wolf
If rabbits are removed: grass increases (not grazed); foxes and owls decrease (no food).
This is cascade effect — disrupts predator-prey balance throughout ecosystem.
Keystone species: wolves in Yellowstone — removal caused deer to overgraze, destabilising rivers and vegetation.`,

'The Heart & Circulatory System': `Trace the path of a red blood cell from the body to the lungs and back.
Body → vena cava → right atrium → right ventricle → pulmonary artery → lungs (gas exchange)
Lungs → pulmonary vein → left atrium → left ventricle → aorta → body
Left ventricle has thicker wall (pumps blood further around body at higher pressure).
Double circulation: pulmonary (heart-lungs) + systemic (heart-body) circuits.`,

'Data Storage & Encoding': `A colour image is 640×480 pixels, with 24-bit colour. Calculate file size.
Bits = 640 × 480 × 24 = 7,372,800 bits
Bytes = 7,372,800/8 = 921,600 bytes = 900 KB
24-bit colour = 2²⁴ = 16.7 million possible colours (True Colour)
JPEG compression reduces this; PNG is lossless.`,

'Algorithm Design': `Write pseudocode to find the largest number in a list of 5 numbers.
largest ← list[0]
FOR i ← 1 TO 4 DO
    IF list[i] > largest THEN
        largest ← list[i]
    ENDIF
ENDFOR
OUTPUT largest
Time complexity: O(n) — must examine every element.`,

'Metallic Bonding': `Explain why metals conduct electricity.
In a metal: positive metal ions (cations) arranged in a regular lattice.
Delocalised electrons (electron sea) move freely through the lattice.
When a voltage is applied: electrons flow from negative to positive terminal — electric current.
Why metals are malleable: layers of ions can slide over each other while delocalised electrons maintain bonding.`,

'Empirical & Molecular Formulae': `A compound contains 40% C, 6.7% H, 53.3% O by mass. Find empirical and molecular formulae (Mr = 60).
Molar ratios: C = 40/12 = 3.33, H = 6.7/1 = 6.7, O = 53.3/16 = 3.33
Divide by smallest (3.33): C = 1, H = 2, O = 1
Empirical formula: CH₂O (Mr = 30)
n = 60/30 = 2 → Molecular formula: C₂H₄O₂ (ethanoic acid / acetic acid)`,

'Acids & Bases': `pH of 0.01 mol/dm³ HCl solution?
HCl is strong acid — fully dissociates: HCl → H⁺ + Cl⁻
[H⁺] = 0.01 = 10⁻² mol/dm³
pH = −log[H⁺] = −log(10⁻²) = 2
Weak acid example: 0.01M ethanoic acid → [H⁺] < 0.01 → pH > 2`,

'Alcohols, Polymers & Organic Chemistry': `Fermentation to produce ethanol from glucose.
C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ (using yeast enzymes, anaerobic conditions, ~35°C)
Distillation: ethanol (bp 78°C) distilled from fermentation mixture.
Ethanol as biofuel: renewable (grown); burns cleanly; carbon neutral in theory (CO₂ absorbed in growing).
Dehydration: C₂H₅OH → C₂H₄ + H₂O (with hot conc. H₂SO₄/Al₂O₃ catalyst) → ethene`,

'Reactivity Series & Metals': `Predict and write equation for iron reacting with copper sulphate solution.
Iron is above copper in reactivity series → Fe displaces Cu.
Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)
Observations: Blue solution turns pale green; red-brown copper deposits on iron.
Ionic equation: Fe(s) + Cu²⁺(aq) → Fe²⁺(aq) + Cu(s)
Fe loses electrons (oxidised), Cu²⁺ gains electrons (reduced) — redox reaction.`,

'Contact Process & Sulfuric Acid': `Describe the Contact Process for manufacturing sulphuric acid.
Step 1: S + O₂ → SO₂ (burning sulphur)
Step 2: 2SO₂ + O₂ ⇌ 2SO₃ (catalyst V₂O₅, 450°C, 1-2 atm) — reversible, forward exothermic
Step 3: SO₃ + H₂SO₄ → H₂S₂O₇ (oleum) — NOT directly added to water (too violent)
Step 4: H₂S₂O₇ + H₂O → 2H₂SO₄
Conditions: 450°C (compromise — high enough for acceptable rate, low enough for acceptable yield)`,

'Identifying Ions & Gases': `Test for ammonium ions in an unknown white solid.
Add NaOH solution and warm → if NH₄⁺ present, ammonia gas (NH₃) produced.
Test: hold damp red litmus paper over tube → turns blue (alkaline gas).
Equation: NH₄⁺ + OH⁻ → NH₃ + H₂O
Also: to confirm sulphate → add BaCl₂/HCl → white precipitate; to confirm chloride → add AgNO₃/HNO₃ → white precipitate.`,

'Atomic Structure & The Periodic Table': `Explain periodic trends in first ionisation energy.
First IE = energy to remove 1 mole of electrons from 1 mole of gaseous atoms.
Across period: IE increases — nuclear charge increases, atomic radius decreases, stronger attraction.
Exceptions: Group 3 dips below Group 2 (outer electron in 2p, slightly further/shielded)
Group 6 dips below Group 5 (paired electron in 2p — electron-electron repulsion reduces IE)
Down group: IE decreases — more electron shells, greater shielding, weaker nuclear attraction.`,

'Powers, Roots & Standard Form': `A bacterium multiplies every 20 minutes. Starting with 1, how many after 3 hours?
3 hours = 180 minutes; doublings = 180/20 = 9
Population = 2⁹ = 512
In standard form: 5.12 × 10²
Check: 2¹⁰ = 1024, so 2⁹ = 512 ✓`,

'Waves': `A sound wave has speed 340 m/s and period 0.002s. Find frequency and wavelength.
Frequency = 1/period = 1/0.002 = 500 Hz
Wavelength = v/f = 340/500 = 0.68 m
Ultrasound: frequency > 20 kHz (above human hearing range); used in medical imaging.`,

'Radioactivity & Nuclear Energy': `What happens in alpha decay of Uranium-238?
²³⁸₉₂U → ²³⁴₉₀Th + ⁴₂He (alpha particle)
Mass number decreases by 4, atomic number decreases by 2.
Alpha particles: stopped by paper or few cm of air; most ionising; least penetrating.
Half-life of U-238: 4.5 billion years → used in geological dating.`,

'Momentum & Pressure': `A 0.5kg ball travelling at 4 m/s hits a wall and bounces back at 3 m/s. Find impulse.
Impulse = change in momentum = m(v − u)
Taking initial direction as positive: u = +4, v = −3
Δp = 0.5 × (−3 − 4) = 0.5 × (−7) = −3.5 Ns
The wall exerts 3.5 Ns impulse in the negative direction on the ball.`,

'Energy Changes in Reactions': `Explain using bond energy why combustion is exothermic.
Combustion: CH₄ + 2O₂ → CO₂ + 2H₂O
Energy IN (breaking bonds): C-H × 4 + O=O × 2 = ~2640 kJ
Energy OUT (forming bonds): C=O × 2 + O-H × 4 = ~3338 kJ
ΔH = energy in − energy out = 2640 − 3338 = −698 kJ/mol (negative = exothermic)`,

'Energy Flow & Nutrient Cycles': `Only 10% of energy transfers between trophic levels. Why?
Energy lost as: heat (respiration); movement; undigested material (faeces); excretion.
Example: grass stores 10,000 kJ → rabbit gets 1,000 kJ → fox gets 100 kJ.
Implication: shorter food chains are more energy-efficient (why eating plants is more efficient than eating meat).
Nitrogen cycle: N₂ → NH₃ (fixation by Rhizobium bacteria) → NO₃⁻ (nitrification) → absorbed by plants → decomposed by bacteria → N₂ (denitrification).`,

'Class, Status & Power': `Weber's three dimensions of stratification: Class, Status, Party (Power).
Class: economic position — based on market relations and life chances (not just ownership).
Status: social prestige/honour — how others view you (can differ from economic class: a teacher has high status but modest income).
Party: organised groups seeking power (political parties, trade unions).
Example: a lottery winner gains class (wealth) but not necessarily status; a celebrity has status without political power.`,

'Power & Politics': `Compare pluralist and elite theories of power.
Pluralism (Dahl): power is dispersed across many groups; competition between interest groups prevents domination; democracy works.
Elite theory (Mills): power concentrated in "power elite" — top military, corporate, political leaders share interests and connections.
Evidence for pluralism: different pressure groups win on different issues.
Evidence for elite theory: revolving door between government and business; wealth concentration in politics.`,

'Verbs & Tenses': `French: Conjugate "aller" (to go) in present, past (passé composé) and future.
Present: je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont
Passé composé: je suis allé(e), tu es allé(e), il est allé, elle est allée
Future: j'irai, tu iras, il/elle ira, nous irons, vous irez, ils/elles iront
Note: "aller" takes être as auxiliary in passé composé (DR MRS VANDERTRAMP verbs)`,

'Tenses (Edexcel Focus)': `German: Write 3 sentences about a past holiday using perfect tense (Perfekt).
Letzten Sommer bin ich nach Spanien gefahren. (Last summer I went to Spain.)
Ich habe am Strand gelegen und Eis gegessen. (I lay on the beach and ate ice cream.)
Das Wetter war fantastisch und sehr heiß. (The weather was fantastic and very hot.)
Key: sein verbs (motion/change): bin gefahren, bin gegangen. Haben verbs: habe gespielt, habe gegessen.`,

'Edexcel Key Themes & Vocabulary': `Spanish: Describe an environmental problem and suggest a solution (exam register).
El problema principal es la contaminación del aire. (The main problem is air pollution.)
Se debe a los coches y las fábricas. (It is caused by cars and factories.)
Para solucionarlo, el gobierno debería invertir en energías renovables. (To solve it, the government should invest in renewable energies.)
Si no actuamos, el cambio climático empeorará. (If we don't act, climate change will worsen.)`,

'Advanced Vocabulary & Idioms': `Replace these basic phrases with C1/C2 level vocabulary:
"very important" → crucial, paramount, indispensable, of utmost significance
"many" → a plethora of, a multitude of, copious, numerous
"said" → asserted, contended, remarked, proclaimed, conceded
"shows" → demonstrates, illustrates, reveals, highlights, underscores
"because" → owing to, as a consequence of, in light of, given that`,

'Listening Techniques': `Strategies for listening comprehension in language exams:
1. Pre-read questions BEFORE the audio starts — identify key words to listen for.
2. First listen: get gist; second listen: specific details.
3. Write brief notes in English/your language while listening.
4. Don't panic if you miss something — keep listening; the answer may be repeated.
5. Beware distractors — the recording often gives a wrong answer first, then corrects it.`,

'Speaking & Role-Play': `French role-play: buying train tickets.
Scenario: You want 2 adult returns to Paris leaving Saturday morning.
"Je voudrais deux billets aller-retour pour Paris, s'il vous plaît."
"Pour samedi matin — est-ce qu'il y a un train avant dix heures?"
"Combien coûte le voyage?" / "C'est quel quai?"
Key: Be polite (vous form), ask for clarification if needed: "Pouvez-vous répéter, s'il vous plaît?"`,

'Exam Vocabulary Banks': `Spanish writing task — family and relationships:
mis padres / my parents — me llevo bien con / I get on well with — sin embargo / however
tener en común / have in common — me parece que / it seems to me that — aunque / although
a veces discutimos porque / sometimes we argue because — en mi opinión / in my opinion
lo más importante es / the most important thing is — actualmente / nowadays`,

'Speaking Exam Skills': `German speaking exam — discussing advantages and disadvantages of social media.
Vorteil: Man kann mit Freunden in Kontakt bleiben. (Advantage: You can stay in contact with friends.)
Nachteil: Es gibt viel Cybermobbing. (Disadvantage: There is a lot of cyberbullying.)
Meiner Meinung nach ist soziale Medien sowohl nützlich als auch gefährlich. (In my opinion, social media is both useful and dangerous.)
Add opinion + justification for top marks; avoid monosyllabic answers.`,

'Oxford AQA Chemistry Exam Technique': `12-mark question on industrial chemistry: "Discuss the economic and environmental considerations in choosing conditions for the Haber Process."
Economic: High pressure (200 atm) increases yield but very expensive equipment; high T (450°C) reduces yield but increases rate — need acceptable rate.
Catalyst (iron): reduces energy cost; not used up; allows lower T.
Environmental: N₂ from air (free, unlimited); H₂ from natural gas (non-renewable, produces CO₂).
Ammonia use: fertilisers feed global population; but nitrous oxide from fertilisers is a greenhouse gas.
Conclusion: Compromise conditions balance cost, rate and yield — sustainable production requires renewable H₂ source.`,

'Drawing Lewis Structures': `Draw the Lewis (dot-cross) structure of CO₂.
Carbon has 4 outer electrons; each oxygen has 6.
Carbon forms 2 double bonds (each = 2 shared pairs) to satisfy octets.
O=C=O
Electron count: C → 4 bonds used (octet); each O → 2 bonds + 2 lone pairs (octet) ✓
Bond angle: 180° (linear molecule — no lone pairs on central C)`,

'Spectroscopy & Analysis': `An IR spectrum shows a broad absorption at 2500-3300 cm⁻¹ and a sharp peak at 1710 cm⁻¹. Identify functional groups.
2500-3300 cm⁻¹: O-H stretch (carboxylic acid — broad due to hydrogen bonding)
1710 cm⁻¹: C=O stretch (carbonyl)
Together: indicates a carboxylic acid (−COOH group)
NMR would show: singlet for OH proton (disappears with D₂O); CH peaks depending on carbon skeleton.`,

'Isomerism': `Draw structural isomers of C₄H₁₀ (butane).
Butane (n-butane): CH₃CH₂CH₂CH₃ — straight chain
Methylpropane: CH₃CH(CH₃)CH₃ — branched chain (2-methylpropane)
Only 2 structural isomers of C₄H₁₀.
Check: both have formula C₄H₁₀ but different connectivity → structural isomers.`,

'Chromatography': `Gas chromatography separates compound A (retention time 2.1 min) and B (3.5 min). Explain.
Mobile phase: inert carrier gas (e.g. nitrogen or helium) carries compounds through column.
Stationary phase: liquid coating on solid support.
More time in stationary phase → longer retention time → compound B is more soluble in stationary phase.
After GC: detector records signal; area under peak ∝ quantity of compound.`,

'Nucleophilic Substitution': `SN2 mechanism: CH₃Br + NaOH → CH₃OH + NaBr
Nucleophile OH⁻ attacks carbon from behind the C-Br bond (backside attack).
Transition state: carbon is pentacoordinate (5 bonds) — the leaving group (Br⁻) departs.
Inversion of configuration (Walden inversion) — if chiral carbon, stereochemistry inverts.
SN2: favoured by primary substrates, strong nucleophiles, polar aprotic solvents.`,

'Elimination Reactions': `Elimination of HBr from 2-bromobutane with hot concentrated KOH/alcohol.
CH₃CHBrCH₂CH₃ + KOH → CH₃CH=CHCH₃ + KBr + H₂O (major: Zaitsev's rule)
The more substituted alkene is the major product.
Also possible: CH₂=CHCH₂CH₃ (minor product)
E2 mechanism: concerted — base removes β-hydrogen, leaving group departs simultaneously.`,

'Amino Acids & Proteins': `Draw the general structure of an amino acid and explain peptide bond formation.
General structure: H₂N-CHR-COOH (amino group, alpha-carbon with R group, carboxyl group)
Condensation reaction: amino group of one AA + carboxyl group of another → peptide bond (-CO-NH-) + H₂O
Dipeptide: H₂N-CHR₁-CO-NH-CHR₂-COOH
Primary structure = sequence of amino acids
Secondary structure = alpha helix or beta pleated sheet (H-bonds)`,

'Enzymes': `Explain enzyme inhibition with an example.
Competitive inhibition: inhibitor structurally similar to substrate → binds active site → blocks substrate.
Example: malonate inhibits succinate dehydrogenase (similar structure to succinate substrate).
Effect: increasing substrate concentration overcomes inhibition (competes with inhibitor).
Non-competitive inhibition: inhibitor binds allosteric site → changes active site shape → enzyme less effective.
Cannot overcome by adding more substrate.`,

'Cell Membranes': `Explain how temperature affects membrane permeability.
At low T: phospholipids pack more tightly → membrane more rigid → less permeable.
At ~40°C: membrane is fluid — normal permeability, proteins function normally.
Above 45°C: phospholipid tails unsaturate; proteins denature → channels malfunction → membrane very permeable; ions leak.
Evidence: beetroot experiment — higher temperature → more anthocyanin pigment leaks from vacuole.`,

'Immune System': `Compare innate and adaptive immunity.
Innate: fast (immediate); non-specific; same response every time; phagocytes engulf pathogens; no memory.
Adaptive: slower (days); specific to antigen; creates memory cells; B-lymphocytes produce antibodies; T-lymphocytes kill infected cells.
Vaccination: introduces antigens (weakened/killed) → adaptive response creates memory cells → future exposure → faster, stronger response.`,

'Genetic Engineering': `Describe how insulin is produced using genetic engineering.
1. Identify human insulin gene (using restriction enzymes to cut out gene).
2. Cut open bacterial plasmid with same restriction enzyme → sticky ends.
3. Insert insulin gene into plasmid (DNA ligase seals).
4. Insert recombinant plasmid into E. coli bacteria.
5. Bacteria multiply and produce human insulin.
Advantage: no risk of allergic reaction (vs. pig insulin); large-scale production possible.`,

'Osmosis & Diffusion': `Potato cylinders placed in different sucrose solutions. Predict results.
In distilled water (0M): water moves IN by osmosis (potato has higher solute concentration) → cylinder gains mass, becomes turgid.
In 1M sucrose (concentrated): water moves OUT → cylinder loses mass, becomes flaccid/plasmolysed.
At isotonic concentration: no net movement → mass unchanged.
Graph: mass change vs. concentration — straight line, crossing x-axis at isotonic point.`,

'Seed Germination & Growth': `Explain the role of gibberellins in seed germination.
Gibberellins (plant growth hormones): stimulate enzyme synthesis in aleurone layer of seed.
Enzymes (amylases) break down starch in endosperm into sugars → energy for growing embryo.
Also promote: stem elongation, flowering, fruit development.
Commercial use: gibberellins sprayed on grapes to produce larger seedless fruits.`,

'Newton\'s Law of Gravitation': `Calculate gravitational force between Earth (6×10²⁴kg) and Moon (7.3×10²²kg) separated by 3.8×10⁸m.
F = GMm/r² = (6.67×10⁻¹¹ × 6×10²⁴ × 7.3×10²²)/(3.8×10⁸)²
= (6.67×10⁻¹¹ × 4.38×10⁴⁷)/(1.444×10¹⁷)
= 2.92×10³⁷/1.444×10¹⁷ = 2.02×10²⁰ N`,

'Electromagnetic Induction': `A rectangular coil of 100 turns, area 0.02m², rotates in a 0.5T field at 50 rev/s.
Maximum EMF = NBAω = 100 × 0.5 × 0.02 × (2π × 50)
= 100 × 0.5 × 0.02 × 314 = 314 V
An EMF is induced when magnetic flux through coil changes (Faraday's law).
Peak EMF occurs when coil is parallel to field (maximum rate of flux change).`,

'Special Relativity': `A spaceship moves at 0.8c. What time does a 10-year journey take for observers on Earth?
Time dilation: t = t₀/√(1 − v²/c²)
γ = 1/√(1 − 0.64) = 1/√0.36 = 1/0.6 = 1.667
Earth time = 10 × 1.667 = 16.7 years
The astronaut ages 10 years but 16.7 years pass on Earth — this is the "twin paradox".`,

'Optics & Lenses': `An object is 15cm in front of a converging lens (f = 10cm). Find image position.
1/v − 1/u = 1/f (using sign convention: u is negative for real object)
1/v = 1/f + 1/u = 1/10 + 1/(−15) = 3/30 − 2/30 = 1/30
v = 30 cm (positive = real image, on other side of lens)
Magnification = v/u = 30/15 = 2 (image is twice the size, inverted)`,

'Oscillations & SHM': `A spring (k = 40 N/m) with mass 0.1kg. Find period of oscillation.
T = 2π√(m/k) = 2π√(0.1/40) = 2π√0.0025 = 2π × 0.05 = 0.314 s
Frequency = 1/T = 3.18 Hz
At equilibrium: KE = maximum, PE = 0
At amplitude: KE = 0, PE = maximum`,

'Fluid Mechanics': `Archimedes: A wooden block (density 600 kg/m³, volume 0.5m³) floats in water. Find submerged fraction.
For floating: buoyancy force = weight
ρ_water × V_sub × g = ρ_wood × V × g
V_sub/V = ρ_wood/ρ_water = 600/1000 = 0.6
60% of block is submerged.`,

'History: Weimar Republic': `Explain why the Weimar Republic faced problems in its early years.
Political: Stab-in-the-back myth — army generals blamed politicians for defeat; right-wing opposition (Kapp Putsch 1920, Beer Hall Putsch 1923).
Economic: hyperinflation 1923 — Germany printed money to pay reparations → Mark became worthless.
Social: war veterans unable to adjust; political violence between communist and right-wing groups.
Underlying: Republic associated with defeat and humiliation of Versailles → lacked popular legitimacy.`,

'History: Nazi Germany': `How did Hitler consolidate power 1933-34?
Reichstag Fire (Feb 1933): used to justify Decree for Protection of People and State → suspended civil liberties.
Enabling Act (March 1933): allowed Hitler to govern by decree for 4 years — passed by intimidation of Reichstag.
Night of Long Knives (June 1934): eliminated SA leadership and other rivals.
Death of Hindenburg (Aug 1934): Hitler combined Chancellor and President → Führer; army swore personal oath to Hitler.`,

'History: Cold War Crises': `Compare the Berlin Crisis 1948 and Cuban Missile Crisis 1962.
Berlin 1948: USSR blockaded West Berlin; USA/UK airlifted supplies; Stalin backed down after 318 days.
Cuba 1962: USSR placed nuclear missiles in Cuba; Kennedy blockaded Cuba; 13 days of tension; Khrushchev removed missiles in exchange for US pledge not to invade Cuba (and secretly, removal of US missiles from Turkey).
Similarity: both brought world close to direct conflict; both resolved through negotiation and compromise.
Difference: Cuba was far more dangerous — nuclear weapons directly threatened US homeland.`,

'Geography: Urbanisation': `Describe problems caused by rapid urbanisation in a developing city (e.g. Mumbai).
Housing: demand exceeds supply → sprawling shanty towns (Dharavi); inadequate sanitation, disease risk.
Infrastructure: overwhelmed transport, water supply, sewage systems.
Employment: informal sector dominant; low wages; exploitation.
Environment: air pollution from traffic and industry; deforestation for building; flooding as natural drainage removed.
Social: crime, inequality, strain on healthcare and education.
Responses: self-help schemes (residents improve own housing with government support), new planned towns.`,

'Geography: Economic Development': `Explain why some countries remain economically underdeveloped.
Colonial legacy: raw materials exported at low prices; manufactured goods imported; dependency created.
Debt: loans taken in 1970s → high interest; debt repayment diverts funds from development.
Trade: world commodity prices volatile; TNCs dominate; trade rules favour MEDCs.
Internal: corruption diverts aid; political instability deters investment; environmental challenges (drought, disease).
Example: Sub-Saharan Africa — historically disadvantaged by colonialism, commodity dependence, and disease burden.`,

'Computer Science: Programming': `Write pseudocode for a linear search of array for target value 42.
array ← [10, 55, 42, 8, 71, 42, 3]
found ← FALSE
FOR i ← 0 TO 6 DO
    IF array[i] = 42 THEN
        OUTPUT "Found at index " + i
        found ← TRUE
    ENDIF
ENDFOR
IF found = FALSE THEN OUTPUT "Not found"
Linear search: O(n) — checks each element; works on unsorted data.`,

'Computer Science: Security': `Explain how a SQL injection attack works and how to prevent it.
Attack: Website form takes username input. Attacker enters: ' OR '1'='1
The SQL query becomes: SELECT * FROM users WHERE name='' OR '1'='1'
Since '1'='1' is always true, ALL user records are returned — database compromised.
Prevention: parameterised queries (prepared statements) — user input never interpreted as SQL code.
Also: input validation, least-privilege database accounts, web application firewalls.`,

'Economics: Elasticity': `The price of coffee rises 10%. Quantity demanded falls 6%. Calculate PED.
PED = % change in quantity demanded / % change in price = −6/+10 = −0.6
|PED| = 0.6 < 1 → price inelastic (demand not very responsive to price)
Revenue effect: price up, inelastic demand → total revenue INCREASES (TR = P × Q; P rises more than Q falls)
Inelastic goods: necessities, no close substitutes, habit-forming products.`,

'Business Studies: Marketing Mix': `A new smartphone is launched at £1,200. Analyse the marketing mix.
Product: premium specifications — 108MP camera, 5G, 256GB storage.
Price: premium pricing strategy — signals quality; targets affluent segment.
Place: sold through own website + premium retailers (Apple Store equivalent) — limited distribution maintains exclusivity.
Promotion: social media influencers + launch event (Apple-style) — creates buzz.
Evaluation: High price limits market size; premium branding must be consistent across all 4 Ps.`,

'Sociology: Education': `How does cultural capital (Bourdieu) explain class inequality in education?
Cultural capital: knowledge, attitudes, behaviours valued by the education system (e.g. knowing how to speak to teachers, knowing importance of qualifications).
Middle-class children arrive at school already possessing cultural capital from their home environment → perform better.
Working-class children lack this capital → disadvantaged → self-fulfilling prophecy of low achievement.
Habitus: unconscious dispositions toward educational success, shaped by upbringing.
Criticism: ignores school factors (teacher labelling, setting/streaming), material deprivation.`,

'Psychology: Memory': `Evaluate the Multi-Store Model of Memory (Atkinson & Shiffrin, 1968).
Key features: sensory register → STM (limited capacity/duration) → LTM (unlimited).
Transfer: rehearsal moves information from STM to LTM.
Supporting evidence: Serial position effect — primacy (LTM) and recency (STM) effects.
KF case study: after brain damage, STM impaired but LTM intact — supports separate stores.
Limitation: MSM is too simplistic — LTM is not one store (episodic, semantic, procedural — Tulving).
Also: rehearsal alone does not guarantee LTM encoding (elaborative encoding more effective).`,

'Psychology: Social Influence': `Milgram's study: why did 65% of participants deliver maximum shocks?
Agentic state: participants felt they were agents of the experimenter, not responsible for actions.
Legitimate authority: Yale University, man in white coat — perceived as having authority.
Incremental commitment: small steps (15V increases) made it hard to stop.
Situational factors: proximity (more compliance when learner not seen), uniform, location.
Ethical issues: deception (participants believed shocks were real); psychological harm — many showed signs of distress.`,

'French: Grammar': `Explain the difference between être and avoir in the passé composé.
Avoir (I had/was having — general auxiliary for most verbs): J'ai mangé (I ate), Tu as vu (You saw).
Être (used with DR MRS VANDERTRAMP + reflexive verbs): Je suis allé(e), Il est venu, Nous sommes partis.
Agreement with être: past participle agrees with subject in gender/number.
Elle est allée (feminine). Ils sont allés (masculine plural).
Key verbs with être: aller, venir, partir, arriver, naître, mourir, rester, retourner, tomber, entrer, sortir, monter, descendre.`,

'Biology: Biotechnology': `Describe how polymerase chain reaction (PCR) amplifies DNA.
Step 1 — Denaturation (94°C): DNA double helix separates into 2 strands.
Step 2 — Annealing (55°C): Primers bind to complementary sequences on each strand.
Step 3 — Extension (72°C): DNA polymerase (Taq) synthesises new complementary strand.
Cycle repeats ~30 times → 2³⁰ = ~1 billion copies from one molecule.
Use: forensic analysis from tiny DNA sample, genetic testing, diagnosing infections.`,

'Statistics: Data Representation': `A dataset: 4, 7, 2, 9, 4, 6, 5, 4, 8, 1. Find the mode, median, mean and IQR.
Mode = 4 (appears 3 times)
Sorted: 1, 2, 4, 4, 4, 5, 6, 7, 8, 9
Median = (4+5)/2 = 4.5 (average of 5th and 6th values)
Mean = 50/10 = 5
Q1 = 4, Q3 = 7 → IQR = Q3 − Q1 = 3`,

'Music: Composition': `Analyse a four-bar chord progression in A minor: Am - F - C - G
Chord I (Am): tonic — home key; minor, melancholy mood.
Chord VI (F major): unexpected major chord — brightens the colour (borrowed chord feeling).
Chord III (C major): submediant of relative major — transition.
Chord VII (G major): subtonic — unresolved tension, wants to return to Am.
This "i - VI - III - VII" pattern is extremely common in pop/rock (Pachelbel's Canon derivative).`,

'Drama: Practitioner Techniques': `Apply Stanislavski's techniques to playing Blanche DuBois (A Streetcar Named Desire).
Given circumstances: fallen Southern belle, lost family home, depends on Stella.
Objective (scene): "I want to appear refined and respectable."
Super-objective: "I want to protect myself from reality."
Emotional memory: recall a time of personal humiliation to access Blanche's vulnerability.
Physical action: delicate gestures, touches clothing nervously, avoids direct light (faded beauty).
Magic "if": "What would I do IF I were hiding a shameful secret from my host?"`,
};
