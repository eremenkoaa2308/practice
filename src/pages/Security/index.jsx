import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import PageTitle from '../../components/PageTitle';
import BreadcrumbsNav from '../../components/Breadcrumbs';

const SectionLabel = ({ children }) => (
  <Typography variant="body2" sx={styles.label}>
    {children}
  </Typography>
);

const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург'];

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
    gap: 2,
  },
  label: { color: 'text.secondary', mb: 0.5 },
  field: { bgcolor: 'background.paper', borderRadius: 1 },
  select: { bgcolor: 'background.paper' },
  placeholder: { color: '#9e9e9e' },
  submitButton: {
    bgcolor: 'accent.main',
    textTransform: 'none',
    py: 1.2,
    '&:hover': { bgcolor: 'accent.dark' },
  },
};

const Security = () => {
  const [tab, setTab] = useState(0);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [types, setTypes] = useState({ infra: true, dev: true, spec: false });
  const [speciality, setSpeciality] = useState('programmer');

  const handleType = (name) => (event) => {
    setTypes((prev) => ({ ...prev, [name]: event.target.checked }));
  };

  return (
    <Box sx={styles.page}>
      <PageTitle>Безопасность</PageTitle>

      <BreadcrumbsNav />
      <Box sx={styles.tabsBar}>
        <Tabs value={tab} onChange={(event, value) => setTab(value)} sx={styles.tabs}>
          <Tab label="Регистрация инцидента" />
          <Tab label="Просмотр рекомендаций" />
          <Tab label="Прохождение тестирования" />
        </Tabs>
      </Box>

      {tab === 0 && (
        <Box sx={styles.panel}>
          <TextField
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Имя"
            fullWidth
            sx={styles.field}
          />

          <Select
            value={city}
            onChange={(event) => setCity(event.target.value)}
            displayEmpty
            fullWidth
            renderValue={(selected) =>
              selected || <span style={styles.placeholder}>Город</span>
            }
            sx={styles.select}
          >
            {cities.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>

          <Box>
            <SectionLabel>Тип</SectionLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={types.infra} onChange={handleType('infra')} />}
                label="Инфраструктура"
              />
              <FormControlLabel
                control={<Checkbox checked={types.dev} onChange={handleType('dev')} />}
                label="Разработка"
              />
              <FormControlLabel
                control={<Checkbox checked={types.spec} onChange={handleType('spec')} />}
                label="Специалист"
              />
            </FormGroup>
          </Box>

          <Box>
            <SectionLabel>Специальность</SectionLabel>
            <RadioGroup value={speciality} onChange={(event) => setSpeciality(event.target.value)}>
              <FormControlLabel value="programmer" control={<Radio />} label="Программист" />
              <FormControlLabel value="analyst" control={<Radio />} label="Аналитик" />
              <FormControlLabel value="specialist" control={<Radio />} label="Специалист" />
            </RadioGroup>
          </Box>
          <Button variant="contained" fullWidth sx={styles.submitButton}>
            Отправить
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Security;
