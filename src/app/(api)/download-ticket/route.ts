import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'
import { renderTicketWithQR } from '../../../utils/renderTicket'
import sharp from 'sharp'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ticketId } = body

    if (!ticketId) {
      return NextResponse.json(
        { success: false, message: "Ticket ID is required" },
        { status: 400 }
      )
    }

    // Fetch ticket details from database
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .select(`
        *,
        events (
          name,
          date,
          venue
        )
      `)
      .eq('ticket_id', ticketId)
      .eq('status', 'confirmed')
      .single()

    if (ticketError || !ticket) {
      return NextResponse.json(
        { success: false, message: "Ticket not found" },
        { status: 404 }
      )
    }

    // Generate ticket image with QR code
    const ticketBuffer = await renderTicketWithQR({
      userName: ticket.user_name,
      qrCodeBase64: ticket.qr_code,
    })

    // Compress the ticket image for download
    const compressedBuffer = await sharp(ticketBuffer)
      .resize({ width: 800 }) // Good quality for download
      .png({ quality: 90, compressionLevel: 6 })
      .toBuffer()

    // Return the image as a downloadable file
    return new NextResponse(new Uint8Array(compressedBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="ticket-${ticketId}.png"`,
        'Content-Length': compressedBuffer.length.toString(),
      },
    })

  } catch (error) {
    console.error('Download ticket error:', error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}