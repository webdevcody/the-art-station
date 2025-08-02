import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function CartButton() {
  const { cart, removeFromCart, getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <div className="p-4">
          <h3 className="font-semibold mb-3">Shopping Cart</h3>
          {cart.items.length === 0 ? (
            <p className="text-muted-foreground text-sm">Your cart is empty</p>
          ) : (
            <div className="space-y-3">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-2 rounded-lg border"
                >
                  <div className="w-12 h-12 bg-muted rounded-md overflow-hidden flex-shrink-0">
                    {item.imageData ? (
                      <img
                        src={item.imageData}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">
                          No img
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.artworkId)}
                      className="h-6 w-6 p-0 text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
              <DropdownMenuSeparator />
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">${cart.total.toFixed(2)}</span>
              </div>
              <Link to="/cart" className="w-full">
                <Button className="w-full" size="sm">
                  View Cart
                </Button>
              </Link>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
