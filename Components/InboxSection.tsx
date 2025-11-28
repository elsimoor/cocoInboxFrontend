"use client"

import React, { useState, useEffect } from "react"
import { Inbox, RefreshCw } from "lucide-react"
import { useMessages } from "@/hooks/useMessages"
import { EmailItem } from "./EmailItem"
import { Message } from "@/types"

const MESSAGES_PER_PAGE = 3

export const InboxSection: React.FC = () => {
  const { messages, loading, error, fetchMessages } = useMessages()
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    setCurrentPage(1)
    setExpandedIndex(null)
  }, [messages])

  const sortedMessages = messages.slice().sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0
    const dateB = b.date ? new Date(b.date).getTime() : 0
    return dateB - dateA
  })

  const totalPages = Math.ceil(sortedMessages.length / MESSAGES_PER_PAGE)
  const startIndex = (currentPage - 1) * MESSAGES_PER_PAGE
  const paginated = sortedMessages.slice(startIndex, startIndex + MESSAGES_PER_PAGE)

  const handleDelete = (uid: number | string) => {
    console.log("Delete message:", uid)
  }

  return (
    <section id="inbox" className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Your Inbox</h1>
          <p className="text-lg text-[var(--text-muted)]">
            All emails sent to your temporary address appear here
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[var(--text-muted)]">Loading messages...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 flex items-center gap-4">
            <span className="text-2xl">⚠️</span>
            <p className="text-red-800">{error}</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-black mb-2">No messages yet</h3>
            <p className="text-[var(--text-muted)]">
              Messages sent to your mailbox will appear here
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-[var(--shadow-inbox)] border-[3px] border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[var(--color-primary-hover)] transition-colors">
                  <Inbox className="w-4 h-4" />
                  <span>Inbox</span>
                  {messages.length > 0 && (
                    <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {messages.length}
                    </span>
                  )}
                </button>
              </div>
              <button
                onClick={fetchMessages}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-[var(--text-secondary)]"
                title="Refresh inbox"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {paginated.map((msg, index) => (
                <EmailItem
                  key={typeof msg.uid !== "undefined" ? String(msg.uid) : String(startIndex + index)}
                  msg={msg}
                  index={startIndex + index}
                  isExpanded={expandedIndex === index}
                  onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1)
                      setExpandedIndex(null)
                    }
                  }}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-semibold hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <span className="text-sm font-semibold text-[var(--color-primary)]">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => {
                    if (currentPage < totalPages) {
                      setCurrentPage(currentPage + 1)
                      setExpandedIndex(null)
                    }
                  }}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-semibold hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}