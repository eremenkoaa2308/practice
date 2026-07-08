import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useLocation } from 'react-router-dom';

const pathNames = {
  '/': 'Главная',
  '/dictionary': 'Справочник работников',
  '/about': 'О Компании',
  '/security': 'Безопасность',
  '/settings': 'Настройки',
};

function BreadcrumbsNav() {
  const location = useLocation();

  return (
    <Breadcrumbs sx={{ ml: 4, mt: 2 }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        Главная
      </Link>
      {location.pathname !== '/' && (
        <span>{pathNames[location.pathname]}</span>
      )}
    </Breadcrumbs>
  );
}

export default BreadcrumbsNav;
