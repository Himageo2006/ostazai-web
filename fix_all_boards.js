// Propagate workedExample to ALL board copies of each topic
// Strategy: find `{ title:'X',` patterns, check next 4000 chars for workedExample

import { readFileSync, writeFileSync } from 'fs';
let src = readFileSync('app.js', 'utf8');

// ── Step 1: collect existing workedExamples ──────────────────────
const existing = {}; // title → workedExample raw string (with escapes intact)

// Find every `{ title:'X', points:[` block
let pos = 0;
while (pos < src.length) {
  // Find open-brace + title pattern
  const pat = "{ title:'";
  const oi = src.indexOf(pat, pos);
  if (oi === -1) break;
  const ts = oi + pat.length;
  const te = src.indexOf("'", ts);
  if (te === -1) { pos = oi + 1; continue; }
  const title = src.slice(ts, te);
  pos = oi + 1;

  // Must have points:[ nearby
  const afterClose = src.slice(te + 1, te + 20);
  if (!afterClose.includes('points:[') && !afterClose.includes(', points:')) continue;

  // Scan up to 4000 chars for workedExample
  const window = src.slice(oi, oi + 4000);
  const wpi = window.indexOf('workedExample:`');
  if (wpi === -1) continue;

  // Extract the value (handle escaped backticks)
  let we = '';
  let j = wpi + 15; // after workedExample:`
  while (j < window.length) {
    if (window[j] === '\\') { we += window[j] + window[j+1]; j += 2; continue; }
    if (window[j] === '`') break;
    we += window[j];
    j++;
  }
  if (we && !existing[title]) existing[title] = we;
}

console.log('Collected titles with workedExample:', Object.keys(existing).length);

// ── Step 2: inject into all copies missing workedExample ─────────
let added = 0;
pos = 0;

while (pos < src.length) {
  const pat = "{ title:'";
  const oi = src.indexOf(pat, pos);
  if (oi === -1) break;
  const ts = oi + pat.length;
  const te = src.indexOf("'", ts);
  if (te === -1) { pos = oi + 1; continue; }
  const title = src.slice(ts, te);
  pos = oi + 1;

  const we = existing[title];
  if (!we) continue;

  const afterClose = src.slice(te + 1, te + 20);
  if (!afterClose.includes('points:[') && !afterClose.includes(', points:')) continue;

  // Check if this instance already has workedExample (within 4000 chars)
  const window4k = src.slice(oi, oi + 4000);

  // Also check if the NEXT topic starts within this window
  // (to avoid false negatives where workedExample belongs to next topic)
  const nextTopic = window4k.indexOf("{ title:'", 5);
  const checkEnd = nextTopic !== -1 ? nextTopic : 4000;
  const localWindow = window4k.slice(0, checkEnd);

  if (localWindow.includes('workedExample')) continue;

  // Find points array end within this topic
  const ps = src.indexOf('points:[', oi);
  if (ps === -1 || ps - oi > 300) continue;
  let depth = 0, i = ps + 7, pe = -1;
  while (i < src.length && i < oi + 4000) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') { if (depth === 0) { pe = i; break; } depth--; }
    i++;
  }
  if (pe === -1) continue;

  let lastEnd = pe;
  const checkArr = (kw) => {
    const s2 = src.indexOf(kw, lastEnd);
    if (s2 === -1 || s2 - lastEnd > 800) return;
    let d = 0, j = s2 + kw.length - 1;
    while (j < src.length) { if(src[j]==='[')d++; else if(src[j]===']'){if(d===0){lastEnd=j;return;}d--;} j++; }
  };
  checkArr('examTips:[');
  checkArr('commonMistakes:[');

  const inj = ', workedExample:`' + we + '`';
  src = src.slice(0, lastEnd + 1) + inj + src.slice(lastEnd + 1);
  pos = lastEnd + 1 + inj.length;
  added++;
}

console.log('workedExample propagated to', added, 'additional topic copies');

try {
  new Function(src);
  console.log('SYNTAX OK');
  writeFileSync('app.js', src);
  const total = (src.match(/\{ title:'[^']+', points:\[/g)||[]).length;
  const withWE = (src.match(/workedExample:`/g)||[]).length;
  console.log('Final coverage:', withWE, '/', total, '=', Math.round(withWE/total*100)+'%');
} catch(e) {
  console.log('SYNTAX ERROR:', e.message);
  const lines = src.split('\n');
  for (let i=0; i<lines.length; i++) {
    try { new Function(lines.slice(0,i+1).join('\n')); } catch(e2) {
      if (e2.message===e.message){ console.log('Line',i+1,':',lines[i].slice(0,120)); break; }
    }
  }
}
