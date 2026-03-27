import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Vocabulary', path: '/vocab' },
    { label: 'Grammar', path: '/grammar' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold">GrammaBot</h2>
      </div>

      <nav className="p-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full text-left px-4 py-3 rounded-lg transition font-medium ${
              isActive(item.path)
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-0 right-0 w-64 p-6 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full btn-danger"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};
