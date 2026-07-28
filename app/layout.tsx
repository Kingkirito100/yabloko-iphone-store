import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
});

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ||
    requestHeaders.get("host") ||
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ||
    (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "Яблоко — iPhone с доставкой по России",
    description:
      "Актуальные модели iPhone по честным рыночным ценам. Гарантия, быстрая доставка и удобная оплата.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Твой новый iPhone — магазин «Яблоко»",
      description: "Оригинальная техника Apple с доставкой по России.",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630 }],
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Твой новый iPhone — магазин «Яблоко»",
      description: "Оригинальная техника Apple с доставкой по России.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${unbounded.variable}`}>
        {children}
      </body>
    </html>
  );
}
