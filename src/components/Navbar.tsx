import React from 'react';
import { motion } from 'framer-motion';
import StaggeredMenu from './StaggeredMenu';

interface NavbarProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onSelectSection }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        bounce: 0.1,
        duration: 1.3,
        delay: 0.2,
      }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-end">
        {/* React Bits Staggered Menu Component */}
        <div className="pointer-events-auto">
          <StaggeredMenu activeSection={activeSection} onSelectSection={onSelectSection} />
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
