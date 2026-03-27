import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            GrammaBot
          </h1>
          <div className="hidden md:flex gap-6">
            <button
              onClick={() => navigate('/vocab')}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Vocabulary
            </button>
            <button
              onClick={() => navigate('/grammar')}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Grammar
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Profile
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium hidden md:inline">
            Hi, {user?.name || user?.email}
          </span>
          <button
            onClick={handleLogout}
            className="btn-danger text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
