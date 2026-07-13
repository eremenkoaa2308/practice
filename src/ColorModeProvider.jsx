import { useState, useMemo, useCallback, createContext, useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from './theme';

// Контекст хранит текущий режим и функцию его переключения.
const ColorModeContext = createContext({ mode: 'light', toggleColorMode: () => {} });

// Хук, чтобы из любого компонента (например, из шапки) узнать режим и переключить его.
export const useColorMode = () => useContext(ColorModeContext);

const ColorModeProvider = ({ children }) => {
  // Запоминаем выбор пользователя в localStorage. По умолчанию — светлая тема.
  const [mode, setMode] = useState(() => localStorage.getItem('color-mode') || 'light');

  const toggleColorMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('color-mode', next);
      return next;
    });
  }, []);

  // Пересобираем тему только при смене режима.
  const theme = useMemo(() => getTheme(mode), [mode]);
  const value = useMemo(() => ({ mode, toggleColorMode }), [mode, toggleColorMode]);

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline красит фон страницы и текст под выбранный режим. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
