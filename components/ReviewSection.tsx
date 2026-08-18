'use client';

import { useState } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';

interface Review {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  _createdAt: string;
}

interface ReviewSectionProps {
  productId: string;
  initialReviews?: Review[];
}

export default function ReviewSection({ productId, initialReviews = [] }: ReviewSectionProps) {
  const { isSignedIn, user } = useUser(); // Puxa os dados do cliente logado no Clerk
  
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calcula a média das estrelas
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return alert('Preencha a nota e o comentário!');
    
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          userName: user?.fullName || user?.firstName || 'Cliente TF Store',
          rating,
          comment,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // Adiciona a nova avaliação na tela na mesma hora
        setReviews([data.review, ...reviews]);
        setComment('');
        setRating(5);
        alert('Avaliação enviada com sucesso! Muito obrigado.');
      } else {
        alert('Ocorreu um erro ao enviar sua avaliação.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16 pt-10 border-t border-gray-100">
      <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
        Avaliações dos Clientes
        {reviews.length > 0 && (
          <span className="bg-blue-100 text-blue-700 text-sm py-1 px-3 rounded-full">
            {averageRating} ⭐ ({reviews.length})
          </span>
        )}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LADO ESQUERDO: Formulário de Avaliação */}
        <div className="lg:col-span-1 bg-gray-50 p-6 rounded-3xl border border-gray-100 h-fit">
          <h4 className="font-bold text-gray-900 mb-4">Deixe sua avaliação</h4>
          
          {isSignedIn ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Sua nota</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-3xl transition-transform hover:scale-110 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Comentário</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="O que achou do produto?"
                  className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-28"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3 px-4 rounded-xl transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
              </button>
            </form>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 text-sm mb-4">Você precisa estar logado para avaliar este produto.</p>
              <SignInButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all w-full">
                  Fazer Login
                </button>
              </SignInButton>
            </div>
          )}
        </div>

        {/* LADO DIREITO: Lista de Avaliações */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-white border border-gray-100 rounded-3xl">
              <span className="text-4xl mb-3 block">💭</span>
              <p className="text-gray-500">Este produto ainda não tem avaliações. Seja o primeiro!</p>
            </div>
          ) : (
            reviews.map((rev) => (
              <div key={rev._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-gray-900">{rev.userName}</span>
                  <div className="text-yellow-400 text-sm tracking-widest">
                    {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">"{rev.comment}"</p>
                {rev._createdAt && (
                  <span className="text-xs text-gray-400 mt-4 block">
                    {new Date(rev._createdAt).toLocaleDateString('pt-BR')}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}