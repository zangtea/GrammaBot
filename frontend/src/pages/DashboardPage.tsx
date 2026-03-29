import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { BookOpen, MessageSquare, TrendingUp, Award } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const stats = [
    {
      title: 'Vocabulary Words',
      value: '24',
      change: '+12%',
      icon: BookOpen,
      color: 'bg-blue-500',
    },
    {
      title: 'Grammar Sessions',
      value: '8',
      change: '+23%',
      icon: MessageSquare,
      color: 'bg-green-500',
    },
    {
      title: 'Learning Streak',
      value: '7 days',
      change: '+2 days',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      title: 'Achievements',
      value: '3',
      change: '+1',
      icon: Award,
      color: 'bg-yellow-500',
    },
  ];

  const quickActions = [
    {
      title: 'Add Vocabulary',
      description: 'Expand your word knowledge',
      href: '/vocabulary',
      icon: BookOpen,
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      textColor: 'text-blue-700',
    },
    {
      title: 'Ask AI Grammar',
      description: 'Get instant grammar help',
      href: '/grammar',
      icon: MessageSquare,
      color: 'bg-green-50 hover:bg-green-100 border-green-200',
      textColor: 'text-green-700',
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-blue-100 text-lg">
            Continue your language learning journey with GrammaBot
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <a
                  key={index}
                  href={action.href}
                  className={`block p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 ${action.color}`}
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg bg-white mr-4`}>
                      <Icon className={`h-6 w-6 ${action.textColor}`} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${action.textColor}`}>
                        {action.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{action.description}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Added new vocabulary word</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Completed grammar session</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Marked 3 words as learned</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;