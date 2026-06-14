import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { useLenis } from '../../hooks/useLenis.js';

export default function PublicLayout() {
  useLenis();
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Navbar />
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="flex-1"
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
}
