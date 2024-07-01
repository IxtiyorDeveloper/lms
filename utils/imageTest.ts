export const isImageFunc = (url?: string | null) => {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url || "");
};
