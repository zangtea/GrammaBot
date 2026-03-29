import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "../utils/cn"

const loaderVariants = cva(
  "inline-block animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
      variant: {
        default: "text-primary",
        secondary: "text-secondary",
        destructive: "text-destructive",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
)

export interface LoaderProps
  extends Omit<HTMLMotionProps<'div'>, 'ref'>,
    VariantProps<typeof loaderVariants> {}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(loaderVariants({ size, variant }), className)}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        {...props}
      />
    )
  }
)
Loader.displayName = "Loader"

export { Loader, loaderVariants }