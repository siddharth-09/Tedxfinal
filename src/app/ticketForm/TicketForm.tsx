/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { supabase } from "../../../lib/supabase"
import { useState } from "react"
import Image from "next/image"

interface UserDetails {
  upi_id: string
  name: string
  email: string
  number: string
}

export function TicketForm() {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    upi_id: "",
    name: "",
    email: "",
    number: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const isValidUPI = (upi: string) => /^[\w.-]+@[\w.-]+$/.test(upi)

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault() // ✅ prevent refresh

    if (!isValidUPI(userDetails.upi_id)) {
      alert("Please enter a valid UPI ID (e.g., username@bank)")
      return
    }

    try {
      const { data, error } = await supabase.from("upi").insert([userDetails])

      if (error) {
        console.error("Supabase insert error:", error.message)
        alert("Something went wrong. Please try again.")
        return
      }

      console.log("Inserted:", data)
      alert("Form submitted successfully!")
      setUserDetails({
        upi_id: "",
        name: "",
        email: "",
        number: "",
      })
    } catch (err) {
      console.error("Unexpected error:", err)
      alert("Unexpected error occurred")
    }
  }

  return (
    <div className="MainTicketContainer">
      <Image
        src="/dhyaniqr.jpg"
        width={1000}
        height={1000}
        alt="QR Code"
        className="qrcode"
      />
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
              name="number"
              placeholder="Phone number"
              value={userDetails.number}
              onChange={handleInputChange}
              className="ticketInput"
              required
            />
            <input
              type="text"
              name="upi_id"
              placeholder="UPI ID"
              value={userDetails.upi_id}
              onChange={handleInputChange}
              className="ticketInput"
              required
            />
            <button type="submit" className="payButton">
              Fill the form after payment
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
