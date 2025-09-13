import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Supabase × Next.js (local)',
  description: 'Starter wired to local Supabase',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
