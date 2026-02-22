'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Giris() {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleGiris = async () => {
    if (!phone) {
      setError('Telefon numarasi zorunludur')
      return
    }
    setLoading(true)
    setError('')
    const { data } = await supabase
      .from('customers')
      .select('*')
      .eq('phone', phone)
      .single()

    if (data) {
      localStorage.setItem('customer_id', data.id)
      localStorage.setItem('customer_name', data.name)
      router.push('/hesabim')
    } else {
      setError('Bu telefon numarasi kayitli degil. Lutfen once kayit olun.')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="w-full max-w-sm mx-auto">
        <a href="/" className="text-orange-400 text-lg mb-6 block">Geri</a>
        <h1 className="text-2xl font-bold text-white mb-2">Giris Yap</h1>
        <p className="text-gray-400 mb-6">Hizmet gecmisinizi ve bildirimlerinizi gorun</p>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-gray-300 text-base mb-2 block">Telefon Numaraniz</label>
            <input
              type="tel"
              placeholder="05XX XXX XX XX"
              className="w-full bg-gray-800 text-white text-lg p-4 rounded-2xl outline-none"
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <button
            onClick={handleGiris}
            disabled={loading}
            className="bg-orange-500 text-white text-xl font-bold py-5 rounded-2xl"
          >
            {loading ? 'Kontrol ediliyor...' : 'Giris Yap'}
          </button>
          <div className="text-center">
            <p className="text-gray-500 text-base">Hesabiniz yok mu?</p>
            <a href="/kayit" className="text-orange-400 text-lg font-semibold">Kayit Ol</a>
          </div>
        </div>
      </div>
    </main>
  )
}