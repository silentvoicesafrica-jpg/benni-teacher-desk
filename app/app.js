const CLASS_LIST = ['KG2', 'Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6', 'Basic 7 / Form 1', 'Basic 8 / Form 2', 'Basic 9 / Form 3'];
const DEFAULT_TOPICS = {
  'KG2': ['What is ICT?', 'ICT Around Us', 'Computer Parts', 'Using a Mouse', 'Using a Keyboard', 'Staying Safe', 'Drawing on Computer', 'More Drawing', 'Playing Educational Games', 'ICT at Home', 'Fun Review'],
  'Basic 1': ['Computer parts', 'ICT at home and school', 'Mouse skills', 'Keyboard skills', 'Staying safe'],
  'Basic 2': ['Computer parts and uses', 'Mouse and keyboard practice', 'Digital safety', 'Drawing and colours', 'Technology around us'],
  'Basic 3': ['Introduction to computing', 'Computer parts and their uses', 'Keyboard and mouse skills', 'Word processing basics', 'Health and safety in ICT'],
  'Basic 4': ['Computer input and output devices', 'Word processing', 'Presentation basics', 'Internet and responsible use', 'Health and safety in ICT'],
  'Basic 5': ['Output devices and digital devices', 'Word processing tools', 'Presentation tools', 'Electronic spreadsheet', 'Internet and email safety'],
  'Basic 6': ['Computer systems', 'Word processing and presentation', 'Spreadsheets', 'Email and internet', 'Digital literacy and privacy'],
  'Basic 7 / Form 1': ['Components of computers and computer systems', 'Technology in the community', 'Word processing', 'Introduction to presentation', 'Internet and social media', 'Information security'],
  'Basic 8 / Form 2': ['Electronic spreadsheet', 'Computer networks', 'Information security', 'Web technologies', 'Introduction to programming', 'Algorithms'],
  'Basic 9 / Form 3': ['Desktop publishing', 'Internet and social media', 'Programming and algorithms', 'Robotics', 'Artificial intelligence', 'Digital citizenship and security']
};
const EXTRA_CATALOGUE = typeof EXTRA_CURRICULA === 'undefined' ? [] : EXTRA_CURRICULA;
const SATURDAY_FOUNDATIONS = [
  ['What is ICT?', 'Learners identify ICT tools and explain one use in school or home.', 'Sort device picture cards and discuss local examples.', 'Oral answers and a labelled device drawing.', 'Picture cards or real devices'],
  ['Data and information', 'Learners distinguish simple data from useful information.', 'Collect a small class count and turn it into a labelled table.', 'Completed table and learner explanation.', 'Paper tally chart; one shared device optional'],
  ['Input and output devices', 'Learners classify common devices by what they send to or show from a computer.', 'Match device cards to input or output and demonstrate where possible.', 'Correct classification and practical demonstration.', 'Device cards or real keyboard/monitor'],
  ['Desktop and computer parts', 'Learners identify the desktop, icons, taskbar, monitor, keyboard and mouse.', 'Use a screenshot, drawing or shared computer to locate parts.', 'Labelled diagram and pointing activity.', 'Printed screenshot or board drawing'],
  ['Files, folders and saving', 'Learners explain why files need names and folders and demonstrate a safe save routine.', 'Create a paper folder system, then practise save and reopen if a computer is available.', 'Named paper file or reopened digital file.', 'Paper folders; shared computer optional'],
  ['ICT safety and responsible use', 'Learners demonstrate safe posture, permission, privacy, logout and help-seeking.', 'Role-play safe and unsafe computer-room situations.', 'Safety checklist and learner pledge.', 'Scenario cards and classroom rules']
];
const freshState = () => ({
  term: 'Term 1', currentClass: 'Basic 4',
  customTopics: {}, exams: [], workRecords: [], scores: [], projects: [], lessonPlans: [], extraPlans: [], customExtras: [],
  targets: Object.fromEntries(CLASS_LIST.map(c => [c, { Exercise: 4, 'Class test': 2, Assignment: 1, Project: 1 }])),
  checks: Object.fromEntries(CLASS_LIST.map(c => [c, { scheme: false, exercise: false, tests: false, exam: false, projects: false }]))
});
// Manus sign-in needs the Node server (server.mjs). GitHub Pages has no server,
// so the static version runs in local mode only. Set to true only when a server is deployed.
const SIGN_IN_ENABLED = false;
let authUser = null;
let state = loadState();
let currentDraft = null;
let activeWorkFilter = 'All';
let activeExtraFilter = 'All';
let activeExtraSearch = '';
let deferredInstallPrompt = null;
let cloudDirectoryHandle = null;

