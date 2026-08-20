'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { FaPix, FaCcVisa, FaCcMastercard } from 'react-icons/fa6';

interface StoreSettings {
  whatsappNumber?: string;
  instagramUrl?: string;
  contactEmail?: string;
  storeAddress?: string;
}

export default function Footer() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await client.fetch(
          `*[_type == "settings"][0]{ whatsappNumber, instagramUrl, contactEmail, storeAddress }`
        );
        setSettings(data);
      } catch (error) {
        console.error('Erro ao carregar configurações no Footer:', error);
      }
    }
    fetchSettings();
  }, []);

  // Formata o número (ex: 554784251082) para exibição visual (47) 98425-1082
  // Formata e adiciona o '9' automaticamente se o número tiver apenas 10 dígitos
const formatPhoneNumber = (num?: string) => {
  if (!num) return '';

  // 1. Limpa tudo e deixa apenas os números
  let clean = num.replace(/\D/g, '');

  // 2. Remove o DDI '55' do Brasil se ele tiver sido digitado
  if (clean.startsWith('55') && clean.length > 10) {
    clean = clean.slice(2);
  }

  // 3. REGRA DO 9: Se o número tem 10 dígitos (DDD + 8 dígitos), injeta o '9' na frente do número
  if (clean.length === 10) {
    const ddd = clean.slice(0, 2);
    const numeroSemNove = clean.slice(2);
    clean = `${ddd}9${numeroSemNove}`; // Transforma em 11 dígitos
  }

  // 4. Aplica a máscara bonita no padrão (XX) 9XXXX-XXXX
  if (clean.length === 11) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7)}`;
  }

  return clean;
};

  const whatsappRaw = settings?.whatsappNumber?.replace(/\D/g, '') || '554784251082';

  return (
    <footer className="bg-zinc-950 text-gray-400 pt-16 pb-8 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* GRID DE INFORMAÇÕES (Empilha no Mobile, 4 Colunas no Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          
          {/* Coluna 1: Marca e Sobre */}
          <div className="flex flex-col items-start">
            <Link href="/" className="text-3xl font-black tracking-tighter text-white mb-4">
              TF<span className="text-blue-500">STORE</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              A sua loja de confiança para eletrônicos premium. Aparelhos novos e seminovos rigorosamente testados, com garantia e procedência.
            </p>
            {/* Redes Sociais Dinâmicas */}
            <div className="flex items-center gap-4">
              {settings?.instagramUrl && (
                <a 
                  href={settings.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                  aria-label="Instagram"
                >
                  <span className="text-xl">📸</span>
                </a>
              )}
              <a 
                href={`https://wa.me/${whatsappRaw}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"
                aria-label="WhatsApp"
              >
                <span className="text-xl">💬</span>
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 uppercase tracking-wider">Produtos</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/categoria/seminovos" className="hover:text-blue-500 transition-colors">iPhones Seminovos</Link></li>
              <li><Link href="/categoria/smartwatches" className="hover:text-blue-500 transition-colors">Smartwatches</Link></li>
              <li><Link href="/categoria/audio" className="hover:text-blue-500 transition-colors">Áudio e Fones</Link></li>
              <li><Link href="/categoria/acessorios" className="hover:text-blue-500 transition-colors">Acessórios</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Links Úteis */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 uppercase tracking-wider">Institucional</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/embaixadores" className="hover:text-blue-500 transition-colors">Nossos Embaixadores</Link></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Termos de Garantia</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Política de Envio</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Rastreamento</a></li>
            </ul>
          </div>

          {/* Coluna 4: Contato Dinâmico */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 uppercase tracking-wider">Atendimento</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 text-lg mt-0.5">📍</span>
                <span>
                  {settings?.storeAddress || 'Joinville, SC'}
                  <br/>Atendimento online para todo Brasil
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-500 text-lg">📱</span>
                <a 
                  href={`https://wa.me/${whatsappRaw}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  {formatPhoneNumber(settings?.whatsappNumber)}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500 text-lg">✉️</span>
                <a 
                  href={`mailto:${settings?.contactEmail || 'contato@tfstore.com.br'}`} 
                  className="hover:text-white transition-colors"
                >
                  {settings?.contactEmail || 'contato@tfstore.com.br'}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BARRA INFERIOR (Segurança, Pagamentos e Copyright) */}
        <div className="pt-8 border-t border-zinc-900">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            
            {/* Selos de Segurança */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Segurança Garantida</span>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-md border border-emerald-500/20">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Site Seguro SSL
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-md border border-blue-500/20">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Navegação Segura
                </div>
              </div>
            </div>

            {/* Formas de Pagamento */}
            <div className="flex flex-col items-center md:items-end gap-2">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Formas de Pagamento</span>
              <div className="flex items-center gap-2">
                {/* PIX */}
                <div className="bg-white px-2.5 py-1.5 rounded-md flex items-center justify-center h-8 shadow-sm text-[#32BCAD] gap-1">
                  <FaPix className="text-base" />
                  <span className="font-bold text-[14px] lowercase tracking-tight">pix</span>
                </div>
                {/* VISA */}
                <div className="bg-white px-3 py-1.5 rounded-md flex items-center justify-center h-8 shadow-sm text-[#1434CB]">
                  <FaCcVisa className="text-[26px]" />
                </div>
                {/* MASTERCARD */}
                <div className="bg-white px-3 py-1.5 rounded-md flex items-center justify-center h-8 shadow-sm text-[#FF5F00]">
                  <FaCcMastercard className="text-[26px]" />
                </div>
              </div>
            </div>

          </div>

          <div className="flex flex-col items-center justify-center text-xs text-zinc-600 text-center">
            <p>© {new Date().getFullYear()} TF Store. Todos os direitos reservados.</p>
          </div>
        </div>
        
      </div>
    </footer>
  );
}