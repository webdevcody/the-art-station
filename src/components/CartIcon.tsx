import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartContext } from "~/contexts/CartContext";
import { authClient } from "~/lib/auth-client";

export function CartIcon() {
  const { getCartItemCount } = useCartContext();
  const { data: sessionData } = authClient.useSession();

  // Only show cart for non-admin users
  const isAdmin = sessionData?.user && (sessionData.user as any).isAdmin;
  const itemCount = getCartItemCount();

  if (isAdmin) {
    return null;
  }

  return (
    <Link to="/cart">
      <Button variant="ghost" size="sm" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </Button>
    </Link>
  );
}
