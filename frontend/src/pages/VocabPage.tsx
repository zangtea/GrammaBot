import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navbar } from '../components/Navbar';
import { VocabCard } from '../components/VocabCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { vocabService } from '../services/vocabService';
import { Vocabulary } from '../types';

export const VocabPage = () => {
  const { user } = useAuth();
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [word, setWord] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [markingId, setMarkingId] = useState<string | null>(null);

  useEffect(() => {
    loadVocabularies();
  }, []);

  const loadVocabularies = async () => {
    if (!user?.id) return;

    try {
      setIsLoadingList(true);
      const data = await vocabService.getVocabulary(user.id);
      setVocabularies(data);
    } catch (err: any) {
      setError('Failed to load vocabulary');
    } finally {
      setIsLoadingList(false);
    }
  };

  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!word.trim()) {
      setError('Please enter a word');
      return;
    }

    if (!user?.id) {
      setError('User not found');
      return;
    }

    try {
      setIsLoading(true);
      const newVocab = await vocabService.addVocabulary({
        userId: user.id,
        word: word.trim(),
      });
      setVocabularies([newVocab, ...vocabularies]);
      setWord('');
      setSuccess('Word added successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add word');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkLearned = async (id: string) => {
    try {
      setMarkingId(id);
      const updated = await vocabService.markAsLearned(id);
      setVocabularies(vocabularies.map(v => v.id === id ? updated : v));
    } catch (err: any) {
      setError('Failed to mark as learned');
    } finally {
      setMarkingId(null);
    }
  };

  const learnedCount = vocabularies.filter(v => v.learned).length;
  const unlearned = vocabularies.filter(v => !v.learned);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Vocabulary</h1>
          <p className="text-gray-600">
            {vocabularies.length} words added • {learnedCount} learned
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="card sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Word</h2>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
                  {success}
                </div>
              )}

              <form onSubmit={handleAddWord} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter a word
                  </label>
                  <input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    className="input-field"
                    placeholder="e.g., serendipity"
                    disabled={isLoading}
                  />
                </div>

                <p className="text-xs text-gray-500">
                  AI will auto-generate phonetic, definition, and examples
                </p>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full"
                >
                  {isLoading ? 'Adding...' : 'Add Word'}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            {isLoadingList ? (
              <LoadingSpinner />
            ) : vocabularies.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-gray-600 text-lg">No words yet. Add your first word!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {unlearned.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Learning</h3>
                    <div className="space-y-4">
                      {unlearned.map(vocab => (
                        <VocabCard
                          key={vocab.id}
                          vocab={vocab}
                          onMarkLearned={handleMarkLearned}
                          isLoading={markingId === vocab.id}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {learnedCount > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Learned</h3>
                    <div className="space-y-4">
                      {vocabularies.filter(v => v.learned).map(vocab => (
                        <VocabCard
                          key={vocab.id}
                          vocab={vocab}
                          onMarkLearned={handleMarkLearned}
                          isLoading={markingId === vocab.id}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
