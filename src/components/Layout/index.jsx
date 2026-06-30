import { Outlet } from 'react-router-dom';
import NavBar from '../AppBar';
import BreadcrumbsNav from '../Breadcrumbs';

function Layout() {
  return (
    <>
      <NavBar />
      <BreadcrumbsNav />
      <Outlet />
    </>
  );
}

export default Layout;
