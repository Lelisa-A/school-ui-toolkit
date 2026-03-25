import React from 'react';
import { LibraryManagement } from '../components/modules/LibraryManagement';
import { motion } from 'framer-motion';

export const Library: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8"
    >
      <LibraryManagement />
    </motion.div>
  );
};