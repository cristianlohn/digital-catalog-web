import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50 px-4">
      <div className="text-center max-w-lg bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
        
        {/* Ícone de aviso amigável */}
        <div className="text-6xl mb-6">📦</div>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
          Página não encontrada
        </h1>
        
        <p className="text-gray-500 mb-8 text-lg">
          Parece que você acessou uma prateleira vazia ou uma categoria que ainda estamos organizando. 
        </p>
        
        {/* Botão de resgate */}
        <Link 
          href="/" 
          className="inline-block bg-zinc-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-zinc-800 transition-colors shadow-md hover:shadow-lg"
        >
          Voltar para a página inicial
        </Link>
        
      </div>
    </main>
  );
}