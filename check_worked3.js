import { readFileSync } from 'fs';
const src = readFileSync('app.js', 'utf8');
const raw = readFileSync('add_worked3.js', 'utf8');

const wMatch = raw.match(/const WORKED = \{([\s\S]*?)\n\};/);
let WORKED;
eval('WORKED = {' + wMatch[1] + '}');
const workedTitles = Object.keys(WORKED);
console.log('WORKED entries in add_worked3.js:', workedTitles.length);

function findTopicEnd(src, oi) {
  let depth = 0;
  for (let i = oi; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) return i; }
    else if (src[i] === 96) { // backtick char code
      i++;
      while (i < src.length && src.charCodeAt(i) !== 96) {
        if (src[i] === '\\') i++;
        i++;
      }
    }
  }
  return -1;
}

const weAtTopicLevel = new Set();
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
  const wi = src.indexOf('workedExample:`', oi);
  if (wi !== -1 && wi < topicEnd) weAtTopicLevel.add(title);
  pos = oi + 1;
}

const canInject = workedTitles.filter(t => !weAtTopicLevel.has(t));
console.log('WORKED titles already have WE:', workedTitles.length - canInject.length);
console.log('WORKED titles that can be injected:', canInject.length);
if (canInject.length > 0) console.log('First 5:', canInject.slice(0,5));
