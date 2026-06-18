import { readFileSync, writeFileSync } from 'fs';
let src = readFileSync('app.js', 'utf8');

const we = `Sample photo card: Describe a photo of young people using smartphones in a cafe.
Key structures: Il y a... / On voit... / A mon avis...
Pronunciation: practise liaison — les enfants, vous avez
Extend answer: add opinion + reason + future plan
If you forget a word: describe it (un truc pour ecrire = a thing for writing = a pen)`;

const tagStr = "title:'Speaking Preparation'";
let pos = 0;

while (pos < src.length) {
  const ti = src.indexOf(tagStr, pos);
  if (ti === -1) break;
  pos = ti + 1;

  const after = src.slice(ti + tagStr.length, ti + tagStr.length + 30);
  if (!after.includes('points:[')) continue;

  let bd = 0, bi = ti;
  while (bi < src.length) {
    if (src[bi] === '{') bd++;
    else if (src[bi] === '}') { bd--; if (bd === 0) break; }
    bi++;
  }
  if (src.slice(ti, bi).includes('workedExample')) continue;

  const ps = src.indexOf('points:[', ti);
  let depth = 0, i = ps + 7, pe = -1;
  while (i < src.length) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') { if (depth === 0) { pe = i; break; } depth--; }
    i++;
  }

  let lastEnd = pe;
  const checkArr = (kw) => {
    const s2 = src.indexOf(kw, lastEnd);
    if (s2 === -1 || s2 - lastEnd > 700) return;
    let d = 0, j = s2 + kw.length - 1;
    while (j < src.length) { if (src[j]==='[') d++; else if (src[j]===']') { if(d===0){lastEnd=j;return;} d--; } j++; }
  };
  checkArr('examTips:[');
  checkArr('commonMistakes:[');

  const safe = we.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  src = src.slice(0, lastEnd + 1) + ', workedExample:`' + safe + '`' + src.slice(lastEnd + 1);
  console.log('Injected Speaking Preparation');
}

try {
  new Function(src);
  console.log('SYNTAX OK');
  writeFileSync('app.js', src);
  console.log('Written');
} catch(e) {
  console.log('ERROR:', e.message);
}
