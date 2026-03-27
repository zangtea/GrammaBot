import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navbar } from '../components/Navbar';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalWords: 0,
    learnedWords: 0,
    learningWords: 0,
  });

  useEffect(() => {
    // Mock data - replace with actual API call
    setStats({
      totalWords: 25,
      learnedWords: 12,
      learningWords: 13,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, <span className="text-blue-600">{user?.name}</span>!
          </h1>
          <p className="text-gray-600">
            Continue your English learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Words</p>
                <p className="text-4xl font-bold text-blue-600 mt-2">
                  {stats.totalWords}
                </p>
              </div>
              <div className="text-5xl">📚</div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Learned Words</p>
                <p className="text-4xl font-bold text-emerald-600 mt-2">
                  {stats.learnedWords}
                </p>
              </div>
              <div className="text-5xl">✅</div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Learning Now</p>
                <p className="text-4xl font-bold text-amber-600 mt-2">
                  {stats.learningWords}
                </p>
              </div>
              <div className="text-5xl">📖</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <a
                href="/vocab"
                className="block p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition"
              >
                <h4 className="font-semibold text-blue-600">📝 Vocabulary</h4>
                <p className="text-sm text-gray-600">Add and practice new words</p>
              </a>
              <a
                href="/grammar"
                className="block p-4 border border-purple-200 rounded-lg hover:bg-purple-50 transition"
              >
                <h4 className="font-semibold text-purple-600">🎓 Grammar</h4>
                <p className="text-sm text-gray-600">Get AI-powered grammar help</p>
              </a>
              <a
                href="/profile"
                className="block p-4 border border-green-200 rounded-lg hover:bg-green-50 transition"
              >
                <h4 className="font-semibold text-green-600">👤 Profile</h4>
                <p className="text-sm text-gray-600">Update your account settings</p>
              </a>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Info</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-gray-900">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">User ID</p>
                <p className="font-semibold text-gray-900 text-xs break-all">{user?.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
