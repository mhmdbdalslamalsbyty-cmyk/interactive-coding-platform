/* ورشة الإتقان: منطق التصفح والتقدم والمحررات والاختبارات. */
const $ = (s) => document.querySelector(s);
const nav = $('#lesson-nav'), home = $('#home'), lessonView = $('#lesson-view');
let activeId = null, codeOriginal = '', current = null;
const completed = new Set(JSON.parse(localStorage.getItem('masar-code-progress') || '[]'));

function renderNav(){
  const groups = ['Python','HTML & CSS','C++'];
  nav.innerHTML = groups.map(track => `<div class="track-nav-title">${track}</div>${lessons.filter(x=>x.track===track).map(l => `<button class="lesson-link ${activeId===l.id?'active':''} ${completed.has(l.id)?'done':''}" data-lesson="${l.id}"><span class="node">${completed.has(l.id)?'✓':l.n}</span><span>${l.title}</span></button>`).join('')}`).join('');
  nav.querySelectorAll('[data-lesson]').forEach(b=>b.addEventListener('click',()=>openLesson(b.dataset.lesson)));
}
function renderProgress(){
  const percent = Math.round((completed.size / lessons.length) * 100);
  $('#sidebar-progress').style.width = `${percent}%`;
  $('#progress-label').textContent = `${completed.size} من ${lessons.length} درساً`;
}
function escapeHtml(value){ return value.replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[char])); }
function openLesson(id){
  current = lessons.find(l=>l.id===id); if(!current) return;
  activeId=id; home.hidden=true; lessonView.hidden=false;
  $('#crumb-track').textContent=current.track;
  $('#lesson-meta').textContent=`${current.track} · المحطة ${current.n} من 6`;
  $('#lesson-title').textContent=current.title; $('#lesson-summary').textContent=current.summary;
  $('#lesson-explanation').innerHTML=current.explanation; $('#lesson-tip').textContent=current.tip;
  $('#quiz-question').textContent=current.quiz.q;
  $('#quiz-options').innerHTML=current.quiz.opts.map((option,index)=>`<label class="quiz-option"><input type="radio" name="answer" value="${index}"> <span>${option}</span></label>`).join('');
  $('#quiz-feedback').textContent=''; $('#quiz-feedback').className='quiz-feedback';
  $('#code-editor').value=current.code; codeOriginal=current.code;
  $('#editor-label').textContent=`تجربة ${current.track}`; $('#runtime-label').textContent=current.track==='HTML & CSS'?'معاينة مباشرة':'Python في المتصفح';
  $('#code-output').textContent='اختر «تشغيل» لتظهر النتيجة هنا.'; $('#html-preview').hidden=true;
  updateCompleteButton(); renderNav(); renderProgress();
  document.body.classList.remove('menu-open'); window.scrollTo({top:0,behavior:'smooth'}); $('#lesson-title').focus({preventScroll:true});
}
function updateCompleteButton(){ const b=$('#complete-button'), done=completed.has(activeId); b.textContent=done?'✓ أُنجز هذا الدرس':'وضع علامة مكتمل'; b.classList.toggle('done',done); }
function toggleComplete(){ if(!activeId)return; completed.has(activeId)?completed.delete(activeId):completed.add(activeId); localStorage.setItem('masar-code-progress',JSON.stringify([...completed])); updateCompleteButton();renderNav();renderProgress();toast(completed.has(activeId)?'تم حفظ تقدمك على هذا الجهاز.':'أزيلت علامة الإكمال.'); }
function checkQuiz(){ const selected=$('input[name="answer"]:checked'), feedback=$('#quiz-feedback'); if(!selected){feedback.textContent='اختر إجابة أولاً، ثم تحقق منها.';feedback.className='quiz-feedback bad';return;} const correct=Number(selected.value)===current.quiz.a; feedback.textContent=correct?`إجابة صحيحة. ${current.quiz.why}`:`ليست الإجابة الصحيحة بعد. ${current.quiz.why}`; feedback.className=`quiz-feedback ${correct?'good':'bad'}`; if(correct&&!completed.has(activeId)) toggleComplete(); }
function runPython(code){ const output=$('#code-output'); output.textContent='جارٍ تشغيل Python…'; $('#html-preview').hidden=true; try{ let lines=[]; const oldWrite=window.__msWrite; window.__msWrite=(text)=>lines.push(String(text)); const wrapped=`from browser import window\nclass Capture:\n def write(self, text):\n  getattr(window, "__msWrite")(text)\n def flush(self):\n  pass\nimport sys\nsys.stdout = Capture()\nsys.stderr = Capture()\n${code}`; __BRYTHON__.imported.exec={}; eval(__BRYTHON__.py2js(wrapped).to_js()); output.textContent=lines.join('').trim()||'اكتمل التشغيل بدون مخرجات.'; window.__msWrite=oldWrite; }catch(error){output.textContent=`خطأ: ${error.message || error.args?.join(' ') || 'تعذر تنفيذ الكود.'}`;} }
function runCode(){ if(!current)return; const code=$('#code-editor').value; if(current.track==='HTML & CSS'){ const frame=$('#html-preview'); frame.hidden=false; frame.srcdoc=code; $('#code-output').textContent='المعاينة تظهر أسفل المحرر.'; } else if(current.track==='Python'){ runPython(code); } else { $('#html-preview').hidden=true; $('#code-output').textContent='محرر C++ تعليمي في هذه النسخة: انسخ المثال وشغّله محلياً عبر g++ أو في بيئة C++ موثوقة.\n\nالمثال الحالي:\n'+code; } }
function toast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400)}
$('#check-quiz').addEventListener('click',checkQuiz); $('#complete-button').addEventListener('click',toggleComplete); $('#run-code').addEventListener('click',runCode); $('#reset-code').addEventListener('click',()=>{$('#code-editor').value=codeOriginal;toast('استُعيد مثال الدرس.');});
$('#next-lesson').addEventListener('click',()=>{const i=lessons.findIndex(x=>x.id===activeId);openLesson(lessons[(i+1)%lessons.length].id)}); $('#prev-lesson').addEventListener('click',()=>{const i=lessons.findIndex(x=>x.id===activeId);openLesson(lessons[(i-1+lessons.length)%lessons.length].id)});
document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>openLesson(button.dataset.open))); $('#random-lesson').addEventListener('click',()=>openLesson(lessons[Math.floor(Math.random()*lessons.length)].id)); $('#menu-button').addEventListener('click',()=>document.body.classList.toggle('menu-open'));
$('#theme-toggle').addEventListener('click',()=>{document.body.classList.toggle('dark');const dark=document.body.classList.contains('dark');localStorage.setItem('masar-code-theme',dark?'dark':'light');$('#theme-toggle').innerHTML=dark?'☀ <span>الوضع النهاري</span>':'◐ <span>الوضع الليلي</span>';});
if(localStorage.getItem('masar-code-theme')==='dark') $('#theme-toggle').click();
renderNav();renderProgress();
