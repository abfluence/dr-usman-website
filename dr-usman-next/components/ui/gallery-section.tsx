'use client'
import { motion } from 'framer-motion'
import ThreeDMarquee from '@/components/ui/3d-marquee'
import { MovingBorderLink } from '@/components/ui/moving-border'

// ── High-quality Unsplash images — luxury beauty, skin, clinic, results ──────
const galleryImages = [
  // Elegant portrait / beauty
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&auto=format&fit=crop&q=80',
  // Clinic / surgical precision
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&auto=format&fit=crop&q=80',
  // Skin care / glow
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&auto=format&fit=crop&q=80',
  // Confidence / lifestyle
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
  // Body / contouring
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1526835746352-0b9da4054862?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80',
  // Results / transformation
  'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=600&auto=format&fit=crop&q=80',
  // Luxury / premium feel
  'https://images.unsplash.com/photo-1520810627419-35e6bfbd7e76?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1560472355-109703aa3edc?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=80',
]

export function GallerySection() {
  return (
    <section
      id="gallery"
      className="overflow-hidden"
      style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--bg-page)" }}
    >

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 md:pt-20 lg:pt-24 pb-10 md:pb-12"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase mb-4">
              Before &amp; After
            </p>
            <h2
              className="text-5xl md:text-6xl font-light leading-[1.1]"
              style={{ fontFamily: "'Lora', serif", color: "var(--text-heading)" }}
            >
              Personal{' '}
              <em className="italic text-[#c9a96e]">Gallery</em>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Every image tells a story of confidence restored and beauty refined.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── 3D Marquee ── */}
      <div className="relative">
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, var(--bg-page) 0%, transparent 100%)' }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--bg-page) 0%, transparent 100%)' }}
        />
        {/* Left fade */}
        <div className="absolute top-0 bottom-0 left-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--bg-page) 0%, transparent 100%)' }}
        />

        <ThreeDMarquee images={galleryImages} />
      </div>

      {/* ── Bottom stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16 md:pb-20 lg:pb-24 pt-8"
      >
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          {/* Stats */}
          <div className="flex items-center gap-8">
            {[
              { value: '1000+', label: 'Procedures' },
              { value: '9+',    label: 'Years' },
              { value: '5.0★',  label: 'Rating' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p
                  className="text-2xl font-light text-[#c9a96e]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {s.value}
                </p>
                <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: "var(--text-secondary)" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
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
    </section>
  )
}
