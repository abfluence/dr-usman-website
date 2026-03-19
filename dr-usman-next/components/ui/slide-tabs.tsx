"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

export interface SlideTabItem {
  label: string
  href: string
}

interface SlideTabsProps {
  items: SlideTabItem[]
  activeIndex?: number
  onSelect?: (index: number) => void
  /** "dark" = gold-on-black glass  |  "light" = dark-on-white glass  |  "auto" = follow system */
  theme?: "dark" | "light" | "auto"
}

export const SlideTabs = ({
  items,
  activeIndex: controlledActive,
  onSelect,
  theme = "dark",
}: SlideTabsProps) => {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 })
  const [selected, setSelected] = useState(controlledActive ?? 0)
  const tabsRef = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    if (controlledActive !== undefined) setSelected(controlledActive)
  }, [controlledActive])

  const snapToSelected = (idx = selected) => {
    const el = tabsRef.current[idx]
    if (el) {
      setPosition({
        left:    el.offsetLeft,
        width:   el.getBoundingClientRect().width,
        opacity: 1,
      })
    }
  }

  useEffect(() => {
    const t = setTimeout(() => snapToSelected(), 80)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  const handleSelect = (i: number) => {
    setSelected(i)
    onSelect?.(i)
  }

  const isDark = theme !== "light"

  return (
    <ul
      onMouseLeave={() => snapToSelected()}
      style={{
        /* ── geometry — inline to survive the global * { padding: 0 } override ── */
        position:       "relative",
        display:        "flex",
        width:          "fit-content",
        borderRadius:   "9999px",
        padding:        "4px",
        listStyle:      "none",
        margin:         "0",
        /* ── Apple liquid glass ── */
        backdropFilter:       "blur(28px) saturate(200%) brightness(1.05)",
        WebkitBackdropFilter: "blur(28px) saturate(200%) brightness(1.05)",
        background:    isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
        border:        isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.12)",
        boxShadow:     isDark
          ? "inset 0 1px 0 rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.5)"
          : "inset 0 1px 0 rgba(255,255,255,0.7), 0 6px 24px rgba(0,0,0,0.12)",
      }}
    >
      {items.map((item, i) => (
        <SlideTab
          key={item.label}
          ref={(el) => { tabsRef.current[i] = el }}
          href={item.href}
          isDark={isDark}
          isSelected={selected === i}
          onMouseEnter={() => {
            const el = tabsRef.current[i]
            if (el) {
              setPosition({
                left:    el.offsetLeft,
                width:   el.getBoundingClientRect().width,
                opacity: 1,
              })
            }
          }}
          onClick={() => handleSelect(i)}
        >
          {item.label}
        </SlideTab>
      ))}
      <GlassCursor position={position} isDark={isDark} />
    </ul>
  )
}

/* ── Tab item ─────────────────────────────────────────────────────────── */

interface SlideTabProps {
  children: React.ReactNode
  href:       string
  isDark:     boolean
  isSelected: boolean
  onMouseEnter: () => void
  onClick:    () => void
}

const SlideTab = React.forwardRef<HTMLLIElement, SlideTabProps>(
  ({ children, href, isDark, isSelected, onMouseEnter, onClick }, ref) => {
    const activeColor  = isDark ? "#C9A96E" : "#111111"
    const defaultColor = isDark ? "rgba(255,255,255,0.52)" : "rgba(0,0,0,0.48)"
    const hoverColor   = isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.82)"

    return (
      <li
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={(e) => {
          if (!isSelected) {
            ;(e.currentTarget as HTMLElement).style.color = defaultColor
          }
        }}
        onMouseOver={(e) => {
          if (!isSelected) {
            ;(e.currentTarget as HTMLElement).style.color = hoverColor
          }
        }}
        onClick={(e) => {
          e.preventDefault()
          onClick()
          const target = document.querySelector(href)
          if (target) target.scrollIntoView({ behavior: "smooth" })
        }}
        style={{
          /* ── inline to survive cascade ── */
          position:      "relative",
          zIndex:        10,
          display:       "block",
          cursor:        "pointer",
          userSelect:    "none",
          listStyle:     "none",
          padding:       "6px 18px",
          fontSize:      "11px",
          fontWeight:    600,
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          color:         isSelected ? activeColor : defaultColor,
          transition:    "color 0.18s ease",
          whiteSpace:    "nowrap",
        }}
      >
        <a
          href={href}
          onClick={(e) => e.preventDefault()}
          tabIndex={-1}
          style={{ outline: "none", pointerEvents: "none", color: "inherit", textDecoration: "none" }}
        >
          {children}
        </a>
      </li>
    )
  }
)
SlideTab.displayName = "SlideTab"

/* ── Sliding glass cursor ─────────────────────────────────────────────── */

interface GlassCursorProps {
  position: { left: number; width: number; opacity: number }
  isDark:   boolean
}

const GlassCursor = ({ position, isDark }: GlassCursorProps) => (
  <motion.li
    animate={{ ...position }}
    transition={{ type: "spring", stiffness: 480, damping: 36 }}
    style={{
      position:             "absolute",
      zIndex:               0,
      top:                  "4px",
      height:               "calc(100% - 8px)",
      borderRadius:         "9999px",
      listStyle:            "none",
      /* glass cursor — gold-tinted in dark mode */
      backdropFilter:       "blur(10px) saturate(160%)",
      WebkitBackdropFilter: "blur(10px) saturate(160%)",
      background:  isDark ? "rgba(201,169,110,0.22)" : "rgba(0,0,0,0.09)",
      border:      isDark ? "1px solid rgba(201,169,110,0.40)" : "1px solid rgba(0,0,0,0.14)",
      boxShadow:   isDark
        ? "inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 12px rgba(201,169,110,0.18)"
        : "inset 0 1px 0 rgba(255,255,255,0.6)",
    }}
  />
)
