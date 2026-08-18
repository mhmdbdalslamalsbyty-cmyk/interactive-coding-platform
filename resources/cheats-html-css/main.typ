// منصة السبتاني — مرجع HTML وCSS سريع؛ تصميم ملف منفصل من صفحة إلى صفحتين.
#import "report-theme.typ": report-accent
#set page(margin: (x: 1.2cm, y: 1.1cm), numbering: "1 / 1")
#set text(font: "Noto Sans Arabic", lang: "ar", size: 8.5pt)
#set par(leading: .78em, spacing: .42em)
#show heading: it => block(above: .7em, below: .35em, fill: rgb("fff4e5"), inset: 5pt, radius: 0pt, text(weight: "bold", fill: report-accent, it.body))

#align(center)[#text(size: 20pt, weight: "bold", fill: report-accent)[ملخص HTML وCSS السريع] #linebreak() #text(size: 9pt)[منصة السبتاني — المهندس محمد عادل السبتاني]]
#grid(columns: (1fr, 1fr), gutter: 11pt,
[
== هيكل صفحة دلالي
```html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body><header>...</header><main><section>...</section></main><footer>...</footer></body>
</html>
```
اختر `header`, `nav`, `main`, `section`, `article`, `footer` حسب المعنى وليس حسب الشكل.

== نصوص وروابط وصور
```html
<h1>عنوان واحد رئيسي</h1>
<p>فقرة مفيدة وواضحة.</p>
<a href="/lessons">الدروس</a>
<img src="study.jpg" alt="طالب يتعلم البرمجة">
```
صِغ `alt` لوصف الصورة؛ اتركه فارغاً للزخرفة فقط.

== نماذج قابلة للوصول
```html
<label for="email">البريد</label>
<input id="email" type="email" required>
<button type="submit">إرسال</button>
```
استعمل `label` ولا تعتمد على placeholder وحده. أظهر رسائل خطأ قريبة من الحقل.

== المحددات والصندوق
```css
:root { --brand: #f26722; }
* { box-sizing: border-box; }
.card { padding: 1rem; border: 2px solid #132033; }
.card > h2 { color: var(--brand); }
```
ترتيب الصندوق: content ثم padding ثم border ثم margin.
],
[
== Flexbox
```css
.row { display: flex; gap: 1rem; align-items: center; }
.row > * { flex: 1 1 12rem; }
```
استخدمه عندما يكون الاتجاه الأساسي صفاً أو عموداً.

== Grid متجاوب
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1rem;
}
```
Grid مثالي لبطاقات وفهارس ثنائية الأبعاد.

== الاستجابة والحركة
```css
h1 { font-size: clamp(2rem, 6vw, 5rem); }
@media (min-width: 48rem) { .menu { display: flex; } }
button { transition: transform 160ms ease-out; }
button:active { transform: scale(.97); }
@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
```

== الوصول وRTL
```css
:focus-visible { outline: 3px solid #f26722; outline-offset: 3px; }
[dir="rtl"] { text-align: right; }
```
اجعل التباين واضحاً، وأبقِ التركيز مرئياً، واختبر لوحة المفاتيح والهاتف.

== تذكير سريع
HTML = المعنى والبنية. CSS = المظهر والتخطيط. JavaScript = السلوك. لا تستخدم جدولاً للتخطيط ولا `div` عندما يوجد وسم دلالي أفضل.
]
)
