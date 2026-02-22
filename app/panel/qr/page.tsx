'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import QRCode from 'qrcode'

export default function QRSayfasi() {
  const [url, setUrl] = useState('https://piercingconnect.vercel.app')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('panel_auth') !== 'true') {
      router.push('/panel/giris')
    }
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 280,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' }
      }, (err) => {
        if (!err && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d')
          if (ctx) {
            const size = 60
            const x = (280 - size) / 2
            const y = (280 - size) / 2
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(x - 5, y - 5, size + 10, size + 10)
            ctx.fillStyle = '#000000'
            ctx.font = 'bold 52px serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText('Y', 140, 140)
          }
        }
      })
    }
  }, [url])

  const indir = () => {
    if (canvasRef.current) {
      const link = document.createElement('a')
      link.download = 'yalovaink-qr.png'
      link.href = canvasRef.current.toDataURL()
      link.click()
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="w-full max-w-sm mx-auto text-center">
        <a href="/panel" className="text-orange-400 text-lg mb-6 block text-left">Geri</a>
        <h1 className="text-2xl font-bold text-white mb-6">QR Kod Olustur</h1>

        <div className="bg-white p-4 rounded-2xl inline-block mb-6">
          <canvas ref={canvasRef} />
        </div>

        <div className="mb-4">
          <label className="text-gray-300 text-base mb-2 block text-left">QR Kod URL</label>
          <input
            type="text"
            value={url}
            className="w-full bg-gray-800 text-white text-base p-4 rounded-2xl outline-none"
            onChange={e => setUrl(e.target.value)}
          />
        </div>

        <button onClick={indir} className="bg-orange-500 text-white text-xl font-bold py-5 rounded-2xl w-full">
          QR Kodu Indir
        </button>
      </div>
    </main>
  )
}