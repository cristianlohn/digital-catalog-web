"use client"; // Isso diz ao Next.js que esse componente roda no navegador do cliente

import { usePathname } from "next/navigation";
import Header from "./Header";
import FloatingWhatsApp from "./FloatingWhatsApp";

export default function StoreWrapper({ children }: { children: React.ReactNode }) {
  // Pega o endereço atual da página
  const pathname = usePathname();

  // Se o link começar com "/studio", mostra apenas o conteúdo, sem o Header
  if (pathname.startsWith("/studio")) {
    return <>{children}</>;
  }

  // Se for qualquer outra página do site, carrega o topo e o botão do WhatsApp normalmente!
  return (
    <>
      <Header />
      {children}
      <FloatingWhatsApp />
    </>
  );
}