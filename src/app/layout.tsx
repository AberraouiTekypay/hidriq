import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hidriq.com"),
  title: "HIDRIQ — Water Intelligence",
  description:
    "HIDRIQ is the vendor-neutral intelligence layer for water — predicting, optimizing, and automating irrigation for luxury hospitality, golf, residential estates, and agriculture.",
  keywords: [
    "Water Intelligence",
    "Smart Irrigation",
    "Evapotranspiration ET0",
    "Hospitality Irrigation",
    "Golf Course Water Management",
    "Residential Garden Intelligence",
    "Vendor-Neutral Irrigation",
    "EM300",
    "HIDRIQ",
  ],
  authors: [{ name: "HIDRIQ Team" }],
  creator: "HIDRIQ (An EM300.co Company)",
  publisher: "EM300",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://hidriq.com",
  },
  openGraph: {
    title: "HIDRIQ — Water Intelligence",
    description:
      "The intelligence layer for water. Predict. Optimize. Automate. Transforming variable environmental data into precise water decisions.",
    url: "https://hidriq.com",
    siteName: "HIDRIQ",
    images: [
      {
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "HIDRIQ Water Intelligence — Aerial Resort Landscape",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HIDRIQ — Water Intelligence",
    description:
      "The intelligence layer for water. Predict. Optimize. Automate. An EM300.co Company.",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&h=630&q=80",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "HIDRIQ",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Cloud / Web",
              url: "https://hidriq.com",
              description:
                "Vendor-neutral water intelligence and optimization platform for hospitality, golf, residential estates, and agriculture.",
              parentOrganization: {
                "@type": "Organization",
                name: "EM300",
                url: "https://em300.co",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#07090d] text-slate-100 antialiased selection:bg-teal-500/20 selection:text-teal-300">
        {children}
      </body>
    </html>
  );
}
