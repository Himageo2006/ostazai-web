import { readFileSync } from 'fs';
const src = readFileSync('app.js', 'utf8');

// Count how many times each title appears
const PAT = "{ title:'";
const counts = {};
let pos = 0;
while (pos < src.length) {
  const oi = src.indexOf(PAT, pos);
  if (oi === -1) break;
  const ts = oi + PAT.length;
  const te = src.indexOf("'", ts);
  if (te === -1) { pos = oi + 1; continue; }
  const title = src.slice(ts, te);
  const gap = src.slice(te + 1, te + 20);
  if (!gap.includes('points:[')) { pos = oi + 1; continue; }
  counts[title] = (counts[title] || 0) + 1;
  pos = oi + 1;
}

const appearing3x = Object.entries(counts).filter(([,n])=>n>=3).length;
const appearing2x = Object.entries(counts).filter(([,n])=>n===2).length;
const appearing1x = Object.entries(counts).filter(([,n])=>n===1).length;
const total = Object.values(counts).reduce((a,b)=>a+b,0);

console.log('Total topic instances:', total);
console.log('Unique titles:', Object.keys(counts).length);
console.log('Titles appearing 1x:', appearing1x);
console.log('Titles appearing 2x:', appearing2x);
console.log('Titles appearing 3x:', appearing3x);

// Show titles that appear 3x with WE count
const weByTitle = {};
pos = 0;
function findTopicEnd(src, oi) {
  let depth = 0;
  for (let i = oi; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) return i; }
    else if (src[i] === '`') { i++; while (i < src.length && src[i] !== '`') { if (src[i] === '\\') i++; i++; } }
  }
  return -1;
}
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
  if (!weByTitle[title]) weByTitle[title] = { total: 0, withWE: 0 };
  weByTitle[title].total++;
  if (hasWE) weByTitle[title].withWE++;
  pos = oi + 1;
}

// Titles with 3 occurrences and some missing WE
const needsProp = Object.entries(weByTitle).filter(([,v]) => v.total >= 2 && v.withWE > 0 && v.withWE < v.total);
console.log('\nTitles appearing 2+ times, with PARTIAL WE coverage (should propagate):');
console.log(needsProp.length);
needsProp.slice(0,5).forEach(([t,v]) => console.log(' ', JSON.stringify(t.slice(0,40)), v));
