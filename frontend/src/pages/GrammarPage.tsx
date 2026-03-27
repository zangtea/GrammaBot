import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { GrammarResult } from '../components/GrammarResult';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { aiService } from '../services/aiService';
import { GrammarResponse } from '../types';

export const GrammarPage = () => {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<GrammarResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleAskGrammar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setHasSearched(true);

    if (!question.trim()) {
      setError('Please enter a grammar question');
      return;
    }

    try {
      setIsLoading(true);
      const data = await aiService.getGrammarExplanation({
        question: question.trim(),
      });
      setResult(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to get grammar explanation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Grammar Helper</h1>
          <p className="text-gray-600">
            Ask any English grammar question and get AI-powered explanations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="card sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ask a Question</h2>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleAskGrammar} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Question
                  </label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="input-field resize-none"
                    rows={5}
                    placeholder="e.g., What's the difference between 'used to' and 'am used to'?"
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full"
                >
                  {isLoading ? 'Getting Answer...' : 'Get Explanation'}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  💡 <span className="font-semibold">Tip:</span> Ask about specific grammar rules, sentence structures, or confusing word usage.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {isLoading ? (
              <LoadingSpinner />
            ) : result ? (
              <GrammarResult result={result} />
            ) : hasSearched ? (
              <div className="card text-center py-12">
                <p className="text-gray-600 text-lg">Unable to get explanation. Please try again.</p>
              </div>
            ) : (
              <div className="card text-center py-12">
                <p className="text-gray-500 text-lg">✨ Ask a grammar question to get started!</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <p className="text-2xl mb-2">🎯</p>
            <h3 className="font-bold text-gray-900 mb-2">Spot Your Mistakes</h3>
            <p className="text-sm text-gray-600">Get detailed explanations for grammar errors</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl mb-2">📚</p>
            <h3 className="font-bold text-gray-900 mb-2">Learn Rules</h3>
            <p className="text-sm text-gray-600">Understand grammar rules with examples</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl mb-2">💪</p>
            <h3 className="font-bold text-gray-900 mb-2">Improve Writing</h3>
            <p className="text-sm text-gray-600">Practice and perfect your English writing</p>
          </div>
        </div>
      </div>
    </div>
  );
};
