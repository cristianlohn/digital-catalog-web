import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import ProductCard from '@/components/ProductCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCategoryProducts(slug: string) {
  const query = `*[_type == "product" && category->slug.current == $slug] {
    _id,
    title,
    price,
    battery,
    condition,
    isPromo,
    slug,
    images,
    "categoryTitle": category->title
  }`;

  return await client.fetch(query, { slug }, { next: { revalidate: 0 } });
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const products = await getCategoryProducts(slug);

  const categoryName = products[0]?.categoryTitle || slug.replace(/-/g, ' ');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[70vh]">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-black text-gray-900 capitalize tracking-tight">
          {categoryName}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Mostrando os produtos disponíveis nesta categoria.
        </p>
      </div>

      {products.length === 0 ? (
        /* ESTADO VAZIO ELEGANTE */
        <div className="text-center py-20 px-4 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto my-8">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-inner">
            📦
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            Nenhum produto nesta categoria no momento
          </h2>
          <p className="text-gray-500 text-base max-w-md mx-auto mb-8 leading-relaxed">
            Estamos atualizando nosso estoque! Se você procura um modelo específico, fale com a gente no WhatsApp para consultar a disponibilidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-6 py-3.5 rounded-xl transition-all text-sm shadow-sm"
            >
              Ver Outros Produtos
            </Link>
            <a
              href="https://wa.me/5500000000000" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all text-sm shadow-sm inline-flex items-center justify-center gap-2"
            >
              <span>💬</span> Consultar no WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}