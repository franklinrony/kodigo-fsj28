import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MusicProvider } from './context/MusicContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import Biblioteca from './pages/Biblioteca';
import Perfil from './pages/Perfil';
import RecuperarPassword from './pages/RecuperarPassword';

function App() {
  return (
    <AuthProvider>
      <MusicProvider>
        <Router>
          <Routes>
            <Route path="/recuperar-password" element={<RecuperarPassword />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Inicio />} />
                      <Route path="/biblioteca" element={<Biblioteca />} />
                      <Route path="/perfil" element={<Perfil />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </MusicProvider>
    </AuthProvider>
  );
}

export default App;