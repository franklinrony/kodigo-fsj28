import { Cloudinary } from 'cloudinary-core';

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const cl = new Cloudinary({ cloud_name: cloudName });

export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  // No se envía transformación aquí, debe estar en el preset

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (!data.secure_url) throw new Error('No se pudo subir la imagen');
  return data.secure_url;
}; 