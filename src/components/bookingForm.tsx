/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { supabase } from '../../lib/supabase'
import { useState } from 'react'

interface Event {
  id: string
  name: string
  description: string
  date: string
  venue: string
  price: number
  available_tickets: number
}

interface BookingFormProps {
  event: Event
}

interface UserDetails {
  name: string
  email: string
  phone: string
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function BookingForm({ event }: BookingFormProps) {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    email: '',
    phone: ''
  })


  
  const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!;
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handlePayment = async () => {
    if (!userDetails.name || !userDetails.email || !userDetails.phone) {
      setMessage('Please fill all fields')
      return
    }
    const {data} = await supabase.from("tickets").select("*").eq("user_name",userDetails.name).eq("user_email",userDetails.email);
    console.log(data)
    if(data?.length != 0 ){
      setMessage("Name already exist");
      return
    }
    setLoading(true)
    setMessage('')

    try {
      // Create order
      const orderResponse = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          userDetails
        })
      })

      const orderData = await orderResponse.json()

      if (!orderData.success) {
        throw new Error(orderData.message)
      }

      // Initialize Razorpay payment
      const options = {
        key: key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'TEDx Event',
        description: `Ticket for ${event.name}`,
        order_id: orderData.orderId,
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone
        },
        theme: {
          color: '#ff6b6b'
        },
        handler: async function (response: any) {
          // Verify payment
          const verifyResponse = await fetch('/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              eventId: event.id,
              userDetails
            })
          })

          const verifyData = await verifyResponse.json()

          if (verifyData.success) {
            setMessage('Payment successful! Your ticket has been sent to your email.')
          } else {
            setMessage('Payment verification failed. Please contact support.')
          }
          setLoading(false)
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
            setMessage('Payment cancelled')
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()

    } catch (error) {
      console.error('Payment error:', error)
      setMessage(error instanceof Error ? error.message : 'Payment failed')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{event.name}</h2>
      <div className="mb-4">
        <p className="text-gray-600">{event.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          📅 {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500">📍 {event.venue}</p>
        <p className="text-lg font-bold text-green-600 mt-2">₹{event.price}</p>
        <p className="text-sm text-orange-500">
          {event.available_tickets} tickets available
        </p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={userDetails.name}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={userDetails.email}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={userDetails.phone}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          onClick={handlePayment}
          disabled={loading || event.available_tickets <= 0}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
        >
          {loading ? 'Processing...' : `Book Ticket - ₹${event.price}`}
        </button>

        {message && (
          <div className={`p-3 rounded-md text-center ${
            message.includes('successful') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}