import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/app/styles/globals.scss";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["cyrillic-ext"],
});

export const metadata: Metadata = {
  title: "CyberScout",
  description: "CyberScout — игра для детей про кибербезопасность: пароли, фишинг, домены и защита в интернете."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
