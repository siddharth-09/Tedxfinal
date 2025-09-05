import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Event {
  id: string
  name: string
  description: string
  date: string
  venue: string
  price: number
  max_tickets: number
  available_tickets: number
  created_at: string
}

export interface Ticket {
  id: string
  event_id: string
  user_email: string
  user_name: string
  user_phone: string
  ticket_id: string
  qr_code: string
  payment_id: string
  amount: number
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
  event?: Event
}