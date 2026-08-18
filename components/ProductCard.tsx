import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

interface ProductCardProps {
  product?: {
    _id?: string;
    title?: string;
    name?: string;
    price?: number;
    battery?: number;
    condition?: string;
    isPromo?: boolean;
    slug?: { current?: string };
    images?: any[];
    image?: any;
    categoryTitle?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  if (!product) return null;

  const productName = product.title || product.name || 'Produto sem nome';
  const productPrice = Number(product.price) || 0;
  const productSlug = product.slug?.current || '#';

  const rawImage = (product.images && product.images.length > 0) 
    ? product.images[0] 
    : product.image;

  let imageSrc: string | null = null;
  if (rawImage) {
    try {
      imageSrc = urlFor(rawImage).url();
    } catch {
      imageSrc = null;
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative">
      <div>
        {/* Container da Foto com Badges Flutuantes */}
        <div className="relative w-full h-52 rounded-xl overflow-hidden mb-3 bg-gray-50 flex items-center justify-center">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={productName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover"
              unoptimized
            />
          ) : (
            <span className="text-gray-400 text-sm font-medium">Sem foto</span>
          )}

          {/* Badge de Bateria no Canto Superior Esquerdo */}
          {product.battery !== undefined && product.battery !== null && (
            <div className="absolute top-2 left-2 bg-emerald-100/90 backdrop-blur-md text-emerald-800 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 border border-emerald-300/50 z-10">
              <span>🔋</span> Bateria {product.battery}%
            </div>
          )}

          {/* NOVO FOGUINHO: Sem fundo, apenas o emoji grande com o % sobreposto */}
          {product.isPromo && (
            <div 
              className="absolute top-1 right-1 z-10 flex items-center justify-center w-10 h-10 drop-shadow-md hover:scale-110 transition-transform cursor-default" 
              title="Produto em Promoção!"
            >
              <span className="text-4xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">🔥</span>
              <span className="absolute text-[11px] font-black text-white mt-3 ml-[1px] drop-shadow-sm">
                %
              </span>
            </div>
          )}
        </div>

        {/* Título do Produto */}
        <h3 className="font-bold text-gray-900 text-base line-clamp-2 mb-1">
          {productName}
        </h3>

        {/* Tag de Condição (Ex: SEMINOVO) */}
        {product.condition && (
          <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
            <span>🔄</span> {product.condition}
          </div>
        )}
      </div>

      {/* Preço e Botão */}
      <div className="mt-2">
        <p className="text-2xl font-black text-blue-600 mb-3">
          {productPrice > 0
            ? `R$ ${productPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
            : 'Preço sob consulta'}
        </p>

        <Link
          href={`/produto/${productSlug}`}
          className="block w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3 rounded-xl text-center text-sm transition-colors shadow-sm"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}