import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Pega a palavra que o usuário digitou na URL (no parâmetro ?q=)
  const { q } = await searchParams;
  const searchTerm = q || '';

  // Busca no Sanity produtos cujo nome ou título combinem com a palavra digitada
  const query = `*[_type == "product" && (title match $searchTerm + "*" || name match $searchTerm + "*")] {
    _id,
    title,
    name,
    price,
    image,
    images,
    slug,
    isPromo,
    condition,
    "categoryTitle": category->title
  }`;

  const products = await client.fetch(query, { searchTerm });

  return (
    <div className="bg-zinc-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho da Pesquisa */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Resultados para: <span className="text-blue-600">"{searchTerm}"</span>
          </h1>
          <p className="text-gray-500 font-medium">
            Encontramos {products.length} {products.length === 1 ? 'produto' : 'produtos'}.
          </p>
        </div>

        {/* Verificação: Se não encontrar nada, mostra mensagem amigável */}
        {products.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-10 text-center flex flex-col items-center justify-center min-h-[40vh] shadow-sm">
            <span className="text-6xl mb-4">🔍</span>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Poxa, não encontramos nada!</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Não achamos nenhum produto correspondente a "{searchTerm}". Verifique se você digitou corretamente ou tente usar termos mais genéricos.
            </p>
            <Link href="/" className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-6 py-3 rounded-xl transition-all">
              Voltar para a Home
            </Link>
          </div>
        ) : (
          /* Grid de Produtos Encontrados */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product: any) => {
              const productName = product.title || product.name || 'Produto';
              const productImage = product.image ? urlFor(product.image).url() : (product.images?.[0] ? urlFor(product.images[0]).url() : null);

              return (
                <Link 
                  href={`/produto/${product.slug.current}`} 
                  key={product._id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group flex flex-col h-full"
                >
                  <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                    {productImage ? (
                      <Image 
                        src={productImage} 
                        alt={productName} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        unoptimized 
                      />
                    ) : (
                      <span className="text-gray-300 text-xs font-bold uppercase">Sem Foto</span>
                    )}

                    {/* Selos em cima da foto */}
                    {product.isPromo && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded-md shadow-sm z-10">
                        Oferta 🔥
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      {product.condition && (
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1 block">
                          {product.condition}
                        </span>
                      )}
                      <h3 className="text-sm font-bold text-gray-900 leading-tight mb-2 line-clamp-2">
                        {productName}
                      </h3>
                    </div>
                    <div className="mt-3">
                      <p className="text-lg font-black text-blue-600">
                        R$ {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}