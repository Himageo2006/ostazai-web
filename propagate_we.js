// Precise workedExample propagation using eval-based parsing
// Reads the actual data structure, then patches the source string

import { readFileSync, writeFileSync } from 'fs';
let src = readFileSync('app.js', 'utf8');

// ── Step 1: parse IGCSE_SUBJECTS to find which topic instances need WE ──
// We use eval on just the data block
const dataMatch = src.match(/const IGCSE_SUBJECTS\s*=\s*(\{[\s\S]*?\n\})\s*;/);
let subjects;
try { eval('subjects = ' + dataMatch[1]); } catch(e) { console.log('eval err:', e.message); process.exit(1); }

// Build a lookup: for each topic title, collect workedExample from any board that has it
const weByTitle = {};
for (const [sk, subj] of Object.entries(subjects)) {
  for (const b of subj.boards) {
    for (const ch of (subj.chapters[b] || [])) {
      for (const tp of ch.topics) {
        if (tp.workedExample && !weByTitle[tp.title]) {
          weByTitle[tp.title] = tp.workedExample;
        }
      }
    }
  }
}
console.log('Titles with workedExample in data:', Object.keys(weByTitle).length);

// Count how many topic instances currently lack it
let totalMissing = 0;
for (const [sk, subj] of Object.entries(subjects)) {
  for (const b of subj.boards) {
    for (const ch of (subj.chapters[b] || [])) {
      for (const tp of ch.topics) {
        if (!tp.workedExample && weByTitle[tp.title]) totalMissing++;
      }
    }
  }
}
console.log('Topic instances missing workedExample that CAN be filled:', totalMissing);

// ── Step 2: inject into missing instances using exact source positions ──
// For each missing topic instance, find its UNIQUE position in the source.
// Since the same title can appear multiple times, we track injection count per title.

// Count how many times each title appears (to track which occurrence we're at)
const titleOccurrenceCount = {};

let added = 0;
let searchPos = 0;

for (const [sk, subj] of Object.entries(subjects)) {
  for (const b of subj.boards) {
    for (const ch of (subj.chapters[b] || [])) {
      for (const tp of ch.topics) {
        if (!tp.workedExample || !weByTitle[tp.title]) continue;
        // This topic already has it — skip (we need to track its position though)
      }
    }
  }
}

// Better approach: scan source linearly, for each topic found check if it needs WE
// Use the data structure to know WHICH occurrences need it

// Build list of (title, hasWE) for ALL topic instances in order of appearance
const instancePlan = [];
for (const [sk, subj] of Object.entries(subjects)) {
  for (const b of subj.boards) {
    for (const ch of (subj.chapters[b] || [])) {
      for (const tp of ch.topics) {
        instancePlan.push({
          title: tp.title,
          hasWE: !!tp.workedExample,
          needsWE: !tp.workedExample && !!weByTitle[tp.title],
          we: weByTitle[tp.title] || null,
        });
      }
    }
  }
}

// Now scan source and match each title occurrence to the plan
const titleCounts = {}; // how many times we've seen each title so far in source
const titlePlanIdx = {}; // which plan index corresponds to (title, occurrence)

// Build plan index: for each title, list all plan indices
const planByTitle = {};
for (let pi = 0; pi < instancePlan.length; pi++) {
  const t = instancePlan[pi].title;
  if (!planByTitle[t]) planByTitle[t] = [];
  planByTitle[t].push(pi);
}

// Reset title encounter counts
for (const t of Object.keys(planByTitle)) titleCounts[t] = 0;

// Scan source
let srcPos = 0;
let totalAdded = 0;

while (srcPos < src.length) {
  // Find next topic-like pattern: { title:'X', points:[
  const pat1 = "{ title:'";
  const oi = src.indexOf(pat1, srcPos);
  if (oi === -1) break;

  const ts = oi + pat1.length;
  const te = src.indexOf("'", ts);
  if (te === -1) { srcPos = oi + 1; continue; }
  const title = src.slice(ts, te);

  // Check it has points:[ after
  const afterTitle = src.slice(te + 1, te + 25);
  if (!afterTitle.includes('points:[') && !afterTitle.includes(', points:')) {
    srcPos = oi + 1;
    continue;
  }

  srcPos = oi + 1;

  // Which plan entry does this correspond to?
  if (!planByTitle[title]) continue;
  const occIdx = titleCounts[title] || 0;
  titleCounts[title] = occIdx + 1;

  const planEntries = planByTitle[title];
  if (occIdx >= planEntries.length) continue;
  const plan = instancePlan[planEntries[occIdx]];

  if (!plan.needsWE) continue; // already has WE or no WE available

  // Find the end of the points array
  const ps = src.indexOf('points:[', oi);
  if (ps === -1 || ps - oi > 300) continue;

  let depth = 0, i = ps + 7, pe = -1;
  while (i < src.length && i < oi + 5000) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') { if (depth === 0) { pe = i; break; } depth--; }
    i++;
  }
  if (pe === -1) continue;

  // Find end of last existing field
  let lastEnd = pe;
  const checkArr = (kw) => {
    const s2 = src.indexOf(kw, lastEnd);
    if (s2 === -1 || s2 - oi > 4000) return;
    // Verify this field belongs to THIS topic (before next topic starts)
    const nextTopicPos = src.indexOf("{ title:'", lastEnd + 1);
    if (nextTopicPos !== -1 && s2 > nextTopicPos) return;
    let d = 0, j = s2 + kw.length - 1;
    while (j < src.length) { if(src[j]==='[')d++; else if(src[j]===']'){if(d===0){lastEnd=j;return;}d--;} j++; }
  };
  checkArr('examTips:[');
  checkArr('commonMistakes:[');

  // Verify lastEnd is still before next topic
  const nextTP = src.indexOf("{ title:'", lastEnd + 1);
  if (nextTP !== -1 && lastEnd > nextTP) continue;

  // Escape the workedExample for backtick string
  const safe = plan.we
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');

  const inj = ', workedExample:`' + safe + '`';
  src = src.slice(0, lastEnd + 1) + inj + src.slice(lastEnd + 1);
  srcPos = lastEnd + 1 + inj.length;
  totalAdded++;
}

console.log('workedExample injected into', totalAdded, 'topic copies');

try {
  new Function(src);
  console.log('SYNTAX OK');
  writeFileSync('app.js', src);

  // Reparse to verify
  const dataMatch2 = src.match(/const IGCSE_SUBJECTS\s*=\s*(\{[\s\S]*?\n\})\s*;/);
  let subjects2;
  eval('subjects2 = ' + dataMatch2[1]);
  let withWE = 0, total = 0;
  for (const subj of Object.values(subjects2)) {
    for (const b of subj.boards) {
      for (const ch of (subj.chapters[b] || [])) {
        for (const tp of ch.topics) {
          total++;
          if (tp.workedExample) withWE++;
        }
      }
    }
  }
  console.log('Verified coverage:', withWE, '/', total, '=', Math.round(withWE/total*100) + '%');
} catch(e) {
  console.log('SYNTAX ERROR:', e.message);
  const lines = src.split('\n');
  for (let i=0;i<lines.length;i++){
    try{new Function(lines.slice(0,i+1).join('\n'));}catch(e2){
      if(e2.message===e.message){console.log('Line',i+1,':',lines[i].slice(0,120));break;}
    }
  }
}
