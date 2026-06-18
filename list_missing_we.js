import { readFileSync } from 'fs';
const src = readFileSync('app.js', 'utf8');

function findTopicEnd(src, oi) {
  let depth = 0;
  for (let i = oi; i < src.length; i++) {
    const c = src.charCodeAt(i);
    if (c === 123) depth++;
    else if (c === 125) { depth--; if (depth === 0) return i; }
    else if (c === 96) { i++; while (i < src.length && src.charCodeAt(i) !== 96) { if (src.charCodeAt(i) === 92) i++; i++; } }
  }
  return -1;
}

const PAT = "{ title:'";
let pos = 0;
const missing = [];
const seen = new Set();

while (pos < src.length) {
  const oi = src.indexOf(PAT, pos);
  if (oi === -1) break;
  const ts = oi + PAT.length;
  const te = src.indexOf("'", ts);
  if (te === -1) { pos = oi + 1; continue; }
  const title = src.slice(ts, te);
  const gap = src.slice(te + 1, te + 20);
  if (!gap.includes('points:[')) { pos = oi + 1; continue; }
  const topicEnd = findTopicEnd(src, oi);
  const wi = src.indexOf('workedExample:`', oi);
  const hasWE = wi !== -1 && wi < topicEnd;
  if (!hasWE && !seen.has(title)) {
    missing.push(title);
    seen.add(title);
  }
  pos = oi + 1;
}

console.log('Unique topic titles still missing workedExample:', missing.length);
// Group by apparent subject keyword
const groups = {};
missing.forEach(t => {
  // Try to guess subject from title keywords
  let g = 'Other';
  if (/force|motion|velocity|acceleration|wave|light|electric|magnetic|nuclear|thermal|pressure|energy|power|newton|quantum|relativity|optic|circuit|current|resistance|charge|electromagnetic|photon|momentum|gravity|oscillat|sound|lens/i.test(t)) g = 'Physics';
  else if (/acid|base|titrat|organic|alkane|alkene|polymer|equilibri|rate|reaction|atom|element|ion|bond|oxidat|electro|periodic|metal|salt|solution|concentration|pH|mole|equation|precipitat|catalyst|radical|ester|aldehyde|ketone|carbox|amino|protein|enzyme|dna|cell|photosyn|respir|diffus|osmos/i.test(t)) g = 'Chemistry/Biology';
  else if (/trigon|calcul|algebra|matrix|vector|statistic|probability|set|sequence|function|graph|quadrat|polynomial|logarithm|differentiat|integrat|complex|geometry|circle|proof|binomial|normal|distribut/i.test(t)) g = 'Mathematics';
  else if (/grammar|tense|vocabulary|reading|writing|essay|speak|listen|passage|compre/i.test(t)) g = 'English';
  else if (/histoire|histoire|societe|culture|politique/i.test(t)) g = 'Humanities';
  groups[g] = (groups[g] || []);
  groups[g].push(t);
});

Object.entries(groups).sort((a,b)=>b[1].length-a[1].length).forEach(([g,ts]) => {
  console.log('\n' + g + ' (' + ts.length + '):');
  ts.slice(0, 8).forEach(t => console.log('  -', t));
  if (ts.length > 8) console.log('  ... (' + (ts.length - 8) + ' more)');
});
