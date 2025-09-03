export const formatFileSize = (size?: number | null) => {
  if (typeof size !== 'number') return '';
  if (size > 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  return `${Math.round(size / 1024)} KB`;
};
