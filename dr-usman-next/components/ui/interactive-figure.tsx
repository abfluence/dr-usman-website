"use client"

import { useEffect } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"

// ─── Types ────────────────────────────────────────────────────────────────────

interface InteractiveFigureProps {
  /** Full-body portrait image URL */
  imageUrl?: string
  className?: string
}

// ─── Glow gradient helper ─────────────────────────────────────────────────────

function useGlowGradient(nx: MotionValue<number>, ny: MotionValue<number>) {
  const gx = useTransform(nx, [0, 1], [15, 85])
  const gy = useTransform(ny, [0, 1], [15, 85])
  return useTransform([gx, gy], (vals) => {
    const [x, y] = vals as number[]
    return `radial-gradient(ellipse 70% 60% at ${x}% ${y}%, rgba(201,169,110,0.28) 0%, rgba(201,169,110,0.07) 45%, transparent 70%)`
  })
}

// ─── Main component ───────────────────────────────────────────────────────────

export function InteractiveFigure({
  imageUrl = "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=700&auto=format&fit=crop&q=85&crop=top",
  className = "",
}: InteractiveFigureProps) {
  // Raw normalised mouse position (0 = left/top → 1 = right/bottom)
  const rawNX = useMotionValue(0.5)
  const rawNY = useMotionValue(0.5)

  // ── Spring layers — progressively slower = deeper parallax ──────────────────
  // Glow spot   (fastest / most responsive)
  const glowNX = useSpring(rawNX, { stiffness: 90, damping: 18 })
  const glowNY = useSpring(rawNY, { stiffness: 90, damping: 18 })

  // Upper body  (medium)
  const upNX = useSpring(rawNX, { stiffness: 55, damping: 20 })
  const upNY = useSpring(rawNY, { stiffness: 55, damping: 20 })

  // Lower body  (slowest, counter-sway creates S-curve illusion)
  const loNX = useSpring(rawNX, { stiffness: 30, damping: 22 })
  const loNY = useSpring(rawNY, { stiffness: 30, damping: 22 })

  // Whole-frame 3-D tilt
  const tiltNX = useSpring(rawNX, { stiffness: 25, damping: 22 })
  const tiltNY = useSpring(rawNY, { stiffness: 25, damping: 22 })

  // ── Motion values ────────────────────────────────────────────────────────────
  const rotateY = useTransform(tiltNX, [0, 1], [-10, 10])
  const rotateX = useTransform(tiltNY, [0, 1], [5, -5])

  // Upper body leans TOWARD cursor
  const upperX = useTransform(upNX, [0, 1], [-14, 14])
  const upperY = useTransform(upNY, [0, 1], [-7, 7])

  // Lower body counter-movement — S-curve body language
  const lowerX = useTransform(loNX, [0, 1], [9, -9])
  const lowerY = useTransform(loNY, [0, 1], [5, -5])

  // Dynamic glow
  const glowBg = useGlowGradient(glowNX, glowNY)

  // ── Global cursor tracking ───────────────────────────────────────────────────
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      rawNX.set(e.clientX / window.innerWidth)
      rawNY.set(e.clientY / window.innerHeight)
    }
    window.addEventListener("mousemove", handle, { passive: true })
    return () => window.removeEventListener("mousemove", handle)
  }, [rawNX, rawNY])

  return (
    <div
      className={`relative select-none ${className}`}
      style={{ perspective: "900px", perspectiveOrigin: "50% 30%" }}
    >
      {/* ── Outer 3-D tilt wrapper ───────────────────────────────────────── */}
      <motion.div
        style={{ rotateY, rotateX }}
        className="relative w-full h-full"
      >
        {/* ── Ambient glow halo behind the figure ────────────────────────── */}
        <div
          className="absolute -inset-6 rounded-3xl blur-3xl opacity-50 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 65%, rgba(201,169,110,0.22) 0%, transparent 70%)",
          }}
        />

        {/* ── Clipping frame ──────────────────────────────────────────────── */}
        <div
          className="relative w-full h-full overflow-hidden rounded-2xl"
          style={{
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.60), 0 0 0 1px rgba(201,169,110,0.18)",
          }}
        >
          {/* Base layer — always visible, no translation */}
          <img
            src={imageUrl}
            alt="Clinic consultant"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />

          {/* Upper body layer — clips top 55%, leans toward cursor */}
          <motion.div
            style={{ x: upperX, y: upperY }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={imageUrl}
              alt=""
              aria-hidden
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 55%, 0 55%)" }}
            />
          </motion.div>

          {/* Lower body layer — clips bottom 45%, counter-sway */}
          <motion.div
            style={{ x: lowerX, y: lowerY }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={imageUrl}
              alt=""
              aria-hidden
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)" }}
            />
          </motion.div>

          {/* Cursor-following gold glow overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: glowBg }}
          />

          {/* Bottom ground vignette */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(10,8,4,0.65) 0%, transparent 100%)",
            }}
          />

          {/* Top sky fade */}
          <div
            className="absolute inset-x-0 top-0 h-16 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(10,8,4,0.20) 0%, transparent 100%)",
            }}
          />

          {/* Gold rim light */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ boxShadow: "inset 0 0 0 1px rgba(201,169,110,0.22)" }}
          />
        </div>

        {/* ── Floating label ───────────────────────────────────────────────── */}
        <motion.div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20
                     bg-black/65 backdrop-blur-md border border-[#C9A96E]/30
                     rounded-full px-5 py-2 flex items-center gap-2 whitespace-nowrap"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
          <span className="text-[#C9A96E] text-[10px] font-light tracking-widest uppercase">
            Results Speak
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
        </motion.div>

        {/* ── Floating stat: 4D Lipo ───────────────────────────────────────── */}
        <motion.div
          className="absolute top-6 right-[-14px] z-20
                     bg-black/70 backdrop-blur-md border border-[#C9A96E]/25
                     rounded-2xl px-4 py-2.5 text-center"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <p className="text-[#C9A96E] text-base font-semibold leading-none">4D</p>
          <p className="text-white/55 text-[9px] mt-0.5 tracking-wide">Lipo</p>
        </motion.div>

        {/* ── Floating stat: BBL ───────────────────────────────────────────── */}
        <motion.div
          className="absolute top-24 left-[-16px] z-20
                     bg-black/70 backdrop-blur-md border border-[#C9A96E]/25
                     rounded-2xl px-4 py-2.5 text-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        >
          <p className="text-[#C9A96E] text-base font-semibold leading-none">BBL</p>
          <p className="text-white/55 text-[9px] mt-0.5 tracking-wide">Expert</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
