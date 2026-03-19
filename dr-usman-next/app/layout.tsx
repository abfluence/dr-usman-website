import type { Metadata } from "next"
import { Cormorant_Garamond, DM_Sans, Libre_Baskerville, Lora, IBM_Plex_Mono, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ui/theme-provider"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
})

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre",
  display: "swap",
})

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Dr. Usman Liaqat | Plastic & Reconstructive Surgeon | Al Khobar · Dammam",
  description:
    "Board-Certified Plastic & Reconstructive Surgeon in Al Khobar & Dammam, Saudi Arabia. 9+ years of excellence in 4D Liposculpture, BBL, Facelift, Breast Surgery & more. Book your private consultation today.",
  keywords:
    "plastic surgeon saudi arabia, plastic surgeon al khobar, plastic surgeon dammam, 4D liposculpture, BBL saudi arabia, tummy tuck ksa, facelift dammam, breast augmentation al khobar, جراح تجميل السعودية, دكتور عثمان لياقت",
  authors: [{ name: "Dr. Usman Liaqat" }],
  openGraph: {
    title: "Dr. Usman Liaqat | Plastic Surgeon | Al Khobar · Dammam KSA",
    description:
      "Saudi Arabia's trusted Plastic & Reconstructive Surgeon. 4D Liposculpture, BBL, Facelift, Breast Surgery & more. 9+ years · 25K+ Instagram followers · 2 clinic locations.",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Siwa — Arabic display font via Fontshare CDN */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=siwa@400,700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#f5f1e6" />
      </head>
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${libreBaskerville.variable} ${lora.variable} ${poppins.variable} ${ibmPlexMono.variable}`}
        style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)" }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
