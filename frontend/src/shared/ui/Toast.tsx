import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion"
import { cn } from "../utils/cn"

const toastVariants = cva(
  "relative pointer-events-auto flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive border-destructive bg-destructive text-destructive-foreground",
        success: "border-green-500 bg-green-50 text-green-900 dark:bg-green-900 dark:text-green-50",
        warning: "border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ToastProps
  extends Omit<HTMLMotionProps<'div'>, 'ref'>,
    VariantProps<typeof toastVariants> {
  children?: React.ReactNode;
  open?: boolean
  onOpenChange?: (open: boolean) => void
  duration?: number
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, open = true, onOpenChange, duration = 5000, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(open)

    React.useEffect(() => {
      setIsVisible(open)
    }, [open])

    React.useEffect(() => {
      if (duration > 0 && isVisible) {
        const timer = setTimeout(() => {
          setIsVisible(false)
          onOpenChange?.(false)
        }, duration)
        return () => clearTimeout(timer)
      }
    }, [duration, isVisible, onOpenChange])

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={ref}
            className={cn(toastVariants({ variant }), className)}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            {...props}
          >
            {children}
            <button
              className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
              onClick={() => {
                setIsVisible(false)
                onOpenChange?.(false)
              }}
            >
              <span className="sr-only">Close</span>
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)
Toast.displayName = "Toast"

const ToastTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = "ToastDescription"

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <div className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
    {children}
  </div>
}

export { Toast, ToastTitle, ToastDescription, ToastProvider }