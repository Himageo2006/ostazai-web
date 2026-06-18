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
  if (!hasWE && !seen.has(title)) { missing.push(title); seen.add(title); }
  pos = oi + 1;
}

console.log('Still missing:', missing.length);
// Print all for copying
missing.forEach(t => console.log(JSON.stringify(t) + ': ``,'));
