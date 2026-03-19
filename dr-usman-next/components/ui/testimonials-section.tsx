"use client"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Marquee } from "@/components/ui/3d-testimonails"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Noor Al-Rashid",
    username: "@noor_ksa",
    procedure: "4D Liposculpture",
    body: "The results are so natural nobody can tell I had anything done. I finally have the silhouette I always dreamed of. Dr. Usman's technique is truly world-class.",
    img: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
  },
  {
    name: "Fatima Al-Zahrani",
    username: "@fatima_dammam",
    procedure: "Brazilian Butt Lift",
    body: "The care and attention I received throughout the entire process was exceptional. My confidence is completely transformed. Shukran Dr. Usman!",
    img: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 5,
  },
  {
    name: "Hessa Al-Otaibi",
    username: "@hessa_beauty",
    procedure: "Rhinoplasty",
    body: "Dr. Usman listened to exactly what I wanted and delivered perfection. Subtle, natural, and absolutely beautiful. I cannot recommend him enough.",
    img: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 5,
  },
  {
    name: "Maha Al-Ghamdi",
    username: "@maha_alkhobar",
    procedure: "Breast Surgery",
    body: "From the consultation to the final result, everything exceeded my expectations. I feel like myself again. The clinic in Al Khobar is amazing.",
    img: "https://randomuser.me/api/portraits/women/4.jpg",
    rating: 5,
  },
  {
    name: "Layla Al-Shehri",
    username: "@layla_aesthetic",
    procedure: "Facelift",
    body: "Professional, precise, and absolutely worth every moment. I look 10 years younger and completely natural. Everyone is asking my secret!",
    img: "https://randomuser.me/api/portraits/women/5.jpg",
    rating: 5,
  },
  {
    name: "Amira Al-Harbi",
    username: "@amira_riyadh",
    procedure: "Thread Lift",
    body: "I was nervous at first, but the entire team made me feel safe and cared for. The results are phenomenal — lifted, fresh, and completely natural.",
    img: "https://randomuser.me/api/portraits/women/6.jpg",
    rating: 5,
  },
  {
    name: "Dana Al-Mutairi",
    username: "@dana_ksa",
    procedure: "Double Chin Lipo",
    body: "Pain-free procedure with meticulous results. My jawline transformation is beyond what I imagined possible. Dr. Usman is truly gifted.",
    img: "https://randomuser.me/api/portraits/women/7.jpg",
    rating: 5,
  },
  {
    name: "Sarah Al-Qahtani",
    username: "@sarah_dammam",
    procedure: "Eyelid Lift",
    body: "Seeing the before-and-after results was absolutely amazing. Dr. Usman is truly gifted. The recovery was smooth and the team was so supportive.",
    img: "https://randomuser.me/api/portraits/women/8.jpg",
    rating: 5,
  },
  {
    name: "Rima Al-Dosari",
    username: "@rima_beauty_ksa",
    procedure: "Body Contouring",
    body: "Traveled from Bahrain specifically for Dr. Usman — worth every moment. His artistry and precision are unmatched in the entire Gulf region.",
    img: "https://randomuser.me/api/portraits/women/9.jpg",
    rating: 5,
  },
]

