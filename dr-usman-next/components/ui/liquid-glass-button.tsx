"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/* ── SVG displacement filter — embed once per page ── */
export function GlassFilter() {
  return (
    <svg className="absolute w-0 h-0 overflow-hidden pointer-events-none" aria-hidden>
      <defs>
        <filter id="liquid-glass-filter" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="70" xChannelSelector="R" yChannelSelector="B" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}

/* ── Variants ── */
export const liquidButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center cursor-pointer gap-2",
    "whitespace-nowrap font-semibold tracking-wide",
    "transition-all duration-300 select-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/50",
    "overflow-hidden",   /* keeps sheen clipped to pill shape */
  ].join(" "),
  {
    variants: {
      variant: {
        gold:  "text-[#0a0a08] hover:scale-[1.04] active:scale-[0.97]",
        glass: "text-[#C9A96E] hover:scale-[1.04] active:scale-[0.97]",
        pill:  "text-[#C9A96E] hover:scale-[1.03] active:scale-[0.97]",
      },
      size: {
        sm:      "h-9  min-w-[80px]  px-5 text-[11px] rounded-full",
        default: "h-11 min-w-[120px] px-7 text-[12px] rounded-full",
        lg:      "h-12 min-w-[160px] px-9 text-[13px] rounded-full",
        pill:    "h-7  min-w-[60px]  px-3 text-[10px] rounded-full",
      },
    },
    defaultVariants: {
      variant: "glass",
      size: "default",
    },
  }
)

/* ── Shared style builder ── */
function glassStyle(variant: "gold" | "glass" | "pill") {
  const isGold = variant === "gold"
  return {
    background: isGold
      ? "linear-gradient(135deg, #C9A96E 0%, #e8d5a8 45%, #C9A96E 100%)"
      : "rgba(255,255,255,0.07)",
    border: isGold
      ? "1px solid rgba(201,169,110,0.65)"
      : "1px solid rgba(201,169,110,0.32)",
    backdropFilter:       "blur(14px) saturate(180%)",
    WebkitBackdropFilter: "blur(14px) saturate(180%)",
    boxShadow: isGold
      ? "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.18), 0 4px 20px rgba(201,169,110,0.30), 0 1px 4px rgba(0,0,0,0.10)"
      : "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.07)",
  } as React.CSSProperties
}

/* ── LiquidButton ── */
export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidButtonVariants> {
  asChild?: boolean
}

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant = "glass", size = "default", asChild = false, children, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(liquidButtonVariants({ variant, size, className }))}
        style={{ ...glassStyle(variant as "gold" | "glass" | "pill"), ...style }}
        {...props}
      >
        {/* Inner top sheen — clipped by overflow-hidden on parent */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-4 right-4 top-0 h-px"
          style={{
            background: (variant === "gold")
              ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent)"
              : "linear-gradient(90deg, transparent, rgba(255,255,255,0.30), transparent)",
          }}
        />
        {/* Label — sits above sheen via isolation */}
        <span className="relative flex items-center gap-2 leading-none">
          {children}
        </span>
      </Comp>
    )
  }
)
LiquidButton.displayName = "LiquidButton"

/* ── LiquidLink — same look, renders <a> ── */
export interface LiquidLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof liquidButtonVariants> {}

export const LiquidLink = React.forwardRef<HTMLAnchorElement, LiquidLinkProps>(
  ({ className, variant = "glass", size = "default", children, style, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(liquidButtonVariants({ variant, size }), "no-underline", className)}
      style={{ ...glassStyle(variant as "gold" | "glass" | "pill"), ...style }}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-4 right-4 top-0 h-px"
        style={{
          background: (variant === "gold")
            ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.30), transparent)",
        }}
      />
      <span className="relative flex items-center gap-2 leading-none">
        {children}
      </span>
    </a>
  )
)
LiquidLink.displayName = "LiquidLink"
