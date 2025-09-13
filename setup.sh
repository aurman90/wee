#!/bin/bash
# 🚀 إعداد مشروع Next.js مع Supabase محليًا

# 1) فك ضغط الملف (لو ما انعمل قبل)
unzip -o my-supa-app.zip -d ./

# 2) دخول مجلد المشروع
cd my-supa-app || { echo "❌ المجلد غير موجود"; exit 1; }

# 3) إنشاء ملف البيئة .env.local
cp -n .env.local.example .env.local

# 4) جلب قيم Supabase المحلية تلقائيًا
API_URL=$(supabase status --local | grep "API URL" | awk '{print $3}')
ANON_KEY=$(supabase status --local | grep "anon key" -A1 | tail -n1 | xargs)

# تحديث القيم داخل .env.local
sed -i "s|NEXT_PUBLIC_SUPABASE_URL=.*|NEXT_PUBLIC_SUPABASE_URL=$API_URL|" .env.local
sed -i "s|NEXT_PUBLIC_SUPABASE_ANON_KEY=.*|NEXT_PUBLIC_SUPABASE_ANON_KEY=$ANON_KEY|" .env.local

echo "✅ تم تحديث ملف .env.local بالقيم التالية:"
echo "URL: $API_URL"
echo "ANON_KEY: $ANON_KEY"

# 5) تثبيت الحزم
npm install

# 6) تشغيل المشروع
npm run dev

