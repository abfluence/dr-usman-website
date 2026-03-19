"use client"
import React, { useState, useEffect } from "react"

// ── Custom SVG icons — gold coin style matching reference image ─────────────

const FaceContourIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    {/* Face shape filled gold */}
    <path d="M12 2.5C9 2.5 6.8 5 6.8 8.5v4.5C6.8 17 9 20.5 12 20.5s5.2-3.5 5.2-7.5V8.5C17.2 5 15 2.5 12 2.5z" fill="#C9A96E"/>
    {/* Eyes */}
    <ellipse cx="9.8" cy="9.5" rx="1" ry="0.7" fill="#7a5820"/>
    <ellipse cx="14.2" cy="9.5" rx="1" ry="0.7" fill="#7a5820"/>
    {/* Mouth */}
    <path d="M10 13.5c.5 1 1.2 1.5 2 1.5s1.5-.5 2-1.5" stroke="#7a5820" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
    {/* Left jaw contour arrow */}
    <path d="M6.8 15c-1.3 1.5-1.2 3.5 0 4.5" stroke="#e8d5a8" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
    <path d="M6.8 19.5l1-2" stroke="#e8d5a8" strokeWidth="1.3" strokeLinecap="round"/>
    {/* Right jaw contour arrow */}
    <path d="M17.2 15c1.3 1.5 1.2 3.5 0 4.5" stroke="#e8d5a8" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
    <path d="M17.2 19.5l-1-2" stroke="#e8d5a8" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)

const DoubleChinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    {/* Side profile head silhouette */}
    <path d="M8 2.5c-2 1.5-3 4-3 6.5 0 3 1 5 1.5 7 .5 2 .5 3.5-1 5" stroke="#C9A96E" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M8 2.5c2-1.5 5-1 6 1.5s.5 5 0 7.5-.5 5-.5 7c0 2-.5 3.5-2 4.5" stroke="#C9A96E" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    {/* Chin bulge */}
    <path d="M5.5 17c-2 0-3.5 1-3.5 2.5S3.5 22 6 22" fill="#C9A96E" opacity="0.55"/>
    {/* Upward arrow */}
    <path d="M15 20V12" stroke="#e8d5a8" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M13 14l2-2.5 2 2.5" stroke="#e8d5a8" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const EyelidIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    {/* Eye shape */}
    <path d="M2 12c2.5-4 6-6 10-6s7.5 2 10 6c-2.5 4-6 6.5-10 6.5S4.5 16 2 12z" fill="#C9A96E" opacity="0.85"/>
    {/* Iris */}
    <circle cx="12" cy="12" r="3" fill="var(--bg-page)"/>
    <circle cx="12" cy="12" r="1.4" fill="#C9A96E" opacity="0.45"/>
    {/* Eyebrow */}
    <path d="M4.5 8.5c2-3 5-4.5 7.5-4.5s5.5 1.5 7.5 4.5" stroke="#C9A96E" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    {/* Left lift arrow */}
    <path d="M8 8V5" stroke="#e8d5a8" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M6.7 6.5L8 4.5l1.3 2" stroke="#e8d5a8" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Right lift arrow */}
    <path d="M16 8V5" stroke="#e8d5a8" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M14.7 6.5L16 4.5l1.3 2" stroke="#e8d5a8" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const LipFillerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    {/* Upper lip */}
    <path d="M4.5 11.5c1.5-2.5 4-3.5 7.5-3.5s6 1 7.5 3.5" fill="#C9A96E" opacity="0.9"/>
    {/* Cupid bow highlight */}
    <path d="M8 10c1-1.5 2-2 4-2s3 .5 4 2" fill="#8a6830" opacity="0.55"/>
    {/* Lower lip */}
    <path d="M4.5 11.5c0 2.5 3 6 7.5 6s7.5-3.5 7.5-6" fill="#C9A96E"/>
    {/* Syringe */}
    <line x1="19" y1="8.5" x2="22" y2="5.5" stroke="#e8d5a8" strokeWidth="1.2" strokeLinecap="round"/>
    <rect x="17.2" y="8" width="2.2" height="3.8" rx="0.5" fill="#e8d5a8" transform="rotate(-45 17.2 8)"/>
    <circle cx="22.3" cy="5.2" r="0.9" fill="#C9A96E"/>
  </svg>
)

const ButtFillerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    {/* Left cheek */}
    <path d="M3 23V17c0-5 2.5-9 7-9-2.5 1.5-4 4.5-4 8v7z" fill="#C9A96E"/>
    {/* Right cheek */}
    <path d="M21 23V17c0-5-2.5-9-7-9 2.5 1.5 4 4.5 4 8v7z" fill="#C9A96E"/>
    {/* Waistband */}
    <path d="M6 8.5h12" stroke="#8a6830" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
    {/* Center crease */}
    <path d="M12 8v15" stroke="#8a6830" strokeWidth="0.8" strokeLinecap="round" opacity="0.4"/>
    {/* Syringe */}
    <line x1="19.5" y1="12" x2="23" y2="8.5" stroke="#e8d5a8" strokeWidth="1.3" strokeLinecap="round"/>
    <rect x="18" y="11" width="2.2" height="3.8" rx="0.5" fill="#e8d5a8" transform="rotate(-45 18 11)"/>
    <circle cx="23.3" cy="8.2" r="0.9" fill="#C9A96E"/>
  </svg>
)

const RhinoplastyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    {/* Nose bridge + tip filled */}
    <path d="M12 2c-1.2 0-1.8 2.5-2.3 6S8 14 8 16.5c0 3 2 5.5 4 5.5s4-2.5 4-5.5c0-2.5-.8-5-1.7-8.5C13.8 4.5 13.2 2 12 2z" fill="#C9A96E" opacity="0.9"/>
    {/* Nostrils */}
    <path d="M8 18.5c-1.2 0-2-.5-2-1.8s1-1.8 2-1.3" stroke="#8a6830" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
    <path d="M16 18.5c1.2 0 2-.5 2-1.8s-1-1.8-2-1.3" stroke="#8a6830" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
    {/* Left arrow up */}
    <path d="M6 13V8.5" stroke="#e8d5a8" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M4.8 10l1.2-2 1.2 2" stroke="#e8d5a8" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Right arrow up */}
    <path d="M18 13V8.5" stroke="#e8d5a8" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M16.8 10l1.2-2 1.2 2" stroke="#e8d5a8" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ThreadLiftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    {/* Face filled */}
    <path d="M12 2.5C9 2.5 7 5 7 8.5v4.5C7 17.5 9 21 12 21s5-3.5 5-8V8.5C17 5 15 2.5 12 2.5z" fill="#C9A96E" opacity="0.75"/>
    {/* Eyes */}
    <ellipse cx="9.8" cy="10" rx="1" ry="0.7" fill="#7a5820"/>
    <ellipse cx="14.2" cy="10" rx="1" ry="0.7" fill="#7a5820"/>
    {/* Thread lines left */}
    <path d="M2.5 9.5l5 1.5" stroke="#e8d5a8" strokeWidth="1.1" strokeLinecap="round" strokeDasharray="1.5 1"/>
    <path d="M2.5 12.5l5 .8" stroke="#e8d5a8" strokeWidth="1.1" strokeLinecap="round" strokeDasharray="1.5 1"/>
    <path d="M2.5 15.5l5 .3" stroke="#e8d5a8" strokeWidth="1.1" strokeLinecap="round" strokeDasharray="1.5 1"/>
    {/* Thread lines right */}
    <path d="M21.5 9.5l-5 1.5" stroke="#e8d5a8" strokeWidth="1.1" strokeLinecap="round" strokeDasharray="1.5 1"/>
    <path d="M21.5 12.5l-5 .8" stroke="#e8d5a8" strokeWidth="1.1" strokeLinecap="round" strokeDasharray="1.5 1"/>
    <path d="M21.5 15.5l-5 .3" stroke="#e8d5a8" strokeWidth="1.1" strokeLinecap="round" strokeDasharray="1.5 1"/>
  </svg>
)

const BotoxIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    {/* Head */}
    <path d="M12 6C9 6 7 8 7 10.5v4C7 18.5 9.2 22 12 22s5-3.5 5-7.5v-4C17 8 15 6 12 6z" fill="#C9A96E" opacity="0.85"/>
    {/* Forehead wrinkle lines */}
    <path d="M9.5 11h2M13.5 11h1.5" stroke="#8a6830" strokeWidth="0.9" strokeLinecap="round"/>
    <path d="M9 13h6" stroke="#8a6830" strokeWidth="0.9" strokeLinecap="round"/>
    {/* Eyes */}
    <ellipse cx="10" cy="15" rx="1" ry="0.7" fill="#8a6830"/>
    <ellipse cx="14" cy="15" rx="1" ry="0.7" fill="#8a6830"/>
    {/* Syringe from top */}
    <line x1="12" y1="6" x2="12" y2="1.5" stroke="#e8d5a8" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M10.5 3.8L12 1.5l1.5 2.3" stroke="#e8d5a8" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="10.8" y="-0.5" width="2.4" height="2.2" rx="0.4" fill="#e8d5a8"/>
    <circle cx="12" cy="6.2" r="0.9" fill="#e8d5a8"/>
  </svg>
)

const ArmLiftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    {/* Upper arm / bicep filled shape */}
    <path d="M3.5 21c1-3 2.5-6 5-9 1.5-2 3-2.5 4.5-2 2 .7 3 2.5 3 5.5 0 2.5-.5 4.5-2 5.5" fill="#C9A96E" opacity="0.9"/>
    {/* Forearm */}
    <path d="M12.5 10c2-3 4-4 6-3.5S22 9 21.5 12" stroke="#C9A96E" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    {/* Bicep peak highlight */}
    <path d="M13 9.5c.5-2 2-3.5 4-3" stroke="#e8d5a8" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    {/* Lift arrow */}
    <path d="M20.5 8c.5-2.5-.5-5-2.5-5" stroke="#e8d5a8" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <path d="M18 3l-.5 2 2 .3" stroke="#e8d5a8" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const TummyTuckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    {/* Torso shape */}
    <path d="M7 3h10v9c0 4.5-2.2 9-5 9S7 16.5 7 12V3z" fill="#C9A96E" opacity="0.85"/>
    {/* Belly button */}
    <ellipse cx="12" cy="12" rx="1.2" ry="0.8" fill="#8a6830"/>
    {/* Waist contour lines */}
    <path d="M7 8c1-1 2.5-1.5 5-1.5s4 .5 5 1.5" stroke="#8a6830" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.7"/>
    {/* Bikini bottom */}
    <path d="M7 18.5c1 1.5 2.5 3 5 3s4-1.5 5-3" stroke="#e8d5a8" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
    <path d="M7 18.5l.5-2h9l.5 2" stroke="#e8d5a8" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const HandRejuvIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    {/* Palm */}
    <path d="M5 22V14c0-1.5.8-2.5 2-2.5s2 1 2 2.5V9c0-1.5.8-2.5 2-2.5S13 8.5 13 10V9c0-1.5.8-2.5 2-2.5S17 8 17 9.5v2c0-1.2.7-2 1.7-2 1 0 1.8.8 1.8 2V16c0 3.5-2 6-6.5 6z" fill="#C9A96E" opacity="0.9"/>
    {/* Syringe */}
    <line x1="4" y1="8" x2="8" y2="4" stroke="#e8d5a8" strokeWidth="1.3" strokeLinecap="round"/>
    <rect x="2.5" y="7" width="2.2" height="3.5" rx="0.5" fill="#e8d5a8" transform="rotate(-45 2.5 7)"/>
    <circle cx="8.5" cy="3.5" r="0.9" fill="#C9A96E"/>
  </svg>
)

const LiposculptureIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    {/* Body hourglass silhouette */}
    <path d="M8 2h8c0 3-2.5 5-4 6.5 1.5 1.5 4 3.5 4 6.5H8c0-3 2.5-5 4-6.5C10.5 7 8 5 8 2z" fill="#C9A96E" opacity="0.85"/>
    {/* Waist lines */}
    <path d="M8 15c1 .5 2.5.8 4 .8s3-.3 4-.8" stroke="#8a6830" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
    {/* 4D markings - four dots */}
    <circle cx="10.5" cy="10.5" r="0.8" fill="#e8d5a8"/>
    <circle cx="13.5" cy="10.5" r="0.8" fill="#e8d5a8"/>
    <circle cx="10.5" cy="13" r="0.8" fill="#e8d5a8"/>
    <circle cx="13.5" cy="13" r="0.8" fill="#e8d5a8"/>
    {/* Sculpt arrow left */}
    <path d="M5 11.5l3.5 1" stroke="#e8d5a8" strokeWidth="1.1" strokeLinecap="round"/>
    <path d="M8.5 11l.5 1.5-1.5-.2" stroke="#e8d5a8" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Sculpt arrow right */}
    <path d="M19 11.5l-3.5 1" stroke="#e8d5a8" strokeWidth="1.1" strokeLinecap="round"/>
    <path d="M15.5 11l-.5 1.5 1.5-.2" stroke="#e8d5a8" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const BreastIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    {/* Chest / shoulder area */}
    <path d="M2 10c0-2 1-4 4-4s5 2 6 5c1-3 3-5 6-5s4 2 4 4v2c0 2-1 3-3 3.5v6H5v-6C3 15 2 14 2 12v-2z" fill="#C9A96E" opacity="0.85"/>
    {/* Collarbone highlight */}
    <path d="M2 10c2-1.5 5-2 10-2s8 .5 10 2" stroke="#e8d5a8" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
    {/* Center sternum line */}
    <path d="M12 8v13" stroke="#8a6830" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
    {/* Contour marks */}
    <path d="M6 13.5c1 1.5 3 2.5 5 2" stroke="#8a6830" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.5"/>
    <path d="M18 13.5c-1 1.5-3 2.5-5 2" stroke="#8a6830" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.5"/>
  </svg>
)

const FaceliftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    {/* Left half - before (slightly sagging) */}
    <path d="M12 2.5C9 2.5 7 5 7 8.5v4.5C7 17.5 8.5 21 12 21V2.5z" fill="#C9A96E" opacity="0.6"/>
    {/* Right half - after (lifted) */}
    <path d="M12 2.5c3 0 5 2.5 5 6v4C17 16.5 15.5 21 12 21V2.5z" fill="#C9A96E" opacity="0.95"/>
    {/* Center divider line */}
    <line x1="12" y1="2.5" x2="12" y2="21" stroke="#e8d5a8" strokeWidth="1" strokeLinecap="round"/>
    {/* Left eye */}
    <ellipse cx="9.5" cy="10.5" rx="1.2" ry="0.8" fill="#7a5820" opacity="0.8"/>
    {/* Right eye (higher = lifted) */}
    <ellipse cx="14.5" cy="9.5" rx="1.2" ry="0.8" fill="#7a5820"/>
    {/* Left mouth corner (lower = before) */}
    <path d="M9 15.5c.5.8 1 1.2 1.8 1.2" stroke="#8a6830" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.7"/>
    {/* Right mouth corner (higher = lifted) */}
    <path d="M15 14.5c-.5.8-1 1.2-1.8 1.2" stroke="#8a6830" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
    {/* Lift arrows on right side */}
    <path d="M18.5 11.5c1-1.5 1-3.5 0-5" stroke="#e8d5a8" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <path d="M18.5 6.5l.5 2-2 .2" stroke="#e8d5a8" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// ── Procedure data ─────────────────────────────────────────────────────────
interface Procedure {
  title: string
  description: string
  arabicName: string
  image: string
  icon: React.ReactNode
}

