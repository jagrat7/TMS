import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/components/lib/utils";
import { ThemeProvider } from "@/components/contexts/theme-provider";
import { UserProvider } from '@/components/contexts/UserContext'
import { authService } from "@/services/authentication/auth"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Morpro TMS",
  description: "TMS for Morpro",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await authService.getCurrentUser()
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <VerticalNavbar /> */}
          <UserProvider initialUser={user || null}>

            {children}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
