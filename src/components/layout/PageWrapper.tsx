import React from 'react';

export const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-4 md:p-8">{children}</div>
);