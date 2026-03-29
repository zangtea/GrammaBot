import React, { useState, useRef, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { grammarApi } from '../api';
import Button from '../components/Button';
import Input from '../components/Input';
import toast from 'react-hot-toast';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const GrammarPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: "Hello! I'm your AI Grammar Assistant. Ask me anything about grammar, sentence structure, punctuation, or language rules. I'm here to help you improve your writing skills! ✨",
      timestamp: new Date(),
    },
  ]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: question.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);

    try {
      const response = await grammarApi.askGrammar({ question: userMessage.content });
      const aiMessage: Message = {
        role: 'ai',
        content: response.response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      toast.error('Failed to get grammar help');
      setMessages(prev => prev.slice(0, -1)); // Remove the user message if failed
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Grammar Assistant</h1>
              <p className="text-blue-100">Get instant help with grammar and writing</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-4 animate-in slide-in-from-bottom-4 duration-500 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'ai' && (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-xs lg:max-w-2xl px-4 py-3 rounded-2xl shadow-sm ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white ml-auto'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="bg-gray-100 px-4 py-3 rounded-2xl shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Ask me a grammar question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={loading}
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              disabled={loading || !question.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Examples: "What's the difference between affect and effect?" or "How do I use semicolons?"
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default GrammarPage;