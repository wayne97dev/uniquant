import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  // metadataBase resolves relative og:image URLs against the canonical domain,
  // so /brand/banner-x.png resolves on this site. Keep in sync with DNS.
  metadataBase: new URL("https://uquant8004.com"),
  title: "Uniquant — mined ERC-8004 quantum agent",
  description:
    "Uniquant ($UQUANT) is a mined ERC-8004 agent with a Uniswap V4 self-hook and a quantum-resistant identity roadmap. The token, the V4 hook, and the PoW miner are the same contract.",
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Uniquant — mined ERC-8004 quantum agent",
    description:
      "A mined ERC-8004 quantum agent with a Uniswap V4 self-hook. Soulbound, tier-scaling Miner Agent NFTs plus a post-quantum identity roadmap. No owner, no mint key, no proxy.",
    url: "https://uquant8004.com",
    siteName: "Uniquant",
    images: [
      {
        url: "/brand/banner-x.png",
        width: 1500,
        height: 500,
        alt: "Uniquant — mined ERC-8004 quantum agents",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uniquant — mined ERC-8004 quantum agent",
    description:
      "A mined ERC-8004 quantum agent with a self-hook. Soulbound, tier-scaling NFTs plus a post-quantum identity roadmap.",
    images: ["/brand/banner-x.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
