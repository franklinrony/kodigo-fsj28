import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import Biblioteca from './pages/Biblioteca';
import Perfil from './pages/Perfil';
import { MusicProvider } from './context/MusicContext';

function App() {
  return (
    <MusicProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </Layout>
      </Router>
    </MusicProvider>
  );
}

export default App;