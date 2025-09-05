import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { supabase } from '../../../../lib/supabase'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET || process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
})

export async function POST(request: NextRequest) {
  try {

    
    const { eventId, userDetails } = await request.json()

    // Get event details
    const { data: event, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single()

    if (error || !event) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      )
    }

    if (event.available_tickets <= 0) {
      return NextResponse.json(
        { success: false, message: "No tickets available" },
        { status: 400 }
      )
    }

    // Create Razorpay order
    const options = {
      amount: event.price * 100, // Amount in paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        eventId,
        eventName: event.name,
        userEmail: userDetails.email,
        userName: userDetails.name
      }
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      event
    })

  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { success: false, message: "Failed to create order" },
      { status: 500 }
    )
  }
}