const procedures: Procedure[] = [
  {
    title: "Face Contouring",
    description: "Sculpt and define your facial structure",
    arabicName: "تحديد ملامح الوجه",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    icon: <FaceContourIcon />,
  },
  {
    title: "Double Chin",
    description: "A defined jawline that commands presence",
    arabicName: "شفط دهون الذقن",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    icon: <DoubleChinIcon />,
  },
  {
    title: "Eyelid Lift",
    description: "Refresh and rejuvenate your gaze",
    arabicName: "رفع جفن العين",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    icon: <EyelidIcon />,
  },
  {
    title: "Lip Filler",
    description: "Fuller, natural lips with precision",
    arabicName: "حقن الشفاه",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    icon: <LipFillerIcon />,
  },
  {
    title: "Brazilian Butt Lift",
    description: "Natural curves, beautifully enhanced",
    arabicName: "رفع المؤخرة البرازيلي",
    image: "https://images.unsplash.com/photo-1520810627419-35e6bfbd7e76?auto=format&fit=crop&w=800&q=80",
    icon: <ButtFillerIcon />,
  },
  {
    title: "Rhinoplasty",
    description: "Harmony in every angle, every profile",
    arabicName: "تجميل الأنف",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    icon: <RhinoplastyIcon />,
  },
  {
    title: "Thread Lift",
    description: "Non-surgical lift with instant results",
    arabicName: "شد الخيوط",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80",
    icon: <ThreadLiftIcon />,
  },
  {
    title: "Botox",
    description: "Smooth away lines, restore youth",
    arabicName: "حقن البوتوكس",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    icon: <BotoxIcon />,
  },
  {
    title: "Arm Lift",
    description: "Toned, sculpted arms redefined",
    arabicName: "شد الذراعين",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    icon: <ArmLiftIcon />,
  },
  {
    title: "Tummy Tuck",
    description: "A flat, firm abdomen you deserve",
    arabicName: "شد البطن",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    icon: <TummyTuckIcon />,
  },
  {
    title: "Hand Rejuvenation",
    description: "Restore youthful, radiant hands",
    arabicName: "تجديد شباب اليدين",
    image: "https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=800&q=80",
    icon: <HandRejuvIcon />,
  },
  {
    title: "4D Liposculpture",
    description: "Sculpt your perfect silhouette",
    arabicName: "شفط الدهون رباعي الأبعاد",
    image: "https://images.unsplash.com/photo-1526835746352-0b9da4054862?auto=format&fit=crop&w=800&q=80",
    icon: <LiposculptureIcon />,
  },
  {
    title: "Breast Surgery",
    description: "Confidence reshaped, beauty redefined",
    arabicName: "جراحة الثدي",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    icon: <BreastIcon />,
  },
  {
    title: "Facelift & Neck Lift",
    description: "Turn back time. Gracefully.",
    arabicName: "شد الوجه والرقبة",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
    icon: <FaceliftIcon />,
  },
]

