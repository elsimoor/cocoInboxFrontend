"use client"

import React from "react"
import { Body } from "@react-email/body"
import { Check, Trash2, ChevronDown } from "lucide-react"
import { Message } from "@/types"
import { getInitials, getSenderName, formatTime, getPreviewText } from "@/utils/emailUtils"

interface EmailItemProps {
  msg: Message
  index: number
  isExpanded: boolean
  onToggle: () => void
  onDelete?: (uid: number | string) => void
}

export const EmailItem: React.FC<EmailItemProps> = ({
  msg,
  index,
  isExpanded,
  onToggle,
  onDelete
}) => {
  const senderName = getSenderName(msg.from || "")
  const initials = getInitials(msg.from || "")
  const preview = getPreviewText(msg)
  const time = formatTime(msg.date)
  const messageKey = typeof msg.uid !== "undefined" ? msg.uid : index

  return (
    <div
      className={`transition-all ${isExpanded ? "bg-gray-50" : "hover:bg-gray-50"}`}
    >
      <div
        className="px-6 py-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-start gap-4">
          
          <div className="flex-shrink-0">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm"
              style={{ background: 'var(--brand-gradient)' }}
            >
              {initials}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-1">
              <div className="flex-1 min-w-0">
                <div className="font-bold text-black text-base mb-1">{senderName}</div>
                <div className="font-bold text-black text-sm mb-1">{msg.subject || "(No subject)"}</div>
                {preview && (
                  <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-2">{preview}</p>
                )}
                {!isExpanded && preview && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggle()
                    }}
                    className="text-[var(--color-primary)] text-sm font-medium flex items-center gap-1 hover:underline"
                  >
                    Read more
                    <ChevronDown className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Right Side: Time, Status, Delete */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-sm text-[var(--text-muted)] whitespace-nowrap">{time}</span>
                <div className="w-5 h-5 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (onDelete && msg.uid) {
                      onDelete(msg.uid)
                    }
                  }}
                  className="p-1 rounded hover:bg-gray-200 transition-colors text-[var(--text-muted)]"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 pt-0 border-t border-gray-100 bg-white">
          <div className="ml-16 mt-4">
            <Body
              style={{
                backgroundColor: "#ffffff",
                color: "#334155",
                padding: "16px",
                lineHeight: "1.6",
                fontSize: "14px",
              }}
            >
              {msg.html ? (
                <div dangerouslySetInnerHTML={{ __html: msg.html }} />
              ) : msg.text ? (
                <div className="whitespace-pre-wrap">{msg.text}</div>
              ) : (
                "(No content)"
              )}

              {msg.attachments && msg.attachments.length > 0 && (
                <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                  <strong className="text-yellow-900">📎 Attachments:</strong>
                  <ul className="mt-2 space-y-2">
                    {msg.attachments.map((att, i) => (
                      <li key={i} className="text-sm">
                        {att.content && att.contentType && att.contentType.startsWith("image/") ? (
                          <>
                            <img
                              src={`data:${att.contentType};base64,${att.content}`}
                              alt={att.filename}
                              className="max-w-full mb-2 rounded-lg"
                            />
                            <br />
                            <a
                              href={`data:${att.contentType};base64,${att.content}`}
                              download={att.filename}
                              className="text-[var(--color-primary)] hover:underline"
                            >
                              {att.filename} (download)
                            </a>
                          </>
                        ) : att.content && att.contentType === "application/pdf" ? (
                          <>
                            <embed
                              src={`data:${att.contentType};base64,${att.content}`}
                              type="application/pdf"
                              width="100%"
                              height="400px"
                              className="mb-2 rounded-lg"
                            />
                            <br />
                            <a
                              href={`data:${att.contentType};base64,${att.content}`}
                              download={att.filename}
                              className="text-[var(--color-primary)] hover:underline"
                            >
                              {att.filename} (download)
                            </a>
                          </>
                        ) : (
                          <a
                            href={
                              att.content && att.contentType
                                ? `data:${att.contentType};base64,${att.content}`
                                : "#"
                            }
                            download={att.filename}
                            className="text-[var(--color-primary)] hover:underline"
                          >
                            {att.filename}
                          </a>
                        )}{" "}
                        {att.size ? `(${Math.round((att.size || 0) / 1024)} KB)` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Body>
          </div>
        </div>
      )}
    </div>
  )
}