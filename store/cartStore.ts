import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  _id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void; // NOVO
  decreaseQuantity: (id: string) => void; // NOVO
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (item) => set((state) => {
        const existingItem = state.items.find((i) => i._id === item._id);
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        }
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i._id !== id),
      })),
      
      // NOVA FUNÇÃO: Aumenta a quantidade em +1
      increaseQuantity: (id) => set((state) => ({
        items: state.items.map((i) =>
          i._id === id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      })),
      
      // NOVA FUNÇÃO: Diminui a quantidade em -1 (mas nunca deixa ficar menor que 1)
      decreaseQuantity: (id) => set((state) => ({
        items: state.items.map((i) => {
          if (i._id === id) {
            return { ...i, quantity: Math.max(1, i.quantity - 1) };
          }
          return i;
        }),
      })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: 'tfstore-cart',
    }
  )
);