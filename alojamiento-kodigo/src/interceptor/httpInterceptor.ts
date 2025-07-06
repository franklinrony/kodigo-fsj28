import axios from 'axios';

const instance = axios.create();

const EXCLUDED_URLS = [
  '/api/V1/users',
  '/api/V1/login',
];

instance.interceptors.request.use(
  (config) => {
    // Excluir URLs que no requieren autenticación
    const isExcluded = EXCLUDED_URLS.some((url) =>
      config.url?.includes(url)
    );
    if (!isExcluded) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si el backend no envía el mensaje esperado, lo forzamos
      if (!error.response.data || !error.response.data.message) {
        error.response.data = {
          message: 'Access denied. Please log in to continue',
        };
      }
      // Opcional: limpiar token y usuario
      // localStorage.removeItem('token');
      // localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export default instance; 