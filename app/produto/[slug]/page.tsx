'use client';

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { useCartStore } from '@/store/cartStore';
import ReviewSection from '@/components/ReviewSection';
import { FaWhatsapp, FaCartShopping, FaShieldHalved, FaTruckFast, FaCreditCard } from 'react-icons/fa6';

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
    // Unwraps os parâmetros usando React.use
    const { slug } = use(params);

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const addItem = useCartStore((state) => state.addItem);
    const openCart = useCartStore((state) => state.openCart);

    useEffect(() => {
        async function fetchProduct() {
            try {
                // Busca o produto e as configurações da loja em paralelo
                const productQuery = `*[_type == "product" && slug.current == $slug][0] {
                  _id,
                  title,
                  name,
                  price,
                  battery,
                  condition,
                  isPromo,
                  description,
                  slug,
                  images,
                  image,
                  "categoryTitle": category->title,
                  "reviews": *[_type == "review" && product._ref == ^._id && status == "approved"] | order(_createdAt desc)
                }`;

                const settingsQuery = `*[_type == "settings"][0]{ whatsappNumber }`;

                const [data, settings] = await Promise.all([
                  client.fetch(productQuery, { slug }),
                  client.fetch(settingsQuery)
                ]);

                setProduct(data);

                if (settings?.whatsappNumber) {
                  setWhatsappNumber(settings.whatsappNumber.replace(/\D/g, ''));
                }

                // Seleciona a primeira imagem por padrão
                const rawImages = data?.images && data.images.length > 0 ? data.images : (data?.image ? [data.image] : []);
                if (rawImages.length > 0) {
                    setSelectedImage(urlFor(rawImages[0]).auto('format').fit('max').width(800).quality(80).url());
                }
            } catch (error) {
                console.error("Erro ao buscar o produto:", error);
            } finally {
                setLoading(false);
            }
        }

        if (slug) {
            fetchProduct();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="bg-zinc-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto animate-pulse">
                    
                    {/* Esqueleto do Breadcrumb (Caminho) */}
                    <div className="h-4 bg-gray-200 rounded-md w-1/4 mb-8"></div>

                    {/* CONTAINER PRINCIPAL */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-6 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
                        
                        {/* COLUNA ESQUERDA: Esqueleto da Foto */}
                        <div className="w-full h-[380px] sm:h-[480px] bg-gray-200 rounded-2xl"></div>

                        {/* COLUNA DIREITA: Esqueleto dos Textos e Botões */}
                        <div className="flex flex-col justify-between">
                            <div>
                                {/* Tags */}
                                <div className="flex gap-2 mb-4">
                                    <div className="h-6 bg-gray-200 rounded-md w-20"></div>
                                    <div className="h-6 bg-gray-200 rounded-md w-24"></div>
                                </div>
                                
                                {/* Título */}
                                <div className="h-10 bg-gray-200 rounded-lg w-full mb-3"></div>
                                <div className="h-10 bg-gray-200 rounded-lg w-2/3 mb-6"></div>
                                
                                {/* Preço */}
                                <div className="h-32 bg-gray-100 rounded-2xl w-full mb-8"></div>
                                
                                {/* Descrição */}
                                <div className="h-4 bg-gray-200 rounded-md w-full mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded-md w-full mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded-md w-4/5"></div>
                            </div>

                            {/* Botões */}
                            <div className="mt-8 flex flex-col gap-4">
                                <div className="h-16 bg-gray-200 rounded-2xl w-full"></div>
                                <div className="h-16 bg-gray-200 rounded-2xl w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <div className="text-5xl mb-4">📱</div>
                <h1 className="text-2xl font-black text-gray-900 mb-2">Produto não encontrado</h1>
                <p className="text-gray-500 mb-6">O produto que você está procurando não existe ou foi removido do estoque.</p>
                <Link
                    href="/"
                    className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-sm"
                >
                    Voltar para a Página Inicial
                </Link>
            </div>
        );
    }

    const productName = product.title || product.name || 'Produto sem nome';
    const productPrice = Number(product.price) || 0;

    // Lista com todas as imagens
    const allImages = product.images && product.images.length > 0
        ? product.images
        : (product.image ? [product.image] : []);

    // Formatação da mensagem personalizada do WhatsApp
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const whatsappMessage = encodeURIComponent(
        `Olá, TF Store! Tenho interesse no produto:\n\n📱 *${productName}*\n💰 *R$ ${productPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}*\n\nLink: ${currentUrl}`
    );
    // INSIRA SEU NÚMERO DO WHATSAPP ABAIXO (ex: 5547999999999)
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <div className="bg-zinc-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* BREADCRUMB (Caminho de Navegação) */}
                <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8 font-medium">
                    <Link href="/" className="hover:text-blue-600 transition-colors">Início</Link>
                    <span>/</span>
                    {product.categoryTitle && (
                        <>
                            <span className="capitalize">{product.categoryTitle}</span>
                            <span>/</span>
                        </>
                    )}
                    <span className="text-gray-900 font-bold truncate max-w-[200px] sm:max-w-none">{productName}</span>
                </nav>

                {/* CONTAINER PRINCIPAL */}
                <div className="bg-white rounded-3xl border border-gray-100 p-6 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

                    {/* COLUNA ESQUERDA: GALERIA DE FOTOS */}
                    <div className="flex flex-col gap-4">

                        {/* Foto Principal */}
                        <div className="relative w-full h-[380px] sm:h-[480px] rounded-2xl bg-gray-50 overflow-hidden border border-gray-100 flex items-center justify-center">
                            {selectedImage ? (
                                <Image
                                    src={selectedImage}
                                    alt={productName}
                                    fill
                                    priority
                                    className="object-cover"
                                    unoptimized
                                />
                            ) : (
                                <span className="text-gray-400 font-medium text-sm">Sem foto disponível</span>
                            )}

                            {/* BADGE DE BATERIA PREMIUM */}
                            {product.battery !== undefined && product.battery !== null && (
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-zinc-800 text-xs font-bold px-3.5 py-2 rounded-full shadow-md flex items-center gap-2 border border-white/50 z-10">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
                                    {product.battery}% Saúde
                                </div>
                            )}

                            {/* TAG DE PROMOÇÃO PREMIUM */}
                            {product.isPromo && (
                                <div
                                    className="absolute top-4 right-4 z-10 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg shadow-blue-500/30 border border-blue-400/50 flex items-center gap-1.5"
                                    title="Produto em Promoção!"
                                >
                                    <span className="text-sm -mt-0.5">✨</span> OFERTA
                                </div>
                            )}
                        </div>

                        {/* Carrossel de Miniaturas */}
                        {allImages.length > 1 && (
                            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                                {allImages.map((imgItem: any, index: number) => {
                                    const imgUrl = urlFor(imgItem).auto('format').fit('max').width(800).quality(80).url();
                                    const isSelected = selectedImage === imgUrl;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(imgUrl)}
                                            className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${isSelected
                                                ? 'border-blue-600 shadow-sm scale-105'
                                                : 'border-gray-200 opacity-70 hover:opacity-100'
                                                }`}
                                        >
                                            <Image
                                                src={imgUrl}
                                                alt={`${productName} thumbnail ${index + 1}`}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* COLUNA DIREITA: DETALHES E COMPRA */}
                    <div className="flex flex-col justify-between">
                        <div>
                            {/* TAG DE CONDIÇÃO / CATEGORIA */}
                            <div className="flex items-center gap-2 mb-3">
                                {product.condition && (
                                    <span className="bg-gray-100 text-gray-700 text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
                                        🔄 {product.condition}
                                    </span>
                                )}
                                {product.categoryTitle && (
                                    <span className="text-blue-600 text-[11px] font-black uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                                        {product.categoryTitle}
                                    </span>
                                )}
                            </div>

                            {/* TÍTULO DO PRODUTO */}
                            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-4 leading-tight">
                                {productName}
                            </h1>

                            {/* PREÇO */}
                            <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100 inline-block w-full">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                                    Valor à Vista / Pix
                                </span>
                                <p className="text-3xl sm:text-4xl font-black text-blue-600">
                                    {productPrice > 0
                                        ? `R$ ${productPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                                        : 'Preço sob consulta'}
                                </p>
                                {productPrice > 0 && (
                                    <p className="text-xs text-gray-500 font-medium mt-1">
                                        Ou em até 18x no cartão de crédito (consulte taxas)
                                    </p>
                                )}
                            </div>

                            {/* DESCRIÇÃO DO PRODUTO */}
                            {product.description && (
                                <div className="mb-8">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                                        Descrição do Aparelho
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                                        {product.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* BOTÕES DE AÇÃO E DICAS DE SEGURANÇA */}
                        <div className="mt-6 border-t border-gray-100 pt-6">
                            {/* Botão de Adicionar ao Carrinho */}
                            <button
                                onClick={() => {
                                    addItem({
                                        _id: product._id,
                                        title: productName,
                                        price: productPrice,
                                        image: selectedImage || '',
                                        quantity: 1,
                                    });
                                    openCart();
                                }}
                                className="w-full bg-zinc-900 hover:bg-zinc-800 hover:-translate-y-1 text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-3 text-lg shadow-xl shadow-zinc-900/20 hover:shadow-2xl hover:shadow-zinc-900/40 transition-all duration-300 mb-4"
                            >
                                <FaCartShopping className="text-xl" />
                                Adicionar ao Carrinho
                            </button>
                            
                            {/* Botão Principal de Comprar no WhatsApp */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 hover:-translate-y-1 text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-3 text-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 mb-4"
                            >
                                <FaWhatsapp className="text-2xl" />
                                Comprar pelo WhatsApp
                            </a>

                            {/* CARDS DE GARANTIA E BENEFÍCIOS */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center mt-8">
                                <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
                                    <div className="text-blue-600 mb-2 bg-blue-50 p-2.5 rounded-full">
                                        <FaShieldHalved className="text-xl" />
                                    </div>
                                    <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider">100% Original</h4>
                                    <p className="text-[11px] text-gray-500 mt-1 font-medium">Aparelhos revisados</p>
                                </div>
                                <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
                                    <div className="text-blue-600 mb-2 bg-blue-50 p-2.5 rounded-full">
                                        <FaTruckFast className="text-xl" />
                                    </div>
                                    <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider">Envio Seguro</h4>
                                    <p className="text-[11px] text-gray-500 mt-1 font-medium">Entrega para todo Brasil</p>
                                </div>
                                <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
                                    <div className="text-blue-600 mb-2 bg-blue-50 p-2.5 rounded-full">
                                        <FaCreditCard className="text-xl" />
                                    </div>
                                    <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider">Pagamento Fácil</h4>
                                    <p className="text-[11px] text-gray-500 mt-1 font-medium">Pix ou Cartão em 18x</p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
                {/* COMPONENTE DE AVALIAÇÕES ENTRA AQUI! */}
                <ReviewSection
                    productId={product._id}
                    initialReviews={product.reviews || []}
                />
            </div>
        </div>
    );
}