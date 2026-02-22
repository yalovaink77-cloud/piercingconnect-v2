'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PanelGiris() {
  const [sifre, setSifre] = useState('')
  const [hata, setHata] = useState('')
  const router = useRouter()

  const handleGiris = () => {
    if (sifre === 'yalovaink2024') {
      localStorage.setItem('panel_auth', 'true')
      router.push('/panel')
    } else {
      setHata('Sifre yanlis, tekrar deneyin')
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white mb-2 text-center">Isletme Paneli</h1>
        <p className="text-gray-400 mb-8 text-center">Giris yapmak icin sifrenizi girin</p>

        {hata && <p className="text-red-400 mb-4 text-center">{hata}</p>}

        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Sifre"
            className="w-full bg-gray-800 text-white text-lg p-4 rounded-2xl outline-none"
            onChange={e => setSifre(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleGiris()}
          />
          <button
            onClick={handleGiris}
            className="bg-orange-500 text-white text-xl font-bold py-5 rounded-2xl"
          >
            Giris Yap
          </button>
        </div>
      </div>
    </main>
  )
}