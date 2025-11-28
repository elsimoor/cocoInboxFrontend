import { useState, useEffect } from "react"
import { Message } from "@/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3009"

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMessages = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/api/get-all`)
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || "Failed to fetch messages")
      }
      const data = await res.json()
      const msgs = data && Array.isArray(data.messages) ? data.messages : []
      setMessages(msgs)
    } catch (err: any) {
      setError(err.message || "Failed to fetch messages")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return { messages, loading, error, fetchMessages, setMessages }
}