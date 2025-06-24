import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/auth/LoginPage';
import OnboardingPage from './pages/auth/OnboardingPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import AnimalsListPage from './pages/animals/AnimalsListPage';
import AnimalDetailsPage from './pages/animals/AnimalDetailsPage';
import MedicalHistoryPage from './pages/animals/MedicalHistoryPage';
import AdoptionsPage from './pages/adoptions/AdoptionsPage';
import VolunteersPage from './pages/volunteers/VolunteersPage';
import CalendarPage from './pages/calendar/CalendarPage';
import SettingsPage from './pages/settings/SettingsPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="animals" element={<AnimalsListPage />} />
              <Route path="animals/:id" element={<AnimalDetailsPage />} />
              <Route path="animals/:id/medical" element={<MedicalHistoryPage />} />
              <Route path="adoptions" element={<AdoptionsPage />} />
              <Route path="volunteers" element={<VolunteersPage />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;