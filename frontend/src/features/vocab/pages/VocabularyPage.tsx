import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../../../shared/ui/Button'
import { Input } from '../../../shared/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/ui/Card'

export default function VocabularyPage() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock vocabulary data
  const vocabulary = [
    { word: 'Hello', definition: 'A greeting used when meeting someone', difficulty: 'Easy' },
    { word: 'Beautiful', definition: 'Pleasing the senses or mind aesthetically', difficulty: 'Medium' },
    { word: 'Extraordinary', definition: 'Beyond what is usual, exceptional', difficulty: 'Hard' },
  ]

  const filteredVocabulary = vocabulary.filter(item =>
    item.word.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Vocabulary Builder
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Learn new words and expand your English vocabulary
              </p>
            </div>
            <Link to="/">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Input
                  placeholder="Search for a word..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button>
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Vocabulary List */}
        <div className="grid gap-4">
          {filteredVocabulary.map((item, index) => (
            <motion.div
              key={item.word}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{item.word}</CardTitle>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      item.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {item.difficulty}
                    </span>
                  </div>
                  <CardDescription className="text-base">
                    {item.definition}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Add to Study List
                    </Button>
                    <Button variant="outline" size="sm">
                      Practice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredVocabulary.length === 0 && searchTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No words found matching "{searchTerm}"
            </p>
          </motion.div>
        )}
      </main>
    </div>
  )
}