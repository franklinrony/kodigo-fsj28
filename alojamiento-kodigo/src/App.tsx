import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './services/AuthService';
import Layout from './components/Layout/Layout';
import LoginForm from './components/Auth/LoginForm';
import Dashboard from './pages/Dashboard';
import AccommodationList from './components/Accommodations/AccommodationList';
import ReservationList from './components/Reservations/ReservationList';
import ReservationCalendar from './components/Calendar/ReservationCalendar';
import ReservationsByDate from './components/Reservations/ReservationsByDate';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="accommodations" element={<AccommodationList />} />
            <Route path="reservations" element={<ReservationList />} />
            <Route path="calendar" element={<ReservationCalendar />} />
            <Route path="reservations-by-date" element={<ReservationsByDate />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;