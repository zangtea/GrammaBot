import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
}

interface NotificationState {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  toasts: [],

  addToast: (toast) => {
    const id = uuidv4()
    const newToast: Toast = {
      id,
      duration: 5000,
      ...toast,
    }

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }))

    // Auto remove after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        get().removeToast(id)
      }, newToast.duration)
    }
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }))
  },

  clearToasts: () => {
    set({ toasts: [] })
  },
}))

// Helper functions for easy toast creation
export const toast = {
  success: (title: string, description?: string) =>
    useNotificationStore.getState().addToast({ type: 'success', title, description }),
  error: (title: string, description?: string) =>
    useNotificationStore.getState().addToast({ type: 'error', title, description }),
  warning: (title: string, description?: string) =>
    useNotificationStore.getState().addToast({ type: 'warning', title, description }),
  info: (title: string, description?: string) =>
    useNotificationStore.getState().addToast({ type: 'info', title, description }),
}