"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { MovingBorderLink } from "@/components/ui/moving-border"

// ── FAQ data — Dr. Usman Liaqat ──────────────────────────────────────────────
const faqItems = [
  {
    id: "item-1",
    question: "Am I a good candidate for plastic surgery?",
    arabicQ: "هل أنا مرشحة مناسبة لعملية التجميل؟",
    answer:
      "Good candidates are healthy adults with realistic expectations. During your private consultation, Dr. Usman will evaluate your medical history, aesthetic goals, and recommend the most suitable approach tailored specifically to you.",
  },
  {
    id: "item-2",
    question: "What is 4D Liposculpture and how is it different from regular liposuction?",
    arabicQ: "ما هو شفط الدهون رباعي الأبعاد وكيف يختلف؟",
    answer:
      "4D Liposculpture is an advanced body contouring technique that removes fat while simultaneously sculpting the underlying muscles to create a toned, athletic appearance. Unlike traditional liposuction, it creates visible muscle definition even at rest — not just fat removal.",
  },
  {
    id: "item-3",
    question: "How long is the recovery period after surgery?",
    arabicQ: "كم تستغرق فترة التعافي بعد الجراحة؟",
    answer:
      "Recovery varies by procedure. Minor treatments like Botox or lip filler require no downtime. Body contouring procedures typically require 7–14 days. Dr. Usman will provide a detailed, personalized recovery plan before any procedure.",
  },
  {
    id: "item-4",
    question: "Will my results look natural?",
    arabicQ: "هل ستبدو النتائج طبيعية؟",
    answer:
      "Natural, beautiful results are Dr. Usman's signature. His philosophy is enhancement — not transformation. Every procedure is carefully planned to complement your natural features, ensuring results that nobody can identify as 'surgical.'",
  },
  {
    id: "item-5",
    question: "Are consultations private and confidential?",
    arabicQ: "هل الاستشارات خاصة وسرية؟",
    answer:
      "Absolutely. All consultations and patient information are strictly confidential. Dr. Usman's practice adheres to the highest standards of patient privacy and is fully available in both Arabic and English.",
  },
  {
    id: "item-6",
    question: "How do I book a consultation?",
    arabicQ: "كيف أحجز استشارة؟",
    answer:
      "The easiest way is via WhatsApp — simply tap the button on this page and our team will respond promptly to schedule your private consultation at either our Al Khobar or Dammam clinic.",
  },
  {
    id: "item-7",
    question: "Do you offer procedures for international patients?",
    arabicQ: "هل تقدمون خدماتكم للمرضى الدوليين؟",
    answer:
      "Yes. Dr. Usman's clinic welcomes patients from across the GCC and internationally. Our team can assist with travel arrangements, accommodation recommendations, and post-procedure follow-up plans.",
  },
  {
    id: "item-8",
    question: "What safety protocols are in place during procedures?",
    arabicQ: "ما هي بروتوكولات السلامة المتبعة أثناء الإجراءات؟",
    answer:
      "Patient safety is our highest priority. All procedures are performed in fully accredited, state-of-the-art surgical facilities with board-certified anesthesiologists, sterile environments, and comprehensive pre/post-operative care protocols.",
  },
]

// ── Blur-in stagger animation for answer text ─────────────────────────────────
export function BlurredStagger({ text }: { text: string }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.012 },
    },
  }

  const letterAnimation = {
    hidden: { opacity: 0, filter: "blur(8px)" },
    show:   { opacity: 1, filter: "blur(0px)" },
  }

  return (
    <div className="w-full">
      <motion.p
        variants={container}
        initial="hidden"
        animate="show"
        className="text-sm leading-relaxed break-words whitespace-normal"
        style={{ color: "var(--text-secondary)" }}
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={letterAnimation}
            transition={{ duration: 0.25 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  )
}

// ── Main FAQ component ────────────────────────────────────────────────────────
export default function FAQs() {
  return (
    <section
      id="faq"
      className="border-t py-16 md:py-20 lg:py-24"
      style={{
        background: "var(--bg-section-alt)",
        borderColor: "var(--border-subtle)",
        position: "relative",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <p className="text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase mb-8">
          Common Questions
        </p>

        <div className="grid gap-10 md:grid-cols-5 md:gap-14">

          {/* ── Left sticky header ── */}
          <div className="md:col-span-2">
            <h2
              className="text-5xl md:text-6xl font-light leading-[1.1] mb-5"
              style={{ fontFamily: "'Lora', serif", color: "var(--text-heading)" }}
            >
              Your{" "}
              <br />
              Questions,{" "}
              <em className="italic text-[#c9a96e]">Answered</em>
            </h2>

            <p className="text-sm leading-relaxed mb-8 hidden md:block" style={{ color: "var(--text-secondary)" }}>
              Have something more specific in mind? Our team is available via WhatsApp in both Arabic and English.
            </p>

            {/* Arabic label */}
            <p
              className="text-[#c9a96e]/40 text-xs mb-8 hidden md:block"
              dir="rtl"
            >
              متوفرون للرد باللغة العربية
            </p>

            {/* WhatsApp CTA — moving border */}
            <MovingBorderLink
              href="https://wa.me/966XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              variant="gold"
              borderRadius="0.5rem"
              duration={2200}
              wrapperClassName="hidden md:block"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Ask Us on WhatsApp
            </MovingBorderLink>
          </div>

          {/* ── Right accordion ── */}
          <div className="md:col-span-3">
            <Accordion type="single" collapsible defaultValue="item-1">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="last:border-0"
                  style={{ borderBottom: "1px solid var(--border-subtle)" }}
                >
                  <AccordionTrigger
                    className="cursor-pointer text-sm font-light hover:text-[#c9a96e] hover:no-underline transition-colors duration-200 py-4 text-left gap-4"
                    style={{ color: "var(--text-heading)" }}
                  >
                    <span className="flex-1 text-left">
                      {item.question}
                      <span
                        className="block text-[10px] text-[#c9a96e]/30 mt-0.5"
                        dir="rtl"
                      >
                        {item.arabicQ}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-1">
                    <BlurredStagger text={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Mobile bottom CTA */}
          <p className="text-sm mt-2 md:hidden" style={{ color: "var(--text-secondary)" }}>
            Can&apos;t find what you&apos;re looking for?{" "}
            <a
              href="https://wa.me/966XXXXXXXXXX"
              className="text-[#c9a96e] hover:underline"
            >
              Contact us on WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
