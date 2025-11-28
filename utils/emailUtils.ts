import { Message } from "@/types"

export const getInitials = (from: string): string => {
  if (!from) return "??"
  const emailMatch = from.match(/<(.+)>/)
  const email = emailMatch ? emailMatch[1] : from
  const nameMatch = from.match(/^(.+?)\s*</)
  let name = nameMatch ? nameMatch[1] : email.split("@")[0]
  
  name = name.replace(/^["']|["']$/g, '').trim()
  
  const parts = name.split(/[\s._-]+/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

export const formatTime = (date: any): string => {
  if (!date) return ""
  const d = new Date(date)
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
}

export const getPreviewText = (msg: Message): string => {
  if (msg.text) {
    return msg.text.substring(0, 100).replace(/\n/g, " ").trim()
  }
  if (msg.html) {
    const text = msg.html.replace(/<[^>]*>/g, "").substring(0, 100)
    return text.trim()
  }
  return ""
}

export const getSenderName = (from: string): string => {
  if (!from) return "Unknown"
  const nameMatch = from.match(/^(.+?)\s*</)
  if (nameMatch) return nameMatch[1]
  const emailMatch = from.match(/<(.+)>/)
  if (emailMatch) return emailMatch[1].split("@")[0]
  return from.split("@")[0]
}