
# my-supa-app (Next.js + Supabase local)

## المتطلبات
- Node.js + npm
- Supabase CLI يعمل محليًا: `supabase start`
- Docker شغال

## الإعداد
1) انسخ ملف البيئة:
```
cp .env.local.example .env.local
```
ضع القيم من:
```
supabase status --local
```
- `NEXT_PUBLIC_SUPABASE_URL` = رابط API (عادة http://127.0.0.1:54321)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon key

2) تثبيت الحزم:
```
npm install
```

3) تشغيل المشروع:
```
npm run dev
```
ثم افتح http://localhost:3000

## ملاحظة
للتجربة، أنشئ جدول `profiles` في مشروع Supabase المحلي عبر:

```
supabase migration new create_profiles
```
ثم داخل ملف المايجريشن:
```sql
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  name text,
  created_at timestamptz default now()
);
```
ادفع التغييرات:
```
supabase db push
```

الصفحة الرئيسية تعرض قائمة `profiles` وتسمح بإضافة أسماء.
