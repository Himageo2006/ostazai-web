import { readFileSync, writeFileSync } from 'fs';
let src = readFileSync('app.js', 'utf8');

// ══════════════════════════════════════════════════════════════════
// 1. DARK MODE TOGGLE in IGCSE hub header
// ══════════════════════════════════════════════════════════════════
const OLD_HUB_BADGE = `<div style="display:inline-block;background:#ffffff20;border-radius:20px;padding:3px 12px;font-size:10px;color:#ffffffcc;font-weight:800;letter-spacing:2px;margin-bottom:10px">IGCSE REVISION PLATFORM</div>`;
const NEW_HUB_BADGE = `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="display:inline-block;background:#ffffff20;border-radius:20px;padding:3px 12px;font-size:10px;color:#ffffffcc;font-weight:800;letter-spacing:2px">IGCSE REVISION PLATFORM</div>
        <button onclick="S.darkMode=!S.darkMode;document.getElementById('app').className=S.darkMode?'':'light';saveLocal();render()"
          title="Toggle dark/light mode"
          style="background:#ffffff25;border:none;border-radius:20px;padding:5px 12px;color:#fff;cursor:pointer;font-size:13px;font-weight:700;font-family:Cairo,sans-serif">
          \${S.darkMode?'☀️ Light':'🌙 Dark'}
        </button>
      </div>`;
src = src.replace(OLD_HUB_BADGE, NEW_HUB_BADGE);
console.log('Dark mode toggle:', src.includes('Toggle dark/light mode'));

// ══════════════════════════════════════════════════════════════════
// 2. PRINT BUTTON on topic page header
// ══════════════════════════════════════════════════════════════════
const OLD_TOPIC_META = `<div style="font-size:10px;color:#ffffffaa">\${subj.icon} \${subj.label} · \${board.icon} \${board.short} · Topic \${curIdx+1} of \${allTopics.length}</div>`;
const NEW_TOPIC_META = `<div style="display:flex;align-items:center;justify-content:space-between;margin-top:2px">
      <div style="font-size:10px;color:#ffffffaa">\${subj.icon} \${subj.label} · \${board.icon} \${board.short} · Topic \${curIdx+1} of \${allTopics.length}</div>
      <button onclick="window.print()" title="Print / Save as PDF"
        style="background:#ffffff25;border:none;border-radius:8px;padding:4px 10px;color:#fff;cursor:pointer;font-size:11px;font-family:Cairo,sans-serif;font-weight:700">
        🖨️ Print
      </button>
    </div>`;
src = src.replace(OLD_TOPIC_META, NEW_TOPIC_META);
console.log('Print button:', src.includes('window.print()'));

// ══════════════════════════════════════════════════════════════════
// 3. Print CSS in injectCSS()
// ══════════════════════════════════════════════════════════════════
const PRINT_CSS = `
    @media print {
      body { background:#fff !important; color:#000 !important; }
      #app { display:block !important; }
      button, .no-print { display:none !important; }
      div[style*="fixed"], div[style*="sticky"] { display:none !important; }
      * { color:#000 !important; background:transparent !important; border-color:#ccc !important; box-shadow:none !important; }
      pre, .workedExample, [style*="monospace"] { border:1px solid #ccc; padding:8px; }
    }`;
const CSS_INJECT_END = `  style.textContent = \``;
const cssIdx = src.indexOf(CSS_INJECT_END);
if (cssIdx !== -1) {
  // Find the closing backtick of the CSS template
  const afterStart = cssIdx + CSS_INJECT_END.length;
  const cssEndIdx = src.indexOf('`;\n', afterStart);
  if (cssEndIdx !== -1) {
    src = src.slice(0, cssEndIdx) + PRINT_CSS + src.slice(cssEndIdx);
    console.log('Print CSS added');
  }
}

writeFileSync('app.js', src);
console.log('Step 1-3 done');
