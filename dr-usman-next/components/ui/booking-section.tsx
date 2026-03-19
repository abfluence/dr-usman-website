"use client"
import React from "react"
import { motion } from "framer-motion"
import { MeshGradient } from "@paper-design/shaders-react"
import { MessageCircle, Calendar, MapPin, Phone } from "lucide-react"
import { AnimatedText } from "@/components/ui/animated-text"
import { useTheme } from "next-themes"
import { GlassFilter } from "@/components/ui/liquid-glass-button"
import { MovingBorderLink, MovingBorderButton } from "@/components/ui/moving-border"

const locations = [
  {
    city: "Al Khobar",
    arabicCity: "الخبر",
    address: "Olaya District, Al Khobar, Eastern Province",
    phone: "+966 XX XXX XXXX",
  },
  {
    city: "Dammam",
    arabicCity: "الدمام",
    address: "King Fahd Road, Dammam, Eastern Province",
    phone: "+966 XX XXX XXXX",
  },
]

export function BookingSection() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <section
      className="relative overflow-hidden py-16 md:py-20 lg:py-24"
    >
      <GlassFilter />
      {/* ── Background — shader in dark, gradient in light ── */}
      {isDark ? (
        <>
          <div className="absolute inset-0 z-0">
            <MeshGradient
              className="w-full h-full"
              colors={["#060608", "#8a6830", "#1a1208", "#C9A96E", "#060608"]}
              speed={0.2}
            />
            <div className="absolute inset-0 bg-[#060608]/70" />
          </div>
          {/* Grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "256px 256px",
            }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(135deg, var(--bg-section-alt) 0%, #ede0c8 50%, var(--bg-section-alt) 100%)",
          }}
        >
          {/* Subtle gold flare top-right */}
          <div
            className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 80% 30%, rgba(201,169,110,0.15) 0%, transparent 60%)",
            }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — CTA content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[#C9A96E] text-[10px] tracking-[0.35em] uppercase mb-5">Begin Your Journey</p>
            <h2
              className="text-5xl md:text-6xl font-light leading-[1.1] mb-6"
              style={{
                fontFamily: "'Lora', serif",
                color: "var(--text-heading)",
              }}
            >
              Begin Your{" "}
              <em className="italic text-[#C9A96E]">
                Transformation
              </em>
            </h2>
            <p
              className="text-[#C9A96E]/50 text-base mb-4"
              dir="rtl"
              style={{ fontFamily: "'Siwa', serif" }}
            >
              ابدأي رحلتك نحو الجمال الذي تستحقينه
            </p>
            <div style={{ color: "var(--text-muted)" }}>
              <AnimatedText
                text="Schedule your private consultation with Dr. Usman Liaqat. Every journey begins with a conversation — confidential, personalized, and completely focused on you."
                className="text-sm leading-relaxed max-w-md mb-10"
                stagger={0.025}
              />
            </div>

            {/* CTA Buttons — moving border */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <MovingBorderLink
                href="https://wa.me/966XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                variant="gold"
                borderRadius="0.5rem"
                duration={2000}
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                WhatsApp Us Now
              </MovingBorderLink>
              <MovingBorderButton
                variant="glass"
                borderRadius="0.5rem"
                duration={3200}
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                Schedule Consultation
              </MovingBorderButton>
            </div>

            {/* Reassurance note */}
            <p className="text-xs mt-6 flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
              <span className="w-4 h-px bg-[#C9A96E]/30" />
              Private &amp; confidential · Available in Arabic &amp; English
            </p>
          </motion.div>

          {/* Right — location cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {locations.map((loc, i) => (
              <motion.div
                key={loc.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                className="border border-[#C9A96E]/15 p-7 hover:border-[#C9A96E]/30 transition-colors duration-500 group backdrop-blur-sm"
                style={{
                  background: isDark ? "rgba(6,6,8,0.50)" : "var(--bg-card)",
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p
                      className="text-xl font-light group-hover:text-[#e8d5a8] transition-colors duration-300"
                      style={{
                        fontFamily: "'Lora', serif",
                        color: "var(--text-heading)",
                      }}
                    >
                      {loc.city}
                    </p>
                    <p
                      className="text-[#C9A96E]/40 text-sm"
                      dir="rtl"
                      style={{ fontFamily: "'Siwa', serif" }}
                    >
                      {loc.arabicCity}
                    </p>
                  </div>
                  <MapPin className="w-4 h-4 text-[#C9A96E]/40 group-hover:text-[#C9A96E]/70 transition-colors duration-300" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-3 h-3 text-[#C9A96E]/30 shrink-0 mt-0.5" />
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{loc.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-3 h-3 text-[#C9A96E]/30 shrink-0" />
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{loc.phone}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
