// Add IGCSE_VIDEOS constant and wire it into the subject page
const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// 1. Add IGCSE_VIDEOS constant right before tplIGCSE function
const videosData = `
/* ================================================================
   IGCSE Video Resources — curated YouTube playlists & channels
   ================================================================ */
const IGCSE_VIDEOS = {
  maths: [
    { title:'IGCSE Maths Full Playlist', channel:'Cognito', type:'playlist', url:'https://www.youtube.com/playlist?list=PLidqqIGKox7XmjE_q3h4WMKNGRlT-iKvr', icon:'🎓' },
    { title:'IGCSE Maths (0580) Worked Examples', channel:'ExamSolutions', type:'playlist', url:'https://www.youtube.com/c/ExamSolutions_Maths', icon:'✏️' },
    { title:'IGCSE Maths Revision', channel:'Mr Maths', type:'channel', url:'https://www.youtube.com/@mrmathsigcse', icon:'📐' },
    { title:'IGCSE Maths Past Paper Walkthrough', channel:'Save My Exams', type:'playlist', url:'https://www.youtube.com/c/SaveMyExams', icon:'📄' },
  ],
  add_maths: [
    { title:'Additional Maths Full Course', channel:'Cognito', type:'playlist', url:'https://www.youtube.com/playlist?list=PLidqqIGKox7XmjE_q3h4WMKNGRlT-iKvr', icon:'🎓' },
    { title:'A-Level / Add Maths Calculus', channel:'ExamSolutions', type:'channel', url:'https://www.youtube.com/c/ExamSolutions_Maths', icon:'📈' },
    { title:'IGCSE Additional Maths Revision', channel:'TLMaths', type:'channel', url:'https://www.youtube.com/@TLMaths', icon:'✏️' },
  ],
  physics: [
    { title:'IGCSE Physics Full Course', channel:'Cognito', type:'playlist', url:'https://www.youtube.com/playlist?list=PLidqqIGKox7WVRLBgaA5jOt97N2iFiNOF', icon:'⚡' },
    { title:'IGCSE Physics (0625) Complete', channel:'FreeScienceLessons', type:'playlist', url:'https://www.youtube.com/c/freesciencelessons', icon:'🔬' },
    { title:'IGCSE Physics Revision Notes', channel:'Save My Exams', type:'channel', url:'https://www.youtube.com/c/SaveMyExams', icon:'📄' },
    { title:'Physics IGCSE Past Papers', channel:'Physics Online', type:'channel', url:'https://www.youtube.com/@PhysicsOnline', icon:'🎯' },
  ],
  chemistry: [
    { title:'IGCSE Chemistry Full Course', channel:'Cognito', type:'playlist', url:'https://www.youtube.com/playlist?list=PLidqqIGKox7VKBm-DJrqiPKlC4UbmjU30', icon:'⚗️' },
    { title:'IGCSE Chemistry Complete Revision', channel:'Richard Thornley', type:'channel', url:'https://www.youtube.com/@RichardThornley', icon:'🧪' },
    { title:'IGCSE Chemistry (0620)', channel:'FreeScienceLessons', type:'playlist', url:'https://www.youtube.com/c/freesciencelessons', icon:'🔬' },
    { title:'Chemistry IGCSE Save My Exams', channel:'Save My Exams', type:'channel', url:'https://www.youtube.com/c/SaveMyExams', icon:'📄' },
  ],
  biology: [
    { title:'IGCSE Biology Full Course', channel:'Cognito', type:'playlist', url:'https://www.youtube.com/playlist?list=PLidqqIGKox7WBKA-t-Cs4NxDvK1l5FgPC', icon:'🌱' },
    { title:'IGCSE Biology Complete (0610)', channel:'FreeScienceLessons', type:'playlist', url:'https://www.youtube.com/c/freesciencelessons', icon:'🔬' },
    { title:'IGCSE Biology Revision', channel:'Mr Exham', type:'channel', url:'https://www.youtube.com/@MrExham', icon:'🧬' },
    { title:'Biology IGCSE Flashcard Videos', channel:'Save My Exams', type:'channel', url:'https://www.youtube.com/c/SaveMyExams', icon:'📄' },
  ],
  cs: [
    { title:'IGCSE Computer Science Full', channel:"Craig'n'Dave", type:'playlist', url:'https://www.youtube.com/@craigndave', icon:'💻' },
    { title:'IGCSE CS (0478) Revision', channel:'Mr. Majeed', type:'channel', url:'https://www.youtube.com/@mrmajeedCS', icon:'🖥️' },
    { title:'IGCSE CS Past Paper Walkthrough', channel:'Revision Village CS', type:'channel', url:'https://www.youtube.com/@revisionvillage', icon:'📄' },
    { title:'Python Programming for IGCSE', channel:'Tech With Tim', type:'playlist', url:'https://www.youtube.com/c/TechWithTim', icon:'🐍' },
  ],
  ict: [
    { title:'IGCSE ICT Full Playlist', channel:'GcseRevisionHelper', type:'channel', url:'https://www.youtube.com/@GcseRevisionHelper', icon:'💾' },
    { title:'IGCSE ICT (0417) Revision', channel:'Hina Khan ICT', type:'channel', url:'https://www.youtube.com/results?search_query=igcse+ict+revision', icon:'🖱️' },
    { title:'ICT Theory & Practical Tips', channel:'AQA ICT', type:'channel', url:'https://www.youtube.com/results?search_query=igcse+ict+0417+theory', icon:'📡' },
  ],
  english: [
    { title:'IGCSE English Language Revision', channel:'Mr Bruff', type:'playlist', url:'https://www.youtube.com/c/mrbruff', icon:'📝' },
    { title:'IGCSE English Language (0500)', channel:'English with Lucy', type:'channel', url:'https://www.youtube.com/c/EnglishwithLucy', icon:'🗣️' },
    { title:'IGCSE Paper 1 & 2 Techniques', channel:'The English Teacher', type:'channel', url:'https://www.youtube.com/results?search_query=igcse+english+language+0500+revision', icon:'✍️' },
  ],
  literature: [
    { title:'IGCSE Literature Revision', channel:'Mr Bruff', type:'playlist', url:'https://www.youtube.com/c/mrbruff', icon:'📚' },
    { title:'IGCSE Literature Analysis', channel:'Anil Sathu', type:'channel', url:'https://www.youtube.com/results?search_query=igcse+literature+revision', icon:'🎭' },
    { title:'Poetry Analysis Techniques', channel:'Lisa\'s Study Guides', type:'channel', url:'https://www.youtube.com/c/LisaStudyGuides', icon:'📖' },
  ],
  history: [
    { title:'IGCSE History Full Revision', channel:'Mr Allsop History', type:'playlist', url:'https://www.youtube.com/@MrAllsopHistory', icon:'🏛️' },
    { title:'IGCSE History Source Skills', channel:'History Teachers', type:'channel', url:'https://www.youtube.com/results?search_query=igcse+history+0470+revision', icon:'📜' },
    { title:'Cold War & WWII Revision', channel:'Crash Course History', type:'playlist', url:'https://www.youtube.com/c/crashcourse', icon:'🌍' },
  ],
  geography: [
    { title:'IGCSE Geography Full Course', channel:'Geographer Online', type:'playlist', url:'https://www.youtube.com/@GeographerOnline', icon:'🌍' },
    { title:'IGCSE Geography (0460) Revision', channel:'GeoGirl', type:'channel', url:'https://www.youtube.com/results?search_query=igcse+geography+revision+0460', icon:'🗺️' },
    { title:'IGCSE Geography Case Studies', channel:'Save My Exams', type:'channel', url:'https://www.youtube.com/c/SaveMyExams', icon:'📄' },
  ],
  economics: [
    { title:'IGCSE Economics Full Course', channel:'EconplusDal', type:'playlist', url:'https://www.youtube.com/@EconplusDal', icon:'📊' },
    { title:'IGCSE Economics (0455) Revision', channel:'Econplusdal', type:'channel', url:'https://www.youtube.com/@EconplusDal', icon:'💹' },
    { title:'Supply & Demand Explained', channel:'Jacob Clifford', type:'playlist', url:'https://www.youtube.com/c/ACDCEcon', icon:'📈' },
  ],
  business: [
    { title:'IGCSE Business Studies Revision', channel:'Business Bytes', type:'playlist', url:'https://www.youtube.com/results?search_query=igcse+business+studies+0450+revision', icon:'💼' },
    { title:'IGCSE Business (0450) Full', channel:'Tutor2u', type:'channel', url:'https://www.youtube.com/@tutor2u', icon:'🏢' },
    { title:'Business Concepts Explained', channel:'Two Teachers', type:'channel', url:'https://www.youtube.com/results?search_query=igcse+business+studies+revision', icon:'📋' },
  ],
  accounting: [
    { title:'IGCSE Accounting Full Course', channel:'Accountancy Learning', type:'playlist', url:'https://www.youtube.com/results?search_query=igcse+accounting+0452+revision', icon:'📒' },
    { title:'IGCSE Accounting (0452) Tutorials', channel:'IGCSE Accounting', type:'channel', url:'https://www.youtube.com/results?search_query=igcse+accounting+double+entry', icon:'🧾' },
    { title:'Financial Statements Explained', channel:'Tutor2u', type:'channel', url:'https://www.youtube.com/@tutor2u', icon:'💰' },
  ],
  sociology: [
    { title:'IGCSE Sociology Full Revision', channel:'Sociology Live', type:'playlist', url:'https://www.youtube.com/results?search_query=igcse+sociology+0495+revision', icon:'👥' },
    { title:'Sociological Perspectives', channel:'Mr Cresswell', type:'channel', url:'https://www.youtube.com/results?search_query=functionalism+marxism+feminism+igcse', icon:'🌐' },
    { title:'Research Methods Explained', channel:'Tutor2u Sociology', type:'channel', url:'https://www.youtube.com/@tutor2u', icon:'🔍' },
  ],
  psychology: [
    { title:'IGCSE Psychology Full Course', channel:'Simply Psychology', type:'playlist', url:'https://www.youtube.com/results?search_query=igcse+psychology+0478+revision', icon:'🧠' },
    { title:'Memory & Obedience Studies', channel:'PsychBoost', type:'channel', url:'https://www.youtube.com/results?search_query=milgram+igcse+psychology', icon:'💭' },
    { title:'Psychology Key Studies', channel:'Tutor2u Psychology', type:'channel', url:'https://www.youtube.com/@tutor2u', icon:'🔬' },
  ],
  french: [
    { title:'IGCSE French Full Revision', channel:'French with Alexa', type:'playlist', url:'https://www.youtube.com/c/FrenchwithAlexa', icon:'🇫🇷' },
    { title:'IGCSE French Grammar Essentials', channel:'Learn French with Alexa', type:'channel', url:'https://www.youtube.com/c/FrenchwithAlexa', icon:'📚' },
    { title:'French Speaking Practice', channel:'Piece of French', type:'channel', url:'https://www.youtube.com/results?search_query=igcse+french+speaking+revision', icon:'🗣️' },
  ],
  spanish: [
    { title:'IGCSE Spanish Full Revision', channel:'Señor Jordan', type:'playlist', url:'https://www.youtube.com/c/senorjordan', icon:'🇪🇸' },
    { title:'IGCSE Spanish Grammar', channel:'Butterfly Spanish', type:'channel', url:'https://www.youtube.com/c/ButterflySpanish', icon:'📖' },
    { title:'Spanish Listening Practice', channel:'Easy Spanish', type:'channel', url:'https://www.youtube.com/c/easyspanish', icon:'🎧' },
  ],
  arabic_lang: [
    { title:'Arabic Language IGCSE Revision', channel:'Arabic Online', type:'channel', url:'https://www.youtube.com/results?search_query=igcse+arabic+language+revision', icon:'🇦🇪' },
    { title:'Arabic Grammar Explained', channel:'Bayyinah', type:'channel', url:'https://www.youtube.com/@bayyinah', icon:'📖' },
    { title:'Arabic Writing Techniques', channel:'Learn Arabic', type:'channel', url:'https://www.youtube.com/results?search_query=arabic+language+writing+skills+gcse', icon:'✍️' },
  ],
  environmental: [
    { title:'IGCSE Environmental Management', channel:'GeoGirl', type:'playlist', url:'https://www.youtube.com/results?search_query=igcse+environmental+management+0680', icon:'🌿' },
    { title:'Climate Change & Ecosystems', channel:'Crash Course', type:'playlist', url:'https://www.youtube.com/c/crashcourse', icon:'🌍' },
    { title:'Energy & Resources Revision', channel:'Geographer Online', type:'channel', url:'https://www.youtube.com/@GeographerOnline', icon:'⚡' },
  ],
  religious_studies: [
    { title:'IGCSE Religious Studies Revision', channel:'BBC Religious Studies', type:'playlist', url:'https://www.youtube.com/results?search_query=igcse+religious+studies+0490+revision', icon:'✝️' },
    { title:'Ethics & Philosophy Explained', channel:'Philosophy Tube', type:'channel', url:'https://www.youtube.com/@PhilosophyTube', icon:'🕊️' },
    { title:'RS Key Concepts', channel:'Tutor2u RS', type:'channel', url:'https://www.youtube.com/@tutor2u', icon:'📿' },
  ],
};
`;

