import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, Plus } from 'lucide-react';
import { Button, Input, Avatar } from '../ui';
import { useAuth } from '../../contexts/AuthContext';

const pageNames = {
  '/dashboard': 'Dashboard',
  '/animals': 'Animales',
  '/adoptions': 'Adopciones',
  '/volunteers': 'Voluntarios',
  '/calendar': 'Calendario',
  '/settings': 'Configuración',
};

function Header() {
  const location = useLocation();
  const { user } = useAuth();
  
  const currentPageName = pageNames[location.pathname] || 'RefuPet';

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Page title and search */}
        <div className="flex items-center space-x-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {currentPageName}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date().toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          
          {/* Search bar */}
          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar animales, adopciones..."
                className="pl-10 w-80"
              />
            </div>
          </div>
        </div>

        {/* Right side - Actions and profile */}
        <div className="flex items-center space-x-4">
          {/* Quick action button */}
          {location.pathname === '/animals' && (
            <Button size="sm" className="hidden md:flex">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Animal
            </Button>
          )}
          
          {location.pathname === '/volunteers' && (
            <Button size="sm" className="hidden md:flex">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Voluntario
            </Button>
          )}

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-500 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
          </button>

          {/* User avatar */}
          <div className="flex items-center">
            <Avatar
              fallback={user?.name?.charAt(0) || 'U'}
              size="sm"
              color="purple"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;