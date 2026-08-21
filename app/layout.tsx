import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Analytics } from "@vercel/analytics/next";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import Cart from "@/components/Cart";

const outfit = Outfit({ subsets: ["latin"] });


export const metadata: Metadata = {
  metadataBase: new URL('https://digital-catalog-web-bay.vercel.app'),

  title: 'TF Store | Eletrônicos Premium Novos & Seminovos',
  description: 'Sua loja de confiança para iPhones novos e seminovos, Apple Watch, Smartwatches e Acessórios com garantia e pronta entrega.',
  keywords: ['iPhone', 'Apple Watch', 'Seminovos', 'Eletrônicos', 'Joinville', 'TF Store'],
  openGraph: {
    title: 'TF Store | Eletrônicos Premium',
    description: 'Encontre iPhones, Smartwatches e Acessórios com garantia e envio rápido.',
    url: 'https://digital-catalog-web-bay.vercel.app', // Substitua pelo seu domínio oficial quando tiver
    siteName: 'TF Store',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'TF Store - Eletrônicos Premium',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={ptBR}
      appearance={{
        elements: {
          formButtonPrimary: 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-none',
          footerActionLink: 'text-blue-600 hover:text-blue-500 font-semibold',
          card: 'rounded-2xl border border-gray-100 shadow-xl',
        }
      }}
    >
      <html lang="pt-BR">
        <body className={outfit.className}>
          <Header />
          <Cart />
          <main className="min-h-screen">{children}</main>
          <FloatingWhatsApp />
          <Footer />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}