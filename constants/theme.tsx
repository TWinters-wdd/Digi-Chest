import { createContext, type PropsWithChildren, useContext, useMemo, useState } from 'react';

import { darkColors, lightColors, type AppColors } from './colors';

type ThemeContextValue = {
  colors: AppColors;
  isDark: boolean;
  setIsDark: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [isDark, setIsDark] = useState(true);
  const colors = isDark ? darkColors : lightColors;
  const value = useMemo(() => ({ colors, isDark, setIsDark }), [colors, isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}
