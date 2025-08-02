import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-gradient-primary to-gradient-secondary hover:from-gradient-primary-hover hover:to-gradient-secondary-hover text-white font-semibold shadow-[0_8px_20px_0_hsl(var(--gradient-primary)_/_0.3),_0_4px_12px_0_hsl(var(--gradient-secondary)_/_0.2)] hover:shadow-[0_12px_30px_0_hsl(var(--gradient-primary)_/_0.4),_0_6px_16px_0_hsl(var(--gradient-secondary)_/_0.3)] hover:-translate-y-1 hover:scale-105",
        dreamy:
          "bg-gradient-to-r from-gradient-primary/90 via-gradient-secondary/90 to-gradient-primary/90 hover:from-gradient-primary hover:via-gradient-secondary hover:to-gradient-primary text-white font-semibold shadow-[0_8px_25px_hsl(var(--gradient-primary)_/_0.4),_0_4px_15px_hsl(var(--gradient-secondary)_/_0.3)] hover:shadow-[0_15px_40px_hsl(var(--gradient-primary)_/_0.5),_0_8px_25px_hsl(var(--gradient-secondary)_/_0.4)] hover:-translate-y-2 hover:scale-105 bg-[length:200%_100%] animate-[shimmer_4s_ease-in-out_infinite]",
        girly:
          "bg-gradient-to-br from-pink-400 via-purple-400 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-pink-600 text-white font-semibold shadow-[0_10px_25px_hsl(320_100%_60%_/_0.4)] hover:shadow-[0_15px_35px_hsl(320_100%_60%_/_0.5)] hover:-translate-y-2 hover:scale-105",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border-2 border-gradient-primary/30 bg-background shadow-sm hover:bg-gradient-primary/5 hover:border-gradient-primary/50 hover:text-gradient-primary hover:-translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:-translate-y-0.5",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5",
        link: "text-gradient-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-3",
        sm: "h-8 px-4 py-2 text-xs",
        lg: "h-12 px-8 py-4 text-base",
        xl: "h-14 px-10 py-5 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
