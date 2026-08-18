/* منصة السبتاني — ورشة الإنجاز: تنقل، نقاط، بحث، تحديات، شهادات ومحررات تعليمية. */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const nav = $('#lesson-nav');
let activeId = null, codeOriginal = '', current = null, activeProjectTrack = 'all', activeChallengeTrack = 'Python';
const completed = new Set(JSON.parse(localStorage.getItem('alsabtani-progress') || '[]'));
const solvedChallenges = new Set(JSON.parse(localStorage.getItem('alsabtani-challenges') || '[]'));
const completedProjects = new Set(JSON.parse(localStorage.getItem('alsabtani-projects') || '[]'));
const views = {home: $('#home'), lesson: $('#lesson-view'), projects: $('#projects-view'), challenges: $('#challenges-view'), certificates: $('#certificates-view'), search: $('#search-view')};
const tracks = ['Python', 'HTML & CSS', 'C++'];

function escapeHtml(value = '') { return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[char])); }
function saveState(){ localStorage.setItem('alsabtani-progress', JSON.stringify([...completed])); localStorage.setItem('alsabtani-challenges', JSON.stringify([...solvedChallenges])); localStorage.setItem('alsabtani-projects', JSON.stringify([...completedProjects])); }
function totalPoints(){ return completed.size * 10 + solvedChallenges.size * 5 + completedProjects.size * 30; }
function trackDone(track){ const list = lessons.filter(item => item.track === track); return list.length > 0 && list.every(item => completed.has(item.id)); }
function trackProgress(track){ const list = lessons.filter(item => item.track === track); return `${list.filter(item => completed.has(item.id)).length}/${list.length}`; }
function updateDashboard(){
  const total = lessons.length, percent = total ? Math.round((completed.size / total) * 100) : 0;
  $('#sidebar-progress').style.width = `${percent}%`; $('#progress-label').textContent = `${completed.size} من ${total} درساً`;
  $('#points-count').textContent = `${totalPoints()} نقطة`;
  $('#hero-lessons').textContent = total;
  $('#achievement-note').textContent = completed.size ? `أكملت ${percent}% من المحطات · استمر.` : 'ابدأ بمحطة واحدة اليوم.';
}
function setMenuOpen(open, returnFocus = false){
  const wasOpen = document.body.classList.contains('menu-open');
  document.body.classList.toggle('menu-open', open);
  $('#menu-button').setAttribute('aria-expanded', String(open));
  if (!open && returnFocus && wasOpen) $('#menu-button').focus();
}
function runtimeLabel(){ return current?.track === 'HTML & CSS' ? 'معاينة مباشرة' : current?.track === 'Python' ? 'Python في المتصفح' : 'تطبيق محلي'; }
function setRuntimeState(running){
  const runButton = $('#run-code');
  runButton.disabled = running;
  runButton.setAttribute('aria-busy', String(running));
  $('#code-studio').setAttribute('aria-busy', String(running));
  $('#runtime-label').textContent = running ? 'قيد التنفيذ…' : runtimeLabel();
}
function setView(name){
  Object.values(views).forEach(view => { if (view) view.hidden = true; });
  const target = views[name] || views.home; target.hidden = false;
  $('#crumb-track').textContent = ({home:'البداية',lesson:current?.track || 'درس',projects:'المشاريع العملية',challenges:'التحديات',certificates:'الشهادات',search:'البحث'})[name] || 'البداية';
  $$('.side-tool').forEach(button => button.classList.toggle('active', button.dataset.view === name));
  setMenuOpen(false); window.scrollTo({top:0, behavior:'smooth'});
}
function renderNav(filter = ''){
  const keyword = filter.trim().toLowerCase();
  nav.innerHTML = tracks.map(track => {
    const filtered = lessons.filter(item => item.track === track && (!keyword || `${item.title} ${item.summary}`.toLowerCase().includes(keyword)));
    if (!filtered.length) return '';
    return `<div class="track-nav-title"><span>${track}</span><small>${trackProgress(track)}</small></div>${filtered.map(item => `<button class="lesson-link ${activeId===item.id?'active':''} ${completed.has(item.id)?'done':''}" data-lesson="${item.id}" type="button"><span class="node">${completed.has(item.id)?'✓':item.n}</span><span>${escapeHtml(item.title)}</span></button>`).join('')}`;
  }).join('') || '<p class="nav-empty">لا توجد محطة بهذه العبارة.</p>';
  $$('[data-lesson]').forEach(button => button.addEventListener('click', () => openLesson(button.dataset.lesson)));
}
function openLesson(id){
  current = lessons.find(item => item.id === id); if (!current) return;
  activeId = id; setView('lesson');
  $('#lesson-meta').textContent = `${current.track} · المحطة ${current.n} من ${lessons.filter(item => item.track === current.track).length}`;
  $('#lesson-title').textContent = current.title; $('#lesson-summary').textContent = current.summary; $('#lesson-explanation').innerHTML = current.explanation; $('#lesson-tip').textContent = current.tip;
  $('#quiz-question').textContent = current.quiz.q; $('#quiz-options').innerHTML = current.quiz.opts.map((option, index) => `<label class="quiz-option"><input type="radio" name="answer" value="${index}"><span>${escapeHtml(option)}</span></label>`).join('');
  $('#quiz-feedback').textContent = ''; $('#quiz-feedback').className = 'quiz-feedback'; $('#code-editor').value = current.code; codeOriginal = current.code;
  $('#editor-label').textContent = `تجربة ${current.track}`; setRuntimeState(false);
  $('#code-output').textContent = 'اختر «تشغيل» لتظهر النتيجة هنا.'; $('#html-preview').hidden = true; updateCompleteButton(); renderNav($('#lesson-search').value); updateDashboard();
  setTimeout(() => $('#lesson-title').focus({preventScroll:true}), 50);
}
function updateCompleteButton(){ const button = $('#complete-button'), done = completed.has(activeId); button.textContent = done ? '✓ أُنجز هذا الدرس' : 'وضع علامة مكتمل'; button.classList.toggle('done', done); }
function toggleComplete(){ if (!activeId) return; completed.has(activeId) ? completed.delete(activeId) : completed.add(activeId); saveState(); updateCompleteButton(); renderNav($('#lesson-search').value); updateDashboard(); toast(completed.has(activeId) ? 'أضيفت 10 نقاط إلى لوحة إنجازك.' : 'أزيلت علامة الإكمال.'); }
function checkQuiz(){ const selected = $('input[name="answer"]:checked'), feedback = $('#quiz-feedback'); if (!selected) { feedback.textContent = 'اختر إجابة أولاً، ثم تحقق منها.'; feedback.className = 'quiz-feedback bad'; return; } const correct = Number(selected.value) === current.quiz.a; feedback.textContent = correct ? `إجابة صحيحة. ${current.quiz.why}` : `ليست الإجابة الصحيحة بعد. ${current.quiz.why}`; feedback.className = `quiz-feedback ${correct?'good':'bad'}`; if (correct && !completed.has(activeId)) toggleComplete(); }
function runPython(code){
  const output = $('#code-output'); output.textContent = 'جارٍ تشغيل Python…'; $('#html-preview').hidden = true;
  const oldWrite = window.__alsabtaniWrite;
  try {
    const lines = [];
    window.__alsabtaniWrite = (text) => lines.push(String(text));
    const wrapped = `from browser import window
class Capture:
 def write(self, text):
  getattr(window, "__alsabtaniWrite")(text)
 def flush(self):
  pass
import sys
sys.stdout=Capture()
sys.stderr=Capture()
${code}`;
    __BRYTHON__.imported.exec = {};
    eval(__BRYTHON__.py2js(wrapped).to_js());
    output.textContent = lines.join('').trim() || 'اكتمل التشغيل بدون مخرجات.';
  } catch(error) {
    output.textContent = `خطأ: ${error.message || error.args?.join(' ') || 'تعذر تنفيذ الكود.'}`;
  } finally {
    window.__alsabtaniWrite = oldWrite;
    setRuntimeState(false);
  }
}
function runCode(){
  if (!current) return;
  const code = $('#code-editor').value;
  if (current.track === 'HTML & CSS') {
    const frame = $('#html-preview'); frame.hidden = false; frame.srcdoc = code; $('#code-output').textContent = 'المعاينة تظهر أسفل المحرر.';
  } else if (current.track === 'Python') {
    setRuntimeState(true); window.requestAnimationFrame(() => runPython(code));
  } else {
    $('#html-preview').hidden = true; $('#code-output').textContent = 'محرر C++ تعليمي: انسخ المثال وشغّله محلياً عبر g++ أو في بيئة C++ موثوقة.\n\nالمثال الحالي:\n' + code;
  }
}
function openProjects(track = activeProjectTrack){ activeProjectTrack = track; setView('projects'); renderProjects(); }
function renderProjects(){
  $$('#project-filter [data-project-track]').forEach(button => button.classList.toggle('active', button.dataset.projectTrack === activeProjectTrack));
  const shown = projects.filter(project => activeProjectTrack === 'all' || project.track === activeProjectTrack);
  $('#project-list').innerHTML = shown.map(project => `<article class="project-card ${project.track==='C++'?'cpp-project':''}"><div class="project-number">0${projects.indexOf(project)+1}</div><p class="eyebrow">${escapeHtml(project.track)} · ${escapeHtml(project.level)}</p><h2>${escapeHtml(project.title)}</h2><p>${escapeHtml(project.goal)}</p><div class="project-card-actions"><button class="primary-button project-open" data-project="${project.id}" type="button">افتح صفحة المشروع <span>←</span></button><span class="project-state ${completedProjects.has(project.id)?'done':''}">${completedProjects.has(project.id)?'✓ مكتمل':'قيد البناء'}</span></div></article>`).join('');
  $$('.project-open').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project)));
}
function openProject(id){
  const project = projects.find(item => item.id === id); if (!project) return; $('#project-list').hidden=true; const detail = $('#project-detail'); detail.hidden=false;
  detail.innerHTML = `<button class="back-link" id="back-to-projects" type="button">→ كل المشاريع</button><div class="project-detail-head"><div><p class="eyebrow orange">${escapeHtml(project.track)} · ${escapeHtml(project.level)}</p><h2>${escapeHtml(project.title)}</h2><p>${escapeHtml(project.goal)}</p></div><div class="project-emblem">${project.track==='Python'?'PY':project.track==='C++'?'C++':'WEB'}</div></div><div class="project-steps"><h3>خطة التنفيذ</h3><ol>${project.steps.map(step => `<li>${escapeHtml(step)}</li>`).join('')}</ol></div><div class="final-code"><div class="studio-header"><b>الكود النهائي</b><span>اقرأ، جرّب، ثم خصصه</span></div><pre><code>${escapeHtml(project.code)}</code></pre></div><button class="complete-project ${completedProjects.has(project.id)?'done':''}" id="complete-project" type="button">${completedProjects.has(project.id)?'✓ المشروع مكتمل':'وضع علامة: أنجزت هذا المشروع (+30 نقطة)'}</button>`;
  $('#back-to-projects').addEventListener('click', () => { detail.hidden=true; $('#project-list').hidden=false; });
  $('#complete-project').addEventListener('click', () => { completedProjects.has(project.id) ? completedProjects.delete(project.id) : completedProjects.add(project.id); saveState(); updateDashboard(); renderProjects(); openProject(project.id); toast(completedProjects.has(project.id) ? 'ممتاز، أضيفت 30 نقطة.' : 'أزيلت علامة إكمال المشروع.'); });
  window.scrollTo({top:0,behavior:'smooth'});
}
function openChallenges(track = activeChallengeTrack){ activeChallengeTrack = track; setView('challenges'); renderChallenges(); }
function renderChallenges(){
  $$('#challenge-tabs [data-challenge-track]').forEach(button => button.classList.toggle('active', button.dataset.challengeTrack === activeChallengeTrack));
  const list = challenges[activeChallengeTrack] || [];
  $('#challenge-list').innerHTML = list.map(([title, prompt, solution], index) => { const key=`${activeChallengeTrack}-${index}`; const done=solvedChallenges.has(key); return `<article class="challenge-card ${done?'done':''}"><div class="challenge-number">${String(index+1).padStart(2,'0')}</div><div><p class="eyebrow">${activeChallengeTrack} · ${index < 7?'مبتدئ':index<14?'متوسط':'متقدم'}</p><h2>${escapeHtml(title)}</h2><p>${escapeHtml(prompt)}</p><div class="challenge-actions"><button class="solution-toggle" data-solution="${index}" type="button">إظهار الحل</button><button class="solve-toggle ${done?'done':''}" data-solve="${index}" type="button">${done?'✓ تم الإنجاز':'+5 نقاط عند الإنجاز'}</button></div><pre id="solution-${index}" class="challenge-solution" hidden><code>${escapeHtml(solution)}</code></pre></div></article>`; }).join('');
  $$('.solution-toggle').forEach(button => button.addEventListener('click', () => { const solution=$(`#solution-${button.dataset.solution}`); const hidden=solution.hidden; solution.hidden=!hidden; button.textContent=hidden?'إخفاء الحل':'إظهار الحل'; }));
  $$('.solve-toggle').forEach(button => button.addEventListener('click', () => { const key=`${activeChallengeTrack}-${button.dataset.solve}`; solvedChallenges.has(key)?solvedChallenges.delete(key):solvedChallenges.add(key); saveState(); updateDashboard(); renderChallenges(); toast(solvedChallenges.has(key)?'سُجل التحدي وأضيفت 5 نقاط.':'أزيلت علامة إنجاز التحدي.'); }));
}
function openCertificates(){ setView('certificates'); $('#certificate-paths').innerHTML = tracks.map(track => `<article class="certificate-card ${trackDone(track)?'unlocked':''}"><div class="certificate-mini-seal">⌁</div><p class="eyebrow">${escapeHtml(track)} · ${trackProgress(track)} محطة</p><h2>شهادة إتمام ${escapeHtml(track)}</h2><p>${trackDone(track)?'أكملت محطات هذا المسار. افتح الشهادة واطبعها.':'أكمل جميع دروس المسار لتفتح شهادة الإنجاز الذاتية.'}</p><button class="${trackDone(track)?'primary-button':'locked-button'}" data-certificate="${track}" type="button">${trackDone(track)?'افتح الشهادة':'الشهادة مقفلة'}</button></article>`).join(''); $$('.certificate-card [data-certificate]').forEach(button => button.addEventListener('click', () => showCertificate(button.dataset.certificate))); }
function showCertificate(track){ if (!trackDone(track)) { toast(`أكمل محطات ${track} أولاً لفتح الشهادة.`); return; } $('#certificate-track').textContent=track; $('#certificate-date').textContent=new Intl.DateTimeFormat('ar-YE',{year:'numeric',month:'long',day:'numeric'}).format(new Date()); $('#certificate-modal').hidden=false; setTimeout(() => $('#close-certificate').focus(), 0); }
function closeCertificate(){ $('#certificate-modal').hidden=true; }
function searchContent(value){
  const keyword=value.trim().toLowerCase(); renderNav(keyword); if (!keyword) { $('#search-view').hidden=true; return; }
  const foundLessons=lessons.filter(item => `${item.title} ${item.summary} ${item.track}`.toLowerCase().includes(keyword)); const foundProjects=projects.filter(item => `${item.title} ${item.goal} ${item.track}`.toLowerCase().includes(keyword));
  setView('search'); $('#search-summary').textContent=`${foundLessons.length+foundProjects.length} نتيجة لعبارة «${value.trim()}».`;
  $('#search-results').innerHTML=[...foundLessons.map(item=>`<button class="search-result" data-lesson="${item.id}" type="button"><span>درس · ${item.track}</span><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.summary)}</small></button>`),...foundProjects.map(item=>`<button class="search-result project-search" data-project="${item.id}" type="button"><span>مشروع · ${item.track}</span><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.goal)}</small></button>`)].join('') || '<p class="empty-result">لم نجد نتيجة. جرّب اسماً أقصر أو انتقل إلى قائمة المحطات.</p>';
  $$('.search-result[data-lesson]').forEach(button=>button.addEventListener('click',()=>openLesson(button.dataset.lesson))); $$('.search-result[data-project]').forEach(button=>button.addEventListener('click',()=>{openProjects('all');openProject(button.dataset.project);}));
}
function toast(message){ const toast=$('#toast'); toast.textContent=message; toast.classList.add('show'); clearTimeout(window.__toastTimer); window.__toastTimer=setTimeout(()=>toast.classList.remove('show'),2400); }

