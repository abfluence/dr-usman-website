"use client"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { AnimatedText } from "@/components/ui/animated-text"
import { MovingBorderLink } from "@/components/ui/moving-border"

const credentials = [
  "Board-Certified Plastic & Reconstructive Surgeon",
  "9+ Years of Clinical Excellence in Saudi Arabia",
  "Specialist in 4D Liposculpture & Body Contouring",
  "Advanced Training in Facial Aesthetic Surgery",
  "2 Clinic Locations — Al Khobar & Dammam, KSA",
  "500+ Successful Procedures with Natural Results",
]


export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 md:py-20 lg:py-24"
      style={{ background: "var(--bg-page)" }}
    >
      {/* Subtle decorative vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block origin-top"
        style={{ background: "linear-gradient(to bottom, transparent, var(--border-subtle), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT — portrait + timeline ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Portrait frame */}
            <div className="relative">
              {/* Decorative corner marks */}
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-[#c9a96e]/40" />
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-[#c9a96e]/40" />

              {/* Portrait area */}
              <div
                className="relative aspect-[3/4] overflow-hidden border"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                {/* Dr. Usman's photo */}
                <img
                  src="/dr-usman-about.png"
                  alt="Dr. Usman Liaqat — Plastic & Reconstructive Surgeon"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  draggable={false}
                />

                {/* Subtle warm tint overlay to blend with site palette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060604]/40 via-transparent to-transparent" />

                {/* Bottom label overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#060604]/70 to-transparent">
                  <p className="text-[#C9A96E] text-xs tracking-[0.2em] uppercase mb-0.5">Dr. Usman Liaqat</p>
                  <p className="text-white/60 text-[10px]">Plastic &amp; Reconstructive Surgeon</p>
                  <p
                    className="text-[#C9A96E]/60 text-[10px] mt-1"
                    dir="rtl"
                    style={{ fontFamily: "'Siwa', serif" }}
                  >
                    دكتور عثمان لياقت
                  </p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* ── RIGHT — bio + credentials ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pt-0"
          >
            <p className="text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase mb-5">About The Surgeon</p>
            <h2
              className="text-5xl md:text-6xl font-light leading-[1.1] mb-6"
              style={{ fontFamily: "'Lora', serif", color: "var(--text-heading)" }}
            >
              The Art Behind
              <br />
              <em className="italic text-[#c9a96e]">Every Result</em>
            </h2>

            {/* Bio */}
            <div className="space-y-4 mb-8 max-w-2xl">
              <AnimatedText
                text="Dr. Usman Liaqat is a board-certified plastic and reconstructive surgeon with over 9 years of experience transforming lives across Saudi Arabia. Based in Al Khobar and Dammam, he is known for his meticulous technique, natural results, and deeply personalized approach to every patient."
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-body)" }}
                stagger={0.025}
              />
              <AnimatedText
                text="His philosophy is simple: every woman deserves to feel confident in her own skin. By combining the latest surgical advancements with a genuine understanding of each patient's unique goals, Dr. Usman delivers outcomes that look and feel completely natural."
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
                stagger={0.025}
                delay={0.1}
              />
              <AnimatedText
                text="Whether it's body contouring, facial rejuvenation, or reconstructive work, every procedure is carried out with the highest standard of care, safety, and artistry."
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
                stagger={0.025}
                delay={0.2}
              />
            </div>

            {/* Arabic quote */}
            <div
              className="border-l-2 border-[#c9a96e]/30 pl-5 mb-10 py-4 pr-4"
              style={{ background: "var(--bg-section-alt)" }}
            >
              <p
                className="text-[#c9a96e]/80 text-base leading-relaxed"
                dir="rtl"
                style={{ fontFamily: "'Siwa', serif" }}
              >
                "نهدف إلى تقديم أفضل نتائج تجميلية بأمان تام وبأسلوب طبيعي"
              </p>
              <p className="text-[10px] mt-2 tracking-wider" style={{ color: "var(--text-secondary)" }}>— Dr. Usman Liaqat</p>
            </div>

            {/* Credentials */}
            <div className="space-y-3">
              {credentials.map((cred, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#c9a96e] shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{cred}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <MovingBorderLink
                href="https://wa.me/966XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                variant="gold"
                borderRadius="0.5rem"
                duration={2400}
              >
                Book a Consultation
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MovingBorderLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
