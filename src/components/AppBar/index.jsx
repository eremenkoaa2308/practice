import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Link } from 'react-router-dom';
import { useColorMode } from '../../ColorModeProvider';

function NavBar() {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', ml: 30 }}>
          <Button color="inherit">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Главная</Link>
          </Button>

          <Button color="inherit">
            <Link to="/dictionary" style={{ color: 'inherit', textDecoration: 'none' }}>Справочник о работниках</Link>
          </Button>

          <Button color="inherit">
            <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>О Компании</Link>
          </Button>

          <Button color="inherit">
            <Link to="/security" style={{ color: 'inherit', textDecoration: 'none' }}>Безопасность</Link>
          </Button>

          <Divider orientation="vertical"
          flexItem
          sx={{ borderColor: 'rgba(255,255,255,0.3)', mx: 1 }}
          />

          <Button color="inherit">
            <Link to="/settings" style={{ color: 'inherit', textDecoration: 'none' }}>Настройки</Link>
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 'auto' }}>
          {/* Переключатель светлой/тёмной темы. */}
          <Tooltip title={mode === 'light' ? 'Тёмная тема' : 'Светлая тема'}>
            <IconButton color="inherit" onClick={toggleColorMode} aria-label="Переключить тему">
              {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
            </IconButton>
          </Tooltip>

          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.2 }}>
              Иванов Иван Иванович
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              IvanovII@mail.ru
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: 'lightgrey' }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;