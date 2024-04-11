import type { Metadata } from "next"
import { Jost as FontSans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import "./globals.css"
import Header from "@/components/Header"
import { Toaster } from "@/components/ui/toaster"
// Unbounded, Inter, Jost

const fontSans = FontSans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: "берибилет.рф",
  description: "Поиск дешёвых авиабилетов"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Header />
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
