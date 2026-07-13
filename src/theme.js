import { createTheme } from '@mui/material/styles';

// Цвета для светлого и тёмного режимов.
// primary и accent держим одинаковыми (синий бренд читается на обоих фонах),
// а меняется в основном фон панелей.
const palettes = {
  light: {
    primary: { main: '#2f5fa8' },
    panel: { main: '#eaf3fd' }, // фон голубых панелей и карточек
    accent: { main: '#155fa0', dark: '#124f85' }, // кнопки "Сохранить" / "Отправить"
  },
  dark: {
    primary: { main: '#5b8fd6' },
    panel: { main: '#1e2732' },
    accent: { main: '#2f6db0', dark: '#255a95' },
  },
};

// Собираем тему под выбранный режим: 'light' или 'dark'.
// palette.mode сам подставляет правильные фон и цвет текста.
export const getTheme = (mode) =>
  createTheme({
    palette: { mode, ...palettes[mode] },
  });

export default getTheme;