// ── Component ──────────────────────────────────────────────────────────────
export function ProceduresSelector() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    procedures.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i])
      }, 80 * i)
      timers.push(timer)
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ background: "var(--bg-page)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-[#C9A96E] text-[10px] tracking-[0.35em] uppercase mb-4">
            Explore Procedures
          </p>
          <h2
            className="text-4xl md:text-5xl font-light leading-[1.1]"
            style={{ fontFamily: "'Lora', serif", color: "var(--text-heading)" }}
          >
            Choose Your{" "}
            <em className="italic text-[#C9A96E]">Transformation</em>
          </h2>
        </div>

        {/* Interactive accordion — desktop */}
        <div
          className="hidden md:flex w-full h-[460px] overflow-hidden"
        >
          {procedures.map((proc, index) => {
            const isActive = activeIndex === index
            return (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className="relative flex flex-col justify-end overflow-hidden cursor-pointer"
                style={{
                  backgroundImage: `url('${proc.image}')`,
                  backgroundSize: isActive ? "auto 100%" : "auto 130%",
                  backgroundPosition: "center",
                  opacity: animatedOptions.includes(index) ? 1 : 0,
                  transform: animatedOptions.includes(index)
                    ? "translateX(0)"
                    : "translateX(-50px)",
                  transition:
                    "flex 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease, background-size 0.65s ease, border-color 0.3s ease",
                  flex: isActive ? "9 1 0%" : "1 1 0%",
                  minWidth: isActive ? undefined : "52px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: isActive ? "#C9A96E" : "var(--border-subtle)",
                  boxShadow: isActive
                    ? "0 16px 48px rgba(201,169,110,0.12)"
                    : "none",
                  backgroundColor: "var(--bg-surface)",
                  zIndex: isActive ? 10 : 1,
                  willChange: "flex-grow",
                }}
              >
                {/* Gradient overlay */}
                <div
                  className="absolute left-0 right-0 pointer-events-none transition-all duration-700"
                  style={{
                    bottom: 0,
                    height: "200px",
                    background: isActive
                      ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)"
                      : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)",
                  }}
                />

                {/* Top gold accent bar on active */}
                <div
                  className="absolute top-0 left-0 right-0 h-px transition-all duration-500"
                  style={{
                    background: isActive
                      ? "linear-gradient(90deg, transparent, #C9A96E, transparent)"
                      : "transparent",
                  }}
                />

                {/* Collapsed: vertical label */}
                {!isActive && (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-end pb-16 gap-3 z-10"
                    style={{
                      opacity: animatedOptions.includes(index) ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    {/* Icon circle */}
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: 36,
                        height: 36,
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-subtle)",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      {proc.icon}
                    </div>
                  </div>
                )}

                {/* Active: full label */}
                <div
                  className="absolute left-0 right-0 bottom-6 flex items-end gap-3 z-10 px-5"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.4s ease 0.1s",
                  }}
                >
                  {/* Gold icon circle */}
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: 42,
                      height: 42,
                      background: "rgba(201,169,110,0.18)",
                      border: "1px solid #C9A96E",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {proc.icon}
                  </div>

                  {/* Text */}
                  <div
                    style={{
                      transform: isActive ? "translateX(0)" : "translateX(16px)",
                      transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1) 0.1s",
                    }}
                  >
                    <p
                      className="font-medium leading-tight"
                      style={{
                        fontFamily: "'Lora', serif",
                        fontSize: "1.15rem",
                        color: "#e8d5a8",
                      }}
                    >
                      {proc.title}
                    </p>
                    <p
                      className="mt-0.5"
                      style={{ fontSize: "0.68rem", color: "#C9A96E", letterSpacing: "0.05em" }}
                    >
                      {proc.description}
                    </p>
                    <p
                      className="mt-1"
                      style={{
                        fontSize: "0.62rem",
                        color: "rgba(201,169,110,0.45)",
                        fontFamily: "'Siwa', serif",
                        direction: "rtl",
                      }}
                    >
                      {proc.arabicName}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile: 2-column grid */}
        <div className="grid grid-cols-2 gap-px md:hidden" style={{ background: "var(--border-subtle)" }}>
          {procedures.map((proc, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className="relative p-4 cursor-pointer flex items-center gap-3 group"
              style={{
                background: "var(--bg-page)",
                borderBottom: activeIndex === index ? "1px solid #C9A96E" : "none",
              }}
            >
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-300"
                style={{
                  width: 36,
                  height: 36,
                  background: activeIndex === index ? "rgba(201,169,110,0.18)" : "var(--bg-card)",
                  border: `1px solid ${activeIndex === index ? "#C9A96E" : "var(--border-subtle)"}`,
                }}
              >
                {proc.icon}
              </div>
              <div>
                <p
                  className="text-xs font-medium leading-tight"
                  style={{ color: activeIndex === index ? "#C9A96E" : "var(--text-body)" }}
                >
                  {proc.title}
                </p>
                <p
                  className="mt-0.5"
                  style={{
                    fontSize: "0.6rem",
                    color: activeIndex === index ? "#C9A96E" : "var(--text-muted)",
                    fontFamily: "'Siwa', serif",
                    direction: "rtl",
                  }}
                >
                  {proc.arabicName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
