export type AppColors = {
  background: string;
  surface: string;
  border: string;
  text: string;
  textMuted: string;
  accent: string;
  danger: string;
};

// The original palette used by the app.
export const darkColors: AppColors = {
  background: '#0f172a',
  surface: '#1e293b',
  border: '#334155',
  text: '#f8fafc',
  textMuted: '#94a3b8',
  accent: '#facc15',
  danger: '#fb7185',
};

// A softer light palette with the same visual roles as darkColors.
export const lightColors: AppColors = {
  background: '#f5f7fb',
  surface: '#ffffff',
  border: '#dbe3ef',
  text: '#25324a',
  textMuted: '#718096',
  accent: '#d6a900',
  danger: '#d95c70',
};

// Default export retained for code that has not been moved to useTheme yet.
export const colors = darkColors;
