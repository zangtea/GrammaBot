import { ToastProvider } from './Toast'

interface ToasterProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
}

const toastPositionClasses: Record<
  'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center',
  string
> = {
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  'top-center': 'top-0 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
}

export function Toaster({ position = 'bottom-right' }: ToasterProps) {
  return (
    <ToastProvider>
      <div className={`fixed z-[100] flex max-h-screen w-full flex-col-reverse p-4 ${toastPositionClasses[position]}`} />
    </ToastProvider>
  )
}