// تصميم هذا الملف: ورشة الإتقان — شرح عربي مرئي وأمثلة ويب كاملة.
#import "report-theme.typ": report-accent, report-theme
#show: report-theme.with(title: "تعلم HTML وCSS: من الأساس إلى الاحتراف", author: "Manus AI", rhythm: "report", running-header: true)
#set text(font: "Noto Sans Arabic", lang: "ar", size: 10pt)
#set par(justify: false, leading: 0.82em)

#page(margin: (top: 27%, x: 2.2cm), numbering: none, header: none)[
  #set par(first-line-indent: 0em)
  #align(center)[
    #text(size: 24pt, weight: "bold", fill: report-accent)[تعلم HTML وCSS]
    #v(0.35em)
    #text(size: 17pt, weight: "bold")[من الأساس إلى الاحتراف]
    #v(0.8em)
    #text(size: 13pt, fill: luma(80))[دليل عربي عملي لبناء واجهات ويب واضحة ومتجاوبة]
    #v(2em)
    #line(length: 42%, stroke: 0.8pt + report-accent)
    #v(1.6em)
    #text(size: 11pt)[إعداد: Manus AI — الإصدار الأول 2026]
  ]
]
#page(numbering: none, header: none)[#set par(first-line-indent: 0em); #outline(title: [الفهرس], indent: 1.5em)]
#counter(page).update(1)

= كيف يعمل الويب؟

HTML هي الهيكل والمعنى: عنوان، فقرة، نموذج، ورابط. CSS هي المظهر والتخطيط: اللون، الخط، المسافات، والاستجابة للشاشات. ابدأ كل مشروع بملف `index.html` وملف `styles.css`، واربطهما كما سترى في الفصل الأول. اختبر دائماً بتغيير صغير ثم تحديث المتصفح.

> المبدأ العملي: اكتب HTML دلالياً أولاً، ثم أضف CSS تدريجياً؛ لا تحاول حل مشكلة التصميم عبر عناصر أكثر.

= الفصل الأول: بنية HTML والوسوم الأساسية

== أول صفحة صحيحة

يحمل `<!doctype html>` المتصفح على استخدام وضع المعايير. يصف `head` معلومات الصفحة غير المرئية مثل الترميز والعنوان، بينما يحمل `body` كل ما يراه الزائر. حدد `lang="ar"` و`dir="rtl"` لتتعامل الصفحة جيداً مع العربية.

```html
<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>مذكرتي البرمجية</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>أهلاً في مذكرتي</h1>
    <p>أتعلم بناء الويب خطوة خطوة.</p>
  </body>
</html>
```

== الدلالة قبل الشكل

استخدم `header` للرأس و`nav` للتنقل و`main` للمحتوى الرئيسي و`article` للمقال المستقل و`footer` للتذييل. هذه العناصر لا تجعل التصميم جميلاً وحدها، لكنها تجعل الصفحة مفهومة لقارئات الشاشة ولمحركات البحث.

```html
<header>
  <a href="/" aria-label="العودة للرئيسية">موقعي</a>
  <nav aria-label="التنقل الرئيسي">
    <a href="#about">عني</a>
    <a href="#contact">تواصل</a>
  </nav>
</header>
<main>
  <article><h1>تعلمت اليوم</h1><p>العناصر الدلالية تصف الهدف لا شكل العنصر.</p></article>
</main>
<footer>© 2026</footer>
```

== النصوص والروابط والصور

العنوان `h1` يكون واحداً غالباً في الصفحة، ثم تتدرج `h2` و`h3`. لا تستخدم العناوين فقط لتكبير الخط؛ اجعل تسلسلها منطقياً. يجب أن يصف `alt` فائدة الصورة، لا أن يكرر اسم الملف.

```html
<h1>خطة التعلّم</h1>
<h2>أول أسبوع</h2>
<p>يمكنك زيارة <a href="https://developer.mozilla.org/">مرجع MDN</a>.</p>
<img src="study-desk.jpg" alt="دفتر مفتوح بجانب حاسوب يعرض محرر أكواد" />
<ul><li>تعلم الوسوم</li><li>تطبيق CSS</li><li>بناء صفحة</li></ul>
```

== تمارين الفصل الأول

1. أنشئ صفحة «عنّي» فيها `header` و`main` و`footer` وعنوان رئيسي وفقرتان.
2. أضف قائمة من ثلاث مهارات ورابطاً يفتح مرجعاً في تبويب جديد باستخدام `target="_blank"` و`rel="noreferrer"`.
3. استبدل صورة لا تملك وصفاً مفيداً بصورة لها `alt` واضح.

= الفصل الثاني: الجداول والنماذج

== الجداول للبيانات فقط

الجدول مناسب لمقارنة بيانات منظمة، وليس لتخطيط الصفحة. استخدم `caption` ليشرح الغرض، و`th` لعناوين الأعمدة، و`scope` لتحسين إمكانية الوصول.

