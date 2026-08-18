// معاينة محلية فقط: تسمح لنفق الاختبار بعرض موقع GitHub Pages الثابت.
import { defineConfig } from 'vite';

export default defineConfig({
  server: { allowedHosts: true }
});
