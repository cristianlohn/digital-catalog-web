"use client";

// Componente para a barra superior
export default function StudioLogo() {
  return (
    <div className="flex items-center gap-2 px-2">
      <span className="text-xl font-black text-gray-900 tracking-tighter">
        TF<span className="text-blue-600">STORE</span>
      </span>
      <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full uppercase">
        Admin
      </span>
    </div>
  );
}

// Componente para o ícone quadrado do workspace (substitui o avatar TS)
export function StudioIcon() {
  return (
    <div className="w-full h-full bg-blue-600 flex items-center justify-center rounded-sm font-black text-white text-xs">
      TF
    </div>
  );
}