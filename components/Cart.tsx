'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';

export default function Cart() {
  const { items, isOpen, closeCart, removeItem, increaseQuantity, decreaseQuantity, clearCart } = useCartStore();
  const [whatsappNumber, setWhatsappNumber] = useState<string | null>(null);

  // Busca o WhatsApp diretamente do Sanity (sem valor padrão chumbado)
  useEffect(() => {
    async function fetchSettings() {
      try {
        const settings = await client.fetch(`*[_type == "settings"][0]{ whatsappNumber }`);
        if (settings?.whatsappNumber) {
          setWhatsappNumber(settings.whatsappNumber.replace(/\D/g, ''));
        }
      } catch (error) {
        console.error('Erro ao buscar WhatsApp do Sanity:', error);
      }
    }
    fetchSettings();
  }, []);

  if (!isOpen) return null;

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!whatsappNumber) {
      alert('Número de WhatsApp não configurado no painel Sanity!');
      return;
    }

    const message = items
      .map(i => `▪️ ${i.quantity}x ${i.title} - R$ ${(i.price * i.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`)
      .join('\n');
    const totalFormatted = total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    
    const text = encodeURIComponent(`Olá, TF Store! Gostaria de fechar este pedido:\n\n${message}\n\n*Total a pagar: R$ ${totalFormatted}*`);
    
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeCart}></div>
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-black text-gray-900">Seu Carrinho 🛒</h2>
          <button onClick={closeCart} className="text-gray-400 hover:text-red-500 transition-colors p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
              <span className="text-5xl mb-4">😢</span>
              <p className="text-gray-500 font-medium text-sm">Seu carrinho está vazio.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item._id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <div className="relative w-20 h-20 bg-white rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                  {item.image ? (
                    <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">Sem foto</div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xs font-bold text-gray-900 leading-tight mb-1">{item.title}</h3>
                  <p className="text-blue-600 font-black text-sm mb-2">R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  
                  {/* SELETOR DE QUANTIDADE (BOTOES + e -) */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <button onClick={() => decreaseQuantity(item._id)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">-</button>
                      <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item._id)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">+</button>
                    </div>
                  </div>
                </div>

                <button onClick={() => removeItem(item._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Remover produto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Rodapé */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-500 font-medium">Total:</span>
              <span className="text-2xl font-black text-gray-900">
                R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <button 
              onClick={handleCheckout} 
              disabled={!whatsappNumber}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-emerald-600/20 transition-all mb-3"
            >
              <span className="text-xl">💬</span> Fechar Pedido
            </button>
            <button onClick={clearCart} className="w-full py-3 text-sm font-bold text-gray-400 hover:text-gray-500 transition-colors">
              Esvaziar carrinho
            </button>
          </div>
        )}

      </div>
    </div>
  );
}