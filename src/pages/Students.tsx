import React from 'react';
import { StudentManagement } from '../components/modules/StudentManagement';
import { motion } from 'framer-motion';

export const Students: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8"
    >
      <StudentManagement />
    </motion.div>
  );
};