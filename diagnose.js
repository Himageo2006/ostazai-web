import { readFileSync } from 'fs';
const src = readFileSync('app.js', 'utf8');

function findTopicEnd(src, openBrace) {
  let depth = 0;
  for (let i = openBrace; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) return i; }
    else if (src[i] === '`') {
      i++;
      while (i < src.length && src[i] !== '`') {
        if (src[i] === '\\') i++;
        i++;
      }
    }
  }
  return -1;
}

const PAT = "{ title:'";
let pos = 0, found = 0, missing = 0;
const missingTitles = [];

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

  const topicContent = src.slice(oi, topicEnd + 1);
  const hasWE = topicContent.includes('workedExample:`');

  if (hasWE) {
    found++;
  } else {
    const weInSrc = src.indexOf('workedExample:`', oi);
    const nextTopic = src.indexOf(PAT, oi + 1);
    if (weInSrc !== -1 && weInSrc < nextTopic && weInSrc > topicEnd) {
      missing++;
      if (missingTitles.length < 5) missingTitles.push({ title, topicEnd, wePos: weInSrc, nextTopic });
    }
  }
}

console.log('Topics with WE found correctly:', found);
console.log('Topics where WE is AFTER topicEnd (findTopicEnd too short):', missing);
missingTitles.forEach(m => {
  console.log('\nTitle: "' + m.title + '"');
  console.log('  topicEnd=' + m.topicEnd + ', wePos=' + m.wePos + ', nextTopic=' + m.nextTopic);
  console.log('  At topicEnd: ' + JSON.stringify(src.slice(m.topicEnd - 10, m.topicEnd + 20)));
  // Show chars around topicEnd-2 to see what's there
  console.log('  Chars before topicEnd:', JSON.stringify(src.slice(m.topicEnd - 50, m.topicEnd + 5)));
});
