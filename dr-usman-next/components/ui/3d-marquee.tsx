'use client'
/**
 * ThreeDMarquee — 3D rotating image marquee
 * Columns animate up/down alternately creating a flowing 3D gallery effect.
 */
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs))
}

interface ThreeDMarqueeProps {
  images?: string[]
  className?: string
}

const ThreeDMarquee = ({ images = [], className }: ThreeDMarqueeProps) => {
  const chunkSize = Math.ceil(images.length / 3)
  const chunks = Array.from({ length: 3 }, (_, colIndex) => {
    const start = colIndex * chunkSize
    return images.slice(start, start + chunkSize)
  })

  return (
    <div
      className={cn(
        'mx-auto block h-[560px] w-full overflow-hidden rounded-none max-xl:h-[480px] max-sm:h-[400px]',
        className,
      )}
    >
      <div className="flex size-full items-center justify-center">
        <div className="aspect-square size-[720px] shrink-0 scale-[1.35] max-xl:size-full max-xl:scale-[1.1] max-sm:scale-[1.3]">
          <div
            style={{ transform: 'rotateX(45deg) rotateY(0deg) rotateZ(45deg)' }}
            className="relative top-0 right-[-55%] grid size-full origin-top-left grid-cols-3 gap-5 [transform-style:preserve-3d] max-xl:-top-30 max-xl:right-[-45%] max-sm:top-0 max-sm:gap-2"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.figure
                key={colIndex}
                animate={{ y: colIndex % 2 === 0 ? 60 : -60 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                className="flex flex-col items-start gap-5 max-sm:gap-2"
              >
                {subarray.map((src, imageIndex) => (
                  <div key={`${colIndex}-${imageIndex}`} className="relative overflow-hidden rounded-lg group">
                    <img
                      className="aspect-[4/3] h-full w-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
                      src={src}
                      draggable={false}
                      alt={`Gallery image ${colIndex * chunkSize + imageIndex + 1}`}
                      loading="lazy"
                    />
                    {/* Subtle gold shimmer on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.08) 0%, transparent 60%)' }}
                    />
                  </div>
                ))}
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreeDMarquee
