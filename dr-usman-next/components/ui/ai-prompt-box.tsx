"use client"
import React, { useRef, useState, useEffect } from "react"
import {
  Mic,
  SendHorizonal,
  Paperclip,
  X,
  StopCircle,
  Square,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea"

// ── SSR-safe custom scrollbar styles ─────────────────────────────────────────
const STYLE_ID = "ai-prompt-box-styles"
const STYLE_CONTENT = `
  #ai-prompt-box textarea::-webkit-scrollbar { width: 4px }
  #ai-prompt-box textarea::-webkit-scrollbar-track { background: transparent }
  #ai-prompt-box textarea::-webkit-scrollbar-thumb { background-color: #8a6830; border-radius: 3px }
  #ai-prompt-box textarea::-webkit-scrollbar-thumb:hover { background-color: #C9A96E }
  #ai-prompt-box textarea { scrollbar-width: thin; scrollbar-color: #8a6830 transparent; }
`

// ── Icon button — liquid glass pill ──────────────────────────────────────────
const IconBtn = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean; danger?: boolean }
>(({ className, active, danger, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "p-1.5 rounded-full transition-all duration-200 focus-visible:outline-none",
      danger
        ? "bg-red-500/15 text-red-400 hover:bg-red-500/25 border border-red-500/30"
        : active
        ? "bg-[#C9A96E]/15 border border-[#C9A96E]/50 text-[#C9A96E]"
        : "bg-white/5 border border-[#C9A96E]/20 text-[#C9A96E]/60 hover:text-[#C9A96E] hover:border-[#C9A96E]/40 hover:bg-[#C9A96E]/08",
      "disabled:opacity-40 disabled:cursor-not-allowed",
      className
    )}
    {...props}
  />
))
IconBtn.displayName = "IconBtn"

// ── Main export ───────────────────────────────────────────────────────────────
interface PromptInputBoxProps {
  onSend?:      (message: string, files?: File[]) => void
  isLoading?:   boolean
  placeholder?: string
  className?:   string
}

export const PromptInputBox = React.forwardRef<HTMLDivElement, PromptInputBoxProps>((
  { onSend = () => {}, isLoading = false, placeholder = "Ask about procedures, pricing...", className },
  ref
) => {
  // Inject scrollbar styles once
  useEffect(() => {
    if (!document.getElementById(STYLE_ID)) {
      const s = document.createElement("style")
      s.id = STYLE_ID
      s.textContent = STYLE_CONTENT
      document.head.appendChild(s)
    }
  }, [])

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({ minHeight: 48, maxHeight: 180 })
  const [input,        setInput]        = useState("")
  const [files,        setFiles]        = useState<File[]>([])
  const [filePreviews, setFilePreviews] = useState<Record<string, string>>({})
  const [isRecording,  setIsRecording]  = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isImage = (f: File) => f.type.startsWith("image/")

  const processFile = (f: File) => {
    if (!isImage(f) || f.size > 10 * 1024 * 1024) return
    setFiles([f])
    const r = new FileReader()
    r.onload = e => setFilePreviews({ [f.name]: e.target?.result as string })
    r.readAsDataURL(f)
  }

  // Paste-to-attach
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const f = items[i].getAsFile()
          if (f) { e.preventDefault(); processFile(f); break }
        }
      }
    }
    document.addEventListener("paste", handlePaste)
    return () => document.removeEventListener("paste", handlePaste)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSend = () => {
    if (!input.trim() && files.length === 0) return
    onSend(input.trim(), files)
    setInput("")
    setFiles([])
    setFilePreviews({})
    adjustHeight(true)
  }

  const hasContent = input.trim() !== "" || files.length > 0

  return (
    <div
      ref={ref}
      id="ai-prompt-box"
      className={cn(
        "relative rounded-2xl border overflow-hidden transition-all duration-300",
        "backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.25)]",
        isLoading
          ? "border-[#C9A96E]/50"
          : "border-[#8a6830]/40 hover:border-[#C9A96E]/35",
        className
      )}
      style={{ background: "var(--bg-surface)" }}
    >
      {/* ── Attached image preview ── */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 px-3 pt-3"
          >
            {files.map((f, i) =>
              isImage(f) && filePreviews[f.name] ? (
                <div key={i} className="relative group w-12 h-12 rounded-xl overflow-hidden border border-[#C9A96E]/20">
                  <img src={filePreviews[f.name]} alt={f.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => { setFiles([]); setFilePreviews({}) }}
                    className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3 text-white" />
                  </button>
                </div>
              ) : null
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Auto-resizing textarea ── */}
      <textarea
        ref={textareaRef}
        placeholder={placeholder}
        disabled={isLoading || isRecording}
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          adjustHeight()
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
          }
        }}
        className={cn(
          "w-full resize-none border-none bg-transparent",
          "text-sm leading-[1.55]",
          "px-4 pt-3.5 pb-12",          // bottom padding leaves room for buttons row
          "focus-visible:outline-none focus-visible:ring-0",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          "placeholder:text-[#c9a96e]/40"
        )}
        style={{ color: "var(--text-body)" }}
      />

      {/* ── Bottom bar: left label + right action buttons ── */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 pb-2.5 pointer-events-none">

        {/* Subtle hint text */}
        <span className="text-[9px] tracking-[0.15em] uppercase pointer-events-none select-none"
          style={{ color: "var(--text-muted, rgba(201,169,110,0.3))" }}>
          {isRecording ? "Recording…" : isLoading ? "Thinking…" : "↵ to send"}
        </span>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 pointer-events-auto">

          {/* Mic / Stop recording */}
          <IconBtn
            danger={isRecording}
            title={isRecording ? "Stop recording" : "Voice input"}
            onClick={() => {
              if (isRecording) {
                setIsRecording(false)
                onSend("[Voice message]")
              } else {
                setIsRecording(true)
              }
            }}
          >
            {isRecording
              ? <StopCircle className="w-3.5 h-3.5" />
              : <Mic className="w-3.5 h-3.5" />}
          </IconBtn>

          {/* Attach file */}
          <>
            <IconBtn
              title="Attach image"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="w-3.5 h-3.5" />
            </IconBtn>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) processFile(e.target.files[0])
                if (e.target) e.target.value = ""
              }}
            />
          </>

          {/* Send button */}
          <button
            type="button"
            onClick={isLoading ? undefined : handleSend}
            disabled={(!hasContent && !isLoading)}
            title={isLoading ? "Generating…" : "Send"}
            className={cn(
              "p-1.5 rounded-full transition-all duration-200 focus-visible:outline-none",
              hasContent && !isLoading
                ? "bg-gradient-to-br from-[#C9A96E] to-[#8a6830] text-[#0c0a07] shadow-[0_2px_10px_rgba(201,169,110,0.4)] hover:shadow-[0_2px_14px_rgba(201,169,110,0.55)]"
                : isLoading
                ? "bg-[#C9A96E]/15 border border-[#C9A96E]/40 text-[#C9A96E]"
                : "bg-white/5 border border-[#C9A96E]/20 text-[#C9A96E]/30 cursor-not-allowed"
            )}
          >
            {isLoading
              ? <Square className="w-3.5 h-3.5 fill-[#C9A96E] animate-pulse" />
              : <SendHorizonal className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  )
})
PromptInputBox.displayName = "PromptInputBox"
