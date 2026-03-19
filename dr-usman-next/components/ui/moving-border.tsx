"use client"
import React, { useRef } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { cn } from "@/lib/utils"

// ── Variant config ─────────────────────────────────────────────────────────────
type Variant = "gold" | "glass" | "dark"

const variantStyles: Record<Variant, { glow: string; inner: string }> = {
  gold: {
    glow:  "bg-[radial-gradient(#C9A96E_40%,transparent_60%)]",
    inner: [
      "bg-[rgba(201,169,110,0.12)]",
      "border border-[rgba(201,169,110,0.45)]",
      "text-[#C9A96E]",
      "hover:bg-[rgba(201,169,110,0.2)]",
      "backdrop-blur-xl",
    ].join(" "),
  },
  glass: {
    glow:  "bg-[radial-gradient(rgba(255,255,255,0.8)_40%,transparent_60%)]",
    inner: [
      "bg-[rgba(255,255,255,0.07)]",
      "border border-[rgba(255,255,255,0.18)]",
      "text-[var(--text-heading)]",
      "hover:bg-[rgba(255,255,255,0.12)]",
      "backdrop-blur-xl",
    ].join(" "),
  },
  dark: {
    glow:  "bg-[radial-gradient(#C9A96E_40%,transparent_60%)]",
    inner: [
      "bg-[rgba(6,6,4,0.85)]",
      "border border-[rgba(201,169,110,0.30)]",
      "text-[#e8d5a8]",
      "hover:bg-[rgba(6,6,4,0.95)]",
      "backdrop-blur-xl",
    ].join(" "),
  },
}

// ── MovingBorder — SVG path tracker ───────────────────────────────────────────
export const MovingBorder = ({
  children,
  duration = 2400,
  rx = "30%",
  ry = "30%",
  ...otherProps
}: {
  children: React.ReactNode
  duration?: number
  rx?: string
  ry?: string
  [key: string]: any
}) => {
  const pathRef = useRef<SVGRectElement | null>(null)
  const progress = useMotionValue<number>(0)

  useAnimationFrame((time) => {
    const length = (pathRef.current as SVGGeometryElement | null)?.getTotalLength()
    if (length) {
      const pxPerMs = length / duration
      progress.set((time * pxPerMs) % length)
    }
  })

  const x = useTransform(progress, (val) =>
    (pathRef.current as SVGGeometryElement | null)?.getPointAtLength(val).x
  )
  const y = useTransform(progress, (val) =>
    (pathRef.current as SVGGeometryElement | null)?.getPointAtLength(val).y
  )
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  )
}

// ── Shared inner shell ─────────────────────────────────────────────────────────
interface BaseProps {
  borderRadius?: string
  children: React.ReactNode
  containerClassName?: string
  borderClassName?: string
  innerClassName?: string
  duration?: number
  variant?: Variant
  className?: string
}

function Shell({
  borderRadius = "0.6rem",
  children,
  containerClassName,
  borderClassName,
  innerClassName,
  duration,
  variant = "gold",
  className,
}: BaseProps) {
  const { glow, inner } = variantStyles[variant]
  return (
    <div
      className={cn(
        "relative overflow-hidden p-[1px]",
        "h-11",           // fixed height — 44 px
        "w-auto",         // width = content
        containerClassName
      )}
      style={{ borderRadius }}
    >
      {/* ── Animated border track ── */}
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div className={cn("h-16 w-16 opacity-90", glow, borderClassName)} />
        </MovingBorder>
      </div>

      {/* ── Content shell ── */}
      <div
        className={cn(
          "relative z-10 flex items-center justify-center gap-2",
          "w-full h-full",
          "px-6",                  // horizontal breathing room
          "text-xs tracking-[0.12em] uppercase font-medium",
          "whitespace-nowrap",     // never wrap text
          "transition-colors duration-300",
          "antialiased",
          inner,
          innerClassName,
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </div>
  )
}

// ── Public: <button> ───────────────────────────────────────────────────────────
export interface MovingBorderButtonProps
  extends BaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {}

export function MovingBorderButton({
  children,
  borderRadius,
  containerClassName,
  borderClassName,
  innerClassName,
  duration,
  variant,
  className,
  ...rest
}: MovingBorderButtonProps) {
  return (
    <button type="button" {...rest}>
      <Shell
        borderRadius={borderRadius}
        containerClassName={containerClassName}
        borderClassName={borderClassName}
        innerClassName={innerClassName}
        duration={duration}
        variant={variant}
        className={className}
      >
        {children}
      </Shell>
    </button>
  )
}

// ── Public: <a> ───────────────────────────────────────────────────────────────
export interface MovingBorderLinkProps
  extends BaseProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> {
  /** Classes applied to the outer <a> element (e.g. "hidden md:inline-flex") */
  wrapperClassName?: string
}

export function MovingBorderLink({
  children,
  borderRadius,
  containerClassName,
  borderClassName,
  innerClassName,
  duration,
  variant,
  className,
  wrapperClassName,
  ...rest
}: MovingBorderLinkProps) {
  return (
    <a className={wrapperClassName} {...rest}>
      <Shell
        borderRadius={borderRadius}
        containerClassName={containerClassName}
        borderClassName={borderClassName}
        innerClassName={innerClassName}
        duration={duration}
        variant={variant}
        className={className}
      >
        {children}
      </Shell>
    </a>
  )
}

// ── Re-export original generic Button for backwards compat ────────────────────
export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string
  children: React.ReactNode
  as?: any
  containerClassName?: string
  borderClassName?: string
  duration?: number
  className?: string
  [key: string]: any
}) {
  return (
    <Component
      className={cn(
        "bg-transparent relative text-xl h-16 w-40 p-[1px] overflow-hidden",
        containerClassName
      )}
      style={{ borderRadius }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 opacity-[0.8] bg-[radial-gradient(#C9A96E_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>
      <div
        className={cn(
          "relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white",
          "flex items-center justify-center w-full h-full text-sm antialiased",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  )
}
