"use client"

import { InfiniteGrid } from "@/components/ui/the-infinite-grid"
import { GlassFilter } from "@/components/ui/liquid-glass-button"
import { MovingBorderLink } from "@/components/ui/moving-border"

export function HeroSection() {
  return (
    <InfiniteGrid className="flex items-stretch min-h-screen">
      <GlassFilter />

      <div
        className="flex flex-col md:flex-row items-stretch w-full"
        style={{
          minHeight:  "100vh",
          paddingTop: "80px",
        }}
      >
        {/* ── LEFT — text ──────────────────────────────────────────── */}
        <div
          className="flex flex-col justify-center"
          style={{
            flex:          "1 1 0",
            paddingLeft:   "clamp(16px, 4vw, 64px)",
            paddingRight:  "clamp(16px, 3vw, 48px)",
            paddingBottom: "clamp(48px, 6vw, 80px)",
            paddingTop:    "clamp(32px, 4vw, 48px)",
            textAlign:     "left",
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontSize:      "11px",
              fontWeight:    400,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color:         "rgba(201,169,110,0.65)",
              marginBottom:  "20px",
            }}
          >
            Board-Certified Plastic &amp; Reconstructive Surgeon
          </p>

          {/* Name */}
          <h1
            style={{
              fontSize:   "clamp(52px, 7vw, 100px)",
              fontWeight: 700,
              lineHeight: 1,
              color:      "var(--text-heading)",
              margin:     0,
            }}
          >
            Dr. Usman
          </h1>
          <h1
            style={{
              fontSize:     "clamp(52px, 7vw, 100px)",
              fontWeight:   700,
              fontStyle:    "italic",
              lineHeight:   1,
              color:        "#C9A96E",
              margin:       0,
              marginBottom: "32px",
            }}
          >
            Liaqat
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize:     "14px",
              color:        "var(--text-muted)",
              lineHeight:   1.7,
              maxWidth:     "420px",
              marginBottom: "32px",
            }}
          >
            9+ years of excellence in 4D Liposculpture, BBL, Rhinoplasty &amp;
            Breast Surgery. Trusted by thousands across Saudi Arabia.
          </p>

          {/* Stats row */}
          <div
            style={{
              display:      "flex",
              alignItems:   "center",
              gap:          "28px",
              marginBottom: "36px",
            }}
          >
            {[
              { v: "9+",    l: "Years" },
              { v: "1000+", l: "Procedures" },
              { v: "2",     l: "Clinics" },
            ].map((s, i) => (
              <div key={s.l} style={{ display: "flex", alignItems: "center", gap: "28px" }}>
                {i > 0 && (
                  <div style={{ width: "1px", height: "32px", background: "var(--border-subtle)" }} />
                )}
                <div>
                  <p style={{ fontSize: "20px", fontWeight: 600, color: "#C9A96E", margin: 0 }}>{s.v}</p>
                  <p style={{ fontSize: "10px", color: "var(--text-muted)", margin: 0, letterSpacing: "0.06em" }}>{s.l}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA buttons — moving border */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
            <MovingBorderLink
              href="https://wa.me/966XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              variant="gold"
              borderRadius="0.5rem"
              duration={2200}
            >
              Book Consultation
            </MovingBorderLink>
            <MovingBorderLink
              href="#services"
              variant="glass"
              borderRadius="0.5rem"
              duration={3000}
            >
              View Procedures
            </MovingBorderLink>
          </div>
        </div>

        {/* ── RIGHT — doctor photo touching bottom border ───────────── */}
        <div
          className="hidden md:block"
          style={{
            flex:     "0 0 clamp(280px, 40vw, 560px)",
            position: "relative",
            overflow: "hidden",
            minHeight: "480px",
          }}
        >
          {/* Ambient gold glow at feet */}
          <div
            style={{
              position:     "absolute",
              bottom:       "-5%",
              left:         "50%",
              transform:    "translateX(-50%)",
              width:        "80%",
              height:       "20%",
              borderRadius: "9999px",
              background:   "radial-gradient(ellipse, rgba(201,169,110,0.28) 0%, transparent 70%)",
              filter:       "blur(40px)",
              zIndex:       0,
            }}
          />

          {/* Gradient fade bottom → page bg (removes white edge) */}
          <div
            style={{
              position:   "absolute",
              bottom:     0,
              left:       0,
              right:      0,
              height:     "22%",
              background: "linear-gradient(to top, var(--bg-page) 15%, transparent 100%)",
              zIndex:     2,
              pointerEvents: "none",
            }}
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/dr-usman-scrubs.png"
            alt="Dr. Usman Liaqat"
            style={{
              position:       "absolute",
              bottom:         0,           /* touch bottom border */
              left:           0,
              right:          0,
              width:          "100%",
              height:         "95%",
              objectFit:      "contain",
              objectPosition: "bottom center",
              zIndex:         1,
            }}
          />
        </div>
      </div>
    </InfiniteGrid>
  )
}
