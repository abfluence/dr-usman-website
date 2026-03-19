"use client"
import { motion } from "framer-motion"
import { AnimatedText } from "@/components/ui/animated-text"

const navLinks = [
  { label: "Services",         href: "#services" },
  { label: "Before & After",   href: "#results" },
  { label: "About Dr. Usman",  href: "#about" },
  { label: "Testimonials",     href: "#testimonials" },
  { label: "FAQ",              href: "#faq" },
  { label: "Contact",          href: "#contact" },
]

const procedures = [
  "Face Contouring",
  "4D Liposculpture",
  "Brazilian Butt Lift",
  "Double Chin",
  "Rhinoplasty",
  "Breast Surgery",
  "Facelift & Neck Lift",
  "Eyelid Lift",
  "Thread Lift",
  "Botox",
  "Tummy Tuck",
  "Hand Rejuvenation",
]

export function FooterSection() {
  return (
    <footer
      className="border-t relative overflow-hidden py-12 md:py-16 lg:py-20"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border-subtle)",
      }}
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/40 to-transparent" />

      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#c9a96e 1px, transparent 1px), linear-gradient(90deg, #c9a96e 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b"
          style={{ borderColor: "var(--border-subtle)" }}
        >

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 rounded-full border flex items-center justify-center"
                style={{ borderColor: "var(--border-medium)" }}
              >
                <p
                  className="text-[#c9a96e] text-xs font-light"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  UL
                </p>
              </div>
              <div>
                <p className="text-xs font-medium tracking-wide" style={{ color: "var(--text-heading)" }}>Dr. Usman Liaqat</p>
                <p className="text-[#c9a96e]/60 text-[9px] tracking-wider uppercase">Plastic & Reconstructive Surgery</p>
              </div>
            </div>
            <AnimatedText
              text="Board-certified plastic surgeon dedicated to natural results, patient safety, and transformative care across Saudi Arabia."
              className="text-xs leading-relaxed mb-5"
              style={{ color: "var(--text-secondary)", opacity: 0.7 }}
              stagger={0.025}
            />
            <p
              className="text-[#c9a96e]/40 text-xs leading-relaxed"
              dir="rtl"
              style={{ fontFamily: "'Siwa', serif" }}
            >
              جراح تجميل معتمد · الخبر · الدمام
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase mb-5">Navigate</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs hover:text-[#c9a96e] transition-colors duration-300 flex items-center gap-2 group"
                    style={{ color: "var(--text-secondary)", opacity: 0.6 }}
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#c9a96e] transition-all duration-300 shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Procedures */}
          <div>
            <p className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase mb-5">Procedures</p>
            <ul className="space-y-3">
              {procedures.map((proc) => (
                <li key={proc}>
                  <a
                    href="#services"
                    className="text-xs hover:text-[#c9a96e] transition-colors duration-300 flex items-center gap-2 group"
                    style={{ color: "var(--text-secondary)", opacity: 0.6 }}
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#c9a96e] transition-all duration-300 shrink-0" />
                    {proc}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <p className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase mb-5">Connect</p>

            <div className="space-y-4 mb-8">
              {/* WhatsApp */}
              <a
                href="https://wa.me/966XXXXXXXXXX"
                className="flex items-center gap-3 text-xs hover:text-[#c9a96e] transition-colors duration-300 group"
                style={{ color: "var(--text-secondary)", opacity: 0.6 }}
              >
                <svg
                  className="w-3.5 h-3.5 text-[#c9a96e]/50 group-hover:text-[#c9a96e] transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>

            </div>

            {/* Locations */}
            <div className="space-y-2">
              <p className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase mb-3">Locations</p>
              <p className="text-xs" style={{ color: "var(--text-secondary)", opacity: 0.5 }}>Al Khobar · Eastern Province</p>
              <p className="text-xs" style={{ color: "var(--text-secondary)", opacity: 0.5 }}>Dammam · Eastern Province</p>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-[10px] tracking-wider" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
            © {new Date().getFullYear()} Dr. Usman Liaqat · Plastic & Reconstructive Surgery · All Rights Reserved
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[10px] hover:text-[#c9a96e]/60 transition-colors duration-300" style={{ color: "var(--text-muted)", opacity: 0.4 }}>
              Privacy Policy
            </a>
            <a href="#" className="text-[10px] hover:text-[#c9a96e]/60 transition-colors duration-300" style={{ color: "var(--text-muted)", opacity: 0.4 }}>
              Terms of Service
            </a>
            <span className="text-[#c9a96e]/30 text-[10px]">KSA Medical License · Active</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
