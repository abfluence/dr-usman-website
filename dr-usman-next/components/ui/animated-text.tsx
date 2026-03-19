"use client"
import { motion } from "framer-motion"
import { useMemo } from "react"

/**
 * AnimatedText — word-by-word stagger slide-up reveal.
 * Each word lifts from below the baseline and fades in,
 * creating a clean, typographic reveal on scroll.
 */

type TextTag = "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "li"

interface AnimatedTextProps {
  /** Plain string to animate word-by-word */
  text: string
  className?: string
  el?: TextTag
  /** Seconds between each word appearing */
  stagger?: number
  /** Initial delay before animation starts */
  delay?: number
  /** Whether to only play once when entering viewport */
  once?: boolean
  /** Pixel margin before element is considered "in view" */
  margin?: string
}

export function AnimatedText({
  text,
  className = "",
  el: Tag = "p",
  stagger = 0.038,
  delay = 0,
  once = true,
  margin = "-20px",
}: AnimatedTextProps) {
  const words = useMemo(() => text.trim().split(/\s+/), [text])

  return (
    <Tag className={`overflow-hidden leading-[inherit] ${className}`}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin }}
      >
        {words.map((word, i) => (
          /* Each word gets its own overflow-hidden container so the
             slide-up is clipped at the baseline */
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "105%", opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.55,
                    delay: delay + i * stagger,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              {/* Non-breaking space keeps the word spacing */}
              {word}&nbsp;
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

/**
 * AnimatedBlock — animates a multi-paragraph block.
 * Pass an array of strings; each becomes an AnimatedText paragraph
 * with staggered delays between paragraphs.
 */
interface AnimatedBlockProps {
  paragraphs: string[]
  className?: string
  paragraphClassName?: string
  stagger?: number
  paragraphDelay?: number
}

export function AnimatedBlock({
  paragraphs,
  className = "",
  paragraphClassName = "",
  stagger = 0.035,
  paragraphDelay = 0.15,
}: AnimatedBlockProps) {
  return (
    <div className={className}>
      {paragraphs.map((text, i) => (
        <AnimatedText
          key={i}
          text={text}
          el="p"
          className={paragraphClassName}
          stagger={stagger}
          delay={i * paragraphDelay}
        />
      ))}
    </div>
  )
}
