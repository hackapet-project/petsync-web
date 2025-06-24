import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Heart, 
  Users, 
  UserPlus,
  Calendar, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Avatar } from '../ui';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Animales', href: '/animals', icon: Heart },
  { name: 'Adopciones', href: '/adoptions', icon: Users },
  { name: 'Voluntarios', href: '/volunteers', icon: UserPlus },
  { name: 'Calendario', href: '/calendar', icon: Calendar },
  { name: 'Configuración', href: '/settings', icon: Settings },
];

function Sidebar() {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg h-full">
      {/* Header */}
      <div className="flex items-center justify-center h-16 px-4 bg-purple-600 shadow-sm">
        <div className="flex items-center">
          <Heart className="h-8 w-8 mr-2 text-white" />
          <h1 className="text-xl font-bold text-white">RefuPet</h1>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-100 text-purple-700 border-r-2 border-purple-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
      
      {/* User Profile Section */}
      <div className="px-4 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center mb-4 p-3 rounded-lg bg-white shadow-sm">
          <Avatar
            fallback={user?.name?.charAt(0) || 'U'}
            size="default"
            color="purple"
          />
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name || 'Usuario'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || 'usuario@refupet.com'}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Sidebar;