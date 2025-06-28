import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RecuperarPassword: React.FC = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!email) {
      setError('Por favor ingresa tu correo electrónico.');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al intentar restablecer la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 px-4">
      <div className="bg-white/10 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Mail className="w-12 h-12 text-purple-400 mb-2" />
          <h2 className="text-2xl font-bold text-white mb-1">Recuperar Contraseña</h2>
          <p className="text-gray-300 text-center">Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>
        </div>
        {error && <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4 text-red-400 text-sm">{error}</div>}
        {success ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Correo Enviado</h3>
            <p className="text-gray-300">
              Hemos enviado un enlace para restablecer tu contraseña a <strong>{email}</strong>
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Si ingresaste un correo válido, recibirás un correo para recuperar tu contraseña en unos minutos. Revisa también tu carpeta de spam.
            </p>
            <a
              href="/login"
              className="inline-block mt-4 text-purple-400 hover:text-purple-200 underline transition-colors"
            >
              Volver al login
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all border-white/20"
                  placeholder="tu@email.com"
                  disabled={loading}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecuperarPassword; 