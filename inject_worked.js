import { readFileSync, writeFileSync } from 'fs';
let src = readFileSync('app.js', 'utf8');

// Load WORKED map from add_worked3.js
const raw = readFileSync('add_worked3.js', 'utf8');
const wMatch = raw.match(/const WORKED = \{([\s\S]*?)\n\};/);
let WORKED;
eval('WORKED = {' + wMatch[1] + '}');
console.log('WORKED keys:', Object.keys(WORKED).length);

let added = 0;
let pos = 0;

while (pos < src.length) {
  const tagStr = "title:'";
  const ti = src.indexOf(tagStr, pos);
  if (ti === -1) break;

  // Extract title
  const titleStart = ti + tagStr.length;
  const titleEnd = src.indexOf("'", titleStart);
  if (titleEnd === -1) { pos = ti + 1; continue; }
  const title = src.slice(titleStart, titleEnd);

  // Check if followed by points
  const afterTitle = src.slice(titleEnd + 1, titleEnd + 30);
  if (!afterTitle.includes('points:[')) { pos = titleEnd; continue; }

  pos = ti + 1; // advance

  const we = WORKED[title];
  if (!we) continue;

  // Check if this topic instance already has workedExample
  // Find topic's closing brace
  let braceD = 0, bi = ti;
  while (bi < src.length) {
    if (src[bi] === '{') braceD++;
    else if (src[bi] === '}') { braceD--; if (braceD === 0) break; }
    bi++;
  }
  const topicSrc = src.slice(ti, bi);
  if (topicSrc.includes('workedExample')) continue;

  // Find points array end
  const ps = src.indexOf('points:[', ti);
  if (ps === -1 || ps - ti > 200) continue;

  let depth = 0, i = ps + 7, pe = -1;
  while (i < src.length) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') { if (depth === 0) { pe = i; break; } depth--; }
    i++;
  }
  if (pe === -1) continue;

  let lastEnd = pe;
  const checkArr = (kw) => {
    const s2 = src.indexOf(kw, lastEnd);
    if (s2 === -1 || s2 - lastEnd > 700) return;
    let d = 0, j = s2 + kw.length - 1;
    while (j < src.length) {
      if (src[j] === '[') d++;
      else if (src[j] === ']') { if (d === 0) { lastEnd = j; return; } d--; }
      j++;
    }
  };
  checkArr('examTips:[');
  checkArr('commonMistakes:[');

  // Check for backtick workedExample (shouldn't exist but be safe)
  const wep = src.indexOf('workedExample:`', lastEnd);
  if (wep !== -1 && wep - lastEnd < 700) {
    let j = wep + 15;
    while (j < src.length && src[j] !== '`') j++;
    lastEnd = j;
  }

  const safe = we.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  const inj = ', workedExample:`' + safe + '`';
  src = src.slice(0, lastEnd + 1) + inj + src.slice(lastEnd + 1);
  pos = lastEnd + 1 + inj.length;
  added++;
}

console.log('workedExample added:', added);

try {
  new Function(src);
  console.log('SYNTAX OK');
  writeFileSync('app.js', src);
  console.log('Written');
} catch(e) {
  console.log('SYNTAX ERROR:', e.message);
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    try { new Function(lines.slice(0, i + 1).join('\n')); } catch(e2) {
      if (e2.message === e.message) { console.log('Line', i+1, ':', lines[i].slice(0, 120)); break; }
    }
  }
}
