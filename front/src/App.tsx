import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Animals from './pages/Animals';
import Adoptions from './pages/Adoptions';
import Volunteers from './pages/Volunteers';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';
import './App.css';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/animales" element={<Animals />} />
                <Route path="/adopciones" element={<Adoptions />} />
                <Route path="/voluntarios" element={<Volunteers />} />
                <Route path="/calendario" element={<Calendar />} />
                <Route path="/configuracion" element={<Settings />} />
              </Routes>
            </div>
          </div>
        </Router>
      </QueryClientProvider>
  );
};

export default App;