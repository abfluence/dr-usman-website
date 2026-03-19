"use client"
import { PulsingBorder, MeshGradient, DotOrbit } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { Sparkles } from "lucide-react"
import { RevealText } from "@/components/ui/reveal-text"
import { InteractiveFigure } from "@/components/ui/interactive-figure"
import { AnimatedText } from "@/components/ui/animated-text"
import { SlideTabs } from "@/components/ui/slide-tabs"
import { ToggleTheme } from "@/components/ui/toggle-theme"
import { LiquidButton, GlassFilter } from "@/components/ui/liquid-glass-button"
import { MovingBorder } from "@/components/ui/moving-border"

const NAV_ITEMS = [
  { label: "Services",     href: "#services"      },
  { label: "Results",      href: "#results"       },
  { label: "About",        href: "#about"         },
  { label: "Testimonials", href: "#testimonials"  },
  { label: "Contact",      href: "#contact"       },
]

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)
    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }
    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen w-full relative overflow-hidden">
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* ── Layer 1: Primary MeshGradient — black-to-gold flow ── */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#060604", "#1a1208", "#0a0806", "#C9A96E", "#060604"]}
        speed={0.25}
        backgroundColor="#060604"
      />

      {/* ── Layer 2: Wireframe MeshGradient overlay — structural depth ── */}
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-25"
        colors={["#000000", "#1a1208", "#2a1e0a", "#e8d5a8"]}
        speed={0.15}
        wireframe="true"
        backgroundColor="#000000"
      />

      {/* ── Layer 3: DotOrbit — gold particle orbit overlay ── */}
      <div className="absolute inset-0 w-full h-full opacity-[0.18] pointer-events-none">
        <DotOrbit
          className="w-full h-full"
          dotColor="#C9A96E"
          orbitColor="#8a6830"
          speed={0.7}
          intensity={1.2}
        />
      </div>

      {/* ── Layer 4: Ambient glow orbs (CSS blur blobs, GPU-promoted) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Top-centre gold flare */}
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.12]"
          style={{
            background: "radial-gradient(ellipse, #C9A96E 0%, #8a6830 40%, transparent 70%)",
            filter: "blur(80px)",
            animation: "pulse 6s ease-in-out infinite",
            willChange: "opacity",
          }}
        />
        {/* Bottom-right secondary flare */}
        <div
          className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(ellipse, #e8d5a8 0%, #C9A96E 50%, transparent 70%)",
            filter: "blur(60px)",
            animation: "pulse 4s ease-in-out infinite",
            animationDelay: "1.5s",
            willChange: "opacity",
          }}
        />
        {/* Left edge accent */}
        <div
          className="absolute top-1/2 left-[5%] -translate-y-1/2 w-[200px] h-[500px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(ellipse, #d4b87a 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "pulse 8s ease-in-out infinite",
            animationDelay: "3s",
            willChange: "opacity",
          }}
        />
      </div>

      {/* ── Layer 5: Dark vignette to keep text readable ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, transparent 20%, rgba(6,6,4,0.55) 70%, rgba(6,6,4,0.82) 100%)",
        }}
      />

      {children}
    </div>
  )
}

export function PulsingCircle() {
  return (
    <div className="absolute bottom-8 right-8 z-30">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <PulsingBorder
          colors={["#C9A96E", "#e8d5a8", "#8a6830", "#C9A96E", "#ffffff", "#C9A96E", "#8a6830"]}
          colorBack="#00000000"
          speed={1.5}
          roundness={1}
          thickness={0.1}
          softness={0.2}
          intensity={5}
          spotSize={0.1}
          pulse={0.1}
          smoke={0.5}
          smokeSize={4}
          scale={0.65}
          rotation={0}
          frame={9161408.251009725}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
          }}
        />
        {/* Rotating Arabic/English tagline */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transform: "scale(1.6)" }}
        >
          <defs>
            <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text className="text-sm fill-[#C9A96E]/80">
            <textPath href="#circle" startOffset="0%" style={{ fontSize: "9px", fill: "#C9A96E", opacity: 0.9 }}>
              Board-Certified • Al Khobar • Dammam KSA • Plastic Surgery •
            </textPath>
          </text>
        </motion.svg>
      </div>
    </div>
  )
}

