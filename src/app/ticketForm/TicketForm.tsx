/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { supabase } from "../../../lib/supabase" 
import { useEffect, useState } from 'react'
import Script from "next/script"

declare global {
  interface Window {
    Razorpay: any
  }
}

interface Event {
  id: string
  name: string
  description: string
  date: string
  venue: string
  price: number
  available_tickets: number
}

interface UserDetails {
  name: string
  email: string
  phone: string
}

export function TicketForm() {
  const [event, setEvent] = useState<Event | null>(null)
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    email: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [ticketId, setTicketId] = useState<string | null>(null)
  const [downloadLoading, setDownloadLoading] = useState(false)
  const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!

  // Fetch the only event
  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })

      if (error) {
        console.error('Error fetching event:', error)
        return
      }
      if (data && data.length > 0) {
        setEvent(data[0])
      }
    }

    fetchEvent()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const downloadTicket = async () => {
    if (!ticketId) return

    setDownloadLoading(true)
    try {
      const response = await fetch('/download-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId })
      })

      if (!response.ok) {
        throw new Error('Failed to download ticket')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `TEDXSVIT-TICKETS.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Failed to download ticket. Please try again.')
    } finally {
      setDownloadLoading(false)
    }
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!event) return

    if (!userDetails.name || !userDetails.email || !userDetails.phone) {
      setMessage('Please fill all fields')
      return
    }

    const { data } = await supabase
      .from("tickets")
      .select("*")
      .eq("user_name", userDetails.name)
      .eq("user_email", userDetails.email)

    if (data?.length !== 0) {
      setMessage("Name already exists")
      return
    }

    setLoading(true)
    setMessage('')
    setTicketId(null) // Reset ticket ID

    try {
      const orderResponse = await fetch('/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: event.id, userDetails })
      })

      const orderData = await orderResponse.json()
      if (!orderData.success) throw new Error(orderData.message)

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
        theme: { color: '#ff6b6b' },
        handler: async function (response: any) {
          const verifyResponse = await fetch('/verify', {
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
            setTicketId(verifyData.ticketId) // Store ticket ID for download
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
      setMessage(error instanceof Error ? error.message : 'Payment failed')
      setLoading(false)
    }
  }

  return (
    <div className="MainTicketContainer">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="ticketContainer">
        <h1 className="TicketNowTitle">Get Your Tickets Now!</h1>
        <div className="MainForm">
          <form className="ticketForm" onSubmit={handlePayment}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userDetails.name}
              onChange={handleInputChange}
              className="ticketInput"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userDetails.email}
              onChange={handleInputChange}
              className="ticketInput"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={userDetails.phone}
              onChange={handleInputChange}
              className="ticketInput"
              required
            />
            <button
              type="submit"
              className="payButton"
              disabled={loading || (!!event && event.available_tickets <= 0)}
            >
              {loading
                ? 'Processing...'
                : event
                  ? `Pay Now`
                  : 'Loading event...'}
            </button>
            
            {/* Download button - only show after successful payment */}
            {ticketId && (
              <button
                type="button"
                onClick={downloadTicket}
                className="downloadButton"
                disabled={downloadLoading}
                style={{
                  marginTop: '10px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '5px',
                  cursor: downloadLoading ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  opacity: downloadLoading ? 0.6 : 1
                }}
              >
                {downloadLoading ? 'Downloading...' : '📥 Download Ticket'}
              </button>
            )}

            {message && (
              <div
                style={{
                  marginTop: "10px",
                  padding: "8px",
                  borderRadius: "5px",
                  textAlign: "center",
                  backgroundColor: message.includes('successful') ? '#d1fae5' : '#fee2e2',
                  color: message.includes('successful') ? '#065f46' : '#b91c1c'
                }}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}