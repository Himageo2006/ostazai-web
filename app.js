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
    <div class="nav-item${S.screen===n.s?' active':''}" data-screen="${n.s}">
      <span class="nav-icon">${n.icon}</span>
      <span class="nav-label">${n.label}</span>
    </div>`).join('');
  const botNavScreens = ['chat','lessons','flashcards','stats','profile'];
  const botNav = [
    ...nav.filter(n => botNavScreens.includes(n.s)),
    { s:'__more__', icon:'⋯', label:'المزيد' }
  ].map(n => `
    <div class="bot-nav-item${S.screen===n.s?' active':''}" data-screen="${n.s}">
      <span>${n.icon}</span><span style="font-size:10px">${n.label}</span>
    </div>`).join('');
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
    ],
    // ── الصف الثاني الثانوي ────────────────────────────────────────
    high2: [
      { subj:'اللغة العربية', icon:'📜', color:'#8B5CF6', books:[
        { title:'اللغة العربية ت١ 2025-2026', term:'ثاني ثانوي — ترم أول', url:`${BLOB26}/Secondry/Secondry2/Term1/StudentBook/Arabic_language_Sec2_Tr1.pdf` },
      ]},
      { subj:'الفيزياء', icon:'⚡', color:'#F59E0B', books:[
        { title:'الفيزياء 2025-2026', term:'ثاني ثانوي', viewUrl: gdrive('18_vZYVz6AJhLA-E8ummpQ-1dXhl8pRnF'), url: gdown('18_vZYVz6AJhLA-E8ummpQ-1dXhl8pRnF') },
      ]},
      { subj:'التاريخ', icon:'🏛️', color:'#D97706', books:[
        { title:'التاريخ ت١ 2025-2026', term:'ثاني ثانوي — ترم أول', url:`${BOOKS}/history_2sec_t1.pdf` },
      ]},
      { subj:'الجغرافيا', icon:'🗺️', color:'#0EA5E9', books:[
        { title:'الجغرافيا ت١ 2025-2026', term:'ثاني ثانوي — ترم أول', url:`${BOOKS}/geography_2sec_t1.pdf` },
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
      { subj:'التربية الإسلامية', icon:'☪️', color:'#059669', books:[
        { title:'التربية الإسلامية 2025-2026', term:'ثالث ثانوي', url:`${BOOKS}/islam_3sec.pdf` },
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
              <div style="display:inline-block;margin-top:4px;background:${subj.color}22;color:${subj.color};font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px">📚 وزارة التعليم</div>
            </div>
            <div style="display:flex;flex-direction:column;gap:5px;flex-shrink:0">
              <a href="${book.viewUrl || book.url}" target="_blank" rel="noopener"
                style="background:${subj.color};color:#fff;font-size:11px;font-weight:700;padding:6px 12px;border-radius:8px;border:none;cursor:pointer;font-family:Cairo,sans-serif;display:block;text-decoration:none;text-align:center">
                📖 قراءة
              </a>
              <a href="${book.url}" target="_blank" rel="noopener"
                style="background:transparent;color:${subj.color};font-size:11px;font-weight:700;padding:5px 12px;border-radius:8px;border:1px solid ${subj.color};cursor:pointer;font-family:Cairo,sans-serif;display:block;text-decoration:none;text-align:center">
                ⬇️ تحميل
              </a>
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
function bind() {

  /* ── sidebar / bottom nav — delegated once, survives all render() calls ── */
  if (!window._navBound) {
    window._navBound = true;
    document.addEventListener('click', e => {
      const el = e.target.closest('[data-screen]');
      if (!el) return;
      const s = el.dataset.screen;
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
    });
  }

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
