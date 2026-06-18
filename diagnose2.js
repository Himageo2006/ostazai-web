import { readFileSync } from 'fs';
const src = readFileSync('app.js', 'utf8');

// Find "Sine & Cosine Rules (Non-Right Triangles)" topic start
const PAT = "{ title:'";
const title = "Sine & Cosine Rules (Non-Right Triangles)";
let pos = 0;
while (pos < src.length) {
  const oi = src.indexOf(PAT, pos);
  if (oi === -1) break;
  const ts = oi + PAT.length;
  const te = src.indexOf("'", ts);
  if (te === -1) { pos = oi + 1; continue; }
  const t = src.slice(ts, te);
  if (t !== title) { pos = oi + 1; continue; }

  // Found — now trace brace counting
  let depth = 0, firstDrop = -1;
  let inSingleQuote = false, inDoubleQuote = false, inTemplate = false;

  // Simple trace — show depth changes
  const events = [];
  for (let i = oi; i < oi + 3000; i++) {
    const c = src[i];
    if (c === '{' && !inSingleQuote && !inDoubleQuote) {
      depth++;
      if (depth <= 2) events.push({ pos: i, char: c, depth, ctx: JSON.stringify(src.slice(Math.max(0,i-10), i+15)) });
    } else if (c === '}' && !inSingleQuote && !inDoubleQuote) {
      depth--;
      if (depth <= 1) events.push({ pos: i, char: c, depth, ctx: JSON.stringify(src.slice(Math.max(0,i-10), i+15)) });
      if (depth === 0) {
        firstDrop = i;
        events.push({ pos: i, char: 'DONE', depth: 0 });
        break;
      }
    } else if (c === "'") {
      // Toggle — crude
      inSingleQuote = !inSingleQuote;
    }
  }

  console.log('Events for "' + title + '":');
  events.forEach(e => console.log('  pos=' + e.pos + ' char=' + e.char + ' depth=' + e.depth + ' ctx=' + e.ctx));
  break;
}
