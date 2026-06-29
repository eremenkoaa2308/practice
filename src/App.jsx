import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

function NavBar() {
  return (
    <>
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', ml: 30 }}>
          <Button color="inherit">Главная</Button>
          <Button color="inherit">Справочник о работниках</Button>
          <Button color="inherit">О Компании</Button>
          <Button color="inherit">Безопасность</Button>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: 'rgba(255,255,255,0.3)', mx: 1 }}
          />

          <Button color="inherit">Настройки</Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 'auto' }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.2 }}>
              Иванов Иван Иванович
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              IvanovII@mail.ru
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: 'lightgrey' }}></Avatar>
        </Box>
      </Toolbar>
    </AppBar>
    <body>
      <h1>
          Справочник работников
      </h1>
    </body>
    </>
    
  )
}

export default NavBar