```html
<table>
  <caption>خطة دراسة الأسبوع</caption>
  <thead><tr><th scope="col">اليوم</th><th scope="col">الموضوع</th><th scope="col">المدة</th></tr></thead>
  <tbody>
    <tr><td>الأحد</td><td>HTML</td><td>45 دقيقة</td></tr>
    <tr><td>الثلاثاء</td><td>CSS</td><td>60 دقيقة</td></tr>
  </tbody>
</table>
```

== نموذج قابل للاستخدام

لكل حقل نموذج `label` مرتبط به عبر `for` و`id`. نوع الحقل يساعد المتصفح على التحقق. لا تضع كلمة المرور أو البيانات الحساسة في صفحة ساكنة دون خادم آمن؛ هذا المثال للواجهة فقط.

```html
<form>
  <div><label for="name">الاسم</label><input id="name" name="name" type="text" required minlength="2" /></div>
  <div><label for="email">البريد الإلكتروني</label><input id="email" name="email" type="email" required /></div>
  <fieldset>
    <legend>المسار المفضل</legend>
    <label><input type="radio" name="track" value="frontend" checked /> واجهات ويب</label>
    <label><input type="radio" name="track" value="python" /> Python</label>
  </fieldset>
  <button type="submit">إرسال</button>
</form>
```

== تمارين الفصل الثاني

1. أنشئ جدول مقارنة بين ثلاث لغات برمجة وأعمدته: الاسم، الاستخدام، الصعوبة.
2. أنشئ نموذج تسجيل يحوي الاسم والبريد وقائمة اختيار للمستوى ومربع ملاحظات.
3. أضف `required` ورسائل إرشادية قصيرة ولا تستخدم `placeholder` بديلاً عن `label`.

= الفصل الثالث: أساسيات CSS

== اختيار العناصر والمربع الصندوقي

قاعدة CSS تتكون من محدد ثم خصائص. المحدد `.card` يختار العناصر ذات الصنف card، و`#hero` يختار معرفاً واحداً. صندوق كل عنصر يتكون من المحتوى ثم `padding` ثم `border` ثم `margin`. اجعل `box-sizing: border-box` قاعدة عامة لتصبح الأحجام أسهل.

```css
* { box-sizing: border-box; }
body { margin: 0; font-family: Arial, sans-serif; background: #fff8ed; color: #132033; }
.card { max-width: 540px; margin: 2rem auto; padding: 1.5rem; border: 2px solid #132033; background: white; }
.card h2 { color: #f26722; }
```

== الألوان والخطوط والحالات

استخدم التباين العالي للنص، ولا تعتمد على اللون وحده لنقل معلومة مهمة. أضف حالات واضحة للتفاعل مثل `:hover` و`:focus-visible`. لا تزل مخطط التركيز؛ حسّنه بدلاً من ذلك.

```css
a { color: #0f6866; text-underline-offset: 0.2em; }
a:hover { color: #f26722; }
a:focus-visible, button:focus-visible { outline: 3px solid #f26722; outline-offset: 3px; }
button { border: 0; padding: 0.75rem 1rem; background: #132033; color: white; cursor: pointer; }
```

== تمارين الفصل الثالث

1. صمّم بطاقة مقال فيها عنوان ووصف وزر باستخدام `padding` و`margin` و`border`.
2. أنشئ ثلاث متغيرات CSS للألوان ثم استخدمها في صفحة بسيطة.
3. أضف حالة `focus-visible` واضحة لكل رابط وزر في مشروعك.

= الفصل الرابع: Flexbox

== ترتيب عناصر في بعد واحد

Flexbox ممتاز عندما تريد ترتيب عناصر في صف أو عمود. ضعه على الحاوية وليس على كل عنصر: `display:flex`. تحدد `justify-content` المحور الرئيسي و`align-items` المحور المتقاطع. استخدم `gap` بدلاً من هوامش معقدة بين العناصر.

```html
<section class="feature-row">
  <article class="feature">درس قصير</article><article class="feature">محرر كود</article><article class="feature">اختبار فوري</article>
</section>
```

```css
.feature-row { display: flex; flex-wrap: wrap; gap: 1rem; align-items: stretch; }
.feature { flex: 1 1 12rem; padding: 1.25rem; background: #e8f3f0; border-right: 4px solid #f26722; }
.site-header { display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding: 1rem 5vw; }
.site-nav { display: flex; flex-wrap: wrap; gap: 0.75rem; }
@media (max-width: 520px) { .site-header { align-items: flex-start; flex-direction: column; } }
```

== تمارين الفصل الرابع

1. رتّب بطاقة صورة ونص وزر في صف، ثم اجعلها عمودية على الهاتف.
2. اصنع شريط تنقل ينكسر تلقائياً إلى سطر جديد عند ضيق الشاشة.
3. استخدم `gap` في قائمة مزايا بدلاً من هوامش لكل عنصر.

= الفصل الخامس: CSS Grid

== تخطيط ثنائي الأبعاد

