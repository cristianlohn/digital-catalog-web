'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignInButton, Show, UserButton } from '@clerk/nextjs';
import { useCartStore } from '@/store/cartStore';

export default function Header() {
    const { items, openCart } = useCartStore();
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    
    // --- NOVO: Sistema de Busca ---
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault(); // Evita que a página recarregue do zero
        if (searchTerm.trim()) {
            router.push(`/busca?q=${encodeURIComponent(searchTerm.trim())}`);
        }
    };
    // ------------------------------
    
    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">

                    {/* 1. LOGO E MENU DE NAVEGAÇÃO */}
                    <div className="flex items-center gap-8">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-2xl font-black tracking-tighter text-zinc-900 flex items-center">
                                TF<span className="text-blue-600">STORE</span>
                            </Link>
                        </div>

                        {/* Links das Páginas (Desktop) */}
                        <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-gray-600">
                            <Link href="/" className="hover:text-blue-600 transition-colors">Início</Link>
                            <Link href="/categoria/seminovos" className="hover:text-blue-600 transition-colors">Seminovos</Link>
                            <Link href="/categoria/smartwatches" className="hover:text-blue-600 transition-colors">Smartwatches</Link>
                            <Link href="/categoria/audio" className="hover:text-blue-600 transition-colors">Áudio</Link>
                            <Link href="/categoria/acessorios" className="hover:text-blue-600 transition-colors">Acessórios</Link>
                        </nav>
                    </div>

                    {/* 2. BARRA DE PESQUISA (Desktop) - AGORA É UM FORM */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm xl:max-w-md relative group">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar produtos..."
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </form>

                    {/* 3. AÇÕES (Carrinho + Login) */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        {/* Ícone do Carrinho */}
                        <button onClick={openCart} className="relative text-gray-600 hover:text-blue-600 transition-colors p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        <div className="hidden sm:block w-px h-8 bg-gray-200"></div>

                        {/* 4. AUTENTICAÇÃO CLERK */}
                        <div className="flex items-center">
                            <Show when="signed-out">
                                <SignInButton mode="modal">
                                    <button className="bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-zinc-200 whitespace-nowrap">
                                        Entrar
                                    </button>
                                </SignInButton>
                            </Show>
                            <Show when="signed-in">
                                <UserButton appearance={{ elements: { avatarBox: "w-10 h-10 border-2 border-gray-100 shadow-sm hover:border-blue-200 transition-colors" } }} />
                            </Show>
                        </div>
                    </div>
                </div>
            </div>

            {/* COMPONENTES EXCLUSIVOS PARA MOBILE */}
            <div className="lg:hidden border-t border-gray-100 bg-gray-50">
                <nav className="flex items-center gap-6 px-4 py-3 overflow-x-auto scrollbar-none text-sm font-bold text-gray-600 whitespace-nowrap border-b border-gray-100">
                    <Link href="/" className="hover:text-blue-600 transition-colors">Início</Link>
                    <Link href="/categoria/seminovos" className="hover:text-blue-600 transition-colors">Seminovos</Link>
                    <Link href="/categoria/smartwatches" className="hover:text-blue-600 transition-colors">Smartwatches</Link>
                    <Link href="/categoria/audio" className="hover:text-blue-600 transition-colors">Áudio</Link>
                    <Link href="/categoria/acessorios" className="hover:text-blue-600 transition-colors">Acessórios</Link>
                </nav>

                {/* Barra de Pesquisa Mobile - AGORA É UM FORM */}
                <div className="p-3 md:hidden">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar produtos..."
                            className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </header>
    );
}