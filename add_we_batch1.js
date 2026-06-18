// Batch 1: Physics, Chemistry, Biology worked examples
const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const examples = {
  'Speed, Velocity & Acceleration': `A car accelerates from 10 m/s to 30 m/s in 5 s.
a = (v−u)/t = (30−10)/5 = 4 m/s²
Distance = ut + ½at² = 10×5 + ½×4×25 = 50+50 = 100 m`,

  'States of Matter & Kinetic Theory': `Explain why a gas fills its container but a liquid does not.
Gas: particles far apart, move randomly at high speed, no fixed volume → fills any container.
Liquid: particles close but can slide past each other → fixed volume, takes shape of container.
Kinetic energy increases with temperature → heating a liquid eventually causes evaporation.`,

  'Electric Circuits': `A 12 V battery drives current through two resistors in series: 4 Ω and 8 Ω.
Total R = 4+8 = 12 Ω
I = V/R = 12/12 = 1 A (same throughout series circuit)
V across 4 Ω = 1×4 = 4 V; V across 8 Ω = 1×8 = 8 V  Check: 4+8 = 12 V ✓`,

  'Atomic Structure & Radiation': `Carbon-14 has atomic number 6 and mass number 14.
Protons = 6, Neutrons = 14−6 = 8, Electrons = 6
It undergoes β⁻ decay: a neutron → proton + electron (beta particle)
New element: atomic number 7 (Nitrogen), mass number still 14.`,

  'Energy': `A 2 kg ball is dropped from 5 m height. Find speed just before impact.
GPE lost = mgh = 2×10×5 = 100 J
KE gained = ½mv² = 100 J
v² = 200/2 = 100 → v = 10 m/s`,

  'Waves': `A wave has frequency 500 Hz and wavelength 0.68 m. Find wave speed.
v = fλ = 500 × 0.68 = 340 m/s (speed of sound in air)
Period T = 1/f = 1/500 = 0.002 s`,

  'Circuits & Electrical Energy': `A 60 W bulb runs for 2 hours on 230 V mains.
Energy = P×t = 60 × (2×3600) = 432 000 J = 432 kJ
Current I = P/V = 60/230 ≈ 0.26 A
Resistance R = V/I = 230/0.26 ≈ 885 Ω`,

  'Motion & Equations': `A ball is thrown upward at 20 m/s. Find max height and time to return.
At max height v = 0: v² = u²−2gh → h = u²/2g = 400/20 = 20 m
Time up: v = u−gt → t = 20/10 = 2 s; total time = 4 s`,

  'Thermal Energy': `100 g of water is heated from 20°C to 80°C. Find energy needed. (c = 4200 J/kg°C)
Q = mcΔT = 0.1 × 4200 × 60 = 25 200 J = 25.2 kJ`,

  'States of Matter & Changes': `Ice at −10°C is heated until it becomes steam.
Stage 1: −10→0°C — temperature rises (heating solid)
Stage 2: at 0°C — temperature flat (melting, latent heat of fusion)
Stage 3: 0→100°C — temperature rises (heating liquid)
Stage 4: at 100°C — temperature flat (boiling, latent heat of vaporisation)`,

  'Atomic Structure': `An atom has 17 protons, 18 neutrons, 17 electrons.
Element: Chlorine (Cl), Atomic number = 17, Mass number = 17+18 = 35
It is neutral (protons = electrons).
Ion Cl⁻ has gained 1 electron → 18 electrons, charge = −1`,

  'Moles & Calculations': `Find the mass of 0.5 mol of CaCO₃ (Mr = 100).
Mass = mol × Mr = 0.5 × 100 = 50 g
Moles in 10 g NaOH (Mr=40): n = 10/40 = 0.25 mol
Concentration of 0.25 mol in 500 cm³: C = 0.25/0.5 = 0.5 mol/dm³`,

  'Acids & Bases': `50 cm³ of 0.1 mol/dm³ HCl is neutralised by NaOH (0.1 mol/dm³). Find volume needed.
Moles HCl = 0.1 × 0.05 = 0.005 mol
HCl + NaOH → NaCl + H₂O  (1:1 ratio)
Moles NaOH needed = 0.005 mol
Volume = 0.005/0.1 = 0.05 dm³ = 50 cm³`,

  'Energy Changes in Reactions': `Combustion of methane: CH₄ + 2O₂ → CO₂ + 2H₂O  ΔH = −890 kJ/mol
Exothermic (ΔH negative) — products have lower energy than reactants.
Bond breaking (endothermic): C−H bonds (×4) + O=O bonds (×2)
Bond forming (exothermic): C=O bonds (×2) + O−H bonds (×4)
Energy released > Energy absorbed → exothermic overall`,

  'Hydrocarbons': `Propane C₃H₈ is an alkane. Write the combustion equation.
C₃H₈ + 5O₂ → 3CO₂ + 4H₂O (complete combustion)
Propene C₃H₆ is an alkene — has C=C double bond.
Addition of Br₂: C₃H₆ + Br₂ → C₃H₆Br₂ (bromine water decolourises → positive test for alkene)`,

  'Electrolysis': `Electrolysis of dilute H₂SO₄:
Cathode (−): 2H⁺ + 2e⁻ → H₂ (reduction)
Anode (+): 2H₂O → O₂ + 4H⁺ + 4e⁻ (oxidation)
Ratio H₂:O₂ = 2:1 by volume ✓ (matches splitting water)`,

  'Haber Process & Fertilisers': `N₂ + 3H₂ ⇌ 2NH₃  ΔH = −92 kJ/mol
Conditions: 450°C, 200 atm, iron catalyst
Higher pressure → more NH₃ (fewer moles on right) but costly
Lower temperature → higher yield but slower rate → compromise at 450°C`,

  'Identifying Ions & Gases': `Unknown solution gives white ppt with NaOH that dissolves in excess → Al³⁺
Add dilute HCl to ppt: if ppt dissolves → carbonate or sulfite
Flame test: brick-red → Ca²⁺; yellow → Na⁺; lilac → K⁺; blue-green → Cu²⁺
Gas test: pops with lit splint → H₂; relights glowing splint → O₂`,

  'Atomic Structure & The Periodic Table': `Element X has configuration 2,8,6. Identify and predict properties.
Total electrons = 16 → Atomic number 16 → Sulfur (S)
Group 6 (6 outer electrons) → forms S²⁻ ion; 3rd period
Properties: non-metal, forms acidic oxides, valency 2 or 6`,

  'Acids, Bases & Salts': `Prepare copper sulfate from CuO and dilute H₂SO₄:
CuO + H₂SO₄ → CuSO₄ + H₂O
Method: add excess CuO to warm acid (ensures all acid reacts), filter off excess CuO, evaporate filtrate to crystallise CuSO₄·5H₂O`,

  'Energy Changes': `Using bond energies to find ΔH for H₂ + Cl₂ → 2HCl:
Bonds broken: H−H (436) + Cl−Cl (243) = +679 kJ
Bonds formed: 2×H−Cl (2×432) = −864 kJ
ΔH = 679−864 = −185 kJ/mol (exothermic)`,

  'Carbon Compounds': `Ethanol (C₂H₅OH) is an alcohol.
Oxidation: C₂H₅OH → CH₃COOH (ethanoic acid) using acidified K₂Cr₂O₇
Fermentation: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ (yeast, 25–37°C, anaerobic)
Esterification: ethanol + ethanoic acid → ethyl ethanoate + H₂O`,

  'Rates & Energy Changes': `Maxwell-Boltzmann: at higher temperature, more molecules have energy ≥ Ea.
Effect of catalyst: provides alternative pathway with lower activation energy.
Rate experiment: marble chips + HCl — measure CO₂ volume vs time.
At higher concentration of HCl: steeper initial gradient, same total CO₂.`,

  'The Earth & Its Resources': `The Haber process uses N₂ from fractional distillation of liquid air.
H₂ is from steam reforming: CH₄ + H₂O → CO + 3H₂ (then CO+H₂O→CO₂+H₂)
Limestone cycle: CaCO₃ → CaO + CO₂ (thermal decomposition, 840°C)
CaO + H₂O → Ca(OH)₂ (slaked lime, used to neutralise acid soils)`,

  'Oxford AQA Chemistry Exam Technique': `For a 6-mark extended answer on electrolysis:
1. State what electrolysis is (ionic compound, molten/dissolved, uses electrical energy)
2. Name cathode/anode and their charges
3. Write half-equations for each electrode
4. State the product and explain discharge of ions
5. Include observation (e.g. gas bubbles, colour change)
6. Link to industrial application if asked`,

  'Movement In & Out of Cells': `Red blood cells placed in distilled water:
Water potential of water > water potential of cell
Osmosis: water enters cell down concentration gradient
Result: cell swells and bursts (lysis)
In concentrated salt solution: water leaves → cell shrinks (crenation)`,

  'Biological Molecules': `Test for starch: add iodine solution → blue-black = positive
Test for glucose: add Benedict's solution, heat → brick-red ppt = positive
Test for protein: add Biuret reagent → purple = positive
Test for fat: add ethanol then water → milky emulsion = positive`,

  'Photosynthesis': `Limiting factor experiment: plant in low light with high CO₂
6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂
Rate measured by O₂ bubbles per minute
At low light: increasing light → more photosynthesis (light is limiting factor)
At high light: CO₂ or temperature may become limiting`,

  'Nutrition & Digestion': `Protein digestion pathway:
Mouth: salivary amylase (starch only, no protein digestion)
Stomach: pepsin (endopeptidase) + HCl → breaks protein → polypeptides
Small intestine: trypsin (pancreas) + peptidases → amino acids
Absorbed into blood via villi (large surface area, thin walls, capillaries)`,

  'Respiration': `Aerobic: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP
Anaerobic (animals): C₆H₁₂O₆ → lactic acid + 2 ATP
Anaerobic (yeast): C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + 2 ATP
RQ = CO₂ produced / O₂ consumed = 1 (carbohydrate), 0.7 (fat)`,

  'DNA & Inheritance': `Cystic fibrosis is autosomal recessive (f).
Parents: Ff × Ff (both carriers)
Offspring ratio: FF : Ff : Ff : ff = 1:2:1
Probability of affected child (ff) = 1/4 = 25%
Probability of carrier = 2/4 = 50%`,

  'Sexual & Asexual Reproduction': `Mitosis: DNA replicates → 2 identical daughter cells (diploid)
Used for: growth, repair, asexual reproduction
Meiosis: 2 divisions → 4 genetically different cells (haploid)
Used for: gamete production
Crossing over and independent assortment → genetic variation`,

  'Human Reproductive System': `FSH (from pituitary) → stimulates follicle development, oestrogen production
Oestrogen → repairs uterine lining, inhibits FSH, stimulates LH surge
LH surge → triggers ovulation (day 14)
Progesterone (from corpus luteum) → maintains lining
If no fertilisation: progesterone falls → menstruation`,

  'Ecosystems & Food Webs': `Grass → Rabbit → Fox
Only ~10% energy transferred between trophic levels
If grass provides 10,000 kJ: rabbits get ~1,000 kJ; foxes get ~100 kJ
This explains why food chains rarely exceed 4–5 links
Pyramid of energy is always a true pyramid (never inverted)`,

  'Pathogens & Disease': `HIV attacks T-helper lymphocytes (CD4 cells)
Transmission: unprotected sex, blood-to-blood, mother to child
Incubation: years before AIDS develops
Treatment: antiretroviral drugs (reduce viral load, not a cure)
Prevention: condoms, needle exchange, testing`,

  'Excretion': `Kidney filtration: blood filtered under pressure at glomerulus → Bowman's capsule
Filtrate contains: glucose, urea, water, salts, amino acids
Selective reabsorption: glucose 100% reabsorbed, water 99% reabsorbed
Urea not reabsorbed → concentrated in urine
ADH increases water reabsorption in collecting duct`,

  'Homeostasis': `On a hot day: body temperature rises above 37°C
Thermoreceptors in hypothalamus detect change
Effectors respond: vasodilation (more blood to skin), sweating (evaporation cools)
Negative feedback: cooling returns temperature to 37°C → responses stop
Antagonistic effectors maintain equilibrium`,

  'Genetic Engineering & Biotechnology': `Insulin production by bacteria:
1. Cut human insulin gene using restriction enzymes
2. Cut plasmid with same restriction enzyme → complementary sticky ends
3. Insert gene into plasmid using DNA ligase
4. Transform plasmid into E. coli bacteria
5. Bacteria reproduce → clone → produce human insulin`,

  'Cell Structure & Microscopy': `Magnification = image size / actual size
Actual size of cell = 2mm / ×200 = 0.01mm = 10μm
Eukaryotic (plant cell): nucleus, mitochondria, chloroplasts, cell wall, vacuole
Prokaryotic (bacteria): no nucleus, circular DNA, 70S ribosomes, no membrane-bound organelles`,
};

let count = 0;
for (const [title, example] of Object.entries(examples)) {
  // Match topic objects ending with ]} that don't already have workedExample
  // Pattern: title:'TITLE', points:[...]}  where } is not preceded by workedExample
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(
    `(\\{ title:'${escaped}', points:\\[[\\s\\S]*?\\])(?=\\s*\\})`,
    'g'
  );
  let replaced = false;
  code = code.replace(regex, (match) => {
    if (match.includes('workedExample')) return match;
    replaced = true;
    count++;
    return match + `, workedExample:\`${example}\``;
  });
}

fs.writeFileSync('app.js', code);
console.log('Added worked examples:', count);
