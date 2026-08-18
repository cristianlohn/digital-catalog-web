'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

export default function Hero({ banners }: { banners: any[] }) {
  const [current, setCurrent] = useState(0);

  // Faz o banner passar automaticamente a cada 5 segundos
  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners?.length]);

  if (!banners || banners.length === 0) return null;

  // Funções para os botões de próximo e anterior
  const nextSlide = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <section className="relative w-full h-[500px] md:h-[600px] bg-zinc-950 overflow-hidden group">
      {banners.map((banner, index) => {
        const desktopImg = banner.image ? urlFor(banner.image).url() : null;
        const mobileImg = banner.mobileImage ? urlFor(banner.mobileImage).url() : desktopImg;

        return (
          <div 
            key={banner._id} 
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* IMAGEM DESKTOP */}
            {desktopImg && (
              <Image
                src={desktopImg}
                alt={banner.title}
                fill
                className="object-cover hidden md:block opacity-50"
                priority={index === 0}
                unoptimized
              />
            )}
            
            {/* IMAGEM MOBILE */}
            {mobileImg && (
              <Image
                src={mobileImg}
                alt={banner.title}
                fill
                className="object-cover md:hidden opacity-40"
                priority={index === 0}
                unoptimized
              />
            )}

            {/* CONTEÚDO */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
                    {banner.title}
                  </h1>
                  
                  {banner.subtitle && (
                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl drop-shadow-md">
                      {banner.subtitle}
                    </p>
                  )}
                  
                  {banner.buttonText && banner.buttonLink && (
                    <Link 
                      href={banner.buttonLink} 
                      className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-600/30 text-lg hover:scale-105"
                    >
                      {banner.buttonText}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* CONTROLES DO CARROSSEL (Só aparecem se houver mais de 1 banner) */}
      {banners.length > 1 && (
        <>
          {/* Seta Esquerda */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/20 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Banner anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          {/* Seta Direita */}
          <button 
            onClick={nextSlide}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/20 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Próximo banner"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          {/* Navegação por Bolinhas */}
          <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-3">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Ir para o banner ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === current ? 'bg-blue-500 w-8' : 'bg-white/50 w-2.5 hover:bg-white'}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}