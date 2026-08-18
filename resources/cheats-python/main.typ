// منصة السبتاني — مرجع Python سريع؛ تصميم ملف منفصل من صفحة إلى صفحتين.
#import "report-theme.typ": report-accent
#set page(margin: (x: 1.2cm, y: 1.1cm), numbering: "1 / 1")
#set text(font: "Noto Sans Arabic", lang: "ar", size: 8.5pt)
#set par(leading: .78em, spacing: .42em)
#show heading: it => block(above: .7em, below: .35em, fill: rgb("fff4e5"), inset: 5pt, radius: 0pt, text(weight: "bold", fill: report-accent, it.body))

#align(center)[#text(size: 20pt, weight: "bold", fill: report-accent)[ملخص Python السريع] #linebreak() #text(size: 9pt)[منصة السبتاني — المهندس محمد عادل السبتاني]]

#grid(columns: (1fr, 1fr), gutter: 11pt,
[
== القيم والأساسيات
```python
name = "سارة"          # str
age = 20               # int
price = 19.5           # float
active = True          # bool
print(f"{name}: {age}")
```
`+ - * / // % **` للعمليات. استخدم `==` للمقارنة و`and / or / not` للشروط.

== شروط وحلقات
```python
if score >= 80:
    level = "ممتاز"
elif score >= 60:
    level = "ناجح"
else:
    level = "مراجعة"

for item in items: print(item)
while total < 10: total += 1
```

== القوائم والقواميس
```python
items = ["قلم", "دفتر"]
items.append("كتاب")
first = items[0]

user = {"name": "ليان", "points": 10}
user["points"] += 5
safe = user.get("level", "مبتدئ")
```
`list` مرتبة وقابلة للتعديل. `dict` يربط مفتاحاً بقيمة.

== الدوال
```python
def average(values):
    if not values:
        return 0
    return sum(values) / len(values)

print(average([70, 80, 90]))
```
اكتب دوال صغيرة باسم فعل واضح، وأعد قيمة بدلاً من الطباعة داخل منطق قابل لإعادة الاستخدام.
],
[
== النصوص والفهم
```python
text = "Learn Python"
text.lower(); text.split()
evens = [n for n in range(10) if n % 2 == 0]
```
السلاسل غير قابلة للتعديل؛ أنشئ نصاً جديداً. صيغة `f"{value}"` أوضح لتنسيق النص.

== الأخطاء والملفات
```python
from pathlib import Path

try:
    number = int(value)
except ValueError:
    number = 0

Path("note.txt").write_text("مرحبا", encoding="utf-8")
text = Path("note.txt").read_text(encoding="utf-8")
```
التقط الخطأ المحدد فقط، واستخدم `with open(...)` أو `Path` للملفات.

== JSON وواجهات API
```python
import json
raw = json.dumps({"done": True}, ensure_ascii=False)
data = json.loads(raw)

# لا تضع مفاتيح API في مستودع عام.
```
افحص رموز HTTP: `2xx` نجاح، و`4xx` مشكلة طلب، و`5xx` مشكلة خدمة. اضبط مهلة للاتصال.

== كائنات ومكتبات
```python
class Course:
    def __init__(self, title):
        self.title = title

from math import sqrt
print(sqrt(81))
```
استخدم الكائن عند وجود حالة وسلوك مترابطين. افصل تبعياتك في وحدات صغيرة.

== قائمة مراجعة
1. اسم واضح. 2. اختبار حالة فارغة. 3. رسالة خطأ مفهومة. 4. ملف UTF-8. 5. لا أسرار في الكود.
]
)
