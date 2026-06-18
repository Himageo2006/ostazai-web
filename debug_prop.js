import { readFileSync } from 'fs';
const src = readFileSync('app.js', 'utf8');

function findTopicEnd(src, openBrace) {
  let depth = 0;
  for (let i = openBrace; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) return i; }
    else if (src[i] === '`') {
      i++;
      while (i < src.length && src[i] !== '`') { if (src[i] === '\\') i++; i++; }
    }
  }
  return -1;
}

function findArrayEnd(src, from, kw) {
  const si = src.indexOf(kw, from);
  if (si === -1) return -1;
  let depth = 0, i = si + kw.length - 1;
  while (i < src.length) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') { depth--; if (depth === 0) return i; }
    else if (src[i] === '`') { i++; while (i < src.length && src[i] !== '`') { if (src[i] === '\\') i++; i++; } }
    i++;
  }
  return -1;
}

// Collect weByTitle
const weByTitle = {};
const PAT = "{ title:'";
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
  const topicEnd = findTopicEnd(src, oi);
  pos = oi + 1;
  if (!weByTitle[title]) {
    const wi = src.indexOf('workedExample:`', oi);
    if (wi !== -1 && wi < topicEnd) {
      let we = '';
      let j = wi + 15;
      while (j < src.length) {
        if (src[j] === '\\') { we += src[j] + src[j+1]; j += 2; continue; }
        if (src[j] === '`') break;
        we += src[j]; j++;
      }
      if (we) weByTitle[title] = we;
    }
  }
}
console.log('Titles with WE at topic level:', Object.keys(weByTitle).length);

// Now try injection — track WHY we skip
const reasons = {};
function track(r) { reasons[r] = (reasons[r]||0) + 1; }

pos = 0;
let injected = 0;
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

  if (!weByTitle[title]) { track('no_we_for_title'); continue; }

  const topicEnd = findTopicEnd(src, oi);
  if (topicEnd === -1) { track('no_topic_end'); continue; }

  const existingWE = src.indexOf('workedExample:`', oi);
  if (existingWE !== -1 && existingWE < topicEnd) { track('already_has_we'); continue; }

  const cmEnd = findArrayEnd(src, oi, 'commonMistakes:[');
  let lastEnd;
  if (cmEnd !== -1 && cmEnd < topicEnd) {
    lastEnd = cmEnd;
    track('will_inject_after_cm');
  } else {
    const etEnd = findArrayEnd(src, oi, 'examTips:[');
    if (etEnd !== -1 && etEnd < topicEnd) {
      lastEnd = etEnd;
      track('will_inject_after_et');
    } else {
      const ptEnd = findArrayEnd(src, oi, 'points:[');
      if (ptEnd !== -1 && ptEnd < topicEnd) {
        lastEnd = ptEnd;
        track('will_inject_after_pt');
      } else {
        track('no_insertion_point');
        continue;
      }
    }
  }
  injected++;
}

console.log('Would inject:', injected);
console.log('Skip/inject reasons:');
Object.entries(reasons).sort((a,b)=>b[1]-a[1]).forEach(([r,n])=>console.log(' ',r,':',n));
