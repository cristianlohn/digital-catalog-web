import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero';
import RecentReviewsSection from '@/components/RecentReviewsSection';

interface Product {
  _id: string;
  name?: string;
  title?: string;
  price?: number;
  slug?: { current: string };
  image?: any;
  categoryTitle?: string;
}

// Busca as últimas avaliações de compradores aprovadas no Sanity
async function getRecentReviews() {
  const query = `*[_type == "review" && status == "approved"] | order(_createdAt desc)[0...6] {
    _id,
    userName,
    rating,
    comment,
    _createdAt,
    "productTitle": product->title,
    "productSlug": product->slug.current
  }`;
  return await client.fetch(query, {}, { next: { revalidate: 0 } });
}

async function getProducts() {
  const query = `*[_type == "product"] {
    _id,
    title,
    name,
    price,
    battery,
    condition,
    isPromo,
    slug,
    images,
    image,
    "categoryTitle": category->title
  }`;

  return await client.fetch(query, {}, { next: { revalidate: 0 } });
}

export default async function Home() {
  const banners = await client.fetch(
    `*[_type == "banner" && isActive == true] | order(_createdAt desc)`,
    {},
    { next: { revalidate: 0 } }
  );
  const products: Product[] = await getProducts();
  const reviews = await getRecentReviews();

  return (
    <main>
      {/* NOVO HERO DINÂMICO E OTIMIZADO PARA SEO */}
      <Hero banners={banners} />

      {/* Faixa de Diferenciais (Mantida e isolada) */}
      <section className="border-t border-zinc-800/80 bg-zinc-950 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-white font-bold text-sm sm:text-base">💎 Garantia Total</p>
            <p className="text-gray-400 text-xs mt-0.5">Produtos testados e revisados</p>
          </div>
          <div>
            <p className="text-white font-bold text-sm sm:text-base">🚀 Pronta Entrega</p>
            <p className="text-gray-400 text-xs mt-0.5">Envio rápido para todo o Brasil</p>
          </div>
          <div>
            <p className="text-white font-bold text-sm sm:text-base">💬 Suporte Direto</p>
            <p className="text-gray-400 text-xs mt-0.5">Atendimento via WhatsApp</p>
          </div>
          <div>
            <p className="text-white font-bold text-sm sm:text-base">💳 Pagamento Facilitado</p>
            <p className="text-gray-400 text-xs mt-0.5">Pix ou Cartão de Crédito em até 18x</p>
          </div>
        </div>
      </section>

      {/* VITRINE DE PRODUTOS */}
      <section id="produtos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Produtos em Destaque
            </h2>
            <p className="text-gray-500 mt-2">
              Confira as melhores ofertas e novidades do nosso catálogo.
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-lg">Nenhum produto cadastrado no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* SEÇÃO DE AVALIAÇÕES DOS COMPRADORES (Substituindo Influenciadores) */}
      <RecentReviewsSection reviews={reviews} />
    </main>
  );
}