import nodemailer from 'nodemailer'
import sharp from 'sharp'
import { renderTicketWithQR } from './renderTicket'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface TicketData {
  ticketId: string
  eventName: string
  eventDate: string
  eventVenue: string
  userName: string
  userEmail: string
  qrCode: string
  amount: number
}

export async function sendTicketEmail(ticketData: TicketData) {
  // Generate ticket image with name + QR on the template
  console.log(ticketData.userName)
  const ticketBuffer = await renderTicketWithQR({
    userName: ticketData.userName,
    qrCodeBase64: ticketData.qrCode,
  })

  // --- Compress the ticket image (resize slightly and reduce PNG size) ---
  const compressedBuffer = await sharp(ticketBuffer)
    .resize({ width: 600 }) // adjust size (original probably ~1200px?)
    .png({ quality: 80, compressionLevel: 8 }) // visible but smaller
    .toBuffer()

  // Email body with inline image (embedded)
  const htmlContent = `
    <p>Hi ${ticketData.userName},</p>
    <p>Here's your event ticket for <strong>${ticketData.eventName}</strong>.</p>
    <p>Please present this at the venue:</p>
    <img src="cid:finalTicket" alt="Your Ticket" style="max-width: 100%; border: 1px solid #ccc;" />
  `

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: ticketData.userEmail,
    subject: `🎟️ Your Ticket for ${ticketData.eventName}`,
    html: htmlContent,
    attachments: [
      {
        filename: 'ticket.png',
        content: compressedBuffer,  // compressed image
        cid: 'finalTicket',         // <img src="cid:finalTicket" />
        contentType: 'image/png',
      },
    ],
  }

  await transporter.sendMail(mailOptions)
}
