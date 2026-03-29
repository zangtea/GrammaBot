import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../../../shared/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/ui/Card'
import { useAuth } from '../../../shared/hooks/useAuth'

export default function DashboardPage() {
  const { user, logout } = useAuth()

  const features = [
    {
      title: 'Vocabulary Builder',
      description: 'Expand your English vocabulary with interactive exercises',
      path: '/vocabulary',
      icon: '📚',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'AI Grammar Assistant',
      description: 'Get instant feedback on your writing with AI-powered grammar checking',
      path: '/grammar',
      icon: '🤖',
      color: 'from-green-500 to-green-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.name || user?.email || 'User'}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Ready to improve your English skills?
              </p>
            </div>
            <Button variant="outline" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select from our powerful tools designed to help you master English grammar and vocabulary.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={feature.path}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full group-hover:bg-primary/90 transition-colors">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Your Learning Progress</CardTitle>
              <CardDescription className="text-center">
                Track your improvement over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
                  <div className="text-gray-600 dark:text-gray-300">Words Learned</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">0</div>
                  <div className="text-gray-600 dark:text-gray-300">Grammar Exercises</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
                  <div className="text-gray-600 dark:text-gray-300">Days Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}