$('#check-quiz').addEventListener('click', checkQuiz); $('#complete-button').addEventListener('click', toggleComplete); $('#run-code').addEventListener('click', runCode); $('#reset-code').addEventListener('click',()=>{$('#code-editor').value=codeOriginal;toast('استُعيد مثال الدرس.');});
$('#next-lesson').addEventListener('click',()=>{ const i=lessons.findIndex(item=>item.id===activeId); openLesson(lessons[(i+1)%lessons.length].id); }); $('#prev-lesson').addEventListener('click',()=>{ const i=lessons.findIndex(item=>item.id===activeId); openLesson(lessons[(i-1+lessons.length)%lessons.length].id); });
document.addEventListener('click', event => { if (document.body.classList.contains('menu-open') && !event.target.closest('.sidebar') && !event.target.closest('#menu-button')) setMenuOpen(false, true); const open=event.target.closest('[data-open]'); if(open) openLesson(open.dataset.open); const view=event.target.closest('[data-view]'); if(view){ const name=view.dataset.view; if(name==='projects') openProjects(); else if(name==='challenges') openChallenges(); else if(name==='certificates') openCertificates(); else setView('home'); } });
$('#home-button').addEventListener('click',()=>setView('home')); $('#random-lesson').addEventListener('click',()=>openLesson(lessons[Math.floor(Math.random()*lessons.length)].id));
$('#menu-button').addEventListener('click',()=>setMenuOpen(!document.body.classList.contains('menu-open')));
$('#focus-toggle').addEventListener('click',()=>{ const active=document.body.classList.toggle('focus-mode'); $('#focus-toggle').innerHTML=active?'◉ <span>إنهاء التركيز</span>':'◉ <span>وضع التركيز</span>'; toast(active?'وضع التركيز مفعل؛ أخفينا القوائم.':'عادت القوائم إلى مكانها.'); });
$('#theme-toggle').addEventListener('click',()=>{ document.body.classList.toggle('dark'); const dark=document.body.classList.contains('dark'); localStorage.setItem('alsabtani-theme',dark?'dark':'light'); $('#theme-toggle').innerHTML=dark?'☀ <span>الوضع النهاري</span>':'◐ <span>الوضع الليلي</span>'; });
$('#lesson-search').addEventListener('input',event=>searchContent(event.target.value));
$('#project-filter').addEventListener('click',event=>{const button=event.target.closest('[data-project-track]');if(button){activeProjectTrack=button.dataset.projectTrack;$('#project-detail').hidden=true;$('#project-list').hidden=false;renderProjects();}});
$('#challenge-tabs').addEventListener('click',event=>{const button=event.target.closest('[data-challenge-track]');if(button){activeChallengeTrack=button.dataset.challengeTrack;renderChallenges();}});
$('#close-certificate').addEventListener('click',closeCertificate); $('#certificate-modal').addEventListener('click',event=>{if(event.target===$('#certificate-modal'))closeCertificate();}); $('#print-certificate').addEventListener('click',()=>window.print());
document.addEventListener('keydown', event => { if (event.key !== 'Escape') return; if (!$('#certificate-modal').hidden) closeCertificate(); else if (document.body.classList.contains('menu-open')) setMenuOpen(false, true); });
window.addEventListener('resize', () => { if (window.innerWidth > 980) setMenuOpen(false); });
if(localStorage.getItem('alsabtani-theme')==='dark') $('#theme-toggle').click(); renderNav(); updateDashboard();
