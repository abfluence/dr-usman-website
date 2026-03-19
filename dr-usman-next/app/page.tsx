"use client"
import dynamic from "next/dynamic"
import { Header } from "@/components/ui/shaders-hero-section"
import { HeroSection } from "@/components/ui/hero-section"

// Lazy-load every below-fold section — they only bundle + render when needed
const ProceduresSelector  = dynamic(() => import("@/components/ui/procedures-selector").then(m => ({ default: m.ProceduresSelector })))
const AboutSection        = dynamic(() => import("@/components/ui/about-section").then(m => ({ default: m.AboutSection })))
const TestimonialsSection = dynamic(() => import("@/components/ui/testimonials-section").then(m => ({ default: m.TestimonialsSection })))
const FaqSection          = dynamic(() => import("@/components/ui/faq-section").then(m => ({ default: m.FaqSection })))
const BookingSection      = dynamic(() => import("@/components/ui/booking-section").then(m => ({ default: m.BookingSection })))
const FooterSection       = dynamic(() => import("@/components/ui/footer-section").then(m => ({ default: m.FooterSection })))
const GallerySection      = dynamic(() => import("@/components/ui/gallery-section").then(m => ({ default: m.GallerySection })))
const FloatingAiChat      = dynamic(() => import("@/components/ui/floating-ai-chat").then(m => ({ default: m.FloatingAiChat })))

export default function Home() {
  return (
    <main>
      {/* ── FIXED NAVBAR (always on top) ──────────────────────── */}
      <Header />

      {/* ── 1. HERO — Infinite Grid + Dr. Usman name & photo ──── */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* ── 2. PROCEDURES INTERACTIVE SELECTOR ───────────────── */}
      <section id="services">
        <ProceduresSelector />
      </section>

      {/* ── 3. ABOUT ──────────────────────────────────────────── */}
      <AboutSection />

      {/* ── 4. TESTIMONIALS ───────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── 6. FAQ ────────────────────────────────────────────── */}
      <FaqSection />

      {/* ── 7. GALLERY ────────────────────────────────────────── */}
      <GallerySection />

      {/* ── 8. BOOKING / CONTACT CTA ──────────────────────────── */}
      <section id="contact">
        <BookingSection />
      </section>

      {/* ── 9. FOOTER ─────────────────────────────────────────── */}
      <FooterSection />

      {/* ── FLOATING AI CHAT (fixed, right side) ──────────────── */}
      <FloatingAiChat />
    </main>
  )
}
