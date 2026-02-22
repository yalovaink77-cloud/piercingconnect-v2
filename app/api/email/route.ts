import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { to, subject, message } = await request.json()

  try {
    await resend.emails.send({
      from: 'Yalova Ink <onboarding@resend.dev>',
      to,
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #f97316;">Yalova Ink</h2>
          <p>${message}</p>
          <hr/>
          <p style="color: #999; font-size: 12px;">Bu mesaj Yalova Ink tarafindan gonderilmistir.</p>
        </div>
      `
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Email gonderilemedi' }, { status: 500 })
  }
}