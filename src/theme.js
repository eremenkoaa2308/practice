import { createTheme } from '@mui/material/styles';

// Общая тема проекта. Все повторяющиеся цвета держим здесь,
// чтобы на страницах не было "магических" hex-кодов вроде #2f5fa8.
const theme = createTheme({
  palette: {
    primary: { main: '#2f5fa8' }, // основной синий: заголовки, иконки, слайдер
    panel: { main: '#eaf3fd' }, // фон голубых панелей и карточек
    accent: { main: '#155fa0', dark: '#124f85' }, // кнопки "Сохранить" / "Отправить"
  },
});

export default theme;
