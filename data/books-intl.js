/* Per-year book shelves for the international curricula — loaded on demand by app.js ensureIntlBooks(). */
// Per-year shelves for the international curricula (generated from verified links: every URL returned 200).
// A grade key here wins over the primary/middle/high stage bucket (see gradeKey in the book library).
(function addIntlShelves(add) {
  for (const [cur, grades] of Object.entries(add)) {
    TEXTBOOK_DB[cur] = TEXTBOOK_DB[cur] || {};
    for (const [g, groups] of Object.entries(grades)) TEXTBOOK_DB[cur][g] = groups;
  }
})({
  american:{
    k:[
      {
        subj:'Math',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Illustrative Mathematics Kindergarten — Course (Unit 1 Family Materials)',
            term:'American Curriculum',
            url:'https://im.kendallhunt.com/k5/families/kindergarten/unit-1/family-materials.html',
          },
          {
            title:'CKMath Unit 8: Putting It All Together',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-8-putting-it-all-together/',
          },
          {
            title:'CKMath Unit 7: Solid Shapes All Around Us',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-7-solid-shapes-all-around-us/',
          },
          {
            title:'CKMath Unit 6: Numbers 0–20',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-6-numbers-0-20/',
          },
          {
            title:'CKMath Unit 5: Composing and Decomposing Numbers to 10',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-5-composing-and-decomposing-numbers-to-10/',
          },
          {
            title:'CKMath Unit 4: Understanding Addition and Subtraction',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-4-understanding-addition-and-subtraction/',
          },
          {
            title:'CKMath Unit 3: Flat Shapes All Around Us',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-3-flat-shapes-all-around-us/',
          },
          {
            title:'CKMath Unit 2: Numbers 1–10',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-2-numbers-1-10/',
          },
          {
            title:'CKMath Unit 1: Math in Our World',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-1-math-in-our-world/',
          },
          {
            title:'CKMath Grade K — Connecting Math to Our World: Math at Play',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-grade-k-connecting-math-to-our-world-math-at-play/',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'CK-12 Kindergarten Science',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-kindergarten-science/',
          },
          {
            title:'OpenSciEd K.1 Energy from Sunlight',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/k-1-energy-sunlight/',
          },
          {
            title:'OpenSciEd K.2 Weather',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/k-2-weather/',
          },
          {
            title:'OpenSciEd K.3 Forces & Motion',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/k-3-forces-motion/',
          },
          {
            title:'OpenSciEd K.4 Plants & Animals',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/k-4-ecosystems-plants-animals/',
          },
          {
            title:'CKSci Unit 7: Science All Around Us',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-7-science-all-around-us/',
          },
          {
            title:'CKSci Unit 6: Computers All Around Us',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-6-computers-all-around-us/',
          },
          {
            title:'CKSci Unit 5: Our Five Senses',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-5-health-and-the-human-body-our-five-senses/',
          },
          {
            title:'CKSci Unit 4: Weather Patterns',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-4-weather-patterns/',
          },
          {
            title:'CKSci Unit 3: Changing Environments',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-3-changing-environments/',
          },
          {
            title:'CKSci Unit 2: Needs of Plants and Animals',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-2-needs-of-plants-and-animals/',
          },
          {
            title:'CKSci Unit 1: Pushes and Pulls',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-1-pushes-and-pulls/',
          },
          {
            title:'CKSci Grade K — Science in Action: Kyle and Jamie',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-grade-k-science-in-action-kyle-and-jamie/',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CKHG Unit 4: The Mount Rushmore Presidents',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-4-the-mount-rushmore-presidents/',
          },
          {
            title:'CKHG Unit 3: Exploring and Moving to America',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-3-exploring-and-moving-to-america/',
          },
          {
            title:'CKHG Unit 2: Native Americans',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-2-native-americans/',
          },
          {
            title:'CKHG Unit 1: Let\'s Explore Our World!',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-1-lets-explore-our-world/',
          },
        ],
      },
      {
        subj:'ELA',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CKLA Ancillary Materials: Kindergarten Skills',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-ancillary-materials-kindergarten-skills/',
          },
          {
            title:'CKLA Domain 1: Nursery Rhymes and Fables',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-01-nursery-rhymes-fables/',
          },
          {
            title:'CKLA Domain 10: Colonial Towns and Townspeople',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-10-colonial-towns-townspeople/',
          },
          {
            title:'CKLA Domain 11: Taking Care of the Earth',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-11-taking-care-earth/',
          },
          {
            title:'CKLA Domain 12: Presidents and American Symbols',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-12-presidents-american-symbols/',
          },
          {
            title:'CKLA Domain 2: The Human Body—Five Senses',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-02-human-body-five-senses/',
          },
          {
            title:'CKLA Domain 3: Stories',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-03-stories/',
          },
          {
            title:'CKLA Domain 4: Plants',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-04-plants-kinder/',
          },
          {
            title:'CKLA Domain 5: Farms',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-05-farms/',
          },
          {
            title:'CKLA Domain 6: Native Americans',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-06-native-americans/',
          },
          {
            title:'CKLA Domain 7: Kings and Queens',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-07-kings-queens/',
          },
          {
            title:'CKLA Domain 8: Seasons and Weather',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-08-seasons-weather/',
          },
          {
            title:'CKLA Domain 9: Columbus and the Pilgrims',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-09-columbus-pilgrims/',
          },
          {
            title:'CKLA Unit 1: Kindergarten Skills',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-01-kindergarten-skills/',
          },
          {
            title:'CKLA Unit 10: Kindergarten Skills—Scott',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-10-kindergarten-skills/',
          },
          {
            title:'CKLA Unit 2: Kindergarten Skills',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-02-kindergarten-skills/',
          },
          {
            title:'CKLA Unit 3: Kindergarten Skills',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-03-kindergarten-skills/',
          },
          {
            title:'CKLA Unit 4: Kindergarten Skills—Pet Fun',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-04-kindergarten-skills/',
          },
          {
            title:'CKLA Unit 5: Kindergarten Skills—Ox and Man',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-05-kindergarten-skills/',
          },
          {
            title:'CKLA Unit 6: Kindergarten Skills—Kit',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-06-kindergarten-skills/',
          },
          {
            title:'CKLA Unit 7: Kindergarten Skills—Seth',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-07-kindergarten-skills/',
          },
          {
            title:'CKLA Unit 8: Kindergarten Skills—Sam',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-08-kindergarten-skills/',
          },
          {
            title:'CKLA Unit 9: Kindergarten Skills—Zack and Ann',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-09-kindergarten-skills/',
          },
        ],
      },
    ],
    g1:[
      {
        subj:'Math',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Illustrative Mathematics Grade 1 — Course (Unit 1 Family Materials)',
            term:'American Curriculum',
            url:'https://im.kendallhunt.com/k5/families/grade-1/unit-1/family-materials.html',
          },
          {
            title:'CK-12 First Grade Math Resource FlexLet',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-first-grade-math-resource-flexlet/',
          },
          {
            title:'CKMath Unit 8: Grade 1 – Putting It All Together',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-8-grade-1-putting-it-all-together/',
          },
          {
            title:'CKMath Unit 7: Geometry and Time',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-7-geometry-and-time/',
          },
          {
            title:'CKMath Unit 6: Length Measurements Within 120 Units',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-6-length-measurements-within-120-units/',
          },
          {
            title:'CKMath Unit 5: Adding Within 100',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-5-adding-within-100/',
          },
          {
            title:'CKMath Unit 4: Numbers to 99',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-4-numbers-to-99/',
          },
          {
            title:'CKMath Unit 3: Adding and Subtracting Within 20',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-3-adding-and-subtracting-within-20/',
          },
          {
            title:'CKMath Unit 2: Addition and Subtraction Story Problems',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-2-addition-and-subtraction-story-problems/',
          },
          {
            title:'CKMath Unit 1: Adding, Subtracting, and Working with Data',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-1-adding-subtracting-and-working-with-data/',
          },
          {
            title:'CKMath Grade 1 – Connecting Math to Our World: Math All Around Us',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-grade-1-connecting-math-to-our-world-math-all-around-us/',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'CK-12 First Grade Science',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-first-grade-science/',
          },
          {
            title:'OpenSciEd 1.1 Light Waves',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/1-1-waves-light/',
          },
          {
            title:'OpenSciEd 1.2 Sound Waves',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/1-2-waves-sound/',
          },
          {
            title:'OpenSciEd 1.3 Sky Patterns',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/1-3-space-sky-patterns/',
          },
          {
            title:'OpenSciEd 1.4 Plant & Animal Traits',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/1-4-animal-plant-traits/',
          },
          {
            title:'CKSci Unit 7: Science for Everyone',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-7-science-for-everyone/',
          },
          {
            title:'CKSci Unit 6: Helpful Computers',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-6-helpful-computers/',
          },
          {
            title:'CKSci Unit 5: Human Body Systems',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-5-health-and-the-human-body-human-body-systems/',
          },
          {
            title:'CKSci Unit 4: Simple Machines',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-4-simple-machines/',
          },
          {
            title:'CKSci Unit 3: Exploring Light and Sound',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-3-exploring-light-and-sound/',
          },
          {
            title:'CKSci Unit 2: Plant and Animal Survival',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-2-plant-and-animal-survival/',
          },
          {
            title:'CKSci Unit 1: Sun, Moon, and Stars',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-1-sun-moon-and-stars/',
          },
          {
            title:'CKSci Grade 1 – Science in Action: Daniela and Thaís',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-grade-1-science-in-action-daniela-and-thais/',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CKHG Unit 10: Lessons in Civics',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-10-lessons-in-civics/',
          },
          {
            title:'CKHG Unit 9: Exploring the West',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-9-exploring-the-west/',
          },
          {
            title:'CKHG Unit 8: From Colonies to Independence',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-8-from-colonies-to-independence/',
          },
          {
            title:'CKHG Unit 7: Early Explorers and Settlers',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-7-early-explorers-and-settlers/',
          },
          {
            title:'CKHG Unit 6: The Culture of Mexico',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-6-culture-of-mexico/',
          },
          {
            title:'CKHG Unit 5: Early Civilizations of the Americas',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-5-early-civilizations-of-the-americas/',
          },
          {
            title:'CKHG Unit 4: Three World Religions',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-4-three-world-religions/',
          },
          {
            title:'CKHG Unit 3: Ancient Egypt',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-3-ancient-egypt/',
          },
          {
            title:'CKHG Unit 2: Mesopotamia',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-2-mesopotamia/',
          },
          {
            title:'CKHG Unit 1: Continents, Countries, and Maps',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-1-continents-countries-and-maps/',
          },
        ],
      },
      {
        subj:'ELA',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CKLA Ancillary Materials: First Grade Skills',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-ancillary-materials-grade-1/',
          },
          {
            title:'CKLA Domain 1: Fables and Stories',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-01-fables-stories/',
          },
          {
            title:'CKLA Domain 10: A New Nation—American Independence',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-10-new-nation-american-independence/',
          },
          {
            title:'CKLA Domain 11: Frontier Explorers',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-11-frontier-explorers/',
          },
          {
            title:'CKLA Domain 2: The Human Body',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-02-human-body/',
          },
          {
            title:'CKLA Domain 3: Different Lands, Similar Stories',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-03-different-lands-similar-stories/',
          },
          {
            title:'CKLA Domain 4: Early World Civilizations',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-04-early-world-civilizations/',
          },
          {
            title:'CKLA Domain 5: Early American Civilizations',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-05-early-american-civilizations/',
          },
          {
            title:'CKLA Domain 6: Astronomy',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-06-astronomy/',
          },
          {
            title:'CKLA Domain 7: The History of the Earth',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-07-history-earth/',
          },
          {
            title:'CKLA Domain 8: Animals and Habitats',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-08-animals-habitats/',
          },
          {
            title:'CKLA Domain 9: Fairy Tales',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-09-fairy-tales/',
          },
          {
            title:'CKLA Unit 1: First Grade Skills—Snap Shots',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-1-grade-1-skills/',
          },
          {
            title:'CKLA Unit 2: First Grade Skills—Gran',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-2-grade-1-skills-gran/',
          },
          {
            title:'CKLA Unit 3: First Grade Skills—Fables',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-3-grade-1-skills-fables/',
          },
          {
            title:'CKLA Unit 4: First Grade Skills—The Green Fern Zoo',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-4-grade-1-skills-green-fern-zoo/',
          },
          {
            title:'CKLA Unit 5: First Grade Skills—Kate\'s Book',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-5-grade-1-skills-kates-book/',
          },
          {
            title:'CKLA Unit 6: First Grade Skills—Grace',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-6-grade-1-skills-grace/',
          },
          {
            title:'CKLA Unit 7: First Grade Skills—Kay and Martez',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-7-grade-1-skills-kay-martez/',
          },
        ],
      },
    ],
    g2:[
      {
        subj:'Math',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Illustrative Mathematics Grade 2 — Course (Unit 1 Family Materials)',
            term:'American Curriculum',
            url:'https://im.kendallhunt.com/k5/families/grade-2/unit-1/family-materials.html',
          },
          {
            title:'CK-12 Second Grade Math Resource FlexLet',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-second-grade-math-resource-flexlet/',
          },
          {
            title:'CKMath Unit 9: Grade 2 – Putting It All Together',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-9-grade-2-putting-it-all-together/',
          },
          {
            title:'CKMath Unit 8: Equal Groups',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-8-equal-groups/',
          },
          {
            title:'CKMath Unit 7: Adding and Subtracting within 1,000',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-7-adding-and-subtracting-within-1000/',
          },
          {
            title:'CKMath Unit 6: Geometry, Time, and Money',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-6-geometry-time-and-money/',
          },
          {
            title:'CKMath Unit 5: Numbers to 1000',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-5-numbers-to-1000/',
          },
          {
            title:'CKMath Unit 4: Addition and Subtraction on the Number Line',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-4-addition-and-subtraction-on-the-number-line/',
          },
          {
            title:'CKMath Unit 3: Measuring Length',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-3-measuring-length/',
          },
          {
            title:'CKMath Unit 2: Adding and Subtracting Within 100',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-2-adding-and-subtracting-within-100/',
          },
          {
            title:'CKMath Unit 1: Adding, Subtracting, and Working with Data',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-1-grade-2-adding-subtracting-and-working-with-data/',
          },
          {
            title:'CKMath Grade 2 – Connecting Math to Our World: Using Math Every Day',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-grade-2-connecting-math-to-our-world-using-math-every-day/',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'CK-12 Second Grade Science',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-second-grade-science/',
          },
          {
            title:'OpenSciEd 2.1 Earth & Land Change',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/2-1-earth-land-change/',
          },
          {
            title:'OpenSciEd 2.2 Matter',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/2-2-matter/',
          },
          {
            title:'OpenSciEd 2.3 Habitats',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/2-3-habitats/',
          },
          {
            title:'OpenSciEd 2.4 Puzzling Plants',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/2-4-puzzling-plants/',
          },
          {
            title:'CKSci Unit 7: Learning About Science',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-7-learning-about-science/',
          },
          {
            title:'CKSci Unit 6: Using Computers',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-6-using-computers/',
          },
          {
            title:'CKSci Unit 5: Human Cells and Digestion',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-5-human-cells-and-digestion/',
          },
          {
            title:'CKSci Unit 4: Electricity and Magnetism',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-4-electricity-and-magnetism/',
          },
          {
            title:'CKSci Unit 3: Exploring Land and Water',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-3-exploring-land-and-water/',
          },
          {
            title:'CKSci Unit 2: Organisms and Their Habitats',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-2-organisms-and-their-habitats/',
          },
          {
            title:'CKSci Unit 1: Properties of Matter',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-1-properties-of-matter/',
          },
          {
            title:'CKSci Grade 2 – Science in Action: Laura and Sandra',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-grade-2-science-in-action-laura-and-sandra/',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CKHG Unit 12: Lessons in Economics',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-12-lessons-in-economics/',
          },
          {
            title:'CKHG Unit 11: Civil Rights Leaders',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-11-civil-rights-leaders/',
          },
          {
            title:'CKHG Unit 10: Immigration and Citizenship',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-10-immigration-and-citizenship/',
          },
          {
            title:'CKHG Unit 9: The Civil War',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-09-the-civil-war/',
          },
          {
            title:'CKHG Unit 8: Americans Move West',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-08-americans-move-west/',
          },
          {
            title:'CKHG Unit 7: The War of 1812',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-07-the-war-of-1812/',
          },
          {
            title:'CKHG Unit 6: Making the Constitution',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-06-making-the_constitution/',
          },
          {
            title:'CKHG Unit 5: Geography of the Americas',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-05-geography-of-americas/',
          },
          {
            title:'CKHG Unit 4: Ancient Greece',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-04-ancient-greece/',
          },
          {
            title:'CKHG Unit 3: The Culture of Japan',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-03-the-culture-of-japan/',
          },
          {
            title:'CKHG Unit 2: Ancient China',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-02-ancient-china/',
          },
          {
            title:'CKHG Unit 1: Ancient India',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-01-ancient-india/',
          },
        ],
      },
      {
        subj:'ELA',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CKLA Ancillary Materials: Second Grade Skills',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ancillary-materials-second-grade-skills/',
          },
          {
            title:'CKLA Domain 1: Fairy Tales and Tall Tales',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-01-fairy-tales-tall-tales/',
          },
          {
            title:'CKLA Domain 10: The Human Body—Building Blocks and Nutrition',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-10-human-body-building-blocks-nutrition/',
          },
          {
            title:'CKLA Domain 11: Immigration',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-11-immigration/',
          },
          {
            title:'CKLA Domain 12: Fighting for a Cause',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-12-fighting-cause/',
          },
          {
            title:'CKLA Domain 2: Early Asian Civilizations',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-02-early-asian-civilizations/',
          },
          {
            title:'CKLA Domain 3: The Ancient Greek Civilization',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-03-ancient-greek-civilization/',
          },
          {
            title:'CKLA Domain 4: Greek Myths',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-04-greek-myths/',
          },
          {
            title:'CKLA Domain 5: The War of 1812',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-05-war-1812/',
          },
          {
            title:'CKLA Domain 6: Cycles in Nature',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-06-cycles-nature/',
          },
          {
            title:'CKLA Domain 7: Westward Expansion',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-07-westward-expansion/',
          },
          {
            title:'CKLA Domain 8: Insects',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-08-insects/',
          },
          {
            title:'CKLA Domain 9: The U.S. Civil War',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-09-us-civil-war/',
          },
          {
            title:'CKLA Unit 1: Second Grade Skills—The Cat Bandit',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-1-second-grade-skills-cat-bandit/',
          },
          {
            title:'CKLA Unit 2: Second Grade Skills—Bedtime Tales',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-2-second-grade-skills-bedtime-tales/',
          },
          {
            title:'CKLA Unit 3: Second Grade Skills—Kids Excel',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-3-second-grade-skills-kids-excel/',
          },
          {
            title:'CKLA Unit 4: Second Grade Skills—The Job Hunt',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-4-second-grade-skills-job-hunt/',
          },
          {
            title:'CKLA Unit 5: Second Grade Skills—Sir Gus',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-5-second-grade-skills-sir-gus/',
          },
          {
            title:'CKLA Unit 6: Second Grade Skills—The War of 1812',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-6-second-grade-skills-war-1812/',
          },
        ],
      },
    ],
    g3:[
      {
        subj:'Math',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Illustrative Mathematics Grade 3 — Course (Unit 1 Family Materials)',
            term:'American Curriculum',
            url:'https://im.kendallhunt.com/k5/families/grade-3/unit-1/family-materials.html',
          },
          {
            title:'CK-12 Third Grade Math Resource FlexLet',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-third-grade-math-resource-flexlet/',
          },
          {
            title:'CKMath Unit 8: Grade 3 – Putting It All Together',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-8-grade-3-putting-it-all-together/',
          },
          {
            title:'CKMath Unit 7: Two-dimensional Shapes and Perimeter',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-7-two-dimensional-shapes-and-perimeter/',
          },
          {
            title:'CKMath Unit 6: Measuring Length, Time, Liquid Volume, and Weight',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-6-measuring-length-time-liquid-volume-and-weight/',
          },
          {
            title:'CKMath Unit 5: Fractions as Numbers',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-5-fractions-as-numbers/',
          },
          {
            title:'CKMath Unit 4: Relating Multiplication to Division',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-4-relating-multiplication-to-division/',
          },
          {
            title:'CKMath Unit 3: Wrapping Up Addition and Subtraction Within 1,000',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-3-wrapping-up-addition-and-subtraction-within-1000/',
          },
          {
            title:'CKMath Unit 2: Area and Multiplication',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-2-area-and-multiplication/',
          },
          {
            title:'CKMath Unit 1: Introducing Multiplication',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-1-introducing-multiplication/',
          },
          {
            title:'CKMath Grade 3 – Connecting Math to Our World: How Math Helps Us',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-grade-3-connecting-math-to-our-world-how-math-helps-us/',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'CK-12 Third Grade Science',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-third-grade-science/',
          },
          {
            title:'OpenSciEd 3.1 Forces & Interactions',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/3-1-forces-interactions/',
          },
          {
            title:'OpenSciEd 3.2 Weather Hazards',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/3-2-weather-hazards/',
          },
          {
            title:'OpenSciEd 3.3 Trait Variations',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/3-3-trait-variations/',
          },
          {
            title:'OpenSciEd 3.4 Ecosystem Change & Survival',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/3-4-ecosystem-change-survival/',
          },
          {
            title:'CKSci Unit 7: Reading About Science',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-7-reading-about-science/',
          },
          {
            title:'CKSci Unit 6: Codes and Computers',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-6-codes-and-computers/',
          },
          {
            title:'CKSci Unit 5: Human Senses and Movement',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-5-human-senses-and-movement/',
          },
          {
            title:'CKSci Unit 4: Weather and Climate',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-4-weather-and-climate/',
          },
          {
            title:'CKSci Unit 3: Habitats and Change',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-3-habitats-and-change/',
          },
          {
            title:'CKSci Unit 2: Life Cycles, Traits, and Variations',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-2-life-cycles-traits-and-variations/',
          },
          {
            title:'CKSci Unit 1: Investigating Forces',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-1-forces/',
          },
          {
            title:'CKSci Grade 3 – Science in Action: Christian and Skylar',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-grade-3-science-in-action-christian-and-skylar/',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CKHG Grade 3: Primary Source Activity Book',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-grade-3-primary-source-activity-book/',
          },
          {
            title:'CKHG Unit 1: World Rivers',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-1-world-rivers/',
          },
          {
            title:'CKHG Unit 2: Ancient Rome',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-2-ancient-rome/',
          },
          {
            title:'CKHG Unit 3: The Vikings',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-3-vikings/',
          },
          {
            title:'CKHG Unit 4: The Earliest Americans',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-4-earliest-americans/',
          },
          {
            title:'CKHG Unit 5: Canada',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-5-canada/',
          },
          {
            title:'CKHG Unit 6: Exploration of North America',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-6-exploration-north-america/',
          },
          {
            title:'CKHG Unit 7: The Thirteen Colonies',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-7-thirteen-colonies/',
          },
        ],
      },
      {
        subj:'ELA',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CKLA Ancillary Materials: Third Grade Skills',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ancillary-materials-third-grade-skills/',
          },
          {
            title:'CKLA Domain 1: Classic Tales—The Wind in the Willows',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-01-classic-tales-the-wind-in-the-willows/',
          },
          {
            title:'CKLA Domain 10: Colonial America',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-10-colonial-america/',
          },
          {
            title:'CKLA Domain 11: Ecology',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-11-ecology/',
          },
          {
            title:'CKLA Domain 2: Classification of Animals',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-02-classification-animals/',
          },
          {
            title:'CKLA Domain 3: The Human Body—Systems and Senses',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-03-human-body-systems-senses/',
          },
          {
            title:'CKLA Domain 4: The Ancient Roman Civilization',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-04-ancient-roman-civilization/',
          },
          {
            title:'CKLA Domain 5: Light and Sound',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-05-light-sound/',
          },
          {
            title:'CKLA Domain 6: The Viking Age',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-06-viking-age/',
          },
          {
            title:'CKLA Domain 7: Astronomy—Our Solar System and Beyond',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-07-astronomy-solar-system-beyond/',
          },
          {
            title:'CKLA Domain 8: Native Americans—Regions and Cultures',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-08-native-americans-regions-cultures/',
          },
          {
            title:'CKLA Domain 9: European Exploration of North America',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-domain-09-european-exploration-north-america/',
          },
          {
            title:'CKLA Unit 1: Third Grade Skills—Classic Tales',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-01-third-grade-skills-classic-tales/',
          },
          {
            title:'CKLA Unit 10: Third Grade Skills—Living in Colonial America',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-10-third-grade-skills-living-colonial-america/',
          },
          {
            title:'CKLA Unit 11: Third Grade Skills—Introduction to Ecology',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-11-third-grade-skills-introduction-ecology/',
          },
          {
            title:'CKLA Unit 2: Third Grade Skills—Rattenborough\'s Guide to Animals',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-02-third-grade-skills-rattenboroughs-guide-animals/',
          },
          {
            title:'CKLA Unit 3: Third Grade Skills—How Does Your Body Work?',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-03-third-grade-skills-body-work/',
          },
          {
            title:'CKLA Unit 4: Third Grade Skills—Stories of Ancient Rome',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-04-third-grade-skills-stories-ancient-rome/',
          },
          {
            title:'CKLA Unit 5: Third Grade Skills—Adventures in Light and Sound',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-05-third-grade-skills-adventures-light-sound/',
          },
          {
            title:'CKLA Unit 6: Third Grade Skills—Gods, Giants, and Dwarves',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-06-third-grade-skills-gods-giants-dwarves/',
          },
          {
            title:'CKLA Unit 9: Third Grade Skills—The Age of Exploration',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-09-third-grade-skills-age-exploration/',
          },
          {
            title:'CKLA Unit 7: Third Grade Skills—What\'s in Our Universe?',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-07-third-grade-skills-whats-universe/',
          },
          {
            title:'CKLA Unit 8: Third Grade Skills—Native American Stories',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-08-third-grade-skills-native-american-stories/',
          },
        ],
      },
    ],
    g4:[
      {
        subj:'Math',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Illustrative Mathematics Grade 4 — Course (Unit 1 Family Materials)',
            term:'American Curriculum',
            url:'https://im.kendallhunt.com/k5/families/grade-4/unit-1/family-materials.html',
          },
          {
            title:'CK-12 Fourth Grade Math Resource FlexLet',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-fourth-grade-math-resource-flexlet/',
          },
          {
            title:'CKMath Unit 9: Grade 4 – Putting It All Together',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-9-grade-4-putting-it-all-together/',
          },
          {
            title:'CKMath Unit 8: Properties of Two-Dimensional Shapes',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-8-properties-of-two-dimensional-shapes/',
          },
          {
            title:'CKMath Unit 7: Angles and Angle Measurement',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-7-angles-and-angle-measurement/',
          },
          {
            title:'CKMath Unit 6: Multiplying and Dividing Multi-digit Numbers',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-6-multiplying-and-dividing-multi-digit-numbers/',
          },
          {
            title:'CKMath Unit 5: Multiplicative Comparison and Measurement',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-5-multiplicative-comparison-and-measurement/',
          },
          {
            title:'CKMath Unit 4: From Hundredths to Hundred-Thousands',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-4-from-hundredths-to-hundred-thousands/',
          },
          {
            title:'CKMath Unit 3: Extending Operations to Fractions',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-3-extending-operations-to-fractions/',
          },
          {
            title:'CKMath Unit 2: Fraction Equivalence and Comparison',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-2-fraction-equivalence-and-comparison/',
          },
          {
            title:'CKMath Unit 1: Factors and Multiples',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-1-factors-and-multiples/',
          },
          {
            title:'CKMath Grade 4 – Connecting Math to Our World: How Math Helps Us',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-grade-4-connecting-math-to-our-world-how-math-helps-us/',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'CK-12 Fourth Grade Science',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-fourth-grade-science/',
          },
          {
            title:'OpenSciEd 4.1 Energy Transfer & Collisions',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/4-1-energy-transfer-collisions/',
          },
          {
            title:'OpenSciEd 4.2 Electricity',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/4-2-electricity/',
          },
          {
            title:'OpenSciEd 4.3 Earth Processes',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/4-3-earth-processes/',
          },
          {
            title:'OpenSciEd 4.4 Structure & Function',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/4-4-structure-function/',
          },
          {
            title:'CKSci Unit 8: Making Sense of Science',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-8-making-sense-of-science/',
          },
          {
            title:'CKSci Unit 7: Problem-Solving and Computers',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-7-problem-solving-and-computers/',
          },
          {
            title:'CKSci Unit 6: Human Respiration and Circulation',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-6-human-respiration-and-circulation/',
          },
          {
            title:'CKSci Unit 5: Using Natural Resources for Energy',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-5-using-natural-resources-for-energy/',
          },
          {
            title:'CKSci Unit 4: Processes That Shape Earth',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-4-processes-that-shape-earth/',
          },
          {
            title:'CKSci Unit 3: Structures and Functions of Living Things',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-3-structures-and-functions/',
          },
          {
            title:'CKSci Unit 2: Investigating Waves',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-2-investigating-waves/',
          },
          {
            title:'CKSci Unit 1: Energy Transfer and Transformation',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-1-energy-transfer-and-transformation/',
          },
          {
            title:'CKSci Grade 4 – Science in Action: Pearl, Dan, & Kendrick',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-grade-4-science-in-action-pearl-dan-kendrick/',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CKHG Unit 11: Understanding Civics',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-11-understanding-civics/',
          },
          {
            title:'CKHG Grade 4: Primary Source Activity Book',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-grade-4-primary-source-activity-book/',
          },
          {
            title:'CKHG Unit 1: Using Maps',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-01-using-maps/',
          },
          {
            title:'CKHG Unit 10: American Reformers',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-10-american-reformers/',
          },
          {
            title:'CKHG Unit 2: World Mountains',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-02-world-mountains/',
          },
          {
            title:'CKHG Unit 3: Medieval Europe',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-03-medieval-europe/',
          },
          {
            title:'CKHG Unit 4: Medieval Islamic Empires',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-04-medieval-islamic-empires/',
          },
          {
            title:'CKHG Unit 5: Early and Medieval African Kingdoms',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-05-early-medieval-african-kingdoms/',
          },
          {
            title:'CKHG Unit 6: Dynasties of China',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-06-dynasties-china/',
          },
          {
            title:'CKHG Unit 7: The American Revolution',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-07-american-revolution/',
          },
          {
            title:'CKHG Unit 8: The United States Constitution',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-08-united-states-constitution/',
          },
          {
            title:'CKHG Unit 9: Early Presidents',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-09-early-presidents/',
          },
        ],
      },
      {
        subj:'ELA',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CKLA Ancillary Materials: Fourth Grade',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-ancillary-materials-fourth-grade/',
          },
          {
            title:'CKLA Unit 1: Brown Girl Dreaming',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-1-brown-girl-dreaming/',
          },
          {
            title:'CKLA Unit 2: The Middle Ages',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-2-middle-ages/',
          },
          {
            title:'CKLA Unit 3: King Arthur and the Round Table',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-3-king-arthur-and-the-round-table/',
          },
          {
            title:'CKLA Unit 4: Listen, My Children (poetry)',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-4-listen-my-children-poetry/',
          },
          {
            title:'CKLA Unit 5: Geology',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-5-geology/',
          },
          {
            title:'CKLA Unit 6: American Revolution',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-6-american-revolution/',
          },
          {
            title:'CKLA Unit 7: The United States Constitution',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-7-united-states-constitution/',
          },
          {
            title:'CKLA Unit 8: Treasure Island',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-8-treasure-island/',
          },
        ],
      },
    ],
    g5:[
      {
        subj:'Math',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Illustrative Mathematics Grade 5 — Course (Unit 1 Family Materials)',
            term:'American Curriculum',
            url:'https://im.kendallhunt.com/k5/families/grade-5/unit-1/family-materials.html',
          },
          {
            title:'CK-12 Fifth Grade Math Resource FlexLet',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-fifth-grade-math-resource-flexlet/',
          },
          {
            title:'CKMath Unit 8: Grade 5 – Putting It All Together',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-8-grade-5-putting-it-all-together/',
          },
          {
            title:'CKMath Unit 7: Shapes on the Coordinate Plane',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-7-shapes-on-the-coordinate-plane/',
          },
          {
            title:'CKMath Unit 6: More Decimal and Fraction Operations',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-6-more-decimal-and-fraction-operations/',
          },
          {
            title:'CKMath Unit 5: Place Value Patterns and Decimal Operations',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-5-place-value-patterns-and-decimal-operations/',
          },
          {
            title:'CKMath Unit 4: Wrapping Up Multiplication and Division with Multi-Digit Numbers',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-4-wrapping-up-multiplication-and-division-with-multi-digit-numbers/',
          },
          {
            title:'CKMath Unit 3: Multiplying and Dividing Fractions',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-3-multiplying-and-dividing-fractions/',
          },
          {
            title:'CKMath Unit 2: Fractions as Quotients and Fraction Multiplication',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-2-fractions-as-quotients-and-fraction-multiplication/',
          },
          {
            title:'CKMath Unit 1: Finding Volume',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-1-finding-volume/',
          },
          {
            title:'CKMath Grade 5 – Connecting Math to Our World: The Power of Math',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-grade-5-connecting-math-to-our-world-the-power-of-math/',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'CK-12 Fifth Grade Science',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-fifth-grade-science/',
          },
          {
            title:'OpenSciEd 5.1 Ecosystems & Matter Cycling',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/5-1-ecosystems-matter-cycling/',
          },
          {
            title:'OpenSciEd 5.2 Water',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/5-2-water/',
          },
          {
            title:'OpenSciEd 5.3 Earth Systems',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/5-3-earth-systems/',
          },
          {
            title:'OpenSciEd 5.4 Earth in the Universe',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/5-4-earth-in-the-universe/',
          },
          {
            title:'CKSci Unit 8: Using Science Knowledge',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-8-using-science-knowledge/',
          },
          {
            title:'CKSci Unit 7: Designing Computer Programs',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-7-designing-computer-programs/',
          },
          {
            title:'CKSci Unit 6: Human Hormones and Reproduction',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-6-human-hormones-and-reproduction/',
          },
          {
            title:'CKSci Unit 5: Astronomy: Space Systems',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-5-astronomy-space-systems/',
          },
          {
            title:'CKSci Unit 4: Protecting Earth\'s Resources',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-4-protecting-earths-resources/',
          },
          {
            title:'CKSci Unit 3: Modeling Earth\'s Systems',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-3-modeling-earths-systems/',
          },
          {
            title:'CKSci Unit 2: Energy and Matter in Ecosystems',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-2-energy-and-matter-in-ecosystems/',
          },
          {
            title:'CKSci Unit 1: Investigating Matter',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-1-investigating-matter/',
          },
          {
            title:'CKSci Grade 5 – Science in Action: Rowan and Gianna',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-grade-5-science-in-action-rowan-and-gianna/',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CKHG Unit 14: Understanding Economics',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-14-understanding-economics/',
          },
          {
            title:'CKHG Grade 5: Primary Source Activity Book',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-grade-5-primary-source-activity-book/',
          },
          {
            title:'CKHG Unit 1: World Lakes',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-01-world-lakes/',
          },
          {
            title:'CKHG Unit 10: Westward Expansion Before the Civil War',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-10-westward-expansion-civil-war/',
          },
          {
            title:'CKHG Unit 11: The Civil War',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-11-civil-war/',
          },
          {
            title:'CKHG Unit 12: Westward Expansion After the Civil War',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-12-westward-expansion-civil-war/',
          },
          {
            title:'CKHG Unit 13: Native Americans: Cultures and Conflicts',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-13-native-americans-cultures-conflicts/',
          },
          {
            title:'CKHG Unit 2: Maya, Aztec, and Inca Civilizations',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-02-maya-aztec-inca-civilizations/',
          },
          {
            title:'CKHG Unit 3: The Age of Exploration',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-03-age-exploration/',
          },
          {
            title:'CKHG Unit 4: The Renaissance',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-04-renaissance/',
          },
          {
            title:'CKHG Unit 5: The Reformation',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-05-reformation/',
          },
          {
            title:'CKHG Unit 6: England in the Golden Age',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-06-england-golden-age/',
          },
          {
            title:'CKHG Unit 7: Early Russia',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-07-early-russia/',
          },
          {
            title:'CKHG Unit 8: Feudal Japan',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-08-feudal-japan/',
          },
          {
            title:'CKHG Unit 9: The Geography of the United States',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-09-geography-united-states/',
          },
        ],
      },
      {
        subj:'ELA',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CKLA Ancillary Materials: Fifth Grade',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-ancillary-materials-fifth-grade/',
          },
          {
            title:'CKLA Unit 1: They Call Me Güero',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-1-they-call-me-guero-g5/',
          },
          {
            title:'CKLA Unit 2: Early American Civilizations',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-2-early-american-civilizations/',
          },
          {
            title:'CKLA Unit 3: Adventures of Don Quixote',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-3-adventures-of-dondon-quixote/',
          },
          {
            title:'CKLA Unit 4: The Renaissance',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-4-the-renaissance/',
          },
          {
            title:'CKLA Unit 5: A Midsummer Night’s Dream',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-5-a-midsummer-nights-dream/',
          },
          {
            title:'CKLA Unit 6:  The Reformation',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-6-the-reformation/',
          },
          {
            title:'CKLA Unit 7: Poetry',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-7-poetry/',
          },
          {
            title:'CKLA Unit 8: Native Americans',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-8-native-americans/',
          },
          {
            title:'CKLA Unit 9: The Science of Breakable Things',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-9-the-science-of-breakable-things/',
          },
        ],
      },
    ],
    g6:[
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'OpenSciEd 6.1 Light & Matter',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/6-1-light-matter/',
          },
          {
            title:'OpenSciEd 6.2 Thermal Energy',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/6-2-thermal-energy/',
          },
          {
            title:'OpenSciEd 6.3 Weather, Climate & Water Cycling',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/6-3-weather-climate-water-cycling/',
          },
          {
            title:'OpenSciEd 6.4 Plate Tectonics & Rock Cycling',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/6-4-rock-cycling-plate-tectonics/',
          },
          {
            title:'OpenSciEd 6.5 Natural Hazards',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/6-5-natural-hazards/',
          },
          {
            title:'OpenSciEd 6.6 Cells & Systems',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/6-6-cells-systems/',
          },
          {
            title:'CKSci Unit 6: Cells and Systems',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-6-cells-and-systems/',
          },
          {
            title:'CKSci Unit 5: Natural Hazards',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-5-natural-hazards/',
          },
          {
            title:'CKSci Unit 4: Plate Tectonics and Rock Cycling',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-4-plate-tectonics-and-rock-cycling/',
          },
          {
            title:'CKSci Unit 3: Weather, Climate, and Water Cycling',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-3-weather-climate-and-water-cycling/',
          },
          {
            title:'CKSci Unit 2: Thermal Energy',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-2-thermal-energy/',
          },
          {
            title:'CKSci Unit 1: Light and Matter',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-1-light-and-matter/',
          },
          {
            title:'CK-12 Earth Science for Middle School',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-middle-school-earth-science-flexbook-2.0/',
          },
        ],
      },
      {
        subj:'Math',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'CKMath Unit 9: Grade 6 – Putting It All Together',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-9-grade-6-putting-it-all-together/',
          },
          {
            title:'CKMath Unit 8: Data Sets and Distributions',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-8-data-sets-and-distributions/',
          },
          {
            title:'CKMath Unit 7: Rational Numbers',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-7-rational-numbers/',
          },
          {
            title:'CKMath Unit 6: Expressions and Equations',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-6-expressions-and-equations/',
          },
          {
            title:'CKMath Unit 5: Arithmetic in Base Ten',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-5-arithmetic-in-base-ten/',
          },
          {
            title:'CKMath Unit 4: Dividing Fractions',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-4-dividing-fractions/',
          },
          {
            title:'CKMath Unit 3: Unit Rates and Percentages',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-3-unit-rates-and-percentages/',
          },
          {
            title:'CKMath Unit 2: Introducing Ratios',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-2-introducing-ratios/',
          },
          {
            title:'CKMath Unit 1: Area and Surface Area',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-1-area-and-surface-area/',
          },
          {
            title:'CKMath Grade 6 – Connecting Math to Our World: How We Use Math',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-grade-6-connecting-math-to-our-world-how-we-use-math/',
          },
          {
            title:'Illustrative Mathematics Grade 6 — Student Course',
            term:'American Curriculum',
            url:'https://im.kendallhunt.com/MS/students/1/index.html',
          },
          {
            title:'CK-12 Middle School Math Concepts — Grade 6',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-middle-school-math-concepts-grade-6/',
          },
          {
            title:'CK-12 Interactive Middle School Math 6',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-interactive-middle-school-math-6-for-ccss/',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CKHG Unit 9: Reform in Industrial America',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-9-reform-in-industrial-america/',
          },
          {
            title:'CKHG Unit 8: Industrialization and Urbanization in America',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-8-industrialization-and-urbanization-in-america/',
          },
          {
            title:'CKHG Unit 7: Immigration',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-7-immigration/',
          },
          {
            title:'CKHG Unit 6: Independence for Latin America',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-6-independence-for-latin-america/',
          },
          {
            title:'CKHG Unit 5: The Industrial Revolution: Changes and Challenges',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-5-industrial-revolution/',
          },
          {
            title:'CKHG Grade 6: Primary Source Activity Book',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-grade-6-primary-source-activity-book/',
          },
          {
            title:'CKHG Unit 1: World Deserts',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-1-world-deserts/',
          },
          {
            title:'CKHG Unit 2: Ancient Greece and Rome',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-2-ancient-greece-rome/',
          },
          {
            title:'CKHG Unit 3: The Enlightenment',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-3-enlightenment/',
          },
          {
            title:'CKHG Unit 4: The French Revolution and Romanticism',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-unit-4-the-french-revolution-and-romanticism/',
          },
        ],
      },
      {
        subj:'ELA',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CKLA Unit 8: Realms of Gold, Volume 1',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-8-realms-of-gold-volume-1/',
          },
          {
            title:'CKLA Unit 7: The Blessings of Liberty',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-7-the-blessings-of-liberty/',
          },
          {
            title:'CKLA Unit 6: 90 Miles to Havana',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-6-ninety-miles-to-havana/',
          },
          {
            title:'CKLA Unit 5: The Tragedy of Julius Caesar',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-5-the-tragedy-of-julius-caesar/',
          },
          {
            title:'CKLA Unit 4: The Iliad, the Odyssey, and Other Greek Stories',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-4-the-iliad-and-the-odyssey-and-other-greek-stories/',
          },
          {
            title:'CKLA Unit 3: The Heritage of Ancient Greece and Rome',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-3-the-heritage-of-ancient-greece-and-rome/',
          },
          {
            title:'CKLA Unit 2: Calling All Minds: How to Think and Create Like an Inventor',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-2-calling-all-minds/',
          },
          {
            title:'CKLA Unit 1: Flying Lessons & Other Stories',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-1-flying-lessons-other-stories/',
          },
          {
            title:'CKLA Grade 6: Resources for English Language Learners',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-grade-6-resources-for-english-language-learners/',
          },
          {
            title:'CKLA Ancillary Materials: Sixth Grade',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-ancillary-materials-sixth-grade/',
          },
        ],
      },
    ],
    g7:[
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'OpenSciEd 7.1 Chemical Reactions & Matter',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/7-1-chemical-reactions-matter/',
          },
          {
            title:'OpenSciEd 7.2 Chemical Reactions & Energy',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/7-2-chemical-reactions-energy/',
          },
          {
            title:'OpenSciEd 7.3 Metabolic Reactions',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/7-3-metabolic-reactions/',
          },
          {
            title:'OpenSciEd 7.4 Matter Cycling & Photosynthesis',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/7-4-matter-cycling-photosynthesis/',
          },
          {
            title:'OpenSciEd 7.5 Ecosystem Dynamics',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/7-5-ecosystem-dynamics/',
          },
          {
            title:'OpenSciEd 7.6 Earth\'s Resources & Human Impact',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/7-6-earths-resources-human-impact/',
          },
          {
            title:'CKSci Unit 6: Earth’s Resources and Human Impact',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-6-earths-resources-and-human-impact/',
          },
          {
            title:'CKSci Unit 5: Ecosystem Dynamics',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-5-ecosystem-dynamics/',
          },
          {
            title:'CKSci Unit 4: Matter Cycling and Photosynthesis',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-4-matter-cycling-and-photosynthesis/',
          },
          {
            title:'CKSci Unit 3: Metabolic Reactions',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-3-metabolic-reactions/',
          },
          {
            title:'CKSci Unit 2: Chemical Reactions and Energy',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-2-chemical-reactions-and-energy/',
          },
          {
            title:'CKSci Unit 1: Chemical Reactions and Matter',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-1-chemical-reactions-and-matter/',
          },
          {
            title:'CK-12 Life Science for Middle School',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-middle-school-life-science-2.0/',
          },
        ],
      },
      {
        subj:'Math',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'CKMath Unit 9: Grade 7 – Putting It All Together',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-9-grade-7-putting-it-all-together/',
          },
          {
            title:'CKMath Unit 8: Probability and Sampling',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-8-probability-and-sampling/',
          },
          {
            title:'CKMath Unit 7: Angles, Triangles, and Prisms',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-7-angles-triangles-and-prisms/',
          },
          {
            title:'CKMath Unit 6: Expressions, Equations, and Inequalities',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-6-expressions-equations-and-inequalities/',
          },
          {
            title:'CKMath Unit 5: Rational Number Arithmetic',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-5-rational-number-arithmetic/',
          },
          {
            title:'CKMath Unit 4: Proportional Relationships and Percentages',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-4-proportional-relationships-and-percentages/',
          },
          {
            title:'CKMath Unit 3: Measuring Circles',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-3-measuring-circles/',
          },
          {
            title:'CKMath Unit 2: Introducing Proportional Relationships',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-2-introducing-proportional-relationships/',
          },
          {
            title:'CKMath Unit 1: Scale Drawings',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-1-scale-drawings/',
          },
          {
            title:'CKMath Grade 7 – Connecting Math to Our World: The Mathematical Mind',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-grade-7-connecting-math-to-our-world-the-mathematical-mind/',
          },
          {
            title:'Illustrative Mathematics Grade 7 — Student Course',
            term:'American Curriculum',
            url:'https://im.kendallhunt.com/MS/students/2/index.html',
          },
          {
            title:'CK-12 Middle School Math Concepts — Grade 7',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-middle-school-math-concepts-grade-7/',
          },
          {
            title:'CK-12 Interactive Middle School Math 7',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-interactive-middle-school-math-7-for-ccss/',
          },
          { title:'OpenStax Prealgebra 2e', term:'American Curriculum', url:'https://openstax.org/details/books/prealgebra-2e' },
        ],
      },
      {
        subj:'ELA',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CKLA Unit 8: Code Talker',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-8-code-talker/',
          },
          {
            title:'CKLA Unit 7: Anne Frank\'s Tales from the Secret Annex',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-7-anne-franks-tales-from-the-secret-annex/',
          },
          {
            title:'CKLA Unit 6: The Genius of the Harlem Renaissance, Volume 1',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-6-the-genius-of-the-harlem-renaissance-volume-1/',
          },
          {
            title:'CKLA Unit 5: Realms of Gold, Volume 2',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-5-realms-of-gold-volume-2/',
          },
          {
            title:'CKLA Unit 4: The Time Machine',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-4-the-time-machine/',
          },
          {
            title:'CKLA Unit 3: Strange Case of Dr. Jekyll and Mr. Hyde',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-3-strange-case-of-dr-jekyll-and-mr-hyde/',
          },
          {
            title:'CKLA Unit 2: The Tempest',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-2-the-tempest/',
          },
          {
            title:'CKLA Unit 1: Hello, Universe',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-1-hello-universe/',
          },
          {
            title:'CKLA Grade 7: Resources for English Language Learners',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-grade-7-resources-for-english-language-learners/',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CKHG: Civics and Economics in U.S. History',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-civics-and-economics-in-u-s-history/',
          },
          {
            title:'CKHG: A History of the United States',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-a-history-of-the-united-states/',
          },
        ],
      },
    ],
    g8:[
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'OpenSciEd 8.1 Contact Forces',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/8-1-contact-forces/',
          },
          {
            title:'OpenSciEd 8.2 Sound Waves',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/8-2-sound-waves/',
          },
          {
            title:'OpenSciEd 8.3 Forces at a Distance',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/8-3-forces-at-a-distance/',
          },
          {
            title:'OpenSciEd 8.4 Earth in Space',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/8-4-earth-in-space/',
          },
          {
            title:'OpenSciEd 8.5 Genetics',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/8-5-genetics/',
          },
          {
            title:'OpenSciEd 8.6 Natural Selection & Common Ancestry',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/8-6-natural-selection-common-ancestry/',
          },
          {
            title:'CKSci Unit 6: Natural Selection and Common Ancestry',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-6-natural-selection-and-common-ancestry/',
          },
          {
            title:'CKSci Unit 5: Genetics',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-5-genetics/',
          },
          {
            title:'CKSci Unit 4: Earth in Space',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-4-earth-in-space/',
          },
          {
            title:'CKSci Unit 3: Forces at a Distance',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-3-forces-at-a-distance/',
          },
          {
            title:'CKSci Unit 2: Sound Waves',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-2-sound-waves/',
          },
          {
            title:'CKSci Unit 1: Contact Forces',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/cksci-unit-1-contact-forces/',
          },
          {
            title:'CK-12 Physical Science for Middle School',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-middle-school-physical-science-flexbook-2.0/',
          },
        ],
      },
      {
        subj:'Math',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'CKMath Unit 9: Grade 8 – Putting It All Together',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-9-grade-8-putting-it-all-together/',
          },
          {
            title:'CKMath Unit 8: Pythagorean Theorem and Irrational Numbers',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-8-pythagorean-theorem-and-irrational-numbers/',
          },
          {
            title:'CKMath Unit 7: Exponents and Scientific Notation',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-7-exponents-and-scientific-notation/',
          },
          {
            title:'CKMath Unit 6: Associations in Data',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-6-associations-in-data/',
          },
          {
            title:'CKMath Unit 5: Functions and Volume',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-5-functions-and-volume/',
          },
          {
            title:'CKMath Unit 4: Linear Equations and Linear Systems',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-4-linear-equations-and-linear-systems/',
          },
          {
            title:'CKMath Unit 3: Linear Relationships',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-3-linear-relationships/',
          },
          {
            title:'CKMath Unit 2: Dilations, Similarity, and Introducing Slope',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-2-dilations-similarity-and-introducing-slope/',
          },
          {
            title:'CKMath Unit 1: Rigid Transformations and Congruence',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-unit-1-rigid-transformations-and-congruence/',
          },
          {
            title:'CKMath Grade 8 – Connecting Math to Our World: The Relevance of Math',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckmath-grade-8-connecting-math-to-our-world-the-relevance-of-math/',
          },
          {
            title:'Illustrative Mathematics Grade 8 — Student Course',
            term:'American Curriculum',
            url:'https://im.kendallhunt.com/MS/students/3/index.html',
          },
          {
            title:'CK-12 Middle School Math Concepts — Grade 8',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-middle-school-math-concepts-grade-8/',
          },
          {
            title:'CK-12 Interactive Middle School Math 8',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-interactive-middle-school-math-8-for-ccss/',
          },
          { title:'OpenStax Prealgebra 2e', term:'American Curriculum', url:'https://openstax.org/details/books/prealgebra-2e' },
        ],
      },
      {
        subj:'ELA',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CKLA Unit 8: Realms of Gold, Volume 3',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-8-realms-of-gold-volume-3/',
          },
          {
            title:'CKLA Unit 7: The Importance of Being Earnest',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-7-the-importance-of-being-earnest/',
          },
          {
            title:'CKLA Unit 6: The Squatter and the Don',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-6-the-squatter-and-the-don/',
          },
          {
            title:'CKLA Unit 5: A More Perfect Union: Voices for Civil Rights in America',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-5-a-more-perfect-union-voices-for-civil-rights-in-america/',
          },
          {
            title:'CKLA Unit 4: The Genius of the Harlem Renaissance, Volume 2',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-4-the-genius-of-the-harlem-renaissance-volume-2/',
          },
          {
            title:'CKLA Unit 3: Narrative of the Life of Frederick Douglass',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/narrative-of-the-life-of-frederick-douglass/',
          },
          {
            title:'CKLA Unit 2: Frankenstein',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/frankenstein/',
          },
          {
            title:'CKLA Unit 1: Us, in Progress: Short Stories About Young Latinos',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-unit-1-us-in-progress-short-stories-about-young-latinos/',
          },
          {
            title:'CKLA Grade 8: Resources for English Language Learners',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckla-grade-8-resources-for-english-language-learners/',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CKHG: World History',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/world-history/',
          },
          {
            title:'CKHG: Civics and Economics in World History',
            term:'American Curriculum',
            url:'https://www.coreknowledge.org/free-resource/ckhg-civics-and-economics-in-world-history/',
          },
        ],
      },
    ],
    g9:[
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'OpenSciEd Biology B.1 Ecosystems: Interactions & Dynamics',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/b-1-ecosystem-interactions-dynamics/',
          },
          {
            title:'OpenSciEd Biology B.2 Ecosystems: Matter & Energy',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/b-2-ecosystems-matter-energy/',
          },
          {
            title:'OpenSciEd Biology B.3 Inheritance & Variation of Traits',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/b-3-inheritance-variation-of-traits/',
          },
          {
            title:'OpenSciEd Biology B.4 Natural Selection & Evolution',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/b-4-natural-selection-evolution/',
          },
          {
            title:'OpenSciEd Biology B.5 Common Ancestry & Speciation',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/b-5-common-ancestry-speciation/',
          },
          { title:'OpenStax Biology 2e', term:'American Curriculum', url:'https://openstax.org/details/books/biology-2e' },
          {
            title:'OpenStax Concepts of Biology',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/concepts-biology',
          },
        ],
      },
      {
        subj:'Math',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Illustrative Mathematics Algebra 1 — Student Course',
            term:'American Curriculum',
            url:'https://im.kendallhunt.com/HS/students/1/index.html',
          },
          { title:'OpenStax Algebra 1', term:'American Curriculum', url:'https://openstax.org/details/books/algebra-1' },
          {
            title:'CK-12 Interactive Algebra 1',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-interactive-algebra-1-for-ccss/',
          },
          {
            title:'CK-12 Algebra 1 Concepts',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-algebra-i-concepts/',
          },
          {
            title:'OpenStax Elementary Algebra 2e',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/elementary-algebra-2e',
          },
        ],
      },
      {
        subj:'ELA',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'OpenStax Writing Guide with Handbook',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/writing-guide',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'OpenStax World History, Volume 1: to 1500',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/world-history-volume-1',
          },
        ],
      },
    ],
    g10:[
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'OpenSciEd Chemistry C.1 Thermodynamics in Earth\'s Systems',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/c-1-thermodynamics-in-earths-systems/',
          },
          {
            title:'OpenSciEd Chemistry C.2 Structure & Properties of Matter',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/c-2-structure-properties-of-matter/',
          },
          {
            title:'OpenSciEd Chemistry C.3 Molecular Processes in Earth Systems',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/c-3-molecular-processes-in-earth-systems/',
          },
          {
            title:'OpenSciEd Chemistry C.4 Chemical Reactions in Our World',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/c-4-chemical-reactions-in-our-world/',
          },
          {
            title:'OpenSciEd Chemistry C.5 Energy from Chemical & Nuclear Reactions',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/c-5-energy-from-chemical-nuclear-reactions/',
          },
          { title:'OpenStax Chemistry 2e', term:'American Curriculum', url:'https://openstax.org/details/books/chemistry-2e' },
          {
            title:'OpenStax Chemistry: Atoms First 2e',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/chemistry-atoms-first-2e',
          },
          {
            title:'CK-12 Chemistry for High School',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-chemistry-flexbook-2.0/',
          },
        ],
      },
      {
        subj:'Math',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Illustrative Mathematics Geometry — Student Course',
            term:'American Curriculum',
            url:'https://im.kendallhunt.com/HS/students/2/index.html',
          },
          {
            title:'CK-12 Interactive Geometry',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-interactive-geometry-for-ccss/',
          },
          {
            title:'CK-12 Basic Geometry Concepts',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-basic-geometry-concepts/',
          },
          {
            title:'OpenStax Intermediate Algebra 2e',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/intermediate-algebra-2e',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'OpenStax World History, Volume 2: from 1400',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/world-history-volume-2',
          },
        ],
      },
      {
        subj:'Computer Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'OpenStax Introduction to Python Programming',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/introduction-python-programming',
          },
          {
            title:'OpenStax Introduction to Computer Science',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/introduction-computer-science',
          },
        ],
      },
      {
        subj:'ELA',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'OpenStax Writing Guide with Handbook',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/writing-guide',
          },
        ],
      },
    ],
    g11:[
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'OpenSciEd Physics P.1 Energy Flow from Earth\'s Systems',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/p-1-energy-flow-from-earths-systems/',
          },
          {
            title:'OpenSciEd Physics P.2 Energy & Forces in Earth\'s Crust',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/p-2-energy-forces-earths-crust/',
          },
          {
            title:'OpenSciEd Physics P.3 Collisions & Momentum',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/p-3-collisions-momentum/',
          },
          {
            title:'OpenSciEd Physics P.4 Meteors, Orbits & Gravity',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/p-4-meteors-orbits-gravity/',
          },
          {
            title:'OpenSciEd Physics P.5 Electromagnetic Radiation',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/p-5-electromagnetic-radiation/',
          },
          {
            title:'OpenSciEd Physics P.6 Stars & the Big Bang',
            term:'American Curriculum',
            url:'https://openscied.org/instructional-materials/p-6-stars-the-big-bang/',
          },
          { title:'OpenStax Physics (High School)', term:'American Curriculum', url:'https://openstax.org/details/books/physics' },
          {
            title:'CK-12 Physics for High School',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-physics-flexbook-2.0/',
          },
        ],
      },
      {
        subj:'Math',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Illustrative Mathematics Algebra 2 — Student Course',
            term:'American Curriculum',
            url:'https://im.kendallhunt.com/HS/students/3/index.html',
          },
          {
            title:'OpenStax Algebra and Trigonometry 2e',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/algebra-and-trigonometry-2e',
          },
          { title:'OpenStax Precalculus 2e', term:'American Curriculum', url:'https://openstax.org/details/books/precalculus-2e' },
          {
            title:'CK-12 Interactive Algebra 2',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-interactive-algebra-2/',
          },
          {
            title:'CK-12 Algebra II with Trigonometry Concepts',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-algebra-ii-with-trigonometry-concepts/',
          },
          {
            title:'CK-12 Precalculus Concepts 2.0',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-precalculus-concepts-2.0/',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'OpenStax U.S. History', term:'American Curriculum', url:'https://openstax.org/details/books/us-history' },
        ],
      },
      {
        subj:'ELA',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'OpenStax Writing Guide with Handbook',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/writing-guide',
          },
        ],
      },
    ],
    g12:[
      {
        subj:'Math',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'OpenStax Calculus Volume 1',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/calculus-volume-1',
          },
          {
            title:'OpenStax Calculus Volume 2',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/calculus-volume-2',
          },
          {
            title:'OpenStax Calculus Volume 3',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/calculus-volume-3',
          },
          {
            title:'CK-12 Calculus Concepts',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-calculus-concepts/',
          },
          {
            title:'OpenStax Statistics (High School)',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/statistics',
          },
          {
            title:'OpenStax Introductory Statistics 2e',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/introductory-statistics-2e',
          },
          {
            title:'CK-12 Probability and Statistics Concepts',
            term:'American Curriculum',
            url:'https://flexbooks.ck12.org/cbook/ck-12-probability-and-statistics-concepts/',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'OpenStax American Government 4e',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/american-government-4e',
          },
          {
            title:'OpenStax Principles of Economics 3e',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/principles-economics-3e',
          },
          {
            title:'OpenStax Principles of Macroeconomics 3e',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/principles-macroeconomics-3e',
          },
          {
            title:'OpenStax Principles of Microeconomics 3e',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/principles-microeconomics-3e',
          },
          { title:'OpenStax Psychology 2e', term:'American Curriculum', url:'https://openstax.org/details/books/psychology-2e' },
          {
            title:'OpenStax Introduction to Sociology 3e',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/introduction-sociology-3e',
          },
        ],
      },
      {
        subj:'ELA',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'OpenStax Writing Guide with Handbook',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/writing-guide',
          },
        ],
      },
    ],
    ap:[
      {
        subj:'AP Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'OpenStax Biology for AP Courses',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/biology-ap-courses',
          },
        ],
      },
      {
        subj:'AP Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'OpenStax College Physics for AP Courses 2e',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/college-physics-ap-courses-2e',
          },
        ],
      },
      {
        subj:'AP Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          { title:'OpenStax Chemistry 2e', term:'American Curriculum', url:'https://openstax.org/details/books/chemistry-2e' },
        ],
      },
      {
        subj:'AP Calculus',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'OpenStax Calculus Volume 1 (AP Calculus AB/BC)',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/calculus-volume-1',
          },
          {
            title:'OpenStax Calculus Volume 2 (AP Calculus BC)',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/calculus-volume-2',
          },
        ],
      },
      {
        subj:'AP Statistics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'OpenStax Statistics (High School / AP)',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/statistics',
          },
        ],
      },
      {
        subj:'AP Psychology',
        icon:'💭',
        color:'#64748B',
        books:[
          { title:'OpenStax Psychology 2e', term:'American Curriculum', url:'https://openstax.org/details/books/psychology-2e' },
        ],
      },
      {
        subj:'AP Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'OpenStax Principles of Macroeconomics 3e (AP Macro)',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/principles-macroeconomics-3e',
          },
          {
            title:'OpenStax Principles of Microeconomics 3e (AP Micro)',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/principles-microeconomics-3e',
          },
        ],
      },
      {
        subj:'AP US History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          { title:'OpenStax U.S. History', term:'American Curriculum', url:'https://openstax.org/details/books/us-history' },
        ],
      },
      {
        subj:'AP Government',
        icon:'⚖️',
        color:'#6366F1',
        books:[
          {
            title:'OpenStax American Government 4e',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/american-government-4e',
          },
        ],
      },
      {
        subj:'AP World History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'OpenStax World History, Volume 2: from 1400',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/world-history-volume-2',
          },
        ],
      },
      {
        subj:'AP Computer Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'OpenStax Introduction to Python Programming',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/introduction-python-programming',
          },
        ],
      },
      {
        subj:'AP English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'OpenStax Writing Guide with Handbook',
            term:'American Curriculum',
            url:'https://openstax.org/details/books/writing-guide',
          },
        ],
      },
    ],
  },
  igcse:{
    y1:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge Primary Mathematics Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/languages/vietnam/Images/25127-cambridge-primary-maths-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge Primary English Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/languages/vietnam/Images/23894-cambridge-primary-english-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge Primary Science Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/languages/vietnam/Images/25128-cambridge-primary-science-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'Curriculum Overview',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge Primary Brochure (all 10 subjects)',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/599345-cambridge-primary-brochure.pdf',
          },
          {
            title:'Cambridge Primary & Lower Secondary Curricula vs the National Curriculum for England',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/425836-cambridge-primary-and-lower-secondary-curricula-and-the-national-curriculum-for-england.pdf',
          },
        ],
      },
    ],
    y2:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge Primary Mathematics Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/languages/vietnam/Images/25127-cambridge-primary-maths-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge Primary English Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/languages/vietnam/Images/23894-cambridge-primary-english-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge Primary Science Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/languages/vietnam/Images/25128-cambridge-primary-science-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'Curriculum Overview',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge Primary Brochure (all 10 subjects)',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/599345-cambridge-primary-brochure.pdf',
          },
          {
            title:'Cambridge Primary & Lower Secondary Curricula vs the National Curriculum for England',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/425836-cambridge-primary-and-lower-secondary-curricula-and-the-national-curriculum-for-england.pdf',
          },
        ],
      },
    ],
    y3:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge Primary Mathematics Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/languages/vietnam/Images/25127-cambridge-primary-maths-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge Primary English Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/languages/vietnam/Images/23894-cambridge-primary-english-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge Primary Science Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/languages/vietnam/Images/25128-cambridge-primary-science-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'Curriculum Overview',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge Primary Brochure (all 10 subjects)',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/599345-cambridge-primary-brochure.pdf',
          },
          {
            title:'Cambridge Primary & Lower Secondary Curricula vs the National Curriculum for England',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/425836-cambridge-primary-and-lower-secondary-curricula-and-the-national-curriculum-for-england.pdf',
          },
        ],
      },
    ],
    y4:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge Primary Mathematics Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/languages/vietnam/Images/25127-cambridge-primary-maths-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge Primary English Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/languages/vietnam/Images/23894-cambridge-primary-english-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge Primary Science Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/languages/vietnam/Images/25128-cambridge-primary-science-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'Curriculum Overview',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge Primary Brochure (all 10 subjects)',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/599345-cambridge-primary-brochure.pdf',
          },
          {
            title:'Cambridge Primary & Lower Secondary Curricula vs the National Curriculum for England',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/425836-cambridge-primary-and-lower-secondary-curricula-and-the-national-curriculum-for-england.pdf',
          },
        ],
      },
    ],
    y5:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge Primary Mathematics Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/languages/vietnam/Images/25127-cambridge-primary-maths-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge Primary English Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/languages/vietnam/Images/23894-cambridge-primary-english-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge Primary Science Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/languages/vietnam/Images/25128-cambridge-primary-science-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'Curriculum Overview',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge Primary Brochure (all 10 subjects)',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/599345-cambridge-primary-brochure.pdf',
          },
          {
            title:'Cambridge Primary & Lower Secondary Curricula vs the National Curriculum for England',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/425836-cambridge-primary-and-lower-secondary-curricula-and-the-national-curriculum-for-england.pdf',
          },
        ],
      },
    ],
    y6:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge Primary Mathematics Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/languages/vietnam/Images/25127-cambridge-primary-maths-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge Primary English Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/languages/vietnam/Images/23894-cambridge-primary-english-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge Primary Science Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/languages/vietnam/Images/25128-cambridge-primary-science-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'Curriculum Overview',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge Primary Brochure (all 10 subjects)',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/599345-cambridge-primary-brochure.pdf',
          },
          {
            title:'Cambridge Primary & Lower Secondary Curricula vs the National Curriculum for England',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/425836-cambridge-primary-and-lower-secondary-curricula-and-the-national-curriculum-for-england.pdf',
          },
        ],
      },
    ],
    y7:[
      {
        subj:'Curriculum Overview',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge Primary & Lower Secondary Curricula vs the National Curriculum for England',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/425836-cambridge-primary-and-lower-secondary-curricula-and-the-national-curriculum-for-england.pdf',
          },
          {
            title:'Cambridge Lower Secondary Brochure (all subjects)',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/607719-cambridge-lower-secondary-brochure.pdf',
          },
          {
            title:'Cambridge Primary & Lower Secondary Checkpoint FAQs',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/cambridge-primary-and-lower-secondary-checkpoint-faqs.pdf',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge Lower Secondary Mathematics Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/80607-cambridge-lower-secondary-maths-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge Lower Secondary English Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/80589-cambridge-lower-secondary-english-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge Lower Secondary Science Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/80617-cambridge-lower-secondary-science-curriculum-outline.pdf',
          },
        ],
      },
    ],
    y8:[
      {
        subj:'Curriculum Overview',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge Primary & Lower Secondary Curricula vs the National Curriculum for England',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/425836-cambridge-primary-and-lower-secondary-curricula-and-the-national-curriculum-for-england.pdf',
          },
          {
            title:'Cambridge Lower Secondary Brochure (all subjects)',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/607719-cambridge-lower-secondary-brochure.pdf',
          },
          {
            title:'Cambridge Primary & Lower Secondary Checkpoint FAQs',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/cambridge-primary-and-lower-secondary-checkpoint-faqs.pdf',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge Lower Secondary Mathematics Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/80607-cambridge-lower-secondary-maths-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge Lower Secondary English Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/80589-cambridge-lower-secondary-english-curriculum-outline.pdf',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge Lower Secondary Science Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/80617-cambridge-lower-secondary-science-curriculum-outline.pdf',
          },
        ],
      },
    ],
    y9:[
      {
        subj:'Curriculum Overview',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge Primary & Lower Secondary Curricula vs the National Curriculum for England',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/425836-cambridge-primary-and-lower-secondary-curricula-and-the-national-curriculum-for-england.pdf',
          },
          {
            title:'Cambridge Lower Secondary Brochure (all subjects)',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/607719-cambridge-lower-secondary-brochure.pdf',
          },
          {
            title:'Cambridge Primary & Lower Secondary Checkpoint FAQs',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/cambridge-primary-and-lower-secondary-checkpoint-faqs.pdf',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge Lower Secondary Mathematics Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/80607-cambridge-lower-secondary-maths-curriculum-outline.pdf',
          },
          {
            title:'Checkpoint Mathematics Specimen Paper 1 (legacy, from 2014)',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/82725-maths-specimen-paper-1.pdf',
          },
          {
            title:'Checkpoint Mathematics Specimen Paper 1 — Mark Scheme (legacy)',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/82781-maths-specimen-paper-1-mark-scheme.pdf',
          },
          {
            title:'Checkpoint Mathematics Specimen Paper 2 (legacy, from 2014)',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/82736-maths-specimen-paper-2.pdf',
          },
          {
            title:'Checkpoint Mathematics Specimen Paper 2 — Mark Scheme (legacy)',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/82775-maths-specimen-paper-2-mark-scheme-2014-2017.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge Lower Secondary English Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/80589-cambridge-lower-secondary-english-curriculum-outline.pdf',
          },
          {
            title:'Checkpoint English Specimen Paper 2 — Fiction (legacy, from 2018)',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/253907-english-specimen-paper-2.pdf',
          },
          {
            title:'Checkpoint English Specimen Paper 1 — Mark Scheme (legacy, from 2018)',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/253912-english-specimen-paper-1-mark-scheme.pdf',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge Lower Secondary Science Curriculum Outline',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/80617-cambridge-lower-secondary-science-curriculum-outline.pdf',
          },
          {
            title:'Checkpoint Science Specimen Paper 2 (legacy, from 2014)',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/82743-science-specimen-paper-2.pdf',
          },
        ],
      },
      {
        subj:'English as a Second Language',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Checkpoint ESL Specimen Paper 2 — Writing (legacy, from 2015)',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/212319-english-as-a-second-language-specimen-paper-2-writing-.pdf',
          },
        ],
      },
    ],
    as:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge International AS & A Level Mathematics (9709) Syllabus 2026–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697427-2026-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Further Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge International AS & A Level Further Mathematics (9231) Syllabus 2026–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697357-2026-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Cambridge International AS & A Level Physics (9702) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664565-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'Cambridge International AS & A Level Chemistry (9701) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664563-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'Cambridge International AS & A Level Biology (9700) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664560-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Computer Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge International AS & A Level Computer Science (9618) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Economics (9708) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697423-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Business',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Business (9609) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697371-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Accounting',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Accounting (9706) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697417-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Psychology',
        icon:'💭',
        color:'#64748B',
        books:[
          {
            title:'Cambridge International AS & A Level Psychology (9990) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721433-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Sociology',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Sociology (9699) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721413-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'Cambridge International AS & A Level History (9489) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/718292-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Literature in English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge International AS & A Level Literature in English (9695) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721410-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'English Language',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge International AS & A Level English Language (9093) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721359-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge International AS & A Level Geography (9696) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/718332-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Law',
        icon:'⚖️',
        color:'#6366F1',
        books:[
          {
            title:'Cambridge International AS & A Level Law (9084) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697352-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Information Technology',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'Cambridge International AS & A Level Information Technology (9626) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/662482-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Global Perspectives & Research',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge International AS & A Level Global Perspectives & Research (9239) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697359-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Thinking Skills',
        icon:'💭',
        color:'#64748B',
        books:[
          {
            title:'Cambridge International AS & A Level Thinking Skills (9694) Syllabus 2026–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697412-2026-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Arabic',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'Cambridge International AS & A Level Arabic (9680) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721448-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Marine Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge International AS & A Level Marine Science (9693) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664553-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Art & Design',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Art & Design (9479) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/729788-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Media Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Media Studies (9607) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721382-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Travel & Tourism',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge International AS & A Level Travel & Tourism (9395) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721364-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Sport & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Cambridge International AS Level Sport & Physical Education (8386) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721331-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Music',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Music (9483) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721445-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Islamic Studies',
        icon:'🕌',
        color:'#84CC16',
        books:[
          {
            title:'Cambridge International AS & A Level Islamic Studies (9488) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721377-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Environmental Management',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge International AS Level Environmental Management (8291) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664522-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'English General Paper',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English General Paper (8021) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664519-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Spanish Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Spanish Language (8022) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721321-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'German Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'German Language (8027) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/663716-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'French Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'French Language (8028) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664288-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'US History to 1877',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'US History to 1877 (8101) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/718215-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'US History since 1877',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'US History since 1877 (8102) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/718217-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Chinese Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Chinese Language (8238) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721326-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'US Government & Politics',
        icon:'⚖️',
        color:'#6366F1',
        books:[
          {
            title:'US Government & Politics (8293) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/762762-2028-2030-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Afrikaans Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Afrikaans Language (8679) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721338-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Arabic Language',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'Arabic Language (8680) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721342-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Portuguese Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Portuguese Language (8684) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721345-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Urdu Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Urdu Language (8686) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664531-2025-2026-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Tamil Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Tamil Language (8689) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/697346-2026-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Language & Literature in English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Language & Literature in English (8695) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721351-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Classical Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Classical Studies (9274) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664534-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Digital Media & Design',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'Digital Media & Design (9481) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/693608-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Drama',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Drama (9482) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721645-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Biblical Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Biblical Studies (9484) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721366-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Hinduism',
        icon:'🕊️',
        color:'#84CC16',
        books:[
          {
            title:'Hinduism (9487) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/757378-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Urdu - Pakistan only',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Urdu - Pakistan only (9686) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664551-2025-2026-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Tamil',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Tamil (9689) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721408-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Design & Technology',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Design & Technology (9705) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/675267-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Portuguese',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Portuguese (9718) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721426-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Spanish Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Spanish Language & Literature (9844) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721428-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Arabic',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'Arabic (9865) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/762742-2029-2031-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Urdu Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Urdu Language & Literature (9866) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/719330-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Chinese Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Chinese Language & Literature (9868) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721432-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'German Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'German Language & Literature (9897) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664366-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'French Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'French Language & Literature (9898) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664368-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'European History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'European History (9981) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/718219-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'International History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'International History (9982) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/718222-2027-2029-syllabus.pdf',
          },
        ],
      },
    ],
    a2:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge International AS & A Level Mathematics (9709) Syllabus 2026–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697427-2026-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Further Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge International AS & A Level Further Mathematics (9231) Syllabus 2026–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697357-2026-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Cambridge International AS & A Level Physics (9702) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664565-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'Cambridge International AS & A Level Chemistry (9701) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664563-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'Cambridge International AS & A Level Biology (9700) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664560-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Computer Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge International AS & A Level Computer Science (9618) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Economics (9708) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697423-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Business',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Business (9609) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697371-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Accounting',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Accounting (9706) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697417-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Psychology',
        icon:'💭',
        color:'#64748B',
        books:[
          {
            title:'Cambridge International AS & A Level Psychology (9990) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721433-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Sociology',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Sociology (9699) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721413-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'Cambridge International AS & A Level History (9489) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/718292-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Literature in English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge International AS & A Level Literature in English (9695) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721410-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'English Language',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge International AS & A Level English Language (9093) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721359-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge International AS & A Level Geography (9696) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/718332-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Law',
        icon:'⚖️',
        color:'#6366F1',
        books:[
          {
            title:'Cambridge International AS & A Level Law (9084) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697352-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Information Technology',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'Cambridge International AS & A Level Information Technology (9626) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/662482-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Global Perspectives & Research',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge International AS & A Level Global Perspectives & Research (9239) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697359-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Thinking Skills',
        icon:'💭',
        color:'#64748B',
        books:[
          {
            title:'Cambridge International AS & A Level Thinking Skills (9694) Syllabus 2026–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697412-2026-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Arabic',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'Cambridge International AS & A Level Arabic (9680) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721448-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Marine Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge International AS & A Level Marine Science (9693) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664553-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Art & Design',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Art & Design (9479) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/729788-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Media Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Media Studies (9607) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721382-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Travel & Tourism',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge International AS & A Level Travel & Tourism (9395) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721364-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Sport & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Cambridge International AS Level Sport & Physical Education (8386) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721331-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Music',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Music (9483) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721445-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Islamic Studies',
        icon:'🕌',
        color:'#84CC16',
        books:[
          {
            title:'Cambridge International AS & A Level Islamic Studies (9488) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721377-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Environmental Management',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge International AS Level Environmental Management (8291) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664522-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'English General Paper',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English General Paper (8021) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664519-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Spanish Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Spanish Language (8022) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721321-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'German Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'German Language (8027) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/663716-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'French Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'French Language (8028) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664288-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'US History to 1877',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'US History to 1877 (8101) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/718215-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'US History since 1877',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'US History since 1877 (8102) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/718217-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Chinese Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Chinese Language (8238) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721326-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'US Government & Politics',
        icon:'⚖️',
        color:'#6366F1',
        books:[
          {
            title:'US Government & Politics (8293) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/762762-2028-2030-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Afrikaans Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Afrikaans Language (8679) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721338-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Arabic Language',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'Arabic Language (8680) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721342-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Portuguese Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Portuguese Language (8684) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721345-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Urdu Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Urdu Language (8686) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664531-2025-2026-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Tamil Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Tamil Language (8689) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/697346-2026-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Language & Literature in English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Language & Literature in English (8695) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721351-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Classical Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Classical Studies (9274) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664534-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Digital Media & Design',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'Digital Media & Design (9481) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/693608-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Drama',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Drama (9482) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721645-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Biblical Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Biblical Studies (9484) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721366-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Hinduism',
        icon:'🕊️',
        color:'#84CC16',
        books:[
          {
            title:'Hinduism (9487) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/757378-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Urdu - Pakistan only',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Urdu - Pakistan only (9686) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664551-2025-2026-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Tamil',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Tamil (9689) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721408-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Design & Technology',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Design & Technology (9705) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/675267-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Portuguese',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Portuguese (9718) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721426-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Spanish Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Spanish Language & Literature (9844) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721428-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Arabic',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'Arabic (9865) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/762742-2029-2031-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Urdu Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Urdu Language & Literature (9866) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/719330-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Chinese Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Chinese Language & Literature (9868) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721432-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'German Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'German Language & Literature (9897) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664366-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'French Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'French Language & Literature (9898) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664368-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'European History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'European History (9981) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/718219-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'International History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'International History (9982) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/718222-2027-2029-syllabus.pdf',
          },
        ],
      },
    ],
    olevel:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge O Level Mathematics (Syllabus D) (4024) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/662480-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Additional Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge O Level Additional Mathematics (4037) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/662720-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Statistics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge O Level Statistics (4040) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664481-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Cambridge O Level Physics (5054) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697324-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'Cambridge O Level Chemistry (5070) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697326-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'Cambridge O Level Biology (5090) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697330-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Combined Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge O Level Combined Science (5129) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697332-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Computer Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge O Level Computer Science (2210) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697287-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Economics (2281) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/718206-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Business Studies',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Business Studies (7115) Syllabus 2026',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697338-2026-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Business',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Business (7081) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/718211-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Accounting',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Accounting (7707) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/718213-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Commerce',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Commerce (7100) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/693604-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'English Language',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge O Level English Language (1123) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721416-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Literature in English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge O Level Literature in English (2010) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721418-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge O Level Geography (2217) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/718204-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'Cambridge O Level History (2147) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721455-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Islamiyat',
        icon:'🕌',
        color:'#84CC16',
        books:[
          {
            title:'Cambridge O Level Islamiyat (2058) Syllabus 2026–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697279-2026-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Islamic Studies',
        icon:'🕌',
        color:'#84CC16',
        books:[
          {
            title:'Cambridge O Level Islamic Studies (2068) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/663659-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Pakistan Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Pakistan Studies (2059) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/732849-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Arabic',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'Cambridge O Level Arabic (3180) Syllabus 2026',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697296-2026-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Global Perspectives',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge O Level Global Perspectives (2069) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/662476-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Sociology',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Sociology (2251) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/662478-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Environmental Management',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge O Level Environmental Management (5014) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/718208-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Food & Nutrition',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Food & Nutrition (6065) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697336-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Fashion & Textiles',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Fashion & Textiles (6130) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/694056-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Art & Design',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Art & Design (6090) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/729783-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Urdu First Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Cambridge O Level Urdu First Language (3247) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721463-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Urdu Second Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Cambridge O Level Urdu Second Language (3248) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721465-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Bangladesh Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Bangladesh Studies (7094) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/665158-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Bengali',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Bengali (3204) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721457-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Sinhala',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Sinhala (3205) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721459-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Tamil',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Tamil (3226) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721461-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Sanskrit',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Sanskrit (3216) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/763681-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Biblical Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Biblical Studies (2035) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721451-2027-2029-syllabus.pdf',
          },
        ],
      },
    ],
  },
  cambridge_olevel:{
    olevel:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge O Level Mathematics (Syllabus D) (4024) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/662480-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Additional Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge O Level Additional Mathematics (4037) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/662720-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Statistics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge O Level Statistics (4040) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664481-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Cambridge O Level Physics (5054) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697324-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'Cambridge O Level Chemistry (5070) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697326-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'Cambridge O Level Biology (5090) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697330-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Combined Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge O Level Combined Science (5129) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697332-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Computer Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge O Level Computer Science (2210) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697287-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Economics (2281) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/718206-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Business Studies',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Business Studies (7115) Syllabus 2026',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697338-2026-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Business',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Business (7081) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/718211-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Accounting',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Accounting (7707) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/718213-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Commerce',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Commerce (7100) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/693604-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'English Language',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge O Level English Language (1123) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721416-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Literature in English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge O Level Literature in English (2010) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721418-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge O Level Geography (2217) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/718204-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'Cambridge O Level History (2147) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721455-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Islamiyat',
        icon:'🕌',
        color:'#84CC16',
        books:[
          {
            title:'Cambridge O Level Islamiyat (2058) Syllabus 2026–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697279-2026-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Islamic Studies',
        icon:'🕌',
        color:'#84CC16',
        books:[
          {
            title:'Cambridge O Level Islamic Studies (2068) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/663659-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Pakistan Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Pakistan Studies (2059) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/732849-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Arabic',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'Cambridge O Level Arabic (3180) Syllabus 2026',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697296-2026-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Global Perspectives',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge O Level Global Perspectives (2069) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/662476-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Sociology',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Sociology (2251) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/662478-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Environmental Management',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge O Level Environmental Management (5014) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/718208-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Food & Nutrition',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Food & Nutrition (6065) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697336-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Fashion & Textiles',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Fashion & Textiles (6130) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/694056-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Art & Design',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Art & Design (6090) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/729783-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Urdu First Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Cambridge O Level Urdu First Language (3247) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721463-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Urdu Second Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Cambridge O Level Urdu Second Language (3248) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721465-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Bangladesh Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Bangladesh Studies (7094) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/665158-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Bengali',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Bengali (3204) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721457-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Sinhala',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Sinhala (3205) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721459-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Tamil',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Tamil (3226) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721461-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Sanskrit',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Sanskrit (3216) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/763681-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Biblical Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge O Level Biblical Studies (2035) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721451-2027-2029-syllabus.pdf',
          },
        ],
      },
    ],
  },
  cambridge_alevel:{
    as:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge International AS & A Level Mathematics (9709) Syllabus 2026–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697427-2026-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Further Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge International AS & A Level Further Mathematics (9231) Syllabus 2026–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697357-2026-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Cambridge International AS & A Level Physics (9702) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664565-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'Cambridge International AS & A Level Chemistry (9701) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664563-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'Cambridge International AS & A Level Biology (9700) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664560-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Computer Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge International AS & A Level Computer Science (9618) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Economics (9708) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697423-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Business',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Business (9609) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697371-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Accounting',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Accounting (9706) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697417-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Psychology',
        icon:'💭',
        color:'#64748B',
        books:[
          {
            title:'Cambridge International AS & A Level Psychology (9990) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721433-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Sociology',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Sociology (9699) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721413-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'Cambridge International AS & A Level History (9489) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/718292-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Literature in English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge International AS & A Level Literature in English (9695) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721410-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'English Language',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge International AS & A Level English Language (9093) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721359-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge International AS & A Level Geography (9696) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/718332-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Law',
        icon:'⚖️',
        color:'#6366F1',
        books:[
          {
            title:'Cambridge International AS & A Level Law (9084) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697352-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Information Technology',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'Cambridge International AS & A Level Information Technology (9626) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/662482-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Global Perspectives & Research',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge International AS & A Level Global Perspectives & Research (9239) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697359-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Thinking Skills',
        icon:'💭',
        color:'#64748B',
        books:[
          {
            title:'Cambridge International AS & A Level Thinking Skills (9694) Syllabus 2026–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697412-2026-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Arabic',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'Cambridge International AS & A Level Arabic (9680) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721448-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Marine Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge International AS & A Level Marine Science (9693) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664553-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Art & Design',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Art & Design (9479) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/729788-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Media Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Media Studies (9607) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721382-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Travel & Tourism',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge International AS & A Level Travel & Tourism (9395) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721364-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Sport & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Cambridge International AS Level Sport & Physical Education (8386) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721331-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Music',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Music (9483) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721445-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Islamic Studies',
        icon:'🕌',
        color:'#84CC16',
        books:[
          {
            title:'Cambridge International AS & A Level Islamic Studies (9488) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721377-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Environmental Management',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge International AS Level Environmental Management (8291) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664522-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'English General Paper',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English General Paper (8021) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664519-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Spanish Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Spanish Language (8022) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721321-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'German Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'German Language (8027) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/663716-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'French Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'French Language (8028) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664288-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'US History to 1877',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'US History to 1877 (8101) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/718215-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'US History since 1877',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'US History since 1877 (8102) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/718217-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Chinese Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Chinese Language (8238) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721326-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'US Government & Politics',
        icon:'⚖️',
        color:'#6366F1',
        books:[
          {
            title:'US Government & Politics (8293) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/762762-2028-2030-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Afrikaans Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Afrikaans Language (8679) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721338-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Arabic Language',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'Arabic Language (8680) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721342-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Portuguese Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Portuguese Language (8684) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721345-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Urdu Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Urdu Language (8686) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664531-2025-2026-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Tamil Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Tamil Language (8689) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/697346-2026-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Language & Literature in English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Language & Literature in English (8695) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721351-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Classical Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Classical Studies (9274) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664534-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Digital Media & Design',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'Digital Media & Design (9481) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/693608-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Drama',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Drama (9482) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721645-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Biblical Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Biblical Studies (9484) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721366-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Hinduism',
        icon:'🕊️',
        color:'#84CC16',
        books:[
          {
            title:'Hinduism (9487) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/757378-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Urdu - Pakistan only',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Urdu - Pakistan only (9686) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664551-2025-2026-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Tamil',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Tamil (9689) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721408-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Design & Technology',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Design & Technology (9705) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/675267-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Portuguese',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Portuguese (9718) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721426-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Spanish Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Spanish Language & Literature (9844) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721428-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Arabic',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'Arabic (9865) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/762742-2029-2031-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Urdu Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Urdu Language & Literature (9866) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/719330-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Chinese Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Chinese Language & Literature (9868) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721432-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'German Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'German Language & Literature (9897) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664366-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'French Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'French Language & Literature (9898) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664368-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'European History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'European History (9981) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/718219-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'International History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'International History (9982) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/718222-2027-2029-syllabus.pdf',
          },
        ],
      },
    ],
    a2:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge International AS & A Level Mathematics (9709) Syllabus 2026–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697427-2026-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Further Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Cambridge International AS & A Level Further Mathematics (9231) Syllabus 2026–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697357-2026-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Cambridge International AS & A Level Physics (9702) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664565-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'Cambridge International AS & A Level Chemistry (9701) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664563-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'Cambridge International AS & A Level Biology (9700) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664560-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Computer Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge International AS & A Level Computer Science (9618) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Economics (9708) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697423-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Business',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Business (9609) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697371-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Accounting',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Accounting (9706) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697417-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Psychology',
        icon:'💭',
        color:'#64748B',
        books:[
          {
            title:'Cambridge International AS & A Level Psychology (9990) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721433-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Sociology',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Sociology (9699) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721413-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'Cambridge International AS & A Level History (9489) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/718292-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Literature in English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge International AS & A Level Literature in English (9695) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721410-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'English Language',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Cambridge International AS & A Level English Language (9093) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721359-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge International AS & A Level Geography (9696) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/718332-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Law',
        icon:'⚖️',
        color:'#6366F1',
        books:[
          {
            title:'Cambridge International AS & A Level Law (9084) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697352-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Information Technology',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'Cambridge International AS & A Level Information Technology (9626) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/662482-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Global Perspectives & Research',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge International AS & A Level Global Perspectives & Research (9239) Syllabus 2026–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697359-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Thinking Skills',
        icon:'💭',
        color:'#64748B',
        books:[
          {
            title:'Cambridge International AS & A Level Thinking Skills (9694) Syllabus 2026–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/697412-2026-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Arabic',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'Cambridge International AS & A Level Arabic (9680) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721448-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Marine Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Cambridge International AS & A Level Marine Science (9693) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664553-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Art & Design',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Art & Design (9479) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/729788-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Media Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Media Studies (9607) Syllabus 2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721382-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Travel & Tourism',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge International AS & A Level Travel & Tourism (9395) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721364-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Sport & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Cambridge International AS Level Sport & Physical Education (8386) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721331-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Music',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Cambridge International AS & A Level Music (9483) Syllabus 2027–2028',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721445-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Islamic Studies',
        icon:'🕌',
        color:'#84CC16',
        books:[
          {
            title:'Cambridge International AS & A Level Islamic Studies (9488) Syllabus 2027–2029',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/721377-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Environmental Management',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Cambridge International AS Level Environmental Management (8291) Syllabus 2025–2027',
            term:'Cambridge',
            url:'https://www.cambridgeinternational.org/Images/664522-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'English General Paper',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English General Paper (8021) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664519-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Spanish Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Spanish Language (8022) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721321-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'German Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'German Language (8027) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/663716-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'French Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'French Language (8028) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664288-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'US History to 1877',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'US History to 1877 (8101) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/718215-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'US History since 1877',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'US History since 1877 (8102) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/718217-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Chinese Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Chinese Language (8238) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721326-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'US Government & Politics',
        icon:'⚖️',
        color:'#6366F1',
        books:[
          {
            title:'US Government & Politics (8293) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/762762-2028-2030-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Afrikaans Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Afrikaans Language (8679) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721338-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Arabic Language',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'Arabic Language (8680) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721342-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Portuguese Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Portuguese Language (8684) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721345-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Urdu Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Urdu Language (8686) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664531-2025-2026-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Tamil Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Tamil Language (8689) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/697346-2026-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Language & Literature in English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Language & Literature in English (8695) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721351-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Classical Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Classical Studies (9274) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664534-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Digital Media & Design',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'Digital Media & Design (9481) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/693608-2026-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Drama',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Drama (9482) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721645-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Biblical Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Biblical Studies (9484) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721366-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Hinduism',
        icon:'🕊️',
        color:'#84CC16',
        books:[
          {
            title:'Hinduism (9487) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/757378-2027-2028-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Urdu - Pakistan only',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Urdu - Pakistan only (9686) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664551-2025-2026-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Tamil',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Tamil (9689) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721408-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Design & Technology',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Design & Technology (9705) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/675267-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Portuguese',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Portuguese (9718) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721426-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Spanish Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Spanish Language & Literature (9844) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721428-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Arabic',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'Arabic (9865) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/762742-2029-2031-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Urdu Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Urdu Language & Literature (9866) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/719330-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'Chinese Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Chinese Language & Literature (9868) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/721432-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'German Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'German Language & Literature (9897) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664366-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'French Language & Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'French Language & Literature (9898) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/664368-2025-2027-syllabus.pdf',
          },
        ],
      },
      {
        subj:'European History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'European History (9981) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/718219-2027-2029-syllabus.pdf',
          },
        ],
      },
      {
        subj:'International History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'International History (9982) — Syllabus',
            term:'Cambridge AS & A Level',
            url:'https://www.cambridgeinternational.org/Images/718222-2027-2029-syllabus.pdf',
          },
        ],
      },
    ],
  },
  ib:{
    pyp:[
      {
        subj:'PYP overview',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'IB Primary Years Programme brochure',
            term:'IB',
            url:'https://www.ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/pyp-programme-brochure-en.pdf',
          },
          {
            title:'What is the PYP? (parent FAQ)',
            term:'IB',
            url:'https://www.ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/parent-pack-faqs-about-the-pyp-en.pdf',
          },
        ],
      },
    ],
    myp1:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'OpenStax: Prealgebra 2e', term:'IB', url:'https://openstax.org/details/books/prealgebra-2e' },
          {
            title:'IB MYP Mathematics subject brief',
            term:'IB',
            url:'https://www.ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief-mathematics-en.pdf',
          },
        ],
      },
      {
        subj:'Sciences',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'IB MYP Sciences subject brief',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief-sciences-en.pdf',
          },
        ],
      },
      {
        subj:'Interdisciplinary Learning',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'IB MYP Interdisciplinary learning brief',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief-interdisciplinary-learning_en.pdf',
          },
        ],
      },
      {
        subj:'MYP overview',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'IB Middle Years Programme brochure',
            term:'IB',
            url:'https://www.ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-programme-brochure-en.pdf',
          },
        ],
      },
    ],
    myp2:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'OpenStax: Prealgebra 2e', term:'IB', url:'https://openstax.org/details/books/prealgebra-2e' },
          {
            title:'IB MYP Mathematics subject brief',
            term:'IB',
            url:'https://www.ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief-mathematics-en.pdf',
          },
        ],
      },
      {
        subj:'Sciences',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'IB MYP Sciences subject brief',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief-sciences-en.pdf',
          },
        ],
      },
      {
        subj:'Interdisciplinary Learning',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'IB MYP Interdisciplinary learning brief',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief-interdisciplinary-learning_en.pdf',
          },
        ],
      },
      {
        subj:'MYP overview',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'IB Middle Years Programme brochure',
            term:'IB',
            url:'https://www.ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-programme-brochure-en.pdf',
          },
        ],
      },
    ],
    myp3:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'OpenStax: Elementary Algebra 2e', term:'IB', url:'https://openstax.org/details/books/elementary-algebra-2e' },
          {
            title:'IB MYP Mathematics subject brief',
            term:'IB',
            url:'https://www.ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief-mathematics-en.pdf',
          },
        ],
      },
      {
        subj:'Sciences',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          { title:'OpenStax: Concepts of Biology', term:'IB', url:'https://openstax.org/details/books/concepts-biology' },
          {
            title:'IB MYP Sciences subject brief',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief-sciences-en.pdf',
          },
        ],
      },
      {
        subj:'Interdisciplinary Learning',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'IB MYP Interdisciplinary learning brief',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief-interdisciplinary-learning_en.pdf',
          },
        ],
      },
      {
        subj:'MYP overview',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'IB Middle Years Programme brochure',
            term:'IB',
            url:'https://www.ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-programme-brochure-en.pdf',
          },
        ],
      },
    ],
    myp4:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'IB MYP Mathematics subject brief',
            term:'IB',
            url:'https://www.ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief-mathematics-en.pdf',
          },
        ],
      },
      {
        subj:'Sciences',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'IB MYP Sciences subject brief',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief-sciences-en.pdf',
          },
        ],
      },
      {
        subj:'Interdisciplinary Learning',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'IB MYP Interdisciplinary learning brief',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief-interdisciplinary-learning_en.pdf',
          },
        ],
      },
      {
        subj:'MYP overview',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'IB Middle Years Programme brochure',
            term:'IB',
            url:'https://www.ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-programme-brochure-en.pdf',
          },
        ],
      },
      {
        subj:'Mathematics (Standard)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'OpenStax: Elementary Algebra 2e', term:'IB', url:'https://openstax.org/details/books/elementary-algebra-2e' },
          {
            title:'OpenStax: Contemporary Mathematics',
            term:'IB',
            url:'https://openstax.org/details/books/contemporary-mathematics',
          },
        ],
      },
      {
        subj:'Mathematics (Extended)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'OpenStax: Intermediate Algebra 2e',
            term:'IB',
            url:'https://openstax.org/details/books/intermediate-algebra-2e',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          { title:'OpenStax: Concepts of Biology', term:'IB', url:'https://openstax.org/details/books/concepts-biology' },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'OpenStax: Chemistry: Atoms First 2e',
            term:'IB',
            url:'https://openstax.org/details/books/chemistry-atoms-first-2e',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          { title:'OpenStax: Physics (high school)', term:'IB', url:'https://openstax.org/details/books/physics' },
        ],
      },
    ],
    myp5:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'IB MYP Mathematics subject brief',
            term:'IB',
            url:'https://www.ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief-mathematics-en.pdf',
          },
        ],
      },
      {
        subj:'Sciences',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'IB MYP Sciences subject brief',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief-sciences-en.pdf',
          },
        ],
      },
      {
        subj:'Interdisciplinary Learning',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'IB MYP Interdisciplinary learning brief',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-brief-interdisciplinary-learning_en.pdf',
          },
        ],
      },
      {
        subj:'MYP overview',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'IB Middle Years Programme brochure',
            term:'IB',
            url:'https://www.ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/myp-programme-brochure-en.pdf',
          },
        ],
      },
      {
        subj:'Mathematics (Standard)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'OpenStax: Intermediate Algebra 2e',
            term:'IB',
            url:'https://openstax.org/details/books/intermediate-algebra-2e',
          },
        ],
      },
      {
        subj:'Mathematics (Extended)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'OpenStax: College Algebra 2e', term:'IB', url:'https://openstax.org/details/books/college-algebra-2e' },
          {
            title:'OpenStax: Algebra and Trigonometry 2e',
            term:'IB',
            url:'https://openstax.org/details/books/algebra-and-trigonometry-2e',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          { title:'OpenStax: Concepts of Biology', term:'IB', url:'https://openstax.org/details/books/concepts-biology' },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'OpenStax: Chemistry: Atoms First 2e',
            term:'IB',
            url:'https://openstax.org/details/books/chemistry-atoms-first-2e',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          { title:'OpenStax: Physics (high school)', term:'IB', url:'https://openstax.org/details/books/physics' },
        ],
      },
    ],
    dp1:[
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          { title:'OpenStax: Biology 2e', term:'IB', url:'https://openstax.org/details/books/biology-2e' },
          { title:'OpenStax: Microbiology', term:'IB', url:'https://openstax.org/details/books/microbiology' },
          {
            title:'IB DP Biology subject brief',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/recognition/pdfs/dp_sciences_biology_subject-brief_jan_2022_e.pdf',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          { title:'OpenStax: Chemistry 2e', term:'IB', url:'https://openstax.org/details/books/chemistry-2e' },
          {
            title:'OpenStax: Chemistry: Atoms First 2e',
            term:'IB',
            url:'https://openstax.org/details/books/chemistry-atoms-first-2e',
          },
          {
            title:'IB DP Chemistry guide (first assessment 2025)',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/university-admission/pdfs/subject-guides/chemistry-guide.pdf',
          },
          {
            title:'IB DP Chemistry subject brief',
            term:'IB',
            url:'https://www.ibo.org/globalassets/new-structure/recognition/pdfs/dp_sciences_chemistry_subject-brief_jan_2022_e.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          { title:'OpenStax: College Physics 2e', term:'IB', url:'https://openstax.org/details/books/college-physics-2e' },
          {
            title:'OpenStax: University Physics Volume 1',
            term:'IB',
            url:'https://openstax.org/details/books/university-physics-volume-1',
          },
          {
            title:'OpenStax: University Physics Volume 2',
            term:'IB',
            url:'https://openstax.org/details/books/university-physics-volume-2',
          },
          {
            title:'OpenStax: University Physics Volume 3',
            term:'IB',
            url:'https://openstax.org/details/books/university-physics-volume-3',
          },
          {
            title:'IB DP Physics guide (first assessment 2025)',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/university-admission/pdfs/subject-guides/physics-guide.pdf',
          },
          {
            title:'IB DP Physics subject brief',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/recognition/pdfs/dp_sciences_physics_subject-brief_jan_2022_e.pdf',
          },
        ],
      },
      {
        subj:'Sports, Exercise & Health Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'OpenStax: Anatomy and Physiology 2e',
            term:'IB',
            url:'https://openstax.org/details/books/anatomy-and-physiology-2e',
          },
        ],
      },
      {
        subj:'Environmental Systems & Societies',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          { title:'OpenStax: Biology 2e (ecology chapters)', term:'IB', url:'https://openstax.org/details/books/biology-2e' },
        ],
      },
      {
        subj:'Computer Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'OpenStax: Introduction to Computer Science',
            term:'IB',
            url:'https://openstax.org/details/books/introduction-computer-science',
          },
        ],
      },
      {
        subj:'Mathematics: Analysis & Approaches',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'OpenStax: Precalculus 2e', term:'IB', url:'https://openstax.org/details/books/precalculus-2e' },
          { title:'OpenStax: Calculus Volume 1', term:'IB', url:'https://openstax.org/details/books/calculus-volume-1' },
          { title:'OpenStax: Calculus Volume 2', term:'IB', url:'https://openstax.org/details/books/calculus-volume-2' },
          {
            title:'IB DP Maths AA subject brief',
            term:'IB',
            url:'https://ibo.org/contentassets/5895a05412144fe890312bad52b17044/subject-brief-dp-math-analysis-and-approaches-en.pdf',
          },
          {
            title:'IB DP Maths AA guide (first assessment 2021)',
            term:'IB',
            url:'https://www.ibo.org/globalassets/new-structure/university-admission/pdfs/dp-mathematics-analysis-and-approaches-guide-en.pdf',
          },
        ],
      },
      {
        subj:'Mathematics: Applications & Interpretation',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'OpenStax: Introductory Statistics 2e',
            term:'IB',
            url:'https://openstax.org/details/books/introductory-statistics-2e',
          },
          {
            title:'OpenStax: Contemporary Mathematics',
            term:'IB',
            url:'https://openstax.org/details/books/contemporary-mathematics',
          },
          { title:'OpenStax: Calculus Volume 1', term:'IB', url:'https://openstax.org/details/books/calculus-volume-1' },
          {
            title:'IB DP Maths AI subject brief',
            term:'IB',
            url:'https://ibo.org/contentassets/5895a05412144fe890312bad52b17044/subject-brief-dp-math-applications-and-interpretations-en.pdf',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'OpenStax: Principles of Economics 3e',
            term:'IB',
            url:'https://openstax.org/details/books/principles-economics-3e',
          },
          {
            title:'OpenStax: Principles of Microeconomics 3e',
            term:'IB',
            url:'https://openstax.org/details/books/principles-microeconomics-3e',
          },
          {
            title:'OpenStax: Principles of Macroeconomics 3e',
            term:'IB',
            url:'https://openstax.org/details/books/principles-macroeconomics-3e',
          },
        ],
      },
      {
        subj:'Business Management',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'OpenStax: Introduction to Business',
            term:'IB',
            url:'https://openstax.org/details/books/introduction-business',
          },
          {
            title:'OpenStax: Principles of Management',
            term:'IB',
            url:'https://openstax.org/details/books/principles-management',
          },
          { title:'OpenStax: Principles of Marketing', term:'IB', url:'https://openstax.org/details/books/principles-marketing' },
          {
            title:'OpenStax: Principles of Financial Accounting',
            term:'IB',
            url:'https://openstax.org/details/books/principles-financial-accounting',
          },
          { title:'OpenStax: Entrepreneurship', term:'IB', url:'https://openstax.org/details/books/entrepreneurship' },
        ],
      },
      {
        subj:'Psychology',
        icon:'💭',
        color:'#64748B',
        books:[
          { title:'OpenStax: Psychology 2e', term:'IB', url:'https://openstax.org/details/books/psychology-2e' },
          { title:'OpenStax: Lifespan Development', term:'IB', url:'https://openstax.org/details/books/lifespan-development' },
          {
            title:'IB DP Psychology guide (first assessment 2027)',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/university-admission/pdfs/subject-guides/psychology-first-assessment-2027-guide-sbs.pdf',
          },
        ],
      },
      {
        subj:'Global Politics',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'OpenStax: Introduction to Political Science',
            term:'IB',
            url:'https://openstax.org/details/books/introduction-political-science',
          },
          {
            title:'IB DP Global Politics guide (first assessment 2026)',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/university-admission/pdfs/subject-guides/global-politics-guide-first-assessment-2026.pdf',
          },
        ],
      },
      {
        subj:'History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          { title:'OpenStax: World History Volume 1', term:'IB', url:'https://openstax.org/details/books/world-history-volume-1' },
          { title:'OpenStax: World History Volume 2', term:'IB', url:'https://openstax.org/details/books/world-history-volume-2' },
        ],
      },
      {
        subj:'Philosophy',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'OpenStax: Introduction to Philosophy',
            term:'IB',
            url:'https://openstax.org/details/books/introduction-philosophy',
          },
        ],
      },
      {
        subj:'Social & Cultural Anthropology',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'OpenStax: Introduction to Anthropology',
            term:'IB',
            url:'https://openstax.org/details/books/introduction-anthropology',
          },
          {
            title:'OpenStax: Introduction to Sociology 3e',
            term:'IB',
            url:'https://openstax.org/details/books/introduction-sociology-3e',
          },
        ],
      },
      {
        subj:'Extended Essay',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'OpenStax: Writing Guide with Handbook', term:'IB', url:'https://openstax.org/details/books/writing-guide' },
        ],
      },
    ],
    dp2:[
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          { title:'OpenStax: Biology 2e', term:'IB', url:'https://openstax.org/details/books/biology-2e' },
          { title:'OpenStax: Microbiology', term:'IB', url:'https://openstax.org/details/books/microbiology' },
          {
            title:'IB DP Biology subject brief',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/recognition/pdfs/dp_sciences_biology_subject-brief_jan_2022_e.pdf',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          { title:'OpenStax: Chemistry 2e', term:'IB', url:'https://openstax.org/details/books/chemistry-2e' },
          {
            title:'OpenStax: Chemistry: Atoms First 2e',
            term:'IB',
            url:'https://openstax.org/details/books/chemistry-atoms-first-2e',
          },
          {
            title:'IB DP Chemistry guide (first assessment 2025)',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/university-admission/pdfs/subject-guides/chemistry-guide.pdf',
          },
          {
            title:'IB DP Chemistry subject brief',
            term:'IB',
            url:'https://www.ibo.org/globalassets/new-structure/recognition/pdfs/dp_sciences_chemistry_subject-brief_jan_2022_e.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          { title:'OpenStax: College Physics 2e', term:'IB', url:'https://openstax.org/details/books/college-physics-2e' },
          {
            title:'OpenStax: University Physics Volume 1',
            term:'IB',
            url:'https://openstax.org/details/books/university-physics-volume-1',
          },
          {
            title:'OpenStax: University Physics Volume 2',
            term:'IB',
            url:'https://openstax.org/details/books/university-physics-volume-2',
          },
          {
            title:'OpenStax: University Physics Volume 3',
            term:'IB',
            url:'https://openstax.org/details/books/university-physics-volume-3',
          },
          {
            title:'IB DP Physics guide (first assessment 2025)',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/university-admission/pdfs/subject-guides/physics-guide.pdf',
          },
          {
            title:'IB DP Physics subject brief',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/recognition/pdfs/dp_sciences_physics_subject-brief_jan_2022_e.pdf',
          },
        ],
      },
      {
        subj:'Sports, Exercise & Health Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'OpenStax: Anatomy and Physiology 2e',
            term:'IB',
            url:'https://openstax.org/details/books/anatomy-and-physiology-2e',
          },
        ],
      },
      {
        subj:'Environmental Systems & Societies',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          { title:'OpenStax: Biology 2e (ecology chapters)', term:'IB', url:'https://openstax.org/details/books/biology-2e' },
        ],
      },
      {
        subj:'Computer Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'OpenStax: Introduction to Computer Science',
            term:'IB',
            url:'https://openstax.org/details/books/introduction-computer-science',
          },
        ],
      },
      {
        subj:'Mathematics: Analysis & Approaches',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'OpenStax: Precalculus 2e', term:'IB', url:'https://openstax.org/details/books/precalculus-2e' },
          { title:'OpenStax: Calculus Volume 1', term:'IB', url:'https://openstax.org/details/books/calculus-volume-1' },
          { title:'OpenStax: Calculus Volume 2', term:'IB', url:'https://openstax.org/details/books/calculus-volume-2' },
          {
            title:'IB DP Maths AA subject brief',
            term:'IB',
            url:'https://ibo.org/contentassets/5895a05412144fe890312bad52b17044/subject-brief-dp-math-analysis-and-approaches-en.pdf',
          },
          {
            title:'IB DP Maths AA guide (first assessment 2021)',
            term:'IB',
            url:'https://www.ibo.org/globalassets/new-structure/university-admission/pdfs/dp-mathematics-analysis-and-approaches-guide-en.pdf',
          },
        ],
      },
      {
        subj:'Mathematics: Applications & Interpretation',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'OpenStax: Introductory Statistics 2e',
            term:'IB',
            url:'https://openstax.org/details/books/introductory-statistics-2e',
          },
          {
            title:'OpenStax: Contemporary Mathematics',
            term:'IB',
            url:'https://openstax.org/details/books/contemporary-mathematics',
          },
          { title:'OpenStax: Calculus Volume 1', term:'IB', url:'https://openstax.org/details/books/calculus-volume-1' },
          {
            title:'IB DP Maths AI subject brief',
            term:'IB',
            url:'https://ibo.org/contentassets/5895a05412144fe890312bad52b17044/subject-brief-dp-math-applications-and-interpretations-en.pdf',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'OpenStax: Principles of Economics 3e',
            term:'IB',
            url:'https://openstax.org/details/books/principles-economics-3e',
          },
          {
            title:'OpenStax: Principles of Microeconomics 3e',
            term:'IB',
            url:'https://openstax.org/details/books/principles-microeconomics-3e',
          },
          {
            title:'OpenStax: Principles of Macroeconomics 3e',
            term:'IB',
            url:'https://openstax.org/details/books/principles-macroeconomics-3e',
          },
        ],
      },
      {
        subj:'Business Management',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'OpenStax: Introduction to Business',
            term:'IB',
            url:'https://openstax.org/details/books/introduction-business',
          },
          {
            title:'OpenStax: Principles of Management',
            term:'IB',
            url:'https://openstax.org/details/books/principles-management',
          },
          { title:'OpenStax: Principles of Marketing', term:'IB', url:'https://openstax.org/details/books/principles-marketing' },
          {
            title:'OpenStax: Principles of Financial Accounting',
            term:'IB',
            url:'https://openstax.org/details/books/principles-financial-accounting',
          },
          { title:'OpenStax: Entrepreneurship', term:'IB', url:'https://openstax.org/details/books/entrepreneurship' },
        ],
      },
      {
        subj:'Psychology',
        icon:'💭',
        color:'#64748B',
        books:[
          { title:'OpenStax: Psychology 2e', term:'IB', url:'https://openstax.org/details/books/psychology-2e' },
          { title:'OpenStax: Lifespan Development', term:'IB', url:'https://openstax.org/details/books/lifespan-development' },
          {
            title:'IB DP Psychology guide (first assessment 2027)',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/university-admission/pdfs/subject-guides/psychology-first-assessment-2027-guide-sbs.pdf',
          },
        ],
      },
      {
        subj:'Global Politics',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'OpenStax: Introduction to Political Science',
            term:'IB',
            url:'https://openstax.org/details/books/introduction-political-science',
          },
          {
            title:'IB DP Global Politics guide (first assessment 2026)',
            term:'IB',
            url:'https://ibo.org/globalassets/new-structure/university-admission/pdfs/subject-guides/global-politics-guide-first-assessment-2026.pdf',
          },
        ],
      },
      {
        subj:'History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          { title:'OpenStax: World History Volume 1', term:'IB', url:'https://openstax.org/details/books/world-history-volume-1' },
          { title:'OpenStax: World History Volume 2', term:'IB', url:'https://openstax.org/details/books/world-history-volume-2' },
        ],
      },
      {
        subj:'Philosophy',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'OpenStax: Introduction to Philosophy',
            term:'IB',
            url:'https://openstax.org/details/books/introduction-philosophy',
          },
        ],
      },
      {
        subj:'Social & Cultural Anthropology',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'OpenStax: Introduction to Anthropology',
            term:'IB',
            url:'https://openstax.org/details/books/introduction-anthropology',
          },
          {
            title:'OpenStax: Introduction to Sociology 3e',
            term:'IB',
            url:'https://openstax.org/details/books/introduction-sociology-3e',
          },
        ],
      },
      {
        subj:'Extended Essay',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'OpenStax: Writing Guide with Handbook', term:'IB', url:'https://openstax.org/details/books/writing-guide' },
        ],
      },
    ],
  },
  cbse:{
    c1:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'NCERT Joyful Mathematics — Class 1', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/aejm1ps.pdf' },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          { title:'NCERT Mridang — Class 1', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/aemr1ps.pdf' },
        ],
      },
      {
        subj:'Hindi',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Sarangi (सारंगी) — Class 1', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/ahsr1ps.pdf' },
        ],
      },
    ],
    c2:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'NCERT Joyful Mathematics — Class 2', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/bejm1ps.pdf' },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          { title:'NCERT Mridang — Class 2', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/bemr1ps.pdf' },
        ],
      },
      {
        subj:'Hindi',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Sarangi (सारंगी) — Class 2', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/bhsr1ps.pdf' },
        ],
      },
    ],
    c3:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'NCERT Maths Mela — Class 3', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/cemm1ps.pdf' },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          { title:'NCERT Santoor — Class 3', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/cesa1ps.pdf' },
        ],
      },
      {
        subj:'Hindi',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Veena (वीणा) — Class 3', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/chve1ps.pdf' },
        ],
      },
      {
        subj:'The World Around Us',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Our Wondrous World — Class 3', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/ceev1ps.pdf' },
        ],
      },
      {
        subj:'Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Bansuri — Class 3', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/cebu1ps.pdf' },
        ],
      },
      {
        subj:'Physical Education & Well-being',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          { title:'NCERT Khel Yoga — Class 3', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/ceky1ps.pdf' },
        ],
      },
      {
        subj:'Curriculum',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CBSE Curriculum Framework: Computational Thinking & AI (Classes III–VIII) 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Pri_2026-27.pdf',
          },
        ],
      },
    ],
    c4:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'NCERT Maths Mela — Class 4', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/demm1ps.pdf' },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          { title:'NCERT Santoor — Class 4', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/desa1ps.pdf' },
        ],
      },
      {
        subj:'Hindi',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Veena (वीणा) — Class 4', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/dhve1ps.pdf' },
        ],
      },
      {
        subj:'The World Around Us',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Our Wondrous World — Class 4', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/deev1ps.pdf' },
        ],
      },
      {
        subj:'Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Bansuri — Class 4', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/debu1ps.pdf' },
        ],
      },
      {
        subj:'Physical Education & Well-being',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          { title:'NCERT Khel Yoga — Class 4', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/deky1ps.pdf' },
        ],
      },
      {
        subj:'Curriculum',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CBSE Curriculum Framework: Computational Thinking & AI (Classes III–VIII) 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Pri_2026-27.pdf',
          },
        ],
      },
    ],
    c5:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'NCERT Maths Mela — Class 5', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/eemm1ps.pdf' },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          { title:'NCERT Santoor — Class 5', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/eesa1ps.pdf' },
        ],
      },
      {
        subj:'Hindi',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Veena (वीणा) — Class 5', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/ehve1ps.pdf' },
        ],
      },
      {
        subj:'The World Around Us',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Our Wondrous World — Class 5', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/eeev1ps.pdf' },
        ],
      },
      {
        subj:'Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Bansuri — Class 5', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/eebu1ps.pdf' },
        ],
      },
      {
        subj:'Physical Education & Well-being',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          { title:'NCERT Khel Yoga — Class 5', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/eeky1ps.pdf' },
        ],
      },
      {
        subj:'Curriculum',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CBSE Curriculum Framework: Computational Thinking & AI (Classes III–VIII) 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Pri_2026-27.pdf',
          },
        ],
      },
    ],
    c6:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'NCERT Ganita Prakash — Class 6', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/fegp1ps.pdf' },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          { title:'NCERT Curiosity — Class 6', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/fecu1ps.pdf' },
        ],
      },
      {
        subj:'Social Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'NCERT Exploring Society: India and Beyond — Class 6',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/fees1ps.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          { title:'NCERT Poorvi — Class 6', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/fepr1ps.pdf' },
        ],
      },
      {
        subj:'Hindi',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Malhar (मल्हार) — Class 6', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/fhml1ps.pdf' },
        ],
      },
      {
        subj:'Sanskrit',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Deepakam (दीपकम्) — Class 6', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/fsde1ps.pdf' },
        ],
      },
      {
        subj:'Vocational Education',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Kaushal Bodh — Class 6', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/fekb1ps.pdf' },
        ],
      },
      {
        subj:'Physical Education & Well-being',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          { title:'NCERT Khel Yatra — Class 6', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/feky1ps.pdf' },
        ],
      },
      {
        subj:'Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Kriti — Class 6', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/fekr1ps.pdf' },
        ],
      },
      {
        subj:'Curriculum',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CBSE Curriculum Framework: Computational Thinking & AI (Classes III–VIII) 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Pri_2026-27.pdf',
          },
        ],
      },
    ],
    c7:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'NCERT Ganita Prakash Part I — Class 7',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/gegp1ps.pdf',
          },
          {
            title:'NCERT Ganita Prakash Part II — Class 7',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/gegp2ps.pdf',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          { title:'NCERT Curiosity — Class 7', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/gecu1ps.pdf' },
        ],
      },
      {
        subj:'Social Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'NCERT Exploring Society: India and Beyond Part I — Class 7',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/gees1ps.pdf',
          },
          {
            title:'NCERT Exploring Society: India and Beyond Part II — Class 7',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/gees2ps.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          { title:'NCERT Poorvi — Class 7', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/gepr1ps.pdf' },
        ],
      },
      {
        subj:'Hindi',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Malhar (मल्हार) — Class 7', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/ghml1ps.pdf' },
        ],
      },
      {
        subj:'Sanskrit',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Deepakam (दीपकम्) — Class 7', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/gsde1ps.pdf' },
        ],
      },
      {
        subj:'Vocational Education',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Kaushal Bodh — Class 7', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/gekb1ps.pdf' },
        ],
      },
      {
        subj:'Physical Education & Well-being',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          { title:'NCERT Khel Yatra — Class 7', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/geky1ps.pdf' },
        ],
      },
      {
        subj:'Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Kriti — Class 7', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/gekr1ps.pdf' },
        ],
      },
      {
        subj:'Curriculum',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CBSE Curriculum Framework: Computational Thinking & AI (Classes III–VIII) 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Pri_2026-27.pdf',
          },
        ],
      },
    ],
    c8:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'NCERT Ganita Prakash Part I — Class 8',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/hegp1ps.pdf',
          },
          {
            title:'NCERT Ganita Prakash Part II — Class 8',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/hegp2ps.pdf',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          { title:'NCERT Curiosity — Class 8', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/hecu1ps.pdf' },
        ],
      },
      {
        subj:'Social Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'NCERT Exploring Society: India and Beyond Part I — Class 8',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/hees1ps.pdf',
          },
          {
            title:'NCERT Exploring Society: India and Beyond Part II — Class 8',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/hees2ps.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          { title:'NCERT Poorvi — Class 8', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/hepr1ps.pdf' },
        ],
      },
      {
        subj:'Hindi',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Malhar (मल्हार) — Class 8', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/hhml1ps.pdf' },
        ],
      },
      {
        subj:'Sanskrit',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Deepakam (दीपकम्) — Class 8', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/hsde1ps.pdf' },
        ],
      },
      {
        subj:'Vocational Education',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Kaushal Bodh — Class 8', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/hekb1ps.pdf' },
        ],
      },
      {
        subj:'Physical Education & Well-being',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          { title:'NCERT Khel Yatra — Class 8', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/heky1ps.pdf' },
        ],
      },
      {
        subj:'Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Kriti — Class 8', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/hekr1ps.pdf' },
        ],
      },
      {
        subj:'Curriculum',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CBSE Curriculum Framework: Computational Thinking & AI (Classes III–VIII) 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Pri_2026-27.pdf',
          },
        ],
      },
    ],
    c9:[
      {
        subj:'Curriculum',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CBSE Secondary Curriculum Part 1 (Class IX) 2026-27 — Introduction',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/Curriculum_SecP1_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'NCERT Ganita Manjari Part I — Class 9',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/iemh1ps.pdf',
          },
          {
            title:'CBSE Mathematics Class IX syllabus 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/Maths_SecP1IX_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          { title:'NCERT Exploration — Class 9', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/iesc1ps.pdf' },
          {
            title:'CBSE Science Class IX syllabus 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/ScienceSt_SecP1_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Social Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'NCERT Understanding Society: India and Beyond Part I — Class 9',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/iest1ps.pdf',
          },
          {
            title:'CBSE Social Science Class IX syllabus 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/SocialScience_SecP1IX_2026-27.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          { title:'NCERT Kaveri — Class 9', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/iebe1ps.pdf' },
          {
            title:'CBSE English Class IX syllabus 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/English_LL_SecP1IX_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Hindi',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Ganga (गंगा) — Class 9', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/ihga1ps.pdf' },
          {
            title:'CBSE Hindi Class IX syllabus 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/Hindi_SecP1IX_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Sanskrit',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Sharada (शारदा) — Class 9', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/ihsh1ps.pdf' },
          {
            title:'CBSE Sanskrit Class IX syllabus 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/Sanskrit_SecP1IX_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Physical Education & Well-being',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          { title:'NCERT Khel Praveen — Class 9', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/iehp1ps.pdf' },
        ],
      },
      {
        subj:'Vocational Education',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Kaushal Vikas — Class 9', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/iekv1ps.pdf' },
        ],
      },
      {
        subj:'Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Madhurima — Class 9', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/iemr1ps.pdf' },
        ],
      },
      {
        subj:'Information Technology (402)',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'CBSE Information Technology (402) Class IX curriculum 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/Curriculum27/sec/402-IT-IX.pdf',
          },
        ],
      },
      {
        subj:'Artificial Intelligence (417)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CBSE Artificial Intelligence (417) Class IX curriculum 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/Curriculum27/sec/417-AI-IX.pdf',
          },
        ],
      },
    ],
    c10:[
      {
        subj:'Curriculum',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CBSE Secondary Curriculum Part 1 (Class X) 2026-27 — Introduction',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/Curriculum_SecP1_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'NCERT Mathematics — Class 10', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/jemh1ps.pdf' },
          {
            title:'CBSE Mathematics Class X syllabus 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/Maths_SecP1X_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          { title:'NCERT Science — Class 10', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/jesc1ps.pdf' },
          {
            title:'CBSE Science Class X syllabus 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/Science_SecP1_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Social Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'NCERT India and the Contemporary World II (History) — Class 10',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/jess3ps.pdf',
          },
          {
            title:'NCERT Contemporary India II (Geography) — Class 10',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/jess1ps.pdf',
          },
          {
            title:'NCERT Democratic Politics II — Class 10',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/jess4ps.pdf',
          },
          {
            title:'NCERT Understanding Economic Development — Class 10',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/jess2ps.pdf',
          },
          {
            title:'CBSE Social Science Class X syllabus 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/SocialScience_SecP1X_2026-27.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          { title:'NCERT First Flight — Class 10', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/jeff1ps.pdf' },
          {
            title:'NCERT Footprints without Feet — Class 10',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/jefp1ps.pdf',
          },
        ],
      },
      {
        subj:'Hindi',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'NCERT Kshitij Bhag 2 (क्षितिज) — Class 10',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/jhks1ps.pdf',
          },
          {
            title:'NCERT Kritika Bhag 2 (कृतिका) — Class 10',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/jhkr1ps.pdf',
          },
          {
            title:'NCERT Sparsh Bhag 2 (स्पर्श) — Class 10',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/jhsp1ps.pdf',
          },
          {
            title:'NCERT Sanchayan Bhag 2 (संचयन) — Class 10',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/jhsy1ps.pdf',
          },
        ],
      },
      {
        subj:'Sanskrit',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'NCERT Shemushi Bhag 2 (शेमुषी) — Class 10',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/jhsk1ps.pdf',
          },
        ],
      },
      {
        subj:'Information Technology (402)',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'CBSE Information Technology (402) Class X curriculum 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/Curriculum27/sec/402-IT-X.pdf',
          },
        ],
      },
      {
        subj:'Artificial Intelligence (417)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CBSE Artificial Intelligence (417) Class X curriculum 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/Curriculum27/sec/417-AI-X.pdf',
          },
        ],
      },
    ],
    c11:[
      {
        subj:'Curriculum',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CBSE Secondary Curriculum Part 2 (Classes XI–XII) 2026-27 — Introduction',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Curriculum_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          { title:'NCERT Physics Part I — Class 11', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/keph1ps.pdf' },
          { title:'NCERT Physics Part II — Class 11', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/keph2ps.pdf' },
          {
            title:'CBSE Physics syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Physics_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          { title:'NCERT Chemistry Part I — Class 11', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/kech1ps.pdf' },
          { title:'NCERT Chemistry Part II — Class 11', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/kech2ps.pdf' },
          {
            title:'CBSE Chemistry syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Chemistry_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          { title:'NCERT Biology — Class 11', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/kebo1ps.pdf' },
          {
            title:'CBSE Biology syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Biology_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'NCERT Mathematics — Class 11', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/kemh1ps.pdf' },
          {
            title:'CBSE Maths syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Maths_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Applied Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'CBSE Applied Mathematics syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Applied_Mathematics_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Computer Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          { title:'NCERT Computer Science — Class 11', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/kecs1ps.pdf' },
          {
            title:'CBSE Computer Science syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Computer_Science_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Informatics Practices',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'NCERT Informatics Practices — Class 11',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/keip1ps.pdf',
          },
          {
            title:'CBSE Informatics Practices syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Informatics_Practices_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Biotechnology',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Biotechnology — Class 11', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/kebt1ps.pdf' },
          {
            title:'CBSE BioTechnology syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/BioTechnology_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Accountancy',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'NCERT Financial Accounting Part I — Class 11',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/keac1ps.pdf',
          },
          {
            title:'NCERT Accountancy Part II — Class 11',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/keac2ps.pdf',
          },
          {
            title:'CBSE Accountancy syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Accountancy_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Business Studies',
        icon:'📊',
        color:'#A855F7',
        books:[
          { title:'NCERT Business Studies — Class 11', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/kebs1ps.pdf' },
          {
            title:'CBSE BusinessStudies syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/BusinessStudies_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'NCERT Statistics for Economics — Class 11',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/kest1ps.pdf',
          },
          {
            title:'NCERT Introductory Microeconomics — Class 12 book (CBSE Class 11 Part B)',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/leec2ps.pdf',
          },
          {
            title:'CBSE Economics syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Economics_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'NCERT Themes in World History — Class 11',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/kehs1ps.pdf',
          },
          {
            title:'CBSE History syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/History_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'NCERT Fundamentals of Physical Geography — Class 11',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/kegy2ps.pdf',
          },
          {
            title:'NCERT India: Physical Environment — Class 11',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/kegy1ps.pdf',
          },
          {
            title:'NCERT Practical Work in Geography — Class 11',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/kegy3ps.pdf',
          },
          {
            title:'CBSE Geography syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Geography_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Political Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'NCERT Indian Constitution at Work — Class 11',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/keps2ps.pdf',
          },
          { title:'NCERT Political Theory — Class 11', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/keps1ps.pdf' },
          {
            title:'CBSE PoliticalScience syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/PoliticalScience_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Psychology',
        icon:'💭',
        color:'#64748B',
        books:[
          {
            title:'NCERT Introduction to Psychology — Class 11',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/kepy1ps.pdf',
          },
          {
            title:'CBSE Psychology syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Psychology_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Sociology',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'NCERT Introducing Sociology — Class 11',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/kesy1ps.pdf',
          },
          {
            title:'NCERT Understanding Society — Class 11',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/kesy2ps.pdf',
          },
          {
            title:'CBSE Sociology syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Sociology_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Fine Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'NCERT An Introduction to Indian Art Part I — Class 11',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/kefa1ps.pdf',
          },
          {
            title:'CBSE Fine Arts syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Fine_Arts_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Home Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'NCERT Human Ecology and Family Sciences Part I — Class 11',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/kehe1ps.pdf',
          },
          {
            title:'NCERT Human Ecology and Family Sciences Part II — Class 11',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/kehe2ps.pdf',
          },
          {
            title:'CBSE Home Science syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Home_Science_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'NCERT Health and Physical Education — Class 11',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/kehp1ps.pdf',
          },
          {
            title:'CBSE PhysicalEducation syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/PhysicalEducation_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Legal Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CBSE LegalStudies syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/LegalStudies_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Entrepreneurship',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CBSE Enterprenuership syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Enterprenuership_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'English Core',
        icon:'📚',
        color:'#F97316',
        books:[
          { title:'NCERT Hornbill — Class 11', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/kehb1ps.pdf' },
          { title:'NCERT Snapshots — Class 11', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/kesp1ps.pdf' },
          {
            title:'CBSE English core syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/English_core_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'English Elective',
        icon:'📚',
        color:'#F97316',
        books:[
          { title:'NCERT Woven Words — Class 11', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/keww1ps.pdf' },
          {
            title:'CBSE English elective syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/English_elective_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Hindi Core',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'NCERT Aroh Bhag 1 (आरोह) — Class 11',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/khar1ps.pdf',
          },
          {
            title:'NCERT Vitan Bhag 1 (वितान) — Class 11',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/khvt1ps.pdf',
          },
          {
            title:'CBSE Hindi Core syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Hindi_Core_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Sanskrit',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'NCERT Bhaswati Bhag 1 (भास्वती) — Class 11',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/khsk1ps.pdf',
          },
          {
            title:'CBSE Sanskrit Core syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Sanskrit_Core_SecP2_2026-27.pdf',
          },
        ],
      },
    ],
    c12:[
      {
        subj:'Curriculum',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CBSE Secondary Curriculum Part 2 (Classes XI–XII) 2026-27 — Introduction',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Curriculum_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          { title:'NCERT Physics Part I — Class 12', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/leph1ps.pdf' },
          { title:'NCERT Physics Part II — Class 12', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/leph2ps.pdf' },
          {
            title:'CBSE Physics syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Physics_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          { title:'NCERT Chemistry Part I — Class 12', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/lech1ps.pdf' },
          { title:'NCERT Chemistry Part II — Class 12', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/lech2ps.pdf' },
          {
            title:'CBSE Chemistry syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Chemistry_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          { title:'NCERT Biology — Class 12', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/lebo1ps.pdf' },
          {
            title:'CBSE Biology syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Biology_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'NCERT Mathematics Part I — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/lemh1ps.pdf',
          },
          {
            title:'NCERT Mathematics Part II — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/lemh2ps.pdf',
          },
          {
            title:'CBSE Maths syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Maths_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Applied Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'CBSE Applied Mathematics syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Applied_Mathematics_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Computer Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          { title:'NCERT Computer Science — Class 12', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/lecs1ps.pdf' },
          {
            title:'CBSE Computer Science syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Computer_Science_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Informatics Practices',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'NCERT Informatics Practices — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/leip1ps.pdf',
          },
          {
            title:'CBSE Informatics Practices syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Informatics_Practices_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Biotechnology',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Biotechnology — Class 12', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/lebt1ps.pdf' },
          {
            title:'CBSE BioTechnology syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/BioTechnology_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Accountancy',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'NCERT Accountancy Part I — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/leac1ps.pdf',
          },
          {
            title:'NCERT Accountancy Part II — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/leac2ps.pdf',
          },
          {
            title:'CBSE Accountancy syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Accountancy_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Business Studies',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'NCERT Business Studies Part I — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/lebs1ps.pdf',
          },
          {
            title:'NCERT Business Studies Part II — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/lebs2ps.pdf',
          },
          {
            title:'CBSE BusinessStudies syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/BusinessStudies_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'NCERT Introductory Macroeconomics — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/leec1ps.pdf',
          },
          {
            title:'NCERT Indian Economic Development — Class 11 (CBSE Class 12 Part B)',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/keec1ps.pdf',
          },
          {
            title:'CBSE Economics syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Economics_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'NCERT Themes in Indian History Part I — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/lehs1ps.pdf',
          },
          {
            title:'NCERT Themes in Indian History Part II — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/lehs2ps.pdf',
          },
          {
            title:'NCERT Themes in Indian History Part III — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/lehs3ps.pdf',
          },
          {
            title:'CBSE History syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/History_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'NCERT Fundamentals of Human Geography — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/legy1ps.pdf',
          },
          {
            title:'NCERT India: People and Economy — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/legy2ps.pdf',
          },
          {
            title:'NCERT Practical Work in Geography Part II — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/legy3ps.pdf',
          },
          {
            title:'CBSE Geography syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Geography_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Political Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'NCERT Contemporary World Politics — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/leps1ps.pdf',
          },
          {
            title:'NCERT Politics in India since Independence — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/leps2ps.pdf',
          },
          {
            title:'CBSE PoliticalScience syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/PoliticalScience_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Psychology',
        icon:'💭',
        color:'#64748B',
        books:[
          { title:'NCERT Psychology — Class 12', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/lepy1ps.pdf' },
          {
            title:'CBSE Psychology syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Psychology_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Sociology',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'NCERT Indian Society — Class 12', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/lesy1ps.pdf' },
          {
            title:'NCERT Social Change and Development in India — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/lesy2ps.pdf',
          },
          {
            title:'CBSE Sociology syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Sociology_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Fine Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'NCERT An Introduction to Indian Art Part II — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/lefa1ps.pdf',
          },
          {
            title:'CBSE Fine Arts syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Fine_Arts_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Home Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'NCERT Human Ecology and Family Sciences Part I — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/lehe1ps.pdf',
          },
          {
            title:'NCERT Human Ecology and Family Sciences Part II — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/lehe2ps.pdf',
          },
          {
            title:'CBSE Home Science syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Home_Science_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'CBSE PhysicalEducation syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/PhysicalEducation_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Legal Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CBSE LegalStudies syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/LegalStudies_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Entrepreneurship',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CBSE Enterprenuership syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Enterprenuership_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'English Core',
        icon:'📚',
        color:'#F97316',
        books:[
          { title:'NCERT Flamingo — Class 12', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/lefl1ps.pdf' },
          { title:'NCERT Vistas — Class 12', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/levt1ps.pdf' },
          {
            title:'CBSE English core syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/English_core_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'English Elective',
        icon:'📚',
        color:'#F97316',
        books:[
          { title:'NCERT Kaleidoscope — Class 12', term:'CBSE / NCERT', url:'https://ncert.nic.in/textbook/pdf/lekl1ps.pdf' },
          {
            title:'CBSE English elective syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/English_elective_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Hindi Core',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'NCERT Aroh Bhag 2 (आरोह) — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/lhar1ps.pdf',
          },
          {
            title:'NCERT Vitan Bhag 2 (वितान) — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/lhvt1ps.pdf',
          },
          {
            title:'CBSE Hindi Core syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Hindi_Core_SecP2_2026-27.pdf',
          },
        ],
      },
      {
        subj:'Sanskrit',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'NCERT Bhaswati Bhag 2 (भास्वती) — Class 12',
            term:'CBSE / NCERT',
            url:'https://ncert.nic.in/textbook/pdf/lhsk1ps.pdf',
          },
          {
            title:'CBSE Sanskrit Core syllabus XI–XII 2026-27',
            term:'CBSE / NCERT',
            url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Sanskrit_Core_SecP2_2026-27.pdf',
          },
        ],
      },
    ],
  },
  icse:{
    c1:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Hindi (Second Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Environmental Studies (EVS)',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Computer Studies',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Arts Education',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
    ],
    c2:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Hindi (Second Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Environmental Studies (EVS)',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Computer Studies',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Arts Education',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
    ],
    c3:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Hindi (Second Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Computer Studies',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Arts Education',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
    ],
    c4:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Hindi (Second Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Computer Studies',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Arts Education',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
    ],
    c5:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Hindi (Second Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Computer Studies',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
      {
        subj:'Arts Education',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CISCE Curriculum for Primary Classes (I-V)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/PrimaryCurriculum.pdf',
          },
        ],
      },
    ],
    c6:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Hindi (Second Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'History & Civics',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Computer Studies',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Arts Education',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
    ],
    c7:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Hindi (Second Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'History & Civics',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Computer Studies',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Arts Education',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
    ],
    c8:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Hindi (Second Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'History & Civics',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Computer Studies',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
      {
        subj:'Arts Education',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'CISCE Curriculum for Upper Primary Classes (VI-VIII)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/pdf/Curiculum-Preschool-Class-VIII/UpperPrimary.pdf',
          },
        ],
      },
    ],
    c9:[
      {
        subj:'Regulations',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Regulations',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/1.-Regulations.pdf',
          },
        ],
      },
      {
        subj:'English Language (English Paper 1)',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'ICSE 2027 English Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/2.-English.pdf',
          },
        ],
      },
      {
        subj:'Literature in English (English Paper 2)',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'ICSE 2027 English Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/2.-English.pdf',
          },
        ],
      },
      {
        subj:'Hindi (Second Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'ICSE 2027 Second Languages Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/3.-Second-Languages.pdf',
          },
        ],
      },
      {
        subj:'History & Civics',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'ICSE 2027 History & Civics Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/03/ICSE-History-Civics.pdf',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'ICSE 2027 Geography Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/03/ICSE-Geography.pdf',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'ICSE 2027 Mathematics Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/9.-Mathematics.pdf',
          },
          {
            title:'NCERT Mathematics Class 9 (free official e-textbook)',
            term:'CISCE (ICSE / ISC)',
            url:'https://ncert.nic.in/textbook.php?iemh1=0-12',
          },
        ],
      },
      {
        subj:'Physics (Science Paper 1)',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'ICSE 2027 Physics Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/10.-Physics.pdf',
          },
          {
            title:'NCERT Science Class 9 (free official e-textbook)',
            term:'CISCE (ICSE / ISC)',
            url:'https://ncert.nic.in/textbook.php?iesc1=0-12',
          },
        ],
      },
      {
        subj:'Chemistry (Science Paper 2)',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'ICSE 2027 Chemistry Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/11.-Chemistry.pdf',
          },
          {
            title:'NCERT Science Class 9 (free official e-textbook)',
            term:'CISCE (ICSE / ISC)',
            url:'https://ncert.nic.in/textbook.php?iesc1=0-12',
          },
        ],
      },
      {
        subj:'Biology (Science Paper 3)',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'ICSE 2027 Biology Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/12.-Biology.pdf',
          },
          {
            title:'NCERT Science Class 9 (free official e-textbook)',
            term:'CISCE (ICSE / ISC)',
            url:'https://ncert.nic.in/textbook.php?iesc1=0-12',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Economics Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/13.-Economics.pdf',
          },
        ],
      },
      {
        subj:'Commercial Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Commercial Studies Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/14.-Commercial-Studies.pdf',
          },
        ],
      },
      {
        subj:'Modern Foreign Language (French)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'ICSE 2027 Modern Foreign Languages (Group II) Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/15.-Modern-Foreign-Languages-Group-II.pdf',
          },
        ],
      },
      {
        subj:'Classical Language (Sanskrit)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'ICSE 2027 Classical Language Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/16.-Classical-Language.pdf',
          },
        ],
      },
      {
        subj:'Environmental Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ICSE 2027 Environmental Science Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/17.-Environmental-Science.pdf',
          },
        ],
      },
      {
        subj:'Computer Applications',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'ICSE 2027 Computer Applications Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/18.-Computer-Applications.pdf',
          },
        ],
      },
      {
        subj:'Economic Applications',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Economic Applications Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/19.-Economic-Applications.pdf',
          },
        ],
      },
      {
        subj:'Commercial Applications',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Commercial Applications Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/20.-Commercial-Applications.pdf',
          },
        ],
      },
      {
        subj:'Art',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Art Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/21.-Art.pdf',
          },
        ],
      },
      {
        subj:'Performing Arts (Music)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Performing Arts Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/22.-Performing-Arts.pdf',
          },
        ],
      },
      {
        subj:'Home Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ICSE 2027 Home Science Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/23.-Home-Science.pdf',
          },
        ],
      },
      {
        subj:'Cookery',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Cookery Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/24.-Cookery.pdf',
          },
        ],
      },
      {
        subj:'Fashion Designing',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Fashion Designing Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/25.-Fashion-Designing.pdf',
          },
        ],
      },
      {
        subj:'Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'ICSE 2027 Physical Education Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/26.-Physical-Education.pdf',
          },
        ],
      },
      {
        subj:'Yoga',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Yoga Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/27.-Yoga.pdf',
          },
        ],
      },
      {
        subj:'Technical Drawing Applications',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Technical Drawing Applications Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/28.-Technical-Drawing-Applications.pdf',
          },
        ],
      },
      {
        subj:'Environmental Applications',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'ICSE 2027 Environmental Applications Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/29.-Environmental-Applications.pdf',
          },
        ],
      },
      {
        subj:'Mass Media & Communication',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Mass Media & Communication Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/31.-Mass-Media-Communication.pdf',
          },
        ],
      },
      {
        subj:'Robotics & Artificial Intelligence',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Robotics & AI Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/1.-ICSE_Robotics-AI-.docx.pdf',
          },
        ],
      },
    ],
    c10:[
      {
        subj:'Regulations',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Regulations',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/1.-Regulations.pdf',
          },
        ],
      },
      {
        subj:'English Language (English Paper 1)',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'ICSE 2027 English Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/2.-English.pdf',
          },
        ],
      },
      {
        subj:'Literature in English (English Paper 2)',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'ICSE 2027 English Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/2.-English.pdf',
          },
        ],
      },
      {
        subj:'Hindi (Second Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'ICSE 2027 Second Languages Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/3.-Second-Languages.pdf',
          },
        ],
      },
      {
        subj:'History & Civics',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'ICSE 2027 History & Civics Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/03/ICSE-History-Civics.pdf',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'ICSE 2027 Geography Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/03/ICSE-Geography.pdf',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'ICSE 2027 Mathematics Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/9.-Mathematics.pdf',
          },
          {
            title:'NCERT Mathematics Class 10 (free official e-textbook)',
            term:'CISCE (ICSE / ISC)',
            url:'https://ncert.nic.in/textbook.php?jemh1=0-14',
          },
        ],
      },
      {
        subj:'Physics (Science Paper 1)',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'ICSE 2027 Physics Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/10.-Physics.pdf',
          },
          {
            title:'NCERT Science Class 10 (free official e-textbook)',
            term:'CISCE (ICSE / ISC)',
            url:'https://ncert.nic.in/textbook.php?jesc1=0-13',
          },
        ],
      },
      {
        subj:'Chemistry (Science Paper 2)',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'ICSE 2027 Chemistry Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/11.-Chemistry.pdf',
          },
          {
            title:'NCERT Science Class 10 (free official e-textbook)',
            term:'CISCE (ICSE / ISC)',
            url:'https://ncert.nic.in/textbook.php?jesc1=0-13',
          },
        ],
      },
      {
        subj:'Biology (Science Paper 3)',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'ICSE 2027 Biology Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/12.-Biology.pdf',
          },
          {
            title:'NCERT Science Class 10 (free official e-textbook)',
            term:'CISCE (ICSE / ISC)',
            url:'https://ncert.nic.in/textbook.php?jesc1=0-13',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Economics Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/13.-Economics.pdf',
          },
        ],
      },
      {
        subj:'Commercial Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Commercial Studies Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/14.-Commercial-Studies.pdf',
          },
        ],
      },
      {
        subj:'Modern Foreign Language (French)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'ICSE 2027 Modern Foreign Languages (Group II) Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/15.-Modern-Foreign-Languages-Group-II.pdf',
          },
        ],
      },
      {
        subj:'Classical Language (Sanskrit)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'ICSE 2027 Classical Language Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/16.-Classical-Language.pdf',
          },
        ],
      },
      {
        subj:'Environmental Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ICSE 2027 Environmental Science Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/17.-Environmental-Science.pdf',
          },
        ],
      },
      {
        subj:'Computer Applications',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'ICSE 2027 Computer Applications Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/18.-Computer-Applications.pdf',
          },
        ],
      },
      {
        subj:'Economic Applications',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Economic Applications Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/19.-Economic-Applications.pdf',
          },
        ],
      },
      {
        subj:'Commercial Applications',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Commercial Applications Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/20.-Commercial-Applications.pdf',
          },
        ],
      },
      {
        subj:'Art',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Art Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/21.-Art.pdf',
          },
        ],
      },
      {
        subj:'Performing Arts (Music)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Performing Arts Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/22.-Performing-Arts.pdf',
          },
        ],
      },
      {
        subj:'Home Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ICSE 2027 Home Science Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/23.-Home-Science.pdf',
          },
        ],
      },
      {
        subj:'Cookery',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Cookery Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/24.-Cookery.pdf',
          },
        ],
      },
      {
        subj:'Fashion Designing',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Fashion Designing Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/25.-Fashion-Designing.pdf',
          },
        ],
      },
      {
        subj:'Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'ICSE 2027 Physical Education Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/26.-Physical-Education.pdf',
          },
        ],
      },
      {
        subj:'Yoga',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Yoga Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/27.-Yoga.pdf',
          },
        ],
      },
      {
        subj:'Technical Drawing Applications',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Technical Drawing Applications Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/28.-Technical-Drawing-Applications.pdf',
          },
        ],
      },
      {
        subj:'Environmental Applications',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'ICSE 2027 Environmental Applications Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/29.-Environmental-Applications.pdf',
          },
        ],
      },
      {
        subj:'Mass Media & Communication',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Mass Media & Communication Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/31.-Mass-Media-Communication.pdf',
          },
        ],
      },
      {
        subj:'Robotics & Artificial Intelligence',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ICSE 2027 Robotics & AI Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/1.-ICSE_Robotics-AI-.docx.pdf',
          },
        ],
      },
    ],
    c11:[
      {
        subj:'Regulations',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Regulations',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/1.-ISC-Regulations.pdf',
          },
        ],
      },
      {
        subj:'English (801)',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'ISC 2027 English Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/2.-ISC-English.pdf',
          },
        ],
      },
      {
        subj:'Hindi (ISC Indian Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'ISC 2027 Indian Languages Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/4.-ISC-Indian-Languages.pdf',
          },
        ],
      },
      {
        subj:'Elective English (850)',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'ISC 2027 Elective English Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/7.-ISC-Elective-English.pdf',
          },
        ],
      },
      {
        subj:'History (851)',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'ISC 2027 History Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/8.-ISC-History.pdf',
          },
          {
            title:'OpenStax World History Volume 2 (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/world-history-volume-2',
          },
        ],
      },
      {
        subj:'Political Science (852)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ISC 2027 Political Science Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/9.-ISC-Political-Science.pdf',
          },
          {
            title:'OpenStax Introduction to Political Science (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/introduction-political-science',
          },
        ],
      },
      {
        subj:'Geography (853)',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'ISC 2027 Geography Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/10.-ISC-Geography.pdf',
          },
        ],
      },
      {
        subj:'Sociology (854)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Sociology Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/11.-ISC-Sociology.pdf',
          },
          {
            title:'OpenStax Introduction to Sociology 3e (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/introduction-sociology-3e',
          },
        ],
      },
      {
        subj:'Psychology (855)',
        icon:'💭',
        color:'#64748B',
        books:[
          {
            title:'ISC 2027 Psychology Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/12.-Psychology.pdf',
          },
          {
            title:'OpenStax Psychology 2e (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/psychology-2e',
          },
        ],
      },
      {
        subj:'Economics (856)',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Economics Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/13.-ISC-Economics.pdf',
          },
          {
            title:'NCERT Indian Economic Development Class 11 (free official e-textbook)',
            term:'CISCE (ICSE / ISC)',
            url:'https://ncert.nic.in/textbook.php?keec1=0-9',
          },
          {
            title:'NCERT Statistics for Economics Class 11 (free official e-textbook)',
            term:'CISCE (ICSE / ISC)',
            url:'https://ncert.nic.in/textbook.php?kest1=0-9',
          },
          {
            title:'OpenStax Principles of Economics 3e (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/principles-economics-3e',
          },
        ],
      },
      {
        subj:'Commerce (857)',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Commerce Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/14.-ISC-Commerce.doc.pdf',
          },
          {
            title:'OpenStax Introduction to Business (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/introduction-business',
          },
        ],
      },
      {
        subj:'Accounts (858)',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Accountancy Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/15.-ISC-Accountancy.docx.pdf',
          },
          {
            title:'OpenStax Principles of Accounting Vol 1: Financial Accounting (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/principles-financial-accounting',
          },
        ],
      },
      {
        subj:'Business Studies (859)',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Business Studies Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/16.-ISC-Business-Studies.pdf',
          },
          {
            title:'OpenStax Introduction to Business (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/introduction-business',
          },
          {
            title:'OpenStax Principles of Management (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/principles-management',
          },
        ],
      },
      {
        subj:'Mathematics (860)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'ISC 2027 Mathematics Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/17.-ISC-Mathematics.pdf',
          },
          {
            title:'NCERT Mathematics Class 11 (free official e-textbook)',
            term:'CISCE (ICSE / ISC)',
            url:'https://ncert.nic.in/textbook.php?kemh1=0-14',
          },
          {
            title:'OpenStax Precalculus 2e (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/precalculus-2e',
          },
          {
            title:'OpenStax Calculus Volume 1 (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/calculus-volume-1',
          },
        ],
      },
      {
        subj:'Physics (861)',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'ISC 2027 Physics Syllabus (revised)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2026/02/ISC-2027-Physics.pdf',
          },
          {
            title:'NCERT Physics Class 11 Part 1 (free official e-textbook)',
            term:'CISCE (ICSE / ISC)',
            url:'https://ncert.nic.in/textbook.php?keph1=0-7',
          },
          {
            title:'OpenStax College Physics 2e (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/college-physics-2e',
          },
          {
            title:'OpenStax University Physics Volume 1 (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/university-physics-volume-1',
          },
        ],
      },
      {
        subj:'Chemistry (862)',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'ISC 2027 Chemistry Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/19.-ISC-Chemistry.pdf',
          },
          {
            title:'NCERT Chemistry Class 11 Part 1 (free official e-textbook)',
            term:'CISCE (ICSE / ISC)',
            url:'https://ncert.nic.in/textbook.php?kech1=0-6',
          },
          {
            title:'OpenStax Chemistry 2e (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/chemistry-2e',
          },
        ],
      },
      {
        subj:'Biology (863)',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'ISC 2027 Biology Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/20.-ISC-Biology.pdf',
          },
          {
            title:'NCERT Biology Class 11 (free official e-textbook)',
            term:'CISCE (ICSE / ISC)',
            url:'https://ncert.nic.in/textbook.php?kebo1=0-19',
          },
          {
            title:'OpenStax Biology 2e (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/biology-2e',
          },
        ],
      },
      {
        subj:'Home Science (864)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ISC 2027 Home Science Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/21.-ISC-Home-Science.pdf',
          },
        ],
      },
      {
        subj:'Fashion Designing (865)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Fashion Designing Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/22.-ISC-Fashion-Designing.doc.pdf',
          },
        ],
      },
      {
        subj:'Computer Science (868)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ISC 2027 Computer Science Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/25.-ISC-Computer-Science.doc.pdf',
          },
        ],
      },
      {
        subj:'Art (871-875)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Art Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/28.-ISC-Art.doc.pdf',
          },
        ],
      },
      {
        subj:'Music - Hindustani (876)',
        icon:'🕊️',
        color:'#84CC16',
        books:[
          {
            title:'ISC 2027 Music Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/29.-ISC-Music.doc.pdf',
          },
        ],
      },
      {
        subj:'Physical Education (879)',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'ISC 2027 Physical Education Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/30.-ISC-Physical-Education.pdf',
          },
        ],
      },
      {
        subj:'Environmental Science (880)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ISC 2027 Environmental Science Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/31.-ISC-Environmental-Science.pdf',
          },
        ],
      },
      {
        subj:'Biotechnology (881)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Biotechnology Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/32.-ISC-Biotechnology.docx.pdf',
          },
          {
            title:'OpenStax Microbiology (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/microbiology',
          },
        ],
      },
      {
        subj:'Mass Media & Communication (882)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Mass Media & Communication Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/33.-ISC-Mass-Media-Communication.pdf',
          },
        ],
      },
      {
        subj:'Legal Studies (884)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Legal Studies Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/03/ISC-Legal-Studies.doc.pdf',
          },
          {
            title:'OpenStax Business Law I Essentials (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/business-law-i-essentials',
          },
        ],
      },
      {
        subj:'Artificial Intelligence',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Artificial Intelligence Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/36.-ISC-Artificial-Intelligence.pdf',
          },
        ],
      },
    ],
    c12:[
      {
        subj:'Regulations',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Regulations',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/1.-ISC-Regulations.pdf',
          },
        ],
      },
      {
        subj:'English (801)',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'ISC 2027 English Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/2.-ISC-English.pdf',
          },
        ],
      },
      {
        subj:'Hindi (ISC Indian Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'ISC 2027 Indian Languages Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/4.-ISC-Indian-Languages.pdf',
          },
        ],
      },
      {
        subj:'Elective English (850)',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'ISC 2027 Elective English Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/7.-ISC-Elective-English.pdf',
          },
        ],
      },
      {
        subj:'History (851)',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'ISC 2027 History Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/8.-ISC-History.pdf',
          },
          {
            title:'OpenStax World History Volume 2 (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/world-history-volume-2',
          },
        ],
      },
      {
        subj:'Political Science (852)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ISC 2027 Political Science Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/9.-ISC-Political-Science.pdf',
          },
          {
            title:'OpenStax Introduction to Political Science (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/introduction-political-science',
          },
        ],
      },
      {
        subj:'Geography (853)',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'ISC 2027 Geography Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/10.-ISC-Geography.pdf',
          },
        ],
      },
      {
        subj:'Sociology (854)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Sociology Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/11.-ISC-Sociology.pdf',
          },
          {
            title:'OpenStax Introduction to Sociology 3e (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/introduction-sociology-3e',
          },
        ],
      },
      {
        subj:'Psychology (855)',
        icon:'💭',
        color:'#64748B',
        books:[
          {
            title:'ISC 2027 Psychology Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/12.-Psychology.pdf',
          },
          {
            title:'OpenStax Psychology 2e (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/psychology-2e',
          },
        ],
      },
      {
        subj:'Economics (856)',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Economics Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/13.-ISC-Economics.pdf',
          },
          {
            title:'OpenStax Principles of Economics 3e (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/principles-economics-3e',
          },
        ],
      },
      {
        subj:'Commerce (857)',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Commerce Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/14.-ISC-Commerce.doc.pdf',
          },
          {
            title:'OpenStax Introduction to Business (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/introduction-business',
          },
        ],
      },
      {
        subj:'Accounts (858)',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Accountancy Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/15.-ISC-Accountancy.docx.pdf',
          },
          {
            title:'OpenStax Principles of Accounting Vol 1: Financial Accounting (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/principles-financial-accounting',
          },
        ],
      },
      {
        subj:'Business Studies (859)',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Business Studies Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/16.-ISC-Business-Studies.pdf',
          },
          {
            title:'OpenStax Introduction to Business (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/introduction-business',
          },
          {
            title:'OpenStax Principles of Management (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/principles-management',
          },
        ],
      },
      {
        subj:'Mathematics (860)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'ISC 2027 Mathematics Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/17.-ISC-Mathematics.pdf',
          },
          {
            title:'NCERT Mathematics Class 12 Part 1 (free official e-textbook)',
            term:'CISCE (ICSE / ISC)',
            url:'https://ncert.nic.in/textbook.php?lemh1=0-6',
          },
          {
            title:'NCERT Mathematics Class 12 Part 2 (free official e-textbook)',
            term:'CISCE (ICSE / ISC)',
            url:'https://ncert.nic.in/textbook.php?lemh2=0-7',
          },
          {
            title:'OpenStax Precalculus 2e (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/precalculus-2e',
          },
          {
            title:'OpenStax Calculus Volume 1 (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/calculus-volume-1',
          },
        ],
      },
      {
        subj:'Physics (861)',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'ISC 2027 Physics Syllabus (revised)',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2026/02/ISC-2027-Physics.pdf',
          },
          {
            title:'NCERT Physics Class 12 Part 1 (free official e-textbook)',
            term:'CISCE (ICSE / ISC)',
            url:'https://ncert.nic.in/textbook.php?leph1=0-8',
          },
          {
            title:'OpenStax College Physics 2e (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/college-physics-2e',
          },
          {
            title:'OpenStax University Physics Volume 1 (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/university-physics-volume-1',
          },
        ],
      },
      {
        subj:'Chemistry (862)',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'ISC 2027 Chemistry Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/19.-ISC-Chemistry.pdf',
          },
          {
            title:'NCERT Chemistry Class 12 Part 1 (free official e-textbook)',
            term:'CISCE (ICSE / ISC)',
            url:'https://ncert.nic.in/textbook.php?lech1=0-5',
          },
          {
            title:'OpenStax Chemistry 2e (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/chemistry-2e',
          },
        ],
      },
      {
        subj:'Biology (863)',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'ISC 2027 Biology Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/20.-ISC-Biology.pdf',
          },
          {
            title:'NCERT Biology Class 12 (free official e-textbook)',
            term:'CISCE (ICSE / ISC)',
            url:'https://ncert.nic.in/textbook.php?lebo1=0-13',
          },
          {
            title:'OpenStax Biology 2e (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/biology-2e',
          },
        ],
      },
      {
        subj:'Home Science (864)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ISC 2027 Home Science Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/21.-ISC-Home-Science.pdf',
          },
        ],
      },
      {
        subj:'Fashion Designing (865)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Fashion Designing Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/22.-ISC-Fashion-Designing.doc.pdf',
          },
        ],
      },
      {
        subj:'Computer Science (868)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ISC 2027 Computer Science Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/25.-ISC-Computer-Science.doc.pdf',
          },
        ],
      },
      {
        subj:'Art (871-875)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Art Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/28.-ISC-Art.doc.pdf',
          },
        ],
      },
      {
        subj:'Music - Hindustani (876)',
        icon:'🕊️',
        color:'#84CC16',
        books:[
          {
            title:'ISC 2027 Music Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/29.-ISC-Music.doc.pdf',
          },
        ],
      },
      {
        subj:'Physical Education (879)',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'ISC 2027 Physical Education Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/30.-ISC-Physical-Education.pdf',
          },
        ],
      },
      {
        subj:'Environmental Science (880)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ISC 2027 Environmental Science Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/31.-ISC-Environmental-Science.pdf',
          },
        ],
      },
      {
        subj:'Biotechnology (881)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Biotechnology Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/32.-ISC-Biotechnology.docx.pdf',
          },
          {
            title:'OpenStax Microbiology (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/microbiology',
          },
        ],
      },
      {
        subj:'Mass Media & Communication (882)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Mass Media & Communication Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/33.-ISC-Mass-Media-Communication.pdf',
          },
        ],
      },
      {
        subj:'Legal Studies (884)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Legal Studies Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/03/ISC-Legal-Studies.doc.pdf',
          },
          {
            title:'OpenStax Business Law I Essentials (free, CC BY)',
            term:'CISCE (ICSE / ISC)',
            url:'https://openstax.org/details/books/business-law-i-essentials',
          },
        ],
      },
      {
        subj:'Artificial Intelligence',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ISC 2027 Artificial Intelligence Syllabus',
            term:'CISCE (ICSE / ISC)',
            url:'https://cisce.org/wp-content/uploads/2025/02/36.-ISC-Artificial-Intelligence.pdf',
          },
        ],
      },
    ],
  },
  australian:{
    f:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — English curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/english/english-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Mathematics curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/mathematics/mathematics-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Science curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/science/science-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'HASS (Humanities & Social Sciences)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — HASS F–6 curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/humanities-and-social-sciences/hass-f-6/humanities-and-social-sciences-hass-f-6-curriculum-content-v9.docx',
          },
        ],
      },
      {
        subj:'The Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Dance curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/dance/the-arts-dance-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Drama curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/drama/the-arts-drama-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Media Arts curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/media-arts/the-arts-media-arts-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Music curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/music/the-arts-music-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Visual Arts curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/visual-arts/the-arts-visual-arts-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Design & Technologies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Design and Technologies curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/technologies/design-and-technologies/technologies-design-and-technologies-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Digital Technologies',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Digital Technologies curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/technologies/digital-technologies/technologies-digital-technologies-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Health & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Health and Physical Education curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/health-and-physical-education/health-and-physical-education-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Languages (e.g. Japanese, Chinese, Indonesian, French, Italian, Arabic)',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Languages: Arabic F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/arabic/languages-arabic-curriculum-content-f-10-sequence-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — Languages: Chinese F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/chinese/languages-chinese-curriculum-content-f-10-sequence-v9.docx',
          },
        ],
      },
    ],
    y1:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — English curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/english/english-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Mathematics curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/mathematics/mathematics-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Science curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/science/science-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'HASS (Humanities & Social Sciences)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — HASS F–6 curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/humanities-and-social-sciences/hass-f-6/humanities-and-social-sciences-hass-f-6-curriculum-content-v9.docx',
          },
        ],
      },
      {
        subj:'The Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Dance curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/dance/the-arts-dance-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Drama curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/drama/the-arts-drama-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Media Arts curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/media-arts/the-arts-media-arts-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Music curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/music/the-arts-music-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Visual Arts curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/visual-arts/the-arts-visual-arts-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Design & Technologies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Design and Technologies curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/technologies/design-and-technologies/technologies-design-and-technologies-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Digital Technologies',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Digital Technologies curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/technologies/digital-technologies/technologies-digital-technologies-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Health & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Health and Physical Education curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/health-and-physical-education/health-and-physical-education-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Languages (e.g. Japanese, Chinese, Indonesian, French, Italian, Arabic)',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Languages: Arabic F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/arabic/languages-arabic-curriculum-content-f-10-sequence-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — Languages: Chinese F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/chinese/languages-chinese-curriculum-content-f-10-sequence-v9.docx',
          },
        ],
      },
    ],
    y2:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — English curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/english/english-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Mathematics curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/mathematics/mathematics-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Science curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/science/science-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'HASS (Humanities & Social Sciences)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — HASS F–6 curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/humanities-and-social-sciences/hass-f-6/humanities-and-social-sciences-hass-f-6-curriculum-content-v9.docx',
          },
        ],
      },
      {
        subj:'The Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Dance curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/dance/the-arts-dance-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Drama curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/drama/the-arts-drama-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Media Arts curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/media-arts/the-arts-media-arts-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Music curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/music/the-arts-music-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Visual Arts curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/visual-arts/the-arts-visual-arts-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Design & Technologies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Design and Technologies curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/technologies/design-and-technologies/technologies-design-and-technologies-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Digital Technologies',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Digital Technologies curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/technologies/digital-technologies/technologies-digital-technologies-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Health & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Health and Physical Education curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/health-and-physical-education/health-and-physical-education-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Languages (e.g. Japanese, Chinese, Indonesian, French, Italian, Arabic)',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Languages: Arabic F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/arabic/languages-arabic-curriculum-content-f-10-sequence-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — Languages: Chinese F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/chinese/languages-chinese-curriculum-content-f-10-sequence-v9.docx',
          },
        ],
      },
    ],
    y3:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — English curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/english/english-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Mathematics curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/mathematics/mathematics-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Science curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/science/science-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'HASS (Humanities & Social Sciences)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — HASS F–6 curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/humanities-and-social-sciences/hass-f-6/humanities-and-social-sciences-hass-f-6-curriculum-content-v9.docx',
          },
        ],
      },
      {
        subj:'The Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Dance curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/dance/the-arts-dance-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Drama curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/drama/the-arts-drama-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Media Arts curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/media-arts/the-arts-media-arts-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Music curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/music/the-arts-music-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Visual Arts curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/visual-arts/the-arts-visual-arts-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Design & Technologies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Design and Technologies curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/technologies/design-and-technologies/technologies-design-and-technologies-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Digital Technologies',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Digital Technologies curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/technologies/digital-technologies/technologies-digital-technologies-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Health & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Health and Physical Education curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/health-and-physical-education/health-and-physical-education-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Languages (e.g. Japanese, Chinese, Indonesian, French, Italian, Arabic)',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Languages: Arabic F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/arabic/languages-arabic-curriculum-content-f-10-sequence-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — Languages: Chinese F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/chinese/languages-chinese-curriculum-content-f-10-sequence-v9.docx',
          },
        ],
      },
    ],
    y4:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — English curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/english/english-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Mathematics curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/mathematics/mathematics-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Science curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/science/science-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'HASS (Humanities & Social Sciences)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — HASS F–6 curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/humanities-and-social-sciences/hass-f-6/humanities-and-social-sciences-hass-f-6-curriculum-content-v9.docx',
          },
        ],
      },
      {
        subj:'The Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Dance curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/dance/the-arts-dance-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Drama curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/drama/the-arts-drama-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Media Arts curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/media-arts/the-arts-media-arts-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Music curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/music/the-arts-music-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Visual Arts curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/visual-arts/the-arts-visual-arts-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Design & Technologies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Design and Technologies curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/technologies/design-and-technologies/technologies-design-and-technologies-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Digital Technologies',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Digital Technologies curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/technologies/digital-technologies/technologies-digital-technologies-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Health & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Health and Physical Education curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/health-and-physical-education/health-and-physical-education-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Languages (e.g. Japanese, Chinese, Indonesian, French, Italian, Arabic)',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Languages: Arabic F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/arabic/languages-arabic-curriculum-content-f-10-sequence-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — Languages: Chinese F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/chinese/languages-chinese-curriculum-content-f-10-sequence-v9.docx',
          },
        ],
      },
    ],
    y5:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — English curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/english/english-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Mathematics curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/mathematics/mathematics-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Science curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/science/science-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'HASS (Humanities & Social Sciences)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — HASS F–6 curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/humanities-and-social-sciences/hass-f-6/humanities-and-social-sciences-hass-f-6-curriculum-content-v9.docx',
          },
        ],
      },
      {
        subj:'The Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Dance curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/dance/the-arts-dance-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Drama curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/drama/the-arts-drama-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Media Arts curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/media-arts/the-arts-media-arts-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Music curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/music/the-arts-music-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Visual Arts curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/visual-arts/the-arts-visual-arts-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Design & Technologies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Design and Technologies curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/technologies/design-and-technologies/technologies-design-and-technologies-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Digital Technologies',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Digital Technologies curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/technologies/digital-technologies/technologies-digital-technologies-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Health & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Health and Physical Education curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/health-and-physical-education/health-and-physical-education-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Languages (e.g. Japanese, Chinese, Indonesian, French, Italian, Arabic)',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Languages: Arabic F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/arabic/languages-arabic-curriculum-content-f-10-sequence-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — Languages: Chinese F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/chinese/languages-chinese-curriculum-content-f-10-sequence-v9.docx',
          },
        ],
      },
    ],
    y6:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — English curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/english/english-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Mathematics curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/mathematics/mathematics-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Science curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/science/science-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'HASS (Humanities & Social Sciences)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — HASS F–6 curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/humanities-and-social-sciences/hass-f-6/humanities-and-social-sciences-hass-f-6-curriculum-content-v9.docx',
          },
        ],
      },
      {
        subj:'The Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Dance curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/dance/the-arts-dance-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Drama curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/drama/the-arts-drama-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Media Arts curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/media-arts/the-arts-media-arts-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Music curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/music/the-arts-music-curriculum-content-f-6-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — The Arts: Visual Arts curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/the-arts/visual-arts/the-arts-visual-arts-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Design & Technologies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Design and Technologies curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/technologies/design-and-technologies/technologies-design-and-technologies-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Digital Technologies',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Digital Technologies curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/technologies/digital-technologies/technologies-digital-technologies-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Health & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Health and Physical Education curriculum content F–6',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/health-and-physical-education/health-and-physical-education-curriculum-content-f-6-v9.docx',
          },
        ],
      },
      {
        subj:'Languages (e.g. Japanese, Chinese, Indonesian, French, Italian, Arabic)',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Languages: Arabic F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/arabic/languages-arabic-curriculum-content-f-10-sequence-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — Languages: Chinese F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/chinese/languages-chinese-curriculum-content-f-10-sequence-v9.docx',
          },
        ],
      },
    ],
    y7:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — English curriculum content 7–10',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/english/english-curriculum-content-7-10-v9.docx',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'OpenStax — Prealgebra 2e',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/prealgebra-2e',
          },
        ],
      },
      {
        subj:'Digital Technologies',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Digital Technologies curriculum content 7–10',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/technologies/digital-technologies/technologies-digital-technologies-curriculum-content-7-10-v9.docx',
          },
        ],
      },
      {
        subj:'Health & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Health and Physical Education curriculum content 7–10',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/health-and-physical-education/health-and-physical-education-curriculum-content-7-10-v9.docx',
          },
        ],
      },
      {
        subj:'Languages (e.g. Japanese, Chinese, Indonesian, French, Italian, Arabic)',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Languages: Arabic F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/arabic/languages-arabic-curriculum-content-f-10-sequence-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — Languages: Chinese F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/chinese/languages-chinese-curriculum-content-f-10-sequence-v9.docx',
          },
        ],
      },
    ],
    y8:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — English curriculum content 7–10',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/english/english-curriculum-content-7-10-v9.docx',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'OpenStax — Prealgebra 2e',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/prealgebra-2e',
          },
        ],
      },
      {
        subj:'Digital Technologies',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Digital Technologies curriculum content 7–10',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/technologies/digital-technologies/technologies-digital-technologies-curriculum-content-7-10-v9.docx',
          },
        ],
      },
      {
        subj:'Health & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Health and Physical Education curriculum content 7–10',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/health-and-physical-education/health-and-physical-education-curriculum-content-7-10-v9.docx',
          },
        ],
      },
      {
        subj:'Languages (e.g. Japanese, Chinese, Indonesian, French, Italian, Arabic)',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Languages: Arabic F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/arabic/languages-arabic-curriculum-content-f-10-sequence-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — Languages: Chinese F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/chinese/languages-chinese-curriculum-content-f-10-sequence-v9.docx',
          },
        ],
      },
    ],
    y9:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — English curriculum content 7–10',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/english/english-curriculum-content-7-10-v9.docx',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'OpenStax — Elementary Algebra 2e',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/elementary-algebra-2e',
          },
        ],
      },
      {
        subj:'Digital Technologies',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Digital Technologies curriculum content 7–10',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/technologies/digital-technologies/technologies-digital-technologies-curriculum-content-7-10-v9.docx',
          },
        ],
      },
      {
        subj:'Health & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Health and Physical Education curriculum content 7–10',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/health-and-physical-education/health-and-physical-education-curriculum-content-7-10-v9.docx',
          },
        ],
      },
      {
        subj:'Languages (e.g. Japanese, Chinese, Indonesian, French, Italian, Arabic)',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Languages: Arabic F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/arabic/languages-arabic-curriculum-content-f-10-sequence-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — Languages: Chinese F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/chinese/languages-chinese-curriculum-content-f-10-sequence-v9.docx',
          },
        ],
      },
    ],
    y10:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — English curriculum content 7–10',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/english/english-curriculum-content-7-10-v9.docx',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'OpenStax — Intermediate Algebra 2e',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/intermediate-algebra-2e',
          },
        ],
      },
      {
        subj:'Mathematics 10A (extension)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'OpenStax — Precalculus 2e',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/precalculus-2e',
          },
        ],
      },
      {
        subj:'Digital Technologies',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Digital Technologies curriculum content 7–10',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/technologies/digital-technologies/technologies-digital-technologies-curriculum-content-7-10-v9.docx',
          },
        ],
      },
      {
        subj:'Health & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Health and Physical Education curriculum content 7–10',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/health-and-physical-education/health-and-physical-education-curriculum-content-7-10-v9.docx',
          },
        ],
      },
      {
        subj:'Languages (e.g. Japanese, Chinese, Indonesian, French, Italian, Arabic)',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'ACARA Australian Curriculum v9 — Languages: Arabic F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/arabic/languages-arabic-curriculum-content-f-10-sequence-v9.docx',
          },
          {
            title:'ACARA Australian Curriculum v9 — Languages: Chinese F–10 sequence curriculum content',
            term:'Australian Curriculum',
            url:'https://v9.australiancurriculum.edu.au/content/dam/en/curriculum/ac-version-9/downloads/languages/chinese/languages-chinese-curriculum-content-f-10-sequence-v9.docx',
          },
        ],
      },
    ],
    y11:[
      {
        subj:'English (VCE Units 1–2) / English Advanced & Standard (HSC Year 11)',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'VCAA VCE English and EAL study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/english-and-english-additional-language/english-and-english-additional-language-eal',
          },
          {
            title:'NESA Stage 6 (HSC) syllabuses — official',
            term:'Australian Curriculum',
            url:'https://www.educationstandards.nsw.edu.au/wps/portal/nesa/11-12/stage-6-learning-areas',
          },
        ],
      },
      {
        subj:'English Language / Literature (VCE)',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'VCAA VCE English Language study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/english-language/english-language',
          },
          {
            title:'VCAA VCE Literature study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/literature/vce-literature',
          },
        ],
      },
      {
        subj:'General Mathematics (VCE) / Mathematics Standard (HSC) / General Mathematics (QCE)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'VCAA VCE General Mathematics study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/general-mathematics/vce-general-mathematics',
          },
          {
            title:'OpenStax — Contemporary Mathematics',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/contemporary-mathematics',
          },
          {
            title:'OpenStax — Introductory Statistics 2e',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/introductory-statistics-2e',
          },
        ],
      },
      {
        subj:'Mathematical Methods (VCE) / Mathematics Advanced (HSC) / Mathematical Methods (QCE)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'VCAA VCE Mathematical Methods study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/mathematical-methods/vce-mathematical-methods',
          },
          {
            title:'OpenStax — Precalculus 2e',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/precalculus-2e',
          },
          {
            title:'OpenStax — Calculus Volume 1',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/calculus-volume-1',
          },
        ],
      },
      {
        subj:'Specialist Mathematics (VCE, QCE) / Mathematics Extension 1 (HSC)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'VCAA VCE Specialist Mathematics study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/specialist-mathematics/vce-specialist-mathematics',
          },
          {
            title:'OpenStax — Precalculus 2e',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/precalculus-2e',
          },
          {
            title:'OpenStax — Calculus Volume 2',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/calculus-volume-2',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'VCAA VCE Physics study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/physics/physics',
          },
          {
            title:'OpenStax — College Physics 2e',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/college-physics-2e',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'VCAA VCE Chemistry study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/chemistry/chemistry',
          },
          { title:'OpenStax — Chemistry 2e', term:'Australian Curriculum', url:'https://openstax.org/details/books/chemistry-2e' },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'VCAA VCE Biology study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/biology/biology',
          },
          { title:'OpenStax — Biology 2e', term:'Australian Curriculum', url:'https://openstax.org/details/books/biology-2e' },
        ],
      },
      {
        subj:'Psychology',
        icon:'💭',
        color:'#64748B',
        books:[
          {
            title:'VCAA VCE Psychology study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/psychology/vce-psychology',
          },
          {
            title:'OpenStax — Psychology 2e',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/psychology-2e',
          },
        ],
      },
      {
        subj:'Business Management (VCE) / Business Studies (HSC)',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'VCAA VCE Business Management study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/business-management/vce-business-management',
          },
          {
            title:'OpenStax — Introduction to Business',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/introduction-business',
          },
          {
            title:'OpenStax — Principles of Management',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/principles-management',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'VCAA VCE Economics study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/economics/vce-economics',
          },
          {
            title:'OpenStax — Principles of Economics 3e',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/principles-economics-3e',
          },
        ],
      },
      {
        subj:'Accounting',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'VCAA VCE Accounting study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/accounting/accounting',
          },
          {
            title:'OpenStax — Principles of Accounting, Volume 1: Financial Accounting',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/principles-financial-accounting',
          },
        ],
      },
      {
        subj:'Legal Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'VCAA VCE Legal Studies study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/legal-studies/legal-studies',
          },
          {
            title:'NESA Stage 6 (HSC) syllabuses — official',
            term:'Australian Curriculum',
            url:'https://www.educationstandards.nsw.edu.au/wps/portal/nesa/11-12/stage-6-learning-areas',
          },
        ],
      },
      {
        subj:'Modern History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'VCAA VCE History (Modern, Ancient, Australian, Revolutions) study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/history-ancient/history',
          },
          {
            title:'OpenStax — World History Volume 2 (from 1400)',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/world-history-volume-2',
          },
        ],
      },
      {
        subj:'Ancient History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'VCAA VCE History (Modern, Ancient, Australian, Revolutions) study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/history-ancient/history',
          },
          {
            title:'OpenStax — World History Volume 1 (to 1500)',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/world-history-volume-1',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'VCAA VCE Geography study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/geography/geography',
          },
          {
            title:'NESA Stage 6 (HSC) syllabuses — official',
            term:'Australian Curriculum',
            url:'https://www.educationstandards.nsw.edu.au/wps/portal/nesa/11-12/stage-6-learning-areas',
          },
        ],
      },
      {
        subj:'Health & Human Development (VCE) / PDHPE (HSC)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'VCAA VCE Health and Human Development study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/health-and-human-development/health-and-human-development',
          },
          {
            title:'NESA Stage 6 (HSC) syllabuses — official',
            term:'Australian Curriculum',
            url:'https://www.educationstandards.nsw.edu.au/wps/portal/nesa/11-12/stage-6-learning-areas',
          },
        ],
      },
      {
        subj:'Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'VCAA VCE Physical Education study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/physical-education/physical-education',
          },
          {
            title:'OpenStax — Anatomy and Physiology 2e',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/anatomy-and-physiology-2e',
          },
        ],
      },
      {
        subj:'Applied Computing / Software Development (VCE) / Software Engineering (HSC) / Digital Solutions (QCE)',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'VCAA VCE Applied Computing (incl. Software Development) study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/applied-computing-data-analytics/applied-computing',
          },
          {
            title:'OpenStax — Introduction to Python Programming',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/introduction-python-programming',
          },
        ],
      },
      {
        subj:'Visual Arts / Art Creative Practice (VCE)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'VCAA VCE Art Creative Practice study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/art-creative-practice/vce-art-creative-practice',
          },
          {
            title:'VCAA VCE Art Making and Exhibiting study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/art-making-and-exhibiting/vce-art-making-and-exhibiting',
          },
        ],
      },
      {
        subj:'Music',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'VCAA VCE Music study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/music/music',
          },
          {
            title:'NESA Stage 6 (HSC) syllabuses — official',
            term:'Australian Curriculum',
            url:'https://www.educationstandards.nsw.edu.au/wps/portal/nesa/11-12/stage-6-learning-areas',
          },
        ],
      },
    ],
    y12:[
      {
        subj:'English (VCE Units 3–4) / English Advanced & Standard (HSC)',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'VCAA VCE English and EAL study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/english-and-english-additional-language/english-and-english-additional-language-eal',
          },
          {
            title:'NESA Stage 6 (HSC) syllabuses — official',
            term:'Australian Curriculum',
            url:'https://www.educationstandards.nsw.edu.au/wps/portal/nesa/11-12/stage-6-learning-areas',
          },
        ],
      },
      {
        subj:'English Language / Literature (VCE)',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'VCAA VCE English Language study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/english-language/english-language',
          },
          {
            title:'VCAA VCE Literature study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/literature/vce-literature',
          },
        ],
      },
      {
        subj:'General Mathematics (VCE) / Mathematics Standard 2 (HSC) / General Mathematics (QCE)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'VCAA VCE General Mathematics study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/general-mathematics/vce-general-mathematics',
          },
          {
            title:'OpenStax — Contemporary Mathematics',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/contemporary-mathematics',
          },
          {
            title:'OpenStax — Introductory Statistics 2e',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/introductory-statistics-2e',
          },
        ],
      },
      {
        subj:'Mathematical Methods (VCE) / Mathematics Advanced (HSC) / Mathematical Methods (QCE)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'VCAA VCE Mathematical Methods study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/mathematical-methods/vce-mathematical-methods',
          },
          {
            title:'OpenStax — Precalculus 2e',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/precalculus-2e',
          },
          {
            title:'OpenStax — Calculus Volume 1',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/calculus-volume-1',
          },
        ],
      },
      {
        subj:'Specialist Mathematics (VCE, QCE) / Mathematics Extension 1 & 2 (HSC)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'VCAA VCE Specialist Mathematics study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/specialist-mathematics/vce-specialist-mathematics',
          },
          {
            title:'OpenStax — Precalculus 2e',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/precalculus-2e',
          },
          {
            title:'OpenStax — Calculus Volume 2',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/calculus-volume-2',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'VCAA VCE Physics study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/physics/physics',
          },
          {
            title:'OpenStax — College Physics 2e',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/college-physics-2e',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'VCAA VCE Chemistry study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/chemistry/chemistry',
          },
          { title:'OpenStax — Chemistry 2e', term:'Australian Curriculum', url:'https://openstax.org/details/books/chemistry-2e' },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'VCAA VCE Biology study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/biology/biology',
          },
          { title:'OpenStax — Biology 2e', term:'Australian Curriculum', url:'https://openstax.org/details/books/biology-2e' },
        ],
      },
      {
        subj:'Psychology',
        icon:'💭',
        color:'#64748B',
        books:[
          {
            title:'VCAA VCE Psychology study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/psychology/vce-psychology',
          },
          {
            title:'OpenStax — Psychology 2e',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/psychology-2e',
          },
        ],
      },
      {
        subj:'Business Management (VCE) / Business Studies (HSC)',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'VCAA VCE Business Management study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/business-management/vce-business-management',
          },
          {
            title:'OpenStax — Introduction to Business',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/introduction-business',
          },
          {
            title:'OpenStax — Principles of Management',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/principles-management',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'VCAA VCE Economics study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/economics/vce-economics',
          },
          {
            title:'OpenStax — Principles of Economics 3e',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/principles-economics-3e',
          },
        ],
      },
      {
        subj:'Accounting',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'VCAA VCE Accounting study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/accounting/accounting',
          },
          {
            title:'OpenStax — Principles of Accounting, Volume 1: Financial Accounting',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/principles-financial-accounting',
          },
        ],
      },
      {
        subj:'Legal Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'VCAA VCE Legal Studies study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/legal-studies/legal-studies',
          },
          {
            title:'NESA Stage 6 (HSC) syllabuses — official',
            term:'Australian Curriculum',
            url:'https://www.educationstandards.nsw.edu.au/wps/portal/nesa/11-12/stage-6-learning-areas',
          },
        ],
      },
      {
        subj:'Modern History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'VCAA VCE History (Modern, Ancient, Australian, Revolutions) study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/history-ancient/history',
          },
          {
            title:'OpenStax — World History Volume 2 (from 1400)',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/world-history-volume-2',
          },
        ],
      },
      {
        subj:'Ancient History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'VCAA VCE History (Modern, Ancient, Australian, Revolutions) study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/history-ancient/history',
          },
          {
            title:'OpenStax — World History Volume 1 (to 1500)',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/world-history-volume-1',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'VCAA VCE Geography study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/geography/geography',
          },
          {
            title:'NESA Stage 6 (HSC) syllabuses — official',
            term:'Australian Curriculum',
            url:'https://www.educationstandards.nsw.edu.au/wps/portal/nesa/11-12/stage-6-learning-areas',
          },
        ],
      },
      {
        subj:'Health & Human Development (VCE) / PDHPE (HSC)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'VCAA VCE Health and Human Development study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/health-and-human-development/health-and-human-development',
          },
          {
            title:'NESA Stage 6 (HSC) syllabuses — official',
            term:'Australian Curriculum',
            url:'https://www.educationstandards.nsw.edu.au/wps/portal/nesa/11-12/stage-6-learning-areas',
          },
        ],
      },
      {
        subj:'Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'VCAA VCE Physical Education study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/physical-education/physical-education',
          },
          {
            title:'OpenStax — Anatomy and Physiology 2e',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/anatomy-and-physiology-2e',
          },
        ],
      },
      {
        subj:'Applied Computing / Software Development (VCE) / Software Engineering (HSC) / Digital Solutions (QCE)',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'VCAA VCE Applied Computing (incl. Software Development) study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/applied-computing-data-analytics/applied-computing',
          },
          {
            title:'OpenStax — Introduction to Python Programming',
            term:'Australian Curriculum',
            url:'https://openstax.org/details/books/introduction-python-programming',
          },
        ],
      },
      {
        subj:'Visual Arts / Art Creative Practice (VCE)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'VCAA VCE Art Creative Practice study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/art-creative-practice/vce-art-creative-practice',
          },
          {
            title:'VCAA VCE Art Making and Exhibiting study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/art-making-and-exhibiting/vce-art-making-and-exhibiting',
          },
        ],
      },
      {
        subj:'Music',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'VCAA VCE Music study design (official)',
            term:'Australian Curriculum',
            url:'https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/music/music',
          },
          {
            title:'NESA Stage 6 (HSC) syllabuses — official',
            term:'Australian Curriculum',
            url:'https://www.educationstandards.nsw.edu.au/wps/portal/nesa/11-12/stage-6-learning-areas',
          },
        ],
      },
    ],
  },
  canadian:{
    k:[
      {
        subj:'Language & Early Literacy',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Ontario Curriculum: The Kindergarten Program (2016)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/kindergarten',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Ontario Curriculum: The Kindergarten Program (2016)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/kindergarten',
          },
        ],
      },
    ],
    g1:[
      {
        subj:'Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Ontario Curriculum: Language, Grades 1-8 (2023)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-language',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Ontario Curriculum: Mathematics, Grades 1-8 (2020)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-mathematics',
          },
        ],
      },
      {
        subj:'Science & Technology',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Ontario Curriculum: Science and Technology, Grades 1-8 (2022)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/science-technology',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Social Studies 1-6, History and Geography 7-8 (2018)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-sshg',
          },
        ],
      },
      {
        subj:'Health & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Ontario Curriculum: Health and Physical Education, Grades 1-8 (2019)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-health-and-physical-education',
          },
        ],
      },
      {
        subj:'The Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: The Arts, Grades 1-8',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-arts',
          },
        ],
      },
    ],
    g2:[
      {
        subj:'Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Ontario Curriculum: Language, Grades 1-8 (2023)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-language',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Ontario Curriculum: Mathematics, Grades 1-8 (2020)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-mathematics',
          },
        ],
      },
      {
        subj:'Science & Technology',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Ontario Curriculum: Science and Technology, Grades 1-8 (2022)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/science-technology',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Social Studies 1-6, History and Geography 7-8 (2018)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-sshg',
          },
        ],
      },
      {
        subj:'Health & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Ontario Curriculum: Health and Physical Education, Grades 1-8 (2019)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-health-and-physical-education',
          },
        ],
      },
      {
        subj:'The Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: The Arts, Grades 1-8',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-arts',
          },
        ],
      },
    ],
    g3:[
      {
        subj:'Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Ontario Curriculum: Language, Grades 1-8 (2023)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-language',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Ontario Curriculum: Mathematics, Grades 1-8 (2020)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-mathematics',
          },
        ],
      },
      {
        subj:'Science & Technology',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Ontario Curriculum: Science and Technology, Grades 1-8 (2022)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/science-technology',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Social Studies 1-6, History and Geography 7-8 (2018)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-sshg',
          },
        ],
      },
      {
        subj:'Health & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Ontario Curriculum: Health and Physical Education, Grades 1-8 (2019)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-health-and-physical-education',
          },
        ],
      },
      {
        subj:'The Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: The Arts, Grades 1-8',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-arts',
          },
        ],
      },
    ],
    g4:[
      {
        subj:'Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Ontario Curriculum: Language, Grades 1-8 (2023)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-language',
          },
        ],
      },
      {
        subj:'French (Core French)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Ontario Curriculum: French as a Second Language, Grades 1-8',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-fsl',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Ontario Curriculum: Mathematics, Grades 1-8 (2020)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-mathematics',
          },
        ],
      },
      {
        subj:'Science & Technology',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Ontario Curriculum: Science and Technology, Grades 1-8 (2022)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/science-technology',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Social Studies 1-6, History and Geography 7-8 (2018)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-sshg',
          },
        ],
      },
      {
        subj:'Health & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Ontario Curriculum: Health and Physical Education, Grades 1-8 (2019)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-health-and-physical-education',
          },
        ],
      },
      {
        subj:'The Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: The Arts, Grades 1-8',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-arts',
          },
        ],
      },
    ],
    g5:[
      {
        subj:'Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Ontario Curriculum: Language, Grades 1-8 (2023)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-language',
          },
        ],
      },
      {
        subj:'French (Core French)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Ontario Curriculum: French as a Second Language, Grades 1-8',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-fsl',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Ontario Curriculum: Mathematics, Grades 1-8 (2020)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-mathematics',
          },
        ],
      },
      {
        subj:'Science & Technology',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Ontario Curriculum: Science and Technology, Grades 1-8 (2022)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/science-technology',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Social Studies 1-6, History and Geography 7-8 (2018)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-sshg',
          },
        ],
      },
      {
        subj:'Health & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Ontario Curriculum: Health and Physical Education, Grades 1-8 (2019)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-health-and-physical-education',
          },
        ],
      },
      {
        subj:'The Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: The Arts, Grades 1-8',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-arts',
          },
        ],
      },
    ],
    g6:[
      {
        subj:'Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Ontario Curriculum: Language, Grades 1-8 (2023)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-language',
          },
        ],
      },
      {
        subj:'French (Core French)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Ontario Curriculum: French as a Second Language, Grades 1-8',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-fsl',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Ontario Curriculum: Mathematics, Grades 1-8 (2020)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-mathematics',
          },
        ],
      },
      {
        subj:'Science & Technology',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Ontario Curriculum: Science and Technology, Grades 1-8 (2022)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/science-technology',
          },
        ],
      },
      {
        subj:'Social Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Social Studies 1-6, History and Geography 7-8 (2018)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-sshg',
          },
        ],
      },
      {
        subj:'Health & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Ontario Curriculum: Health and Physical Education, Grades 1-8 (2019)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-health-and-physical-education',
          },
        ],
      },
      {
        subj:'The Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: The Arts, Grades 1-8',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-arts',
          },
        ],
      },
    ],
    g7:[
      {
        subj:'Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Ontario Curriculum: Language, Grades 1-8 (2023)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-language',
          },
        ],
      },
      {
        subj:'French (Core French)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Ontario Curriculum: French as a Second Language, Grades 1-8',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-fsl',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Ontario Curriculum: Mathematics, Grades 1-8 (2020)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-mathematics',
          },
          {
            title:'OpenStax: Prealgebra 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/prealgebra-2e',
          },
        ],
      },
      {
        subj:'Science & Technology',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Ontario Curriculum: Science and Technology, Grades 1-8 (2022)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/science-technology',
          },
        ],
      },
      {
        subj:'History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'Ontario Curriculum: Social Studies 1-6, History and Geography 7-8 (2018)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-sshg',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Ontario Curriculum: Social Studies 1-6, History and Geography 7-8 (2018)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-sshg',
          },
        ],
      },
      {
        subj:'Health & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Ontario Curriculum: Health and Physical Education, Grades 1-8 (2019)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-health-and-physical-education',
          },
        ],
      },
      {
        subj:'The Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: The Arts, Grades 1-8',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-arts',
          },
        ],
      },
    ],
    g8:[
      {
        subj:'Language',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Ontario Curriculum: Language, Grades 1-8 (2023)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-language',
          },
        ],
      },
      {
        subj:'French (Core French)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Ontario Curriculum: French as a Second Language, Grades 1-8',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-fsl',
          },
        ],
      },
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Ontario Curriculum: Mathematics, Grades 1-8 (2020)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-mathematics',
          },
          {
            title:'OpenStax: Prealgebra 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/prealgebra-2e',
          },
        ],
      },
      {
        subj:'Science & Technology',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Ontario Curriculum: Science and Technology, Grades 1-8 (2022)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/science-technology',
          },
        ],
      },
      {
        subj:'History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'Ontario Curriculum: Social Studies 1-6, History and Geography 7-8 (2018)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-sshg',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Ontario Curriculum: Social Studies 1-6, History and Geography 7-8 (2018)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-sshg',
          },
        ],
      },
      {
        subj:'Health & Physical Education',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Ontario Curriculum: Health and Physical Education, Grades 1-8 (2019)',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-health-and-physical-education',
          },
        ],
      },
      {
        subj:'The Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: The Arts, Grades 1-8',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-arts',
          },
        ],
      },
    ],
    g9:[
      {
        subj:'Mathematics (MTH1W)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Ontario Curriculum: Mathematics, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-mathematics',
          },
          {
            title:'OpenStax: Elementary Algebra 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/elementary-algebra-2e',
          },
          {
            title:'OpenStax: Prealgebra 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/prealgebra-2e',
          },
        ],
      },
      {
        subj:'Science (SNC1W)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Ontario Curriculum: Science, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-science',
          },
        ],
      },
      {
        subj:'English (ENL1W / ENG1D)',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Ontario Curriculum: English, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-english',
          },
          {
            title:'OpenStax: Writing Guide with Handbook (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/writing-guide',
          },
        ],
      },
      {
        subj:'Geography of Canada (CGC1W)',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Ontario Curriculum: Canadian and World Studies, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/canadian-and-world-studies',
          },
        ],
      },
      {
        subj:'Core French (FSF1D)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Ontario Curriculum: French as a Second Language, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-fsl',
          },
        ],
      },
      {
        subj:'Exploring Technologies (TIJ1O)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Technological Education, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/technological-education',
          },
        ],
      },
      {
        subj:'Healthy Active Living (PPL1O)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Health and Physical Education, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-hpe',
          },
        ],
      },
      {
        subj:'Business: Building the Entrepreneurial Mindset (BEM1O)',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Business Studies, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/business-studies',
          },
          {
            title:'OpenStax: Introduction to Business (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/introduction-business',
          },
        ],
      },
      {
        subj:'Visual Arts (AVI1O) / Music (AMU1O)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: The Arts, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-arts',
          },
        ],
      },
    ],
    g10:[
      {
        subj:'Principles of Mathematics (MPM2D)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Ontario Curriculum: Mathematics, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-mathematics',
          },
          {
            title:'OpenStax: Elementary Algebra 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/elementary-algebra-2e',
          },
          {
            title:'OpenStax: Algebra and Trigonometry 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/algebra-and-trigonometry-2e',
          },
        ],
      },
      {
        subj:'Foundations of Mathematics (MFM2P)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Ontario Curriculum: Mathematics, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-mathematics',
          },
          {
            title:'OpenStax: Elementary Algebra 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/elementary-algebra-2e',
          },
        ],
      },
      {
        subj:'Science (SNC2D)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Ontario Curriculum: Science, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-science',
          },
          {
            title:'OpenStax: Concepts of Biology (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/concepts-biology',
          },
        ],
      },
      {
        subj:'English (ENG2D / ENL2W)',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Ontario Curriculum: English, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-english',
          },
          {
            title:'OpenStax: Writing Guide with Handbook (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/writing-guide',
          },
        ],
      },
      {
        subj:'Canadian History since World War I (CHC2D)',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'Ontario Curriculum: Canadian and World Studies, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/canadian-and-world-studies',
          },
        ],
      },
      {
        subj:'Civics and Citizenship (CHV2O)',
        icon:'⚖️',
        color:'#6366F1',
        books:[
          {
            title:'Ontario Curriculum: Canadian and World Studies, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/canadian-and-world-studies',
          },
        ],
      },
      {
        subj:'Career Studies (GLC2O)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Guidance and Career Education, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-guidance-and-career-education',
          },
        ],
      },
      {
        subj:'Digital Technology & Innovations (ICD2O)',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'Ontario Curriculum: Computer Studies, Grades 10-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/computer-studies',
          },
        ],
      },
      {
        subj:'Core French (FSF2D)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Ontario Curriculum: French as a Second Language, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-fsl',
          },
        ],
      },
      {
        subj:'Computer Engineering Technology (TEJ2O)',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'Ontario Curriculum: Technological Education, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/technological-education',
          },
        ],
      },
      {
        subj:'Healthy Active Living (PPL2O)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Health and Physical Education, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-hpe',
          },
        ],
      },
    ],
    g11:[
      {
        subj:'Functions (MCR3U)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Mathematics, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-mathematics',
          },
          {
            title:'OpenStax: Precalculus 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/precalculus-2e',
          },
          {
            title:'OpenStax: Algebra and Trigonometry 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/algebra-and-trigonometry-2e',
          },
        ],
      },
      {
        subj:'Functions and Applications (MCF3M)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Mathematics, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-mathematics',
          },
          {
            title:'OpenStax: College Algebra 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/college-algebra-2e',
          },
        ],
      },
      {
        subj:'Foundations for College Mathematics (MBF3C)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Ontario Curriculum: Mathematics, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-mathematics',
          },
          {
            title:'OpenStax: Introductory Statistics 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/introductory-statistics-2e',
          },
        ],
      },
      {
        subj:'Physics (SPH3U)',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Ontario Curriculum: Science, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-science',
          },
          {
            title:'OpenStax: College Physics 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/college-physics-2e',
          },
        ],
      },
      {
        subj:'Chemistry (SCH3U)',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'Ontario Curriculum: Science, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-science',
          },
          {
            title:'OpenStax: Chemistry 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/chemistry-2e',
          },
        ],
      },
      {
        subj:'Biology (SBI3U)',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'Ontario Curriculum: Science, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-science',
          },
          {
            title:'OpenStax: Biology 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/biology-2e',
          },
        ],
      },
      {
        subj:'English (ENG3U)',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Ontario Curriculum: English, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-english',
          },
          {
            title:'OpenStax: Writing Guide with Handbook (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/writing-guide',
          },
        ],
      },
      {
        subj:'Introduction to Computer Science (ICS3U)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Ontario Curriculum: Computer Studies, Grades 10-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/computer-studies',
          },
        ],
      },
      {
        subj:'Financial Accounting Fundamentals (BAF3M)',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Business Studies, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/business-studies',
          },
          {
            title:'OpenStax: Principles of Accounting, Volume 1: Financial Accounting (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/principles-financial-accounting',
          },
        ],
      },
      {
        subj:'The Individual and the Economy (CIE3M)',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Canadian and World Studies, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/canadian-and-world-studies',
          },
          {
            title:'OpenStax: Principles of Economics 3e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/principles-economics-3e',
          },
        ],
      },
      {
        subj:'Anthropology, Psychology & Sociology (HSP3U)',
        icon:'💭',
        color:'#64748B',
        books:[
          {
            title:'Ontario Curriculum: Social Sciences and Humanities, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/social-sciences-humanities',
          },
          {
            title:'OpenStax: Psychology 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/psychology-2e',
          },
          {
            title:'OpenStax: Introduction to Sociology 3e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/introduction-sociology-3e',
          },
        ],
      },
      {
        subj:'World History to the End of the 15th Century (CHW3M)',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'Ontario Curriculum: Canadian and World Studies, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/canadian-and-world-studies',
          },
        ],
      },
      {
        subj:'Understanding Canadian Law (CLU3M)',
        icon:'⚖️',
        color:'#6366F1',
        books:[
          {
            title:'Ontario Curriculum: Canadian and World Studies, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/canadian-and-world-studies',
          },
        ],
      },
      {
        subj:'World Religions and Belief Traditions (HRT3M)',
        icon:'🕊️',
        color:'#84CC16',
        books:[
          {
            title:'Ontario Curriculum: Social Sciences and Humanities, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/social-sciences-humanities',
          },
        ],
      },
      {
        subj:'Core French (FSF3U)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Ontario Curriculum: French as a Second Language, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-fsl',
          },
        ],
      },
    ],
    g12:[
      {
        subj:'Advanced Functions (MHF4U)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Mathematics, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-mathematics',
          },
          {
            title:'OpenStax: Precalculus 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/precalculus-2e',
          },
        ],
      },
      {
        subj:'Calculus and Vectors (MCV4U)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Ontario Curriculum: Mathematics, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-mathematics',
          },
          {
            title:'OpenStax: Calculus Volume 1 (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/calculus-volume-1',
          },
        ],
      },
      {
        subj:'Mathematics of Data Management (MDM4U)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Ontario Curriculum: Mathematics, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-mathematics',
          },
          {
            title:'OpenStax: Introductory Statistics 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/introductory-statistics-2e',
          },
          {
            title:'OpenStax: Statistics (high school) (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/statistics',
          },
        ],
      },
      {
        subj:'Physics (SPH4U)',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Ontario Curriculum: Science, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-science',
          },
          {
            title:'OpenStax: College Physics 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/college-physics-2e',
          },
        ],
      },
      {
        subj:'Chemistry (SCH4U)',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'Ontario Curriculum: Science, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-science',
          },
          {
            title:'OpenStax: Chemistry 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/chemistry-2e',
          },
        ],
      },
      {
        subj:'Biology (SBI4U)',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'Ontario Curriculum: Science, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-science',
          },
          {
            title:'OpenStax: Biology 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/biology-2e',
          },
        ],
      },
      {
        subj:'Earth and Space Science (SES4U)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Ontario Curriculum: Science, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-science',
          },
          {
            title:'OpenStax: Astronomy 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/astronomy-2e',
          },
        ],
      },
      {
        subj:'English (ENG4U)',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'Ontario Curriculum: English, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-english',
          },
          {
            title:'OpenStax: Writing Guide with Handbook (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/writing-guide',
          },
        ],
      },
      {
        subj:'Computer Science (ICS4U)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Ontario Curriculum: Computer Studies, Grades 10-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/computer-studies',
          },
        ],
      },
      {
        subj:'Analysing Current Economic Issues (CIA4U)',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Canadian and World Studies, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/canadian-and-world-studies',
          },
          {
            title:'OpenStax: Principles of Economics 3e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/principles-economics-3e',
          },
        ],
      },
      {
        subj:'Accounting / Business Leadership (BAT4M / BOH4M)',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Business Studies, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/business-studies',
          },
          {
            title:'OpenStax: Principles of Accounting, Volume 1: Financial Accounting (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/principles-financial-accounting',
          },
          {
            title:'OpenStax: Principles of Management (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/principles-management',
          },
        ],
      },
      {
        subj:'Canadian History, Identity & Culture (CHY4U)',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'Ontario Curriculum: Canadian and World Studies, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/canadian-and-world-studies',
          },
        ],
      },
      {
        subj:'Canadian and World Issues (CGW4U)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Canadian and World Studies, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/canadian-and-world-studies',
          },
        ],
      },
      {
        subj:'Philosophy: Questions and Theories (HZT4U)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Social Sciences and Humanities, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/social-sciences-humanities',
          },
          {
            title:'OpenStax: Introduction to Philosophy (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/introduction-philosophy',
          },
        ],
      },
      {
        subj:'Canadian and International Law (CLN4U)',
        icon:'⚖️',
        color:'#6366F1',
        books:[
          {
            title:'Ontario Curriculum: Canadian and World Studies, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/canadian-and-world-studies',
          },
        ],
      },
      {
        subj:'Challenge and Change in Society (HSB4U)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Ontario Curriculum: Social Sciences and Humanities, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/social-sciences-humanities',
          },
          {
            title:'OpenStax: Introduction to Sociology 3e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/introduction-sociology-3e',
          },
        ],
      },
      {
        subj:'Core French (FSF4U)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Ontario Curriculum: French as a Second Language, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-fsl',
          },
        ],
      },
      {
        subj:'Mathematics for College Technology (MCT4C)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Ontario Curriculum: Mathematics, Grades 9-12',
            term:'Canadian Curriculum',
            url:'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-mathematics',
          },
          {
            title:'OpenStax: Precalculus 2e (free, CC BY)',
            term:'Canadian Curriculum',
            url:'https://openstax.org/details/books/precalculus-2e',
          },
        ],
      },
    ],
  },
  french_bac:{
    cp:[
      {
        subj:'Français',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Français CP', term:'Éducation nationale', url:'https://www.lumni.fr/primaire/cp/francais' },
        ],
      },
      {
        subj:'Mathématiques',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'Lumni – Mathématiques CP', term:'Éducation nationale', url:'https://www.lumni.fr/primaire/cp/mathematiques' },
        ],
      },
      {
        subj:'Questionner le monde',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Questionner le monde CP',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/cp/questionner-le-monde',
          },
        ],
      },
      {
        subj:'Anglais',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Anglais CP', term:'Éducation nationale', url:'https://www.lumni.fr/primaire/cp/anglais' },
        ],
      },
      {
        subj:'Enseignement moral et civique',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EMC CP',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/cp/enseignement-moral-et-civique',
          },
        ],
      },
      {
        subj:'Arts plastiques',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Enseignements artistiques CP',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/cp/enseignements-artistiques',
          },
        ],
      },
      {
        subj:'Éducation musicale',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Enseignements artistiques CP',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/cp/enseignements-artistiques',
          },
        ],
      },
      {
        subj:'Éducation physique et sportive',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EPS CP',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/cp/education-physique-et-sportive',
          },
        ],
      },
    ],
    ce1:[
      {
        subj:'Français',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Français CE1', term:'Éducation nationale', url:'https://www.lumni.fr/primaire/ce1/francais' },
        ],
      },
      {
        subj:'Mathématiques',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'Lumni – Mathématiques CE1', term:'Éducation nationale', url:'https://www.lumni.fr/primaire/ce1/mathematiques' },
        ],
      },
      {
        subj:'Questionner le monde',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Questionner le monde CE1',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/ce1/questionner-le-monde',
          },
          {
            title:'Lumni – Expériences scientifiques CE1',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/ce1/experiences-scientifiques',
          },
        ],
      },
      {
        subj:'Anglais',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Anglais CE1', term:'Éducation nationale', url:'https://www.lumni.fr/primaire/ce1/anglais' },
        ],
      },
      {
        subj:'Enseignement moral et civique',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EMC CE1',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/ce1/enseignement-moral-et-civique',
          },
        ],
      },
      {
        subj:'Arts plastiques',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Enseignements artistiques CE1',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/ce1/enseignements-artistiques',
          },
        ],
      },
      {
        subj:'Éducation musicale',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Enseignements artistiques CE1',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/ce1/enseignements-artistiques',
          },
        ],
      },
      {
        subj:'Éducation physique et sportive',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EPS CE1',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/ce1/education-physique-et-sportive',
          },
        ],
      },
    ],
    ce2:[
      {
        subj:'Français',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Français CE2', term:'Éducation nationale', url:'https://www.lumni.fr/primaire/ce2/francais' },
        ],
      },
      {
        subj:'Mathématiques',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'Lumni – Mathématiques CE2', term:'Éducation nationale', url:'https://www.lumni.fr/primaire/ce2/mathematiques' },
        ],
      },
      {
        subj:'Questionner le monde',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Questionner le monde CE2',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/ce2/questionner-le-monde',
          },
          {
            title:'Lumni – Expériences scientifiques CE2',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/ce2/experiences-scientifiques',
          },
        ],
      },
      {
        subj:'Anglais',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Anglais CE2', term:'Éducation nationale', url:'https://www.lumni.fr/primaire/ce2/anglais' },
        ],
      },
      {
        subj:'Enseignement moral et civique',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EMC CE2',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/ce2/enseignement-moral-et-civique',
          },
        ],
      },
      {
        subj:'Arts plastiques',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Enseignements artistiques CE2',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/ce2/enseignements-artistiques',
          },
        ],
      },
      {
        subj:'Éducation musicale',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Enseignements artistiques CE2',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/ce2/enseignements-artistiques',
          },
        ],
      },
      {
        subj:'Éducation physique et sportive',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EPS CE2',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/ce2/education-physique-et-sportive',
          },
        ],
      },
    ],
    cm1:[
      {
        subj:'Français',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Français CM1', term:'Éducation nationale', url:'https://www.lumni.fr/primaire/cm1/francais' },
        ],
      },
      {
        subj:'Mathématiques',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'Lumni – Mathématiques CM1', term:'Éducation nationale', url:'https://www.lumni.fr/primaire/cm1/mathematiques' },
        ],
      },
      {
        subj:'Sciences et technologie',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Lumni – Sciences et technologie CM1',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/cm1/sciences-et-technologie',
          },
          {
            title:'Lumni – Expériences scientifiques CM1',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/cm1/experiences-scientifiques',
          },
        ],
      },
      {
        subj:'Histoire-Géographie',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Histoire CM1', term:'Éducation nationale', url:'https://www.lumni.fr/primaire/cm1/histoire' },
          { title:'Lumni – Géographie CM1', term:'Éducation nationale', url:'https://www.lumni.fr/primaire/cm1/geographie' },
        ],
      },
      {
        subj:'Anglais',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Anglais CM1', term:'Éducation nationale', url:'https://www.lumni.fr/primaire/cm1/anglais' },
        ],
      },
      {
        subj:'Enseignement moral et civique',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EMC CM1',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/cm1/enseignement-moral-et-civique',
          },
        ],
      },
      {
        subj:'Arts plastiques',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Arts, musique et culture CM1',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/cm1/arts-musique-et-culture',
          },
        ],
      },
      {
        subj:'Éducation musicale',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Arts, musique et culture CM1',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/cm1/arts-musique-et-culture',
          },
        ],
      },
      {
        subj:'Éducation physique et sportive',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EPS CM1',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/cm1/education-physique-et-sportive',
          },
        ],
      },
    ],
    cm2:[
      {
        subj:'Français',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Français CM2', term:'Éducation nationale', url:'https://www.lumni.fr/primaire/cm2/francais' },
        ],
      },
      {
        subj:'Mathématiques',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          { title:'Lumni – Mathématiques CM2', term:'Éducation nationale', url:'https://www.lumni.fr/primaire/cm2/mathematiques' },
          {
            title:'Sésamath – Cahier CM2 (édition 2012-2013) (manuel libre, licence ouverte)',
            term:'Éducation nationale',
            url:'https://manuel.sesamath.net/numerique/?ouvrage=cscm2_2012',
          },
        ],
      },
      {
        subj:'Sciences et technologie',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Lumni – Sciences et technologie CM2',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/cm2/sciences-et-technologie',
          },
          {
            title:'Lumni – Expériences scientifiques CM2',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/cm2/experiences-scientifiques',
          },
        ],
      },
      {
        subj:'Histoire-Géographie',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Histoire CM2', term:'Éducation nationale', url:'https://www.lumni.fr/primaire/cm2/histoire' },
          { title:'Lumni – Géographie CM2', term:'Éducation nationale', url:'https://www.lumni.fr/primaire/cm2/geographie' },
        ],
      },
      {
        subj:'Anglais',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Anglais CM2', term:'Éducation nationale', url:'https://www.lumni.fr/primaire/cm2/anglais' },
        ],
      },
      {
        subj:'Enseignement moral et civique',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EMC CM2',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/cm2/enseignement-moral-et-civique',
          },
        ],
      },
      {
        subj:'Arts plastiques',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Arts, musique et culture CM2',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/cm2/arts-musique-et-culture',
          },
        ],
      },
      {
        subj:'Éducation musicale',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Arts, musique et culture CM2',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/cm2/arts-musique-et-culture',
          },
        ],
      },
      {
        subj:'Éducation physique et sportive',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EPS CM2',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/primaire/cm2/education-physique-et-sportive',
          },
        ],
      },
    ],
    sixieme:[
      {
        subj:'Français',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Français 6e', term:'Éducation nationale', url:'https://www.lumni.fr/college/sixieme/francais' },
        ],
      },
      {
        subj:'Mathématiques',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Lumni – Mathématiques 6e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/sixieme/mathematiques',
          },
          {
            title:'Sésamath – Cahier 6e, édition 2025 (nouveau programme) (manuel libre, licence ouverte)',
            term:'Éducation nationale',
            url:'https://manuel.sesamath.net/numerique/?ouvrage=cm6_2025',
          },
          {
            title:'Sésamath – Manuel 6e, édition 2013 (manuel libre, licence ouverte)',
            term:'Éducation nationale',
            url:'https://manuel.sesamath.net/numerique/?ouvrage=ms6_2013',
          },
        ],
      },
      {
        subj:'Sciences et technologie',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Lumni – Sciences et technologie 6e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/sixieme/sciences-et-technologie',
          },
          {
            title:'Lumni – Expériences scientifiques 6e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/sixieme/experiences-scientifiques',
          },
        ],
      },
      {
        subj:'Histoire-Géographie',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Histoire 6e', term:'Éducation nationale', url:'https://www.lumni.fr/college/sixieme/histoire' },
          { title:'Lumni – Géographie 6e', term:'Éducation nationale', url:'https://www.lumni.fr/college/sixieme/geographie' },
        ],
      },
      {
        subj:'Anglais (LVA)',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Anglais 6e', term:'Éducation nationale', url:'https://www.lumni.fr/college/sixieme/anglais' },
        ],
      },
      {
        subj:'Enseignement moral et civique',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EMC 6e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/sixieme/enseignement-moral-et-civique',
          },
        ],
      },
      {
        subj:'Arts plastiques',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Arts, musique et culture 6e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/sixieme/arts-musique-et-culture',
          },
        ],
      },
      {
        subj:'Éducation musicale',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Arts, musique et culture 6e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/sixieme/arts-musique-et-culture',
          },
        ],
      },
      {
        subj:'Éducation physique et sportive',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EPS 6e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/sixieme/education-physique-et-sportive',
          },
        ],
      },
    ],
    cinquieme:[
      {
        subj:'Français',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Français 5e', term:'Éducation nationale', url:'https://www.lumni.fr/college/cinquieme/francais' },
        ],
      },
      {
        subj:'Mathématiques',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Lumni – Mathématiques 5e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/cinquieme/mathematiques',
          },
          {
            title:'Sésamath – Cahier 5e, édition 2026 (nouveau programme) (manuel libre, licence ouverte)',
            term:'Éducation nationale',
            url:'https://manuel.sesamath.net/numerique/?ouvrage=cm5_2026',
          },
          {
            title:'Sésamath – Manuel Cycle 4, édition 2016 (manuel libre, licence ouverte)',
            term:'Éducation nationale',
            url:'https://manuel.sesamath.net/numerique/?ouvrage=cycle4_2016',
          },
        ],
      },
      {
        subj:'Histoire-Géographie',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Histoire 5e', term:'Éducation nationale', url:'https://www.lumni.fr/college/cinquieme/histoire' },
          { title:'Lumni – Géographie 5e', term:'Éducation nationale', url:'https://www.lumni.fr/college/cinquieme/geographie' },
        ],
      },
      {
        subj:'Enseignement moral et civique',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EMC 5e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/cinquieme/enseignement-moral-et-civique',
          },
        ],
      },
      {
        subj:'Physique-Chimie',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Physique-chimie 5e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/cinquieme/physique-chimie',
          },
        ],
      },
      {
        subj:'SVT',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – SVT 5e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/cinquieme/sciences-de-la-vie-et-de-la-terre',
          },
        ],
      },
      {
        subj:'Technologie',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Technologie 5e', term:'Éducation nationale', url:'https://www.lumni.fr/college/cinquieme/technologie' },
        ],
      },
      {
        subj:'Anglais (LVA)',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Anglais 5e', term:'Éducation nationale', url:'https://www.lumni.fr/college/cinquieme/anglais' },
        ],
      },
      {
        subj:'Langue vivante B (espagnol / allemand)',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Espagnol 5e', term:'Éducation nationale', url:'https://www.lumni.fr/college/cinquieme/espagnol' },
          { title:'Lumni – Allemand 5e', term:'Éducation nationale', url:'https://www.lumni.fr/college/cinquieme/allemand' },
        ],
      },
      {
        subj:'Arts plastiques',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Arts et musique 5e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/cinquieme/arts-musique-et-culture',
          },
        ],
      },
      {
        subj:'Éducation musicale',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Arts et musique 5e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/cinquieme/arts-musique-et-culture',
          },
        ],
      },
      {
        subj:'Éducation physique et sportive',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EPS 5e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/cinquieme/education-physique-et-sportive',
          },
        ],
      },
    ],
    quatrieme:[
      {
        subj:'Français',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Français 4e', term:'Éducation nationale', url:'https://www.lumni.fr/college/quatrieme/francais' },
        ],
      },
      {
        subj:'Mathématiques',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Lumni – Mathématiques 4e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/quatrieme/mathematiques',
          },
          {
            title:'Sésamath – Cahier 4e, édition 2021 (manuel libre, licence ouverte)',
            term:'Éducation nationale',
            url:'https://manuel.sesamath.net/numerique/?ouvrage=cm4_2021',
          },
          {
            title:'Sésamath – Manuel Cycle 4, édition 2016 (manuel libre, licence ouverte)',
            term:'Éducation nationale',
            url:'https://manuel.sesamath.net/numerique/?ouvrage=cycle4_2016',
          },
        ],
      },
      {
        subj:'Histoire-Géographie',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Histoire 4e', term:'Éducation nationale', url:'https://www.lumni.fr/college/quatrieme/histoire' },
          { title:'Lumni – Géographie 4e', term:'Éducation nationale', url:'https://www.lumni.fr/college/quatrieme/geographie' },
        ],
      },
      {
        subj:'Enseignement moral et civique',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EMC 4e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/quatrieme/enseignement-moral-et-civique',
          },
        ],
      },
      {
        subj:'Physique-Chimie',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Physique-chimie 4e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/quatrieme/physique-chimie',
          },
        ],
      },
      {
        subj:'SVT',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – SVT 4e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/quatrieme/sciences-de-la-vie-et-de-la-terre',
          },
        ],
      },
      {
        subj:'Technologie',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Technologie 4e', term:'Éducation nationale', url:'https://www.lumni.fr/college/quatrieme/technologie' },
        ],
      },
      {
        subj:'Anglais (LVA)',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Anglais 4e', term:'Éducation nationale', url:'https://www.lumni.fr/college/quatrieme/anglais' },
        ],
      },
      {
        subj:'Langue vivante B (espagnol / allemand)',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Espagnol 4e', term:'Éducation nationale', url:'https://www.lumni.fr/college/quatrieme/espagnol' },
          { title:'Lumni – Allemand 4e', term:'Éducation nationale', url:'https://www.lumni.fr/college/quatrieme/allemand' },
        ],
      },
      {
        subj:'Arts plastiques',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Arts et musique 4e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/quatrieme/arts-et-musique',
          },
        ],
      },
      {
        subj:'Éducation musicale',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Arts et musique 4e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/quatrieme/arts-et-musique',
          },
        ],
      },
      {
        subj:'Éducation physique et sportive',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EPS 4e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/quatrieme/education-physique-et-sportive',
          },
        ],
      },
    ],
    troisieme:[
      {
        subj:'Français',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Français 3e', term:'Éducation nationale', url:'https://www.lumni.fr/college/troisieme/francais' },
        ],
      },
      {
        subj:'Mathématiques',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Lumni – Mathématiques 3e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/troisieme/mathematiques',
          },
          {
            title:'Sésamath – Cahier 3e, édition 2021 (manuel libre, licence ouverte)',
            term:'Éducation nationale',
            url:'https://manuel.sesamath.net/numerique/?ouvrage=cm3_2021',
          },
          {
            title:'Sésamath – Manuel Cycle 4, édition 2016 (manuel libre, licence ouverte)',
            term:'Éducation nationale',
            url:'https://manuel.sesamath.net/numerique/?ouvrage=cycle4_2016',
          },
        ],
      },
      {
        subj:'Histoire-Géographie',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Histoire 3e', term:'Éducation nationale', url:'https://www.lumni.fr/college/troisieme/histoire' },
          { title:'Lumni – Géographie 3e', term:'Éducation nationale', url:'https://www.lumni.fr/college/troisieme/geographie' },
        ],
      },
      {
        subj:'Enseignement moral et civique',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EMC 3e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/troisieme/enseignement-moral-et-civique',
          },
        ],
      },
      {
        subj:'Physique-Chimie',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Physique-chimie 3e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/troisieme/physique-chimie',
          },
        ],
      },
      {
        subj:'SVT',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – SVT 3e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/troisieme/sciences-de-la-vie-et-de-la-terre',
          },
        ],
      },
      {
        subj:'Technologie',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Technologie 3e', term:'Éducation nationale', url:'https://www.lumni.fr/college/troisieme/technologie' },
        ],
      },
      {
        subj:'Anglais (LVA)',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Anglais 3e', term:'Éducation nationale', url:'https://www.lumni.fr/college/troisieme/anglais' },
        ],
      },
      {
        subj:'Langue vivante B (espagnol / allemand)',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Espagnol 3e', term:'Éducation nationale', url:'https://www.lumni.fr/college/troisieme/espagnol' },
          { title:'Lumni – Allemand 3e', term:'Éducation nationale', url:'https://www.lumni.fr/college/troisieme/allemand' },
        ],
      },
      {
        subj:'Arts plastiques',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Arts et musique 3e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/troisieme/arts-et-musique',
          },
        ],
      },
      {
        subj:'Éducation musicale',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Arts et musique 3e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/troisieme/arts-et-musique',
          },
        ],
      },
      {
        subj:'Éducation physique et sportive',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EPS 3e',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/college/troisieme/education-physique-et-sportive',
          },
        ],
      },
      {
        subj:'Épreuves du Brevet (DNB 2026)',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Réviser le brevet', term:'Éducation nationale', url:'https://www.lumni.fr/college/troisieme/brevet' },
        ],
      },
    ],
    seconde:[
      {
        subj:'Histoire-Géographie',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Histoire 2nde', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/seconde/histoire' },
          { title:'Lumni – Géographie 2nde', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/seconde/geographie' },
        ],
      },
      {
        subj:'Enseignement moral et civique',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EMC 2nde',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/seconde/enseignement-moral-et-civique',
          },
        ],
      },
      {
        subj:'Anglais (LVA)',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Anglais 2nde', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/seconde/anglais' },
        ],
      },
      {
        subj:'Langue vivante B (espagnol / allemand)',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Espagnol 2nde', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/seconde/espagnol' },
        ],
      },
      {
        subj:'Éducation physique et sportive',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EPS 2nde',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/seconde/education-physique-et-sportive',
          },
        ],
      },
      {
        subj:'Français',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Français 2nde', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/seconde/francais' },
        ],
      },
      {
        subj:'Mathématiques',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Lumni – Mathématiques 2nde',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/seconde/mathematiques',
          },
          {
            title:'Sésamath – Manuel 2nde, édition 2023 (manuel libre, licence ouverte)',
            term:'Éducation nationale',
            url:'https://manuel.sesamath.net/numerique/?ouvrage=ms2_2023',
          },
          {
            title:'Sésamath – Livret 2nde, édition 2022 (manuel libre, licence ouverte)',
            term:'Éducation nationale',
            url:'https://manuel.sesamath.net/numerique/?ouvrage=cah2nde_2022',
          },
        ],
      },
      {
        subj:'Physique-Chimie',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Physique-chimie 2nde',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/seconde/physique-chimie',
          },
        ],
      },
      {
        subj:'SVT',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – SVT 2nde',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/seconde/sciences-de-la-vie-et-de-la-terre',
          },
        ],
      },
      {
        subj:'Sciences économiques et sociales',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Lumni – SES 2nde',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/seconde/sciences-economiques-et-sociales',
          },
        ],
      },
      {
        subj:'Sciences numériques et technologie (SNT)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Lumni – SNT 2nde',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/seconde/sciences-numeriques-et-technologie',
          },
        ],
      },
    ],
    premiere:[
      {
        subj:'Histoire-Géographie',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Histoire 1re', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/premiere/histoire' },
          { title:'Lumni – Géographie 1re', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/premiere/geographie' },
        ],
      },
      {
        subj:'Enseignement moral et civique',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EMC 1re',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/premiere/enseignement-moral-et-civique',
          },
        ],
      },
      {
        subj:'Anglais (LVA)',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Anglais 1re', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/premiere/anglais' },
        ],
      },
      {
        subj:'Langue vivante B (espagnol / allemand)',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Espagnol 1re', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/premiere/espagnol' },
          { title:'Lumni – Allemand 1re', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/premiere/allemand' },
        ],
      },
      {
        subj:'Éducation physique et sportive',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EPS 1re',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/premiere/education-physique-et-sportive',
          },
        ],
      },
      {
        subj:'Français (épreuve anticipée)',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Français 1re', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/premiere/francais' },
          { title:'Lumni – Réviser le bac (1re)', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/premiere/bac' },
        ],
      },
      {
        subj:'Mathématiques (tronc commun et épreuve anticipée)',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Lumni – Mathématiques 1re',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/premiere/mathematiques',
          },
          {
            title:'Sésamath – Manuel 1re, mathématiques du tronc commun (enseignement scientifique), édition 2023 (manuel libre, licence ouverte)',
            term:'Éducation nationale',
            url:'https://manuel.sesamath.net/numerique/?ouvrage=ms1tces_2023',
          },
        ],
      },
      {
        subj:'Enseignement scientifique',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Enseignement scientifique 1re',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/premiere/enseignement-scientifique',
          },
          {
            title:'Sésamath – Cahier 1re Enseignement scientifique, édition 2022 (manuel libre, licence ouverte)',
            term:'Éducation nationale',
            url:'https://manuel.sesamath.net/numerique/?ouvrage=cah1ere_ens_sci_2022',
          },
        ],
      },
      {
        subj:'Spécialité Mathématiques',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Lumni – Maths voie générale 1re',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/premiere/maths-voie-generale',
          },
          {
            title:'Sésamath – Manuel 1re spécialité, édition 2019 (manuel libre, licence ouverte)',
            term:'Éducation nationale',
            url:'https://manuel.sesamath.net/numerique/?ouvrage=ms1spe_2019',
          },
          {
            title:'Sésamath – Livret 1re/Tle spécialité, édition 2022 (manuel libre, licence ouverte)',
            term:'Éducation nationale',
            url:'https://manuel.sesamath.net/numerique/?ouvrage=cah1ere_tle_spe_2022',
          },
        ],
      },
      {
        subj:'Spécialité Physique-Chimie',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Physique-chimie 1re',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/premiere/physique-chimie',
          },
        ],
      },
      {
        subj:'Spécialité SVT',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – SVT 1re',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/premiere/sciences-de-la-vie-et-de-la-terre',
          },
        ],
      },
      {
        subj:'Spécialité SES',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – SES 1re',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/premiere/sciences-economiques-et-sociales',
          },
        ],
      },
      {
        subj:'Spécialité HGGSP',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – HGGSP 1re', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/premiere/hggsp' },
        ],
      },
      {
        subj:'Spécialité HLP',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – HLP 1re', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/premiere/hlp' },
        ],
      },
      {
        subj:'Spécialité LLCER Anglais',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – LLCER 1re', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/premiere/llcer' },
        ],
      },
      {
        subj:'Spécialité NSI',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – NSI 1re', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/premiere/nsi' },
        ],
      },
      {
        subj:'Spécialité Sciences de l\'ingénieur',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Lumni – Sciences de l\'ingénieur 1re',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/premiere/sciences-de-l-ingenieur',
          },
        ],
      },
      {
        subj:'Spécialité Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Arts 1re', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/premiere/arts' },
        ],
      },
      {
        subj:'Spécialité Éducation physique, pratiques et culture sportives',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – EPPCS 1re', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/premiere/eppcs' },
        ],
      },
      {
        subj:'Spécialité LLCA (latin / grec)',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – LLCA 1re', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/premiere/llca' },
        ],
      },
    ],
    terminale:[
      {
        subj:'Histoire-Géographie',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Histoire Tle', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/terminale/histoire' },
          { title:'Lumni – Géographie Tle', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/terminale/geographie' },
        ],
      },
      {
        subj:'Enseignement moral et civique',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EMC Tle',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/terminale/enseignement-moral-et-civique',
          },
        ],
      },
      {
        subj:'Anglais (LVA)',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Anglais Tle', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/terminale/anglais' },
        ],
      },
      {
        subj:'Langue vivante B (espagnol / allemand)',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Espagnol Tle', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/terminale/espagnol' },
          { title:'Lumni – Allemand Tle', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/terminale/allemand' },
        ],
      },
      {
        subj:'Éducation physique et sportive',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – EPS Tle',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/terminale/education-physique-et-sportive',
          },
        ],
      },
      {
        subj:'Philosophie',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Philosophie Tle', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/terminale/philosophie' },
        ],
      },
      {
        subj:'Enseignement scientifique',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Enseignement scientifique Tle',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/terminale/enseignement-scientifique',
          },
        ],
      },
      {
        subj:'Spécialité Mathématiques',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Lumni – Mathématiques Tle',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/terminale/mathematiques',
          },
          {
            title:'Sésamath – Manuel Tle spécialité, édition 2020 (manuel libre, licence ouverte)',
            term:'Éducation nationale',
            url:'https://manuel.sesamath.net/numerique/?ouvrage=mstsspe_2020',
          },
          {
            title:'Sésamath – Livret 1re/Tle spécialité, édition 2022 (manuel libre, licence ouverte)',
            term:'Éducation nationale',
            url:'https://manuel.sesamath.net/numerique/?ouvrage=cah1ere_tle_spe_2022',
          },
        ],
      },
      {
        subj:'Spécialité Physique-Chimie',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – Physique-chimie Tle',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/terminale/physique-chimie',
          },
        ],
      },
      {
        subj:'Spécialité SVT',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – SVT Tle',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/terminale/sciences-de-la-vie-et-de-la-terre',
          },
        ],
      },
      {
        subj:'Spécialité SES',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – SES Tle',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/terminale/sciences-economiques-et-sociales',
          },
        ],
      },
      {
        subj:'Spécialité HGGSP',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – HGGSP Tle', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/terminale/hggsp' },
        ],
      },
      {
        subj:'Spécialité HLP',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – HLP Tle', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/terminale/hlp' },
        ],
      },
      {
        subj:'Spécialité LLCER Anglais',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – LLCER Tle', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/terminale/llcer' },
        ],
      },
      {
        subj:'Spécialité NSI',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – NSI Tle', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/terminale/nsi' },
        ],
      },
      {
        subj:'Spécialité Sciences de l\'ingénieur',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Lumni – Sciences de l\'ingénieur Tle',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/terminale/sciences-de-l-ingenieur',
          },
        ],
      },
      {
        subj:'Spécialité Arts',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Arts Tle', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/terminale/arts' },
        ],
      },
      {
        subj:'Spécialité Éducation physique, pratiques et culture sportives',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – EPPCS Tle', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/terminale/eppcs' },
        ],
      },
      {
        subj:'Spécialité LLCA (latin / grec)',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – LLCA Tle', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/terminale/llca' },
        ],
      },
      {
        subj:'Option Mathématiques complémentaires',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Lumni – Maths complémentaires Tle',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/terminale/mathematiques-complementaires',
          },
          {
            title:'Sésamath – Manuel Tle maths complémentaires, édition 2020 (manuel libre, licence ouverte)',
            term:'Éducation nationale',
            url:'https://manuel.sesamath.net/numerique/?ouvrage=mstscomp_2020',
          },
        ],
      },
      {
        subj:'Option Mathématiques expertes',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Lumni – Maths expertes Tle',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/terminale/mathematiques-expertes',
          },
          {
            title:'Sésamath – Manuel Tle maths expertes, édition 2020 (manuel libre, licence ouverte)',
            term:'Éducation nationale',
            url:'https://manuel.sesamath.net/numerique/?ouvrage=mstsexp_2020',
          },
        ],
      },
      {
        subj:'Option Droit et grands enjeux du monde contemporain',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Lumni – DGEMC Tle',
            term:'Éducation nationale',
            url:'https://www.lumni.fr/lycee/terminale/droits-et-grands-enjeux-du-monde-contemporain',
          },
        ],
      },
      {
        subj:'Grand oral',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Lumni – Réviser le bac (Tle)', term:'Éducation nationale', url:'https://www.lumni.fr/lycee/terminale/bac' },
        ],
      },
    ],
  },
  german_abitur:{
    kl1:[
      {
        subj:'Deutsch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards Deutsch Primarbereich',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_10_15-Bildungsstandards-Deutsch-Primar.pdf',
          },
          { title:'ZUM-Unterrichten: Deutsch', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Deutsch' },
          {
            title:'Serlo: Deutsch als Fremdsprache',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/deutsch-als-fremdsprache',
          },
        ],
      },
      {
        subj:'Mathematik',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'KMK Bildungsstandards Mathematik Primarbereich',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_10_15-Bildungsstandards-Mathe-Primar.pdf',
          },
          {
            title:'Serlo Mathe: Grundrechenarten',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1386/grundrechenarten',
          },
          {
            title:'Serlo Mathe: Zahlen und Größen',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1385/zahlen-und-groessen',
          },
        ],
      },
    ],
    kl2:[
      {
        subj:'Deutsch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards Deutsch Primarbereich',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_10_15-Bildungsstandards-Deutsch-Primar.pdf',
          },
          { title:'ZUM-Unterrichten: Deutsch', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Deutsch' },
          {
            title:'Serlo: Deutsch als Fremdsprache',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/deutsch-als-fremdsprache',
          },
        ],
      },
      {
        subj:'Mathematik',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'KMK Bildungsstandards Mathematik Primarbereich',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_10_15-Bildungsstandards-Mathe-Primar.pdf',
          },
          {
            title:'Serlo Mathe: Grundrechenarten',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1386/grundrechenarten',
          },
          {
            title:'Serlo Mathe: Zahlen und Größen',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1385/zahlen-und-groessen',
          },
        ],
      },
    ],
    kl3:[
      {
        subj:'Deutsch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards Deutsch Primarbereich',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_10_15-Bildungsstandards-Deutsch-Primar.pdf',
          },
          { title:'ZUM-Unterrichten: Deutsch', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Deutsch' },
          {
            title:'Serlo: Deutsch als Fremdsprache',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/deutsch-als-fremdsprache',
          },
        ],
      },
      {
        subj:'Mathematik',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'KMK Bildungsstandards Mathematik Primarbereich',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_10_15-Bildungsstandards-Mathe-Primar.pdf',
          },
          {
            title:'Serlo Mathe: Grundrechenarten',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1386/grundrechenarten',
          },
          {
            title:'Serlo Mathe: Zahlen und Größen',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1385/zahlen-und-groessen',
          },
        ],
      },
    ],
    kl4:[
      {
        subj:'Deutsch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards Deutsch Primarbereich',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_10_15-Bildungsstandards-Deutsch-Primar.pdf',
          },
          { title:'ZUM-Unterrichten: Deutsch', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Deutsch' },
          {
            title:'Serlo: Deutsch als Fremdsprache',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/deutsch-als-fremdsprache',
          },
        ],
      },
      {
        subj:'Mathematik',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'KMK Bildungsstandards Mathematik Primarbereich',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_10_15-Bildungsstandards-Mathe-Primar.pdf',
          },
          {
            title:'Serlo Mathe: Grundrechenarten',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1386/grundrechenarten',
          },
          {
            title:'Serlo Mathe: Zahlen und Größen',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1385/zahlen-und-groessen',
          },
        ],
      },
    ],
    kl5:[
      {
        subj:'Deutsch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards Deutsch Mittlerer Schulabschluss',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-BS-Deutsch-MS.pdf',
          },
          { title:'ZUM-Unterrichten: Deutsch', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Deutsch' },
        ],
      },
      {
        subj:'Mathematik',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'KMK Bildungsstandards Mathematik Mittlerer Schulabschluss',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-Bildungsstandards-Mathe-Mittleren-SA.pdf',
          },
          {
            title:'Serlo Mathe: Bruchrechnen und Dezimalzahlen',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1389/bruchrechnen-und-dezimalzahlen',
          },
          {
            title:'Serlo Mathe: Teiler und Primzahlen',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/23875/teiler-und-primzahlen',
          },
          { title:'Serlo Mathe: Geometrie', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/mathe/1288/geometrie' },
        ],
      },
      {
        subj:'Englisch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards erste Fremdsprache (Englisch/Französisch) MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-BS-erste-Fremdsprache.pdf',
          },
          { title:'Serlo: Englisch', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/englisch' },
          { title:'ZUM-Unterrichten: Englisch', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Englisch' },
        ],
      },
      {
        subj:'Biologie',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'KMK Bildungsstandards Biologie MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_12_16-Bildungsstandards-Biologie.pdf',
          },
          { title:'Serlo: Biologie', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/biologie' },
          { title:'ZUM-Unterrichten: Biologie', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Biologie' },
        ],
      },
      {
        subj:'Geographie',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          { title:'ZUM-Unterrichten: Erdkunde', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Erdkunde' },
        ],
      },
      {
        subj:'Informatik',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Serlo: Informatik', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/informatik' },
          {
            title:'ZUM-Unterrichten: Informatik',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Informatik',
          },
        ],
      },
    ],
    kl6:[
      {
        subj:'Deutsch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards Deutsch Mittlerer Schulabschluss',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-BS-Deutsch-MS.pdf',
          },
          { title:'ZUM-Unterrichten: Deutsch', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Deutsch' },
        ],
      },
      {
        subj:'Mathematik',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'KMK Bildungsstandards Mathematik Mittlerer Schulabschluss',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-Bildungsstandards-Mathe-Mittleren-SA.pdf',
          },
          {
            title:'Serlo Mathe: Bruchrechnen und Dezimalzahlen',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1389/bruchrechnen-und-dezimalzahlen',
          },
          {
            title:'Serlo Mathe: Teiler und Primzahlen',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/23875/teiler-und-primzahlen',
          },
          { title:'Serlo Mathe: Geometrie', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/mathe/1288/geometrie' },
        ],
      },
      {
        subj:'Englisch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards erste Fremdsprache (Englisch/Französisch) MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-BS-erste-Fremdsprache.pdf',
          },
          { title:'Serlo: Englisch', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/englisch' },
          { title:'ZUM-Unterrichten: Englisch', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Englisch' },
        ],
      },
      {
        subj:'Französisch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards erste Fremdsprache MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-BS-erste-Fremdsprache.pdf',
          },
          {
            title:'ZUM-Unterrichten: Französisch',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Franz%C3%B6sisch',
          },
        ],
      },
      {
        subj:'Biologie',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'KMK Bildungsstandards Biologie MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_12_16-Bildungsstandards-Biologie.pdf',
          },
          { title:'Serlo: Biologie', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/biologie' },
          { title:'ZUM-Unterrichten: Biologie', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Biologie' },
        ],
      },
      {
        subj:'Physik',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards Physik MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_12_16-Bildungsstandards-Physik-Mittleren-SA.pdf',
          },
          { title:'Serlo: Physik', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/physik' },
          { title:'ZUM-Unterrichten: Physik', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Physik' },
        ],
      },
      {
        subj:'Geographie',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          { title:'ZUM-Unterrichten: Erdkunde', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Erdkunde' },
        ],
      },
      {
        subj:'Informatik',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Serlo: Informatik', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/informatik' },
          {
            title:'ZUM-Unterrichten: Informatik',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Informatik',
          },
        ],
      },
    ],
    kl7:[
      {
        subj:'Deutsch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards Deutsch Mittlerer Schulabschluss',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-BS-Deutsch-MS.pdf',
          },
          { title:'ZUM-Unterrichten: Deutsch', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Deutsch' },
        ],
      },
      {
        subj:'Mathematik',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'KMK Bildungsstandards Mathematik Mittlerer Schulabschluss',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-Bildungsstandards-Mathe-Mittleren-SA.pdf',
          },
          {
            title:'Serlo Mathe: Proportionalität und Dreisatz',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1346/proportionalitaet-und-dreisatz',
          },
          {
            title:'Serlo Mathe: Prozent- und Zinsrechnung',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1377/prozent-und-zinsrechnung',
          },
          {
            title:'Serlo Mathe: Terme und Variablen',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1331/terme-und-variablen',
          },
        ],
      },
      {
        subj:'Englisch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards erste Fremdsprache (Englisch/Französisch) MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-BS-erste-Fremdsprache.pdf',
          },
          { title:'Serlo: Englisch', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/englisch' },
          { title:'ZUM-Unterrichten: Englisch', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Englisch' },
        ],
      },
      {
        subj:'Französisch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards erste Fremdsprache MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-BS-erste-Fremdsprache.pdf',
          },
          {
            title:'ZUM-Unterrichten: Französisch',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Franz%C3%B6sisch',
          },
        ],
      },
      {
        subj:'Biologie',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'KMK Bildungsstandards Biologie MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_12_16-Bildungsstandards-Biologie.pdf',
          },
          { title:'Serlo: Biologie', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/biologie' },
          { title:'ZUM-Unterrichten: Biologie', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Biologie' },
        ],
      },
      {
        subj:'Physik',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards Physik MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_12_16-Bildungsstandards-Physik-Mittleren-SA.pdf',
          },
          { title:'Serlo: Physik', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/physik' },
          { title:'ZUM-Unterrichten: Physik', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Physik' },
        ],
      },
      {
        subj:'Chemie',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'KMK Bildungsstandards Chemie MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_12_16-Bildungsstandards-Chemie.pdf',
          },
          { title:'Serlo: Chemie', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/chemie' },
          { title:'ZUM-Unterrichten: Chemie', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Chemie' },
        ],
      },
      {
        subj:'Geschichte',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ZUM-Unterrichten: Geschichte',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Geschichte',
          },
        ],
      },
      {
        subj:'Geographie',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          { title:'ZUM-Unterrichten: Erdkunde', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Erdkunde' },
        ],
      },
      {
        subj:'Informatik',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Serlo: Informatik', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/informatik' },
          {
            title:'ZUM-Unterrichten: Informatik',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Informatik',
          },
        ],
      },
    ],
    kl8:[
      {
        subj:'Deutsch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards Deutsch Mittlerer Schulabschluss',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-BS-Deutsch-MS.pdf',
          },
          { title:'ZUM-Unterrichten: Deutsch', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Deutsch' },
        ],
      },
      {
        subj:'Mathematik',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'KMK Bildungsstandards Mathematik Mittlerer Schulabschluss',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-Bildungsstandards-Mathe-Mittleren-SA.pdf',
          },
          { title:'Serlo Mathe: Funktionen', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/mathe/1289/funktionen' },
          {
            title:'Serlo Mathe: Gleichungssysteme',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1335/gleichungssysteme',
          },
          { title:'Serlo Mathe: Gleichungen', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/mathe/1371/gleichungen' },
        ],
      },
      {
        subj:'Englisch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards erste Fremdsprache (Englisch/Französisch) MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-BS-erste-Fremdsprache.pdf',
          },
          { title:'Serlo: Englisch', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/englisch' },
          { title:'ZUM-Unterrichten: Englisch', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Englisch' },
        ],
      },
      {
        subj:'Französisch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards erste Fremdsprache MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-BS-erste-Fremdsprache.pdf',
          },
          {
            title:'ZUM-Unterrichten: Französisch',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Franz%C3%B6sisch',
          },
        ],
      },
      {
        subj:'Biologie',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'KMK Bildungsstandards Biologie MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_12_16-Bildungsstandards-Biologie.pdf',
          },
          { title:'Serlo: Biologie', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/biologie' },
          { title:'ZUM-Unterrichten: Biologie', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Biologie' },
        ],
      },
      {
        subj:'Physik',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards Physik MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_12_16-Bildungsstandards-Physik-Mittleren-SA.pdf',
          },
          { title:'Serlo: Physik', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/physik' },
          { title:'ZUM-Unterrichten: Physik', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Physik' },
        ],
      },
      {
        subj:'Chemie',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'KMK Bildungsstandards Chemie MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_12_16-Bildungsstandards-Chemie.pdf',
          },
          { title:'Serlo: Chemie', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/chemie' },
          { title:'ZUM-Unterrichten: Chemie', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Chemie' },
        ],
      },
      {
        subj:'Geschichte',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ZUM-Unterrichten: Geschichte',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Geschichte',
          },
        ],
      },
      {
        subj:'Geographie',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          { title:'ZUM-Unterrichten: Erdkunde', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Erdkunde' },
        ],
      },
      {
        subj:'Sozialkunde / Politik',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'ZUM-Unterrichten: Politik', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Politik' },
          { title:'Bundeszentrale für politische Bildung (bpb)', term:'Deutsches Abitur (DIA)', url:'https://www.bpb.de/' },
        ],
      },
      {
        subj:'Informatik',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Serlo: Informatik', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/informatik' },
          {
            title:'ZUM-Unterrichten: Informatik',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Informatik',
          },
        ],
      },
    ],
    kl9:[
      {
        subj:'Deutsch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards Deutsch Mittlerer Schulabschluss',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-BS-Deutsch-MS.pdf',
          },
          { title:'ZUM-Unterrichten: Deutsch', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Deutsch' },
        ],
      },
      {
        subj:'Mathematik',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'KMK Bildungsstandards Mathematik Mittlerer Schulabschluss',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-Bildungsstandards-Mathe-Mittleren-SA.pdf',
          },
          {
            title:'Serlo Mathe: Satzgruppe des Pythagoras',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1381/satzgruppe-des-pythagoras',
          },
          {
            title:'Serlo Mathe: Potenzen, Wurzeln und Logarithmen',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1328/potenzen-wurzeln-und-logarithmen',
          },
          {
            title:'Serlo Mathe: Räumliche Figuren',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1300/raeumliche-figuren',
          },
        ],
      },
      {
        subj:'Englisch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards erste Fremdsprache (Englisch/Französisch) MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-BS-erste-Fremdsprache.pdf',
          },
          { title:'Serlo: Englisch', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/englisch' },
          { title:'ZUM-Unterrichten: Englisch', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Englisch' },
        ],
      },
      {
        subj:'Französisch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards erste Fremdsprache MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-BS-erste-Fremdsprache.pdf',
          },
          {
            title:'ZUM-Unterrichten: Französisch',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Franz%C3%B6sisch',
          },
        ],
      },
      {
        subj:'Biologie',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'KMK Bildungsstandards Biologie MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_12_16-Bildungsstandards-Biologie.pdf',
          },
          { title:'Serlo: Biologie', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/biologie' },
          { title:'ZUM-Unterrichten: Biologie', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Biologie' },
        ],
      },
      {
        subj:'Physik',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards Physik MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_12_16-Bildungsstandards-Physik-Mittleren-SA.pdf',
          },
          { title:'Serlo: Physik', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/physik' },
          { title:'ZUM-Unterrichten: Physik', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Physik' },
        ],
      },
      {
        subj:'Chemie',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'KMK Bildungsstandards Chemie MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_12_16-Bildungsstandards-Chemie.pdf',
          },
          { title:'Serlo: Chemie', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/chemie' },
          { title:'ZUM-Unterrichten: Chemie', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Chemie' },
        ],
      },
      {
        subj:'Geschichte',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ZUM-Unterrichten: Geschichte',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Geschichte',
          },
        ],
      },
      {
        subj:'Geographie',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          { title:'ZUM-Unterrichten: Erdkunde', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Erdkunde' },
        ],
      },
      {
        subj:'Sozialkunde / Politik',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'ZUM-Unterrichten: Politik', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Politik' },
          { title:'Bundeszentrale für politische Bildung (bpb)', term:'Deutsches Abitur (DIA)', url:'https://www.bpb.de/' },
        ],
      },
      {
        subj:'Informatik',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Serlo: Informatik', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/informatik' },
          {
            title:'ZUM-Unterrichten: Informatik',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Informatik',
          },
        ],
      },
    ],
    kl10:[
      {
        subj:'Einführungsphase / DIA',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK: Prüfungsordnung Deutsches Internationales Abitur (DIA-PO, 2015)',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2015/2015_06_11-PO-Deutsches-Internationales-Abitur.pdf',
          },
          {
            title:'KMK: Richtlinien Deutsches Internationales Abitur',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2015/2015_06_11-Richtlinien-Deutsches-Inter-Abitur.pdf',
          },
          {
            title:'KMK: FAQ zum DIA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/doc/Bildung/Auslandsschulwesen/ServiceAbitur/2019-09-25-FAQ-DIA_16-03-2022.pdf',
          },
        ],
      },
      {
        subj:'Deutsch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards Deutsch Mittlerer Schulabschluss',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-BS-Deutsch-MS.pdf',
          },
          { title:'ZUM-Unterrichten: Deutsch', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Deutsch' },
        ],
      },
      {
        subj:'Mathematik',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'KMK Bildungsstandards Mathematik Mittlerer Schulabschluss',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-Bildungsstandards-Mathe-Mittleren-SA.pdf',
          },
          {
            title:'Serlo Mathe: Sinus, Kosinus und Tangens',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1383/sinus-kosinus-und-tangens',
          },
          {
            title:'Serlo Mathe: Wichtige Funktionstypen',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1303/wichtige-funktionstypen-und-ihre-eigenschaften',
          },
          {
            title:'Serlo Mathe: Ableitung von Funktionen',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1304/ableitung-von-funktionen',
          },
        ],
      },
      {
        subj:'Englisch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards erste Fremdsprache (Englisch/Französisch) MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-BS-erste-Fremdsprache.pdf',
          },
          { title:'Serlo: Englisch', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/englisch' },
          { title:'ZUM-Unterrichten: Englisch', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Englisch' },
        ],
      },
      {
        subj:'Französisch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards erste Fremdsprache MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2003/2003_12_04-BS-erste-Fremdsprache.pdf',
          },
          {
            title:'ZUM-Unterrichten: Französisch',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Franz%C3%B6sisch',
          },
        ],
      },
      {
        subj:'Biologie',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'KMK Bildungsstandards Biologie MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_12_16-Bildungsstandards-Biologie.pdf',
          },
          { title:'Serlo: Biologie', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/biologie' },
          { title:'ZUM-Unterrichten: Biologie', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Biologie' },
        ],
      },
      {
        subj:'Physik',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards Physik MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_12_16-Bildungsstandards-Physik-Mittleren-SA.pdf',
          },
          { title:'Serlo: Physik', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/physik' },
          { title:'ZUM-Unterrichten: Physik', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Physik' },
        ],
      },
      {
        subj:'Chemie',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'KMK Bildungsstandards Chemie MSA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2004/2004_12_16-Bildungsstandards-Chemie.pdf',
          },
          { title:'Serlo: Chemie', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/chemie' },
          { title:'ZUM-Unterrichten: Chemie', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Chemie' },
        ],
      },
      {
        subj:'Geschichte',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'ZUM-Unterrichten: Geschichte',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Geschichte',
          },
        ],
      },
      {
        subj:'Geographie',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          { title:'ZUM-Unterrichten: Erdkunde', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Erdkunde' },
        ],
      },
      {
        subj:'Sozialkunde / Politik',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'ZUM-Unterrichten: Politik', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Politik' },
          { title:'Bundeszentrale für politische Bildung (bpb)', term:'Deutsches Abitur (DIA)', url:'https://www.bpb.de/' },
        ],
      },
      {
        subj:'Informatik',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Serlo: Informatik', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/informatik' },
          {
            title:'ZUM-Unterrichten: Informatik',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Informatik',
          },
        ],
      },
    ],
    kl11:[
      {
        subj:'DIA-Prüfungsordnung',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK: Prüfungsordnung Deutsches Internationales Abitur (DIA-PO, 2015)',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2015/2015_06_11-PO-Deutsches-Internationales-Abitur.pdf',
          },
          {
            title:'KMK: Richtlinien Deutsches Internationales Abitur',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2015/2015_06_11-Richtlinien-Deutsches-Inter-Abitur.pdf',
          },
          {
            title:'KMK: FAQ zum DIA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/doc/Bildung/Auslandsschulwesen/ServiceAbitur/2019-09-25-FAQ-DIA_16-03-2022.pdf',
          },
        ],
      },
      {
        subj:'Deutsch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Kerncurriculum Deutsch für DAS-Oberstufe',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2010/2010_04_29-Kerncurriculum-Deutsch.pdf',
          },
          {
            title:'KMK Bildungsstandards Deutsch Abitur',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2012/2012_10_18-Bildungsstandards-Deutsch-Abi.pdf',
          },
        ],
      },
      {
        subj:'Mathematik',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'KMK Kerncurriculum Mathematik für DAS-Oberstufe',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2010/2010_04_29-Kerncurriculum-Mathematik.pdf',
          },
          {
            title:'KMK Bildungsstandards Mathematik Abitur',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2012/2012_10_18-Bildungsstandards-Mathe-Abi.pdf',
          },
          {
            title:'KMK: Fachliche Hinweise Abitur Mathematik an Deutschen Schulen im Ausland (2024)',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/doc/Bildung/Auslandsschulwesen/ServiceAbitur/2024_03_12_FachHi_Abi_Mathematik.pdf',
          },
          {
            title:'Serlo Mathe: Ableitung von Funktionen',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1304/ableitung-von-funktionen',
          },
          {
            title:'Serlo Mathe: Analytische Geometrie',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1413/analytische-geometrie',
          },
          {
            title:'Serlo Mathe: Lineare Algebra',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/178792/lineare-algebra',
          },
        ],
      },
      {
        subj:'Englisch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Kerncurriculum Englisch für DAS-Oberstufe',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2010/2010_04_29-Kerncurriculum-Englisch.pdf',
          },
          {
            title:'KMK Bildungsstandards fortgeführte Fremdsprache Abitur',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2012/2012_10_18-Bildungsstandards-Fortgef-FS-Abi.pdf',
          },
        ],
      },
      {
        subj:'Französisch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards fortgeführte Fremdsprache Abitur',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2012/2012_10_18-Bildungsstandards-Fortgef-FS-Abi.pdf',
          },
          {
            title:'ZUM-Unterrichten: Französisch',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Franz%C3%B6sisch',
          },
        ],
      },
      {
        subj:'Geschichte',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Kerncurriculum Geschichte für DAS-Oberstufe',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2010/2010_04_29-Kerncurriculum-Geschichte.pdf',
          },
          {
            title:'ZUM-Unterrichten: Geschichte',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Geschichte',
          },
        ],
      },
      {
        subj:'Biologie',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'KMK Kerncurriculum Biologie für DAS-Oberstufe (2024)',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2024/2024_03_01-Kerncurriculum-Biologie.pdf',
          },
          {
            title:'KMK Bildungsstandards Biologie Abitur (2020)',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2020/2020_06_18-BildungsstandardsAHR_Biologie.pdf',
          },
          { title:'Serlo: Biologie', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/biologie' },
        ],
      },
      {
        subj:'Chemie',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'KMK Kerncurriculum Chemie für DAS-Oberstufe (2024)',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2024/2024_03_01-Kerncurriculum-Chemie.pdf',
          },
          {
            title:'KMK Bildungsstandards Chemie Abitur (2020)',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2020/2020_06_18-BildungsstandardsAHR_Chemie.pdf',
          },
          { title:'Serlo: Chemie', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/chemie' },
        ],
      },
      {
        subj:'Physik',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Kerncurriculum Physik für DAS-Oberstufe (2024)',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2024/2024_03_01-Kerncurriculum-Physik.pdf',
          },
          {
            title:'KMK Bildungsstandards Physik Abitur (2020)',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2020/2020_06_18-BildungsstandardsAHR_Physik.pdf',
          },
          { title:'ZUM-Unterrichten: Physik', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Physik' },
        ],
      },
      {
        subj:'Sozialkunde / Politik',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Bundeszentrale für politische Bildung (bpb)', term:'Deutsches Abitur (DIA)', url:'https://www.bpb.de/' },
          { title:'ZUM-Unterrichten: Politik', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Politik' },
        ],
      },
      {
        subj:'Informatik',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Serlo: Informatik', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/informatik' },
          {
            title:'ZUM-Unterrichten: Informatik',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Informatik',
          },
        ],
      },
    ],
    kl12:[
      {
        subj:'DIA-Prüfungsordnung',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK: Prüfungsordnung Deutsches Internationales Abitur (DIA-PO, 2015)',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2015/2015_06_11-PO-Deutsches-Internationales-Abitur.pdf',
          },
          {
            title:'KMK: Richtlinien Deutsches Internationales Abitur',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2015/2015_06_11-Richtlinien-Deutsches-Inter-Abitur.pdf',
          },
          {
            title:'KMK: FAQ zum DIA',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/doc/Bildung/Auslandsschulwesen/ServiceAbitur/2019-09-25-FAQ-DIA_16-03-2022.pdf',
          },
        ],
      },
      {
        subj:'Deutsch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Kerncurriculum Deutsch für DAS-Oberstufe',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2010/2010_04_29-Kerncurriculum-Deutsch.pdf',
          },
          {
            title:'KMK Bildungsstandards Deutsch Abitur',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2012/2012_10_18-Bildungsstandards-Deutsch-Abi.pdf',
          },
        ],
      },
      {
        subj:'Mathematik',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'KMK Kerncurriculum Mathematik für DAS-Oberstufe',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2010/2010_04_29-Kerncurriculum-Mathematik.pdf',
          },
          {
            title:'KMK Bildungsstandards Mathematik Abitur',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2012/2012_10_18-Bildungsstandards-Mathe-Abi.pdf',
          },
          {
            title:'KMK: Fachliche Hinweise Abitur Mathematik an Deutschen Schulen im Ausland (2024)',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/doc/Bildung/Auslandsschulwesen/ServiceAbitur/2024_03_12_FachHi_Abi_Mathematik.pdf',
          },
          {
            title:'Serlo Mathe: Stammfunktion, Integral und Flächenberechnung',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/1306/stammfunktion-integral-und-flaechenberechnung',
          },
          { title:'Serlo Mathe: Stochastik', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/mathe/1290/stochastik' },
          {
            title:'Serlo Mathe: Hypothesentests',
            term:'Deutsches Abitur (DIA)',
            url:'https://de.serlo.org/mathe/22792/hypothesentests',
          },
        ],
      },
      {
        subj:'Englisch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Kerncurriculum Englisch für DAS-Oberstufe',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2010/2010_04_29-Kerncurriculum-Englisch.pdf',
          },
          {
            title:'KMK Bildungsstandards fortgeführte Fremdsprache Abitur',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2012/2012_10_18-Bildungsstandards-Fortgef-FS-Abi.pdf',
          },
        ],
      },
      {
        subj:'Französisch',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Bildungsstandards fortgeführte Fremdsprache Abitur',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2012/2012_10_18-Bildungsstandards-Fortgef-FS-Abi.pdf',
          },
          {
            title:'ZUM-Unterrichten: Französisch',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Franz%C3%B6sisch',
          },
        ],
      },
      {
        subj:'Geschichte',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Kerncurriculum Geschichte für DAS-Oberstufe',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2010/2010_04_29-Kerncurriculum-Geschichte.pdf',
          },
          {
            title:'ZUM-Unterrichten: Geschichte',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Geschichte',
          },
        ],
      },
      {
        subj:'Biologie',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'KMK Kerncurriculum Biologie für DAS-Oberstufe (2024)',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2024/2024_03_01-Kerncurriculum-Biologie.pdf',
          },
          {
            title:'KMK Bildungsstandards Biologie Abitur (2020)',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2020/2020_06_18-BildungsstandardsAHR_Biologie.pdf',
          },
          { title:'Serlo: Biologie', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/biologie' },
        ],
      },
      {
        subj:'Chemie',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'KMK Kerncurriculum Chemie für DAS-Oberstufe (2024)',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2024/2024_03_01-Kerncurriculum-Chemie.pdf',
          },
          {
            title:'KMK Bildungsstandards Chemie Abitur (2020)',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2020/2020_06_18-BildungsstandardsAHR_Chemie.pdf',
          },
          { title:'Serlo: Chemie', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/chemie' },
        ],
      },
      {
        subj:'Physik',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'KMK Kerncurriculum Physik für DAS-Oberstufe (2024)',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2024/2024_03_01-Kerncurriculum-Physik.pdf',
          },
          {
            title:'KMK Bildungsstandards Physik Abitur (2020)',
            term:'Deutsches Abitur (DIA)',
            url:'https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2020/2020_06_18-BildungsstandardsAHR_Physik.pdf',
          },
          { title:'ZUM-Unterrichten: Physik', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Physik' },
        ],
      },
      {
        subj:'Sozialkunde / Politik',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Bundeszentrale für politische Bildung (bpb)', term:'Deutsches Abitur (DIA)', url:'https://www.bpb.de/' },
          { title:'ZUM-Unterrichten: Politik', term:'Deutsches Abitur (DIA)', url:'https://unterrichten.zum.de/wiki/Politik' },
        ],
      },
      {
        subj:'Informatik',
        icon:'📘',
        color:'#A855F7',
        books:[
          { title:'Serlo: Informatik', term:'Deutsches Abitur (DIA)', url:'https://de.serlo.org/informatik' },
          {
            title:'ZUM-Unterrichten: Informatik',
            term:'Deutsches Abitur (DIA)',
            url:'https://unterrichten.zum.de/wiki/Informatik',
          },
        ],
      },
    ],
  },
  azhar:{
    az_p1:[
      {
        subj:'القرآن الكريم وتجويده',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'كتاب التجويد — الصف الأول الابتدائي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prim/%D8%A7%D9%84%D8%AA%D8%AC%D9%88%D9%8A%D8%AF-%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%A7%D9%88%D9%84%20%D8%A7%D9%84%D8%A7%D8%A8%D8%AA%D8%AF%D8%A7%D8%A6%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'اللغة الإنجليزية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'English for Primary 1 — Student Book (Al-Azhar)',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/sb/G_01-SB-3-8-2025.pdf',
          },
        ],
      },
    ],
    az_p2:[
      {
        subj:'القرآن الكريم وتجويده',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'كتاب التجويد — الصف الثاني الابتدائي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prim/%D8%A7%D9%84%D8%AA%D8%AC%D9%88%D9%8A%D8%AF-%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%A7%D8%A8%D8%AA%D8%AF%D8%A7%D8%A6%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'اللغة الإنجليزية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'English for Primary 2 — Student Book (Al-Azhar)',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/sb/G_02_SB_14-9-2025.pdf',
          },
        ],
      },
    ],
    az_p3:[
      {
        subj:'القرآن الكريم وتجويده',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'كتاب التجويد — الصف الثالث الابتدائي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prim/%D8%A7%D9%84%D8%AA%D8%AC%D9%88%D9%8A%D8%AF-%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%A7%D8%A8%D8%AA%D8%AF%D8%A7%D8%A6%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'اللغة الإنجليزية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'English for Primary 3 — Student Book (Al-Azhar)',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/sb/G_03-SB-3-8-2025.pdf',
          },
        ],
      },
    ],
    az_p4:[
      {
        subj:'القرآن الكريم وتجويده',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'كتاب التجويد — الصف الرابع الابتدائي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prim/%D8%A7%D9%84%D8%AA%D8%AC%D9%88%D9%8A%D8%AF-%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%B1%D8%A7%D8%A8%D8%B9%20%D8%A7%D9%84%D8%A7%D8%A8%D8%AA%D8%AF%D8%A7%D8%A6%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'اللغة العربية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'كراسة الخط العربي — الصف الرابع الابتدائي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2025/pri/%D9%83%D8%B1%D8%A7%D8%B3%D8%A9%20%D8%A7%D9%84%D8%AE%D8%B7%20%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%204.pdf',
          },
        ],
      },
      {
        subj:'اللغة الإنجليزية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'English for Primary 4 — Student Book (Al-Azhar)',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/sb/G_04_SB_3-8-2025.pdf',
          },
        ],
      },
    ],
    az_p5:[
      {
        subj:'القرآن الكريم وتجويده',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'كتاب التجويد — الصف الخامس الابتدائي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prim/%D8%A7%D9%84%D8%AA%D8%AC%D9%88%D9%8A%D8%AF-%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AE%D8%A7%D9%85%D8%B3%20%D8%A7%D9%84%D8%A7%D8%A8%D8%AA%D8%AF%D8%A7%D8%A6%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'اللغة العربية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'كراسة الخط العربي — الصف الخامس الابتدائي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2025/pri/%D9%83%D8%B1%D8%A7%D8%B3%D8%A9%20%D8%A7%D9%84%D8%AE%D8%B7%20%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%205.pdf',
          },
        ],
      },
      {
        subj:'اللغة الإنجليزية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'English for Primary 5 — Student Book (Al-Azhar)',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/al/G_05_SB_3-8-2025.pdf',
          },
        ],
      },
    ],
    az_p6:[
      {
        subj:'القرآن الكريم وتجويده',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'كتاب التجويد — الصف السادس الابتدائي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prim/%D8%A7%D9%84%D8%AA%D8%AC%D9%88%D9%8A%D8%AF-%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%B3%D8%A7%D8%AF%D8%B3%20%D8%A7%D9%84%D8%A7%D8%A8%D8%AA%D8%AF%D8%A7%D8%A6%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'اللغة العربية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'كراسة الخط العربي — الصف السادس الابتدائي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2025/pri/%D9%83%D8%B1%D8%A7%D8%B3%D8%A9%20%D8%A7%D9%84%D8%AE%D8%B7%20%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%206.pdf',
          },
        ],
      },
      {
        subj:'اللغة الإنجليزية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'English for Primary 6 — Student Book (Al-Azhar)',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/al/G_06_SB_14-9-2025.pdf',
          },
        ],
      },
    ],
    az_m1:[
      {
        subj:'التجويد',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'بغية الطالبين في تجويد كلام رب العالمين (الإعدادي)',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2025/prep/prep1/%D8%A8%D8%BA%D9%8A%D8%A9%20%D8%A7%D9%84%D8%B7%D8%A7%D9%84%D8%A8%D9%8A%D9%86.pdf',
          },
        ],
      },
      {
        subj:'التوحيد',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'أصول الدين — الصف الأول الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D8%B5%D9%88%D9%84%20%D8%A7%D9%84%D8%AF%D9%8A%D9%86%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%A3%D9%88%D9%84%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'التفسير',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'أصول الدين — الصف الأول الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D8%B5%D9%88%D9%84%20%D8%A7%D9%84%D8%AF%D9%8A%D9%86%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%A3%D9%88%D9%84%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'الحديث',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'أصول الدين — الصف الأول الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D8%B5%D9%88%D9%84%20%D8%A7%D9%84%D8%AF%D9%8A%D9%86%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%A3%D9%88%D9%84%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'السيرة النبوية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'أصول الدين — الصف الأول الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D8%B5%D9%88%D9%84%20%D8%A7%D9%84%D8%AF%D9%8A%D9%86%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%A3%D9%88%D9%84%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'الفقه (حنفي / شافعي / مالكي / حنبلي)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'الفقه الحنفي (تيسير اللباب) — الصف الأول الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D8%AD%D9%86%D9%81%D9%8A%20-%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%A7%D9%88%D9%84%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
          {
            title:'الفقه الشافعي (تيسير التقريب) — الصف الأول الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D8%B4%D8%A7%D9%81%D8%B9%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%A3%D9%88%D9%84%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
          {
            title:'الفقه المالكي — الصف الأول الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%83%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%A7%D9%88%D9%84%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'النحو',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'اللغة العربية — الصف الأول الإعدادي — الفصل الأول',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%B9%D8%B1%D8%A8%D9%8A%201%D8%B9%20-%201.pdf',
          },
          {
            title:'اللغة العربية — الصف الأول الإعدادي — الفصل الثاني',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%B9%D8%B1%D8%A8%D9%8A1%20%D8%B9%20-%D8%AA2-.pdf',
          },
        ],
      },
      {
        subj:'المطالعة والنصوص',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'اللغة العربية — الصف الأول الإعدادي — الفصل الأول',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%B9%D8%B1%D8%A8%D9%8A%201%D8%B9%20-%201.pdf',
          },
          {
            title:'اللغة العربية — الصف الأول الإعدادي — الفصل الثاني',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%B9%D8%B1%D8%A8%D9%8A1%20%D8%B9%20-%D8%AA2-.pdf',
          },
        ],
      },
      {
        subj:'الإنشاء',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'اللغة العربية — الصف الأول الإعدادي — الفصل الأول',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%B9%D8%B1%D8%A8%D9%8A%201%D8%B9%20-%201.pdf',
          },
          {
            title:'اللغة العربية — الصف الأول الإعدادي — الفصل الثاني',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%B9%D8%B1%D8%A8%D9%8A1%20%D8%B9%20-%D8%AA2-.pdf',
          },
        ],
      },
      {
        subj:'اللغة الإنجليزية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'English for Preparatory 1 — Student Book (Al-Azhar)',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/sb/G_07_SB_3-8-2025.pdf',
          },
        ],
      },
    ],
    az_m2:[
      {
        subj:'التوحيد',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'أصول الدين — الصف الثاني الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D8%B5%D9%88%D9%84%20%D8%A7%D9%84%D8%AF%D9%8A%D9%86%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'التفسير',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'أصول الدين — الصف الثاني الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D8%B5%D9%88%D9%84%20%D8%A7%D9%84%D8%AF%D9%8A%D9%86%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'الحديث',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'أصول الدين — الصف الثاني الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D8%B5%D9%88%D9%84%20%D8%A7%D9%84%D8%AF%D9%8A%D9%86%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'السيرة النبوية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'أصول الدين — الصف الثاني الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D8%B5%D9%88%D9%84%20%D8%A7%D9%84%D8%AF%D9%8A%D9%86%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'الفقه (حنفي / شافعي / مالكي / حنبلي)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'الفقه الحنفي (تيسير اللباب) — الصف الثاني الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D8%AD%D9%86%D9%81%D9%8A%20-%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
          {
            title:'الفقه الشافعي (تيسير التقريب) — الصف الثاني الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D8%B4%D8%A7%D9%81%D8%B9%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
          {
            title:'الفقه المالكي — الصف الثاني الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%83%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'النحو',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'اللغة العربية — الصف الثاني الإعدادي — الفصل الأول',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%B9%D8%B1%D8%A8%D9%8A2%D8%B9%20-%201.pdf',
          },
          {
            title:'اللغة العربية — الصف الثاني الإعدادي — الفصل الثاني',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%B9%D8%B1%D8%A8%D9%8A2%20%D8%B9%20-%D8%AA2-.pdf',
          },
        ],
      },
      {
        subj:'المطالعة والنصوص',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'اللغة العربية — الصف الثاني الإعدادي — الفصل الأول',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%B9%D8%B1%D8%A8%D9%8A2%D8%B9%20-%201.pdf',
          },
          {
            title:'اللغة العربية — الصف الثاني الإعدادي — الفصل الثاني',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%B9%D8%B1%D8%A8%D9%8A2%20%D8%B9%20-%D8%AA2-.pdf',
          },
        ],
      },
      {
        subj:'الإنشاء',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'اللغة العربية — الصف الثاني الإعدادي — الفصل الأول',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%B9%D8%B1%D8%A8%D9%8A2%D8%B9%20-%201.pdf',
          },
          {
            title:'اللغة العربية — الصف الثاني الإعدادي — الفصل الثاني',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%B9%D8%B1%D8%A8%D9%8A2%20%D8%B9%20-%D8%AA2-.pdf',
          },
        ],
      },
      {
        subj:'اللغة الإنجليزية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'English for Preparatory 2 — Student Book (Al-Azhar)',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/newsc_2/Grade%208%20SB.pdf',
          },
        ],
      },
    ],
    az_m3:[
      {
        subj:'التوحيد',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'أصول الدين — الصف الثالث الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D8%B5%D9%88%D9%84%20%D8%A7%D9%84%D8%AF%D9%8A%D9%86%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'التفسير',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'أصول الدين — الصف الثالث الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D8%B5%D9%88%D9%84%20%D8%A7%D9%84%D8%AF%D9%8A%D9%86%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'الحديث',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'أصول الدين — الصف الثالث الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D8%B5%D9%88%D9%84%20%D8%A7%D9%84%D8%AF%D9%8A%D9%86%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'السيرة النبوية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'أصول الدين — الصف الثالث الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D8%B5%D9%88%D9%84%20%D8%A7%D9%84%D8%AF%D9%8A%D9%86%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'الفقه (حنفي / شافعي / مالكي / حنبلي)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'الفقه الحنفي (تيسير اللباب) — الصف الثالث الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D8%AD%D9%86%D9%81%D9%8A%20-%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
          {
            title:'الفقه الشافعي (تيسير التقريب) — الصف الثالث الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D8%B4%D8%A7%D9%81%D8%B9%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
          {
            title:'الفقه المالكي — الصف الثالث الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%83%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'الثقافة الإسلامية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'الثقافة الإسلامية — الصف الثالث الإعدادي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2025/prep/prep3/%D8%A7%D9%84%D8%AB%D9%82%D8%A7%D9%81%D8%A9%20%D8%A7%D9%84%D8%A5%D8%B3%D9%84%D8%A7%D9%85%D9%8A%D8%A9.pdf',
          },
        ],
      },
      {
        subj:'النحو',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'اللغة العربية — الصف الثالث الإعدادي — الفصل الأول',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%B9%D8%B1%D8%A8%D9%8A3%D8%B9%20-%201.pdf',
          },
          {
            title:'اللغة العربية — الصف الثالث الإعدادي — الفصل الثاني',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%B9%D8%B1%D8%A8%D9%8A3%20%D8%B9%20-%D8%AA2-.pdf',
          },
        ],
      },
      {
        subj:'المطالعة والنصوص',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'اللغة العربية — الصف الثالث الإعدادي — الفصل الأول',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%B9%D8%B1%D8%A8%D9%8A3%D8%B9%20-%201.pdf',
          },
          {
            title:'اللغة العربية — الصف الثالث الإعدادي — الفصل الثاني',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%B9%D8%B1%D8%A8%D9%8A3%20%D8%B9%20-%D8%AA2-.pdf',
          },
        ],
      },
      {
        subj:'الإنشاء',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'اللغة العربية — الصف الثالث الإعدادي — الفصل الأول',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%B9%D8%B1%D8%A8%D9%8A3%D8%B9%20-%201.pdf',
          },
          {
            title:'اللغة العربية — الصف الثالث الإعدادي — الفصل الثاني',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/prep/%D8%B9%D8%B1%D8%A8%D9%8A3%20%D8%B9%20-%D8%AA2-.pdf',
          },
        ],
      },
      {
        subj:'اللغة الإنجليزية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'English for Preparatory 3 — Student Book (Al-Azhar)',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/sb/G_09_SB_7-9-2025.pdf',
          },
        ],
      },
    ],
    az_s1:[
      {
        subj:'الفقه (حنفي / شافعي / مالكي / حنبلي)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'المختار من الاختيار لتعليل المختار (حنفي) — الصف الأول الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/1/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D8%AD%D9%86%D9%81%D9%8A%20-%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%A7%D9%88%D9%84%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
          {
            title:'المختار من الإقناع في حل ألفاظ أبي شجاع (شافعي) — الصف الأول الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/1/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D8%B4%D8%A7%D9%81%D8%B9%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%A3%D9%88%D9%84%20%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
          {
            title:'المختار من الشرح الصغير (مالكي) — الصف الأول الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/1/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%83%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D9%84%D8%A3%D9%88%D9%84%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'التفسير وعلوم القرآن',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'تيسير تفسير النسفي — الصف الأول الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/1/%D8%AA%D9%81%D8%B3%D9%8A%D8%B1%20%D8%A7%D9%84%D9%86%D8%B3%D9%81%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%A3%D9%88%D9%84%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'الحديث وعلومه',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'الحديث (تيسير فتح المبدي بشرح مختصر الزبيدي) — الصف الأول الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/1/%D8%A7%D9%84%D8%AD%D8%AF%D9%8A%D8%AB%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%A7%D9%88%D9%84%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A%20.pdf',
          },
        ],
      },
      {
        subj:'التوحيد والمنطق القديم',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'التوحيد (تيسير شرح جوهرة التوحيد) — الصف الأول الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/1/%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D9%8A%D8%AF%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%A3%D9%88%D9%84%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
          {
            title:'المنطق — الصف الأول الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/1/%D9%85%D9%86%D8%B7%D9%82%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%A7%D9%88%D9%84%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'الثقافة الإسلامية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'الثقافة الإسلامية — الصف الأول الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/replace/%D8%A7%D9%84%D8%AB%D9%82%D8%A7%D9%81%D8%A9%20%D8%A7%D9%84%D8%A5%D8%B3%D9%84%D8%A7%D9%85%D9%8A%D8%A9%201%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'النحو',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'شرح ابن عقيل على ألفية ابن مالك — الصف الأول الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/1/%D8%B4%D8%B1%D8%AD%20%D8%A7%D8%A8%D9%86%20%D8%B9%D9%82%D9%8A%D9%84%201%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'الصرف',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'الصرف الميسر — الصف الأول الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/1/%D8%B5%D8%B1%D9%81%201%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'البلاغة',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'البلاغة العربية — الصف الأول الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/1/%D8%A8%D9%84%D8%A7%D8%BA%D8%A9%201%20%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'الأدب وفنون الكتابة',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'تاريخ الأدب العربي ونصوصه — الصف الأول الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/1/%D8%A3%D8%AF%D8%A8%20-%201%20%D8%AB.pdf',
          },
          {
            title:'المطالعة والإنشاء — الصف الأول الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/1/%D9%85%D8%B7%D8%A7%D9%84%D8%B9%D8%A9%20%D9%88%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%201%D8%AB-.pdf',
          },
        ],
      },
      {
        subj:'اللغة الأجنبية الأولى (الإنجليزية)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'A Glimpse of Revelation I — Student Book (Al-Azhar)',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/tg/T%20G%20-%20A%20Glimpse%20of%20Revelation%20I.pdf',
          },
          {
            title:'English for Secondary 1 — Student Book (Al-Azhar)',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/sb/G_10_SB_8-9-2025.pdf',
          },
        ],
      },
    ],
    az_s2_sci:[
      {
        subj:'الفقه (حنفي / شافعي / مالكي / حنبلي)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'المختار من الاختيار لتعليل المختار (حنفي) — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D8%AD%D9%86%D9%81%D9%8A%20-%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
          {
            title:'المختار من الإقناع في حل ألفاظ أبي شجاع (شافعي) — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D8%B4%D8%A7%D9%81%D8%B9%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
          {
            title:'المختار من الشرح الصغير (مالكي) — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%83%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'التفسير',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'تيسير تفسير النسفي — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%AA%D9%81%D8%B3%D9%8A%D8%B1%20%D8%A7%D9%84%D9%86%D8%B3%D9%81%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'الحديث',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'الحديث (تيسير فتح المبدي بشرح مختصر الزبيدي) — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%A7%D9%84%D8%AD%D8%AF%D9%8A%D8%AB%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A%20.pdf',
          },
        ],
      },
      {
        subj:'التوحيد',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'التوحيد (تيسير شرح جوهرة التوحيد) — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D9%8A%D8%AF%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'النحو',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'شرح ابن عقيل على ألفية ابن مالك — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%B4%D8%B1%D8%AD%20%D8%A7%D8%A8%D9%86%20%D8%B9%D9%82%D9%8A%D9%84%202%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'الصرف',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'الصرف الميسر — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%B5%D8%B1%D9%81%202%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'البلاغة',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'البلاغة العربية — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%A8%D9%84%D8%A7%D8%BA%D8%A9%202%20%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'الأدب والنصوص',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'تاريخ الأدب العربي ونصوصه — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%A3%D8%AF%D8%A8%20-%202%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'المطالعة والإنشاء',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'المطالعة والإنشاء — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D9%85%D8%B7%D8%A7%D9%84%D8%B9%D8%A9%20%D9%88%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%202%D8%AB-.pdf',
          },
        ],
      },
      {
        subj:'العروض والقافية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'العروض والقافية — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/2026/%D8%AB2/%D8%A7%D9%84%D8%B9%D8%B1%D9%88%D8%B6%20%D9%88%D8%A7%D9%84%D9%82%D8%A7%D9%81%D9%8A%D8%A9%202%D8%AB%20(1).pdf',
          },
        ],
      },
      {
        subj:'المنطق',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'المنطق — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D9%85%D9%86%D8%B7%D9%82%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'اللغة الإنجليزية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'A Glimpse of Revelation II — Student Book (Al-Azhar)',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/tg/T%20G%20-%20A%20Glimpse%20of%20Revelation%20II.pdf',
          },
          {
            title:'English for Secondary 2 — Student Book (Al-Azhar)',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/sb/G_11_SB_9-9-2025.pdf',
          },
        ],
      },
    ],
    az_s2_lit:[
      {
        subj:'الفقه (حنفي / شافعي / مالكي / حنبلي)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'المختار من الاختيار لتعليل المختار (حنفي) — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D8%AD%D9%86%D9%81%D9%8A%20-%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
          {
            title:'المختار من الإقناع في حل ألفاظ أبي شجاع (شافعي) — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D8%B4%D8%A7%D9%81%D8%B9%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
          {
            title:'المختار من الشرح الصغير (مالكي) — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%83%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'التفسير',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'تيسير تفسير النسفي — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%AA%D9%81%D8%B3%D9%8A%D8%B1%20%D8%A7%D9%84%D9%86%D8%B3%D9%81%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'الحديث',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'الحديث (تيسير فتح المبدي بشرح مختصر الزبيدي) — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%A7%D9%84%D8%AD%D8%AF%D9%8A%D8%AB%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A%20.pdf',
          },
        ],
      },
      {
        subj:'التوحيد',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'التوحيد (تيسير شرح جوهرة التوحيد) — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D9%8A%D8%AF%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'النحو',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'شرح ابن عقيل على ألفية ابن مالك — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%B4%D8%B1%D8%AD%20%D8%A7%D8%A8%D9%86%20%D8%B9%D9%82%D9%8A%D9%84%202%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'الصرف',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'الصرف الميسر — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%B5%D8%B1%D9%81%202%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'البلاغة',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'البلاغة العربية — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%A8%D9%84%D8%A7%D8%BA%D8%A9%202%20%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'الأدب والنصوص',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'تاريخ الأدب العربي ونصوصه — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D8%A3%D8%AF%D8%A8%20-%202%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'المطالعة والإنشاء',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'المطالعة والإنشاء — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D9%85%D8%B7%D8%A7%D9%84%D8%B9%D8%A9%20%D9%88%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%202%D8%AB-.pdf',
          },
        ],
      },
      {
        subj:'العروض والقافية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'العروض والقافية — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/2026/%D8%AB2/%D8%A7%D9%84%D8%B9%D8%B1%D9%88%D8%B6%20%D9%88%D8%A7%D9%84%D9%82%D8%A7%D9%81%D9%8A%D8%A9%202%D8%AB%20(1).pdf',
          },
        ],
      },
      {
        subj:'المنطق',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'المنطق — الصف الثاني الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/2/%D9%85%D9%86%D8%B7%D9%82%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'اللغة الإنجليزية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'A Glimpse of Revelation II — Student Book (Al-Azhar)',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/tg/T%20G%20-%20A%20Glimpse%20of%20Revelation%20II.pdf',
          },
          {
            title:'English for Secondary 2 — Student Book (Al-Azhar)',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/sb/G_11_SB_9-9-2025.pdf',
          },
        ],
      },
    ],
    az_s3_sci:[
      {
        subj:'الفقه (حنفي / شافعي / مالكي / حنبلي)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'المختار من الاختيار لتعليل المختار (حنفي) — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D8%AD%D9%86%D9%81%D9%8A%20-%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
          {
            title:'المختار من الإقناع في حل ألفاظ أبي شجاع (شافعي) — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D8%B4%D8%A7%D9%81%D8%B9%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
          {
            title:'المختار من الشرح الصغير (مالكي) — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%83%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
          {
            title:'الوجيز في الميراث — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/replace/%D8%A7%D9%84%D9%88%D8%AC%D9%8A%D8%B2%20%D9%81%D9%89%20%D8%A7%D9%84%D9%85%D9%8A%D8%B1%D8%A7%D8%AB%203%20%D8%AB%20-.pdf',
          },
        ],
      },
      {
        subj:'التفسير',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'تيسير تفسير النسفي — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%AA%D9%81%D8%B3%D9%8A%D8%B1%20%D8%A7%D9%84%D9%86%D8%B3%D9%81%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'الحديث',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'الحديث (تيسير فتح المبدي بشرح مختصر الزبيدي) — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%A7%D9%84%D8%AD%D8%AF%D9%8A%D8%AB%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A%20.pdf',
          },
        ],
      },
      {
        subj:'التوحيد',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'التوحيد (تيسير شرح جوهرة التوحيد) — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D9%8A%D8%AF%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'النحو',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'شرح ابن عقيل على ألفية ابن مالك — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%B4%D8%B1%D8%AD%20%D8%A7%D8%A8%D9%86%20%D8%B9%D9%82%D9%8A%D9%84%203%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'الصرف',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'الصرف الميسر — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%B5%D8%B1%D9%81%203%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'البلاغة',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'البلاغة العربية — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%A8%D9%84%D8%A7%D8%BA%D8%A9%203%20%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'الأدب والنصوص',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'تاريخ الأدب العربي ونصوصه — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%A3%D8%AF%D8%A8%20-%203%20%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'الإنشاء',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'المطالعة والإنشاء — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D9%85%D8%B7%D8%A7%D9%84%D8%B9%D8%A9%20%D9%88%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%203%D8%AB-.pdf',
          },
        ],
      },
      {
        subj:'اللغة الإنجليزية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'A Glimpse of Revelation III — Student Book (Al-Azhar)',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/tg/T%20G%20-%20A%20Glimpse%20of%20Revelation%20III.pdf',
          },
        ],
      },
    ],
    az_s3_lit:[
      {
        subj:'الفقه (حنفي / شافعي / مالكي / حنبلي)',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'المختار من الاختيار لتعليل المختار (حنفي) — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D8%AD%D9%86%D9%81%D9%8A%20-%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
          {
            title:'المختار من الإقناع في حل ألفاظ أبي شجاع (شافعي) — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D8%B4%D8%A7%D9%81%D8%B9%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
          {
            title:'المختار من الشرح الصغير (مالكي) — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%A7%D9%84%D9%81%D9%82%D9%87%20%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%83%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
          {
            title:'الوجيز في الميراث — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/replace/%D8%A7%D9%84%D9%88%D8%AC%D9%8A%D8%B2%20%D9%81%D9%89%20%D8%A7%D9%84%D9%85%D9%8A%D8%B1%D8%A7%D8%AB%203%20%D8%AB%20-.pdf',
          },
        ],
      },
      {
        subj:'التفسير',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'تيسير تفسير النسفي — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%AA%D9%81%D8%B3%D9%8A%D8%B1%20%D8%A7%D9%84%D9%86%D8%B3%D9%81%D9%8A%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'الحديث',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'الحديث (تيسير فتح المبدي بشرح مختصر الزبيدي) — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%A7%D9%84%D8%AD%D8%AF%D9%8A%D8%AB%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A%20.pdf',
          },
        ],
      },
      {
        subj:'التوحيد',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'التوحيد (تيسير شرح جوهرة التوحيد) — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D9%8A%D8%AF%20-%20%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A.pdf',
          },
        ],
      },
      {
        subj:'النحو',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'شرح ابن عقيل على ألفية ابن مالك — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%B4%D8%B1%D8%AD%20%D8%A7%D8%A8%D9%86%20%D8%B9%D9%82%D9%8A%D9%84%203%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'الصرف',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'الصرف الميسر — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%B5%D8%B1%D9%81%203%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'البلاغة',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'البلاغة العربية — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%A8%D9%84%D8%A7%D8%BA%D8%A9%203%20%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'الأدب والنصوص',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'تاريخ الأدب العربي ونصوصه — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D8%A3%D8%AF%D8%A8%20-%203%20%D8%AB.pdf',
          },
        ],
      },
      {
        subj:'المطالعة',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'المطالعة والإنشاء — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D9%85%D8%B7%D8%A7%D9%84%D8%B9%D8%A9%20%D9%88%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%203%D8%AB-.pdf',
          },
        ],
      },
      {
        subj:'الإنشاء',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'المطالعة والإنشاء — الصف الثالث الثانوي',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/books-2026/sec/3/%D9%85%D8%B7%D8%A7%D9%84%D8%B9%D8%A9%20%D9%88%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%203%D8%AB-.pdf',
          },
        ],
      },
      {
        subj:'اللغة الإنجليزية',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'A Glimpse of Revelation III — Student Book (Al-Azhar)',
            term:'الأزهر الشريف',
            url:'https://mtrl.azhar.gov.eg/education/tg/T%20G%20-%20A%20Glimpse%20of%20Revelation%20III.pdf',
          },
        ],
      },
    ],
  },
  egypt_lang:{
    prim1:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Mathematics (English edition) — Primary 1, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Primary/Primary1/Term1/StudentBook/Math_EN_P1_T1.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English (first foreign language) — Primary 1, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Primary/Primary1/Term1/StudentBook/English_language_prim1_t1.pdf',
          },
        ],
      },
    ],
    prim2:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Mathematics (English edition) — Primary 2, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Primary/Primary2/Term1/StudentBook/Math_EN_P2_T1.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English (first foreign language) — Primary 2, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Primary/Primary2/Term1/StudentBook/English_language_prim2_t1.pdf',
          },
        ],
      },
    ],
    prim3:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Mathematics (English edition) — Primary 3, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Primary/Primary3/Term1/StudentBook/Math_EN_P3_T1.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English (first foreign language) — Primary 3, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Primary/Primary3/Term1/StudentBook/English_language_prim3_t1.pdf',
          },
        ],
      },
    ],
    prim4:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Mathematics (English edition) — Primary 4, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Primary/Primary4/Term1/StudentBook/Math_EN_P4_T1.pdf',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Science (English edition) — Primary 4, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Primary/Primary4/Term1/StudentBook/Science_EN_PRIM4_Tr1.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English (first foreign language) — Primary 4, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Primary/Primary4/Term1/StudentBook/English_language_prim4_t1.pdf',
          },
        ],
      },
    ],
    prim5:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English (first foreign language) — Primary 5, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Primary/Primary5/Term1/StudentBook/English_language_prim5_t1.pdf',
          },
        ],
      },
    ],
    prim6:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Mathematics (English edition) — Primary 6, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Primary/Primary6/Term1/StudentBook/Math_EN_P6_T1.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English (first foreign language) — Primary 6, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Primary/Primary6/Term1/StudentBook/English_Primary6_T1.pdf',
          },
        ],
      },
    ],
    prep1:[
      {
        subj:'Algebra & Statistics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Mathematics (English edition) — Preparatory 1, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Prepratory/Prepratory1/Term1/StudentBook/Math_EN_Prp1_T1.pdf',
          },
        ],
      },
      {
        subj:'Geometry',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Mathematics (English edition) — Preparatory 1, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Prepratory/Prepratory1/Term1/StudentBook/Math_EN_Prp1_T1.pdf',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Science (English edition) — Preparatory 1, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Prepratory/Prepratory1/Term1/StudentBook/Science_EN_Prp1_TR1..pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English (first foreign language) — Preparatory 1, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Prepratory/Prepratory1/Term1/StudentBook/English_Prep1_T1.pdf',
          },
        ],
      },
    ],
    prep2:[
      {
        subj:'Algebra & Statistics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Mathematics (English edition) — Preparatory 2, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Prepratory/Prepratory2/Term1/StudentBook/Math_EN_Prp2_T1.pdf',
          },
        ],
      },
      {
        subj:'Geometry',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Mathematics (English edition) — Preparatory 2, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Prepratory/Prepratory2/Term1/StudentBook/Math_EN_Prp2_T1.pdf',
          },
        ],
      },
      {
        subj:'Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Science (English edition) — Preparatory 2, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Prepratory/Prepratory2/Term1/StudentBook/Science_EN_Pep2_T1.pdf',
          },
        ],
      },
      {
        subj:'ICT',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'Computer & ICT (English edition) — Preparatory 2, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Prepratory/Prepratory2/Term1/StudentBook/ICT_EN_Prp2_Tr1.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English (first foreign language) — Preparatory 2, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Prepratory/Prepratory2/Term1/StudentBook/English_language_prep2_t1.pdf',
          },
        ],
      },
    ],
    prep3:[
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English (first foreign language) — Preparatory 3, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Prepratory/Prepratory3/Term1/StudentBook/English_language_prep3_t1.pdf',
          },
        ],
      },
    ],
    high1:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Mathematics (English edition) — Secondary 1, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry1/Term1/StudentBook/Mathematics_EN_Tr1_Secondary.pdf',
          },
        ],
      },
      {
        subj:'Integrated Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Integrated Science (English edition) — Secondary 1, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry1/Term1/StudentBook/integratedscience_EN_1_Secondary_TR1.pdf',
          },
        ],
      },
      {
        subj:'Programming & AI',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Programming & AI (English edition) — Secondary 1, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry1/Term1/StudentBook/ICT_EN__Sec1_Tr1.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English (first foreign language) — Secondary 1, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry1/Term1/StudentBook/English_1sec_t1.pdf',
          },
        ],
      },
      {
        subj:'French (Second Foreign Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'French (second foreign language, Club@dos plus 1) — Secondary 1, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry1/Term1/StudentBook/Une_deuxieme_langue_francaise_Sec1_Tr1.pdf',
          },
        ],
      },
      {
        subj:'German (Second Foreign Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'German (second foreign language) — Secondary 1, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry1/Term1/StudentBook/Deutschl_anguage_Sec1_Tr1.pdf',
          },
        ],
      },
    ],
    high_med:[
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'Chemistry (English) — Egyptian Baccalaureate Year 2, Part 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Chemistry-En-EB-part1.pdf',
          },
          {
            title:'Chemistry (English) — Egyptian Baccalaureate Year 2, Part 2 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Chemistry-En-EB-part2.pdf',
          },
          {
            title:'Chemistry (English edition) — Secondary 2, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry2/Term1/StudentBook/chemistry_English_Sec2_TR1.pdf',
          },
          {
            title:'Chemistry (English edition) — Secondary 3 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry3/Term1/StudentBook/Chemistry_English_Sec3.pdf',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'Biology (English edition) — Secondary 3 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry3/Term1/StudentBook/Biology_English_Sec3.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English — Egyptian Baccalaureate Year 2, Part 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Eng-L1-EB-Part1.pdf',
          },
          {
            title:'English — Egyptian Baccalaureate Year 2, Part 2 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Eng-L1-EB-Part2.pdf',
          },
          {
            title:'English story — Egyptian Baccalaureate Year 2 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Story-En-EB-L1.pdf',
          },
        ],
      },
      {
        subj:'French (Second Foreign Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'French (second foreign language) — Egyptian Baccalaureate Year 2, Part 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Frensh-L2-EB-part1.pdf',
          },
          {
            title:'French (second foreign language) — Egyptian Baccalaureate Year 2, Part 2 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Frensh-L2-EB-part2.pdf',
          },
        ],
      },
    ],
    high_eng:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Mathematics (English) — Egyptian Baccalaureate Year 2, Part 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Mathematics-En-EB-Part1.pdf',
          },
          {
            title:'Mathematics (English) — Egyptian Baccalaureate Year 2, Part 2 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Mathematics-En-EB-Part2.pdf',
          },
          {
            title:'Pure Mathematics (English edition) — Secondary 2, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry2/Term1/StudentBook/pure_Mathematics_ENGLISH_Sec2_Tr1.pdf',
          },
          {
            title:'Mathematics Applications (English edition) — Secondary 2, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry2/Term1/StudentBook/Application_Mathematics_EN_Sec2_Tr1.pdf',
          },
          {
            title:'Pure Mathematics (English edition) — Secondary 3 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry3/Term1/StudentBook/pure_Mathematics_ENGLISH_Sec3.pdf',
          },
          {
            title:'Applied Mathematics (English edition) — Secondary 3 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry3/Term1/StudentBook/applied_Mathematics_ENGLISH_Sec3.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Physics (English) — Egyptian Baccalaureate Year 2, Part 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Physics-En-EB-Part1.pdf',
          },
          {
            title:'Physics (English) — Egyptian Baccalaureate Year 2, Part 2 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Physics-En-EB-Part2.pdf',
          },
          {
            title:'Physics (English edition) — Secondary 2, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry2/Term1/StudentBook/Physics_EN_Secondary2_TR1.pdf',
          },
          {
            title:'Physics (English edition) — Secondary 3 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry3/Term1/StudentBook/Physics_English_Sec3.pdf',
          },
        ],
      },
      {
        subj:'Programming & AI',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Programming & AI (English) — Egyptian Baccalaureate Year 2, Part 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Programming-ArtificialIntelligence-En-EB-part1.pdf',
          },
          {
            title:'Programming & AI (English) — Egyptian Baccalaureate Year 2, Part 2 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Programming-ArtificialIntelligence-En-EB-part2.pdf',
          },
          {
            title:'ICT (English edition) — Secondary 2, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry2/Term1/StudentBook/ICT_En_SEC2_Tr1.pdf',
          },
          {
            title:'ICT (English edition) — Secondary 3 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry3/Term1/StudentBook/ICT_EN_Sec3.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English — Egyptian Baccalaureate Year 2, Part 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Eng-L1-EB-Part1.pdf',
          },
          {
            title:'English — Egyptian Baccalaureate Year 2, Part 2 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Eng-L1-EB-Part2.pdf',
          },
          {
            title:'English story — Egyptian Baccalaureate Year 2 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Story-En-EB-L1.pdf',
          },
        ],
      },
      {
        subj:'German (Second Foreign Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'German (second foreign language) — Egyptian Baccalaureate Year 2, Part 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/german-L2-EB-Part1.pdf',
          },
          {
            title:'German (second foreign language) — Egyptian Baccalaureate Year 2, Part 2 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/german-L2-EB-Part2.pdf',
          },
        ],
      },
    ],
    high_biz:[
      {
        subj:'Business Administration',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Business Administration (English) — Egyptian Baccalaureate Year 2, Part 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Business-En-EB-Part1.pdf',
          },
          {
            title:'Business Administration (English) — Egyptian Baccalaureate Year 2, Part 2 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Business-En-EB-part2.pdf',
          },
        ],
      },
      {
        subj:'Accounting',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'Accounting (English) — Egyptian Baccalaureate Year 2, Part 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Accounting-En-EB-part1.pdf',
          },
          {
            title:'Accounting (English) — Egyptian Baccalaureate Year 2, Part 2 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Accounting-En-EB-Part2.pdf',
          },
        ],
      },
      {
        subj:'Applied Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'General Mathematics (English edition) — Secondary 2, Term 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry2/Term1/StudentBook/General_Mathematics_ENGLISH_Sec2_Tr1.pdf',
          },
          {
            title:'Statistics (English edition) — Secondary 3 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry3/Term1/StudentBook/Statistics_English_Sec3.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English — Egyptian Baccalaureate Year 2, Part 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Eng-L1-EB-Part1.pdf',
          },
          {
            title:'English — Egyptian Baccalaureate Year 2, Part 2 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Eng-L1-EB-Part2.pdf',
          },
          {
            title:'English story — Egyptian Baccalaureate Year 2 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Story-En-EB-L1.pdf',
          },
        ],
      },
    ],
    high_arts:[
      {
        subj:'Statistics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Statistics (English edition) — Secondary 3 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026_2027/Secondry/Secondry3/Term1/StudentBook/Statistics_English_Sec3.pdf',
          },
        ],
      },
      {
        subj:'English',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English — Egyptian Baccalaureate Year 2, Part 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Eng-L1-EB-Part1.pdf',
          },
          {
            title:'English — Egyptian Baccalaureate Year 2, Part 2 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Eng-L1-EB-Part2.pdf',
          },
          {
            title:'English story — Egyptian Baccalaureate Year 2 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Story-En-EB-L1.pdf',
          },
        ],
      },
      {
        subj:'French (Second Foreign Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'French (second foreign language) — Egyptian Baccalaureate Year 2, Part 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Frensh-L2-EB-part1.pdf',
          },
          {
            title:'French (second foreign language) — Egyptian Baccalaureate Year 2, Part 2 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/Frensh-L2-EB-part2.pdf',
          },
        ],
      },
      {
        subj:'German (Second Foreign Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'German (second foreign language) — Egyptian Baccalaureate Year 2, Part 1 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/german-L2-EB-Part1.pdf',
          },
          {
            title:'German (second foreign language) — Egyptian Baccalaureate Year 2, Part 2 — 2026-2027',
            term:'وزارة التربية والتعليم — مدارس اللغات',
            url:'https://egyptianbaccalaureate.blob.core.windows.net/egyptianbaccalaureate/german-L2-EB-Part2.pdf',
          },
        ],
      },
    ],
  },
  edexcel:{
    igcse:[
      {
        subj:'Mathematics A',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Mathematics A (4MA1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Mathematics%20A/2016/Specification%20and%20sample%20assessments/international-gcse-in-mathematics-spec-a.pdf',
          },
        ],
      },
      {
        subj:'Mathematics B',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Mathematics B (4MB1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Mathematics%20B/2016/Specification%20and%20sample%20assessments/international-gcse-in-mathematics-spec-b.pdf',
          },
        ],
      },
      {
        subj:'Further Pure Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Further Pure Mathematics (4PM1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Further%20Pure%20Mathematics/2016/Specification%20and%20sample%20assessments/international-gcse-in-further-pure-mathematics-spec.pdf',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'Biology (4BI1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Biology/2017/specification-and-sample-assessments/international-gcse-biology-2017-specification1.pdf',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'Chemistry (4CH1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Chemistry/2017/specification-and-sample-assessments/international-gcse-chemistry-2017-specification.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Physics (4PH1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Physics/2017/specification-and-sample-assessments/international-gcse-physics-2017-specification.pdf',
          },
        ],
      },
      {
        subj:'Human Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'Human Biology (4HB1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Human%20Biology/2017/specification-and-sample-assessment/international-gcse-human-biology-2017-spec.pdf',
          },
        ],
      },
      {
        subj:'Science (Double Award)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Science (Double Award) (4SD0) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Science%20(Double%20Award)/2017/specification-and-sample-assessments/international-gcse-science-double-award-2017-specification1.pdf',
          },
        ],
      },
      {
        subj:'Science (Single Award)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Science (Single Award) (4SS0) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Science%20(Single%20Award)/2017/specification-and-sample-assessments/9781446934302-int-gcse-science-sa-spec-web.pdf',
          },
        ],
      },
      {
        subj:'English Language A',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English Language A (4EA1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/English%20Language%20A/2016/Specification%20and%20sample%20assessments/9781446954379-int-gcse-englang-a-iss6-02-02-2023.pdf',
          },
        ],
      },
      {
        subj:'English Language B',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English Language B (4EB1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/English%20Language%20B/2016/Specification%20and%20sample%20assessments/international-gcse-english-lang-b-specification.pdf',
          },
        ],
      },
      {
        subj:'English as a Second Language',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English as a Second Language (4XES2) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/English%20(as%202nd%20language)/2023/specification-and-sample-assessments/int-gcse-english-esl.pdf',
          },
        ],
      },
      {
        subj:'English Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English Literature (4ET1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/English%20Literature/2016/Specification%20and%20sample%20assessments/international-gcse-english-literature-specification.pdf',
          },
        ],
      },
      {
        subj:'Computer Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Computer Science (4CP0) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/computer-science/2017/specification-and-sample-assessments/international-gcse-in-Computer-Science-Specification.pdf',
          },
        ],
      },
      {
        subj:'Information and Communication Technology',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Information and Communication Technology (4IT1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Information%20and%20Communication%20Technology/2017/Specification%20and%20sample%20assessments/international-gcse-in-ict-spec.pdf',
          },
        ],
      },
      {
        subj:'Accounting',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'Accounting (4AC1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Accounting/2017/Specification-and-sample-assessments/ig-accountancy-spec.pdf',
          },
        ],
      },
      {
        subj:'Business',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Business (4BS1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Business%20Studies/2017/specification-and-sample-assessment/9781446942765-international-gcse-business-specification.pdf',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'Economics (4EC1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Economics/2017/Specification%20and%20SAMS/international-gcse-spec-9781446942789.pdf',
          },
        ],
      },
      {
        subj:'Commerce',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Commerce (4CM1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Commerce/2017/specification-and-sample-assessments/international-gcse-Spec-Commerce.pdf',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Geography (4GE1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Geography/2017/specification-and-sample-assessments/9781446958360-int-gcse-geog-issue-3.pdf',
          },
        ],
      },
      {
        subj:'History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'History (4HI1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/History/2017/specification-and-sample-assessments/int-gcse-history-specification.pdf',
          },
        ],
      },
      {
        subj:'Global Citizenship',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Global Citizenship (4GL1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Global%20Citizenship/2017/Specification%20and%20sample%20assessments/international-gcse-global-citizenship-spec.pdf',
          },
        ],
      },
      {
        subj:'Religious Studies',
        icon:'🕊️',
        color:'#84CC16',
        books:[
          {
            title:'Religious Studies (4RS1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Religious%20Studies/2017/Specification%20and%20sample%20assessments/international-gcse-in-religious-studies.pdf',
          },
        ],
      },
      {
        subj:'Islamic Studies',
        icon:'🕌',
        color:'#84CC16',
        books:[
          {
            title:'Islamic Studies (4IS1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/islamic-studies/2017/specification-and-sample-assessments/international-gcse-islamic-studies-specification.pdf',
          },
        ],
      },
      {
        subj:'Arabic (First Language)',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'Arabic (First Language) (4AA1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Arabic%20as%20a%20first%20language/2017/specification-and-sample-assessments/International-GCSE-Arabic-Spec.pdf',
          },
        ],
      },
      {
        subj:'Greek (First Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Greek (First Language) (4GK1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/greek-as-a-first-language/2017/specification-and-sample-assessments/international-gcse-greek-Spec.pdf',
          },
        ],
      },
      {
        subj:'French',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'French (4FR1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/French/2017/specification-and-sample-assessments/international-gcse-french-specification.pdf',
          },
        ],
      },
      {
        subj:'German',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'German (4GN1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/German/2017/specification-and-sample-assessments/International-GCSE-German-Specification.pdf',
          },
        ],
      },
      {
        subj:'Spanish',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Spanish (4SP1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Spanish/2017/specification-and-sample-assessments/international-gcse-spanish-specification.pdf',
          },
        ],
      },
      {
        subj:'Chinese',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Chinese (4CN1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Chinese/2017/specification-and-sample-assessments/9781446944516-ig-chinese.pdf',
          },
        ],
      },
      {
        subj:'Bangla',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Bangla (4BA0) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Bangla/2017/Specification%20and%20Sample%20Assessment%20Material/international-gcse-bangla-specification.pdf',
          },
        ],
      },
      {
        subj:'Sinhala',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Sinhala (4SI1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Sinhala/2017/specification-and-sample-assessments/international-gcse-specification-sinhala.pdf',
          },
        ],
      },
      {
        subj:'Tamil',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Tamil (4TA1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Tamil/2017/specification-and-sample-assessments/international-gcse-in-tamil-specification.pdf',
          },
        ],
      },
      {
        subj:'Swahili',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Swahili (4SW1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Swahili/2017/specification-and-sample-assessments/international-gcse-swahili-specification.pdf',
          },
        ],
      },
      {
        subj:'Bangladesh Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Bangladesh Studies (4BN1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Bangladesh%20Studies/2017/specification-and-sample-assessments/international-gcse-Bangladesh_Studies_Specification.pdf',
          },
        ],
      },
      {
        subj:'Pakistan Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Pakistan Studies (4PA1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Pakistan%20Studies/2017/specification-and-sample-assessments/international-gcse-pakistan-studies-specification.pdf',
          },
        ],
      },
      {
        subj:'Art and Design',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Art and Design (4FA1/4GC1/4PY1/4TD1/4TE1) — Specification',
            term:'Edexcel International GCSE',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20GCSE/Art%20and%20Design/2017/specification-and-sample-assessments/art-design-spec-updated.pdf',
          },
        ],
      },
    ],
    ias:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Mathematics (XMA01 (IAS) / YMA01 (IAL)) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Mathematics/2018/Specification-and-Sample-Assessment/international-a-level-maths-spec.pdf',
          },
        ],
      },
      {
        subj:'Further Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Further Mathematics (XFM01 (IAS) / YFM01 (IAL)) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Mathematics/2018/Specification-and-Sample-Assessment/international-a-level-maths-spec.pdf',
          },
        ],
      },
      {
        subj:'Pure Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Pure Mathematics (XPM01 (IAS) / YPM01 (IAL)) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Mathematics/2018/Specification-and-Sample-Assessment/international-a-level-maths-spec.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Physics (XPH11 / YPH11 (units WPH11-WPH16)) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Physics/2018/Specification%20and%20Sample%20Assessment/9781446957783_IAL_Physics_Iss3.pdf',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'Chemistry (XCH11 / YCH11 (units WCH11-WCH16)) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Chemistry/2018/Specification-and-Sample-Assessment/International-A-Level-Chemistry-Spec.pdf',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'Biology (XBI11 / YBI11 (units WBI11-WBI16)) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Specification-and-Sample-Assessment/International-A-Level-Biology-Spec.pdf',
          },
        ],
      },
      {
        subj:'Accounting',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'Accounting (XAC11 / YAC11) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Accounting/2015/specification-and-sample-assessments/pearson-edexcel-ial-accounting-specification.pdf',
          },
        ],
      },
      {
        subj:'Business',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Business (XBS11 / YBS11) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Business/2018/Specification-and-Sample-Assessment/International-A-Level-Business-Spec.pdf',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'Economics (XEC11 / YEC11) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Economics/2018/Specification-and-Sample-Assessment/International-A-Level-Economics-spec.pdf',
          },
        ],
      },
      {
        subj:'English Language',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English Language (XEN01 / YEN01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/english-language/2015/specification-and-sample-assessments/9781446954027-ial-englang-iss3.pdf',
          },
        ],
      },
      {
        subj:'English Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English Literature (XET01 / YET01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/english-literature/2015/specification-and-sample-assessments/9781446954058-ial-englit-iss6-9-spec-240521pm.pdf',
          },
        ],
      },
      {
        subj:'Psychology',
        icon:'💭',
        color:'#64748B',
        books:[
          {
            title:'Psychology (XPS01 / YPS01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/psychology/2015/specification-and-sample-assessments/ial-psychology-specification-assessment-jan-2026.pdf',
          },
        ],
      },
      {
        subj:'Information Technology',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'Information Technology (XIT11 / YIT11) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Information-Technology/2018/specification-and-sample-assessment/International-AL-Information-Technology-Spec.pdf',
          },
        ],
      },
      {
        subj:'Computer Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Computer Science (XCP01 / YCP01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/computer-science/2026/specification-and-sample-assessments/ial-computer-science-specification.pdf',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Geography (XGE01 / YGE01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Geography/2016/specification-and-sample-assessments/ial-geography-specification.pdf',
          },
        ],
      },
      {
        subj:'History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'History (XHI01 / YHI01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/history/2015/specification-and-sample-assessments/IAL-History-Specification.pdf',
          },
        ],
      },
      {
        subj:'Law',
        icon:'⚖️',
        color:'#6366F1',
        books:[
          {
            title:'Law (YLA1 (linear, no IAS)) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Law/2015/specification-and-sample-assessments/Pearson-Edexcel-IAL-Law-Specification.pdf',
          },
        ],
      },
      {
        subj:'Arabic',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'Arabic (XAA01 / YAA01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/arabic/2016/specification-and-sample-assessments/ial-arabic-specification.pdf',
          },
        ],
      },
      {
        subj:'French',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'French (XFR01 / YFR01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/french/2016/specification-and-sample-assessments/ial-french-specification.pdf',
          },
        ],
      },
      {
        subj:'German',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'German (XGN01 / YGN01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/german/2016/specification-and-sample-assessments/ial-german-specification.pdf',
          },
        ],
      },
      {
        subj:'Spanish',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Spanish (XSP01 / YSP01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/spanish/2016/specification-and-sample-assessments/ial-spanish-specification.pdf',
          },
        ],
      },
      {
        subj:'Greek',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Greek (XGK01 / YGK01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/greek/2016/specification-and-sample-assessments/ial-greek-specification-issue-4.pdf',
          },
        ],
      },
    ],
    ia2:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Mathematics (XMA01 (IAS) / YMA01 (IAL)) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Mathematics/2018/Specification-and-Sample-Assessment/international-a-level-maths-spec.pdf',
          },
        ],
      },
      {
        subj:'Further Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Further Mathematics (XFM01 (IAS) / YFM01 (IAL)) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Mathematics/2018/Specification-and-Sample-Assessment/international-a-level-maths-spec.pdf',
          },
        ],
      },
      {
        subj:'Pure Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Pure Mathematics (XPM01 (IAS) / YPM01 (IAL)) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Mathematics/2018/Specification-and-Sample-Assessment/international-a-level-maths-spec.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Physics (XPH11 / YPH11 (units WPH11-WPH16)) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Physics/2018/Specification%20and%20Sample%20Assessment/9781446957783_IAL_Physics_Iss3.pdf',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'Chemistry (XCH11 / YCH11 (units WCH11-WCH16)) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Chemistry/2018/Specification-and-Sample-Assessment/International-A-Level-Chemistry-Spec.pdf',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'Biology (XBI11 / YBI11 (units WBI11-WBI16)) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Biology/2018/Specification-and-Sample-Assessment/International-A-Level-Biology-Spec.pdf',
          },
        ],
      },
      {
        subj:'Accounting',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'Accounting (XAC11 / YAC11) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Accounting/2015/specification-and-sample-assessments/pearson-edexcel-ial-accounting-specification.pdf',
          },
        ],
      },
      {
        subj:'Business',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Business (XBS11 / YBS11) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Business/2018/Specification-and-Sample-Assessment/International-A-Level-Business-Spec.pdf',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'Economics (XEC11 / YEC11) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Economics/2018/Specification-and-Sample-Assessment/International-A-Level-Economics-spec.pdf',
          },
        ],
      },
      {
        subj:'English Language',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English Language (XEN01 / YEN01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/english-language/2015/specification-and-sample-assessments/9781446954027-ial-englang-iss3.pdf',
          },
        ],
      },
      {
        subj:'English Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English Literature (XET01 / YET01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/english-literature/2015/specification-and-sample-assessments/9781446954058-ial-englit-iss6-9-spec-240521pm.pdf',
          },
        ],
      },
      {
        subj:'Psychology',
        icon:'💭',
        color:'#64748B',
        books:[
          {
            title:'Psychology (XPS01 / YPS01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/psychology/2015/specification-and-sample-assessments/ial-psychology-specification-assessment-jan-2026.pdf',
          },
        ],
      },
      {
        subj:'Information Technology',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'Information Technology (XIT11 / YIT11) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Information-Technology/2018/specification-and-sample-assessment/International-AL-Information-Technology-Spec.pdf',
          },
        ],
      },
      {
        subj:'Computer Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Computer Science (XCP01 / YCP01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/computer-science/2026/specification-and-sample-assessments/ial-computer-science-specification.pdf',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Geography (XGE01 / YGE01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Geography/2016/specification-and-sample-assessments/ial-geography-specification.pdf',
          },
        ],
      },
      {
        subj:'History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'History (XHI01 / YHI01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/history/2015/specification-and-sample-assessments/IAL-History-Specification.pdf',
          },
        ],
      },
      {
        subj:'Law',
        icon:'⚖️',
        color:'#6366F1',
        books:[
          {
            title:'Law (YLA1 (linear, no IAS)) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Law/2015/specification-and-sample-assessments/Pearson-Edexcel-IAL-Law-Specification.pdf',
          },
        ],
      },
      {
        subj:'Arabic',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'Arabic (XAA01 / YAA01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/arabic/2016/specification-and-sample-assessments/ial-arabic-specification.pdf',
          },
        ],
      },
      {
        subj:'French',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'French (XFR01 / YFR01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/french/2016/specification-and-sample-assessments/ial-french-specification.pdf',
          },
        ],
      },
      {
        subj:'German',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'German (XGN01 / YGN01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/german/2016/specification-and-sample-assessments/ial-german-specification.pdf',
          },
        ],
      },
      {
        subj:'Spanish',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Spanish (XSP01 / YSP01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/spanish/2016/specification-and-sample-assessments/ial-spanish-specification.pdf',
          },
        ],
      },
      {
        subj:'Greek',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Greek (XGK01 / YGK01) — Specification',
            term:'Edexcel International A Level',
            url:'https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/greek/2016/specification-and-sample-assessments/ial-greek-specification-issue-4.pdf',
          },
        ],
      },
    ],
  },
  oxford_aqa:{
    igcse:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Mathematics (9260) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-mathematics-specification.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Physics (9203) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-physics-specification.pdf',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'Chemistry (9202) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-chemistry-specification.pdf',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'Biology (9201) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-biology-specification.pdf',
          },
        ],
      },
      {
        subj:'Combined Science (Double Award)',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Combined Science (Double Award) (9204) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-combinedscience-specification.pdf',
          },
        ],
      },
      {
        subj:'English Language',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English Language (9270) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-english-language-specification.pdf',
          },
        ],
      },
      {
        subj:'English Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English Literature (9275) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-englishliterature-specification_9275.pdf',
          },
        ],
      },
      {
        subj:'English as a Second Language',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English as a Second Language (9280) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-english-as-a-second-language-specification.pdf',
          },
        ],
      },
      {
        subj:'Computer Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Computer Science (9210) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/06/oxfordaqa-gcse-computer-science-specification.pdf',
          },
        ],
      },
      {
        subj:'Digital and Information Technology',
        icon:'💻',
        color:'#8B5CF6',
        books:[
          {
            title:'Digital and Information Technology (9213) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-dit-specification.pdf',
          },
        ],
      },
      {
        subj:'Business',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Business (9225) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/06/oxfordaqa-gcse-business-specification.pdf',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'Economics (9214) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-economics-specification.pdf',
          },
        ],
      },
      {
        subj:'Accounting',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'Accounting (9215) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/03/oxfordaqa-gcse-accounting-specification-1.pdf',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Geography (9230) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-geography-specification.pdf',
          },
        ],
      },
      {
        subj:'History',
        icon:'🏛️',
        color:'#6366F1',
        books:[
          {
            title:'History (9245) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-history-specification.pdf',
          },
        ],
      },
      {
        subj:'Psychology',
        icon:'💭',
        color:'#64748B',
        books:[
          {
            title:'Psychology (9218) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-psychology-specification.pdf',
          },
        ],
      },
      {
        subj:'Sociology',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Sociology (9292) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-sociology-specification.pdf',
          },
        ],
      },
      {
        subj:'Media Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Media Studies (9257) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-media-studies-specification.pdf',
          },
        ],
      },
      {
        subj:'Design and Technology: Product Design',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Design and Technology: Product Design (9252) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/06/oxfordaqa-gcse-design-and-technology-product-design-specification.pdf',
          },
        ],
      },
      {
        subj:'Islamiat',
        icon:'🕌',
        color:'#84CC16',
        books:[
          {
            title:'Islamiat (9237) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-islamiat-specification.pdf',
          },
        ],
      },
      {
        subj:'Pakistan Studies',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Pakistan Studies (9236) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-pakistan-studies-specification.pdf',
          },
        ],
      },
      {
        subj:'Arabic (First Language)',
        icon:'📖',
        color:'#8B5CF6',
        books:[
          {
            title:'Arabic (First Language) (9267) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-arabic-specification.pdf',
          },
        ],
      },
      {
        subj:'Chinese (First Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Chinese (First Language) (9263) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-chinese-specification.pdf',
          },
        ],
      },
      {
        subj:'Bangla',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Bangla (9268) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-bangla-specification.pdf',
          },
        ],
      },
      {
        subj:'Urdu',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Urdu (9264) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-intenational-gcse-urdu-specification.pdf',
          },
        ],
      },
      {
        subj:'French',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'French (9265) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-french-specification.pdf',
          },
        ],
      },
      {
        subj:'Spanish',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Spanish (9269) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-spanish-specification.pdf',
          },
        ],
      },
      {
        subj:'Global Skills Projects',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Global Skills Projects (9697) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-globalskillsprojects-specification.pdf',
          },
        ],
      },
      {
        subj:'CORE Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'CORE Biology (9221) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-core-biology-specification.pdf',
          },
        ],
      },
      {
        subj:'CORE Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'CORE Chemistry (9222) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-core-chemistry-specification.pdf',
          },
        ],
      },
      {
        subj:'CORE Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'CORE Physics (9223) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-core-physics-specification.pdf',
          },
        ],
      },
      {
        subj:'CORE English as a Second Language',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'CORE English as a Second Language (9285) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-core-english-as-a-second-language-specification.pdf',
          },
        ],
      },
      {
        subj:'International GCSE Plus',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'International GCSE Plus (n/a) — Specification',
            term:'OxfordAQA International GCSE',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-plus-specification.pdf',
          },
        ],
      },
    ],
    as:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Mathematics (9660) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-a-level-mathematics-specification.pdf',
          },
        ],
      },
      {
        subj:'Further Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Further Mathematics (9665) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-a-level-further-mathematics-specification.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Physics (9630) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-as-and-a-level-physics-specification.pdf',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'Chemistry (9620) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-a-level-chemistry-specification.pdf',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'Biology (9610) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-as-and-a-level-biology-specification.pdf',
          },
        ],
      },
      {
        subj:'Computer Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Computer Science (9645) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/06/oxfordaqa-a-level-computer-science-specification.pdf',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'Economics (9640) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-a-level-economics-specification.pdf',
          },
        ],
      },
      {
        subj:'Business',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Business (9625) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/06/oxfordaqa-a-level-business-specification.pdf',
          },
        ],
      },
      {
        subj:'Business (revised)',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Business (revised) (9725) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/06/oxfordaqa-a-level-business-specification_9725.pdf',
          },
        ],
      },
      {
        subj:'Accounting',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'Accounting (9615) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/03/oxfordaqa-a-level-accounting-specification.pdf',
          },
        ],
      },
      {
        subj:'Psychology',
        icon:'💭',
        color:'#64748B',
        books:[
          {
            title:'Psychology (9685) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-as-and-a-level-psychology-specification.pdf',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Geography (9635) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-a-level-geography-specification.pdf',
          },
        ],
      },
      {
        subj:'English Language',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English Language (9670) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-a-level-english-language-specification.pdf',
          },
        ],
      },
      {
        subj:'English Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English Literature (9675) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-a-level-english-literature-specification.pdf',
          },
        ],
      },
      {
        subj:'Sociology',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Sociology (9690) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/09/oxfordaqa-international-a-level-sociology-specification.pdf',
          },
        ],
      },
      {
        subj:'Chinese (First Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Chinese (First Language) (9680) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-alevel-chinese-specification.pdf',
          },
        ],
      },
    ],
    a2:[
      {
        subj:'Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Mathematics (9660) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-a-level-mathematics-specification.pdf',
          },
        ],
      },
      {
        subj:'Further Mathematics',
        icon:'🔢',
        color:'#3B82F6',
        books:[
          {
            title:'Further Mathematics (9665) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-a-level-further-mathematics-specification.pdf',
          },
        ],
      },
      {
        subj:'Physics',
        icon:'⚡',
        color:'#F59E0B',
        books:[
          {
            title:'Physics (9630) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-as-and-a-level-physics-specification.pdf',
          },
        ],
      },
      {
        subj:'Chemistry',
        icon:'🧪',
        color:'#10B981',
        books:[
          {
            title:'Chemistry (9620) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-a-level-chemistry-specification.pdf',
          },
        ],
      },
      {
        subj:'Biology',
        icon:'🦠',
        color:'#EC4899',
        books:[
          {
            title:'Biology (9610) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-as-and-a-level-biology-specification.pdf',
          },
        ],
      },
      {
        subj:'Computer Science',
        icon:'🔬',
        color:'#06B6D4',
        books:[
          {
            title:'Computer Science (9645) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/06/oxfordaqa-a-level-computer-science-specification.pdf',
          },
        ],
      },
      {
        subj:'Economics',
        icon:'💰',
        color:'#A855F7',
        books:[
          {
            title:'Economics (9640) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-a-level-economics-specification.pdf',
          },
        ],
      },
      {
        subj:'Business',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Business (9625) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/06/oxfordaqa-a-level-business-specification.pdf',
          },
        ],
      },
      {
        subj:'Business (revised)',
        icon:'📊',
        color:'#A855F7',
        books:[
          {
            title:'Business (revised) (9725) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/06/oxfordaqa-a-level-business-specification_9725.pdf',
          },
        ],
      },
      {
        subj:'Accounting',
        icon:'🧾',
        color:'#A855F7',
        books:[
          {
            title:'Accounting (9615) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/03/oxfordaqa-a-level-accounting-specification.pdf',
          },
        ],
      },
      {
        subj:'Psychology',
        icon:'💭',
        color:'#64748B',
        books:[
          {
            title:'Psychology (9685) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-as-and-a-level-psychology-specification.pdf',
          },
        ],
      },
      {
        subj:'Geography',
        icon:'🗺️',
        color:'#0EA5E9',
        books:[
          {
            title:'Geography (9635) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-a-level-geography-specification.pdf',
          },
        ],
      },
      {
        subj:'English Language',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English Language (9670) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-a-level-english-language-specification.pdf',
          },
        ],
      },
      {
        subj:'English Literature',
        icon:'📚',
        color:'#F97316',
        books:[
          {
            title:'English Literature (9675) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-a-level-english-literature-specification.pdf',
          },
        ],
      },
      {
        subj:'Sociology',
        icon:'📘',
        color:'#A855F7',
        books:[
          {
            title:'Sociology (9690) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/09/oxfordaqa-international-a-level-sociology-specification.pdf',
          },
        ],
      },
      {
        subj:'Chinese (First Language)',
        icon:'🗣️',
        color:'#003189',
        books:[
          {
            title:'Chinese (First Language) (9680) — Specification',
            term:'OxfordAQA International AS/A Level',
            url:'https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-alevel-chinese-specification.pdf',
          },
        ],
      },
    ],
  },
});