function storageKey() {
  const identity = authUser?.openId || 'guest';
  return `benniTeacherAssistant:${identity}`;
}
function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey()));
    if (!stored) return freshState();
    const base = freshState();
    return { ...base, ...stored, targets: { ...base.targets, ...(stored.targets || {}) }, checks: { ...base.checks, ...(stored.checks || {}) } };
  } catch { return freshState(); }
}
function saveState() { localStorage.setItem(storageKey(), JSON.stringify(state)); }
function storagePlan() { try { return JSON.parse(localStorage.getItem(`${storageKey()}:storage`) || '{}'); } catch { return {}; } }
function saveStoragePlan(plan) { localStorage.setItem(`${storageKey()}:storage`, JSON.stringify(plan)); }
function settingsKey() { return 'benniTeacherAssistant:settings'; }
function loadSettings() { try { return { theme: 'light', density: 'comfortable', reduceMotion: false, confirmDelete: true, autoSave: true, ...JSON.parse(localStorage.getItem(settingsKey()) || '{}') }; } catch { return { theme: 'light', density: 'comfortable', reduceMotion: false, confirmDelete: true, autoSave: true }; } }
function saveSettings(settings) { localStorage.setItem(settingsKey(), JSON.stringify(settings)); applySettings(settings); renderSettings(); }
function applySettings(settings = loadSettings()) { document.body.dataset.theme = settings.theme; document.body.dataset.density = settings.density; document.body.classList.toggle('reduce-motion', Boolean(settings.reduceMotion)); }
function renderSettings() { const s = loadSettings(); const fields = [['settingsTheme', s.theme], ['settingsDensity', s.density]]; fields.forEach(([id, value]) => { const el = document.getElementById(id); if (el) el.value = value; }); [['settingsReduceMotion', s.reduceMotion], ['settingsConfirmDelete', s.confirmDelete], ['settingsAutoSave', s.autoSave]].forEach(([id, value]) => { const el = document.getElementById(id); if (el) el.checked = Boolean(value); }); const name = document.getElementById('settingsAccountName'); const pill = document.getElementById('settingsAccessPill'); const text = document.getElementById('settingsAccessText'); if (name) name.textContent = authUser?.name || 'Local teacher'; if (pill) { pill.textContent = authUser?.openId === 'local' ? 'Local device' : 'Manus protected'; pill.className = `pill ${authUser?.openId === 'local' ? '' : 'good'}`; } if (text) text.textContent = authUser?.openId === 'local' ? 'Local mode is active. Records stay on this device and are not shared or synced.' : 'Your session uses Manus sign-in. Teaching records are still stored locally in this browser until private storage sync is configured.'; }
function setAuthMessage(message = '') { document.getElementById('authStatus').textContent = message; }
function showAuthenticatedWorkspace() {
  document.getElementById('authGate').hidden = true;
  document.getElementById('appShell').hidden = false;
  document.getElementById('accountName').textContent = authUser?.name || authUser?.email || 'Teacher';
  applySettings();
  state = loadState();
  updateClassControls();
  document.getElementById('scoreDate').value = today();
  renderAll();
  const shortcutView = window.location.hash.replace('#', '');
  renderSettings();
  if (['dashboard', 'exams', 'planner', 'work', 'scorebook', 'projects', 'inspection', 'energizers', 'extras', 'storage', 'settings'].includes(shortcutView)) go(shortcutView);
}
async function bootstrapAuth() {
  applySettings();
  if (!SIGN_IN_ENABLED) {
    document.getElementById('loginBtn').hidden = true;
    if (localStorage.getItem('benniLocalMode') === '1') { authUser = { openId: 'local', name: 'Local teacher', email: '' }; showAuthenticatedWorkspace(); return; }
    document.getElementById('authGate').hidden = false;
    document.getElementById('appShell').hidden = true;
    return;
  }
  try { const config = await fetch('/api/auth/config', { cache: 'no-store' }).then(response => response.json()); if (config.localMode === false) { localStorage.removeItem('benniLocalMode'); const localButton = document.getElementById('localModeBtn'); if (localButton) localButton.hidden = true; const note = document.querySelector('.auth-local-note'); if (note) note.hidden = true; if (!config.configured) setAuthMessage('Private sign-in is not configured on this deployment yet.'); } } catch {}
  if (localStorage.getItem('benniLocalMode') === '1') { authUser = { openId: 'local', name: 'Local teacher', email: '' }; showAuthenticatedWorkspace(); return; }
  const authParam = new URLSearchParams(window.location.search).get('auth');
  if (authParam === 'failed') setAuthMessage('Sign-in did not complete. Please try again.');
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch('/api/auth/me', { credentials: 'include', cache: 'no-store' });
      if (!response.ok) throw new Error('Unauthenticated');
      const payload = await response.json();
      authUser = payload.user;
      showAuthenticatedWorkspace();
      return;
    } catch { if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 350 * (attempt + 1))); }
  }
  document.getElementById('authGate').hidden = false;
  document.getElementById('appShell').hidden = true;
}
function esc(value = '') { return String(value).replace(/[&<>'"]/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[ch])); }
function today() { return new Date().toISOString().slice(0, 10); }
function formatDate(value) { if (!value) return 'No date'; const d = new Date(`${value}T00:00:00`); return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
function classShort(c) { return c.replace(' / Form ', ' / F'); }
function getTopics(cls) { return [...(state.customTopics[cls] || []), ...(DEFAULT_TOPICS[cls] || [])]; }
function isCompleted(status) { return ['Completed', 'Approved'].includes(status); }
function classWorkRecords(cls = state.currentClass) { return state.workRecords.filter(r => r.className === cls); }
function classCounts(cls = state.currentClass) {
  const records = classWorkRecords(cls);
  return {
    Exercise: records.filter(r => r.type === 'Exercise' && isCompleted(r.status)).length,
    'Class test': records.filter(r => r.type === 'Class test' && isCompleted(r.status)).length,
    Assignment: records.filter(r => ['Homework', 'Assignment'].includes(r.type) && isCompleted(r.status)).length,
    Project: state.projects.filter(p => p.className === cls && isCompleted(p.status)).length,
    Exam: state.exams.filter(e => e.className === cls).length
  };
}
function showToast(message) { const toast = document.getElementById('toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600); }
function allowDelete(message) { return !loadSettings().confirmDelete || confirm(message); }
function go(view) { document.querySelectorAll('.view').forEach(el => el.classList.toggle('active', el.id === `view-${view}`)); document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.view === view)); window.scrollTo({ top: 0, behavior: 'smooth' }); }
function updateClassControls() {
  document.getElementById('classSelect').innerHTML = CLASS_LIST.map(c => `<option ${c === state.currentClass ? 'selected' : ''}>${esc(c)}</option>`).join('');
  document.getElementById('workingClassLabel').textContent = state.currentClass;
  document.getElementById('termSelect').value = state.term;
  if (document.getElementById('examClass')) {
    document.getElementById('examClass').innerHTML = CLASS_LIST.map(c => `<option ${c === state.currentClass ? 'selected' : ''}>${esc(c)}</option>`).join('');
    document.getElementById('examClass').value = state.currentClass;
  }
}
function renderAll() { updateClassControls(); renderTopics(); renderDashboard(); renderPlanner(); renderWork(); renderScorebook(); renderProjects(); renderInspection(); renderEnergizers(); renderExtras(); renderStorage(); renderSettings(); updateConnectivity(); }
function updateConnectivity() {
  const el = document.getElementById('storageStatus');
  if (!el) return;
  const online = navigator.onLine;
  el.innerHTML = `<span class="status-dot" style="background:${online ? 'var(--green)' : 'var(--ochre)'}"></span> ${online ? 'Online · local copy ready' : 'Offline · work continues safely'}`;
}
function renderStorage() {
  const plan = storagePlan();
  const label = document.getElementById('storageLabel');
  if (label && document.activeElement !== label) label.value = plan.label || 'Eddy Teacher Assistant Backups';
  const last = plan.lastCloudBackup || plan.lastPackage;
  const ageDays = last ? Math.floor((Date.now() - new Date(`${last}T00:00:00`).getTime()) / 86400000) : Infinity;
  const stale = !last || ageDays > 7;
  const pill = document.getElementById('syncLastPill');
  if (pill) { pill.textContent = last ? (stale ? `Backup is ${ageDays} days old` : `Backup ${formatDate(last)}`) : 'No cloud backup yet'; pill.className = `pill ${stale ? 'warn' : 'good'}`; }
  const mode = document.getElementById('storageModePill');
  if (mode) mode.textContent = cloudDirectoryHandle || plan.cloudFolderName ? 'Google Drive backup ready' : 'Local-first';
  const health = document.getElementById('backupHealthDetails');
  if (health) health.innerHTML = `<div class="backup-health-row"><span>Cloud provider</span><strong>Google Drive</strong></div><div class="backup-health-row"><span>Folder</span><strong>${esc(plan.cloudFolderName || (cloudDirectoryHandle ? cloudDirectoryHandle.name : 'Not chosen on this device'))}</strong></div><div class="backup-health-row"><span>Last encrypted cloud backup</span><strong>${last ? formatDate(last) : 'Never'}</strong></div><div class="backup-health-row"><span>Last restore/import</span><strong>${plan.lastRestoreAt ? formatDate(plan.lastRestoreAt) : 'Never'}</strong></div>${stale ? '<div class="backup-warning">No recent encrypted cloud backup is recorded. Save one after your next important change.</div>' : '<div class="backup-ok">A recent encrypted cloud backup is recorded.</div>'}`;
  const status = document.getElementById('cloudBackupStatus');
  if (status) status.textContent = cloudDirectoryHandle ? `Folder selected: ${cloudDirectoryHandle.name}` : (plan.cloudFolderName ? `Configured folder: ${plan.cloudFolderName}. Choose it again in this browser to write directly.` : 'Choose a Google Drive synchronized folder to enable direct encrypted saves.');
}
function renderPlanner() {
  const table = document.getElementById('lessonTable');
  const empty = document.getElementById('lessonEmpty');
  if (!table || !empty) return;
  const rows = (state.lessonPlans || []).filter(p => p.className === state.currentClass).sort((a, b) => Number(a.week) - Number(b.week));
  table.innerHTML = rows.map(p => `<tr><td><strong>Week ${esc(p.week)}</strong><br><span class="muted">${esc(p.term)}</span></td><td><strong>${esc(p.topic)}</strong><br><span class="muted">${esc(p.outcome)}</span><br><span class="extra-tag">${esc(p.track || 'Regular class')}</span></td><td>${esc(p.activity || '—')}<br><span class="muted">${esc(p.resource || '')}</span></td><td>${esc(p.evidence || '—')}</td><td><button class="status-badge ${esc(p.status.toLowerCase().replace(' ', '-'))}" data-lesson-toggle="${esc(p.id)}">${esc(p.status)}</button></td><td><button class="table-action" data-lesson-edit="${esc(p.id)}" title="Edit lesson">✎</button><button class="table-action" data-lesson-delete="${esc(p.id)}" title="Delete lesson">×</button></td></tr>`).join('');
  empty.hidden = Boolean(rows.length);
}

function renderDashboard() {
  const selected = classCounts();
  const completedWork = state.workRecords.filter(r => isCompleted(r.status)).length;
  const stats = [
    ['Saved papers', state.exams.length, 'Draft papers ready to review', '▤'],
    ['Completed records', completedWork, 'Exercises, tests and assignments', '✓'],
    ['Scores recorded', state.scores.length, 'Use anonymous IDs while testing', '▥'],
    ['Projects', state.projects.length, 'Practical work with a trail', '◇']
  ];
  document.getElementById('dashboardStats').innerHTML = stats.map(([label, num, note, mark]) => `<div class="stat-card" data-mark="${esc(mark)}"><span class="eyebrow">${esc(label)}</span><div class="stat-num">${num}</div><div class="stat-label">${esc(note)}</div></div>`).join('');
  const target = state.targets[state.currentClass] || { Exercise: 4, 'Class test': 2, Assignment: 1, Project: 1 };
  const current = selected.Exercise + selected['Class test'] + selected.Assignment + selected.Project;
  const targetTotal = target.Exercise + target['Class test'] + target.Assignment + target.Project;
  const pct = Math.min(100, targetTotal ? Math.round(current / targetTotal * 100) : 0);
  document.getElementById('classProgressTitle').textContent = `${state.currentClass} progress`;
  document.getElementById('classProgressPill').textContent = `${pct}% recorded`;
  document.getElementById('classProgressPill').className = `pill ${pct >= 100 ? 'good' : pct >= 50 ? '' : 'warn'}`;
  document.getElementById('classProgressBar').style.width = `${pct}%`;
  document.getElementById('classProgressCounts').textContent = `${current} / ${targetTotal} working-target items`;
  document.getElementById('classProgressNote').textContent = 'Targets are editable in Inspection.';
  document.getElementById('classProgressList').innerHTML = [['Exercises', selected.Exercise, target.Exercise], ['Class tests', selected['Class test'], target['Class test']], ['Assignments', selected.Assignment, target.Assignment], ['Projects', selected.Project, target.Project]].map(([name, a, b]) => `<div><span>${name}</span><b>${a} / ${b}</b></div>`).join('');
  const gap = Math.max(0, targetTotal - current);
  const alert = document.getElementById('urgentAlert');
  alert.innerHTML = gap ? `<span class="status-dot" style="background:var(--red)"></span><div><strong>${gap} working-target item${gap === 1 ? '' : 's'} still to record for ${esc(state.currentClass)}.</strong> <span>Start with the examination, then add only work you genuinely give to learners.</span></div>` : `<span class="status-dot"></span><div><strong>${esc(state.currentClass)} is at its working target.</strong> <span>Keep the evidence organised and review the examination draft.</span></div>`;
  const nextTitle = state.exams.length ? 'Keep building evidence' : 'Start with your examination';
  document.getElementById('nextActionTitle').textContent = nextTitle;
  document.getElementById('nextActionText').textContent = state.exams.length ? 'Your paper drafts are saved. Record the next exercise or class test you actually complete.' : 'Use your scheme of work to create a draft question paper. The paper will remain clearly marked for your review.';
  const recent = [...state.workRecords].sort((a,b) => (b.date || '').localeCompare(a.date || '')).slice(0, 5);
  document.getElementById('recentRecords').innerHTML = recent.length ? recent.map(r => `<div class="record-item"><div class="record-main"><strong>${esc(r.title)}</strong><small>${esc(r.className)} · ${esc(r.topic || 'No topic')}</small></div><span class="record-type">${esc(r.type)}</span><span class="record-date">${formatDate(r.date)}</span></div>`).join('') : `<div class="empty-state small"><div class="empty-icon">✓</div><h3>No work recorded yet</h3><p>Add the first exercise, homework, assignment, or class test you complete.</p></div>`;
}

function taughtTopics(cls, mode = 'taught') {
  const planned = state.lessonPlans.filter(p => p.className === cls && (mode === 'all' || p.status === 'Taught' || p.status === 'Reviewed')).map(p => p.topic).filter(Boolean);
  const completed = state.workRecords.filter(r => r.className === cls && (mode !== 'completed' || ['Completed', 'Approved'].includes(r.status))).map(r => r.topic).filter(Boolean);
  const source = mode === 'completed' ? completed : mode === 'all' ? getTopics(cls) : planned;
  return [...new Set(source)].filter(Boolean);
}
function renderTopics() {
  const cls = document.getElementById('examClass')?.value || state.currentClass;
  const mode = document.getElementById('topicSource')?.value || 'taught';
  const topics = taughtTopics(cls, mode).length ? taughtTopics(cls, mode) : (mode === 'all' ? getTopics(cls) : getTopics(cls).slice(0, 0));
  const selected = currentDraft?.className === cls ? currentDraft.topics : topics.slice(0, Math.min(4, topics.length));
  const topicSelect = document.getElementById('examTopicSelect');
  if (topicSelect) topicSelect.innerHTML = topics.map(topic => `<option value="${esc(topic)}" ${selected.includes(topic) ? 'selected' : ''}>${esc(topic)}</option>`).join('');
  document.getElementById('topicList').innerHTML = topics.length ? topics.map(topic => `<label class="topic-option"><input type="checkbox" value="${esc(topic)}" ${selected.includes(topic) ? 'checked' : ''} /><span>${esc(topic)}${(state.customTopics[cls] || []).includes(topic) ? '<em>Your added topic</em>' : '<em>From your teaching plan</em>'}</span></label>`).join('') : `<div class="empty-state small"><h3>No matching taught topics yet</h3><p>Add a lesson and mark it Taught or Reviewed, or switch Topic source to All class topics.</p></div>`;
  const quick = document.getElementById('quickTopicSelect');
  if (quick) quick.innerHTML = `<option value="">Choose a topic to generate questions</option>${topics.map(topic => `<option value="${esc(topic)}">${esc(topic)}</option>`).join('')}`;
}
function selectedExamTopics() {
  const fromSelect = [...(document.getElementById('examTopicSelect')?.selectedOptions || [])].map(o => o.value);
  return fromSelect.length ? fromSelect : [...document.querySelectorAll('#topicList input:checked')].map(i => i.value);
}
function examRule(cls) {
  if (['KG2', 'Basic 1', 'Basic 2'].includes(cls)) return { a: 30, b: 0, choose: 0, group: 'kg' };
  if (['Basic 3', 'Basic 4'].includes(cls)) return { a: 40, b: 5, choose: 3, group: 'b34' };
  return { a: 40, b: 6, choose: 4, group: 'b59' };
}
function syncExamRuleControls(cls = document.getElementById('examClass')?.value || state.currentClass) {
  const rule = examRule(cls);
  const a = document.getElementById('examQuestionCount');
  const b = document.getElementById('examSectionBCount');
  if (a && document.activeElement !== a) a.value = rule.a;
  if (b && document.activeElement !== b) { b.value = rule.b; b.disabled = rule.b === 0; }
}
function selectedQuestionSettings() {
  const difficulty = document.getElementById('examDifficulty')?.value || 'All';
  const type = document.getElementById('examQuestionType')?.value || 'All';
  return { difficulty, type };
}
function uniqueQuestions(questions) {
  const seen = new Set();
  return questions.filter(q => { const key = q.text.trim().toLowerCase(); if (seen.has(key)) return false; seen.add(key); return true; });
}
function questionPoolFor(className, topics, settings = selectedQuestionSettings()) {
  const bank = typeof buildQuestionBank === 'function' ? buildQuestionBank(className, topics) : [];
  return uniqueQuestions(bank.filter(q => (settings.difficulty === 'All' || q.difficulty === settings.difficulty) && (settings.type === 'All' || q.type === settings.type)));
}
function structuredPoolFor(className, topics, settings = selectedQuestionSettings()) {
  const allowed = ['Structured', 'Scenario', 'Practical'];
  const bank = typeof buildQuestionBank === 'function' ? buildQuestionBank(className, topics) : [];
  return uniqueQuestions(bank.filter(q => allowed.includes(q.type) && (settings.difficulty === 'All' || q.difficulty === settings.difficulty)));
}
function questionDisplay(q) {
  const options = q.options?.length ? `<div class="question-options">${q.options.map((option, i) => `<span>${String.fromCharCode(65 + i)}. ${esc(option)}</span>`).join('')}</div>` : '';
  return `${esc(q.text)}${options}`;
}
function questionMeta(q) { return `<span class="question-tag">${esc(q.type)} · ${esc(q.difficulty)} · ${q.marks} mark${q.marks === 1 ? '' : 's'}</span>`; }
function createDraft() {
  const cls = document.getElementById('examClass').value;
  const topics = selectedExamTopics();
  if (!topics.length) { showToast('Choose at least one taught topic first.'); return; }
  const unprofiled = topics.filter(topic => !hasTopicProfile(topic));
  if (unprofiled.length) { showToast(`No question profile yet for: ${unprofiled.join(', ')}. Choose a listed topic. The app does not generate generic questions.`); return; }
  const rule = examRule(cls);
  const settings = selectedQuestionSettings();
  const enteredA = document.getElementById('examQuestionCount')?.value;
  const enteredB = document.getElementById('examSectionBCount')?.value;
  if ((enteredA && Number(enteredA) !== rule.a) || (rule.b && enteredB && Number(enteredB) !== rule.b)) {
    showToast(`The official ${cls} paper has ${rule.a} Section A questions${rule.b ? ` and ${rule.b} Section B questions` : ''}. Correct the counts to continue.`);
    return;
  }
  const sectionACount = rule.a;
  const sectionBCount = rule.b;
  const questionPool = questionPoolFor(cls, topics, settings);
  if (questionPool.length < sectionACount) { showToast(`Only ${questionPool.length} unique questions match these filters. Add topics, choose Mixed, or reduce Section A questions.`); return; }
  const questions = questionPool.slice(0, sectionACount);
  const sectionBPool = structuredPoolFor(cls, topics, settings).filter(q => !questions.some(selected => selected.id === q.id));
  if (sectionBPool.length < sectionBCount) { showToast(`Only ${sectionBPool.length} unique structured questions are available. Add topics, choose Mixed difficulty, or reduce Section B questions.`); return; }
  const sectionB = sectionBPool.slice(0, sectionBCount);
  const effectiveRule = { ...rule, a: sectionACount, b: sectionBCount };
  currentDraft = { id: `draft-${Date.now()}`, className: cls, term: state.term, title: document.getElementById('examTitle').value || 'ICT Examination', type: document.getElementById('examType').value, duration: document.getElementById('examDuration').value || 'As directed by teacher', school: document.getElementById('examSchool').value, marks: document.getElementById('examMarks').value || '100', topics, difficulty: settings.difficulty, questionType: settings.type, questionPool, sectionBPool, questions, sectionB, rule: effectiveRule, originalRule: rule, createdAt: today() };
  renderDraft();
  showToast('Unique curriculum-bank questions created. Review every question before printing.');
}
function renderQuestionPicker() {
  const picker = document.getElementById('questionPicker');
  if (!picker || !currentDraft) return;
  const d = currentDraft;
  picker.hidden = false;
  const questionChoices = (items, attr, selected) => items.map((q, i) => `<label class="question-choice"><input type="checkbox" ${attr}="${q.id}" ${selected.some(x => x.id === q.id) ? 'checked' : ''}/><span><b>${i + 1}.</b> ${questionDisplay(q)} ${questionMeta(q)}<small>${esc(q.topic)} · ${esc(q.mapping.strand)} / ${esc(q.mapping.subStrand)}</small></span></label>`).join('');
  picker.innerHTML = `<div class="picker-head"><div><span class="eyebrow accent">QUESTION REVIEW</span><h4>Select the final questions</h4><p class="field-help">Choose exactly ${d.rule.a} Section A questions${d.rule.b ? ` and ${d.rule.b} Section B questions` : ''}. The bank contains no duplicate question text.</p></div><button type="button" class="secondary-btn" id="applyQuestionSelection">Apply selection</button></div><div class="picker-grid"><div><strong>Section A · ${d.questionPool.length} available</strong>${questionChoices(d.questionPool, 'data-question-id', d.questions)}</div>${d.rule.b ? `<div><strong>Section B · ${d.sectionBPool.length} available</strong>${questionChoices(d.sectionBPool, 'data-sectionb-id', d.sectionB)}</div>` : ''}</div>`;
}
function applyQuestionSelection() {
  if (!currentDraft) return;
  const selectedA = [...document.querySelectorAll('[data-question-id]:checked')].map(input => currentDraft.questionPool.find(q => q.id === input.dataset.questionId)).filter(Boolean);
  const selectedB = [...document.querySelectorAll('[data-sectionb-id]:checked')].map(input => currentDraft.sectionBPool.find(q => q.id === input.dataset.sectionbId)).filter(Boolean);
  if (selectedA.length !== currentDraft.rule.a) { showToast(`Choose exactly ${currentDraft.rule.a} Section A questions.`); return; }
  if (currentDraft.rule.b && selectedB.length !== currentDraft.rule.b) { showToast(`Choose exactly ${currentDraft.rule.b} Section B questions.`); return; }
  const all = [...selectedA, ...selectedB];
  if (new Set(all.map(q => q.text.trim().toLowerCase())).size !== all.length) { showToast('Duplicate question text detected. Choose different questions.'); return; }
  currentDraft.questions = selectedA.map((q, i) => ({ ...q, number: i + 1 }));
  currentDraft.sectionB = selectedB.map((q, i) => ({ ...q, number: i + 1 }));
  renderDraft();
  showToast('Selected questions applied with answers and curriculum mapping.');
}
function renderDraft() {
  if (!currentDraft) return;
  const d = currentDraft;
  document.getElementById('examOutputTitle').textContent = `${d.className} · ${d.title}`;
  document.getElementById('printExamBtn').disabled = false; document.getElementById('saveExamBtn').disabled = false;
  const sectionB = d.sectionB.length ? `<h4>SECTION B — STRUCTURED QUESTIONS</h4><p class="section-note">Answer ${d.rule.choose} questions out of ${d.rule.b}.</p><ol>${d.sectionB.map(q => `<li>${questionDisplay(q)} <small>[${esc(q.topic)}]</small></li>`).join('')}</ol>` : '';
  const answerKey = `<div class="answer-key"><h4>TEACHER ANSWER KEY & MARKING NOTES</h4><p class="section-note">Answers and marks below are linked to the exact selected questions. Review them against what you taught.</p><ol>${d.questions.map(q => `<li><strong>${questionMeta(q)}</strong><br>${esc(q.answer)}<br><small>Mapping: ${esc(q.mapping.strand)} / ${esc(q.mapping.subStrand)}. ${esc(q.mapping.verification)}</small></li>`).join('')}</ol>${d.sectionB.length ? `<h4>SECTION B GUIDE</h4><ol>${d.sectionB.map(q => `<li><strong>${questionMeta(q)}</strong><br>${esc(q.answer)}<br><small>Mapping: ${esc(q.mapping.strand)} / ${esc(q.mapping.subStrand)}. ${esc(q.mapping.verification)}</small></li>`).join('')}</ol>` : ''}<div class="mapping"><strong>Curriculum alignment note:</strong> Selected topics: ${d.topics.map(esc).join(', ')}. Strand and sub-strand labels are curriculum-document-level mappings; verify the exact official content-standard and indicator wording in the approved NaCCA/GES copy before publication.</div></div>`;
  renderQuestionPicker();
  document.getElementById('examPreview').className = 'exam-preview';
  document.getElementById('examPreview').innerHTML = `<article class="exam-paper"><div class="paper-header"><div class="eyebrow">${esc(d.school || 'SCHOOL NAME')}</div><h3>${esc(d.title)}</h3><div class="paper-meta"><span>Class: ${esc(d.className)}</span><span>Term: ${esc(d.term)}</span><span>Time: ${esc(d.duration)}</span><span>Marks: ${esc(d.marks)}</span></div></div><div class="instruction"><strong>Instructions:</strong> Read each question carefully. Section A is compulsory. ${d.sectionB.length ? `In Section B, answer ${d.rule.choose} out of ${d.rule.b} questions.` : 'Follow the teacher’s instructions for practical or picture-based tasks.'} This paper is a draft and must be reviewed by the teacher before use.</div><h4>SECTION A — ${d.rule.a} QUESTIONS</h4><p class="section-note">Answer all questions. Topics selected: ${d.topics.map(esc).join(', ')}.</p><ol>${d.questions.map(q => `<li>${questionDisplay(q)}</li>`).join('')}</ol>${sectionB}${answerKey}</article>`;
}
function saveDraft() { if (!currentDraft) return; const idx = state.exams.findIndex(e => e.id === currentDraft.id); if (idx >= 0) state.exams[idx] = currentDraft; else state.exams.unshift(currentDraft); saveState(); renderAll(); showToast('Draft saved on this device.'); }

function renderWork() {
  const search = (document.getElementById('workSearch')?.value || '').toLowerCase();
  const filtered = state.workRecords.filter(r => (activeWorkFilter === 'All' || r.type === activeWorkFilter) && (!search || `${r.title} ${r.topic} ${r.className}`.toLowerCase().includes(search)));
  const types = ['Exercise', 'Class test', 'Homework', 'Assignment'];
  document.getElementById('workSummary').innerHTML = types.map(t => `<div class="summary-chip"><strong>${state.workRecords.filter(r => r.type === t && isCompleted(r.status)).length}</strong><span>${esc(t)}${t === 'Exercise' ? 's' : ''} completed</span></div>`).join('');
  document.getElementById('workTable').innerHTML = filtered.map(r => `<tr><td><strong>${esc(r.title)}</strong><br><span class="muted">${esc(r.evidence || '')}</span></td><td>${esc(r.className)}</td><td>${formatDate(r.date)}</td><td>${esc(r.topic || '—')}</td><td><button class="status-badge ${esc(r.status.toLowerCase().replace(' ', '-'))}" data-record-action="toggle" data-id="${esc(r.id)}">${esc(r.status)}</button></td><td><button class="table-action" data-record-action="delete" data-id="${esc(r.id)}" title="Delete record">×</button></td></tr>`).join('');
  document.getElementById('workEmpty').hidden = Boolean(filtered.length);
  document.querySelectorAll('#workFilters .filter-tab').forEach(b => b.classList.toggle('active', b.dataset.filter === activeWorkFilter));
}
function renderScorebook() {
  const rows = state.scores.filter(s => s.className === state.currentClass);
  const avg = rows.length ? Math.round(rows.reduce((sum, s) => sum + s.score / s.max * 100, 0) / rows.length) : null;
document.getElementById('scorebookTitle').textContent = `${state.currentClass} score records`;
  document.getElementById('scoreAverage').textContent = avg === null ? 'No scores yet' : `${avg}% average`;
  document.getElementById('scoreAverage').className = `pill ${avg !== null && avg >= 50 ? 'good' : 'warn'}`;
  document.getElementById('scoreTable').innerHTML = rows.map(s => `<tr><td><strong>${esc(s.learnerId)}</strong><br><span class="muted">${esc(s.comment || '')}</span></td><td>${esc(s.assessment)}</td><td>${s.score} / ${s.max}</td><td>${Math.round(s.score / s.max * 100)}%</td><td>${formatDate(s.date)}</td><td><button class="table-action" data-score-delete="${esc(s.id)}">×</button></td></tr>`).join('');
  document.getElementById('scoreEmpty').style.display = rows.length ? 'none' : 'grid';
}
function renderProjects() {
  const projects = state.projects.filter(p => p.className === state.currentClass || !state.currentClass);
  document.getElementById('projectGrid').innerHTML = projects.map(p => `<article class="project-card"><div class="project-card-head"><div class="card-icon">◇</div><button class="table-action" data-project-delete="${esc(p.id)}">×</button></div><h3>${esc(p.title)}</h3><p>${esc(p.description || 'No description added yet.')}</p><div class="card-meta"><span>${esc(p.className)}</span><span>Due ${formatDate(p.dueDate)}</span><span class="status-badge ${esc(p.status.toLowerCase().replace(' ', '-'))}">${esc(p.status)}</span></div><p class="field-help">Evidence: ${esc(p.evidence || 'Add evidence after learners present or submit work.')}</p></article>`).join('');
  document.getElementById('projectEmpty').hidden = projects.length > 0;
}
function renderInspection() {
  const cls = state.currentClass; const c = classCounts(cls); const t = state.targets[cls];
  document.getElementById('inspectionClassTitle').textContent = cls; document.getElementById('inspectionReadyPill').textContent = c.Exercise >= t.Exercise && c['Class test'] >= t['Class test'] && c.Assignment >= t.Assignment && c.Project >= t.Project ? 'Target met' : 'In progress';
  document.getElementById('inspectionReadyPill').className = `pill ${document.getElementById('inspectionReadyPill').textContent === 'Target met' ? 'good' : 'warn'}`;
  const bars = [['Exercises', c.Exercise, t.Exercise], ['Class tests', c['Class test'], t['Class test']], ['Assignments', c.Assignment, t.Assignment], ['Projects', c.Project, t.Project]];
  document.getElementById('inspectionBars').innerHTML = bars.map(([name, value, target]) => { const pct = target ? Math.min(100, Math.round(value / target * 100)) : 0; return `<div class="inspection-bar"><div class="inspection-bar-head"><b>${name}</b><span>${value} recorded · target ${target}</span></div><div class="bar-track"><i class="${pct < 100 ? 'warn' : ''}" style="width:${pct}%"></i></div></div>`; }).join('');
  const gap = bars.reduce((sum, [,v,target]) => sum + Math.max(0, target - v), 0);
  const banner = document.getElementById('inspectionBanner'); banner.className = `inspection-banner ${gap ? 'warn' : ''}`; banner.innerHTML = gap ? `<strong>${gap} item${gap === 1 ? '' : 's'} below your working target for ${esc(cls)}.</strong><span>Record real work as you complete it. Do not create false records.</span>` : `<strong>${esc(cls)} meets the current working targets.</strong><span>Organise the evidence and keep the paper drafts reviewed.</span>`;
  const checks = state.checks[cls] || {};
  document.querySelectorAll('.check-row input').forEach(i => { i.checked = Boolean(checks[i.dataset.check]); });
  document.getElementById('coverageTable').innerHTML = CLASS_LIST.map(cname => { const x = classCounts(cname); const target = state.targets[cname]; const score = Object.keys(target).reduce((s, k) => s + Math.min(1, x[k] / Math.max(1, target[k])), 0) / 4 * 100; return `<tr><td><strong>${esc(classShort(cname))}</strong></td><td>${x.Exercise} / ${target.Exercise}</td><td>${x['Class test']} / ${target['Class test']}</td><td>${x.Assignment} / ${target.Assignment}</td><td>${x.Project} / ${target.Project}</td><td><span class="status-badge ${score >= 100 ? 'completed' : 'planned'}">${Math.round(score)}%</span></td></tr>`; }).join('');
}
function renderEnergizers() {
  const classSelect = document.getElementById('energizerClassSelect');
  const topicSelect = document.getElementById('energizerTopicSelect');
  const durationSelect = document.getElementById('energizerDurationSelect');
  const grid = document.getElementById('energizerGrid');
  if (!classSelect || !topicSelect || !grid || typeof ENERGIZER_LIBRARY === 'undefined') return;
  const selectedClass = classSelect.value || state.currentClass;
  const activities = ENERGIZER_LIBRARY[selectedClass] || [];
  const selectedTopic = topicSelect.value || 'All';
  const selectedDuration = durationSelect?.value || 'All';
  const filtered = activities.filter(activity => (selectedTopic === 'All' || activity.topic === selectedTopic) && (selectedDuration === 'All' || activity.minutes.includes(Number(selectedDuration))));
  classSelect.innerHTML = CLASS_LIST.map(cls => `<option value="${esc(cls)}" ${cls === selectedClass ? 'selected' : ''}>${esc(cls)}</option>`).join('');
  topicSelect.innerHTML = `<option value="All">All topics for ${esc(selectedClass)}</option>${[...new Set(activities.map(a => a.topic))].map(topic => `<option value="${esc(topic)}" ${topic === selectedTopic ? 'selected' : ''}>${esc(topic)}</option>`).join('')}`;
  document.getElementById('energizerCount').textContent = `${filtered.length} activit${filtered.length === 1 ? 'y' : 'ies'} shown`;
  grid.innerHTML = filtered.length ? filtered.map((activity, index) => `<article class="energizer-card panel"><div class="energizer-card-head"><span class="extra-tag">${esc(activity.topic)}</span><span class="pathway-count">${activity.minutes.join(' / ')} min</span></div><h3>${esc(activity.title)}</h3><p>${esc(activity.instructions)}</p><div class="energizer-meta"><span><strong>Learner output:</strong> ${esc(activity.output)}</span><span><strong>Materials:</strong> ${esc(activity.materials)}</span><span><strong>Safety:</strong> ${esc(activity.safety)}</span></div><button class="primary-btn" data-start-energizer="${esc(selectedClass)}|${activities.indexOf(activity)}">Start this activity <span>→</span></button></article>`).join('') : `<div class="empty-state small"><div class="empty-icon">⚡</div><h3>No activity matches</h3><p>Choose another topic or time length.</p></div>`;
}
function openEnergizer(className, index) {
  const activity = ENERGIZER_LIBRARY?.[className]?.[Number(index)];
  if (!activity) return;
  document.getElementById('modalContent').innerHTML = `<div class="eyebrow accent">CLASS ENERGIZER · ${esc(className)}</div><h2>${esc(activity.title)}</h2><p class="lead">${esc(activity.topic)} · ${activity.minutes.join(' / ')} minutes</p><div class="energizer-start-card"><h3>Teacher instruction</h3><p>${esc(activity.instructions)}</p><h3>What learners produce</h3><p>${esc(activity.output)}</p><h3>Prepare</h3><p>${esc(activity.materials)}</p><h3>Safety reminder</h3><p>${esc(activity.safety)}</p><p class="field-help">This is a short energizer, not a scored examination. Adapt it to your learners and stop if the class or equipment is unsafe.</p></div>`;
  document.getElementById('modalBackdrop').hidden = false;
}
function renderExtras() {
  const catalogue = [...EXTRA_CATALOGUE, ...(state.customExtras || [])];
  const search = activeExtraSearch.trim().toLowerCase();
  const filtered = catalogue.map((x, index) => ({ x, index, key: x.id || `custom-${index}` })).filter(({ x }) => {
    const matchesFilter = activeExtraFilter === 'All' || x.tag === activeExtraFilter;
    const haystack = `${x.title} ${x.tag} ${x.age} ${x.why} ${(x.skills || []).join(' ')}`.toLowerCase();
    return matchesFilter && (!search || haystack.includes(search));
  });
  const count = document.getElementById('extraCount');
  if (count) count.textContent = `${filtered.length} pathway${filtered.length === 1 ? '' : 's'} shown`;
  const grid = document.getElementById('extraGrid');
  if (!grid) return;
  grid.innerHTML = filtered.length ? filtered.map(({ x, key }) => {
    const planned = state.extraPlans.includes(key);
    const sessionCount = Array.isArray(x.sessions) ? x.sessions.length : 1;
    return `<article class="extra-card course-card"><div class="course-card-top"><div class="card-icon">${esc(x.icon || '✦')}</div><span class="pathway-count">${sessionCount} starter session${sessionCount === 1 ? '' : 's'}</span></div><span class="extra-tag">${esc(x.tag || 'Teacher idea')}</span><h3>${esc(x.title)}</h3><p>${esc(x.why || x.activity || 'Teacher-planned activity for learner development.')}</p><div class="card-meta"><span>${esc(x.age || 'Teacher selected')}</span><span>${esc(x.status || 'Teacher-designed')}</span></div><div class="course-card-actions"><button class="primary-btn" data-extra-detail="${esc(key)}">View pathway <span>→</span></button><button class="secondary-btn" data-extra="${esc(key)}">${planned ? '✓ In my ideas' : 'Add to ideas'}</button></div></article>`;
  }).join('') : `<div class="empty-state small extra-empty"><div class="empty-icon">⌕</div><h3>No pathway matches</h3><p>Try another word or choose All pathways.</p></div>`;
}

function findExtra(key) {
  return [...EXTRA_CATALOGUE, ...(state.customExtras || [])].find((x, index) => (x.id || `custom-${index}`) === key);
}
function openExtraDetail(key) {
  const course = findExtra(key);
  if (!course) return;
  const sessions = Array.isArray(course.sessions) && course.sessions.length ? course.sessions : [{ title: 'Your starter activity', outcome: 'Write the learner outcome you want to observe.', activity: course.activity || 'Add the first activity for this teacher-planned idea.', evidence: 'Add a dated note, learner artefact or observation checklist.' }];
  const sources = course.sources || (course.source ? [{ title: 'Teacher-added source note', why: course.source }] : []);
  openModal(`<div class="pathway-detail"><div class="pathway-detail-head"><div><span class="eyebrow accent">${esc(course.tag || 'EXTRACURRICULAR PATHWAY')}</span><h3>${esc(course.title)}</h3><p class="pathway-lead">${esc(course.why || course.activity || '')}</p></div><span class="pathway-badge">${esc(course.age || 'Teacher selected')}</span></div><div class="pathway-actions"><button class="primary-btn" data-load-extra="${esc(key)}">Load six sessions into ${esc(state.currentClass)} Planner <span>→</span></button><button class="secondary-btn" data-extra="${esc(key)}">${state.extraPlans.includes(key) ? '✓ In my ideas' : 'Add to my ideas'}</button></div><div class="pathway-columns"><section><span class="eyebrow">SKILLS TO BUILD</span><ul class="pathway-list">${(course.skills || []).map(s => `<li>${esc(s)}</li>`).join('')}</ul></section><section class="safety-panel"><span class="eyebrow">SAFETY BOUNDARIES</span><ul class="pathway-list">${(course.safety || []).map(s => `<li>${esc(s)}</li>`).join('')}</ul></section></div><div class="pathway-sessions"><div class="section-heading"><div><span class="eyebrow">STARTER SEQUENCE</span><h4>Six sessions to adapt</h4></div><span class="pill">Editable in Planner</span></div>${sessions.map((s, i) => `<article class="pathway-session"><div class="session-number">${String(i + 1).padStart(2, '0')}</div><div><h4>${esc(s.title)}</h4><p><strong>Outcome:</strong> ${esc(s.outcome)}</p><p><strong>Activity:</strong> ${esc(s.activity)}</p><p class="evidence-callout"><strong>Evidence to keep:</strong> ${esc(s.evidence)}</p></div></article>`).join('')}</div><div class="pathway-sources"><span class="eyebrow">CURRICULUM AND PRACTICE SOURCES</span>${sources.length ? sources.map(source => `<div class="source-row">${source.url ? `<a href="${esc(source.url)}" target="_blank" rel="noopener">${esc(source.title)}</a>` : `<strong>${esc(source.title)}</strong>`}<span>${esc(source.why || '')}</span></div>`).join('') : '<p class="field-help">No source was added to this teacher-created idea.</p>'}</div><div class="pathway-caveat"><strong>Use this carefully:</strong> ${esc(course.caveat || 'This is a teacher-designed idea. Check your school plan, equipment and safeguarding rules before use.')}</div></div>`);
}
function loadExtraPathway(key) {
  const course = findExtra(key);
  if (!course || !Array.isArray(course.sessions) || !course.sessions.length) { showToast('This teacher idea has no six-session sequence yet.'); return; }
  const track = `Extras · ${course.title}`;
  const alreadyLoaded = state.lessonPlans.some(p => p.className === state.currentClass && p.term === state.term && p.track === track);
  if (alreadyLoaded) { showToast('This pathway is already in the selected class Planner.'); return; }
  const stamp = Date.now();
  course.sessions.forEach((session, index) => state.lessonPlans.push({ id: `extra-${stamp}-${index}`, className: state.currentClass, term: state.term, track, week: index + 1, topic: session.title, outcome: session.outcome, activity: session.activity, evidence: session.evidence, resource: 'See pathway safety and source notes.', status: 'Planned' }));
  state.customTopics[state.currentClass] = [...new Set([...(state.customTopics[state.currentClass] || []), ...course.sessions.map(session => session.title)])];
  if (!state.extraPlans.includes(key)) state.extraPlans.push(key);
  saveState(); closeModal(); renderAll(); go('planner'); showToast(`${course.title} loaded into ${state.currentClass} Planner.`);
}

function openModal(content) { document.getElementById('modalContent').innerHTML = content; document.getElementById('modalBackdrop').hidden = false; document.querySelector('#modalContent input, #modalContent select, #modalContent textarea')?.focus(); }
function closeModal() { document.getElementById('modalBackdrop').hidden = true; document.getElementById('modalContent').innerHTML = ''; }
function openWorkModal() { openModal(`<form id="workModalForm"><span class="eyebrow accent">ADD EVIDENCE</span><h3>Record classwork or a test</h3><label>Record type<select name="type"><option>Exercise</option><option>Class test</option><option>Homework</option><option>Assignment</option></select></label><label>Title<input name="title" placeholder="e.g. Exercise 1: Computer parts" required /></label><div class="form-grid"><label>Class<select name="className">${CLASS_LIST.map(c => `<option ${c === state.currentClass ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></label><label>Date<input name="date" type="date" value="${today()}" required /></label></div><label>Topic<input name="topic" placeholder="Topic taught" /></label><label>Status<select name="status"><option>Completed</option><option>Planned</option><option>Approved</option></select></label><label>Evidence note<textarea name="evidence" rows="2" placeholder="e.g. Learners completed pages 3–4; books checked."></textarea></label><button class="primary-btn full">Save record <span>→</span></button></form>`); }
function openProjectModal() { openModal(`<form id="projectModalForm"><span class="eyebrow accent">PRACTICAL LEARNING</span><h3>Add project work</h3><label>Project title<input name="title" placeholder="e.g. Design a safe computer room poster" required /></label><label>Class<select name="className">${CLASS_LIST.map(c => `<option ${c === state.currentClass ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></label><label>Description<textarea name="description" rows="2" placeholder="What will learners make or demonstrate?"></textarea></label><div class="form-grid"><label>Due date<input name="dueDate" type="date" value="${today()}" /></label><label>Status<select name="status"><option>Planned</option><option>In progress</option><option>Completed</option><option>Approved</option></select></label></div><label>Evidence / rubric note<textarea name="evidence" rows="2" placeholder="What will you collect or observe?"></textarea></label><button class="primary-btn full">Save project <span>→</span></button></form>`); }
function openTopicModal() { openModal(`<form id="topicModalForm"><span class="eyebrow accent">YOUR SCHEME</span><h3>Add a taught topic</h3><p class="field-help">Add topics from your approved scheme of work. This helps the draft paper stay close to what you taught.</p><label>Class<select name="className">${CLASS_LIST.map(c => `<option ${c === (document.getElementById('examClass')?.value || state.currentClass) ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></label><label>Topic name<input name="topic" placeholder="e.g. Computer ethics" required /></label><button class="primary-btn full">Add topic <span>→</span></button></form>`); }
function openLessonModal(id = '') { const existing = state.lessonPlans.find(p => p.id === id) || { week: 1, topic: '', outcome: '', activity: '', evidence: '', resource: '', status: 'Planned', track: 'Regular class' }; openModal(`<form id="lessonModalForm" data-id="${esc(id)}"><span class="eyebrow accent">WEEKLY TEACHING RECORD</span><h3>${id ? 'Edit lesson' : 'Add a 12-week lesson'}</h3><div class="form-grid"><label>Week<input name="week" type="number" min="1" max="12" value="${esc(existing.week)}" required /></label><label>Track<select name="track"><option ${existing.track === 'Regular class' ? 'selected' : ''}>Regular class</option><option ${existing.track === 'Saturday ICT Foundations' ? 'selected' : ''}>Saturday ICT Foundations</option></select></label></div><label>Status<select name="status"><option ${existing.status === 'Planned' ? 'selected' : ''}>Planned</option><option ${existing.status === 'Taught' ? 'selected' : ''}>Taught</option><option ${existing.status === 'Reviewed' ? 'selected' : ''}>Reviewed</option></select></label><label>Topic<input name="topic" value="${esc(existing.topic)}" placeholder="e.g. Word processing" required /></label><label>Observable learner outcome<textarea name="outcome" rows="2" placeholder="Learners will create, explain, demonstrate or evaluate..." required>${esc(existing.outcome)}</textarea></label><label>Activity<textarea name="activity" rows="2" placeholder="Teacher model, guided practice, pair or unplugged activity">${esc(existing.activity)}</textarea></label><label>Evidence to keep<textarea name="evidence" rows="2" placeholder="What will you see, hear or collect?">${esc(existing.evidence)}</textarea></label><label>Resource / offline alternative<input name="resource" value="${esc(existing.resource)}" placeholder="e.g. 1 computer + paper cards" /></label><button class="primary-btn full">${id ? 'Update lesson' : 'Save lesson'} <span>→</span></button></form>`); }
function openTargetsModal() { const t = state.targets[state.currentClass]; openModal(`<form id="targetsModalForm"><span class="eyebrow accent">WORKING TARGETS</span><h3>Set ${esc(state.currentClass)} targets</h3><p class="field-help">These are personal planning targets, not official GES requirements. Change them to match your school’s expectations.</p><div class="form-grid"><label>Exercises<input name="Exercise" type="number" min="0" value="${t.Exercise}" /></label><label>Class tests<input name="Class test" type="number" min="0" value="${t['Class test']}" /></label><label>Assignments<input name="Assignment" type="number" min="0" value="${t.Assignment}" /></label><label>Projects<input name="Project" type="number" min="0" value="${t.Project}" /></label></div><button class="primary-btn full">Save targets <span>→</span></button></form>`); }
function openExtraModal() { openModal(`<form id="extraModalForm"><span class="eyebrow accent">YOUR SCHOOL CLUB</span><h3>Add an activity idea</h3><label>Activity name<input name="title" placeholder="e.g. School garden club" required /></label><div class="form-grid"><label>Class<select name="className">${CLASS_LIST.map(c => `<option ${c === state.currentClass ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></label><label>Category<select name="tag"><option>Digital skills</option><option>Practical trade</option><option>Creative arts</option><option>Enterprise</option><option>Life skills</option><option>Green skills</option></select></label></div><label>First activity<textarea name="activity" rows="2" placeholder="What will learners do first?"></textarea></label><button class="primary-btn full">Save activity <span>→</span></button></form>`); }
function openBackupModal() { openModal(`<span class="eyebrow accent">DATA SAFETY</span><h3>Back up your teacher desk</h3><p>Your work is stored in this browser. Export a backup regularly, especially before clearing browser data or changing phones.</p><div class="two-col" style="margin:0"><button class="primary-btn" id="exportBtn">Export backup</button><button class="secondary-btn" id="encryptedExportBtn">Encrypted backup</button></div><button class="secondary-btn full" id="importBtn" style="margin-top:10px">Import backup</button><div class="device-transfer"><strong>Move records between laptop and phone</strong><ol><li>On the device containing your work, choose <b>Encrypted backup</b> and create a password of at least 8 characters.</li><li>Send the downloaded JSON file to your other device using a private method, such as a cable or a private folder on your own computer.</li><li>On this device, choose <b>Import backup</b>, select the JSON file, and enter the same password.</li></ol><p>Import replaces the current records on this device. Back up both devices first if each contains important work.</p></div><p class="field-help" style="margin-top:18px"><strong>Ordinary backup:</strong> readable JSON for simple recovery. <strong>Encrypted backup:</strong> protected with a password you create. Never use your Manus password for the backup.</p>`); }
function exportData(kind = 'backup') { const payload = { exportedAt: new Date().toISOString(), app: 'Benni Teacher Assistant', version: 1, user: authUser?.openId || 'local', state }; const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `benni-teacher-${kind}-${today()}.json`; a.click(); URL.revokeObjectURL(a.href); if (kind === 'sync') { const plan = storagePlan(); saveStoragePlan({ ...plan, lastPackage: today() }); renderStorage(); showToast('Sync package downloaded. Put it in your private laptop storage folder.'); } else showToast('Backup downloaded.'); }
async function buildEncryptedEnvelope(password) {
  const payload = { exportedAt: new Date().toISOString(), app: 'Benni Teacher Assistant', version: 2, user: authUser?.openId || 'local', state };
  return encryptBackupPayload(payload, password);
}
function downloadJsonFile(filename, value) { const blob = new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); }
async function requestCloudFolder() {
  if (!window.showDirectoryPicker) { showToast('This browser cannot write directly to a folder. Use Download encrypted backup, then move it into Google Drive.'); return false; }
  try { cloudDirectoryHandle = await window.showDirectoryPicker({ mode: 'readwrite' }); saveStoragePlan({ ...storagePlan(), cloudFolderName: cloudDirectoryHandle.name, provider: 'Google Drive' }); renderStorage(); showToast(`Google Drive folder selected: ${cloudDirectoryHandle.name}`); return true; } catch { showToast('Folder selection cancelled.'); return false; }
}
async function saveEncryptedCloudBackup() {
  if (!cloudDirectoryHandle && !(await requestCloudFolder())) return;
  const password = prompt('Create or enter a password for this encrypted backup. Do not use your Google or Manus password.');
  if (!password || password.length < 8) { showToast('Use an encrypted-backup password of at least 8 characters.'); return; }
  try {
    const envelope = await buildEncryptedEnvelope(password);
    const filename = `benni-teacher-encrypted-${today()}.json`;
    const file = await cloudDirectoryHandle.getFileHandle(filename, { create: true });
    const writable = await file.createWritable(); await writable.write(JSON.stringify(envelope, null, 2)); await writable.close();
    saveStoragePlan({ ...storagePlan(), provider: 'Google Drive', cloudFolderName: cloudDirectoryHandle.name, lastCloudBackup: today(), lastCloudBackupFile: filename });
    renderStorage(); showToast('Encrypted backup saved to the selected Google Drive folder.');
  } catch (error) { showToast(`Could not write to the selected folder: ${error?.message || 'permission was not granted'}.`); }
}
async function exportEncryptedBackup() {
  const password = prompt('Create a password for this encrypted backup. Do not use your Google or Manus password.');
  if (!password || password.length < 8) { showToast('Use an encrypted-backup password of at least 8 characters.'); return; }
  try { const envelope = await buildEncryptedEnvelope(password); downloadJsonFile(`benni-teacher-encrypted-${today()}.json`, envelope); saveStoragePlan({ ...storagePlan(), lastPackage: today() }); renderStorage(); showToast('Encrypted backup downloaded. Move it into Google Drive if direct folder saving is unavailable.'); } catch { showToast('Encrypted backup could not be created.'); }
}
async function decryptBackup(envelope) {
  const password = prompt('Enter the encrypted-backup password.');
  if (!password) { showToast('Import cancelled. No records were changed.'); return null; }
  const result = await decryptBackupEnvelope(envelope, password);
  if (!result.ok) {
    showToast(result.reason === 'format' ? 'That file is not a recognised encrypted teacher backup. No records were changed.' : 'Password incorrect, or the encrypted file is damaged. No records were changed.');
    return null;
  }
  return result.payload;
}

// Navigation and global controls
document.addEventListener('click', event => {
  const nav = event.target.closest('[data-view]'); if (nav) { go(nav.dataset.view); return; }
  const goButton = event.target.closest('[data-go]'); if (goButton) { go(goButton.dataset.go); return; }
  if (event.target.id === 'modalClose' || event.target.id === 'modalBackdrop') closeModal();
  if (event.target.id === 'addWorkBtn') openWorkModal();
  if (event.target.id === 'settingsTopBtn') go('settings');
  if (event.target.id === 'settingsBackupBtn') openBackupModal();
  if (event.target.id === 'settingsInstallBtn') document.getElementById('installAppBtn').click();
  if (event.target.id === 'returnSignInBtn') { localStorage.removeItem('benniLocalMode'); window.location.reload(); }
  if (event.target.id === 'settingsLogoutBtn') { localStorage.removeItem('benniLocalMode'); document.getElementById('logoutBtn').click(); }
  if (event.target.id === 'addProjectBtn') openProjectModal();
  if (event.target.id === 'addTopicBtn') openTopicModal();
  const startEnergizer = event.target.closest('[data-start-energizer]'); if (startEnergizer) { const [className, index] = startEnergizer.dataset.startEnergizer.split('|'); openEnergizer(className, index); return; }
  const extraDetail = event.target.closest('[data-extra-detail]'); if (extraDetail) { openExtraDetail(extraDetail.dataset.extraDetail); return; }
  const loadExtra = event.target.closest('[data-load-extra]'); if (loadExtra) { loadExtraPathway(loadExtra.dataset.loadExtra); return; }
  if (event.target.id === 'generateTopicBtn') { const quick = document.getElementById('quickTopicSelect'); const topic = quick?.value; if (!topic) { showToast('Choose a topic first.'); return; } const select = document.getElementById('examTopicSelect'); [...select.options].forEach(option => { option.selected = option.value === topic; }); document.querySelectorAll('#topicList input').forEach(input => { input.checked = input.value === topic; }); createDraft(); }
  if (event.target.id === 'selectAllTopicsBtn') { document.querySelectorAll('#topicList input').forEach(input => { input.checked = true; }); [...document.getElementById('examTopicSelect').options].forEach(option => { option.selected = true; }); }
  if (event.target.id === 'clearTopicsBtn') { document.querySelectorAll('#topicList input').forEach(input => { input.checked = false; }); [...document.getElementById('examTopicSelect').options].forEach(option => { option.selected = false; }); }
  if (event.target.id === 'applyQuestionSelection') applyQuestionSelection();
  if (event.target.id === 'loadFoundationsBtn') { const existing = state.lessonPlans.some(p => p.className === state.currentClass && p.track === 'Saturday ICT Foundations'); if (existing) { showToast('Saturday foundations are already loaded for this class.'); return; } SATURDAY_FOUNDATIONS.forEach((item, index) => state.lessonPlans.push({ id: `sat-${Date.now()}-${index}`, className: state.currentClass, term: state.term, track: 'Saturday ICT Foundations', week: index + 1, topic: item[0], outcome: item[1], activity: item[2], evidence: item[3], resource: item[4], status: 'Planned' })); state.customTopics[state.currentClass] = [...new Set([...(state.customTopics[state.currentClass] || []), ...SATURDAY_FOUNDATIONS.map(item => item[0])])]; saveState(); renderAll(); showToast('Six Saturday ICT Foundations sessions loaded.'); }
  if (event.target.id === 'addLessonBtn') openLessonModal();
  if (event.target.id === 'editTargetsBtn') openTargetsModal();
  if (event.target.id === 'addExtraBtn') openExtraModal();
  if (event.target.id === 'backupBtn') openBackupModal();
  if (event.target.closest('#exportBtn')) exportData('backup');
  if (event.target.closest('#encryptedExportBtn')) exportEncryptedBackup();
  if (event.target.closest('#importBtn')) document.getElementById('importFile').click();
  if (event.target.closest('#chooseCloudFolderBtn')) requestCloudFolder();
  if (event.target.closest('#saveCloudBackupBtn')) saveEncryptedCloudBackup();
  if (event.target.closest('#syncExportBtn')) exportEncryptedBackup();
  if (event.target.closest('#openBackupBtn')) openBackupModal();
  const filter = event.target.closest('[data-filter]'); if (filter) { activeWorkFilter = filter.dataset.filter; renderWork(); }
  const recordAction = event.target.closest('[data-record-action]'); if (recordAction) { const rec = state.workRecords.find(r => r.id === recordAction.dataset.id); if (!rec) return; if (recordAction.dataset.recordAction === 'toggle') rec.status = isCompleted(rec.status) ? 'Planned' : 'Completed'; else if (allowDelete('Delete this record? This cannot be undone unless you have a backup.')) state.workRecords = state.workRecords.filter(r => r.id !== rec.id); saveState(); renderAll(); showToast('Record updated.'); }
  const scoreDelete = event.target.closest('[data-score-delete]'); if (scoreDelete && allowDelete('Delete this score?')) { state.scores = state.scores.filter(s => s.id !== scoreDelete.dataset.scoreDelete); saveState(); renderScorebook(); }
  const projectDelete = event.target.closest('[data-project-delete]'); if (projectDelete && allowDelete('Delete this project?')) { state.projects = state.projects.filter(p => p.id !== projectDelete.dataset.projectDelete); saveState(); renderAll(); }
  const lessonToggle = event.target.closest('[data-lesson-toggle]'); if (lessonToggle) { const lesson = state.lessonPlans.find(p => p.id === lessonToggle.dataset.lessonToggle); if (lesson) { lesson.status = lesson.status === 'Planned' ? 'Taught' : lesson.status === 'Taught' ? 'Reviewed' : 'Planned'; saveState(); renderPlanner(); showToast(`Week ${lesson.week} marked ${lesson.status.toLowerCase()}.`); } }
  const lessonEdit = event.target.closest('[data-lesson-edit]'); if (lessonEdit) openLessonModal(lessonEdit.dataset.lessonEdit);
  const lessonDelete = event.target.closest('[data-lesson-delete]'); if (lessonDelete && allowDelete('Delete this weekly lesson?')) { state.lessonPlans = state.lessonPlans.filter(p => p.id !== lessonDelete.dataset.lessonDelete); saveState(); renderPlanner(); showToast('Weekly lesson deleted.'); }
  const extra = event.target.closest('[data-extra]'); if (extra) { const key = extra.dataset.extra; if (state.extraPlans.includes(key)) state.extraPlans = state.extraPlans.filter(x => x !== key); else state.extraPlans.push(key); saveState(); renderExtras(); if (document.getElementById('modalBackdrop') && !document.getElementById('modalBackdrop').hidden) openExtraDetail(key); showToast(state.extraPlans.includes(key) ? 'Added to your activity ideas.' : 'Removed from your activity ideas.'); }
});
document.addEventListener('submit', event => {
  if (event.target.id === 'examForm') { event.preventDefault(); createDraft(); }
  if (event.target.id === 'workModalForm') { event.preventDefault(); const f = new FormData(event.target); state.workRecords.unshift({ id: `work-${Date.now()}`, type: f.get('type'), title: f.get('title'), className: f.get('className'), date: f.get('date'), topic: f.get('topic'), status: f.get('status'), evidence: f.get('evidence') }); saveState(); closeModal(); renderAll(); showToast('Record saved.'); }
  if (event.target.id === 'scoreForm') { event.preventDefault(); const f = new FormData(event.target); const score = Number(f.get('scoreValue')); const max = Number(f.get('scoreMax')); if (!Number.isFinite(score) || !Number.isFinite(max) || max < 1 || score < 0 || score > max) { showToast('Score must be between 0 and the maximum score.'); return; } state.scores.unshift({ id: `score-${Date.now()}`, className: state.currentClass, learnerId: f.get('learnerId'), assessment: f.get('assessment'), score, max, date: f.get('scoreDate'), comment: f.get('scoreComment') }); saveState(); event.target.reset(); document.getElementById('scoreDate').value = today(); renderAll(); showToast('Score saved.'); }
  if (event.target.id === 'projectModalForm') { event.preventDefault(); const f = new FormData(event.target); state.projects.unshift({ id: `project-${Date.now()}`, title: f.get('title'), className: f.get('className'), description: f.get('description'), dueDate: f.get('dueDate'), status: f.get('status'), evidence: f.get('evidence') }); saveState(); closeModal(); renderAll(); showToast('Project saved.'); }
  if (event.target.id === 'topicModalForm') { event.preventDefault(); const f = new FormData(event.target); const cls = f.get('className'); state.customTopics[cls] = [...new Set([...(state.customTopics[cls] || []), f.get('topic')])]; saveState(); closeModal(); document.getElementById('examClass').value = cls; renderTopics(); showToast('Topic added to your scheme list.'); }
  if (event.target.id === 'targetsModalForm') { event.preventDefault(); const f = new FormData(event.target); state.targets[state.currentClass] = { Exercise: Number(f.get('Exercise')), 'Class test': Number(f.get('Class test')), Assignment: Number(f.get('Assignment')), Project: Number(f.get('Project')) }; saveState(); closeModal(); renderAll(); showToast('Working targets saved.'); }
  if (event.target.id === 'extraModalForm') { event.preventDefault(); const f = new FormData(event.target); state.customExtras = [...(state.customExtras || []), { title: f.get('title'), tag: f.get('tag'), icon: '✦', age: f.get('className'), why: 'Teacher-planned activity for learner development.', activity: f.get('activity'), source: 'Added by teacher.' }]; saveState(); closeModal(); renderExtras(); showToast('Activity added.'); }
  if (event.target.id === 'lessonModalForm') { event.preventDefault(); const f = new FormData(event.target); const week = Math.max(1, Math.min(12, Number(f.get('week')) || 1)); const topic = String(f.get('topic')).trim(); const lesson = { id: event.target.dataset.id || `lesson-${Date.now()}`, className: state.currentClass, term: state.term, track: f.get('track') || 'Regular class', week, topic, outcome: String(f.get('outcome')).trim(), activity: String(f.get('activity')).trim(), evidence: String(f.get('evidence')).trim(), resource: String(f.get('resource')).trim(), status: f.get('status') }; const index = state.lessonPlans.findIndex(p => p.id === lesson.id); if (index >= 0) state.lessonPlans[index] = lesson; else state.lessonPlans.push(lesson); state.customTopics[state.currentClass] = [...new Set([...(state.customTopics[state.currentClass] || []), topic])]; saveState(); closeModal(); renderAll(); showToast(index >= 0 ? 'Weekly lesson updated.' : 'Weekly lesson saved and topic added to Exams.'); }
});
document.getElementById('classSelect').addEventListener('change', event => { state.currentClass = event.target.value; saveState(); renderAll(); });
document.getElementById('termSelect').addEventListener('change', event => { state.term = event.target.value; saveState(); renderAll(); });
document.getElementById('examClass').addEventListener('change', () => { currentDraft = null; document.getElementById('questionPicker').hidden = true; syncExamRuleControls(); renderTopics(); });
syncExamRuleControls();
document.getElementById('energizerClassSelect').addEventListener('change', event => { state.currentClass = event.target.value; saveState(); renderAll(); });
document.getElementById('energizerTopicSelect').addEventListener('change', renderEnergizers);
document.getElementById('energizerDurationSelect').addEventListener('change', renderEnergizers);
document.getElementById('topicSource').addEventListener('change', () => { currentDraft = null; renderTopics(); });
document.getElementById('examTopicSelect').addEventListener('change', event => { const values = [...event.target.selectedOptions].map(o => o.value); document.querySelectorAll('#topicList input').forEach(input => { input.checked = values.includes(input.value); }); });
document.getElementById('workSearch').addEventListener('input', renderWork);
document.getElementById('extraSearch').addEventListener('input', event => { activeExtraSearch = event.target.value; renderExtras(); });
document.getElementById('extraFilter').addEventListener('change', event => { activeExtraFilter = event.target.value; renderExtras(); });
document.getElementById('printExamBtn').addEventListener('click', () => window.print());
document.getElementById('saveExamBtn').addEventListener('click', saveDraft);
document.getElementById('loginBtn').addEventListener('click', () => { if (SIGN_IN_ENABLED) window.location.href = '/api/auth/login'; });
document.getElementById('localModeBtn').addEventListener('click', () => { localStorage.setItem('benniLocalMode', '1'); authUser = { openId: 'local', name: 'Local teacher', email: '' }; showAuthenticatedWorkspace(); showToast('Local mode is active on this device.'); });
document.getElementById('logoutBtn').addEventListener('click', async () => { if (SIGN_IN_ENABLED) await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }).catch(() => {}); localStorage.removeItem('benniLocalMode'); window.location.reload(); });
document.getElementById('storagePlanForm').addEventListener('submit', event => { event.preventDefault(); const f = new FormData(event.target); saveStoragePlan({ ...storagePlan(), provider: 'Google Drive', label: String(f.get('label') || '').trim() }); renderStorage(); showToast('Google Drive backup label saved.'); });
document.getElementById('installAppBtn').addEventListener('click', async () => { if (!deferredInstallPrompt) { showToast('Use your browser menu and choose Add to Home screen.'); return; } deferredInstallPrompt.prompt(); await deferredInstallPrompt.userChoice; deferredInstallPrompt = null; document.getElementById('installAppBtn').hidden = true; });
['settingsTheme', 'settingsDensity', 'settingsReduceMotion', 'settingsConfirmDelete', 'settingsAutoSave'].forEach(id => document.getElementById(id)?.addEventListener('change', () => { const s = loadSettings(); const el = document.getElementById(id); if (id === 'settingsTheme') s.theme = el.value; if (id === 'settingsDensity') s.density = el.value; if (id === 'settingsReduceMotion') s.reduceMotion = el.checked; if (id === 'settingsConfirmDelete') s.confirmDelete = el.checked; if (id === 'settingsAutoSave') s.autoSave = el.checked; saveSettings(s); showToast('Settings saved on this device.'); }));
document.querySelectorAll('.check-row input').forEach(input => input.addEventListener('change', () => { state.checks[state.currentClass][input.dataset.check] = input.checked; saveState(); }));
// Import is all-or-nothing: the file is fully read, decrypted and validated first, the teacher confirms,
// a safety copy of the current records is saved, and only then is the state replaced.
document.getElementById('importFile').addEventListener('change', event => {
  const file = event.target.files[0];
  event.target.value = '';
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    let parsed;
    try { parsed = JSON.parse(reader.result); }
    catch { showToast('That file is not a recognised teacher backup. No records were changed.'); return; }
    if (parsed?.format === BACKUP_ENCRYPTED_FORMAT) { parsed = await decryptBackup(parsed); if (!parsed) return; }
    const candidate = parsed?.state || parsed;
    const check = validateBackupState(candidate);
    if (!check.ok) { showToast(`Not a valid teacher backup: ${check.reason}. No records were changed.`); return; }
    if (!confirm('Importing replaces all work records on this device with the backup. Continue?')) { showToast('Import cancelled. No records were changed.'); return; }
    try {
      localStorage.setItem(`${storageKey()}:pre-import`, JSON.stringify({ savedAt: new Date().toISOString(), state }));
    } catch {
      showToast('Could not save a safety copy of the current records, so nothing was imported.');
      return;
    }
    state = { ...freshState(), ...candidate, customExtras: candidate.customExtras || [] };
    saveState();
    saveStoragePlan({ ...storagePlan(), lastRestoreAt: today() });
    closeModal();
    renderAll();
    showToast('Backup imported. A safety copy of the previous records is kept in this browser.');
  };
  reader.readAsText(file);
});
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !document.getElementById('modalBackdrop').hidden) closeModal(); });

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); deferredInstallPrompt = event; document.getElementById('installAppBtn').hidden = false; });
window.addEventListener('online', updateConnectivity);
window.addEventListener('offline', updateConnectivity);
bootstrapAuth();