const firstRow = testimonials.slice(0, 3)
const secondRow = testimonials.slice(3, 6)
const thirdRow = testimonials.slice(6, 9)
const fourthRow = testimonials.slice(0, 3)

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3 h-3 text-[#C9A96E]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

const TestimonialCard = ({
  img,
  name,
  username,
  body,
  procedure,
  rating,
}: {
  img: string
  name: string
  username: string
  body: string
  procedure: string
  rating: number
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden border p-5",
        "transition-all duration-300 hover:shadow-md",
      )}
      style={{
        borderColor: "var(--border-subtle)",
        background: "var(--bg-card)",
      }}
    >
      {/* Procedure badge */}
      <div className="absolute top-4 right-4">
        <span className="text-[8px] tracking-[0.15em] uppercase text-[#c9a96e]/70 bg-[#c9a96e]/8 px-2 py-0.5 border border-[#c9a96e]/20">
          {procedure}
        </span>
      </div>

      <div className="flex flex-row items-center gap-3 mb-3">
        <Avatar
          className="h-9 w-9 ring-1 ring-[#C9A96E]/40 ring-offset-1"
          style={{ "--tw-ring-offset-color": "var(--bg-card)" } as React.CSSProperties}
        >
          <AvatarImage src={img} alt={name} />
          <AvatarFallback
            className="text-[#c9a96e] text-xs"
            style={{ background: "var(--bg-section-alt)" }}
          >
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <figcaption className="text-xs font-medium" style={{ color: "var(--text-heading)" }}>{name}</figcaption>
          <p className="text-[10px] font-normal text-[#c9a96e]/60">{username}</p>
        </div>
      </div>

      <StarRating count={rating} />

      <blockquote className="text-xs leading-relaxed font-light" style={{ color: "var(--text-secondary)" }}>
        &ldquo;{body}&rdquo;
      </blockquote>
    </figure>
  )
}

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="overflow-hidden py-16 md:py-20 lg:py-24"
      style={{ background: "var(--bg-section-alt)" }}
    >
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase mb-4">Patient Stories</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="text-5xl md:text-6xl font-light leading-[1.1]"
              style={{ fontFamily: "'Lora', serif", color: "var(--text-heading)" }}
            >
              Words That{" "}
              <em className="italic text-[#c9a96e]">Inspire Us</em>
            </h2>
            <p className="text-sm max-w-xs md:text-right leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              All reviews are from verified patients across Saudi Arabia.
            </p>
          </div>
        </motion.div>
      </div>

      {/* 3D Marquee Container */}
      <div
        className="relative flex h-[500px] w-full flex-row items-center justify-center gap-4 overflow-hidden"
        style={{
          perspective: "300px",
        }}
      >
        <div
          className="flex flex-row items-center gap-4"
          style={{
            transform:
              "translateX(-80px) translateY(0px) translateZ(-100px) rotateX(18deg) rotateY(-8deg) rotateZ(18deg)",
          }}
        >
          <Marquee pauseOnHover vertical className="[--duration:20s]">
            {firstRow.map((review) => (
              <TestimonialCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical className="[--duration:25s]">
            {secondRow.map((review) => (
              <TestimonialCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee pauseOnHover vertical className="[--duration:22s]">
            {thirdRow.map((review) => (
              <TestimonialCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical className="[--duration:28s]">
            {fourthRow.map((review) => (
              <TestimonialCard key={review.username} {...review} />
            ))}
          </Marquee>
        </div>

        {/* Edge fade gradients */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4" style={{ background: "linear-gradient(to bottom, var(--bg-section-alt), transparent)" }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4" style={{ background: "linear-gradient(to top, var(--bg-section-alt), transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4" style={{ background: "linear-gradient(to right, var(--bg-section-alt), transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4" style={{ background: "linear-gradient(to left, var(--bg-section-alt), transparent)" }} />
      </div>

      {/* Bottom stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10 flex items-center justify-between flex-wrap gap-6"
      >
        <div className="flex items-center gap-8">
          <div>
            <p className="text-2xl font-light" style={{ fontFamily: "'Lora', serif", color: "var(--text-heading)" }}>
              1000+
            </p>
            <p className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "var(--text-secondary)" }}>Procedures Done</p>
          </div>
          <div className="w-px h-8" style={{ background: "var(--border-subtle)" }} />
          <div>
            <div className="flex items-center gap-1">
              <p className="text-2xl font-light" style={{ fontFamily: "'Lora', serif", color: "var(--text-heading)" }}>
                5.0
              </p>
              <svg className="w-4 h-4 text-[#C9A96E] mb-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "var(--text-secondary)" }}>Average Rating</p>
          </div>
          <div className="w-px h-8" style={{ background: "var(--border-subtle)" }} />
          <div>
            <p className="text-2xl font-light" style={{ fontFamily: "'Lora', serif", color: "var(--text-heading)" }}>
              9+
            </p>
            <p className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "var(--text-secondary)" }}>Years Experience</p>
          </div>
        </div>

        <a
          href="https://wa.me/966XXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#c9a96e]/70 hover:text-[#c9a96e] text-xs tracking-[0.2em] uppercase transition-colors duration-300"
        >
          <span>Book a Consultation</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      </motion.div>
    </section>
  )
}
