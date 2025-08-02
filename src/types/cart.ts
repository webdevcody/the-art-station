export interface CartItem {
  id: string;
  artworkId: string;
  title: string;
  price: number;
  imageData: string | null;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}
