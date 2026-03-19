"use client"

import React from "react"
import { cn } from "@/lib/utils"
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
  type MotionValue,
} from "framer-motion"

/* ── animated scrolling grid ─────────────────────────────────────────── */

const GridPattern = ({
  offsetX,
  offsetY,
  id,
}: {
  offsetX: MotionValue<number>
  offsetY: MotionValue<number>
  id: string
}) => (
  <svg className="w-full h-full" aria-hidden="true">
    <defs>
      <motion.pattern
        id={id}
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        x={offsetX}
        y={offsetY}
      >
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          style={{ color: "#C9A96E" }}
        />
      </motion.pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
)

/* ── main export ──────────────────────────────────────────────────────── */

interface InfiniteGridProps {
  children: React.ReactNode
  className?: string
  /** grid scroll speed (px per frame) */
  speed?: number
  /** reveal circle radius on mouse hover */
  revealRadius?: number
}

export const InfiniteGrid = ({
  children,
  className,
  speed = 0.4,
  revealRadius = 320,
}: InfiniteGridProps) => {
  const mouseX = useMotionValue(-9999)
  const mouseY = useMotionValue(-9999)

  const gridOffsetX = useMotionValue(0)
  const gridOffsetY = useMotionValue(0)

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + speed) % 40)
    gridOffsetY.set((gridOffsetY.get() + speed) % 40)
  })

  const maskImage = useMotionTemplate`radial-gradient(${revealRadius}px circle at ${mouseX}px ${mouseY}px, black, transparent)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  const handleMouseLeave = () => {
    mouseX.set(-9999)
    mouseY.set(-9999)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full min-h-screen overflow-hidden",
        className,
      )}
      style={{ background: "var(--bg-page)" }}
    >
      {/* ── base grid — always-visible faint layer ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.04 }}>
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} id="grid-base" />
      </div>

      {/* ── reveal grid — appears under cursor ── */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          opacity: 0.45,
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} id="grid-reveal" />
      </motion.div>

      {/* ── ambient glow orbs ── */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        {/* top-right gold flare */}
        <div
          style={{
            position: "absolute",
            right:    "-15%",
            top:      "-20%",
            width:    "45%",
            height:   "45%",
            borderRadius: "9999px",
            background: "radial-gradient(ellipse, rgba(201,169,110,0.35) 0%, transparent 70%)",
            filter:   "blur(100px)",
          }}
        />
        {/* centre-top soft gold */}
        <div
          style={{
            position: "absolute",
            right:    "15%",
            top:      "-10%",
            width:    "22%",
            height:   "22%",
            borderRadius: "9999px",
            background: "radial-gradient(ellipse, rgba(201,169,110,0.2) 0%, transparent 70%)",
            filter:   "blur(80px)",
          }}
        />
        {/* bottom-left soft gold shadow — subtle in light, richer in dark */}
        <div
          style={{
            position: "absolute",
            left:     "-10%",
            bottom:   "-20%",
            width:    "40%",
            height:   "40%",
            borderRadius: "9999px",
            background: "radial-gradient(ellipse, rgba(201,169,110,0.08) 0%, transparent 70%)",
            filter:   "blur(120px)",
          }}
        />
      </div>

      {/* ── content ── */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
