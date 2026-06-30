import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Settings from './pages/Settings';
import Security from './pages/Security';
import Dictionary from './pages/Dictionary';
import About from './pages/About';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="dictionary" element={<Dictionary />} />
        <Route path="security" element={<Security />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
