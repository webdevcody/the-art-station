import React, { createContext, useContext, useEffect, useState } from "react";
import { Cart, CartItem } from "@/types/cart";
import { Artwork } from "@/types/artwork";

interface CartContextType {
  cart: Cart;
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (artworkId: string) => void;
  updateItemQuantity: (artworkId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (artworkId: string) => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "art-station-cart";

const getInitialCart = (): Cart => {
  if (typeof window === "undefined") {
    return { items: [], total: 0 };
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        items: parsed.items || [],
        total: parsed.total || 0,
      };
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }

  return { items: [], total: 0 };
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(getInitialCart);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  const calculateTotal = (items: CartItem[]): number => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const addToCart = (artwork: Artwork) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.artworkId === artwork.id
      );

      if (existingItem) {
        // Item already in cart - don't add again since each artwork is unique
        return prevCart;
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${artwork.id}-${Date.now()}`,
          artworkId: artwork.id,
          title: artwork.title,
          price: artwork.price,
          imageData: artwork.imageData,
          quantity: 1,
        };
        const updatedItems = [...prevCart.items, newItem];
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }
    });
  };

  const removeFromCart = (artworkId: string) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter(
        (item) => item.artworkId !== artworkId
      );
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    });
  };

  const updateItemQuantity = (artworkId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(artworkId);
      return;
    }

    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.artworkId === artworkId ? { ...item, quantity } : item
      );
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  const getItemQuantity = (artworkId: string): number => {
    const item = cart.items.find((item) => item.artworkId === artworkId);
    return item ? item.quantity : 0;
  };

  const getCartItemCount = (): number => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    getItemQuantity,
    getCartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
