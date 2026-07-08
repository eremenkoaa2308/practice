import { Outlet } from 'react-router-dom';
import NavBar from '../AppBar';

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default Layout;
