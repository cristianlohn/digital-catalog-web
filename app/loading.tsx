export default function Loading() {
  return (
    <main className="animate-pulse">
      {/* 1. ESQUELETO DO HERO BANNER */}
      <div className="w-full h-[500px] md:h-[600px] bg-zinc-900 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-2xl">
                <div className="h-14 bg-zinc-800 rounded-xl w-full mb-4"></div>
                <div className="h-14 bg-zinc-800 rounded-xl w-3/4 mb-8"></div>
                <div className="h-14 bg-zinc-800 rounded-xl w-48"></div>
            </div>
        </div>
      </div>

      {/* 2. ESQUELETO DOS DIFERENCIAIS */}
      <div className="border-t border-zinc-800/80 bg-zinc-950 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="h-12 bg-zinc-800 rounded-lg"></div>
          <div className="h-12 bg-zinc-800 rounded-lg"></div>
          <div className="h-12 bg-zinc-800 rounded-lg"></div>
          <div className="h-12 bg-zinc-800 rounded-lg"></div>
        </div>
      </div>

      {/* 3. ESQUELETO DA VITRINE DE PRODUTOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <div className="h-10 bg-gray-200 rounded-lg w-64 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded-md w-96"></div>
        </div>

        {/* Grid com 8 "Produtos Fantasmas" */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-white rounded-2xl border border-gray-100 p-4 h-[380px] flex flex-col shadow-sm">
              {/* Foto Fantasma */}
              <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
              {/* Título Fantasma */}
              <div className="h-5 bg-gray-200 rounded-md w-full mb-2"></div>
              <div className="h-5 bg-gray-200 rounded-md w-2/3 mb-4"></div>
              {/* Preço Fantasma */}
              <div className="h-8 bg-gray-200 rounded-lg w-1/2 mt-auto"></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}