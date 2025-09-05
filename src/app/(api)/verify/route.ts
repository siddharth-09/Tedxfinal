/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { supabase } from '../../../../lib/supabase' 
import { generateTicketId, generateQRCode } from '../../../utils/qrGeneration' 
import { sendTicketEmail } from '../../../utils/sendTicket' 

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      eventId,
      userDetails 
    } = body

    // Verify payment signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest("hex")

    if (razorpay_signature !== expectedSign) {
      return NextResponse.json(
        { success: false, message: "Invalid payment signature" },
        { status: 400 }
      )
    }

    // Get event details
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single()

    if (eventError || !event) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      )
    }

    // Check ticket availability
    if (event.available_tickets <= 0) {
      return NextResponse.json(
        { success: false, message: "No tickets available" },
        { status: 400 }
      )
    }

    // Generate ticket
    const ticketId = generateTicketId()
    const qrData = JSON.stringify({
      ticketId,
      eventId,
      eventName: event.name,
      userEmail: userDetails.email,
      timestamp: Date.now()
    })
    const qrCode = await generateQRCode(qrData)

    // Save ticket to database
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .insert({
        event_id: eventId,
        user_email: userDetails.email,
        user_name: userDetails.name,
        user_phone: userDetails.phone,
        ticket_id: ticketId,
        qr_code: qrCode,
        payment_id: razorpay_payment_id,
        amount: event.price,
        status: 'confirmed'
      })
      .select()
      .single()

    if (ticketError) {
      return NextResponse.json(
        { success: false, message: "Failed to create ticket" },
        { status: 500 }
      )
    }

    // Update available tickets
    await supabase
      .from('events')
      .update({ available_tickets: event.available_tickets - 1 })
      .eq('id', eventId)

    // Send email with ticket
    await sendTicketEmail({
      ticketId,
      eventName: event.name,
      eventDate: event.date,
      eventVenue: event.venue,
      userName: userDetails.name,
      userEmail: userDetails.email,
      qrCode,
      amount: event.price
    })

    return NextResponse.json({
      success: true,
      message: "Payment verified and ticket sent",
      ticketId
    })

  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}