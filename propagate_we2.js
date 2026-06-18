// Propagate workedExample to all board copies of each topic.
// Uses brace-depth counting to find exact topic boundaries — no fixed windows.

import { readFileSync, writeFileSync } from 'fs';
let src = readFileSync('app.js', 'utf8');

// ── helpers ──────────────────────────────────────────────────────────────────

// Given position of the opening '{' of a topic object, return position of its closing '}'
function findTopicEnd(src, openBrace) {
  let depth = 0;
  for (let i = openBrace; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) return i; }
    // Skip template literals so backtick content doesn't confuse brace counting
    else if (src[i] === '`') {
      i++;
      while (i < src.length && src[i] !== '`') {
        if (src[i] === '\\') i++; // skip escaped char
        i++;
      }
    }
  }
  return -1;
}

// Find the end of an array starting at 'kw' (e.g. 'examTips:[') after position 'from'
function findArrayEnd(src, from, kw) {
  const si = src.indexOf(kw, from);
  if (si === -1) return -1;
  let depth = 0, i = si + kw.length - 1; // start at '['
  while (i < src.length) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') { depth--; if (depth === 0) return i; }
    else if (src[i] === '`') { // skip template literal
      i++;
      while (i < src.length && src[i] !== '`') { if (src[i] === '\\') i++; i++; }
    }
    i++;
  }
  return -1;
}

// Extract workedExample backtick string content from src[topicStart..topicEnd]
function extractWE(src, topicStart, topicEnd) {
  const marker = 'workedExample:`';
  const wi = src.indexOf(marker, topicStart);
  if (wi === -1 || wi > topicEnd) return null;
  let we = '';
  let j = wi + marker.length;
  while (j <= topicEnd) {
    if (src[j] === '\\') { we += src[j] + src[j+1]; j += 2; continue; }
    if (src[j] === '`') break;
    we += src[j];
    j++;
  }
  return we || null;
}

// ── Step 1: scan all topics, collect workedExample per title ─────────────────
const weByTitle = {}; // title → raw WE string (with escapes preserved)
const PAT = "{ title:'";
let pos = 0;

while (pos < src.length) {
  const oi = src.indexOf(PAT, pos);
  if (oi === -1) break;

  const ts = oi + PAT.length;
  const te = src.indexOf("'", ts);
  if (te === -1) { pos = oi + 1; continue; }
  const title = src.slice(ts, te);

  // Must be followed by ', points:['
  const gap = src.slice(te + 1, te + 20);
  if (!gap.includes('points:[')) { pos = oi + 1; continue; }

  const topicEnd = findTopicEnd(src, oi);
  if (topicEnd === -1) { pos = oi + 1; continue; }

  pos = oi + 1;

  if (!weByTitle[title]) {
    const we = extractWE(src, oi, topicEnd);
    if (we !== null) weByTitle[title] = we;
  }
}

console.log('Titles with workedExample:', Object.keys(weByTitle).length);

// ── Step 2: inject into topic copies that are missing it ─────────────────────
let totalAdded = 0;
pos = 0;

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

  const we = weByTitle[title];
  if (!we) continue; // no WE available for this title

  const topicEnd = findTopicEnd(src, oi);
  if (topicEnd === -1) continue;

  // Already has workedExample?
  if (src.indexOf('workedExample:`', oi) !== -1 &&
      src.indexOf('workedExample:`', oi) < topicEnd) continue;

  // Find last field end within this topic (commonMistakes > examTips > points)
  let lastEnd = -1;

  const cmEnd = findArrayEnd(src, oi, 'commonMistakes:[');
  if (cmEnd !== -1 && cmEnd < topicEnd) { lastEnd = cmEnd; }
  else {
    const etEnd = findArrayEnd(src, oi, 'examTips:[');
    if (etEnd !== -1 && etEnd < topicEnd) { lastEnd = etEnd; }
    else {
      const ptEnd = findArrayEnd(src, oi, 'points:[');
      if (ptEnd !== -1 && ptEnd < topicEnd) { lastEnd = ptEnd; }
    }
  }

  if (lastEnd === -1) continue;

  // The WE string was extracted as raw (with existing escape sequences).
  // It should be safe to re-insert as-is inside backtick string.
  const inj = ', workedExample:`' + we + '`';
  src = src.slice(0, lastEnd + 1) + inj + src.slice(lastEnd + 1);
  // Advance past injection so we don't re-process this spot
  pos = lastEnd + 1 + inj.length;
  totalAdded++;
}

console.log('workedExample injected into', totalAdded, 'additional topic copies');

// ── Step 3: validate and write ────────────────────────────────────────────────
try {
  new Function(src);
  console.log('SYNTAX OK');
  writeFileSync('app.js', src);
  const total2 = (src.match(/\{ title:'[^']+', points:\[/g)||[]).length;
  const withWE2 = (src.match(/workedExample:`/g)||[]).length;
  console.log('Final coverage:', withWE2, '/', total2, '=', Math.round(withWE2/total2*100) + '%');
} catch(e) {
  console.log('SYNTAX ERROR:', e.message);
  // Binary search for the bad line
  const lines = src.split('\n');
  let lo = 0, hi = lines.length;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    try { new Function(lines.slice(0, mid).join('\n')); lo = mid; } catch { hi = mid; }
  }
  console.log('Bad around line', hi, ':', lines[hi-1]?.slice(0, 150));
}
