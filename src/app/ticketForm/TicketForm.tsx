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
  status?: string
}

export function TicketForm() {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    upi_id: "",
    name: "",
    email: "",
    number: "",
    status: "pending",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const isValidUPI = (upi: string) => /^[\w.-]+@[\w.-]+$/.test(upi)

  const handlePayment = async (e: React.FormEvent) => {
  e.preventDefault()

  if (isSubmitting) return // prevent double submission
  setIsSubmitting(true)

  if (!isValidUPI(userDetails.upi_id)) {
    alert("Please enter a valid UPI ID (e.g., username@bank)")
    setIsSubmitting(false)
    return
  }

  // ✅ Check if name already exists
  const { data: existingUser, error: checkError } = await supabase
    .from("upi")
    .select("id")
    .eq("name", userDetails.name)

  if (checkError) {
    console.error("Supabase query error:", checkError.message)
    alert("Something went wrong. Please try again.")
    setIsSubmitting(false)
    return
  }

  if (existingUser && existingUser.length > 0) {
    alert("This name is already used. Please use a different one.")
    setIsSubmitting(false)
    return
  }

  try {
    const { data, error } = await supabase.from("upi").insert([userDetails])

    if (error) {
      if (error.code === "23505") {
        alert("This name is already registered.")
      } else {
        console.error("Supabase insert error:", error.message)
        alert("Something went wrong. Please try again.")
      }
      setIsSubmitting(false)
      return
    }

    console.log("Inserted:", data)
    alert("Form submitted successfully!")

    setUserDetails({
      upi_id: "",
      name: "",
      email: "",
      number: "",
      status: "pending",
    })
  } catch (err) {
    console.error("Unexpected error:", err)
    alert("Unexpected error occurred")
  } finally {
    setIsSubmitting(false)
  }
}

  return (
    <div className="MainTicketContainer">
      <Image
        src="/vipraqr2.jpeg"
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
            <button type="submit" className="payButton" disabled={isSubmitting}>
  {isSubmitting ? "Submitting..." : "Fill the form after payment"}
</button>
          </form>
        </div>
      </div>
    </div>
  )
}