export function HeroContent() {
  return (
    <main className="absolute inset-0 z-20 flex items-center pt-20 px-6 md:px-12 gap-8 lg:gap-14">
      <div className="flex-1 max-w-lg">
        <div
          className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 mb-5 relative border border-[#C9A96E]/20"
          style={{ filter: "url(#glass-effect)" }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent rounded-full" />
          <span className="text-[#C9A96E]/90 text-xs font-light relative z-10">
            ✦ Board-Certified Plastic &amp; Reconstructive Surgeon · Al Khobar · Dammam
          </span>
        </div>
        <div className="mb-4 -ml-1">
          <RevealText
            text="Dr. Usman"
            fontSize="text-5xl md:text-6xl"
            textColor="text-white"
            overlayColor="text-[#e8d5a8]"
            letterDelay={0.06}
            overlayDelay={0.06}
            springDuration={500}
            className="justify-start"
          />
          <RevealText
            text="Liaqat"
            fontSize="text-6xl md:text-7xl"
            textColor="text-[#C9A96E]"
            overlayColor="text-[#e8d5a8]"
            letterDelay={0.07}
            overlayDelay={0.07}
            springDuration={600}
            className="justify-start italic -mt-2"
          />
        </div>
        <p className="text-sm text-[#C9A96E]/70 mb-2 font-light" dir="rtl" style={{ fontFamily: "'Siwa', serif" }}>
          جراح تجميل معتمد · الخبر · الدمام · المملكة العربية السعودية
        </p>
        <AnimatedText
          text="9+ years of excellence in 4D Liposculpture, BBL, Rhinoplasty and Breast Surgery. Trusted by thousands of women across Saudi Arabia."
          className="text-xs font-light text-white/70 mb-6 leading-relaxed max-w-sm"
          stagger={0.03}
          delay={0.6}
        />
        <div className="flex items-center gap-6 mb-6">
          <div>
            <p className="text-[#C9A96E] text-lg font-medium">9+</p>
            <p className="text-white/50 text-[10px] font-light">Years Experience</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <p className="text-[#C9A96E] text-lg font-medium">1000+</p>
            <p className="text-white/50 text-[10px] font-light">Procedures Done</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <p className="text-[#C9A96E] text-lg font-medium">2</p>
            <p className="text-white/50 text-[10px] font-light">Clinic Locations</p>
          </div>
        </div>
        <GlassFilter />
        <div className="flex items-center gap-4 flex-wrap">
          <LiquidButton variant="glass" size="default">
            View Procedures
          </LiquidButton>
          <LiquidButton variant="gold" size="default">
            Book Consultation
          </LiquidButton>
        </div>
      </div>
      {/* ── Interactive cursor-following consultant figure ── */}
      <div className="hidden md:flex flex-shrink-0 w-[300px] lg:w-[360px] xl:w-[400px] items-center justify-center">
        <InteractiveFigure
          imageUrl="/clinic-consultant.png"
          className="w-full h-[500px] lg:h-[570px]"
        />
      </div>
    </main>
  )
}

export function Header() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 bg-transparent">

      {/* ── Logo ───────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="flex items-center justify-center flex-shrink-0">
          <img
            src="/dr-usman-logo.png"
            alt="Dr. Usman Liaqat Logo"
            style={{
              height: "48px",
              width: "auto",
              objectFit: "contain",
              filter: isDark ? "invert(1) brightness(1.1)" : "brightness(0.95)",
              transition: "filter 0.3s ease",
            }}
          />
        </div>
        <div className="hidden sm:block">
          <p className="text-xs font-medium leading-none" style={{ color: "var(--text-heading)" }}>Dr. Usman Liaqat</p>
          <p className="text-[#C9A96E]/60 text-[9px] font-light mt-0.5">Plastic &amp; Reconstructive Surgeon</p>
        </div>
      </div>

      {/* ── Slide-tabs nav — liquid glass pill ─────────────────── */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
        <SlideTabs items={NAV_ITEMS} theme={isDark ? "dark" : "light"} />
      </div>

      {/* ── Right side: AI button + Theme toggle ─────────────────── */}
      <div className="flex items-center gap-2.5 flex-shrink-0">

        {/* AI Chat trigger — moving border pill */}
        <div className="relative overflow-hidden rounded-full p-[1px]">
          <div className="absolute inset-0 rounded-full">
            <MovingBorder duration={2800} rx="50%" ry="50%">
              <div className="h-10 w-10 bg-[radial-gradient(rgba(201,169,110,0.9)_40%,transparent_60%)]" />
            </MovingBorder>
          </div>
          <button
            onClick={() => window.dispatchEvent(new Event("open-ai-chat"))}
            className="relative z-10 flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full whitespace-nowrap"
            style={{
              background:           "rgba(255,255,255,0.07)",
              backdropFilter:       "blur(14px) saturate(180%)",
              WebkitBackdropFilter: "blur(14px) saturate(180%)",
              boxShadow:            "inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
            title="Ask Dr. Usman AI"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#8a6830] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-2.5 h-2.5 text-[#0d0d12]" />
            </div>
            <span className="text-[#C9A96E] text-[10px] font-medium hidden sm:block">Ask AI</span>
          </button>
        </div>

        {/* Theme toggle */}
        <ToggleTheme />
      </div>
    </header>
  )
}
