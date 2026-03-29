import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { vocabApi } from '../api';
import { useAuthStore } from '../stores/authStore';
import type { Vocab } from '../types';
import Button from '../components/Button';
import Input from '../components/Input';
import Loading from '../components/Loading';
import toast from 'react-hot-toast';
import { CheckCircle, Circle, Plus, BookOpen } from 'lucide-react';

const VocabularyPage: React.FC = () => {
  const [vocab, setVocab] = useState<Vocab[]>([]);
  const [newWord, setNewWord] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      fetchVocab();
    }
  }, [user]);

  const fetchVocab = async () => {
    try {
      const data = await vocabApi.getVocab(user!.id);
      setVocab(data);
    } catch (error: any) {
      toast.error('Failed to load vocabulary');
    } finally {
      setLoading(false);
    }
  };

  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim()) return;
    setAdding(true);
    try {
      const added = await vocabApi.addVocab({ userId: user!.id, word: newWord.trim() });
      setVocab([...vocab, added]);
      setNewWord('');
      toast.success('Word added successfully');
    } catch (error: any) {
      toast.error('Failed to add word');
    } finally {
      setAdding(false);
    }
  };

  const handleMarkLearned = async (id: string) => {
    try {
      const updated = await vocabApi.markLearned(id);
      setVocab(vocab.map(v => v.id === id ? updated : v));
      toast.success('Word marked as learned');
    } catch (error: any) {
      toast.error('Failed to update word');
    }
  };

  const learnedCount = vocab.filter(v => v.learned).length;
  const totalCount = vocab.length;

  if (loading) return <MainLayout><Loading /></MainLayout>;

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Vocabulary</h1>
            <p className="text-gray-600 mt-1">Manage and track your word learning progress</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{learnedCount}/{totalCount}</p>
              <p className="text-sm text-gray-600">Words Learned</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* Add Word Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Plus className="h-5 w-5 mr-2 text-blue-600" />
            Add New Word
          </h2>
          <form onSubmit={handleAddWord} className="flex gap-4">
            <Input
              placeholder="Enter a new word to learn..."
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" loading={adding} className="px-8">
              Add Word
            </Button>
          </form>
        </div>

        {/* Vocabulary List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Vocabulary ({totalCount})</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {vocab.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleMarkLearned(item.id)}
                      className={`p-2 rounded-full transition-all duration-200 ${
                        item.learned
                          ? 'text-green-600 hover:text-green-700 hover:bg-green-50'
                          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {item.learned ? <CheckCircle size={24} /> : <Circle size={24} />}
                    </button>
                    <div>
                      <h3 className={`text-lg font-medium transition-all duration-200 ${
                        item.learned ? 'text-gray-500 line-through' : 'text-gray-900'
                      }`}>
                        {item.word}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Added {new Date(item.createdAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.learned
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.learned ? 'Learned' : 'Learning'}
                  </div>
                </div>
              </div>
            ))}
            {vocab.length === 0 && (
              <div className="p-12 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No vocabulary words yet</h3>
                <p className="text-gray-600">Start building your vocabulary by adding your first word above!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VocabularyPage;