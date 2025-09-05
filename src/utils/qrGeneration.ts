import QRCode from 'qrcode'
import { randomBytes } from 'crypto'

export function generateTicketId(): string {
  const timestamp = Date.now().toString(36)
  const randomPart = randomBytes(4).toString('hex').toUpperCase()
  return `TIX-${timestamp}-${randomPart}`
}

export async function generateQRCode(data: string): Promise<string> {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(data, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })
    
    // Return base64 string without data URL prefix
    return qrCodeDataUrl.split(',')[1]
  } catch (error) {
    console.error('QR Code generation error:', error)
    throw new Error('Failed to generate QR code')
  }
}