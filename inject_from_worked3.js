// Inject workedExamples from add_worked3.js WORKED map into topics that lack them
// Uses brace-depth for topic boundary, restricts all searches to within the topic

import { readFileSync, writeFileSync } from 'fs';
let src = readFileSync('app.js', 'utf8');
const raw = readFileSync('add_worked3.js', 'utf8');

// Load WORKED map
const wMatch = raw.match(/const WORKED = \{([\s\S]*?)\n\};/);
let WORKED;
eval('WORKED = {' + wMatch[1] + '}');
console.log('WORKED entries:', Object.keys(WORKED).length);

// ── helpers ──────────────────────────────────────────────────────────────────

function findTopicEnd(src, openBrace) {
  let depth = 0;
  for (let i = openBrace; i < src.length; i++) {
    const c = src.charCodeAt(i);
    if (c === 123) depth++;       // {
    else if (c === 125) { depth--; if (depth === 0) return i; }  // }
    else if (c === 96) {          // backtick — skip template literal
      i++;
      while (i < src.length && src.charCodeAt(i) !== 96) {
        if (src.charCodeAt(i) === 92) i++; // backslash — skip next
        i++;
      }
    }
  }
  return -1;
}

// Find closing ] of array keyword, restricted to [from, limit]
function findArrayEndIn(src, from, limit, kw) {
  const si = src.indexOf(kw, from);
  if (si === -1 || si > limit) return -1;
  let depth = 0, i = si + kw.length - 1; // start at '['
  while (i <= limit) {
    const c = src.charCodeAt(i);
    if (c === 91) depth++;         // [
    else if (c === 93) { depth--; if (depth === 0) return i; }  // ]
    else if (c === 96) {           // skip backtick string
      i++;
      while (i <= limit && src.charCodeAt(i) !== 96) {
        if (src.charCodeAt(i) === 92) i++;
        i++;
      }
    }
    i++;
  }
  return -1;
}

// ── main loop ─────────────────────────────────────────────────────────────────
const PAT = "{ title:'";
let pos = 0, added = 0;

while (pos < src.length) {
  const oi = src.indexOf(PAT, pos);
  if (oi === -1) break;

  const ts = oi + PAT.length;
  const te = src.indexOf("'", ts);
  if (te === -1) { pos = oi + 1; continue; }
  const title = src.slice(ts, te);

  const gap = src.slice(te + 1, te + 20);
  if (!gap.includes('points:[')) { pos = oi + 1; continue; }

  pos = oi + 1;

  const we = WORKED[title];
  if (!we) continue; // no WE for this title

  const topicEnd = findTopicEnd(src, oi);
  if (topicEnd === -1) continue;

  // Already has workedExample at topic level?
  const existWE = src.indexOf('workedExample:`', oi);
  if (existWE !== -1 && existWE < topicEnd) continue;

  // Find last array endpoint WITHIN this topic
  let lastEnd = -1;
  const cmEnd = findArrayEndIn(src, oi, topicEnd, 'commonMistakes:[');
  if (cmEnd !== -1) {
    lastEnd = cmEnd;
  } else {
    const etEnd = findArrayEndIn(src, oi, topicEnd, 'examTips:[');
    if (etEnd !== -1) {
      lastEnd = etEnd;
    } else {
      const ptEnd = findArrayEndIn(src, oi, topicEnd, 'points:[');
      if (ptEnd !== -1) lastEnd = ptEnd;
    }
  }

  if (lastEnd === -1) continue;

  // Escape the WE for backtick string
  const safe = we
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');

  const inj = ', workedExample:`' + safe + '`';
  src = src.slice(0, lastEnd + 1) + inj + src.slice(lastEnd + 1);
  pos = lastEnd + 1 + inj.length; // advance past injection
  added++;
}

console.log('workedExample injected:', added);

try {
  new Function(src);
  console.log('SYNTAX OK');
  writeFileSync('app.js', src);
  const total = (src.match(/\{ title:'[^']+', points:\[/g)||[]).length;
  const withWE = (src.match(/workedExample:`/g)||[]).length;
  console.log('Coverage:', withWE, '/', total, '=', Math.round(withWE/total*100) + '%');
} catch(e) {
  console.log('SYNTAX ERROR:', e.message);
  const lines = src.split('\n');
  let lo = 0, hi = lines.length;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    try { new Function(lines.slice(0, mid).join('\n')); lo = mid; } catch { hi = mid; }
  }
  console.log('Bad around line', hi, ':', lines[hi-1]?.slice(0, 150));
}
