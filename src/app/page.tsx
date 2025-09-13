'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Profile = { id: string; name: string | null; created_at: string }

export default function Home() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setError(null)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setProfiles((data ?? []) as Profile[])
  }

  const add = async () => {
    if (!name.trim()) return
    setLoading(true)
    setError(null)
    const { error } = await supabase.from('profiles').insert({ name })
    setLoading(false)
    if (error) setError(error.message)
    else {
      setName('')
      load()
    }
  }

  useEffect(() => {
    load()
    const sub = supabase
      .channel('profiles-inserts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'profiles' }, () => load())
      .subscribe()
    return () => { supabase.removeChannel(sub) }
  }, [])

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Supabase × Next.js (محلي)</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border rounded p-2 flex-1"
          placeholder="اكتب اسمًا…"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={add}
          disabled={loading}
          className="rounded px-4 py-2 bg-black text-white disabled:opacity-50"
        >
          {loading ? 'جاري الإضافة…' : 'إضافة'}
        </button>
      </div>
      {error && <p className="text-red-600 mb-3">خطأ: {error}</p>}
      <ul className="space-y-2">
        {profiles.map((p) => (
          <li key={p.id} className="border rounded p-3">
            <div className="font-semibold">{p.name ?? '—'}</div>
            <div className="text-sm opacity-70">{new Date(p.created_at).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </main>
  )
}
