﻿/* ============================================================
   أستاذ AI — app.js  PART 1 / 3
   State · Helpers · CURRICULA · Auth templates
   ============================================================ */

const API = 'https://ostazai-server-production.up.railway.app/api';

let S = {
  screen: 'loading',
  token: null, user: null, messages: [], thinking: false,
  subject: 'الرياضيات',
  curriculum: 'egypt',
  grade: 'high',           // primary | middle | high
  flashcards: [], fcIndex: 0, fcFlipped: false,
  quiz: [], quizIndex: 0, quizAnswer: null, quizScore: 0,
  stats: null, notes: [], bookmarks: [], wrongAnswers: [],
  pomodoroMode: 'work', pomodoroLeft: 25*60, pomodoroRunning: false, pomodoroSessions: 0,
  noteColor: '#3B82F6', noteSearch: '', bmSearch: '',
  questionsRemaining: null,
  lang: 'ar',
  schedule: [], history: [], leaderboard: [],
  summaryText: '', summaryLoading: false,
  mindMapTopic: '', mindMapData: null,
  textbookUrl: 'home',
  darkMode: false,
  onboardStep: 0,
  historySearch: '',
  // Lesson browser
  lessonView: 'subjects',   // 'subjects' | 'chapters' | 'lesson'
  lessonSubject: null,      // { name, icon, color, topics[] }
  lessonChapter: null,      // topic string (chapter name)
  lessonResource: 'ministry', // 'ministry' | 'external'
  lessonContent: '',        // AI-generated lesson content
  lessonLoading: false,
  // IGCSE Platform
  igcseBoard: 'cie',
  igcseSubject: null,
  igcseChapter: null,
  igcseTopic: null,
  igcseTab: 'notes',
  igcseSearch: '',
  igcseDone: {},   // { 'subj-ci-ti': true } — completed topics
  igcseView: 'list', // 'list' | 'formulas'
  igcseExamDate: '', // YYYY-MM-DD for countdown
  igcseFcIdx: 0,     // flashcard index within current topic
  igcseFcFlipped: false, // is current flashcard flipped?
  igcseRecent: [],   // [{ sk, ci, ti, label, topicTitle }] — recently studied
};
let _pomTimer = null;

/* ── persistence ── */
function saveLocal() {
  try {
    localStorage.setItem('oa_token',      S.token || '');
    localStorage.setItem('oa_user',       JSON.stringify(S.user || {}));
    localStorage.setItem('oa_notes',      JSON.stringify(S.notes));
    localStorage.setItem('oa_bookmarks',  JSON.stringify(S.bookmarks));
    localStorage.setItem('oa_wrong',      JSON.stringify(S.wrongAnswers));
    localStorage.setItem('oa_schedule',   JSON.stringify(S.schedule));
    localStorage.setItem('oa_subject',    S.subject);
    localStorage.setItem('oa_curriculum', S.curriculum);
    localStorage.setItem('oa_grade',      S.grade);
    if (S.stats) localStorage.setItem('oa_stats', JSON.stringify(S.stats));
    localStorage.setItem('oa_dark', S.darkMode ? '1' : '');
    localStorage.setItem('oa_lang', S.lang || 'ar');
  } catch {}
}
function loadLocal() {
  try {
    S.token      = localStorage.getItem('oa_token') || null;
    const u      = localStorage.getItem('oa_user');
    S.user       = u ? JSON.parse(u) : null;
    S.notes      = JSON.parse(localStorage.getItem('oa_notes')     || '[]');
    S.bookmarks  = JSON.parse(localStorage.getItem('oa_bookmarks') || '[]');
    S.wrongAnswers = JSON.parse(localStorage.getItem('oa_wrong')   || '[]');
    S.schedule   = JSON.parse(localStorage.getItem('oa_schedule')  || '[]');
    S.subject    = localStorage.getItem('oa_subject')    || 'الرياضيات';
    S.curriculum = localStorage.getItem('oa_curriculum') || 'egypt';
    S.grade      = localStorage.getItem('oa_grade')      || 'high';
    S.darkMode   = localStorage.getItem('oa_dark') === '1';
    S.lang       = localStorage.getItem('oa_lang') || 'ar';
    const st     = localStorage.getItem('oa_stats');
    S.stats      = st ? JSON.parse(st) : { xp:0, streak:1, totalChats:0, weeklyActivity:[0,0,0,0,0,0,0], quizzesDone:0, bestScore:0 };
  } catch {}
}

/* ── tiny utils ── */
const ge  = id => document.getElementById(id);
const esc = s  => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/'/g,'&quot;');

function md(t) {
  if (!t) return '';
  // Escape HTML first, then apply markdown
  let s = t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  // Code blocks
  s = s.replace(/```[\w]*\n?([\s\S]*?)```/g,
    '<pre style="background:#0F172A;padding:12px;border-radius:8px;overflow-x:auto;margin:8px 0;direction:ltr;font-size:13px"><code>$1</code></pre>');
  s = s.replace(/`([^`]+)`/g,
    '<code style="background:#1E293B;padding:2px 6px;border-radius:4px;font-size:13px;color:#22C55E">$1</code>');
  // Bold + italic
  s = s.replace(/\*\*\*(.+?)\*\*\*/g, '<b><i>$1</i></b>');
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*(.+?)\*/g,     '<em>$1</em>');
  // Headers
  s = s.replace(/^### (.+)$/gm, '<h4 style="color:var(--primary);font-size:14px;font-weight:900;margin:10px 0 4px">$1</h4>');
  s = s.replace(/^## (.+)$/gm,  '<h3 style="color:var(--primary);font-size:16px;font-weight:900;margin:12px 0 6px;border-bottom:1px solid var(--border);padding-bottom:4px">$1</h3>');
  s = s.replace(/^# (.+)$/gm,   '<h2 style="color:var(--primary);font-size:18px;font-weight:900;margin:14px 0 8px">$1</h2>');
  // Horizontal rule
  s = s.replace(/^---$/gm, '<hr style="border:none;border-top:1px solid var(--border);margin:12px 0">');
  // Lists — numbered
  s = s.replace(/^\d+\. (.+)$/gm, '<li style="margin:4px 0;padding-right:4px;list-style:decimal">$1</li>');
  // Lists — bullet
  s = s.replace(/^[-•*] (.+)$/gm, '<li style="margin:4px 0;padding-right:4px">$1</li>');
  // Wrap consecutive li tags
  s = s.replace(/((<li[^>]*>[\s\S]*?<\/li>\n?)+)/g,
    '<ul style="padding-right:24px;margin:8px 0;display:flex;flex-direction:column;gap:2px">$1</ul>');
  // Paragraphs
  s = s.replace(/\n\n/g, '</p><p style="margin:6px 0">');
  s = s.replace(/\n/g, '<br>');
  return s;
}

function showToast(msg, type='info') {
  const t = document.createElement('div');
  t.className = 'toast toast-' + type;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}
function showAuthErr(msg) {
  const el = ge('auth-error');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}
function setBtnLoading(id, label) {
  const b = ge(id);
  if (b) b.textContent = label;
}

/* ── API ── */
async function req(path, method='GET', body=null, retries=1) {
  if (!navigator.onLine) throw new Error('لا يوجد اتصال بالإنترنت \u{1F4F6}');
  const h = { 'Content-Type': 'application/json' };
  if (S.token) h['Authorization'] = `Bearer ${S.token}`;
  let r;
  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 30000); // 30s timeout
    r = await fetch(API + path, {
      method, headers: h,
      body: body ? JSON.stringify(body) : undefined,
      signal: ctrl.signal,
    });
    clearTimeout(timeout);
  } catch(err) {
    if (err.name === 'AbortError') throw new Error('انتهى وقت الانتظار \u{23F1} — حاول مجدداً');
    // Retry once on network error
    if (retries > 0) {
      await new Promise(res => setTimeout(res, 1000));
      return req(path, method, body, retries - 1);
    }
    throw new Error('تعذّر الوصول للخادم \u{1F50C} — تحقق من الاتصال');
  }
  // Capture rate limit header
  const remaining = r.headers.get('X-Questions-Remaining');
  if (remaining !== null && S.screen === 'chat') {
    const rem = parseInt(remaining);
    if (!isNaN(rem) && rem !== Infinity) {
      S.questionsRemaining = rem;
    }
  }
  let d;
  try { d = await r.json(); } catch { d = {}; }
  if (r.status === 401) {
    // Token expired — logout silently
    S.token = null; S.user = null; saveLocal();
    S.screen = 'login'; render();
    throw new Error('انتهت جلستك — سجّل الدخول مجدداً');
  }
  if (r.status === 429) throw new Error('وصلت الحد الأقصى من الطلبات \u{23F3} — انتظر قليلاً');
  if (r.status >= 500) throw new Error('خطأ في الخادم \u{1F6A8} — حاول بعد قليل');
  if (!r.ok) throw new Error(d.error || d.message || `خطأ (${r.status})`);
  return d;
}

/* ── render ── */
function render() {
  const el = ge('app');
  if      (S.screen === 'loading')       { el.innerHTML = tplLoading(); }
  else if (S.screen === 'login')         { el.innerHTML = tplLogin(); }
  else if (S.screen === 'register')      { el.innerHTML = tplRegister(); }
  else if (S.screen === 'forgot')        { el.innerHTML = tplForgotPassword(); }
  else if (S.screen === 'reset-password'){ el.innerHTML = tplResetPassword(S.resetToken || ''); }
  else                                   { el.innerHTML = tplShell(screenContent()); }
  bind();
}
function screenContent() {
  const map = {
    chat: tplChat, flashcards: tplFlashcards, quiz: tplQuiz,
    stats: tplStats, profile: tplProfile, notes: tplNotes,
    bookmarks: tplBookmarks, wrong: tplWrong, pomodoro: tplPomodoro,
    schedule: tplSchedule, history: tplHistory, leaderboard: tplLeaderboard,
    summary: tplSummary, mindmap: tplMindMap, textbook: tplTextbook,
    upgrade: tplUpgrade, lessons: tplLessons, admin: tplAdmin, onboarding: tplOnboarding,
    igcse: tplIGCSE,
  };
  return (map[S.screen] || tplChat)();
}

/* ════════════════════════════════════════════════════════════
   CURRICULA  — 19 Arab countries × 3 grade levels
   ════════════════════════════════════════════════════════════ */
const GRADES_META = {
  primary: { label:'🏫 ابتدائي',         sub:'الصف الأول — السادس' },
  middle:  { label:'📚 إعدادي / متوسط', sub:'الصف السابع — التاسع' },
  high:    { label:'🎓 ثانوي',           sub:'الصف العاشر — الثاني عشر' },
};

function mkSubj(name, icon, color, ...topics) {
  return { name, icon, color, topics };
}

const S_MATH='#3B82F6', S_PHY='#F59E0B',  S_CHEM='#10B981', S_BIO='#EC4899',
      S_AR='#8B5CF6',   S_EN='#F97316',   S_ISL='#84CC16',  S_HIST='#6366F1',
      S_GEO='#0EA5E9',  S_SCI='#06B6D4',  S_FR='#003189',   S_PHIL='#64748B',
      S_COMP='#8B5CF6', S_SOC='#A855F7';

/* shared subject builders for curricula with similar structures */
function _primarySubjects(countryHistory) {
  return [
    mkSubj('الرياضيات','🔢',S_MATH,'الأعداد والعمليات الأساسية','الجمع والطرح','الضرب والقسمة','الكسور العادية','القياس والوحدات','الأشكال الهندسية','المسائل الحياتية'),
    mkSubj('اللغة العربية','📜',S_AR,'الحروف والقراءة','القراءة والاستيعاب','النحو الأساسي','الإملاء والكتابة','التعبير الشفهي والكتابي','المحفوظات والأناشيد'),
    mkSubj('العلوم','🔬',S_SCI,'الكائنات الحية','جسم الإنسان','الطاقة وأشكالها','المادة وخواصها','الأرض والفضاء','البيئة والطبيعة'),
    mkSubj('الدراسات الاجتماعية','🌍',S_HIST,...countryHistory),
    mkSubj('التربية الإسلامية','☪️',S_ISL,'القرآن الكريم وتجويده','الأحاديث النبوية','أركان الإسلام','السلوك والأخلاق','السيرة النبوية'),
    mkSubj('اللغة الإنجليزية','🗣️',S_EN,'Alphabet & Phonics','Basic Vocabulary','Simple Sentences','Reading Passages','Writing Practice'),
  ];
}

function _middleSubjects(extraIslam) {
  return [
    mkSubj('الرياضيات','🔢',S_MATH,'الأعداد الصحيحة والنسب','الجبر والمعادلات الخطية','الهندسة','الإحصاء الأساسي','الكسور والنسبة والتناسب','المعادلات التربيعية البسيطة'),
    mkSubj('الفيزياء','⚡',S_PHY,'الحركة والقوى','الكثافة والضغط','الحرارة والتمدد','الصوت والضوء','الكهرباء الساكنة البسيطة'),
    mkSubj('الكيمياء','🧪',S_CHEM,'المادة وخواصها','المخاليط والمحاليل','التفاعلات الكيميائية البسيطة','الذرة والعناصر','الجدول الدوري المبسط'),
    mkSubj('الأحياء','🦠',S_BIO,'الخلية النباتية والحيوانية','التغذية والهضم','الجهاز الدوري','التنفس','الوراثة المبسطة'),
    mkSubj('اللغة العربية','📜',S_AR,'النحو والإعراب','الصرف والاشتقاق','البلاغة الأساسية','الأدب والنصوص','الكتابة والتعبير'),
    mkSubj('التربية الإسلامية','☪️',S_ISL,...(extraIslam||['القرآن والتفسير','الفقه وأحكام العبادات','الحديث والسيرة','القيم والأخلاق'])),
    mkSubj('اللغة الإنجليزية','🗣️',S_EN,'Grammar Basics','Reading & Comprehension','Vocabulary','Writing Paragraphs','Conversation'),
  ];
}


/* ════════════════════════════════════════════════════════════
   TRANSLATIONS (i18n)
   ════════════════════════════════════════════════════════════ */
const TRANSLATIONS = {
  en: {
    // App
    appName: 'OstazAI',
    appSlogan: 'Your AI Study Assistant',
    // Nav
    chat: 'Chat', lessons: 'Lessons', flashcards: 'Flashcards',
    quiz: 'Quiz', summary: 'Summary', mindmap: 'Mind Map',
    textbook: 'Books', stats: 'Stats', notes: 'Notes',
    bookmarks: 'Bookmarks', wrong: 'Mistakes', pomodoro: 'Pomodoro',
    schedule: 'Schedule', history: 'History', leaderboard: 'Leaderboard',
    profile: 'Profile', upgrade: 'Pro', admin: 'Admin', more: 'More',
    // Auth
    login: 'Sign In', register: 'Sign Up',
    email: 'Email', password: 'Password', name: 'Full Name',
    loginBtn: 'Sign In', registerBtn: 'Create Account 🚀',
    guestBtn: 'Continue as Guest',
    forgotPassword: 'Forgot your password?',
    noAccount: "Don't have an account?", createAccount: 'Create one',
    haveAccount: 'Already have an account?', signIn: 'Sign In',
    rememberPwd: 'Remembered your password?',
    sendReset: '📧 Send Reset Link',
    newPassword: 'New Password', confirmPassword: 'Confirm Password',
    savePassword: '✅ Save Password',
    referralCode: 'Referral Code (optional)',
    referralHint: '✨ Sign up with a referral code and get 7 days Pro free!',
    haveReferral: 'Have a referral code?',
    country: 'Country',
    // Buttons
    send: 'Send ➤', save: 'Save', cancel: 'Cancel', delete: 'Delete',
    edit: 'Edit', copy: 'Copy', share: 'Share', close: 'Close',
    add: 'Add', next: 'Next →', prev: '← Previous', back: 'Back',
    generate: 'Generate', refresh: 'Refresh', retry: 'Retry',
    start: 'Start ▶', pause: '⏸ Pause', reset: '🔄 Reset',
    upgrade: '⭐ Upgrade to Pro', logout: '🚪 Sign Out',
    changeTheme: 'Dark / Light',
    changePass: 'Change Password', changeName: 'Change Name',
    changeCurriculum: 'Change Curriculum',
    enableNotif: '🔔 Enable Notifications', notifEnabled: '✅ Notifications enabled',
    installApp: '📲 Install App',
    shareWhatsapp: '💬 Share on WhatsApp',
    // Chat
    chatPlaceholder: 'Ask your question here...',
    chatEmpty: "Hi! I'm OstazAI",
    chatEmptySub: 'Ask me anything about',
    orTakePhoto: 'or take a photo of a problem 📸',
    thinking: 'Thinking...',
    clearChat: 'Clear chat',
    // Chips
    chip1: '💡 Explain concepts', chip2: '📝 Practice questions',
    chip3: '🧩 Hard problems', chip4: '📋 Quick summary',
    chip5: '📅 Study plan', chip6: '🏆 Top tips',
    // Profile
    myProfile: '👤 My Profile',
    plan: 'Plan', proActive: '⭐ Pro Active',
    freePlan: 'Free', proExpiry: 'Pro valid until:',
    myReferral: '🎁 Referral Code — Get 7 days Pro free!',
    referralDesc: 'Share with friends — you both get 7 free Pro days 🎉',
    notifications: '🔔 Notifications',
    notifDesc: 'Enable daily study reminders',
    currentCurriculum: '🌍 Current Curriculum',
    // Stats
    myStats: '📊 My Stats',
    xpPoints: 'XP Points', streak: 'Day Streak', level: 'Level',
    totalChats: 'Chats', quizzesDone: 'Quizzes', bestScore: 'Best Score',
    weeklyActivity: '📈 Weekly Activity', subjects: '📚 Most studied',
    badges: '🏅 Badges', shareStats: '📤 Share',
    // Notes
    myNotes: '🗒️ Notes',
    notePlaceholder: 'Write a new note...', addNote: '➕ Add',
    searchNotes: '🔍 Search notes...', noNotes: 'Write your first note!',
    // Bookmarks
    myBookmarks: '🔖 Bookmarks',
    searchBookmarks: '🔍 Search bookmarks...', noBookmarks: 'Save AI responses by tapping 🔖',
    viewFull: 'View full ↓',
    // Wrong answers
    wrongAnswers: '❌ Wrong Answers Review', retryQuiz: '🔄 Retry Quiz',
    yourAnswer: 'Your Answer', correctAnswer: 'Correct Answer',
    askAI: '🤖 Explain this', noWrong: 'Great! No mistakes recorded',
    noWrongDesc: 'Keep taking quizzes for feedback',
    // History
    history: '🕒 Chat History',
    searchHistory: '🔍 Search history...', noHistory: 'No history yet',
    noSearchResults: 'No results',
    // Leaderboard
    leaderboard: '🏆 Leaderboard', youLabel: 'You',
    // Pomodoro
    workMode: '⚡ Work 25m', breakMode: '☕ Break 5m', longBreak: '🌿 Long 15m',
    sessions: 'sessions', totalToday: 'Total today:', studyTime: 'actual study',
    // Schedule
    mySchedule: '📅 Study Schedule', addSession: '➕ Add Session',
    day: 'Day', time: 'Time', subject: 'Subject', noSchedule: 'No schedule yet',
    // Upgrade
    myPlan: '⭐ My Plan',
    proActive2: 'You are subscribed to Pro!',
    expiresOn: 'Expires:', daysLeft: 'days remaining',
    renewNow: '🔄 Renew Subscription',
    freePlanTitle: 'Free', proPlanTitle: 'Pro',
    unlimited: 'Unlimited questions', allSubjects: 'All subjects & levels',
    paySecure: '🔒 100% secure payment',
    promoCode: '🎁 Have an upgrade code?',
    promoPlaceholder: 'Enter code (e.g. OSTAZ2025)',
    activate: 'Activate',
    // Lessons
    myLessons: '📖 Lessons',
    chooseBoard: '🌍 Choose Country / Board',
    chooseGrade: '📚 Choose Grade / Level',
    chooseSubject: 'Choose a subject below to start learning',
    aiLessons: '🤖 AI Lessons',
    aiLessonsDesc: 'AI generates custom lessons',
    generateNow: 'Generate Now',
    // Admin
    adminPanel: '🛡 Admin Panel',
    adminKey: 'Admin Key',
    loadData: '📊 Load Data',
    // Feedback
    feedbackTitle: '💬 Send Feedback or Report a Bug',
    feedbackDesc: 'Your feedback helps us improve 🙏',
    feedbackPlaceholder: 'Write your feedback here...',
    feedbackSend: 'Send 📤',
    // Errors
    fillAllFields: 'Please fill all required fields',
    emailRegistered: 'Email already registered',
    invalidCredentials: 'Invalid email or password',
    enterEmail: 'Please enter your email',
    passwordShort: 'Password too short (min 6 characters)',
    passwordMismatch: 'Passwords do not match',
    noInternet: 'No internet connection 📵',
    serverError: 'Server error 🚨 — try again',
    dailyLimit: 'Daily limit reached — ',
    upgradeForMore: 'Subscribe to Pro for unlimited access ⭐',
    // Questions remaining
    questionsLeft: 'questions left today —',
    // Toast
    nameSaved: 'Name saved ✅',
    passSaved: 'Password changed ✅',
    copied: '✅ Copied!',
    bookmarkSaved: 'Saved 🔖',
    loggedOut: 'Logged out 👋',
    proActivated: '⭐ Pro activated!',
    codeCopied: '✅ Referral code copied!',
    appInstalled: '✅ App installed!',
    feedbackSent: 'Thanks for your feedback! 🙏',
    notifActivated: '✅ Notifications enabled!',
    // Onboarding
    ob1Title: 'Welcome to OstazAI!',
    ob1Desc: 'Your AI study assistant — ask any question in any subject and get instant answers ✨',
    ob2Title: 'Choose Your Curriculum',
    ob2Desc: 'We customize content to match your exact syllabus',
    ob3Title: 'Solve Problems with Photos',
    ob3Desc: 'Take a photo of any math or science problem — AI solves it step by step',
    ob4Title: 'Flashcards, Quizzes & Summaries',
    ob4Desc: 'All study tools in one place — generated in one click',
    ob5Title: 'Ready to Go!',
    ob5Desc: 'Your Pro plan is active for 7 days free — use all features now',
    obStart: '🚀 Start Studying Now!',
    obNext: 'Next →', obSkip: 'Skip',
  }
};

/** Translation helper: returns English if lang=en, else returns Arabic string */
function t(arText, enKey) {
  if (S.lang !== 'en') return arText;
  return TRANSLATIONS.en[enKey] || arText;
}

/** Shorthand for common UI text */
function T(key) {
  if (S.lang !== 'en') return '';  // Returns '' — caller should use Arabic default
  return TRANSLATIONS.en[key] || '';
}

function toggleLang() {
  S.lang = S.lang === 'ar' ? 'en' : 'ar';
  saveLocal();
  // Update document direction
  document.documentElement.lang = S.lang;
  document.documentElement.dir  = S.lang === 'en' ? 'ltr' : 'rtl';
  document.body.dir = S.lang === 'en' ? 'ltr' : 'rtl';
  render();
}

const CURRICULA = {

  /* ═══ مصر — منهج رسمي  (وزارة التربية والتعليم) ══ */
  egypt: {
    label:'🇪🇬 مصر',
    grades:{

      /* ── ابتدائي ص1-6  ── */
      primary:{ label:'ابتدائي (ص١–٦)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'ص١: الأعداد حتى 20 — الجمع والطرح',
          'ص٢: الأعداد حتى 100 — الضرب والقسمة',
          'ص٣: الكسور الأولية — القياس والوزن',
          'ص٤: الأعداد الكبيرة — الكسور العادية والعشرية',
          'ص٥: النسبة والتناسب — المساحة والمحيط',
          'ص٦: الجبر الأولي — الإحصاء المبسط — الهندسة الفراغية'),
        mkSubj('اللغة العربية','📜',S_AR,
          'ص١-٢: الحروف والقراءة الصوتية — كتابة الكلمات',
          'ص٣: القراءة والاستيعاب — الإملاء — التعبير الشفهي',
          'ص٤: النحو الأساسي (المبتدأ والخبر) — الأفعال',
          'ص٥: النعت والإضافة — البلاغة الأولية',
          'ص٦: الإعراب المبسط — التعبير الكتابي — المحفوظات'),
        mkSubj('العلوم','🔬',S_SCI,
          'ص١-٣: الكائنات الحية وغير الحية — جسم الإنسان المبسط',
          'ص٤: المادة وخواصها — الطاقة وأشكالها',
          'ص٥: الأرض والفضاء — البيئة والنظام البيئي',
          'ص٦: الضوء والصوت — التغيرات المناخية'),
        mkSubj('الدراسات الاجتماعية','🌍',S_HIST,
          'ص٤: خريطة مصر — المحافظات والمدن الكبرى',
          'ص٥: تاريخ مصر القديمة (الفراعنة) — النيل والحضارة',
          'ص٦: مصر الإسلامية — المواطنة والانتماء الوطني'),
        mkSubj('التربية الدينية','☪️',S_ISL,
          'القرآن الكريم وتجويده (سور مختارة)',
          'التوحيد والعقيدة المبسطة',
          'أركان الإسلام والإيمان',
          'السيرة النبوية الشريفة',
          'القيم والأخلاق الإسلامية',
          'الفقه الأساسي (طهارة وصلاة)'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Gr.1-2: Alphabet — Phonics — Basic Vocabulary',
          'Gr.3: Simple Sentences — Reading Short Texts',
          'Gr.4: Grammar (Tenses) — Writing Sentences',
          'Gr.5: Reading Passages — Comprehension Questions',
          'Gr.6: Paragraph Writing — Conversation Skills'),
        mkSubj('القيم واحترام الآخرين ✨','🤝',S_SOC,
          'احترام الاختلاف والتنوع',
          'التعاون والعمل الجماعي',
          'المواطنة والمسؤولية',
          'قيم الأمانة والصدق'),
      ]},

      /* ── إعدادي ص7-9  ── */
      middle:{ label:'إعدادي (ص٧–٩)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'ص٧: الأعداد الصحيحة والنسبية — المعادلات الخطية',
          'ص٨: المعادلات التربيعية — الهندسة التحليلية المبسطة — الإحصاء',
          'ص٩: الجبر المتقدم — المثلثات — التحليل والتحويلات الهندسية'),
        mkSubj('الفيزياء','⚡',S_PHY,
          'ص٧: الحركة والسرعة والتسارع — القوى وقانون نيوتن',
          'ص٨: الكثافة والضغط — الحرارة والتمدد الحراري',
          'ص٩: الصوت والأمواج — الضوء والانعكاس والانكسار — الكهرباء الساكنة'),
        mkSubj('الكيمياء','🧪',S_CHEM,
          'ص٧: المادة وخواصها — المخاليط والمحاليل',
          'ص٨: التركيب الذري — الجدول الدوري المبسط',
          'ص٩: التفاعلات الكيميائية — الأحماض والقلويات — الكيمياء الكربونية'),
        mkSubj('الأحياء','🦠',S_BIO,
          'ص٧: الخلية النباتية والحيوانية — التغذية والهضم',
          'ص٨: الجهاز الدوري والتنفسي — الجهاز العصبي المبسط',
          'ص٩: التكاثر والوراثة المبسطة — البيئة والتلوث'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو والإعراب التفصيلي',
          'الصرف والاشتقاق',
          'البلاغة (التشبيه والاستعارة والكناية)',
          'الأدب والنصوص (نثر وشعر)',
          'التعبير الكتابي والوظيفي'),
        mkSubj('الدراسات الاجتماعية','🌍',S_HIST,
          'تاريخ مصر الإسلامية والعثمانية',
          'تاريخ العالم الحديث',
          'الجغرافيا المصرية (طبيعية وبشرية)',
          'الاقتصاد المبسط والتنمية'),
        mkSubj('التربية الدينية','☪️',S_ISL,
          'القرآن الكريم والتفسير',
          'الفقه وأحكام العبادات',
          'الحديث النبوي والسيرة',
          'القيم والأخلاق الإسلامية'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Grammar (All Tenses — Modal Verbs)',
          'Reading & Comprehension',
          'Vocabulary & Idioms',
          'Essay & Paragraph Writing',
          'Conversation & Pronunciation'),
        mkSubj('تكنولوجيا المعلومات 💡','💻',S_COMP,
          'مهارات الحاسب الأساسية',
          'معالجة النصوص والجداول',
          'الإنترنت والبحث الإلكتروني',
          'مقدمة في البرمجة'),
      ]},

      /* ── أولى ثانوي — المرحلة التمهيدية (7 مواد مشتركة) ── */
      high1:{ label:'أولى ثانوي — تمهيدي', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'الجبر والعلاقات والدوال',
          'التشابه',
          'نظريات التناسب في المثلث',
          'حساب المثلثات',
          'الهندسة التحليلية الأولية',
          'الإحصاء والاحتمالات المبسطة'),
        mkSubj('العلوم المتكاملة','🔬',S_SCI,
          'الفيزياء: الحركة في خط مستقيم — قوانين نيوتن',
          'الكيمياء: التركيب الذري — الجدول الدوري',
          'الأحياء: الخلية ومكوناتها — الأنسجة',
          'الجيولوجيا: طبقات الأرض — الصخور والمعادن'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو التطبيقي والإعراب',
          'البلاغة (البيان والبديع والمعاني)',
          'الأدب الجاهلي والإسلامي',
          'الأدب الحديث والمعاصر',
          'التعبير الكتابي الإبداعي والوظيفي'),
        mkSubj('التاريخ المصري','🏛️',S_HIST,
          'مصر الفرعونية وحضاراتها',
          'الفتح الإسلامي ومصر في العصور الوسطى',
          'محمد علي وبناء الدولة الحديثة',
          'مصر في القرن العشرين (1919 — 1952)',
          'مصر المعاصرة ورؤية 2030'),
        mkSubj('الفلسفة والمنطق','💭',S_PHIL,
          'مفهوم الفلسفة وأهميتها',
          'المنطق الصوري (القضايا والاستدلال)',
          'مشكلة الوجود والمعرفة',
          'الفلسفة الأخلاقية والقيم',
          'فلسفة الإنسان والمجتمع'),
        mkSubj('التربية الدينية','☪️',S_ISL,
          'القرآن الكريم والتفسير الموضوعي',
          'الفقه الإسلامي (عبادات ومعاملات)',
          'العقيدة الإسلامية',
          'الحديث النبوي والسيرة',
          'الأخلاق والقيم في الإسلام'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Advanced Grammar (Conditionals — Passive — Reported Speech)',
          'Reading Comprehension & Critical Analysis',
          'Essay & Report Writing',
          'Speaking & Debate Skills',
          'Vocabulary in Context'),
        mkSubj('البرمجة وعلوم الحاسب 💡','💻',S_COMP,
          'أساسيات البرمجة بـ Python',
          'التفكير الخوارزمي وحل المشكلات',
          'قواعد البيانات المبسطة',
          'الأمن الرقمي والخصوصية'),
      ]},

      /* ── مسار الطب وعلوم الحياة (ص١١-١٢) ── */
      high_med:{ label:'🏥 مسار الطب وعلوم الحياة', subjects:[
        mkSubj('الكيمياء (متقدم)','🧪',S_CHEM,
          'التركيب الإلكتروني والجدول الدوري المتقدم',
          'الروابط الكيميائية والشكل الهندسي للجزيئات',
          'الكيمياء الحرارية والديناميكا الحرارية',
          'التوازن الكيميائي وثابت التوازن',
          'الكيمياء الكهروكيميائية (الأكسدة والاختزال)',
          'الكيمياء العضوية (الهيدروكربونات — الكحولات — الأحماض)',
          'الكيمياء الحيوية (البروتينات — النيوكليوتيدات — الدهون)',
          'معدل التفاعل الكيميائي وعوامله'),
        mkSubj('الأحياء (متقدم)','🦠',S_BIO,
          'الكيمياء الحيوية للخلية (DNA — RNA — البروتين)',
          'الخلية ودورة حياتها (الانقسام الميتوزي والميوزي)',
          'الوراثة الجزيئية (قوانين مندل — الطفرات)',
          'الهندسة الوراثية والبيوتكنولوجيا',
          'أجهزة جسم الإنسان (هضم — دوري — تنفسي — عصبي — هرموني)',
          'جهاز المناعة والأمراض المعدية',
          'التطور والتنوع البيولوجي',
          'علم البيئة والنظم البيئية'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو التطبيقي المتقدم',
          'البلاغة والنقد الأدبي',
          'الأدب العربي (جاهلي — أموي — عباسي — حديث)',
          'فنون الكتابة (مقال — بحث — تقرير)'),
        mkSubj('التاريخ المصري','🏛️',S_HIST,
          'مصر في العصر الحديث والمعاصر',
          'السياسة الخارجية المصرية',
          'التحديات المعاصرة'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Scientific English & Medical Terminology',
          'Academic Writing & Research',
          'Reading Scientific Texts',
          'Presentations & Communication'),
      ]},

      /* ── مسار الهندسة وعلوم الحاسب (ص١١-١٢) ── */
      high_eng:{ label:'🏗️ مسار الهندسة والحاسب', subjects:[
        mkSubj('الرياضيات (متقدم)','🔢',S_MATH,
          'الرياضيات البحتة — نظرية ذات الحدين',
          'الأعداد المركبة وتطبيقاتها',
          'الهندسة الفراغية (خطوط ومستويات في الفضاء)',
          'الاشتقاق وتطبيقاته (القيم العظمى والصغرى)',
          'سلوك الدالة ورسم المنحنيات',
          'التكامل المحدد وتطبيقاته (المساحات — الأحجام)',
          'الاستاتيكا: العزوم — القوى المستوية — الازدواجات',
          'الديناميكا: الحركة — قوانين نيوتن — الشغل والطاقة والقدرة'),
        mkSubj('الفيزياء (متقدم)','⚡',S_PHY,
          'الميكانيكا المتقدمة (حركة دورانية — عزم القصور الذاتي)',
          'الديناميكا الحرارية (قوانين الغازات — الآلات الحرارية)',
          'الكهرباء الساكنة والمتحركة (دوائر كهربية معقدة)',
          'المغناطيسية والحث الكهرومغناطيسي',
          'الأمواج الميكانيكية والصوتية',
          'البصريات (الانعكاس — الانكسار — التداخل)',
          'الفيزياء الحديثة (النسبية — الكم — الذرة والنواة)',
          'الإلكترونيات الأساسية'),
        mkSubj('علوم الحاسب والبرمجة','💻',S_COMP,
          'Python المتقدم (OOP — المكتبات العلمية)',
          'هياكل البيانات والخوارزميات',
          'قواعد البيانات (SQL)',
          'الشبكات وبروتوكولات الإنترنت',
          'الذكاء الاصطناعي وتعلم الآلة المبسط',
          'الأمن السيبراني'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو التطبيقي المتقدم','البلاغة والنقد',
          'الأدب العربي العلمي والتقني','فنون الكتابة الوظيفية'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Technical English & Engineering Terms',
          'Academic & Report Writing',
          'Reading Technical Manuals',
          'Presentations & Communication'),
      ]},

      /* ── مسار الأعمال والتجارة (ص١١-١٢) ── */
      high_biz:{ label:'💼 مسار الأعمال والتجارة', subjects:[
        mkSubj('الرياضيات التطبيقية','🔢',S_MATH,
          'الجبر الخطي وتطبيقاته في الأعمال',
          'الإحصاء الوصفي والاستدلالي',
          'الاحتمالات واتخاذ القرار',
          'بحوث العمليات المبسطة',
          'الرياضيات المالية (فائدة — استهلاك)'),
        mkSubj('الاقتصاد','💰',S_SOC,
          'أساسيات علم الاقتصاد (عرض وطلب)',
          'الاقتصاد الجزئي (المستهلك — المنتج — السوق)',
          'الاقتصاد الكلي (الناتج القومي — التضخم — البطالة)',
          'التجارة الدولية ونظرية الميزة النسبية',
          'الاقتصاد المصري ورؤية 2030',
          'العولمة والمنظمات الاقتصادية الدولية'),
        mkSubj('إدارة الأعمال','📊',S_SOC,
          'مبادئ الإدارة (تخطيط — تنظيم — توجيه — رقابة)',
          'إدارة الموارد البشرية',
          'التسويق والمبيعات',
          'المحاسبة المالية الأساسية',
          'ريادة الأعمال والمشاريع الصغيرة'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو التطبيقي','البلاغة',
          'الأدب العربي الحديث','الكتابة الوظيفية والتقارير'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Business English & Correspondence',
          'Report & Proposal Writing',
          'Presentations & Negotiation',
          'Financial Terminology'),
      ]},

      /* ── مسار الآداب والفنون (ص١١-١٢) ── */
      high_arts:{ label:'📚 مسار الآداب والفنون', subjects:[
        mkSubj('الجغرافيا','🗺️',S_GEO,
          'الجغرافيا الطبيعية (مناخ — تضاريس — مياه)',
          'الجغرافيا البشرية (سكان — تحضر — هجرة)',
          'الجغرافيا الاقتصادية (زراعة — صناعة — طاقة)',
          'جغرافية مصر التفصيلية',
          'جغرافية الوطن العربي والعالم',
          'التغيرات المناخية والبيئة'),
        mkSubj('الإحصاء والمعلومات','📊',S_MATH,
          'الإحصاء الوصفي (تجميع — عرض — تلخيص البيانات)',
          'مقاييس النزعة المركزية والتشتت',
          'الاحتمالات والتوزيعات',
          'الاستدلال الإحصائي',
          'تحليل البيانات والرسوم البيانية'),
        mkSubj('اللغة العربية وآدابها','📜',S_AR,
          'النحو والصرف المتقدم',
          'البلاغة العربية (بيان — بديع — معاني)',
          'الأدب الجاهلي والأموي والعباسي',
          'أدب العصر الحديث (رواية — قصة — مسرح — شعر)',
          'النقد الأدبي والمناهج النقدية',
          'فنون الإبداع (قصة — مقالة — شعر)'),
        mkSubj('الفلسفة','💭',S_PHIL,
          'المنطق الصوري والرمزي',
          'نظرية المعرفة (الإبستيمولوجيا)',
          'فلسفة الوجود (الأنطولوجيا)',
          'الفلسفة الأخلاقية',
          'الفلسفة السياسية والاجتماعية',
          'الفلسفة العربية الإسلامية'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Advanced Literature (Poetry — Novel — Drama)',
          'Critical Essay Writing',
          'Language & Linguistics',
          'Cultural Studies',
          'Translation Basics'),
        mkSubj('التاريخ المصري والعالمي','🏛️',S_HIST,
          'مصر الحديثة والمعاصرة',
          'التاريخ الأوروبي الحديث',
          'الحرب الباردة والنظام الدولي',
          'تاريخ الفكر العربي الحديث'),
      ]},

    }
  },

  /* ═══ السعودية ══════════════════════════════════════════════ */
  saudi: {
    label:'🇸🇦 السعودية',
    grades:{
      primary:{ label:'ابتدائي (ص١–٦)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'ص١: الأعداد حتى 100 — الجمع والطرح',
          'ص٢: الضرب والقسمة — الأعداد الكبيرة',
          'ص٣: الكسور الأولية — القياس والوزن',
          'ص٤: الكسور العادية والعشرية — الهندسة الأولية',
          'ص٥: النسبة والتناسب — المساحة والمحيط',
          'ص٦: الجبر الأولي — الإحصاء المبسط'),
        mkSubj('اللغة العربية','📜',S_AR,
          'ص١-٢: القراءة الصوتية — الكتابة والإملاء',
          'ص٣: النحو الأساسي (المبتدأ والخبر) — التعبير الشفهي',
          'ص٤: الأفعال والأسماء — الأساليب اللغوية',
          'ص٥: البلاغة الأولية — التعبير الكتابي',
          'ص٦: الإعراب المبسط — المحفوظات والنصوص'),
        mkSubj('العلوم','🔬',S_SCI,
          'ص١-٢: الكائنات الحية — جسم الإنسان المبسط',
          'ص٣: الطاقة وأشكالها — المادة وخواصها',
          'ص٤: الأرض والمناخ — البيئة والنظام البيئي',
          'ص٥: الضوء والصوت — الفضاء والنجوم',
          'ص٦: التغيرات المناخية — الموارد الطبيعية'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن الكريم وتجويده (سور مختارة بحسب كل صف)',
          'التوحيد وأركان الإسلام والإيمان',
          'الفقه الأساسي (طهارة وصلاة وصيام)',
          'السيرة النبوية الشريفة',
          'الأخلاق والقيم الإسلامية'),
        mkSubj('الدراسات الاجتماعية','🌍',S_HIST,
          'المملكة العربية السعودية وخريطتها',
          'التاريخ الإسلامي المبسط',
          'الوحدة الوطنية وتاريخ المملكة',
          'البيئة الجغرافية للمملكة',
          'المواطنة ورؤية 2030'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Gr.1-2: Alphabet — Phonics — Basic Vocabulary',
          'Gr.3: Simple Sentences — Basic Grammar',
          'Gr.4: Reading Short Texts — Writing Sentences',
          'Gr.5: Grammar (Tenses) — Comprehension',
          'Gr.6: Paragraph Writing — Conversation'),
      ]},
      middle:{ label:'متوسط (ص٧–٩)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'ص٧: الأعداد الصحيحة والنسبية — الجبر الأساسي',
          'ص٨: المعادلات والمتباينات — الهندسة التحليلية المبسطة',
          'ص٩: الجبر المتقدم — المثلثات المبسطة — الإحصاء'),
        mkSubj('الفيزياء','⚡',S_PHY,
          'ص٧: الحركة والسرعة — القوى وقانون نيوتن',
          'ص٨: الكثافة والضغط — الحرارة والتمدد',
          'ص٩: الصوت والضوء — الكهرباء الساكنة والمتحركة'),
        mkSubj('الكيمياء','🧪',S_CHEM,
          'ص٧: المادة وخواصها — التغيرات الفيزيائية والكيميائية',
          'ص٨: التركيب الذري — الجدول الدوري المبسط',
          'ص٩: التفاعلات الكيميائية — الأحماض والقلويات'),
        mkSubj('الأحياء','🦠',S_BIO,
          'ص٧: الخلية النباتية والحيوانية — التغذية والهضم',
          'ص٨: الجهاز الدوري والتنفسي — الجهاز العصبي',
          'ص٩: التكاثر والوراثة المبسطة — البيئة والتلوث'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو والإعراب التفصيلي','الصرف والاشتقاق',
          'البلاغة (التشبيه والاستعارة)','الأدب والنصوص','التعبير الكتابي'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن الكريم والتفسير','التوحيد','الفقه (عبادات ومعاملات)','الحديث','السيرة'),
        mkSubj('الدراسات الاجتماعية','🌍',S_HIST,
          'تاريخ الجزيرة العربية ونشأة المملكة',
          'الجغرافيا السعودية والخليجية',
          'التاريخ الإسلامي',
          'التربية الوطنية ورؤية 2030'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Grammar (All Tenses)','Vocabulary & Idioms',
          'Reading Comprehension','Essay & Paragraph Writing','Speaking'),
        mkSubj('الحاسب وتقنية المعلومات','💻',S_COMP,
          'مهارات الحاسب الأساسية','معالجة النصوص والجداول',
          'الإنترنت والبحث الإلكتروني','مقدمة في البرمجة'),
      ]},
      high:{ label:'ثانوي (ص١٠–١٢)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'ص١٠: الجبر — المثلثات — الهندسة التحليلية',
          'ص١١: التفاضل (الاشتقاق وتطبيقاته) — سلوك الدالة',
          'ص١٢: التكامل — الإحصاء والاحتمالات — المصفوفات — الأعداد المركبة'),
        mkSubj('الفيزياء','⚡',S_PHY,
          'ص١٠: الحركة — قوانين نيوتن — الشغل والطاقة',
          'ص١١: الديناميكا الحرارية — الكهرباء والمغناطيسية',
          'ص١٢: الأمواج والبصريات — الفيزياء الحديثة (الكم والنسبية)'),
        mkSubj('الكيمياء','🧪',S_CHEM,
          'ص١٠: البنية الذرية والجدول الدوري — الروابط الكيميائية',
          'ص١١: التفاعلات — المحاليل — معدل التفاعل — التوازن الكيميائي',
          'ص١٢: الكيمياء الكهروكيميائية — الكيمياء العضوية — الكيمياء الحيوية'),
        mkSubj('الأحياء','🦠',S_BIO,
          'ص١٠: الكيمياء الحيوية — الخلية — الأنسجة',
          'ص١١: التمثيل الغذائي — أجهزة جسم الإنسان — المناعة',
          'ص١٢: الوراثة الجزيئية — الهندسة الوراثية — التطور — البيئة'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو التطبيقي والإعراب المتقدم',
          'الصرف والاشتقاق','البلاغة والنقد الأدبي',
          'الأدب (جاهلي — إسلامي — عباسي — أندلسي — حديث)',
          'الأدب السعودي المعاصر','فنون الكتابة الإبداعية والوظيفية'),
        mkSubj('التوحيد','☪️',S_ISL,
          'توحيد الربوبية والألوهية والأسماء والصفات',
          'نواقض الإسلام — مسائل الإيمان','الولاء والبراء','فرق ومذاهب'),
        mkSubj('الفقه','📖',S_SOC,
          'الطهارة والصلاة والزكاة والصيام والحج',
          'البيوع والمعاملات المالية الإسلامية',
          'النكاح والطلاق والمواريث','فقه الجنايات'),
        mkSubj('الحديث','📿',S_GEO,
          'مصطلح الحديث وعلومه',
          'أحاديث العقيدة والعبادات',
          'أحاديث المعاملات والأخلاق',
          'الأربعون النووية'),
        mkSubj('التفسير','📖',S_ISL,
          'أصول التفسير وعلوم القرآن',
          'تفسير سور مختارة (البقرة — آل عمران — يس — الكهف)'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Advanced Grammar — Conditionals — Passive','Essay & Report Writing',
          'Reading Comprehension & Critical Analysis','Literature','Speaking & Debate'),
        mkSubj('الحاسب الآلي والبرمجة','💻',S_COMP,
          'Python المتقدم (OOP)','هياكل البيانات والخوارزميات',
          'قواعد البيانات (SQL)','الذكاء الاصطناعي وتعلم الآلة','الأمن السيبراني'),
      ]},
    }
  },

  /* ═══ الإمارات ══════════════════════════════════════════════ */
  uae: {
    label:'🇦🇪 الإمارات',
    grades:{
      primary:{ label:'ابتدائي (ص١–٦)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'ص١-٢: الأعداد والعمليات الأساسية','ص٣: الكسور والقياس',
          'ص٤: الأعداد العشرية — الهندسة الأولية',
          'ص٥: النسبة والتناسب — الإحصاء المبسط',
          'ص٦: الجبر الأولي — المساحة والحجم'),
        mkSubj('اللغة العربية','📜',S_AR,
          'ص١-٢: القراءة والكتابة والإملاء',
          'ص٣-٤: النحو الأساسي — التعبير الشفهي',
          'ص٥-٦: البلاغة الأولية — التعبير الكتابي — المحفوظات'),
        mkSubj('العلوم','🔬',S_SCI,
          'ص١-٢: الكائنات الحية والبيئة',
          'ص٣-٤: المادة والطاقة — الأرض والفضاء',
          'ص٥-٦: الضوء والصوت — التغيرات المناخية'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن الكريم وتجويده','التوحيد وأركان الإسلام',
          'الفقه الأساسي (طهارة وصلاة)','السيرة النبوية','الأخلاق الإسلامية'),
        mkSubj('الدراسات الاجتماعية والتربية الوطنية','🏳️',S_SOC,
          'الإمارات وموقعها — رموز الدولة',
          'تراث الإمارات والهوية الإماراتية',
          'تاريخ الاتحاد وتأسيس الدولة',
          'المجتمع الإماراتي المتنوع',
          'بيئة الإمارات والتنمية المستدامة'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Gr.1-2: Alphabet — Phonics — Basic Vocabulary',
          'Gr.3-4: Grammar — Reading — Simple Writing',
          'Gr.5-6: Reading Passages — Paragraph Writing — Speaking'),
      ]},
      middle:{ label:'إعدادي (ص٧–٩)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'ص٧: الأعداد والجبر الأساسي — المعادلات الخطية',
          'ص٨: الجبر المتقدم — الهندسة — الإحصاء',
          'ص٩: الدوال والمعادلات التربيعية — حساب المثلثات المبسط'),
        mkSubj('الفيزياء','⚡',S_PHY,
          'ص٧: الحركة والقوى','ص٨: الطاقة والحرارة',
          'ص٩: الكهرباء والضوء والأمواج'),
        mkSubj('الكيمياء','🧪',S_CHEM,
          'ص٧: المادة وخواصها','ص٨: التركيب الذري — الجدول الدوري',
          'ص٩: التفاعلات الكيميائية — المحاليل'),
        mkSubj('الأحياء','🦠',S_BIO,
          'ص٧: الخلية والكائنات الحية','ص٨: أجهزة جسم الإنسان',
          'ص٩: الوراثة المبسطة — البيئة والتلوث'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو والإعراب','الصرف','البلاغة الأساسية',
          'الأدب الإماراتي والعربي','التعبير الكتابي'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن والتفسير','الفقه','العقيدة','الحديث','السيرة'),
        mkSubj('الدراسات الاجتماعية والتربية الوطنية','🏳️',S_SOC,
          'تاريخ الإمارات والخليج','مؤسسات الدولة الإماراتية',
          'الهوية الوطنية والتنمية','الاقتصاد الإماراتي المبسط'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Grammar (All Tenses)','Vocabulary','Reading','Writing','Speaking'),
        mkSubj('الحاسب والتقنية','💻',S_COMP,
          'مهارات الحاسب','البرمجة الأساسية','الإنترنت والأمان الرقمي'),
      ]},
      high:{ label:'ثانوي (ص١٠–١٢)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'ص١٠: الجبر المتقدم — المثلثات — الهندسة التحليلية',
          'ص١١: الاشتقاق وتطبيقاته — سلوك الدالة',
          'ص١٢: التكامل — الإحصاء والاحتمالات — المصفوفات'),
        mkSubj('الفيزياء','⚡',S_PHY,
          'الميكانيكا (حركة — قوى — طاقة)','الديناميكا الحرارية',
          'الكهرباء والمغناطيسية','الأمواج والبصريات','الفيزياء الحديثة'),
        mkSubj('الكيمياء','🧪',S_CHEM,
          'التركيب الذري والجدول الدوري','الروابط والتفاعلات',
          'الكيمياء العضوية','الكيمياء الحيوية','الكهروكيمياء'),
        mkSubj('الأحياء','🦠',S_BIO,
          'الخلية الجزيئية','الأيض والطاقة الحيوية',
          'الوراثة الجزيئية والبيوتكنولوجيا','التطور','البيئة وعلم الأوبئة'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو التطبيقي المتقدم','البلاغة والنقد الأدبي',
          'الأدب الإماراتي الحديث','الأدب العربي الكلاسيكي والمعاصر','فنون الكتابة'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Advanced Grammar','Academic & Creative Writing',
          'Literature (Poetry — Novel — Drama)','Speaking & Debate','Research Skills'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن وعلومه','الفقه الإسلامي المعاصر',
          'السيرة والتاريخ الإسلامي','الأخلاق والقيم الإسلامية'),
        mkSubj('الدراسات الاجتماعية والتربية الوطنية','🏳️',S_SOC,
          'رؤية الإمارات 2071','الاقتصاد الإماراتي والتنويع',
          'الدبلوماسية والسياسة الخارجية','الأمن الوطني والإقليمي','التنمية المستدامة'),
        mkSubj('الحاسب والذكاء الاصطناعي','💻',S_COMP,
          'البرمجة المتقدمة (Python — Web)','الذكاء الاصطناعي وتعلم الآلة',
          'الأمن السيبراني','تصميم التطبيقات','البيانات الضخمة'),
      ]},
    }
  },

  /* ═══ الكويت ════════════════════════════════════════════════ */
  kuwait: {
    label:'🇰🇼 الكويت',
    grades:{
      primary:{ label:'ابتدائي (ص١–٥)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'ص١-٢: الأعداد والعمليات الأساسية',
          'ص٣: الكسور والقياس','ص٤: الهندسة الأولية — الأعداد العشرية',
          'ص٥: النسبة والتناسب — الإحصاء المبسط'),
        mkSubj('اللغة العربية','📜',S_AR,
          'القراءة والكتابة والإملاء','النحو الأساسي','التعبير الشفهي والكتابي','المحفوظات'),
        mkSubj('العلوم','🔬',S_SCI,
          'الكائنات الحية','جسم الإنسان','الطاقة والمادة','الأرض والبيئة'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن الكريم (سور مختارة)','أركان الإسلام','الفقه الأساسي','السيرة','الأخلاق'),
        mkSubj('الدراسات الاجتماعية','🌍',S_HIST,
          'الكويت وموقعها الجغرافي','تاريخ الكويت','الحياة في الكويت','المواطنة الكويتية'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Alphabet — Phonics','Basic Vocabulary — Reading','Simple Grammar — Writing'),
      ]},
      middle:{ label:'متوسط (ص٦–٨)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'الجبر الأساسي — المعادلات الخطية',
          'الهندسة — الإحصاء — الكسور والنسب',
          'المعادلات التربيعية — الدوال الأساسية'),
        mkSubj('الفيزياء','⚡',S_PHY,
          'الحركة والقوى','الطاقة والحرارة','الكهرباء والضوء'),
        mkSubj('الكيمياء','🧪',S_CHEM,
          'المادة وتركيبها','التركيب الذري — الجدول الدوري','التفاعلات والمحاليل'),
        mkSubj('الأحياء','🦠',S_BIO,
          'الخلية والكائنات الحية','أجهزة جسم الإنسان','البيئة والتلوث'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو والإعراب','البلاغة الأساسية','الأدب الكويتي والخليجي','التعبير الكتابي'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن والتفسير','الفقه','العقيدة','الحديث','السيرة'),
        mkSubj('الدراسات الاجتماعية','🌍',S_HIST,
          'تاريخ الكويت والخليج','الجغرافيا الكويتية','التربية الوطنية'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Grammar','Vocabulary','Reading Comprehension','Writing','Speaking'),
      ]},
      high:{ label:'ثانوي (ص٩–١٢)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'الجبر والمعادلات','حساب المثلثات','التفاضل (الاشتقاق وتطبيقاته)',
          'التكامل المحدد','الإحصاء والاحتمالات','الهندسة الفضائية والمصفوفات'),
        mkSubj('الفيزياء','⚡',S_PHY,
          'الديناميكا والطاقة','الكهرومغناطيسية',
          'الأمواج والبصريات','الفيزياء الحديثة (ذرية ونووية)'),
        mkSubj('الكيمياء','🧪',S_CHEM,
          'التركيب الذري والروابط','التفاعلات والتوازن الكيميائي',
          'الكيمياء العضوية','الكيمياء الصناعية والبترولية'),
        mkSubj('الأحياء','🦠',S_BIO,
          'الخلية والأنسجة','الوراثة الجزيئية',
          'أجهزة جسم الإنسان','التطور والبيئة'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو التطبيقي المتقدم','البلاغة والنقد',
          'الأدب الكويتي والخليجي','الأدب العربي الكلاسيكي والحديث','الكتابة الإبداعية'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن الكريم وعلومه','الفقه الإسلامي','العقيدة','السيرة والتاريخ الإسلامي'),
        mkSubj('الدراسات الاجتماعية والتربية الوطنية','🌍',S_HIST,
          'تاريخ الكويت الحديث','تاريخ الخليج والجزيرة العربية',
          'الجغرافيا الاقتصادية','الاقتصاد النفطي والتنويع الاقتصادي'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Advanced Grammar','Essay & Report Writing',
          'Reading Comprehension','Vocabulary','Speaking & Debate'),
        mkSubj('الحاسوب والبرمجة','💻',S_COMP,
          'البرمجة (Python — Java)','قواعد البيانات','الشبكات والأمن المعلوماتي','الذكاء الاصطناعي'),
      ]},
    }
  },

  /* ═══ قطر ══════════════════════════════════════════════════ */
  qatar: {
    label:'🇶🇦 قطر',
    grades:{
      primary:{ label:'ابتدائي', subjects: _primarySubjects(['قطر وموقعها','تاريخ قطر','التراث القطري','المجتمع القطري','البيئة الخليجية']) },
      middle:{ label:'إعدادي', subjects: _middleSubjects() },
      high:{ label:'ثانوي', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,'الجبر المتقدم','المثلثات','التفاضل','التكامل','الإحصاء','الأعداد المركبة'),
        mkSubj('الفيزياء','⚡',S_PHY,'الميكانيكا','الحرارة','الكهرباء','الأمواج','الفيزياء الحديثة'),
        mkSubj('الكيمياء','🧪',S_CHEM,'التركيب الذري','الروابط','التفاعلات','الكيمياء العضوية','الكيمياء الحيوية'),
        mkSubj('الأحياء','🦠',S_BIO,'الخلية','الوراثة','الأجهزة','التطور','علم البيئة'),
        mkSubj('اللغة العربية','📜',S_AR,'النحو','البلاغة','الأدب','التعبير','النقد الأدبي'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,'القرآن','الفقه','العقيدة','السيرة','الأخلاق'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,'Grammar','Writing','Reading','Literature','Speaking'),
        mkSubj('تقنية المعلومات','💻',S_COMP,'البرمجة','قواعد البيانات','الشبكات','الذكاء الاصطناعي'),
      ]},
    }
  },

  /* ═══ البحرين ══════════════════════════════════════════════ */
  bahrain: {
    label:'🇧🇭 البحرين',
    grades:{
      primary:{ label:'ابتدائي', subjects: _primarySubjects(['البحرين وموقعها','تاريخ البحرين','التراث البحريني','المجتمع البحريني','الحياة في البحرين']) },
      middle:{ label:'إعدادي', subjects: _middleSubjects() },
      high:{ label:'ثانوي', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,'الجبر','المثلثات','التفاضل والتكامل','الإحصاء والاحتمالات','المصفوفات'),
        mkSubj('الفيزياء','⚡',S_PHY,'الميكانيكا','الطاقة','الكهرومغناطيسية','الأمواج','الفيزياء الحديثة'),
        mkSubj('الكيمياء','🧪',S_CHEM,'التركيب الذري','الروابط','التفاعلات','الكيمياء العضوية','الكيمياء الصناعية'),
        mkSubj('الأحياء','🦠',S_BIO,'الخلية','الوراثة','الأجهزة الحيوية','التطور','البيئة'),
        mkSubj('اللغة العربية','📜',S_AR,'النحو والصرف','البلاغة','الأدب الخليجي','التعبير الكتابي'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,'القرآن والتفسير','الفقه','العقيدة','السيرة','الأخلاق'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,'Grammar','Essay Writing','Reading','Vocabulary','Speaking'),
        mkSubj('الحاسب','💻',S_COMP,'البرمجة','تصميم المواقع','الشبكات','الأمن السيبراني'),
      ]},
    }
  },

  /* ═══ عُمان ════════════════════════════════════════════════ */
  oman: {
    label:'🇴🇲 عُمان',
    grades:{
      primary:{ label:'ابتدائي', subjects: _primarySubjects(['عُمان وموقعها','تاريخ عُمان','التراث العُماني','البيئة العُمانية','المجتمع والوطن']) },
      middle:{ label:'إعدادي', subjects: _middleSubjects() },
      high:{ label:'ثانوي', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,'الأعداد الحقيقية','الجبر','المثلثات','التفاضل والتكامل','الإحصاء'),
        mkSubj('الفيزياء','⚡',S_PHY,'الميكانيكا','الحرارة','الكهرباء','الأمواج','البصريات'),
        mkSubj('الكيمياء','🧪',S_CHEM,'الذرة والجدول الدوري','الروابط','التفاعلات','الكيمياء العضوية'),
        mkSubj('الأحياء','🦠',S_BIO,'الخلية','الوراثة','أجهزة جسم الإنسان','التطور والبيئة'),
        mkSubj('اللغة العربية','📜',S_AR,'النحو','البلاغة','الأدب العُماني','الأدب العربي','التعبير'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,'القرآن','الفقه الإباضي والعام','العقيدة','السيرة'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,'Grammar','Reading','Writing','Vocabulary','Speaking'),
        mkSubj('الحاسب','💻',S_COMP,'البرمجة','قواعد البيانات','الشبكات','التقنيات الحديثة'),
      ]},
    }
  },

  /* ═══ الأردن ════════════════════════════════════════════════ */
  jordan: {
    label:'🇯🇴 الأردن',
    grades:{
      primary:{ label:'ابتدائي', subjects: _primarySubjects(['الأردن وموقعه','تاريخ الأردن','المجتمع الأردني','المدن والمحافظات','البيئة الأردنية']) },
      middle:{ label:'إعدادي', subjects: _middleSubjects() },
      high:{ label:'ثانوي', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,'الأعداد الحقيقية','الجبر','المثلثات','التفاضل والتكامل','الاحتمالات والإحصاء','الهندسة التحليلية'),
        mkSubj('الفيزياء','⚡',S_PHY,'الحركة والقوى','الشغل والطاقة','الحرارة','الكهرباء','الأمواج','الفيزياء الذرية'),
        mkSubj('الكيمياء','🧪',S_CHEM,'التركيب الذري','الروابط الكيميائية','التفاعلات','المحاليل','الكيمياء العضوية'),
        mkSubj('الأحياء','🦠',S_BIO,'الخلية وجزيئاتها','الوراثة والبيوتكنولوجيا','الأجهزة الحيوية','التطور','البيئة'),
        mkSubj('اللغة العربية','📜',S_AR,'النحو التطبيقي','البلاغة','الأدب الأردني','الأدب العربي','فنون التعبير'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,'القرآن والتفسير','الفقه','العقيدة','الحديث','السيرة والتاريخ'),
        mkSubj('التاريخ','🏛️',S_HIST,'تاريخ الأردن','التاريخ العربي الإسلامي','تاريخ المشرق العربي','التاريخ الحديث'),
        mkSubj('الجغرافيا','🗺️',S_GEO,'جغرافية الأردن','جغرافية الوطن العربي','البيئة والتنمية','الجغرافيا البشرية'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,'Grammar','Essay Writing','Reading Comprehension','Literature','Speaking'),
        mkSubj('الحاسوب','💻',S_COMP,'البرمجة','قواعد البيانات','الشبكات','الأمن الرقمي'),
      ]},
    }
  },


  /* ═══ فلسطين ════════════════════════════════════════════════ */
  palestine: {
    label:'🇵🇸 فلسطين',
    grades:{
      primary:{ label:'أساسي (ص١–٦)', subjects: _primarySubjects([
        'فلسطين وتاريخها العريق وموقعها الجغرافي',
        'القدس عاصمة فلسطين الأبدية ومدينة الأديان',
        'المدن الفلسطينية: غزة ورام الله وجنين وحيفا ويافا ونابلس',
        'التراث الفلسطيني: الزي التطريزي والأغنية الشعبية والتراث المادي',
        'حق العودة والمبادئ الوطنية الفلسطينية'
      ]) },
      middle:{ label:'أساسي (ص٧–١٠)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'ص٧-٨: الأعداد الصحيحة والنسبية، الجبر الأساسي، الهندسة المستوية',
          'ص٩: المعادلات التربيعية، الدوال، الهندسة الإحداثية، الإحصاء',
          'ص١٠: الجبر المتقدم، المثلثات الأساسية، الاحتمالات'),
        mkSubj('الفيزياء','⚡',S_PHY,
          'الحركة والقوى وقوانين نيوتن','الطاقة والشغل والقدرة',
          'الكهرباء والمغناطيسية','الأمواج والضوء والصوت'),
        mkSubj('الكيمياء','🧪',S_CHEM,
          'التركيب الذري والجدول الدوري','الروابط الكيميائية',
          'التفاعلات والمحاليل والأحماض والقلويات','الكيمياء الكربونية المبسطة'),
        mkSubj('الأحياء','🦠',S_BIO,
          'الخلية النباتية والحيوانية والأنسجة',
          'الأجهزة الحيوية الرئيسية (هضم، دوران، تنفس، إخراج)',
          'الوراثة المبسطة والبيئة والتلوث'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو والصرف والبلاغة الأساسية',
          'الأدب الفلسطيني: محمود درويش وسميح القاسم وإبراهيم طوقان',
          'الأدب العربي عبر العصور','التعبير الكتابي والوظيفي'),
        mkSubj('التاريخ والجغرافيا','🌍',S_HIST,
          'تاريخ فلسطين: الكنعانيون والرومان والفتح الإسلامي والصليبيون والعثمانيون',
          'تاريخ القضية الفلسطينية الحديث: النكبة 1948 والنكسة 1967 والانتفاضات',
          'جغرافية فلسطين الطبيعية والبشرية (الأنهر والجبال والسواحل)'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن الكريم والتفسير','الفقه الإسلامي','العقيدة الإسلامية','السيرة النبوية'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Grammar: tenses, modals, passive voice',
          'Reading Comprehension & Vocabulary',
          'Writing: paragraphs, letters, essays',
          'Oral Communication & Presentations'),
      ]},
      high:{ label:'ثانوي — التوجيهي (ص١١–١٢)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'الدوال والتحليل: دوال تربيعية وأسية ولوغاريتمية',
          'التفاضل: الاشتقاق وقواعده، تطبيقات القيم القصوى والخطوط المماسة',
          'التكامل: المحدد وغير المحدد، حساب المساحات والأحجام',
          'الإحصاء والاحتمالات: توزيع ثنائي الحد، التوزيع الطبيعي',
          'المثلثات: قانون الجيوب والتمامات، المعادلات المثلثية',
          'الهندسة الفراغية والإحداثية في ثلاثة أبعاد'),
        mkSubj('الفيزياء','⚡',S_PHY,
          'الميكانيكا المتقدمة: الحركة الدورانية، عزم القصور الذاتي، الزخم الزاوي',
          'الديناميكا الحرارية: قوانين الغازات المثالية، قانوني الديناميكا الحرارية',
          'الكهرباء والمغناطيسية: قانون فاراداي، التيار المتردد والمحولات',
          'الأمواج والبصريات: التداخل والحيود، البصريات الحديثة',
          'الفيزياء الحديثة: نموذج بور، الفيزياء النووية، الانشطار والاندماج'),
        mkSubj('الكيمياء','🧪',S_CHEM,
          'الكيمياء العضوية المتقدمة: التسمية، التفاعلات، المركبات الوظيفية',
          'الكيمياء الحرارية: قانون هس، إنثالبي التكوين والاحتراق',
          'التوازن الكيميائي: Ka وKb وKw، المحاليل الدارئة (Buffer)',
          'الكيمياء الكهروكيميائية: خلايا الجلفاني والتحليل الكهربي'),
        mkSubj('الأحياء','🦠',S_BIO,
          'الوراثة الجزيئية: تركيب DNA وRNA، التعبير الجيني والطفرات',
          'الهندسة الوراثية والبيوتكنولوجيا: PCR، الكائنات المحورة',
          'فسيولوجيا متقدمة: المناعة (خلايا B وT)، الهرمونات والتحكم',
          'التطور والتنوع البيولوجي: النشوء والارتقاء، الحفريات، التصنيف'),
        mkSubj('اللغة العربية وآدابها','📜',S_AR,
          'النحو التطبيقي المتقدم والإعراب الكامل والصرف',
          'البلاغة الكاملة: علم البيان والبديع والمعاني وتطبيقاتها',
          'الأدب الفلسطيني والمقاوم: محمود درويش، سميح القاسم، غسان كنفاني',
          'الأدب العربي الكلاسيكي والحديث والمعاصر',
          'النقد الأدبي وفنون الإنشاء الإبداعي والوظيفي'),
        mkSubj('التاريخ (الفرع الأدبي)','🏛️',S_HIST,
          'تاريخ فلسطين المعاصر وأبعاد القضية الفلسطينية',
          'التاريخ العربي في القرن العشرين: الاستقلال والوحدة والصراعات',
          'التاريخ الإسلامي: الدولة الأموية والعباسية والفاطمية',
          'التاريخ الأوروبي والعالمي الحديث: الحربان العالميتان والحرب الباردة'),
        mkSubj('الجغرافيا (الفرع الأدبي)','🗺️',S_GEO,
          'جغرافية فلسطين التفصيلية: المناخ والتضاريس والمياه والموارد',
          'جغرافية الوطن العربي: الموارد الطبيعية والتحديات البيئية',
          'الجغرافيا البشرية: السكان والهجرة والتحضر والتنمية'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن الكريم وعلوم التفسير والتجويد',
          'الفقه الإسلامي المعاصر: عبادات ومعاملات وأخلاق',
          'العقيدة الإسلامية: توحيد وأسماء وصفات',
          'السيرة النبوية والتاريخ الإسلامي'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Advanced Grammar: conditionals, inversion, relative clauses',
          'Essay Writing: argumentative, discursive, narrative',
          'Literature: poetry analysis, prose comprehension',
          'Speaking & Debate: presentation skills, oral exam preparation'),
      ]},
    }
  },

  /* ═══ لبنان ════════════════════════════════════════════════ */
  lebanon: {
    label:'🇱🇧 لبنان',
    grades:{
      primary:{ label:'ابتدائي', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,'الأعداد والعمليات','الجمع والطرح','الضرب والقسمة','الكسور','القياس','الهندسة'),
        mkSubj('اللغة العربية','📜',S_AR,'القراءة والكتابة','النحو الأساسي','الإملاء','التعبير','المطالعة'),
        mkSubj('العلوم','🔬',S_SCI,'الكائنات الحية','جسم الإنسان','الطاقة','المادة','الأرض'),
        mkSubj('التربية الوطنية','🏳️',S_SOC,'لبنان وتاريخه','التنوع اللبناني','المواطنة','الجغرافيا اللبنانية'),
        mkSubj('اللغة الفرنسية','🇫🇷',S_FR,'Alphabet','Vocabulaire','Lecture','Écriture','Expression orale'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,'Alphabet','Vocabulary','Reading','Writing'),
      ]},
      middle:{ label:'إعدادي', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,'الجبر الأساسي','الهندسة','الإحصاء','الكسور والنسب','المعادلات'),
        mkSubj('الفيزياء','⚡',S_PHY,'الحركة','القوى','الطاقة','الصوت والضوء','الكهرباء'),
        mkSubj('الكيمياء','🧪',S_CHEM,'المادة','التفاعلات','الجدول الدوري','المحاليل'),
        mkSubj('الأحياء','🦠',S_BIO,'الخلية','التغذية','الجهاز الهضمي','الدوري','الوراثة المبسطة'),
        mkSubj('اللغة العربية','📜',S_AR,'النحو والإعراب','البلاغة الأساسية','الأدب','الكتابة'),
        mkSubj('اللغة الفرنسية','🇫🇷',S_FR,'Grammaire','Lecture','Rédaction','Expression','Littérature'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,'Grammar','Reading','Writing','Speaking','Vocabulary'),
        mkSubj('التاريخ والجغرافيا','🏛️',S_HIST,'التاريخ اللبناني','التاريخ العربي','جغرافية لبنان','جغرافية العالم'),
      ]},
      high:{ label:'ثانوي', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,'الجبر المتقدم','التفاضل والتكامل','المثلثات','الإحصاء','الأعداد المركبة','التحليل الرياضي'),
        mkSubj('الفيزياء','⚡',S_PHY,'الميكانيكا','الديناميكا الحرارية','الكهرومغناطيسية','الأمواج والبصريات','الفيزياء الحديثة'),
        mkSubj('الكيمياء','🧪',S_CHEM,'التركيب الذري','الروابط','الكيمياء العضوية','الكيمياء الحيوية','التوازن الكيميائي'),
        mkSubj('الأحياء','🦠',S_BIO,'الخلية والجزيئات','الوراثة الجزيئية','الأجهزة','التطور','علم البيئة'),
        mkSubj('اللغة العربية','📜',S_AR,'النحو التطبيقي','البلاغة والنقد','الأدب اللبناني','الأدب المقارن','فنون الكتابة'),
        mkSubj('اللغة الفرنسية','🇫🇷',S_FR,'Grammaire avancée','Littérature','Rédaction','Expression','Philosophie en français'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,'Advanced Grammar','Literature','Essay Writing','Speaking','Research'),
        mkSubj('الفلسفة','💭',S_PHIL,'المنطق','الإبستيمولوجيا','الأنطولوجيا','الأخلاق','الفلسفة السياسية'),
        mkSubj('التاريخ','🏛️',S_HIST,'تاريخ لبنان الحديث','التاريخ العربي','التاريخ الأوروبي','التاريخ المعاصر'),
        mkSubj('الجغرافيا','🗺️',S_GEO,'جغرافية لبنان','الجغرافيا الاقتصادية','جغرافية الشرق الأوسط','التغيرات المناخية'),
      ]},
    }
  },

  /* ═══ سوريا ════════════════════════════════════════════════ */
  syria: {
    label:'🇸🇾 سوريا',
    grades:{
      primary:{ label:'ابتدائي (ص١–٦)', subjects: _primarySubjects(['سوريا وموقعها الجغرافي','تاريخ بلاد الشام وحضاراتها','المدن السورية الكبرى','النيل والفرات','البيئة الطبيعية في سوريا']) },
      middle:{ label:'إعدادي (ص٧–٩)', subjects: _middleSubjects() },
      high_sci:{ label:'ثانوي علمي (ص١٠–١٢)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'الجبر: المعادلات والمتباينات، الدوال والرسم البياني',
          'التفاضل: الاشتقاق وتطبيقاته (القيم القصوى، الخطوط المماسة)',
          'التكامل: التكامل المحدد وغير المحدد، المساحة تحت المنحنى',
          'الهندسة التحليلية: الدائرة والمكافئ والقطع الناقص',
          'المثلثات: دوال مثلثية، معادلات، نظريات الجيب والتمام',
          'الإحصاء والاحتمالات: مقاييس النزعة المركزية والتشتت'),
        mkSubj('الفيزياء','⚡',S_PHY,
          'الميكانيكا: الحركة والقوى، قوانين نيوتن، الزخم، الشغل والطاقة',
          'الديناميكا الحرارية: درجة الحرارة، الحرارة النوعية، قوانين الغازات',
          'الكهرباء والمغناطيسية: القوانين الأساسية، الدوائر الكهربية، الحث',
          'الأمواج: الميكانيكية والكهرومغناطيسية، الصوت، البصريات',
          'الفيزياء الحديثة: الكم، الذرة والنواة، الانشطار والاندماج'),
        mkSubj('الكيمياء','🧪',S_CHEM,
          'التركيب الذري والجدول الدوري: الدوريات والمجموعات والخصائص',
          'الروابط الكيميائية: الأيونية والتساهمية والمعدنية',
          'التفاعلات الكيميائية: التوازن، معدل التفاعل، المحاليل',
          'الكيمياء الحرارية والكهروكيميائية: إنثالبي التفاعل، خلايا كهرومائية',
          'الكيمياء العضوية: الهيدروكربونات، المجموعات الوظيفية، التفاعلات الأساسية'),
        mkSubj('الأحياء','🦠',S_BIO,
          'الخلية: البنية والوظيفة، الانقسام الخيطي والاختزالي',
          'الكيمياء الحيوية: البروتينات والكربوهيدرات والدهون والأحماض النووية',
          'الوراثة: قوانين مندل، الجينات والصبغيات، الطفرات',
          'الأجهزة الحيوية: الهضم، التنفس، الدوران، الجهاز العصبي والهرموني',
          'البيئة: تدفق الطاقة، دورات العناصر، التلوث'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو والصرف: الإعراب التفصيلي، المشتقات، الأسلوب',
          'البلاغة: علم البيان والبديع والمعاني',
          'الأدب: الشعر الجاهلي والأموي والعباسي والحديث',
          'الأدب السوري المعاصر: أبرز الأدباء والأعمال',
          'النقد الأدبي وفنون التعبير الكتابي'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Grammar: Advanced tenses, conditionals, passive, reported speech',
          'Reading & Comprehension: literary & informational texts',
          'Essay Writing: argumentative, descriptive, narrative',
          'Vocabulary & Idiomatic expressions'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن الكريم والتفسير الموضوعي',
          'الفقه الإسلامي (عبادات ومعاملات)',
          'العقيدة الإسلامية والأخلاق',
          'السيرة النبوية والتاريخ الإسلامي'),
      ]},
      high_arts:{ label:'ثانوي أدبي (ص١٠–١٢)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'الجبر الأساسي: المعادلات والدوال والمتتاليات',
          'الإحصاء: التوزيعات والمقاييس والتمثيل البياني',
          'الهندسة المستوية: المثلثات، المضلعات، المساحات'),
        mkSubj('اللغة العربية وآدابها','📜',S_AR,
          'النحو والصرف المتقدم والإعراب التطبيقي',
          'البلاغة العربية الكاملة (بيان وبديع ومعاني)',
          'تاريخ الأدب العربي عبر العصور',
          'الأدب السوري والنقد الأدبي الحديث',
          'فنون الإنشاء: المقالة والقصة والشعر'),
        mkSubj('التاريخ','🏛️',S_HIST,
          'تاريخ سوريا في العصور القديمة (آرام وفينيقيا)',
          'العصر الإسلامي الأموي والعباسي',
          'سوريا في العصر الحديث والمعاصر',
          'التاريخ العالمي: الحرب العالمية الأولى والثانية، الحرب الباردة'),
        mkSubj('الجغرافيا','🗺️',S_GEO,
          'جغرافية سوريا الطبيعية والبشرية',
          'الوطن العربي: الموقع والموارد والسكان',
          'الجغرافيا الاقتصادية العالمية',
          'التغيرات المناخية والتنمية المستدامة'),
        mkSubj('الفلسفة والاجتماع','💭',S_PHIL,
          'المنطق الصوري: القياس والاستدلال',
          'نظرية المعرفة ومناهج البحث العلمي',
          'الفلسفة الاجتماعية والأخلاقية',
          'علم الاجتماع: المجتمع والمؤسسات الاجتماعية'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن الكريم والتفسير','الفقه','العقيدة','السيرة'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Grammar, Reading Comprehension, Essay Writing, Conversation'),
      ]},
    }
  },
  iraq: {
    label:'🇮🇶 العراق',
    grades:{
      primary:{ label:'ابتدائي (ص١–٦)', subjects: _primarySubjects(['العراق وموقعه الجغرافي','حضارة وادي الرافدين وبابل','المدن العراقية الكبرى (بغداد والبصرة والموصل)','نهرا دجلة والفرات','الثروات الطبيعية والنفط']) },
      middle:{ label:'متوسط (ص٧–٩)', subjects: _middleSubjects() },
      high_sci:{ label:'إعدادي علمي (ص١٠–١٢)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'الجبر المتقدم: الأعداد المركبة، المتتاليات والمتسلسلات، نظرية ذات الحدين',
          'المثلثات: الدوال المثلثية، المعادلات المثلثية، نظريات جيب التمام',
          'التفاضل: الاشتقاق بجميع طرقه، تطبيقات القيم القصوى',
          'التكامل: أساليب التكامل، التطبيقات الهندسية والفيزيائية',
          'الهندسة التحليلية: الدائرة والمكافئ والقطوع المخروطية',
          'الإحصاء والاحتمالات: التوزيعات، اختبارات الفرضيات'),
        mkSubj('الفيزياء','⚡',S_PHY,
          'الميكانيكا: الحركة الخطية والدائرية، قوانين الاتجاه، الشغل والطاقة والقدرة',
          'ديناميكا الحرارة: قوانين الغازات، التوصيل والإشعاع والحمل',
          'الكهرباء: قوانين كيرشهوف، المكثفات، المجال الكهربي والمغناطيسي',
          'الأمواج والبصريات: الانعكاس والانكسار والتداخل والحيود',
          'الفيزياء الحديثة: ظاهرة الكم، التركيب النووي، الانشطار والاندماج'),
        mkSubj('الكيمياء','🧪',S_CHEM,
          'التركيب الذري والنظائر وعلاقتها بالجدول الدوري',
          'التوازن الكيميائي: قاعدة لو شاتيليه، ثابت التوازن',
          'الكيمياء الكهروكيميائية: خلايا التحليل الكهربائي وخلايا الجلفاني',
          'الكيمياء الحرارية: قانون هس، حرارة التكوين والاحتراق',
          'الكيمياء العضوية: تسمية المركبات، التفاعلات الأساسية، البترول وتقطيره'),
        mkSubj('الأحياء','🦠',S_BIO,
          'الخلية وعضياتها: البنية والوظيفة، التنفس الخلوي، عملية التمثيل الضوئي',
          'الوراثة الجزيئية: تركيب DNA وRNA، التعبير الجيني، الهندسة الوراثية',
          'التكاثر والنمو: أنواع التكاثر، دورة الخلية، التطور الجنيني',
          'التشريح ووظائف الأعضاء: الأجهزة الحيوية الرئيسية',
          'البيئة والنظام البيئي: السلاسل الغذائية، التلوث، الحفاظ على البيئة'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو التطبيقي: الإعراب الكامل والتراكيب الخاصة',
          'البلاغة: علم البيان والبديع والمعاني وتطبيقاتها',
          'الأدب العربي: الشعر والنثر عبر العصور',
          'الأدب العراقي: أبرز الشعراء (الجواهري، البياتي، السياب)',
          'التعبير الكتابي الوظيفي والإبداعي'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Grammar: All tenses, modals, conditionals, passive, reported speech',
          'Reading Comprehension: literary & scientific texts',
          'Writing: essays, reports, formal letters',
          'Vocabulary: academic & technical words in context'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن الكريم وعلوم التفسير','الفقه الإسلامي','العقيدة','السيرة'),
      ]},
      high_arts:{ label:'إعدادي أدبي (ص١٠–١٢)', subjects:[
        mkSubj('اللغة العربية وآدابها','📜',S_AR,
          'النحو والصرف المتقدم','البلاغة الكاملة',
          'الأدب العراقي والعربي (الجواهري، المتنبي، طه حسين)',
          'النقد الأدبي الحديث','فنون الكتابة الإبداعية'),
        mkSubj('التاريخ','🏛️',S_HIST,
          'حضارات وادي الرافدين (سومر وأكاد وبابل وآشور)',
          'تاريخ العراق الإسلامي: الدولة العباسية وحضارتها',
          'العراق الحديث: الانتداب البريطاني والاستقلال',
          'التاريخ العربي والإسلامي والعالمي الحديث'),
        mkSubj('الجغرافيا','🗺️',S_GEO,
          'جغرافية العراق الطبيعية والبشرية والاقتصادية',
          'الوطن العربي: الموارد والتنمية والتحديات',
          'الجغرافيا العالمية وقضايا البيئة'),
        mkSubj('الفلسفة','💭',S_PHIL,
          'المنطق الصوري والرمزي','نظرية المعرفة',
          'الفلسفة الإسلامية (الكندي والفارابي وابن رشد)',
          'الفلسفة الغربية الحديثة وأبرز المذاهب'),
        mkSubj('الرياضيات','🔢',S_MATH,
          'الجبر الأساسي والدوال','الإحصاء الوصفي والاستدلالي'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن والتفسير','الفقه','العقيدة','السيرة'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Grammar, Reading, Essay Writing, Conversation'),
      ]},
    }
  },
  libya: {
    label:'🇱🇾 ليبيا',
    grades:{
      primary:{ label:'ابتدائي (ص١–٦)', subjects: _primarySubjects(['ليبيا وموقعها الاستراتيجي','تاريخ ليبيا: القرطاجيون والرومان والعثمانيون','المدن الليبية: طرابلس وبنغازي وسبها','الصحراء الكبرى والموارد النفطية','تراث وعادات الشعب الليبي']) },
      middle:{ label:'إعدادي (ص٧–٩)', subjects: _middleSubjects() },
      high_sci:{ label:'ثانوي علمي (ص١٠–١٢)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'الجبر المتقدم: الأعداد المركبة، المتتاليات، نظرية ذات الحدين',
          'التفاضل: الاشتقاق وقواعده، تطبيقات (التحليل، القيم القصوى)',
          'التكامل المحدد وغير المحدد وتطبيقاته الهندسية',
          'المثلثات الكروية والمعادلات المثلثية',
          'الإحصاء والاحتمالات: التوزيعات والاختبارات'),
        mkSubj('الفيزياء','⚡',S_PHY,
          'الميكانيكا وقوانين نيوتن والطاقة والزخم',
          'الكهرباء الساكنة والمتحركة والمغناطيسية',
          'الأمواج الميكانيكية والكهرومغناطيسية والبصريات',
          'الفيزياء الحديثة: فيزياء الكم والفيزياء النووية'),
        mkSubj('الكيمياء','🧪',S_CHEM,
          'التركيب الذري والجدول الدوري والروابط الكيميائية',
          'التوازن الكيميائي والكيمياء الحرارية والكهروكيميائية',
          'الكيمياء العضوية: الهيدروكربونات والمركبات الوظيفية'),
        mkSubj('الأحياء','🦠',S_BIO,
          'الخلية والوراثة الجزيئية والهندسة الوراثية',
          'أجهزة جسم الإنسان والفسيولوجيا',
          'البيئة والتطور والتنوع البيولوجي'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو والصرف المتقدم والبلاغة الكاملة',
          'الأدب العربي وآداب المغرب العربي والأدب الليبي',
          'التعبير الكتابي والوظيفي'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن والتفسير','الفقه المالكي','العقيدة','السيرة'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Grammar, Reading Comprehension, Essay Writing, Speaking'),
      ]},
      high_arts:{ label:'ثانوي أدبي (ص١٠–١٢)', subjects:[
        mkSubj('اللغة العربية وآدابها','📜',S_AR,
          'النحو والصرف المتقدم','البلاغة الكاملة',
          'الأدب الليبي والمغاربي والعربي','النقد الأدبي','الإنشاء'),
        mkSubj('التاريخ','🏛️',S_HIST,
          'تاريخ ليبيا القديم والإسلامي والحديث',
          'حركات التحرر الوطني والمقاومة الليبية (عمر المختار)',
          'التاريخ العربي والعالمي الحديث'),
        mkSubj('الجغرافيا','🗺️',S_GEO,
          'جغرافية ليبيا: طبيعية وبشرية واقتصادية',
          'جغرافية أفريقيا والوطن العربي'),
        mkSubj('الفلسفة','💭',S_PHIL,
          'المنطق','نظرية المعرفة','الفلسفة الإسلامية والغربية'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن والتفسير','الفقه المالكي','العقيدة'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Grammar, Reading, Writing, Conversation'),
      ]},
    }
  },
  sudan: {
    label:'🇸🇩 السودان',
    grades:{
      primary:{ label:'أساسي (ص١–٨)', subjects: _primarySubjects(['السودان وموقعه الجغرافي','النيل ونيل أزرق وأبيض وأثرهما','الحضارة المروية وتاريخ السودان القديم','التنوع الثقافي والقبلي في السودان','الثروات الطبيعية: ذهب ونفط وزراعة']) },
      middle:{ label:'ثانوي (ص٩–١١)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'الجبر: المعادلات والمتباينات والدوال',
          'المثلثات: الدوال المثلثية وتطبيقاتها',
          'التفاضل والتكامل: الاشتقاق والتكامل وتطبيقاتهما',
          'الإحصاء والاحتمالات','الهندسة التحليلية'),
        mkSubj('الفيزياء','⚡',S_PHY,
          'الميكانيكا والديناميكا والطاقة','الكهرباء والمغناطيسية',
          'الأمواج والبصريات','الفيزياء الحديثة والنووية'),
        mkSubj('الكيمياء','🧪',S_CHEM,
          'التركيب الذري والجدول الدوري','الروابط والتفاعلات',
          'الكيمياء الحرارية والكهروكيميائية','الكيمياء العضوية'),
        mkSubj('الأحياء','🦠',S_BIO,
          'الخلية والوراثة','الأجهزة الحيوية',
          'التطور والبيئة والنظم البيئية'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو والصرف والبلاغة','الأدب السوداني والعربي',
          'التعبير الكتابي الوظيفي والإبداعي'),
        mkSubj('التاريخ والجغرافيا','🌍',S_HIST,
          'تاريخ السودان: مروي وسنار والمهدية والاستعمار والاستقلال',
          'جغرافية السودان الطبيعية والبشرية والاقتصادية',
          'التاريخ العربي والإسلامي والعالمي'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن الكريم والتفسير','الفقه','العقيدة','السيرة النبوية'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Grammar, Reading, Writing, Oral Communication'),
      ]},
      high:{ label:'شهادة السودان (ص١٢)', subjects:[
        mkSubj('الرياضيات (شهادة السودان)','🔢',S_MATH,
          'مراجعة شاملة للجبر والتفاضل والتكامل والإحصاء والهندسة التحليلية',
          'تحضير لامتحان شهادة السودان — نماذج واستراتيجيات'),
        mkSubj('الفيزياء (شهادة السودان)','⚡',S_PHY,
          'مراجعة شاملة — ميكانيكا وكهرباء وأمواج وفيزياء حديثة'),
        mkSubj('الكيمياء (شهادة السودان)','🧪',S_CHEM,
          'مراجعة شاملة — عضوية وغير عضوية وكهروكيميائية'),
        mkSubj('الأحياء (شهادة السودان)','🦠',S_BIO,
          'مراجعة شاملة — خلية ووراثة وأجهزة وبيئة'),
        mkSubj('اللغة العربية (شهادة السودان)','📜',S_AR,
          'نحو وبلاغة وأدب وتعبير — مراجعة للامتحان'),
      ]},
    }
  },
  yemen: {
    label:'🇾🇪 اليمن',
    grades:{
      primary:{ label:'أساسي (ص١–٦)', subjects: _primarySubjects(['اليمن وموقعه الاستراتيجي','حضارة سبأ ومأرب وقتبان وحمير','المدن اليمنية: صنعاء وعدن وتعز وحضرموت','التنوع الجغرافي: الجبال والسهول والصحاري','التراث والمعمار اليمني']) },
      middle:{ label:'متوسط (ص٧–٩)', subjects: _middleSubjects() },
      high:{ label:'ثانوي — شهادة الثانوية (ص١٠–١٢)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'الجبر المتقدم: الأعداد المركبة، المتتاليات، حل المعادلات العليا',
          'المثلثات: الدوال والمعادلات والهوية المثلثية',
          'التفاضل والتكامل: قواعد الاشتقاق والتكامل وتطبيقاتهما',
          'الهندسة التحليلية: المقاطع المخروطية',
          'الإحصاء والاحتمالات'),
        mkSubj('الفيزياء','⚡',S_PHY,
          'الميكانيكا الكلاسيكية: الحركة والقوى والطاقة',
          'الكهرباء الساكنة والمتحركة والمجالات',
          'الأمواج: الميكانيكية والكهرومغناطيسية والبصريات',
          'الفيزياء الحديثة: تركيب الذرة والنواة والإشعاع'),
        mkSubj('الكيمياء','🧪',S_CHEM,
          'التركيب الذري والجدول الدوري والروابط',
          'التوازن الكيميائي والمحاليل والأحماض والقواعد',
          'الكيمياء الكهروكيميائية والحرارية',
          'الكيمياء العضوية: البترول والغاز الطبيعي ومشتقاتهما'),
        mkSubj('الأحياء','🦠',S_BIO,
          'الخلية النباتية والحيوانية والوراثة',
          'الأجهزة الحيوية وفسيولوجيا الإنسان',
          'التطور والبيئة والتنوع البيولوجي'),
        mkSubj('اللغة العربية وآدابها','📜',S_AR,
          'النحو والصرف والبلاغة الكاملة',
          'الأدب اليمني القديم والحديث (الشعر الحميري والمعاصر)',
          'الأدب العربي عبر العصور والتعبير الكتابي'),
        mkSubj('التاريخ والجغرافيا','🌍',S_HIST,
          'تاريخ اليمن: الحضارات القديمة والدولة الإسلامية والعثمانية والحديثة',
          'جغرافية اليمن: طبيعية وبشرية واقتصادية (موانئ — نفط — زراعة)',
          'التاريخ العربي والإسلامي والعالمي'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن الكريم وعلوم التفسير','الفقه الزيدي والشافعي',
          'العقيدة الإسلامية','الحديث النبوي','السيرة'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,
          'Grammar, Reading, Essay Writing, Oral Communication'),
      ]},
    }
  },

  egypt_ext: {
    label:'📗 كتب خارجية (مصر)',
    grades:{
      high:{ label:'أول / ثاني ثانوي', subjects:[] },
      high2:{ label:'ثاني ثانوي', subjects:[] },
      middle:{ label:'إعدادي', subjects:[] },
      primary:{ label:'ابتدائي', subjects:[] },
    }
  },

  igcse: {
    label:'🎓 IGCSE / Cambridge',
    grades:{
      middle:{ label:'Year 7–9 (Lower Secondary)', subjects:[
        mkSubj('Mathematics','🔢',S_MATH,
          'Number: integers, decimals, fractions, percentages, ratio',
          'Algebra: expressions, equations, inequalities, sequences',
          'Geometry: angles, triangles, circles, constructions',
          'Statistics & Probability: data handling, mean, charts',
          'Mensuration: area, volume, surface area'),
        mkSubj('Physics','⚡',S_PHY,
          "Forces & Motion: speed, velocity, Newton's laws",
          'Energy: forms, transfer, conservation, efficiency',
          'Waves: sound, light, reflection, refraction',
          'Electricity & Magnetism: circuits, resistance, electromagnetism',
          'Matter: states, density, pressure, thermal properties'),
        mkSubj('Chemistry','🧪',S_CHEM,
          'Particles & Atomic Structure: atoms, ions, isotopes',
          'The Periodic Table: groups, periods, trends',
          'Bonding: ionic, covalent, metallic',
          'Chemical Reactions: types, rates, energy changes',
          'Acids, Bases & Salts: reactions, pH, neutralisation'),
        mkSubj('Biology','🦠',S_BIO,
          'Cells & Organisation: plant & animal cells, tissues, organs',
          'Nutrition & Digestion: food groups, digestive system',
          'Respiration & Gas Exchange: aerobic & anaerobic, lungs',
          'Transport in Plants & Animals: blood, heart, xylem, phloem',
          'Reproduction & Genetics: cell division, inheritance, DNA'),
        mkSubj('English Language','🗣️',S_EN,
          'Reading: comprehension, inference, language analysis',
          'Writing: essays, letters, reports, descriptive writing',
          'Grammar & Vocabulary: tenses, clauses, punctuation',
          'Speaking & Listening: presentations, discussions'),
        mkSubj('Geography','🗺️',S_GEO,
          'Natural Environments: rivers, coasts, weather, climate',
          'Human Environments: population, settlements, urbanisation',
          'Economic Development: agriculture, industry, tourism',
          'Environmental Management: sustainability, ecosystems'),
        mkSubj('History','🏛️',S_HIST,
          'World War I: causes, trenches, key battles, outcomes',
          'The Rise of Dictators: Hitler, Stalin, Mussolini',
          'World War II: causes, Holocaust, key campaigns',
          'Cold War: USA vs USSR, arms race, proxy wars',
          'Decolonisation & independence movements'),
        mkSubj('ICT / Computer Science','💻',S_COMP,
          'Hardware & Software: components, OS, applications',
          'Data Representation: binary, ASCII, images, sound',
          'Networks: internet, protocols, security, cloud',
          'Programming: algorithms, flowcharts, pseudocode, Python basics',
          'Database Basics: tables, queries, forms'),
      ]},
      high:{ label:'Year 10–11 (IGCSE)', subjects:[
        mkSubj('Mathematics (0580)','🔢',S_MATH,
          'Number: surds, standard form, bounds, reverse percentage',
          'Algebra: functions, quadratics, simultaneous equations, inequalities',
          'Geometry: similar shapes, Pythagoras, trigonometry (SOH-CAH-TOA)',
          'Vectors & Transformations: column vectors, reflection, rotation, enlargement',
          'Statistics & Probability: cumulative frequency, histograms, box plots, tree diagrams',
          'Extended: differentiation, integration, matrices, complex loci'),
        mkSubj('Physics (0625)','⚡',S_PHY,
          "General Physics: kinematics, Newton's laws, momentum, pressure",
          'Thermal Physics: specific heat capacity, latent heat, gas laws',
          'Properties of Waves: transverse, longitudinal, EM spectrum, optics',
          "Electricity & Magnetism: Ohm's law, circuits, transformers, motors",
          'Nuclear Physics: radioactivity, decay types, half-life, fission, fusion'),
        mkSubj('Chemistry (0620)','🧪',S_CHEM,
          'Stoichiometry: moles, empirical & molecular formulae, calculations',
          'Electrochemistry: electrolysis, applications, electrode equations',
          'Organic Chemistry: alkanes, alkenes, alcohols, polymers, reactions',
          'Rate of Reaction: collision theory, catalysts, temperature, concentration',
          'Industrial Chemistry: Haber process, Contact process, extraction of metals'),
        mkSubj('Biology (0610)','🦠',S_BIO,
          'Enzymes: structure, function, factors affecting activity, uses',
          'Photosynthesis: chloroplast, light & dark reactions, limiting factors',
          'Homeostasis: blood glucose regulation, thermoregulation, kidney',
          'Genetics: DNA structure, protein synthesis, monohybrid crosses, mutations',
          'Evolution: natural selection, speciation, evidence for evolution'),
        mkSubj('English Language (0500)','🗣️',S_EN,
          'Paper 1: Reading — inference, summary writing, language analysis',
          'Paper 2: Directed Writing & Composition',
          'Effective expression, imagery, tone, structure',
          'Extended response writing: argument, narrative, descriptive'),
        mkSubj('English Literature (0475)','📚',S_SOC,
          'Poetry: unseen & prescribed poems, language & structure analysis',
          'Prose: novels & short stories — character, theme, narrative',
          'Drama: Shakespeare & modern plays — staging, dialogue, context',
          'Comparative essays & sustained critical writing'),
        mkSubj('Mathematics (Add. Maths 0606)','🔢',S_MATH,
          'Functions: domain, range, composite, inverse',
          'Trigonometry: identities, equations, graphs, radians',
          'Calculus: differentiation (chain, product, quotient rules), integration',
          'Binomial Theorem: expansion, coefficients, approximations',
          'Matrices: operations, determinant, inverse, transformation'),
        mkSubj('Computer Science (0478)','💻',S_COMP,
          "Data Representation: binary arithmetic, hexadecimal, 2's complement",
          'Algorithms: pseudocode, flowcharts, searching, sorting',
          'Programming (Python): variables, loops, functions, files, OOP basics',
          'Databases: SQL — SELECT, WHERE, JOIN, GROUP BY',
          'Networks & Security: protocols, TCP/IP, encryption, cyber threats'),
        mkSubj('Economics (0455)','💰',S_SOC,
          'Basic Economic Problem: scarcity, opportunity cost, PPC',
          'Microeconomics: supply & demand, price mechanism, elasticity',
          'Firms & Production: costs, revenue, profit, market structures',
          'Macroeconomics: GDP, inflation, unemployment, fiscal & monetary policy',
          'International Trade: comparative advantage, exchange rates, protectionism'),
        mkSubj('Business Studies (0450)','📊',S_SOC,
          'Business Activity: types of business, stakeholders, objectives',
          'People in Business: motivation, HR management, communication',
          'Marketing: market research, 4Ps, product life cycle',
          'Operations Management: production methods, quality, inventory',
          'Finance: sources of finance, cash flow, profit & loss, balance sheet'),
        mkSubj('Geography (0460)','🗺️',S_GEO,
          'Population & Migration: pyramids, demographic transition, urbanisation',
          'Settlement: urban growth, land use, problems & solutions',
          'Economic Development: indicators, aid, trade, TNCs',
          'Ecosystems: tropical rainforest, coral reef, tundra',
          'Natural Hazards: earthquakes, volcanoes, tropical storms'),
        mkSubj('History (0470)','🏛️',S_HIST,
          'Core: WWI, Versailles, rise of dictators, WWII, Cold War',
          "Option B: The 20th Century — league of nations, Hitler's foreign policy",
          'Option: Colonial rule & independence in Africa/Asia',
          'Source-based questions: reliability, cross-referencing, utility'),
      ]},
    }
  },

  /* ═══ American Curriculum (Common Core + AP) ════════════════ */
  american: {
    label:'🇺🇸 American Curriculum',
    grades:{
      primary:{ label:'Elementary (Gr.1–5)', subjects:[
        mkSubj('Math','🔢',S_MATH,
          'Gr.1: Counting to 120, place value, addition & subtraction to 20',
          'Gr.2: Numbers to 1000, addition & subtraction, measurement, shapes',
          'Gr.3: Multiplication & division, fractions, area & perimeter',
          'Gr.4: Multi-digit multiplication, fractions & decimals, angles',
          'Gr.5: Decimal operations, fractions ÷ fractions, volume, coordinate plane'),
        mkSubj('ELA (English Language Arts)','📚',S_EN,
          'Gr.1-2: Phonics, sight words, reading fluency, writing sentences',
          'Gr.3: Reading comprehension, paragraph writing, grammar basics',
          'Gr.4: Literary analysis, opinion writing, parts of speech',
          'Gr.5: Informational text, research writing, figurative language'),
        mkSubj('Science','🔬',S_SCI,
          'Gr.1-2: Plants & animals, earth materials, weather & sky',
          'Gr.3: Life cycles, food chains, forces & motion',
          'Gr.4: Ecosystems, rocks & minerals, electricity',
          "Gr.5: Matter & energy, Earth's systems, space"),
        mkSubj('Social Studies','🌍',S_HIST,
          'Gr.1-2: Community helpers, maps, family & culture',
          'Gr.3: Local history, geography, government',
          'Gr.4: State history & geography, Native Americans',
          'Gr.5: US history (Colonial era to Revolution), Constitution basics'),
      ]},
      middle:{ label:'Middle School (Gr.6–8)', subjects:[
        mkSubj('Mathematics','🔢',S_MATH,
          'Gr.6: Ratios, proportions, negative numbers, statistics, area & volume',
          'Gr.7: Proportional relationships, linear equations, probability, geometry',
          'Gr.8: Linear functions, systems of equations, Pythagorean theorem, transformations'),
        mkSubj('Pre-Algebra / Algebra I','🔢',S_MATH,
          'Variables, expressions & equations',
          'Linear equations & inequalities',
          'Functions: domain, range, slope-intercept form',
          'Systems of equations (substitution & elimination)',
          'Polynomials & factoring'),
        mkSubj('Life Science','🦠',S_BIO,
          'Cell biology: structure, organelles, cell division',
          'Genetics: DNA, heredity, traits, mutations',
          'Evolution: natural selection, fossil evidence',
          'Ecosystems: biomes, food webs, energy flow',
          'Human body systems: digestive, respiratory, circulatory, nervous'),
        mkSubj('Earth Science','🌍',S_GEO,
          'Plate tectonics: earthquakes, volcanoes, mountain formation',
          'Rocks & the rock cycle: igneous, sedimentary, metamorphic',
          'Weathering, erosion & deposition',
          'Oceans: tides, currents, marine ecosystems',
          'Atmosphere & weather: layers, fronts, severe weather'),
        mkSubj('Physical Science','⚡',S_PHY,
          'Matter: atoms, elements, compounds, mixtures',
          'Chemical reactions: types, indicators, conservation of mass',
          "Forces & motion: Newton's laws, friction, gravity",
          'Energy: kinetic & potential, heat transfer, waves',
          'Electricity & magnetism: circuits, electromagnetic induction'),
        mkSubj('ELA (English Language Arts)','📚',S_EN,
          'Literature: fiction, poetry, drama — theme, character, conflict',
          'Nonfiction: central idea, evidence-based analysis',
          'Writing: argumentative, informative, narrative essays',
          'Grammar: complex sentences, clauses, mechanics',
          'Research & citation: MLA format, credible sources'),
        mkSubj('US History','🏛️',S_HIST,
          'Revolution & Constitution: causes, founding documents',
          'Expansion & conflict: Manifest Destiny, Civil War, Reconstruction',
          'Industrialization & immigration (late 1800s)',
          'Progressive Era & WWI',
          'Great Depression, WWII, Cold War basics'),
        mkSubj('World History','🌐',S_HIST,
          'Ancient civilizations: Mesopotamia, Egypt, Greece, Rome',
          'Medieval world: feudalism, Islam, Crusades, Renaissance',
          'Age of Exploration & colonialism',
          'Revolutions: American, French, Industrial',
          'Modern world: imperialism, WWI, decolonisation'),
        mkSubj('Computer Science','💻',S_COMP,
          'Scratch & block-based programming',
          'Python basics: variables, loops, functions',
          'Web basics: HTML & CSS',
          'Digital citizenship & cybersecurity',
          'Data & spreadsheets'),
      ]},
      high:{ label:'High School (Gr.9–12)', subjects:[
        mkSubj('Algebra I','🔢',S_MATH,
          'Linear equations & inequalities: solving, graphing, systems',
          'Exponential functions: growth, decay, applications',
          'Polynomials: adding, subtracting, multiplying, factoring',
          'Quadratic functions: vertex form, factoring, quadratic formula',
          'Statistics: scatter plots, linear regression, data interpretation'),
        mkSubj('Geometry','📐',S_MATH,
          'Congruence & similarity: proofs, transformations, triangles',
          'Right triangles & trigonometry: SOH-CAH-TOA, special triangles',
          'Circles: theorems, arc length, area, equations',
          'Coordinate geometry: distance, midpoint, equations of lines',
          'Volume & surface area: prisms, cylinders, pyramids, spheres'),
        mkSubj('Algebra II / Pre-Calculus','🔢',S_MATH,
          'Complex numbers, polynomial functions, rational expressions',
          'Exponential & logarithmic functions: laws, equations, applications',
          'Trigonometry: unit circle, identities, graphs, inverse functions',
          'Sequences & Series: arithmetic, geometric, sigma notation',
          'Conic sections: parabolas, ellipses, hyperbolas'),
        mkSubj('AP Calculus AB/BC','🔢',S_MATH,
          "Limits & Continuity: definition, L'Hôpital's rule",
          'Differentiation: rules, implicit, related rates, optimization',
          'Integration: Riemann sums, FTC, u-substitution',
          'Applications: area between curves, volume of revolution',
          'BC Extra: series (Taylor, Maclaurin), parametric, polar'),
        mkSubj('AP Statistics','📊',S_MATH,
          'Exploring Data: distributions, boxplots, normal curve',
          'Sampling & Experimentation: bias, randomization, design',
          'Probability: rules, conditional, binomial, geometric distributions',
          'Inference: confidence intervals, hypothesis testing, chi-square, regression'),
        mkSubj('AP Physics 1 & 2','⚡',S_PHY,
          'Kinematics: 1D & 2D motion, projectiles',
          "Newton's Laws: forces, friction, circular motion",
          'Work, Energy & Power: conservation, collisions',
          'Rotational Motion: torque, angular momentum',
          'AP Physics 2: fluids, thermodynamics, E&M, optics, modern physics'),
        mkSubj('AP Physics C (Calculus-based)','⚡',S_PHY,
          "Mechanics: kinematics, Newton's laws, energy, rotation, oscillations",
          "Electricity & Magnetism: Coulomb's law, Gauss's law, circuits, Faraday's law",
          'Uses calculus throughout (derivatives & integrals)'),
        mkSubj('AP Chemistry','🧪',S_CHEM,
          'Atomic Structure & Periodicity: electron config, periodic trends',
          'Chemical Bonding: VSEPR, IMFs, lattice energy',
          'Stoichiometry: limiting reagents, percent yield, solution chemistry',
          'Kinetics: rate laws, mechanisms, Arrhenius equation',
          "Thermodynamics: ΔH, ΔS, ΔG, Hess's law, equilibrium (Le Chatelier)",
          'Electrochemistry: galvanic & electrolytic cells, Nernst equation'),
        mkSubj('AP Biology','🦠',S_BIO,
          'Chemistry of Life: macromolecules, enzyme kinetics',
          'Cell Structure & Function: organelles, membrane transport, cell signaling',
          'Cellular Energetics: photosynthesis, cellular respiration, ATP',
          'Heredity: Mendelian genetics, sex-linked traits, gene regulation',
          'Gene Expression: transcription, translation, mutations, biotechnology',
          'Evolution: Hardy-Weinberg, speciation, phylogeny, evidence',
          'Ecology: population dynamics, community interactions, energy flow'),
        mkSubj('AP Computer Science A','💻',S_COMP,
          'Java fundamentals: data types, operators, control flow',
          'Object-Oriented Programming: classes, inheritance, polymorphism',
          'Arrays & ArrayLists: traversal, algorithms, 2D arrays',
          'Recursion: recursive thinking, base cases, applications',
          'Searching & Sorting: linear search, binary search, selection & merge sort'),
        mkSubj('AP Computer Science Principles','💻',S_COMP,
          'Computational Thinking: abstraction, decomposition, algorithms',
          'Data & Analysis: binary, compression, metadata, visualization',
          'The Internet: protocols, security, TCP/IP, HTTP',
          'Impact of Computing: privacy, bias, innovation, accessibility',
          'Programming: Python — variables, functions, lists, APIs'),
        mkSubj('English 9–12','📚',S_EN,
          'Gr.9: Fiction & drama — theme, character, conflict analysis',
          'Gr.10: World literature, comparative analysis, persuasive writing',
          'Gr.11: American literature, rhetorical analysis, synthesis essay',
          'Gr.12: AP Language & Composition — argument, rhetoric, style',
          'AP Literature: close reading poetry, novels, drama for AP exam'),
        mkSubj('AP US History (APUSH)','🏛️',S_HIST,
          'Period 1-2: Pre-Columbian to Colonial America (1491–1754)',
          'Period 3-4: Revolution, Constitution, Early Republic (1754–1848)',
          'Period 5-6: Civil War, Reconstruction, Industrialization (1844–1898)',
          'Period 7-8: Progressive Era, WWI, Depression, WWII (1890–1945)',
          'Period 9: Cold War, Civil Rights, Vietnam, Modern America (1945–present)'),
        mkSubj('AP World History','🌐',S_HIST,
          'Unit 1-2: The Global Tapestry & Networks of Exchange (to 1450)',
          'Unit 3-4: Land-based Empires & Transoceanic Interconnections (1450–1750)',
          'Unit 5-6: Revolutions & Consequences of Industrialization (1750–1900)',
          'Unit 7-9: Global Conflict, Cold War, and Globalization (1900–present)',
          'Historical thinking skills: causation, comparison, continuity & change'),
        mkSubj('AP Macroeconomics / Microeconomics','💰',S_SOC,
          'Micro: supply & demand, elasticity, consumer theory, firm behavior, market structures',
          'Macro: GDP, inflation, unemployment, fiscal policy, monetary policy, trade',
          'Graphs: PPC, AD-AS, Phillips curve, money market, loanable funds market'),
        mkSubj('SAT / ACT Prep','🎯',S_MATH,
          'SAT Math: heart of algebra, problem solving, passport to advanced math',
          'SAT Reading & Writing: evidence-based, rhetorical analysis, grammar',
          'ACT Math: pre-algebra through trigonometry',
          'ACT Science: data interpretation, experimental design',
          'ACT English: mechanics, rhetorical skills, essay'),
      ]},
    }
  },

  /* ═══ IB (International Baccalaureate) ═════════════════════ */
  ib: {
    label:'🌐 IB — International Baccalaureate',
    grades:{
      middle:{ label:'MYP (Ages 11–16)', subjects:[
        mkSubj('Mathematics','🔢',S_MATH,
          'Number: fractions, decimals, percentages, standard form, surds',
          'Algebra: linear & quadratic equations, functions, sequences',
          'Geometry & Trigonometry: Pythagoras, trig ratios, circle theorems',
          'Statistics & Probability: data analysis, distributions',
          'MYP Focus: real-world application, inquiry & problem-solving'),
        mkSubj('Sciences','🔬',S_SCI,
          'Physics: forces, energy, waves, electricity, radioactivity',
          'Chemistry: atomic structure, bonding, reactions, organic intro',
          'Biology: cells, genetics, evolution, ecology, human physiology',
          'MYP Focus: scientific inquiry, lab reports, experimental design'),
        mkSubj('Language & Literature (English)','📚',S_EN,
          'Analysis of literary & non-literary texts',
          'Creative and analytical writing',
          'Grammar, vocabulary & register',
          'Individual oral presentation skills'),
        mkSubj('Individuals & Societies','🌍',S_HIST,
          'History: causes & effects, empires, revolutions, 20th century',
          'Geography: ecosystems, resources, population, development',
          'Economics: supply & demand, economic development, globalisation'),
        mkSubj('Arts','🎨',S_SOC,
          'Visual Arts: design principles, artistic process, cultural context',
          'Music: theory, composition, performance',
          'Drama: techniques, devising, staging, analysis'),
        mkSubj('Design','💻',S_COMP,
          'Design cycle: inquiring, developing, creating, evaluating',
          'Digital design: coding, web, app development',
          'Product design: engineering solutions, prototyping'),
      ]},
      high:{ label:'DP (IB Diploma — Ages 16–19)', subjects:[
        mkSubj('Mathematics: Analysis & Approaches (SL/HL)','🔢',S_MATH,
          'Number & Algebra: sequences, binomial theorem, proofs, complex numbers (HL)',
          'Functions: graphing, transformations, rational functions, inverse',
          'Trigonometry & Geometry: unit circle, identities, vectors',
          'Statistics & Probability: distributions, hypothesis testing, regression',
          "Calculus: limits, differentiation, integration, kinematics, Euler's method (HL)"),
        mkSubj('Mathematics: Applications & Interpretation (SL/HL)','🔢',S_MATH,
          'Number & Algebra: financial maths, amortisation, Voronoi diagrams',
          'Functions: modelling with functions, bivariate statistics',
          'Geometry & Trigonometry: 3D trig, non-right triangles, graph theory',
          "Statistics: normal distribution, Spearman's rank, chi-squared",
          'Calculus: numerical integration, areas, differential equations (HL)'),
        mkSubj('Physics (SL/HL)','⚡',S_PHY,
          "Mechanics: kinematics, Newton's laws, energy, momentum, circular motion",
          'Thermal Physics: kinetic model, gas laws, thermodynamics',
          'Waves: travelling & standing waves, doppler effect, diffraction',
          'Electricity & Magnetism: circuits, fields, induction, AC (HL)',
          'Modern Physics: photoelectric effect, spectra, nuclear, relativity (HL)'),
        mkSubj('Chemistry (SL/HL)','🧪',S_CHEM,
          'Stoichiometry & Atomic Theory: moles, periodicity, electronic configuration',
          'Bonding: ionic, covalent, metallic, VSEPR, polarity',
          "Energetics & Kinetics: Hess's law, activation energy, rate equations (HL)",
          'Equilibrium & Acids/Bases: Ka, Kb, pH calculations, buffer solutions',
          'Organic Chemistry: mechanisms, polymers, spectroscopy (HL)'),
        mkSubj('Biology (SL/HL)','🦠',S_BIO,
          'Cell Biology: ultrastructure, membrane transport, cell respiration, photosynthesis',
          'Molecular Biology: DNA replication, transcription, translation, genetic technology',
          'Genetics: Mendelian, linkage, polygenic, Hardy-Weinberg equilibrium',
          'Ecology: nutrient cycles, population dynamics, conservation, climate change',
          'HL: metabolism, plant biology, animal physiology, evolution in depth'),
        mkSubj('Language A: Language & Literature','📚',S_EN,
          'Paper 1: Guided literary analysis (unseen texts)',
          'Paper 2: Comparative essay on prescribed works',
          'Individual Oral: linking text & global issue',
          'HL Essay: 1200-word formal literary analysis',
          'Works in Translation: cross-cultural literary comparison'),
        mkSubj('History (SL/HL)','🏛️',S_HIST,
          'Paper 1: Source analysis — prescribed subjects (WWII, Cold War, rights)',
          'Paper 2: World history topics (authoritarian states, Cold War)',
          'Paper 3 (HL): Regional option (Europe, Americas, Asia-Pacific)',
          'Internal Assessment: historical investigation'),
        mkSubj('Economics (SL/HL)','💰',S_SOC,
          'Microeconomics: demand, supply, market equilibrium, elasticity, externalities',
          'Macroeconomics: AD-AS model, GDP, inflation, unemployment, policies',
          'International Economics: trade theory, exchange rates, balance of payments',
          'Development Economics: indicators, strategies, aid, sustainability'),
        mkSubj('Computer Science (SL/HL)','💻',S_COMP,
          'Systems in Organisations: project management, change management',
          'Computer Organisation: architecture, memory, logic gates',
          'Networks: internet architecture, protocols, security, distributed systems',
          'Computational Thinking & OOP: Java/Python, algorithms, data structures',
          'HL: databases, modelling & simulation, control systems'),
        mkSubj('Theory of Knowledge (TOK)','💭',S_PHIL,
          'Areas of Knowledge: natural sciences, human sciences, history, arts, mathematics',
          'Ways of Knowing: reason, intuition, language, sense perception, emotion',
          'TOK Exhibition: linking 3 objects to core theme',
          'TOK Essay: 1600-word prescribed title, critical evaluation'),
        mkSubj('Extended Essay (EE)','📝',S_SOC,
          '4000-word independent research essay in a chosen subject',
          'Research question formulation & academic writing',
          'Referencing, bibliography, critical analysis',
          'Reflection: supervised sessions & RPPF form'),
      ]},
    }
  },


  /* ═══ Cambridge A-Levels (AS & A2) ═════════════════════════ */
  cambridge_alevel: {
    label:'🎓 Cambridge A-Levels (AS/A2)',
    grades:{
      high:{ label:'AS & A2 Level (Ages 16–18)', subjects:[
        mkSubj('Mathematics (9709)','🔢',S_MATH,
          'Pure 1: Algebra, quadratics, functions, coordinate geometry, trigonometry, calculus intro',
          'Pure 2: Algebra, logs, trig identities, differentiation, integration, numerical methods',
          'Pure 3 (A2): Further algebra, complex numbers, vectors, diff equations, numerical methods',
          "Mechanics 1: Forces, kinematics, Newton's laws, projectiles, friction",
          'Statistics 1: Data representation, probability, binomial, normal distributions, hypothesis testing',
          'Statistics 2 (A2): Poisson, continuous distributions, inference, chi-squared'),
        mkSubj('Further Mathematics (9231)','🔢',S_MATH,
          'Further Pure 1: Roots of polynomials, matrices (eigenvalues), series, proof by induction',
          'Further Pure 2: Differential equations, complex numbers (De Moivre), polar coordinates',
          'Further Mechanics: Circular motion, centre of mass, moments, energy methods',
          'Further Statistics: Continuous distributions, sampling, regression, χ² tests'),
        mkSubj('Physics (9702)','⚡',S_PHY,
          'AS: Measurement, kinematics, dynamics, forces, work & energy, deformation, waves, superposition',
          'AS: Electric fields, current, resistance, DC circuits, nuclear physics basics',
          'A2: Motion in circle, gravitational fields, ideal gases, thermodynamics, oscillations',
          'A2: Electric & magnetic fields, electromagnetic induction, capacitors, particle physics',
          'A2: Quantum physics, nuclear energy, radioactive decay, medical imaging'),
        mkSubj('Chemistry (9701)','🧪',S_CHEM,
          'AS: Atomic structure, bonding, energetics, kinetics, equilibrium, redox, organic intro',
          'AS: Electronegativity, periodicity, Group II & VII chemistry, introduction to organic mechanisms',
          'A2: Lattice energy (Born-Haber), entropy, free energy, electrode potentials, Nernst',
          'A2: Reaction kinetics (rate equations), acid-base equilibria (Ka, Kw, buffers)',
          'A2: Organic chemistry — arenes, carbonyl compounds, carboxylic acids, amines, polymers, spectroscopy'),
        mkSubj('Biology (9700)','🦠',S_BIO,
          'AS: Cell structure, biological molecules, enzymes, cell transport, cell division',
          'AS: DNA structure & replication, gene expression, transport in plants & animals',
          'A2: Respiration (glycolysis, Krebs, oxidative phosphorylation)',
          'A2: Photosynthesis (light-dependent & light-independent reactions)',
          'A2: Homeostasis, nervous system, immune response, gene technology, ecology, evolution'),
        mkSubj('Economics (9708)','💰',S_SOC,
          'AS Micro: Scarcity, PPC, demand & supply, elasticity, market failure, government intervention',
          'AS Macro: National income, AD-AS, inflation, unemployment, balance of payments',
          'A2 Micro: Theory of firm (costs, revenue), market structures (perfect, monopoly, oligopoly)',
          'A2 Macro: Economic growth, development, exchange rates, fiscal & monetary policy',
          'Evaluation: data response & essay questions'),
        mkSubj('Computer Science (9618)','💻',S_COMP,
          'AS: Data types & structures, algorithms, programming (Python/pseudocode), Boolean algebra',
          'AS: Logic gates, hardware, networking, internet, security',
          'A2: Advanced algorithms — sorting, searching, recursion, Big O notation',
          'A2: OOP — classes, inheritance, polymorphism; databases, SQL, relational model',
          'A2: AI concepts, expert systems, computational thinking, project development'),
        mkSubj('Accounting (9706)','📊',S_SOC,
          'AS: Financial accounting — double entry, trial balance, final accounts (sole trader & partnership)',
          'AS: Analysis & interpretation of accounts — ratios, limitations',
          'A2: Limited companies — share capital, debentures, published accounts',
          'A2: Management accounting — costing, budgeting, investment appraisal'),
        mkSubj('Business (9609)','📊',S_SOC,
          'AS: Business activity, stakeholders, marketing, finance, operations, HR',
          'A2: Strategic management, change management, global business, ethics',
          'Case study analysis, data response & evaluative essays'),
        mkSubj('Psychology (9990)','💭',S_PHIL,
          'AS: Research methods, cognitive psychology (memory), social psychology (conformity)',
          'AS: Learning theories, biological psychology (stress)',
          'A2: Clinical psychology, criminological psychology, sport psychology',
          'A2: Health psychology, consumer psychology, research design critique'),
        mkSubj('Sociology (9699)','🌍',S_SOC,
          'AS: Socialisation, culture, identity; family; education; research methods',
          'A2: Social stratification (class, gender, ethnicity), global development, media, religion'),
        mkSubj('History (9489)','🏛️',S_HIST,
          'Options: European, American, African, Asian history',
          'Document analysis: source evaluation, cross-referencing, reliability',
          'Essay writing: causation, consequence, change, continuity'),
        mkSubj('Literature in English (9695)','📚',S_EN,
          'Poetry: pre-20th century & contemporary — unseen & prescribed',
          'Prose: novel or short stories — character, narrative, style',
          'Drama: Shakespeare & modern plays',
          'Comparative & creative critical essays'),
      ]},
    }
  },

  /* ═══ Edexcel / Pearson (GCSE + A-Level + BTEC) ═══════════ */
  edexcel: {
    label:'📘 Edexcel / Pearson',
    grades:{
      middle:{ label:'GCSE (Ages 14–16)', subjects:[
        mkSubj('Mathematics (1MA1)','🔢',S_MATH,
          'Foundation/Higher: Number — fractions, surds, standard form, bounds, percentage',
          'Algebra: expressions, equations, inequalities, quadratics, simultaneous, sequences',
          'Ratio, Proportion & Rates of Change: direct/inverse proportion, speed, density',
          'Geometry: angles, circles, Pythagoras, trigonometry, transformations, vectors',
          'Probability & Statistics: Venn diagrams, tree diagrams, cumulative frequency, histograms'),
        mkSubj('Physics (1PH0)','⚡',S_PHY,
          "Forces: Newton's laws, momentum, stopping distances, moments",
          'Energy: stores & transfers, efficiency, power, thermal energy',
          'Waves: transverse/longitudinal, EM spectrum, reflection, refraction, sound',
          'Electricity: circuits, resistance (I-V graphs), power, domestic electricity',
          'Magnetism & Electromagnetism: motors, generators, transformers',
          'Particle Physics: atomic structure, radioactivity, nuclear fission/fusion, half-life'),
        mkSubj('Chemistry (1CH0)','🧪',S_CHEM,
          'Atomic Structure & Periodic Table: history, electron configuration, trends',
          'Bonding: ionic, covalent, metallic, structures & properties',
          'Quantitative Chemistry: moles, empirical formula, concentration calculations',
          'Chemical Changes: reactivity series, extraction, electrolysis, energy changes',
          'Rates & Equilibrium: collision theory, Le Chatelier, Haber & Contact processes',
          'Organic Chemistry: alkanes, alkenes, polymers, alcohols, carboxylic acids'),
        mkSubj('Biology (1BI0)','🦠',S_BIO,
          'Cell Biology: eukaryotic/prokaryotic, microscopy, cell division (mitosis & meiosis)',
          'Transport in Organisms: heart & blood, transpiration, translocation',
          'Health & Disease: communicable & non-communicable diseases, immune system, drugs',
          'Bioenergetics: photosynthesis (factors, uses), aerobic & anaerobic respiration',
          'Homeostasis: thermoregulation, blood glucose (diabetes), kidney, hormones',
          'Inheritance & Evolution: DNA, genetic crosses, natural selection, speciation'),
        mkSubj('English Language (1EN0)','📚',S_EN,
          'Paper 1: Fiction reading & creative writing',
          'Paper 2: Non-fiction reading & transactional writing',
          'Language analysis: purpose, audience, tone, rhetorical devices',
          'Accurate and effective writing: structure, grammar, vocabulary'),
        mkSubj('English Literature (1ET0)','📚',S_EN,
          'Paper 1: Shakespeare (Macbeth/Romeo & Juliet/Merchant of Venice)',
          'Paper 1: 19th Century Novel (A Christmas Carol/Jekyll & Hyde/Great Expectations)',
          'Paper 2: Modern Prose/Drama (An Inspector Calls/Blood Brothers/Lord of the Flies)',
          'Paper 2: Poetry Anthology — Power & Conflict or Love & Relationships',
          'Unseen Poetry: analysis of language, structure, form'),
        mkSubj('Computer Science (1CP2)','💻',S_COMP,
          'Computational Thinking: decomposition, abstraction, algorithms, flowcharts',
          'Data & Data Representation: binary, hexadecimal, ASCII, compression',
          'Computer Systems: CPU (fetch-decode-execute), memory, storage, logic gates',
          'Networks & Security: topologies, protocols, threats, firewalls, encryption',
          'Programming & Data Structures: Python, arrays, files, OOP basics'),
        mkSubj('Business (1BS0)','📊',S_SOC,
          'Theme 1: Investigating Small Business — enterprise, market research, finance, operations',
          'Theme 2: Building a Business — growing business, marketing, global trade, ethics'),
        mkSubj('Economics (1EC0)','💰',S_SOC,
          'Theme 1: Introduction to Markets — supply, demand, price mechanism, market failure',
          'Theme 2: UK Economy — macroeconomic indicators, government policies, business cycle'),
        mkSubj('History (1HI0)','🏛️',S_HIST,
          'Paper 1: Crime & Punishment in Britain c.1000–present + Whitechapel case study',
          'Paper 2: Options — Medicine in Britain / Anglo-Saxon & Norman England / Superpower relations',
          'Paper 3: Modern Depth Studies — Weimar & Nazi Germany / Cold War / USA civil rights'),
        mkSubj('Geography (1GB0)','🗺️',S_GEO,
          'Paper 1: Physical Geography — tectonic hazards, coasts, weather & climate, ecosystems',
          'Paper 2: Human Geography — urban issues, developing world, resource management',
          'Paper 3: Fieldwork & geographical skills'),
      ]},
      high:{ label:'A-Level (Ages 16–18)', subjects:[
        mkSubj('Mathematics (8MA0/9MA0)','🔢',S_MATH,
          'Pure: Algebra & functions, coordinate geometry, sequences, trigonometry, exponentials & logs',
          'Pure: Differentiation (chain/product/quotient), integration (by parts, substitution)',
          'Pure: Numerical methods, vectors in 2D & 3D, proof',
          'Statistics: Data representation, probability, binomial & normal distributions, hypothesis testing',
          "Mechanics: Kinematics, Newton's laws, connected particles, moments"),
        mkSubj('Further Mathematics (8FM0/9FM0)','🔢',S_MATH,
          'Core Pure: Complex numbers, argand diagrams, matrices, proof by induction, series',
          'Core Pure 2: Volumes of revolution, polar coordinates, hyperbolic functions, differential equations',
          'Decision Maths: Algorithms, graphs, networks, linear programming, game theory',
          'Further Statistics: Continuous distributions, hypothesis testing, regression'),
        mkSubj('Physics (8PH0/9PH0)','⚡',S_PHY,
          "Mechanics: Kinematics, Newton's laws, energy, power, materials",
          'Waves & Oscillations: Superposition, standing waves, SHM, resonance',
          "Electricity: Kirchhoff's laws, EMF, capacitance, charge/discharge",
          'Fields: Gravitational, electric & magnetic fields, induction, AC circuits',
          'Nuclear & Particle Physics: Radioactivity, binding energy, particle accelerators, Standard Model'),
        mkSubj('Chemistry (8CH0/9CH0)','🧪',S_CHEM,
          'Physical: Atomic structure, bonding, energetics, kinetics (rate equation), equilibria',
          'Physical A2: Electrode potentials, acids-bases (Ka, buffers), lattice energy, entropy',
          'Inorganic: Periodicity, Group II & VII, transition metals (colour, complex ions, catalysis)',
          'Organic: Isomerism, reactions of all functional groups, mechanisms, spectroscopy (NMR, IR, MS)',
          'Practical Chemistry: Assessed practical skills across all topics'),
        mkSubj('Biology (8BI0/9BI0)','🦠',S_BIO,
          'Biological Molecules & Cells: structure, enzymes, membranes, cell division',
          'Genetics & Gene Expression: DNA replication, transcription, translation, regulation, epigenetics',
          'Physiology: Gas exchange, digestion, transport, nerves, hormones, immunity',
          'Ecology & Evolution: Population dynamics, energy transfer, succession, speciation',
          'Practical Skills: Microscopy, dissections, chromatography, colorimetry'),
        mkSubj('Economics A (8EC0/9EC0)','💰',S_SOC,
          'Theme 1: Introduction to markets & market failure',
          'Theme 2: UK Economy — macro performance, policies, globalisation',
          'Theme 3: Business behaviour & labour markets — market structures, game theory',
          'Theme 4: Global Economy — development, trade, exchange rates, financial markets'),
        mkSubj('Business (8BS0/9BS0)','📊',S_SOC,
          'Theme 1: Marketing & People — strategy, HR, leadership, decision-making tools',
          'Theme 2: Managing Business Activities — finance, operations, data analysis',
          'Theme 3: Business Decisions & Strategy — corporate strategy, M&A, global business',
          'Theme 4: Global Business Environment — political, economic, social, ethical, technological'),
        mkSubj('Computer Science (8CP0/9CP0)','💻',S_COMP,
          'Programming: Python OOP, recursion, data structures, searching & sorting, Big O',
          'Computational Thinking: Boolean algebra, logic circuits, finite state machines',
          'Data: Representation, structures (stacks, queues, trees, graphs, hash tables)',
          'Computer Systems: Architecture, assembly language, OS, memory management',
          'Databases & Networks: SQL, relational model, client-server, protocols, security'),
      ]},
    }
  },

  /* ═══ AQA (Assessment and Qualifications Alliance) ══════════ */
  aqa: {
    label:'📗 AQA (UK)',
    grades:{
      middle:{ label:'GCSE (Ages 14–16)', subjects:[
        mkSubj('Mathematics (8300)','🔢',S_MATH,
          'Foundation/Higher: Number, algebra, ratio, geometry, probability & statistics',
          'Higher only: Surds, quadratic sequences, circle theorems, vectors, histograms',
          '3 Papers: Non-calculator + 2 calculator papers'),
        mkSubj('Physics (8463)','⚡',S_PHY,
          'Energy: stores, transfers, efficiency, power, thermal insulation',
          'Electricity: circuits, charge, voltage, resistance, power, mains electricity',
          'Particle Model: density, pressure, changes of state, particle model',
          'Atomic Structure: atomic model, radioactivity, nuclear decay, hazards, half-life',
          'Forces, Waves, Magnetism, Space Physics'),
        mkSubj('Chemistry (8462)','🧪',S_CHEM,
          'Atomic Structure & Periodic Table: atoms, elements, compounds, mixtures',
          'Bonding: ionic, covalent, metallic — structures and properties',
          'Quantitative Chemistry: moles, concentrations, percentage yield, atom economy',
          'Rates & Energy: activation energy, catalysts, exo/endothermic reactions',
          'Organic & Chemical Analysis: crude oil, hydrocarbons, polymers, chromatography'),
        mkSubj('Biology (8461)','🦠',S_BIO,
          'Cell Biology: structure, transport, division',
          'Organisation: digestive system, blood, heart, transpiration',
          'Infection & Response: pathogens, defence, drugs, vaccines',
          'Bioenergetics: photosynthesis, respiration (aerobic & anaerobic)',
          'Homeostasis: nervous system, hormones, reproduction, evolution & inheritance'),
        mkSubj('English Language (8700)','📚',S_EN,
          'Paper 1: Explorations in Creative Reading & Writing',
          "Paper 2: Writers' Viewpoints & Perspectives",
          'Spoken Language endorsement'),
        mkSubj('English Literature (8702)','📚',S_EN,
          'Paper 1: Shakespeare + 19th Century Novel',
          'Paper 2: Modern Texts + Poetry anthology (Love & Relationships / Power & Conflict)',
          'Unseen Poetry comparison'),
        mkSubj('History (8145)','🏛️',S_HIST,
          'Period Studies: Norman England, Elizabethan England, Migration c.1250–present',
          'Wider World Depth: Germany 1890–1945, Conflict & Tension 1894–1918 or 1918–1939',
          'Thematic Study & British Depth: Power in Medieval England, Medicine c.500–present'),
        mkSubj('Geography (8035)','🗺️',S_GEO,
          'Paper 1: Living with the Physical Environment — natural hazards, ecosystems, physical landscapes',
          'Paper 2: Challenges in the Human Environment — urban issues, economic world, resource management',
          'Paper 3: Geographical Applications — issue evaluation, fieldwork, skills'),
        mkSubj('Computer Science (8525)','💻',S_COMP,
          'Computational Thinking & Programming: algorithms, Python, data structures',
          'Computer Systems: hardware, software, data representation, networks, cybersecurity',
          'Programming Project: substantial program in chosen language'),
      ]},
      high:{ label:'A-Level (Ages 16–18)', subjects:[
        mkSubj('Mathematics (7357)','🔢',S_MATH,
          'Pure: Algebra, functions, coordinate geometry, sequences, trigonometry',
          'Pure: Calculus — differentiation (all rules), integration (all techniques), numerical methods',
          'Statistics: Probability, statistical distributions (binomial & normal), hypothesis testing, regression',
          "Mechanics: Kinematics, Newton's laws, moments, connected particles"),
        mkSubj('Physics (7408)','⚡',S_PHY,
          'Measurements, Mechanics, Materials, Waves, Electricity',
          'Further Mechanics, Thermal, Fields (gravitational, electric, magnetic)',
          'Nuclear, Radioactivity, Medical Physics (options), Turning Points (option)'),
        mkSubj('Chemistry (7405)','🧪',S_CHEM,
          'Physical: Atomic structure, bonding, kinetics, equilibria, thermodynamics, redox',
          'Inorganic: Periodicity, Groups II & VII, transition metals',
          'Organic: All functional groups, mechanisms, spectroscopy (NMR, IR, MS), synthesis routes'),
        mkSubj('Biology (7402)','🦠',S_BIO,
          'Biological Molecules, Cells, Exchange & Transport, Genetics & Evolution',
          'Energy Transfers, Responses, Genetics & Ecosystems, Practical Skills'),
        mkSubj('Psychology (7182)','💭',S_PHIL,
          'Paper 1: Social influence, memory, attachment, psychopathology, approaches',
          'Paper 2: Biopsychology, research methods, forensic, relationships, schizophrenia',
          'Paper 3: Issues & debates, gender, cognition, stress, addiction or aggression'),
        mkSubj('Sociology (7192)','🌍',S_SOC,
          'Education, Research Methods, Families & Households',
          'Beliefs in Society, Global Development or Media, Crime & Deviance'),
        mkSubj('Economics (7136)','💰',S_SOC,
          'Microeconomics: markets, failure, firm behaviour',
          'Macroeconomics: performance, policy, global economy'),
      ]},
    }
  },

  /* ═══ OCR (Oxford Cambridge & RSA) ════════════════════════ */
  ocr: {
    label:'📙 OCR (Oxford, Cambridge & RSA)',
    grades:{
      middle:{ label:'GCSE (Ages 14–16)', subjects:[
        mkSubj('Mathematics A (J560) / B (J567)','🔢',S_MATH,
          'Number, Algebra, Ratio & Proportion, Geometry, Probability & Statistics',
          'Problem-solving focus with real-world contexts'),
        mkSubj('Physics A (J249)','⚡',S_PHY,
          'Matter, Forces & Motion, Electricity, Waves, Radioactivity, Energy resources'),
        mkSubj('Chemistry A (J248)','🧪',S_CHEM,
          'Particles, Elements & Reactions, Acids, Electrolysis, Organic Chemistry, Chemical Analysis'),
        mkSubj('Biology A (J247)','🦠',S_BIO,
          'Cell biology, Organisms, Ecology & Evolution, Biological processes'),
        mkSubj('Computer Science (J277)','💻',S_COMP,
          'Computer Systems, Computational Thinking & Programming',
          'Python project: design, write, test & evaluate a program'),
        mkSubj('History A (J410)','🏛️',S_HIST,
          'Thematic study: Power, Migration, or Environment',
          'British depth study, World depth study, Period study'),
        mkSubj('Geography A (J383)','🗺️',S_GEO,
          'Our Natural World, People & Society, Geographical Exploration'),
        mkSubj('English Language (J351)','📚',S_EN,
          'Reading fiction & non-fiction, Analysing language & structure',
          'Writing: original, transactional, communicative'),
        mkSubj('English Literature (J352)','📚',S_EN,
          'Shakespeare, Post-1914 literature, Poetry (19th century & contemporary)'),
      ]},
      high:{ label:'A-Level (Ages 16–18)', subjects:[
        mkSubj('Mathematics A (H240)','🔢',S_MATH,
          'Pure: Algebra, proof, coordinate geometry, trigonometry, calculus (all techniques)',
          'Statistics: Data analysis, probability, binomial & normal distributions, hypothesis testing',
          "Mechanics: Kinematics, Newton's laws, moments, vectors"),
        mkSubj('Physics A (H557)','⚡',S_PHY,
          'Foundations, Forces & Motion, Electrons, Waves, Quantum & Nuclear, Options'),
        mkSubj('Chemistry A (H432)','🧪',S_CHEM,
          'Physical, Inorganic & Organic Chemistry across 3 modules',
          'Practical endorsement: 12 required practical activities'),
        mkSubj('Biology A (H420)','🦠',S_BIO,
          'Cellular processes, Exchange & transport, Biodiversity, Genetics, Ecosystems'),
        mkSubj('Computer Science (H446)','💻',S_COMP,
          'Computer Systems, Algorithms & Programming, Advanced Theory',
          'Programming Project: major independent coding project'),
        mkSubj('Psychology (H567)','💭',S_PHIL,
          'Research methods, Core studies, Applied psychology options'),
        mkSubj('Economics (H460)','💰',S_SOC,
          'Microeconomics: markets, failure, government intervention',
          'Macroeconomics: performance, trade, development, financial markets'),
      ]},
    }
  },

  /* ═══ CBSE (India — Central Board of Secondary Education) ══ */
  cbse: {
    label:'🇮🇳 CBSE (India)',
    grades:{
      middle:{ label:'Class 6–10', subjects:[
        mkSubj('Mathematics','🔢',S_MATH,
          'Class 6: Integers, fractions, decimals, basic geometry, mensuration',
          'Class 7: Rational numbers, algebraic expressions, triangles, data handling',
          'Class 8: Linear equations, powers, quadrilaterals, factorisation, graphs',
          'Class 9: Number systems, polynomials, coordinate geometry, triangles, surface area & volume, statistics',
          'Class 10: Real numbers, polynomials, quadratics, AP, triangles, circles, trigonometry, statistics, probability'),
        mkSubj('Science','🔬',S_SCI,
          'Class 6-8: Materials, living organisms, motion, natural phenomena, resources',
          'Class 9: Matter, atoms & molecules, structure of atom, cell biology, gravitation, sound, work & energy',
          'Class 10: Chemical reactions, acids/bases/salts, metals & nonmetals, carbon compounds, life processes, heredity, light, electricity, magnetic effects'),
        mkSubj('Social Science','🌍',S_HIST,
          'History: French Revolution, Nationalism in India, Pastoralists, Forests, Industries, Print Culture',
          'Geography: Resources, Agriculture, Minerals & Energy, Manufacturing, Transport & Communication',
          'Political Science: Democracy, Electoral Politics, Working of Institutions, Rights',
          'Economics: Food Security, Poverty, People as Resource, Development'),
        mkSubj('English','📚',S_EN,
          'Literature: First Flight, Footprints Without Feet (Class 10)',
          'Grammar: Tenses, modals, clauses, passive voice, reported speech',
          'Writing: Letter, essay, notice, article, paragraph writing',
          'Reading Comprehension: unseen passages'),
        mkSubj('Hindi','📝',S_AR,
          'व्याकरण: संज्ञा, सर्वनाम, क्रिया, काल, वाक्य',
          'साहित्य: गद्य, पद्य, कहानी, नाटक',
          'लेखन: निबंध, पत्र, अनुच्छेद लेखन'),
        mkSubj('Sanskrit','📿',S_ISL,
          'Vocabulary, Grammar (विभक्ति, धातु, समास, संधि)',
          'Prose, Poetry & Translation passages'),
      ]},
      high:{ label:'Class 11–12 (Science & Commerce)', subjects:[
        mkSubj('Mathematics (041)','🔢',S_MATH,
          'Class 11: Sets, functions, trigonometry, complex numbers, sequences, straight lines, conic sections, statistics, probability',
          'Class 12: Relations & functions, inverse trig, matrices & determinants, continuity & differentiability',
          'Class 12: Applications of derivatives (maxima/minima, rate of change, tangents)',
          'Class 12: Integrals (definite & indefinite), differential equations',
          'Class 12: Vectors, 3D geometry, linear programming, probability (Bayes theorem)'),
        mkSubj('Physics (042)','⚡',S_PHY,
          'Class 11: Physical world, kinematics, laws of motion, work & energy, rotational motion, gravitation, thermodynamics, oscillations, waves',
          'Class 12: Electrostatics, current electricity, magnetic effects, electromagnetic induction, AC',
          'Class 12: EM waves, optics (ray & wave), dual nature, atoms & nuclei, semiconductors, communication'),
        mkSubj('Chemistry (043)','🧪',S_CHEM,
          'Class 11: Atomic structure, periodic table, chemical bonding, thermodynamics, equilibrium, redox, hydrogen, s-block, hydrocarbons',
          'Class 12: Solutions, electrochemistry, chemical kinetics, surface chemistry, p-block, d-f block elements',
          'Class 12: Coordination compounds, haloalkanes, alcohols, aldehydes & ketones, carboxylic acids, amines, biomolecules, polymers'),
        mkSubj('Biology (044)','🦠',S_BIO,
          'Class 11: Cell biology, biomolecules, cell cycle, plant physiology, human physiology',
          'Class 12: Reproduction, genetics & evolution (Mendel, DNA, molecular basis)',
          'Class 12: Biology in human welfare (health, microbes, biotechnology)',
          'Class 12: Ecology (organisms & populations, ecosystem, biodiversity, environmental issues)'),
        mkSubj('Informatics Practices / Computer Science (065/083)','💻',S_COMP,
          'Class 11: Introduction to Python, data types, control flow, functions, strings',
          'Class 11: Lists, dictionaries, file handling, MySQL basics',
          'Class 12: Advanced Python, data structures, database queries, networking concepts',
          'Class 12: Data handling with Pandas, matplotlib, societal impacts'),
        mkSubj('Accountancy (055)','📊',S_SOC,
          'Class 11: Introduction, journal, ledger, trial balance, financial statements',
          'Class 12: Partnership accounts, company accounts, cash flow statement, analysis of financial statements'),
        mkSubj('Business Studies (054)','📊',S_SOC,
          'Class 11: Nature of business, forms of business, public enterprises, business services, social responsibility',
          'Class 12: Management, planning, organising, staffing, directing, controlling, marketing, consumer protection, financial management'),
        mkSubj('Economics (030)','💰',S_SOC,
          'Class 11 Micro: Introduction, consumer theory, production & costs, market forms',
          'Class 11 Statistics: Collection, organisation, presentation, measures of central tendency & dispersion, correlation',
          'Class 12 Macro: National income, money & banking, government budget, balance of payments, determination of income & employment'),
        mkSubj('English Core (301)','📚',S_EN,
          'Reading: unseen passages (factual, discursive, literary)',
          'Writing: notices, posters, letters, articles, speech, report writing',
          'Literature: Flamingo, Vistas (Class 12 — The Last Lesson, Lost Spring, poetry, short stories)'),
      ]},
    }
  },

  /* ═══ ICSE / ISC (India — CISCE) ═══════════════════════════ */
  icse: {
    label:'🇮🇳 ICSE / ISC (CISCE)',
    grades:{
      middle:{ label:'ICSE Class 9–10', subjects:[
        mkSubj('Mathematics','🔢',S_MATH,
          'Class 9: Rational numbers, irrational numbers, compound interest, expansions, factorisation, quadratic equations, indices, logarithms',
          'Class 9: Triangles, mid-point theorem, areas, Pythagoras, statistics, mean/median/mode',
          'Class 10: GST & banking, linear inequations, quadratic equations, ratio & proportion',
          'Class 10: Matrices, arithmetic progression, reflection, loci, circles, constructions, trigonometry, statistics'),
        mkSubj('Physics','⚡',S_PHY,
          'Class 9: Measurements, motion, laws of motion, fluids, heat & energy, light, sound, electricity',
          'Class 10: Force, work & energy, machines, refraction of light, spectrum, sound, electricity & magnetism, modern physics'),
        mkSubj('Chemistry','🧪',S_CHEM,
          'Class 9: Matter, elements, compounds, atomic structure, chemical bonding, acids/bases/salts',
          'Class 10: Periodic table, chemical bonding, electrolysis, metallurgy, organic chemistry basics'),
        mkSubj('Biology','🦠',S_BIO,
          'Class 9: Cell biology, plant tissues, animal tissues, chloroplasts, mitosis',
          'Class 10: Nutrition, transpiration, photosynthesis, excretion, nervous system, sense organs, reproduction, genetics, population'),
        mkSubj('English Language','📚',S_EN,
          'Paper 1: Essay & composition writing (formal & creative)',
          'Paper 2: Comprehension, note-making, directed writing, grammar'),
        mkSubj('English Literature','📚',S_EN,
          'Drama: Shakespeare play',
          'Prose: Collection of short stories or novel',
          'Poetry: Prescribed anthology (appreciation & analysis)'),
        mkSubj('History & Civics','🏛️',S_HIST,
          'History: Medieval India, Modern India, Rise of British power, National movement, World wars, Cold War',
          'Civics: Indian Constitution, Parliament, President, PM, Judiciary, Local government'),
        mkSubj('Geography','🗺️',S_GEO,
          'Class 9: Maps, climate, natural vegetation, soils',
          'Class 10: Agriculture, industries, transport, population, water resources'),
        mkSubj('Computer Applications (Code 165)','💻',S_COMP,
          'Class 9-10: Hardware & software, algorithms, flowcharts, Java programming (BlueJ)',
          'OOP concepts: classes, objects, methods, constructors, arrays, strings'),
      ]},
      high:{ label:'ISC Class 11–12', subjects:[
        mkSubj('Mathematics','🔢',S_MATH,
          'Class 11: Sets, relations, functions, trigonometry, complex numbers, quadratics, sequences, permutations, binomial, statistics',
          'Class 12: Determinants & matrices, Boolean algebra, conics, differential calculus',
          'Class 12: Integral calculus, differential equations, probability, vectors & 3D geometry'),
        mkSubj('Physics','⚡',S_PHY,
          'Class 11: Units, motion, laws of motion, work, thermal properties, oscillations, waves',
          'Class 12: Electrostatics, current, magnetism, EM induction, AC, optics, modern physics'),
        mkSubj('Chemistry','🧪',S_CHEM,
          'Class 11: Atomic structure, periodic table, chemical bonding, states of matter, thermodynamics, equilibrium, redox, organic basics',
          'Class 12: Solutions, electrochemistry, kinetics, d-f block, coordination, polymers, biomolecules, organic reactions'),
        mkSubj('Biology','🦠',S_BIO,
          'Class 11: Diversity of life, structural organisation, cell biology, plant physiology, human physiology',
          'Class 12: Reproduction, genetics, molecular biology, evolution, human health, biotechnology, ecology'),
        mkSubj('Computer Science (868)','💻',S_COMP,
          'Class 11-12: Java OOP — classes, inheritance, polymorphism, interfaces, exception handling',
          'Data structures: arrays, linked lists, stacks, queues, trees, sorting & searching',
          'SQL: DDL, DML, queries; networking, Boolean algebra, flip-flops'),
        mkSubj('Economics (861)','💰',S_SOC,
          'Micro: Demand, supply, consumer theory, production, costs, market structures',
          'Macro: National income, money, banking, inflation, balance of payments, government budget'),
        mkSubj('Commerce (854)','📊',S_SOC,
          'Business organisation, capital market, marketing, banking, insurance, warehousing, transport'),
        mkSubj('Accounts (855)','📊',S_SOC,
          'Financial accounting: double entry, partnership, company accounts',
          'Analysis: ratio analysis, cash flow, fund flow statements'),
      ]},
    }
  },

  /* ═══ French Baccalaureate (Bac Général) ════════════════════ */
  french_bac: {
    label:'🇫🇷 Baccalauréat Français',
    grades:{
      middle:{ label:'Collège (6ème–3ème)', subjects:[
        mkSubj('Mathématiques','🔢',S_MATH,
          '6ème: Nombres entiers, fractions, géométrie plane, aires',
          '5ème: Nombres rationnels, calcul littéral, statistiques, Pythagore',
          '4ème: Puissances, développement-factorisation, équations du 1er degré, trigonométrie',
          "3ème: Calcul algébrique, systèmes d'équations, fonctions, théorème de Thalès, probabilités"),
        mkSubj('Sciences Physiques','⚡',S_PHY,
          'Physique: Mouvement, forces, pression, lumière, électricité, énergie',
          'Chimie: Atomes, molécules, réactions chimiques, acides-bases, matière'),
        mkSubj('Sciences de la Vie et de la Terre (SVT)','🦠',S_BIO,
          'La Terre et les êtres vivants: cellule, reproduction, évolution',
          'Corps humain: nutrition, digestion, respiration, système nerveux, génétique'),
        mkSubj('Français','📚',S_EN,
          'Grammaire, conjugaison, orthographe, vocabulaire',
          'Lecture de textes littéraires (roman, poésie, théâtre)',
          'Rédaction: récit, description, argumentation, commentaire'),
        mkSubj('Histoire-Géographie','🌍',S_HIST,
          'Histoire: De la Préhistoire à nos jours — grandes périodes historiques',
          'Géographie: Espaces et sociétés, mondialisation, développement durable'),
        mkSubj('Langues Vivantes','🗣️',S_EN,
          'LV1 (Anglais): Grammar, oral & written comprehension, expression',
          'LV2: Espagnol / Allemand / Arabe — compréhension & expression'),
      ]},
      high:{ label:'Lycée & Bac Général (1ère & Terminale)', subjects:[
        mkSubj('Mathématiques','🔢',S_MATH,
          'Seconde: Fonctions, équations-inéquations, statistiques, probabilités, géométrie',
          '1ère Spé: Suites, dérivation (règles, applications), fonctions (étude complète), trigonométrie',
          'Terminale Spé: Limite, continuité, intégration, probabilités (loi normale), matrices, complexes',
          "Option Complémentaire: Algèbre linéaire, géométrie dans l'espace, arithmétique, dénombrement"),
        mkSubj('Physique-Chimie','⚡',S_PHY,
          'Terminale: Constitution & transformations de la matière, mouvement & interactions',
          'Ondes & signaux: lumière, son, propagation',
          'Chimie: réactions acide-base, oxydoréduction, énergie des réactions',
          'TS: Physique quantique, relativité restreinte, nucléaire (option)'),
        mkSubj('Sciences de la Vie et de la Terre','🦠',S_BIO,
          "Terminale: Expression génétique, transmission de l'information génétique",
          'Physiologie humaine: système nerveux, immunologie, rein, reproduction',
          "Évolution, biodiversité, interactions dans l'écosystème",
          'Géologie: tectonique des plaques, énergie interne, ressources'),
        mkSubj('Français (1ère)','📚',S_EN,
          'Écrit: commentaire de texte, dissertation (littéraire)',
          'Oral: Grand oral sur 2 œuvres & parcours associés',
          'Grammaire de texte, stylistique, versification'),
        mkSubj('Philosophie (Terminale)','💭',S_PHIL,
          'Notions: conscience, inconscient, perception, le temps, la raison, la vérité',
          "La liberté, le bonheur, la justice, l'État, la morale, la religion",
          'Méthodologie: dissertation & commentaire de texte philosophique'),
        mkSubj('Histoire-Géographie, Géopolitique & Sciences Po','🌍',S_HIST,
          '1ère: Exploration & empire, démocraties menacées, mondialisation depuis 1991',
          'Terminale: Puissances & conflits, gouvernance mondiale, enjeux géopolitiques',
          'Rédaction: composition & étude critique de document(s)'),
        mkSubj('Sciences Économiques & Sociales (SES)','💰',S_SOC,
          '1ère: Marchés et prix, entreprises, travail & emploi, État & marchés, stratification sociale',
          'Terminale: Croissance & fluctuations, mondialisation, démocratie, justice sociale, liens sociaux'),
        mkSubj('Numérique & Sciences Informatiques (NSI)','💻',S_COMP,
          '1ère: Représentation des données, traitement de données, interactions homme-machine',
          '1ère: Architectures matérielles, langages (Python), algorithmique',
          'Terminale: Structures de données, bases de données (SQL), algorithmique avancée',
          'Terminale: Langages (récursivité, paradigmes), systèmes sur puce, cryptographie'),
        mkSubj('Grand Oral (Terminale)','🗣️',S_EN,
          'Présentation orale de 20 min sur une question interdisciplinaire',
          'Liée aux 2 spécialités choisies',
          'Préparation: argumentation, plan, capacité à répondre aux questions'),
      ]},
    }
  },

  /* ═══ Australian Curriculum (VCE / HSC / QCE) ══════════════ */
  australian: {
    label:'🇦🇺 Australian Curriculum (VCE/HSC/QCE)',
    grades:{
      middle:{ label:'Years 7–10', subjects:[
        mkSubj('Mathematics','🔢',S_MATH,
          'Year 7: Integers, fractions, algebra intro, geometry, statistics & probability',
          'Year 8: Real numbers, linear equations, congruence, Pythagoras, data',
          'Year 9: Financial maths, simultaneous equations, trigonometry, statistics',
          'Year 10: Functions, quadratics, trigonometry (all triangles), circle geometry, probability'),
        mkSubj('Science','🔬',S_SCI,
          'Year 7-8: Mixing & separating, cells, forces, Earth & space, ecosystems',
          'Year 9-10: Atomic structure, chemical reactions, motion & energy, evolution, wave properties'),
        mkSubj('English','📚',S_EN,
          'Language: grammar, vocabulary, multimodal texts',
          'Literature: novels, poetry, drama, short stories — analysis & response',
          'Literacy: persuasive & creative writing, research & note-taking'),
        mkSubj('History','🏛️',S_HIST,
          'Year 7-8: Ancient to Medieval world — Egypt, Greece, Rome, Medieval Europe',
          'Year 9-10: Making of the Modern World — Industrial Revolution, WWI, WWII, Cold War, Australia'),
        mkSubj('Geography','🗺️',S_GEO,
          'Year 7-8: Water, landscapes, landforms, place & liveability',
          'Year 9-10: Biomes, environmental change, geographies of inequality & human wellbeing'),
      ]},
      high:{ label:'Senior Secondary — VCE (Vic) / HSC (NSW) / QCE (Qld)', subjects:[
        mkSubj('Mathematical Methods (VCE) / Mathematics Advanced (HSC)','🔢',S_MATH,
          'Functions: polynomial, exponential, log, trigonometric — graphing & transformations',
          'Calculus: differentiation (chain, product, quotient), integration, applications',
          'Probability & Statistics: discrete & continuous distributions, sampling, hypothesis testing',
          'Financial Maths (HSC): sequences, compound interest, annuities, loans'),
        mkSubj('Specialist Mathematics (VCE) / Extension 1 & 2 (NSW)','🔢',S_MATH,
          "Complex numbers: argand diagram, polar form, De Moivre's theorem",
          'Vectors: dot & cross product, lines & planes in 3D',
          'Advanced Calculus: integration by parts, trigonometric substitution, differential equations',
          'Proof: induction, combinatorics; Mechanics: SHM, projectiles, resisted motion'),
        mkSubj('Physics','⚡',S_PHY,
          "Motion & forces: kinematics, Newton's laws, momentum, circular motion",
          'Waves: mechanical, EM, standing waves, Doppler effect',
          'Fields: gravitational, electric, magnetic — forces, energy, motion',
          'Quantum, nuclear & special relativity: photoelectric, atomic models, nuclear reactions'),
        mkSubj('Chemistry','🧪',S_CHEM,
          'Atomic theory, bonding, chemical equations & stoichiometry',
          'Equilibrium, acids & bases (Ka, Kb, pH, buffers)',
          'Redox, electrochemistry, rates, energy (thermochemistry)',
          'Organic chemistry: functional groups, reactions, polymers, spectroscopy'),
        mkSubj('Biology','🦠',S_BIO,
          'Cells as a system: membranes, organelles, biochemistry, cell division',
          'Molecular biology: DNA, gene expression, gene technology',
          'Heredity: Mendelian genetics, chromosomal inheritance, epigenetics',
          'Biodiversity & evolution: classification, speciation, natural selection',
          'Human health: pathogens, immunity, brain & behaviour'),
        mkSubj('English (Literature / Language)','📚',S_EN,
          'Text response: essay analysing theme, character, structure',
          'Creative writing: narrative, imaginative, reflective writing',
          'Comparative essay: two texts on shared ideas',
          'Language analysis: persuasive techniques in media'),
        mkSubj('Economics','💰',S_SOC,
          'Microeconomics: supply & demand, market structures, market failure',
          'Macroeconomics: economic goals, policies, global economy, sustainability'),
        mkSubj('Computing / Informatics','💻',S_COMP,
          'Data & information systems, database design (SQL)',
          'Programming (Python/Java): OOP, algorithms, data structures',
          'Cyber security: encryption, authentication, social engineering',
          'Network fundamentals, systems analysis, digital solutions project'),
        mkSubj('Psychology','💭',S_PHIL,
          'Biological bases of behaviour: brain, nervous system, genetics',
          'Learning: classical & operant conditioning, social learning, cognitive approaches',
          'Memory: models, processes, forgetting, improving memory',
          'Mental wellbeing: stress, coping, sleep, psychological disorders'),
      ]},
    }
  },

  /* ═══ Canadian Curriculum ═══════════════════════════════════ */
  canadian: {
    label:'🇨🇦 Canadian Curriculum',
    grades:{
      middle:{ label:'Grade 6–10', subjects:[
        mkSubj('Mathematics','🔢',S_MATH,
          'Gr.6-8: Number sense, fractions, decimals, ratios, algebra (patterns, equations), geometry, data management',
          'Gr.9: Rational numbers, polynomials, linear relations, analytical geometry, statistics',
          'Gr.10: Quadratics, trigonometry (right triangles), analytic geometry, systems of equations'),
        mkSubj('Science','🔬',S_SCI,
          'Gr.7-8: Interactions in the environment, cells, fluids, structural strength, space',
          'Gr.9: Ecosystems, electrical principles, atoms & matter, space exploration',
          'Gr.10: Biology (cell, systems), Chemistry (chemical reactions), Physics (light & optics, climate)'),
        mkSubj('English Language Arts','📚',S_EN,
          'Reading: literary & informational texts, critical analysis, media literacy',
          'Writing: narrative, expository, persuasive, research reports',
          'Oral Communication: speaking, listening, presentations, debate'),
        mkSubj('Canadian & World Studies (Social Studies / History)','🌍',S_HIST,
          "Gr.7-8: Canada's history — First Nations, colonial period, Confederation",
          'Gr.9: Canadian geography — physical, human, environmental',
          'Gr.10: Recent Canadian history 1900–present, political systems, civic issues'),
        mkSubj('French','🇫🇷',S_FR,
          'Gr.6-10: Oral communication, reading, writing in French',
          'Immersion program: all subjects taught in French'),
      ]},
      high:{ label:'Grade 11–12 (Ontario/BC Focus)', subjects:[
        mkSubj('Functions (MCR3U) / Advanced Functions (MHF4U)','🔢',S_MATH,
          'Functions: characteristics, transformations, inverses',
          'Trigonometry: radian measure, trig identities, trig equations',
          'Exponential & logarithmic functions: properties, equations, applications',
          'Advanced: polynomial, rational, trigonometric, logarithmic functions in depth'),
        mkSubj('Calculus & Vectors (MCV4U)','🔢',S_MATH,
          'Derivatives: limits, first principles, rules (chain, product, quotient)',
          'Curve sketching, related rates, optimisation problems',
          'Vectors: operations, dot & cross products, equations of lines & planes',
          'Integrals intro: area under curve, antiderivatives'),
        mkSubj('Data Management (MDM4U)','📊',S_MATH,
          'Permutations, combinations, probability distributions',
          'Statistical analysis: normal distribution, confidence intervals',
          'Data collection, organization, and interpretation projects'),
        mkSubj('Physics (SPH3U/4U)','⚡',S_PHY,
          'Kinematics: uniform & accelerated motion, projectiles, relative motion',
          "Forces: Newton's laws, friction, circular motion, gravitation",
          'Energy: work, kinetic & potential, conservation, power',
          'Waves & Modern Physics: wave properties, light, special relativity, quantum & nuclear'),
        mkSubj('Chemistry (SCH3U/4U)','🧪',S_CHEM,
          'Matter & Bonding: atomic theory, periodic trends, ionic & covalent bonding',
          'Chemical Reactions: stoichiometry, types, gases (ideal gas law)',
          'Equilibrium & Energy: Le Chatelier, thermochemistry, entropy',
          'Organic Chemistry: hydrocarbons, functional groups, polymers, biomolecules'),
        mkSubj('Biology (SBI3U/4U)','🦠',S_BIO,
          'Biodiversity & Evolution: classification, natural selection, phylogeny',
          'Cellular & Molecular Biology: biochemistry, DNA, protein synthesis, biotechnology',
          'Anatomy & Physiology: body systems, homeostasis, nervous system',
          'Population Ecology: communities, ecosystems, sustainability'),
        mkSubj('English (ENG3U/4U)','📚',S_EN,
          'Literary analysis: poetry, novel, drama — theme, structure, style',
          'Media literacy: film, advertising, social media analysis',
          'Writing: analytical essay, research essay, creative writing',
          'Ontario Secondary School Literacy Test (OSSLT) preparation'),
        mkSubj('Computer Science (ICS3U/4U)','💻',S_COMP,
          'Programming: Python or Java — OOP, data structures, algorithms',
          'Software development: design, testing, documentation',
          'Data Structures: arrays, linked lists, stacks, queues, trees',
          'Theoretical CS: Boolean algebra, logic gates, recursion, complexity'),
        mkSubj('Economics (CIA4U)','💰',S_SOC,
          'Microeconomics: supply & demand, market structures, labour markets',
          'Macroeconomics: GDP, inflation, fiscal & monetary policy, Canadian economy',
          'Global Economics: trade, development, international institutions'),
        mkSubj('Law (CLN4U)','🏛️',S_HIST,
          'Canadian legal system: Constitution, Charter of Rights, courts',
          'Criminal law: offences, criminal procedure, youth justice',
          'Civil law: torts, contract law, family law, dispute resolution',
          'International law: treaties, human rights, global governance'),
      ]},
    }
  },


  /* ═══ المغرب ════════════════════════════════════════════════ */
  morocco: {
    label:'🇲🇦 المغرب',
    grades:{
      primary:{ label:'ابتدائي (ص١–٦)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'ص١-٢: الأعداد والعمليات الأساسية — الجمع والطرح والضرب والقسمة',
          'ص٣: الكسور العادية — القياس والهندسة المستوية',
          'ص٤: الأعداد العشرية — النسب المئوية — المضلعات',
          'ص٥: النسبة والتناسب — المساحة والمحيط — الإحصاء المبسط',
          'ص٦: الجبر الأولي — الهندسة الفراغية المبسطة'),
        mkSubj('اللغة العربية','📜',S_AR,
          'ص١-٢: القراءة والكتابة والإملاء — الحروف والأصوات',
          'ص٣-٤: النحو الأساسي — التعبير الشفهي والكتابي',
          'ص٥-٦: البلاغة الأولية — المحفوظات — التعبير الإبداعي'),
        mkSubj('الفرنسية','🇫🇷',S_FR,
          'ص١-٢: Alphabet, Lecture, Vocabulaire de base',
          'ص٣-٤: Grammaire simple, Lecture courante, Écriture',
          'ص٥-٦: Compréhension écrite, Rédaction simple, Grammaire'),
        mkSubj('العلوم والتكنولوجيا','🔬',S_SCI,
          'الكائنات الحية — جسم الإنسان المبسط',
          'المادة وخواصها — الطاقة المبسطة',
          'البيئة والحفاظ على الطبيعة — التكنولوجيا البسيطة'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن الكريم (سور قصيرة وتجويد مبسط)',
          'التوحيد وأركان الإسلام والإيمان',
          'الفقه المالكي الأساسي (طهارة وصلاة)',
          'السيرة النبوية والأخلاق الإسلامية'),
        mkSubj('الاجتماعيات','🌍',S_HIST,
          'المغرب: الموقع الجغرافي والطبيعة والسكان',
          'تاريخ المغرب: الأمازيغ والفتح الإسلامي والدولة الإدريسية',
          'الهوية المغربية: التنوع الثقافي والتراث'),
      ]},
      middle:{ label:'الإعدادي (ص٧–٩)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'ص١ إعدادي: الأعداد والعمليات، الجبر الأساسي، الهندسة المستوية',
          'ص٢ إعدادي: المعادلات والمتباينات، الدوال، الإحصاء والاحتمالات',
          'ص٣ إعدادي: الجبر المتقدم، المثلثات المبسطة، الهندسة الفراغية'),
        mkSubj('الفيزياء والكيمياء','⚡',S_PHY,
          'الحركة والقوى — الكثافة والضغط',
          'الكهرباء — الدوائر الكهربية البسيطة',
          'الأمواج الضوئية والصوتية',
          'المادة: خواصها وتحولاتها — المخاليط والمحاليل'),
        mkSubj('علوم الحياة والأرض (SVT)','🦠',S_BIO,
          'الخلية النباتية والحيوانية — التغذية والهضم',
          'الجهازان الدوري والتنفسي — الجهاز العصبي المبسط',
          'التوليد عند الكائنات الحية — البيئة والتلوث'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو والإعراب التفصيلي — الصرف والاشتقاق',
          'البلاغة: التشبيه والاستعارة والكناية',
          'الأدب المغربي والعربي — التعبير الكتابي'),
        mkSubj('اللغة الفرنسية','🇫🇷',S_FR,
          'Grammaire avancée: temps et modes — voix passive',
          'Lecture et compréhension de textes (littéraires et documentaires)',
          'Rédaction: résumé, récit, description, argumentation',
          'Vocabulaire thématique et expression orale'),
        mkSubj('التاريخ والجغرافيا','🌍',S_HIST,
          'التاريخ: المغرب الوسيط، العصر الحديث، الحماية والاستقلال',
          'الجغرافيا: المغرب الطبيعي والبشري والاقتصادي',
          'إفريقيا والعالم العربي: الموارد والتحديات'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن والتفسير — الفقه المالكي','العقيدة','الحديث','السيرة'),
        mkSubj('الإنجليزية','🗣️',S_EN,
          'Grammar: tenses, articles, modals',
          'Reading Comprehension & Vocabulary',
          'Writing: paragraph, short essay'),
        mkSubj('الإعلاميات','💻',S_COMP,
          'مهارات الحاسوب — Office — الإنترنت — مقدمة في البرمجة'),
      ]},
      high_sci:{ label:'ثانوي تأهيلي — شعبة العلوم', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'الجبر: الأعداد المركبة، المتتاليات، نظرية ذات الحدين، الأعداد الحقيقية',
          'التحليل: الدوال (اشتقاق وتكامل وحدود)، المعادلات التفاضلية',
          'الهندسة: الهندسة الفراغية، هندسة الأعداد المركبة',
          'الإحصاء والاحتمالات: القانون الطبيعي والتوزيعات',
          'السلاسل الرقمية والمتتاليات العودية'),
        mkSubj('الفيزياء والكيمياء','⚡',S_PHY,
          'الميكانيكا: الحركة والقوى، الطاقة، ميكانيكا الموائع',
          'الكهرباء: الدوائر المعقدة، المكثفات، التيار المتردد',
          'الكيمياء: التحولات الكيميائية، التوازنات، الكيمياء العضوية',
          'الأمواج: الكهرومغناطيسية والميكانيكية والبصريات',
          'الفيزياء الحديثة: الكم، النواة، الإشعاع'),
        mkSubj('علوم الحياة والأرض (SVT)','🦠',S_BIO,
          'الكيمياء الحيوية للخلية: الأحماض النووية، البروتينات، الإنزيمات',
          'الوراثة: قوانين مندل، الوراثة الجزيئية، الهندسة الوراثية',
          'وظائف الأجهزة: العصبية والهرمونية والمناعة',
          'الجيولوجيا: تكتونية الصفائح، الزلازل، الصخور والمعادن'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو التطبيقي المتقدم والبلاغة والنقد الأدبي',
          'الأدب المغربي: محمد الصباغ، عبد الكريم غلاب، أدونيس (المقيم)',
          'الأدب العربي الكلاسيكي والحديث والمعاصر'),
        mkSubj('اللغة الفرنسية','🇫🇷',S_FR,
          'Grammaire: subjonctif, conditionnel, concordance des temps',
          'Littérature: roman, poésie, théâtre marocain et francophone',
          'Rédaction: essai, commentaire, synthèse de documents',
          'Expression orale: débat, exposé, défense de point de vue'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن وعلوم التفسير','الفقه المالكي المعاصر','العقيدة','السيرة'),
        mkSubj('الإنجليزية','🗣️',S_EN,
          'Advanced Grammar, Essay Writing, Literature, Speaking'),
      ]},
      high_arts:{ label:'ثانوي تأهيلي — شعبة الآداب والعلوم الإنسانية', subjects:[
        mkSubj('اللغة العربية وآدابها','📜',S_AR,
          'النحو والصرف المتقدم والبلاغة الكاملة',
          'الأدب المغربي: الرواية والشعر والمسرح',
          'الأدب العربي عبر العصور','النقد الأدبي الحديث'),
        mkSubj('الفلسفة','💭',S_PHIL,
          'المجال الأول: الذات — الهوية والاختلاف والآخر',
          'المجال الثاني: المعرفة — الإدراك والعقل والعلم',
          'المجال الثالث: الفعل — العمل والقيم والسياسة',
          'منهجية: تحليل النص الفلسفي وكتابة المقالة'),
        mkSubj('التاريخ والجغرافيا','🌍',S_HIST,
          'تاريخ المغرب الحديث والمعاصر (الحماية، الاستقلال، رؤية 2030)',
          'التاريخ العالمي: الحربان العالميتان، الحرب الباردة، العولمة',
          'جغرافية المغرب التنموية والجغرافيا العالمية'),
        mkSubj('علوم الاقتصاد والتدبير','💰',S_SOC,
          'الاقتصاد: الأسواق، الدورة الاقتصادية، التنمية، التجارة الدولية',
          'القانون: مفاهيم أساسية، أنواع العقود، الأسرة، العمل'),
        mkSubj('اللغة الفرنسية','🇫🇷',S_FR,
          "Littérature marocaine d'expression française (Driss Chraïbi, Tahar Ben Jelloun)",
          'Grammaire avancée, Rédaction, Argumentation, Expression'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن','الفقه المالكي','العقيدة','السيرة'),
        mkSubj('الإنجليزية','🗣️',S_EN,
          'Grammar, Reading, Essay Writing, Speaking'),
      ]},
    }
  },

  /* ═══ الجزائر ════════════════════════════════════════════════ */
  algeria: {
    label:'🇩🇿 الجزائر',
    grades:{
      primary:{ label:'ابتدائي (ص١–٥)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'ص١-٢: الأعداد والعمليات الأساسية — الأشكال الهندسية',
          'ص٣: الكسور العادية — القياس — الهندسة المستوية',
          'ص٤-٥: النسبة والتناسب — الأعداد العشرية — المساحة والمحيط'),
        mkSubj('اللغة العربية','📜',S_AR,
          'ص١-٢: القراءة والكتابة والإملاء والتعبير الشفهي',
          'ص٣: النحو الأساسي — المطالعة — التعبير الكتابي',
          'ص٤-٥: البلاغة الأولية — الإعراب المبسط — المحفوظات'),
        mkSubj('اللغة الفرنسية','🇫🇷',S_FR,
          "Initiation à la lecture et à l'écriture",
          'Grammaire de base, Vocabulaire, Expression orale',
          'Compréhension écrite et rédaction simple'),
        mkSubj('التربية العلمية والتكنولوجية','🔬',S_SCI,
          'الكائنات الحية — الطبيعة والبيئة — المادة — التكنولوجيا البسيطة'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن الكريم (سور مختارة)','التوحيد وأركان الإسلام',
          'الأخلاق الإسلامية','السيرة النبوية المبسطة'),
        mkSubj('التربية المدنية','🏳️',S_SOC,
          'الانتماء الوطني والهوية الجزائرية',
          'الثورة الجزائرية ومفاهيم المواطنة'),
      ]},
      middle:{ label:'متوسط (ص١–٤ متوسط)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'متوسط ١: الأعداد الصحيحة والنسبية، الجبر الأساسي، الهندسة',
          'متوسط ٢: المعادلات والمتباينات، الدوال، الإحصاء',
          'متوسط ٣: الجبر المتقدم، المثلثات المبسطة، الهندسة الفراغية',
          'متوسط ٤ (شهادة التعليم المتوسط): مراجعة شاملة + تحضير للامتحان'),
        mkSubj('الفيزياء والكيمياء','⚡',S_PHY,
          'الحركة والقوى — الضغط والكثافة',
          'الكهرباء — الدوائر الكهربية',
          'المادة: التحولات الفيزيائية والكيميائية — المحاليل'),
        mkSubj('علوم الطبيعة والحياة','🦠',S_BIO,
          'الخلية — التغذية والهضم — الجهاز الدوري والتنفسي',
          'التكاثر والوراثة المبسطة — البيئة والتلوث'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو والصرف والبلاغة — الأدب الجزائري والعربي',
          'التعبير الكتابي والوظيفي'),
        mkSubj('اللغة الفرنسية','🇫🇷',S_FR,
          'Grammaire, Lecture, Rédaction, Vocabulaire, Expression orale'),
        mkSubj('التاريخ والجغرافيا','🌍',S_HIST,
          'تاريخ الجزائر: ما قبل الإسلام، الفتح الإسلامي، العثمانيون، الاستعمار الفرنسي',
          'الثورة الجزائرية (1954-1962) والاستقلال',
          'جغرافية الجزائر الطبيعية والبشرية والاقتصادية'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن والتفسير','الفقه المالكي','العقيدة','الحديث','السيرة'),
        mkSubj('الإنجليزية','🗣️',S_EN,
          'Grammar: tenses, vocabulary, reading comprehension, basic writing'),
      ]},
      high_sci:{ label:'ثانوي — شعبة العلوم الطبيعية والحياة / علوم وتكنولوجيا', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'الجبر: الأعداد المركبة، المتتاليات والمتسلسلات، الجبر الخطي',
          'التحليل: الدوال العددية، الاشتقاق والتكامل، المعادلات التفاضلية',
          'الهندسة: الهندسة في الفضاء، التحويلات الهندسية',
          'الاحتمالات: القانون الطبيعي، متغيرات عشوائية'),
        mkSubj('الفيزياء','⚡',S_PHY,
          'الميكانيكا النيوتونية والطاقة والدوران',
          'الكهرومغناطيسية: المجالات الكهربية والمغناطيسية، الحث',
          'الأمواج: الميكانيكية والكهرومغناطيسية والبصريات',
          'الفيزياء الحديثة: الكم والفيزياء النووية والمفاعلات'),
        mkSubj('الكيمياء','🧪',S_CHEM,
          'التركيب الذري والجدول الدوري والروابط',
          'التوازنات الكيميائية: الأحماض والقلويات والراسبات',
          'الكيمياء العضوية: التسمية، التفاعلات، البوليمرات',
          'الكيمياء الكهروكيميائية والحرارية'),
        mkSubj('علوم الطبيعة والحياة','🦠',S_BIO,
          'الخلية الجزيئية: DNA، التعبير الجيني، الهندسة الوراثية',
          'التنظيم الوظيفي: المناعة، الهرمونات، الجهاز العصبي',
          'الإعادة الإنتاجية والوراثة الجزيئية',
          'الجيولوجيا: تكتونية الصفائح، تاريخ الأرض، الموارد الطبيعية'),
        mkSubj('اللغة العربية','📜',S_AR,
          'النحو التطبيقي والبلاغة الكاملة والنقد الأدبي',
          'الأدب الجزائري: محمد ديب، كاتب ياسين، مفدي زكريا',
          'الأدب العربي الكلاسيكي والحديث'),
        mkSubj('اللغة الفرنسية','🇫🇷',S_FR,
          'Grammaire avancée: subjonctif, conditionnel, discours indirect',
          "Littérature algérienne d'expression française",
          'Argumentation écrite et expression orale'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن والتفسير','الفقه المالكي المعاصر','العقيدة','السيرة'),
        mkSubj('الإنجليزية','🗣️',S_EN,
          'Advanced Grammar, Essay Writing, Reading Literature, Speaking'),
      ]},
      high_arts:{ label:'ثانوي — شعبة الآداب والفلسفة / تسيير واقتصاد', subjects:[
        mkSubj('اللغة العربية وآدابها','📜',S_AR,
          'النحو والصرف المتقدم والبلاغة الكاملة',
          'الأدب الجزائري: محمد ديب، كاتب ياسين، مولود فرعون، مولود معمري',
          'الأدب العربي عبر العصور والنقد الأدبي'),
        mkSubj('الفلسفة','💭',S_PHIL,
          'الفلسفة والعلم: طبيعة المعرفة العلمية، المنهج العلمي',
          'الأخلاق والسياسة: العدالة، الحرية، الدولة',
          'الوجود والإنسان: الهوية، الآخر، الحقيقة',
          'منهجية المقالة الفلسفية الجزائرية'),
        mkSubj('التاريخ والجغرافيا','🌍',S_HIST,
          'الثورة الجزائرية 1954-1962 بالتفصيل',
          'الجزائر المعاصرة والمستقلة (1962-حاضر)',
          'العالم في القرن العشرين والعولمة',
          'جغرافية الجزائر الاقتصادية والبشرية'),
        mkSubj('علوم الاقتصاد والتسيير','💰',S_SOC,
          'الاقتصاد الجزئي: العرض والطلب، المؤسسة، التكاليف',
          'الاقتصاد الكلي: الدخل الوطني، النقود، التضخم، السياسات الاقتصادية',
          'التسيير: الوظائف الأساسية للمؤسسة، المحاسبة، التسويق'),
        mkSubj('اللغة الفرنسية','🇫🇷',S_FR,
          "Littérature algérienne et maghrébine d'expression française",
          'Grammaire, Rédaction, Argumentation, Expression orale'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن','الفقه','العقيدة','السيرة والأخلاق'),
        mkSubj('الإنجليزية','🗣️',S_EN,
          'Grammar, Reading, Writing, Oral Communication'),
      ]},
    }
  },

  /* ═══ تونس ════════════════════════════════════════════════════ */
  tunisia: {
    label:'🇹🇳 تونس',
    grades:{
      primary:{ label:'ابتدائي (ص١–٦)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'ص١-٢: العمليات الأساسية — الأعداد والأشكال',
          'ص٣-٤: الكسور — القياس — الهندسة المستوية',
          'ص٥-٦: النسبة والتناسب — الأعداد العشرية — الإحصاء المبسط'),
        mkSubj('العربية','📜',S_AR,
          'القراءة والكتابة والإملاء','النحو الأساسي','التعبير والتواصل','المحفوظات'),
        mkSubj('الفرنسية','🇫🇷',S_FR,
          'ص١-٢: Lecture, Écriture, Vocabulaire',
          'ص٣-٤: Grammaire, Compréhension, Rédaction',
          'ص٥-٦: Lecture de textes, Expression, Grammaire avancée'),
        mkSubj('التربية العلمية','🔬',S_SCI,
          'الكائنات الحية — جسم الإنسان — البيئة — المادة والطاقة'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن المبسط','التوحيد الأساسي','الأخلاق','السيرة'),
        mkSubj('التربية المدنية','🏳️',S_SOC,
          'الهوية التونسية — المواطنة — تاريخ تونس المبسط'),
      ]},
      middle:{ label:'إعدادي (ص٧–٩)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'الأعداد والحسابات — الجبر الأساسي',
          'الهندسة المستوية — الإحصاء',
          'المعادلات — الدوال — الهندسة الفراغية'),
        mkSubj('الفيزياء والكيمياء','⚡',S_PHY,
          'المادة وتحولاتها','الميكانيكا','الكهرباء','الأمواج'),
        mkSubj('علوم الحياة والأرض','🦠',S_BIO,
          'الخلية — التغذية — التنفس — التكاثر المبسط — البيئة'),
        mkSubj('العربية','📜',S_AR,
          'النحو والبلاغة — الأدب التونسي والعربي — التعبير الكتابي'),
        mkSubj('الفرنسية','🇫🇷',S_FR,
          'Grammaire, Lecture, Rédaction, Expression, Conjugaison'),
        mkSubj('التاريخ والجغرافيا','🌍',S_HIST,
          'تاريخ تونس: القرطاجيون والرومان والفتح الإسلامي والحفصيون',
          'تونس المعاصرة: الاستعمار الفرنسي والاستقلال 1956 وما بعده',
          'جغرافية تونس الطبيعية والبشرية والاقتصادية'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن والتفسير','الفقه المالكي','العقيدة','السيرة'),
        mkSubj('الإنجليزية','🗣️',S_EN,
          'Grammar, Vocabulary, Reading, Writing'),
        mkSubj('الإعلامية','💻',S_COMP,
          'الحاسوب الأساسيات — Office — الإنترنت — مقدمة البرمجة'),
      ]},
      high_sci:{ label:'ثانوي — شعبة العلوم (بكالوريا)', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,
          'التحليل: الاشتقاق، نظريات الدوال، التكامل، المعادلات التفاضلية',
          'الجبر: الأعداد المركبة، الجبر الخطي والمصفوفات',
          'الهندسة: الهندسة في الفضاء، هندسة الأعداد المركبة',
          'الاحتمالات والإحصاء: التوزيعات، الاختبارات',
          'التسلسلات والمتتاليات'),
        mkSubj('الفيزياء','⚡',S_PHY,
          'الميكانيكا: الحركة، الطاقة، الديناميكا',
          'الكهرومغناطيسية: المجالات، الحث، التيار المتردد',
          'الأمواج: الميكانيكية والكهرومغناطيسية والبصريات',
          'الفيزياء الحديثة: فيزياء الكم والنواة'),
        mkSubj('الكيمياء','🧪',S_CHEM,
          'الكيمياء العضوية التونسية: الهيدروكربونات، المجموعات الوظيفية',
          'التوازنات الكيميائية: الأحماض والقلويات والمعقدات',
          'الكيمياء الكهروكيميائية والحرارية'),
        mkSubj('علوم الحياة والأرض','🦠',S_BIO,
          'الأيض الخلوي: التنفس والتمثيل الضوئي',
          'الوراثة الجزيئية: DNA، التعبير الجيني',
          'التنظيم الوظيفي: المناعة والهرمونات والجهاز العصبي',
          'الجيولوجيا التونسية: تكتونية الصفائح، الطبقات، موارد الفوسفات'),
        mkSubj('العربية','📜',S_AR,
          'النحو التطبيقي والبلاغة والنقد الأدبي',
          'الأدب التونسي: أبو القاسم الشابي، علي الدوعاجي، محمود المسعدي',
          'الأدب العربي الكلاسيكي والمعاصر'),
        mkSubj('الفرنسية','🇫🇷',S_FR,
          'Littérature tunisienne et francophone (Tahar Haddad, Albert Memmi)',
          'Grammaire avancée, argumentation écrite et orale',
          'Résumé, commentaire, synthèse de documents'),
        mkSubj('الإنجليزية','🗣️',S_EN,
          'Advanced Grammar, Essay Writing, Reading Comprehension, Speaking'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن والتفسير','الفقه المالكي','العقيدة','السيرة'),
      ]},
      high_arts:{ label:'ثانوي — شعبة الآداب والعلوم الإنسانية', subjects:[
        mkSubj('العربية وآدابها','📜',S_AR,
          'النحو والصرف المتقدم والبلاغة الكاملة',
          'الأدب التونسي: أبو القاسم الشابي (ديوان إرادة الحياة)، المسعدي، الدوعاجي',
          'الأدب العربي عبر العصور والنقد المعاصر',
          'فنون الإنشاء: مقالة، قصيدة نثر، قصة قصيرة'),
        mkSubj('الفلسفة','💭',S_PHIL,
          'العقل والواقع: المنطق، نظرية المعرفة، فلسفة العلوم',
          'الإنسان والوجود: الهوية، الحرية، الجسد، الزمان',
          'الإنسان والمجتمع: السياسة، العدالة، الحق، الأخلاق',
          'منهجية الإنشاء الفلسفي التونسي'),
        mkSubj('التاريخ','🏛️',S_HIST,
          'تاريخ تونس المعاصر: الحماية الفرنسية، بورقيبة، الاستقلال',
          'العالم المعاصر: الحربان، الحرب الباردة، مرحلة ما بعد الاستعمار',
          'المجال العربي والإسلامي في القرن العشرين'),
        mkSubj('الجغرافيا','🗺️',S_GEO,
          'جغرافية تونس التفصيلية: البيئة، الموارد، التنمية، السياحة',
          'جغرافية البلدان المتوسطية والمغرب العربي',
          'التغيرات المناخية وتحديات التنمية المستدامة'),
        mkSubj('الفرنسية','🇫🇷',S_FR,
          'Textes littéraires tunisiens et francophones',
          'Dissertation et commentaire composé',
          'Expression écrite et orale avancées'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,
          'القرآن والتفسير','الفقه','العقيدة','السيرة والتاريخ الإسلامي'),
        mkSubj('الإنجليزية','🗣️',S_EN,
          'Advanced Grammar, Reading, Writing, Oral Communication'),
      ]},
    }
  },

  mauritania: {
    label:'🇲🇷 موريتانيا',
    grades:{
      primary:{ label:'ابتدائي', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,'الأعداد والعمليات','الجمع والطرح','الضرب والقسمة','الكسور','القياس','الهندسة'),
        mkSubj('اللغة العربية','📜',S_AR,'القراءة والكتابة','النحو الأساسي','الإملاء','التعبير الشفهي','المحفوظات'),
        mkSubj('العلوم','🔬',S_SCI,'الكائنات الحية','جسم الإنسان','البيئة الصحراوية','الطاقة'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,'القرآن الكريم وتجويده','التوحيد المبسط','الفقه المالكي الأساسي','الأخلاق'),
        mkSubj('التربية الوطنية','🏳️',S_SOC,'موريتانيا وموقعها','تاريخ موريتانيا','المجتمع الموريتاني','الثروات الطبيعية'),
        mkSubj('اللغة الفرنسية','🇫🇷',S_FR,'Alphabet','Vocabulaire','Lecture simple','Expression orale'),
      ]},
      middle:{ label:'إعدادي', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,'الجبر الأساسي','الهندسة','الإحصاء','الدوال البسيطة','النسب والتناسب'),
        mkSubj('الفيزياء والكيمياء','⚡',S_PHY,'الحركة والقوى','الطاقة','الكهرباء المبسطة','المادة وتحولاتها'),
        mkSubj('علوم الحياة','🦠',S_BIO,'الخلية','التغذية والهضم','الجهاز الدوري','البيئة الصحراوية'),
        mkSubj('اللغة العربية','📜',S_AR,'النحو والإعراب','البلاغة الأساسية','الأدب الموريتاني','التعبير الكتابي'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,'القرآن والتفسير','الفقه المالكي','العقيدة','السيرة النبوية'),
        mkSubj('التاريخ والجغرافيا','🏛️',S_HIST,'تاريخ موريتانيا والمغرب العربي','جغرافية موريتانيا','الصحراء الكبرى','التاريخ الإسلامي'),
        mkSubj('اللغة الفرنسية','🇫🇷',S_FR,'Grammaire','Lecture','Rédaction','Expression orale'),
      ]},
      high:{ label:'ثانوي', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,'الجبر والمعادلات','المثلثات','التفاضل والتكامل','الإحصاء والاحتمالات','الهندسة في الفضاء'),
        mkSubj('الفيزياء','⚡',S_PHY,'الميكانيكا','الديناميكا الحرارية','الكهرومغناطيسية','الأمواج','الفيزياء الحديثة'),
        mkSubj('الكيمياء','🧪',S_CHEM,'التركيب الذري والجدول الدوري','الروابط الكيميائية','التفاعلات','الكيمياء العضوية'),
        mkSubj('علوم الحياة والأرض','🦠',S_BIO,'الخلية الجزيئية','الوراثة','أجهزة جسم الإنسان','التطور','علم البيئة'),
        mkSubj('اللغة العربية وآدابها','📜',S_AR,'النحو التطبيقي المتقدم','البلاغة والنقد الأدبي','الأدب الموريتاني (شنقيطي)','الأدب العربي الكلاسيكي والحديث','فنون الكتابة'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,'القرآن الكريم وعلومه','الفقه المالكي المتقدم','أصول الفقه','الحديث النبوي','العقيدة الأشعرية'),
        mkSubj('اللغة الفرنسية','🇫🇷',S_FR,'Grammaire avancée','Littérature','Dissertation','Commentaire composé','Communication'),
        mkSubj('الفلسفة','💭',S_PHIL,'المنطق','نظرية المعرفة','الأخلاق','الفلسفة الإسلامية'),
        mkSubj('التاريخ والجغرافيا','🏛️',S_HIST,'تاريخ موريتانيا الحديث','تاريخ غرب أفريقيا الإسلامي','الجغرافيا الاقتصادية','التغيرات المناخية والتصحر'),
        mkSubj('الحاسوب','💻',S_COMP,'البرمجة الأساسية','قواعد البيانات','الشبكات','التطبيقات الرقمية'),
      ]},
    }
  },

  /* ═══ أخرى ════════════════════════════════════════════════ */
  other: {
    label:'🌍 أخرى',
    grades:{
      primary:{ label:'ابتدائي', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,'الأعداد والعمليات','الجمع والطرح','الضرب والقسمة','الكسور','القياس','الهندسة'),
        mkSubj('اللغة العربية','📜',S_AR,'القراءة والكتابة','النحو الأساسي','الإملاء','التعبير'),
        mkSubj('العلوم','🔬',S_SCI,'الكائنات الحية','جسم الإنسان','الطاقة','البيئة'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,'القرآن الكريم','أركان الإسلام','السيرة','الأخلاق'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,'Alphabet','Vocabulary','Reading','Writing'),
      ]},
      middle:{ label:'إعدادي', subjects: _middleSubjects() },
      high:{ label:'ثانوي', subjects:[
        mkSubj('الرياضيات','🔢',S_MATH,'الجبر','المثلثات','التفاضل والتكامل','الإحصاء'),
        mkSubj('الفيزياء','⚡',S_PHY,'الميكانيكا','الكهرباء','الأمواج','الفيزياء الحديثة'),
        mkSubj('الكيمياء','🧪',S_CHEM,'التركيب الذري','الروابط','التفاعلات','الكيمياء العضوية'),
        mkSubj('الأحياء','🦠',S_BIO,'الخلية','الوراثة','أجهزة جسم الإنسان','البيئة'),
        mkSubj('اللغة العربية','📜',S_AR,'النحو والصرف','البلاغة','الأدب العربي','التعبير'),
        mkSubj('التربية الإسلامية','☪️',S_ISL,'القرآن الكريم','الفقه','العقيدة','الأخلاق'),
        mkSubj('اللغة الإنجليزية','🗣️',S_EN,'Grammar','Reading','Writing','Speaking','Vocabulary'),
      ]},
    }
  },

};
window.CURRICULA = CURRICULA;


/* ════════════════════════════════════════════════════════════
   AUTH TEMPLATES
   ════════════════════════════════════════════════════════════ */
const tplLoading = () => `
<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:20px;
            background:radial-gradient(ellipse at 50% 40%,#3B82F618 0%,transparent 60%),var(--bg)">
  <div style="position:relative">
    <div style="font-size:72px;animation:pulse-logo 2s ease-in-out infinite">🎓</div>
    <div style="position:absolute;inset:-8px;border-radius:50%;border:2px solid #3B82F644;animation:spin-ring 2s linear infinite"></div>
  </div>
  <div style="font-size:26px;font-weight:900;color:var(--primary);letter-spacing:-0.5px">أستاذ AI</div>
  <div style="font-size:13px;color:var(--text-muted)" id="loading-msg">جارٍ التحميل...</div>
  <div style="width:200px;height:3px;background:var(--border);border-radius:999px;overflow:hidden">
    <div style="height:100%;background:linear-gradient(90deg,var(--primary),#8B5CF6);border-radius:999px;animation:loading-bar 1.8s ease-in-out infinite"></div>
  </div>
</div>
<style>
@keyframes pulse-logo{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
@keyframes spin-ring{to{transform:rotate(360deg)}}
@keyframes loading-bar{0%{width:0%;margin-right:100%}50%{width:60%;margin-right:20%}100%{width:0%;margin-right:0%;margin-left:100%}}
</style>`;

const tplLogin = () => `
<div class="auth-screen">
  <div class="auth-card">
    <div style="position:absolute;top:16px;left:16px">
      <button onclick="toggleLang()" style="background:none;border:1px solid var(--border);border-radius:12px;padding:4px 10px;font-size:12px;cursor:pointer;color:var(--text-muted);font-family:Cairo,sans-serif">
        ${S.lang==='ar'?'🇬🇧 EN':'🇸🇦 عر'}
      </button>
    </div>
    <div class="auth-logo">🎓</div>
    <div class="auth-title">${t('أستاذ AI','appName')}</div>
    <div class="auth-subtitle">${t('مساعدك الذكي للتعليم','appSlogan')}</div>
    <div id="auth-error" class="error-msg" style="display:none"></div>
    <div class="form-group"><label class="form-label">${t('البريد الإلكتروني','email')}</label>
      <input id="f-email" class="form-input" type="email" placeholder="example@email.com"/></div>
    <div class="form-group"><label class="form-label">كلمة المرور</label>
      <input id="f-pass" class="form-input" type="password" placeholder="••••••••"/></div>
    <button class="btn btn-primary" id="b-login" style="width:100%;margin-top:8px">${t('دخول','loginBtn')}</button>
    <div style="display:flex;align-items:center;gap:8px;margin:12px 0">
      <div style="flex:1;height:1px;background:var(--border)"></div>
      <span style="font-size:12px;color:var(--text-muted)">أو</span>
      <div style="flex:1;height:1px;background:var(--border)"></div>
    </div>
    <div id="g-btn" style="display:flex;justify-content:center;margin-bottom:8px;min-height:44px"></div>
    <button class="btn btn-secondary" id="b-guest" style="width:100%;margin-top:4px">${t('دخول كضيف','guestBtn')}</button>
    <div style="text-align:center;margin-top:8px">
      <span id="go-forgot" style="font-size:13px;color:var(--primary);cursor:pointer;text-decoration:underline">${t('نسيت كلمة المرور؟','forgotPassword')}</span>
    </div>
    <div class="auth-switch">${t('ليس لديك حساب؟','noAccount')} <span id="go-register">${t('أنشئ حساباً','createAccount')}</span></div>
  </div>
</div>`;

const tplForgotPassword = () => `
<div class="auth-screen">
  <div class="auth-card">
    <div class="auth-logo">🔐</div>
    <div class="auth-title">نسيت كلمة المرور؟</div>
    <div class="auth-subtitle">أدخل بريدك وسنرسل لك رابط الاستعادة</div>
    <div id="auth-error" class="error-msg" style="display:none"></div>
    <div id="auth-success" style="display:none;background:#064e3b;color:#6ee7b7;padding:12px;border-radius:8px;margin-bottom:12px;font-size:14px;text-align:center"></div>
    <div class="form-group"><label class="form-label">البريد الإلكتروني</label>
      <input id="f-forgot-email" class="form-input" type="email" placeholder="example@email.com"/></div>
    <button class="btn btn-primary" id="b-forgot-send" style="width:100%;margin-top:8px">📧 إرسال رابط الاستعادة</button>
    <div class="auth-switch">تذكرت كلمة المرور؟ <span id="go-login-back">سجّل دخول</span></div>
  </div>
</div>`;

const tplResetPassword = (token) => `
<div class="auth-screen">
  <div class="auth-card">
    <div class="auth-logo">🔑</div>
    <div class="auth-title">تعيين كلمة مرور جديدة</div>
    <div class="auth-subtitle">اختر كلمة مرور قوية</div>
    <div id="auth-error" class="error-msg" style="display:none"></div>
    <div class="form-group"><label class="form-label">كلمة المرور الجديدة</label>
      <input id="f-new-pass" class="form-input" type="password" placeholder="6 أحرف على الأقل"/></div>
    <div class="form-group"><label class="form-label">تأكيد كلمة المرور</label>
      <input id="f-confirm-pass" class="form-input" type="password" placeholder="أعد كتابة كلمة المرور"/></div>
    <button class="btn btn-primary" id="b-do-reset" data-token="${token}" style="width:100%;margin-top:8px">✅ حفظ كلمة المرور</button>
  </div>
</div>`;

const tplRegister = () => `
<div class="auth-screen">
  <div class="auth-card">
    <div class="auth-logo">🎓</div>
    <div class="auth-title">إنشاء حساب جديد</div>
    <div class="auth-subtitle">انضم إلى آلاف الطلاب</div>
    <div id="auth-error" class="error-msg" style="display:none"></div>
    <div class="form-group"><label class="form-label">الاسم</label>
      <input id="f-name" class="form-input" type="text" placeholder="اسمك الكامل"/></div>
    <div class="form-group"><label class="form-label">البريد الإلكتروني</label>
      <input id="f-email" class="form-input" type="email" placeholder="example@email.com"/></div>
    <div class="form-group"><label class="form-label">كلمة المرور</label>
      <input id="f-pass" class="form-input" type="password" placeholder="��������"/></div>
    <div class="form-group"><label class="form-label">الدولة</label>
      <select id="f-country" class="form-input">
        <option value="">-- اختر دولتك --</option>
        <option value="egypt">🇪🇬 مصر</option>
        <option value="saudi">🇸🇦 السعودية</option>
        <option value="uae">🇦🇪 الإمارات</option>
        <option value="kuwait">🇰🇼 الكويت</option>
        <option value="qatar">🇶🇦 قطر</option>
        <option value="bahrain">🇧🇭 البحرين</option>
        <option value="oman">🇴🇲 عُمان</option>
        <option value="jordan">🇯🇴 الأردن</option>
        <option value="lebanon">🇱🇧 لبنان</option>
        <option value="syria">🇸🇾 سوريا</option>
        <option value="iraq">🇮🇶 العراق</option>
        <option value="libya">🇱🇾 ليبيا</option>
        <option value="tunisia">🇹🇳 تونس</option>
        <option value="algeria">🇩🇿 الجزائر</option>
        <option value="morocco">🇲🇦 المغرب</option>
        <option value="sudan">🇸🇩 السودان</option>
        <option value="palestine">🇵🇸 فلسطين</option>
        <option value="yemen">🇾🇪 اليمن</option>
        <option value="other">🌍 أخرى</option>
        <optgroup label="──── مناهج دولية / International ────"><option value="igcse">🎓 IGCSE / Cambridge International</option><option value="cambridge_alevel">🎓 Cambridge A-Levels (AS/A2)</option><option value="edexcel">📘 Edexcel / Pearson</option><option value="aqa">📗 AQA (UK)</option><option value="ocr">📙 OCR (UK)</option><option value="american">🇺🇸 American Curriculum</option><option value="ib">🌐 IB — International Baccalaureate</option><option value="cbse">🇮🇳 CBSE (India)</option><option value="icse">🇮🇳 ICSE / ISC (India)</option><option value="french_bac">🇫🇷 Baccalauréat Français</option><option value="australian">🇦🇺 Australian Curriculum</option><option value="canadian">🇨🇦 Canadian Curriculum</option></optgroup>
      </select>
    </div>
    <div class="form-group" id="ref-group" style="display:none">
      <label class="form-label" style="color:#F59E0B">🎁 كود الإحالة (اختياري)</label>
      <input id="f-ref" class="form-input" type="text" placeholder="مثال: OZ-ABC123" style="text-transform:uppercase;letter-spacing:2px"/>
      <div style="font-size:11px;color:#F59E0B;margin-top:4px">✨ سجّل بكود إحالة وتحصل على 7 أيام Pro مجاناً!</div>
    </div>
    <button class="btn btn-primary" id="b-register" style="width:100%;margin-top:8px">${t('إنشاء حساب 🚀','registerBtn')}</button>
    <div style="display:flex;align-items:center;gap:8px;margin:12px 0">
      <div style="flex:1;height:1px;background:var(--border)"></div>
      <span style="font-size:12px;color:var(--text-muted)">أو</span>
      <div style="flex:1;height:1px;background:var(--border)"></div>
    </div>
    <div id="g-btn" style="display:flex;justify-content:center;margin-bottom:4px;min-height:44px"></div>
    <div style="text-align:center;margin-top:8px">
      <span id="go-ref-toggle" style="font-size:12px;color:var(--primary);cursor:pointer;text-decoration:underline">عندك كود إحالة؟</span>
    </div>
    <div class="auth-switch">لديك حساب؟ <span id="go-login">سجّل دخول</span></div>
  </div>
</div>`;

/* END OF PART 1 */

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SHELL + NAV
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function tplShell(content) {
  const nav = [
    { s:'chat',        icon:'💬', label: t('المحادثة','chat') },
    { s:'lessons',     icon:'📖', label: t('الدروس','lessons') },
    { s:'flashcards',  icon:'🗂', label: t('البطاقات','flashcards') },
    { s:'quiz',        icon:'📝', label: t('الاختبار','quiz') },
    { s:'summary',     icon:'📋', label: t('الملخص','summary') },
    { s:'mindmap',     icon:'🧠', label: t('خريطة ذهنية','mindmap') },
    { s:'textbook',    icon:'📚', label: t('الكتب','textbook') },
    { s:'igcse',       icon:'🎓', label:'IGCSE' },
    { s:'stats',       icon:'📊', label: t('الإحصائيات','stats') },
    { s:'notes',       icon:'🗒', label: t('الملاحظات','notes') },
    { s:'bookmarks',   icon:'🔖', label: t('المحفوظات','bookmarks') },
    { s:'wrong',       icon:'❌',  label: t('الأخطاء','wrong') },
    { s:'pomodoro',    icon:'⏱',  label: t('بومودورو','pomodoro') },
    { s:'schedule',    icon:'📅', label: t('الجدول','schedule') },
    { s:'history',     icon:'🕒', label: t('السجل','history') },
    { s:'leaderboard', icon:'🏆', label: t('المتصدرون','leaderboard') },
    { s:'profile',     icon:'👤', label: t('الملف','profile') },
    { s:'upgrade',     icon:'⭐',  label:'Pro' },
    { s:'admin',       icon:'🛡', label:'Admin' },
  ]
  const navItems = nav.map(n => `
    <button class="nav-item${S.screen===n.s?' active':''}" onclick="navTo('${n.s}')" style="width:100%;text-align:right;background:none;border:none;cursor:pointer;font-family:Cairo,sans-serif">
      <span class="nav-icon">${n.icon}</span>
      <span class="nav-label">${n.label}</span>
    </button>`).join('');
  const botNavScreens = ['chat','lessons','igcse','textbook','stats','profile'];
  const botNav = [
    ...nav.filter(n => botNavScreens.includes(n.s)),
    { s:'__more__', icon:'⋯', label:'المزيد' }
  ].map(n => `
    <button class="bot-nav-item${S.screen===n.s?' active':''}" onclick="navTo('${n.s}')" style="background:none;border:none;cursor:pointer;font-family:Cairo,sans-serif;flex:1">
      <span>${n.icon}</span><span style="font-size:10px;display:block">${n.label}</span>
    </button>`).join('');
  const curData = CURRICULA[S.curriculum] || CURRICULA.egypt;
  const gradeData = (curData.grades && (curData.grades[S.grade] || curData.grades.high || Object.values(curData.grades)[0])) || { label: S.grade || 'ثانوي', subjects: [] };
  return `
<div class="shell">
  <aside class="sidebar">
    <div class="sidebar-logo">🎓 أستاذ AI</div>
    <div class="sidebar-cur">${curData.label} · ${gradeData.label}</div>
    <nav class="sidebar-nav">${navItems}</nav>
    <div style="display:flex;gap:6px;margin:10px 8px">
      <button onclick="toggleDark()" style="flex:1;background:none;border:1px solid var(--border);border-radius:14px;padding:6px 8px;color:var(--text-muted);cursor:pointer;font-size:12px;font-family:Cairo,sans-serif">
        ${S.darkMode?"🌙":"☀️"} ${S.lang==='en'?(S.darkMode?'Dark':'Light'):(S.darkMode?'داكن':'فاتح')}
      </button>
      <button onclick="toggleLang()" style="flex:1;background:none;border:1px solid var(--border);border-radius:14px;padding:6px 8px;color:var(--text-muted);cursor:pointer;font-size:12px;font-family:Cairo,sans-serif">
        ${S.lang==='ar'?'🇬🇧 EN':'🇸🇦 عر'}
      </button>
    </div>
  </aside>
  <main class="content">${content}</main>
</div>
<!-- Offline Banner -->
<div id="offline-banner" style="display:none;position:fixed;top:0;left:0;right:0;z-index:9998;
  background:#EF4444;color:#fff;text-align:center;padding:8px;font-family:Cairo,sans-serif;
  font-size:13px;font-weight:700;animation:slideDown .3s ease">
  ${S.lang==='en'?'📵 No internet connection — some features unavailable':'📵 لا يوجد اتصال بالإنترنت — بعض الميزات غير متاحة'}
</div>
<nav class="bottom-nav">${botNav}</nav>
<!-- More Drawer (mobile) -->
<div id="more-drawer-overlay" style="display:none;position:fixed;inset:0;z-index:200;background:#00000060" onclick='ge('more-drawer').style.transform='translateY(100%)';setTimeout(()=>{ge('more-drawer-overlay').style.display='none'},250)"></div>
<div id="more-drawer" style="position:fixed;bottom:0;left:0;right:0;z-index:201;background:var(--bg-card);border-radius:20px 20px 0 0;padding:20px;transform:translateY(100%);transition:transform .3s cubic-bezier(.4,0,.2,1)">
  <div style="width:40px;height:4px;background:var(--border);border-radius:2px;margin:0 auto 20px"></div>
  <div style="font-size:14px;font-weight:900;color:var(--text-muted);margin-bottom:14px">الأدوات الأخرى</div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">
    ${nav.filter(n=>!['chat','lessons','flashcards','stats','profile','admin'].includes(n.s)).map(n=>`
    <button onclick="ge('more-drawer').style.transform='translateY(100%)';setTimeout(()=>{ge('more-drawer-overlay').style.display='none'},250);S.screen='${n.s}';render()"
      style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 4px;background:var(--bg);border:1px solid var(--border);border-radius:12px;cursor:pointer;font-family:Cairo,sans-serif;transition:.15s"
      class="drawer-btn">
      <span style="font-size:24px">${n.icon}</span>
      <span style="font-size:11px;font-weight:700;color:var(--text)">${n.label}</span>
    </button>`).join('')}
  </div>
</div>
<!-- Floating Feedback Button -->
<button id="b-feedback-float" title="ملاحظات أو مشكلة؟"
  style="position:fixed;bottom:72px;left:16px;z-index:999;width:44px;height:44px;border-radius:50%;
         background:var(--primary);border:none;font-size:20px;cursor:pointer;
         box-shadow:0 4px 14px #3B82F655;display:flex;align-items:center;justify-content:center;
         opacity:.85;transition:.2s" onmouseenter="this.style.opacity=1" onmouseleave="this.style.opacity=.85">
  💬
</button>
<!-- Feedback Modal -->
<div id="feedback-modal" style="display:none;position:fixed;inset:0;z-index:1000;background:#00000080;align-items:center;justify-content:center">
  <div style="background:var(--surface);border-radius:16px;padding:24px;width:90%;max-width:400px;box-shadow:0 20px 60px #000a">
    <div style="font-size:18px;font-weight:900;margin-bottom:4px">${S.lang==='en'?'💬 Send Feedback or Report a Bug':'💬 أرسل ملاحظة أو بلّغ عن مشكلة'}</div>
    <div style="font-size:13px;color:var(--text-muted);margin-bottom:16px">${S.lang==='en'?'Your feedback helps us improve 🙏':'رأيك يساعدنا على التحسين 🙏'}</div>
    <textarea id="feedback-text" placeholder="${S.lang==='en'?'Write your feedback here...':'اكتب ملاحظتك هنا...'}" rows="4"
      style="width:100%;padding:12px;border-radius:10px;border:1.5px solid var(--border);background:var(--bg);color:var(--text);
             font-family:Cairo,sans-serif;font-size:14px;resize:none;box-sizing:border-box;margin-bottom:12px"></textarea>
    <div style="display:flex;gap:8px">
      <button class="btn btn-primary" id="b-feedback-send" style="flex:1">${S.lang==='en'?'Send 📤':'إرسال 📤'}</button>
      <button class="btn btn-secondary" id="b-feedback-close" style="flex:1">${S.lang==='en'?'Cancel':'إلغاء'}</button>
    </div>
  </div>
</div>`;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CHAT
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function tplChat() {
  const curData = CURRICULA[S.curriculum] || CURRICULA.egypt;
  const gradeData = curData.grades[S.grade] || Object.values(curData.grades)[0];
  const subjects = gradeData.subjects;
  const subjOpts = subjects.map(s =>
    `<option value="${esc(s.name)}" ${S.subject===s.name?'selected':''}>${s.icon} ${s.name}</option>`
  ).join('');
  const msgs = S.messages.map((m,i) => {
    const ts = m.time ? `<span class="msg-time">${m.time}</span>` : '';
    if (m.role === 'user') {
      return `<div class="msg msg-user">
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:2px">
          <div class="msg-bubble">${esc(m.content)}</div>
          ${ts}
        </div>
      </div>`;
    }
    return `<div class="msg msg-ai">
      <div class="msg-avatar">🎓</div>
      <div style="flex:1;min-width:0">
        <div class="msg-bubble">${md(m.content)}
          <div class="msg-actions">
            <button class="bm-btn" data-idx="${i}" title="حفظ">🔖</button>
            <button class="copy-msg-btn" data-idx="${i}" title="نسخ">📋</button>
          </div>
        </div>
        ${ts}
      </div>
    </div>`;
  }).join('');
  return `
<div class="chat-wrap">
  <div class="chat-context-bar" style="display:flex;align-items:center;gap:6px;padding:6px 12px;background:var(--bg-card2);border-bottom:1px solid var(--border);font-size:11px;color:var(--text-muted);flex-wrap:wrap;overflow-x:auto">
    <span style="font-weight:800;color:var(--primary)">${(CURRICULA[S.curriculum]||{}).label||S.curriculum}</span>
    <span style="opacity:.4">›</span>
    <span>${(CURRICULA[S.curriculum]?.grades[S.grade]||Object.values(CURRICULA[S.curriculum]?.grades||{})[0])?.label||S.grade}</span>
    <span style="opacity:.4">›</span>
    <span style="font-weight:700;color:var(--text)">${esc(S.subject)}</span>
    <button onclick="S.screen='lessons';render()" style="margin-right:auto;background:none;border:1px solid var(--border);border-radius:8px;padding:2px 8px;font-size:10px;cursor:pointer;color:var(--text-muted);font-family:Cairo,sans-serif">تغيير ›</button>
  </div>
  <div class="chat-toolbar">
    <select id="subj-sel" class="subj-sel">${subjOpts}</select>
    <div class="tool-strip">
      <button class="tool-btn" id="tb-fc">🗂️ بطاقات</button>
      <button class="tool-btn" id="tb-qz">📝 اختبار</button>
      <button class="tool-btn" id="tb-sm">📋 ملخص</button>
      <button class="tool-btn" id="tb-mm">🧠 خريطة</button>
      <button class="tool-btn" id="tb-share">&#x1F4E4; مشاركة</button>
    </div>
  </div>
  <div class="chat-msgs" id="chat-msgs">
    ${msgs || `<div class="chat-empty">
      ${S.user && S.user.plan !== 'pro' ? `
      <div style="background:#F59E0B22;border:1px solid #F59E0B44;border-radius:10px;padding:8px 16px;font-size:12px;color:#F59E0B;margin-bottom:16px;display:flex;align-items:center;gap:6px">
        ⭐ <b>5 أسئلة مجانية يومياً</b> — <span data-screen="upgrade" style="cursor:pointer;text-decoration:underline">ترقّى للـ Pro للاستخدام غير المحدود</span>
      </div>` : ''}
      <div style="font-size:40px;margin-bottom:8px">🎓</div>
      <div style="font-size:16px;font-weight:800;margin-bottom:4px">${S.lang==='en'?'Hi! I\'m OstazAI':'أهلاً! أنا أستاذ AI'}</div>
      <div style="font-size:13px;color:var(--text-muted);margin-bottom:20px">${S.lang==='en'?'Ask me anything about':'اسألني أي شيء عن'} <b>${esc(S.subject)}</b> ${S.lang==='en'?'or pick a suggestion:':'أو اختر اقتراحاً:'}</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:400px">
        ${S.lang==='en'?
        '<button class="quick-chip" data-q="Explain the key concepts of '+esc(S.subject)+' in simple terms">💡 Key Concepts</button><button class="quick-chip" data-q="Give me 5 practice questions on '+esc(S.subject)+'">📝 Practice Questions</button><button class="quick-chip" data-q="What are the hardest topics in '+esc(S.subject)+' and how to solve them?">🧩 Hard Topics</button><button class="quick-chip" data-q="Summarize the main topics of '+esc(S.subject)+' in bullet points">📋 Quick Summary</button><button class="quick-chip" data-q="Create a study plan for '+esc(S.subject)+'">📅 Study Plan</button><button class="quick-chip" data-q="What are the top tips to excel in '+esc(S.subject)+'?">🏆 Top Tips</button>'
        :
        '<button class="quick-chip" data-q="اشرح لي أهم مفاهيم '+esc(S.subject)+' بطريقة مبسّطة">💡 اشرح المفاهيم</button><button class="quick-chip" data-q="أعطني 5 أسئلة اختبار في '+esc(S.subject)+'">📝 أسئلة اختبار</button><button class="quick-chip" data-q="ما هي أصعب المسائل في '+esc(S.subject)+' وكيف أحلها؟">🧩 مسائل صعبة</button><button class="quick-chip" data-q="لخّص لي أهم دروس '+esc(S.subject)+' في نقاط">📋 ملخص سريع</button><button class="quick-chip" data-q="أنشئ لي خطة مذاكرة لمادة '+esc(S.subject)+'">📅 خطة مذاكرة</button><button class="quick-chip" data-q="ما هي أهم النصائح للتفوق في '+esc(S.subject)+'؟">🏆 نصائح التفوق</button>'
        }
      </div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:12px">أو التقط صورة لمسألة 📸</div>
      <div style="margin-top:16px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
        <button data-screen="lessons" style="display:flex;align-items:center;gap:5px;padding:7px 14px;border-radius:20px;border:1.5px solid #3B82F644;background:#3B82F611;cursor:pointer;font-family:Cairo,sans-serif;font-size:12px;font-weight:700;color:#3B82F6">
          📖 الدروس
        </button>
        <button data-screen="flashcards" style="display:flex;align-items:center;gap:5px;padding:7px 14px;border-radius:20px;border:1.5px solid #F59E0B44;background:#F59E0B11;cursor:pointer;font-family:Cairo,sans-serif;font-size:12px;font-weight:700;color:#F59E0B">
          🗂️ بطاقات
        </button>
        <button data-screen="quiz" style="display:flex;align-items:center;gap:5px;padding:7px 14px;border-radius:20px;border:1.5px solid #10B98144;background:#10B98111;cursor:pointer;font-family:Cairo,sans-serif;font-size:12px;font-weight:700;color:#10B981">
          📝 اختبار
        </button>
        <button data-screen="summary" style="display:flex;align-items:center;gap:5px;padding:7px 14px;border-radius:20px;border:1.5px solid #8B5CF644;background:#8B5CF611;cursor:pointer;font-family:Cairo,sans-serif;font-size:12px;font-weight:700;color:#8B5CF6">
          📋 ملخص
        </button>
      </div>
    </div>`}
    ${S.thinking ? '<div class="msg msg-ai"><div class="msg-avatar">🎓</div><div class="msg-bubble thinking"><span></span><span></span><span></span></div></div>' : ''}
    ${S.imageThinking ? '<div class="msg msg-ai"><div class="msg-avatar">🎓</div><div class="msg-bubble thinking" style="background:#F59E0B11;border-color:#F59E0B44"><span style="background:#F59E0B"></span><span style="background:#F59E0B"></span><span style="background:#F59E0B"></span></div></div>' : ''}
  </div>
  ${S.questionsRemaining !== null && S.questionsRemaining < 10 && !S.user?.plan?.includes('pro') ? `
  <div style="display:flex;align-items:center;gap:8px;padding:6px 14px;background:${S.questionsRemaining <= 1 ? '#EF444422' : '#F59E0B22'};border-top:1px solid ${S.questionsRemaining <= 1 ? '#EF444444' : '#F59E0B44'};font-size:12px">
    <span>${S.questionsRemaining <= 1 ? '⚠️' : '💬'}</span>
    <span style="color:${S.questionsRemaining <= 1 ? '#EF4444' : '#F59E0B'};font-weight:700">
      ${S.questionsRemaining === 0 ? 'وصلت للحد اليومي — ' : S.questionsRemaining + ' أسئلة متبقية اليوم — '}
      <span data-screen="upgrade" style="cursor:pointer;text-decoration:underline">اشترك Pro للاستمرار ⭐</span>
    </span>
  </div>` : ''}
  <div class="chat-input-row">
    <button class="btn-icon" id="b-camera" title="حل مسألة بالصورة" style="font-size:22px;opacity:.8">📸</button>
    <button class="btn-icon" id="b-mic" title="إدخال صوتي" style="font-size:22px;opacity:.8;${S.recording?'color:#EF4444':''}">${S.recording?'⏹️':'🎤'}</button>
    <div style="flex:1;position:relative">
      <input id="f-msg" class="chat-input" placeholder="${S.recording?(S.lang==='en'?'Listening...':'جارٍ الاستماع...'):(S.lang==='en'?'Ask your question here...':'اكتب سؤالك هنا...')}" autocomplete="off" ${S.recording?'disabled':''} maxlength="2000" style="width:100%;padding-left:38px"/>
      ${S.messages.length>0?`<button id="b-clear-chat" title="مسح المحادثة" style="position:absolute;left:8px;top:50%;transform:translateY(-50%);background:none;border:none;font-size:16px;cursor:pointer;opacity:.4;transition:.15s" onmouseenter="this.style.opacity=1" onmouseleave="this.style.opacity=.4">🗑️</button>`:''}
    </div>
    <button class="send-btn" id="b-send">${t('إرسال ➤','send')}</button>
  </div>
  <input type="file" id="img-upload" accept="image/*" capture="environment" style="display:none"/>
  </div>
</div>`;
}

function tplFlashcards() {
  if (!S.flashcards.length) return `
<div class="screen-header"><div class="screen-title">🗂️ ${t('البطاقات التعليمية','flashcards')}</div></div>
<div class="screen-body empty-state">
  <div style="font-size:48px">🗂️</div>
  <div>${t('لا توجد بطاقات بعد','noNotes')}</div>
  <button class="btn btn-primary" id="gen-fc">${t('توليد بطاقات لـ','generate')}  ${esc(S.subject)}</button>
</div>`;
  const fc = S.flashcards[S.fcIndex];
  const pct = Math.round(((S.fcIndex+1)/S.flashcards.length)*100);
  return `
<div class="screen-header"><div class="screen-title">🗂️ ${t('البطاقات','flashcards')}</div>
  <button class="btn btn-secondary btn-sm" id="gen-fc">🔄 ${t('توليد جديد','generate')}</button>
</div>
<div class="screen-body">
  <div class="fc-progress"><div class="fc-progress-bar" style="width:${pct}%"></div></div>
  <div style="text-align:center;font-size:12px;color:var(--text-muted);margin-bottom:16px">${S.fcIndex+1} / ${S.flashcards.length}</div>
  <div class="fc-card${S.fcFlipped?' flipped':''}" id="fc-flip">
    <div class="fc-front">${esc(fc.front || fc.question || '')}</div>
    <div class="fc-back">${md(fc.back || fc.answer || '')}</div>
  </div>
  <div style="text-align:center;font-size:12px;color:var(--text-muted);margin:12px 0">${t('انقر على البطاقة لقلبها',S.lang==='en'?'Tap the card to flip it':'انقر على البطاقة لقلبها')}</div>
  <div style="display:flex;gap:12px;justify-content:center;margin-top:8px">
    <button class="btn btn-secondary" id="fc-prev" ${S.fcIndex===0?'disabled':''}>�' السابق</button>
    <button class="btn btn-primary"   id="fc-next" ${S.fcIndex===S.flashcards.length-1?'disabled':''}>التالي â†</button>
  </div>
</div>`;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   QUIZ
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function tplQuiz() {
  if (!S.quiz.length) return `
<div class="screen-header"><div class="screen-title">📝 الاختبار</div></div>
<div class="screen-body empty-state">
  <div style="font-size:48px">📝</div>
  <div>لا يوجد اختبار بعد</div>
  <button class="btn btn-primary" id="gen-qz">توليد اختبار لـ ${esc(S.subject)}</button>
</div>`;
  if (S.quizIndex >= S.quiz.length) {
    const pct = Math.round((S.quizScore/S.quiz.length)*100);
    return `
<div class="screen-header"><div class="screen-title">📝 نتيجة الاختبار</div></div>
<div class="screen-body" style="text-align:center">
  <div style="font-size:64px;margin:24px 0">${pct>=80?'🏆':pct>=60?'&#x1F44D;':'📚'}</div>
  <div style="font-size:28px;font-weight:900;color:var(--primary)">${pct}%</div>
  <div style="font-size:16px;margin:8px 0;color:var(--text-muted)">${S.quizScore} / ${S.quiz.length} إجابة صحيحة</div>
  <button class="btn btn-primary" id="gen-qz" style="margin-top:20px">اختبار جديد</button>
</div>`;
  }
  const q = S.quiz[S.quizIndex];
  const pct2 = Math.round(((S.quizIndex)/S.quiz.length)*100);
  return `
<div class="screen-header">
  <div class="screen-title">📝 سؤال ${S.quizIndex+1} / ${S.quiz.length}</div>
</div>
<div class="screen-body">
  <div class="fc-progress"><div class="fc-progress-bar" style="width:${pct2}%"></div></div>
  <div class="quiz-q">${esc(q.question)}</div>
  <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px">
    ${(q.options||[]).map((opt,i)=>{
      let cls='quiz-opt';
      if (S.quizAnswer!==null) {
        if (i===q.correct) cls+=' correct';
        else if (i===S.quizAnswer&&S.quizAnswer!==q.correct) cls+=' wrong';
      }
      return `<button class="quiz-opt-btn ${cls}" data-oi="${i}">${String.fromCharCode(65+i)}. ${esc(opt)}</button>`;
    }).join('')}
  </div>
  ${S.quizAnswer!==null ? `
  <div class="quiz-explain">${md(q.explanation||'')}</div>
  <button class="btn btn-primary" id="qz-next" style="margin-top:12px;width:100%">
    ${S.quizIndex+1===S.quiz.length?'النتيجة':'السؤال التالي â†'}
  </button>` : ''}
</div>`;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   STATS
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function tplStats() {
  const st = S.stats || { xp:0, streak:1, totalChats:0, weeklyActivity:[0,0,0,0,0,0,0], quizzesDone:0, bestScore:0 };
  const lvl = Math.floor((st.xp||0)/500)+1;
  const xpCur = (st.xp||0)%500;
  const xpPct = Math.round((xpCur/500)*100);
  const days = ['أحد','اثن','ثلا','أرب','خمي','جمع','سبت'];
  const week = (st.weeklyActivity||[0,0,0,0,0,0,0]);
  const maxW = Math.max(...week,1);
  const totalWeek = week.reduce((a,b)=>a+b,0);
  // Subject breakdown from history
  const subjCount = {};
  S.history.forEach(h => { if(h.subject) subjCount[h.subject] = (subjCount[h.subject]||0)+1; });
  const subjEntries = Object.entries(subjCount).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const maxSubj = subjEntries.length ? subjEntries[0][1] : 1;
  const badges = [
    { icon:'🎓', label:'مبتدئ',   req:'انضممت!',         unlocked: true },
    { icon:'⭐', label:'نشيط',    req:'10 محادثات',      unlocked: (st.totalChats||0)>=10 },
    { icon:'🏆', label:'متميز',   req:'500 XP',          unlocked: (st.xp||0)>=500 },
    { icon:'🔥', label:'مثابر',   req:'7 أيام متواصلة', unlocked: (st.streak||0)>=7 },
    { icon:'📝', label:'مختبِر', req:'5 اختبارات',      unlocked: (st.quizzesDone||0)>=5 },
    { icon:'💎', label:'خبير',    req:'2000 XP',         unlocked: (st.xp||0)>=2000 },
    { icon:'🧠', label:'عبقري',   req:'5000 XP',         unlocked: (st.xp||0)>=5000 },
    { icon:'👑', label:'أستاذ',   req:'10000 XP',        unlocked: (st.xp||0)>=10000 },
  ];
  const unlockedCount = badges.filter(b=>b.unlocked).length;
  return `
<div class="screen-header">
  <div class="screen-title">📊 ${t('إحصائياتي','myStats').replace('📊 ','')}</div>
  <button class="btn btn-secondary btn-sm" id="b-share-stats">${t('📤 مشاركة','shareStats')}</button>
</div>
<div class="screen-body">

  <!-- Top KPIs -->
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px">
    <div class="stat-card" style="border-color:#F59E0B44">
      <div class="stat-val" style="color:#F59E0B">${st.xp||0}</div>
      <div class="stat-lbl">${S.lang==='en'?'XP Points':'نقطة XP'}</div>
    </div>
    <div class="stat-card" style="border-color:#EF444444">
      <div class="stat-val">${st.streak||0} 🔥</div>
      <div class="stat-lbl">${S.lang==='en'?'Day Streak':'يوم متواصل'}</div>
    </div>
    <div class="stat-card" style="border-color:#3B82F644">
      <div class="stat-val" style="color:#3B82F6">${lvl}</div>
      <div class="stat-lbl">${S.lang==='en'?'Level':'المستوى'}</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${st.totalChats||0}</div>
      <div class="stat-lbl">${S.lang==='en'?'Chats':'محادثة'}</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${st.quizzesDone||0}</div>
      <div class="stat-lbl">${S.lang==='en'?'Quizzes':'اختبار'}</div>
    </div>
    <div class="stat-card" style="border-color:#22C55E44">
      <div class="stat-val" style="color:#22C55E">${st.bestScore||0}%</div>
      <div class="stat-lbl">${S.lang==='en'?'Best Score':'أعلى نتيجة'}</div>
    </div>
  </div>

  <!-- XP Progress -->
  <div class="info-card" style="margin-bottom:16px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <span style="font-weight:800;font-size:15px">المستوى ${lvl}
        <span style="font-size:12px;color:var(--text-muted);font-weight:400">← المستوى ${lvl+1}</span>
      </span>
      <span style="color:var(--primary);font-weight:700">${xpCur} / 500 XP</span>
    </div>
    <div style="background:var(--border);border-radius:999px;height:12px;overflow:hidden">
      <div style="background:linear-gradient(90deg,var(--primary),#818CF8);width:${xpPct}%;height:100%;border-radius:999px;transition:.6s;position:relative">
        ${xpPct>10?`<div style="position:absolute;right:6px;top:0;bottom:0;display:flex;align-items:center;font-size:9px;color:#fff;font-weight:800">${xpPct}%</div>`:''}
      </div>
    </div>
    <div style="font-size:11px;color:var(--text-muted);margin-top:6px">${500-xpCur} ${S.lang==='en'?'points to next level':'نقطة للمستوى التالي'}</div>
  </div>

  <!-- Weekly Activity Chart -->
  <div class="info-card" style="margin-bottom:16px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
      <span style="font-weight:800">📈 ${S.lang==='en'?'Weekly Activity':'النشاط الأسبوعي'}</span>
      <span style="font-size:12px;color:var(--primary);font-weight:700">${totalWeek} ${S.lang==='en'?'chats this week':'محادثة هذا الأسبوع'}</span>
    </div>
    <div style="display:flex;gap:6px;align-items:flex-end;height:90px">
      ${week.map((v,i)=>`
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
        ${v>0?`<div style="font-size:9px;color:var(--primary);font-weight:700">${v}</div>`:'<div style="font-size:9px">&nbsp;</div>'}
        <div style="width:100%;background:${v?'linear-gradient(180deg,var(--primary),#818CF8)':'var(--border)'};
                    border-radius:6px 6px 2px 2px;height:${Math.round((v/maxW)*60)+4}px;
                    transition:.4s;min-height:4px"></div>
        <span style="font-size:10px;color:${v?'var(--text)':'var(--text-muted)'};font-weight:${v?700:400}">${days[i]}</span>
      </div>`).join('')}
    </div>
  </div>

  <!-- Subject Breakdown -->
  ${subjEntries.length ? `
  <div class="info-card" style="margin-bottom:16px">
    <div style="font-weight:800;margin-bottom:14px">📚 ${S.lang==='en'?'Most Studied Subjects':'المواد الأكثر دراسةً'}</div>
    ${subjEntries.map(([subj,cnt])=>`
    <div style="margin-bottom:10px">
      <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
        <span style="font-weight:700">${esc(subj)}</span>
        <span style="color:var(--text-muted)">${cnt} ${S.lang==='en'?'chats':'محادثة'}</span>
      </div>
      <div style="background:var(--border);border-radius:999px;height:7px;overflow:hidden">
        <div style="background:var(--primary);width:${Math.round(cnt/maxSubj*100)}%;height:100%;border-radius:999px;transition:.4s"></div>
      </div>
    </div>`).join('')}
  </div>` : ''}

  <!-- Badges -->
  <div class="info-card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
      <span style="font-weight:800">🏅 ${S.lang==='en'?'Badges':'الشارات'}</span>
      <span style="font-size:12px;color:var(--text-muted)">${unlockedCount} / ${badges.length} ${S.lang==='en'?'unlocked':'مفتوحة'}</span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
      ${badges.map(b=>`
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;
                  opacity:${b.unlocked?1:0.3};transition:.3s"
           title="${b.req}">
        <div style="font-size:30px;filter:${b.unlocked?'drop-shadow(0 0 6px #F59E0B88)':'none'}">${b.icon}</div>
        <div style="font-size:11px;font-weight:${b.unlocked?800:400};
                    color:${b.unlocked?'var(--primary)':'var(--text-muted)'};text-align:center">${b.label}</div>
        ${b.unlocked?(S.lang==='en'?'<div style="font-size:9px;color:#22C55E">✅ Unlocked</div>':'<div style="font-size:9px;color:#22C55E">✅ مفتوحة</div>'):'<div style="font-size:9px;color:var(--text-muted)">${b.req}</div>'}
      </div>`).join('')}
    </div>
  </div>

</div>`;
}
function tplProfile() {
  const u = S.user || {};
  const curData = CURRICULA[S.curriculum] || CURRICULA.egypt;
  const planExpiry = u.planExpiry ? new Date(u.planExpiry).toLocaleDateString('ar-EG') : null;
  const isPro = u.plan === 'pro';
  return `
<div class="screen-header"><div class="screen-title">\u{1F464} ${t('ملفي الشخصي','myProfile').replace('👤 ','')}</div></div>
<div class="screen-body">

  <!-- Avatar + Plan -->
  <div class="info-card" style="text-align:center;margin-bottom:16px">
    <div style="font-size:64px;margin-bottom:8px">\u{1F464}</div>
    <div style="font-size:20px;font-weight:900;margin-bottom:4px">${esc(u.name||'مستخدم')}</div>
    <div style="color:var(--text-muted);font-size:13px;margin-bottom:8px">${esc(u.email||'')}</div>
    <div style="display:inline-flex;align-items:center;gap:6px;padding:5px 16px;
                background:${isPro?'#F59E0B22':'var(--bg-card2)'};
                color:${isPro?'#F59E0B':'var(--text-muted)'};
                border:1px solid ${isPro?'#F59E0B44':'var(--border)'};
                border-radius:20px;font-size:13px;font-weight:800">
      ${isPro?'⭐ Pro':'مجاني'}
    </div>
    ${planExpiry ? `<div style="font-size:11px;color:var(--text-muted);margin-top:6px">${S.lang==='en'?'Pro valid until:':'صلاحية Pro حتى:'} ${planExpiry}</div>` : ''}
  </div>

  <!-- Referral -->
  ${u.referralCode ? `
  <div class="info-card" style="margin-bottom:16px;border-color:#F59E0B44;background:linear-gradient(135deg,#F59E0B08,transparent)">
    <div style="font-weight:800;margin-bottom:10px;font-size:15px">🎁 ${S.lang==='en'?'Referral Code — Get 7 days Pro free!':'كود الإحالة — احصل على 7 أيام Pro مجاناً!'}</div>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
      <div style="flex:1;background:var(--bg);border:2px dashed #F59E0B;border-radius:8px;
                  padding:10px 14px;font-size:20px;font-weight:900;color:#F59E0B;
                  letter-spacing:3px;text-align:center">${esc(u.referralCode)}</div>
      <button class="btn btn-secondary btn-sm" id="b-copy-ref">📋 ${S.lang==='en'?'Copy':'نسخ'}</button>
    </div>
    <button class="btn btn-primary btn-sm" id="b-whatsapp-ref"  style="width:100%;background:#25D366;border-color:#25D366;font-size:13px">
      ${S.lang==='en'?'💬 Share on WhatsApp':'💬 شارك عبر واتساب'}
    </button>
    <div style="font-size:12px;color:var(--text-muted);margin-top:8px;text-align:center">
      ${S.lang==='en'?'Every friend who signs up with your code gets 7 free Pro days 🎉':'كل صديق يسجّل بكودك ← أنت وهو تحصلون على 7 أيام Pro مجاناً 🎉'}
    </div>
  </div>` : ''}

  <!-- Edit Name -->
  <div class="info-card" style="margin-bottom:16px">
    <div style="font-weight:800;margin-bottom:10px">\u{270F}️ تعديل الاسم</div>
    <div style="display:flex;gap:8px">
      <input id="p-name" class="form-input" value="${esc(u.name||'')}" placeholder="الاسم الجديد" style="flex:1"/>
      <button class="btn btn-primary btn-sm" id="b-save-name">حفظ</button>
    </div>
  </div>

  <!-- Change Password -->
  <div class="info-card" style="margin-bottom:16px">
    <div style="font-weight:800;margin-bottom:10px">\u{1F510} تغيير كلمة المرور</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <input id="p-pass1" class="form-input" type="password" placeholder="كلمة المرور الجديدة"/>
      <input id="p-pass2" class="form-input" type="password" placeholder="تأكيد كلمة المرور"/>
      <button class="btn btn-primary btn-sm" id="b-save-pass">تغيير كلمة المرور</button>
      <div id="p-pass-msg" style="display:none;font-size:12px"></div>
    </div>
  </div>

  <!-- Current Curriculum -->
  <div class="info-card" style="margin-bottom:16px">
    <div style="font-weight:800;margin-bottom:10px">\u{1F30D} المنهج الحالي</div>
    <div style="font-size:18px;font-weight:900;color:var(--primary)">${curData.label}</div>
    <div style="color:var(--text-muted);font-size:13px;margin-top:4px">المرحلة: ${gradeData.label||S.grade}</div>
    <div style="color:var(--text-muted);font-size:13px">المادة: ${esc(S.subject)}</div>
    <button class="btn btn-secondary btn-sm" id="go-lessons-p" style="margin-top:12px">تغيير المنهج</button>
  </div>

  <!-- Notifications -->
  <div class="info-card" style="margin-bottom:16px">
    <div style="font-weight:800;margin-bottom:10px">🔔 الإشعارات</div>
    <div style="font-size:13px;color:var(--text-muted);margin-bottom:10px">
      ${S.lang==='en'?'Enable daily study reminders':'فعّل إشعارات التذكير اليومي بالمذاكرة'}
    </div>
    <button class="btn btn-secondary btn-sm" id="b-push" style="width:100%">
      ${('Notification' in window && Notification.permission === 'granted') ? '✅ الإشعارات مفعّلة' : '🔔 تفعيل الإشعارات'}
    </button>
  </div>

  ${!isPro ? `
  <button class="btn btn-primary" data-screen="upgrade" style="width:100%;margin-bottom:12px">${t('⭐ ترقية إلى Pro','upgrade')}</button>
  ` : ''}

  <!-- PWA Install -->
  <button class="btn btn-secondary" id="b-pwa-install" style="width:100%;margin-bottom:12px;display:none">
    📲 تثبيت التطبيق على هاتفك
  </button>

  <button class="btn btn-secondary" id="b-logout" style="width:100%">${t('🚪 تسجيل الخروج','logout')}</button>
</div>`;
}
function tplNotes() {
  const noteColors = ['#3B82F6','#22C55E','#F59E0B','#EF4444','#8B5CF6','#EC4899'];
  const q = (S.noteSearch||'').toLowerCase();
  const filtered = q ? S.notes.filter(n=>(n.text||n).toLowerCase().includes(q)) : S.notes;
  return `
<div class="screen-header">
  <div class="screen-title">🗒️ ${S.lang==='en'?'My Notes':'ملاحظاتي'}</div>
  <span style="font-size:12px;color:var(--text-muted)">${S.notes.length} ${S.lang==='en'?'notes':'ملاحظة'}</span>
</div>
<div class="screen-body">
  <!-- Add note -->
  <div class="info-card" style="margin-bottom:16px">
    <textarea id="note-inp" class="form-input" placeholder="${S.lang==='en'?'Write a new note...':'اكتب ملاحظة جديدة...'}" rows="3"
      style="resize:none;width:100%;margin-bottom:10px" maxlength="500"></textarea>
    <div style="display:flex;align-items:center;justify-content:space-between">
      <div style="display:flex;gap:6px">
        ${noteColors.map(c=>`<div class="note-color-dot" data-color="${c}"
          style="width:20px;height:20px;border-radius:50%;background:${c};cursor:pointer;
                 border:2px solid ${(S.noteColor||noteColors[0])===c?'#fff':'transparent'};transition:.2s"></div>`).join('')}
      </div>
      <button class="btn btn-primary btn-sm" id="note-add">➕ ${S.lang==='en'?'Add':'إضافة'}</button>
    </div>
  </div>
  <!-- Search -->
  ${S.notes.length>3?`<input type="text" class="form-input" placeholder="${S.lang==='en'?'🔍 Search notes...':'🔍 ابحث في الملاحظات...'}" value="${esc(q)}"
    style="margin-bottom:14px" oninput="S.noteSearch=this.value;render()"/>`:'' }
  <!-- Notes list -->
  ${filtered.length===0?`<div class="empty-state"><div style="font-size:40px">🗒️</div><div>${q?(S.lang==='en'?'No results':'لا نتائج'):(S.lang==='en'?'Write your first note!':'اكتب ملاحظتك الأولى!')}</div></div>`:''}
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px">
    ${filtered.map((n,i)=>{
      const text = n.text||n; const color = n.color||'#3B82F6'; const date = n.date||'';
      return `<div class="info-card" style="border-right:4px solid ${color};position:relative">
        <div style="font-size:14px;line-height:1.7;margin-bottom:28px">${esc(text)}</div>
        <div style="position:absolute;bottom:10px;left:0;right:0;padding:0 12px;display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:10px;color:var(--text-muted)">${date}</span>
          <div style="display:flex;gap:4px">
            <button style="background:none;border:none;cursor:pointer;font-size:14px;opacity:.5" title="نسخ"
              onclick="navigator.clipboard?.writeText('${text.replace(/'/g,"\\'")}');event.target.textContent='✅';setTimeout(()=>event.target.textContent='📋',1200)">📋</button>
            <button class="btn-icon" data-ni="${i}" title="حذف" style="font-size:14px;opacity:.5">🗑️</button>
          </div>
        </div>
      </div>`;
    }).join('')}
  </div>
</div>`;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   BOOKMARKS
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function tplBookmarks() {
  const q = (S.bmSearch||'').toLowerCase();
  const filtered = q ? S.bookmarks.filter(b=>(b.content||'').toLowerCase().includes(q)||(b.subject||'').toLowerCase().includes(q)) : S.bookmarks;
  return `
<div class="screen-header">
  <div class="screen-title">🔖 ${S.lang==='en'?'Bookmarks':'المحفوظات'}</div>
  <span style="font-size:12px;color:var(--text-muted)">${S.bookmarks.length} ${S.lang==='en'?'saved':'محفوظ'}</span>
</div>
<div class="screen-body">
  ${S.bookmarks.length>2?`<input type="text" class="form-input" placeholder="${S.lang==='en'?'🔍 Search bookmarks...':'🔍 ابحث في المحفوظات...'}" value="${esc(q)}"
    style="margin-bottom:14px" oninput="S.bmSearch=this.value;render()"/>`:'' }
  ${filtered.length===0?`<div class="empty-state"><div style="font-size:40px">🔖</div><div>${q?'لا نتائج':(S.lang==='en'?'Save AI responses by tapping 🔖':'احفظ ردود المساعد بالضغط على 🔖')}</div></div>`:''}
  <div style="display:flex;flex-direction:column;gap:12px">
    ${filtered.map((b,i)=>`
    <div class="info-card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;gap:8px">
        <div style="display:flex;align-items:center;gap:6px">
          <span style="background:var(--primary)22;color:var(--primary);border-radius:12px;padding:2px 10px;font-size:11px;font-weight:700">${esc(b.subject||'عام')}</span>
          <span style="font-size:11px;color:var(--text-muted)">${esc(b.date||'')}</span>
        </div>
        <div style="display:flex;gap:4px">
          <button class="btn-icon bm-copy" data-bi="${i}" title="نسخ" style="font-size:13px">📋</button>
          <button class="btn-icon bm-wa" data-bi="${i}" title="واتساب" style="font-size:13px">💬</button>
          <button class="btn-icon" data-bi="${i}" title="حذف" style="font-size:13px">🗑️</button>
        </div>
      </div>
      <div style="font-size:13px;line-height:1.8;max-height:200px;overflow:hidden;position:relative">
        ${md(b.content)}
        <div style="position:absolute;bottom:0;left:0;right:0;height:40px;background:linear-gradient(transparent,var(--bg-card))"></div>
      </div>
      <button class="btn btn-secondary btn-sm bm-expand" data-bi="${i}" style="margin-top:8px;width:100%;font-size:12px">${S.lang==='en'?'View full ↓':'عرض الكامل ↓'}</button>
    </div>`).join('')}
  </div>
</div>`;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   WRONG ANSWERS
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function tplWrong() {
  const grouped = {};
  S.wrongAnswers.forEach((w,i) => {
    const k = w.subject || 'عام';
    if (!grouped[k]) grouped[k] = [];
    grouped[k].push({...w, _idx:i});
  });
  return `
<div class="screen-header">
  <div class="screen-title">❌ ${S.lang==='en'?'Mistakes Review':'مراجعة الأخطاء'}</div>
  ${S.wrongAnswers.length>0?(S.lang==='en'?'<button class="btn btn-secondary btn-sm" id="b-retry-wrong">🔄 Retry Quiz</button>':'<button class="btn btn-secondary btn-sm" id="b-retry-wrong">🔄 أعد الاختبار</button>'):''}
</div>
<div class="screen-body">
  ${S.wrongAnswers.length===0?`
  <div class="empty-state">
    <div style="font-size:64px">✅</div>
    <div style="font-size:18px;font-weight:800;color:#22C55E">${S.lang==='en'?'Great! No mistakes recorded':'رائع! لا توجد أخطاء'}</div>
    <div style="font-size:13px;color:var(--text-muted)">${S.lang==='en'?'Keep taking quizzes for feedback':'استمر في الاختبارات للحصول على تغذية راجعة'}</div>
  </div>`:''}
  ${Object.entries(grouped).map(([subj, items]) => `
  <div style="margin-bottom:20px">
    <div style="font-weight:900;font-size:14px;color:var(--primary);margin-bottom:10px;display:flex;align-items:center;gap:8px">
      📚 ${esc(subj)}
      <span style="background:var(--danger)22;color:var(--danger);border-radius:12px;padding:2px 10px;font-size:11px">${items.length} ${S.lang==='en'?'mistakes':'أخطاء'}</span>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px">
      ${items.map(w => `
      <div class="info-card" style="border-right:3px solid #EF4444">
        <div style="font-weight:700;margin-bottom:10px;font-size:14px;line-height:1.6">❓ ${esc(w.question)}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
          <div style="background:#EF444422;border:1px solid #EF444444;border-radius:8px;padding:8px;font-size:13px">
            <div style="font-size:10px;color:#EF4444;font-weight:800;margin-bottom:4px">${S.lang==='en'?'Your Answer':'إجابتك'}</div>
            ${esc(w.yourAnswer||'-')}
          </div>
          <div style="background:#22C55E22;border:1px solid #22C55E44;border-radius:8px;padding:8px;font-size:13px">
            <div style="font-size:10px;color:#22C55E;font-weight:800;margin-bottom:4px">${S.lang==='en'?'Correct Answer':'الإجابة الصحيحة'}</div>
            ${esc(w.correctAnswer||'-')}
          </div>
        </div>
        ${w.explanation?`<div style="background:var(--bg);border-radius:8px;padding:10px;font-size:12px;color:var(--text-muted);line-height:1.8;margin-bottom:10px">${md(w.explanation)}</div>`:''}
        <div style="display:flex;gap:6px">
          <button class="btn btn-primary btn-sm ask-ai-wrong" data-q="${esc(w.question)}" data-ans="${esc(w.correctAnswer||'')}" style="flex:1">${S.lang==='en'?'🤖 Explain this':'🤖 اشرح لي'}</button>
          <button class="btn btn-secondary btn-sm" data-wi="${w._idx}">🗑️ حذف</button>
        </div>
      </div>`).join('')}
    </div>
  </div>`).join('')}
</div>`;
}
function tplPomodoro() {
  const sessions = S.pomodoroSessions || 0;
  const isWork   = S.pomodoroMode === 'work';
  const isLongBrk= S.pomodoroMode === 'longbreak';
  const durations = { work: 25*60, break: 5*60, longbreak: 15*60 };
  const total = durations[S.pomodoroMode] || 25*60;
  const left  = S.pomodoroLeft;
  const pct   = 1 - (left / total);
  const mins  = String(Math.floor(left/60)).padStart(2,'0');
  const secs  = String(left%60).padStart(2,'0');
  const r=88, cx=100, cy=100, circ=2*Math.PI*r;
  const strokeColor = isWork ? 'var(--primary)' : isLongBrk ? '#8B5CF6' : '#22C55E';
  const quotes = [
    'كل دقيقة تركّز فيها تُقرّبك من هدفك 🎯',
    'العقل كالعضلة — يقوى بالتمرين المنتظم 💪',
    'التركيز ليس موهبة بل عادة تُبنى يوماً بيوم ⭐',
    'الطلاب المتفوقون لا يدرسون أكثر — بل يدرسون أذكى 🧠',
    'خمسة وعشرون دقيقة تركيز تساوي ساعتين من التشتت ⚡',
  ];
  const quote = quotes[sessions % quotes.length];
  return `
<div class="screen-header"><div class="screen-title">⏱️ ${S.lang==='en'?'Pomodoro Timer':'بومودورو'}</div></div>
<div class="screen-body" style="display:flex;flex-direction:column;align-items:center;padding-top:16px">
  <div style="display:flex;gap:6px;margin-bottom:20px;align-items:center">
    ${Array(4).fill(0).map((_,i)=>
      '<div style="width:12px;height:12px;border-radius:50%;background:'+(i<(sessions%4)?'var(--primary)':'var(--border)')+';transition:.3s"></div>'
    ).join('')}
    <span style="font-size:12px;color:var(--text-muted);margin-right:8px">${sessions} جلسة</span>
  </div>
  <div style="display:flex;gap:6px;margin-bottom:24px;background:var(--bg-card2);border-radius:12px;padding:4px">
    <button class="btn ${isWork?'btn-primary':'btn-ghost'}" id="pom-work" style="padding:7px 14px;font-size:13px">${S.lang==='en'?'⚡ Work 25m':'⚡ عمل 25د'}</button>
    <button class="btn ${S.pomodoroMode==='break'?'btn-primary':'btn-ghost'}" id="pom-break" style="padding:7px 14px;font-size:13px">${S.lang==='en'?'☕ Break 5m':'☕ استراحة 5د'}</button>
    <button class="btn ${isLongBrk?'btn-primary':'btn-ghost'}" id="pom-longbreak" style="padding:7px 14px;font-size:13px">${S.lang==='en'?'🌿 Long 15m':'🌿 طويلة 15د'}</button>
  </div>
  <div style="position:relative;margin-bottom:20px">
    <svg width="220" height="220" viewBox="0 0 200 200">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--border)" stroke-width="12"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${strokeColor}" stroke-width="12"
        stroke-dasharray="${circ*pct} ${circ*(1-pct)}" stroke-dashoffset="${circ*0.25}"
        stroke-linecap="round" style="transition:stroke-dasharray .8s linear"/>
      <text x="${cx}" y="${cy-8}" text-anchor="middle" dominant-baseline="middle"
        style="font-family:Cairo,sans-serif;font-size:32px;font-weight:900;fill:var(--text)">${mins}:${secs}</text>
      <text x="${cx}" y="${cy+22}" text-anchor="middle"
        style="font-family:Cairo,sans-serif;font-size:12px;fill:var(--text-muted)">${S.lang==='en'?(isWork?'⚡ Focus time':isLongBrk?'🌿 Long break':'☕ Short break'):(isWork?'⚡ وقت التركيز':isLongBrk?'🌿 استراحة طويلة':'☕ استراحة قصيرة')}</text>
    </svg>
    ${S.pomodoroRunning?'<div style="position:absolute;top:-4px;right:-4px;width:14px;height:14px;background:#22C55E;border-radius:50%;animation:pulse-dot 1s ease-in-out infinite"></div>':''}
  </div>
  <div style="display:flex;gap:12px;margin-bottom:24px">
    <button class="btn btn-primary" id="pom-toggle" style="min-width:120px;font-size:16px;padding:12px 24px">
      ${S.pomodoroRunning?(S.lang==='en'?'⏸ Pause':'⏸ إيقاف'):(S.lang==='en'?'▶ Start':'▶ ابدأ')}
    </button>
    <button class="btn btn-secondary" id="pom-reset" style="padding:12px 20px">🔄</button>
  </div>
  <div style="max-width:340px;text-align:center;font-size:13px;color:var(--text-muted);background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:14px;line-height:1.8">
    "${quote}"
  </div>
  ${sessions>0?`<div style="margin-top:16px;font-size:13px;color:var(--text-muted)">${S.lang==='en'?'⏱ Today total:':'⏱ مجموع اليوم:'} <b style="color:var(--primary)">${sessions*25} ${S.lang==='en'?'min':'دقيقة'}</b> ${S.lang==='en'?'actual study':'دراسة فعلية'}</div>`:''}
</div>
<style>@keyframes pulse-dot{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.4);opacity:.7}}</style>`;
}
function tplSchedule() {
  const days = ['السبت','الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة'];
  return `
<div class="screen-header"><div class="screen-title">📅 ${S.lang==='en'?'Study Schedule':'جدول الدراسة'}</div></div>
<div class="screen-body">
  <div class="info-card" style="margin-bottom:16px">
    <div style="font-weight:800;margin-bottom:12px">➕ ${S.lang==='en'?'Add Session':'إضافة جلسة'}</div>
    <div style="display:flex;flex-wrap:wrap;gap:8px">
      <select id="sch-day" class="form-input" style="flex:1;min-width:120px">
        ${days.map(d=>`<option>${d}</option>`).join('')}
      </select>
      <input id="sch-time" class="form-input" type="time" value="16:00" style="flex:1;min-width:100px"/>
      <input id="sch-subj" class="form-input" placeholder="${S.lang==='en'?'Subject':'المادة'}" style="flex:2;min-width:140px"/>
      <button class="btn btn-primary" id="sch-add">${S.lang==='en'?'Add':'إضافة'}</button>
    </div>
  </div>
  ${S.schedule.length===0?`<div class="empty-state"><div style="font-size:40px">📅</div><div>${S.lang==='en'?'No schedule yet':'لا يوجد جدول بعد'}</div></div>`:''}
  <div style="display:flex;flex-direction:column;gap:8px">
    ${S.schedule.map((it,i)=>`
    <div class="info-card" style="display:flex;justify-content:space-between;align-items:center">
      <div>
        <span style="font-weight:800">${esc(it.day)}</span>
        <span style="color:var(--text-muted);margin:0 8px">${esc(it.time)}</span>
        <span style="color:var(--primary)">${esc(it.subject)}</span>
      </div>
      <button class="btn-icon" data-si="${i}">🗒️</button>
    </div>`).join('')}
  </div>
</div>`;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   HISTORY
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function tplHistory() {
  const q = (S.historySearch || '').trim().toLowerCase();
  const filtered = q
    ? S.history.filter(h =>
        (h.preview||'').toLowerCase().includes(q) ||
        (h.subject||'').toLowerCase().includes(q) ||
        (h.date||'').toLowerCase().includes(q)
      )
    : S.history;
  return `
<div class="screen-header"><div class="screen-title">🕒 ${S.lang==='en'?'Chat History':'سجل المحادثات'}</div></div>
<div class="screen-body">
  <div style="margin-bottom:12px">
    <input id="history-search" type="text" placeholder="${S.lang==='en'?'🔍 Search history...':'🔍 ابحث في السجل...'}" value="${esc(S.historySearch||'')}"
      style="width:100%;padding:10px 14px;background:var(--bg-card2);border:1px solid var(--border);border-radius:10px;color:var(--text);font-family:inherit;font-size:14px;box-sizing:border-box"
      oninput="S.historySearch=this.value;render()"/>
  </div>
  ${filtered.length===0?`<div class="empty-state"><div style="font-size:40px">🕒</div><div>${q?(S.lang==='en'?'No results':'لا نتائج للبحث'):(S.lang==='en'?'No history yet':'لا يوجد سجل بعد')}</div></div>`:''}
  <div style="display:flex;flex-direction:column;gap:10px">
    ${filtered.map(h=>`
    <div class="info-card">
      <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">${esc(h.date||'')} &middot; ${esc(h.subject||'')}</div>
      <div style="font-size:13px">${esc(h.preview||'')}</div>
    </div>`).join('')}
  </div>
</div>`;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   LEADERBOARD
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function tplLeaderboard() {
  const medals = ['🥇','🥈','🥉'];
  return `
<div class="screen-header"><div class="screen-title">🏆 ${S.lang==='en'?'Leaderboard':'المتصدرون'}</div></div>
<div class="screen-body">
  ${S.leaderboard.length===0?`<div style="display:flex;flex-direction:column;gap:10px">${Array(6).fill(0).map(()=>`
    <div style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius)">
      <div class="skeleton" style="width:32px;height:32px;border-radius:50%"></div>
      <div style="flex:1;display:flex;flex-direction:column;gap:6px">
        <div class="skeleton" style="height:12px;width:120px"></div>
        <div class="skeleton" style="height:10px;width:60px"></div>
      </div>
    </div>`).join('')}</div>`:''}
  <div style="display:flex;flex-direction:column;gap:8px">
    ${S.leaderboard.map((u,i)=>`
    <div class="info-card" style="display:flex;align-items:center;gap:12px;${u.isMe?'border-color:var(--primary);background:var(--primary)11':''}">
      <div style="font-size:22px;min-width:32px;text-align:center">${medals[i]||('#'+(i+1))}</div>
      <div style="flex:1">
        <div style="font-weight:800">${esc(u.name)}</div>
        <div style="font-size:12px;color:var(--text-muted)">${u.xp||0} XP</div>
      </div>
      ${u.isMe?(S.lang==='en'?'<span style="font-size:11px;color:var(--primary);font-weight:800">You</span>':'<span style="font-size:11px;color:var(--primary);font-weight:800">أنت</span>'):''}
    </div>`).join('')}
  </div>
</div>`;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SUMMARY
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function tplSummary() {
  return `
<div class="screen-header">
  <div class="screen-title">📋 ${S.lang==='en'?'Smart Summary':'الملخص الذكي'}</div>
  ${S.summaryText?`<button class="btn btn-secondary btn-sm" onclick="exportPDF()">📥 PDF</button>`:''}
</div>
<div class="screen-body">
  <div class="info-card" style="margin-bottom:16px">
    <div style="font-weight:800;margin-bottom:10px">📌 موضوع الملخص</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <input id="sum-topic" class="form-input" placeholder="مثال: قوانين نيوتن في الفيزياء" style="flex:1;min-width:180px"/>
      <select id="pdf-type" class="subj-sel">
        <option value="summary">ملخص شامل</option>
        <option value="formulas">قوانين ومعادلات</option>
        <option value="questions">أسئلة تدريبية</option>
      </select>
      <button class="btn btn-primary" id="b-gen-sum">توليد</button>
    </div>
  </div>
  ${S.summaryLoading?'<div class="empty-state"><div class="spinner"></div><div>جارٍ التوليد...</div></div>':''}
  ${S.summaryText?`
  <div class="info-card" style="line-height:1.9;font-size:14px">${md(S.summaryText)}</div>
  <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
    <button class="btn btn-primary" onclick="exportPDF()">📥 تصدير PDF / طباعة</button>
    <button class="btn btn-secondary" onclick="S.summaryText='';render()">🔄 ملخص جديد</button>
  </div>`:''}
  ${!S.summaryLoading&&!S.summaryText?'<div class="empty-state"><div style="font-size:48px">📋</div><div>أدخل موضوعاً واضغط توليد</div><div style="font-size:12px;color:var(--text-muted)">يمكنك اختيار ملخص أو قوانين أو أسئلة تدريبية</div></div>':''}
</div>`;
}

function tplMindMap() {
  let mapHtml = '';
  if (S.mindMapData) {
    try {
      const d = typeof S.mindMapData==='string'?JSON.parse(S.mindMapData):S.mindMapData;
      mapHtml = renderMindMap(d);
    } catch { mapHtml = `<pre style="font-size:12px;overflow:auto">${esc(JSON.stringify(S.mindMapData,null,2))}</pre>`; }
  }
  return `
<div class="screen-header"><div class="screen-title">🧠 الخريطة الذهنية</div></div>
<div class="screen-body">
  <div class="info-card" style="margin-bottom:16px">
    <div style="display:flex;gap:8px">
      <input id="mm-topic" class="form-input" value="${esc(S.mindMapTopic)}" placeholder="أدخل موضوعاً..." style="flex:1"/>
      <button class="btn btn-primary" id="b-gen-mm">توليد</button>
    </div>
  </div>
  ${S.mindMapData?mapHtml:'<div class="empty-state"><div style="font-size:40px">🧠</div><div>أدخل موضوعاً لتوليد الخريطة</div></div>'}
</div>`;
}
function renderMindMap(d) {
  if (!d) return '';
  const branches=(d.branches||d.children||[]).map(b=>`
  <div class="mm-branch">
    <div class="mm-branch-title">${esc(b.title||b.name||b)}</div>
    ${(b.children||b.topics||[]).map(c=>`<div class="mm-leaf">${esc(c.title||c.name||c)}</div>`).join('')}
  </div>`).join('');
  return `<div class="mm-wrap"><div class="mm-center">${esc(d.title||d.topic||'')}</div><div class="mm-branches">${branches}</div></div>`;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   TEXTBOOK
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
/* ══════════════════════════════════════════════════════════════
   TEXTBOOK DATABASE — روابط PDF مُحقَّقة 2025-2026
   المصادر: خادم وزارة التعليم (blob) + Google Drive (للكتب غير المتوفرة)
   ══════════════════════════════════════════════════════════════ */
const BOOKS  = './books'; // self-hosted PDFs on GitHub Pages (same-origin, no iframe restrictions)
const BLOB26 = 'https://elearnningcontent.blob.core.windows.net/elearnningcontent/2026';
const gdrive = id => `https://drive.google.com/file/d/${id}/preview`;
const gdown  = id => `https://drive.google.com/uc?id=${id}&export=download`;

const TEXTBOOK_DB = {
  egypt: {
    // ── الصف الأول الثانوي ─────────────────────────────────────────
    high1: [
      { subj:'الرياضيات', icon:'🔢', color:'#3B82F6', books:[
        { title:'الرياضيات (عربي) ت١ 2025-2026', term:'أول ثانوي — ترم أول', url:`${BOOKS}/math_ar_1sec_t1.pdf` },
        { title:'الرياضيات (إنجليزي) ت١ 2025-2026', term:'أول ثانوي — ترم أول', url:`${BOOKS}/math_en_1sec_t1.pdf` },
      ]},
      { subj:'العلوم المتكاملة', icon:'🔬', color:'#10B981', books:[
        { title:'العلوم المتكاملة (عربي) ت١ 2025-2026', term:'أول ثانوي — ترم أول', url:`${BOOKS}/science_1sec_t1.pdf` },
        { title:'Integrated Science (English) T1 2025-2026', term:'أول ثانوي — ترم أول', url:`${BOOKS}/science_en_1sec_t1.pdf` },
      ]},
      { subj:'اللغة العربية', icon:'📜', color:'#8B5CF6', books:[
        { title:'اللغة العربية ت١ 2025-2026', term:'أول ثانوي — ترم أول', url:`${BOOKS}/arabic_1sec_t1.pdf` },
      ]},
      { subj:'اللغة الإنجليزية', icon:'🗣️', color:'#F97316', books:[
        { title:'New Hello — Student Book ت١ 2025-2026', term:'أول ثانوي — ترم أول', url:`${BOOKS}/english_1sec_t1.pdf` },
      ]},
      { subj:'الفلسفة والمنطق', icon:'🧠', color:'#6366F1', books:[
        { title:'الفلسفة والمنطق ت١ 2025-2026', term:'أول ثانوي — ترم أول', url:`${BOOKS}/philosophy_1sec_t1.pdf` },
      ]},
      { subj:'التاريخ', icon:'🏛️', color:'#D97706', books:[
        { title:'التاريخ ت١ 2025-2026', term:'أول ثانوي — ترم أول', url:`${BOOKS}/history_1sec_t1.pdf` },
      ]},
      { subj:'التربية الإسلامية', icon:'☪️', color:'#059669', books:[
        { title:'التربية الإسلامية 2025-2026', term:'أول ثانوي', url:`${BOOKS}/islam_1sec.pdf` },
      ]},
      { subj:'تكنولوجيا المعلومات', icon:'💻', color:'#0EA5E9', books:[
        { title:'تكنولوجيا المعلومات والاتصالات ت١ 2025-2026', term:'أول ثانوي — ترم أول', url:`${BOOKS}/ict_1sec_t1.pdf` },
      ]},
      { subj:'العلوم المتكاملة ت٢', icon:'🔬', color:'#10B981', books:[
        { title:'العلوم المتكاملة ت٢ 2025-2026', term:'أول ثانوي — ترم ثاني', url:`${BOOKS}/science_1sec_t2.pdf` },
      ]},
      { subj:'اللغة العربية ت٢', icon:'📜', color:'#7C3AED', books:[
        { title:'اللغة العربية ت٢ 2025-2026', term:'أول ثانوي — ترم ثاني', url:`${BOOKS}/arabic_1sec_t2.pdf` },
        { title:'قراءات أدبية ت٢ 2025-2026', term:'أول ثانوي — ترم ثاني', url:`${BOOKS}/arabic_story_1sec_t2.pdf` },
      ]},
      { subj:'الرياضيات ت٢', icon:'🔢', color:'#1D4ED8', books:[
        { title:'الرياضيات (عربي) ت٢ 2025-2026', term:'أول ثانوي — ترم ثاني', url:`${BOOKS}/math_ar_1sec_t2.pdf` },
        { title:'الرياضيات (فرنساوي) ت٢ 2025-2026', term:'أول ثانوي — ترم ثاني', url:`${BOOKS}/math_fr_1sec_t2.pdf` },
      ]},
      { subj:'اللغة الإنجليزية ت٢', icon:'🗣️', color:'#EA580C', books:[
        { title:'New Hello — Student Book ت٢ 2025-2026', term:'أول ثانوي — ترم ثاني', url:`${BOOKS}/english_1sec_t2.pdf` },
      ]},
    ],
    // ── الصف الثاني الثانوي ────────────────────────────────────────
    high2: [
      { subj:'اللغة العربية', icon:'📜', color:'#8B5CF6', books:[
        { title:'اللغة العربية ت١ 2025-2026', term:'ثاني ثانوي — ترم أول', url:`${BLOB26}/Secondry/Secondry2/Term1/StudentBook/Arabic_language_Sec2_Tr1.pdf` /* 130MB – served from Azure */ },
        { title:'قراءات أدبية ت١ 2025-2026', term:'ثاني ثانوي — ترم أول', url:`${BOOKS}/arabic_story_2sec_t1.pdf` },
      ]},
      { subj:'اللغة الإنجليزية', icon:'🗣️', color:'#F97316', books:[
        { title:'English Language ت١ 2025-2026', term:'ثاني ثانوي — ترم أول', url:`${BOOKS}/english_2sec_t1.pdf` },
      ]},
      { subj:'الرياضيات', icon:'🔢', color:'#3B82F6', books:[
        { title:'الرياضيات التطبيقية (عربي) ت١ 2025-2026', term:'ثاني ثانوي — ترم أول', url:`${BOOKS}/math_ar_2sec_t1.pdf` },
        { title:'الرياضيات التطبيقية (إنجليزي) ت١ 2025-2026', term:'ثاني ثانوي — ترم أول', url:`${BOOKS}/math_en_2sec_t1.pdf` },
        { title:'تطبيقات الرياضيات (إنجليزي) ت١ 2025-2026', term:'ثاني ثانوي — ترم أول', url:`${BOOKS}/application_math_2sec_t1.pdf` },
      ]},
      { subj:'الفيزياء', icon:'⚡', color:'#F59E0B', books:[
        { title:'الفيزياء 2025-2026', term:'ثاني ثانوي', url:`${BOOKS}/physics_2sec.pdf` },
      ]},
      { subj:'التاريخ', icon:'🏛️', color:'#D97706', books:[
        { title:'التاريخ ت١ 2025-2026', term:'ثاني ثانوي — ترم أول', url:`${BOOKS}/history_2sec_t1.pdf` },
      ]},
      { subj:'الجغرافيا', icon:'🗺️', color:'#0EA5E9', books:[
        { title:'الجغرافيا ت١ 2025-2026', term:'ثاني ثانوي — ترم أول', url:`${BOOKS}/geography_2sec_t1.pdf` },
      ]},
      { subj:'علم النفس والاجتماع', icon:'🧠', color:'#6366F1', books:[
        { title:'علم النفس والاجتماع ت١ 2025-2026', term:'ثاني ثانوي — ترم أول', url:`${BOOKS}/psychology_2sec_t1.pdf` },
      ]},
      { subj:'التربية الإسلامية', icon:'☪️', color:'#059669', books:[
        { title:'التربية الإسلامية ت١ 2025-2026', term:'ثاني ثانوي', url:`${BOOKS}/islam_2sec.pdf` },
        { title:'التربية الإسلامية ت٢ 2025-2026', term:'ثاني ثانوي — ترم ثاني', url:`${BOOKS}/islam_2sec_t2.pdf` },
      ]},
    ],
    // ── الصف الثالث الثانوي ────────────────────────────────────────
    high: [
      { subj:'الرياضيات', icon:'🔢', color:'#3B82F6', books:[
        { title:'الرياضيات البحتة 2025-2026', term:'ثالث ثانوي', url:`${BOOKS}/math_pure_3sec.pdf` },
        { title:'الرياضيات التطبيقية 2025-2026', term:'ثالث ثانوي', url:`${BOOKS}/math_applied_3sec.pdf` },
        { title:'الجبر والهندسة الفراغية 2025-2026', term:'ثالث ثانوي', url:`${BOOKS}/algebra_3sec.pdf` },
        { title:'التفاضل والتكامل 2025-2026', term:'ثالث ثانوي', url:`${BOOKS}/calculus_3sec.pdf` },
        { title:'الميكانيكا 2025-2026', term:'ثالث ثانوي', url:`${BOOKS}/mechanics_3sec.pdf` },
        { title:'الإحصاء والاحتمالات 2025-2026', term:'ثالث ثانوي', url:`${BOOKS}/statistics_3sec.pdf` },
      ]},
      { subj:'الفيزياء', icon:'⚡', color:'#F59E0B', books:[
        { title:'الفيزياء 2025-2026', term:'ثالث ثانوي', url:`${BOOKS}/physics_3sec.pdf` },
      ]},
      { subj:'الكيمياء', icon:'🧪', color:'#10B981', books:[
        { title:'الكيمياء 2025-2026', term:'ثالث ثانوي', url:`${BOOKS}/chemistry_3sec.pdf` },
      ]},
      { subj:'الأحياء', icon:'🦠', color:'#EC4899', books:[
        { title:'علم الأحياء 2025-2026', term:'ثالث ثانوي', url:`${BOOKS}/biology_3sec.pdf` },
      ]},
      { subj:'الجيولوجيا', icon:'🪨', color:'#84CC16', books:[
        { title:'الجيولوجيا وعلم البيئة 2025-2026', term:'ثالث ثانوي', url:`${BOOKS}/geology_3sec.pdf` },
      ]},
      { subj:'اللغة العربية', icon:'📜', color:'#8B5CF6', books:[
        { title:'اللغة العربية 2025-2026', term:'ثالث ثانوي', url:`${BOOKS}/arabic_3sec.pdf` },
      ]},
      { subj:'الفلسفة والمنطق', icon:'🧠', color:'#6366F1', books:[
        { title:'الفلسفة والمنطق 2025-2026', term:'ثالث ثانوي', url:`${BOOKS}/philosophy_3sec.pdf` },
        { title:'علم النفس والاجتماع 2025-2026', term:'ثالث ثانوي', url:`${BOOKS}/psychology_3sec.pdf` },
      ]},
      { subj:'التاريخ', icon:'🏛️', color:'#D97706', books:[
        { title:'التاريخ 2025-2026', term:'ثالث ثانوي', url:`${BOOKS}/history_3sec.pdf` },
      ]},
      { subj:'الجغرافيا', icon:'🗺️', color:'#0EA5E9', books:[
        { title:'الجغرافيا 2025-2026', term:'ثالث ثانوي', url:`${BOOKS}/geography_3sec.pdf` },
      ]},
      { subj:'اللغة الإنجليزية', icon:'🗣️', color:'#F97316', books:[
        { title:'English Language 2025-2026', term:'ثالث ثانوي', url:`${BOOKS}/english_3sec.pdf` },
      ]},
      { subj:'التربية الإسلامية', icon:'☪️', color:'#059669', books:[
        { title:'التربية الإسلامية 2025-2026', term:'ثالث ثانوي', url:`${BOOKS}/islam_3sec.pdf` },
      ]},
    ],
    // ── الصف الابتدائي ────────────────────────────────────────────
    primary: [
      { subj:'اللغة الإنجليزية', icon:'🗣️', color:'#F97316', books:[
        { title:'English — Primary 1 Term 1 2025-2026', term:'ابتدائي أول — ترم أول', url:`${BOOKS}/english_prim1_t1.pdf` },
        { title:'English — Primary 2 Term 1 2025-2026', term:'ابتدائي ثاني — ترم أول', url:`${BOOKS}/english_prim2_t1.pdf` },
        { title:'English — Primary 3 Term 1 2025-2026', term:'ابتدائي ثالث — ترم أول', url:`${BOOKS}/english_prim3_t1.pdf` },
        { title:'English — Primary 4 Term 1 2025-2026', term:'ابتدائي رابع — ترم أول', url:`${BOOKS}/english_prim4_t1.pdf` },
        { title:'English — Primary 5 Term 1 2025-2026', term:'ابتدائي خامس — ترم أول', url:`${BOOKS}/english_prim5_t1.pdf` },
        { title:'English — Primary 6 Term 1 2025-2026', term:'ابتدائي سادس — ترم أول', url:`${BOOKS}/english_prim6_t1.pdf` },
      ]},
      { subj:'الرياضيات', icon:'🔢', color:'#3B82F6', books:[
        { title:'الرياضيات (عربي) — ابتدائي أول ت١ 2025-2026', term:'ابتدائي أول — ترم أول', url:`${BOOKS}/math_ar_prim1_t1.pdf` },
        { title:'الرياضيات (عربي) — ابتدائي ثاني ت١ 2025-2026', term:'ابتدائي ثاني — ترم أول', url:`${BOOKS}/math_ar_prim2_t1.pdf` },
        { title:'الرياضيات (إنجليزي) — ابتدائي ثاني ت١ 2025-2026', term:'ابتدائي ثاني — ترم أول', url:`${BOOKS}/math_en_prim2_t1.pdf` },
        { title:'الرياضيات (عربي) — ابتدائي ثالث ت١ 2025-2026', term:'ابتدائي ثالث — ترم أول', url:`${BOOKS}/math_ar_prim3_t1.pdf` },
        { title:'الرياضيات (إنجليزي) — ابتدائي ثالث ت١ 2025-2026', term:'ابتدائي ثالث — ترم أول', url:`${BOOKS}/math_en_prim3_t1.pdf` },
        { title:'الرياضيات (فرنساوي) — ابتدائي ثاني ت١ 2025-2026', term:'ابتدائي ثاني — ترم أول', url:`${BOOKS}/math_fr_prim2_t1.pdf` },
        { title:'الرياضيات (عربي) — ابتدائي رابع ت١ 2025-2026', term:'ابتدائي رابع — ترم أول', url:`${BOOKS}/math_ar_prim4_t1.pdf` },
        { title:'الرياضيات (إنجليزي) — ابتدائي رابع ت١ 2025-2026', term:'ابتدائي رابع — ترم أول', url:`${BOOKS}/math_en_prim4_t1.pdf` },
        { title:'الرياضيات (فرنساوي) — ابتدائي رابع ت١ 2025-2026', term:'ابتدائي رابع — ترم أول', url:`${BOOKS}/math_fr_prim4_t1.pdf` },
        { title:'الرياضيات (عربي) — ابتدائي خامس ت١ 2025-2026', term:'ابتدائي خامس — ترم أول', url:`${BOOKS}/math_ar_prim5_t1.pdf` },
        { title:'الرياضيات (إنجليزي) — ابتدائي خامس ت١ 2025-2026', term:'ابتدائي خامس — ترم أول', url:`${BOOKS}/math_en_prim5_t1.pdf` },
        { title:'الرياضيات (عربي) — ابتدائي سادس ت١ 2025-2026', term:'ابتدائي سادس — ترم أول', url:`${BOOKS}/math_ar_prim6_t1.pdf` },
        { title:'الرياضيات (إنجليزي) — ابتدائي سادس ت١ 2025-2026', term:'ابتدائي سادس — ترم أول', url:`${BOOKS}/math_en_prim6_t1.pdf` },
      ]},
      { subj:'العلوم', icon:'🔬', color:'#10B981', books:[
        { title:'العلوم — ابتدائي ثاني ت١ 2025-2026', term:'ابتدائي ثاني — ترم أول', url:`${BOOKS}/science_prim2_t1.pdf` },
        { title:'العلوم — ابتدائي ثالث ت١ 2025-2026', term:'ابتدائي ثالث — ترم أول', url:`${BOOKS}/science_prim3_t1.pdf` },
        { title:'العلوم — ابتدائي رابع ت١ 2025-2026', term:'ابتدائي رابع — ترم أول', url:`${BOOKS}/science_prim4_t1.pdf` },
        { title:'العلوم — ابتدائي خامس ت١ 2025-2026', term:'ابتدائي خامس — ترم أول', url:`${BOOKS}/science_prim5_t1.pdf` },
        { title:'العلوم — ابتدائي سادس ت١ 2025-2026', term:'ابتدائي سادس — ترم أول', url:`${BOOKS}/science_prim6_t1.pdf` },
      ]},
      { subj:'اللغة العربية', icon:'📜', color:'#8B5CF6', books:[
        { title:'اللغة العربية — ابتدائي أول ت١ 2025-2026', term:'ابتدائي أول — ترم أول', url:`${BOOKS}/arabic_prim1_t1.pdf` },
        { title:'اللغة العربية — ابتدائي ثاني ت١ 2025-2026', term:'ابتدائي ثاني — ترم أول', url:`${BOOKS}/arabic_prim2_t1.pdf` },
        { title:'اللغة العربية — ابتدائي ثالث ت١ 2025-2026', term:'ابتدائي ثالث — ترم أول', url:`${BOOKS}/arabic_prim3_t1.pdf` },
        { title:'اللغة العربية — ابتدائي رابع ت١ 2025-2026', term:'ابتدائي رابع — ترم أول', url:`${BOOKS}/arabic_prim4_t1.pdf` },
        { title:'اللغة العربية — ابتدائي خامس ت١ 2025-2026', term:'ابتدائي خامس — ترم أول', url:`${BOOKS}/arabic_prim5_t1.pdf` },
        { title:'اللغة العربية — ابتدائي سادس ت١ 2025-2026', term:'ابتدائي سادس — ترم أول', url:`${BOOKS}/arabic_prim6_t1.pdf` },
      ]},
      { subj:'التربية الإسلامية', icon:'☪️', color:'#059669', books:[
        { title:'التربية الإسلامية — ابتدائي ثاني ت١ 2025-2026', term:'ابتدائي ثاني — ترم أول', url:`${BOOKS}/islam_prim2_t1.pdf` },
        { title:'التربية الإسلامية — ابتدائي رابع ت١ 2025-2026', term:'ابتدائي رابع — ترم أول', url:`${BOOKS}/islam_prim4_t1.pdf` },
        { title:'التربية الإسلامية — ابتدائي خامس ت١ 2025-2026', term:'ابتدائي خامس — ترم أول', url:`${BOOKS}/islam_prim5_t1.pdf` },
        { title:'التربية الإسلامية — ابتدائي سادس ت١ 2025-2026', term:'ابتدائي سادس — ترم أول', url:`${BOOKS}/islam_prim6_t1.pdf` },
      ]},
      { subj:'Discover / اكتشف', icon:'🌍', color:'#EC4899', books:[
        { title:'Discover — Primary 1 Term 1 2025-2026', term:'ابتدائي أول — ترم أول', url:`${BOOKS}/discovery_prim1_t1.pdf` },
        { title:'Discover — Primary 2 Term 1 2025-2026', term:'ابتدائي ثاني — ترم أول', url:`${BOOKS}/discovery_prim2_t1.pdf` },
      ]},
      { subj:'تكنولوجيا المعلومات', icon:'💻', color:'#0EA5E9', books:[
        { title:'تكنولوجيا المعلومات — ابتدائي خامس ت٢ 2025-2026', term:'ابتدائي خامس — ترم ثاني', url:`${BOOKS}/ict_prim5_t2.pdf` },
      ]},
    ],
    // ── الصف الإعدادي ─────────────────────────────────────────────
    middle: [
      { subj:'اللغة العربية', icon:'📜', color:'#8B5CF6', books:[
        { title:'اللغة العربية — إعدادي أول ت١ 2025-2026', term:'إعدادي أول — ترم أول', url:`${BOOKS}/arabic_prep1_t1.pdf` },
        { title:'اللغة العربية — إعدادي أول ت٢ 2025-2026', term:'إعدادي أول — ترم ثاني', url:`${BOOKS}/arabic_prep1_t2.pdf` },
        { title:'اللغة العربية — إعدادي ثاني ت١ 2025-2026', term:'إعدادي ثاني — ترم أول', url:`${BOOKS}/arabic_prep2_t1.pdf` },
        { title:'اللغة العربية — إعدادي ثالث ت١ 2025-2026', term:'إعدادي ثالث — ترم أول', url:`${BOOKS}/arabic_prep3_t1.pdf` },
      ]},
      { subj:'اللغة الإنجليزية', icon:'🗣️', color:'#F97316', books:[
        { title:'English — Prep 1 Term 1 2025-2026', term:'إعدادي أول — ترم أول', url:`${BOOKS}/english_prep1_t1.pdf` },
        { title:'English — Prep 1 Term 2 2025-2026', term:'إعدادي أول — ترم ثاني', url:`${BOOKS}/english_prep1_t2.pdf` },
        { title:'English — Prep 2 Term 1 2025-2026', term:'إعدادي ثاني — ترم أول', url:`${BOOKS}/english_prep2_t1.pdf` },
        { title:'English — Prep 3 Term 1 2025-2026', term:'إعدادي ثالث — ترم أول', url:`${BOOKS}/english_prep3_t1.pdf` },
      ]},
      { subj:'اللغة الفرنسية', icon:'🇫🇷', color:'#6366F1', books:[
        { title:'الفرنسية — إعدادي أول ت١ 2025-2026', term:'إعدادي أول — ترم أول', url:`${BOOKS}/french_prep1_t1.pdf` },
        { title:'الفرنسية — إعدادي أول ت٢ 2025-2026', term:'إعدادي أول — ترم ثاني', url:`${BOOKS}/math_fr_prep1_t2.pdf` },
        { title:'الفرنسية — إعدادي ثاني ت١ 2025-2026', term:'إعدادي ثاني — ترم أول', url:`${BOOKS}/french_prep2_t1.pdf` },
        { title:'الفرنسية — إعدادي ثالث ت١ 2025-2026', term:'إعدادي ثالث — ترم أول', url:`${BOOKS}/french_prep3_t1.pdf` },
      ]},
      { subj:'الرياضيات', icon:'🔢', color:'#3B82F6', books:[
        { title:'الرياضيات (عربي) — إعدادي أول ت١ 2025-2026', term:'إعدادي أول — ترم أول', url:`${BOOKS}/math_ar_prep1_t1.pdf` },
        { title:'الرياضيات (عربي) — إعدادي أول ت٢ 2025-2026', term:'إعدادي أول — ترم ثاني', url:`${BOOKS}/math_ar_prep1_t2.pdf` },
        { title:'الرياضيات (عربي) — إعدادي ثاني ت١ 2025-2026', term:'إعدادي ثاني — ترم أول', url:`${BOOKS}/math_ar_prep2_t1.pdf` },
        { title:'الرياضيات (إنجليزي) — إعدادي ثاني ت١ 2025-2026', term:'إعدادي ثاني — ترم أول', url:`${BOOKS}/math_en_prep2_t1.pdf` },
        { title:'الرياضيات (عربي) — إعدادي ثالث ت١ 2025-2026', term:'إعدادي ثالث — ترم أول', url:`${BOOKS}/math_ar_prep3_t1.pdf` },
      ]},
      { subj:'العلوم', icon:'🔬', color:'#10B981', books:[
        { title:'العلوم (عربي) — إعدادي أول ت١ 2025-2026', term:'إعدادي أول — ترم أول', url:`${BOOKS}/science_ar_prep1_t1.pdf` },
        { title:'العلوم (عربي) — إعدادي أول ت٢ 2025-2026', term:'إعدادي أول — ترم ثاني', url:`${BOOKS}/science_ar_prep1_t2.pdf` },
        { title:'العلوم (عربي) — إعدادي ثاني ت١ 2025-2026', term:'إعدادي ثاني — ترم أول', url:`${BOOKS}/science_ar_prep2_t1.pdf` },
        { title:'العلوم (عربي) — إعدادي ثاني ت٢ 2025-2026', term:'إعدادي ثاني — ترم ثاني', url:`${BOOKS}/science_ar_prep2_t2.pdf` },
        { title:'العلوم — إعدادي ثالث ت١ 2025-2026', term:'إعدادي ثالث — ترم أول', url:`${BOOKS}/science_prep3_t1.pdf` },
      ]},
      { subj:'الدراسات الاجتماعية', icon:'🏛️', color:'#D97706', books:[
        { title:'الدراسات الاجتماعية — إعدادي أول ت١ 2025-2026', term:'إعدادي أول — ترم أول', url:`${BOOKS}/social_prep1_t1.pdf` },
        { title:'الدراسات الاجتماعية — إعدادي أول ت٢ 2025-2026', term:'إعدادي أول — ترم ثاني', url:`${BOOKS}/social_prep1_t2.pdf` },
        { title:'الدراسات الاجتماعية — إعدادي ثاني ت١ 2025-2026', term:'إعدادي ثاني — ترم أول', url:`${BOOKS}/history_prep2_t1.pdf` },
        { title:'الدراسات الاجتماعية — إعدادي ثاني ت١ (ب) 2025-2026', term:'إعدادي ثاني — ترم أول', url:`${BOOKS}/social_prep2_t1.pdf` },
      ]},
      { subj:'التربية الإسلامية', icon:'☪️', color:'#059669', books:[
        { title:'التربية الإسلامية — إعدادي أول ت١ 2025-2026', term:'إعدادي أول — ترم أول', url:`${BOOKS}/islam_prep1_t1.pdf` },
        { title:'التربية الإسلامية — إعدادي أول ت٢ 2025-2026', term:'إعدادي أول — ترم ثاني', url:`${BOOKS}/islam_prep1_t2.pdf` },
        { title:'التربية الإسلامية — إعدادي ثاني ت١ 2025-2026', term:'إعدادي ثاني — ترم أول', url:`${BOOKS}/islam_prep2_t1.pdf` },
        { title:'التربية الإسلامية — إعدادي ثاني ت٢ 2025-2026', term:'إعدادي ثاني — ترم ثاني', url:`${BOOKS}/islam_prep2_t2.pdf` },
      ]},
      { subj:'تكنولوجيا المعلومات', icon:'💻', color:'#0EA5E9', books:[
        { title:'تكنولوجيا المعلومات — إعدادي أول ت١ 2025-2026', term:'إعدادي أول — ترم أول', url:`${BOOKS}/ict_prep1_t1.pdf` },
      ]},
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  كتب خارجية مصرية — روابط Archive.org
  // ══════════════════════════════════════════════════════════════
  egypt_ext: {
    // ثالث ثانوي — المعاصر
    high: [
      { subj:'الرياضيات — المعاصر', icon:'🔢', color:'#3B82F6', books:[
        { title:'المعاصر رياضيات بحتة — ثاني ثانوي ترم أول', term:'ثاني ثانوي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/2-1_20250901' },
        { title:'المعاصر رياضيات تطبيقية — ثاني ثانوي ترم أول', term:'ثاني ثانوي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/2023-2-1_202209' },
        { title:'المعاصر ماث — أولى ثانوي ترم أول', term:'أول ثانوي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/1-1_20240907' },
        { title:'المعاصر رياضيات — أولى ثانوي ترم ثاني', term:'أول ثانوي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/2025_20250406' },
        { title:'المعاصر رياضيات بحتة — ثاني ثانوي علمي ترم أول', term:'ثاني ثانوي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/2-1_20230810' },
      ]},
      { subj:'الفيزياء — المعاصر', icon:'⚡', color:'#F59E0B', books:[
        { title:'المعاصر فيزياء — أولى ثانوي ترم أول', term:'أول ثانوي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/1-1_20230830' },
        { title:'المعاصر فيزياء — أولى ثانوي ترم ثاني', term:'أول ثانوي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/1-2_20220215_20220215_0123' },
        { title:'المعاصر فيزياء — ثاني ثانوي ترم أول', term:'ثاني ثانوي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/2-1_20220823' },
      ]},
      { subj:'الكيمياء — المعاصر', icon:'🧪', color:'#8B5CF6', books:[
        { title:'المعاصر كيمياء — ثاني ثانوي ترم أول', term:'ثاني ثانوي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/2-1_20220826_20220826_1118' },
        { title:'المعاصر كيمياء — ثاني ثانوي 2023', term:'ثاني ثانوي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/2023-2-1_20221011' },
      ]},
      { subj:'الأحياء — المعاصر', icon:'🧬', color:'#10B981', books:[
        { title:'المعاصر أحياء — أولى ثانوي ترم أول', term:'أول ثانوي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/1-1_20210816_20210816' },
        { title:'المعاصر أحياء — أولى ثانوي ترم ثاني', term:'أول ثانوي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/1-2_20220221' },
        { title:'المعاصر أحياء — ثاني ثانوي ترم أول', term:'ثاني ثانوي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/2-1_20220821_20220821' },
      ]},
      { subj:'اللغة الإنجليزية — المعاصر', icon:'🗣️', color:'#F97316', books:[
        { title:'المعاصر انجليزي — أولى ثانوي ترم أول', term:'أول ثانوي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/2023-1-1_20221004_0037' },
        { title:'المعاصر انجليزي — ثاني ثانوي ترم أول', term:'ثاني ثانوي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/2023-2-1_20221005' },
      ]},
      { subj:'البحث عن المزيد', icon:'🔍', color:'#6B7280', books:[
        { title:'بحث في Archive.org — كتب ثانوي', term:'جميع المواد والسنوات', badge:'🌐 أرشيف', external:true, url:'https://archive.org/search?query=%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D8%B5%D8%B1+%D8%AB%D8%A7%D9%86%D9%88%D9%8A' },
        { title:'بحث في Archive.org — كتب إعدادي', term:'جميع المواد والسنوات', badge:'🌐 أرشيف', external:true, url:'https://archive.org/search?query=%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D8%B5%D8%B1+%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A' },
        { title:'موقع المعاصر الرسمي', term:'كتب ومراجع المعاصر', badge:'🌐 موقع', external:true, url:'https://www.eltapalomesr.com/' },
        { title:'ذاكرولي — كتب وملازم', term:'جميع المراحل', badge:'🌐 موقع', external:true, url:'https://zakrolyup.com/' },
      ]},
    ],
    middle: [
      { subj:'الرياضيات — المعاصر', icon:'🔢', color:'#3B82F6', books:[
        { title:'المعاصر رياضيات — أول إعدادي ترم أول', term:'إعدادي أول', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/1-1_20241009' },
        { title:'المعاصر رياضيات — أول إعدادي ترم ثاني', term:'إعدادي أول', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/2025_20250205' },
        { title:'المعاصر رياضيات — ثاني إعدادي ترم أول', term:'إعدادي ثاني', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/2-1_20240826' },
        { title:'المعاصر رياضيات — ثالث إعدادي ترم أول', term:'إعدادي ثالث', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/3-1_20220817_202208' },
        { title:'المعاصر رياضيات — ثالث إعدادي ترم ثاني', term:'إعدادي ثالث', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/3-2_20220224' },
        { title:'المعاصر هندسة — ثالث إعدادي ترم ثاني', term:'إعدادي ثالث', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/3-2_20210525_202105' },
      ]},
      { subj:'العلوم — المعاصر', icon:'🔬', color:'#10B981', books:[
        { title:'المعاصر سايس — أول إعدادي ترم أول', term:'إعدادي أول', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/1-1_20230814' },
        { title:'المعاصر سايس — ثاني إعدادي ترم أول', term:'إعدادي ثاني', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/2-1_20210820_202108' },
        { title:'المعاصر سايس — ثاني إعدادي ترم ثاني', term:'إعدادي ثاني', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/2-2_20210315' },
        { title:'المعاصر سايس — ثالث إعدادي ترم أول', term:'إعدادي ثالث', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/3-1_20220909' },
      ]},
      { subj:'اللغة الإنجليزية — المعاصر', icon:'🗣️', color:'#F97316', books:[
        { title:'المعاصر انجليزي — أول إعدادي ترم أول', term:'إعدادي أول', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/1-1_20210903' },
        { title:'المعاصر انجليزي — ثاني إعدادي ترم أول', term:'إعدادي ثاني', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/2-1-2_202408' },
      ]},
      { subj:'بحث عن المزيد', icon:'🔍', color:'#6B7280', books:[
        { title:'بحث في Archive.org — كتب إعدادي', term:'جميع المواد', badge:'🌐 أرشيف', external:true, url:'https://archive.org/search?query=%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D8%B5%D8%B1+%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A' },
        { title:'موقع المعاصر الرسمي', term:'جميع المراحل', badge:'🌐 موقع', external:true, url:'https://www.eltapalomesr.com/' },
      ]},
    ],
    primary: [
      { subj:'الرياضيات — المعاصر', icon:'🔢', color:'#3B82F6', books:[
        { title:'المعاصر ماث — أول ابتدائي ترم أول', term:'أول ابتدائي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/1-1_20201120_202011' },
        { title:'المعاصر ماث — ثاني ابتدائي ترم أول', term:'ثاني ابتدائي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/2-1_20201003_202010' },
        { title:'المعاصر ماث — ثالث ابتدائي ترم أول', term:'ثالث ابتدائي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/3-1_20201003' },
        { title:'المعاصر ماث — رابع ابتدائي ترم أول', term:'رابع ابتدائي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/4-1_20211013_20211013' },
        { title:'المعاصر ماث — رابع ابتدائي ترم ثاني', term:'رابع ابتدائي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/4-2_20220304_202203' },
        { title:'المعاصر ماث — خامس ابتدائي ترم أول', term:'خامس ابتدائي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/5-1_20220921' },
      ]},
      { subj:'اللغة الإنجليزية — المعاصر', icon:'🗣️', color:'#F97316', books:[
        { title:'المعاصر كونكت بلس — ثاني ابتدائي ترم أول', term:'ثاني ابتدائي', badge:'📗 المعاصر', external:true, url:'https://archive.org/details/2-1_20230803_202308' },
      ]},
      { subj:'بحث عن المزيد', icon:'🔍', color:'#6B7280', books:[
        { title:'بحث في Archive.org — كتب ابتدائي', term:'جميع المواد', badge:'🌐 أرشيف', external:true, url:'https://archive.org/search?query=%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D8%B5%D8%B1+%D8%A7%D8%A8%D8%AA%D8%AF%D8%A7%D8%A6%D9%8A' },
        { title:'موقع المعاصر الرسمي', term:'جميع المراحل', badge:'🌐 موقع', external:true, url:'https://www.eltapalomesr.com/' },
      ]},
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  IGCSE — Cambridge Official Syllabuses (Free)
  // ══════════════════════════════════════════════════════════════
  igcse: {
    high: [
      { subj:'Mathematics', icon:'🔢', color:'#3B82F6', books:[
        { title:'IGCSE Mathematics 0580 Syllabus 2025–2027', term:'Cambridge IGCSE', url:`${BOOKS}/igcse/math_0580_syllabus.pdf` },
        { title:'IGCSE Additional Mathematics 0606 Syllabus 2025–2027', term:'Cambridge IGCSE', url:`${BOOKS}/igcse/addmath_0606_syllabus.pdf` },
      ]},
      { subj:'Physics', icon:'⚡', color:'#F59E0B', books:[
        { title:'IGCSE Physics 0625 Syllabus 2023–2025', term:'Cambridge IGCSE', url:`${BOOKS}/igcse/physics_0625_syllabus.pdf` },
      ]},
      { subj:'Chemistry', icon:'🧪', color:'#10B981', books:[
        { title:'IGCSE Chemistry 0620 Syllabus 2023–2025', term:'Cambridge IGCSE', url:`${BOOKS}/igcse/chemistry_0620_syllabus.pdf` },
      ]},
      { subj:'Biology', icon:'🦠', color:'#EC4899', books:[
        { title:'IGCSE Biology 0610 Syllabus 2023–2025', term:'Cambridge IGCSE', url:`${BOOKS}/igcse/biology_0610_syllabus.pdf` },
      ]},
      { subj:'Combined Science', icon:'🔬', color:'#8B5CF6', books:[
        { title:'IGCSE Combined Science 0653 Syllabus 2025–2027', term:'Cambridge IGCSE', url:`${BOOKS}/igcse/combined_sci_0653.pdf` },
      ]},
      { subj:'English Language', icon:'🗣️', color:'#F97316', books:[
        { title:'IGCSE English First Language 0500 Syllabus 2024–2026', term:'Cambridge IGCSE', url:`${BOOKS}/igcse/english_0500_syllabus.pdf` },
        { title:'IGCSE Literature in English 0475 Syllabus 2023–2025', term:'Cambridge IGCSE', url:`${BOOKS}/igcse/literature_0475_syllabus.pdf` },
      ]},
      { subj:'Computer Science', icon:'💻', color:'#0EA5E9', books:[
        { title:'IGCSE Computer Science 0478 Syllabus 2025–2027', term:'Cambridge IGCSE', url:`${BOOKS}/igcse/cs_0478_syllabus.pdf` },
      ]},
      { subj:'Economics', icon:'📊', color:'#D97706', books:[
        { title:'IGCSE Economics 0455 Syllabus 2025–2027', term:'Cambridge IGCSE', url:`${BOOKS}/igcse/economics_0455.pdf` },
      ]},
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  American Curriculum — OpenStax Free Textbooks (CC Licensed)
  // ══════════════════════════════════════════════════════════════
  american: {
    high: [
      { subj:'Mathematics', icon:'🔢', color:'#3B82F6', books:[
        { title:'Elementary Algebra 2e — OpenStax', term:'American Curriculum', url:`${BOOKS}/american/algebra_elementary.pdf` },
        { title:'College Algebra — OpenStax', term:'American Curriculum', url:`${BOOKS}/american/algebra_college.pdf` },
        { title:'Calculus Volume 1 — OpenStax', term:'American Curriculum', url:`${BOOKS}/american/calculus_vol1.pdf` },
        { title:'Introductory Statistics — OpenStax', term:'American Curriculum', url:`${BOOKS}/american/statistics.pdf` },
      ]},
      { subj:'Physics', icon:'⚡', color:'#F59E0B', books:[
        { title:'Physics — OpenStax (High School)', term:'American Curriculum', url:`${BOOKS}/american/physics_hs.pdf` },
        { title:'University Physics Volume 2 — OpenStax', term:'American Curriculum', url:`${BOOKS}/american/physics_university_vol2.pdf` },
      ]},
      { subj:'Computer Science', icon:'💻', color:'#0EA5E9', books:[
        { title:'Introduction to Computer Science — OpenStax', term:'American Curriculum', url:`${BOOKS}/american/computer_science.pdf` },
      ]},
      { subj:'Social Sciences', icon:'🧠', color:'#8B5CF6', books:[
        { title:'Introduction to Sociology 3e — OpenStax', term:'American Curriculum', url:`${BOOKS}/american/sociology.pdf` },
      ]},
    ],
  },
};

function viewPDF(url, viewUrl) {
  S.textbookUrl     = url;
  // viewUrl is only set for Google Drive /preview; all other books use their direct url
  S.textbookViewUrl = (viewUrl && viewUrl !== 'undefined' && viewUrl !== '') ? viewUrl : url;
  render();
}

// ════════════════════════════════════════════════════════════
//  IGCSE REVISION PLATFORM
// ════════════════════════════════════════════════════════════

const IGCSE_BOARDS = {
  cie:     { label:'Cambridge (CIE)', short:'Cambridge', color:'#003087', accent:'#0066CC', bg:'#EBF0FA', icon:'🏛️' },
  edexcel: { label:'Pearson Edexcel', short:'Edexcel',   color:'#003DA5', accent:'#1855B8', bg:'#E6EBF7', icon:'📘' },
  oxford:  { label:'Oxford AQA',      short:'Oxford AQA',color:'#002147', accent:'#1B4B8A', bg:'#E5EAEF', icon:'📙' },
};

const IGCSE_SUBJECTS = {
  maths: {
    label:'Mathematics', arabic:'الرياضيات', icon:'🔢', color:'#3B82F6',
    boards: ['cie','edexcel','oxford'],
    pastPapers: {
      cie:     'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-mathematics-0580/past-papers/',
      edexcel: 'https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-mathematics-a-2016.coursematerials.html',
      oxford:  'https://www.oxfordaqaexams.org.uk/igcse/mathematics/',
    },
    chapters: {
      cie: [
        { title:'Number', icon:'🔢', topics:[
          { title:'Types of Numbers & Operations', points:[
            'Integers, decimals, fractions — and converting between them',
            'Order of operations: BODMAS (Brackets, Orders, Division, Multiplication, Addition, Subtraction)',
            'Prime factorisation, HCF and LCM using factor trees or Venn diagrams',
            'Rational numbers can be written as a fraction p/q; irrational cannot (e.g. √2, π)',
            'Absolute value |x|: distance from zero — always non-negative',
          ]},
          { title:'Powers, Roots & Standard Form', points:[
            'Index laws: aᵐ × aⁿ = aᵐ⁺ⁿ, aᵐ ÷ aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ, a⁰ = 1',
            'Negative indices: a⁻ⁿ = 1/aⁿ (e.g. 2⁻³ = 1/8)',
            'Fractional indices: a^(1/n) = ⁿ√a and a^(m/n) = (ⁿ√a)ᵐ',
            'Standard form: A × 10ⁿ where 1 ≤ A < 10 (e.g. 3.2 × 10⁴ = 32000)',
            'Adding in standard form: convert to same power of 10 first',
          ]},
          { title:'Percentages, Ratio & Proportion', points:[
            'Percentage change = (change ÷ original) × 100%',
            'Reverse percentage: original = value ÷ (1 ± r/100)',
            'Compound interest: A = P(1 + r/100)ⁿ — exponential growth',
            'Ratio simplification: divide all parts by HCF; divide quantity in ratio',
            'Direct proportion: y = kx (graph through origin); inverse: y = k/x',
          ], examTips:[
            'For compound interest questions, write out the formula A = P(1+r/100)ⁿ before substituting',
            'Reverse percentage: identify the multiplier first (e.g. after 20% increase → divide by 1.2)',
            'Check ratio questions: make sure your parts add up to the total given',
          ], commonMistakes:[
            'Using simple interest formula instead of compound interest',
            'Percentage change: using the wrong "original" value (should be the initial, not final)',
            'Splitting a ratio incorrectly — always find 1 part first',
          ], workedExample:`A car costs $12,000 after a 20% discount. What was the original price?
After 20% discount → multiplier = 0.8
Original = 12000 ÷ 0.8 = $15,000`},
        ]},
        { title:'Algebra & Graphs', icon:'📈', topics:[
          { title:'Algebraic Manipulation', points:[
            'Expanding: (a+b)(c+d) = ac + ad + bc + bd',
            'Perfect square: (a+b)² = a²+2ab+b² and (a−b)² = a²−2ab+b²',
            'Difference of squares: a²−b² = (a+b)(a−b)',
            'Factorising quadratics ax²+bx+c: find two numbers that multiply to ac and add to b',
            'Simplify algebraic fractions by factorising numerator and denominator first',
          ]},
          { title:'Equations & Inequalities', points:[
            'Solve linear equations: same operation both sides to isolate variable',
            'Quadratic formula: x = (−b ± √(b²−4ac)) / 2a when factorising fails',
            'Simultaneous equations — elimination: multiply to match coefficients, then add/subtract',
            'Inequalities: solve like equations BUT flip sign when multiplying/dividing by negative',
            'Represent inequalities on number line: open circle = strict (</>), filled = (≤/≥)',
          ], examTips:[
            'Always show substitution back to check your answer in simultaneous equations',
            'If asked to solve graphically, find intersection points — be precise on graph',
            'Quadratic formula: write it out first, then substitute — avoid rounding too early',
          ], commonMistakes:[
            'Forgetting to flip the inequality sign when dividing by a negative number',
            'Dropping one solution when solving x² = k (both +√k and −√k)',
            'Arithmetic errors when expanding brackets before solving',
          ], workedExample:`Solve 2x² − 5x − 3 = 0 using the quadratic formula:
a=2, b=−5, c=−3
x = (5 ± √(25 + 24)) / 4 = (5 ± √49) / 4 = (5 ± 7) / 4
x = 3  or  x = −0.5`},
          { title:'Functions & Graphs', points:[
            'Gradient of line: m = (y₂−y₁)/(x₂−x₁); equation of line: y = mx + c',
            'Parallel lines have equal gradients; perpendicular lines: m₁ × m₂ = −1',
            'Distance between two points: d = √((x₂−x₁)² + (y₂−y₁)²)',
            'Midpoint: ((x₁+x₂)/2, (y₁+y₂)/2)',
            'Key curves: y=x² (parabola), y=x³ (cubic), y=1/x (hyperbola), y=aˣ (exponential)',
          ]},
          { title:'Sequences', points:[
            'Arithmetic sequence: constant difference d; nth term = a + (n−1)d',
            'Geometric sequence: constant ratio r; nth term = arⁿ⁻¹',
            'Quadratic sequences: second differences are constant; nth term has n² term',
            'Find nth term by looking at differences and comparing to known sequences',
          ]},
        ]},
        { title:'Coordinate Geometry', icon:'📍', topics:[
          { title:'Lines & Circles', points:[
            'Circle equation: (x−a)² + (y−b)² = r² where (a,b) is centre and r is radius',
            'Tangent to circle is perpendicular to radius at point of contact',
            'To find intersection: substitute line equation into circle equation',
            'Length of a chord using coordinate geometry and Pythagoras',
          ]},
        ]},
        { title:'Geometry', icon:'📐', topics:[
          { title:'Angle Properties', points:[
            'Angles on a straight line = 180°; angles around a point = 360°',
            'Vertically opposite angles are equal; co-interior (same-side) angles add to 180°',
            'Alternate angles (Z-angles) are equal; corresponding angles (F-angles) are equal',
            'Sum of interior angles of n-sided polygon = (n−2) × 180°',
            'Exterior angle of triangle = sum of the two non-adjacent interior angles',
          ]},
          { title:'Circle Theorems', points:[
            'Angle at centre = 2 × angle at circumference (same arc)',
            'Angles in the same segment are equal',
            'Angle in a semicircle = 90° (diameter subtends right angle)',
            'Opposite angles in a cyclic quadrilateral add to 180°',
            'Tangent-radius: tangent is perpendicular to radius at point of contact',
          ]},
          { title:'Similarity & Congruence', points:[
            'Similar shapes: same angles, proportional sides — ratio of sides = k',
            'If lengths scale by k → areas scale by k² → volumes scale by k³',
            'Congruence conditions: SSS, SAS, ASA, AAS, RHS',
            'To prove triangles similar: show two pairs of equal angles (AA)',
          ]},
        ]},
        { title:'Mensuration', icon:'📏', topics:[
          { title:'Areas & Perimeters', points:[
            'Rectangle: A = lw; Triangle: A = ½bh; Parallelogram: A = bh',
            'Trapezium: A = ½(a+b)h; Circle: A = πr², C = 2πr',
            'Sector: area = (θ/360)×πr²; arc length = (θ/360)×2πr',
            'Composite shapes: split into rectangles, triangles, circles — add or subtract',
          ]},
          { title:'Volumes & Surface Areas', points:[
            'Cuboid: V = lwh; SA = 2(lw+lh+wh)',
            'Cylinder: V = πr²h; SA = 2πrh + 2πr²',
            'Cone: V = ⅓πr²h; curved SA = πrl (l = slant height); total SA = πrl + πr²',
            'Sphere: V = (4/3)πr³; SA = 4πr²',
            'Pyramid: V = ⅓ × base area × perpendicular height',
          ]},
        ]},
        { title:'Trigonometry', icon:'📐', topics:[
          { title:'Right-Angled Triangles (SOH CAH TOA)', points:[
            'sin θ = Opposite/Hypotenuse; cos θ = Adjacent/Hypotenuse; tan θ = Opposite/Adjacent',
            'Pythagoras: a² + b² = c² (c is always the hypotenuse)',
            'Use inverse trig (sin⁻¹, cos⁻¹, tan⁻¹) to find angles',
            'Angle of elevation: looking up from horizontal; depression: looking down',
            'Bearings: measured clockwise from North, always 3 digits (e.g. 045°)',
          ]},
          { title:'Sine & Cosine Rules (Non-Right Triangles)', points:[
            'Sine rule: a/sinA = b/sinB = c/sinC — use with angle-side opposite pair',
            'Cosine rule: a² = b²+c²−2bc cosA — use with 3 sides or 2 sides + included angle',
            'Area of any triangle: Area = ½ab sinC',
            'Ambiguous case: two possible triangles when given two sides and non-included angle',
          ]},
        ]},
        { title:'Vectors & Transformations', icon:'↗️', topics:[
          { title:'Vectors', points:[
            'Vector has magnitude and direction; written as bold a or column vector (x y)',
            'Adding vectors: add components; AB = OB − OA (position vectors)',
            'Magnitude: |a| = √(x²+y²)',
            'Scalar multiple: ka stretches magnitude by |k|; negative k reverses direction',
            'Collinear points: AB = k×AC for some scalar k',
          ]},
          { title:'Transformations', points:[
            'Translation: described by a column vector (all points shift same amount)',
            'Reflection: mirror line required; image equidistant from line — shape unchanged',
            'Rotation: centre, angle (degrees), direction (clockwise/anticlockwise)',
            'Enlargement: centre and scale factor; area changes by SF²; negative SF flips shape',
            'Combined transformations: apply right-to-left; describe single equivalent transformation',
          ]},
        ]},
        { title:'Probability & Statistics', icon:'📊', topics:[
          { title:'Statistics', points:[
            'Mean = sum ÷ count; Median = middle value (sort first!); Mode = most frequent',
            'Range = max − min; IQR = Q3 − Q1 (measure of spread)',
            'Cumulative frequency: median at 50th %, Q1 at 25th %, Q3 at 75th %',
            'Histogram: frequency density = frequency ÷ class width (y-axis)',
            'Scatter graphs: describe correlation (positive/negative/none) and draw line of best fit',
          ]},
          { title:'Probability', points:[
            'P(event) = favourable outcomes ÷ total equally likely outcomes; 0 ≤ P ≤ 1',
            'P(not A) = 1 − P(A)',
            'Mutually exclusive: P(A or B) = P(A) + P(B)',
            'Independent events: P(A and B) = P(A) × P(B)',
            'Tree diagrams: multiply along branches to get joint probability; add outcomes at end',
          ], examTips:[
            'Without replacement: second branch probabilities change — update denominators',
            'Always check your probabilities sum to 1 on each set of branches',
            'Venn diagrams: P(A∩B) = intersection; P(A∪B) = P(A)+P(B)−P(A∩B)',
          ], workedExample:`Bag: 3 red, 2 blue. Two drawn without replacement. P(both red)?
P(1st red) = 3/5
P(2nd red | 1st red) = 2/4 = 1/2
P(both red) = 3/5 × 1/2 = 3/10`},
        ]},
      ],
      edexcel: [
        { title:'Number', icon:'🔢', topics:[
          { title:'Types of Numbers & Operations', points:[
            'Integers, decimals, fractions — and converting between them',
            'Order of operations: BODMAS (Brackets, Orders, Division, Multiplication, Addition, Subtraction)',
            'Prime factorisation, HCF and LCM using factor trees or Venn diagrams',
            'Rational numbers can be written as a fraction p/q; irrational cannot (e.g. √2, π)',
            'Edexcel Spec: includes recurring decimals → fractions (e.g. 0.̄3 = 1/3)',
          ]},
          { title:'Powers, Roots & Standard Form', points:[
            'Index laws: aᵐ × aⁿ = aᵐ⁺ⁿ, aᵐ ÷ aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ',
            'Standard form: A × 10ⁿ where 1 ≤ A < 10',
            'Edexcel: emphasis on surds — √a × √b = √(ab); √(a/b) = √a/√b; rationalise denominator',
            'Edexcel IGCSE uses formula sheet for some topics — know what is given vs memorised',
          ]},
          { title:'Percentages, Ratio & Proportion', points:[
            'Percentage change = (change ÷ original) × 100%',
            'Compound interest: A = P(1 + r/100)ⁿ',
            'Edexcel: includes exponential growth and decay in context of finance/population',
            'Direct and inverse proportion with graphs and equations',
          ]},
        ]},
        { title:'Algebra & Graphs', icon:'📈', topics:[
          { title:'Algebraic Manipulation', points:[
            'Expanding brackets, factorising, simplifying algebraic fractions',
            'Edexcel IGCSE Higher: includes algebraic proof — show expression always odd/even etc.',
            'Completing the square: x²+bx = (x+b/2)²−(b/2)²  — used to find vertex of parabola',
            'Edexcel: function notation f(x), composite functions fg(x), inverse f⁻¹(x)',
          ]},
          { title:'Equations & Inequalities', points:[
            'Solve linear and quadratic equations; simultaneous equations',
            'Edexcel IGCSE: includes linear programming with inequalities on a graph',
            'Quadratic formula essential — not always given on Edexcel papers',
            'Inequalities on number lines and graphs; region shading',
          ]},
          { title:'Graphs & Functions', points:[
            'y = mx + c; perpendicular gradients; distance and midpoint',
            'Edexcel: transformation of functions — y=f(x)+a (shift up), y=f(x+a) (shift left)',
            'Recognise and sketch: linear, quadratic, cubic, reciprocal, exponential, circle',
            'Edexcel Higher: calculus — differentiation to find gradient and turning points',
          ]},
        ]},
        { title:'Geometry & Trigonometry', icon:'📐', topics:[
          { title:'Angles, Shapes & Proofs', points:[
            'Angle facts, parallel lines, polygons — same as CIE',
            'Edexcel: geometric proof required — state reasons at each step formally',
            'Loci and constructions: perpendicular bisector, angle bisector, locus of equidistant point',
            'Transformations: rotation, reflection, translation, enlargement (positive and negative scale factor)',
          ]},
          { title:'Trigonometry', points:[
            'SOH CAH TOA for right-angled triangles',
            'Sine rule: a/sinA = b/sinB = c/sinC — use for non-right-angled triangles',
            'Cosine rule: a² = b² + c² − 2bc cosA — use when SAS or SSS given',
            'Area of triangle = ½ab sinC',
            'Edexcel IGCSE: bearings questions often combine trigonometry with geometry',
          ]},
        ]},
        { title:'Statistics & Probability', icon:'📊', topics:[
          { title:'Statistics', points:[
            'Mean, median, mode, range, IQR — same as CIE',
            'Edexcel: moving averages and time series — calculate 3-point or 4-point moving average',
            'Edexcel: stratified sampling — number from stratum = (stratum size/total) × sample size',
            'Box plots and comparing distributions: compare median AND IQR/range',
          ]},
          { title:'Probability', points:[
            'Basic probability, mutually exclusive, independent events, tree diagrams',
            'Edexcel IGCSE Higher: conditional probability P(A|B) = P(A∩B)/P(B)',
            'Edexcel: relative frequency (experimental probability) vs theoretical probability',
            'Venn diagrams with set notation: ∪ (union), ∩ (intersection), A\' (complement)',
          ]},
        ]},
      ],
    }
  },
  physics: {
    label:'Physics', arabic:'الفيزياء', icon:'⚡', color:'#F59E0B',
    boards: ['cie','edexcel','oxford'],
    pastPapers: {
      cie:     'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-physics-0625/past-papers/',
      edexcel: 'https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-physics-2017.coursematerials.html',
      oxford:  'https://www.oxfordaqaexams.org.uk/igcse/physics/',
    },
    chapters: {
      cie: [
        { title:'Motion, Forces & Energy', icon:'🚀', topics:[
          { title:'Speed, Velocity & Acceleration', points:[
            'Speed (scalar) = distance ÷ time; velocity (vector) = displacement ÷ time',
            'Acceleration = change in velocity ÷ time: a = (v−u)/t (m/s²)',
            'Distance-time graph: gradient = speed; horizontal line = stationary; curve = changing speed',
            'Velocity-time graph: gradient = acceleration; area under graph = distance travelled',
            'Equations of motion: v=u+at, s=ut+½at², v²=u²+2as, s=½(u+v)t',
          ], examTips:[
            'On a velocity-time graph, area under the line = distance — count squares if not a simple shape',
            'Be careful: equations of motion only apply when acceleration is constant (uniform)',
            'Label which direction is positive — deceleration means acceleration is negative',
          ], commonMistakes:[
            'Confusing distance-time with velocity-time graphs',
            'Using speed when the question asks for velocity (velocity needs direction)',
            'Forgetting to convert km/h to m/s (÷ 3.6) or cm to m before calculating',
          ], workedExample:`A car accelerates from 0 to 30 m/s in 6 seconds. Find distance travelled.
u=0, v=30, t=6 → a = (30−0)/6 = 5 m/s²
s = ut + ½at² = 0 + ½×5×36 = 90 m
(Or: s = ½(u+v)t = ½×30×6 = 90 m ✓)`},
          { title:'Forces & Newton\'s Laws', points:[
            '1st Law: object remains at rest or constant velocity unless resultant force acts',
            '2nd Law: F = ma — larger force or smaller mass gives greater acceleration',
            '3rd Law: every action has equal and opposite reaction (on different objects)',
            'Weight = mass × gravitational field strength (W = mg; g = 10 N/kg on Earth)',
            'Terminal velocity: drag force equals weight → zero acceleration → constant speed',
          ], examTips:[
            'Terminal velocity graphs: velocity increases then levels off — explain using air resistance = weight',
            'F = ma: mass in kg, force in N, acceleration in m/s² — check units',
            '3rd Law pairs: forces are equal, opposite, same type, on DIFFERENT objects',
          ], commonMistakes:[
            'Confusing mass (kg) and weight (N) — weight = mg',
            'Saying action and reaction cancel — they act on different objects so they cannot cancel',
          ]},
          { title:'Work, Energy & Power', points:[
            'Work done = force × distance (in direction of force): W = Fd (joules)',
            'Kinetic energy: KE = ½mv²; Gravitational PE: GPE = mgh',
            'Conservation of energy: total energy is always conserved, just changes form',
            'Efficiency = (useful energy output ÷ total energy input) × 100%',
            'Power = work done ÷ time = energy transferred ÷ time: P = W/t (watts)',
          ]},
          { title:'Pressure & Moments', points:[
            'Pressure = force ÷ area: P = F/A (Pascals = N/m²)',
            'Pressure in a fluid: P = ρgh (density × g × depth)',
            'Moment = force × perpendicular distance from pivot (Nm)',
            'Principle of moments: sum of clockwise moments = sum of anticlockwise moments',
            'Centre of gravity: single point where weight appears to act',
          ]},
        ]},
        { title:'Thermal Physics', icon:'🌡️', topics:[
          { title:'States of Matter & Kinetic Theory', points:[
            'Solid: particles in fixed positions, vibrate; strong forces between particles',
            'Liquid: particles close together, can flow; weaker forces',
            'Gas: particles far apart, move randomly at high speeds; almost no forces',
            'Brownian motion (e.g. smoke particles): evidence for random particle movement',
            'Evaporation: fastest particles escape from surface — liquid cools as a result',
          ]},
          { title:'Thermal Energy Transfer', points:[
            'Specific heat capacity: Q = mcΔT (energy to heat 1 kg of substance by 1°C)',
            'Specific latent heat: Q = mL (energy for change of state; no temperature change)',
            'Conduction: energy transferred through vibrations of particles — best in metals',
            'Convection: warm fluid rises (less dense), cool fluid sinks — creates currents',
            'Radiation: infrared waves travel without medium; dark matt = best emitter & absorber',
          ]},
        ]},
        { title:'Waves & Optics', icon:'〰️', topics:[
          { title:'Wave Properties', points:[
            'Transverse: oscillation perpendicular to direction of travel (light, water waves)',
            'Longitudinal: oscillation parallel to direction (sound — compressions & rarefactions)',
            'Wave equation: v = fλ (speed = frequency × wavelength)',
            'Period T = 1/f; amplitude = maximum displacement from rest position',
            'Wavefront: line joining points of same phase; waves refract at boundary between media',
          ], examTips:[
            'Draw wave diagrams carefully: label amplitude (peak to rest), wavelength (peak to peak), and direction',
            'v = fλ: rearrange clearly — if you know two values, find the third',
            'Transverse vs longitudinal: think of sound as compressions and rarefactions along direction of travel',
          ], workedExample:`A wave has frequency 500 Hz and wavelength 0.68 m. Find its speed.
v = fλ = 500 × 0.68 = 340 m/s (speed of sound in air ✓)`},
          { title:'Light & Electromagnetic Spectrum', points:[
            'Law of reflection: angle of incidence = angle of reflection (measured from normal)',
            'Refraction: bends toward normal when slowing down (entering denser medium)',
            'Snell\'s law: n₁sinθ₁ = n₂sinθ₂; refractive index n = speed in vacuum ÷ speed in medium',
            'Total internal reflection: when angle of incidence > critical angle; used in optical fibres',
            'EM spectrum (shortest to longest λ): γ-rays → X-rays → UV → visible → IR → microwaves → radio',
          ], examTips:[
            'EM waves: all travel at 3×10⁸ m/s in vacuum — only wavelength and frequency differ',
            'When drawing refraction: the ray bends TOWARD normal when entering a denser medium',
            'Total internal reflection: must state two conditions — angle > critical angle AND going from dense to less dense',
          ]},
          { title:'Sound', points:[
            'Sound is a longitudinal wave; needs a medium (cannot travel through vacuum)',
            'Speed of sound ≈ 340 m/s in air; much faster in solids',
            'Frequency determines pitch; amplitude determines loudness',
            'Echo: reflection of sound; used in sonar and ultrasound imaging',
            'Humans hear 20 Hz–20 kHz; ultrasound (>20 kHz) used in medicine and cleaning',
          ], examTips:[
            'Echo calculation: distance = (speed × time) ÷ 2 — divide by 2 because sound travels there AND back',
          ], workedExample:`Sonar pulse takes 0.4 s to return. Speed of sound in water = 1500 m/s.
Distance to seabed = (1500 × 0.4) ÷ 2 = 300 m`},
        ]},
        { title:'Electricity & Magnetism', icon:'🔌', topics:[
          { title:'Electric Circuits', points:[
            'Ohm\'s Law: V = IR (voltage = current × resistance)',
            'Series: same current throughout; voltages add; R_total = R₁+R₂+...',
            'Parallel: same voltage across each branch; currents add; 1/R = 1/R₁+1/R₂',
            'Power: P = IV = I²R = V²/R (watts)',
            'Charge: Q = It (coulombs); energy transferred: E = QV = IVt = Pt',
          ], examTips:[
            'Always identify if circuit is series or parallel FIRST before applying any formula',
            'For parallel resistors with equal values R: total resistance = R/n (n = number of resistors)',
            'Power questions: choose which formula to use based on what values are given (V and I → P=IV)',
          ], commonMistakes:[
            'Adding resistors in parallel like series — remember 1/R_total = 1/R₁ + 1/R₂',
            'Saying more resistance in parallel = less current overall — parallel gives MORE pathways = MORE total current',
          ], workedExample:`Two resistors 6Ω and 3Ω in parallel. Find total resistance.
1/R = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2
R_total = 2Ω  (always less than smallest resistor in parallel)`},
          { title:'Electromagnetism', points:[
            'Current-carrying wire creates a magnetic field; stronger with more turns or iron core',
            'Motor effect: force on current-carrying conductor in a field (F = BIL)',
            'Fleming\'s Left Hand Rule: thuMb=motion, First finger=Field, seCond finger=Current',
            'Electromagnetic induction: changing magnetic field induces EMF in a conductor',
            'Transformer: Vp/Vs = Np/Ns; step-up increases voltage, step-down decreases it',
          ], examTips:[
            'Transformer efficiency = (output power ÷ input power) × 100%; ideal transformer has 100% efficiency',
            'Generator uses Fleming\'s Right Hand Rule (dynamo rule); motor uses Left Hand Rule',
            'Transformer works ONLY with AC — not DC (need changing magnetic field to induce EMF)',
          ], workedExample:`Transformer: primary 240V, 2000 turns; secondary 20 turns. Find output voltage.
Vp/Vs = Np/Ns → 240/Vs = 2000/20 = 100
Vs = 240/100 = 2.4 V  (step-down transformer)`},
        ]},
        { title:'Nuclear Physics', icon:'☢️', topics:[
          { title:'Atomic Structure & Radiation', points:[
            'Atom: protons + neutrons in nucleus; electrons in shells around nucleus',
            'Atomic number = proton number; mass number = protons + neutrons',
            'Isotopes: same protons, different neutrons (same element, different mass)',
            'Alpha (α): 2p+2n, stopped by paper, highly ionising, short range in air',
            'Beta (β): fast electron, stopped by 3mm Al, moderate ionisation',
            'Gamma (γ): EM radiation, stopped by thick lead, penetrating, low ionisation',
          ], examTips:[
            'Balance nuclear equations: proton numbers AND mass numbers must balance on both sides',
            'Choose radiation type for medical use: gamma (penetrates body) for treatment, short half-life for safety',
            'Radiation in fields: alpha — curves slightly (heavy); beta — curves more; gamma — straight (no charge)',
          ], workedExample:`Write the decay equation for Ra-226 undergoing alpha decay:
²²⁶₈₈Ra → ⁴₂He + ?
Mass: 226 = 4 + 222 → daughter mass = 222
Proton: 88 = 2 + 86 → daughter = element 86 (Radon, Rn)
²²⁶₈₈Ra → ⁴₂He + ²²²₈₆Rn`},
          { title:'Radioactive Decay & Half-Life', points:[
            'Half-life: time for half the radioactive nuclei to decay (or activity to halve)',
            'Activity decreases exponentially — never reaches zero',
            'Uses: carbon-14 dating (t½ = 5700 yrs), medical tracers (short t½)',
            'Nuclear fission: heavy nucleus splits, releasing large amount of energy + more neutrons',
            'Chain reaction: neutrons cause further fissions — controlled in reactors, uncontrolled in bombs',
          ], examTips:[
            'Half-life graph: draw exponential decay curve — always halving the previous value',
            'After n half-lives: activity = initial × (1/2)ⁿ',
          ], workedExample:`Initial activity = 800 Bq, half-life = 3 hours. Activity after 9 hours?
n = 9/3 = 3 half-lives
Activity = 800 × (1/2)³ = 800 ÷ 8 = 100 Bq`},
        ]},
      ],
      oxford: [
        { title:'Forces & Motion', icon:'🚀', topics:[
          { title:'Speed, Velocity & Acceleration', points:[
            'Oxford AQA uses same core concepts as CIE — equations of motion apply to uniform acceleration',
            'Vector quantities (displacement, velocity, acceleration, force) require both magnitude and direction',
            'Scalar quantities (speed, distance, mass, time) require magnitude only',
            'Displacement-time graphs: gradient = velocity; curved = changing velocity',
            'Velocity-time graphs: gradient = acceleration; area = displacement (signed)',
          ], examTips:[
            'Oxford AQA: questions often ask for explanation of real-life scenarios — apply physics concepts clearly',
            'State which equation you are using and why — show all steps',
          ]},
          { title:'Forces', points:[
            'Resultant force: single force equivalent to all forces combined; free body diagrams show all forces',
            'Newton\'s First Law: resultant force = 0 → constant velocity or stationary',
            'Newton\'s Second Law: F = ma (resultant force = mass × acceleration)',
            'Weight (W = mg), normal reaction, friction, tension, air resistance — identify all forces in a problem',
            'Oxford AQA: include analysis of circular motion — centripetal force directed toward centre',
          ]},
        ]},
        { title:'Energy & Electricity', icon:'⚡', topics:[
          { title:'Energy', points:[
            'Oxford AQA organises energy as: kinetic, gravitational potential, elastic potential, thermal, chemical, nuclear',
            'Conservation of energy: total energy in a closed system is constant',
            'KE = ½mv²; GPE = mgh; Elastic PE = ½ke² (spring constant × extension squared)',
            'Efficiency = (useful output ÷ total input) × 100%; always less than 100% due to thermal losses',
            'Power = energy transferred ÷ time = work done ÷ time (watts, W)',
          ]},
          { title:'Electricity', points:[
            'Oxford AQA emphasises energy transfer in circuits: E = QV = IVt',
            'Resistance: factors that affect resistance of a wire — length (↑→↑R), cross-section (↑→↓R), material, temperature',
            'I-V characteristics: ohmic conductor (straight line), filament lamp (curve, resistance increases with temp)',
            'Potential divider: two resistors in series; V_out = V_in × R₂/(R₁+R₂)',
            'Mains electricity: 230 V AC (UK); live, neutral, earth wires; fuses and circuit breakers for safety',
          ], examTips:[
            'Oxford AQA: Interpret I-V graphs — gradient is NOT resistance; resistance = V/I at any point',
            'Potential divider calculations: identify which resistor is R₂ (the one across which V_out is measured)',
          ]},
        ]},
        { title:'Waves & Matter', icon:'〰️', topics:[
          { title:'Waves', points:[
            'Oxford AQA: wave behaviour — reflection, refraction, diffraction, superposition',
            'Diffraction: waves spread out when passing through a gap or around an obstacle',
            'Maximum diffraction when gap width ≈ wavelength',
            'Interference: constructive (peaks align → bigger wave), destructive (peak + trough → cancel)',
            'Young\'s double slit: fringe spacing = λL/d (wavelength × distance / slit separation)',
          ]},
          { title:'Matter & Particle Physics', points:[
            'States of matter described using particle model; changes of state involve energy but no temperature change',
            'Pressure of a gas: depends on number of particles, their speed, and volume of container',
            'Oxford AQA introduces basic particle physics: protons, neutrons, electrons; quarks (up and down)',
            'Proton = 2 up quarks + 1 down quark; neutron = 1 up quark + 2 down quarks',
            'Strong nuclear force: holds nucleus together; overcomes electrostatic repulsion between protons',
          ]},
        ]},
      ],
    }
  },
  chemistry: {
    label:'Chemistry', arabic:'الكيمياء', icon:'🧪', color:'#8B5CF6',
    boards: ['cie','edexcel','oxford'],
    pastPapers: {
      cie:     'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-chemistry-0620/past-papers/',
      edexcel: 'https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-chemistry-2017.coursematerials.html',
      oxford:  'https://www.oxfordaqaexams.org.uk/igcse/chemistry/',
    },
    chapters: {
      cie: [
        { title:'Particulate Nature of Matter', icon:'⚗️', topics:[
          { title:'States of Matter & Changes', points:[
            'Solid: fixed shape & volume; particles in regular lattice, vibrate only',
            'Liquid: fixed volume, no fixed shape; particles slide past each other',
            'Gas: no fixed shape or volume; particles move fast, far apart, random directions',
            'Melting/boiling point: energy input breaks intermolecular forces; temperature constant during change',
            'Diffusion: random movement from high to low concentration; faster at high temperature, in gases',
          ]},
        ]},
        { title:'Atomic Structure & Bonding', icon:'⚛️', topics:[
          { title:'Atomic Structure', points:[
            'Proton: relative charge +1, mass 1 (in nucleus)',
            'Neutron: charge 0, mass 1 (in nucleus)',
            'Electron: charge −1, negligible mass (in shells/orbitals around nucleus)',
            'Atomic (proton) number = number of protons = number of electrons in neutral atom',
            'Isotopes: same atomic number, different mass number (different neutrons)',
          ]},
          { title:'Electronic Configuration & Periodic Table', points:[
            'Electrons fill shells: shell 1 → max 2; shell 2 → max 8; shell 3 → max 8 (at IGCSE)',
            'Group number = number of outer electrons; Period = number of occupied shells',
            'Na (11): 2,8,1 → Group I → loses 1e⁻ → Na⁺; Cl (17): 2,8,7 → gains 1e⁻ → Cl⁻',
            'Noble gases (Group 0): full outer shells → very stable, unreactive',
            'Periodic table trends: metallic character decreases across period; increases down group',
          ]},
          { title:'Ionic Bonding', points:[
            'Metals lose electrons, non-metals gain electrons to achieve full outer shells',
            'Ionic bond: electrostatic attraction between oppositely charged ions',
            'Giant ionic lattice: high melting/boiling point; conducts when molten or dissolved',
            'Formulae: charges must balance — Ca²⁺ + 2Cl⁻ → CaCl₂',
            'Properties: brittle (layers shift → like charges repel), soluble in water',
          ]},
          { title:'Covalent Bonding', points:[
            'Non-metals share pairs of electrons to achieve full outer shells',
            'Single bond = 1 shared pair; double bond = 2 shared pairs (e.g. O₂, CO₂)',
            'Simple molecular: low MP (weak intermolecular forces); do NOT conduct electricity',
            'Giant covalent (macromolecular): very high MP — diamond (4 bonds to C), SiO₂',
            'Diamond vs graphite: diamond (hard, no conduction) vs graphite (soft, conducts — delocalised e⁻)',
          ]},
          { title:'Metallic Bonding', points:[
            'Positive metal ions in a "sea" of delocalised electrons',
            'High melting point (strong attraction); good conductor of electricity (free electrons)',
            'Malleable and ductile (layers slide — electrons move with them)',
            'Alloys: mix of metals → different sized atoms → harder (e.g. steel = iron + carbon)',
          ]},
        ]},
        { title:'Stoichiometry', icon:'🧮', topics:[
          { title:'Moles & Calculations', points:[
            'Relative atomic mass (Ar): mass relative to ¹²C = 12',
            'Molar mass (Mr): sum of Ar values in formula (in g/mol)',
            'Moles = mass ÷ molar mass; or = volume ÷ 24 dm³ (gas at RTP)',
            'Concentration (mol/dm³) = moles ÷ volume (dm³)',
            'Balanced equation gives molar ratios — use to find amounts of reactants/products',
          ], examTips:[
            'Always show the mole calculation step-by-step: moles → ratio → answer',
            'For titration: moles of acid = concentration × volume (in dm³); then use molar ratio',
            'Remember: 1 dm³ = 1000 cm³, so divide cm³ by 1000 to get dm³',
          ], workedExample:`25 cm³ of 0.1 mol/dm³ NaOH neutralised by HCl. Find moles of NaOH:
n(NaOH) = 0.1 × (25/1000) = 0.0025 mol
NaOH + HCl → NaCl + H₂O  [1:1 ratio]
∴ n(HCl) = 0.0025 mol`},
          { title:'Empirical & Molecular Formulae', points:[
            'Empirical formula: simplest whole number ratio of atoms',
            'Find from % composition: divide % by Ar, then divide by smallest',
            'Molecular formula: actual number of atoms; may be multiple of empirical formula',
            'Yield: actual yield may be less than theoretical due to impurities, reversible reactions',
            'Atom economy = (Mr of desired product ÷ Mr of all products) × 100%',
          ]},
        ]},
        { title:'Acids, Bases & Salts', icon:'🧫', topics:[
          { title:'Acids & Bases', points:[
            'Acid: produces H⁺ ions in aqueous solution; pH < 7',
            'Alkali (soluble base): produces OH⁻ ions; pH > 7; neutral pH = 7',
            'Strong acid: fully ionises (HCl, H₂SO₄, HNO₃); weak acid: partially (ethanoic)',
            'Neutralisation: H⁺(aq) + OH⁻(aq) → H₂O(l)',
            'Indicators: litmus (red→acid, blue→alkali); universal indicator for pH scale',
          ]},
          { title:'Making Salts', points:[
            'Titration: soluble salt from soluble acid + soluble alkali — find exact volumes',
            'Acid + metal (reactive): acid + metal → salt + hydrogen',
            'Acid + metal oxide/hydroxide: → salt + water',
            'Acid + carbonate: → salt + water + carbon dioxide',
            'Precipitation: mix two solutions → insoluble product forms; filter to collect',
          ], examTips:[
            'Name the salt correctly: acid name tells you anion — hydrochloric → chloride; sulfuric → sulfate; nitric → nitrate',
            'Excess solid method: add excess of solid to acid until no more reacts → filter off excess → evaporate',
            'Precipitation: always write "(aq) + (aq) → (s)" to show insoluble product forming',
          ], workedExample:`Make copper sulfate crystals from copper oxide and sulfuric acid:
1. Add excess CuO to warm H₂SO₄ (ensures all acid reacts)
2. Filter to remove excess CuO
3. Evaporate solution to concentrate
4. Leave to crystallise → blue CuSO₄·5H₂O crystals`},
        ]},
        { title:'Energetics & Rates', icon:'🔥', topics:[
          { title:'Energy Changes in Reactions', points:[
            'Exothermic: releases energy → products lower energy than reactants → ΔH negative',
            'Endothermic: absorbs energy → products higher energy than reactants → ΔH positive',
            'Bond breaking: requires energy (endothermic); bond forming: releases energy (exothermic)',
            'ΔH = energy needed to break bonds − energy released forming bonds',
            'Activation energy: minimum energy needed for reaction to start (shown on energy profile)',
          ]},
          { title:'Rates of Reaction', points:[
            'Rate of reaction = amount of product formed (or reactant used) ÷ time',
            'Factors increasing rate: higher concentration, temperature, surface area, pressure (gases), catalyst',
            'Catalyst: lowers activation energy, not consumed in reaction → more effective collisions',
            'Collision theory: particles must collide with sufficient energy and correct orientation',
            'Monitor rate: measure volume of gas, change in mass, colour change, turbidity',
          ], examTips:[
            'Explain each factor using collision theory — more/faster collisions = faster rate',
            'Temperature: +10°C roughly doubles rate (more particles have activation energy)',
            'Surface area: smaller particles = greater SA:volume ratio = more collisions per second',
          ], commonMistakes:[
            'Saying catalyst "provides energy" — it lowers activation energy, not provides energy',
            'Confusing rate with yield — a catalyst increases rate but does NOT change yield',
          ], workedExample:`Marble chips + HCl: how does surface area affect rate?
Small chips (large SA): more collisions per second → faster rate → steeper initial gradient
Same total mass → same moles → same final volume of CO₂
Large chips: slower rate → shallower gradient, but same final volume`},
        ]},
        { title:'Organic Chemistry', icon:'🌿', topics:[
          { title:'Hydrocarbons', points:[
            'Alkanes: CₙH₂ₙ₊₂, saturated (C−C single bonds), unreactive, combustion',
            'Alkenes: CₙH₂ₙ, unsaturated (C=C double bond), more reactive — addition reactions',
            'Test for alkene: bromine water turns from orange/brown to colourless',
            'Crude oil: mixture of hydrocarbons separated by fractional distillation (boiling points)',
            'Cracking: long alkanes → shorter alkanes + alkenes (thermal or catalytic)',
          ], examTips:[
            'Name alkanes: meth(1C), eth(2C), prop(3C), but(4C), pent(5C) — learn the prefixes',
            'Bromine water test: shake with unknown compound — if it decolourises, C=C present',
          ], workedExample:`Combustion of propane (C₃H₈):
C₃H₈ + 5O₂ → 3CO₂ + 4H₂O
Balance: 3C → 3CO₂; 8H → 4H₂O; O needed = 6+4 = 10, so 5O₂`},
          { title:'Alcohols, Polymers & Organic Chemistry', points:[
            'Alcohols: −OH group; ethanol (C₂H₅OH) from fermentation of glucose',
            'Ethanol combustion: C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O',
            'Addition polymerisation: alkene monomers join → polymer (e.g. ethene → poly(ethene))',
            'Condensation polymerisation: two functional groups per monomer; small molecule (e.g. H₂O) eliminated',
            'Nylon (polyamide): diamine + dioic acid; Polyester: diol + dioic acid',
          ]},
        ]},
        { title:'Electrochemistry', icon:'⚡', topics:[
          { title:'Electrolysis', points:[
            'Electrolysis: decomposition of ionic compound by electric current when molten or in solution',
            'Cathode (negative): cations (positive ions) move here → gain electrons → reduced',
            'Anode (positive): anions (negative ions) move here → lose electrons → oxidised',
            'Electrolysis of brine: cathode → H₂; anode → Cl₂; remaining solution → NaOH',
            'Industrial uses of brine electrolysis: Cl₂ for disinfection/PVC; H₂ for fuel/Haber process; NaOH for soap',
          ], examTips:[
            'Memory trick: OILRIG — Oxidation Is Loss, Reduction Is Gain (of electrons)',
            'Aqueous solution: if metal ion is below H₂ in reactivity series, metal is deposited; otherwise H₂ given off',
          ], workedExample:`Electrolysis of copper sulfate solution with copper electrodes:
Cathode: Cu²⁺ + 2e⁻ → Cu (copper deposited)
Anode: Cu → Cu²⁺ + 2e⁻ (copper dissolves)
Used in copper purification — anode loses mass, cathode gains mass`},
          { title:'Reactivity Series & Metals', points:[
            'Reactivity series (most to least): K, Na, Ca, Mg, Al, Zn, Fe, Ni, Sn, Pb, H, Cu, Ag, Au',
            'Displacement: more reactive metal displaces less reactive from solution (e.g. Fe + CuSO₄ → FeSO₄ + Cu)',
            'Extraction of metals: reactive (Al) → electrolysis; less reactive (Fe) → blast furnace with carbon',
            'Blast furnace: iron ore + coke + limestone → molten iron + slag (calcium silicate)',
            'Rusting: iron + water + oxygen → hydrated iron(III) oxide (rust); prevented by galvanising, painting, alloying',
          ]},
        ]},
        { title:'Industrial Chemistry', icon:'🏭', topics:[
          { title:'Haber Process & Fertilisers', points:[
            'Haber process: N₂ + 3H₂ ⇌ 2NH₃  (reversible reaction)',
            'Conditions: temperature 450°C, pressure 200 atm, iron catalyst',
            'Compromise temperature: higher temp → faster rate but lower yield; 450°C balances both',
            'Nitrogen source: air (78% N₂); hydrogen source: natural gas (methane + steam)',
            'Ammonia used: fertilisers (ammonium nitrate, ammonium sulfate), nitric acid production',
          ], examTips:[
            'Explain the compromise conditions — examiners want you to discuss rate vs yield trade-off',
            'Reversible reaction: Le Chatelier\'s principle — increase pressure shifts equilibrium to fewer moles of gas',
          ], commonMistakes:[
            'Saying higher temperature gives more ammonia — it actually shifts equilibrium backward (exothermic forward)',
            'Forgetting that catalyst does NOT change yield, only rate',
          ], workedExample:`Why is 450°C chosen for Haber Process?
Higher temp: rate ↑ but yield ↓ (forward reaction exothermic, high temp shifts backward)
Lower temp: yield ↑ but rate too slow → economically unviable
450°C = compromise between acceptable rate AND reasonable yield (~15%)`},
          { title:'Contact Process & Sulfuric Acid', points:[
            'Contact process makes sulfuric acid (most important industrial chemical)',
            'Stage 1: S + O₂ → SO₂ (burning sulfur)',
            'Stage 2: 2SO₂ + O₂ ⇌ 2SO₃  (V₂O₅ catalyst, 450°C, 2 atm)',
            'Stage 3: SO₃ + H₂SO₄ → H₂S₂O₇ (oleum) → add water → H₂SO₄',
            'Uses of H₂SO₄: fertilisers, detergents, car batteries, dyes, paints',
          ]},
        ]},
        { title:'Qualitative Analysis', icon:'🔍', topics:[
          { title:'Identifying Ions & Gases', points:[
            'Flame tests: Li⁺ red; Na⁺ yellow/orange; K⁺ lilac; Ca²⁺ brick-red; Cu²⁺ blue-green',
            'NaOH test: Cu²⁺ → blue ppt; Fe²⁺ → green ppt; Fe³⁺ → brown/orange ppt; NH₄⁺ → ammonia smell',
            'Silver nitrate (AgNO₃) test: Cl⁻ → white ppt; Br⁻ → cream ppt; I⁻ → yellow ppt',
            'Carbonate test: add dilute HCl → CO₂ produced → turns limewater milky',
            'Sulfate test: add dilute HCl then BaCl₂ → white precipitate of BaSO₄',
          ], examTips:[
            'Always add dilute acid BEFORE silver nitrate/barium chloride to avoid false positives',
            'Describe ppt colour and confirm with solubility in ammonia (for halides)',
          ]},
          { title:'Gas Tests', points:[
            'Hydrogen: lit splint → squeaky pop',
            'Oxygen: glowing splint → relights',
            'Carbon dioxide: limewater (Ca(OH)₂) → turns cloudy/milky (CaCO₃ precipitate)',
            'Chlorine: damp litmus paper → bleaches white',
            'Ammonia: damp red litmus paper → turns blue (alkaline)',
          ]},
        ]},
      ],
      edexcel: [
        { title:'Principles of Chemistry', icon:'⚗️', topics:[
          { title:'Atomic Structure & The Periodic Table', points:[
            'Atom: protons (nucleus, +), neutrons (nucleus, 0), electrons (shells, −)',
            'Atomic number = number of protons; mass number = protons + neutrons',
            'Electron configuration: fill shells 2, 8, 8 — e.g. Na (2,8,1); Cl (2,8,7)',
            'Group number = number of outer electrons; Period number = number of electron shells',
            'Isotopes: same atomic number, different mass number (different neutrons)',
          ], examTips:[
            'Relative atomic mass = weighted average of isotope masses — always show working',
            'Edexcel: periodic table questions link group/period to properties — know the trends',
          ]},
          { title:'Bonding & Structure', points:[
            'Ionic: metal gives electrons to non-metal → lattice of oppositely charged ions; high melting point',
            'Covalent: non-metals share electrons; simple molecular (low mp/bp) vs giant covalent (very high mp)',
            'Metallic: positive ions in sea of delocalised electrons → conducts electricity, malleable',
            'Giant covalent: diamond (all 4 bonds, very hard), graphite (3 bonds, 1 delocalised electron → conducts)',
            'Predicting structure: metal+non-metal → ionic; non-metal+non-metal → covalent',
          ], workedExample:`Predict the type of bonding in MgCl₂:
Mg is a metal (Group 2), Cl is a non-metal (Group 7) → ionic bonding
Mg loses 2 electrons → Mg²⁺; each Cl gains 1 electron → Cl⁻
Formula: MgCl₂ (2 Cl⁻ for every Mg²⁺ to balance charges)`},
        ]},
        { title:'Inorganic Chemistry', icon:'🧪', topics:[
          { title:'Acids, Bases & Salts', points:[
            'Acids: produce H⁺ ions in solution; HCl (hydrochloric), H₂SO₄ (sulfuric), HNO₃ (nitric)',
            'Bases: accept H⁺ ions; alkalis are soluble bases (NaOH, Ca(OH)₂) — produce OH⁻',
            'Acid + base → salt + water (neutralisation)',
            'Acid + metal carbonate → salt + water + CO₂; acid + metal → salt + hydrogen',
            'Universal indicator: pH 0–6 acid (red→yellow); 7 neutral (green); 8–14 alkali (blue→purple)',
          ], examTips:[
            'Name the salt: hydrochloric acid → chloride; sulfuric acid → sulfate; nitric acid → nitrate',
            'Titration: acid + alkali with indicator; burette measures volume added; record at colour change',
          ], workedExample:`What salt forms when HCl reacts with NaOH?
HCl + NaOH → NaCl + H₂O
HCl is hydrochloric acid → forms chloride salts
Na comes from NaOH → sodium
Salt = sodium chloride (NaCl) = table salt`},
          { title:'Metals & Reactivity', points:[
            'Reactivity series (high→low): K Na Ca Mg Al Zn Fe Sn Pb H Cu Ag Au',
            'More reactive metals: displace less reactive from solutions; react with acids (if above H)',
            'Extraction: reactive metals (Na, Al) by electrolysis; less reactive (Fe) by reduction with carbon',
            'Rusting: iron + water + oxygen → hydrated iron(III) oxide; prevented by painting, galvanising, alloy',
            'Alloys: mixtures of metals; brass (Cu+Zn), steel (Fe+C), stainless steel (Fe+Cr+Ni)',
          ]},
        ]},
        { title:'Physical Chemistry', icon:'⚡', topics:[
          { title:'Energy Changes', points:[
            'Exothermic: energy released to surroundings; temperature rises; products lower energy (combustion, neutralisation)',
            'Endothermic: energy absorbed from surroundings; temperature falls (thermal decomposition, dissolving ammonium nitrate)',
            'Bond breaking: endothermic (requires energy); bond forming: exothermic (releases energy)',
            'Overall: if energy to break bonds > energy released making bonds → endothermic (and vice versa)',
            'Activation energy: minimum energy needed to start a reaction; catalyst lowers this',
          ], examTips:[
            'Exo vs endo: exothermic = energy exits (gives heat out); endothermic = energy enters (takes heat in)',
            'Bond energy calculations: ΔH = Σ(bonds broken) − Σ(bonds formed)',
          ], workedExample:`H₂ + Cl₂ → 2HCl
Bonds broken: H−H (436 kJ) + Cl−Cl (242 kJ) = 678 kJ
Bonds formed: 2 × H−Cl (2 × 431 = 862 kJ)
ΔH = 678 − 862 = −184 kJ/mol (negative → exothermic)`},
          { title:'Rates of Reaction', points:[
            'Rate = amount of product formed (or reactant used) ÷ time',
            'Factors affecting rate: concentration (more particles → more frequent collisions), temperature, surface area, catalyst',
            'Collision theory: reaction occurs when particles collide with sufficient energy (≥ activation energy)',
            'Catalyst: provides alternative pathway with lower activation energy; not consumed in reaction',
            'Measuring rate: gas collected in syringe; change in mass (CO₂ escaping); colour change; titration',
          ]},
        ]},
        { title:'Organic Chemistry', icon:'🔬', topics:[
          { title:'Carbon Compounds', points:[
            'Organic chemistry: study of carbon-containing compounds (except CO, CO₂, carbonates)',
            'Homologous series: group of compounds with same functional group, same general formula, similar properties',
            'Alkanes (CₙH₂ₙ₊₂): saturated; single bonds; methane CH₄, ethane C₂H₆; fuels; combustion reaction',
            'Alkenes (CₙH₂ₙ): unsaturated; contain C=C double bond; ethene C₂H₄; test: decolourise bromine water',
            'Alcohols (CₙH₂ₙ₊₁OH): methanol CH₃OH, ethanol C₂H₅OH; fuels, solvents; fermentation makes ethanol',
          ], examTips:[
            'Saturated vs unsaturated: use bromine water test — unsaturated (alkenes) decolourise it; alkanes do not',
            'Cracking: breaking long-chain alkanes into shorter alkanes + alkenes (at high temperature, with catalyst)',
          ], workedExample:`Test to distinguish between ethane (C₂H₆) and ethene (C₂H₄):
Add bromine water to each sample
Ethane (alkane, saturated): bromine water stays orange/brown — NO reaction
Ethene (alkene, unsaturated): bromine water decolourises → goes colourless
Conclusion: the sample that decolourises bromine water is ethene`},
          { title:'Polymers & Reactions', points:[
            'Addition polymerisation: alkene monomers join together; no other product; e.g. polyethene from ethene',
            'Condensation polymerisation: monomers with 2 functional groups; water (or HCl) released; e.g. nylon, Terylene',
            'Plastics: non-biodegradable; solutions: recycling, biodegradable plastics, reduce use',
            'Fermentation: glucose → ethanol + CO₂ (yeast, 25–35°C, anaerobic); fractional distillation to purify',
            'Esterification: alcohol + carboxylic acid → ester + water (concentrated H₂SO₄ catalyst); pleasant smell',
          ]},
        ]},
      ],
      oxford: [
        { title:'Atomic Structure & Bonding', icon:'⚛️', topics:[
          { title:'Atomic Structure', points:[
            'Oxford AQA uses same core: protons, neutrons, electrons; atomic/mass number',
            'Isotopes: same atomic number, different mass number; some isotopes are radioactive',
            'Electronic structure: shells fill from inner outward; determines chemical properties',
            'Ions: atoms that have gained or lost electrons; ion charge = protons − electrons',
            'Oxford AQA: includes relative atomic mass calculated from isotope masses and abundances',
          ], examTips:[
            'Relative atomic mass calculation: Ar = Σ(isotope mass × % abundance) ÷ 100',
          ], workedExample:`Chlorine: 75% ³⁵Cl and 25% ³⁷Cl
Ar = (35 × 75 + 37 × 25) / 100 = (2625 + 925) / 100 = 3550 / 100 = 35.5`},
          { title:'Bonding Types & Properties', points:[
            'Ionic: metal + non-metal; giant lattice; high MP; conducts when molten/dissolved',
            'Covalent: non-metal + non-metal; simple molecular (low MP) or giant (very high MP)',
            'Metallic: positive ions in sea of delocalised electrons; conducts, malleable',
            'Oxford AQA: includes intermolecular forces (van der Waals) explaining properties of simple molecules',
            'Hydrogen bonding: between H and electronegative atom (F, O, N) — explains water\'s high boiling point',
          ]},
        ]},
        { title:'Chemical Reactions & Energy', icon:'🔥', topics:[
          { title:'Rates & Energy Changes', points:[
            'Oxford AQA: emphasis on practical skills — describe how to measure rate experimentally',
            'Endothermic vs exothermic: measured by temperature change; energy profile diagrams',
            'Bond enthalpies: use to calculate ΔH = bonds broken − bonds made (in kJ/mol)',
            'Reversible reactions: equilibrium — position depends on concentration, temperature, pressure',
            'Le Chatelier\'s principle: system opposes any change made to it (shift in equilibrium position)',
          ], examTips:[
            'Oxford AQA: "describe an experiment to..." — always state: what you measure, what you control, how you record',
            'Bond enthalpy calculations: draw out all bonds explicitly before calculating',
          ], workedExample:`H₂ + Cl₂ → 2HCl
Bonds broken: H-H (436) + Cl-Cl (243) = 679 kJ
Bonds made: 2 × H-Cl (2×431) = 862 kJ
ΔH = 679 − 862 = −183 kJ/mol (exothermic)`},
          { title:'Organic Chemistry', points:[
            'Oxford AQA: alkanes (saturated), alkenes (unsaturated, C=C), alcohols (-OH), carboxylic acids (-COOH)',
            'Homologous series: same functional group, same general formula, properties change gradually',
            'Combustion: complete → CO₂ + H₂O; incomplete → CO + soot (carbon) + H₂O',
            'Addition reactions of alkenes: + H₂ (hydrogenation), + Br₂ (bromination, test for C=C), + HBr',
            'Condensation polymers: nylon, polyester — require two different monomers; water produced',
          ]},
        ]},
        { title:'Earth, Atmosphere & Resources', icon:'🌍', topics:[
          { title:'The Earth & Its Resources', points:[
            'Earth\'s structure: inner core (solid Fe/Ni), outer core (liquid), mantle (semi-solid), crust (thin, rock)',
            'Tectonic plates: move on convection currents in mantle; collision → mountains, earthquakes, volcanoes',
            'Rock cycle: igneous (cooled magma) → weathering → sedimentary → pressure → metamorphic → melting → igneous',
            'Metal extraction: electrolysis for reactive (Al), reduction by carbon for medium (Fe, Cu), displacement for less reactive',
            'Finite resources: fossil fuels, many metals — must manage sustainably; recycle metals to conserve',
          ]},
          { title:'Atmosphere & Climate', points:[
            'Early atmosphere: mainly CO₂, N₂, water vapour from volcanoes; little O₂',
            'O₂ produced by photosynthesis over billions of years; CO₂ absorbed by oceans and plants',
            'Current atmosphere: ~78% N₂, ~21% O₂, ~0.04% CO₂, trace noble gases',
            'Greenhouse gases: CO₂, CH₄, water vapour → trap heat; human activity increasing CO₂',
            'Pollution: CO (poisonous), SO₂ (acid rain), NOₓ (smog), particulates (respiratory issues)',
          ]},
        ]},
      ],
    }
  },
  biology: {
    label:'Biology', arabic:'الأحياء', icon:'🧬', color:'#10B981',
    boards: ['cie','edexcel','oxford'],
    pastPapers: {
      cie:     'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-biology-0610/past-papers/',
      edexcel: 'https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-biology-2017.coursematerials.html',
      oxford:  'https://www.oxfordaqaexams.org.uk/igcse/biology/',
    },
    chapters: {
      cie: [
        { title:'Cell Biology', icon:'🔬', topics:[
          { title:'Cell Structure', points:[
            'All living things are made of cells (cell theory)',
            'Animal cell: cell membrane, cytoplasm, nucleus, mitochondria, ribosomes',
            'Plant cell (extra): cell wall (cellulose), chloroplasts, large permanent vacuole',
            'Nucleus: contains DNA; controls cell activities; has nuclear membrane',
            'Mitochondria: aerobic respiration occurs here → produces ATP energy',
          ]},
          { title:'Movement In & Out of Cells', points:[
            'Diffusion: net movement of particles from high to low concentration — passive, no energy',
            'Osmosis: net movement of water through a semi-permeable membrane, from dilute to concentrated solution',
            'Active transport: movement against concentration gradient — requires ATP energy',
            'Turgid plant cell: full of water → stiff (provides support); plasmolysed: loses water → shrinks',
            'Factors affecting diffusion rate: concentration gradient, surface area, distance, temperature',
          ]},
        ]},
        { title:'Biological Molecules & Enzymes', icon:'⚗️', topics:[
          { title:'Biological Molecules', points:[
            'Carbohydrates (C,H,O): glucose for energy; starch for storage (plants); glycogen (animals)',
            'Proteins (C,H,O,N,S): made from amino acids — enzymes, antibodies, haemoglobin, keratin',
            'Lipids (C,H,O): fat stores energy; forms cell membranes; glycerol + 3 fatty acids',
            'Test for starch: iodine solution → blue-black; for reducing sugars: Benedict\'s → brick-red',
            'Test for protein: Biuret → purple/violet; fat: ethanol emulsion → white cloudy emulsion',
          ]},
          { title:'Enzymes', points:[
            'Biological catalysts: speed up chemical reactions without being used up',
            'Active site: specific 3D shape — only the complementary substrate can bind (lock and key model)',
            'Optimum temperature (~37°C for human enzymes): above it → enzyme denatures (shape permanently changes)',
            'pH: each enzyme has optimal pH; extreme pH → denaturation (e.g. pepsin pH 2, salivary amylase pH 7)',
            'Substrate concentration: increases rate until all active sites occupied → plateau reached',
          ]},
        ]},
        { title:'Plant Biology', icon:'🌿', topics:[
          { title:'Photosynthesis', points:[
            'Equation: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂ (in chloroplasts)',
            'Chlorophyll: green pigment that absorbs red and blue light (reflects green)',
            'Limiting factors: light intensity, CO₂ concentration, temperature',
            'Test for photosynthesis: destarch leaf first (dark 24 hrs) → expose to light → iodine test',
            'Variegated leaf experiment: only green regions (chloroplasts) test positive for starch',
          ]},
          { title:'Transpiration & Transport', points:[
            'Transpiration: loss of water vapour from leaves through stomata',
            'Increases with: higher temperature, lower humidity, wind, greater light intensity',
            'Xylem: carries water and minerals UP from roots (dead cells, no end walls)',
            'Phloem: carries sugars UP and DOWN from leaves to rest of plant (live cells)',
            'Root hair cells: increase surface area for absorption of water and minerals',
          ]},
        ]},
        { title:'Human Biology', icon:'🫀', topics:[
          { title:'Nutrition & Digestion', points:[
            'Carbohydrates, proteins, fats, vitamins, minerals, water and fibre — all essential',
            'Mechanical digestion: teeth and stomach churning; chemical: enzymes break down food',
            'Amylase: starch → maltose; Protease: proteins → amino acids; Lipase: fats → glycerol + fatty acids',
            'Bile (from liver): emulsifies fats (breaks into droplets) — increases surface area for lipase',
            'Villi in small intestine: large surface area, rich blood supply → efficient absorption',
          ]},
          { title:'Respiration', points:[
            'Aerobic: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP (38 ATP molecules)',
            'Anaerobic (muscle): glucose → lactic acid + small amount ATP → causes cramp, oxygen debt',
            'Anaerobic (yeast): glucose → ethanol + CO₂ + small amount ATP (fermentation)',
            'Gas exchange in alveoli: large SA, thin walls, moist, good blood supply → efficient diffusion',
            'Breathing in: diaphragm contracts (flattens), ribs move up/out → volume↑, pressure↓',
          ]},
          { title:'Circulation', points:[
            'Double circulation: pulmonary (heart ↔ lungs) + systemic (heart ↔ body)',
            'Red blood cells: haemoglobin carries O₂; biconcave disc → large SA; no nucleus',
            'White blood cells: phagocytes (engulf pathogens) + lymphocytes (produce antibodies)',
            'Arteries: thick muscular wall, no valves, high pressure; veins: valves, thin wall, low pressure',
            'Capillaries: one cell thick → exchange of materials with tissues',
          ]},
          { title:'Coordination & Homeostasis', points:[
            'Neurone types: sensory (receptor → CNS), motor (CNS → effector), relay (within CNS)',
            'Reflex arc: receptor → sensory → relay → motor neurone → effector (no brain involved)',
            'Hormones: chemical messengers in blood; slower but longer lasting than nervous system',
            'Insulin (from pancreas): lowers blood glucose → glycogen stored in liver',
            'Glucagon: raises blood glucose → glycogen broken down; type 1 diabetes = no insulin',
          ]},
        ]},
        { title:'Genetics & Evolution', icon:'🧬', topics:[
          { title:'DNA & Inheritance', points:[
            'DNA: double helix; base pairs A-T and C-G; gene = section of DNA coding for a protein',
            'Chromosomes: humans have 46 (23 pairs); gametes (sex cells) have 23 (haploid)',
            'Dominant allele: expressed in presence of one copy; recessive: only expressed when homozygous',
            'Genotype: alleles present (e.g. Bb); phenotype: observable characteristic',
            'Punnett square: cross two parents to predict offspring ratios',
          ], examTips:[
            'Always state the genotype AND phenotype in genetics questions',
            'Draw Punnett squares clearly — label parents, gametes, and offspring',
            'Sex-linked conditions (e.g. colour blindness): X-linked — show alleles as Xᴴ and Xʰ',
          ], commonMistakes:[
            'Confusing dominant with "more common" — dominant just means expressed when one copy present',
            'Forgetting that sex chromosomes are XY (male) and XX (female)',
            'Writing incorrect gamete combinations in Punnett square',
          ], workedExample:`Cystic fibrosis (recessive, f). Cross Ff × Ff:
Gametes: F, f  ×  F, f
Punnett square → FF : Ff : ff = 1:2:1
Probability of cystic fibrosis (ff) = 1/4 = 25%`},
          { title:'Evolution & Natural Selection', points:[
            'Natural selection: random variation → better-adapted individuals survive → reproduce → pass on alleles',
            'Over generations: advantageous allele frequency increases in population → adaptation',
            'Evidence for evolution: fossils, DNA comparison, antibiotic resistance development',
            'Antibiotic resistance: bacteria with resistant allele survive → multiply → population becomes resistant',
            'Speciation: populations become so different they can no longer interbreed → new species formed',
          ]},
        ]},
        { title:'Reproduction', icon:'🌱', topics:[
          { title:'Sexual & Asexual Reproduction', points:[
            'Sexual reproduction: involves fusion of gametes (fertilisation) → genetic variation produced',
            'Asexual reproduction: single parent, no fertilisation, genetically identical offspring (clones)',
            'Advantages of sexual reproduction: variation helps population adapt to changing environments',
            'Advantages of asexual reproduction: fast, no mate needed, all offspring can reproduce',
            'Examples of asexual: binary fission (bacteria), budding (hydra), vegetative propagation (plants)',
          ]},
          { title:'Human Reproductive System', points:[
            'Male: testes (produce sperm + testosterone); sperm → epididymis → vas deferens → urethra',
            'Female: ovaries (produce eggs + oestrogen); fallopian tubes carry egg → uterus',
            'Menstrual cycle: ~28 days; oestrogen rebuilds uterus lining; LH triggers ovulation at day 14',
            'Fertilisation: sperm meets egg in fallopian tube → zygote forms → implants in uterus',
            'Placenta: allows exchange of oxygen, glucose, antibodies, waste between mother and foetus (no blood mixing)',
          ], examTips:[
            'Describe placenta function: say "diffusion" and name what crosses in each direction',
            'FSH stimulates follicle growth; LH triggers ovulation — know both hormones',
          ]},
          { title:'Plant Reproduction', points:[
            'Flower parts: sepals, petals, stamen (anther + filament), carpel (stigma + style + ovary)',
            'Pollination: transfer of pollen from anther to stigma — wind-pollinated or insect-pollinated',
            'Insect-pollinated flowers: large colourful petals, scent, nectar, sticky pollen',
            'Wind-pollinated flowers: no petals/scent, feathery stigma, light pollen, anthers hang outside',
            'Fertilisation in plants: pollen tube grows down style → male nucleus fuses with female nucleus in ovule',
          ]},
        ]},
        { title:'Ecology & Environment', icon:'🌍', topics:[
          { title:'Ecosystems & Food Webs', points:[
            'Ecosystem: all organisms in an area + their non-living environment interacting',
            'Producer: makes own food by photosynthesis (plants, algae)',
            'Consumer: obtains energy by eating other organisms — primary (eat plants), secondary, tertiary',
            'Decomposers: bacteria and fungi break down dead matter → release minerals back to soil',
            'Food chain shows feeding relationships; food web = many interconnected food chains',
          ]},
          { title:'Energy Flow & Nutrient Cycles', points:[
            'Energy lost at each trophic level: ~90% lost as heat, excretion, movement → only ~10% transferred',
            'Pyramids of numbers/biomass: usually decrease up the food chain',
            'Carbon cycle: photosynthesis (removes CO₂), respiration, decomposition, combustion (add CO₂)',
            'Nitrogen cycle: nitrogen fixation (bacteria, lightning) → nitrification → uptake by plants → death → decomposition',
            'Water cycle: evaporation/transpiration → condensation → precipitation → runoff/infiltration',
          ], examTips:[
            'Pyramid of biomass is always the correct pyramid — pyramid of numbers can be inverted (e.g. one tree, many insects)',
            'Carbon cycle: identify each arrow as a process (photosynthesis, respiration, combustion, decomposition)',
          ]},
          { title:'Human Impact & Conservation', points:[
            'Deforestation → less photosynthesis → more CO₂; soil erosion; habitat loss; less rainfall',
            'Eutrophication: excess fertiliser runoff → algal bloom → blocks light → plants die → bacteria decompose → O₂ depleted → fish die',
            'Pollution: water (sewage, fertilisers, oil spills), air (CO₂, SO₂, NOₓ), land (pesticides, plastic)',
            'Conservation: in-situ (nature reserves, national parks) and ex-situ (zoos, seed banks, captive breeding)',
            'Sustainable use: fishing quotas, selective logging, crop rotation, recycling',
          ]},
        ]},
        { title:'Disease & Immunity', icon:'🛡️', topics:[
          { title:'Pathogens & Disease', points:[
            'Pathogens: bacteria (produce toxins), viruses (take over host cell machinery), fungi, protoctists',
            'Transmission routes: droplets (TB, flu), direct contact (athlete\'s foot), contaminated water (cholera), vectors (malaria via mosquito)',
            'Malaria: caused by Plasmodium protoctist; spread by female Anopheles mosquito (vector)',
            'HIV/AIDS: virus destroys helper T-cells → immune system weakens → death from opportunistic infections',
            'Cholera: bacteria produce toxin → chloride ions flood gut → water follows by osmosis → severe diarrhoea',
          ]},
          { title:'Immunity & Defence', points:[
            'First line of defence: skin (barrier), mucus (traps pathogens), cilia (sweep mucus), stomach acid (pH 2)',
            'Phagocytes (white blood cells): engulf and digest pathogens — non-specific',
            'Lymphocytes: produce antibodies — specific to one antigen (shape of pathogen)',
            'Active immunity: body produces antibodies after infection or vaccination — long-lasting memory cells',
            'Passive immunity: antibodies received (from mother via placenta/breast milk, or injection) — temporary',
          ], examTips:[
            'Active immunity = YOUR body makes antibodies; Passive = you RECEIVE antibodies',
            'Vaccination: inject weakened/dead pathogen → immune system produces memory cells → rapid response on future exposure',
            'Always link antibody shape to specific antigen — complementary binding',
          ], commonMistakes:[
            'Saying vaccines "cure" disease — vaccines prevent, not cure',
            'Confusing phagocytosis (engulf) with antibody production',
          ]},
        ]},
        { title:'Excretion & Homeostasis', icon:'💧', topics:[
          { title:'Excretion', points:[
            'Excretion: removal of metabolic waste products — CO₂ (lungs), urea (kidneys), water + salts (skin)',
            'Urea: produced in liver from breakdown of excess amino acids (deamination)',
            'Kidney: filters blood → reabsorbs glucose, water, salts → urine = water + urea + salts',
            'Nephron: Bowman\'s capsule (ultrafiltration) → tubule (selective reabsorption) → collecting duct',
            'ADH: hormone that controls water reabsorption — more ADH → concentrated urine produced',
          ]},
          { title:'Homeostasis', points:[
            'Homeostasis: maintaining a constant internal environment (temperature, blood glucose, water balance)',
            'Body temperature: hypothalamus detects change → shivering (heat) or sweating (cool) → negative feedback',
            'Blood glucose regulation: after meal → insulin released → glucose → glycogen in liver (lowers glucose)',
            'Glucagon: low blood glucose → released → glycogen → glucose (raises blood glucose)',
            'Type 1 diabetes: pancreas cannot produce insulin → needs insulin injections',
            'Type 2 diabetes: cells become resistant to insulin → controlled by diet, exercise, sometimes medication',
          ], examTips:[
            'Negative feedback: change detected → response to reverse the change → return to normal',
            'Always name the organ detecting the change AND the organ producing the response',
          ], workedExample:`Blood glucose control after a meal:
Blood glucose rises → detected by pancreas
→ beta cells release insulin into blood
→ liver/muscle cells absorb glucose → stored as glycogen
→ blood glucose returns to normal → insulin secretion stops`},
        ]},
        { title:'Biotechnology', icon:'🔬', topics:[
          { title:'Genetic Engineering & Biotechnology', points:[
            'Genetic engineering: isolate gene → use restriction enzyme to cut DNA → insert into vector (plasmid) → introduce to host organism',
            'Insulin production: human insulin gene inserted into bacterial plasmid → bacteria grown in fermenter → insulin harvested',
            'GM crops: drought-resistant, pest-resistant, higher yield — e.g. Golden Rice (contains vitamin A gene)',
            'Cloning: embryo splitting → identical twins; somatic cell nuclear transfer → Dolly the sheep',
            'Fermentation: yeast in anaerobic conditions → glucose → ethanol + CO₂ (beer, bread, biofuel)',
          ], examTips:[
            'Genetic engineering questions: describe the steps — restrict, ligate (join), transform, select',
            'Always give a named example of a GM organism and what benefit it provides',
          ]},
          { title:'Selective Breeding', points:[
            'Selective breeding (artificial selection): humans select organisms with desired traits to breed',
            'Over generations: allele frequency changes → organisms with desired traits become more common',
            'Examples: cattle bred for high milk yield; wheat bred for disease resistance; dogs bred for temperament',
            'Disadvantage: reduces genetic variation → population more vulnerable to new diseases',
            'Compare to natural selection: selective breeding driven by human choice, not environment',
          ]},
        ]},
      ],
      edexcel: [
        { title:'Cell Biology & Microscopy', icon:'🔬', topics:[
          { title:'Cell Structure & Microscopy', points:[
            'Edexcel IGCSE Biology uses same core cell structure as CIE (animal/plant cell organelles)',
            'Light microscope: magnification up to ×2000; electron microscope: up to ×1,000,000',
            'Magnification = image size ÷ actual size; rearrange to find actual or image size',
            'Edexcel: includes eukaryotic (membrane-bound nucleus) vs prokaryotic (no nucleus — bacteria)',
            'Bacterial cell: no nucleus, smaller, has plasmid (small circular DNA), cell wall (peptidoglycan)',
          ], examTips:[
            'Magnification calculation: image size / actual size = magnification — keep units consistent (μm or mm)',
            'Distinguish prokaryote from eukaryote: prokaryote has no nuclear membrane, no membrane-bound organelles',
          ], workedExample:`A cell is 0.1 mm across in a diagram. Actual size = 0.01 mm.
Magnification = image ÷ actual = 0.1 ÷ 0.01 = ×10`},
          { title:'Transport in Cells', points:[
            'Diffusion: passive, down concentration gradient; faster with steeper gradient, smaller molecule, higher temperature',
            'Osmosis: water moves from dilute (high water potential) to concentrated solution through semi-permeable membrane',
            'Active transport: requires ATP; moves substances against gradient (e.g. mineral ions into root hair cells)',
            'Edexcel: exchange surfaces must be large SA, thin, moist, good blood supply — apply to lungs, intestines, gills',
            'Calculating surface area to volume ratio: as cells get larger, SA:V ratio falls → less efficient exchange',
          ]},
        ]},
        { title:'Biological Molecules & Nutrition', icon:'⚗️', topics:[
          { title:'Biological Molecules', points:[
            'Carbohydrates: glucose (respiration), starch (storage in plants), glycogen (storage in animals), cellulose (cell wall)',
            'Proteins: amino acids joined by peptide bonds; shape determines function (e.g. enzyme, antibody, haemoglobin)',
            'Lipids: fats (long-term energy store) and oils; glycerol + 3 fatty acids; less water than carbohydrates per gram',
            'Edexcel food tests: Benedict\'s (reducing sugar → brick red), iodine (starch → blue-black), Biuret (protein → purple)',
            'Water: solvent for metabolic reactions; transport medium; involved in hydrolysis reactions',
          ]},
          { title:'Nutrition & Health', points:[
            'Balanced diet: correct proportions of carbohydrates, proteins, fats, vitamins, minerals, water, fibre',
            'Deficiency diseases: scurvy (vitamin C), rickets (vitamin D), anaemia (iron), kwashiorkor (protein)',
            'Edexcel: includes BMI (Body Mass Index) = mass (kg) ÷ height² (m²); healthy range 18.5–24.9',
            'Coronary heart disease: linked to saturated fat, high cholesterol, smoking, high blood pressure, lack of exercise',
            'Type 2 diabetes: insulin resistance due to poor diet/obesity; managed by diet, exercise, medication',
          ]},
        ]},
        { title:'Body Systems', icon:'🫀', topics:[
          { title:'The Heart & Circulation', points:[
            'Double circulation: pulmonary (heart → lungs → heart) and systemic (heart → body → heart)',
            'Heart structure: 4 chambers — right/left atria receive blood; right/left ventricles pump blood',
            'Valves: prevent backflow — atrioventricular (between atria and ventricles); semilunar (in aorta and pulmonary artery)',
            'Coronary arteries: supply heart muscle with O₂; blockage → heart attack (myocardial infarction)',
            'Edexcel: ECG trace — shows electrical activity of heart; P wave (atrial contraction), QRS (ventricular contraction)',
          ], examTips:[
            'Describe the cardiac cycle: atria fill → atria contract → blood to ventricles → ventricles contract → blood to arteries',
            'Right ventricle pumps to lungs (short distance, low pressure); left ventricle pumps to body (higher pressure, thicker wall)',
          ]},
          { title:'Respiration & Gas Exchange', points:[
            'Aerobic respiration: glucose + oxygen → carbon dioxide + water + energy (ATP)',
            'Anaerobic respiration (animals): glucose → lactic acid; (plants/yeast): glucose → ethanol + CO₂',
            'Alveoli adaptations: large SA (many alveoli), thin walls (one cell thick), moist surface, good blood supply',
            'Edexcel: tidal volume (air breathed per breath) × breathing rate = minute ventilation',
            'Effects of exercise: increased breathing rate and heart rate; lactic acid build-up → oxygen debt',
          ]},
          { title:'The Nervous System', points:[
            'Central nervous system (CNS): brain + spinal cord; peripheral: nerves connecting to organs',
            'Sensory neurone: receptor → CNS; motor neurone: CNS → effector (muscle/gland)',
            'Synapse: gap between neurones; neurotransmitters released, diffuse across, bind to receptors',
            'Reflex arc: fast, automatic response — no conscious thought required; spinal cord coordinates',
            'Edexcel: includes structure and function of the brain — cerebrum (thinking), cerebellum (balance), medulla (breathing/heartbeat)',
          ]},
        ]},
        { title:'Ecology & Evolution', icon:'🌱', topics:[
          { title:'Ecosystems & Interdependence', points:[
            'Population: all individuals of one species in an area; Community: all populations together; Ecosystem: community + abiotic environment',
            'Abiotic factors: temperature, light, pH, water availability, wind, humidity, soil type',
            'Biotic factors: predation, competition, disease, food availability, human activity',
            'Edexcel: carrying capacity — maximum sustainable population size set by limiting factors',
            'Predator-prey cycles: hare and lynx populations oscillate — predator numbers lag behind prey',
          ]},
          { title:'Evolution & Biodiversity', points:[
            'Darwin\'s natural selection: variation → selection pressure → differential survival and reproduction',
            'Evidence for evolution: fossil record, comparative anatomy (homologous structures), DNA comparisons',
            'Antibiotic resistance: mutations produce resistant bacteria; selection favours them → population becomes resistant',
            'Edexcel: includes classification — Kingdom, Phylum, Class, Order, Family, Genus, Species (KPCOFGS)',
            'Biodiversity: measured by number of species and individuals; high biodiversity = ecosystem stability',
          ]},
        ]},
      ],
    }
  },
  cs: {
    label:'Computer Science', arabic:'علوم الكمبيوتر', icon:'💻', color:'#0EA5E9',
    boards: ['cie','edexcel'],
    pastPapers: {
      cie:     'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-computer-science-0478/past-papers/',
      edexcel: 'https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-computer-science-2017.coursematerials.html',
    },
    chapters: {
      cie: [
        { title:'Data Representation', icon:'💾', topics:[
          { title:'Number Systems', points:[
            'Binary (base 2): digits 0 and 1; place values: 128, 64, 32, 16, 8, 4, 2, 1',
            'Hexadecimal (base 16): digits 0–9 and A–F; 1 hex digit = 4 binary bits',
            'Binary → hex: split into groups of 4 from right, convert each group',
            'Binary addition: 0+0=0, 0+1=1, 1+0=1, 1+1=10 (carry 1), 1+1+1=11 (carry 1)',
            'Two\'s complement: to negate, invert all bits then add 1 (allows negative numbers)',
          ]},
          { title:'Data Storage & Encoding', points:[
            '1 bit = 0 or 1; 8 bits = 1 byte; 1 KB = 1024 bytes; 1 MB = 1024 KB; 1 GB = 1024 MB',
            'ASCII: 7-bit character code, 128 characters; Extended ASCII: 8-bit, 256 characters',
            'Unicode: up to 32 bits → supports all world languages and symbols',
            'Image file size = image width × height × colour depth (bits)',
            'Sound file size = sample rate × bit depth × duration (seconds)',
          ]},
        ]},
        { title:'Algorithms', icon:'🔁', topics:[
          { title:'Algorithm Design', points:[
            'Algorithm: precise step-by-step instructions to solve a problem (sequence, selection, iteration)',
            'Pseudocode uses: INPUT/OUTPUT, IF...THEN...ELSE...ENDIF, WHILE...ENDWHILE, FOR...NEXT',
            'Flowchart symbols: oval (start/end), rectangle (process), diamond (decision), parallelogram (I/O)',
            'Trace table: track value of each variable at each step — used to test an algorithm',
            'Decomposition: break complex problem into smaller sub-problems; abstraction: ignore irrelevant detail',
          ]},
          { title:'Sorting & Searching', points:[
            'Bubble sort: compare adjacent pairs, swap if wrong order, repeat n−1 times; simple but slow',
            'Merge sort: divide list in half repeatedly, sort halves, merge back; efficient for large lists',
            'Insertion sort: take next item, insert into correct position in sorted sub-list',
            'Linear search: check each item one by one; O(n); works on unsorted lists',
            'Binary search: halve search space; compare middle item; requires sorted list; O(log n)',
          ], examTips:[
            'Trace table questions: show every variable change at every step — don\'t skip',
            'Know which algorithm to choose: bubble sort for small data; merge sort for large; binary only on sorted',
            'Binary search: show mid = (low+high) ÷ 2 each iteration',
          ], workedExample:`Binary search for 14 in [3, 7, 14, 19, 25, 31, 42]:
Indices 0–6; mid = 3 → value 19 → too high
Search left half [3,7,14]; mid=1 → value 7 → too low
Search right of that: [14]; mid=2 → value 14 ✓ Found!`},
        ]},
        { title:'Hardware & Software', icon:'🖥️', topics:[
          { title:'Computer Architecture', points:[
            'CPU components: ALU (calculations), Control Unit (fetch/decode instructions), registers (fast storage)',
            'Fetch-Decode-Execute cycle: fetch instruction from RAM → decode → execute → repeat',
            'RAM: volatile (lost when power off), random access, fast; ROM: non-volatile, stores boot program',
            'Cache: small, very fast memory between CPU and RAM; reduces time to fetch data',
            'Secondary storage: HDD (magnetic), SSD (flash/no moving parts), optical disc (CD/DVD)',
          ]},
          { title:'Operating Systems & Software', points:[
            'OS manages: hardware resources, processes (multitasking), user interface, file system',
            'High-level language: human-readable (Python, Java); compiled or interpreted to machine code',
            'Compiler: translates entire program at once → produces executable; fast to run',
            'Interpreter: translates line by line; slower, but easier to debug',
            'IDE (Integrated Development Environment): editor, compiler/interpreter, debugger in one',
          ]},
        ]},
        { title:'Networks & Security', icon:'🌐', topics:[
          { title:'Networks', points:[
            'LAN (Local Area Network): same site; WAN (Wide Area Network): multiple sites',
            'Star topology: all devices connect to central switch → if one fails, others unaffected',
            'IP address: unique numerical label for each device on a network',
            'Packet switching: data split into packets, each takes best route, reassembled at destination',
            'Protocols: HTTP/HTTPS (web), FTP (file transfer), TCP/IP (data transmission), SMTP (email)',
          ]},
          { title:'Cyber Security', points:[
            'Phishing: fake emails/websites to steal login credentials',
            'Malware: viruses, worms, ransomware, spyware — spread through downloads or email attachments',
            'Brute force attack: tries all possible passwords systematically',
            'Encryption: scrambles data so only authorised recipient can read it',
            'Prevention: strong passwords, two-factor authentication, firewalls, antivirus, updates',
          ], examTips:[
            'Distinguish between types of malware — virus (spreads by attaching to files), worm (self-replicates across network)',
            'Encryption questions: know symmetric (same key) vs asymmetric (public/private key pair)',
            'Social engineering (e.g. phishing) exploits human behaviour, not software vulnerabilities',
          ]},
        ]},
        { title:'Programming Concepts', icon:'📝', topics:[
          { title:'Programming Fundamentals', points:[
            'Variable: named memory location to store data; must declare before use in some languages',
            'Data types: integer, real/float, boolean (True/False), char, string',
            'Selection: IF condition THEN ... ELSE ... ENDIF; CASE/SWITCH for multiple options',
            'Count-controlled loop: FOR i ← 1 TO n ... NEXT; condition-controlled: WHILE/REPEAT...UNTIL',
            'Procedures: named block of reusable code; functions: return a value; reduces repetition',
          ]},
          { title:'Arrays & File Handling', points:[
            '1D array: list of items of same type with index (e.g. names[0], names[1]...)',
            '2D array: table/grid; accessed with two indices (e.g. grid[row][col])',
            'Traverse array: use FOR loop from 0 (or 1) to length−1',
            'File operations: OPEN, READ, WRITE, CLOSE',
            'Validation: check input is of correct type, range, length, format',
          ]},
        ]},
      ],
      edexcel: [
        { title:'Systems Architecture & Memory', icon:'🖥️', topics:[
          { title:'CPU Architecture', points:[
            'CPU components: ALU (arithmetic/logic), CU (control unit), registers, buses',
            'Registers: PC (program counter), MAR (memory address), MDR (memory data), Accumulator',
            'Fetch-Decode-Execute cycle: PC → MAR → memory → MDR → IR → decode → execute',
            'Clock speed: number of FDE cycles per second (GHz); more cycles = faster processing',
            'Cache memory: small, very fast memory between CPU and RAM; L1 fastest, L3 largest',
          ], examTips:[
            'Always name all 3 stages of FDE cycle in order — missing one loses marks',
            'Distinguish between RAM (volatile, fast) and ROM (non-volatile, read-only)',
          ]},
          { title:'Memory & Storage', points:[
            'RAM (Random Access Memory): temporary, loses data when power off, fast',
            'ROM (Read Only Memory): permanent, holds firmware/BIOS, cannot be written to normally',
            'Secondary storage: HDD (magnetic, large), SSD (flash, fast), optical (CD/DVD/Blu-ray)',
            'Virtual memory: uses secondary storage as extension of RAM when RAM is full (slower)',
            'Cloud storage: data stored on remote servers; accessible anywhere; depends on internet',
          ]},
        ]},
        { title:'Data & Number Systems', icon:'💾', topics:[
          { title:'Binary & Hexadecimal', points:[
            'Binary (base 2): place values 128, 64, 32, 16, 8, 4, 2, 1',
            'Convert decimal 75: 64+8+2+1 = 01001011',
            'Hexadecimal (base 16): 0–9 then A=10, B=11, C=12, D=13, E=14, F=15',
            '1 hex digit = 4 binary bits (nibble); 2 hex digits = 1 byte',
            'Uses: hex used in colour codes (#FF5733), memory addresses, MAC addresses',
          ], examTips:[
            'Show all working when converting — partial credit is available',
            'Binary addition carry rules: 1+1=10, 1+1+1=11 (carry is critical)',
          ], workedExample:`Convert 156 to hexadecimal:
156 ÷ 16 = 9 remainder 12 → 9C
Check: 9×16 + 12 = 144 + 12 = 156 ✓`},
          { title:'Data Types & Representation', points:[
            'Character encoding: ASCII uses 7 bits (128 characters); Unicode uses 16+ bits (global)',
            'Image representation: pixels, resolution (width × height), colour depth (bits per pixel)',
            'File size = pixels × colour depth (bits); divide by 8 for bytes',
            'Sound: sampling rate (Hz) × bit depth × channels = file size per second',
            'Data compression: lossless (exact original restored — ZIP, PNG); lossy (data discarded — MP3, JPEG)',
          ]},
        ]},
        { title:'Networks & Security', icon:'🌐', topics:[
          { title:'Network Types & Topologies', points:[
            'LAN (Local Area Network): small geographic area, privately owned, fast',
            'WAN (Wide Area Network): large area, multiple LANs connected (e.g. Internet)',
            'Star topology: all devices connect to central switch/hub; single device failure does not crash network',
            'Bus topology: all devices share one cable; easy to add devices but collisions occur',
            'Protocols: set of rules for communication; IP, TCP, HTTP, HTTPS, FTP, SMTP',
          ]},
          { title:'Cyber Security', points:[
            'Malware types: virus (attaches to files), worm (self-replicating), ransomware (encrypts files), spyware',
            'Phishing: fake emails/websites to steal credentials — awareness training is key defence',
            'Brute force attack: systematically tries every password combination',
            'SQL injection: malicious SQL code inserted into form inputs to manipulate database',
            'Defences: firewall, antivirus, encryption, 2FA, strong passwords, software updates',
          ], examTips:[
            'For each threat, give a specific defence — generic "use antivirus" scores less than "use a firewall to block unauthorised network access"',
            'Encryption: data scrambled with a key — only correct key can decrypt; protects data in transit',
          ]},
        ]},
        { title:'Algorithms & Programming', icon:'🔁', topics:[
          { title:'Algorithm Design', points:[
            'Decomposition: breaking a problem into smaller, manageable sub-problems',
            'Abstraction: removing unnecessary detail; focus on what matters (e.g. map vs real terrain)',
            'Flowcharts: START/STOP (oval), process (rectangle), decision (diamond), I/O (parallelogram)',
            'Pseudocode: structured English-like code — must be unambiguous and show logic clearly',
            'Trace table: manually track variable values through each iteration of an algorithm',
          ]},
          { title:'Searching & Sorting', points:[
            'Linear search: check each element in sequence; works on unsorted data; O(n)',
            'Binary search: repeatedly halve sorted list; requires sorted data; O(log n)',
            'Bubble sort: compare adjacent pairs, swap if wrong order; repeat n-1 passes; O(n²)',
            'Merge sort: divide into halves, sort each, merge back; efficient for large data; O(n log n)',
            'Testing: normal data, boundary data, erroneous data — always test all three types',
          ], examTips:[
            'Binary search REQUIRES sorted data — state this in exam answers',
            'Trace a sort step-by-step showing each swap — examiners want to see the process',
          ], workedExample:`Binary search for 43 in [12, 25, 37, 43, 56, 78, 91]:
Mid index = 3 → value = 43 → FOUND in 1 comparison
If searching for 56: mid=43 (too low) → search right half [56,78,91] → mid=78 (too high) → [56] → found`},
        ]},
      ],
    }
  },
  economics: {
    label:'Economics', arabic:'الاقتصاد', icon:'📊', color:'#D97706',
    boards: ['cie','edexcel'],
    pastPapers: {
      cie:     'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-economics-0455/past-papers/',
      edexcel: 'https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-economics-2017.coursematerials.html',
    },
    chapters: {
      cie: [
        { title:'Basic Economic Problem', icon:'💡', topics:[
          { title:'Scarcity & Opportunity Cost', points:[
            'Scarcity: unlimited wants but limited resources — the fundamental economic problem',
            'Factors of production: Land (natural), Labour (human), Capital (man-made), Enterprise',
            'Opportunity cost: value of the next best alternative foregone when a choice is made',
            'Production Possibility Curve (PPC): shows maximum output combinations for two goods',
            'Inside PPC = inefficient; on PPC = efficient; outside = currently unachievable',
          ]},
          { title:'Economic Systems', points:[
            'Free market economy: prices determined by supply and demand; private ownership',
            'Planned (command) economy: government decides what, how and for whom to produce',
            'Mixed economy: combination of market and government intervention (most countries)',
            'Privatisation: transfer of public sector businesses to private sector',
            'Price mechanism: signals producers and consumers; rises → less demanded, more supplied',
          ]},
        ]},
        { title:'Supply & Demand', icon:'📈', topics:[
          { title:'Demand', points:[
            'Demand: quantity consumers are willing AND able to buy at each price (effective demand)',
            'Law of demand: as price rises, quantity demanded falls — inverse (negative) relationship',
            'Shifts in demand curve: changes in income, prices of substitutes/complements, tastes, population, advertising',
            'PED = % change in quantity demanded ÷ % change in price (always negative, ignore sign)',
            'PED > 1 elastic (luxuries); PED < 1 inelastic (necessities like petrol, salt); PED = 0 perfectly inelastic',
          ]},
          { title:'Supply', points:[
            'Supply: quantity producers are willing AND able to sell at each price',
            'Law of supply: as price rises, quantity supplied rises — direct (positive) relationship',
            'Shifts in supply: costs of production, technology, subsidies/taxes, weather (agriculture)',
            'PES = % change in quantity supplied ÷ % change in price (always positive)',
            'Market equilibrium: quantity demanded = quantity supplied; no tendency to change',
          ]},
          { title:'Price Elasticity & Revenue', points:[
            'If demand is elastic (PED>1): price ↑ → total revenue ↓ (% drop in Q > % rise in P)',
            'If demand is inelastic (PED<1): price ↑ → total revenue ↑ (% rise in P > % drop in Q)',
            'Determinants of PED: closeness of substitutes, proportion of income, necessity vs luxury, time',
            'XED (cross elasticity): measures effect of change in price of one good on demand for another',
            'Positive XED = substitutes; Negative XED = complements',
          ], examTips:[
            'PED formula: always (% ΔQd) ÷ (% ΔP) — ignore the negative sign unless asked for sign',
            'Distinguish between movement along the curve (price change) vs shift of the curve (other factors)',
            'Evaluate questions: consider both short run AND long run effects (elasticity changes with time)',
          ], commonMistakes:[
            'Saying "demand increases because price falls" — price causes movement along curve, not a shift',
            'Confusing PED with PES — PES is always positive',
          ], workedExample:`Price of a good rises from $10 to $12. Quantity demanded falls from 200 to 160.
% ΔP = (2/10) × 100 = 20%
% ΔQd = (40/200) × 100 = 20%
PED = 20/20 = 1  → Unit elastic`},
        ]},
        { title:'Government & Macroeconomy', icon:'🏛️', topics:[
          { title:'Macroeconomic Aims & Indicators', points:[
            'Four main macroeconomic goals: economic growth, low unemployment, low inflation, balance of payments equilibrium',
            'GDP (Gross Domestic Product): total value of goods/services produced in a country in a year',
            'Unemployment rate = (unemployed ÷ labour force) × 100%',
            'Inflation: sustained general rise in price level; measured by CPI (Consumer Price Index)',
            'Trade-off: e.g. reducing unemployment may increase inflation (Phillips curve)',
          ]},
          { title:'Economic Policies', points:[
            'Fiscal policy: government uses taxation and public spending to influence economy',
            'Expansionary fiscal policy: increase spending / cut taxes → stimulate growth',
            'Monetary policy: central bank controls interest rates and money supply',
            'Lower interest rates: encourage borrowing and spending → economic growth',
            'Supply-side policies: improve productive capacity (education, deregulation, infrastructure)',
          ]},
        ]},
        { title:'International Trade', icon:'🌍', topics:[
          { title:'Trade & Globalisation', points:[
            'Comparative advantage: produce goods at lower opportunity cost → basis of trade',
            'Exports: goods/services sold abroad; imports: bought from abroad',
            'Balance of trade: exports − imports; balance of payments: all international transactions',
            'Protectionism: tariffs (import taxes), quotas (quantity limits), subsidies to domestic producers',
            'Free trade: no barriers; promotes efficiency and lower prices for consumers',
          ]},
          { title:'Exchange Rates', points:[
            'Exchange rate: price of one currency in terms of another',
            'Appreciation: currency becomes worth more → exports more expensive, imports cheaper',
            'Depreciation: currency worth less → exports cheaper (competitive), imports more expensive',
            'Fixed exchange rate: government/central bank maintains rate; floating: set by market forces',
            'Devaluation: deliberate reduction in fixed rate to make exports more competitive',
          ]},
        ]},
        { title:'Market Failure & Government Intervention', icon:'⚖️', topics:[
          { title:'Market Failure', points:[
            'Market failure: when free market produces socially inefficient allocation of resources',
            'Externalities: costs or benefits that fall on third parties not involved in the transaction',
            'Negative externality (e.g. pollution): private cost < social cost → overproduction',
            'Positive externality (e.g. education): private benefit < social benefit → underproduction',
            'Public goods: non-excludable + non-rival → free rider problem → market won\'t provide (e.g. national defence)',
          ], examTips:[
            'Define externality clearly — "cost or benefit experienced by a third party who is not part of the transaction"',
            'Use a diagram when possible — show deadweight loss triangle to demonstrate market failure',
            'Evaluate government intervention: consider government failure as a counter-argument',
          ]},
          { title:'Government Intervention', points:[
            'Taxes (indirect): increase price → reduce consumption of negative externalities (e.g. carbon tax, cigarette tax)',
            'Subsidies: reduce price → increase consumption of positive externalities (e.g. healthcare, education)',
            'Price controls — maximum price (price ceiling): prevents price rising above set level → shortage',
            'Price controls — minimum price (price floor): prevents price falling below set level → surplus',
            'Regulation: rules that ban or limit harmful activities (e.g. emissions standards, minimum wage)',
          ]},
        ]},
        { title:'Business & Firms', icon:'🏢', topics:[
          { title:'Business Objectives & Types', points:[
            'Sole trader: single owner, unlimited liability, keeps all profit, easy to set up',
            'Partnership: 2–20 partners, share profits/losses/liability (unless LLP)',
            'Private limited company (Ltd): shareholders, limited liability, cannot sell shares publicly',
            'Public limited company (PLC): listed on stock exchange, large capital, but complex to manage',
            'Business objectives: profit maximisation, growth, market share, survival, social/ethical goals',
          ]},
          { title:'Costs, Revenue & Profit', points:[
            'Fixed costs: do not change with output (e.g. rent, insurance)',
            'Variable costs: change directly with output (e.g. raw materials, wages of casual staff)',
            'Total cost = fixed cost + variable cost; average cost = total cost ÷ output',
            'Total revenue = price × quantity; profit = total revenue − total cost',
            'Break-even: total revenue = total cost; margin of safety = current output − break-even output',
          ], examTips:[
            'Calculate contribution first: selling price − variable cost per unit',
            'Break-even output = fixed costs ÷ contribution per unit',
          ], workedExample:`Fixed costs = $5000; Variable cost per unit = $3; Selling price = $8
Contribution per unit = 8 − 3 = $5
Break-even = 5000 ÷ 5 = 1000 units`},
        ]},
      ],
      edexcel: [
        { title:'The Market System', icon:'📈', topics:[
          { title:'Demand & Supply', points:[
            'Demand: quantity consumers willing and able to buy at each price — inverse relationship with price',
            'Factors shifting demand: income, tastes, prices of related goods, population, advertising',
            'Supply: quantity firms willing and able to sell at each price — direct relationship with price',
            'Factors shifting supply: input costs, technology, taxes/subsidies, weather, number of producers',
            'Equilibrium: where demand = supply; excess demand → price rises; excess supply → price falls',
          ]},
          { title:'Elasticity', points:[
            'PED = % ΔQd ÷ % ΔP; always negative (inverse relationship); ignore sign unless asked',
            'PED > 1: elastic demand (many substitutes, luxury goods); price rise → revenue falls',
            'PED < 1: inelastic demand (few substitutes, necessities); price rise → revenue rises',
            'PES = % ΔQs ÷ % ΔP; always positive; elastic supply means firms can respond quickly',
            'Determinants of PES: spare capacity, stock levels, length of production period, factor mobility',
          ], examTips:[
            'Always state formula before calculating elasticity',
            'Link elasticity to business pricing strategy — inelastic demand means price increases are profitable',
          ], workedExample:`PED calculation: Price rises from $5 to $6 (+20%). Quantity falls from 100 to 80 (−20%)
PED = −20 ÷ 20 = −1 (unit elastic)
Revenue unchanged: was $500, now 80×$6 = $480 → actually fell slightly — check the math!`},
        ]},
        { title:'Government & Economy', icon:'🏛️', topics:[
          { title:'Government Objectives & Policy', points:[
            'Macroeconomic objectives: economic growth (↑ GDP), low inflation (CPI target ~2%), low unemployment, current account balance',
            'Fiscal policy: government taxation and spending; budget surplus = more tax than spend; deficit = opposite',
            'Expansionary fiscal policy: cut taxes and/or increase spending → stimulate demand (used in recession)',
            'Contractionary: raise taxes, cut spending → reduce inflation (risk: slow growth)',
            'Monetary policy: Bank of England sets interest rates; lower rates → cheaper borrowing → more spending',
          ]},
          { title:'Market Failure & Intervention', points:[
            'Market failure: free market fails to allocate resources efficiently',
            'Negative externality: third-party bears cost (e.g. pollution from factory); overproduction results',
            'Positive externality: third-party benefits (e.g. vaccination herd immunity); underproduction results',
            'Government responses: taxes (internalise negative externality), subsidies (encourage positive), regulation, provision',
            'Government failure: intervention can worsen situation (e.g. unintended consequences, imperfect information)',
          ], examTips:[
            'Evaluation point: always consider government failure as a counter to any intervention policy',
            'Draw a diagram for externalities — show the divergence between private and social cost/benefit',
          ]},
        ]},
        { title:'International Trade & Development', icon:'🌍', topics:[
          { title:'Trade & Protectionism', points:[
            'Absolute advantage: produce more of a good using same resources',
            'Comparative advantage: lower opportunity cost — basis of specialisation and trade',
            'Free trade: no barriers; advantages: lower prices, greater choice, economies of scale',
            'Tariff: tax on imports → raises price → protects domestic producers but harms consumers',
            'Quota: limit on import quantity; subsidy to domestic producers reduces their costs vs foreign',
          ]},
          { title:'Economic Development', points:[
            'HDI (Human Development Index): combines GDP per capita, life expectancy, education years',
            'Characteristics of developing economies: low income, high agriculture share, poor infrastructure, high inequality',
            'Aid: tied (must buy donor country goods), bilateral (country-to-country), multilateral (IMF/World Bank)',
            'FDI (Foreign Direct Investment): business investment in another country; creates jobs but may repatriate profits',
            'Trade vs aid debate: trade enables self-sufficiency; aid can create dependency',
          ], examTips:[
            'Distinguish GDP per capita (average income) from HDI (multidimensional measure of development)',
            'Evaluate: for every benefit of free trade, consider who loses (e.g. domestic industries)',
          ]},
        ]},
        { title:'Personal Finance & Business', icon:'💰', topics:[
          { title:'Personal Finance (Edexcel-specific)', points:[
            'Edexcel includes personal finance: budgeting, saving, borrowing, insurance',
            'Budget: plan of income and expenditure; surplus = more income than spending',
            'Types of financial products: current accounts, savings accounts, ISAs, pension funds',
            'Interest rates on borrowing: APR (Annual Percentage Rate) — true cost of borrowing',
            'Insurance: pay premium to receive compensation if risk occurs; risk pooling',
          ]},
          { title:'Business Finance & Enterprise', points:[
            'Internal finance: retained profit, selling assets — no interest but limits investment',
            'External finance: bank loan (fixed repayment), overdraft (flexible), share issue, bonds',
            'Entrepreneur: organises resources and takes risk; key skills: innovation, decision-making, leadership',
            'Revenue = price × quantity; profit = revenue − total costs; loss = costs > revenue',
            'Cash flow ≠ profit: a business can be profitable but run out of cash (timing differences)',
          ], examTips:[
            'Cash flow vs profit — this distinction frequently appears in Edexcel exam questions',
            'For evaluate questions, weigh short-run vs long-run effects of financial decisions',
          ]},
        ]},
      ],
    }
  },
  english: {
    label:'English Language', arabic:'اللغة الإنجليزية', icon:'🗣️', color:'#EC4899',
    boards: ['cie','edexcel','oxford'],
    pastPapers: {
      cie:     'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-english-first-language-0500/past-papers/',
      edexcel: 'https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-english-language-a-2016.coursematerials.html',
      oxford:  'https://www.oxfordaqaexams.org.uk/igcse/english-language/',
    },
    chapters: {
      cie: [
        { title:'Reading Skills', icon:'📖', topics:[
          { title:'Comprehension & Inference', points:[
            'Reading for gist: get overall meaning first before detailed reading',
            'Literal comprehension: find and quote directly from the text — use exact words',
            'Inference: read between the lines — what is implied but not directly stated',
            'Always use PEE: Point → Evidence (quote) → Explanation of how it answers question',
            'Watch for "in your own words" — paraphrase carefully, do not copy text',
          ]},
          { title:'Writer\'s Techniques & Language Analysis', points:[
            'Identify language techniques: simile, metaphor, personification, alliteration, onomatopoeia',
            'Simile: comparison using "like" or "as"; metaphor: direct comparison (says one thing IS another)',
            'Personification: giving human qualities to non-human things',
            'Imagery: vivid description appealing to senses (sight, sound, smell, touch, taste)',
            'Always analyse EFFECT — don\'t just name the technique: "This creates a sense of..."',
          ]},
          { title:'Summary Writing', points:[
            'Identify ONLY points relevant to the question focus — do not copy irrelevant detail',
            'Use your own words as much as possible — paraphrase, not lift',
            'Connect points with connectives: furthermore, additionally, however, in contrast',
            'Check word limit — stay within the given range (usually 80–100 words)',
            'Start summary without restating the question — go straight into content',
          ]},
        ]},
        { title:'Writing Skills', icon:'✍️', topics:[
          { title:'Directed Writing', points:[
            'Match the FORMAT exactly: letter (address, date, Dear..., yours sincerely/faithfully), report (headings), speech',
            'Match the AUDIENCE: formal (no contractions, polite tone) vs informal (personal, conversational)',
            'Match the PURPOSE: argue, persuade, inform, advise, describe — different linguistic techniques',
            'Use evidence from the Reading passage to support points in directed writing tasks',
            'Include clear structure: introduction, developed paragraphs, conclusion',
          ]},
          { title:'Narrative & Descriptive Writing', points:[
            'Narrative: include character, setting, plot arc (build tension → climax → resolution)',
            'Descriptive: focus on creating atmosphere — use ALL five senses',
            'Vary sentence structures: short for impact, long for detail and rhythm',
            'Use a range of vocabulary — avoid repetition; show don\'t tell',
            'Start with an engaging hook: in media res (action), dialogue, striking description or question',
          ]},
          { title:'Argumentative & Persuasive Writing', points:[
            'Argument: present both sides logically and reach reasoned conclusion (essay, article)',
            'Persuasion: one-sided — use rhetorical techniques to convince reader',
            'Rhetorical techniques: rhetorical questions, repetition (tripling), direct address ("you"), statistics',
            'Counterargument: acknowledge opposing view then refute it — shows sophistication',
            'Signpost your argument: "Firstly... Furthermore... However... In conclusion..."',
          ], examTips:[
            'DAFOREST for persuasion: Direct address, Alliteration, Facts, Opinion, Rhetorical question, Emotive language, Statistics, Tripling',
            'For articles: use a catchy headline, subheadings, and a clear argument throughout',
            'Avoid over-using exclamation marks — one or two for impact; many weakens the writing',
          ], workedExample:`Persuasive opening for "Social media does more harm than good":
Hook: "Every minute, 500,000 tweets flood our screens. Every minute, another young person spirals deeper into anxiety."
Rhetorical Q: "Is this the connected world we truly wanted?"
Direct address + statistic: "You may not know it, but research shows 41% of teens report feeling worse after using Instagram."`},
        ]},
        { title:'Language & Grammar', icon:'📝', topics:[
          { title:'Grammar & Punctuation', points:[
            'Sentence types: simple (one clause), compound (two main clauses joined by and/but/or), complex (main + subordinate clause)',
            'Punctuation: comma (list/clause), semicolon (join related clauses), colon (introduce list/explanation), dash (parenthesis/emphasis)',
            'Active vs passive voice: active (The dog bit the man) — direct, strong; passive (The man was bitten) — distances subject',
            'Tense consistency: stick to past OR present tense in creative writing unless deliberately shifting',
            'Apostrophes: possession (cat\'s, dogs\', James\'s) vs contraction (it\'s = it is; its = belonging to it)',
          ], examTips:[
            'Vary sentence length: mix short punchy sentences with longer flowing ones for rhythm and effect',
            'Semicolons impress examiners — use to join two closely related independent clauses',
          ]},
          { title:'Vocabulary & Style', points:[
            'Word classes: noun, verb, adjective, adverb, pronoun, preposition, conjunction, determiner',
            'Precise vocabulary: "sprinted" instead of "ran fast"; "ancient" instead of "very old"',
            'Register: formal (sophisticated vocabulary, complex syntax) vs informal (colloquial, contractions, simpler)',
            'Tone: objective (factual, impersonal), emotive (feelings-based), ironic (saying opposite of meaning)',
            'Figurative language: simile, metaphor, personification, hyperbole, oxymoron, pathetic fallacy',
          ]},
          { title:'Spelling & Common Errors', points:[
            'Commonly confused: their/there/they\'re; your/you\'re; its/it\'s; effect/affect; practice/practise',
            'Double letters: necessary (1 c, 2 s), occurrence (2 c, 2 r), recommend (1 c, 2 m)',
            'Affect = verb (to affect); Effect = noun (the effect) — exception: "to effect change" (verb)',
            'Common mistakes: could of (should be "could have"); loose/lose; passed/past',
            'Homophones: where/wear/ware; hear/here; weather/whether; principal/principle',
          ]},
        ]},
        { title:'Reading Non-Fiction', icon:'📰', topics:[
          { title:'Analysing Non-Fiction Texts', points:[
            'Purpose: inform, explain, describe, argue, persuade, advise, review — identify from context and language',
            'Audience: age, background, interest level — affects vocabulary, tone, formality',
            'Structure: how is the text organised? Headline, introduction, paragraphs, subheadings, conclusion',
            'Bias: one-sided viewpoint; look for emotive language, selective use of facts, loaded words',
            'Fact vs opinion: facts can be verified; opinions are beliefs/views — both may be used to persuade',
          ], examTips:[
            'Always refer to the text — use short direct quotes embedded into your analysis',
            '"Evaluate how effectively..." questions: judge success against stated purpose/audience',
            'Identify implicit (hidden/suggested) as well as explicit (directly stated) meanings',
          ]},
          { title:'Comparing Texts', points:[
            'Compare: purpose, audience, tone, language choices, structure, viewpoint',
            'Use comparative language: "Both texts... However, while Text A uses... Text B instead..."',
            'Synthesis: find a common theme or argument that links both texts',
            'Quote from BOTH texts — don\'t focus on just one',
            'End with a clear evaluative judgement: which is more effective and why?',
          ]},
        ]},
        { title:'Exam Technique', icon:'🎯', topics:[
          { title:'Reading Paper Strategy', points:[
            'Time management: check marks available — allocate roughly 1–1.5 minutes per mark',
            'Read questions before texts — know what to look for before reading',
            'Highlight/annotate as you read: underline key words, circle techniques, mark relevant sections',
            'For "how does the writer..." questions: technique → quote → effect (never just name the technique)',
            'Inference questions: find evidence in text, then explain what it implies about character/place/feeling',
          ], examTips:[
            'Never repeat the question back as your opening sentence — start with your first point directly',
            'For longer responses, plan first: jot 4–5 points before writing',
          ]},
          { title:'Writing Paper Strategy', points:[
            'Planning: spend 5 minutes planning structure — saves time and improves quality dramatically',
            'Opening paragraph: hook the reader immediately (question, bold statement, vivid image, statistic)',
            'Each paragraph: develop ONE idea fully — PEEL or SEXY (Statement, Example, eXplain, sYntax comment)',
            'Closing paragraph: echo the opening, reach a conclusion, leave an impression',
            'Proofreading: leave 3–5 minutes to check spelling, punctuation, verb tenses, clarity',
          ], workedExample:`Descriptive writing — "The Abandoned House":
Opening (hook): "The gate groaned as I pushed it open — a sound like a wounded animal."
Senses: "The smell hit me first: damp timber, rotting leaves, and something else. Something older."
Short sentence for impact: "I stepped inside. Silence."
Figurative language: "Dust danced in the pale light filtering through cracked panes, each mote a ghost refusing to leave."`},
        ]},
      ],
      edexcel: [
        { title:'Paper 1: Non-Fiction Reading', icon:'📰', topics:[
          { title:'Reading Non-Fiction Texts', points:[
            'Edexcel Paper 1: two non-fiction texts; Section A = reading (45 mins); Section B = writing (45 mins)',
            'Q1: retrieve and summarise — find specific information from Text 1',
            'Q2: language analysis — how does the writer use language to achieve effects?',
            'Q3: compare texts — how do both writers present their views/perspectives on a topic?',
            'Always read questions BEFORE the texts to know what to focus on',
          ], examTips:[
            'Q1 (4 marks): bullet-point style answers fine; use text\'s own words where appropriate',
            'Q2 (12 marks): analyse techniques + effect; avoid just listing techniques without explaining effect',
            'Q3 comparison (12 marks): use connectives — "Similarly...", "In contrast...", "Both writers..."',
          ]},
          { title:'Analysing Language & Structure', points:[
            'Identify the technique → quote from text → explain its effect on the reader',
            'Vocabulary choices: connotations of specific words; formal vs informal register',
            'Rhetorical devices: direct address ("you"), rhetorical questions, rule of three (tripling)',
            'Structural features: opening and closing, paragraphing, sentence length variation',
            'Tone: authoritative, passionate, humorous, critical, nostalgic — identify and explain impact',
          ]},
          { title:'Comparing Perspectives', points:[
            'Identify: what is each writer\'s perspective/attitude on the topic?',
            'Compare: where do they agree or differ? — use evidence from both texts',
            'Structure: ABAB comparison (alternate between texts) not AABB (one then other)',
            'Both texts: always make sure you refer to BOTH equally — marks split equally between texts',
            'Synthesis: go beyond listing differences to explain WHY perspectives differ (context, purpose, audience)',
          ], examTips:[
            'Comparison question: start with a clear statement of similarity/difference, then support with quotes from both',
            'Do not summarise — analyse the language choices that reveal each writer\'s perspective',
          ], workedExample:`Compare question: How do both writers feel about social media?
Writer A (article, 2020): Uses emotive language — "toxic wasteland of comparison" — suggests social media causes psychological harm. The metaphor of a "wasteland" implies barrenness and destruction.
By contrast, Writer B (blog, 2022): Uses enthusiastic tone — "revolutionary tool for connection" — the adjective "revolutionary" presents social media as transformative and positive.
Both writers acknowledge social media's power, but Writer A focuses on its harmful potential while Writer B emphasises its positive communal aspects.`},
        ]},
        { title:'Paper 1: Writing (Transactional)', icon:'✍️', topics:[
          { title:'Transactional Writing Forms', points:[
            'Edexcel Paper 1 Section B: one writing task (45 mins); choose from 2 options',
            'Forms tested: article, letter, report, speech, review, leaflet',
            'Letter: address, date, Dear Sir/Madam or Dear [Name], sign off (Yours faithfully/sincerely)',
            'Article: headline, subheadings optional, formal or semi-formal depending on audience',
            'Report: sections with headings, formal register, recommendations at end',
            'Speech: direct address, rhetorical devices, spoken-word feel ("Thank you for being here today")',
          ], examTips:[
            'Always match register to audience: broadsheet = formal; teen magazine = conversational',
            'First 5 minutes: plan purpose, audience, form, key points — structure saves time and improves quality',
          ]},
          { title:'Persuasive Writing Techniques', points:[
            'DAFOREST: Direct address, Alliteration, Facts/statistics, Opinion, Rhetorical question, Emotive language, Statistics, Tripling',
            'Counter-argument: acknowledge opposing view then refute it — shows sophistication',
            'Vary sentence structures: short sentences for impact; complex for elaboration; rhetorical questions to engage',
            'Signposting: "Firstly... Furthermore... However... In conclusion..." — guides reader through argument',
            'Tone: assertive and confident; avoid being aggressive; use modal verbs (must, should, will)',
          ], workedExample:`Speech opening: "Imagine a world where every child, regardless of postcode, has access to the same quality of education. That world is not a fantasy — it is a choice. And today, I'm asking you to make it."
Techniques used: direct address (you/imagine), tripling (regardless of postcode = regardless of wealth/privilege), short declarative sentence for impact, modal verb "is" as assertion`},
          { title:'Narrative & Descriptive Writing', points:[
            'Edexcel also tests: creative/narrative writing — story or description',
            'Story: strong opening hook, character, conflict, resolution; control of pacing',
            'Description: atmosphere over plot; all five senses; varied sentence structures',
            '"Show don\'t tell": "His hands shook" not "He was nervous"',
            'Zoom technique: start wide (setting) → zoom in (detail) → zoom out (reflection/implication)',
          ]},
        ]},
        { title:'Paper 2: Literature & Creative Reading', icon:'📚', topics:[
          { title:'Responding to Literature', points:[
            'Edexcel Paper 2: unseen poetry + anthology poem comparison; prose extract analysis',
            'Unseen poem: read twice; identify theme, tone, key techniques before writing',
            'Anthology: compare with named poem from studied list',
            'Always quote: embed short quotes within your sentences rather than block-quoting',
            'Analyse effect: "The metaphor of X suggests... creating a sense of..."',
          ]},
          { title:'Exam Technique for Edexcel English', points:[
            'Time management: Paper 1 = 1hr 30 mins total; give equal time to reading and writing sections',
            'Command words: identify (name it), explain (give reasons), analyse (technique + effect + why)',
            'High marks: sustained analysis with well-chosen quotes; go beyond surface meaning',
            'Spelling, punctuation, grammar (SPaG): 4 marks available in writing tasks for accuracy',
            'Proofreading: leave 3–5 minutes at end to check SPaG in writing tasks',
          ], examTips:[
            'Edexcel IGCSE English Language: examiners reward students who SHOW understanding through selection of precise quotes',
            'Grade 9 tip: go beyond technique-spotting to discuss how meaning is constructed and how it positions the reader',
          ]},
        ]},
        { title:'Oxford AQA: English Language', icon:'🏛️', topics:[
          { title:'Oxford AQA Structure', points:[
            'Paper 1: Reading and Writing (creative/imaginative); Paper 2: Reading and Writing (non-fiction)',
            'Section A (Reading): comprehension, language analysis, evaluation of writer\'s technique',
            'Section B (Writing): one extended writing task; creative or non-fiction depending on paper',
            'Oxford AQA values: sustained control of tone, varied vocabulary, accurate SPaG',
            'Assessment objectives: AO1 (identify/interpret), AO2 (explain/analyse), AO3 (compare), AO4 (evaluate)',
          ]},
          { title:'Key Writing Skills (Oxford AQA)', points:[
            'Structural variety: vary between simple, compound, complex, and minor sentences for effect',
            'Vocabulary: choose precise, sophisticated words; avoid vague words (nice, good, big, got)',
            'Paragraphing: clear topic sentences; developed points with evidence; link back to question',
            'Cohesion: use cohesive devices — pronouns, connectives, lexical chains, repetition',
            'Register: match tone exactly to task — formal for letter to authority; informal for blog post',
          ], examTips:[
            'Oxford AQA writing: do not over-plan — spend 5 mins planning, 35–38 mins writing, 2–5 mins proofreading',
            'Evaluation questions: give a personal judgement with evidence — "I think this is effective because..." shows AO4 skill',
          ]},
        ]},
      ],
    }
  },
  history: {
    label:'History', arabic:'التاريخ', icon:'🏛️', color:'#78716C',
    boards: ['cie','edexcel'],
    pastPapers: {
      cie:     'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-history-0470/past-papers/',
      edexcel: 'https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-history-2017.coursematerials.html',
    },
    chapters: {
      cie: [
        { title:'Inter-War Years 1919–1939', icon:'🕊️', topics:[
          { title:'The Treaty of Versailles', points:[
            'Signed June 1919 — Germany forced to accept "war guilt" (Article 231)',
            'Terms: lose Alsace-Lorraine, Polish Corridor; army limited to 100,000; £6.6 billion reparations',
            'Germany humiliated: "Diktat" — not allowed to negotiate; caused resentment',
            'Big Three disagreed: Clemenceau (harsh), Wilson (14 Points, lenient), Lloyd George (middle)',
            'Impact: created economic hardship and political instability in Germany → helped Hitler rise',
          ], examTips:[
            'Structure answers using PEEL — give a specific fact/date as evidence, then explain its impact',
            'Know the three key figures and their differing aims — this appears in many source questions',
            '"How far do you agree..." questions: argue both sides before reaching a supported judgement',
          ], commonMistakes:[
            'Describing events without analysing cause and effect — always explain "why this mattered"',
            'Confusing the aims of the Big Three — remember Clemenceau was harshest (France suffered most)',
          ]},
          { title:'Rise of Hitler & the Nazi Party', points:[
            'Hitler joined DAP (later NSDAP) in 1919; became leader 1921; 25-Point programme',
            'Beer Hall Putsch 1923: failed coup → imprisoned → wrote Mein Kampf (political goals)',
            'Great Depression (1929): unemployment soared → Nazi support grew dramatically',
            'Reichstag Fire 1933 → Enabling Act → Hitler became dictator (Führer by 1934)',
            'Key appeal: scapegoating Jews/communists, promise of jobs, strong nationalist message',
          ]},
          { title:'Causes of World War II', points:[
            'Appeasement: Britain and France gave in to Hitler\'s demands hoping to avoid war',
            'Munich Agreement 1938: Sudetenland given to Germany — "peace for our time" (Chamberlain)',
            'Failure of collective security: League of Nations too weak (no USA, no army)',
            'Nazi-Soviet Pact 1939: Hitler and Stalin agreed non-aggression → Hitler free to invade Poland',
            'German invasion of Poland 1 Sept 1939 → Britain and France declared war 3 Sept 1939',
          ]},
        ]},
        { title:'World War II 1939–1945', icon:'⚔️', topics:[
          { title:'Key Events of WWII', points:[
            'Blitzkrieg ("lightning war"): fast tank and air attacks overwhelmed defences — fall of France 1940',
            'Battle of Britain 1940: RAF defeated Luftwaffe → Hitler cancelled Operation Sea Lion',
            'Operation Barbarossa 1941: German invasion of USSR — turning point; enormous casualties',
            'Pearl Harbor Dec 1941: Japan attacked USA → America entered the war',
            'D-Day June 1944: Allied landings in Normandy → liberation of Western Europe',
          ]},
          { title:'The Holocaust', points:[
            'Systematic murder of 6 million Jews and millions of others (Roma, disabled, political opponents)',
            'Nuremberg Laws 1935: stripped Jews of citizenship; increasing persecution throughout 1930s',
            'Kristallnacht 1938: "Night of Broken Glass" — organised attacks on Jewish businesses/synagogues',
            'Wannsee Conference 1942: "Final Solution" — planned systematic extermination in death camps',
            'Auschwitz-Birkenau: largest death camp; over 1.1 million killed, mostly Jews',
          ]},
        ]},
        { title:'Cold War 1945–1991', icon:'🌐', topics:[
          { title:'Origins of the Cold War', points:[
            'Ideological conflict: USA (capitalism, democracy) vs USSR (communism, one-party state)',
            'Yalta (Feb 1945) and Potsdam (Jul 1945) conferences — growing disagreements',
            'Iron Curtain: Churchill\'s term for division of Europe into Western and Eastern blocs',
            'Truman Doctrine 1947: USA would support free peoples resisting communist takeover',
            'Marshall Plan 1947: $13 billion US aid to rebuild Western Europe — counter communism',
          ]},
          { title:'Key Cold War Crises', points:[
            'Berlin Blockade 1948–49: USSR blocked access → West responded with 11-month airlift',
            'Korean War 1950–53: UN (mainly US) fought North Korea (backed by China/USSR) — ended in stalemate',
            'Cuban Missile Crisis 1962: USSR placed missiles in Cuba → 13 days closest to nuclear war',
            'Resolution: Khrushchev removed missiles; USA promised not to invade Cuba; hotline established',
            'Vietnam War: US involvement 1964–73; failed to prevent communist takeover; Saigon fell 1975',
          ], examTips:[
            'Cuban Missile Crisis: know all 13 days in sequence — reconnaissance photos → EXCOMM → blockade → resolution',
            'Compare crises: which was most dangerous? Use evidence (e.g. nuclear threat, military escalation)',
            'For "why did...end?" questions: identify multiple factors and weigh which was most significant',
          ]},
          { title:'End of the Cold War', points:[
            'Gorbachev (USSR leader from 1985): glasnost (openness) and perestroika (restructuring)',
            'INF Treaty 1987: USA and USSR agreed to reduce nuclear weapons',
            'Fall of Berlin Wall November 1989 — symbol of Cold War division removed',
            'Eastern European countries broke free from Soviet control 1989–1991',
            'USSR dissolved December 1991 → Cold War ended; Russia became independent state',
          ]},
        ]},
        { title:'Source Skills', icon:'📜', topics:[
          { title:'Evaluating Historical Sources', points:[
            'Nature: what type of source is it? (photograph, speech, cartoon, diary, official document)',
            'Origin: who produced it, when, and in what context?',
            'Purpose: why was it created? To inform, persuade, propaganda, personal record?',
            'Content: what does it actually say or show? Quote directly',
            'Reliability: is it trustworthy? Consider bias, one-sided views, vested interests',
          ]},
          { title:'Writing Historical Arguments', points:[
            'Causation: identify short-term, long-term and trigger causes; link them',
            'Significance: explain why an event matters — what changed because of it?',
            'Use PEEL: Point → Evidence (specific fact/date) → Explanation → Link back to question',
            'Avoid narrative — analyse, don\'t just describe events',
            'Consider different perspectives and reach a supported judgement',
          ], examTips:[
            'Source questions: always quote from the source AND use your own knowledge to evaluate it',
            'OPCVL for sources: Origin, Purpose, Content, Value, Limitation',
            'Essay structure: intro (define terms + thesis) → 3 paragraphs → conclusion (direct answer)',
          ], workedExample:`Source question: "How useful is this source to a historian studying the causes of WWII?"
Step 1 — Content: State what the source says/shows
Step 2 — Origin: Author, date, type of source
Step 3 — Purpose: Why was it created? Propaganda? Personal? Official?
Step 4 — Value: What can we learn? Cross-reference with own knowledge
Step 5 — Limitation: What does it not tell us? Is it biased?`},
        ]},
      ],
      edexcel: [
        { title:'Medicine Through Time (c1250–present)', icon:'💊', topics:[
          { title:'Medieval Medicine (c1250–1500)', points:[
            'Four Humours theory (Hippocrates/Galen): blood, phlegm, yellow bile, black bile must be balanced',
            'Treatments: bloodletting, purging, herbal remedies, prayer — all based on humours or religion',
            'Church dominated medicine: approved Galen\'s ideas; anatomy forbidden (dissection of humans)',
            'Roger Bacon: observation-based approach — ahead of his time but suppressed',
            'Black Death 1348: miasma theory blamed (bad air); also astrology, God\'s punishment',
          ], examTips:[
            'Edexcel asks "how much did medicine change?" — always compare periods explicitly',
            'Change vs continuity: Four Humours persisted from 400BC to 1800s — that\'s 2,000 years of continuity!',
          ]},
          { title:'Renaissance Medicine (c1500–c1700)', points:[
            'Vesalius (1543): "On the Fabric of the Human Body" — corrected 200+ of Galen\'s anatomy errors through dissection',
            'William Harvey (1628): proved blood circulates; heart is a pump — overturned Galen\'s theory',
            'Paracelus: challenged Galen; used chemicals in medicine; "like cures like" principle',
            'Printing press: allowed ideas to spread rapidly across Europe (communication factor)',
            'Limits: brilliant observations but treatments changed little — people still used bloodletting',
          ], examTips:[
            'Individual genius (Vesalius, Harvey) vs structural factors (printing press, war) — exam loves this debate',
            'Vesalius needed princes\' help to get bodies for dissection — importance of patronage/government',
          ]},
          { title:'Industrial & Modern Medicine (c1700–present)', points:[
            'Jenner 1796: smallpox vaccine using cowpox — first vaccine; opposed by doctors and Church',
            'Germ Theory — Pasteur 1861: microbes cause fermentation → disease; Swan-neck flask experiment',
            'Koch 1876: identified specific bacteria causing anthrax, tuberculosis — germ-disease link proven',
            'Lister 1867: carbolic acid as antiseptic — reduced post-operative deaths dramatically',
            'NHS 1948: free healthcare for all — government role in public health (Beveridge Report)',
          ], workedExample:`12-mark question: "The most important factor in the development of medicine was science and technology." How far do you agree?
Agree: Germ Theory (Pasteur/Koch) identified causes; X-rays (Röntgen 1895) enabled diagnosis; DNA discovery (Watson/Crick 1953) → genetic medicine
Disagree: Government/war equally important — WWII accelerated penicillin mass production; government funding for NHS and vaccination programmes
Conclusion: Science provides breakthroughs but government and communication factors are needed to apply them — both essential`},
        ]},
        { title:'The American West (c1835–c1895)', icon:'🤠', topics:[
          { title:'The Plains Indians', points:[
            'Tribes: Sioux, Cheyenne, Comanche, Arapaho — nomadic peoples of the Great Plains',
            'Way of life: followed buffalo herds; tipis (portable, practical); believed land could not be owned',
            'Buffalo: central to Plains Indian life — food, clothing, tools, fuel, religion; every part used',
            'Warfare: raids for horses/honour, not conquest; counted coup (touching enemy bravely = honour)',
            'Indian Territory: US government tried to confine tribes to reservations from 1830s onwards',
          ]},
          { title:'Manifest Destiny & Migration', points:[
            'Manifest Destiny: belief that USA was destined to expand from Atlantic to Pacific',
            'Oregon Trail (1840s): 2,000 miles; pioneers faced disease, terrain, weather — thousands died',
            'Mormons (1847): travelled to Salt Lake City to escape persecution; built thriving desert community',
            'Gold Rush 1848–9: California; 300,000 "49ers"; lawlessness, violence, impact on Native Americans',
            'Homestead Act 1862: 160 acres free if you farmed it for 5 years — opened Plains to settlers',
          ], examTips:[
            'Explain WHY each factor caused conflict — not just what happened but why it led to clashes',
            'Cattle industry changed: open range → barbed wire (1874) → end of Long Drive — show this progression',
          ]},
          { title:'Conflict on the Plains', points:[
            'Fort Laramie Treaties (1851, 1868): promised land to Sioux — broken by gold rush in Black Hills',
            'Battle of Little Bighorn 1876: Custer\'s 7th Cavalry wiped out by Sioux/Cheyenne under Crazy Horse',
            'Ghost Dance movement 1889: spiritual revival — US government feared uprising → Wounded Knee 1890',
            'Wounded Knee 1890: US cavalry killed ~250 Sioux including women and children — end of armed resistance',
            'Destruction of buffalo: 30 million → ~1,000 by 1890; deliberate US policy to destroy Indian way of life',
          ]},
        ]},
        { title:'Weimar Germany & Nazi Germany (1918–1939)', icon:'🇩🇪', topics:[
          { title:'Weimar Republic 1918–1933', points:[
            'November 1918: Germany defeated; Kaiser abdicated; republic declared — "stabbed in the back" myth',
            'Weimar Constitution: proportional representation led to coalition governments → instability',
            'Challenges: Spartacist uprising 1919 (left), Kapp Putsch 1920 (right), Beer Hall Putsch 1923 (Nazis)',
            'Hyperinflation 1923: French occupation of Ruhr → Germany printed money → marks worthless',
            'Golden Twenties (1924–29): Dawes Plan, Stresemann\'s recovery — but built on US loans',
          ], examTips:[
            'Weimar: always link problems back to the constitution — PR system made stable government almost impossible',
            'Great Depression (1929): US called in loans → German economy collapsed → mass unemployment → Nazi support soared',
          ]},
          { title:'Nazi Germany 1933–1939', points:[
            'Nazi rise: 1928 = 2.6% vote; 1932 = 37.4%; Jan 1933 Hitler appointed Chancellor',
            'Consolidation: Reichstag Fire → Enabling Act → trade unions banned → Night of Long Knives 1934',
            'Terror: SS (Himmler), Gestapo (secret police), concentration camps for political opponents',
            'Propaganda: Goebbels as Minister of Propaganda; radio, film, rallies (Nuremberg), art',
            'Economy: rearmament, autobahns, unemployment fell from 6m (1933) to 300,000 (1938) — but war economy',
          ], workedExample:`Was terror or propaganda more important for Nazi control?
Terror argument: SS and Gestapo created climate of fear; Dachau opened 1933; Night of Long Knives removed SA threat; people self-censored knowing consequences
Propaganda argument: Volksempfänger (people's receiver) radios in 70% of homes; youth indoctrinated through Hitler Youth; Olympic Games 1936 showed Germany's "glory"
Conclusion: Both worked together — terror prevented open opposition; propaganda built genuine support especially among youth and those who benefited from economic recovery`},
        ]},
        { title:'Cold War 1945–1991 (Edexcel Focus)', icon:'🌐', topics:[
          { title:'Origins & Early Cold War', points:[
            'Iron Curtain speech 1946 (Churchill): division of Europe; Soviet-dominated east vs free west',
            'Truman Doctrine 1947: "containment" — USA would resist communist expansion anywhere',
            'Marshall Plan 1947: $13bn US aid; USSR refused for Eastern Europe → divided Europe economically',
            'Berlin 1948–49: USSR blockade; West\'s 11-month airlift of 2.3 million tonnes — propaganda victory',
            'NATO 1949: Western military alliance; Warsaw Pact 1955: Soviet response',
          ]},
          { title:'Escalation & Crises', points:[
            'Korean War 1950–53: UN (mainly USA) vs North Korea + China — ended in armistice at 38th parallel',
            'Hungarian Uprising 1956: Hungarians revolted → Soviet tanks crushed it; 200,000 fled; West did nothing',
            'Berlin Wall built August 1961: prevent East Germans fleeing to West (3 million had left since 1949)',
            'Cuban Missile Crisis 1962: 13 days — closest to nuclear war; Soviet missiles discovered in Cuba',
            'Resolution: Khrushchev removed missiles; Kennedy pledged no Cuba invasion; hotline established',
          ], examTips:[
            'Edexcel Cold War: evaluate "who was most to blame" — evidence-based argument, not one-sided',
            'Détente 1970s: relaxation of tensions — SALT I (1972), Helsinki Accords (1975); then new Cold War 1979',
          ]},
          { title:'End of the Cold War', points:[
            'Reagan\'s "evil empire" speech 1983; SDI (Star Wars) programme — USSR couldn\'t compete economically',
            'Gorbachev (from 1985): glasnost + perestroika → unintended consequence: Eastern Europe revolted',
            'Fall of Berlin Wall 9 November 1989 — crowds pulled it down; East Germany opened borders',
            'Revolutions of 1989: Poland, Hungary, Czechoslovakia, Romania — communist governments fell',
            'USSR dissolved 25 December 1991 — Gorbachev resigned; 15 independent republics',
          ], workedExample:`"Gorbachev was the main reason the Cold War ended." How far do you agree?
Agree: Glasnost/perestroika allowed dissent; refused to send tanks to Eastern Europe (unlike 1956/68); signed INF Treaty 1987; accepted German reunification
Disagree: Reagan's defence spending (SDI) bankrupted USSR; Eastern European peoples demanded freedom; economic failure of Soviet system was structural not Gorbachev's fault
Conclusion: Gorbachev was a necessary condition — without his restraint the Cold War could not have ended peacefully — but the underlying cause was the failure of the Soviet economic and political model`},
        ]},
      ],
    }
  },
  geography: {
    label:'Geography', arabic:'الجغرافيا', icon:'🌍', color:'#16A34A',
    boards: ['cie','edexcel','oxford'],
    pastPapers: {
      cie:     'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-geography-0460/past-papers/',
      edexcel: 'https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-geography-2017.coursematerials.html',
      oxford:  'https://www.oxfordaqaexams.org.uk/igcse/geography/',
    },
    chapters: {
      cie: [
        { title:'Population & Settlement', icon:'👥', topics:[
          { title:'Population Growth & Distribution', points:[
            'World population: ~8 billion; unevenly distributed due to climate, resources, history',
            'Birth rate: live births per 1000 per year; death rate: deaths per 1000 per year',
            'Natural increase = birth rate − death rate (per 1000)',
            'Demographic Transition Model (DTM): 5 stages from high BR/DR → low BR/DR → declining population',
            'Population pyramids: wide base (high BR) = young population; narrow base = ageing population',
          ]},
          { title:'Migration', points:[
            'Push factors: poverty, conflict, natural disaster, lack of jobs — reasons to leave',
            'Pull factors: better jobs, education, safety, higher standard of living — reasons to go',
            'Rural-urban migration: movement from countryside to city (urbanisation)',
            'International migration: between countries; can be economic, refugee, or family reasons',
            'Effects: brain drain from source country; remittances sent home; pressure on services in host',
          ]},
          { title:'Settlement & Urbanisation', points:[
            'Site factors: why a settlement started (water supply, flat land, defence, resources)',
            'Situation: position relative to surrounding area (trade routes, other towns)',
            'Urban land use zones: CBD (centre), inner city, suburbs, rural-urban fringe',
            'Urbanisation: 55%+ of world population in cities; fastest in LICs (Low Income Countries)',
            'Problems in rapidly growing cities: squatter settlements, traffic, pollution, inadequate services',
          ]},
        ]},
        { title:'Natural Environment', icon:'🌋', topics:[
          { title:'Plate Tectonics', points:[
            'Earth\'s crust divided into tectonic plates moving on molten mantle (convection currents)',
            'Convergent (destructive): plates collide → subduction → volcanoes, earthquakes, fold mountains',
            'Divergent (constructive): plates move apart → new crust formed → rift valleys, mid-ocean ridges',
            'Conservative (transform): plates slide past each other → earthquakes (e.g. San Andreas Fault)',
            'Richter scale: measures earthquake magnitude (logarithmic — 7 is 10× stronger than 6)',
          ], examTips:[
            'Always state the plate boundary type before describing what happens — examiners reward precision',
            'Compare earthquake impacts in HICs vs LICs: same magnitude but very different death tolls — why?',
            'Volcano questions: distinguish between primary effects (lava, ash) and secondary (disease, economic loss)',
          ], commonMistakes:[
            'Saying plates "float" on lava — they move on semi-solid mantle (asthenosphere), not liquid lava',
            'Confusing magnitude (size of earthquake) with intensity (damage caused)',
          ]},
          { title:'Rivers & Coasts', points:[
            'River processes: erosion (hydraulic action, abrasion, attrition, solution), transport, deposition',
            'Upper course: steep, V-shaped valley, rapids, waterfalls',
            'Lower course: wide floodplain, meanders, oxbow lakes, levees, deltas',
            'Coastal erosion: wave-cut platform, caves, arches, stacks, stumps',
            'Coastal deposition: beaches, spits, bars, tombolos; longshore drift moves material',
          ]},
          { title:'Weather & Climate', points:[
            'Weather: short-term atmospheric conditions; climate: average weather over 30+ years',
            'Tropical rainforest climate: hot and wet all year (~27°C, 2000mm+ rainfall); equatorial belt',
            'Hot desert: very hot days, cold nights, <250mm rainfall; 15–30° north/south of equator',
            'Deforestation: reduces rainfall, increases flooding, destroys biodiversity, releases CO₂',
            'Climate change: rising CO₂ → enhanced greenhouse effect → global warming → sea level rise',
          ]},
        ]},
        { title:'Economic Development', icon:'📈', topics:[
          { title:'Development & Indicators', points:[
            'Development: improvement in standard of living and quality of life',
            'GDP per capita: average income per person — economic indicator',
            'HDI (Human Development Index): combines income, education (literacy) and life expectancy',
            'LICs (Low Income Countries) vs HICs (High Income Countries) — development gap',
            'Causes of inequality: history (colonialism), geography (landlocked), governance, natural resources',
          ]},
          { title:'Industry & Globalisation', points:[
            'Primary: extraction (farming, mining); Secondary: manufacturing; Tertiary: services; Quaternary: IT/research',
            'NICs (Newly Industrialised Countries): rapid manufacturing growth (e.g. China, India, Brazil)',
            'TNCs (Transnational Corporations): operate in many countries; exploit cheap labour in LICs',
            'Globalisation: world more interconnected through trade, technology, migration',
            'Tourism: major income source for LICs; but leakage (money leaves country), cultural damage',
          ]},
        ]},
        { title:'Geographic Skills', icon:'🗺️', topics:[
          { title:'Map Skills & Data Interpretation', points:[
            'Contour lines: connect points of equal height; close together = steep; far apart = gentle slope',
            'Grid references: 4-figure (square) and 6-figure (precise point) — always eastings then northings',
            'Compass directions: N, NE, E, SE, S, SW, W, NW — 8-point compass',
            'Scale: ratio (1:25000 means 1cm = 250m) and line scale',
            'Choropleth maps: shading shows data; disproportion maps (cartograms) show variable by area size',
          ]},
          { title:'Graph Types & Statistics', points:[
            'Bar charts: discrete categories; line graphs: change over time; pie charts: proportions of whole',
            'Scatter graphs: relationship between two variables; line of best fit shows correlation',
            'Triangular graphs: three-component data (e.g. soil texture: sand/silt/clay)',
            'Mean, median, mode, range — choosing appropriate measure for data type',
            'Describing graphs: use data, identify trend, note anomalies, suggest explanation',
          ], examTips:[
            '6-figure grid references: first 3 digits = easting (along bottom), last 3 = northing (up side)',
            'When describing a map pattern: name areas, give compass direction, use data if possible',
          ]},
        ]},
        { title:'Climate Change & Sustainability', icon:'🌡️', topics:[
          { title:'Causes & Evidence of Climate Change', points:[
            'Natural causes: Milankovitch cycles (Earth\'s orbit changes), volcanic eruptions, solar output variation',
            'Human causes: burning fossil fuels → CO₂; deforestation → less CO₂ absorbed; agriculture → methane',
            'Evidence: rising global temperatures, retreating glaciers, rising sea levels, more extreme weather events',
            'CO₂ levels: pre-industrial ~280ppm; now >420ppm (highest in 800,000 years from ice cores)',
            'IPCC: international body of scientists — reports on climate science, impacts and solutions',
          ], examTips:[
            'Distinguish natural vs human causes — examiners want both in "discuss causes" questions',
            'Always use data/statistics when available — "temperatures have risen by 1.1°C since 1880"',
          ]},
          { title:'Impacts & Responses to Climate Change', points:[
            'Sea level rise: thermal expansion of water + melting ice → flooding of low-lying areas (e.g. Maldives, Bangladesh)',
            'Ecosystem disruption: coral bleaching (>1°C above normal), species migration/extinction, changed seasons',
            'Agriculture: some regions benefit (longer growing season) but drought/flooding reduces yields overall',
            'Mitigation: reduce emissions — renewable energy, electric vehicles, carbon taxes, reforestation',
            'Adaptation: deal with effects — flood defences, drought-resistant crops, managed retreat from coasts',
          ]},
          { title:'Water Resources & Management', points:[
            'Water stress: regions where demand > available supply; worsened by population growth and climate change',
            'Uneven distribution: monsoon regions flood/drought; arid regions face chronic scarcity',
            'Dams: store water, generate HEP, aid irrigation — but displace communities, alter ecosystems',
            'Groundwater depletion: over-extraction of aquifers (e.g. Ogallala aquifer, USA) — non-renewable',
            'Solutions: water recycling/grey water, desalination, drip irrigation, demand management',
          ]},
        ]},
      ],
      edexcel: [
        { title:'River Environments', icon:'🌊', topics:[
          { title:'River Processes', points:[
            'Erosion types: hydraulic action (force of water), abrasion (sediment scraping), attrition (sediment hitting sediment), solution/corrosion (chemical dissolution)',
            'Transportation: traction (rolling), saltation (bouncing), suspension (carried), solution (dissolved)',
            'Deposition: when river loses energy — occurs on inside of bends, where river slows',
            'Long profile: steep upper course (V-shaped valley, waterfalls) → gentler lower course (meanders, floodplain)',
            'Discharge: volume of water flowing past a point per second (m³/s = cumecs); increased by heavy rainfall, snowmelt',
          ], examTips:[
            'Exam tip: always spell out the full name of erosion processes — "hydraulic action" not just "water pressure"',
            'River cross-section: draw and label channel width + depth + bedload to show how river changes downstream',
          ]},
          { title:'Landforms & Flooding', points:[
            'Waterfall: hard rock over soft rock → differential erosion → plunge pool → recession upstream',
            'Meander: fastest flow on outside (erosion → river cliff) → slip-off slope on inside (deposition)',
            'Ox-bow lake: meander neck eroded, river cuts through → loop abandoned',
            'Floodplain: flat land either side of river built up by repeated flooding and deposition of alluvium',
            'Flood hydrograph: lag time = time between peak rainfall and peak discharge; steep = flashy (urban areas)',
          ], workedExample:`Flood management: River Cherwell, Oxford (UK)
Hard engineering: flood walls along channel, storage reservoirs upstream
Soft engineering: washlands (allow controlled flooding), floodplain zoning (no new building in flood zones), afforestation upstream to increase interception
Evaluation: hard engineering more effective short-term but expensive; soft engineering sustainable but slower to show results`},
        ]},
        { title:'Coastal Environments', icon:'🏖️', topics:[
          { title:'Coastal Processes', points:[
            'Wave types: constructive (low frequency, long wavelength, strong swash) build beaches; destructive (high frequency, strong backwash) erode',
            'Erosion: hydraulic action, abrasion, attrition, solution — cliffs and headlands most affected',
            'Longshore drift: waves approach at angle → swash moves sediment diagonally → backwash straight back → net movement along coast',
            'Deposition: beaches, spits, bars — sediment deposited when wave energy decreases',
            'Sea level change: eustatic (global sea level — melting ice); isostatic (land rising/sinking — UK still rising in Scotland after Ice Age)',
          ]},
          { title:'Coastal Landforms & Management', points:[
            'Headland & bay: differential erosion — hard rock → headland; soft rock → bay',
            'Cave → arch → stack → stump: progressive erosion of headland',
            'Spit: longshore drift extends beach past a bend in coastline; curved by wave refraction',
            'Hard engineering: sea walls (reflect waves), groynes (trap sediment), rock armour (absorb energy)',
            'Soft engineering: beach nourishment (add sand), managed retreat (allow flooding — cheaper, creates habitats)',
          ], examTips:[
            'Evaluate management: cost vs effectiveness vs environmental impact — examiners want balance',
            'Holderness Coast (UK): fastest eroding coast in Europe — 2m/year; case study for erosion management',
          ]},
        ]},
        { title:'Urban Environments', icon:'🏙️', topics:[
          { title:'Urbanisation', points:[
            'Urbanisation: increasing % of population living in cities; fastest in LICs/MICs',
            'Push factors: poverty, lack of jobs, drought, conflict → leave rural areas',
            'Pull factors: jobs, better services, education, infrastructure → attracted to cities',
            'Megacities: cities with >10 million people — Mumbai, Lagos, Cairo, São Paulo',
            'Urban land use: CBD (central business district) → inner city → suburbs → rural-urban fringe',
          ]},
          { title:'Urban Issues & Solutions', points:[
            'HICs: counter-urbanisation (people leave cities for countryside), urban regeneration needed in declining areas',
            'LICs: rapid growth → squatter settlements (informal housing) — lack clean water, sanitation, legal tenure',
            'Traffic congestion: solutions — public transport investment, congestion charging (London), park and ride',
            'Urban heat island: cities warmer than surrounding countryside — dark surfaces absorb heat, less vegetation',
            'Sustainable cities: green buildings, cycling infrastructure, urban green spaces, waste recycling (Curitiba, Brazil)',
          ], examTips:[
            'Always use named case studies — Dharavi (Mumbai) for squatter settlements, Canary Wharf for HIC regeneration',
            'Sustainability question: consider social, economic, and environmental dimensions of any urban strategy',
          ]},
        ]},
        { title:'Development & Globalisation', icon:'🌐', topics:[
          { title:'Global Development Differences', points:[
            'Development gap: difference in wealth and quality of life between HICs and LICs',
            'Measures: GDP per capita, GNI per capita, HDI, life expectancy, literacy rate, infant mortality',
            'Causes of inequality: colonialism, trade rules, corruption, landlocked location, climate, natural hazards',
            'Aid types: bilateral (country-to-country), multilateral (IMF/World Bank), NGOs (Oxfam, CARE)',
            'Trade vs aid debate: trade allows self-sufficiency; aid can create dependency but addresses emergencies',
          ]},
          { title:'Tourism & Development', points:[
            'Tourism: world\'s largest industry; contributes ~10% of global GDP',
            'Ecotourism: low-impact, environmentally and culturally sensitive tourism — sustainable alternative',
            'Advantages: foreign exchange, job creation, infrastructure improvement, cultural exchange',
            'Disadvantages: seasonal employment, cultural dilution, environmental damage, leakage (profits leave country)',
            'Mass tourism case study: Benidorm, Spain — economic benefits vs overcrowding, environmental damage',
          ], examTips:[
            'Development question: always use data to support — "GNI per capita in Nigeria is $2,160 vs $47,000 in UK"',
            'Evaluate tourism: who benefits most? Local communities or multinational hotel chains? Consider leakage',
          ]},
        ]},
      ],
    }
  },
  business: {
    label:'Business Studies', arabic:'الأعمال التجارية', icon:'💼', color:'#0891B2',
    boards: ['cie','edexcel','oxford'],
    pastPapers: {
      cie:     'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-business-studies-0450/past-papers/',
      edexcel: 'https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-business-2017.coursematerials.html',
      oxford:  'https://www.oxfordaqaexams.org.uk/igcse/business-studies/',
    },
    chapters: {
      cie: [
        { title:'Business Activity', icon:'🏢', topics:[
          { title:'Purpose & Types of Business', points:[
            'Needs: essential for survival; wants: desirable but not essential; scarcity requires choices',
            'Sectors: Primary (extraction), Secondary (manufacturing), Tertiary (services)',
            'Sole trader: owned by one person; full liability; easy to set up; all profit kept',
            'Partnership: 2–20 partners; shared responsibility; partnership agreement important',
            'Private limited company (Ltd): shareholders; limited liability; cannot sell shares publicly',
            'Public limited company (Plc): shares on stock exchange; large capital; more regulation',
          ]},
          { title:'Business Objectives & Stakeholders', points:[
            'Profit = total revenue − total costs; survival (new businesses), growth, market share',
            'Stakeholders: anyone affected by the business — shareholders, employees, customers, community',
            'Shareholder vs stakeholder conflict: e.g. shareholders want high profit; employees want high wages',
            'CSR (Corporate Social Responsibility): business considers impact on society and environment',
            'Social enterprise: business with mainly social/environmental objectives',
          ]},
        ]},
        { title:'Marketing', icon:'📣', topics:[
          { title:'The Marketing Mix (4Ps)', points:[
            'Product: design, features, USP (unique selling point), product life cycle',
            'Price strategies: cost-plus, competitive pricing, penetration (low to enter market), skimming (high for new)',
            'Place: how product reaches customer — direct, retailer, wholesaler, online',
            'Promotion: advertising, sales promotion, PR, personal selling, social media',
            'Match mix to target market — know your customer (age, income, preferences)',
          ], examTips:[
            'Product life cycle: introduction → growth → maturity → decline — know which strategy suits each stage',
            'Evaluation questions: consider multiple stakeholders and reach a justified recommendation',
            'Price skimming: use for tech/luxury (e.g. iPhone launch); penetration: use to gain market share fast',
          ]},
          { title:'Market Research', points:[
            'Primary research: collected first-hand — surveys, interviews, observations, focus groups',
            'Secondary research: already exists — internet, government data, trade journals',
            'Quantitative: numerical data (statistics); qualitative: opinions and reasons',
            'Market segmentation: divide market by age, gender, income, location, lifestyle',
            'USP (Unique Selling Point): what makes the product different from competitors',
          ]},
        ]},
        { title:'Finance', icon:'💰', topics:[
          { title:'Costs, Revenue & Profit', points:[
            'Fixed costs: don\'t change with output (rent, salaries); variable: change with output (materials)',
            'Total cost = fixed costs + variable costs; Revenue = price × quantity sold',
            'Profit = revenue − total costs; loss when costs exceed revenue',
            'Break-even: output where TR = TC; Break-even output = fixed costs ÷ (price − variable cost per unit)',
            'Margin of safety = actual output − break-even output',
          ]},
          { title:'Cash Flow & Finance Sources', points:[
            'Cash flow ≠ profit: profitable business can still run out of cash',
            'Cash flow forecast: predicts monthly cash in and out; identifies potential shortfalls',
            'Improving cash flow: reduce credit given to customers, delay payments to suppliers, sell assets',
            'Internal finance: retained profit, sale of assets; External: bank loan, overdraft, share issue',
            'Overdraft: short-term borrowing; bank loan: medium/long term; cheaper to borrow long-term',
          ]},
        ]},
        { title:'Human Resources', icon:'👥', topics:[
          { title:'Motivation & Leadership', points:[
            'Maslow\'s Hierarchy: physiological → safety → social → esteem → self-actualisation',
            'Taylor: workers motivated by money (piece rate); Herzberg: hygiene factors vs motivators',
            'Financial motivators: wages, salaries, bonuses, profit sharing, commission',
            'Non-financial: promotion, job enrichment, recognition, flexible working, training',
            'Leadership styles: autocratic (decides alone), democratic (consults), laissez-faire (delegates)',
          ]},
          { title:'Recruitment & Training', points:[
            'Internal recruitment: promote existing staff; External: advertise outside (wider choice)',
            'Job description: duties and responsibilities; Person specification: skills and qualities needed',
            'On-the-job training: learn while working (cheaper, relevant); Off-the-job: external course (broader)',
            'Induction training: introduction for new employees; reduces mistakes, builds confidence',
            'Employment contract: legal document stating terms — hours, pay, notice period',
          ]},
        ]},
        { title:'Operations Management', icon:'⚙️', topics:[
          { title:'Production Methods', points:[
            'Job production: one-off, customised product (e.g. wedding cake, aircraft); high quality, expensive',
            'Batch production: groups of identical products at same time (e.g. bread, clothing); more flexible',
            'Flow (mass) production: continuous production line (e.g. cars, phones); cheap per unit, repetitive',
            'Lean production: eliminate waste — just-in-time (JIT), kaizen (continuous improvement)',
            'Quality control: inspect finished products; Quality assurance: check at every stage of production',
          ], examTips:[
            'JIT: benefits (lower stock costs, less waste) vs risks (supply disruption can halt production)',
            'Compare production methods — job vs flow: evaluate for a specific business context',
          ]},
          { title:'Location & Growth', points:[
            'Location factors: proximity to market, labour, raw materials, infrastructure, government grants',
            'Globalisation: businesses locate where costs are lowest (e.g. manufacturing in Asia)',
            'Internal growth (organic): using own resources to expand — slower but less risky',
            'External growth: mergers (two firms combine), takeovers (one buys another), franchises',
            'Economies of scale: as output increases, average cost falls (bulk buying, specialisation)',
          ]},
        ]},
        { title:'International Business', icon:'🌍', topics:[
          { title:'Trade & Globalisation', points:[
            'Globalisation: increasing integration of world economies through trade, investment and technology',
            'Multinational (TNC): operates in multiple countries; benefits from cheap labour, larger markets',
            'Exchange rates: strong pound → exports more expensive; weak pound → exports more competitive',
            'Tariffs, quotas, and trade blocs (e.g. EU): affect international competitiveness',
            'Advantages of globalisation: access to larger markets, lower costs, new technologies',
          ]},
          { title:'Ethics & CSR in Business', points:[
            'Business ethics: principles about what is right/wrong in business behaviour',
            'CSR (Corporate Social Responsibility): voluntary actions beyond legal requirements',
            'CSR activities: fair trade sourcing, reducing carbon footprint, community investment, fair wages',
            'Ethical dilemma: business may face trade-off between profit and ethical behaviour',
            'Reputation risk: unethical behaviour → boycotts, fines, negative publicity (e.g. Nike sweatshops)',
          ], examTips:[
            'Evaluate CSR: short-run cost but can improve reputation, customer loyalty, and staff motivation long-run',
            '"Justify your recommendation" = give reasons, consider alternatives, reach a clear conclusion',
          ]},
        ]},
      ],
      edexcel: [
        { title:'Business Activity & Stakeholders', icon:'🏢', topics:[
          { title:'Purpose of Business', points:[
            'Business: produces goods/services to satisfy consumer needs and wants',
            'Primary sector: extract natural resources (farming, fishing, mining)',
            'Secondary sector: manufacture goods using raw materials',
            'Tertiary sector: provide services (retail, finance, education)',
            'Private sector: profit-driven; public sector: government-run, aimed at public service',
          ]},
          { title:'Stakeholders', points:[
            'Stakeholders: groups with an interest in the business — owners, employees, customers, suppliers, community, government',
            'Shareholders: want high dividends and share price growth',
            'Employees: want fair pay, job security, good working conditions',
            'Stakeholder conflict: shareholders want lower costs (↓ wages) vs employees want higher pay',
            'CSR: balancing stakeholder interests through ethical and responsible behaviour',
          ], examTips:[
            'Identify which stakeholder is most important for the given context — justify your choice',
            'Conflict questions: state both sides and suggest how business might resolve them',
          ]},
        ]},
        { title:'Marketing', icon:'📣', topics:[
          { title:'The Marketing Mix (4Ps)', points:[
            'Product: features, quality, branding, USP (unique selling point), product lifecycle',
            'Price: cost-plus, competitive, penetration, skimming, psychological pricing strategies',
            'Place: distribution channels — direct (online), retailer, wholesaler, agent',
            'Promotion: advertising, sales promotion, PR, direct marketing, personal selling',
            'Market research: primary (surveys, interviews, observations) and secondary (internet, reports)',
          ]},
          { title:'Market Segmentation & Targeting', points:[
            'Market segmentation: dividing market into groups with similar characteristics',
            'Bases: geographic, demographic (age, gender, income), psychographic (lifestyle, values)',
            'Target market: the segment a business aims its products at',
            'Niche market: small specialised segment; mass market: broad appeal to all consumers',
            'Edexcel focus: digital marketing — social media, SEO, email marketing, influencer marketing',
          ], examTips:[
            'Always link marketing mix decisions to the target market — e.g. "skimming pricing suits a high-income niche"',
            'Evaluate: consider whether a strategy is appropriate given the stage of product lifecycle',
          ]},
        ]},
        { title:'People in Business', icon:'👥', topics:[
          { title:'Motivation & Leadership', points:[
            'Maslow\'s Hierarchy: physiological → safety → social → esteem → self-actualisation',
            'Herzberg: hygiene factors (prevent dissatisfaction — pay, conditions) vs motivators (achievement, recognition)',
            'Taylor (Scientific Management): pay-linked productivity; piece-rate; suitable for repetitive work',
            'Leadership styles: autocratic (boss decides), democratic (consults team), laissez-faire (delegates all)',
            'Appropriate style depends on: task urgency, employee experience, business culture',
          ]},
          { title:'Recruitment, Training & HR', points:[
            'Recruitment: internal (promoted from within — cheaper, knows culture) vs external (new ideas but costly)',
            'Selection: application form → shortlisting → interview → references → job offer',
            'On-the-job training: learn while working (cheaper, relevant); off-the-job: external courses (broader skills)',
            'Workforce planning: ensuring right number and skills of staff at the right time',
            'Redundancy: job no longer needed; dismissal: employee fault; employment law protects both sides',
          ], examTips:[
            'Link motivation theory to business context — e.g. "Maslow suggests this worker needs social needs met, so team-working would motivate them"',
            'Evaluate: consider limitations of motivation theories — they are generalisations',
          ]},
        ]},
        { title:'Finance & Operations', icon:'💰', topics:[
          { title:'Business Finance', points:[
            'Sources of finance: internal (retained profit, owner\'s savings) and external (bank loan, share issue, overdraft)',
            'Short-term finance: overdraft (flexible), trade credit (delay payment to suppliers)',
            'Long-term finance: mortgage, debentures, venture capital, stock market flotation',
            'Cash flow forecast: predicts monthly inflows and outflows; helps avoid insolvency',
            'Cash flow problem: profitable business can fail if cash inflows don\'t cover timing of outflows',
          ]},
          { title:'Operations Management', points:[
            'Production methods: job (one-off, custom), batch (groups), flow (continuous, mass)',
            'Lean production: minimise waste; just-in-time (JIT) inventory reduces holding costs',
            'Quality control: inspect finished products; quality assurance: build quality into process',
            'TQM (Total Quality Management): everyone responsible for quality; continuous improvement (Kaizen)',
            'Technology in operations: CAD/CAM, automation, robotics — improves consistency but costs jobs',
          ], examTips:[
            'Cash flow ≠ profit — distinguish clearly; a business can be profitable but insolvent',
            'For operations decisions, evaluate cost vs quality trade-offs and suitability for the business type',
          ], workedExample:`Opening balance: $2000. Month 1: Inflows $5000, Outflows $6500
Net cash flow = 5000 − 6500 = −$1500
Closing balance = 2000 + (−1500) = $500
Month 2: Inflows $4000, Outflows $3000 → Net = +$1000 → Closing balance = $1500`},
        ]},
      ],
      oxford: [
        { title:'Enterprise & Business Environment', icon:'🏢', topics:[
          { title:'What is Enterprise?', points:[
            'Enterprise: willingness to take risks and start or develop a business venture',
            'Entrepreneur: organises factors of production; takes financial risk; drives innovation',
            'Characteristics of entrepreneur: risk-taking, creativity, determination, leadership, communication skills',
            'Social enterprise: business with social/environmental goals alongside profit (e.g. The Big Issue)',
            'Oxford AQA focuses on UK/global context: Brexit impact, UK economy, domestic market competition',
          ]},
          { title:'Business Objectives', points:[
            'Survival: most important for new/struggling businesses — focus on covering costs',
            'Profit maximisation: traditional goal; revenue − costs; enables growth and shareholder returns',
            'Market share growth: gaining % of total market; useful for long-term competitiveness',
            'Customer satisfaction: repeat business, word-of-mouth, brand loyalty',
            'Ethical objectives: CSR, sustainability, fair treatment of staff — increasingly important to consumers',
          ], examTips:[
            'Oxford AQA: questions often set in UK context — refer to UK examples (e.g. NHS, Tesco, Dyson)',
            'Evaluate how business objectives change with size and stage — start-up focuses on survival, large firms on growth',
          ]},
        ]},
        { title:'Marketing', icon:'📣', topics:[
          { title:'Market Research & Segmentation', points:[
            'Primary research: first-hand data collected for specific purpose — surveys, interviews, observation',
            'Secondary research: existing data — ONS statistics, trade reports, company accounts',
            'Quantitative: numerical data (statistics); qualitative: opinions and attitudes (focus groups)',
            'Market segmentation: demographics (age, gender, income), psychographics (lifestyle), geography',
            'Target market: specific group the product is designed for; influences all marketing mix decisions',
          ]},
          { title:'Digital Marketing & Brand', points:[
            'Digital marketing: social media, SEO, email campaigns, pay-per-click advertising, influencers',
            'Branding: name, logo, values — creates identity and customer loyalty; premium brands command higher prices',
            'USP (Unique Selling Point): what makes product different from competitors — key for marketing',
            'Product lifecycle: introduction → growth → maturity → decline; marketing mix should adapt at each stage',
            'Extension strategies: update product, find new markets, promotional campaigns to extend maturity phase',
          ], examTips:[
            'For any marketing decision: consider cost, effectiveness, and whether it reaches the target market',
            'Digital vs traditional: digital (social media) cheaper and more targeted; traditional (TV) broader reach',
          ]},
        ]},
        { title:'Human Resources & Production', icon:'👥', topics:[
          { title:'Human Resources', points:[
            'Workforce planning: matching number and skills of employees to business needs',
            'Recruitment: job description + person specification → advertise → shortlist → interview → appoint',
            'Training: induction (new starters), on-the-job (cheaper, relevant), off-the-job (broader skills)',
            'Appraisal: regular review of employee performance against targets; linked to pay/promotion',
            'Employment law (UK): minimum wage, equal pay, health & safety, maternity/paternity rights, anti-discrimination',
          ]},
          { title:'Production & Quality', points:[
            'Job production: one-off custom items — high cost, skilled workforce, unique (e.g. bespoke suits)',
            'Batch production: groups of identical items — flexible, some economies of scale (e.g. bread, medicines)',
            'Flow/mass production: continuous production of identical items — lowest cost, economies of scale (e.g. cars)',
            'Lean production: eliminate waste (muda); just-in-time stock; continuous improvement (kaizen)',
            'Quality assurance: build quality in at every stage; zero defects philosophy vs quality control (inspect at end)',
          ], examTips:[
            'Match production method to business context — a luxury car maker uses job production, not flow production',
            'Lean production evaluation: JIT reduces holding costs but vulnerable to supply chain disruption',
          ], workedExample:`Recommend a production method for a small bakery:
Job production: too expensive for bakery prices; too slow
Batch production: BEST — produces 50 loaves at a time; flexible to change flavours; moderate cost; manageable with small team
Flow production: requires expensive equipment; only viable at very large scale
Recommendation: Batch production allows flexibility and cost efficiency for a small-medium bakery`},
        ]},
        { title:'Finance', icon:'💰', topics:[
          { title:'Revenue, Costs & Profit', points:[
            'Revenue = selling price × quantity sold',
            'Fixed costs: unchanged regardless of output level (rent, salaries, insurance)',
            'Variable costs: change directly with output (raw materials, packaging, delivery)',
            'Total cost = fixed cost + variable cost; Average cost = total cost ÷ quantity',
            'Break-even analysis: output where total revenue = total cost; below = loss; above = profit',
          ]},
          { title:'Financial Statements & Ratios', points:[
            'Income statement: revenue − cost of sales = gross profit; gross profit − expenses = net profit',
            'Balance sheet: shows assets (what business owns), liabilities (what it owes), capital (owner\'s equity)',
            'Liquidity: ability to meet short-term debts; current ratio = current assets ÷ current liabilities',
            'Profitability: gross profit margin = (gross profit ÷ revenue) × 100%',
            'Investors look for: high profit margin, good liquidity (not too high or low), positive cash flow',
          ], examTips:[
            'Oxford AQA finance questions: always calculate AND interpret — what does this ratio tell us?',
            'Interpret ratios in context: a current ratio of 0.8 means business cannot cover short-term debts → liquidity problem',
          ], workedExample:`Revenue: £120,000 | Cost of Sales: £72,000 | Expenses: £28,000
Gross Profit = 120,000 − 72,000 = £48,000
GPM = (48,000 ÷ 120,000) × 100 = 40%
Net Profit = 48,000 − 28,000 = £20,000
NPM = (20,000 ÷ 120,000) × 100 = 16.7%
Interpretation: For every £1 of revenue, the business keeps 16.7p as net profit`},
        ]},
      ],
    }
  },
  add_maths: {
    label:'Additional Mathematics', arabic:'رياضيات إضافية', icon:'🔣', color:'#7C3AED',
    boards: ['cie'],
    pastPapers: {
      cie: 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-additional-mathematics-0606/past-papers/',
    },
    chapters: {
      cie: [
        { title:'Functions', icon:'📐', topics:[
          { title:'Functions & Their Graphs', points:[
            'Function: each input has exactly one output; f(x) notation',
            'Domain: set of allowed inputs; range: set of possible outputs',
            'Composite function: fg(x) = f(g(x)) — apply g first, then f',
            'Inverse function f⁻¹(x): reverses f; domain of f⁻¹ = range of f; swap x and y to find',
            'One-to-one functions only have inverses; use horizontal line test',
          ]},
          { title:'Modulus Function', points:[
            'Modulus |x|: distance from zero — always positive',
            'Graph of y = |f(x)|: reflect any part below x-axis above it',
            'Solving |x − a| = b: split into x − a = b and x − a = −b',
            'Solving |f(x)| < b: −b < f(x) < b (and/intersection)',
            'Solving |f(x)| > b: f(x) > b OR f(x) < −b (or/union)',
          ]},
        ]},
        { title:'Algebra & Equations', icon:'🔢', topics:[
          { title:'Quadratic Functions', points:[
            'Completing the square: x²+bx = (x + b/2)² − (b/2)² — vertex form: a(x−h)²+k',
            'Discriminant: b²−4ac; >0 two real roots, =0 one repeated root, <0 no real roots',
            'Sum of roots α+β = −b/a; product αβ = c/a (Vieta\'s formulas)',
            'Finding quadratic given roots: x² − (α+β)x + αβ = 0',
            'Nature of stationary point: minimum if a>0 (happy), maximum if a<0 (sad)',
          ]},
          { title:'Indices & Surds', points:[
            'Laws of indices: same as IGCSE Maths — aᵐ×aⁿ, aᵐ÷aⁿ, (aᵐ)ⁿ, a⁰=1, a⁻ⁿ, aᵐ/ⁿ',
            'Surd: irrational number with √ (e.g. √2, √3) — leave in exact form',
            'Simplify surds: √18 = √(9×2) = 3√2',
            'Rationalising denominator: multiply top and bottom by surd (or conjugate for a+√b)',
            '(√a + √b)(√a − √b) = a − b — difference of squares eliminates surds',
          ]},
          { title:'Polynomials & Factor Theorem', points:[
            'Polynomial division: long division or synthetic division',
            'Factor theorem: if f(a) = 0 then (x − a) is a factor of f(x)',
            'Remainder theorem: when f(x) divided by (x − a), remainder = f(a)',
            'Fully factorise: find one root by inspection, then divide, then factorise quotient',
            'Cubic f(x) = ax³+bx²+cx+d — try factors of d/a as potential rational roots',
          ], examTips:[
            'Try small integer values ±1, ±2, ±3 as first roots for factor theorem questions',
            'After finding one factor (x−a), perform polynomial long division to get quadratic, then factorise',
          ], workedExample:`f(x) = x³ − 6x² + 11x − 6. Show (x−1) is a factor and fully factorise.
f(1) = 1 − 6 + 11 − 6 = 0 ✓ → (x−1) is a factor
Divide: x³ − 6x² + 11x − 6 ÷ (x−1) = x² − 5x + 6
Factorise: x² − 5x + 6 = (x−2)(x−3)
∴ f(x) = (x−1)(x−2)(x−3)`},
          { title:'Simultaneous Equations (Linear & Non-linear)', points:[
            'Linear and quadratic: substitute linear into quadratic → solve resulting quadratic',
            'Set discriminant ≥ 0 to find values of k for which two solutions exist',
            'Discriminant = 0: line is tangent to curve (one solution, touches)',
            'For circle problems: substitute line y = mx+c into circle equation',
            'Always check solutions by substituting back into both original equations',
          ]},
        ]},
        { title:'Logarithms & Exponentials', icon:'📊', topics:[
          { title:'Logarithms', points:[
            'Definition: logₐ b = c ↔ aᶜ = b (a is the base)',
            'Laws: log(xy) = log x + log y; log(x/y) = log x − log y; log(xⁿ) = n log x',
            'ln is log base e (natural log); log without base usually means log₁₀',
            'Change of base: logₐ b = log b / log a',
            'Solving aˣ = b: take log of both sides → x log a = log b → x = log b / log a',
          ]},
          { title:'Exponential & Log Graphs', points:[
            'y = aˣ: passes through (0,1), always positive, increases if a>1',
            'y = ln x: passes through (1,0); undefined for x ≤ 0; inverse of y = eˣ',
            'Linearising: if y = abˣ then ln y = ln a + x ln b → straight line (ln y vs x)',
            'If y = axⁿ then log y = log a + n log x → straight line (log y vs log x)',
            'Gradient and intercept of linearised graph give n and log a (or ln a)',
          ]},
        ]},
        { title:'Trigonometry', icon:'📐', topics:[
          { title:'Trigonometric Functions & Identities', points:[
            'Exact values: sin 30°=½, cos 30°=√3/2, tan 30°=1/√3; sin 45°=cos 45°=1/√2; sin 60°=√3/2',
            'Pythagorean identity: sin²θ + cos²θ = 1 (fundamental — must memorise)',
            'Derived: 1 + tan²θ = sec²θ; 1 + cot²θ = cosec²θ',
            'Graph of sin x: period 360°, amplitude 1; cos x: period 360°; tan x: period 180°',
            'Transformations: y = a sin(bx) + c — amplitude a, period 360/b, vertical shift c',
          ]},
          { title:'Solving Trigonometric Equations', points:[
            'Find principal value using inverse trig, then find all solutions in given range',
            'CAST diagram: All positive (1st), Sin positive (2nd), Tan positive (3rd), Cos positive (4th)',
            'sin θ = k: solutions at θ and 180° − θ (in range 0°–360°)',
            'cos θ = k: solutions at θ and 360° − θ',
            'tan θ = k: solutions at θ and θ + 180°',
          ]},
        ]},
        { title:'Calculus', icon:'∫', topics:[
          { title:'Differentiation', points:[
            'd/dx (xⁿ) = nxⁿ⁻¹; d/dx (eˣ) = eˣ; d/dx (ln x) = 1/x; d/dx (sin x) = cos x; d/dx (cos x) = −sin x',
            'Chain rule: d/dx f(g(x)) = f\'(g(x)) × g\'(x) — differentiate outside × inside\'',
            'Product rule: d/dx (uv) = u\'v + uv\'',
            'Quotient rule: d/dx (u/v) = (u\'v − uv\') / v²',
            'Stationary points: f\'(x) = 0; classify with f\'\'(x): positive = min, negative = max',
          ], examTips:[
            'Chain rule: write u = inner function, find du/dx, then multiply by d/du of outer function',
            'Classify stationary points: f\'\'(x)>0 → minimum; f\'\'(x)<0 → maximum; f\'\'(x)=0 → investigate further',
            'Connected rates of change: dy/dt = dy/dx × dx/dt — use chain rule on related quantities',
          ], workedExample:`Differentiate y = (3x² + 1)⁴ using chain rule:
Let u = 3x² + 1, so y = u⁴
dy/du = 4u³;  du/dx = 6x
dy/dx = 4u³ × 6x = 24x(3x² + 1)³`},
          { title:'Integration', points:[
            '∫xⁿ dx = xⁿ⁺¹/(n+1) + c (n ≠ −1); ∫1/x dx = ln|x| + c',
            '∫eˣ dx = eˣ + c; ∫sin x dx = −cos x + c; ∫cos x dx = sin x + c',
            'Integration by substitution: let u = inner function, replace dx with du/dx',
            'Definite integral ∫ₐᵇ f(x) dx = F(b) − F(a) where F is the antiderivative',
            'Area under curve = definite integral; if below x-axis, result is negative → take |value|',
          ]},
        ]},
        { title:'Binomial & Statistics', icon:'📊', topics:[
          { title:'Permutations & Combinations', points:[
            'Permutation: ordered arrangement; ⁿPᵣ = n!/(n−r)! — order matters',
            'Combination: unordered selection; ⁿCᵣ = n!/r!(n−r)! — order doesn\'t matter',
            'n! = n × (n−1) × ... × 2 × 1; 0! = 1',
            'Arrangements with restrictions: fix restricted elements first, then arrange the rest',
            'Circular arrangements: (n−1)! for n objects in a circle',
          ]},
          { title:'Binomial Theorem', points:[
            '(a+b)ⁿ = Σ ⁿCᵣ aⁿ⁻ʳ bʳ for r = 0 to n',
            'General term (r+1)th term: Tᵣ₊₁ = ⁿCᵣ × aⁿ⁻ʳ × bʳ',
            'Coefficient of xᵏ: find r such that the power of x = k',
            '(1+x)ⁿ expansion: 1 + nx + n(n−1)/2! x² + ... (valid for |x|<1 if n not integer)',
            'Use binomial expansion for approximations: substitute small value of x',
          ]},
        ]},
      ],
    }
  },
  accounting: {
    label:'Accounting', arabic:'المحاسبة', icon:'📒', color:'#059669',
    boards: ['cie','edexcel'],
    pastPapers: {
      cie:     'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-accounting-0452/past-papers/',
      edexcel: 'https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-accounting-2017.coursematerials.html',
    },
    chapters: {
      cie: [
        { title:'The Accounting System', icon:'📋', topics:[
          { title:'Purpose & Concepts', points:[
            'Accounting: recording, classifying, summarising and communicating financial information',
            'Users: owners (profit?), managers (decisions), creditors (can they repay?), employees (job security?)',
            'Going concern: business will continue to operate for foreseeable future',
            'Consistency: same accounting methods used each year for comparability',
            'Prudence: record losses when likely, profits only when certain',
            'Matching (accruals): revenue and costs matched to period in which they are earned/incurred',
          ]},
          { title:'Double Entry Bookkeeping', points:[
            'Every transaction has two equal and opposite effects (debit and credit)',
            'Debit: left side of T-account; Credit: right side',
            'DEAD CLIC: Debit = Expenses, Assets, Drawings; Credit = Liabilities, Income, Capital',
            'Assets increase with debit; liabilities/capital increase with credit',
            'Journal entries: record DR and CR with brief narration for each transaction',
          ], examTips:[
            'DEAD CLIC is essential to memorise — gets you through any double-entry question',
            'Always ask: "What comes IN (debit) and what goes OUT (credit)?"',
            'Bank account: debit when money received; credit when money paid out',
          ], workedExample:`Bought goods on credit from Ali for $500:
DR  Purchases $500  (expense increases → debit)
CR  Ali (Trade Payable) $500  (liability increases → credit)

Paid Ali $500 by bank:
DR  Ali (Trade Payable) $500  (liability decreases → debit)
CR  Bank $500  (asset decreases → credit)`},
        ]},
        { title:'Books of Original Entry', icon:'📚', topics:[
          { title:'Books of Prime Entry', points:[
            'Sales day book: records credit sales (not cash sales)',
            'Purchases day book: records credit purchases',
            'Returns day books: sales returns (inward) and purchases returns (outward)',
            'Cash book: records all cash and bank transactions; has debit (receipts) and credit (payments) columns',
            'Petty cash book: records small cash payments using imprest system (topped up to fixed amount)',
          ]},
          { title:'Trial Balance', points:[
            'Trial balance: list of all ledger balances (debit and credit columns must agree)',
            'Agreement does NOT mean no errors — compensating errors, complete omissions, errors of principle',
            'Six types of error not revealed: omission, commission, principle, original entry, reversal, compensating',
            'Suspense account: temporary account to make trial balance agree while errors are found',
            'Correcting journal entries: reverse the error, then record correctly',
          ]},
        ]},
        { title:'Financial Statements', icon:'📊', topics:[
          { title:'Income Statement (Trading Account)', points:[
            'Trading section: Sales − Cost of Goods Sold = Gross Profit',
            'Cost of Goods Sold = Opening Inventory + Purchases + Carriage In − Returns Out − Closing Inventory',
            'Income section: Gross Profit + Other Income − Expenses = Profit/Loss for the period',
            'Revenue expenditure: day-to-day expenses (charged to income statement)',
            'Capital expenditure: non-current assets (goes on balance sheet — not income statement)',
          ]},
          { title:'Balance Sheet (Statement of Financial Position)', points:[
            'Balance sheet: shows what business OWNS (assets) and OWES (liabilities + capital) at a point in time',
            'Non-current assets: long-term assets (property, machinery, vehicles)',
            'Current assets: short-term (inventory, trade receivables, bank, cash)',
            'Current liabilities: due within 1 year (trade payables, bank overdraft)',
            'Capital = Assets − Liabilities (accounting equation: A = C + L always balances)',
          ]},
          { title:'Adjustments to Accounts', points:[
            'Depreciation: spreading cost of non-current asset over useful life',
            'Straight-line: (Cost − Residual value) ÷ Useful life — equal annual charge',
            'Reducing balance: % × net book value each year — higher charge early on',
            'Accruals: expenses incurred but not yet paid — add to expense, add to liabilities',
            'Prepayments: expenses paid in advance — deduct from expense, add to current assets',
          ]},
        ]},
        { title:'Analysis & Interpretation', icon:'📈', topics:[
          { title:'Ratio Analysis', points:[
            'Gross profit margin = (Gross profit ÷ Revenue) × 100%',
            'Net profit margin = (Net profit ÷ Revenue) × 100%',
            'Return on capital employed (ROCE) = (Net profit ÷ Capital employed) × 100%',
            'Current ratio = Current assets ÷ Current liabilities (ideal: 1.5:1 to 2:1)',
            'Quick ratio (acid test) = (Current assets − Inventory) ÷ Current liabilities (ideal: 1:1)',
          ], examTips:[
            'Always comment on what the ratio means, not just calculate it — "this suggests the business..."',
            'Compare ratios: year-on-year trend tells more than a single ratio in isolation',
            'Quick ratio removes inventory as it may not be quickly convertible to cash',
          ], workedExample:`Current assets = $45,000; Inventory = $15,000; Current liabilities = $20,000
Current ratio = 45,000 ÷ 20,000 = 2.25:1 (slightly high — cash tied up)
Quick ratio = (45,000−15,000) ÷ 20,000 = 30,000 ÷ 20,000 = 1.5:1 (good liquidity)`},
          { title:'Interpreting Financial Information', points:[
            'Compare ratios: against previous years (trend) and against similar businesses (benchmarking)',
            'High gross margin but low net margin → high expenses relative to sales',
            'Low current ratio → liquidity problem; high → cash tied up inefficiently',
            'Inventory turnover = COGS ÷ Average inventory (times per year); higher = faster selling',
            'Limitations: ratios are based on historical cost; do not show non-financial factors',
          ]},
        ]},
      ],
      edexcel: [
        { title:'The Accounting Framework', icon:'📋', topics:[
          { title:'Purpose & Concepts', points:[
            'Accounting: systematic recording, classification and summarising of financial transactions',
            'Stakeholders using accounts: owners/investors (profit/growth?), banks (can they repay?), HMRC (tax?), suppliers (creditworthy?)',
            'Accounting concepts: going concern, accruals, consistency, prudence, materiality',
            'Accruals: match revenue to expenses in the period they occur, not when cash changes hands',
            'Edexcel focus: understanding WHY concepts matter — examiners want explanation, not just definition',
          ], examTips:[
            'Edexcel Accounting: expect application-based questions — given a scenario, which concept applies and why?',
            'Prudence: recognise losses immediately; only recognise gains when certain — conservative approach',
          ]},
          { title:'Double Entry Bookkeeping', points:[
            'DEAD CLIC rule: Debit = Expenses, Assets, Drawings; Credit = Liabilities, Income, Capital',
            'T-accounts: left side (debit) and right side (credit); every transaction has two entries',
            'Assets increase with debit (DR); decrease with credit (CR)',
            'Liabilities and capital increase with credit (CR); decrease with debit (DR)',
            'Trial balance: list all ledger balances; total debits must equal total credits',
          ]},
        ]},
        { title:'Financial Statements', icon:'📊', topics:[
          { title:'Income Statement', points:[
            'Revenue (sales) − Cost of Sales = Gross Profit',
            'Cost of Sales = Opening Inventory + Purchases − Closing Inventory',
            'Gross Profit − Expenses = Net Profit (or Operating Profit)',
            'Expenses include: wages, rent, electricity, depreciation, insurance, advertising',
            'Depreciation is a non-cash expense — reduces profit but no cash leaves business',
          ], examTips:[
            'Cost of Sales calculation is a frequent mark point — memorise OIPCOCI: Opening Inventory + Purchases − Closing Inventory',
            'Net profit is after tax in some questions — read carefully; operating profit = before tax',
          ], workedExample:`Income Statement for year ended 31 Dec:
Revenue: $180,000
Cost of Sales: Opening inventory $12,000 + Purchases $95,000 − Closing inventory $8,000 = $99,000
Gross Profit = $180,000 − $99,000 = $81,000
Expenses (wages $30,000 + rent $15,000 + depreciation $5,000) = $50,000
Net Profit = $81,000 − $50,000 = $31,000`},
          { title:'Balance Sheet (Statement of Financial Position)', points:[
            'Non-current assets: long-term items (equipment, buildings, vehicles); shown at net book value',
            'Current assets: short-term (inventory, trade receivables, bank, cash) — expected to be converted to cash within 1 year',
            'Current liabilities: owed within 1 year (trade payables, bank overdraft)',
            'Non-current liabilities: owed after 1 year (long-term loan)',
            'Capital/equity = Total assets − Total liabilities; Owner\'s capital + Retained profit',
          ]},
        ]},
        { title:'Depreciation & Adjustments', icon:'📉', topics:[
          { title:'Depreciation Methods', points:[
            'Straight-line: (Cost − Residual value) ÷ Useful life = annual depreciation charge',
            'Reducing balance: depreciation rate% × net book value at start of year',
            'Straight-line gives equal charge each year; reducing balance gives higher charge in early years',
            'Net Book Value (NBV) = Cost − Accumulated depreciation',
            'Accumulated depreciation: total depreciation charged to date; shown as provision on balance sheet',
          ], examTips:[
            'Always show full depreciation calculation — state method, cost, rate, and NBV clearly',
            'Choosing method: straight-line for assets that depreciate evenly; reducing balance for technology (loses value quickly)',
          ], workedExample:`Machine cost: $20,000; Residual value: $2,000; Useful life: 6 years
Straight-line: (20,000 − 2,000) ÷ 6 = $3,000 per year
NBV after year 3 = 20,000 − (3,000 × 3) = $11,000

Reducing balance at 30%:
Year 1: 20,000 × 30% = $6,000 → NBV = $14,000
Year 2: 14,000 × 30% = $4,200 → NBV = $9,800
Year 3: 9,800 × 30% = $2,940 → NBV = $6,860`},
          { title:'Accruals & Prepayments', points:[
            'Accrual: expense incurred but not yet paid — add to expenses, show as current liability',
            'Prepayment: expense paid in advance for future period — deduct from expenses, show as current asset',
            'Accrued income: income earned but not yet received — add to income, show as current asset',
            'Deferred income: income received in advance — deduct from income, show as current liability',
            'Irrecoverable debts: written off as expense; Allowance for receivables: estimate of expected non-payment',
          ]},
        ]},
        { title:'Ratios & Analysis', icon:'📐', topics:[
          { title:'Profitability & Liquidity Ratios', points:[
            'Gross Profit Margin = (Gross Profit ÷ Revenue) × 100%',
            'Net Profit Margin = (Net Profit ÷ Revenue) × 100%',
            'Return on Capital Employed (ROCE) = (Net Profit ÷ Capital Employed) × 100%',
            'Current Ratio = Current Assets ÷ Current Liabilities (ideal ~2:1)',
            'Quick Ratio = (Current Assets − Inventory) ÷ Current Liabilities (ideal ~1:1)',
          ]},
          { title:'Efficiency Ratios', points:[
            'Inventory Turnover = Cost of Sales ÷ Average Inventory (times per year)',
            'Trade Receivables Days = (Trade Receivables ÷ Revenue) × 365',
            'Trade Payables Days = (Trade Payables ÷ Cost of Sales) × 365',
            'Higher inventory turnover = selling stock faster (good); lower = stock sitting longer (risk of obsolescence)',
            'Longer receivables days = customers taking longer to pay (cash flow risk)',
          ], examTips:[
            'Edexcel: interpret ratios in business context — "what does this suggest about the business?"',
            'Compare to industry average or previous year for meaningful analysis — a ratio alone means little',
          ], workedExample:`Revenue: $200,000 | Gross Profit: $80,000 | Net Profit: $30,000 | Capital Employed: $150,000
GPM = (80,000 ÷ 200,000) × 100 = 40%
NPM = (30,000 ÷ 200,000) × 100 = 15%
ROCE = (30,000 ÷ 150,000) × 100 = 20%
Interpretation: 40% GPM suggests good pricing; 15% NPM means expenses are 25% of revenue — management may need to reduce costs`},
        ]},
      ],
    }
  },
  sociology: {
    label:'Sociology', arabic:'علم الاجتماع', icon:'👥', color:'#BE185D',
    boards: ['cie','edexcel'],
    pastPapers: {
      cie:     'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-sociology-0495/past-papers/',
      edexcel: 'https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-sociology-2017.coursematerials.html',
    },
    chapters: {
      cie: [
        { title:'Theory & Methods', icon:'🔬', topics:[
          { title:'Sociological Perspectives', points:[
            'Functionalism: society is like a body — each institution has a function to maintain stability (Durkheim, Parsons)',
            'Marxism: society based on conflict between bourgeoisie (owners) and proletariat (workers) — Marx',
            'Feminism: society structured around gender inequality favouring men (patriarchy)',
            'Interactionism: focuses on small-scale interactions and how people create meaning (micro approach)',
            'New Right: supports free market, traditional values, minimal state intervention',
          ]},
          { title:'Research Methods', points:[
            'Quantitative methods: produce numerical data — surveys, structured interviews, official statistics',
            'Qualitative methods: produce detailed non-numerical data — unstructured interviews, observation, documents',
            'Questionnaires: large sample, cheap, but low response rate and no depth',
            'Participant observation: researcher joins group — high validity but time-consuming and risk of bias',
            'Reliability: same results if repeated; validity: truly measures what it claims to measure',
          ]},
        ]},
        { title:'Family', icon:'👨‍👩‍👧', topics:[
          { title:'Family Structures & Functions', points:[
            'Nuclear family: parents + children; extended: nuclear + relatives; reconstituted: step-family',
            'Functionalist view: family socialises children, provides emotional support, regulates sexual behaviour',
            'Marxist view: family reproduces labour power; transmits ruling class ideology to next generation',
            'Feminist view: family is patriarchal — women do unpaid domestic labour (triple shift)',
            'Changing family: rising divorce rates, cohabitation, single-parent families, same-sex families',
          ]},
          { title:'Marriage, Divorce & Changing Patterns', points:[
            'Marriage rates declining in many HICs; cohabitation increasing',
            'Reasons for rising divorce: changing laws (easier/cheaper), women\'s economic independence, secularisation',
            'Secularisation: decline in religion → less stigma attached to divorce',
            'Reconstituted (blended) families: increasingly common; may cause identity issues for children',
            'Empty nest: when children leave home; beanpole family: multi-generational but few members per generation',
          ]},
        ]},
        { title:'Education', icon:'🏫', topics:[
          { title:'Role of Education', points:[
            'Functionalist: education transmits shared values (secondary socialisation), allocates roles by merit',
            'Marxist: education reproduces inequality — hidden curriculum teaches working class to accept low status',
            'Hidden curriculum: unwritten lessons (punctuality, obedience, competition) that prepare pupils for work',
            'Correspondence principle (Bowles & Gintis): school mirrors workplace — prepares docile workers',
            'Feminist: historical exclusion of women; despite improvements, gender stereotyping remains',
          ]},
          { title:'Factors Affecting Achievement', points:[
            'Social class: working-class pupils underachieve — material deprivation (no books, space), cultural capital',
            'Cultural capital (Bourdieu): middle class possess attitudes/knowledge valued by schools',
            'Gender: girls outperform boys at GCSE; boys more likely to take STEM; girls English/humanities',
            'Ethnicity: some ethnic minority groups underachieve; factors include language, racism, poverty',
            'Labelling theory: teachers label pupils → self-fulfilling prophecy (Becker)',
          ], examTips:[
            'Always refer to a named sociologist — Bourdieu, Becker, Bowles & Gintis, Durkheim etc.',
            'Use sociological perspectives to evaluate: functionalist agrees schooling promotes meritocracy; Marxist challenges this',
            '"Discuss to what extent..." = argue for AND against, then make a supported conclusion',
          ], commonMistakes:[
            'Writing about psychology instead of sociology — focus on social structures, not individual minds',
            'Only giving one perspective — IGCSE requires you to show different sociological views',
          ]},
        ]},
        { title:'Crime & Deviance', icon:'⚖️', topics:[
          { title:'Theories of Crime', points:[
            'Crime: breaking the law; deviance: behaviour that breaks social norms (not necessarily illegal)',
            'Functionalist: crime is normal and necessary — reinforces boundaries, promotes social solidarity',
            'Strain theory (Merton): crime results from gap between goals (wealth) and means to achieve them',
            'Labelling theory: crime is a social construction — who gets labelled as criminal?',
            'Marxist: law made by ruling class to protect their interests; white-collar crime ignored',
          ]},
          { title:'Social Control & Patterns of Crime', points:[
            'Formal control: police, courts, prisons; Informal control: family, peer pressure, education',
            'Gender and crime: men commit far more crimes — socialization, masculinity, opportunity',
            'Age and crime: young people (15–25) most likely to offend; youth subculture theories',
            'Class and crime: working class over-represented — but may reflect policing bias',
            'Moral panic: media exaggerates threat of a group → public fear → increased policing',
          ]},
        ]},
        { title:'Mass Media', icon:'📺', topics:[
          { title:'Media & Its Influence', points:[
            'Traditional media: newspapers, TV, radio; New media: internet, social media, streaming',
            'Ownership concentration: few large corporations own most media — may limit viewpoints',
            'Agenda setting: media decides which issues are important by giving them coverage',
            'Marxist view: media owned by ruling class → promotes dominant ideology (hegemony)',
            'Pluralist view: media reflects public demand; people choose what they consume',
          ]},
          { title:'Representation in Media', points:[
            'Stereotyping: oversimplified, fixed image of a group (gender, ethnicity, age, class)',
            'Women: often portrayed as passive, domestic, sexual objects; improving but still unequal',
            'Ethnicity: minority groups underrepresented or shown in negative roles',
            'Positive effects of social media: campaigns, activism, diverse voices, counter-narratives',
            'Hyperreality (Baudrillard): media images become more "real" than reality itself',
          ]},
        ]},
        { title:'Social Stratification', icon:'📊', topics:[
          { title:'Social Class & Inequality', points:[
            'Social stratification: hierarchical ranking of groups in society based on wealth, power, status',
            'Social class: grouping based on occupation, income, education; traditional working/middle/upper',
            'Functionalist view: inequality is inevitable and functional — motivates talent to fill important roles',
            'Marxist view: inequality serves ruling class interests; capitalism maintains class divisions',
            'Life chances: Weber — class, status, and party all affect opportunities and outcomes',
          ]},
          { title:'Gender Inequality', points:[
            'Patriarchy: system of male dominance in social, political, and economic institutions',
            'Gender pay gap: women earn less on average — occupational segregation, career breaks, discrimination',
            'Glass ceiling: invisible barrier preventing women from reaching top positions',
            'Second shift (Hochschild): women do paid work AND majority of domestic labour/childcare',
            'Progress: legal equality, more women in professions — but inequality persists in many areas',
          ]},
          { title:'Ethnicity & Race', points:[
            'Ethnicity: shared cultural identity (language, religion, customs); race: biological classification (now mostly rejected)',
            'Racism: prejudice or discrimination based on race/ethnicity; institutional racism: embedded in organisations',
            'Ethnic minority groups face: higher unemployment, lower income, housing discrimination in many countries',
            'Multiculturalism: celebration of diverse cultures within one society',
            'Immigration: contributes economically and culturally; may face integration challenges',
          ]},
        ]},
      ],
      edexcel: [
        { title:'Families', icon:'👨‍👩‍👧', topics:[
          { title:'Family Structures & Diversity', points:[
            'Nuclear family: two parents and children living together; once seen as the "normal" type',
            'Extended family: includes grandparents, aunts/uncles etc. — common in South Asian and African cultures',
            'Single-parent families: increased significantly since 1970s; majority headed by women',
            'Reconstituted (blended) family: step-parents and step-children from previous relationships',
            'Same-sex families: legal in UK since 2014; sociologists note parenting quality not affected by sexuality',
          ]},
          { title:'Marriage, Divorce & Changing Families', points:[
            'Marriage rates declining; cohabitation (living together without marriage) increasing',
            'Divorce rate: Rose sharply after Divorce Reform Act 1969 (easier to divorce)',
            'Reasons for rising divorce: changing role of women, secularisation, higher expectations',
            'Feminist view: family can be site of oppression — domestic labour unequal, domestic violence',
            'New Right view: decline of traditional family is harmful to society and children',
          ], examTips:[
            'Always use sociological perspectives — functionalist, Marxist, feminist — to evaluate family changes',
            'Give statistics to support trends (divorce rate, marriage rate, cohabitation statistics)',
          ]},
        ]},
        { title:'Education', icon:'🏫', topics:[
          { title:'Role of Education', points:[
            'Functionalist: education socialises children into shared values; Durkheim — social solidarity',
            'Parsons: school is a "bridge" between family (ascription) and work (achievement)',
            'Marxist: education reproduces class inequality; hidden curriculum reinforces ruling class ideology',
            'Willis (1977): working-class boys reject school (counter-school culture) — end up in manual jobs',
            'Feminist: schooling historically reinforced gender roles; now girls outperform boys at GCSE',
          ]},
          { title:'Educational Achievement & Inequality', points:[
            'Social class: middle-class children outperform working-class — language codes (Bernstein), cultural capital (Bourdieu)',
            'Gender: girls now outperform boys across most subjects; boys more likely to be excluded',
            'Ethnicity: variation between groups; Chinese and Indian students achieve highly; Black Caribbean boys lowest',
            'Material deprivation: poverty → poor diet, cramped housing, lack of resources → underachievement',
            'Labelling: teachers label students (Becker) — self-fulfilling prophecy affects outcomes',
          ], examTips:[
            'Use specific sociologist names — Bourdieu (cultural capital), Becker (labelling), Willis (counter-school culture)',
            'Internal factors (labelling, streaming) vs external factors (material deprivation, cultural factors) is a classic exam comparison',
          ]},
        ]},
        { title:'Crime & Deviance', icon:'⚖️', topics:[
          { title:'Defining Crime & Deviance', points:[
            'Crime: behaviour that breaks the criminal law — officially recorded and prosecuted',
            'Deviance: behaviour that breaks social norms — not necessarily illegal (varies by culture/time)',
            'Social construction of crime: what counts as crime changes (e.g. homosexuality was criminalised in UK until 1967)',
            'Official statistics: underestimate crime due to dark figure (unreported, unrecorded crime)',
            'Victim surveys (e.g. Crime Survey for England & Wales): reveal unreported crime',
          ]},
          { title:'Explanations for Crime', points:[
            'Functionalist (Durkheim): crime is normal — reinforces boundaries; some innovation is beneficial',
            'Merton\'s strain theory: crime results from gap between success goals and legitimate means to achieve them',
            'Labelling theory: being labelled criminal leads to master status and self-fulfilling prophecy',
            'Marxist: laws protect ruling class interests; white-collar crime underpoliced vs street crime',
            'Left realism: crime has real impact on working-class communities; address relative deprivation',
          ], examTips:[
            'Always support explanations with named sociologist — un-attributed theories score less',
            'Evaluate each theory: what does it fail to explain? (e.g. strain theory ignores white-collar crime)',
          ]},
        ]},
        { title:'Social Stratification (Edexcel)', icon:'📊', topics:[
          { title:'Class, Status & Power', points:[
            'Weber\'s three dimensions: class (economic), status (social prestige), party (political power)',
            'Meritocracy: rewards based on talent and effort — functionalists argue this is fair; Marxists disagree',
            'Social mobility: movement between social classes; upward (improving position), downward',
            'Open vs closed systems: caste system (closed — birth determines rank); class (open — can move)',
            'Globalisation: changing class structure — growth of service sector, decline of manufacturing',
          ]},
          { title:'Poverty & Inequality', points:[
            'Absolute poverty: unable to meet basic survival needs (food, shelter, clothing)',
            'Relative poverty: below the standard of living considered acceptable in society (below 60% median income)',
            'New Right: poverty results from culture of dependency — welfare state traps people in poverty',
            'Marxist: poverty is structural — capitalism requires a reserve army of labour',
            'Gender and poverty: women at greater risk — pay gap, career breaks, caring responsibilities',
          ], examTips:[
            'Absolute vs relative poverty — define both clearly; examiners reward precise definitions',
            'Link poverty to life chances across health, education, housing, and life expectancy',
          ]},
        ]},
      ],
    }
  },
  psychology: {
    label:'Psychology', arabic:'علم النفس', icon:'🧠', color:'#7C3AED',
    boards: ['cie','edexcel'],
    pastPapers: {
      cie:     'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-psychology-0477/past-papers/',
      edexcel: 'https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-psychology-2017.coursematerials.html',
    },
    chapters: {
      cie: [
        { title:'Core Studies & Research Methods', icon:'🔬', topics:[
          { title:'Research Methods', points:[
            'Experiment: IV (independent variable) manipulated; DV (dependent variable) measured; controls other variables',
            'Lab experiment: high control, replicable, but artificial (low ecological validity)',
            'Field experiment: natural setting, more valid, but less control',
            'Observation: naturalistic (real setting) or controlled; covert vs overt',
            'Case study: in-depth study of one individual or small group; rich detail but cannot generalise',
          ]},
          { title:'Key Research Concepts', points:[
            'Hypothesis: testable prediction about what will happen; null hypothesis: no effect',
            'Sampling: random (every member has equal chance), opportunity (whoever is available), self-selected',
            'Reliability: consistent results across measurements or between observers',
            'Validity: does the study measure what it claims? Internal and external validity',
            'Ethics: informed consent, right to withdraw, confidentiality, protection from harm (BPS guidelines)',
          ]},
        ]},
        { title:'Memory', icon:'🧩', topics:[
          { title:'Models of Memory', points:[
            'Multi-store model (Atkinson & Shiffrin): sensory register → STM → LTM',
            'STM: limited capacity (7±2 items), short duration (18–30 seconds), acoustic encoding',
            'LTM: unlimited capacity, long duration (potentially lifetime), semantic encoding',
            'Working memory model (Baddeley & Hitch): phonological loop, visuospatial sketchpad, central executive',
            'Episodic memory: personal events; semantic: general knowledge; procedural: how to do things',
          ]},
          { title:'Forgetting', points:[
            'Interference: proactive (old memories interfere with new) and retroactive (new interfere with old)',
            'Retrieval failure: information in LTM but cannot be accessed — tip of tongue phenomenon',
            'Context-dependent forgetting: encoded in one context, hard to recall in different context',
            'State-dependent forgetting: emotional/physical state at encoding differs from recall',
            'Repression (Freud): motivated forgetting of traumatic or anxiety-provoking memories',
          ]},
        ]},
        { title:'Developmental Psychology', icon:'👶', topics:[
          { title:'Cognitive Development (Piaget)', points:[
            'Piaget: children actively construct knowledge through schemas, assimilation and accommodation',
            'Sensorimotor (0–2): object permanence develops; Preoperational (2–7): egocentrism, no conservation',
            'Concrete operational (7–11): conservation achieved; Formal operational (12+): abstract reasoning',
            'Conservation: understanding that quantity stays the same despite change in appearance',
            'Evaluation: underestimated children\'s abilities; culture and social interaction largely ignored',
          ]},
          { title:'Attachment (Bowlby)', points:[
            'Attachment: strong emotional bond between infant and caregiver; critical period concept',
            'Bowlby\'s monotropy: one primary attachment (usually mother) most important',
            'Ainsworth — Strange Situation: secure (65%), anxious-avoidant (20%), anxious-resistant (15%)',
            'Secure attachment: caregiver responsive → child explores freely, upset when left, comforted on return',
            'Deprivation (separation): short/long term effects — delinquency, depression, intellectual delay',
          ]},
        ]},
        { title:'Social Psychology', icon:'👥', topics:[
          { title:'Obedience (Milgram)', points:[
            'Milgram 1963: 65% of participants administered maximum 450V shocks to a "learner" when ordered',
            'Factors increasing obedience: authority figure present, prestigious location, close proximity',
            'Factors decreasing: peer rebellion, no authority figure, teacher gives shocks themselves',
            'Agency theory: people enter agentic state — see themselves as agent of authority, not responsible',
            'Evaluation: ethical issues (deception, stress); artificial, but field replications support findings',
          ], examTips:[
            'Evaluation = strengths AND weaknesses — always do both for full marks',
            'GRAVE acronym for evaluating studies: Generalisation, Reliability, Application, Validity, Ethics',
            'For Milgram: strength = high internal validity; weakness = low ecological validity (artificial task)',
          ], commonMistakes:[
            'Saying participants were "forced" — they were not; they could leave but chose not to (obedience)',
            'Confusing obedience (following direct orders) with conformity (following group norms)',
          ]},
          { title:'Conformity & Social Influence', points:[
            'Conformity: changing behaviour/beliefs to fit in with a group',
            'Informational influence: conforming because we believe group knows better (genuine attitude change)',
            'Normative influence: conforming to be liked/accepted; behaviour changes but not necessarily beliefs',
            'Asch line study: 75% conformed at least once; 5% always conformed; group size matters',
            'Minority influence: consistency over time can change majority view (Moscovici)',
          ]},
        ]},
        { title:'Biological Psychology', icon:'🧬', topics:[
          { title:'Brain & Behaviour', points:[
            'Neurons: nerve cells transmit electrical signals; synapse: gap between neurons',
            'Neurotransmitters: chemical messengers (dopamine, serotonin, noradrenaline)',
            'Brain localisation: different areas control different functions (Broca\'s area = speech)',
            'Hemispheres: left (language, logic) and right (creativity, spatial); corpus callosum connects them',
            'Split-brain studies (Sperry): cutting corpus callosum reveals hemisphere specialisation',
          ], examTips:[
            'Localisation vs holism: localisation says specific areas control functions; holism says the brain works as a whole',
            'Evaluate case studies (e.g. Phineas Gage): unique insight into brain function, but cannot generalise from one case',
          ]},
          { title:'Hormones & Behaviour', points:[
            'Endocrine system: glands secrete hormones into bloodstream → affect organs and behaviour',
            'Adrenaline (adrenal gland): fight-or-flight response — raised heart rate, dilated pupils, increased blood sugar',
            'Testosterone (testes/ovaries): linked to aggression; higher levels → more aggressive behaviour in some studies',
            'Cortisol: stress hormone from adrenal cortex; chronic high levels → impaired immune function, memory issues',
            'Oxytocin: "bonding hormone" — released during social contact, breastfeeding; increases trust and affiliation',
          ]},
        ]},
        { title:'Individual Differences', icon:'🧠', topics:[
          { title:'Intelligence', points:[
            'Binet: first intelligence test, developed to identify children needing educational support',
            'IQ = (mental age ÷ chronological age) × 100; average IQ = 100',
            'Nature vs nurture debate: genetics (twin studies) vs environment (education, SES, nutrition)',
            'Twin studies (Bouchard): identical twins raised apart show similar IQ → genetic basis for intelligence',
            'Sternberg\'s triarchic theory: analytic, creative, and practical intelligence — IQ tests only measure analytic',
          ]},
          { title:'Abnormality & Mental Health', points:[
            'Definitions of abnormality: statistical infrequency, deviation from social norms, failure to function adequately',
            'DSM-5: Diagnostic and Statistical Manual — used to classify mental disorders',
            'Depression: persistent low mood, loss of interest, hopelessness; cognitive (Beck) vs biological (serotonin) explanations',
            'Phobia: irrational persistent fear; classical conditioning (Watson & Rayner — Little Albert) explains acquisition',
            'Treatment: CBT (cognitive-behavioural therapy) — challenge negative thoughts; drug therapy — SSRIs for depression',
          ], examTips:[
            'Always evaluate definitions of abnormality — each has strengths and limitations',
            'Link treatment to explanation: if biological cause (low serotonin) → drug treatment; if learned (conditioning) → systematic desensitisation',
          ]},
        ]},
      ],
      edexcel: [
        { title:'Perception & Dreaming', icon:'👁️', topics:[
          { title:'Visual Perception', points:[
            'Perception: process of interpreting sensory information to give it meaning',
            'Nativism: perception is innate (we are born with perceptual abilities) — supported by infant studies',
            'Empiricism: perception is learned through experience — supported by cross-cultural studies',
            'Visual constancies: size constancy (distant objects seen as same size), shape constancy, colour constancy',
            'Depth cues: monocular (perspective, superimposition, texture gradient) and binocular (retinal disparity)',
          ], examTips:[
            'Evaluate using cross-cultural studies: if perception varies across cultures → learned (empiricism); if universal → innate (nativism)',
            'Hudson\'s pictorial depth perception test: showed depth cue interpretation varies with cultural experience',
          ]},
          { title:'Dreaming', points:[
            'REM sleep: rapid eye movement; associated with vivid dreaming; brain active, body paralysed',
            'Freud\'s theory: dreams fulfil unconscious wishes; manifest content (what we remember) vs latent content (hidden meaning)',
            'Activation-synthesis theory (Hobson & McCarley): brain randomly fires during REM → cortex makes sense of signals as "dream"',
            'Dement & Kleitman (1957): EEG + eye movement monitoring; awakened in REM → 80% recalled dreams; in NREM → rarely recalled',
            'Evaluation of Freud: unfalsifiable (cannot disprove); subjective interpretation; but case studies rich in detail',
          ]},
        ]},
        { title:'Memory', icon:'🧠', topics:[
          { title:'Memory Models', points:[
            'Multi-store model (Atkinson & Shiffrin): sensory register → short-term memory (STM) → long-term memory (LTM)',
            'STM: capacity ~7 items (±2), duration ~18–30 seconds, acoustic encoding',
            'LTM: unlimited capacity, potentially lifelong duration, semantic encoding',
            'Rehearsal: maintenance rehearsal keeps info in STM; elaborative rehearsal transfers to LTM',
            'Working memory model (Baddeley): replaces STM with central executive + phonological loop + visuospatial sketchpad + episodic buffer',
          ]},
          { title:'Forgetting', points:[
            'Trace decay: memory fades over time if not rehearsed (Peterson & Peterson — consonant trigrams)',
            'Interference: proactive interference (old memories block new); retroactive (new memories block old)',
            'Retrieval failure: cue-dependent forgetting — context, state, or mood cues needed to retrieve memory',
            'Motivated forgetting (Freud): repression — anxiety-provoking memories pushed to unconscious',
            'Eyewitness testimony: affected by leading questions (Loftus & Palmer — "smashed" vs "hit")',
          ], examTips:[
            'Peterson & Peterson (1959): 3-letter nonsense syllables, count backwards to prevent rehearsal → 90% forgotten after 18 seconds',
            'Loftus & Palmer: critical study for eyewitness unreliability — speed estimates changed by verb used in question',
          ], workedExample:`Loftus & Palmer (1974) — Experiment 1:
Participants saw car accident video. Asked "About how fast were the cars going when they [hit/smashed/collided/bumped/contacted]?"
"Smashed" group estimated 40.8 mph average; "Contacted" group estimated 31.8 mph
Shows: verb in question changed memory reconstruction → eyewitness testimony unreliable`},
        ]},
        { title:'Learning', icon:'📚', topics:[
          { title:'Classical & Operant Conditioning', points:[
            'Classical conditioning (Pavlov): neutral stimulus paired with unconditioned stimulus → becomes conditioned stimulus',
            'UCS (food) → UCR (salivation); CS (bell) → CR (salivation after conditioning)',
            'Extinction: conditioned response weakens if CS repeatedly presented without UCS',
            'Operant conditioning (Skinner): behaviour shaped by consequences',
            'Positive reinforcement: reward follows behaviour → behaviour increases; negative reinforcement: removal of unpleasant stimulus',
          ]},
          { title:'Social Learning Theory', points:[
            'Bandura: learning occurs by observing and imitating role models (vicarious learning)',
            'Four processes: attention → retention → reproduction → motivation/reinforcement',
            'Bobo doll experiment (Bandura, 1961): children who watched aggressive model were more aggressive',
            'Identification: more likely to imitate models who are similar, admired, or powerful',
            'Self-efficacy: belief in own ability to succeed — influences whether observed behaviour is imitated',
          ], examTips:[
            'Bandura Bobo doll: strength = controlled conditions; weakness = demand characteristics (children may perform for observer)',
            'Classical vs operant: classical = involuntary/reflexive responses; operant = voluntary behaviour shaped by consequences',
          ]},
        ]},
        { title:'Social Behaviour', icon:'👥', topics:[
          { title:'Obedience & Authority', points:[
            'Milgram (1963): 65% of participants delivered maximum 450V shocks when ordered by authority figure',
            'Situational factors: physical proximity of authority, prestige of location, legitimate authority',
            'Dispositional factors: authoritarian personality (Adorno) — tendency to be overly obedient to authority',
            'Agentic state: person sees themselves as instrument of authority, not personally responsible',
            'Ethical issues: deception (told it was learning study), psychological harm, though debriefed afterwards',
          ]},
          { title:'Prosocial Behaviour & Bystander Effect', points:[
            'Bystander effect: presence of others reduces likelihood of helping in emergencies',
            'Diffusion of responsibility: each person assumes another will help',
            'Pluralistic ignorance: each bystander looks to others and, seeing no reaction, assumes no emergency',
            'Latané & Darley (1968): participants less likely to report smoke when others present (non-reactive)',
            'Factors increasing helping: alone, knowing the victim, clear emergency, similar to victim',
          ], examTips:[
            'Edexcel Psych: always apply studies to real-world contexts — examiners reward application marks',
            'Evaluate bystander research: lacks ecological validity (staged) but replicated in field studies (subway studies)',
          ]},
        ]},
      ],
    }
  },
  ict: {
    label:'ICT (Digital Literacy)', arabic:'تكنولوجيا المعلومات', icon:'🖥️', color:'#0284C7',
    boards: ['cie'],
    pastPapers: {
      cie: 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-information-and-communication-technology-0417/past-papers/',
    },
    chapters: {
      cie: [
        { title:'Types of Data & Storage', icon:'💾', topics:[
          { title:'Data Types & Input Devices', points:[
            'Data types: text, numeric, Boolean (true/false), date/time, currency',
            'Input devices: keyboard, mouse, scanner, barcode reader, digital camera, microphone, touchscreen',
            'OMR (Optical Mark Recognition): detects marks on paper (multiple choice exams, surveys)',
            'OCR (Optical Character Recognition): reads printed/handwritten text and converts to digital text',
            'RFID: radio waves identify tags (e.g. library books, stock control, passports)',
          ]},
          { title:'Storage Devices', points:[
            'Magnetic: HDD — large capacity, cheap per GB, moving parts (can break), random access',
            'Flash/Solid State: SSD, USB drives — fast, no moving parts, shock-resistant, expensive per GB',
            'Optical: CD/DVD/Blu-ray — portable, cheap, easily scratched, lower capacity',
            'Cloud storage: data stored on remote servers — access anywhere, dependent on internet',
            'Backup: copy of data in case original is lost; grandfather-father-son rotation for organisations',
          ]},
        ]},
        { title:'Networks & Communication', icon:'🌐', topics:[
          { title:'Network Types & Topologies', points:[
            'LAN: within one building/site; WAN: covers large geographic area (e.g. internet)',
            'Star topology: all connected to central switch; failure of one node doesn\'t affect others',
            'Bus topology: all share one cable; cheap but one break affects entire network',
            'Ring topology: devices connected in a circle; token passing controls data flow',
            'Wi-Fi: wireless LAN using radio waves; Bluetooth: short-range wireless (10m)',
          ]},
          { title:'Internet & Communication', points:[
            'Internet: global network of networks; World Wide Web: system of web pages accessed via internet',
            'Email: asynchronous communication; can send attachments; spam is unwanted bulk email',
            'VoIP (Voice over IP): voice calls over the internet (e.g. Skype, WhatsApp calls)',
            'Streaming: data delivered continuously in real-time (YouTube, Spotify)',
            'Bandwidth: amount of data transferred per second; higher bandwidth = faster speeds',
          ]},
        ]},
        { title:'Software & Applications', icon:'📱', topics:[
          { title:'Types of Software', points:[
            'Operating system: manages hardware, provides user interface, runs programs (Windows, macOS, Linux)',
            'Application software: designed for specific tasks (word processor, spreadsheet, database)',
            'Utility software: maintains and optimises system (antivirus, disk defragmenter, backup)',
            'Open source: source code available freely; proprietary: commercial, source code protected',
            'GUI (Graphical User Interface): icons, windows, menus; CLI (Command Line): text commands',
          ]},
          { title:'Databases & Spreadsheets', points:[
            'Database: organised collection of data; records (rows) and fields (columns)',
            'Primary key: unique identifier for each record; foreign key: links two tables',
            'Queries: extract specific data using criteria (e.g. SELECT where age > 18)',
            'Spreadsheet formulas: =SUM(), =AVERAGE(), =IF(), =VLOOKUP(), =COUNT()',
            'Relative cell reference (A1) changes when copied; absolute ($A$1) stays fixed',
          ]},
        ]},
        { title:'Safety, Security & Ethics', icon:'🔒', topics:[
          { title:'Cyber Security', points:[
            'Malware types: virus (attaches to files), worm (self-replicates), Trojan (disguised), ransomware (encrypts files)',
            'Phishing: fake emails/websites tricking users into revealing passwords or personal data',
            'Social engineering: manipulating people to reveal confidential information (not technical)',
            'Firewall: monitors network traffic, blocks unauthorised access',
            'Encryption: converts data to unreadable format; only decrypted with correct key',
          ]},
          { title:'Ethical & Legal Issues', points:[
            'Copyright: legal protection for original creative work — software, music, images, text',
            'Software piracy: illegal copying/distribution of software without licence',
            'Data Protection: personal data must be collected lawfully, kept secure, not kept longer than necessary',
            'Digital divide: gap between those with and without access to technology and internet',
            'Health issues of ICT: RSI (repetitive strain injury), eye strain, back problems — posture and breaks important',
          ], examTips:[
            'Copyright vs patents: copyright protects expression (software code, images); patents protect inventions',
            'Data Protection principles: purpose limitation, data minimisation, accuracy, storage limitation, security',
            'Digital divide: not just rich vs poor countries — also elderly vs young, urban vs rural within same country',
          ]},
        ]},
        { title:'Systems & Control', icon:'⚙️', topics:[
          { title:'Systems Analysis & Design', points:[
            'Systems life cycle: analysis → design → implementation → testing → evaluation → maintenance',
            'Requirements specification: detailed description of what the system must do',
            'Data flow diagram (DFD): shows how data moves through a system',
            'Testing: white box (uses knowledge of code), black box (tests inputs/outputs only)',
            'User acceptance testing: end users test system before full implementation',
          ]},
          { title:'Control Systems & Automation', points:[
            'Sensor: detects physical input (temperature, light, pressure, motion)',
            'Actuator: converts signal into action (motor, heater, buzzer)',
            'Feedback loop: output is monitored and fed back to control the system (e.g. thermostat)',
            'Turtle graphics / Logo: simple programming for controlling movement with commands (FORWARD, TURN)',
            'Advantages of automation: consistent quality, works 24/7, dangerous environments, faster production',
          ], examTips:[
            'Thermostat example: temperature sensor → reads value → compare to set point → if too low → activate heater → feedback → repeat',
            'For "design a control system" questions: always mention sensor, processor, actuator, and feedback',
          ], workedExample:`Design a greenhouse temperature control system:
Inputs: temperature sensor, light sensor
Process: microprocessor compares readings to set levels
Outputs: heaters (if too cold), fans (if too hot), lights (if too dark)
Feedback: sensors continuously monitor; system adjusts automatically
Advantage: no human needed; works 24/7; consistent conditions for plants`},
        ]},
        { title:'Multimedia & Communication', icon:'🎨', topics:[
          { title:'Multimedia Components', points:[
            'Multimedia: combination of text, images, audio, video, animation in a digital product',
            'Image file types: JPEG (photos, small file), PNG (transparent background), GIF (simple animations)',
            'Audio file types: MP3 (compressed, small), WAV (uncompressed, large, high quality)',
            'Video file types: MP4 (compressed, streaming), AVI (large, high quality)',
            'Resolution: pixels per inch (ppi) — higher resolution = better quality but larger file size',
          ]},
          { title:'File Sizes & Compression', points:[
            'Image file size = width × height × colour depth (bits) ÷ 8 (for bytes)',
            'Sound file size = sample rate (Hz) × bit depth × duration (s) × channels ÷ 8',
            'Lossless compression: original data restored exactly — ZIP, PNG, FLAC',
            'Lossy compression: some data permanently removed — smaller file, quality reduced — JPEG, MP3, MP4',
            'Colour depth: 1-bit = 2 colours; 8-bit = 256 colours; 24-bit = 16.7 million colours (true colour)',
          ], examTips:[
            'File size calculations are common exam questions — always show working step by step',
            'When to use lossy vs lossless: lossy for streaming/sharing (web), lossless for professional archives',
          ], workedExample:`Calculate size of a 5-second stereo sound clip:
Sample rate: 44,100 Hz | Bit depth: 16-bit | Channels: 2 (stereo)
File size = 44,100 × 16 × 2 × 5 = 7,056,000 bits
= 7,056,000 ÷ 8 = 882,000 bytes = 882 KB (uncompressed WAV)
MP3 compression at 10:1 ratio → ~88 KB`},
          { title:'Presentation & Web Design', points:[
            'Hyperlink: clickable link to another page or section; anchor tag in HTML (<a href="">)',
            'Web design principles: consistency, accessibility, clear navigation, fast loading',
            'Metadata: data about data — search engines use title, description, keywords tags',
            'HTML structure: DOCTYPE → html → head (title, css) → body (content)',
            'Presentation software: PowerPoint/Impress; slides, transitions, animations — use sparingly',
          ]},
        ]},
      ],
    }
  },
  literature: {
    label:'English Literature', arabic:'الأدب الإنجليزي', icon:'📚', color:'#9333EA',
    boards: ['cie','edexcel','oxford'],
    pastPapers: {
      cie:     'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-literature-in-english-0475/past-papers/',
      edexcel: 'https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-english-literature-2016.coursematerials.html',
      oxford:  'https://www.oxfordaqaexams.org.uk/igcse/english-literature/',
    },
    chapters: {
      cie: [
        { title:'Poetry Analysis', icon:'✍️', topics:[
          { title:'How to Analyse Poetry', points:[
            'SMILE: Structure, Meaning, Imagery, Language, Effect — framework for poetry analysis',
            'Form: how is the poem laid out? Stanzas, line lengths, regular/irregular pattern',
            'Rhyme scheme: identify pattern (ABAB, AABB, etc.); free verse = no fixed rhyme',
            'Rhythm: stressed and unstressed syllables; iambic pentameter (da-DUM ×5)',
            'Always analyse EFFECT of technique: don\'t just name it — what does it make the reader feel?',
          ]},
          { title:'Key Poetic Techniques', points:[
            'Simile: comparison using "like" or "as"; metaphor: "is" — direct, more powerful',
            'Personification: giving human traits to non-human (e.g. "the sun smiled")',
            'Alliteration: repetition of initial consonant sounds — creates rhythm or emphasis',
            'Enjambment: sentence runs over line break without pause — creates pace or surprise',
            'Caesura: pause in middle of a line (shown by punctuation) — creates hesitation or impact',
          ]},
          { title:'Comparing Poems', points:[
            'Compare theme: what both poems are about and different attitudes to that theme',
            'Compare tone: mood conveyed — melancholic, angry, celebratory, bitter, nostalgic',
            'Compare form: which is more structured? Why does form suit the poem\'s message?',
            'Use connectives: "Similarly...", "In contrast...", "Both poets...", "However...", "Whereas..."',
            'Avoid just describing — analyse WHY the poet made each choice and its effect on the reader',
          ]},
        ]},
        { title:'Prose (Novels & Short Stories)', icon:'📖', topics:[
          { title:'Analysing Prose Fiction', points:[
            'Narrative voice: first person (I — intimate, limited view), third person (omniscient — knows all)',
            'Setting: when and where story takes place; can reflect character\'s mood or create atmosphere',
            'Characterisation: direct (told directly) vs indirect (shown through actions/dialogue)',
            'Plot structure: exposition → rising action → climax → falling action → resolution (Freytag pyramid)',
            'Themes: abstract ideas explored — justice, identity, power, love, belonging, loss',
          ]},
          { title:'Writing About Characters', points:[
            'Analyse how character is presented — not just what they do but HOW the writer presents them',
            'Use quotations and analyse specific word choices (diction)',
            'Track character development: how do they change through the novel?',
            'Consider motivation: why does the character act this way?',
            'Consider relationship between characters and power dynamics',
          ]},
        ]},
        { title:'Drama', icon:'🎭', topics:[
          { title:'Analysing Drama Texts', points:[
            'Stage directions: writer\'s instructions for how play should be performed — not just decoration',
            'Dramatic irony: audience knows something characters do not — creates tension or humour',
            'Soliloquy: character speaks thoughts aloud alone on stage; aside: brief comment to audience',
            'Conflict: internal (character vs self) or external (character vs character/society)',
            'Structure of drama: acts and scenes; where act/scene breaks occur and why',
          ]},
          { title:'Exam Technique for Literature', points:[
            'Always use PEA: Point → Evidence (quote) → Analysis of effect',
            'Quote selectively — short embedded quotes are better than long block quotes',
            'Track the writer\'s intentions: "Shakespeare presents...", "Dickens conveys..."',
            'Context: brief relevant context where it directly supports analysis (not history lesson)',
            'Plan before writing: 5 minutes planning saves time and improves structure',
          ], examTips:[
            'Top tip: analyse the EFFECT on the reader — "This makes the reader feel...", "This creates a sense of..."',
            'Avoid plot summary — every paragraph must have a point, a quote, and an analysis',
            'Comparison essays: alternate between texts (ABAB) rather than writing about one then the other (AABB)',
          ], workedExample:`Poetry analysis paragraph (PEA):
Point: Heaney presents the father as a skilled craftsman who commands admiration.
Evidence: "His licking straps / Once looped, it slung and swung / Till the chains would jounce and jingle."
Analysis: The dynamic verbs "licking", "slung", "swung" and the onomatopoeic "jounce and jingle" create a sense of energy and mastery, conveying the young speaker's awe of his father's physical competence.`},
        ]},
        { title:'Themes & Context', icon:'🌍', topics:[
          { title:'Common Literary Themes', points:[
            'Power & control: who holds power? How is it maintained or subverted? (Animal Farm, Macbeth)',
            'Identity & belonging: characters searching for their place in society or culture',
            'Loss & grief: how characters cope with bereavement, failure, or change',
            'Conflict: war, social inequality, inner moral struggle — what drives conflict in the text?',
            'Appearance vs reality: what is presented as true vs what is actually true (Great Expectations, Othello)',
          ]},
          { title:'Context in Literature', points:[
            'Historical context: when was the text written? What events/ideas influenced it?',
            'Social context: class, gender roles, race relations of the period',
            'Literary context: genre conventions, contemporary influences on the writer',
            'Don\'t drop context in randomly — it must directly link to and explain a writer\'s choice',
            'AO3 (context mark): awarded when context illuminates the meaning, not just decorates the answer',
          ], examTips:[
            'CIE Literature: "How does the writer present..." questions — answer with methods + effects + context',
            'Edexcel Literature: longer essays with more focus on whole-text argument — develop a thesis statement',
            'Shakespeare questions: reference theatrical context (performances, Elizabethan/Jacobean audience expectations)',
          ]},
        ]},
      ],
    }
  },
  french: {
    label:'French', arabic:'اللغة الفرنسية', icon:'🇫🇷', color:'#2563EB',
    boards: ['cie','edexcel'],
    pastPapers: {
      cie:     'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-french-0520/past-papers/',
      edexcel: 'https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-french-2017.coursematerials.html',
    },
    chapters: {
      cie: [
        { title:'Grammar Essentials', icon:'📝', topics:[
          { title:'Verbs & Tenses', points:[
            'Present tense: -er verbs: je parle, tu parles, il/elle parle, nous parlons, vous parlez, ils/elles parlent',
            'Perfect tense (passé composé): avoir/être + past participle (e.g. j\'ai mangé, je suis allé)',
            'être verbs (DR & MRS VANDERTRAMP): aller, venir, naître, mourir, rester, partir, arriver, etc.',
            'Imperfect (imparfait): was doing / used to do — j\'étais, je mangeais, il faisait',
            'Future: infinitive + ai/as/a/ons/ez/ont endings; irregular: aller→ir-, avoir→aur-, être→ser-',
          ]},
          { title:'Adjectives & Agreement', points:[
            'Adjectives agree with noun: masculine singular (grand), feminine (grande), plural (grands/grandes)',
            'BAGS adjectives come BEFORE noun: Beauty (beau/belle), Age (jeune/vieux), Goodness (bon/mauvais), Size (grand/petit)',
            'Most adjectives go AFTER noun: une voiture rouge, un livre intéressant',
            'Comparative: plus/moins/aussi + adjective + que; superlative: le/la/les plus + adjective',
            'Possessive adjectives: mon/ma/mes, ton/ta/tes, son/sa/ses, notre/nos, votre/vos, leur/leurs',
          ]},
          { title:'Negatives & Questions', points:[
            'Negation: wrap around verb — ne...pas (not), ne...jamais (never), ne...plus (no longer), ne...rien (nothing)',
            'Question forms: inversion (Parles-tu?), est-ce que (Est-ce que tu parles?), rising intonation',
            'Question words: qui (who), quoi/que (what), où (where), quand (when), pourquoi (why), comment (how)',
            'Object pronouns: le/la/les (direct), lui/leur (indirect) — placed before verb',
            'Relative pronouns: qui (subject), que (object), où (place/time)',
          ]},
        ]},
        { title:'Topic Vocabulary', icon:'🗣️', topics:[
          { title:'Personal Life & Identity', points:[
            'Family: la famille, les parents, le frère, la sœur, les grands-parents, l\'oncle, la tante',
            'Personality: sympa, gentil(le), bavard(e), paresseux/euse, travailleur/euse, timide',
            'Physical description: grand(e), petit(e), mince, gros(se), les cheveux blonds/bruns/noirs',
            'Daily routine: se lever, se laver, s\'habiller, prendre le petit déjeuner, aller à l\'école',
            'Free time: les loisirs — jouer au foot, écouter de la musique, regarder la télé, lire',
          ]},
          { title:'School & Future Plans', points:[
            'School subjects: les maths, les sciences, l\'histoire-géo, l\'informatique, le dessin',
            'School opinions: ma matière préférée est..., je trouve les maths utiles/difficiles',
            'Future: je voudrais être (I would like to be), j\'espère (I hope), je vais (I\'m going to)',
            'Jobs: médecin, infirmier/ière, prof, ingénieur, homme/femme d\'affaires, acteur/actrice',
            'Higher education: l\'université, les études, le diplôme, la formation professionnelle',
          ]},
          { title:'Environment & Global Issues', points:[
            'L\'environnement: la pollution, le réchauffement climatique, les énergies renouvelables',
            'Problems: la déforestation, les déchets (waste), la couche d\'ozone, les gaz à effet de serre',
            'Solutions: recycler, économiser l\'eau/l\'énergie, utiliser les transports en commun',
            'Healthy living: manger équilibré, faire du sport, éviter le tabac et l\'alcool',
            'Travel: les vacances, l\'hôtel, le camping, prendre l\'avion/le train, les pays francophones',
          ]},
        ]},
        { title:'Exam Skills', icon:'✍️', topics:[
          { title:'Listening & Reading Strategies', points:[
            'Skim read first to get the gist before attempting detailed comprehension',
            'Use context clues for unknown vocabulary — surrounding words help',
            'Beware of false friends: actuel ≠ actual (means "current"), sensible ≠ sensible (means "sensitive")',
            'In listening: read questions before the recording; use the pause to check answers',
            'True/False/Not Given: "not given" means the text is silent on that point — don\'t infer',
          ]},
          { title:'Writing & Speaking Techniques', points:[
            'Use a variety of tenses: past, present, future + conditional shows sophistication',
            'Give and justify opinions: à mon avis..., je pense que..., parce que..., car...',
            'Extend answers: not just "oui/non" but add detail, reason, extra information',
            'Use connectives: mais (but), donc (so), cependant (however), d\'abord (firstly), ensuite (then)',
            'Check gender of nouns, adjective agreements, and verb conjugations before submitting',
          ], examTips:[
            'Top tip: write a draft with 3 tenses (e.g. j\'ai joué au foot hier / je joue / je vais jouer demain) — examiners reward tense variety',
            'Conditional tense (je voudrais, j\'aimerais) = instant sophistication marker for B+ grade',
            'Speaking: if you forget a word, paraphrase — "une chose pour écrire" instead of "stylo"',
            'Writing tasks: plan 3 minutes before writing — allocate coverage of all bullet points',
          ], workedExample:`Photo card task: "What are you doing this weekend?"
Basic: Je vais au cinéma. (1 tense, no detail)
Better: Ce weekend, je vais aller au cinéma avec mes amis. Hier, j'ai regardé un film à la télé, mais je préfère sortir. J'adore les films d'action parce qu'ils sont passionnants.
(3 tenses + opinion + reason + connective = target grade response)`},
        ]},
        { title:'Grammar Reference', icon:'📋', topics:[
          { title:'Key Verb Tables', points:[
            'AVOIR (to have): j\'ai, tu as, il a, nous avons, vous avez, ils ont',
            'ÊTRE (to be): je suis, tu es, il est, nous sommes, vous êtes, ils sont',
            'ALLER (to go): je vais, tu vas, il va, nous allons, vous allez, ils vont',
            'FAIRE (to do/make): je fais, tu fais, il fait, nous faisons, vous faites, ils font',
            'POUVOIR (can): je peux, tu peux, il peut, nous pouvons, vous pouvez, ils peuvent',
          ]},
          { title:'Common Irregular Past Participles', points:[
            'avoir → eu | être → été | faire → fait | aller → allé | venir → venu',
            'voir → vu | prendre → pris | mettre → mis | dire → dit | écrire → écrit',
            'lire → lu | boire → bu | vouloir → voulu | pouvoir → pu | savoir → su',
            'All être verbs in passé composé: add -e for feminine, -s for plural (e.g. elle est allée)',
            'Reflexive verbs always use être: je me suis levé(e), elle s\'est habillée',
          ], examTips:[
            'Past participle agreement with être verbs is a common mark-losing error — always check gender/number',
            'ne...pas wraps around auxiliary in compound tenses: je n\'ai PAS mangé; elle n\'est PAS allée',
          ]},
        ]},
      ],
    }
  },
  arabic_lang: {
    label:'Arabic (Foreign Language)', arabic:'اللغة العربية', icon:'🇸🇦', color:'#16A34A',
    boards: ['cie'],
    pastPapers: {
      cie: 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-arabic-0508/past-papers/',
    },
    chapters: {
      cie: [
        { title:'Reading Comprehension', icon:'📖', topics:[
          { title:'Comprehension Strategies', points:[
            'Read the questions FIRST to know what to look for before reading the passage',
            'Identify key words in questions and scan the text for them',
            'Literal comprehension: find and quote from text (use correct text language)',
            'Inferential: read beyond what is stated — what is implied by word choice or context?',
            'Summary: paraphrase relevant points — do not copy chunks; identify ONLY what is asked',
          ]},
          { title:'Text Types & Features', points:[
            'Newspaper article: headline, byline, inverted pyramid structure (most important first)',
            'Descriptive text: rich adjectives, imagery, sensory details, present or past tense',
            'Argumentative text: thesis, evidence, counterargument, conclusion',
            'Narrative text: characters, setting, plot, dialogue',
            'Formal vs informal register: formal uses correct grammar and no slang; identify appropriately',
          ]},
        ]},
        { title:'Writing Skills', icon:'✍️', topics:[
          { title:'Formal Writing (Composition)', points:[
            'Essay structure: مقدمة (introduction) → عرض (body paragraphs) → خاتمة (conclusion)',
            'Use varied vocabulary: avoid repeating the same words; use synonyms',
            'Linking phrases: أولاً / ثانياً / وأخيراً، علاوة على ذلك، ومع ذلك، بالإضافة إلى ذلك',
            'Give and justify opinions: أرى أن / أعتقد أن / في رأيي / لأن / بسبب',
            'Avoid spelling errors in hamza (أ، إ، آ، ء)، taa marbuta (ة)، and alif maqsura (ى)',
          ]},
          { title:'Grammar Essentials', points:[
            'Verb-Subject agreement: الفعل يتوافق مع الفاعل في الجنس والعدد',
            'Cases: المرفوع (subject), المنصوب (object), المجرور (after preposition)',
            'Definiteness: ال التعريف للاسم المعرفة؛ المضاف إليه لا تدخل عليه ال إذا كان المضاف نكرة',
            'Dual and plural forms must be used correctly for nouns and verbs',
            'Masculine vs feminine agreement: adjectives and verbs must match gender of noun',
          ], examTips:[
            'Hamza spelling is a top mark-loser — practise أ / إ / آ / ء / ئ in context',
            'Use إعراب (case endings) in formal written Arabic — they signal grammatical role',
            'Writing exam: start with a strong opening sentence using a rhetorical question or striking statement',
          ], workedExample:`Writing task: "Write an article about the importance of reading"
مقدمة: هل تعلم أن القراءة هي مفتاح العلم والمعرفة؟ يرى كثير من المفكرين أن الكتاب خير جليس في الأنام.
عرض: تساهم القراءة في تنمية المهارات اللغوية وتوسيع المدارك، فضلاً عن تقوية الذاكرة. علاوة على ذلك، تُعدّ وسيلةً للترفيه الهادف.
خاتمة: وختاماً، أدعو كل شاب إلى أن يجعل القراءة عادةً يومية لا غنى عنها.`},
        ]},
        { title:'Listening & Speaking', icon:'🎧', topics:[
          { title:'Listening Techniques', points:[
            'Before listening: read questions carefully, predict topic from context',
            'Listen for stressed words — they often carry key information',
            'Numbers, dates, names: listen carefully — these are often tested',
            'Distinguish between similar words: context usually clarifies meaning',
            'If you miss something — stay calm, keep listening, do not dwell on missed section',
          ], examTips:[
            'First listening: focus on gist (main topic, general idea); second listening: answer specific questions',
            'Match the register of the answer to the question — if formal text, write formal Arabic',
          ]},
          { title:'Speaking & Role-Play', points:[
            'Prepare vocabulary for common topics: family, school, hobbies, health, environment, work',
            'Practice giving extended answers — not just one word',
            'Use كلمات الربط: لذلك، بالإضافة إلى، في المقابل، من ناحية أخرى',
            'Express opinions clearly: في رأيي أن...، أعتقد أن...، يبدو لي أن...',
            'Don\'t be afraid of errors — communication matters most; self-correct if you notice mistakes',
          ], examTips:[
            'Role-play: practise opening phrases (كيف يمكنني مساعدتك؟ / أودّ أن أستفسر عن...) for each scenario type',
            'Presentation: structure as مقدمة → نقاط رئيسية (×3) → خاتمة — examiners reward clear organisation',
          ]},
          { title:'Exam Vocabulary Banks', points:[
            'Connecting ideas: أولاً / ثانياً / أخيراً | علاوةً على ذلك | بالإضافة إلى | في المقابل',
            'Giving opinions: في رأيي | أعتقد أن | من وجهة نظري | يبدو لي | أرى أن',
            'Contrasting: ومع ذلك | بينما | على النقيض | من ناحية أخرى | إلا أن',
            'Emphasis: لا شك أن | من الواضح أن | الجدير بالذكر أن | من المهم أن نُشير إلى',
            'Conclusion: وختاماً | وفي الخلاصة | ومما سبق يتضح | لذلك يمكن القول',
          ]},
        ]},
      ],
    }
  },
  religious_studies: {
    label:'Religious Studies', arabic:'الدراسات الدينية', icon:'☪️', color:'#B45309',
    boards: ['cie','edexcel'],
    pastPapers: {
      cie:     'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-religious-studies-0490/past-papers/',
      edexcel: 'https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-religious-studies-2017.coursematerials.html',
    },
    chapters: {
      cie: [
        { title:'Islam', icon:'☪️', topics:[
          { title:'Beliefs & Practices', points:[
            'Five Pillars: Shahada (declaration of faith), Salah (prayer 5x daily), Zakah (charity 2.5%), Sawm (fasting Ramadan), Hajj (pilgrimage)',
            'Six Articles of Faith: Allah, Angels, Holy Books, Prophets, Day of Judgement, Predestination (Al-Qadr)',
            'Tawhid: oneness of Allah — the most fundamental Islamic belief; shirk (associating partners) is gravest sin',
            'Qur\'an: final and complete revelation from Allah to Prophet Muhammad (PBUH); preserved unchanged',
            'Sunnah and Hadith: sayings and actions of the Prophet; guide Muslim life alongside Qur\'an',
          ], examTips:[
            'Know all Five Pillars and Six Articles — often asked to "name and explain" each one',
            'Distinguish Sunni and Shia Islam where relevant: different views on leadership after the Prophet',
            'Use religious terminology precisely: ummah, tawhid, shirk, khalifah — define terms you use',
          ]},
          { title:'Ethics & Application', points:[
            'Sanctity of life: life is sacred (khalifah — humans are stewards of creation)',
            'Ummah: global community of Muslims; importance of brotherhood and justice (adl)',
            'War: conditions for just war in Islam (last resort, declared by authority, civilians protected)',
            'Status of women: equal spiritual status; specific roles in family; scholars debate modernity and tradition',
            'Environmental responsibility: humans are khalifah — must protect earth, avoid israf (waste)',
          ]},
        ]},
        { title:'Christianity', icon:'✝️', topics:[
          { title:'Beliefs & Practices', points:[
            'Trinity: God the Father, God the Son (Jesus), God the Holy Spirit — three persons, one God',
            'Incarnation: God became human in Jesus Christ — born of the Virgin Mary',
            'Crucifixion: Jesus died on the cross as atonement for humanity\'s sins',
            'Resurrection: Jesus rose from the dead on the third day — central to Christian faith',
            'Baptism: initiation into the church; Eucharist (Holy Communion): remembering the Last Supper',
          ]},
          { title:'Christian Ethics', points:[
            'Golden Rule: "Do to others as you would have them do to you" (Matthew 7:12)',
            'Agape: unconditional, selfless love — central Christian virtue',
            'Stewardship: humans called to care for God\'s creation (environment)',
            'Social justice: many Christians support action against poverty, inequality, discrimination',
            'Conscience: inner moral guide; some say it reflects divine guidance',
          ]},
        ]},
        { title:'Philosophical Questions', icon:'🤔', topics:[
          { title:'Arguments for God\'s Existence', points:[
            'Cosmological argument: everything has a cause; universe must have a first cause → God',
            'Teleological (design) argument: universe shows evidence of design → must have designer (Paley\'s watch)',
            'Ontological argument: God is the greatest conceivable being; existence is a perfection → God exists',
            'Religious experience: personal encounters with God; conversion, visions, miracles',
            'Evaluations: problem of evil, scientific explanations (Big Bang, evolution) as counter-arguments',
          ]},
          { title:'Ethical Theories', points:[
            'Utilitarianism: action is right if it produces greatest happiness for greatest number (Bentham, Mill)',
            'Kantian ethics (deontology): act only according to rules you could universalise; duty-based',
            'Natural Law: moral norms based on human nature and reason (Aquinas); absolute rules',
            'Virtue ethics: focus on developing good character traits (honesty, courage, compassion)',
            'Divine command theory: what God commands is right; evaluated by how we know God\'s commands',
          ], examTips:[
            'For "do you agree?" questions: always argue BOTH sides before reaching a justified conclusion',
            'Reference specific thinkers/scholars: Bentham, Mill, Kant, Aquinas strengthen evaluation',
            'Ethical questions in RS: apply a named ethical theory, then apply a religious perspective (e.g. Islamic view on euthanasia)',
          ]},
        ]},
        { title:'Applied Ethics', icon:'⚖️', topics:[
          { title:'Life & Death Issues', points:[
            'Sanctity of life: life is sacred and God-given — no human has the right to take it (religious view)',
            'Quality of life: life\'s value depends on its quality and what the person values (secular view)',
            'Euthanasia: deliberately ending a life to relieve suffering; active (deliberate action) vs passive (withdrawal of treatment)',
            'Abortion: deliberate termination of pregnancy; debates about personhood, when life begins, women\'s rights',
            'Capital punishment: state execution of criminals; justice vs rehabilitation debate; religious responses vary',
          ], examTips:[
            'Always present at least two different religious or ethical views on each issue',
            'Use religious quotes where possible: "Do not take a life which Allah has made sacred" (Qur\'an 6:151)',
            'Life and death questions: distinguish between religious teaching and the actual practice of believers',
          ]},
          { title:'War & Peace', points:[
            'Just War theory (Aquinas): war must have just cause, right intention, last resort, declared by authority, proportionate means',
            'Pacifism: all war is wrong; Christian pacifists cite "love your enemy" (Matthew 5:44)',
            'Holy War: war commanded by God or religious authority; concept in Islam (jihad — greater jihad = spiritual struggle)',
            'Nuclear weapons: disproportionate destruction → most religious traditions oppose; deterrence debate',
            'Peacemaking: religious traditions value peace (Islam = "salaam"; Christianity = "blessed are the peacemakers")',
          ]},
          { title:'Poverty & Wealth', points:[
            'Absolute poverty: lack of basic necessities for survival; relative poverty: below average standard of living',
            'Islamic view: wealth is a trust from Allah; Zakah (2.5% of savings) is mandatory; interest (riba) is forbidden',
            'Christian view: wealth itself not wrong, but love of money is "root of all evil" (1 Timothy 6:10); help the poor',
            'Causes of global poverty: historical exploitation, debt, poor governance, natural disasters, inequality',
            'Faith responses: Christian Aid, Islamic Relief, Oxfam — religious organisations provide development aid',
          ]},
        ]},
        { title:'Buddhism', icon:'☸️', topics:[
          { title:'Buddhist Beliefs & Practices', points:[
            'Four Noble Truths: suffering exists (dukkha), craving causes suffering (tanha), suffering can end (nirvana), the Eightfold Path leads to nirvana',
            'Eightfold Path: right understanding, intention, speech, action, livelihood, effort, mindfulness, concentration',
            'Dharma (dhamma): the teaching of the Buddha; the truth about how life works',
            'Three Marks of Existence: impermanence (anicca), suffering (dukkha), no-self (anatta)',
            'Karma: law of cause and effect — intentional actions affect future rebirths; nirvana = escape from cycle',
          ]},
          { title:'Buddhist Ethics', points:[
            'Five Precepts: do not harm living things; do not steal; avoid sexual misconduct; avoid false speech; avoid intoxicants',
            'Ahimsa (non-violence): not harming any sentient being; influence on diet (vegetarianism), pacifism',
            'Compassion (karuna) and loving kindness (metta): key Buddhist virtues — extend to all beings',
            'Engaged Buddhism: applying Buddhist principles to social, political, and environmental issues',
            'Environmental ethics: interdependence (pratītyasamutpāda) — all things connected → must protect nature',
          ], examTips:[
            'Buddhism exam questions: link practices back to core beliefs — show how the belief motivates the action',
            'Distinguish Theravada (individual liberation, meditation) from Mahayana (bodhisattva path, helping all beings)',
          ]},
        ]},
        { title:'Judaism', icon:'✡️', topics:[
          { title:'Jewish Beliefs & Practices', points:[
            'Monotheism: belief in one God (YHWH); Shema — "Hear O Israel, the Lord our God, the Lord is one"',
            'Torah: first five books of Moses; contains 613 commandments (mitzvot) guiding Jewish life',
            'Covenant with Abraham: circumcision as sign; later covenant at Sinai (Ten Commandments)',
            'Shabbat: weekly day of rest (Friday sunset–Saturday sunset); no work; synagogue, family, prayer',
            'Jewish festivals: Rosh Hashanah (New Year), Yom Kippur (Day of Atonement), Passover (Exodus)',
          ]},
          { title:'Jewish Ethics & Modern Issues', points:[
            'Pikuach nefesh: saving a life overrides almost all other commandments — life is of supreme value',
            'Tikkun olam: "repair of the world" — Jews have responsibility to make the world better',
            'Justice (tzedakah): giving to poor is obligation, not charity; righteousness and justice central to Judaism',
            'Medical ethics: most Jews support medical research and treatment; organ donation generally permitted',
            'Holocaust (Shoah): destruction of 6 million Jews; raises profound questions about God and suffering (theodicy)',
          ]},
        ]},
      ],
      edexcel: [
        { title:'Christianity: Beliefs & Teachings', icon:'✝️', topics:[
          { title:'Christian Beliefs', points:[
            'Trinity: one God in three persons — Father (creator), Son (Jesus/redeemer), Holy Spirit (guide)',
            'Incarnation: God became fully human in Jesus Christ — born of Virgin Mary; 100% human and 100% divine',
            'Atonement: Jesus\' death on the cross makes reconciliation between humans and God possible',
            'Resurrection: Jesus physically rose from the dead on Easter Sunday — cornerstone of Christian faith',
            'Eschatology: beliefs about life after death — resurrection of the body, heaven, hell, purgatory (Catholic)',
          ]},
          { title:'Christian Practices', points:[
            'Worship: liturgical (structured — Church of England, Catholic) vs non-liturgical (informal — Pentecostal)',
            'Prayer: communicating with God; private prayer and communal worship; Lord\'s Prayer as model',
            'Sacraments: Baptism (entry to Church); Eucharist/Communion (remembering Last Supper)',
            'Pilgrimage: Lourdes, Jerusalem, Rome, Canterbury — journey to holy place for spiritual reasons',
            'Mission and evangelism: spreading the Christian message; through social action, preaching, charity',
          ], examTips:[
            'Edexcel RS: know specific differences between denominations (Catholic vs Protestant vs Pentecostal) — they appear in questions',
            '"How important is..." questions: give a balanced view, then justify your conclusion based on evidence',
          ]},
        ]},
        { title:'Christianity: Ethics & Issues', icon:'⚖️', topics:[
          { title:'Christian Views on Life & Death', points:[
            'Sanctity of life: life is sacred, created by God, belonging to God — basis for opposing abortion/euthanasia',
            'Quality of life: life has value based on what a person can experience — used to support some euthanasia arguments',
            'Abortion: most Christians oppose (sanctity of life); some Protestant denominations allow in difficult circumstances',
            'Euthanasia: Catholic Church strictly opposes; Methodist/CoE may accept passive euthanasia in limited cases',
            'Capital punishment: many Christians oppose (forgiveness, rehabilitation); some argue "eye for eye" supports it',
          ], examTips:[
            'Present Christian views with precision — not all Christians agree; show denominational differences',
            '"Do you agree?" (AO3): state own view with reasons, then consider alternative, then conclude',
          ]},
          { title:'Christian Views on Peace & Justice', points:[
            'Just War (Aquinas): just cause, right intention, proportionality, last resort, declared by authority, civilian protection',
            'Pacifism: all war is wrong; Quakers are absolute pacifists; "blessed are the peacemakers" (Matthew 5:9)',
            'Social justice: Christians called to fight poverty, inequality, discrimination — e.g. Martin Luther King Jr.',
            'Forgiveness: central to Christian ethics — "forgive us our trespasses as we forgive those who trespass against us"',
            'Aid and development: Christian Aid, CAFOD, Tearfund — practical expression of Christian love (agape)',
          ]},
        ]},
        { title:'Islam: Beliefs & Teachings', icon:'☪️', topics:[
          { title:'Islamic Beliefs', points:[
            'Tawhid: oneness of Allah — the most fundamental belief; Allah has no partners, no equals, no form',
            'Risalah: prophethood — Allah communicated through prophets; Muhammad ﷺ is the final and seal of prophets',
            'Kutub: Holy Books — Torah (Musa/Moses), Zabur (Dawud/David), Injil (Isa/Jesus), Quran (Muhammad ﷺ)',
            'Malaikah (Angels): created from light; carry out Allah\'s commands (Jibril brought revelation; Mikail controls rain)',
            'Akhirah: life after death — accountability, Day of Judgement, Paradise (Jannah), Hellfire (Jahannam)',
          ]},
          { title:'Islamic Practices', points:[
            'Salah: 5 daily prayers (Fajr, Dhuhr, Asr, Maghrib, Isha); direction of Mecca (Qibla); preceded by Wudu',
            'Zakah: 2.5% of savings given to specified categories of recipients; purifies wealth; builds ummah solidarity',
            'Sawm: fasting during Ramadan — no food/drink/smoking from Fajr to Maghrib; spiritual discipline',
            'Hajj: pilgrimage to Mecca; wajib once in lifetime if able; key rituals: tawaf, sa\'i, standing at Arafah',
            'Jihad: greater (internal spiritual struggle against sin) vs lesser (physical defence — strict conditions)',
          ], examTips:[
            'Edexcel Islam: know Sunni AND Shia differences — e.g. Shia observe additional pillars (Khums, Imamate)',
            'Hajj question: list rituals in ORDER — Ihram → Mecca → tawaf → sa\'i → Mina → Arafah → Muzdalifah → Eid ul-Adha',
          ]},
        ]},
        { title:'Islam: Ethics & Issues', icon:'📿', topics:[
          { title:'Islamic Views on Life & Death', points:[
            'Sanctity of life: "Do not take a life which Allah has made sacred" (Quran 6:151)',
            'Abortion: most Muslims oppose (life begins at ensoulment — some say 40 days, others 120 days)',
            'Euthanasia: generally forbidden — only Allah gives and takes life; palliative care encouraged',
            'Capital punishment: permitted in Islamic law for hudud offences (murder, apostasy) under strict conditions',
            'Khalifah: humans are stewards of Allah\'s creation — implications for environmental ethics',
          ]},
          { title:'Islamic Views on Peace & Justice', points:[
            'Adl (justice): central Islamic value — social justice, economic justice, treatment of others',
            'Lesser jihad conditions (Islamic law): just cause, last resort, no harming civilians, proportionate response',
            'Nuclear weapons: widely opposed — disproportionate, indiscriminate harm to civilians',
            'Forgiveness and reconciliation: encouraged but justice must also be served; restorative justice principles',
            'Zakah and global poverty: obligation to redistribute wealth; Islamic Relief, Muslim Aid — practical action',
          ], examTips:[
            'Always include specific Quranic quotes or Hadith where possible — examiners reward precise religious evidence',
            'Compare Islamic and Christian views on same issue — shows broader RS skills and gets AO3 marks',
          ], workedExample:`12-mark question: "Religious people should always oppose euthanasia." Evaluate this view.
Agree (Muslim): Quran 6:151 — only Allah gives/takes life; euthanasia plays God; palliative care is sufficient alternative
Agree (Christian): Catholic: sanctity of life absolute; hospice movement (Christian origin) provides dignified alternative
Disagree: Quality of life argument — some argue a dignified death respects human dignity; situation ethics (Fletcher) — loving action may support euthanasia
Disagree: Some liberal Protestants accept passive euthanasia; Netherlands: legal euthanasia with safeguards
Conclusion: While most religious traditions oppose euthanasia on sanctity of life grounds, there is internal diversity and the debate remains complex — blanket statements oversimplify religious positions`},
        ]},
      ],
    }
  },
  environmental: {
    label:'Environmental Management', arabic:'الإدارة البيئية', icon:'🌿', color:'#15803D',
    boards: ['cie'],
    pastPapers: {
      cie: 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-environmental-management-0680/past-papers/',
    },
    chapters: {
      cie: [
        { title:'Atmosphere & Climate', icon:'☁️', topics:[
          { title:'Climate Change & The Atmosphere', points:[
            'Greenhouse effect: naturally occurring — CO₂, methane, water vapour trap heat, keeping Earth warm',
            'Enhanced greenhouse effect: human emissions amplify this → global warming',
            'Main greenhouse gases: CO₂ (burning fossil fuels), CH₄ (agriculture/landfill), N₂O (fertilisers)',
            'Effects of climate change: rising sea levels, more extreme weather, coral bleaching, species loss',
            'Responses: mitigation (reducing emissions) vs adaptation (adjusting to changes)',
          ]},
          { title:'Air Pollution', points:[
            'Primary pollutants: emitted directly — SO₂ (acid rain), CO (incomplete combustion), NOₓ',
            'Secondary pollutants: formed in atmosphere — ozone (O₃) at ground level, photochemical smog',
            'Acid rain: SO₂ + NOₓ + water → sulphuric/nitric acid → damages trees, aquatic life, buildings',
            'CFCs: destroy ozone layer → increased UV-B radiation → skin cancer, cataracts, reduced crop yields',
            'Solutions: catalytic converters, clean technology, renewable energy, regulations (Kyoto, Paris Agreement)',
          ], examTips:[
            'Distinguish between enhanced greenhouse effect (human-caused) and natural greenhouse effect (essential for life)',
            'Kyoto Protocol (1997) vs Paris Agreement (2015): Paris is more inclusive with national targets (NDCs)',
            'For "evaluate" questions: always consider economic costs of solutions vs environmental benefits',
          ]},
        ]},
        { title:'Water & Ecosystems', icon:'💧', topics:[
          { title:'Water Resources & Pollution', points:[
            'Hydrological cycle: evaporation → condensation → precipitation → runoff → infiltration',
            'Water stress: demand exceeds available supply — growing problem in arid regions',
            'Water pollution sources: agricultural runoff (fertilisers, pesticides), sewage, industrial effluent',
            'Eutrophication: excess nutrients → algal bloom → oxygen depletion → aquatic organisms die',
            'Water management: dams (HEP, irrigation), desalination, water recycling, water harvesting',
          ]},
          { title:'Ecosystems & Biodiversity', points:[
            'Ecosystem: community of organisms interacting with their physical environment',
            'Food chain: producers → primary consumers → secondary → tertiary; energy lost at each level',
            'Biodiversity: variety of species; high biodiversity = more resilient ecosystem',
            'Threats to biodiversity: habitat loss, invasive species, climate change, overexploitation, pollution',
            'Conservation strategies: national parks, wildlife corridors, captive breeding, international agreements (CITES)',
          ], examTips:[
            'Always give specific named examples — "Amazonian deforestation" is better than "deforestation"',
            'Food web question: if one species is removed, trace ALL effects through the web (not just one link)',
            'Eutrophication sequence: fertiliser runoff → algal bloom → blocks sunlight → aquatic plants die → bacteria decompose them → oxygen depleted → fish die (BOD increases)',
          ], workedExample:`Eutrophication case study: Norfolk Broads, UK
Cause: agricultural runoff from surrounding farmland (phosphates and nitrates)
Effect: algal blooms covering water surface → reduced light penetration → death of aquatic plants → bacteria consume oxygen → fish kills
Management: buffer strips along waterways, reduced fertiliser application, phosphate stripping at sewage works`},
        ]},
        { title:'Energy & Resources', icon:'⚡', topics:[
          { title:'Energy Sources', points:[
            'Non-renewable: coal, oil, natural gas, nuclear — finite; fossil fuels release CO₂',
            'Renewable: solar, wind, HEP, tidal, geothermal, biomass — replenish naturally',
            'Solar: clean, increasingly cheap, intermittent (no sun at night)',
            'Wind: clean, no fuel cost, intermittent, visual impact, affects birds',
            'HEP: reliable, clean operation, but dam building → flooding, habitat loss, displaced communities',
          ]},
          { title:'Resource Management & Sustainability', points:[
            'Sustainable development: "meets needs of present without compromising ability of future generations"',
            'Reduce-Reuse-Recycle hierarchy: reduce consumption first, then reuse, then recycle as last resort',
            'Soil degradation: overgrazing, deforestation, poor irrigation → erosion, salinisation, desertification',
            'Deforestation causes: commercial logging, agricultural clearance, population growth, infrastructure',
            'Sustainable forestry: selective logging, replanting, FSC certification, agroforestry',
          ], examTips:[
            'Sustainability questions: always show awareness of social, economic AND environmental dimensions (triple bottom line)',
            'Energy question structure: name source → how energy is generated → advantages → disadvantages → suitability',
          ], workedExample:`Compare solar and HEP as energy sources:
Solar: Uses photovoltaic cells/thermal collectors. Advantages: no emissions, low running cost, modular. Disadvantages: intermittent, large land area, costly to install.
HEP: Flowing water drives turbines. Advantages: reliable, large capacity, long lifespan. Disadvantages: dam construction floods valleys, displaces communities, affects fish migration.
Suitability: HEP best for countries with large rivers (e.g. Brazil); solar best for sunny, arid regions (e.g. Saudi Arabia)`},
        ]},
        { title:'Human Impact & Solutions', icon:'🌍', topics:[
          { title:'Population & Development', points:[
            'World population: 8 billion and growing — most growth in LICs',
            'Carrying capacity: maximum population an area can sustainably support',
            'Urbanisation: more than half world now in cities; creates pressure on resources and services',
            'Ecological footprint: measure of human demand on natural resources',
            'HDI and development: higher development generally means higher resource consumption',
          ]},
          { title:'Managing Human Impact', points:[
            'Environmental impact assessment (EIA): evaluate effects of proposed development before it starts',
            'International agreements: Paris Agreement (climate), CBD (biodiversity), CITES (wildlife trade)',
            'Carbon footprint: total greenhouse gas emissions caused by an individual, event, or organisation',
            'Carbon offsetting: compensating for emissions by funding equivalent CO₂ reductions elsewhere',
            'Green technology: electric vehicles, LED lighting, smart grids, carbon capture and storage',
          ]},
        ]},
      ],
    }
  },
  spanish: {
    label:'Spanish', arabic:'الإسبانية', icon:'🇪🇸', color:'#C0392B',
    boards: ['cie','edexcel'],
    pastPapers: {
      cie:     'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-spanish-0530/past-papers/',
      edexcel: 'https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-spanish-2017.coursematerials.html',
      oxford:  '#',
    },
    chapters: {
      cie: [
        { title:'Listening & Reading', icon:'👂', topics:[
          { title:'Understanding Spoken Spanish', points:[
            'Listen for gist first — get the main idea before details',
            'Key question words: ¿qué? (what), ¿quién? (who), ¿dónde? (where), ¿cuándo? (when), ¿por qué? (why), ¿cómo? (how)',
            'Cognates (similar to English) help — e.g. información, importante, hospital',
            'Watch for negatives (no, nunca, nada, nadie) which change the meaning completely',
            'In dictation: listen for accents and spelling — pay attention to familiar vs. unfamiliar words',
          ], examTips:[
            'Read the question before listening — know what to listen for',
            'In multiple choice, eliminate obviously wrong options first',
            'For gap-fill, check if answer should be a noun, verb, or adjective',
          ]},
          { title:'Reading Comprehension', points:[
            'Scan for specific information: names, numbers, dates, and opinions',
            'Understand tense changes — present vs. past vs. future changes the meaning',
            'Negatives: no (not), nunca (never), nada (nothing), nadie (nobody), ningún (none)',
            'Adjective agreement: adjective must match gender and number (e.g. casas bonitas)',
            'Common false friends: embarazada (pregnant, not embarrassed); realizar (to achieve, not to realise)',
          ]},
        ]},
        { title:'Speaking & Writing', icon:'🗣️', topics:[
          { title:'Speaking Exam Skills', points:[
            'Role-play: use set phrases — Me gustaría... (I would like), ¿Podría...? (Could I...?)',
            'Photo card: describe what you see, give opinions, answer questions',
            'General conversation: prepare topics — school, free time, holidays, environment, technology',
            'Use a range of tenses — present, preterite, imperfect, future, conditional for higher marks',
            'Opinions: en mi opinión, creo que, pienso que, me parece que + adjective/clause',
          ], examTips:[
            'Don\'t leave silence — say "Hmm, es una buena pregunta..." to buy thinking time',
            'Extend answers by giving reasons: porque, así que, por lo tanto',
            'Use connectives: también (also), sin embargo (however), aunque (although), además (furthermore)',
          ], commonMistakes:[
            'Forgetting ser vs estar: ser = permanent characteristics; estar = temporary states/location',
            'Using present tense for past events — learn preterite endings (hablé, comí, viví)',
            'Gender errors: el agua is feminine but uses "el" for phonetic reasons',
          ]},
          { title:'Writing Skills', points:[
            'Structure: introduction → main points with examples → conclusion',
            'Tenses to include: present (hablo), preterite (hablé), imperfect (hablaba), future (hablaré), conditional (hablaría)',
            'Agreement: adjectives and articles agree with noun gender and number',
            'Subjunctive (higher): espero que + subjunctive, quiero que + subjunctive',
            'Check: subject-verb agreement, accents (á, é, í, ó, ú), question marks ¿?, exclamation ¡!',
          ]},
        ]},
        { title:'Grammar Essentials', icon:'📚', topics:[
          { title:'Verb Tenses', points:[
            'Present: regular -AR (hablo, hablas, habla, hablamos, habláis, hablan)',
            'Preterite (completed past): hablé, hablaste, habló, hablamos, hablasteis, hablaron',
            'Imperfect (ongoing past): hablaba, hablabas, hablaba, hablábamos... — used for descriptions',
            'Future: hablaré, hablarás, hablará — OR ir + a + infinitive (voy a hablar)',
            'Conditional: hablaría, hablarías — used for hypothetical situations (I would speak)',
          ], examTips:[
            'Learn the irregulars: ser/estar, ir, tener, hacer, poder, querer, venir — they are very common',
            'Preterite vs imperfect: preterite for single completed actions; imperfect for habits/descriptions',
          ], workedExample:`Preterite of IR (irregular — same as ser):
fui, fuiste, fue, fuimos, fuisteis, fueron
"Yesterday I went to school" → Ayer fui al colegio.`},
          { title:'Nouns, Articles & Adjectives', points:[
            'Nouns: masculine (el libro, los libros) or feminine (la casa, las casas)',
            'Indefinite articles: un/una (a), unos/unas (some)',
            'Adjectives after noun (usually): la casa roja, los libros interesantes',
            'Comparatives: más...que (more than), menos...que (less than), tan...como (as...as)',
            'Superlatives: el/la más + adjective + de (the most...in/of)',
          ]},
        ]},
        { title:'Topics & Vocabulary', icon:'🌍', topics:[
          { title:'Key IGCSE Topics', points:[
            'Identity & culture: family, relationships, social media, customs, festivals',
            'Local, national, international: environmental problems, global issues, travel, tourism',
            'Current & future study: school life, subjects, future plans, employment',
            'Lifestyle: health, diet, sport, leisure activities, technology',
            'Expressing preferences: prefiero (I prefer), me encanta (I love), no me gusta (I don\'t like)',
          ]},
        ]},
      ],
    },
  },
};

// ════════════════════════════════════════════════════════════
//  IGCSE FORMULA SHEETS
// ════════════════════════════════════════════════════════════
const IGCSE_FORMULAS = {
  maths: [
    { title:'Number', icon:'🔢', items:[
      'Standard form: A × 10ⁿ  (1 ≤ A < 10)',
      'Percentage change = (change ÷ original) × 100%',
      'Compound interest: A = P(1 + r/100)ⁿ',
      'Reverse %: original = value ÷ (1 ± r/100)',
      'HCF & LCM: use prime factor trees',
      'Ratio a:b → fractions a/(a+b) and b/(a+b)',
    ]},
    { title:'Algebra', icon:'📈', items:[
      'Quadratic formula: x = (−b ± √(b²−4ac)) / 2a',
      'Discriminant: b²−4ac  >0 two roots, =0 one, <0 none',
      'Difference of squares: a²−b² = (a+b)(a−b)',
      'Sum of roots: α+β = −b/a  |  Product: αβ = c/a',
      'Index laws: aᵐ×aⁿ=aᵐ⁺ⁿ, aᵐ÷aⁿ=aᵐ⁻ⁿ, (aᵐ)ⁿ=aᵐⁿ, a⁻ⁿ=1/aⁿ, a^(1/n)=ⁿ√a',
      'Arithmetic nth term: a + (n−1)d',
      'Geometric nth term: arⁿ⁻¹',
    ]},
    { title:'Coordinate Geometry', icon:'📍', items:[
      'Gradient: m = (y₂−y₁)/(x₂−x₁)',
      'Equation of line: y = mx + c  or  y−y₁ = m(x−x₁)',
      'Distance: d = √((x₂−x₁)² + (y₂−y₁)²)',
      'Midpoint: ((x₁+x₂)/2 , (y₁+y₂)/2)',
      'Perpendicular gradients: m₁ × m₂ = −1',
      'Circle: (x−a)² + (y−b)² = r²',
    ]},
    { title:'Geometry & Mensuration', icon:'📐', items:[
      'Area: triangle ½bh, trapezium ½(a+b)h, circle πr²',
      'Circumference: C = 2πr  |  Arc length: (θ/360)×2πr',
      'Sector area: (θ/360)×πr²',
      'Volume: cuboid lwh, cylinder πr²h, cone ⅓πr²h, sphere (4/3)πr³, pyramid ⅓Bh',
      'Surface area: cylinder 2πrh+2πr², cone πrl+πr², sphere 4πr²',
      'Pythagoras: a²+b²=c² (c = hypotenuse)',
      'Exterior angle of polygon = 360°/n  |  Interior = (n−2)×180°/n',
    ]},
    { title:'Trigonometry', icon:'📐', items:[
      'SOH: sin θ = Opp/Hyp  |  CAH: cos θ = Adj/Hyp  |  TOA: tan θ = Opp/Adj',
      'Sine rule: a/sinA = b/sinB = c/sinC',
      'Cosine rule: a² = b²+c²−2bc cosA  →  cosA = (b²+c²−a²)/2bc',
      'Area of triangle: ½ab sinC',
      'Exact values: sin30=½, cos30=√3/2, tan30=1/√3, sin45=cos45=1/√2, sin60=√3/2, cos60=½',
    ]},
    { title:'Vectors', icon:'↗️', items:[
      'Column vector: (x y) — add components to add vectors',
      'Magnitude: |a| = √(x²+y²)',
      'AB = OB − OA (using position vectors)',
      'Scalar multiple: k(x y) = (kx ky)',
    ]},
    { title:'Probability & Statistics', icon:'📊', items:[
      'P(A) = favourable ÷ total  |  0 ≤ P(A) ≤ 1',
      'P(not A) = 1 − P(A)',
      'P(A and B) = P(A) × P(B) — independent events',
      'P(A or B) = P(A) + P(B) − P(A and B)',
      'Mean of grouped data: Σfx / Σf',
      'Frequency density = frequency ÷ class width (histograms)',
      'IQR = Q3 − Q1',
    ]},
  ],
  add_maths: [
    { title:'Differentiation', icon:'∂', items:[
      'd/dx(xⁿ) = nxⁿ⁻¹',
      'd/dx(eˣ) = eˣ  |  d/dx(e^(ax)) = ae^(ax)',
      'd/dx(ln x) = 1/x',
      'd/dx(sin x) = cos x  |  d/dx(cos x) = −sin x  |  d/dx(tan x) = sec²x',
      'Chain rule: d/dx f(g(x)) = f\'(g(x))·g\'(x)',
      'Product rule: (uv)\' = u\'v + uv\'',
      'Quotient rule: (u/v)\' = (u\'v − uv\')/v²',
    ]},
    { title:'Integration', icon:'∫', items:[
      '∫xⁿ dx = xⁿ⁺¹/(n+1) + c  (n ≠ −1)',
      '∫1/x dx = ln|x| + c',
      '∫eˣ dx = eˣ + c  |  ∫e^(ax) dx = (1/a)e^(ax) + c',
      '∫sin x dx = −cos x + c  |  ∫cos x dx = sin x + c',
      'Definite integral: ∫ᵃᵇ f(x)dx = F(b) − F(a)',
      'Area between curve and x-axis = |∫ᵃᵇ f(x)dx|',
    ]},
    { title:'Logarithms', icon:'log', items:[
      'log_a(b) = c  ↔  aᶜ = b',
      'log(xy) = log x + log y',
      'log(x/y) = log x − log y',
      'log(xⁿ) = n log x',
      'Change of base: log_a(b) = log b / log a',
      'ln x = log_e x  |  e ≈ 2.718',
    ]},
    { title:'Trigonometric Identities', icon:'📐', items:[
      'sin²θ + cos²θ = 1',
      '1 + tan²θ = sec²θ',
      '1 + cot²θ = cosec²θ',
      'sin(A±B) = sinA cosB ± cosA sinB',
      'cos(A±B) = cosA cosB ∓ sinA sinB',
      'tan(A±B) = (tanA ± tanB)/(1 ∓ tanA tanB)',
      'sin 2A = 2 sinA cosA  |  cos 2A = cos²A − sin²A = 1−2sin²A = 2cos²A−1',
    ]},
    { title:'Binomial Theorem', icon:'Σ', items:[
      '(a+b)ⁿ = Σ [ⁿCr · aⁿ⁻ʳ · bʳ]  for r = 0 to n',
      'General term Tᵣ₊₁ = ⁿCr · aⁿ⁻ʳ · bʳ',
      'ⁿCr = n! / (r!(n−r)!)',
      'Permutations: ⁿPr = n!/(n−r)!  — order matters',
      'Circular arrangements: (n−1)!',
    ]},
    { title:'Surds & Indices', icon:'√', items:[
      '√(ab) = √a × √b  |  √(a/b) = √a/√b',
      'Rationalise: multiply by conjugate (a−√b) when denominator is a+√b',
      'a^(m/n) = (ⁿ√a)ᵐ  |  a⁰ = 1  |  a⁻ⁿ = 1/aⁿ',
    ]},
  ],
  physics: [
    { title:'Motion', icon:'🚀', items:[
      'v = u + at',
      's = ut + ½at²',
      'v² = u² + 2as',
      's = ½(u+v)t',
      'speed = distance ÷ time',
      'acceleration = (v−u)/t  (m/s²)',
    ]},
    { title:'Forces & Pressure', icon:'💪', items:[
      'F = ma  (Newton\'s 2nd law)',
      'W = mg  (weight; g = 10 N/kg)',
      'Momentum: p = mv  |  F = Δp/Δt',
      'Pressure: P = F/A  (Pascals = N/m²)',
      'Fluid pressure: P = ρgh',
      'Moment = F × d  (perpendicular distance)',
    ]},
    { title:'Energy, Work & Power', icon:'⚡', items:[
      'Work done: W = Fd cos θ  (joules)',
      'KE = ½mv²',
      'GPE = mgh',
      'Power: P = W/t = Fv  (watts)',
      'Efficiency = (useful output ÷ total input) × 100%',
      'Conservation: total energy = constant',
    ]},
    { title:'Waves', icon:'〰️', items:[
      'v = fλ  (wave speed = frequency × wavelength)',
      'T = 1/f  (period = 1/frequency)',
      'n = c/v  (refractive index)',
      'n₁ sin θ₁ = n₂ sin θ₂  (Snell\'s law)',
      'sin(critical angle) = 1/n',
    ]},
    { title:'Electricity', icon:'🔌', items:[
      'V = IR  (Ohm\'s law)',
      'P = IV = I²R = V²/R',
      'Q = It  (charge in coulombs)',
      'E = QV = Pt = IVt',
      'Series: R_total = R₁+R₂+...  |  V_total = V₁+V₂',
      'Parallel: 1/R = 1/R₁+1/R₂  |  I_total = I₁+I₂',
      'Transformer: Vₚ/Vₛ = Nₚ/Nₛ  |  VₚIₚ = VₛIₛ (ideal)',
    ]},
    { title:'Thermal & Nuclear', icon:'🌡️', items:[
      'Q = mcΔT  (specific heat capacity)',
      'Q = mL  (specific latent heat)',
      'Pressure law: P/T = constant (fixed volume)',
      'Activity: A = ΔN/Δt  (decays per second, Becquerels)',
      'Half-life: A = A₀ × (½)^(t/t½)',
    ]},
  ],
  chemistry: [
    { title:'Moles & Calculations', icon:'⚗️', items:[
      'n = m/Mr  (moles = mass ÷ molar mass)',
      'n = V/24  (gas at RTP, volume in dm³)',
      'n = cV  (concentration × volume in dm³)',
      'c = n/V  (mol/dm³)',
      'Empirical formula: divide % by Ar, then divide by smallest',
      '% yield = (actual ÷ theoretical) × 100%',
      'Atom economy = (Mr of desired ÷ Mr of all products) × 100%',
    ]},
    { title:'Energy & Rates', icon:'🔥', items:[
      'ΔH = Σ(bond energies broken) − Σ(bond energies formed)',
      'Exothermic: ΔH < 0  |  Endothermic: ΔH > 0',
      'Rate = amount of reactant used (or product formed) ÷ time',
      'Activation energy = minimum energy for reaction to occur',
    ]},
    { title:'Key Equations', icon:'🧪', items:[
      'Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
      'Respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O',
      'Neutralisation: H⁺ + OH⁻ → H₂O',
      'Combustion of methane: CH₄ + 2O₂ → CO₂ + 2H₂O',
      'Electrolysis of water: 2H₂O → 2H₂ + O₂',
      'Haber process: N₂ + 3H₂ ⇌ 2NH₃  (450°C, 200 atm, Fe catalyst)',
      'Contact process: 2SO₂ + O₂ ⇌ 2SO₃  (450°C, V₂O₅ catalyst)',
    ]},
    { title:'Tests & Identification', icon:'🔬', items:[
      'Starch: iodine → blue-black',
      'Reducing sugar: Benedict\'s → brick-red precipitate',
      'Protein: Biuret → purple',
      'Fat: ethanol emulsion → white',
      'H₂ gas: lit splint → squeaky pop',
      'CO₂ gas: limewater → turns milky',
      'O₂ gas: glowing splint → relights',
      'NH₃ gas: damp red litmus → turns blue',
      'Cl₂ gas: damp blue litmus → turns red then bleaches',
      'Halide ions: AgNO₃ → Cl⁻(white), Br⁻(cream), I⁻(yellow) precipitate',
    ]},
    { title:'Ion Tests', icon:'⚛️', items:[
      'Cu²⁺: NaOH → blue ppt; flame → green',
      'Fe²⁺: NaOH → green ppt',
      'Fe³⁺: NaOH → brown/rust ppt',
      'Al³⁺: NaOH → white ppt, dissolves in excess NaOH',
      'Ca²⁺: NaOH → white ppt; flame → brick red',
      'NH₄⁺: NaOH + heat → NH₃ gas (turns damp red litmus blue)',
      'CO₃²⁻: HCl → CO₂ gas (turns limewater milky)',
      'SO₄²⁻: HCl + BaCl₂ → white ppt (BaSO₄)',
    ]},
  ],
  cs: [
    { title:'Number Systems', icon:'💾', items:[
      'Binary (base 2): place values 128, 64, 32, 16, 8, 4, 2, 1',
      'Hex (base 16): 0–9, A=10, B=11, C=12, D=13, E=14, F=15',
      '1 hex digit = 4 binary bits (nibble)',
      'Binary → hex: group 4 bits from right, convert each group',
      'File size (image) = width × height × colour depth (bits)',
      'File size (sound) = sample rate × bit depth × duration (s)',
      '1 byte = 8 bits | 1 KB = 1024 B | 1 MB = 1024 KB | 1 GB = 1024 MB',
    ]},
    { title:'Logic Gates', icon:'⚙️', items:[
      'AND gate: output 1 only if BOTH inputs are 1',
      'OR gate: output 1 if AT LEAST ONE input is 1',
      'NOT gate: inverts input (0→1, 1→0)',
      'NAND = NOT AND | NOR = NOT OR | XOR = 1 if inputs DIFFER',
      'Boolean: AND = A·B | OR = A+B | NOT = Ā',
    ]},
    { title:'Algorithms & Complexity', icon:'🔁', items:[
      'Linear search: O(n) — checks each item one by one',
      'Binary search: O(log n) — halves search space each step; requires sorted list',
      'Bubble sort: O(n²) — compare adjacent pairs, repeat n−1 passes',
      'Merge sort: O(n log n) — divide and merge; more efficient for large data',
      'Insertion sort: O(n²) worst, O(n) best (nearly sorted)',
    ]},
    { title:'Networking', icon:'🌐', items:[
      'IP address: unique identifier for device on network',
      'TCP/IP: reliable transmission; breaks data into packets',
      'HTTP = HyperText Transfer Protocol | HTTPS = secure (encrypted)',
      'DNS: Domain Name System — converts URL to IP address',
      'Bandwidth = data per second | Latency = delay in ms',
      'LAN = Local Area Network | WAN = Wide Area Network',
    ]},
    { title:'Programming Reference', icon:'📝', items:[
      'MOD: remainder after division (e.g. 17 MOD 5 = 2)',
      'DIV: integer division (e.g. 17 DIV 5 = 3)',
      'String operations: LENGTH, SUBSTRING, UPPER, LOWER, CONCAT',
      'Array: fixed-size indexed collection; index from 0 (or 1 in some pseudocode)',
      'Pseudocode: WHILE cond DO | FOR i ← 1 TO n | IF cond THEN | CASE OF',
    ]},
  ],
  ict: [
    { title:'File Sizes & Data', icon:'💾', items:[
      'Image file size = width (px) × height (px) × colour depth (bits) ÷ 8 (bytes)',
      'Sound file size = sample rate (Hz) × bit depth × duration (s) ÷ 8 (bytes)',
      'Video file size = frame rate × resolution × colour depth × duration ÷ 8',
      '1 KB = 1024 B | 1 MB = 1024 KB | 1 GB = 1024 MB | 1 TB = 1024 GB',
      'Compression reduces file size: lossless (exact copy) vs lossy (removes data)',
    ]},
    { title:'Spreadsheet Functions', icon:'📊', items:[
      '=SUM(A1:A10) — adds range',
      '=AVERAGE(A1:A10) — arithmetic mean',
      '=MAX(A1:A10) | =MIN(A1:A10)',
      '=IF(condition, value_if_true, value_if_false)',
      '=VLOOKUP(lookup, table_range, col_index, FALSE)',
      '=COUNT(range) — counts numbers | =COUNTA — counts non-empty',
      'Absolute reference: $A$1 (fixed) | Relative: A1 (changes when copied)',
    ]},
    { title:'Network & Security', icon:'🔒', items:[
      'Bandwidth (Mbps) = data transferred ÷ time',
      'Transmission time = file size ÷ bandwidth',
      'Encryption: scrambles data; only decrypted with correct key',
      'Firewall: monitors incoming/outgoing traffic; blocks unauthorised',
      'Two-factor authentication (2FA): password + second factor (SMS, app)',
      'Phishing: fake emails/sites to steal credentials',
    ]},
    { title:'Database Terms', icon:'🗄️', items:[
      'Primary key: unique identifier for each record',
      'Foreign key: links two tables (matches primary key in another table)',
      'Query: retrieves specific records using criteria (WHERE, AND, OR)',
      'Field: column (attribute) | Record: row (one entry) | Table: collection of records',
      'Validation: checks data is acceptable type/range/format before entry',
      'Verification: checks data entered matches source document',
    ]},
  ],
  english: [
    { title:'Language Techniques', icon:'✍️', items:[
      'Simile: comparison using "like" or "as" — "as cold as ice"',
      'Metaphor: direct comparison — "Life is a journey"',
      'Personification: human qualities to non-human — "the wind whispered"',
      'Alliteration: same initial sound — "Peter Piper picked..."',
      'Onomatopoeia: word sounds like meaning — crash, sizzle, murmur',
      'Hyperbole: extreme exaggeration — "I\'ve told you a million times"',
      'Oxymoron: contradictory terms together — "deafening silence"',
      'Pathetic fallacy: nature reflects mood — "dark storm clouds gathered as she wept"',
    ]},
    { title:'Structural Techniques', icon:'📄', items:[
      'Enjambment: sentence runs over line break (poetry)',
      'Caesura: mid-line pause (marked by punctuation)',
      'Flashback/flash-forward: non-linear time structure',
      'In media res: starting in the middle of the action',
      'Circular structure: ending mirrors opening',
      'Repetition: emphasise key idea, create rhythm or tone',
      'Tricolon (tripling): list of three — "fast, fierce, and furious"',
    ]},
    { title:'Persuasion Toolkit (DAFOREST)', icon:'🗣️', items:[
      'D — Direct address: "You need to act now"',
      'A — Alliteration: "Bold, brave, and brilliant"',
      'F — Facts & statistics: "40% of teens..."',
      'O — Opinion stated as fact: "It is clear that..."',
      'R — Rhetorical question: "How can we ignore this?"',
      'E — Emotive language: "devastating", "heartbreaking"',
      'S — Simile/story/anecdote: personal example',
      'T — Tripling: "faster, cleaner, better"',
    ]},
    { title:'Essay Structure', icon:'📋', items:[
      'PEEL: Point → Evidence (quote) → Explain → Link back',
      'SEXY: Statement → Example → eXplain → sYntax comment',
      'Introduction: context + thesis/clear argument',
      'Body paragraphs: one point each, fully developed',
      'Counterargument: "However, others argue..." then refute',
      'Conclusion: summarise + restate argument + wider significance',
    ]},
  ],
  history: [
    { title:'Key Dates — WWI & Inter-War', icon:'📅', items:[
      '1914: WWI begins | 1918: Armistice (end of WWI)',
      'Jan 1919: Paris Peace Conference opens',
      'June 1919: Treaty of Versailles signed',
      '1920: League of Nations established (USA did NOT join)',
      '1923: Beer Hall Putsch (Hitler\'s failed coup)',
      '1929: Wall Street Crash → Great Depression',
      '1933: Hitler becomes Chancellor of Germany',
    ]},
    { title:'Key Dates — WWII & Cold War', icon:'📅', items:[
      '1 Sept 1939: Germany invades Poland → WWII begins',
      '1940: Battle of Britain | June 1941: Operation Barbarossa',
      'Dec 1941: Pearl Harbor → USA enters WWII',
      'June 1944: D-Day | May 1945: VE Day | Aug 1945: VJ Day',
      '1947: Truman Doctrine + Marshall Plan',
      '1948–49: Berlin Blockade & Airlift',
      'Oct 1962: Cuban Missile Crisis (13 days)',
      'Nov 1989: Berlin Wall falls | Dec 1991: USSR dissolves',
    ]},
    { title:'Source Evaluation (OPCVL)', icon:'📜', items:[
      'O — Origin: Who made it? When? Where?',
      'P — Purpose: Why was it created? To inform, persuade, record?',
      'C — Content: What does it actually say/show?',
      'V — Value: What useful information does it give historians?',
      'L — Limitation: What does it NOT tell us? Any bias?',
      'Always: quote from source + use own knowledge to cross-reference',
    ]},
    { title:'Essay Frameworks', icon:'📝', items:[
      'PEEL: Point → Evidence (specific fact/date) → Explain → Link',
      'Causation: long-term, short-term, trigger/immediate cause',
      '"How far..." questions: argue BOTH sides, then reach judgement',
      'Significance: what changed as a result? Why does it matter?',
      'Avoid narrative — always analyse: "This shows that..." / "This led to..."',
    ]},
  ],
  economics: [
    { title:'Key Formulas', icon:'📐', items:[
      'PED = % ΔQd ÷ % ΔP  (ignore sign; negative relationship)',
      'PES = % ΔQs ÷ % ΔP  (always positive)',
      'XED = % ΔQd(A) ÷ % ΔP(B)  (+ve = substitutes; −ve = complements)',
      'YED = % ΔQd ÷ % ΔIncome  (+ve = normal good; −ve = inferior good)',
      'Total Revenue = Price × Quantity',
      'Profit = Total Revenue − Total Cost',
      'Real GDP = Nominal GDP ÷ Price Index × 100',
      'Unemployment rate = (Unemployed ÷ Labour Force) × 100',
      'Inflation rate = ((CPI this yr − CPI last yr) ÷ CPI last yr) × 100',
    ]},
    { title:'Market Diagrams', icon:'📈', items:[
      'Demand curve: downward sloping (price↑ → Qd↓)',
      'Supply curve: upward sloping (price↑ → Qs↑)',
      'Equilibrium: intersection of D and S curves',
      'Demand shift right: income↑, tastes, substitutes↑, complements↓, population↑',
      'Supply shift right: costs↓, technology↑, subsidies, favourable weather',
      'Maximum price (ceiling) < equilibrium → shortage',
      'Minimum price (floor) > equilibrium → surplus',
    ]},
    { title:'Macroeconomic Concepts', icon:'🏛️', items:[
      'GDP: total value of goods and services produced in a country in one year',
      'Economic growth: % change in real GDP',
      'Fiscal policy: government spending (G) and taxation (T)',
      'Budget deficit: G > T;  Budget surplus: T > G',
      'Monetary policy: interest rates set by central bank',
      'Lower interest rates → cheaper borrowing → ↑ consumption + investment',
      'Multiplier effect: initial injection leads to larger rise in national income',
    ]},
    { title:'International Trade', icon:'🌍', items:[
      'Comparative advantage: produce where opportunity cost is lowest',
      'Current account = trade in goods + trade in services + income + transfers',
      'Exchange rate appreciation → exports more expensive, imports cheaper',
      'Exchange rate depreciation → exports cheaper, imports more expensive',
      'Tariff = import tax; Quota = quantity limit on imports',
      'HDI = average of (income index, life expectancy index, education index)',
    ]},
  ],
  business: [
    { title:'Finance Formulas', icon:'💰', items:[
      'Profit = Total Revenue − Total Costs',
      'Total Revenue = Price × Quantity sold',
      'Total Cost = Fixed Costs + Variable Costs',
      'Average Cost = Total Cost ÷ Output',
      'Contribution per unit = Selling Price − Variable Cost per unit',
      'Break-even output = Fixed Costs ÷ Contribution per unit',
      'Margin of Safety = Current Output − Break-even Output',
      'Gross Profit Margin = (Gross Profit ÷ Revenue) × 100',
      'Net Profit Margin = (Net Profit ÷ Revenue) × 100',
    ]},
    { title:'Cash Flow', icon:'💸', items:[
      'Net Cash Flow = Total Inflows − Total Outflows (for the period)',
      'Closing Balance = Opening Balance + Net Cash Flow',
      'Cash flow ≠ profit (timing differences between earning and receiving)',
      'Cash flow problem: solutions = overdraft, cut costs, delay payments, speed up receipts',
      'Working capital = Current Assets − Current Liabilities',
    ]},
    { title:'Marketing Metrics', icon:'📣', items:[
      'Market share = (Firm\'s sales ÷ Total market sales) × 100',
      'Market growth rate = ((New size − Old size) ÷ Old size) × 100',
      'Price elasticity of demand: applies to pricing strategy decisions',
      'Penetration pricing: low price to enter market; Skimming: high initial price',
      'Cost-plus pricing: unit cost + % mark-up = selling price',
    ]},
    { title:'People & Operations', icon:'👥', items:[
      'Labour productivity = Output ÷ Number of workers',
      'Labour turnover = (Staff leaving ÷ Average staff) × 100',
      'Absenteeism rate = (Days absent ÷ Total days) × 100',
      'Capacity utilisation = (Actual output ÷ Maximum output) × 100',
      'Inventory turnover = Cost of Sales ÷ Average Inventory',
      'Maslow\'s hierarchy: physiological → safety → social → esteem → self-actualisation',
      'Herzberg: motivators (achievement, recognition) vs hygiene factors (pay, conditions)',
    ]},
  ],
  literature: [
    { title:'Poetry Techniques', icon:'✍️', items:[
      'Simile: comparison using "like" or "as" — "My love is like a red, red rose"',
      'Metaphor: direct comparison, says one thing IS another — "Life is a journey"',
      'Personification: human qualities given to non-human — "The wind howled"',
      'Alliteration: repeated initial consonant — "Peter Piper picked..."',
      'Sibilance: repeated "s" sounds — creates hissing, sinister effect',
      'Assonance: repeated vowel sounds — creates mood and rhythm',
      'Onomatopoeia: word sounds like the thing — "buzz", "crash", "whisper"',
      'Enjambment: line runs over without pause — creates pace or sudden turn',
      'Caesura: pause mid-line (punctuation) — creates hesitation or impact',
      'Volta: turning point in a poem (often in sonnets at line 9 or 13)',
    ]},
    { title:'Structural & Narrative Techniques', icon:'📖', items:[
      'Iambic pentameter: da-DUM ×5 per line (Shakespeare\'s default metre)',
      'Sonnet: 14 lines; Petrarchan (8+6), Shakespearean (3×4+couplet)',
      'Free verse: no fixed rhyme or rhythm — mirrors natural speech',
      'Dramatic monologue: single speaker reveals character (Browning)',
      'Stream of consciousness: unfiltered inner thoughts (Woolf, Joyce)',
      'In media res: story begins in the middle of action',
      'Tragic structure: exposition → rising action → climax → reversal → catastrophe',
    ]},
    { title:'Essay Frameworks', icon:'📝', items:[
      'PEA: Point → Evidence (short quote) → Analysis (effect on reader)',
      'PETAL: Point → Evidence → Technique → Analysis → Link',
      '"Shakespeare presents X as Y by using Z, which creates the effect of..."',
      'Opening: avoid "In this essay I will..." — begin with argument directly',
      'Comparison connectives: Similarly / In contrast / Both / Whereas / However',
      'Thesis statement: clear argument in first paragraph — "Priestley uses Birling to critique capitalist selfishness"',
    ]},
    { title:'Key Terminology', icon:'📚', items:[
      'Protagonist: main character | Antagonist: opposing character',
      'Foil: character who contrasts another to highlight qualities (e.g. Laertes vs Hamlet)',
      'Motif: recurring symbol or idea throughout the text',
      'Hubris: excessive pride that leads to downfall (Greek tragedy)',
      'Catharsis: emotional release felt by audience at end of tragedy',
      'Dramatic irony: audience knows something characters do not',
      'Pathetic fallacy: weather/environment reflects character mood — "dark and stormy night"',
    ]},
  ],
  psychology: [
    { title:'Key Studies Reference', icon:'🔬', items:[
      'Milgram (1963): 65% delivered 450V shocks; obedience to authority; agency theory',
      'Asch (1951): 75% conformed at least once to wrong line; normative influence',
      'Bandura (1961): Bobo doll; children imitate aggressive models; social learning',
      'Pavlov (dogs): classical conditioning; UCS → UCR; CS → CR after pairing',
      'Loftus & Palmer (1974): "smashed" → higher speed estimates; memory reconstruction',
      'Peterson & Peterson (1959): trigrams; 90% forgotten in 18s without rehearsal; decay theory',
      'Dement & Kleitman (1957): EEG sleep study; REM associated with dreaming',
      'Binet: first IQ test (1905); mental age ÷ chronological age × 100',
    ]},
    { title:'Research Methods', icon:'📊', items:[
      'IV (Independent Variable): what researcher changes/manipulates',
      'DV (Dependent Variable): what is measured',
      'Control variables: all other factors kept constant',
      'Hypothesis: testable prediction; null hypothesis: no effect expected',
      'Random sampling: every member of population has equal chance — most representative',
      'Opportunity sampling: whoever is available — easiest but most biased',
      'Correlation: +1 (perfect positive) → 0 (no relationship) → −1 (perfect negative)',
      'Reliability: consistency; Validity: does it measure what it claims?',
    ]},
    { title:'Approaches & Theories', icon:'🧠', items:[
      'Biological: behaviour explained by genes, hormones, brain structures',
      'Behaviourist: all behaviour learned through conditioning (environment only)',
      'Cognitive: mental processes (memory, perception, thinking) explain behaviour',
      'Social Learning Theory (Bandura): observation + imitation + reinforcement',
      'Psychodynamic (Freud): unconscious mind, id/ego/superego, defence mechanisms',
      'Humanistic (Maslow): self-actualisation; hierarchy of needs',
    ]},
    { title:'Evaluation Acronyms', icon:'✅', items:[
      'GRAVE: Generalisation, Reliability, Application, Validity, Ethics',
      'Ecological validity: does lab setting reflect real life? Low = artificial',
      'Internal validity: did IV actually cause DV? Avoid confounding variables',
      'Ethics (BPS): informed consent, right to withdraw, confidentiality, no harm',
      'Strengths of experiments: control, replication, cause-and-effect conclusions',
      'Weaknesses: demand characteristics, social desirability bias, lab artificiality',
    ]},
  ],
  french: [
    { title:'Verb Tables', icon:'📝', items:[
      'AVOIR: ai, as, a, avons, avez, ont',
      'ÊTRE: suis, es, est, sommes, êtes, sont',
      'ALLER: vais, vas, va, allons, allez, vont',
      'FAIRE: fais, fais, fait, faisons, faites, font',
      'POUVOIR: peux, peux, peut, pouvons, pouvez, peuvent',
      'VOULOIR: veux, veux, veut, voulons, voulez, veulent',
      'PRENDRE: prends, prends, prend, prenons, prenez, prennent',
    ]},
    { title:'Tense Formulas', icon:'⏰', items:[
      'Passé composé: avoir/être (present) + past participle',
      'Être verbs (DR MRS VANDERTRAMP): Descendre, Rester, Monter, Retourner, Sortir, Venir, Aller, Naître, Devenir, Entrer, Rentrer, Tomber, Rester, Arriver, Mourir, Partir',
      'Imparfait: take nous present → remove -ons → add: ais, ais, ait, ions, iez, aient',
      'Futur simple: infinitive + ai, as, a, ons, ez, ont (drop -e from -re verbs)',
      'Conditionnel: infinitive + ais, ais, ait, ions, iez, aient',
      'Key irregular futures: être → ser- | avoir → aur- | aller → ir- | faire → fer-',
    ]},
    { title:'Opinion & Connective Phrases', icon:'💬', items:[
      'Opinions: À mon avis... | Je pense que... | Je trouve que... | Selon moi...',
      'Agreement: Je suis d\'accord | C\'est vrai | Exactement | Bien sûr',
      'Disagreement: Je ne suis pas d\'accord | Ce n\'est pas vrai | Au contraire',
      'Connectives: Cependant | Néanmoins | Par contre | D\'une part... d\'autre part',
      'Adding: De plus | En outre | Par ailleurs | Également | Aussi',
      'Conclusion: En conclusion | Pour conclure | En fin de compte | Finalement',
    ]},
    { title:'Common Topic Vocabulary', icon:'🗂️', items:[
      'Family: la famille, le frère, la sœur, les parents, le/la petit(e) ami(e)',
      'Environment: la pollution, le réchauffement climatique, recycler, les énergies renouvelables',
      'School: la matière, les devoirs, l\'emploi du temps, le/la professeur, l\'examen',
      'Health: la santé, une alimentation équilibrée, faire du sport, éviter le tabac',
      'Technology: le portable, les réseaux sociaux, Internet, télécharger, en ligne',
      'False friends: actuel = current (NOT actual) | sensible = sensitive (NOT sensible)',
    ]},
  ],
  geography: [
    { title:'Key Calculations', icon:'📐', items:[
      'Population density = Total population ÷ Area (km²)',
      'Population growth rate = ((P₂ − P₁) ÷ P₁) × 100',
      'Natural increase rate = Birth rate − Death rate (per 1000)',
      'Dependency ratio = ((Young + Elderly) ÷ Working age) × 100',
      'Infant mortality rate = (Deaths under 1 year ÷ Live births) × 1000',
      'Literacy rate = (Literate population ÷ Total population) × 100',
      'Urban growth rate = % increase in urban population per year',
    ]},
    { title:'Development Indicators', icon:'📊', items:[
      'HDI = average of health index + education index + income index (0–1 scale)',
      'GNI per capita: gross national income per person — used to classify HICs, MICs, LICs',
      'LIC: <$1,085/yr | MIC: $1,086–$13,205 | HIC: >$13,205 (World Bank, 2023)',
      'Life expectancy: years expected to live from birth; higher in HICs (~80) vs LICs (~60)',
      'Calorie intake: <2000 kcal/day = undernourishment; UK average ~2,200',
      'Access to clean water, doctors per 1000 people: also used as development measures',
    ]},
    { title:'Climate & Processes', icon:'🌍', items:[
      'Hydrological cycle: evaporation → condensation → precipitation → surface runoff / infiltration',
      'River discharge (Q) = Velocity (m/s) × Cross-sectional area (m²) — unit: cumecs (m³/s)',
      'Hjulström curve: competence vs velocity — larger/lighter sediment deposited at higher velocities',
      'Erosion processes: hydraulic action, abrasion, attrition, solution (corrosion)',
      'Landforms: V-valley, waterfall, meander, ox-bow lake, delta, flood plain',
      'Rock permeability: permeable (porous/pervious) vs impermeable → affects runoff and flooding',
    ]},
    { title:'Exam Frameworks', icon:'📝', items:[
      'GCSE Geography command words: describe (what), explain (why/how), compare (similarities AND differences), evaluate (make a judgement)',
      'Describe a graph: trend (overall direction) + data (quote figures) + anomalies',
      'Explain a cause: process → effect → further consequence (chain of reasoning)',
      'SPICED development framework: Social, Political, Infrastructure, Cultural, Economic, Demographic',
      'Case study format: location → facts/data → causes → effects → management/responses',
    ]},
  ],
  biology: [
    { title:'Key Formulas', icon:'🧬', items:[
      'Magnification = Image size ÷ Actual size',
      'Actual size = Image size ÷ Magnification',
      'Rate of photosynthesis: often measured as O₂ produced or CO₂ absorbed per unit time',
      'Rate of respiration: O₂ consumed or CO₂ released per unit time',
      'Percentage change = ((New − Original) ÷ Original) × 100',
      'Number of cells = Total length ÷ Average cell length (from scale bar)',
    ]},
    { title:'Photosynthesis & Respiration', icon:'🌿', items:[
      'Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light energy, chlorophyll)',
      'Aerobic respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP (energy)',
      'Anaerobic (animals): glucose → lactic acid + small amount of ATP',
      'Anaerobic (yeast/plants): glucose → ethanol + CO₂ + small amount of ATP',
      'Limiting factors for photosynthesis: light intensity, CO₂ concentration, temperature',
      'ATP: adenosine triphosphate — universal energy currency of the cell',
    ]},
    { title:'Genetics', icon:'🧬', items:[
      'Monohybrid cross: use Punnett square; 3:1 ratio in F2 for simple dominance',
      'Probability of offspring: count boxes in Punnett square showing that genotype',
      'Codominance: both alleles expressed (e.g. blood group AB = IAI B)',
      'Sex determination: females XX, males XY; sex-linked traits carried on X chromosome',
      'Hardy-Weinberg: p² + 2pq + q² = 1; p + q = 1 (p = dominant, q = recessive allele frequency)',
      'Mutation: permanent change in DNA base sequence; random and spontaneous; increased by mutagens',
    ]},
    { title:'Key Definitions & Units', icon:'📖', items:[
      'Osmosis: net movement of water molecules from high to low water potential through semi-permeable membrane',
      'Diffusion: net movement of molecules from high to low concentration (passive)',
      'Active transport: movement against concentration gradient; requires energy (ATP) + carrier proteins',
      'Enzyme: biological catalyst; specific to one substrate; active site fits substrate (lock & key)',
      'Enzyme optimum: pH ~7 for most; temperature ~37°C in humans; denatured above ~40°C',
      'Mitosis: 2 genetically identical diploid cells (growth/repair); Meiosis: 4 genetically unique haploid cells (reproduction)',
    ]},
  ],
  accounting: [
    { title:'Key Equations', icon:'⚖️', items:[
      'Accounting equation: Assets = Liabilities + Capital',
      'Capital = Assets − Liabilities',
      'Profit = Revenue − Expenses',
      'Closing capital = Opening capital + Profit − Drawings',
      'Cost of Sales = Opening Inventory + Purchases − Closing Inventory',
      'Gross Profit = Revenue − Cost of Sales',
      'Net Profit = Gross Profit − Expenses',
    ]},
    { title:'Ratios', icon:'📊', items:[
      'Gross Profit Margin = (Gross Profit ÷ Revenue) × 100%',
      'Net Profit Margin = (Net Profit ÷ Revenue) × 100%',
      'Return on Capital Employed (ROCE) = (Net Profit ÷ Capital Employed) × 100%',
      'Current Ratio = Current Assets ÷ Current Liabilities  (ideal ~2:1)',
      'Quick (Acid-test) Ratio = (Current Assets − Inventory) ÷ Current Liabilities  (ideal ~1:1)',
      'Inventory Turnover = Cost of Sales ÷ Average Inventory (times per year)',
      'Trade Receivables Days = (Trade Receivables ÷ Revenue) × 365',
    ]},
    { title:'Depreciation', icon:'📉', items:[
      'Straight-line method: (Cost − Residual Value) ÷ Useful life = annual depreciation',
      'Reducing balance: depreciation % × Book value at start of year',
      'Net Book Value = Cost − Accumulated Depreciation',
      'Depreciation reduces profit and asset value — not a cash payment',
    ]},
    { title:'Double Entry Rules', icon:'📒', items:[
      'DEAD CLIC: Debit = Expenses, Assets, Drawings; Credit = Liabilities, Income, Capital',
      'Assets: debit to increase, credit to decrease',
      'Liabilities & Capital: credit to increase, debit to decrease',
      'Revenue/Income: credit to increase',
      'Expenses: debit to increase',
      'Trial balance: sum of all debits = sum of all credits',
    ]},
  ],
  spanish: [
    { title:'Verb Tables', icon:'📝', items:[
      'SER: soy, eres, es, somos, sois, son  (permanent characteristics)',
      'ESTAR: estoy, estás, está, estamos, estáis, están  (temporary states/location)',
      'TENER: tengo, tienes, tiene, tenemos, tenéis, tienen',
      'IR: voy, vas, va, vamos, vais, van',
      'HACER: hago, haces, hace, hacemos, hacéis, hacen',
      'PODER: puedo, puedes, puede, podemos, podéis, pueden',
      'QUERER: quiero, quieres, quiere, queremos, queréis, quieren',
    ]},
    { title:'Tense Formulas', icon:'⏰', items:[
      'Preterite -AR: hablé, hablaste, habló, hablamos, hablasteis, hablaron',
      'Preterite -ER/-IR: comí, comiste, comió, comimos, comisteis, comieron',
      'Imperfect -AR: hablaba, hablabas, hablaba, hablábamos, hablabais, hablaban',
      'Imperfect -ER/-IR: comía, comías, comía, comíamos, comíais, comían',
      'Future: infinitive + é, ás, á, emos, éis, án  (same for all verbs)',
      'Conditional: infinitive + ía, ías, ía, íamos, íais, ían',
      'Irregular preterite: ser/ir → fui, fuiste, fue... | tener → tuve | hacer → hice',
    ]},
    { title:'Opinion & Connective Phrases', icon:'💬', items:[
      'Opinions: En mi opinión... | Creo que... | Pienso que... | Me parece que...',
      'Agreement: Estoy de acuerdo | Es verdad | Tienes razón | Exactamente',
      'Disagreement: No estoy de acuerdo | Es falso | Al contrario | Sin embargo',
      'Adding: Además | También | Asimismo | Por otro lado | De hecho',
      'Contrast: Sin embargo | No obstante | Aunque | A pesar de | Por el contrario',
      'Conclusion: En conclusión | Para terminar | En resumen | Por lo tanto | Así que',
    ]},
    { title:'Key Vocabulary Topics', icon:'🗂️', items:[
      'Family: la familia, el hermano/la hermana, los padres, el novio/la novia',
      'School: las asignaturas, los deberes, el horario, el/la profesor(a), el instituto',
      'Environment: el medioambiente, la contaminación, el cambio climático, reciclar',
      'Health: la salud, llevar una dieta sana, hacer ejercicio, evitar las drogas',
      'Technology: el móvil, las redes sociales, la aplicación, navegar por Internet',
      'False friends: embarazada = pregnant | sensible = sensitive | realizar = to achieve',
    ]},
  ],
  arabic_lang: [
    { title:'Grammar Reference', icon:'📖', items:[
      'Verb-subject agreement: الفعل يتوافق مع الفاعل في الجنس والعدد',
      'Nominal sentence (جملة اسمية): begins with noun; no verb needed for "is/are"',
      'Verbal sentence (جملة فعلية): begins with verb; verb agrees with gender of subject',
      'Definite article: ال  — sun letters assimilate (الشمس = ash-shams)',
      'Idafa (إضافة): first noun indefinite meaning; second in genitive case (مجرور)',
      'Dual: add ـان (nom) or ـين (gen/acc) for two of something',
      'Sound masculine plural: add ون/ين; Sound feminine plural: add ات',
    ]},
    { title:'Cases (الإعراب)', icon:'⚙️', items:[
      'مرفوع (nominative): subject of sentence — damma (ُ) ending → طالبٌ',
      'منصوب (accusative): object, after إنّ and sisters — fatha (َ) → طالباً',
      'مجرور (genitive): after prepositions, in idafa — kasra (ِ) → طالبٍ',
      'Common prepositions (حروف جر): في، على، من، إلى، عن، مع، ب، ل، ك',
      'إنّ وأخواتها: إنّ، أنّ، لكنّ، ليت، لعلّ، كأنّ — make subject منصوب',
      'كان وأخواتها: كان، أصبح، أمسى، صار — make predicate منصوب',
    ]},
    { title:'Writing Toolkit', icon:'✍️', items:[
      'Opening hooks: هل تساءلت يوماً...؟ | لا شكّ أنّ... | من المسلّم به أنّ...',
      'Adding: علاوةً على ذلك | بالإضافة إلى | وفضلاً عن ذلك | كذلك',
      'Contrast: ومع ذلك | بينما | في المقابل | على النقيض من | إلا أنّ',
      'Cause: لأنّ | بسبب | نظراً لـ | إذ | يُعزى ذلك إلى',
      'Effect: لذلك | وعليه | ومن ثمّ | فقد أدّى ذلك إلى | نتيجةً لذلك',
      'Conclusion: وختاماً | وفي الخلاصة | ومما سبق يتضح | لذا يمكن القول',
    ]},
    { title:'Exam Techniques', icon:'🎯', items:[
      'Comprehension: read questions first → scan text for key words → answer precisely',
      'Summary: select ONLY points relevant to the question focus — do not copy chunks',
      'Writing: plan structure before writing (مقدمة → عرض → خاتمة)',
      'Hamza: أ (beginning/middle with fatha) | إ (beginning with kasra) | آ (madda) | ء (no seat) | ئ (before kasra)',
      'Taa marbuta: ة at end of feminine nouns (pronounced -a normally, -at in idafa)',
      'Alif maqsura: ى (not dotted) vs ya ي (dotted) — common spelling error',
    ]},
  ],
  environmental: [
    { title:'Key Equations & Data', icon:'📐', items:[
      'Carbon footprint: total CO₂ equivalent (CO₂e) emitted by individual/event/organisation',
      'Energy efficiency = (useful energy output ÷ total energy input) × 100%',
      'CO₂ in atmosphere: pre-industrial ~280 ppm → current >420 ppm',
      'Global average temperature rise: ~1.1–1.2°C since 1880',
      'Sea level rise: ~3.6 mm/year average; accelerating due to ice melt + thermal expansion',
      'Renewable target: Paris Agreement aim to limit warming to 1.5°C above pre-industrial',
    ]},
    { title:'Key Processes', icon:'🌍', items:[
      'Greenhouse effect: solar radiation → Earth → IR radiation absorbed by GHGs → heat trapped',
      'GHGs: CO₂ (fossil fuels, deforestation) | CH₄ (agriculture, landfill) | N₂O (fertilisers) | H₂O vapour',
      'Hydrological cycle: evaporation → condensation → precipitation → runoff/infiltration → evaporation',
      'Eutrophication: nutrients → algal bloom → O₂ depletion → aquatic death (BOD increases)',
      'Soil erosion: overgrazing + deforestation → exposure → wind/water removes topsoil',
      'Bioaccumulation: toxin concentration increases up food chain (DDT, mercury)',
    ]},
    { title:'Ecosystems & Classification', icon:'🌿', items:[
      'Biomes: tropical rainforest, savanna, desert, tundra, taiga, temperate deciduous',
      'Food chain trophic levels: producer → primary consumer → secondary → tertiary',
      'Energy transfer: ~10% passes to next trophic level (90% lost as heat, respiration)',
      'Biodiversity: genetic + species + ecosystem diversity',
      'CITES: Convention on International Trade in Endangered Species',
      'IUCN Red List: Extinct → Critically Endangered → Endangered → Vulnerable → Near Threatened → Least Concern',
    ]},
    { title:'Solutions Reference', icon:'♻️', items:[
      'Mitigation: reduce emissions — renewables, electric vehicles, carbon capture, reforestation',
      'Adaptation: manage effects — sea walls, drought-resistant crops, managed retreat',
      'Sustainable development: "meets present needs without compromising future generations" (Brundtland 1987)',
      'Waste hierarchy: Reduce → Reuse → Recycle → Recover → Dispose',
      'Circular economy: keep resources in use as long as possible; eliminate waste',
      'Key agreements: Rio Earth Summit 1992 | Kyoto Protocol 1997 | Paris Agreement 2015 | CBD (biodiversity)',
    ]},
  ],
  sociology: [
    { title:'Key Sociologists', icon:'👤', items:[
      'Durkheim: functionalism; social solidarity; anomie; education transmits norms',
      'Marx: bourgeoisie vs proletariat; ideology; false consciousness; superstructure',
      'Weber: three dimensions of stratification: class, status, party',
      'Parsons: pattern variables; meritocracy; school as bridge between family and work',
      'Bourdieu: cultural capital; habitus; field — explains class reproduction in education',
      'Becker: labelling theory; master status; self-fulfilling prophecy',
      'Goffman: impression management; stigma; total institutions',
      'Hochschild: second shift; emotional labour',
    ]},
    { title:'Research Methods', icon:'🔬', items:[
      'Quantitative data: numerical, statistical — surveys, official statistics, experiments',
      'Qualitative data: rich, in-depth — interviews, observation, documents',
      'Questionnaires: large scale, cheap, reliable, but low response rate and surface-level',
      'Interviews: structured (quantitative) | semi-structured | unstructured (qualitative, in-depth)',
      'Participant observation: covert (hidden) vs overt (known) — Hawthorne effect risk',
      'Triangulation: using multiple methods to check validity of findings',
      'Official statistics: readily available but reflect recording biases (e.g. crime stats)',
    ]},
    { title:'Key Concepts', icon:'📚', items:[
      'Socialisation: primary (family) and secondary (school, peers, media, religion)',
      'Social control: formal (law, police) and informal (norms, ridicule, ostracism)',
      'Culture: shared values, norms, beliefs, customs of a group',
      'Norms: expected behaviours in a given situation; sanctions enforce compliance',
      'Values: widely held beliefs about what is important or desirable',
      'Social stratification: hierarchical ranking based on wealth, power, status',
      'Life chances: opportunities for health, education, and income determined by class/gender/ethnicity',
    ]},
    { title:'Theoretical Perspectives', icon:'🔭', items:[
      'Functionalism: society = organism; institutions work together; consensus; stability',
      'Marxism: conflict; capitalism; ruling class ideology; economic base → superstructure',
      'Feminism: patriarchy; gender inequality; public/private divide; liberal/radical/socialist wings',
      'Interactionism (micro): face-to-face interaction; labelling; social construction of reality',
      'Postmodernism: no grand narratives; identity fluid; media creates hyperreality (Baudrillard)',
      'New Right: family decline harmful; welfare dependency; meritocracy works',
    ]},
  ],
  religious_studies: [
    { title:'Islam Reference', icon:'☪️', items:[
      'Five Pillars: Shahada | Salah (5×/day) | Zakah (2.5%) | Sawm (Ramadan fast) | Hajj',
      'Six Articles of Faith: Allah | Angels | Holy Books | Prophets | Day of Judgement | Qadr',
      'Key terms: Tawhid (oneness) | Shirk (associating partners — gravest sin) | Ummah (community)',
      'Quran: final revelation to Prophet Muhammad ﷺ; preserved unchanged; 114 surahs',
      'Sunni/Shia split: succession after Prophet — Abu Bakr (Sunni) vs Ali (Shia)',
      'Jihad: greater (inner spiritual struggle) vs lesser (physical struggle in defence)',
    ]},
    { title:'Christianity Reference', icon:'✝️', items:[
      'Trinity: Father + Son (Jesus) + Holy Spirit — three persons, one God',
      'Incarnation: God became human in Jesus; born of Virgin Mary',
      'Atonement: Jesus\' death on cross as sacrifice for humanity\'s sin',
      'Resurrection: rose from dead on third day — core of Christian faith (1 Corinthians 15)',
      'Sacraments: Baptism (initiation) | Eucharist (remembering Last Supper)',
      'Golden Rule: "Do to others as you would have them do to you" (Matthew 7:12)',
    ]},
    { title:'Ethics Frameworks', icon:'⚖️', items:[
      'Utilitarianism (Bentham/Mill): greatest happiness for greatest number; consequentialist',
      'Kantian ethics: categorical imperative — act only by rules you could universalise; duty-based',
      'Natural Law (Aquinas): moral norms grounded in human nature and reason; absolute',
      'Virtue Ethics (Aristotle): focus on character — courage, honesty, compassion; eudaimonia',
      'Divine Command: what God commands is right; challenges: which God? conflicting commands?',
      'Situation Ethics (Fletcher): love (agape) as the only absolute; rules applied situationally',
    ]},
    { title:'Applied Ethics Quick Guide', icon:'📋', items:[
      'Euthanasia: sanctity of life (against) vs quality of life, autonomy (for)',
      'Abortion: when does life begin? personhood debate; women\'s rights vs embryo rights',
      'Capital punishment: retribution vs rehabilitation; "eye for an eye" vs "turn the other cheek"',
      'War: Just War criteria (Aquinas): just cause, right intention, last resort, proportionality, authority',
      'Poverty: zakah obligates giving; "preferential option for the poor" (Catholic social teaching)',
      'Environment: stewardship/khalifah — humans responsible to care for creation',
    ]},
  ],
};

// Use CIE chapters as fallback for Edexcel and Oxford AQA (90% overlap)
Object.values(IGCSE_SUBJECTS).forEach(subj => {
  if (!subj.chapters) subj.chapters = {};
  if (subj.chapters.cie) {
    if (!subj.chapters.edexcel) subj.chapters.edexcel = subj.chapters.cie;
    if (!subj.chapters.oxford) subj.chapters.oxford = subj.chapters.cie;
  }
});

// ── IGCSE Template Functions ──────────────────────────────

function tplIGCSE() {
  if (S.igcseView === 'formulas') return tplIGCSEFormulas();
  if (S.igcseTopic !== null)      return tplIGCSETopic();
  if (S.igcseSubject)             return tplIGCSESubject();
  return tplIGCSEHub();
}

function tplIGCSEFormulas() {
  const subj = IGCSE_SUBJECTS[S.igcseSubject];
  const formulas = IGCSE_FORMULAS[S.igcseSubject];
  if (!subj || !formulas) {
    return `<div style="padding:40px;text-align:center;color:var(--text-muted)">
      <div style="font-size:36px;margin-bottom:12px">📐</div>
      <div style="font-size:15px;font-weight:700">No formula sheet for this subject yet</div>
      <button onclick="S.igcseView='list';render()" style="margin-top:16px;padding:10px 20px;border-radius:10px;border:1px solid var(--border);background:var(--bg-card);cursor:pointer;font-family:Cairo,sans-serif;font-size:13px;color:var(--text);font-weight:700">← Back</button>
    </div>`;
  }
  const sections = formulas.map(sec => `
    <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;margin-bottom:14px;overflow:hidden">
      <div style="padding:12px 16px;background:${subj.color}0f;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px">
        <span style="font-size:18px">${sec.icon}</span>
        <span style="font-size:13px;font-weight:900;color:${subj.color}">${sec.title}</span>
      </div>
      <div style="padding:12px 16px">
        ${sec.items.map(f => `
        <div style="padding:8px 12px;border-radius:8px;margin-bottom:6px;background:var(--bg);border:1px solid var(--border);font-size:12px;font-family:monospace,Cairo,sans-serif;color:var(--text);line-height:1.6">
          ${f}
        </div>`).join('')}
      </div>
    </div>`).join('');
  return `
<div style="max-width:860px;margin:0 auto;padding:0 0 80px">
  <div style="background:linear-gradient(135deg,${subj.color},${subj.color}bb);padding:18px 16px 22px;border-radius:0 0 22px 22px;margin-bottom:18px">
    <button onclick="S.igcseView='list';render()"
      style="background:#ffffff25;border:1px solid #ffffff35;border-radius:10px;padding:5px 12px;color:#fff;cursor:pointer;font-size:11px;font-family:Cairo,sans-serif;font-weight:700;margin-bottom:12px">
      ← Back to ${subj.label}
    </button>
    <div style="display:flex;align-items:center;gap:12px">
      <div style="font-size:36px">${subj.icon}</div>
      <div>
        <div style="font-size:18px;font-weight:900;color:#fff">📐 Formula Sheet</div>
        <div style="font-size:11px;color:#ffffffaa">${subj.label} — IGCSE · ${formulas.length} sections · ${formulas.reduce((a,s)=>a+s.items.length,0)} formulas</div>
      </div>
    </div>
  </div>
  <div style="padding:0 12px">
    <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
      <button onclick="S.screen='chat';S.subject='${subj.label} IGCSE';S.messages=[{role:'user',content:'Explain how to use the key formulas for IGCSE ${subj.label} with worked examples for each'}];render();setTimeout(()=>doSend&&doSend(),100)"
        style="padding:8px 14px;border-radius:10px;border:none;background:var(--primary);color:#fff;cursor:pointer;font-size:12px;font-weight:700;font-family:Cairo,sans-serif">
        🤖 AI: Walk me through these formulas
      </button>
      <button onclick="S.screen='flashcards';S.subject='${subj.label} IGCSE formulas';doGenerateFlashcards()"
        style="padding:8px 14px;border-radius:10px;border:1px solid var(--border);background:var(--bg-card);color:var(--text);cursor:pointer;font-size:12px;font-weight:700;font-family:Cairo,sans-serif">
        🗂️ Formula Flashcards
      </button>
    </div>
    ${sections}
    <div style="padding:14px;background:#F59E0B0f;border-radius:12px;border:1px solid #F59E0B25;font-size:12px;color:var(--text-muted)">
      ⚠️ <strong>Exam note:</strong> Some formulas are given in the exam — always check your syllabus formula sheet. Learn which ones you must memorise.
    </div>
  </div>
</div>`;
}

function tplIGCSEHub() {
  const board = IGCSE_BOARDS[S.igcseBoard];
  const q = (S.igcseSearch||'').toLowerCase().trim();

  // Stats
  const allSubjects = Object.values(IGCSE_SUBJECTS);
  const totalTopics = allSubjects.reduce((a,s)=>a+((s.chapters.cie||[]).reduce((b,c)=>b+c.topics.length,0)),0);
  const doneCnt = Object.keys(S.igcseDone||{}).length;

  // Board cards
  const boardCards = Object.entries(IGCSE_BOARDS).map(([k,b]) => {
    const active = S.igcseBoard === k;
    const cnt = Object.values(IGCSE_SUBJECTS).filter(s=>s.boards.includes(k)).length;
    return `
    <div onclick="S.igcseBoard='${k}';S.igcseSearch='';render()"
      style="flex:1;min-width:100px;padding:14px 10px;border-radius:16px;cursor:pointer;text-align:center;transition:.2s;
             ${active?`background:${b.color};box-shadow:0 4px 20px ${b.color}55;`:'background:var(--bg-card);border:2px solid var(--border);'}">
      <div style="font-size:22px;margin-bottom:4px">${b.icon}</div>
      <div style="font-size:12px;font-weight:900;color:${active?'#fff':'var(--text)'}">${b.short}</div>
      <div style="font-size:10px;color:${active?'#ffffff99':'var(--text-muted)'};margin-top:2px">${cnt} subjects</div>
    </div>`;
  }).join('');

  // Subject cards with search filter
  const filtered = Object.entries(IGCSE_SUBJECTS)
    .filter(([,s]) => s.boards.includes(S.igcseBoard))
    .filter(([,s]) => !q || s.label.toLowerCase().includes(q) || s.arabic.includes(q));

  // Topic-level search results
  let topicSearchResults = [];
  if (q && filtered.length === 0) {
    Object.entries(IGCSE_SUBJECTS).forEach(([sk,subj])=>{
      if(!subj.boards.includes(S.igcseBoard)) return;
      const chs = subj.chapters[S.igcseBoard]||[];
      chs.forEach((ch,ci)=>{
        ch.topics.forEach((tp,ti)=>{
          if(tp.title.toLowerCase().includes(q)||(tp.points&&tp.points.some(p=>p.toLowerCase().includes(q)))){
            topicSearchResults.push({sk,subj,ch,tp,ci,ti});
          }
        });
      });
    });
  }

  const subjectCards = filtered.map(([k,subj]) => {
    const chapters = subj.chapters[S.igcseBoard]||[];
    const topicCount = chapters.reduce((a,c)=>a+c.topics.length,0);
    const doneCount = chapters.reduce((a,c,ci)=>a+c.topics.filter((_,ti)=>S.igcseDone[`${k}-${ci}-${ti}`]).length,0);
    const pct = topicCount ? Math.round(doneCount/topicCount*100) : 0;
    return `
    <div onclick="S.igcseSubject='${k}';S.igcseChapter=null;S.igcseTopic=null;S.igcseSearch='';render()"
      style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:18px 14px 14px;cursor:pointer;
             transition:.2s;position:relative;overflow:hidden;"
      onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px ${subj.color}30';this.style.borderColor='${subj.color}'"
      onmouseout="this.style.transform='';this.style.boxShadow='';this.style.borderColor=''">
      <!-- top color bar -->
      <div style="position:absolute;top:0;left:0;right:0;height:4px;background:${subj.color}"></div>
      <div style="font-size:32px;margin-bottom:8px">${subj.icon}</div>
      <div style="font-size:13px;font-weight:900;color:var(--text);line-height:1.3">${subj.label}</div>
      <div style="font-size:10px;color:var(--text-muted);margin-top:2px">${subj.arabic}</div>
      <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:10px;background:${subj.color}18;color:${subj.color};padding:2px 8px;border-radius:20px;font-weight:700">${topicCount} topics</span>
        ${pct>0?`<span style="font-size:10px;color:#10B981;font-weight:700">${pct}% ✓</span>`:''}
      </div>
      ${pct>0?`<div style="margin-top:8px;height:3px;background:var(--border);border-radius:2px"><div style="height:100%;width:${pct}%;background:#10B981;border-radius:2px;transition:.4s"></div></div>`:''}
    </div>`;
  }).join('');

  return `
<div style="max-width:920px;margin:0 auto;padding:0 0 80px">
  <!-- Hero Header -->
  <div style="background:linear-gradient(135deg,${board.color} 0%,${board.accent} 100%);padding:24px 20px 28px;border-radius:0 0 28px 28px;margin-bottom:20px;position:relative;overflow:hidden">
    <div style="position:absolute;top:-30px;right:-30px;width:160px;height:160px;border-radius:50%;background:#ffffff0d"></div>
    <div style="position:absolute;bottom:-40px;left:-20px;width:120px;height:120px;border-radius:50%;background:#ffffff08"></div>
    <div style="position:relative;z-index:1">
      <div style="display:inline-block;background:#ffffff20;border-radius:20px;padding:3px 12px;font-size:10px;color:#ffffffcc;font-weight:800;letter-spacing:2px;margin-bottom:10px">IGCSE REVISION PLATFORM</div>
      <div style="font-size:26px;font-weight:900;color:#fff;margin-bottom:6px">🎓 IGCSE Hub</div>
      <div style="display:flex;gap:16px;flex-wrap:wrap">
        <div style="text-align:center"><div style="font-size:20px;font-weight:900;color:#fff">${Object.keys(IGCSE_SUBJECTS).length}</div><div style="font-size:10px;color:#ffffffaa">Subjects</div></div>
        <div style="width:1px;background:#ffffff30"></div>
        <div style="text-align:center"><div style="font-size:20px;font-weight:900;color:#fff">${totalTopics}+</div><div style="font-size:10px;color:#ffffffaa">Topics</div></div>
        <div style="width:1px;background:#ffffff30"></div>
        <div style="text-align:center"><div style="font-size:20px;font-weight:900;color:#fff">${doneCnt}</div><div style="font-size:10px;color:#ffffffaa">Done ✓</div></div>
        <div style="width:1px;background:#ffffff30"></div>
        <div style="text-align:center"><div style="font-size:20px;font-weight:900;color:#fff">3</div><div style="font-size:10px;color:#ffffffaa">Boards</div></div>
      </div>
    </div>
  </div>

  <!-- Board Selector -->
  <div style="padding:0 14px;margin-bottom:18px">
    <div style="font-size:10px;color:var(--text-muted);font-weight:800;letter-spacing:1.5px;margin-bottom:10px">EXAM BOARD</div>
    <div style="display:flex;gap:10px">${boardCards}</div>
  </div>

  <!-- Search -->
  <div style="padding:0 14px;margin-bottom:16px">
    <div style="position:relative">
      <input id="igcse-search" type="text" placeholder="Search subjects..." value="${S.igcseSearch||''}"
        oninput="S.igcseSearch=this.value;render()"
        style="width:100%;padding:10px 16px 10px 40px;border-radius:12px;border:1px solid var(--border);background:var(--bg-card);color:var(--text);font-size:13px;font-family:Cairo,sans-serif;box-sizing:border-box;outline:none">
      <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:16px;pointer-events:none">🔍</span>
      ${q?`<button onclick="S.igcseSearch='';render()" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:16px;color:var(--text-muted)">✕</button>`:''}
    </div>
  </div>

  <!-- Subject Grid -->
  <div style="padding:0 14px">
    <div style="font-size:10px;color:var(--text-muted);font-weight:800;letter-spacing:1.5px;margin-bottom:12px">
      ${q?`Results for "${q}" — ${filtered.length} subject(s)`:`ALL SUBJECTS · ${filtered.length} available`}
    </div>
    ${filtered.length?`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(145px,1fr));gap:12px">${subjectCards}</div>`
      : topicSearchResults.length ? `
        <div style="font-size:10px;color:var(--text-muted);margin-bottom:8px">Showing topics matching "${q}"</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${topicSearchResults.slice(0,12).map(({sk,subj,ch,tp,ci,ti})=>`
          <div onclick="S.igcseSubject='${sk}';S.igcseChapter=${ci};S.igcseTopic=${ti};S.igcseTab='notes';S.igcseSearch='';S.igcseFcIdx=0;S.igcseFcFlipped=false;render()"
            style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;cursor:pointer;transition:.15s;border-left:4px solid ${subj.color}"
            onmouseover="this.style.background='${subj.color}0a'" onmouseout="this.style.background=''">
            <span style="font-size:20px">${subj.icon}</span>
            <div style="flex:1;min-width:0">
              <div style="font-size:12px;font-weight:800;color:var(--text)">${tp.title}</div>
              <div style="font-size:10px;color:var(--text-muted)">${subj.label} › ${ch.title}</div>
            </div>
            <span style="font-size:10px;color:${subj.color};font-weight:800">→</span>
          </div>`).join('')}
          ${topicSearchResults.length>12?`<div style="font-size:11px;color:var(--text-muted);text-align:center;padding:8px">+ ${topicSearchResults.length-12} more results — refine your search</div>`:''}
        </div>`
      :`<div style="text-align:center;padding:40px;color:var(--text-muted)">No results for "${q}"</div>`}
  </div>

  <!-- Exam Countdown + Quick Actions Row -->
  <div style="padding:0 14px;margin-top:20px;display:flex;gap:10px;flex-wrap:wrap">
    <!-- Exam Countdown -->
    <div id="igcse-countdown-card" style="flex:1;min-width:160px;background:linear-gradient(135deg,#7C3AED,#5B21B6);border-radius:14px;padding:14px 16px;color:#fff">
      <div style="font-size:10px;font-weight:800;letter-spacing:1.5px;color:#ffffffaa;margin-bottom:6px">📅 EXAM COUNTDOWN</div>
      <div id="igcse-days" style="font-size:28px;font-weight:900">${(()=>{const d=S.igcseExamDate?Math.max(0,Math.ceil((new Date(S.igcseExamDate)-new Date())/(1000*60*60*24))):null;return d!==null?d:'—';})()}</div>
      <div style="font-size:11px;color:#ffffffbb">${S.igcseExamDate?'days until exams':'Set your exam date'}</div>
      <input type="date" value="${S.igcseExamDate||''}" onchange="S.igcseExamDate=this.value;render()"
        style="margin-top:8px;width:100%;padding:4px 8px;border-radius:8px;border:1px solid #ffffff30;background:#ffffff15;color:#fff;font-size:11px;box-sizing:border-box;outline:none;font-family:Cairo,sans-serif">
    </div>
    <!-- Overall Progress -->
    <div style="flex:1;min-width:160px;background:var(--bg-card);border:1px solid var(--border);border-radius:14px;padding:14px 16px">
      <div style="font-size:10px;font-weight:800;letter-spacing:1.5px;color:var(--text-muted);margin-bottom:6px">📊 OVERALL PROGRESS</div>
      <div style="font-size:28px;font-weight:900;color:${board.color}">${doneCnt}</div>
      <div style="font-size:11px;color:var(--text-muted)">topics completed</div>
      <div style="margin-top:8px;height:6px;background:var(--border);border-radius:3px">
        <div style="height:100%;width:${totalTopics?Math.min(100,Math.round(doneCnt/totalTopics*100)):0}%;background:${board.color};border-radius:3px;transition:.5s"></div>
      </div>
      <div style="font-size:10px;color:var(--text-muted);margin-top:4px">${totalTopics?Math.min(100,Math.round(doneCnt/totalTopics*100)):0}% of ${totalTopics} total topics</div>
    </div>
    <!-- Quick Links -->
    <div style="flex:1;min-width:160px;background:var(--bg-card);border:1px solid var(--border);border-radius:14px;padding:14px 16px">
      <div style="font-size:10px;font-weight:800;letter-spacing:1.5px;color:var(--text-muted);margin-bottom:10px">⚡ QUICK ACTIONS</div>
      <div style="display:flex;flex-direction:column;gap:7px">
        <button onclick="S.screen='chat';S.subject='IGCSE';S.messages=[{role:'user',content:'Give me a 10-question IGCSE mixed quiz covering: Maths, Physics, Chemistry, and Biology — with answers at the end'}];render();setTimeout(()=>doSend&&doSend(),100)"
          style="padding:7px 10px;border-radius:8px;border:1px solid var(--border);background:var(--bg);color:var(--text);cursor:pointer;font-size:11px;font-weight:700;font-family:Cairo,sans-serif;text-align:left">
          🎯 Mixed IGCSE Quiz
        </button>
        <button onclick="S.screen='chat';S.subject='IGCSE Study Plan';S.messages=[{role:'user',content:'Create a 4-week IGCSE revision plan for: Maths, Physics, Chemistry, Biology, and English. I have 2 hours per day. Include what to revise each week and past paper practice schedule.'}];render();setTimeout(()=>doSend&&doSend(),100)"
          style="padding:7px 10px;border-radius:8px;border:1px solid var(--border);background:var(--bg);color:var(--text);cursor:pointer;font-size:11px;font-weight:700;font-family:Cairo,sans-serif;text-align:left">
          📅 AI Study Plan
        </button>
        <button onclick="S.screen='chat';S.subject='IGCSE Examiner Tips';S.messages=[{role:'user',content:'Give me the top 10 examiner tips that apply to ALL IGCSE subjects — what do Cambridge examiners look for?'}];render();setTimeout(()=>doSend&&doSend(),100)"
          style="padding:7px 10px;border-radius:8px;border:1px solid var(--border);background:var(--bg);color:var(--text);cursor:pointer;font-size:11px;font-weight:700;font-family:Cairo,sans-serif;text-align:left">
          💡 Examiner Tips
        </button>
      </div>
    </div>
  </div>

  <!-- Recently Studied -->
  ${(S.igcseRecent&&S.igcseRecent.length)?`
  <div style="padding:0 14px;margin-top:20px">
    <div style="font-size:10px;color:var(--text-muted);font-weight:800;letter-spacing:1.5px;margin-bottom:10px">🕐 RECENTLY STUDIED</div>
    <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">
      ${(S.igcseRecent||[]).map(r=>`
      <div onclick="S.igcseSubject='${r.sk}';S.igcseChapter=${r.ci};S.igcseTopic=${r.ti};S.igcseTab='notes';S.igcseFcIdx=0;S.igcseFcFlipped=false;render()"
        style="flex-shrink:0;width:130px;padding:12px 10px;background:var(--bg-card);border:1px solid var(--border);border-radius:14px;cursor:pointer;transition:.15s;border-top:3px solid ${r.color}"
        onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">
        <div style="font-size:20px;margin-bottom:4px">${r.icon}</div>
        <div style="font-size:10px;font-weight:900;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.topicTitle}</div>
        <div style="font-size:9px;color:var(--text-muted);margin-top:2px">${r.label}</div>
      </div>`).join('')}
    </div>
  </div>
  `:''}

  <!-- Weak Spots Panel -->
  ${(()=>{
    const done = S.igcseDone||{};
    const weak = [];
    Object.entries(IGCSE_SUBJECTS).forEach(([sk,subj])=>{
      if(!subj.boards.includes(S.igcseBoard)) return;
      const chs = subj.chapters[S.igcseBoard]||[];
      chs.forEach((ch,ci)=>{
        ch.topics.forEach((tp,ti)=>{
          if(!done[`${sk}-${ci}-${ti}`]) weak.push({sk,subj,ch,tp,ci,ti});
        });
      });
    });
    if(!weak.length) return `
    <div style="margin:16px 14px 0;padding:14px 16px;background:#10B98118;border-radius:14px;border:1px solid #10B98140;display:flex;align-items:center;gap:12px">
      <div style="font-size:28px">🎉</div>
      <div>
        <div style="font-size:13px;font-weight:900;color:#10B981">All topics completed!</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:2px">Outstanding work — you've covered everything. Focus on past papers now!</div>
      </div>
    </div>`;
    const items = weak.slice(0,6).map(({sk,subj,tp,ci,ti})=>`
      <div onclick="S.igcseSubject='${sk}';S.igcseChapter=${ci};S.igcseTopic=${ti};S.igcseTab='notes';render()"
        style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:10px;cursor:pointer;background:var(--bg);border:1px solid var(--border);transition:.15s"
        onmouseover="this.style.borderColor='${subj.color}'" onmouseout="this.style.borderColor=''">
        <span style="font-size:16px">${subj.icon}</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:11px;font-weight:700;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${tp.title}</div>
          <div style="font-size:10px;color:var(--text-muted)">${subj.label}</div>
        </div>
        <span style="font-size:10px;color:${subj.color};font-weight:800">→</span>
      </div>`).join('');
    return `
    <div style="margin:16px 14px 0;background:var(--bg-card);border:1px solid var(--border);border-radius:14px;padding:14px 16px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <div style="font-size:10px;font-weight:800;letter-spacing:1.5px;color:var(--text-muted)">📌 TOPICS TO STUDY (${weak.length} remaining)</div>
        ${weak.length>6?`<span style="font-size:10px;color:${board.color};font-weight:700">${weak.length-6} more...</span>`:''}
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">${items}</div>
    </div>`;
  })()}

  <!-- Tips Banner -->
  <div style="margin:16px 14px 0;padding:14px 16px;background:${board.color}0c;border-radius:14px;border:1px solid ${board.color}25;display:flex;align-items:center;gap:12px">
    <div style="font-size:24px">💡</div>
    <div>
      <div style="font-size:12px;font-weight:800;color:var(--text)">How to use this platform</div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:2px">Pick a subject → study chapters & topics → use 📐 Formula Sheet → practice with AI → mark topics Done ✓ → past papers</div>
    </div>
  </div>
</div>`;
}

function tplIGCSESubject() {
  const subj = IGCSE_SUBJECTS[S.igcseSubject];
  if (!subj) return tplIGCSEHub();
  const board = IGCSE_BOARDS[S.igcseBoard];
  const chapters = subj.chapters[S.igcseBoard] || [];
  const totalTopics = chapters.reduce((a,c)=>a+c.topics.length,0);
  const doneTopics = chapters.reduce((a,c,ci)=>a+c.topics.filter((_,ti)=>S.igcseDone[`${S.igcseSubject}-${ci}-${ti}`]).length,0);
  const pct = totalTopics ? Math.round(doneTopics/totalTopics*100) : 0;

  const chapterList = chapters.map((ch, ci) => {
    const isOpen = S.igcseChapter === ci;
    const chDone = ch.topics.filter((_,ti)=>S.igcseDone[`${S.igcseSubject}-${ci}-${ti}`]).length;
    const topicItems = ch.topics.map((tp, ti) => {
      const done = !!S.igcseDone[`${S.igcseSubject}-${ci}-${ti}`];
      return `
      <div style="display:flex;align-items:center;gap:0;margin-bottom:4px">
        <div onclick="S.igcseChapter=${ci};S.igcseTopic=${ti};S.igcseTab='notes';render()"
          style="flex:1;padding:10px 14px;border-radius:10px 0 0 10px;cursor:pointer;display:flex;align-items:center;gap:10px;transition:.15s;
                 background:${done?'#10B98108':'transparent'};border:1px solid ${done?'#10B98130':'var(--border)'};border-right:none"
          onmouseover="this.style.background='${subj.color}11';this.style.borderColor='${subj.color}44'"
          onmouseout="this.style.background='${done?'#10B98108':'transparent'}';this.style.borderColor='${done?'#10B98130':'var(--border)'}'">
          <span style="font-size:14px">${done?'✅':'📖'}</span>
          <span style="font-size:13px;font-weight:${done?'600':'500'};color:${done?'#10B981':'var(--text)'};text-decoration:${done?'none':'none'}">${tp.title}</span>
          <span style="margin-right:auto;font-size:10px;color:var(--text-muted)">${tp.points.length} pts</span>
          <span style="font-size:11px;color:${subj.color}">›</span>
        </div>
        <button onclick="S.igcseDone=S.igcseDone||{};S.igcseDone['${S.igcseSubject}-${ci}-${ti}']=!S.igcseDone['${S.igcseSubject}-${ci}-${ti}'];if(!S.igcseDone['${S.igcseSubject}-${ci}-${ti}'])delete S.igcseDone['${S.igcseSubject}-${ci}-${ti}'];render()"
          title="${done?'Mark as not done':'Mark as done'}"
          style="padding:10px 10px;border-radius:0 10px 10px 0;border:1px solid ${done?'#10B98130':'var(--border)'};border-left:none;
                 background:${done?'#10B98115':'var(--bg-card)'};cursor:pointer;font-size:14px;transition:.15s">
          ${done?'✓':'○'}
        </button>
      </div>`;
    }).join('');
    return `
    <div style="border:1px solid var(--border);border-radius:16px;margin-bottom:10px;overflow:hidden;transition:.15s">
      <div onclick="S.igcseChapter=${isOpen?'null':ci};render()"
        style="padding:14px 16px;cursor:pointer;display:flex;align-items:center;gap:12px;
               background:${isOpen?`${subj.color}0f`:'var(--bg-card)'};transition:.15s">
        <div style="width:36px;height:36px;border-radius:10px;background:${subj.color}20;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">${ch.icon||'📘'}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:800;color:var(--text)">${ch.title}</div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:1px">${ch.topics.length} topics${chDone>0?` · ${chDone} done ✓`:''}</div>
          ${chDone>0?`<div style="margin-top:5px;height:2px;background:var(--border);border-radius:1px"><div style="height:100%;width:${Math.round(chDone/ch.topics.length*100)}%;background:#10B981;border-radius:1px"></div></div>`:''}
        </div>
        <span style="font-size:16px;color:var(--text-muted);transition:transform .2s;transform:${isOpen?'rotate(90deg)':'rotate(0deg)'};display:inline-block">›</span>
      </div>
      ${isOpen?`<div style="padding:8px 12px 12px;background:var(--bg);border-top:1px solid var(--border)">${topicItems}</div>`:''}
    </div>`;
  }).join('');

  const ppLink = subj.pastPapers[S.igcseBoard] || '#';
  return `
<div style="max-width:880px;margin:0 auto;padding:0 0 80px">
  <!-- Subject Header -->
  <div style="background:linear-gradient(135deg,${subj.color},${subj.color}bb);padding:20px 16px 24px;border-radius:0 0 24px 24px;margin-bottom:18px;position:relative;overflow:hidden">
    <div style="position:absolute;top:-20px;right:-20px;width:100px;height:100px;border-radius:50%;background:#ffffff0d"></div>
    <button onclick="S.igcseSubject=null;S.igcseChapter=null;S.igcseTopic=null;render()"
      style="background:#ffffff25;border:1px solid #ffffff35;border-radius:10px;padding:5px 12px;color:#fff;cursor:pointer;font-size:11px;font-family:Cairo,sans-serif;font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:6px">
      ← All Subjects
    </button>
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px">
      <div style="width:56px;height:56px;border-radius:16px;background:#ffffff25;display:flex;align-items:center;justify-content:center;font-size:30px;flex-shrink:0">${subj.icon}</div>
      <div>
        <div style="font-size:21px;font-weight:900;color:#fff">${subj.label}</div>
        <div style="font-size:11px;color:#ffffffbb;margin-top:2px">${board.icon} ${board.label} · IGCSE · ${chapters.length} chapters · ${totalTopics} topics</div>
      </div>
    </div>
    <!-- Progress bar -->
    <div style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;margin-bottom:5px">
        <span style="font-size:10px;color:#ffffffbb;font-weight:700">PROGRESS</span>
        <span style="font-size:10px;color:#fff;font-weight:900">${doneTopics}/${totalTopics} topics · ${pct}%</span>
      </div>
      <div style="height:6px;background:#ffffff25;border-radius:3px">
        <div style="height:100%;width:${pct}%;background:#fff;border-radius:3px;transition:.5s"></div>
      </div>
    </div>
    <!-- Quick actions -->
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <a href="${ppLink}" target="_blank" rel="noopener"
        style="background:#ffffff20;border:1px solid #ffffff35;border-radius:10px;padding:7px 14px;color:#fff;text-decoration:none;font-size:11px;font-weight:700;font-family:Cairo,sans-serif">
        📄 Past Papers
      </a>
      <button onclick="S.screen='chat';S.subject='${subj.label} IGCSE';S.messages=[];render()"
        style="background:#ffffff20;border:1px solid #ffffff35;border-radius:10px;padding:7px 14px;color:#fff;cursor:pointer;font-size:11px;font-weight:700;font-family:Cairo,sans-serif">
        💬 AI Tutor
      </button>
      <button onclick="S.screen='flashcards';S.subject='${subj.label} IGCSE';doGenerateFlashcards()"
        style="background:#ffffff20;border:1px solid #ffffff35;border-radius:10px;padding:7px 14px;color:#fff;cursor:pointer;font-size:11px;font-weight:700;font-family:Cairo,sans-serif">
        🗂️ Flashcards
      </button>
      ${IGCSE_FORMULAS[S.igcseSubject]?`<button onclick="S.igcseView='formulas';render()"
        style="background:#ffffff20;border:1px solid #ffffff35;border-radius:10px;padding:7px 14px;color:#fff;cursor:pointer;font-size:11px;font-weight:700;font-family:Cairo,sans-serif">
        📐 Formula Sheet
      </button>`:''}
    </div>
  </div>

  <!-- Chapter List -->
  <div style="padding:0 12px">
    <div style="font-size:10px;color:var(--text-muted);font-weight:800;letter-spacing:1.5px;margin-bottom:14px">CHAPTERS & TOPICS</div>
    ${chapterList||'<div style="text-align:center;padding:40px;color:var(--text-muted)">No chapters available for this board yet</div>'}
  </div>
</div>`;
}

function tplIGCSETopic() {
  const subj = IGCSE_SUBJECTS[S.igcseSubject];
  if (!subj) return tplIGCSEHub();
  const board = IGCSE_BOARDS[S.igcseBoard];
  const chapters = subj.chapters[S.igcseBoard] || [];
  const ch = chapters[S.igcseChapter];
  if (!ch) return tplIGCSESubject();
  const tp = ch.topics[S.igcseTopic];
  if (!tp) return tplIGCSESubject();

  // Navigation between topics
  const allTopics = chapters.flatMap((c,ci) => c.topics.map((_,ti) => ({ci,ti})));
  const curIdx = allTopics.findIndex(x => x.ci===S.igcseChapter && x.ti===S.igcseTopic);
  const prevT = allTopics[curIdx-1] || null;
  const nextT = allTopics[curIdx+1] || null;

  const isDone = !!(S.igcseDone||{})[`${S.igcseSubject}-${S.igcseChapter}-${S.igcseTopic}`];
  // Track recently studied
  (()=>{
    const key = `${S.igcseSubject}-${S.igcseChapter}-${S.igcseTopic}`;
    const rec = {sk:S.igcseSubject,ci:S.igcseChapter,ti:S.igcseTopic,label:subj.label,icon:subj.icon,topicTitle:tp.title,color:subj.color};
    S.igcseRecent = [rec,...(S.igcseRecent||[]).filter(r=>!(r.sk===rec.sk&&r.ci===rec.ci&&r.ti===rec.ti))].slice(0,6);
  })();

  const tabs = ['notes','flashcards','questions','papers'].map(tab => {
    const labels = {notes:'📖 Notes', flashcards:'🃏 Cards', questions:'❓ Practice', papers:'📄 Papers'};
    return `<button onclick="S.igcseTab='${tab}';render()"
      style="flex:1;padding:9px 4px;border:none;cursor:pointer;font-family:Cairo,sans-serif;font-size:11px;font-weight:800;transition:.15s;border-radius:10px;letter-spacing:.3px;
             ${S.igcseTab===tab?`background:${subj.color};color:#fff;box-shadow:0 2px 8px ${subj.color}44`:'background:var(--bg);color:var(--text-muted);border:1px solid var(--border)'}">
      ${labels[tab]}
    </button>`;
  }).join('');

  let tabContent = '';
  if (S.igcseTab === 'notes') {
    const keyPoints = tp.points.map((p,i) => `
      <div style="display:flex;gap:14px;padding:14px 16px;background:var(--bg-card);border-radius:14px;margin-bottom:8px;border:1px solid var(--border);border-left:4px solid ${subj.color}">
        <div style="min-width:26px;height:26px;border-radius:8px;background:${subj.color};color:#fff;font-size:11px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0">${i+1}</div>
        <div style="font-size:13px;color:var(--text);line-height:1.75">${p}</div>
      </div>`).join('');
    tabContent = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding:10px 14px;background:${subj.color}0f;border-radius:12px;border:1px solid ${subj.color}25">
        <div>
          <div style="font-size:10px;color:${subj.color};font-weight:900;letter-spacing:1px">KEY REVISION NOTES</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:1px">${tp.points.length} points · ${board.short}</div>
        </div>
        <button onclick="S.igcseDone=S.igcseDone||{};S.igcseDone['${S.igcseSubject}-${S.igcseChapter}-${S.igcseTopic}']=!S.igcseDone['${S.igcseSubject}-${S.igcseChapter}-${S.igcseTopic}'];if(!S.igcseDone['${S.igcseSubject}-${S.igcseChapter}-${S.igcseTopic}'])delete S.igcseDone['${S.igcseSubject}-${S.igcseChapter}-${S.igcseTopic}'];render()"
          style="padding:7px 14px;border-radius:10px;border:none;cursor:pointer;font-size:11px;font-weight:800;font-family:Cairo,sans-serif;transition:.15s;
                 ${isDone?'background:#10B981;color:#fff':'background:var(--bg);color:var(--text-muted);border:1px solid var(--border)'}">
          ${isDone?'✅ Done':'○ Mark Done'}
        </button>
      </div>
      ${keyPoints}
      ${tp.workedExample ? `
      <div style="margin-top:12px;background:#3B82F60f;border:1px solid #3B82F625;border-radius:14px;overflow:hidden">
        <div style="padding:10px 14px;background:#3B82F610;border-bottom:1px solid #3B82F620;font-size:11px;font-weight:900;color:#3B82F6;letter-spacing:.5px">✏️ WORKED EXAMPLE</div>
        <div style="padding:12px 14px;font-size:12px;color:var(--text);line-height:1.8;white-space:pre-wrap;font-family:monospace,Cairo,sans-serif">${tp.workedExample}</div>
      </div>` : ''}
      ${tp.examTips && tp.examTips.length ? `
      <div style="margin-top:12px;background:#10B9810f;border:1px solid #10B98125;border-radius:14px;overflow:hidden">
        <div style="padding:10px 14px;background:#10B98110;border-bottom:1px solid #10B98120;font-size:11px;font-weight:900;color:#10B981;letter-spacing:.5px">⭐ EXAM TIPS</div>
        <div style="padding:10px 14px">
          ${tp.examTips.map(t=>`<div style="display:flex;gap:8px;padding:6px 0;border-bottom:1px solid #10B98115;font-size:12px;color:var(--text);line-height:1.6"><span style="color:#10B981;flex-shrink:0">✓</span>${t}</div>`).join('')}
        </div>
      </div>` : ''}
      ${tp.commonMistakes && tp.commonMistakes.length ? `
      <div style="margin-top:12px;background:#EF44440f;border:1px solid #EF444425;border-radius:14px;overflow:hidden">
        <div style="padding:10px 14px;background:#EF444410;border-bottom:1px solid #EF444420;font-size:11px;font-weight:900;color:#EF4444;letter-spacing:.5px">⚠️ COMMON MISTAKES</div>
        <div style="padding:10px 14px">
          ${tp.commonMistakes.map(m=>`<div style="display:flex;gap:8px;padding:6px 0;border-bottom:1px solid #EF444415;font-size:12px;color:var(--text);line-height:1.6"><span style="color:#EF4444;flex-shrink:0">✗</span>${m}</div>`).join('')}
        </div>
      </div>` : ''}
      <div style="display:flex;gap:8px;margin-top:14px">
        <button onclick="S.screen='chat';S.subject='${subj.label} IGCSE — ${tp.title}';S.messages=[{role:'user',content:'Explain ${tp.title.replace(/'/g,"\\'")} for IGCSE ${subj.label} in detail with worked examples and exam tips'}];render();setTimeout(()=>doSend&&doSend(),100)"
          style="flex:1;padding:11px;background:var(--primary);color:#fff;border:none;border-radius:12px;cursor:pointer;font-family:Cairo,sans-serif;font-weight:700;font-size:12px">
          🤖 Explain with AI
        </button>
        <button onclick="S.screen='flashcards';S.subject='${subj.label} — ${tp.title.replace(/'/g,"\\'")}';doGenerateFlashcards()"
          style="padding:11px 14px;background:var(--bg-card);border:1px solid var(--border);color:var(--text);border-radius:12px;cursor:pointer;font-size:12px;font-weight:700">
          🗂️
        </button>
      </div>`;
  } else if (S.igcseTab === 'flashcards') {
    const cards = tp.points.map((p,i)=>{
      const parts = p.split(/:\s+|—\s+/);
      const front = parts.length>1 ? parts[0].trim() : `Point ${i+1}`;
      const back = p.trim();
      return {front, back};
    });
    const totalCards = cards.length;
    const fcIdx = Math.min(S.igcseFcIdx||0, totalCards-1);
    const card = cards[fcIdx];
    const flipped = S.igcseFcFlipped||false;
    tabContent = `
      <div style="text-align:center;margin-bottom:12px">
        <div style="font-size:10px;color:var(--text-muted);font-weight:800;letter-spacing:1px">FLASHCARD ${fcIdx+1} OF ${totalCards}</div>
        <div style="height:3px;background:var(--border);border-radius:2px;margin:6px auto;max-width:200px">
          <div style="height:100%;width:${Math.round((fcIdx+1)/totalCards*100)}%;background:${subj.color};border-radius:2px;transition:.4s"></div>
        </div>
      </div>
      <!-- Card -->
      <div onclick="S.igcseFcFlipped=!S.igcseFcFlipped;render()" style="cursor:pointer;min-height:180px;background:var(--bg-card);border:2px solid ${subj.color}55;border-radius:20px;padding:28px 20px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;margin-bottom:14px;transition:.2s;box-shadow:0 4px 20px ${subj.color}18"
        onmouseover="this.style.boxShadow='0 8px 30px ${subj.color}33'" onmouseout="this.style.boxShadow='0 4px 20px ${subj.color}18'">
        ${flipped ? `
          <div style="font-size:10px;color:${subj.color};font-weight:900;letter-spacing:1px;margin-bottom:12px">ANSWER</div>
          <div style="font-size:13px;color:var(--text);line-height:1.75;max-width:340px">${card.back}</div>
        ` : `
          <div style="font-size:10px;color:var(--text-muted);font-weight:900;letter-spacing:1px;margin-bottom:12px">TAP TO REVEAL</div>
          <div style="font-size:16px;font-weight:900;color:var(--text);line-height:1.5;max-width:300px">${card.front}</div>
          <div style="margin-top:12px;font-size:22px;opacity:.4">🃏</div>
        `}
      </div>
      <!-- Controls -->
      <div style="display:flex;gap:10px;justify-content:center;margin-bottom:12px">
        <button onclick="S.igcseFcIdx=Math.max(0,(S.igcseFcIdx||0)-1);S.igcseFcFlipped=false;render()"
          ${fcIdx===0?'disabled':''} style="padding:10px 20px;border-radius:12px;border:1px solid var(--border);background:var(--bg-card);color:var(--text);cursor:pointer;font-size:12px;font-weight:700;font-family:Cairo,sans-serif;${fcIdx===0?'opacity:.4;cursor:default':''}">
          ‹ Prev
        </button>
        <button onclick="S.igcseFcFlipped=!S.igcseFcFlipped;render()"
          style="padding:10px 20px;border-radius:12px;border:none;background:${subj.color};color:#fff;cursor:pointer;font-size:12px;font-weight:700;font-family:Cairo,sans-serif">
          ${flipped?'🙈 Hide':'👁️ Reveal'}
        </button>
        <button onclick="S.igcseFcIdx=Math.min(${totalCards-1},(S.igcseFcIdx||0)+1);S.igcseFcFlipped=false;render()"
          ${fcIdx===totalCards-1?'disabled':''} style="padding:10px 20px;border-radius:12px;border:1px solid var(--border);background:var(--bg-card);color:var(--text);cursor:pointer;font-size:12px;font-weight:700;font-family:Cairo,sans-serif;${fcIdx===totalCards-1?'opacity:.4;cursor:default':''}">
          Next ›
        </button>
      </div>
      <!-- Shuffle / Reset -->
      <div style="display:flex;gap:8px;justify-content:center">
        <button onclick="S.igcseFcIdx=0;S.igcseFcFlipped=false;render()"
          style="padding:8px 16px;border-radius:10px;border:1px solid var(--border);background:var(--bg);color:var(--text-muted);cursor:pointer;font-size:11px;font-weight:700;font-family:Cairo,sans-serif">
          ↺ Reset
        </button>
        <button onclick="S.screen='chat';S.subject='${subj.label} Flashcards';S.messages=[{role:'user',content:'Create 10 Q&A flashcards for IGCSE ${subj.label} topic: ${tp.title.replace(/'/g,"\\'")}. Format each as Q: ... / A: ...'}];render();setTimeout(()=>doSend&&doSend(),100)"
          style="padding:8px 16px;border-radius:10px;border:1px solid ${subj.color}44;background:${subj.color}10;color:${subj.color};cursor:pointer;font-size:11px;font-weight:700;font-family:Cairo,sans-serif">
          🤖 AI Flashcards (×10)
        </button>
      </div>`;
  } else if (S.igcseTab === 'questions') {
    tabContent = `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:24px 16px;text-align:center;margin-bottom:12px">
        <div style="font-size:36px;margin-bottom:10px">❓</div>
        <div style="font-size:15px;font-weight:900;color:var(--text);margin-bottom:6px">AI Practice Questions</div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:18px;line-height:1.6">Get 5 IGCSE-style exam questions on <strong>${tp.title}</strong> with full mark schemes</div>
        <button onclick="S.screen='chat';S.subject='IGCSE ${subj.label}';S.messages=[{role:'user',content:'Generate 5 IGCSE-style exam questions on the topic: ${tp.title.replace(/'/g,"\\'")} (${subj.label}). Include: 2 short answer (2-4 marks), 2 structured (4-6 marks), 1 extended response (6-8 marks). Provide full mark schemes for each.'}];render();setTimeout(()=>doSend&&doSend(),100)"
          style="width:100%;padding:12px;background:${subj.color};color:#fff;border:none;border-radius:12px;cursor:pointer;font-family:Cairo,sans-serif;font-weight:700;font-size:13px;margin-bottom:10px">
          🤖 Generate 5 Exam Questions
        </button>
        <button onclick="S.screen='quiz';S.subject='IGCSE ${subj.label} — ${tp.title.replace(/'/g,"\\'")}';doGenerateQuiz()"
          style="width:100%;padding:12px;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:12px;cursor:pointer;font-family:Cairo,sans-serif;font-weight:700;font-size:13px">
          📝 Quick MCQ Quiz
        </button>
      </div>
      <div style="padding:12px 14px;background:#F59E0B0f;border-radius:12px;border:1px solid #F59E0B25;font-size:12px;color:var(--text-muted)">
        💡 <strong>Exam tip:</strong> ~1 minute per mark. Read question carefully — note key command words: <em>state, describe, explain, calculate, evaluate, discuss</em>
      </div>`;
  } else {
    const ppLink = subj.pastPapers[S.igcseBoard] || '#';
    tabContent = `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:24px 16px;text-align:center;margin-bottom:12px">
        <div style="font-size:36px;margin-bottom:10px">📄</div>
        <div style="font-size:15px;font-weight:900;color:var(--text);margin-bottom:4px">Official Past Papers</div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:18px">${board.label} · ${subj.label}</div>
        <a href="${ppLink}" target="_blank" rel="noopener"
          style="display:block;padding:12px;background:${board.color};color:#fff;border-radius:12px;text-decoration:none;font-family:Cairo,sans-serif;font-weight:700;font-size:13px;margin-bottom:8px">
          📥 Open Official Past Papers
        </a>
        <button onclick="S.screen='chat';S.subject='IGCSE ${subj.label}';S.messages=[{role:'user',content:'Give me 3 typical past paper questions about ${tp.title.replace(/'/g,"\\'")} from ${board.label} IGCSE exams, with example answers and examiner tips'}];render();setTimeout(()=>doSend&&doSend(),100)"
          style="width:100%;padding:12px;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:12px;cursor:pointer;font-family:Cairo,sans-serif;font-weight:700;font-size:13px">
          💬 Ask AI for Past Paper Questions
        </button>
      </div>
      <div style="padding:12px 14px;background:var(--bg-card);border-radius:12px;border:1px solid var(--border)">
        <div style="font-size:11px;font-weight:800;color:var(--text);margin-bottom:8px">📌 Exam Strategy for ${tp.title}</div>
        <div style="display:flex;flex-direction:column;gap:6px;font-size:12px;color:var(--text-muted)">
          <div>✦ Read command words carefully — "state" (1-2 words), "explain" (reason needed), "discuss" (both sides)</div>
          <div>✦ Show all working in calculations — method marks available even if final answer wrong</div>
          <div>✦ Time management: ~1 minute per mark; move on if stuck</div>
        </div>
      </div>`;
  }

  return `
<div style="max-width:860px;margin:0 auto;padding:0 0 80px">
  <!-- Breadcrumb + Topic Header -->
  <div style="background:linear-gradient(135deg,${subj.color}ee,${subj.color}aa);padding:16px 16px 20px;border-radius:0 0 22px 22px;margin-bottom:14px">
    <!-- Breadcrumb -->
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:12px;flex-wrap:wrap">
      <button onclick="S.igcseSubject=null;S.igcseTopic=null;S.igcseChapter=null;render()"
        style="background:#ffffff20;border:none;border-radius:8px;padding:3px 10px;color:#ffffffdd;cursor:pointer;font-size:10px;font-family:Cairo,sans-serif;font-weight:700">Hub</button>
      <span style="color:#ffffff55;font-size:10px">›</span>
      <button onclick="S.igcseTopic=null;render()"
        style="background:#ffffff20;border:none;border-radius:8px;padding:3px 10px;color:#ffffffdd;cursor:pointer;font-size:10px;font-family:Cairo,sans-serif;font-weight:700">${subj.label}</button>
      <span style="color:#ffffff55;font-size:10px">›</span>
      <span style="font-size:10px;color:#ffffffbb">${ch.title}</span>
    </div>
    <!-- Topic title + progress -->
    <div style="font-size:18px;font-weight:900;color:#fff;margin-bottom:4px;line-height:1.3">${tp.title}</div>
    <div style="font-size:10px;color:#ffffffaa">${subj.icon} ${subj.label} · ${board.icon} ${board.short} · Topic ${curIdx+1} of ${allTopics.length}</div>
    <!-- Mini progress bar -->
    <div style="margin-top:10px;height:3px;background:#ffffff25;border-radius:2px">
      <div style="height:100%;width:${Math.round((curIdx+1)/allTopics.length*100)}%;background:#fff;border-radius:2px;transition:.4s"></div>
    </div>
  </div>
  <!-- Tabs -->
  <div style="display:flex;gap:6px;padding:0 12px;margin-bottom:14px">${tabs}</div>
  <!-- Tab Content -->
  <div style="padding:0 12px">${tabContent}</div>
  <!-- Next / Prev navigation -->
  <div style="display:flex;gap:10px;padding:16px 12px 0;justify-content:space-between">
    ${prevT?`<button onclick="S.igcseChapter=${prevT.ci};S.igcseTopic=${prevT.ti};S.igcseTab='notes';render()"
      style="padding:10px 16px;border:1px solid var(--border);border-radius:12px;background:var(--bg-card);cursor:pointer;font-size:12px;color:var(--text);font-family:Cairo,sans-serif;font-weight:700;display:flex;align-items:center;gap:6px">
      ‹ Previous
    </button>`:'<div></div>'}
    ${nextT?`<div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
      <button onclick="S.igcseDone=S.igcseDone||{};S.igcseDone['${S.igcseSubject}-${S.igcseChapter}-${S.igcseTopic}']=true;S.igcseChapter=${nextT.ci};S.igcseTopic=${nextT.ti};S.igcseTab='notes';S.igcseFcIdx=0;S.igcseFcFlipped=false;render()"
        style="padding:11px 16px;border:none;border-radius:12px;background:#10B981;cursor:pointer;font-size:12px;color:#fff;font-family:Cairo,sans-serif;font-weight:700;box-shadow:0 2px 10px #10B98144;display:flex;align-items:center;gap:6px;white-space:nowrap">
        ✅ Mark Done &amp; Next →
      </button>
      <button onclick="S.igcseChapter=${nextT.ci};S.igcseTopic=${nextT.ti};S.igcseTab='notes';S.igcseFcIdx=0;S.igcseFcFlipped=false;render()"
        style="padding:8px 14px;border:1px solid ${subj.color}66;border-radius:10px;background:transparent;cursor:pointer;font-size:11px;color:${subj.color};font-family:Cairo,sans-serif;font-weight:600;display:flex;align-items:center;gap:4px">
        Skip →
      </button>
    </div>`:'<div></div>'}
  </div>
</div>`;
}

function tplTextbook() {
  const curData   = CURRICULA[S.curriculum] || CURRICULA.egypt;
  const gradeData = (curData.grades && (curData.grades[S.grade] || Object.values(curData.grades)[0])) || { label:'' };

  // ── If viewing a PDF ─────────────────────────────────────────────
  if (S.textbookUrl && S.textbookUrl !== 'home') {
    const viewUrl = S.textbookViewUrl || S.textbookUrl;
    const dlUrl   = S.textbookUrl;
    const isGdrive = viewUrl.includes('drive.google.com');
    const viewer = isGdrive
      ? `<iframe src="${viewUrl}" allowfullscreen style="width:100%;height:calc(100vh - 110px);border:none;display:block"></iframe>`
      : `<embed src="${viewUrl}" type="application/pdf" style="width:100%;height:calc(100vh - 110px);display:block">`;
    return `
<div class="screen-header" style="gap:8px">
  <button id="tb-home" style="background:none;border:1px solid var(--border);border-radius:8px;padding:6px 12px;cursor:pointer;font-family:Cairo,sans-serif;font-size:12px;color:var(--text)">← رجوع</button>
  <div class="screen-title" style="font-size:14px">📖 عارض الكتاب</div>
  <a href="${dlUrl}" target="_blank"
    style="margin-right:auto;background:var(--primary);color:#fff;border-radius:8px;padding:6px 14px;font-size:12px;font-weight:700;text-decoration:none;font-family:Cairo,sans-serif">⬇️ تحميل</a>
</div>
${viewer}`;
  }

  // ── Book Library ─────────────────────────────────────────────────
  // Map S.grade to TEXTBOOK_DB key
  const gradeMap = { high:'high', middle:'middle', primary:'primary',
    high_med:'high', high_eng:'high', high_biz:'high', high_arts:'high',
    high1:'high1', high2:'high2' };
  const gradeKey = gradeMap[S.grade] || 'high';
  const dbEntry  = TEXTBOOK_DB[S.curriculum] || TEXTBOOK_DB.egypt || {};
  const gradeBooks = dbEntry[gradeKey] || dbEntry.high || [];

  const isAr = !['igcse','cambridge_alevel','edexcel','aqa','ocr','american','ib','cbse','icse','french_bac','australian','canadian'].includes(S.curriculum);

  const q = encodeURIComponent(gradeData.label + ' ' + curData.label);

  const categories = [
    {
      title: '📚 كتب الوزارة والمناهج الرسمية',
      color: '#3B82F6',
      links: [
        { name:'بوابة التعليم المصري', url:'https://www.moe.gov.eg', icon:'🏛️', desc:'وزارة التربية والتعليم' },
        { name:'كتب مجانية PDF', url:`https://www.google.com/search?q=${q}+كتاب+وزارة+PDF`, icon:'📄', desc:'بحث عن كتاب الوزارة' },
        { name:'منصة حصص', url:'https://www.hessesplatform.com', icon:'🎯', desc:'منصة تعليم مصر الرسمية' },
        { name:'مكتبة الإسكندرية', url:'https://www.bibalex.org', icon:'📖', desc:'مكتبة رقمية عربية' },
      ]
    },
    {
      title: '🎬 فيديوهات وشروحات',
      color: '#EF4444',
      links: [
        { name:'YouTube — شرح المنهج', url:`https://www.youtube.com/results?search_query=${q}+شرح`, icon:'▶️', desc:'شروحات المدرسين' },
        { name:'Khan Academy عربي', url:`https://ar.khanacademy.org/search?page_search_query=${encodeURIComponent(S.subject)}`, icon:'🎓', desc:'دروس مجانية تفاعلية' },
        { name:'Nafham', url:`https://www.nafham.com/search?q=${encodeURIComponent(S.subject)}`, icon:'💡', desc:'منصة نفهم العربية' },
      ]
    },
    {
      title: '📝 ملخصات ومذكرات',
      color: '#10B981',
      links: [
        { name:'ملخصات PDF', url:`https://www.google.com/search?q=${q}+ملخص+PDF+مذكرة`, icon:'📋', desc:'ملخصات جاهزة للطباعة' },
        { name:'SlideShare', url:`https://www.slideshare.net/search/slideshow?searchfrom=header&q=${encodeURIComponent(S.subject+' '+gradeData.label)}`, icon:'📊', desc:'عروض تقديمية' },
        { name:'Docsity', url:`https://www.docsity.com/ar/search#url=/?query=${encodeURIComponent(S.subject)}`, icon:'📑', desc:'ملاحظات الطلاب' },
      ]
    },
    {
      title: '🔬 أدوات وتطبيقات',
      color: '#8B5CF6',
      links: [
        { name:'Wolfram Alpha', url:`https://www.wolframalpha.com/input?i=${encodeURIComponent(S.subject)}`, icon:'🧮', desc:'حل المسائل الرياضية' },
        { name:'GeoGebra', url:`https://www.geogebra.org/search/${encodeURIComponent(S.subject)}`, icon:'📐', desc:'هندسة تفاعلية' },
        { name:'Wikipedia عربي', url:`https://ar.wikipedia.org/wiki/${encodeURIComponent(S.subject)}`, icon:'🌐', desc:'موسوعة حرة' },
        { name:'Quizlet', url:`https://quizlet.com/search?query=${encodeURIComponent(S.subject+' '+gradeData.label)}&type=all`, icon:'🗂️', desc:'بطاقات تعليمية جاهزة' },
      ]
    },
  ];

  return `
<div class="screen-header"><div class="screen-title">📚 مكتبة الكتب</div></div>
<div class="screen-body">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#1E293B,#253047);border:1px solid #3B82F633;border-radius:16px;padding:16px;margin-bottom:20px;display:flex;align-items:center;gap:14px">
    <div style="font-size:40px">📚</div>
    <div>
      <div style="font-size:16px;font-weight:900;color:var(--text)">مكتبة كتب الوزارة</div>
      <div style="font-size:12px;color:var(--text-muted);margin-top:2px">${curData.label} · ${gradeData.label} · اقرأ الكتاب مباشرة داخل التطبيق</div>
    </div>
  </div>

  <!-- Books for current grade -->
  ${gradeBooks.length > 0 ? `
  <div style="margin-bottom:24px">
    <div style="font-size:13px;font-weight:800;color:var(--text-muted);margin-bottom:12px">📖 كتب ${gradeData.label}</div>
    <div style="display:flex;flex-direction:column;gap:10px">
      ${gradeBooks.map(subj => `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:14px;overflow:hidden">
        <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid var(--border);background:${subj.color}11">
          <span style="font-size:22px">${subj.icon}</span>
          <span style="font-size:14px;font-weight:900;color:var(--text)">${esc(subj.subj)}</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:0">
          ${subj.books.map((book,bi) => `
          <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;${bi>0?'border-top:1px solid var(--border);':''}">
            <div style="width:40px;height:52px;border-radius:6px;background:${subj.color}22;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">📄</div>
            <div style="flex:1;text-align:right">
              <div style="font-size:13px;font-weight:800;color:var(--text)">${esc(book.title)}</div>
              <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${esc(book.term||'')}</div>
              <div style="display:inline-block;margin-top:4px;background:${subj.color}22;color:${subj.color};font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px">${book.badge||'📚 وزارة التعليم'}</div>
            </div>
            <div style="display:flex;flex-direction:column;gap:5px;flex-shrink:0">
              <a href="${book.viewUrl || book.url}" target="_blank" rel="noopener"
                style="background:${subj.color};color:#fff;font-size:11px;font-weight:700;padding:6px 12px;border-radius:8px;border:none;cursor:pointer;font-family:Cairo,sans-serif;display:block;text-decoration:none;text-align:center">
                📖 ${book.external?'افتح':'قراءة'}
              </a>
              ${book.external?'':`<a href="${book.url}" target="_blank" rel="noopener"
                style="background:transparent;color:${subj.color};font-size:11px;font-weight:700;padding:5px 12px;border-radius:8px;border:1px solid ${subj.color};cursor:pointer;font-family:Cairo,sans-serif;display:block;text-decoration:none;text-align:center">
                ⬇️ تحميل
              </a>`}
            </div>
          </div>`).join('')}
        </div>
      </div>`).join('')}
    </div>
  </div>` : `
  <div style="background:var(--bg-card);border:1px dashed var(--border);border-radius:14px;padding:32px;text-align:center;margin-bottom:20px">
    <div style="font-size:40px;margin-bottom:8px">📚</div>
    <div style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:4px">الكتب قيد الإضافة</div>
    <div style="font-size:12px;color:var(--text-muted)">يتم إضافة كتب ${curData.label} تدريجياً</div>
  </div>`}

  <!-- Online Resources -->
  <div>
    <div style="font-size:13px;font-weight:800;color:var(--text-muted);margin-bottom:12px">🌐 مصادر تعليمية إضافية</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px">
      ${[
        { name:'Khan Academy', icon:'🎓', color:'#14BF96', url:'https://ar.khanacademy.org' },
        { name:'نفهم', icon:'💡', color:'#3B82F6', url:'https://www.nafham.com' },
        { name:'GeoGebra', icon:'📐', color:'#9B4DCA', url:'https://www.geogebra.org' },
        { name:'Wolfram Alpha', icon:'🧮', color:'#F59E0B', url:'https://www.wolframalpha.com' },
      ].map(r=>`
      <a href="${r.url}" target="_blank" rel="noopener"
        style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px 10px;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;text-decoration:none;cursor:pointer;transition:.2s"
        onmouseover="this.style.borderColor='${r.color}'" onmouseout="this.style.borderColor='var(--border)'">
        <span style="font-size:26px">${r.icon}</span>
        <span style="font-size:12px;font-weight:700;color:var(--text)">${r.name}</span>
        <span style="font-size:10px;color:${r.color};font-weight:700">↗ فتح</span>
      </a>`).join('')}
    </div>
  </div>

</div>`;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   UPGRADE
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function tplUpgrade() {
  const u = S.user || {};
  const isPro = u.plan === 'pro';
  const expiryDate = u.planExpiry ? new Date(u.planExpiry) : null;
  const expiry = expiryDate ? expiryDate.toLocaleDateString('ar-EG') : null;
  if (isPro) {
    const now = new Date();
    const daysLeft = expiryDate ? Math.max(0, Math.ceil((expiryDate - now) / (1000*60*60*24))) : 0;
    const isExpiringSoon = daysLeft > 0 && daysLeft <= 7;
    const isExpired = expiryDate && expiryDate < now;
    const barPct = expiryDate ? Math.min(100, Math.round(daysLeft / 30 * 100)) : 100;
    const barColor = daysLeft > 14 ? '#22C55E' : daysLeft > 7 ? '#F59E0B' : '#EF4444';
    return `
<div class="screen-header"><div class="screen-title">⭐ ${S.lang==='en'?'My Plan':'خطتي'}</div></div>
<div class="screen-body">
  <div class="info-card" style="text-align:center;padding:28px;margin-bottom:16px;border-color:#F59E0B44">
    <div style="font-size:64px;margin-bottom:12px">🏆</div>
    <div style="font-size:22px;font-weight:900;color:#F59E0B;margin-bottom:8px">${S.lang==='en'?'You are subscribed to Pro!':'أنت مشترك في Pro!'}</div>
    ${expiryDate ? `
    <div style="color:var(--text-muted);font-size:13px;margin-bottom:16px">
      ${isExpired ? '❌ انتهى الاشتراك' : `${S.lang==='en'?'Expires:':'ينتهي في:'} <b style="color:${barColor}">${expiry}</b> (${daysLeft} ${S.lang==='en'?'days left)':'يوم متبقي)'}`}
    </div>
    <div style="background:var(--bg);border-radius:20px;height:10px;overflow:hidden;margin-bottom:8px">
      <div style="height:100%;width:${barPct}%;background:${barColor};border-radius:20px;transition:.5s"></div>
    </div>` : ''}
    ${isExpiringSoon ? `
    <div style="background:#EF444422;border:1px solid #EF444444;border-radius:8px;padding:10px;font-size:13px;color:#EF4444;margin-top:12px">
      ⚠️ اشتراكك ينتهي قريباً! جدّد الآن للاستمرار
    </div>` : ''}
    ${isExpired ? `
    <div style="background:#EF444422;border:1px solid #EF444444;border-radius:8px;padding:10px;font-size:13px;color:#EF4444;margin-top:12px">
      ❌ انتهى اشتراكك — جدّد الآن لاسترداد المزايا كاملة
    </div>` : ''}
    <div style="margin-top:16px;font-size:13px;color:var(--text-muted)">✅ أسئلة غير محدودة &nbsp;|&nbsp; 🧠 خرائط ذهنية &nbsp;|&nbsp; 📸 حل بالصورة</div>
  </div>
  ${(isExpiringSoon || isExpired) ? `
  <button class="btn btn-primary" style="width:100%;max-width:400px;display:block;margin:0 auto 16px;font-size:16px;padding:14px" onclick="S.user.plan='free';render()">
    🔄 تجديد الاشتراك
  </button>` : ''}
</div>`;
  }
  return `
<div class="screen-header"><div class="screen-title">⭐ ${S.lang==='en'?'Upgrade to Pro':'الترقية إلى Pro'}</div></div>
<div class="screen-body">

  <!-- Plans -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px;max-width:560px;margin-left:auto;margin-right:auto">
    <div class="info-card" style="text-align:center">
      <div style="font-size:28px;margin-bottom:8px">🔓</div>
      <div style="font-size:17px;font-weight:900;margin-bottom:12px">مجاني</div>
      <ul style="list-style:none;padding:0;margin:0 0 16px;font-size:13px;color:var(--text-muted);line-height:2.2;text-align:right">
        <li>✅ &#xA0;${S.lang==='en'?'5 questions/day':'5 أسئلة يومياً'}</li>
        <li>✅ &#xA0;${S.lang==='en'?'Flashcards':'بطاقات تعليمية'}</li>
        <li>✅ &#xA0;${S.lang==='en'?'Basic quizzes':'اختبارات أساسية'}</li>
        <li>❌ &#xA0;ملخصات ذكية</li>
        <li>❌ &#xA0;خرائط ذهنية</li>
        <li>❌ &#xA0;حل بالصورة</li>
        <li>❌ &#xA0;إدخال صوتي</li>
      </ul>
      <div style="font-size:20px;font-weight:900">مجاناً</div>
    </div>
    <div class="info-card" style="text-align:center;border-color:var(--primary);background:var(--primary)11;position:relative">
      <div style="position:absolute;top:-10px;right:50%;transform:translateX(50%);
                  background:var(--primary);color:#fff;font-size:11px;font-weight:800;
                  padding:3px 12px;border-radius:20px">الأفضل</div>
      <div style="font-size:28px;margin-bottom:8px">⭐</div>
      <div style="font-size:17px;font-weight:900;margin-bottom:12px;color:var(--primary)">Pro</div>
      <ul style="list-style:none;padding:0;margin:0 0 16px;font-size:13px;line-height:2.2;text-align:right">
        <li>✅ &#xA0;${S.lang==='en'?'Unlimited questions':'أسئلة غير محدودة'}</li>
        <li>✅ &#xA0;${S.lang==='en'?'All subjects & levels':'كل المواد والمراحل'}</li>
        <li>✅ &#xA0;${S.lang==='en'?'Smart summaries':'ملخصات ذكية'}</li>
        <li>✅ &#xA0;${S.lang==='en'?'Mind maps':'خرائط ذهنية'}</li>
        <li>✅ &#xA0;${S.lang==='en'?'Photo problem solving':'حل مسائل بالصورة'}</li>
        <li>✅ &#xA0;${S.lang==='en'?'Voice input':'إدخال صوتي'}</li>
        <li>✅ &#xA0;${S.lang==='en'?'PDF export':'تصدير PDF'}</li>
      </ul>
      <!-- Plan selector -->
      <select id="pay-plan-sel" style="width:100%;margin-bottom:14px;padding:11px;border-radius:8px;border:1.5px solid var(--border);background:var(--surface);color:var(--text);font-size:14px;font-family:inherit;cursor:pointer">
        <option value="monthly">📅 شهري — 1.85 د.ك / $6</option>
        <option value="yearly">🔥 سنوي — 14.9 د.ك / $49 (توفير 37%)</option>
      </select>
      <!-- Payment gateway buttons -->
      <div style="display:grid;gap:10px">
        <button class="btn btn-primary" id="b-paypal" style="width:100%;font-size:15px;padding:13px;background:#003087;border-color:#003087">
          <span style="font-size:20px">💳</span> PayPal — <span style="font-size:12px;opacity:.85">عالمي (Visa/Master/PayPal)</span>
        </button>
        <button class="btn btn-primary" id="b-myfatoorah" style="width:100%;font-size:15px;padding:13px;background:#1a8754;border-color:#1a8754">
          <span style="font-size:20px">🇰🇼</span> MyFatoorah — <span style="font-size:12px;opacity:.85">KNET + بطاقات خليجية</span>
        </button>
        <button class="btn btn-secondary" id="b-stripe" style="width:100%;font-size:13px;padding:11px;opacity:.7">
          Tap Payments *(قريباً)*
        </button>
      </div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:10px;text-align:center">${S.lang==='en'?'🔒 100% secure — we never store your card details':'🔒 دفع آمن 100% — لا نحتفظ ببيانات بطاقتك'}</div>
    </div>
  </div>

  <!-- Local Payment (Fawry / Vodafone Cash) -->
  <div class="info-card" style="max-width:560px;margin:0 auto 16px">
    <div style="font-weight:800;margin-bottom:14px">💵 الدفع المحلي (مصر)</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
      <button class="btn btn-secondary" id="b-fawry" style="padding:14px;font-size:14px">
        <div style="font-size:24px;margin-bottom:4px">&#x1F9FE;</div>
        فوري
      </button>
      <button class="btn btn-secondary" id="b-vf" style="padding:14px;font-size:14px">
        <div style="font-size:24px;margin-bottom:4px">&#x1F4F1;</div>
        فودافون كاش
      </button>
    </div>
    <div id="local-pay-info" style="display:none;background:var(--bg-card2);border-radius:10px;padding:14px;font-size:13px;line-height:1.8"></div>
  </div>

  <!-- Promo Code -->
  <div class="info-card" style="max-width:560px;margin:0 auto 16px">
    <div style="font-weight:800;margin-bottom:10px">🎁 ${S.lang==='en'?'Have an upgrade code?':'عندك كود ترقية؟'}</div>
    <div style="display:flex;gap:8px">
      <input id="promo-inp" class="form-input" placeholder="${S.lang==='en'?'Enter code (e.g. OSTAZ2025)':'أدخل الكود هنا (مثال: OSTAZ2025)'}" style="flex:1;letter-spacing:2px;text-transform:uppercase"/>
      <button class="btn btn-primary" id="b-redeem">${S.lang==='en'?'Activate':'تفعيل'}</button>
    </div>
    <div id="promo-msg" style="display:none;margin-top:8px;font-size:13px;font-weight:700"></div>
  </div>

  <!-- Free trial via referral -->
  ${(S.user?.referralCode) ? `
  <div class="info-card" style="max-width:560px;margin:0 auto;border-color:#25D36644;background:#25D36608;text-align:center">
    <div style="font-size:18px;font-weight:900;margin-bottom:6px">💬 شارك مع صديق — اشترك معاً مجاناً</div>
    <div style="font-size:13px;color:var(--text-muted);margin-bottom:12px">اشترك بكودك الشخصي وكلاكما يحصل على 7 أيام Pro مجاناً</div>
    <button class="btn btn-primary" id="b-whatsapp-ref-up" style="background:#25D366;border-color:#25D366;width:100%;max-width:280px">
      💬 شارك عبر واتساب
    </button>
  </div>` : ''}

</div>`;
}

function tplLessons() {
  const curData   = CURRICULA[S.curriculum] || CURRICULA.egypt;
  const gradeData = (curData.grades && (curData.grades[S.grade] || curData.grades.high || Object.values(curData.grades)[0])) || { label:'', subjects:[] };
  const subjects  = gradeData.subjects || [];

  // ── VIEW: LESSON DETAIL ─────────────────────────────────────────────
  if (S.lessonView === 'lesson' && S.lessonSubject && S.lessonChapter) {
    const subj = S.lessonSubject;
    const chap = S.lessonChapter;
    const chapIdx = subj.topics.indexOf(chap);
    const chapNum = chapIdx + 1;
    const isEn = ['igcse','cambridge_alevel','edexcel','aqa','ocr','american','ib','cbse','icse','french_bac','australian','canadian'].includes(S.curriculum);
    return `
<div class="screen-header">
  <button onclick="S.lessonView='chapters';render()" style="background:none;border:none;cursor:pointer;font-size:18px;color:var(--primary);padding:0 8px 0 0">←</button>
  <div class="screen-title" style="font-size:15px">${esc(subj.name)} › الفصل ${chapNum}</div>
</div>
<div class="screen-body">

  <!-- Chapter Header -->
  <div style="background:linear-gradient(135deg,${subj.color}22,${subj.color}11);border:1px solid ${subj.color}44;border-radius:16px;padding:20px;margin-bottom:16px">
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:8px">
      <div style="width:52px;height:52px;border-radius:14px;background:${subj.color}33;display:flex;align-items:center;justify-content:center;font-size:26px">${subj.icon}</div>
      <div>
        <div style="font-size:11px;color:var(--text-muted);font-weight:700">الفصل ${chapNum} من ${subj.topics.length}</div>
        <div style="font-size:18px;font-weight:900;color:var(--text)">${esc(chap)}</div>
      </div>
    </div>
    <!-- Resource Toggle -->
    <div style="display:flex;gap:6px;margin-top:12px">
      <button onclick="S.lessonResource='ministry';render()" style="flex:1;padding:8px;border-radius:10px;border:1.5px solid ${S.lessonResource==='ministry'?subj.color:'var(--border)'};background:${S.lessonResource==='ministry'?subj.color+'22':'transparent'};color:${S.lessonResource==='ministry'?subj.color:'var(--text-muted)'};font-family:Cairo,sans-serif;font-size:12px;font-weight:700;cursor:pointer">
        📚 كتب الوزارة
      </button>
      <button onclick="S.lessonResource='external';render()" style="flex:1;padding:8px;border-radius:10px;border:1.5px solid ${S.lessonResource==='external'?'#8B5CF6':'var(--border)'};background:${S.lessonResource==='external'?'#8B5CF622':'transparent'};color:${S.lessonResource==='external'?'#8B5CF6':'var(--text-muted)'};font-family:Cairo,sans-serif;font-size:12px;font-weight:700;cursor:pointer">
        🌐 مصادر خارجية
      </button>
      <button onclick="S.lessonResource='ai';render()" style="flex:1;padding:8px;border-radius:10px;border:1.5px solid ${S.lessonResource==='ai'?'#F59E0B':'var(--border)'};background:${S.lessonResource==='ai'?'#F59E0B22':'transparent'};color:${S.lessonResource==='ai'?'#F59E0B':'var(--text-muted)'};font-family:Cairo,sans-serif;font-size:12px;font-weight:700;cursor:pointer">
        🤖 AI
      </button>
    </div>
  </div>

  <!-- Ministry Books -->
  ${S.lessonResource === 'ministry' ? `
  <div style="margin-bottom:16px">
    <div style="font-size:13px;font-weight:800;color:var(--text);margin-bottom:10px">📚 كتب الوزارة الرسمية</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <button onclick="S.screen='textbook';S.textbookUrl='home';render()"
        style="display:flex;align-items:center;gap:12px;padding:14px;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;cursor:pointer;text-align:right;width:100%;font-family:Cairo,sans-serif">
        <span style="font-size:24px">📖</span>
        <div style="text-align:right">
          <div style="font-size:14px;font-weight:800;color:var(--text)">${esc(chap)} — كتاب الطالب</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${curData.label} · ${gradeData.label}</div>
        </div>
        <span style="margin-right:auto;color:var(--primary);font-size:12px;font-weight:700">فتح ←</span>
      </button>
      <button onclick="window.open('https://www.google.com/search?q=${encodeURIComponent(chap+' '+subj.name+' شرح المنهج المصري PDF')}','_blank')"
        style="display:flex;align-items:center;gap:12px;padding:14px;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;cursor:pointer;text-align:right;width:100%;font-family:Cairo,sans-serif">
        <span style="font-size:24px">📝</span>
        <div style="text-align:right">
          <div style="font-size:14px;font-weight:800;color:var(--text)">مذكرات وملخصات الفصل</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:2px">ملخصات مدرسين موثوقة</div>
        </div>
        <span style="margin-right:auto;color:var(--primary);font-size:12px;font-weight:700">بحث ←</span>
      </button>
    </div>
  </div>` : ''}

  <!-- External Resources -->
  ${S.lessonResource === 'external' ? `
  <div style="margin-bottom:16px">
    <div style="font-size:13px;font-weight:800;color:var(--text);margin-bottom:10px">🌐 مصادر تعليمية خارجية</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${[
        { icon:'▶️', name:'YouTube', color:'#FF0000', url:`https://www.youtube.com/results?search_query=${encodeURIComponent(chap+' '+subj.name+' شرح')}`, desc:'فيديوهات شرح' },
        { icon:'📐', name:'Khan Academy', color:'#14BF96', url:`https://ar.khanacademy.org/search?page_search_query=${encodeURIComponent(chap)}`, desc:'دروس تفاعلية مجانية' },
        { icon:'📑', name:'Geogebra', color:'#9B4DCA', url:`https://www.geogebra.org/search/${encodeURIComponent(chap)}`, desc:'أدوات رياضية تفاعلية' },
        { icon:'🌍', name:'Wikipedia', color:'#3366CC', url:`https://ar.wikipedia.org/wiki/${encodeURIComponent(chap)}`, desc:'شرح موسوعي' },
      ].map(r=>`
      <button onclick="window.open('${r.url}','_blank')"
        style="display:flex;align-items:center;gap:12px;padding:14px;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;cursor:pointer;text-align:right;width:100%;font-family:Cairo,sans-serif">
        <div style="width:40px;height:40px;border-radius:10px;background:${r.color}22;display:flex;align-items:center;justify-content:center;font-size:20px">${r.icon}</div>
        <div style="text-align:right">
          <div style="font-size:14px;font-weight:800;color:var(--text)">${r.name}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${r.desc}</div>
        </div>
        <span style="margin-right:auto;color:${r.color};font-size:12px;font-weight:700">فتح ←</span>
      </button>`).join('')}
    </div>
  </div>` : ''}

  <!-- AI Lesson -->
  ${S.lessonResource === 'ai' ? `
  <div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <div style="font-size:13px;font-weight:800;color:var(--text)">🤖 درس بالذكاء الاصطناعي</div>
      <button class="btn btn-primary btn-sm" id="b-gen-lesson">
        ${S.lessonLoading?'⏳ جارٍ التوليد...':'✨ توليد الدرس'}
      </button>
    </div>
    ${S.lessonContent ? `
    <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:14px;padding:20px;line-height:2;font-size:14px">
      ${md(S.lessonContent)}
    </div>
    <div style="display:flex;gap:8px;margin-top:12px">
      <button class="btn btn-secondary btn-sm" id="b-lesson-chat">💬 مناقشة في المحادثة</button>
      <button class="btn btn-secondary btn-sm" id="b-lesson-fc">🗂️ بطاقات تعليمية</button>
      <button class="btn btn-secondary btn-sm" id="b-lesson-quiz">📝 اختبار</button>
    </div>` : `
    <div style="background:var(--bg-card);border:1px dashed var(--border);border-radius:14px;padding:32px;text-align:center;color:var(--text-muted)">
      <div style="font-size:36px;margin-bottom:8px">🤖</div>
      <div style="font-size:14px;font-weight:700;margin-bottom:4px">اضغط "توليد الدرس"</div>
      <div style="font-size:12px">سيشرح AI الفصل كاملاً مع أمثلة وتمارين</div>
    </div>`}
  </div>` : ''}

  <!-- Quick AI Chat Button -->
  <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border)">
    <button class="btn btn-primary" style="width:100%" id="b-lesson-ask-ai">
      💬 اسأل AI عن هذا الفصل
    </button>
  </div>

</div>`;
  }

  // ── VIEW: CHAPTERS ───────────────────────────────────────────────────
  if (S.lessonView === 'chapters' && S.lessonSubject) {
    const subj = S.lessonSubject;
    return `
<div class="screen-header">
  <button onclick="S.lessonView='subjects';S.lessonSubject=null;render()" style="background:none;border:none;cursor:pointer;font-size:18px;color:var(--primary);padding:0 8px 0 0">←</button>
  <div class="screen-title" style="font-size:15px">${subj.icon} ${esc(subj.name)}</div>
</div>
<div class="screen-body">

  <!-- Subject Banner -->
  <div style="background:linear-gradient(135deg,${subj.color}22,${subj.color}11);border:1px solid ${subj.color}44;border-radius:16px;padding:16px;margin-bottom:20px;display:flex;align-items:center;gap:14px">
    <div style="width:52px;height:52px;border-radius:14px;background:${subj.color}33;display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0">${subj.icon}</div>
    <div>
      <div style="font-size:18px;font-weight:900">${esc(subj.name)}</div>
      <div style="font-size:12px;color:var(--text-muted);margin-top:2px">${curData.label} · ${gradeData.label} · ${subj.topics.length} فصل</div>
    </div>
  </div>

  <!-- Chapters List -->
  <div style="font-size:13px;font-weight:800;color:var(--text-muted);margin-bottom:10px">📋 فصول المنهج</div>
  <div style="display:flex;flex-direction:column;gap:8px">
    ${subj.topics.map((topic, idx) => `
    <button class="lesson-chapter-btn" data-topic-idx="${idx}"
      style="display:flex;align-items:center;gap:14px;padding:14px 16px;background:var(--bg-card);border:1px solid var(--border);border-radius:14px;cursor:pointer;text-align:right;width:100%;font-family:Cairo,sans-serif;transition:.2s"
      onmouseover="this.style.borderColor='${subj.color}'" onmouseout="this.style.borderColor='var(--border)'">
      <div style="width:36px;height:36px;border-radius:10px;background:${subj.color}22;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:900;color:${subj.color};flex-shrink:0">${idx+1}</div>
      <div style="flex:1;text-align:right">
        <div style="font-size:14px;font-weight:800;color:var(--text)">${esc(topic)}</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:2px">الفصل ${idx+1}</div>
      </div>
      <span style="color:var(--primary);font-size:18px">←</span>
    </button>`).join('')}
  </div>

  <!-- Quick Actions -->
  <div style="margin-top:20px;display:flex;gap:8px">
    <button class="btn btn-secondary btn-sm" onclick="S.screen='chat';S.subject='${esc(subj.name)}';render()" style="flex:1">💬 محادثة في ${esc(subj.name)}</button>
    <button class="btn btn-secondary btn-sm" onclick="S.screen='flashcards';S.subject='${esc(subj.name)}';doGenerateFlashcards()" style="flex:1">🗂️ بطاقات تعليمية</button>
  </div>
</div>`;
  }

  // ── VIEW: SUBJECTS (default) ─────────────────────────────────────────
  return `
<div class="screen-header"><div class="screen-title">📖 ${S.lang==='en'?'Lessons':'الدروس'}</div></div>
<div class="screen-body">

  ${['igcse','cambridge_alevel','edexcel','aqa','ocr','american','ib','cbse','icse','french_bac','australian','canadian'].includes(S.curriculum) ? `
  <div style="background:#3B82F611;border:1px solid #3B82F633;border-radius:10px;padding:10px 14px;margin-bottom:12px;font-size:12px;display:flex;gap:8px;align-items:flex-start">
    <span style="font-size:16px">ℹ️</span>
    <span style="color:var(--text-muted);line-height:1.7">المحتوى مبني على أحدث إصدار متاح من المنهج الرسمي. <b style="color:var(--primary)">أكواد المواد والموضوعات مُدققة ✅</b></span>
  </div>` : ''}

  <!-- Country & Grade Selector -->
  <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:12px">
    <div style="font-size:12px;font-weight:800;color:var(--text-muted);margin-bottom:8px">🌍 اختر الدولة / المنهج</div>
    <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px">
      ${Object.entries(CURRICULA).map(([k,v])=>`
      <button class="curriculum-btn" data-curriculum="${k}"
        style="padding:5px 10px;border-radius:16px;border:1.5px solid ${S.curriculum===k?'var(--primary)':'var(--border)'};background:${S.curriculum===k?'var(--primary)':'transparent'};color:${S.curriculum===k?'#fff':'var(--text)'};font-family:Cairo,sans-serif;font-size:11px;font-weight:700;cursor:pointer;transition:.2s">
        ${v.label}
      </button>`).join('')}
    </div>
    <div style="font-size:12px;font-weight:800;color:var(--text-muted);margin-bottom:8px">🎓 اختر المرحلة الدراسية</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px">
      ${Object.entries(curData.grades).map(([k,v])=>`
      <button class="grade-btn" data-grade="${k}"
        style="padding:7px 14px;border-radius:10px;border:1.5px solid ${S.grade===k?'var(--primary)':'var(--border)'};background:${S.grade===k?'var(--primary)':'transparent'};color:${S.grade===k?'#fff':'var(--text)'};font-family:Cairo,sans-serif;font-size:12px;font-weight:800;cursor:pointer;transition:.2s">
        ${v.label}
      </button>`).join('')}
    </div>
  </div>

  <!-- Subjects Grid -->
  <div style="font-size:13px;font-weight:800;color:var(--text-muted);margin-bottom:10px">📚 اختر المادة الدراسية</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px">
    ${subjects.map(s=>`
    <button class="lesson-subj-btn" data-subj-idx="${subjects.indexOf(s)}"
      style="display:flex;flex-direction:column;align-items:center;gap:10px;padding:20px 12px;background:var(--bg-card);border:1.5px solid var(--border);border-radius:16px;cursor:pointer;font-family:Cairo,sans-serif;transition:.2s;position:relative"
      onmouseover="this.style.borderColor='${s.color}';this.style.background='${s.color}11'" onmouseout="this.style.borderColor='var(--border)';this.style.background='var(--bg-card)'">
      <div style="width:56px;height:56px;border-radius:16px;background:${s.color}22;display:flex;align-items:center;justify-content:center;font-size:28px">${s.icon}</div>
      <div style="font-size:13px;font-weight:900;color:var(--text);text-align:center">${esc(s.name)}</div>
      <div style="font-size:10px;color:var(--text-muted)">${s.topics.length} فصل</div>
      <div style="position:absolute;top:8px;left:8px;width:6px;height:6px;border-radius:50%;background:${s.color}"></div>
    </button>`).join('')}
  </div>

</div>`;
  return `
<div class="screen-header"><div class="screen-title">\u{1F4D6} الدروس</div></div>
<div class="screen-body">

  ${['igcse','cambridge_alevel','edexcel','aqa','ocr','american','ib','cbse','icse','french_bac','australian','canadian'].includes(S.curriculum) ? `
  <div style="background:#3B82F611;border:1px solid #3B82F633;border-radius:10px;padding:10px 14px;margin-bottom:12px;font-size:12px;display:flex;gap:8px;align-items:flex-start">
    <span style="font-size:16px">ℹ️</span>
    <span style="color:var(--text-muted);line-height:1.7">
      المحتوى مبني على أحدث إصدار متاح من المنهج الرسمي.
      للتحقق من آخر التحديثات يُنصح بمراجعة الموقع الرسمي للجهة.
      <br><b style="color:var(--primary)">أكواد المواد والموضوعات الرئيسية مُدققة ✅</b>
    </span>
  </div>` : ''}
  <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;margin-bottom:12px">
    <div style="font-size:12px;font-weight:800;color:var(--text-muted);margin-bottom:10px">\u{1F30D} اختر الدولة / المنهج</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px">
      ${Object.entries(CURRICULA).map(([k,v])=>`
      <button class="curriculum-btn" data-curriculum="${k}"
        style="padding:6px 12px;border-radius:20px;
               border:1.5px solid ${S.curriculum===k?'var(--primary)':'var(--border)'};
               background:${S.curriculum===k?'var(--primary)':'transparent'};
               color:${S.curriculum===k?'#fff':'var(--text)'};
               font-family:Cairo,sans-serif;font-size:11px;font-weight:700;cursor:pointer;transition:.2s">
        ${v.label}
      </button>`).join('')}
    </div>
  </div>

  <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;margin-bottom:12px">
    <div style="font-size:12px;font-weight:800;color:var(--text-muted);margin-bottom:10px">\u{1F393} اختر المرحلة الدراسية</div>
    <div style="display:flex;flex-wrap:wrap;gap:8px">
      ${Object.entries(curData.grades).map(([k,v])=>`
      <button class="grade-btn" data-grade="${k}"
        style="padding:9px 18px;border-radius:12px;
               border:1.5px solid ${S.grade===k?'var(--primary)':'var(--border)'};
               background:${S.grade===k?'var(--primary)':'transparent'};
               color:${S.grade===k?'#fff':'var(--text)'};
               font-family:Cairo,sans-serif;font-size:13px;font-weight:800;cursor:pointer;transition:.2s">
        ${{primary:'\u{1F3EB}',middle:'\u{1F4DA}',high:'\u{1F393}',high1:'\u{1F393}',high_med:'\u{1F3E5}',high_eng:'\u{1F3D7}',high_biz:'\u{1F4BC}',high_arts:'\u{1F4D6}'}[k]||'\u{1F393}'} ${v.label}
      </button>`).join('')}
    </div>
    <div style="font-size:11px;color:var(--text-muted);margin-top:8px">
      \u{1F4CC} <b style="color:var(--primary)">${curData.label}</b>
      &nbsp;—&nbsp;<b style="color:#22C55E">${gradeData.label}</b>
      &nbsp;—&nbsp;${subjects.length} مادة دراسية
    </div>
  </div>

  <!-- AI Lessons Section -->
  <div style="background:linear-gradient(135deg,#1E293B,#253047);border:1px solid var(--primary)44;border-radius:var(--radius);padding:16px;margin-bottom:20px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
      <div>
        <div style="font-weight:900;font-size:15px">\u{1F916} دروس بالذكاء الاصطناعي</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:2px">يولّد AI دروساً مخصصة لمادة ${esc(S.subject)} — ${gradeData.label}</div>
      </div>
      <button class="btn btn-primary btn-sm" id="b-ai-lessons" onclick="loadAILessons()">توليد الآن</button>
    </div>
    <div id="ai-lessons-box"></div>
  </div>


</div>`;
}
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   AUTH LOGIC
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
async function doLogin() {
  const email = ge('f-email')?.value?.trim();
  const pass  = ge('f-pass')?.value;
  if (!email || !pass) { showAuthErr('يرجى ملء جميع الحقول'); return; }
  setBtnLoading('b-login', 'جارٍ الدخول...');
  try {
    const d = await req('/auth/login', 'POST', { email, password: pass });
    S.token = d.token; S.user = d.user; saveLocal();
    S.screen = 'chat'; render(); showToast(S.lang==='en'?'Welcome back 👋':'أهلاً بعودتك 👋', 'success');
  } catch(e) { showAuthErr(e.message); }
  finally { setBtnLoading('b-login', 'دخول'); }
}

async function doRegister() {
  const name    = ge('f-name')?.value?.trim();
  const email   = ge('f-email')?.value?.trim();
  const pass    = ge('f-pass')?.value;
  const country = ge('f-country')?.value;
  const refCode = ge('f-ref')?.value?.trim().toUpperCase() || '';
  if (!name || !email || !pass || !country) {
    showAuthErr('يرجى ملء جميع الحقول واختيار الدولة'); return;
  }
  setBtnLoading('b-register', 'جارٍ الإنشاء...');
  try {
    const body = { name, email, password: pass, country };
    if (refCode) body.referralCode = refCode;
    const d = await req('/auth/register', 'POST', body);
    S.token = d.token; S.user = d.user;
    S.curriculum = country in CURRICULA ? country : 'egypt';
    saveLocal();
    const msg = refCode ? 'تم إنشاء الحساب + 7 أيام Pro هدية! 🎉' : 'تم إنشاء الحساب 🎉';
    S.screen = 'chat'; render(); showToast(msg, 'success');
  } catch(e) { showAuthErr(e.message); }
  finally { setBtnLoading('b-register', 'إنشاء حساب 🚀'); }
}

function doGuest() {
  S.token = null;
  S.user  = { name: 'ضيف', plan: 'free' };
  saveLocal(); S.screen = 'chat'; render();
}

const GOOGLE_CLIENT_ID = '708530797825-u7evp0gcjcald9j8k7j7gsshj55m23p8.apps.googleusercontent.com';

function initGoogleBtn() {
  const container = ge('g-signin-btn');
  if (!container) return;
  if (typeof google === 'undefined' || !google.accounts) {
    // SDK not loaded yet — retry after 1s
    setTimeout(initGoogleBtn, 1000);
    return;
  }
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback:  handleGoogleCredential,
  });
  google.accounts.id.renderButton(container, {
    theme:  'outline',
    size:   'large',
    width:  300,
    text:   'signin_with',
    locale: S.lang === 'ar' ? 'ar' : 'en',
  });
}

async function handleGoogleCredential(response) {
  if (!response || !response.credential) {
    showToast('فشل تسجيل الدخول بـ Google', 'error'); return;
  }
  showToast('جارٍ تسجيل الدخول...', 'info');
  try {
    const d = await req('/auth/google', 'POST', { credential: response.credential });
    S.token = d.token; S.user = d.user;
    if (d.user.country && d.user.country in CURRICULA) S.curriculum = d.user.country;
    saveLocal();
    S.screen = 'chat'; render();
    showToast('أهلاً ' + d.user.name + ' 👋', 'success');
  } catch(e) {
    showToast(e.message || 'فشل تسجيل الدخول بـ Google', 'error');
  }
}
// Must be on window so Google's iframe can call it
window.handleGoogleCredential = handleGoogleCredential;

async function downloadBook(url, title) {
  showToast('⏳ جارٍ تحميل الكتاب...', 'info');
  try {
    const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(url);
    const r = await fetch(proxyUrl);
    if (!r.ok) throw new Error('خطأ ' + r.status);
    const blob = await r.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (title || 'كتاب') + '.pdf';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(a.href); }, 1000);
    showToast('✅ تم تحميل الكتاب بنجاح!', 'success');
  } catch(e) {
    showToast('فشل التحميل — جارٍ فتح في تبويب جديد', 'error');
    setTimeout(() => window.open(url, '_blank'), 500);
  }
}

async function genAILesson() {
  if (!S.lessonSubject || !S.lessonChapter) return;
  if (S.lessonLoading) return;
  const curData = CURRICULA[S.curriculum] || CURRICULA.egypt;
  const gradeData = (curData.grades && (curData.grades[S.grade] || Object.values(curData.grades)[0])) || { label:'' };
  S.lessonLoading = true; S.lessonContent = ''; render();
  try {
    const isEn = ['igcse','cambridge_alevel','edexcel','aqa','ocr','american','ib','cbse','icse','french_bac','australian','canadian'].includes(S.curriculum);
    const prompt = isEn
      ? `You are a ${curData.label} ${gradeData.label} teacher. Create a comprehensive lesson on "${S.lessonChapter}" in ${S.lessonSubject.name}. Include: 1) Learning objectives 2) Key concepts explained clearly 3) Worked examples 4) Practice questions with answers 5) Exam tips. Format with clear headings.`
      : `أنت مدرس محترف في ${curData.label} — ${gradeData.label}. اشرح درس "${S.lessonChapter}" في مادة ${S.lessonSubject.name} شرحاً وافياً وشاملاً يشمل: 1) أهداف الدرس 2) المفاهيم الأساسية مع شرح مبسط 3) أمثلة محلولة خطوة بخطوة 4) تمارين مع الحلول 5) نصائح للامتحان. استخدم العناوين والتنسيق.`;
    const d = await req('/chat', 'POST', {
      message: prompt,
      subject: S.lessonSubject.name,
      curriculum: S.curriculum,
      grade: S.grade,
      history: [],
    });
    S.lessonContent = d.response || d.message || d.content || '';
  } catch(e) {
    S.lessonContent = `❌ ${e.message}`;
  } finally {
    S.lessonLoading = false; render();
  }
}

function doLogout() {
  S.token = null; S.user = null; S.messages = [];
  saveLocal(); S.screen = 'login'; render();
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CHAT / SEND MESSAGE
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
/* ── helper: map S.grade key → {stage, grade} strings for API ── */
/* Map country key → human-readable curriculum description for AI context */
const CURRICULUM_LABELS = {
  egypt:'المنهج المصري (بكالوريا )',
  saudi:'المنهج السعودي الحكومي',
  uae:'المنهج الإماراتي (ADEC/KHDA)',
  kuwait:'المنهج الكويتي',
  qatar:'المنهج القطري',
  bahrain:'المنهج البحريني',
  oman:'المنهج العُماني',
  jordan:'المنهج الأردني',
  lebanon:'المنهج اللبناني',
  syria:'المنهج السوري',
  iraq:'المنهج العراقي',
  libya:'المنهج الليبي',
  tunisia:'المنهج التونسي',
  algeria:'المنهج الجزائري',
  morocco:'المنهج المغربي',
  sudan:'المنهج السوداني',
  palestine:'المنهج الفلسطيني',
  yemen:'المنهج اليمني',
  mauritania:'المنهج الموريتاني',
  other:'المنهج العربي العام',
  // International boards
  igcse:'Cambridge IGCSE',
  cambridge_alevel:'Cambridge AS & A-Level',
  edexcel:'Edexcel / Pearson',
  aqa:'AQA (UK)',
  ocr:'OCR (UK)',
  american:'US Common Core & AP',
  ib:'IB (International Baccalaureate)',
  cbse:'CBSE India (NCERT)',
  icse:'ICSE / ISC (CISCE India)',
  french_bac:'Baccalauréat Français',
  australian:'Australian Curriculum (VCE/HSC/QCE)',
  canadian:'Canadian Curriculum (Ontario)',
};

function gradeToAPI() {
  const map = {
    // Arab grades
    primary:    { stage:'ابتدائي',  grade:'المرحلة الابتدائية' },
    middle:     { stage:'إعدادي',   grade:'المرحلة الإعدادية / المتوسطة' },
    high:       { stage:'ثانوي',    grade:'المرحلة الثانوية' },
    high1:      { stage:'ثانوي',    grade:'الصف الأول الثانوي (تمهيدي)' },
    high_sci:   { stage:'ثانوي',    grade:'الفرع العلمي' },
    high_arts:  { stage:'ثانوي',    grade:'الفرع الأدبي' },
    high_med:   { stage:'ثانوي',    grade:'مسار الطب وعلوم الحياة' },
    high_eng:   { stage:'ثانوي',    grade:'مسار الهندسة والحاسب' },
    high_biz:   { stage:'ثانوي',    grade:'مسار الأعمال والتجارة' },
    high_arts2: { stage:'ثانوي',    grade:'مسار الآداب والفنون' },
    // International grades
    'Year 7-9':     { stage:'Lower Secondary', grade:'Year 7–9' },
    'Year 10-11':   { stage:'GCSE',            grade:'Year 10–11 (GCSE)' },
    'AS/A2':        { stage:'A-Level',         grade:'AS & A2 Level' },
    'Grade 6-10':   { stage:'Middle School',   grade:'Grade 6–10' },
    'Grade 11-12':  { stage:'High School',     grade:'Grade 11–12' },
    'MYP':          { stage:'IB',              grade:'MYP (Years 7–11)' },
    'DP':           { stage:'IB',              grade:'IB Diploma' },
  };
  const { stage, grade } = map[S.grade] || {
    stage: CURRICULA[S.curriculum]?.grades[S.grade]?.label || S.grade || 'Secondary',
    grade: CURRICULA[S.curriculum]?.grades[S.grade]?.label || S.grade || ''
  };
  const curriculum = CURRICULUM_LABELS[S.curriculum] || CURRICULA[S.curriculum]?.label || 'العام';
  return { stage, grade, curriculum };
}

async function sendMsg() {
  const inp = ge('f-msg');
  const txt = inp ? inp.value.trim() : '';
  if (!txt || S.thinking) return;
  if (inp) inp.value = '';

  const nowTime = new Date().toLocaleTimeString('ar-EG', { hour:'2-digit', minute:'2-digit' });
  S.messages.push({ role: 'user', content: txt, time: nowTime });
  S.thinking = true; render();
  scrollChat();

  const { stage, grade, curriculum } = gradeToAPI();

  try {
    const d = await req('/chat', 'POST', {
      messages:   S.messages.slice(-12).map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: (m.content||'').substring(0,2000) })),
      country:    S.curriculum,
      curriculum,
      stage,
      grade,
      subject:    S.subject,
      userName:   S.user?.name || '',
      topics:     (() => {
        try {
          const cur = CURRICULA[S.curriculum];
          if (!cur) return [];
          const gradeData = cur.grades[S.grade] || Object.values(cur.grades)[0];
          if (!gradeData) return [];
          const subj = (gradeData.subjects || []).find(s => s.name === S.subject);
          return (subj && subj.topics) ? subj.topics.slice(0, 8) : [];
        } catch(e) { return []; }
      })(),
    });

    const reply = d.content || d.message || d.reply || '';
    const replyTime = new Date().toLocaleTimeString('ar-EG', { hour:'2-digit', minute:'2-digit' });
    S.messages.push({ role: 'assistant', content: reply, time: replyTime });

    // XP + history
    S.stats = S.stats || { xp:0, streak:1, totalChats:0, weeklyActivity:[0,0,0,0,0,0,0] };
    S.stats.xp += 10; S.stats.totalChats++;
    const day = new Date().getDay();
    S.stats.weeklyActivity[day] = (S.stats.weeklyActivity[day]||0)+1;

    S.history.unshift({ date: new Date().toLocaleDateString('ar'), subject: S.subject, preview: txt.slice(0,60) });
    if (S.history.length > 50) S.history.pop();

  } catch(e) {
    const msg = e.message;
    if (msg.includes('daily_limit')) {
      S.messages.push({ role: 'assistant', content: '⚠️ وصلت للحد اليومي المجاني (5 أسئلة). سجّل الدخول أو اشترك في Pro للاستمرار.' });
    } else {
      S.messages.push({ role: 'assistant', content: `⚠️ ${msg}` });
    }
  }
  S.thinking = false; render(); scrollChat();
}

function scrollChat() {
  const c = ge('chat-msgs');
  if (c) setTimeout(() => { c.scrollTop = c.scrollHeight; }, 50);
}

/* ════════════════════════════════════════════════════════════
   GENERATION HELPERS
   ════════════════════════════════════════════════════════════ */
async function genFlashcards() {
  const { stage, grade, curriculum } = gradeToAPI();
  try {
    showToast('جارٍ توليد البطاقات...', 'info');
    const d = await req('/study/flashcards', 'POST', {
      subject:    S.subject,
      topic:      S.subject,
      count:      10,
      country:    S.curriculum,
      curriculum,
      stage,
      grade,
    });
    // Server returns { cards: [{q, a}] } — map to {front, back}
    const raw = d.cards || d.flashcards || d;
    S.flashcards = Array.isArray(raw)
      ? raw.map(c => ({ front: c.q || c.front || c.question || '', back: c.a || c.back || c.answer || '' }))
      : [];
    S.fcIndex = 0; S.fcFlipped = false;
    render(); showToast(`تم توليد ${S.flashcards.length} بطاقة! 🗂️`, 'success');
  } catch(e) { showToast(e.message, 'error'); }
}

async function genQuiz() {
  const { stage, grade, curriculum } = gradeToAPI();
  try {
    showToast('جارٍ توليد الاختبار...', 'info');
    const d = await req('/study/quiz', 'POST', {
      subject:    S.subject,
      topic:      S.subject,
      count:      10,
      country:    S.curriculum,
      curriculum,
      stage,
      grade,
    });
    // Server returns { questions: [{q, options, correct, explain}] }
    const raw = d.questions || d.quiz || d;
    S.quiz = Array.isArray(raw)
      ? raw.map(q => ({
          question:    q.q      || q.question || '',
          options:     q.options || [],
          correct:     typeof q.correct === 'number' ? q.correct : 0,
          explanation: q.explain || q.explanation || '',
        }))
      : [];
    S.quizIndex = 0; S.quizAnswer = null; S.quizScore = 0;
    render(); showToast(`تم توليد ${S.quiz.length} سؤال! 📝`, 'success');
  } catch(e) { showToast(e.message, 'error'); }
}

async function doGenSummary() {
  const topic = ge('sum-topic')?.value?.trim() || S.subject;
  const { stage, grade, curriculum } = gradeToAPI();
  S.summaryLoading = true; S.summaryText = ''; render();
  try {
    const d = await req('/chat', 'POST', {
      messages: [{ role: 'user', content: `اعمل ملخصاً شاملاً ومنظماً لموضوع "${topic}" في مادة ${S.subject}. استخدم عناوين ## وقوائم - وتنسيق واضح.` }],
      country: S.curriculum, curriculum,
      stage, grade, subject: S.subject,
      userName: S.user?.name || '',
    });
    S.summaryText = d.content || d.message || '';
  } catch(e) { S.summaryText = `⚠️ ${e.message}`; }
  S.summaryLoading = false; render();
}

async function doGenMindMap() {
  const topic = ge('mm-topic')?.value?.trim() || S.subject;
  S.mindMapTopic = topic;
  const { stage, grade, curriculum } = gradeToAPI();
  try {
    showToast('جارٍ توليد الخريطة...', 'info');
    const d = await req('/chat', 'POST', {
      messages: [{ role: 'user', content: `اعمل خريطة ذهنية لموضوع "${topic}". أرجع JSON فقط بالشكل: {"title":"${topic}","branches":[{"title":"فرع 1","children":[{"title":"تفصيل"}]}]}` }],
      country: S.curriculum, curriculum,
      stage, grade, subject: S.subject,
      userName: S.user?.name || '',
    });
    const text = d.content || d.message || '';
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      S.mindMapData = JSON.parse(match[0]);
    } else {
      S.mindMapData = { title: topic, branches: [{ title: text.substring(0,100), children:[] }] };
    }
    render(); showToast('تم! 🧠', 'success');
  } catch(e) { showToast(e.message, 'error'); }
}


/* ════════════════════════════════════════════════════════════
   IMAGE SOLVING — Claude Vision
   ════════════════════════════════════════════════════════════ */
function triggerCamera() {
  const inp = document.getElementById('img-upload');
  if (inp) inp.click();
}

async function solveImage(file) {
  if (!file) return;
  const MAX = 4 * 1024 * 1024; // 4MB limit
  if (file.size > MAX) { showToast('الصورة كبيرة جداً (الحد 4MB)', 'error'); return; }

  // Convert to base64
  const reader = new FileReader();
  reader.onload = async (e) => {
    const dataUrl  = e.target.result;
    const base64   = dataUrl.split(',')[1];
    const mimeType = file.type || 'image/jpeg';

    // Show preview in chat
    S.messages.push({ role: 'user', content: '📸 صورة مرفقة — جارٍ الحل...' });
    S.imageThinking = true;
    render(); scrollChat();

    const { stage, grade, curriculum } = gradeToAPI();
    try {
      const d = await req('/chat/solve-image', 'POST', {
        imageBase64: base64,
        mediaType:   mimeType,
        country:     S.curriculum,
        curriculum,
        stage, grade,
        subject:     S.subject,
        userName:    S.user?.name || '',
        instruction: `اقرأ المسألة في الصورة وحلّها خطوة بخطوة في مادة ${S.subject}`,
      });
      const reply = d.content || d.message || d.reply || '';
      S.messages[S.messages.length - 1] = { role: 'user', content: '📸 حل مسألة بالصورة' };
      S.messages.push({ role: 'assistant', content: reply });
      S.stats = S.stats || { xp:0, streak:1, totalChats:0, weeklyActivity:[0,0,0,0,0,0,0] };
      S.stats.xp += 15; S.stats.totalChats++;
      saveLocal();
    } catch(e) {
      S.messages[S.messages.length - 1] = { role: 'user', content: '📸 حل مسألة بالصورة' };
      S.messages.push({ role: 'assistant', content: `⚠️ ${e.message}` });
    }
    S.imageThinking = false;
    render(); scrollChat();
  };
  reader.readAsDataURL(file);
}

/* ════════════════════════════════════════════════════════════
   VOICE INPUT — Whisper STT
   ════════════════════════════════════════════════════════════ */
let _mediaRecorder = null;
let _audioChunks   = [];

async function toggleRecording() {
  if (S.recording) {
    stopRecording();
  } else {
    await startRecording();
  }
}

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    _audioChunks = [];
    _mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    _mediaRecorder.ondataavailable = e => { if (e.data.size > 0) _audioChunks.push(e.data); };
    _mediaRecorder.onstop = transcribeAudio;
    _mediaRecorder.start();
    S.recording = true;
    render();
    showToast('🎤 جارٍ التسجيل... اضغط مرة ثانية للإيقاف', 'info');
    // Auto-stop after 30s
    setTimeout(() => { if (S.recording) stopRecording(); }, 30000);
  } catch(e) {
    showToast('تعذّر الوصول للميكروفون: ' + e.message, 'error');
  }
}

function stopRecording() {
  if (_mediaRecorder && _mediaRecorder.state !== 'inactive') {
    _mediaRecorder.stop();
    _mediaRecorder.stream.getTracks().forEach(t => t.stop());
  }
  S.recording = false;
  render();
}

async function transcribeAudio() {
  if (!_audioChunks.length) return;
  showToast('جارٍ تحويل الصوت لنص...', 'info');
  const blob    = new Blob(_audioChunks, { type: 'audio/webm' });
  const formData = new FormData();
  formData.append('audio', blob, 'voice.webm');

  try {
    const h = {};
    if (S.token) h['Authorization'] = `Bearer ${S.token}`;
    const r = await fetch(API + '/study/transcribe', { method:'POST', headers:h, body:formData });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || 'فشل التحويل');
    const text = d.text || d.transcript || '';
    if (text) {
      const inp = document.getElementById('f-msg');
      if (inp) { inp.value = text; inp.focus(); }
      showToast('✅ تم التحويل!', 'success');
    }
  } catch(e) {
    showToast('⚠️ ' + e.message, 'error');
  }
}

/* ════════════════════════════════════════════════════════════
   PDF EXPORT
   ════════════════════════════════════════════════════════════ */
async function exportPDF() {
  const topic = ge('sum-topic')?.value?.trim() || S.subject;
  const type  = ge('pdf-type')?.value || 'summary';
  const { stage, grade, curriculum } = gradeToAPI();
  const typeLabel = { summary: 'ملخص شامل', formulas: 'قوانين ومعادلات', questions: 'أسئلة تدريبية', mindmap: 'خريطة ذهنية' }[type] || type;

  showToast('جارٍ توليد المحتوى للطباعة...', 'info');
  try {
    const d = await req('/pdf/summary', 'POST', {
      subject: S.subject, topic, grade, stage, curriculum,
      country: S.curriculum, type,
    });
    const html = d.html || d.content || d.text || '';
    const win = window.open('', '_blank', 'width=860,height=700');
    if (!win) { showToast('يرجى السماح بالنوافذ المنبثقة', 'error'); return; }
    const dateStr = new Date().toLocaleDateString('ar-EG', { year:'numeric', month:'long', day:'numeric' });
    win.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head>
      <meta charset="UTF-8"/>
      <title>${topic} — \u{623}\u{633}\u{62A}\u{627}\u{630} AI</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Cairo',Arial,sans-serif;direction:rtl;background:#fff;color:#1E293B;font-size:14px;line-height:1.9}
        .page{max-width:760px;margin:0 auto;padding:40px 48px}
        /* Header */
        .pdf-header{display:flex;align-items:center;justify-content:space-between;padding-bottom:16px;border-bottom:3px solid #1E40AF;margin-bottom:28px}
        .pdf-logo{font-size:28px;font-weight:900;color:#1E40AF}
        .pdf-meta{font-size:11px;color:#64748B;text-align:left}
        /* Title */
        .pdf-title{font-size:22px;font-weight:900;color:#0F172A;margin-bottom:6px}
        .pdf-subtitle{font-size:13px;color:#64748B;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #E2E8F0}
        /* Content */
        h1,h2{color:#1E40AF;margin:20px 0 10px}
        h1{font-size:18px} h2{font-size:16px}
        h3{color:#1E40AF;font-size:15px;margin:16px 0 8px}
        p{margin-bottom:12px;color:#334155}
        ul,ol{padding-right:20px;margin-bottom:12px}
        li{margin-bottom:6px;color:#334155}
        table{border-collapse:collapse;width:100%;margin-bottom:16px}
        th{background:#1E40AF;color:#fff;padding:8px 12px;font-size:13px;text-align:right}
        td{border:1px solid #E2E8F0;padding:8px 12px;font-size:13px}
        tr:nth-child(even) td{background:#F8FAFC}
        code{background:#F1F5F9;padding:2px 6px;border-radius:4px;font-size:12px;color:#7C3AED}
        pre{background:#F1F5F9;padding:14px;border-radius:8px;margin-bottom:14px;overflow:auto;font-size:12px;direction:ltr;text-align:left}
        strong{color:#0F172A}
        blockquote{border-right:4px solid #1E40AF;padding:10px 16px;background:#EFF6FF;margin:14px 0;border-radius:0 8px 8px 0}
        hr{border:none;border-top:1px solid #E2E8F0;margin:20px 0}
        /* Footer */
        .pdf-footer{margin-top:32px;padding-top:16px;border-top:1px solid #E2E8F0;font-size:11px;color:#94A3B8;display:flex;justify-content:space-between}
        /* Print */
        @media print{
          .pdf-header{page-break-inside:avoid}
          h2,h3{page-break-after:avoid}
          .no-print{display:none!important}
          body{font-size:13px}
        }
        /* Print button */
        .print-btn{position:fixed;bottom:24px;left:24px;background:#1E40AF;color:#fff;border:none;border-radius:50px;padding:12px 24px;font-family:'Cairo',sans-serif;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(30,64,175,0.4);z-index:999}
        .print-btn:hover{background:#1D4ED8}
      </style>
    </head><body>
    <button class="print-btn no-print" onclick="window.print()">📥 طباعة / حفظ PDF</button>
    <div class="page">
      <div class="pdf-header">
        <div class="pdf-logo">🎓 \u{623}\u{633}\u{62A}\u{627}\u{630} AI</div>
        <div class="pdf-meta">${dateStr}<br/>${curriculum}</div>
      </div>
      <div class="pdf-title">${esc(topic)}</div>
      <div class="pdf-subtitle">${typeLabel} &nbsp;&bull;&nbsp; ${esc(S.subject)} &nbsp;&bull;&nbsp; ${grade}</div>
      ${html}
      <div class="pdf-footer">
        <span>\u{623}\u{633}\u{62A}\u{627}\u{630} AI &mdash; \u{645}\u{646}\u{635}\u{629} \u{627}\u{644}\u{62A}\u{639}\u{644}\u{64A}\u{645} \u{627}\u{644}\u{630}\u{643}\u{64A}</span>
        <span>${dateStr}</span>
      </div>
    </div>
    <script>
      // Auto-trigger print after fonts load
      window.onload = function() { setTimeout(function(){ window.print(); }, 1200); };
    </script>
    </body></html>`);
    win.document.close();
  } catch(e) { showToast('\u{26A0}️ ' + e.message, 'error'); }
}

/* ════════════════════════════════════════════════════════════
   TAP PAYMENTS + PROMO
   ════════════════════════════════════════════════════════════ */
/* ════════════════════════════════════════════════════════════
   FORGOT PASSWORD / RESET PASSWORD
   ════════════════════════════════════════════════════════════ */
async function doForgotPassword() {
  const email = ge('f-forgot-email')?.value?.trim();
  const errEl = ge('auth-error');
  const sucEl = ge('auth-success');
  if (!email) { if(errEl){errEl.textContent='أدخل بريدك الإلكتروني';errEl.style.display='block';} return; }
  const btn = ge('b-forgot-send');
  if(btn){btn.disabled=true;btn.textContent="جارٍ...";}
  try {
    const d = await req('/auth/forgot-password','POST',{email});
    if(errEl) errEl.style.display='none';
    if(sucEl){sucEl.textContent=d.message||"تم الإرسال!";sucEl.style.display="block";}
    // Dev mode: if resetLink returned, show it
    if(d.resetLink){ if(sucEl){sucEl.innerHTML+='<br><small style="word-break:break-all">'+d.resetLink+'</small>';} }
  } catch(e) {
    if(errEl){errEl.textContent=e.message;errEl.style.display='block';}
    if(btn){btn.disabled=false;btn.textContent="إرسال رابط الاستعادة";}
  }
}

async function doResetPassword() {
  const token = ge('b-do-reset')?.dataset?.token;
  const newPass = ge('f-new-pass')?.value;
  const confirm = ge('f-confirm-pass')?.value;
  const errEl  = ge('auth-error');
  if (!newPass || newPass.length < 6) { if(errEl){errEl.textContent='كلمة المرور قصيرة جداً';errEl.style.display='block';} return; }
  if (newPass !== confirm) { if(errEl){errEl.textContent='كلمتا المرور لا تتطابقان';errEl.style.display='block';} return; }
  const btn = ge('b-do-reset');
  if(btn){btn.disabled=true;btn.textContent="جارٍ...";}
  try {
    const d = await req('/auth/reset-password','POST',{token, newPassword: newPass});
    showToast('✅ '+d.message, 'success');
    S.screen='login'; S.resetToken=null; render();
  } catch(e) {
    if(errEl){errEl.textContent=e.message;errEl.style.display='block';}
    if(btn){btn.disabled=false;btn.textContent="حفظ كلمة المرور";}
  }
}

async function doTapCheckout(plan) {
  plan = plan || 'monthly';
  if (!S.token) { showToast('سجّل الدخول أولاً', 'error'); S.screen='login'; render(); return; }
  const btn = ge('b-stripe');
  if (btn) { btn.disabled=true; btn.textContent='جارٍّ التوجيه...'; }
  try {
    const d = await req('/billing/create-tap-charge', 'POST', { plan });
    if (d.url) {
      window.location.href = d.url;
    } else {
      showToast('تعذّر فتح صفحة الدفع', 'error');
      if (btn) { btn.disabled=false; btn.textContent='💳 اشترك الآن'; }
    }
  } catch(e) {
    showToast('⚠️ ' + e.message, 'error');
    if (btn) { btn.disabled=false; btn.textContent='💳 اشترك الآن'; }
  }
}

// Keep old name as alias for compatibility
async function doStripeCheckout() { return doTapCheckout('monthly'); }

/* ════════════════════════════════════════════════════════════
   PAYPAL CHECKOUT
   ════════════════════════════════════════════════════════════ */
async function doPayPalCheckout() {
  if (!S.token) { showToast('سجّل الدخول أولاً', 'error'); S.screen='login'; render(); return; }
  const plan = ge('pay-plan-sel')?.value || 'monthly';
  const btn  = ge('b-paypal');
  if (btn) { btn.disabled=true; btn.textContent='جارٍ التوجيه...'; }
  try {
    const d = await req('/billing/create-paypal-order', 'POST', { plan });
    if (d.url) { window.location.href = d.url; }
    else { showToast('تعذّر فتح PayPal', 'error'); if (btn) { btn.disabled=false; btn.innerHTML='💳 PayPal'; } }
  } catch(e) {
    showToast('⚠️ ' + e.message, 'error');
    if (btn) { btn.disabled=false; btn.innerHTML='💳 PayPal'; }
  }
}

/* ════════════════════════════════════════════════════════════
   MYFATOORAH CHECKOUT
   ════════════════════════════════════════════════════════════ */
async function doMyFatoorahCheckout() {
  if (!S.token) { showToast('سجّل الدخول أولاً', 'error'); S.screen='login'; render(); return; }
  const plan = ge('pay-plan-sel')?.value || 'monthly';
  const btn  = ge('b-myfatoorah');
  if (btn) { btn.disabled=true; btn.textContent='جارٍ التوجيه...'; }
  try {
    const d = await req('/billing/create-myfatoorah-payment', 'POST', { plan });
    if (d.url) { window.location.href = d.url; }
    else { showToast('تعذّر فتح MyFatoorah', 'error'); if (btn) { btn.disabled=false; btn.innerHTML='🇰🇼 MyFatoorah'; } }
  } catch(e) {
    showToast('⚠️ ' + e.message, 'error');
    if (btn) { btn.disabled=false; btn.innerHTML='🇰🇼 MyFatoorah'; }
  }
}

async function doRedeemPromo() {
  if (!S.token) { showToast('سجّل الدخول أولاً لاستخدام الكود', 'error'); return; }
  const code = ge('promo-inp')?.value?.trim().toUpperCase();
  const msg  = ge('promo-msg');
  if (!code) { showToast('أدخل الكود أولاً', 'error'); return; }
  const btn = ge('b-redeem');
  if (btn) { btn.disabled=true; btn.textContent='جارٍ التحقق...'; }
  try {
    const d = await req('/billing/redeem', 'POST', { code });
    if (msg) { msg.textContent = d.message || '🎉 تم التفعيل!'; msg.style.color='#22C55E'; msg.style.display='block'; }
    // Refresh user
    const me = await req('/auth/me');
    S.user = me.user; saveLocal();
    showToast(d.message || 'تم تفعيل Pro! 🎉', 'success');
    setTimeout(() => { S.screen='chat'; render(); }, 1500);
  } catch(e) {
    if (msg) { msg.textContent = e.message; msg.style.color='#EF4444'; msg.style.display='block'; }
    if (btn) { btn.disabled=false; btn.textContent='تفعيل'; }
  }
}

/* ════════════════════════════════════════════════════════════
   DARK MODE + PROFILE ACTIONS
   ════════════════════════════════════════════════════════════ */
function toggleDark() {
  S.darkMode = !S.darkMode;
  saveLocal();
  // Default theme is dark; 'light' class activates light mode
  document.body.classList.toggle('light', S.darkMode);
  document.documentElement.lang = S.lang || 'ar';
  document.documentElement.dir  = (S.lang === 'en') ? 'ltr' : 'rtl';
  document.body.dir = (S.lang === 'en') ? 'ltr' : 'rtl';
  render();
}

async function doSaveName() {
  const name = ge('p-name')?.value?.trim();
  if (!name) return showToast('أدخل الاسم', 'error');
  try {
    const d = await req('/auth/profile', 'PATCH', { name });
    S.user = d.user || S.user;
    S.user.name = name;
    saveLocal();
    showToast(S.lang==='en'?'Name saved ✅':'تم حفظ الاسم ✅', 'success');
  } catch(e) { showToast(e.message, 'error'); }
}

async function doChangePassword() {
  const p1 = ge('p-pass1')?.value;
  const p2 = ge('p-pass2')?.value;
  const msg = ge('p-pass-msg');
  if (!p1 || p1.length < 6) { if(msg){msg.textContent='كلمة المرور يجب أن تكون 6 أحرف على الأقل';msg.style.color='#EF4444';msg.style.display='block';} return; }
  if (p1 !== p2) { if(msg){msg.textContent='كلمتا المرور غير متطابقتين';msg.style.color='#EF4444';msg.style.display='block';} return; }
  try {
    await req('/auth/profile', 'PATCH', { password: p1 });
    if(msg){msg.textContent='تم تغيير كلمة المرور بنجاح ✅';msg.style.color='#22C55E';msg.style.display='block';}
    if(ge('p-pass1')) ge('p-pass1').value='';
    if(ge('p-pass2')) ge('p-pass2').value='';
  } catch(e) { if(msg){msg.textContent=e.message;msg.style.color='#EF4444';msg.style.display='block';} }
}

/* ════════════════════════════════════════════════════════════
   AI LESSONS (server endpoint)
   ════════════════════════════════════════════════════════════ */
async function loadAILessons() {
  const btn = ge('b-ai-lessons');
  const box = ge('ai-lessons-box');
  if (!box) return;
  if (btn) { btn.disabled = true; btn.textContent = 'جارٍ التوليد...'; }
  box.innerHTML = '<div class="empty-state"><div class="spinner"></div><div>يولّد الذكاء الاصطناعي الدروس...</div></div>';
  const { stage, grade, curriculum } = gradeToAPI();
  try {
    const d = await req(`/lessons?country=${encodeURIComponent(S.curriculum)}&stage=${encodeURIComponent(stage)}&grade=${encodeURIComponent(grade)}&subject=${encodeURIComponent(S.subject)}`);
    const lessons = d.lessons || d.units || d;
    if (Array.isArray(lessons) && lessons.length) {
      box.innerHTML = lessons.map((l,i) => `
        <div class="info-card" style="margin-bottom:12px">
          <div style="font-weight:900;font-size:15px;margin-bottom:8px;color:var(--primary)">
            ${i+1}. ${esc(l.title || l.name || '')}
          </div>
          <div style="font-size:13px;line-height:1.8;color:var(--text-muted)">
            ${md(l.content || l.description || '')}
          </div>
          ${l.objectives ? `<div style="margin-top:8px;font-size:12px;color:#22C55E">
            <b>الأهداف:</b> ${esc(Array.isArray(l.objectives)?l.objectives.join(' — '):l.objectives)}
          </div>` : ''}
        </div>`).join('');
    } else {
      // Server returned plain text or object
      box.innerHTML = `<div class="info-card">${md(typeof lessons === 'string' ? lessons : JSON.stringify(lessons,null,2))}</div>`;
    }
  } catch(e) {
    box.innerHTML = `<div class="empty-state" style="color:#EF4444">${esc(e.message)}</div>`;
  }
  if (btn) { btn.disabled = false; btn.textContent = 'توليد دروس AI جديدة'; }
}
function loadStats() {
  // Build stats from local state (no dedicated stats endpoint)
  if (!S.stats) {
    S.stats = { xp: 0, streak: 1, totalChats: 0, weeklyActivity: [0,0,0,0,0,0,0] };
  }
  render();
}

async function loadLeaderboard() {
  try {
    const d = await req('/leaderboard?period=global');
    S.leaderboard = (d.leaders || []).map(u => ({
      name: u.name, xp: u.xp, isMe: u.isMe || false,
    }));
    render();
  } catch { render(); }
}

async function syncXP() {
  if (!S.token || !S.stats) return;
  try {
    await req('/leaderboard/sync', 'POST', { xp: S.stats.xp || 0 });
  } catch {}
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   POMODORO TIMER
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function pomStart() {
  if (_pomTimer) return;
  S.pomodoroRunning = true;
  _pomTimer = setInterval(() => {
    S.pomodoroLeft--;
    if (S.pomodoroLeft <= 0) {
      pomStop();
      if (S.pomodoroMode === 'work') {
        // Count completed work session
        S.pomodoroSessions = (S.pomodoroSessions || 0) + 1;
        saveLocal();
        // Every 4 sessions → long break
        if (S.pomodoroSessions % 4 === 0) {
          S.pomodoroMode = 'longbreak'; S.pomodoroLeft = 15*60;
          showToast('🌿 ممتاز! استراحة طويلة بعد 4 جلسات', 'success');
        } else {
          S.pomodoroMode = 'break'; S.pomodoroLeft = 5*60;
          showToast('☕ جلسة مكتملة! استرح 5 دقائق', 'success');
        }
        sendPushNotification('أستاذ AI ⏱️', 'جلسة بومودورو انتهت! حان وقت الاستراحة ☕');
      } else {
        S.pomodoroMode = 'work'; S.pomodoroLeft = 25*60;
        showToast('⚡ انتهت الاستراحة — ابدأ جلسة جديدة!', 'info');
        sendPushNotification('أستاذ AI ⚡', 'انتهت الاستراحة — ابدأ جلسة تركيز جديدة!');
      }
    }
    if (S.screen === 'pomodoro') render();
  }, 1000);
}

function pomStop() {
  clearInterval(_pomTimer); _pomTimer = null;
  S.pomodoroRunning = false;
}

function pomReset() {
  pomStop();
  const durations = { work: 25*60, break: 5*60, longbreak: 15*60 };
  S.pomodoroLeft = durations[S.pomodoroMode] || 25*60;
  render();
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   BIND  — all event listeners
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function navTo(s) {
  if (s === '__more__') {
    const overlay = ge('more-drawer-overlay');
    const drawer  = ge('more-drawer');
    if (overlay && drawer) {
      overlay.style.display = 'block';
      requestAnimationFrame(() => { drawer.style.transform = 'translateY(0)'; });
    }
    return;
  }
  S.screen = s;
  if (s === 'stats')       loadStats();
  if (s === 'leaderboard') loadLeaderboard();
  if (s === 'textbook')    { S.textbookUrl = 'home'; S.textbookViewUrl = null; S._pdfBlobUrl = null; S._pdfLoading = false; S._pdfError = null; }
  if (s === 'lessons')     { S.lessonView='subjects'; S.lessonSubject=null; S.lessonChapter=null; }
  render();
}

function bind() {

  /* ── auth ── */
  ge('b-login')     && ge('b-login').addEventListener('click', doLogin);

  // ── Lesson browser clicks ─────────────────────────────────────────
  document.querySelectorAll('.lesson-subj-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const curData   = CURRICULA[S.curriculum] || CURRICULA.egypt;
      const gradeData = (curData.grades && (curData.grades[S.grade] || Object.values(curData.grades)[0])) || { subjects:[] };
      const idx = parseInt(btn.dataset.subjIdx);
      S.lessonSubject = gradeData.subjects[idx];
      S.lessonView = 'chapters';
      S.lessonChapter = null;
      render();
    });
  });
  ge('b-gen-lesson')  && ge('b-gen-lesson').addEventListener('click', genAILesson);
  ge('b-lesson-ask-ai') && ge('b-lesson-ask-ai').addEventListener('click', () => {
    if (!S.lessonSubject || !S.lessonChapter) return;
    S.screen = 'chat'; S.subject = S.lessonSubject.name; S.messages = [];
    render();
    setTimeout(() => { if(ge('f-msg')) ge('f-msg').value = 'اشرح لي ' + S.lessonChapter + ' في ' + S.lessonSubject.name + ' بالتفصيل مع أمثلة وتمارين'; }, 100);
  });
  ge('b-lesson-chat') && ge('b-lesson-chat').addEventListener('click', () => {
    if (!S.lessonSubject) return;
    S.screen='chat'; S.messages=[{role:'user',content:'اشرح لي '+S.lessonChapter+' في '+S.lessonSubject.name},{role:'assistant',content:S.lessonContent}]; render();
  });
  ge('b-lesson-fc')   && ge('b-lesson-fc').addEventListener('click',   () => { S.screen='flashcards'; S.subject=S.lessonSubject?.name||S.subject; doGenerateFlashcards(); });
  ge('b-lesson-quiz') && ge('b-lesson-quiz').addEventListener('click',  () => { S.screen='quiz'; S.subject=S.lessonSubject?.name||S.subject; doGenerateQuiz(); });
  document.querySelectorAll('.lesson-chapter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.topicIdx);
      if (S.lessonSubject && S.lessonSubject.topics) {
        S.lessonChapter = S.lessonSubject.topics[idx];
        S.lessonView = 'lesson';
        S.lessonContent = '';
        S.lessonResource = 'ministry';
        render();
      }
    });
  });
  // Render Google Sign-In button
  if (ge('g-btn')) {
    function _renderGBtn() {
      const c = ge('g-btn');
      if (!c) return;
      if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
        google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: window.handleGoogleCredential });
        c.innerHTML = '';
        google.accounts.id.renderButton(c, { theme:'outline', size:'large', width:280, locale: S.lang==='ar'?'ar':'en' });
      } else {
        setTimeout(_renderGBtn, 800);
      }
    }
    _renderGBtn();
  }
  ge('b-guest')     && ge('b-guest').addEventListener('click', doGuest);
  ge('b-register')  && ge('b-register').addEventListener('click', doRegister);
  ge('go-register') && ge('go-register').addEventListener('click', () => { S.screen='register'; render(); });
  ge('go-login')    && ge('go-login').addEventListener('click',    () => { S.screen='login'; render(); });
  // Referral code toggle on register screen
  ge('go-ref-toggle') && ge('go-ref-toggle').addEventListener('click', () => {
    const g = ge('ref-group'); if (!g) return;
    const show = g.style.display === 'none';
    g.style.display = show ? 'block' : 'none';
    if (show) { ge('f-ref')?.focus(); ge('go-ref-toggle').textContent = '▲ إخفاء حقل الإحالة'; }
    else ge('go-ref-toggle').textContent = 'عندك كود إحالة؟';
  });
  // Auto-fill referral code from URL ?ref=CODE
  if (S.screen === 'register') {
    const urlRef = new URLSearchParams(window.location.search).get('ref');
    if (urlRef && ge('f-ref')) {
      ge('f-ref').value = urlRef.toUpperCase();
      const g = ge('ref-group'); if (g) g.style.display = 'block';
      const tog = ge('go-ref-toggle'); if (tog) tog.textContent = '▲ إخفاء حقل الإحالة';
    }
  }
  ge('b-logout')    && ge('b-logout').addEventListener('click', doLogout);
  ge('go-lessons-p')&& ge('go-lessons-p').addEventListener('click', () => { S.screen='lessons'; render(); });

  ge('f-pass')  && ge('f-pass').addEventListener('keydown',  e => { if(e.key==='Enter') S.screen==='login'?doLogin():doRegister(); });
  ge('f-email') && ge('f-email').addEventListener('keydown', e => { if(e.key==='Enter') S.screen==='login'?doLogin():doRegister(); });

  /* ── chat ── */
  ge('f-msg')  && ge('f-msg').addEventListener('keydown', e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMsg();} });
  ge('b-send') && ge('b-send').addEventListener('click', sendMsg);
  ge('b-clear-chat') && ge('b-clear-chat').addEventListener('click', () => {
    if (confirm('مسح كل المحادثة؟')) { S.messages = []; render(); }
  });
  ge('b-camera') && ge('b-camera').addEventListener('click', triggerCamera);
  ge('b-mic')    && ge('b-mic').addEventListener('click', toggleRecording);
  const imgUp = ge('img-upload');
  imgUp && imgUp.addEventListener('change', e => { if(e.target.files[0]) solveImage(e.target.files[0]); e.target.value=''; });
  ge('b-stripe')      && ge('b-stripe').addEventListener('click', () => doTapCheckout(ge('pay-plan-sel')?.value||'monthly'));
  ge('b-paypal')      && ge('b-paypal').addEventListener('click', doPayPalCheckout);
  ge('b-myfatoorah')  && ge('b-myfatoorah').addEventListener('click', doMyFatoorahCheckout);
  ge('go-forgot')     && ge('go-forgot').addEventListener('click', () => { S.screen='forgot'; render(); });
  ge('go-login-back') && ge('go-login-back').addEventListener('click', () => { S.screen='login'; render(); });
  ge('b-forgot-send') && ge('b-forgot-send').addEventListener('click', doForgotPassword);
  ge('f-forgot-email')&& ge('f-forgot-email').addEventListener('keydown', e => { if(e.key==='Enter') doForgotPassword(); });
  ge('b-do-reset')    && ge('b-do-reset').addEventListener('click', doResetPassword);
  ge('b-redeem') && ge('b-redeem').addEventListener('click', doRedeemPromo);
  ge('promo-inp') && ge('promo-inp').addEventListener('keydown', e => { if(e.key==='Enter') doRedeemPromo(); });
  ge('b-admin-load')   && ge('b-admin-load').addEventListener('click', loadAdminData);
  ge('b-create-promo') && ge('b-create-promo').addEventListener('click', async () => {
    const code  = ge('promo-new-code')?.value?.trim().toUpperCase();
    const days  = parseInt(ge('promo-new-days')?.value) || 30;
    const uses  = parseInt(ge('promo-new-uses')?.value) || 100;
    const msg   = ge('promo-create-msg');
    if (!code) { showToast('أدخل الكود', 'error'); return; }
    const btn = ge('b-create-promo');
    if (btn) { btn.disabled=true; btn.textContent='جارٍ الإنشاء...'; }
    try {
      const r = await fetch(API + '/admin/promo', {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ code, days, maxUses: uses })
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'خطأ');
      if (msg) { msg.style.display='block'; msg.style.color='#22C55E'; msg.style.background='#22C55E22'; msg.textContent='✅ تم إنشاء الكود: ' + code; }
      ge('promo-new-code').value = '';
    } catch(e) {
      if (msg) { msg.style.display='block'; msg.style.color='#EF4444'; msg.style.background='#EF444422'; msg.textContent='❌ ' + e.message; }
    } finally {
      if (btn) { btn.disabled=false; btn.textContent='✅ إنشاء الكود'; }
    }
  });
  ge('b-push') && ge('b-push').addEventListener('click', requestPushPermission);
  ge('tb-share') && ge('tb-share').addEventListener('click', shareConversation);
  ge('b-admin-reload') && ge('b-admin-reload').addEventListener('click', () => { adminData=null; loadAdminData(); });

  // Quick chat chips
  document.querySelectorAll('.quick-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.q;
      if (!q) return;
      const inp = ge('f-msg');
      if (inp) { inp.value = q; inp.focus(); }
      sendMsg();
    });
  });

  // Share stats
  ge('b-share-stats') && ge('b-share-stats').addEventListener('click', () => {
    const st = S.stats || {};
    const lvl = Math.floor((st.xp||0)/500)+1;
    const txt = `📊 إحصائياتي على أستاذ AI:\n🏆 المستوى ${lvl}\n⭐ ${st.xp||0} نقطة XP\n🔥 ${st.streak||0} يوم متواصل\n💬 ${st.totalChats||0} محادثة\n\nانضم معي: https://ostazai.surge.sh`;
    if (navigator.share) { navigator.share({ text: txt }).catch(()=>{}); }
    else { navigator.clipboard?.writeText(txt).catch(()=>{}); showToast('✅ تم نسخ الإحصائيات!', 'success'); }
  });

  // Floating feedback button
  ge('b-feedback-float') && ge('b-feedback-float').addEventListener('click', () => {
    const modal = ge('feedback-modal');
    if (modal) { modal.style.display = 'flex'; ge('feedback-text')?.focus(); }
  });
  ge('b-feedback-close') && ge('b-feedback-close').addEventListener('click', () => {
    const modal = ge('feedback-modal'); if (modal) modal.style.display = 'none';
  });
  ge('feedback-modal') && ge('feedback-modal').addEventListener('click', e => {
    if (e.target === ge('feedback-modal')) ge('feedback-modal').style.display = 'none';
  });
  ge('b-feedback-send') && ge('b-feedback-send').addEventListener('click', async () => {
    const txt = ge('feedback-text')?.value?.trim();
    if (!txt) { showToast('اكتب ملاحظتك أولاً', 'error'); return; }
    const btn = ge('b-feedback-send');
    if (btn) { btn.disabled=true; btn.textContent='جارٍ الإرسال...'; }
    try {
      await req('/feedback', 'POST', { message: txt, user: S.user?.email || 'guest', screen: S.screen });
    } catch(e) { /* server may not have this endpoint yet — that\'s ok */ }
    ge('feedback-modal').style.display = 'none';
    if (ge('feedback-text')) ge('feedback-text').value = '';
    showToast(S.lang==='en'?'Thanks for your feedback! 🙏':'شكراً على ملاحظتك! 🙏', 'success');
    if (btn) { btn.disabled=false; btn.textContent='إرسال 📤'; }
  });
  ge('b-ob-next') && ge('b-ob-next').addEventListener('click', () => {
    const totalSteps = 5;
    const curStep = S.onboardStep || 0;
    // Step 2: save curriculum/grade selection
    if (curStep === 1) {
      const country = ge('ob-country')?.value;
      const grade   = ge('ob-grade')?.value;
      if (country) { S.curriculum = country; saveLocal(); }
      if (grade)   { S.grade = grade; saveLocal(); }
      // Sync to server if logged in
      if (S.token && country) {
        req('/auth/profile', 'PATCH', { country, curriculum: country }).catch(()=>{});
      }
    }
    if (curStep >= totalSteps - 1) { finishOnboarding(); }
    else { S.onboardStep = curStep + 1; render(); }
  });
  ge('b-ob-skip') && ge('b-ob-skip').addEventListener('click', finishOnboarding);
  // Update grade options when country changes in onboarding
  ge('ob-country') && ge('ob-country').addEventListener('change', e => {
    const cur = CURRICULA[e.target.value] || CURRICULA.egypt;
    const sel = ge('ob-grade');
    if (sel) {
      sel.innerHTML = Object.entries(cur.grades).map(([k,v])=>`<option value="${k}">${v.label}</option>`).join('');
    }
  });
  ge('b-fawry') && ge('b-fawry').addEventListener('click', () => showLocalPayment('fawry'));
  ge('b-vf')    && ge('b-vf').addEventListener('click', () => showLocalPayment('vodafone'));

  ge('subj-sel') && ge('subj-sel').addEventListener('change', e => {
    S.subject = e.target.value; saveLocal(); render();
  });

  ge('tb-fc') && ge('tb-fc').addEventListener('click', () => { S.screen='flashcards'; render(); genFlashcards(); });
  ge('tb-qz') && ge('tb-qz').addEventListener('click', () => { S.screen='quiz';       render(); genQuiz(); });
  ge('tb-sm') && ge('tb-sm').addEventListener('click', () => { S.screen='summary';    render(); });
  ge('tb-mm') && ge('tb-mm').addEventListener('click', () => { S.screen='mindmap';    render(); });

  document.querySelectorAll('.bm-btn').forEach(el => el.addEventListener('click', () => {
    const idx = parseInt(el.dataset.idx);
    const msg = S.messages[idx];
    if (msg) {
      S.bookmarks.unshift({ content: msg.content, subject: S.subject, date: new Date().toLocaleDateString('ar') });
      saveLocal(); showToast(S.lang==='en'?'Saved 🔖':'تم الحفظ 🔖', 'success');
    }
  }));
  document.querySelectorAll('.copy-msg-btn').forEach(el => el.addEventListener('click', () => {
    const idx = parseInt(el.dataset.idx);
    const msg = S.messages[idx];
    if (!msg) return;
    navigator.clipboard?.writeText(msg.content).then(() => {
      el.textContent = '✅';
      setTimeout(() => { el.textContent = '📋'; }, 1500);
      showToast(S.lang==='en'?'✅ Copied!':'✅ تم النسخ', 'success');
    }).catch(() => showToast('تعذّر النسخ', 'error'));
  }));

  /* ── curriculum + grade selectors ── */
  document.querySelectorAll('.curriculum-btn').forEach(el => el.addEventListener('click', () => {
    S.curriculum = el.dataset.curriculum;
    S.grade = 'high';
    const cur = CURRICULA[S.curriculum] || CURRICULA.egypt;
    const gr  = cur.grades[S.grade] || Object.values(cur.grades)[0];
    S.subject = gr.subjects[0]?.name || 'الرياضيات';
    saveLocal(); render();
  }));

  document.querySelectorAll('.grade-btn').forEach(el => el.addEventListener('click', () => {
    S.grade = el.dataset.grade;
    const cur = CURRICULA[S.curriculum] || CURRICULA.egypt;
    const gr  = cur.grades[S.grade] || Object.values(cur.grades)[0];
    S.subject = gr.subjects[0]?.name || 'الرياضيات';
    saveLocal(); render();
  }));

  /* ── lesson topic ── */
  document.querySelectorAll('.lesson-topic').forEach(el => el.addEventListener('click', () => {
    const topic = el.dataset.topic, subj = el.dataset.subj;
    const cur = CURRICULA[S.curriculum] || CURRICULA.egypt;
    const gradeData = cur.grades[S.grade] || Object.values(cur.grades)[0];
    S.subject = subj; S.screen = 'chat'; render();
    setTimeout(() => {
      const inp = ge('f-msg');
      if (inp) {
        const intlBoards=['igcse','cambridge_alevel','edexcel','aqa','ocr','american','ib','cbse','icse','australian','canadian'];
        if (S.curriculum==='french_bac') {
          inp.value = `Explique le cours "${topic}" en ${subj} (${cur.label} — ${gradeData.label}) avec exemples et exercices.`;
        } else if (intlBoards.includes(S.curriculum)) {
          inp.value = `Explain the topic "${topic}" in ${subj} (${cur.label} — ${gradeData.label}). Include key concepts, worked examples, formulas, and exam tips.`;
        } else {
          inp.value = `اشرح لي درس "${topic}" في مادة ${subj} — ${cur.label} — ${gradeData.label} — بالتفصيل مع أمثلة وأسئلة تدريبية`;
        }        sendMsg();
      }
    }, 100);
  }));

  /* ── flashcards ── */
  ge('gen-fc')  && ge('gen-fc').addEventListener('click', genFlashcards);
  ge('fc-flip') && ge('fc-flip').addEventListener('click', () => { S.fcFlipped = !S.fcFlipped; render(); });
  ge('fc-prev') && ge('fc-prev').addEventListener('click', () => { S.fcIndex--; S.fcFlipped=false; render(); });
  ge('fc-next') && ge('fc-next').addEventListener('click', () => { S.fcIndex++; S.fcFlipped=false; render(); });

  /* ── quiz ── */
  ge('gen-qz') && ge('gen-qz').addEventListener('click', genQuiz);
  document.querySelectorAll('.quiz-opt-btn').forEach(el => el.addEventListener('click', () => {
    if (S.quizAnswer !== null) return;
    const oi = parseInt(el.dataset.oi);
    S.quizAnswer = oi;
    const q = S.quiz[S.quizIndex];
    if (oi === q.correct) {
      S.quizScore++;
      S.stats = S.stats || { xp:0, streak:1, totalChats:0, weeklyActivity:[0,0,0,0,0,0,0] };
      S.stats.xp += 20;
    } else {
      S.wrongAnswers.unshift({
        question: q.question, yourAnswer: q.options[oi],
        correctAnswer: q.options[q.correct], explanation: q.explanation || '',
      });
      if (S.wrongAnswers.length > 50) S.wrongAnswers.pop();
      saveLocal();
    }
    render();
  }));
  ge('qz-next') && ge('qz-next').addEventListener('click', () => {
    const wasLast = S.quizIndex + 1 >= S.quiz.length;
    S.quizIndex++; S.quizAnswer = null;
    if (wasLast) {
      // Quiz done — save stats
      const pct = Math.round((S.quizScore / S.quiz.length) * 100);
      S.stats = S.stats || { xp:0, streak:1, totalChats:0, weeklyActivity:[0,0,0,0,0,0,0], quizzesDone:0, bestScore:0 };
      S.stats.quizzesDone = (S.stats.quizzesDone || 0) + 1;
      S.stats.bestScore   = Math.max(S.stats.bestScore || 0, pct);
      S.stats.xp          = (S.stats.xp || 0) + Math.round(pct / 5); // bonus XP for quiz
      saveLocal();
    }
    render();
  });

  /* ── notes ── */
  ge('note-add') && ge('note-add').addEventListener('click', () => {
    const v = ge('note-inp')?.value?.trim();
    if (!v) return;
    S.notes.unshift({ text: v, color: S.noteColor || '#3B82F6', date: new Date().toLocaleDateString('ar-EG') });
    saveLocal(); if(ge('note-inp')) ge('note-inp').value=''; render();
  });
  document.querySelectorAll('.note-color-dot').forEach(el => el.addEventListener('click', () => {
    S.noteColor = el.dataset.color; render();
  }));
  document.querySelectorAll('[data-ni]').forEach(el => el.addEventListener('click', () => {
    S.notes.splice(parseInt(el.dataset.ni), 1); saveLocal(); render();
  }));

  /* ── bookmarks ── */
  document.querySelectorAll('[data-bi]').forEach(el => {
    el.addEventListener('click', () => {
      if (el.classList.contains('bm-copy')) {
        const bm = S.bookmarks[parseInt(el.dataset.bi)];
        if (bm) { navigator.clipboard?.writeText(bm.content).catch(()=>{}); el.textContent='✅'; setTimeout(()=>{el.textContent='📋';},1500); showToast('✅ تم النسخ','success'); }
      } else if (el.classList.contains('bm-wa')) {
        const bm = S.bookmarks[parseInt(el.dataset.bi)];
        if (bm) { const txt = bm.content.substring(0,300); window.open('https://wa.me/?text='+encodeURIComponent('📚 '+txt),'_blank'); }
      } else if (el.classList.contains('bm-expand')) {
        const card = el.closest('.info-card');
        if (card) { const box=card.querySelector('[style*="max-height"]'); if(box){box.style.maxHeight='none'; const fade=box.querySelector('[style*="linear-gradient"]'); if(fade)fade.style.display='none';} el.style.display='none'; }
      } else {
        S.bookmarks.splice(parseInt(el.dataset.bi), 1); saveLocal(); render();
      }
    });
  });

  /* ── wrong answers ── */
  document.querySelectorAll('[data-wi]').forEach(el => el.addEventListener('click', () => {
    S.wrongAnswers.splice(parseInt(el.dataset.wi), 1); saveLocal(); render();
  }));
  document.querySelectorAll('.ask-ai-wrong').forEach(el => el.addEventListener('click', () => {
    const q = el.dataset.q; const ans = el.dataset.ans;
    if (!q) return;
    const msg = `اشرح لي سؤال الاختبار التالي وبيّن لي لماذا الإجابة الصحيحة هي "${ans}":\n${q}`;
    S.screen='chat'; render();
    setTimeout(() => { const inp=ge('f-msg'); if(inp){inp.value=msg;} sendMsg(); }, 100);
  }));
  ge('b-retry-wrong') && ge('b-retry-wrong').addEventListener('click', () => {
    if (!S.wrongAnswers.length) return;
    S.quiz = S.wrongAnswers.slice(0,10).map(w=>({
      question: w.question, options: [w.correctAnswer, w.yourAnswer].filter(Boolean),
      answer: w.correctAnswer, explanation: w.explanation||''
    }));
    S.quizIndex=0; S.quizAnswer=null; S.quizScore=0;
    S.screen='quiz'; render(); showToast('🔄 اختبار مراجعة الأخطاء','info');
  });

  /* ── pomodoro ── */
  ge('pom-work')      && ge('pom-work').addEventListener('click',      () => { pomStop(); S.pomodoroMode='work';      S.pomodoroLeft=25*60; render(); });
  ge('pom-break')     && ge('pom-break').addEventListener('click',     () => { pomStop(); S.pomodoroMode='break';     S.pomodoroLeft=5*60;  render(); });
  ge('pom-longbreak') && ge('pom-longbreak').addEventListener('click', () => { pomStop(); S.pomodoroMode='longbreak'; S.pomodoroLeft=15*60; render(); });
  ge('pom-toggle')    && ge('pom-toggle').addEventListener('click',    () => { S.pomodoroRunning ? pomStop() : pomStart(); render(); });
  ge('pom-reset')     && ge('pom-reset').addEventListener('click', pomReset);

  /* ── schedule ── */
  ge('sch-add') && ge('sch-add').addEventListener('click', () => {
    const day  = ge('sch-day')?.value;
    const time = ge('sch-time')?.value;
    const subj = ge('sch-subj')?.value?.trim();
    if (!day || !time || !subj) return;
    S.schedule.push({ day, time, subject: subj });
    S.schedule.sort((a,b) => a.time.localeCompare(b.time));
    saveLocal(); render();
  });
  document.querySelectorAll('[data-si]').forEach(el => el.addEventListener('click', () => {
    S.schedule.splice(parseInt(el.dataset.si), 1); saveLocal(); render();
  }));

  /* ── summary ── */
  ge('b-gen-sum') && ge('b-gen-sum').addEventListener('click', doGenSummary);
  ge('sum-topic') && ge('sum-topic').addEventListener('keydown', e => { if(e.key==='Enter') doGenSummary(); });

  /* ── mindmap ── */
  ge('b-gen-mm') && ge('b-gen-mm').addEventListener('click', doGenMindMap);
  ge('mm-topic') && ge('mm-topic').addEventListener('keydown', e => { if(e.key==='Enter') doGenMindMap(); });

  /* ── textbook — event delegation so buttons work after every render() ── */
  document.addEventListener('click', e => {
    const btn = e.target.closest('.tb-read-btn');
    if (btn) viewPDF(btn.dataset.url, btn.dataset.viewUrl);
  });
  ge('tb-home') && ge('tb-home').addEventListener('click', () => { S.textbookUrl='home'; S.textbookViewUrl=null; S._pdfBlobUrl=null; S._pdfLoading=false; S._pdfError=null; render(); });

  /* -- profile actions -- */
  ge('b-copy-ref') && ge('b-copy-ref').addEventListener('click', () => {
    const code = S.user?.referralCode;
    if (code) { navigator.clipboard?.writeText(code).catch(()=>{}); showToast('✅ تم نسخ كود الإحالة: ' + code, 'success'); }
  });
  ge('b-whatsapp-ref') && ge('b-whatsapp-ref').addEventListener('click', () => {
    const code = S.user?.referralCode;
    if (!code) return;
    const link = `https://ostazai.surge.sh?ref=${code}`;
    const msg = `🎓 جرّب أستاذ AI — المساعد الذكي للطلاب!\n\n✨ سجّل عبر رابطي وتحصل على 7 أيام Pro مجاناً!\n\n👇 ${link}`;
    window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
  });
  ge('b-whatsapp-ref-up') && ge('b-whatsapp-ref-up').addEventListener('click', () => {
    const code = S.user?.referralCode;
    if (!code) return;
    const link = `https://ostazai.surge.sh?ref=${code}`;
    const msg = `🎓 جرّب أستاذ AI — المساعد الذكي للطلاب!\n\n✨ سجّل عبر رابطي وتحصل على 7 أيام Pro مجاناً!\n\n👇 ${link}`;
    window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
  });

  // PWA install
  ge('b-pwa-install') && (() => {
    const btn = ge('b-pwa-install');
    if (window._pwaPrompt) btn.style.display = 'block';
    btn.addEventListener('click', async () => {
      if (!window._pwaPrompt) return;
      window._pwaPrompt.prompt();
      const { outcome } = await window._pwaPrompt.userChoice;
      if (outcome === 'accepted') { showToast(S.lang==='en'?'✅ App installed!':'✅ تم تثبيت التطبيق!', 'success'); btn.style.display = 'none'; }
      window._pwaPrompt = null;
    });
  })();
  ge('b-save-name') && ge('b-save-name').addEventListener('click', doSaveName);
  ge('b-save-pass') && ge('b-save-pass').addEventListener('click', doChangePassword);
  ge('p-pass2') && ge('p-pass2').addEventListener('keydown', e => { if(e.key==='Enter') doChangePassword(); });
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CSS  (injected)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
(function injectCSS() {
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --bg:#0F172A; --bg-card:#1E293B; --bg-card2:#253047; --surface:#1E293B;
      --primary:#3B82F6; --success:#22C55E; --danger:#EF4444;
      --text:#F1F5F9; --text-muted:#94A3B8;
      --border:#334155; --radius:12px;
    }
    .light {
      --bg:#F1F5F9; --bg-card:#FFFFFF; --bg-card2:#E2E8F0; --surface:#FFFFFF;
      --primary:#2563EB; --success:#16A34A; --danger:#DC2626;
      --text:#0F172A; --text-muted:#64748B;
      --border:#CBD5E1; --radius:12px;
    }
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:Cairo,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;direction:rtl}
    .shell{display:flex;min-height:100vh}
    .sidebar{width:240px;background:var(--bg-card);border-left:1px solid var(--border);display:flex;flex-direction:column;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto;flex-shrink:0}
    .sidebar-logo{font-size:18px;font-weight:900;color:var(--primary);padding:0 20px 8px}
    .sidebar-cur{font-size:11px;color:var(--text-muted);padding:0 20px 16px;border-bottom:1px solid var(--border);margin-bottom:8px}
    .sidebar-nav{display:flex;flex-direction:column;gap:2px;padding:0 8px}
    .nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;transition:.15s;color:var(--text-muted)}
    .nav-item:hover{background:var(--bg-card2);color:var(--text)}
    .nav-item.active{background:var(--primary)22;color:var(--primary);font-weight:800}
    .nav-icon{font-size:16px;min-width:20px;text-align:center}
    .content{flex:1;overflow-y:auto;padding:0}
    .bottom-nav{display:none;position:fixed;bottom:0;left:0;right:0;background:var(--bg-card);border-top:1px solid var(--border);z-index:100;padding:6px 0 env(safe-area-inset-bottom,0)}
    .bot-nav-item{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 4px;flex:1;cursor:pointer;font-size:20px;color:var(--text-muted);transition:.15s;border-radius:8px;margin:0 2px}
    .bot-nav-item:active{background:var(--bg-card2)}
    .bot-nav-item.active{color:var(--primary)}
    .bot-nav-item.active span:first-child{transform:scale(1.15);display:inline-block}
    .drawer-btn:hover{border-color:var(--primary)!important;color:var(--primary)!important}
    @media(max-width:768px){.sidebar{display:none}.bottom-nav{display:flex}.content{padding-bottom:75px}}
    .auth-screen{display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px}
    .auth-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:32px;width:100%;max-width:420px;display:flex;flex-direction:column;gap:16px}
    .auth-logo{font-size:48px;text-align:center}
    .auth-title{font-size:22px;font-weight:900;text-align:center}
    .auth-subtitle{font-size:14px;color:var(--text-muted);text-align:center}
    .auth-switch{text-align:center;font-size:13px;color:var(--text-muted)}
    .auth-switch span{color:var(--primary);cursor:pointer;font-weight:700}
    .error-msg{background:#EF444422;color:#EF4444;border:1px solid #EF444444;border-radius:8px;padding:10px 14px;font-size:13px}
    .form-group{display:flex;flex-direction:column;gap:6px}
    .form-label{font-size:13px;font-weight:700;color:var(--text-muted)}
    .form-input{background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:10px 14px;color:var(--text);font-family:Cairo,sans-serif;font-size:14px;transition:.15s;width:100%}
    .form-input:focus{outline:none;border-color:var(--primary)}
    .btn{padding:10px 20px;border-radius:8px;border:none;font-family:Cairo,sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:.15s}
    .btn-primary{background:var(--primary);color:#fff}.btn-primary:hover{opacity:.9}.btn-primary:disabled{opacity:.5;cursor:not-allowed}
    .btn-secondary{background:var(--bg-card2);color:var(--text);border:1px solid var(--border)}.btn-secondary:hover{border-color:var(--primary);color:var(--primary)}
    .btn-sm{padding:6px 14px;font-size:12px}
    .btn-icon{background:none;border:none;cursor:pointer;font-size:16px;padding:4px;opacity:.6;transition:.15s}.btn-icon:hover{opacity:1}
    .screen-header{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--border);gap:12px;position:sticky;top:0;background:var(--bg);z-index:10}
    .screen-title{font-size:18px;font-weight:900}
    .screen-body{padding:20px 24px}
    @media(max-width:600px){.screen-header,.screen-body{padding:16px}}
    .chat-wrap{display:flex;flex-direction:column;height:100vh}
    .chat-toolbar{display:flex;align-items:center;gap:8px;padding:12px 16px;border-bottom:1px solid var(--border);flex-wrap:wrap;background:var(--bg);position:sticky;top:0;z-index:5}
    .subj-sel{background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:7px 12px;color:var(--text);font-family:Cairo,sans-serif;font-size:13px;font-weight:700;cursor:pointer}
    .tool-strip{display:flex;gap:6px;flex-wrap:wrap}
    .tool-btn{background:var(--bg-card);border:1px solid var(--border);border-radius:20px;padding:5px 12px;font-family:Cairo,sans-serif;font-size:12px;font-weight:700;color:var(--text);cursor:pointer;transition:.15s}.tool-btn:hover{border-color:var(--primary);color:var(--primary)}
    .chat-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px}
    .chat-empty{text-align:center;color:var(--text-muted);padding:32px 16px;font-size:15px;display:flex;flex-direction:column;align-items:center}
    .chat-context-bar{flex-shrink:0;overflow-x:auto;white-space:nowrap}
    .msg{display:flex;gap:10px;align-items:flex-end}
    .msg-user{flex-direction:row-reverse}
    .msg-avatar{font-size:24px;min-width:36px;text-align:center}
    .msg-bubble{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:12px 16px;max-width:75%;font-size:14px;line-height:1.8;position:relative}
    .msg-user .msg-bubble{background:var(--primary)22;border-color:var(--primary)44}
    .msg-actions{display:flex;gap:4px;margin-top:6px;justify-content:flex-end}
    .bm-btn,.copy-msg-btn{background:none;border:1px solid var(--border);border-radius:6px;cursor:pointer;font-size:12px;opacity:.6;transition:.15s;padding:3px 7px}.bm-btn:hover,.copy-msg-btn:hover{opacity:1;border-color:var(--primary)}
    .msg-time{font-size:10px;color:var(--text-muted);margin-top:3px;padding:0 4px}
    .thinking{display:flex;gap:6px;align-items:center;padding:14px}
    .thinking span{width:8px;height:8px;border-radius:50%;background:var(--primary);animation:bounce .8s infinite;display:inline-block}
    .thinking span:nth-child(2){animation-delay:.15s}.thinking span:nth-child(3){animation-delay:.3s}
    @keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-8px)}}
    .chat-input-row{display:flex;gap:8px;padding:12px 16px;border-top:1px solid var(--border);background:var(--bg);position:sticky;bottom:0}
    .chat-input{flex:1;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:11px 16px;color:var(--text);font-family:Cairo,sans-serif;font-size:14px}.chat-input:focus{outline:none;border-color:var(--primary)}
    .send-btn{background:var(--primary);color:#fff;border:none;border-radius:12px;padding:11px 20px;font-family:Cairo,sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:.15s}.send-btn:hover{opacity:.9}
    .info-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:16px}
    .stat-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;text-align:center;transition:.2s}.stat-card:hover{border-color:var(--primary)}
    .stat-val{font-size:26px;font-weight:900;color:var(--primary)}.stat-lbl{font-size:11px;color:var(--text-muted);margin-top:4px}
    .quick-chip{background:var(--bg-card);border:1.5px solid var(--border);border-radius:20px;padding:8px 14px;font-family:Cairo,sans-serif;font-size:13px;font-weight:700;color:var(--text);cursor:pointer;transition:.2s}.quick-chip:hover{border-color:var(--primary);color:var(--primary);background:var(--primary)11}
    .fc-progress{background:var(--border);border-radius:999px;height:6px;margin-bottom:12px}
    .fc-progress-bar{background:var(--primary);height:100%;border-radius:999px;transition:.3s}
    .fc-card{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;min-height:220px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;font-size:18px;font-weight:700;transition:.4s;transform-style:preserve-3d;perspective:600px;position:relative}
    .fc-card.flipped{transform:rotateY(180deg)}
    .fc-front,.fc-back{position:absolute;backface-visibility:hidden;padding:20px;width:100%}
    .fc-back{transform:rotateY(180deg);font-size:15px;font-weight:400;line-height:1.8;color:var(--text-muted)}
    .quiz-q{font-size:16px;font-weight:800;line-height:1.7;padding:16px;background:var(--bg-card);border-radius:12px;border:1px solid var(--border)}
    .quiz-opt-btn{background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:12px 16px;font-family:Cairo,sans-serif;font-size:14px;font-weight:600;color:var(--text);cursor:pointer;text-align:right;transition:.15s}.quiz-opt-btn:hover:not(:disabled){border-color:var(--primary)}
    .quiz-opt-btn.correct{background:#22C55E22;border-color:#22C55E;color:#22C55E}
    .quiz-opt-btn.wrong{background:#EF444422;border-color:#EF4444;color:#EF4444}
    .quiz-explain{background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:14px;font-size:13px;color:var(--text-muted);line-height:1.8;margin-top:12px}
    .mm-wrap{padding:8px}.mm-center{background:var(--primary);color:#fff;border-radius:12px;padding:12px 24px;font-weight:900;font-size:16px;text-align:center;margin-bottom:20px;display:inline-block}
    .mm-branches{display:flex;flex-wrap:wrap;gap:12px}
    .mm-branch{background:var(--bg-card);border:1px solid var(--primary)44;border-radius:12px;padding:12px;min-width:160px;flex:1}
    .mm-branch-title{font-weight:800;color:var(--primary);margin-bottom:8px;font-size:13px}
    .mm-leaf{background:var(--bg);border-radius:6px;padding:5px 10px;font-size:12px;margin-bottom:4px;border:1px solid var(--border)}
    .empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:60px 20px;color:var(--text-muted);text-align:center;font-size:15px}
    .spinner{width:36px;height:36px;border:3px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin .8s linear infinite}
    @keyframes spin{to{transform:rotate(360deg)}}
    .skeleton{background:linear-gradient(90deg,var(--border) 25%,var(--bg-card2) 50%,var(--border) 75%);background-size:200% 100%;border-radius:6px;animation:skeleton-shine 1.5s infinite}
    @keyframes skeleton-shine{0%{background-position:200% 0}100%{background-position:-200% 0}}
    .toast{position:fixed;bottom:90px;left:50%;transform:translateX(-50%);padding:10px 22px;border-radius:12px;font-family:Cairo,sans-serif;font-size:14px;font-weight:700;z-index:9999;animation:fadeUp .3s;white-space:nowrap}
    .toast-success{background:#22C55E;color:#fff}.toast-error{background:#EF4444;color:#fff}.toast-info{background:var(--primary);color:#fff}
    @keyframes fadeUp{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
    @keyframes slideDown{from{transform:translateY(-100%)}to{transform:translateY(0)}}
    pre{background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:12px;overflow-x:auto;margin:8px 0}
    code{font-family:monospace;font-size:13px;background:var(--bg);padding:1px 5px;border-radius:4px}
    pre code{background:none;padding:0}
    ul{padding-right:20px;line-height:2}
    h1,h2,h3{margin:8px 0 4px;color:var(--primary)}
    .lesson-topic:hover{background:var(--primary)11 !important;border-color:var(--primary) !important}
  `;
  document.head.appendChild(style);
})();

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   INIT
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
/* ════════════════════════════════════════════════════════════
   ADMIN DASHBOARD
   ════════════════════════════════════════════════════════════ */
let adminData = null;
let adminKey = '';

function tplAdmin() {
  const d = adminData;
  return `
<div class="screen-header">
  <div class="screen-title">🛡 لوحة التحكم</div>
</div>
<div class="screen-body">
  ${!d ? `
  <div class="info-card" style="margin-bottom:16px">
    <div style="font-weight:800;margin-bottom:10px">🔑 مفتاح المدير</div>
    <div class="form-group">
      <input id="admin-key" type="password" class="form-input" placeholder="ADMIN_KEY" value="${esc(adminKey)}"/>
    </div>
    <button class="btn btn-primary" id="b-admin-load" style="width:100%">📊 تحميل البيانات</button>
  </div>
  ` : `
  <button class="btn btn-secondary btn-sm" style="margin-bottom:16px" id="b-admin-reload">🔄 تحديث</button>
  
  <!-- KPI Grid -->
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px">
    ${[
      { label:'إجمالي المستخدمين', val: d.users.total, color:'#3B82F6' },
      { label:'مستخدمو اليوم', val: d.users.today, color:'#10B981' },
      { label:'هذا الأسبوع', val: d.users.week, color:'#F59E0B' },
      { label:'مشتركو Pro', val: d.users.pro, color:'#8B5CF6' },
      { label:'إجمالي الأسئلة', val: d.questions.total.toLocaleString(), color:'#EF4444' },
      { label:'متوسط/مستخدم', val: d.questions.avg, color:'#06B6D4' },
    ].map(k => `<div class="info-card" style="text-align:center;padding:12px 8px">
      <div style="font-size:22px;font-weight:900;color:${k.color}">${k.val}</div>
      <div style="font-size:10px;color:var(--text-muted);margin-top:4px">${k.label}</div>
    </div>`).join('')}
  </div>

  <!-- Daily Signups Chart -->
  ${d.dailySignups ? `
  <div class="info-card" style="margin-bottom:16px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
      <span style="font-weight:800">📈 التسجيلات اليومية (آخر 7 أيام)</span>
      <span style="font-size:12px;color:var(--primary);font-weight:700">${d.dailySignups.reduce((a,b)=>a+b.count,0)} هذا الأسبوع</span>
    </div>
    <div style="display:flex;gap:6px;align-items:flex-end;height:90px">
      ${(()=>{
        const maxV = Math.max(...d.dailySignups.map(x=>x.count), 1);
        return d.dailySignups.map(x=>`
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
          ${x.count>0?`<div style="font-size:9px;color:var(--primary);font-weight:700">${x.count}</div>`:'<div style="font-size:9px">&nbsp;</div>'}
          <div style="width:100%;background:${x.count?'linear-gradient(180deg,#3B82F6,#8B5CF6)':'var(--border)'};
                      border-radius:6px 6px 2px 2px;height:${Math.round((x.count/maxV)*60)+4}px;
                      min-height:4px;transition:.4s"></div>
          <span style="font-size:9px;color:var(--text-muted);text-align:center;line-height:1.2">${esc(x.date)}</span>
        </div>`).join('');
      })()}
    </div>
  </div>` : ''}

  <!-- Countries -->
  <div class="info-card" style="margin-bottom:16px">
    <div style="font-weight:800;margin-bottom:10px">🌍 توزيع الدول</div>
    ${d.countries.slice(0,6).map(c => `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
      <span style="width:60px;font-size:12px;font-weight:700">${esc(c.country||'?')}</span>
      <div style="flex:1;height:6px;background:var(--border);border-radius:3px">
        <div style="width:${Math.round((c.count/d.users.total)*100)}%;height:6px;background:#3B82F6;border-radius:3px"></div>
      </div>
      <span style="font-size:12px;color:var(--text-muted);width:24px">${c.count}</span>
    </div>`).join('')}
  </div>

  <!-- Revenue Estimate -->
  <div class="info-card" style="margin-bottom:16px;border-color:#F59E0B44">
    <div style="font-weight:800;margin-bottom:10px">💰 تقدير الإيراد</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div style="text-align:center;padding:10px;background:var(--bg);border-radius:8px">
        <div style="font-size:20px;font-weight:900;color:#F59E0B">${(d.users.pro * 1.85).toFixed(1)} KD</div>
        <div style="font-size:11px;color:var(--text-muted)">إيراد شهري (تقديري)</div>
      </div>
      <div style="text-align:center;padding:10px;background:var(--bg);border-radius:8px">
        <div style="font-size:20px;font-weight:900;color:#22C55E">${d.users.referred||0}</div>
        <div style="font-size:11px;color:var(--text-muted)">مستخدم عبر إحالة</div>
      </div>
    </div>
  </div>

  <!-- Create Promo Code -->
  <div class="info-card" style="margin-bottom:16px">
    <div style="font-weight:800;margin-bottom:12px">🎁 إنشاء كود ترقية</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <input id="promo-new-code" class="form-input" placeholder="الكود (مثال: SCHOOL30)" style="text-transform:uppercase;letter-spacing:2px"/>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <input id="promo-new-days" class="form-input" type="number" placeholder="عدد أيام Pro" value="30"/>
        <input id="promo-new-uses" class="form-input" type="number" placeholder="عدد الاستخدامات" value="100"/>
      </div>
      <button class="btn btn-primary" id="b-create-promo">✅ إنشاء الكود</button>
      <div id="promo-create-msg" style="display:none;font-size:13px;font-weight:700;padding:8px;border-radius:8px"></div>
    </div>
  </div>

  <!-- Recent Users -->
  <div class="info-card">
    <div style="font-weight:800;margin-bottom:10px">👥 آخر المستخدمين</div>
    <div style="overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;font-size:12px">
      <thead>
        <tr style="border-bottom:1px solid var(--border);color:var(--text-muted)">
          <th style="padding:6px 8px;text-align:right;font-weight:700">الاسم</th>
          <th style="padding:6px 8px;text-align:right;font-weight:700">الدولة</th>
          <th style="padding:6px 8px;text-align:right;font-weight:700">الخطة</th>
          <th style="padding:6px 8px;text-align:right;font-weight:700">الأسئلة</th>
          <th style="padding:6px 8px;text-align:right;font-weight:700">التاريخ</th>
        </tr>
      </thead>
      <tbody>
        ${d.recentUsers.slice(0,15).map(u => `
        <tr style="border-bottom:1px solid var(--border)22">
          <td style="padding:7px 8px">
            <div style="font-weight:700">${esc(u.name)}</div>
            <div style="color:var(--text-muted);font-size:11px">${esc(u.email)}</div>
          </td>
          <td style="padding:7px 8px;color:var(--text-muted)">${esc(u.country||'-')}</td>
          <td style="padding:7px 8px"><span style="color:${u.plan==='pro'?'#F59E0B':'var(--text-muted)'};font-weight:800">${u.plan==='pro'?'⭐ Pro':'مجاني'}</span></td>
          <td style="padding:7px 8px;color:var(--primary);font-weight:700">${u.questions||0}</td>
          <td style="padding:7px 8px;color:var(--text-muted)">${u.joined?new Date(u.joined).toLocaleDateString('ar-EG'):'-'}</td>
        </tr>`).join('')}
      </tbody>
    </table>
    </div>
  </div>
  `}
</div>`;
}

async function loadAdminData() {
  const key = ge('admin-key')?.value?.trim();
  if (!key) return showToast('أدخل المفتاح', 'error');
  adminKey = key;
  const btn = ge('b-admin-load');
  if (btn) { btn.disabled = true; btn.textContent = '...'; }
  try {
    const r = await fetch(API + '/admin/dashboard', {
      headers: { 'x-admin-key': key }
    });
    if (!r.ok) throw new Error('مفتاح خاطئ أو غير مصرح');
    adminData = await r.json();
    render();
  } catch(e) {
    showToast(e.message, 'error');
    if (btn) { btn.disabled = false; btn.textContent = '📊 تحميل البيانات'; }
  }
}

/* ════════════════════════════════════════════════════════════
   PUSH NOTIFICATIONS
   ════════════════════════════════════════════════════════════ */
async function requestPushPermission() {
  if (!('Notification' in window)) {
    showToast('متصفحك لا يدعم الإشعارات', 'error'); return;
  }
  const perm = await Notification.requestPermission();
  if (perm === 'granted') {
    showToast('✅ تم تفعيل الإشعارات!', 'success');
    saveLocal();
    scheduleDailyReminder();
  } else {
    showToast('تم رفض الإشعارات', 'error');
  }
}

function scheduleDailyReminder() {
  const messages = [
    'حان وقت المذاكرة! 📚 استمر في تقدمك اليوم',
    '🔥 سلسلة يومية! لا تكسرها — ذاكر الآن',
    '🧠 عقلك ينتظرك! سؤال واحد يكفي للبداية',
    '⭐ الطلاب المتفوقون يذاكرون كل يوم — أنت منهم!',
    '📝 خمس دقائق من المراجعة تعادل ساعة من الاستذكار',
    '🏆 تقدّم خطوة للأمام اليوم في ' + S.subject,
  ];
  const msg = messages[new Date().getDay() % messages.length];
  // Schedule for 8 PM local time today
  const now  = new Date();
  const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1); // Tomorrow if already past 8PM
  const delay = target.getTime() - now.getTime();
  // Also check if we already sent today
  const lastNotif = localStorage.getItem('oa_last_notif');
  const todayStr  = new Date().toDateString();
  if (lastNotif === todayStr) return; // Already sent today
  setTimeout(() => {
    sendPushNotification('أستاذ AI 🎓', msg);
    localStorage.setItem('oa_last_notif', new Date().toDateString());
    scheduleDailyReminder(); // Reschedule for next day
  }, Math.min(delay, 2147483647)); // clamp to max setTimeout
}

function sendPushNotification(title, body, icon = '🎓') {
  if (Notification.permission !== 'granted') return;
  try {
    const n = new Notification(title, {
      body,
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="%230F172A"/><text x="32" y="44" text-anchor="middle" font-size="36">🎓</text></svg>',
      badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="%23F59E0B"/></svg>',
      dir: 'rtl',
      lang: 'ar',
      tag: 'ostazai-reminder',
    });
    localStorage.setItem('oa_last_notif', String(Date.now()));
    n.onclick = () => { window.focus(); n.close(); };
  } catch(e) { console.warn('Push failed:', e); }
}

// Auto-schedule when app loads (if permission already granted)
function initPushNotifications() {
  if (Notification.permission === 'granted') {
    scheduleDailyReminder();
    scheduleStudyReminders();
  }
}

function scheduleStudyReminders() {
  // Check study schedule and send reminders
  if (!S.schedule || !S.schedule.length) return;
  const now = new Date();
  const today = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'][now.getDay()];
  S.schedule.forEach(item => {
    if (item.day !== today) return;
    const [hours, mins] = (item.time || '16:00').split(':').map(Number);
    const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, mins, 0);
    const delay = target.getTime() - now.getTime();
    if (delay > 0 && delay < 24*60*60*1000) {
      setTimeout(() => {
        sendPushNotification(
          'أستاذ AI 📅 — تذكير الجدول',
          'حان وقت مذاكرة ' + (item.subject || '') + '! 📚 ابدأ الآن'
        );
      }, delay);
    }
  });
}

async function shareConversation() {
  if (!S.messages.length) { showToast('لا توجد محادثة لمشاركتها', 'error'); return; }
  const msgs = S.messages.slice(-6);
  const parts = msgs.map(function(m) {
    const prefix = m.role === 'user' ? '\n\u{1F9D1} \u{623}\u{646}\u{627}:\n' : '\n\u{1F393} \u{623}\u{633}\u{62A}\u{627}\u{630} AI:\n';
    return prefix + (m.content || '');
  });
  const shareText = parts.join('') + '\n\n\u{2014} \u{645}\u{646} \u{62A}\u{637}\u{628}\u{64A}\u{642} \u{623}\u{633}\u{62A}\u{627}\u{630} AI \u{1F393}\n' + window.location.origin;

  if (navigator.share) {
    try { await navigator.share({ title: '\u{623}\u{633}\u{62A}\u{627}\u{630} AI', text: shareText }); return; }
    catch(e) { if (e.name === 'AbortError') return; }
  }
  try {
    await navigator.clipboard.writeText(shareText);
    showToast('\u{62A}\u{645} \u{646}\u{633}\u{62E} \u{627}\u{644}\u{645}\u{62D}\u{627}\u{62F}\u{62B}\u{629} ✅', 'success');
  } catch {
    const ta = document.createElement('textarea');
    ta.value = shareText; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    showToast('\u{62A}\u{645} \u{646}\u{633}\u{62E} \u{627}\u{644}\u{645}\u{62D}\u{627}\u{62F}\u{62B}\u{629} ✅', 'success');
  }
}

/* ════════════════════════════════════════════════════════════
   ONBOARDING — first-time user welcome
   ════════════════════════════════════════════════════════════ */
function tplOnboarding() {
  const u = S.user || {};
  const steps = [
    {
      icon:'🎓', bg:'#3B82F622',
      title: `أهلاً ${u.name ? u.name.split(' ')[0] : 'بك'} في أستاذ AI!`,
      desc: 'مساعدك الذكي للتعليم — اسأل في أي مادة واحصل على إجابة فورية ✨',
      extra: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:320px;margin:0 auto 32px">
        ${[['📚','دروس تفاعلية'],['📸','حل بالصورة'],['🧠','خرائط ذهنية'],['⭐','7 أيام Pro مجاناً']].map(([i,l])=>`
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:12px;font-size:13px;font-weight:700">
          <div style="font-size:22px;margin-bottom:4px">${i}</div>${l}
        </div>`).join('')}
      </div>`
    },
    {
      icon:'🌍', bg:'#10B98122',
      title: 'اختر دولتك ومنهجك',
      desc: 'نُخصّص لك المحتوى حسب منهج دراستك',
      extra: `<div style="max-width:340px;margin:0 auto 32px;display:flex;flex-direction:column;gap:10px">
        <select id="ob-country" class="form-input" style="font-size:15px;padding:12px">
          <option value="">-- اختر دولتك --</option>
          ${Object.entries(CURRICULA).map(([k,v])=>`<option value="${k}" ${S.curriculum===k?'selected':''}>${v.label}</option>`).join('')}
        </select>
        <select id="ob-grade" class="form-input" style="font-size:15px;padding:12px">
          ${Object.entries(CURRICULA[S.curriculum]?.grades || CURRICULA.egypt.grades).map(([k,v])=>`<option value="${k}" ${S.grade===k?'selected':''}>${v.label}</option>`).join('')}
        </select>
      </div>`
    },
    {
      icon:'📸', bg:'#F59E0B22',
      title: 'حلّ المسائل بالصورة',
      desc: 'التقط صورة لأي مسألة رياضيات أو فيزياء أو كيمياء — والذكاء الاصطناعي يحلها لك خطوة بخطوة',
      extra: `<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:14px;padding:20px;max-width:300px;margin:0 auto 32px;font-size:13px;color:var(--text-muted);line-height:2">
        📸 اضغط زر الكاميرا في المحادثة<br>
        🖼️ اختر صورة المسألة<br>
        ⚡ احصل على الحل فوراً
      </div>`
    },
    {
      icon:'📝', bg:'#8B5CF622',
      title: 'بطاقات واختبارات وملخصات',
      desc: 'كل أدوات الدراسة في مكان واحد — ولّدها بضغطة زر واحدة',
      extra: `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:320px;margin:0 auto 32px">
        ${[['🗂️','بطاقات تعليمية'],['📝','اختبار ذاتي'],['📋','ملخص PDF']].map(([i,l])=>`
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:12px 8px;font-size:12px;font-weight:700;text-align:center">
          <div style="font-size:26px;margin-bottom:6px">${i}</div>${l}
        </div>`).join('')}
      </div>`
    },
    {
      icon:'🚀', bg:'#22C55E22',
      title: 'جاهز للانطلاق!',
      desc: `اشتراكك Pro مفعّل لـ 7 أيام مجاناً — استفد من كل المزايا الآن`,
      extra: `<div style="background:#22C55E22;border:1px solid #22C55E44;border-radius:12px;padding:16px;max-width:300px;margin:0 auto 32px;font-size:13px;color:#22C55E;line-height:2.2">
        ✅ أسئلة غير محدودة<br>
        ✅ ملخصات ذكية<br>
        ✅ خرائط ذهنية<br>
        ✅ حل بالصورة<br>
        ✅ تصدير PDF
      </div>`
    },
  ];
  const step = S.onboardStep || 0;
  const cur = steps[Math.min(step, steps.length-1)];
  const isLast = step >= steps.length - 1;
  const pct = Math.round(((step+1)/steps.length)*100);
  return `
<div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:32px 20px 20px;
            background:radial-gradient(ellipse at 50% 0%,${cur.bg} 0%,transparent 60%),var(--bg);text-align:center;overflow-y:auto">
  <!-- Progress bar -->
  <div style="width:100%;max-width:360px;margin-bottom:32px">
    <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);margin-bottom:8px">
      <span>${S.lang==='en'?'Step '+(step+1)+' of '+steps.length:'الخطوة '+(step+1)+' من '+steps.length}</span>
      <span id="b-ob-skip" style="color:var(--primary);cursor:pointer;font-weight:700">${S.lang==='en'?'Skip':'تخطّى'}</span>
    </div>
    <div style="background:var(--border);border-radius:999px;height:6px;overflow:hidden">
      <div style="width:${pct}%;height:100%;background:var(--primary);border-radius:999px;transition:.4s"></div>
    </div>
  </div>
  <!-- Icon -->
  <div style="font-size:72px;margin-bottom:20px;animation:float 3s ease-in-out infinite">${cur.icon}</div>
  <!-- Title -->
  <div style="font-size:22px;font-weight:900;margin-bottom:10px;color:var(--text);max-width:360px">${cur.title}</div>
  <div style="font-size:14px;color:var(--text-muted);max-width:320px;line-height:1.8;margin-bottom:24px">${cur.desc}</div>
  <!-- Extra content -->
  ${cur.extra || ''}
  <!-- CTA -->
  <button class="btn btn-primary" id="b-ob-next"
    style="width:100%;max-width:320px;font-size:16px;padding:16px;border-radius:14px;
           box-shadow:0 4px 20px var(--primary)44">
    ${isLast ? (S.lang==='en'?'🚀 Start Studying Now!':'🚀 ابدأ المذاكرة الآن!') : (S.lang==='en'?'Next →':'التالي →')}
  </button>
</div>
<style>
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
</style>`;
}

function finishOnboarding() {
  localStorage.setItem('oa_onboarded', '1');
  S.screen = 'chat';
  render();
}

/* ════════════════════════════════════════════════════════════
   LOCAL PAYMENT — Fawry / Vodafone Cash
   ════════════════════════════════════════════════════════════ */
function showLocalPayment(method) {
  const box = ge('local-pay-info');
  if (!box) return;
  const email = S.user?.email || 'بريدك الإلكتروني';
  const userId = S.user?.id || '';
  const ref = 'OZ-' + (userId.toString().slice(-6) || Date.now().toString(36).toUpperCase());

  let info = '';
  if (method === 'fawry') {
    info = '<div style="font-weight:900;color:var(--primary);font-size:15px;margin-bottom:10px">&#x1F9FE; الدفع عبر فوري</div>'
      + '<div>1. اذهب لأقرب محل فوري أو تطبيق MyFawry</div>'
      + '<div>2. اختر <b>دفع فواتير</b> ← <b>تطبيقات إلكترونية</b></div>'
      + '<div>3. ابحث عن: <b style="color:var(--primary)">أستاذ AI</b></div>'
      + '<div>4. أدخل الكود المرجعي: <b style="color:var(--primary);font-size:16px;letter-spacing:2px">' + ref + '</b></div>'
      + '<div>5. المبلغ: <b>49 ج.م</b> (شهري) أو <b>399 ج.م</b> (سنوي)</div>'
      + '<div style="margin-top:10px;color:var(--text-muted);font-size:12px">بعد الدفع سيتم تفعيل حسابك تلقائياً خلال دقائق</div>';
  } else {
    info = '<div style="font-weight:900;color:var(--primary);font-size:15px;margin-bottom:10px">&#x1F4F1; الدفع عبر فودافون كاش</div>'
      + '<div>1. افتح تطبيق فودافون كاش</div>'
      + '<div>2. اختر <b>تحويل</b> ثم أدخل رقم:</div>'
      + '<div style="font-size:18px;font-weight:900;color:var(--primary);text-align:center;padding:8px;background:var(--bg);border-radius:8px;margin:8px 0;letter-spacing:2px">01001234567</div>'
      + '<div>3. المبلغ: <b>49 ج.م</b> شهري / <b>399 ج.م</b> سنوي</div>'
      + '<div>4. في ملاحظات التحويل اكتب: <b style="color:var(--primary)">' + email + '</b></div>'
      + '<div style="margin-top:10px;color:var(--text-muted);font-size:12px">سنتواصل معك خلال ساعة لتفعيل الاشتراك</div>';
  }

  box.innerHTML = info;
  box.style.display = 'block';
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  showToast('\u{627}\u{62A}\u{628}\u{639} \u{627}\u{644}\u{62A}\u{639}\u{644}\u{64A}\u{645}\u{627}\u{62A} \u{623}\u{62F}\u{646}\u{627}\u{647}', 'info');
}

function setLoadingMsg(msg) {
  const el = ge('loading-msg');
  if (el) el.textContent = msg;
}

async function init() {
  loadLocal();
  document.body.classList.toggle('light', S.darkMode);
  S.screen = 'loading'; render();

  setLoadingMsg('جارٍ التحقق من حسابك...');
  await new Promise(r => setTimeout(r, 400));

  if (S.token) {
    try {
      setLoadingMsg('جارٍ تحميل بياناتك...');
      const d = await req('/auth/me');
      S.user = d.user || d;
      setLoadingMsg('مرحباً بك! 👋');
      await new Promise(r => setTimeout(r, 300));
      S.screen = localStorage.getItem('oa_onboarded') ? 'chat' : 'onboarding';
    } catch {
      S.token = null; S.user = null;
      S.screen = 'login';
    }
  } else if (S.user) {
    S.screen = 'chat';
  } else {
    S.screen = 'login';
  }

  render();

  const urlParams = new URLSearchParams(window.location.search);

  // Handle PWA shortcut ?screen=xxx
  if (urlParams.get('screen') && S.token) {
    const targetScreen = urlParams.get('screen');
    const validScreens = ['chat','lessons','flashcards','quiz','summary','mindmap','stats','notes','bookmarks','profile','upgrade'];
    if (validScreens.includes(targetScreen)) {
      S.screen = targetScreen;
      history.replaceState({}, '', window.location.pathname);
      render();
    }
  }

  // Handle referral link ?ref=CODE
  if (urlParams.get('ref') && !S.token) {
    S.screen = 'register';
    render();
    // Don\'t clear the URL yet — bind() will read it to pre-fill the field
  }

  // Handle password reset link
  if (urlParams.get('reset')) {
    S.resetToken = urlParams.get('reset');
    history.replaceState({}, '', window.location.pathname);
    S.screen = 'reset-password';
    render();
    return;
  }

  // Handle payment gateway redirects
  if (urlParams.get('payment') === 'success') {
    const gateway = urlParams.get('gateway') || '';
    const token   = urlParams.get('token') || '';  // PayPal order token
    history.replaceState({}, '', window.location.pathname);

    setTimeout(async () => {
      showToast('🎉 تم الدفع بنجاح! جارٍ تفعيل Pro...', 'success');

      // PayPal: capture the order
      if (gateway === 'paypal' && token && S.token) {
        try {
          await req('/billing/capture-paypal-order', 'POST', { orderId: token });
        } catch(e) { console.warn('PayPal capture:', e.message); }
      }

      // Refresh user after 3s (allow webhook to process)
      setTimeout(async () => {
        try {
          const d = await req('/auth/me');
          S.user = d.user || d;
          saveLocal();
          render();
          if (S.user?.plan === 'pro') {
            showToast('⭐ تم تفعيل Pro بنجاح!', 'success');
          }
        } catch(e) {}
      }, 3000);
    }, 500);
  }
  if (urlParams.get('payment') === 'cancelled') {
    history.replaceState({}, '', window.location.pathname);
    setTimeout(() => showToast('❌ تم إلغاء عملية الدفع', 'error'), 500);
  }

  // Sync XP every 5 minutes
  setInterval(syncXP, 5 * 60 * 1000);
  initPushNotifications();

  // Network status monitoring
  function updateNetworkBanner() {
    const banner = ge('offline-banner');
    if (!banner) return;
    if (!navigator.onLine) {
      banner.style.display = 'block';
      document.body.style.paddingTop = '36px';
    } else {
      if (banner.style.display !== 'none') {
        banner.style.display = 'none';
        document.body.style.paddingTop = '';
        showToast('✅ عاد الاتصال بالإنترنت', 'success');
      }
    }
  }
  window.addEventListener('online',  updateNetworkBanner);
  window.addEventListener('offline', updateNetworkBanner);
  updateNetworkBanner(); // Check immediately

  // PWA install prompt
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    window._pwaPrompt = e;
    // Show install button if on profile screen
    const btn = ge('b-pwa-install');
    if (btn) { btn.style.display = 'block'; }
  });
}

init();
