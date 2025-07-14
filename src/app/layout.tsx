import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClientProviderWrapper } from "@/contexts/QueryClientContext";

// Inicializar axios interceptors
import "@/config/axios/axiosSetup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FADER Records - Musik App",
  description: "Plataforma de gestión musical para artistas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProviderWrapper>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}