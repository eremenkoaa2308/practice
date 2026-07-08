import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CheckIcon from '@mui/icons-material/Check';
import SubjectIcon from '@mui/icons-material/Subject';
import PageTitle from '../../components/PageTitle';
import BreadcrumbsNav from '../../components/Breadcrumbs';

// Маленькая подпись над полем: текст + иконка справа (как на макете).
const SectionLabel = ({ icon, children }) => (
  <Box sx={styles.label}>
    <Typography variant="body2">{children}</Typography>
    <Box sx={styles.labelIcon}>{icon}</Box>
  </Box>
);

// Все стили страницы в одном месте, чтобы разметка оставалась чистой.
const styles = {
  page: { pb: 6, textAlign: 'left' },
  tabsBar: { borderBottom: 1, borderColor: 'divider', mt: 2 },
  tabs: { ml: 4 },
  panel: {
    mx: 4,
    mt: 3,
    p: 3,
    maxWidth: 600,
    bgcolor: 'panel.main',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  label: { display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5, color: 'text.secondary' },
  labelIcon: { display: 'flex', color: 'primary.main' },
  slider: { color: 'primary.main' },
  textField: { bgcolor: '#fff', borderRadius: 1 },
  saveRow: { display: 'flex', justifyContent: 'flex-end' },
  saveButton: {
    bgcolor: 'accent.main',
    textTransform: 'none',
    px: 4,
    '&:hover': { bgcolor: 'accent.dark' },
  },
};

const Settings = () => {
  // Состояние страницы. Всё контролируемое, чтобы поля реально работали.
  const [tab, setTab] = useState(0); // активная вкладка
  const [range, setRange] = useState(50); // значение ползунка "Диапазон"
  const [levels, setLevels] = useState({ level1: true, level2: false, level3: false });
  const [details, setDetails] = useState(''); // текст из поля "Подробности"

  // Переключение тумблеров "Согласование" по имени уровня.
  const handleLevel = (name) => (event) => {
    setLevels((prev) => ({ ...prev, [name]: event.target.checked }));
  };

  return (
    <Box sx={styles.page}>
      <PageTitle>Настройки</PageTitle>

      <BreadcrumbsNav />

      {/* Вкладки. Нижняя линия тянется на всю ширину, поэтому она на обёртке. */}
      <Box sx={styles.tabsBar}>
        <Tabs value={tab} onChange={(event, value) => setTab(value)} sx={styles.tabs}>
          <Tab label="Управление" />
          <Tab label="Графики" />
          <Tab label="Личные данные" />
        </Tabs>
      </Box>

      {/* Вкладка "Управление" — единственная, что заполнена контентом. */}
      {tab === 0 && (
        <Box sx={styles.panel}>
          {/* Диапазон */}
          <Box>
            <SectionLabel icon={<ShowChartIcon fontSize="small" />}>Диапазон</SectionLabel>
            <Slider
              value={range}
              onChange={(event, value) => setRange(value)}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: '0' },
                { value: 100, label: '100' },
              ]}
              sx={styles.slider}
            />
          </Box>

          {/* Согласование */}
          <Box>
            <SectionLabel icon={<CheckIcon fontSize="small" />}>Согласование</SectionLabel>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={levels.level1} onChange={handleLevel('level1')} />}
                label="1 уровень"
              />
              <FormControlLabel
                control={<Switch checked={levels.level2} onChange={handleLevel('level2')} />}
                label="2 уровень"
              />
              <FormControlLabel
                control={<Switch checked={levels.level3} onChange={handleLevel('level3')} />}
                label="3 уровень"
              />
            </FormGroup>
          </Box>

          {/* Подробности */}
          <Box>
            <SectionLabel icon={<SubjectIcon fontSize="small" />}>Подробности</SectionLabel>
            <TextField
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              placeholder="Текст ..."
              multiline
              rows={5}
              fullWidth
              sx={styles.textField}
            />
          </Box>

          {/* Кнопка "Сохранить" прижата вправо. */}
          <Box sx={styles.saveRow}>
            <Button variant="contained" sx={styles.saveButton}>
              Сохранить
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Settings;
