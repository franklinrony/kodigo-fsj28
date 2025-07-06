// Servicio simple para loading global reutilizable
// Puedes mejorarlo con context o Zustand si lo deseas

let listeners: ((loading: boolean) => void)[] = [];
let loading = false;

export const setLoading = (value: boolean) => {
  loading = value;
  listeners.forEach((cb) => cb(loading));
};

export const subscribeLoading = (cb: (loading: boolean) => void) => {
  listeners.push(cb);
  cb(loading); // inicial
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
};

export const getLoading = () => loading; 