"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X, ChevronDown, MessageCircle } from "lucide-react"
import { PromptInputBox } from "./ai-prompt-box"
import { LiquidButton, GlassFilter } from "@/components/ui/liquid-glass-button"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  time: string
}

const SUGGESTED = [
  "What is 4D Liposculpture?",
  "How to book a consultation?",
  "Rhinoplasty recovery time?",
  "Is Botox painful?",
]

const BOT_RESPONSES: Record<string, string> = {
  default:
    "Thank you for your question! Dr. Usman's team will get back to you shortly. For immediate assistance, please reach out via WhatsApp.",
  book:
    "To book a consultation with Dr. Usman, tap the WhatsApp button above or call our clinic directly. We have locations in Al Khobar and Dammam — available 6 days a week.",
  lipo:
    "4D Liposculpture is Dr. Usman's signature procedure. Unlike traditional liposuction, it sculpts both fat and the underlying muscle for a naturally toned, athletic result — visible even at rest. Recovery is typically 7 days.",
  rhino:
    "Rhinoplasty recovery with Dr. Usman averages 10–14 days before returning to daily life. Most swelling resolves within 3–4 weeks, and the final refined result is visible at 3–6 months.",
  botox:
    "Botox with Dr. Usman is virtually painless — a series of micro-injections that take under 15 minutes. Results appear in 3–5 days and last 4–6 months. No downtime required.",
}

function getResponse(msg: string) {
  const lower = msg.toLowerCase()
  if (lower.includes("book") || lower.includes("consult") || lower.includes("appointment")) return BOT_RESPONSES.book
  if (lower.includes("lipo") || lower.includes("sculpt") || lower.includes("4d")) return BOT_RESPONSES.lipo
  if (lower.includes("rhino") || lower.includes("nose")) return BOT_RESPONSES.rhino
  if (lower.includes("botox") || lower.includes("pain")) return BOT_RESPONSES.botox
  return BOT_RESPONSES.default
}

function fmt() {
  return new Date().toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })
}

export function FloatingAiChat() {
  const [open,     setOpen]     = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content: "مرحباً! I'm Dr. Usman's AI assistant. Ask me anything about our procedures, pricing, or how to book a consultation.",
      time: fmt(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, open])

  /* Listen for navbar "Ask AI" button click */
  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener("open-ai-chat", handler)
    return () => window.removeEventListener("open-ai-chat", handler)
  }, [])

  const handleSend = (message: string) => {
    if (!message.trim()) return
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: message, time: fmt() }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)

    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getResponse(message),
        time: fmt(),
      }
      setMessages(prev => [...prev, reply])
      setIsLoading(false)
    }, 1200)
  }

  return (
    /* Fixed container — bottom-right corner */
    <div className="fixed right-4 bottom-6 z-50 flex flex-col items-end gap-3">

      {/* ── Expanded panel ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-[340px] md:w-[380px] flex flex-col rounded-2xl overflow-hidden"
            style={{
              maxHeight: "min(560px, calc(100vh - 120px))",
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-card)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 20px 60px var(--shadow-strong)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{
                borderBottom: "1px solid var(--border-subtle)",
                background: "var(--bg-surface)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#8a6830] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#0d0d12]" />
                  </div>
                  <span
                    className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2"
                    style={{ borderColor: "var(--bg-surface)" }}
                  />
                </div>
                <div>
                  <p className="text-xs font-medium leading-tight" style={{ color: "var(--text-heading)" }}>Dr. Usman AI</p>
                  <p className="text-[#C9A96E]/60 text-[10px]">Ask anything · Available 24/7</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#c9a96e] hover:text-[#C9A96E] transition-all"
                style={{ background: "var(--border-subtle)" }}
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#8a6830] flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 text-[#0d0d12]" />
                    </div>
                  )}
                  <div className={`max-w-[82%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-0.5`}>
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#C9A96E] text-[#0d0d12] rounded-br-sm"
                          : "rounded-bl-sm"
                      }`}
                      style={msg.role === "assistant" ? {
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-body)",
                      } : undefined}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[#c9a96e]/30 text-[9px] px-1">{msg.time}</span>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#8a6830] flex items-center justify-center shrink-0">
                    <Sparkles className="w-3 h-3 text-[#0d0d12]" />
                  </div>
                  <div
                    className="rounded-2xl rounded-bl-sm px-4 py-2.5 flex items-center gap-1"
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]/60"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions — liquid glass pills */}
            {messages.length <= 1 && (
              <div className="px-4 pb-3">
                <GlassFilter />
                <p className="text-[#c9a96e]/40 text-[9px] tracking-[0.2em] uppercase mb-2">Quick questions</p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED.map(s => (
                    <LiquidButton
                      key={s}
                      onClick={() => handleSend(s)}
                      variant="pill"
                      size="pill"
                    >
                      {s}
                    </LiquidButton>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div
              className="px-3 pb-3 pt-1"
              style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
              <PromptInputBox
                onSend={handleSend}
                isLoading={isLoading}
                placeholder="Ask about procedures, pricing..."
                className="border-[#8a6830]/30"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── WhatsApp floating button ─────────────────────────────────── */}
      <motion.a
        href="https://wa.me/966XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          width:        "52px",
          height:       "52px",
          borderRadius: "50%",
          background:   "#25D366",
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
          boxShadow:    "0 4px 20px rgba(37,211,102,0.45)",
          flexShrink:   0,
        }}
        title="Chat on WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </motion.a>

      {/* ── Minimized tab (shown when open) ──────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.button
            key="minimise-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center
                       text-[#C9A96E] hover:border-[#C9A96E]/60 shadow-lg transition-all duration-200"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-medium)",
            }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