// Insert IGCSE_VIDEOS before the tplIGCSE function
code = code.replace('function tplIGCSE()', videosData + 'function tplIGCSE()');

// 2. Add Video Resources section to subject page (after quick actions, before Chapter List)
const videoSection = `
  <!-- Video Resources -->
  \${(()=>{
    const vids = IGCSE_VIDEOS[S.igcseSubject] || [];
    if(!vids.length) return '';
    return \`
    <div style="margin:0 0 16px;background:var(--bg-card);border:1px solid var(--border);border-radius:16px;overflow:hidden">
      <div style="padding:10px 16px;background:var(--bg);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <div style="font-size:10px;font-weight:800;letter-spacing:1.5px;color:var(--text-muted)">📹 VIDEO RESOURCES</div>
        <div style="font-size:9px;color:var(--text-muted)">Opens YouTube in new tab</div>
      </div>
      <div style="padding:10px 12px;display:flex;flex-direction:column;gap:6px">
        \${vids.map(v=>\`
        <a href="\${v.url}" target="_blank" rel="noopener"
          style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;border:1px solid var(--border);background:var(--bg);text-decoration:none;transition:.15s"
          onmouseover="this.style.borderColor='\${subj.color}';this.style.background='\${subj.color}08'"
          onmouseout="this.style.borderColor='';this.style.background='var(--bg)'">
          <div style="width:34px;height:34px;border-radius:8px;background:#FF000015;border:1px solid #FF000025;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">▶️</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:12px;font-weight:700;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">\${v.title}</div>
            <div style="font-size:10px;color:var(--text-muted);margin-top:1px">\${v.icon} \${v.channel} · \${v.type}</div>
          </div>
          <span style="font-size:16px;color:#FF0000;flex-shrink:0">▶</span>
        </a>\`).join('')}
      </div>
    </div>\`;
  })()}
`;

// Insert video section before the chapter list section
code = code.replace(
  "  <!-- Chapter List -->\n  <div style=\"padding:0 12px\">\n    <div style=\"font-size:10px;color:var(--text-muted);font-weight:800;letter-spacing:1.5px;margin-bottom:14px\">CHAPTERS & TOPICS</div>",
  videoSection + "  <!-- Chapter List -->\n  <div style=\"padding:0 12px\">\n    <div style=\"font-size:10px;color:var(--text-muted);font-weight:800;letter-spacing:1.5px;margin-bottom:14px\">CHAPTERS & TOPICS</div>"
);

fs.writeFileSync('app.js', code);
console.log('Done — IGCSE_VIDEOS added for all 21 subjects + video section wired into subject page');
