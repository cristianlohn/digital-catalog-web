import Link from 'next/link';

interface Review {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  _createdAt: string;
  productTitle?: string;
  productSlug?: string;
}

export default function RecentReviewsSection({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="bg-zinc-50 border-t border-gray-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Depoimentos Reais
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            O que nossos clientes dizem
          </h2>
          <p className="text-gray-500 mt-2">
            Confira as avaliações de quem já comprou e aprova a experiência na TF Store.
          </p>
        </div>

        {/* Grid de Avaliações dos Compradores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Estrelinhas e Nome */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-gray-900 text-base">{rev.userName}</span>
                  <div className="text-yellow-400 text-sm tracking-widest">
                    {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                  </div>
                </div>

                {/* Comentário */}
                <p className="text-gray-600 text-sm italic leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* Produto Avaliado e Data */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                {rev.productTitle && rev.productSlug ? (
                  <Link
                    href={`/produto/${rev.productSlug}`}
                    className="text-blue-600 font-semibold hover:underline truncate max-w-[200px]"
                  >
                    📱 {rev.productTitle}
                  </Link>
                ) : (
                  <span className="text-gray-400">Cliente Verificado</span>
                )}

                {rev._createdAt && (
                  <span className="text-gray-400">
                    {new Date(rev._createdAt).toLocaleDateString('pt-BR')}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}