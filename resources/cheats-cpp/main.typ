// منصة السبتاني — مرجع C++ سريع؛ تصميم ملف منفصل من صفحة إلى صفحتين.
#import "report-theme.typ": report-accent
#set page(margin: (x: 1.2cm, y: 1.1cm), numbering: "1 / 1")
#set text(font: "Noto Sans Arabic", lang: "ar", size: 8.5pt)
#set par(leading: .78em, spacing: .42em)
#show heading: it => block(above: .7em, below: .35em, fill: rgb("fff4e5"), inset: 5pt, radius: 0pt, text(weight: "bold", fill: report-accent, it.body))

#align(center)[#text(size: 20pt, weight: "bold", fill: report-accent)[ملخص C++ السريع] #linebreak() #text(size: 9pt)[منصة السبتاني — المهندس محمد عادل السبتاني]]
#grid(columns: (1fr, 1fr), gutter: 11pt,
[
== البرنامج والأساسيات
```cpp
#include <iostream>
int main() {
  int count = 3;
  double price = 9.5;
  std::cout << count << "\\n";
}
```
استعمل `const` للقيم غير المتغيرة، و`auto` عندما يكون النوع واضحاً من التعبير.

== الشرط والحلقات
```cpp
if (score >= 60) { pass = true; }
for (int i = 0; i < 5; ++i) { /*...*/ }
while (ready) { /*...*/ }
```
ضع الأقواس حتى في الفروع القصيرة لتقليل الأخطاء لاحقاً.

== الدوال والمراجع
```cpp
int square(int value) { return value * value; }
void add_point(int& points) { ++points; }
void print(const std::string& name) { std::cout << name; }
```
مرّر الكائنات الكبيرة بـ `const &` إن لم تُعدّلها.

== vector وstring
```cpp
#include <vector>
std::vector<int> scores{70, 80};
scores.push_back(90);
for (int s : scores) std::cout << s;
```
استخدم `at` عند الحاجة إلى فحص الحدود، و`size_t` للفهارس.
],
[
== الأصناف
```cpp
class Course {
  std::string title;
public:
  Course(std::string t) : title(std::move(t)) {}
  const std::string& get_title() const { return title; }
};
```
اجعل الحالة خاصة (private) وقدم واجهة صغيرة ثابتة.

== الملفات وRAII
```cpp
#include <fstream>
std::ofstream out("note.txt");
if (!out) throw std::runtime_error("open failed");
out << "hello"; // يغلق تلقائياً عند نهاية النطاق
```
RAII يحرر الملف أو الذاكرة أو القفل تلقائياً عند الخروج من النطاق.

== القوالب والاستثناءات
```cpp
template<class T> T larger(T a, T b) { return a > b ? a : b; }
if (denominator == 0) throw std::invalid_argument("zero");
try { /* عمل */ }
catch (const std::exception& e) { std::cerr << e.what(); }
```

== ملكية الذاكرة
```cpp
#include <memory>
auto item = std::make_unique<int>(7);
```
فضّل الحاويات والكائنات المحلية و`unique_ptr` على `new` و`delete` اليدويين.

== قائمة مراجعة
1. تحذيرات المترجم مفعلة. 2. لا مؤشرات معلقة. 3. نطاقات صالحة. 4. أخطاء واضحة. 5. اختبر القيم الفارغة والحواف.
]
)
