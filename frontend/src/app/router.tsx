import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Loader } from '../shared/ui/Loader'

// Lazy load pages for code splitting
const LoginPage = React.lazy(() => import('../features/auth/pages/LoginPage'))
const RegisterPage = React.lazy(() => import('../features/auth/pages/RegisterPage'))
const DashboardPage = React.lazy(() => import('../features/dashboard/pages/DashboardPage'))
const VocabularyPage = React.lazy(() => import('../features/vocab/pages/VocabularyPage'))
const GrammarPage = React.lazy(() => import('../features/ai/pages/GrammarPage'))
const NotFoundPage = React.lazy(() => import('../shared/pages/NotFoundPage'))

// Loading fallback component
const PageLoader = () => (
  <div className="flex h-screen items-center justify-center">
    <Loader size="lg" />
  </div>
)

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/vocabulary" element={<VocabularyPage />} />
        <Route path="/grammar" element={<GrammarPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}