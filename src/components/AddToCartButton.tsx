import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCartContext } from "~/contexts/CartContext";
import { authClient } from "~/lib/auth-client";
import { type Artwork } from "~/types/artwork";
import { toast } from "sonner";

interface AddToCartButtonProps {
  artwork: Artwork;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function AddToCartButton({
  artwork,
  variant = "default",
  size = "default",
  className = "",
}: AddToCartButtonProps) {
  const { addToCart } = useCartContext();
  const { data: sessionData } = authClient.useSession();

  // Only show for non-admin users
  const isAdmin = sessionData?.user && (sessionData.user as any).isAdmin;

  if (isAdmin || !artwork.isForSale) {
    return null;
  }

  const handleAddToCart = () => {
    addToCart({
      id: artwork.id,
      title: artwork.title,
      price: artwork.price,
      imageData: artwork.imageData || undefined,
    });
    toast.success(`${artwork.title} added to cart!`);
  };

  return (
    <Button
      onClick={handleAddToCart}
      variant={variant}
      size={size}
      className={className}
    >
      <Plus className="w-4 h-4 mr-2" />
      Add to Cart
    </Button>
  );
}
