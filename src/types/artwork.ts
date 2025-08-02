export interface Artwork {
  id: string;
  title: string;
  description: string | null;
  price: number;
  imageData: string | null;
  imageMimeType: string | null;
  isForSale: boolean;
  isSold: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ArtworkWithUser extends Artwork {
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
}
