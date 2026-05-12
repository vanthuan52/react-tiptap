type EnvValue = string | undefined;

const getEnv = (...keys: string[]): EnvValue => {
  for (const key of keys) {
    const value = (import.meta.env as Record<string, EnvValue>)[key];
    if (value) return value;
  }
  return undefined;
};

export const AppConfig = {
  cloudinary: {
    cloudName: getEnv(
      "VITE_CLOUDINARY_CLOUD_NAME",
      "VITE_NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
    ),
    apiKey: getEnv(
      "VITE_CLOUDINARY_API_KEY",
      "VITE_NEXT_PUBLIC_CLOUDINARY_API_KEY",
    ),
    apiSecret: getEnv(
      "VITE_CLOUDINARY_API_SECRET",
      "VITE_NEXT_PUBLIC_CLOUDINARY_API_SECRET",
    ),
    uploadPreset: getEnv(
      "VITE_CLOUDINARY_UPLOAD_PRESET",
      "VITE_NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET",
    ),
  },
};
