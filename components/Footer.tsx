import Link from 'next/link';

export default function Footer() {
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
            {/* Redes Sociais */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <span className="text-xl">📸</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
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

          {/* Coluna 4: Contato Segura */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 uppercase tracking-wider">Atendimento</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 text-lg mt-0.5">📍</span>
                <span>Joinville, SC<br/>Atendimento online para todo Brasil</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-500 text-lg">📱</span>
                <span>(47) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500 text-lg">✉️</span>
                <span>contato@tfstore.com.br</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BARRA INFERIOR (Copyright e Pagamentos) */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 text-center md:text-left">
          <p>© {new Date().getFullYear()} TF Store. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2">
            <span className="bg-zinc-900 px-3 py-1.5 rounded-md font-medium">PIX</span>
            <span className="bg-zinc-900 px-3 py-1.5 rounded-md font-medium">VISA</span>
            <span className="bg-zinc-900 px-3 py-1.5 rounded-md font-medium">MASTERCARD</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}