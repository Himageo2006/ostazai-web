import { readFileSync, writeFileSync } from 'fs';
let src = readFileSync('app.js', 'utf8');

// ── 1. Add bookmarks to router ──────────────────────────────────────
src = src.replace(
  `  if (S.igcseView === 'planner')  return tplIGCSEPlanner();`,
  `  if (S.igcseView === 'planner')  return tplIGCSEPlanner();\n  if (S.igcseView === 'bookmarks') return tplIGCSEBookmarks();`
);
console.log('bookmarks route added');

// ── 2. Inject Planner + Bookmarks functions before tplIGCSEHub ──────
const PLANNER_FN = `
/* ═══════════════════════════════════════════════════════════════════
   Revision Planner
   ═══════════════════════════════════════════════════════════════════ */
function tplIGCSEPlanner() {
  const examDate = S.igcseExamDate || '';
  const today = new Date(); today.setHours(0,0,0,0);
  const daysLeft = examDate
    ? Math.max(0, Math.round((new Date(examDate) - today) / 86400000))
    : 0;

  // Collect all topics not yet mastered
  const allPending = [];
  for (const [sk, subj] of Object.entries(IGCSE_SUBJECTS)) {
    for (const b of subj.boards) {
      const chs = subj.chapters[b] || [];
      chs.forEach((ch, ci) => {
        ch.topics.forEach((tp, ti) => {
          const pk = sk + '|' + b + '|' + tp.title;
          const status = (S.igcseProgress || {})[pk] || '';
          if (status !== 'mastered') allPending.push({ sk, b, subj, ch, ci, tp, ti, status, pk });
        });
      });
    }
  }

  const total  = allPending.length;
  const perDay = daysLeft > 0 ? Math.ceil(total / daysLeft) : 0;

  const reviewFirst = allPending.filter(x => x.status === 'review');
  const unstudied   = allPending.filter(x => !x.status);
  const studied     = allPending.filter(x => x.status === 'studied');
  const masteredCnt = Object.values(S.igcseProgress || {}).filter(v => v === 'mastered').length;

  // Build 7-day preview schedule
  let scheduleRows = '';
  if (daysLeft > 0 && total > 0) {
    const ordered = [...reviewFirst, ...unstudied, ...studied];
    const days = Math.min(7, daysLeft);
    let ti2 = 0;
    for (let d = 0; d < days; d++) {
      const date = new Date(today); date.setDate(today.getDate() + d);
      const slice = ordered.slice(ti2, ti2 + perDay); ti2 += perDay;
      if (!slice.length) break;
      const dayLabel = d === 0 ? 'Today' : d === 1 ? 'Tomorrow'
        : date.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' });
      scheduleRows += `
      <div style="margin-bottom:14px">
        <div style="font-size:10px;font-weight:900;color:var(--text-muted);letter-spacing:1.5px;margin-bottom:6px">${dayLabel.toUpperCase()}</div>
        ${slice.map(x => {
          const sc = x.status==='review'?'#EF4444':x.status==='studied'?'#3B82F6':'var(--text-muted)';
          const si = x.status==='review'?'⚠️':x.status==='studied'?'📖':'○';
          return `<div onclick="S.igcseSubject='${x.sk}';S.igcseBoard='${x.b}';S.igcseChapter=${x.ci};S.igcseTopic=${x.ti};S.igcseTab='notes';S.igcseView='list';render()"
            style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--bg-card);border-radius:10px;
                   margin-bottom:5px;cursor:pointer;border:1px solid var(--border);border-left:4px solid ${x.subj.color}">
            <span style="font-size:16px">${x.subj.icon}</span>
            <div style="flex:1;min-width:0">
              <div style="font-size:12px;font-weight:700;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${x.tp.title}</div>
              <div style="font-size:10px;color:var(--text-muted)">${x.subj.label} · ${x.b.toUpperCase()}</div>
            </div>
            <span style="font-size:12px;color:${sc}">${si}</span>
          </div>`;
        }).join('')}
      </div>`;
    }
  }

  return `<div style="max-width:620px;margin:0 auto;padding:0 0 80px">
    <!-- Header -->
    <div style="display:flex;align-items:center;gap:10px;padding:14px;margin-bottom:6px">
      <button onclick="S.igcseView='list';render()"
        style="width:34px;height:34px;border-radius:50%;border:none;background:var(--bg-card);cursor:pointer;font-size:18px;color:var(--text)">←</button>
      <div style="flex:1">
        <div style="font-size:16px;font-weight:900;color:var(--text)">📅 Revision Planner</div>
        <div style="font-size:11px;color:var(--text-muted)">Smart daily schedule based on your progress</div>
      </div>
    </div>

    <div style="padding:0 14px">

      <!-- Exam Date -->
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:16px;margin-bottom:14px">
        <div style="font-size:10px;font-weight:900;color:var(--text-muted);letter-spacing:1px;margin-bottom:8px">📅 YOUR EXAM DATE</div>
        <input type="date" value="${S.igcseExamDate||''}"
          min="${new Date().toISOString().split('T')[0]}"
          onchange="S.igcseExamDate=this.value;saveLocal();render()"
          style="width:100%;padding:10px 14px;border-radius:10px;border:1.5px solid var(--border);background:var(--bg);color:var(--text);font-size:14px;font-family:Cairo,sans-serif;box-sizing:border-box"/>
        ${daysLeft > 0 ? `
        <div style="display:flex;gap:10px;margin-top:12px">
          <div style="flex:1;text-align:center;padding:12px;background:${daysLeft<14?'#EF444418':'#10B98118'};border-radius:12px;border:1px solid ${daysLeft<14?'#EF444430':'#10B98130'}">
            <div style="font-size:24px;font-weight:900;color:${daysLeft<14?'#EF4444':'#10B981'}">${daysLeft}</div>
            <div style="font-size:10px;color:var(--text-muted)">days left</div>
          </div>
          <div style="flex:1;text-align:center;padding:12px;background:var(--bg);border-radius:12px;border:1px solid var(--border)">
            <div style="font-size:24px;font-weight:900;color:var(--text)">${perDay}</div>
            <div style="font-size:10px;color:var(--text-muted)">topics / day</div>
          </div>
          <div style="flex:1;text-align:center;padding:12px;background:var(--bg);border-radius:12px;border:1px solid var(--border)">
            <div style="font-size:24px;font-weight:900;color:var(--text)">${total}</div>
            <div style="font-size:10px;color:var(--text-muted)">to revise</div>
          </div>
        </div>` : ''}
      </div>

      <!-- Urgency Breakdown -->
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
        <div style="flex:1;min-width:80px;padding:10px;border-radius:12px;background:#EF444418;border:1px solid #EF444430;text-align:center">
          <div style="font-size:20px;font-weight:900;color:#EF4444">${reviewFirst.length}</div>
          <div style="font-size:9px;color:#EF4444;font-weight:700">⚠️ REVIEW</div>
        </div>
        <div style="flex:1;min-width:80px;padding:10px;border-radius:12px;background:var(--bg-card);border:1px solid var(--border);text-align:center">
          <div style="font-size:20px;font-weight:900;color:var(--text)">${unstudied.length}</div>
          <div style="font-size:9px;color:var(--text-muted);font-weight:700">○ NOT STARTED</div>
        </div>
        <div style="flex:1;min-width:80px;padding:10px;border-radius:12px;background:#3B82F618;border:1px solid #3B82F630;text-align:center">
          <div style="font-size:20px;font-weight:900;color:#3B82F6">${studied.length}</div>
          <div style="font-size:9px;color:#3B82F6;font-weight:700">📖 STUDIED</div>
        </div>
        <div style="flex:1;min-width:80px;padding:10px;border-radius:12px;background:#10B98118;border:1px solid #10B98130;text-align:center">
          <div style="font-size:20px;font-weight:900;color:#10B981">${masteredCnt}</div>
          <div style="font-size:9px;color:#10B981;font-weight:700">🏆 MASTERED</div>
        </div>
      </div>

      <!-- Schedule Preview -->
      ${daysLeft > 0 ? `
      <div style="font-size:10px;font-weight:900;color:var(--text-muted);letter-spacing:1.5px;margin-bottom:12px">7-DAY PREVIEW — tap any topic to study it now</div>
      ${scheduleRows || '<div style="text-align:center;padding:30px;color:var(--text-muted)">🎉 All topics mastered!</div>'}
      ` : `
      <div style="text-align:center;padding:40px 20px;background:var(--bg-card);border-radius:16px;border:1px solid var(--border)">
        <div style="font-size:44px;margin-bottom:12px">📅</div>
        <div style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:6px">Set your exam date above</div>
        <div style="font-size:12px;color:var(--text-muted)">Your personalised revision schedule will appear here</div>
      </div>`}
    </div>
  </div>`;
}

/* ═══════════════════════════════════════════════════════════════════
   Bookmarks
   ═══════════════════════════════════════════════════════════════════ */
function tplIGCSEBookmarks() {
  const bkKeys = Object.keys(S.igcseProgress || {}).filter(k => k.startsWith('bk|'));
  const bookmarks = bkKeys.map(k => {
    const parts = k.split('|');
    const sk = parts[1], b = parts[2], title = parts.slice(3).join('|');
    const subj = IGCSE_SUBJECTS[sk];
    if (!subj) return null;
    const chapters = subj.chapters[b] || [];
    let ci = -1, ti = -1;
    chapters.forEach((ch, _ci) => ch.topics.forEach((tp, _ti) => {
      if (tp.title === title) { ci = _ci; ti = _ti; }
    }));
    if (ci === -1) return null;
    return { sk, b, title, subj, ci, ti, k };
  }).filter(Boolean);

  const items = bookmarks.length
    ? bookmarks.map(bk => `
      <div style="display:flex;align-items:center;gap:12px;padding:14px;background:var(--bg-card);border-radius:14px;margin-bottom:8px;border:1px solid var(--border);border-left:4px solid ${bk.subj.color}">
        <span style="font-size:22px">${bk.subj.icon}</span>
        <div style="flex:1;min-width:0;cursor:pointer"
          onclick="S.igcseSubject='${bk.sk}';S.igcseBoard='${bk.b}';S.igcseChapter=${bk.ci};S.igcseTopic=${bk.ti};S.igcseTab='notes';S.igcseView='list';render()">
          <div style="font-size:13px;font-weight:800;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${bk.title}</div>
          <div style="font-size:10px;color:var(--text-muted)">${bk.subj.label} · ${bk.b.toUpperCase()}</div>
        </div>
        <button onclick="S.igcseSubject='${bk.sk}';S.igcseBoard='${bk.b}';S.igcseChapter=${bk.ci};S.igcseTopic=${bk.ti};S.igcseTab='notes';S.igcseView='list';render()"
          style="padding:6px 12px;border-radius:8px;border:none;background:${bk.subj.color};color:#fff;cursor:pointer;font-size:11px;font-weight:700;font-family:Cairo,sans-serif">
          Study →
        </button>
        <button onclick="delete S.igcseProgress['${bk.k}'];saveLocal();render()"
          style="padding:6px 10px;border-radius:8px;border:1px solid var(--border);background:var(--bg);color:var(--text-muted);cursor:pointer;font-size:14px;line-height:1">
          ×
        </button>
      </div>`).join('')
    : `<div style="text-align:center;padding:50px 20px">
        <div style="font-size:52px;margin-bottom:12px">⭐</div>
        <div style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px">No bookmarks yet</div>
        <div style="font-size:12px;color:var(--text-muted)">Tap ☆ on any topic page to save it here for quick access</div>
      </div>`;

  return `<div style="max-width:620px;margin:0 auto;padding:0 0 80px">
    <div style="display:flex;align-items:center;gap:10px;padding:14px;margin-bottom:6px">
      <button onclick="S.igcseView='list';render()"
        style="width:34px;height:34px;border-radius:50%;border:none;background:var(--bg-card);cursor:pointer;font-size:18px;color:var(--text)">←</button>
      <div style="flex:1">
        <div style="font-size:16px;font-weight:900;color:var(--text)">⭐ Bookmarks</div>
        <div style="font-size:11px;color:var(--text-muted)">${bookmarks.length} saved topic${bookmarks.length===1?'':'s'}</div>
      </div>
    </div>
    <div style="padding:0 14px">${items}</div>
  </div>`;
}

`;

src = src.replace('function tplIGCSEHub()', PLANNER_FN + 'function tplIGCSEHub()');
console.log('Functions inserted:', src.includes('function tplIGCSEPlanner()'), src.includes('function tplIGCSEBookmarks()'));

// Validate
try {
  new Function(src);
  console.log('SYNTAX OK');
  writeFileSync('app.js', src);
  console.log('Written');
} catch(e) {
  console.log('SYNTAX ERROR:', e.message);
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    try { new Function(lines.slice(0, i+1).join('\n')); } catch(e2) {
      if (e2.message === e.message) { console.log('Near line', i+1, ':', lines[i].slice(0,120)); break; }
    }
  }
}
