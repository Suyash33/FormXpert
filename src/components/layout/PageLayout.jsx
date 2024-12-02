import React from 'react';
import { Header } from './Header';

const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
