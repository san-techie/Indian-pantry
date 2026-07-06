import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import type { Product } from '../data/catalog';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: 'ADD'; product: Product; quantity?: number }
  | { type: 'REMOVE'; id: string }
  | { type: 'SET_QTY'; id: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'TOGGLE' };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const qty = action.quantity ?? 1;
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id ? { ...i, quantity: i.quantity + qty } : i,
          ),
          isOpen: true,
        };
      }
      return { ...state, items: [...state.items, { product: action.product, quantity: qty }], isOpen: true };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.product.id !== action.id) };
    case 'SET_QTY':
      return {
        ...state,
        items: state.items
          .map((i) => (i.product.id === action.id ? { ...i, quantity: action.quantity } : i))
          .filter((i) => i.quantity > 0),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'TOGGLE':
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  count: number;
  subtotal: number;
  add: (product: Product, quantity?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'savana-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false }, (init) => {
    if (typeof window === 'undefined') return init;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return init;
      const saved = JSON.parse(raw) as CartItem[];
      return { ...init, items: saved };
    } catch {
      return init;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* ignore */
    }
  }, [state.items]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = state.items.reduce((s, i) => s + i.quantity * i.product.price, 0);
    return {
      items: state.items,
      isOpen: state.isOpen,
      count,
      subtotal,
      add: (product, quantity) => dispatch({ type: 'ADD', product, quantity }),
      remove: (id) => dispatch({ type: 'REMOVE', id }),
      setQty: (id, quantity) => dispatch({ type: 'SET_QTY', id, quantity }),
      clear: () => dispatch({ type: 'CLEAR' }),
      open: () => dispatch({ type: 'OPEN' }),
      close: () => dispatch({ type: 'CLOSE' }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