// Plain-English privacy policy. Static text only: it never includes teacher or learner data.
const PRIVACY_POLICY_HTML = `<div class="eyebrow accent">PRIVACY POLICY · last updated 21 October 2026</div><h2>Your records stay on your device</h2><p class="lead">Benni Teacher Assistant is a planning tool for teachers. It is not an official GES or NaCCA system.</p><h3>What the app stores</h3><ul><li>Lesson plans, class work, class tests, scores, projects and exam drafts that you type in.</li><li>Your settings, such as theme and spacing.</li></ul><p>This information is stored in the web browser on this device, using the browser's local storage.</p><h3>What is never sent</h3><ul><li>This version has no server. Nothing you type is sent over the internet to the app's authors or to any company.</li><li>No analytics, advertising or tracking code is used.</li></ul><h3>Encrypted backups</h3><ul><li>A backup is encrypted with the password you choose before it is saved.</li><li>If you save a backup to your own Google Drive folder, only the encrypted file goes there. Google Drive cannot read the contents.</li><li>The app never stores your backup password. If you forget it, the backup cannot be opened.</li></ul><h3>Learner information</h3><ul><li>Use anonymous learner IDs, not full names, wherever possible.</li><li>Do not share screenshots or backup files that contain learner information.</li></ul><h3>Deleting your data</h3><ul><li>Use the delete buttons inside the app, or clear this browser's site data.</li><li>Export an encrypted backup first if you want to keep your records.</li></ul><h3>Responsibility</h3><p>You, the teacher, are responsible for the records you keep and for checking every exam question and mark before use.</p>`;
function showPrivacyPolicy() { openModal(PRIVACY_POLICY_HTML); }
['privacyPolicyBtn', 'authPrivacyBtn'].forEach(id => document.getElementById(id)?.addEventListener('click', showPrivacyPolicy));