Grid مناسب لصفوف وأعمدة معاً. استخدم `repeat` و`minmax` لتصميم يتكيف من تلقاء نفسه. عندما تستعمل `auto-fit`، تملأ البطاقات المساحة المتاحة دون أن تحدد عدد الأعمدة لكل شاشة.

```html
<main class="course-grid"><article class="course">HTML</article><article class="course">CSS</article><article class="course">JavaScript</article><article class="course">Python</article></main>
```

```css
.course-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.25rem; padding: 2rem; }
.course { min-height: 150px; padding: 1.25rem; background: white; box-shadow: 0 8px 20px rgb(19 32 51 / 12%); }
.app-layout { display: grid; min-height: 100vh; grid-template-columns: 16rem 1fr; }
.sidebar { background: #132033; color: white; padding: 1rem; }.content { padding: clamp(1rem, 4vw, 4rem); }
@media (max-width: 760px) { .app-layout { grid-template-columns: 1fr; }.sidebar { display: none; } }
```

== تمارين الفصل الخامس

1. أنشئ معرضاً من ست بطاقات يستخدم `auto-fit` و`minmax`.
2. ابنِ تخطيطاً يحوي قائمة جانبية ومحتوى، ثم أخف القائمة على الهاتف.
3. اجعل بطاقة واحدة تمتد على عمودين في شاشة كبيرة فقط.

= الفصل السادس: التصميم المتجاوب ومشروع عملي

== أسلوب Mobile First

اكتب القواعد الافتراضية للشاشة الصغيرة، ثم أضف تحسينات عبر `min-width`. استخدم وحدات مرنة مثل `rem` و`%` و`clamp`؛ لا تثبت العرض بالبكسل إلا عندما تحتاج قيمة دقيقة فعلاً.

```css
:root { font-size: 16px; }
h1 { font-size: clamp(2rem, 5vw, 4.5rem); }
.container { width: min(1100px, 92%); margin-inline: auto; }
@media (min-width: 768px) { .hero { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 3rem; } }
```

== مشروع: صفحة ملف شخصي متجاوبة

هذا المشروع يجمع HTML الدلالي وFlexbox وGrid والتجاوب. انسخه في ملفين ثم بدّل المحتوى والألوان. التركيب فصل متعمد: HTML للمعنى وCSS للمظهر.

```html
<!-- index.html -->
<!doctype html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="styles.css"><title>ملفي</title></head>
<body>
  <header class="site-header"><strong>ليان</strong><nav><a href="#work">الأعمال</a><a href="#contact">تواصل</a></nav></header>
  <main><section class="hero"><div><p class="eyebrow">مطورة واجهات</p><h1>أبني صفحات سهلة الاستخدام.</h1><a class="button" href="#work">شاهدي الأعمال</a></div><div class="visual" aria-hidden="true"></div></section><section id="work" class="work-grid"><article>صفحة تعليمية</article><article>متجر بسيط</article><article>لوحة متابعة</article></section></main>
  <footer id="contact">تواصل: hello@example.com</footer>
</body></html>
```

```css
/* styles.css */
:root { --ink:#132033; --paper:#fff8ed; --accent:#f26722; } * { box-sizing:border-box; }
body { margin:0; color:var(--ink); background:var(--paper); font-family:Arial,sans-serif; }.site-header { display:flex; justify-content:space-between; gap:1rem; padding:1.2rem 6vw; }nav { display:flex; gap:1rem; }a { color:inherit; }main { width:min(1100px,90%); margin:auto; }
.hero { padding:5rem 0 3rem; }h1 { max-width:11ch; font-size:clamp(2.5rem,8vw,5rem); }.eyebrow { color:var(--accent); font-weight:bold; }.button { display:inline-block; padding:.8rem 1rem; background:var(--ink); color:white; text-decoration:none; }
.work-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:1rem; padding:3rem 0; }.work-grid article { padding:2rem; background:white; border-top:5px solid var(--accent); }footer { padding:2rem 6vw; background:var(--ink); color:white; }
@media (min-width:760px) { .hero { display:grid; grid-template-columns:1.2fr .8fr; align-items:center; gap:4rem; }.visual { min-height:300px; background:var(--accent); } }
```

== تمارين الفصل السادس

1. أكمل مشروع الملف الشخصي بإضافة صورة بوصف بديل مفيد وقسم مهارات.
2. اختبر الصفحة عند 360 و768 و1280 بكسل، واكتب ثلاثة تحسينات نفذتها.
3. راجع التسلسل المنطقي للعناوين ولون التركيز في أزرارك وروابطك.

= إلى أين بعد ذلك؟

أنت الآن قادر على بناء صفحات منظمة ومتجاوبة. الخطوة التالية هي JavaScript لإضافة سلوك تفاعلي، ثم تعلّم أدوات المتصفح لفحص العناصر ومعالجة المشكلات. استمر ببناء صفحة صغيرة كل أسبوع؛ المشروع المنشور أفضل من عشرات الأمثلة غير المطبقة.
