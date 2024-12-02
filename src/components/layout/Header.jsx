import React, { useState } from 'react';
import { FormInput, Menu, X } from 'lucide-react';
import { NavItem } from '../navigation/NavItem';
import { scrollToSection } from '../../utils/scroll';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'form', label: 'Form' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (id) => {
    setIsMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <FormInput className="h-8 w-8 text-blue-600" />
            <h1 className="ml-2 text-xl font-bold text-gray-900 sm:text-2xl">
              Dynamic Form Builder
            </h1>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>

          <nav className="hidden sm:flex space-x-8">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                id={item.id}
                label={item.label}
                onClick={handleNavClick}
              />
            ))}
          </nav>
        </div>

        {isMenuOpen && (
          <nav className="sm:hidden py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  onClick={handleNavClick}
                  mobile
                />
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
