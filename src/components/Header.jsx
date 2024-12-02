import React, { useState } from 'react';
import { FormInput, Menu, X } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <FormInput className="h-8 w-8 text-blue-600" />
            <h1 className="ml-2 text-xl font-bold text-gray-900 sm:text-2xl">
            FormXpert
            </h1>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <nav className="hidden sm:flex space-x-8">
            <button
              onClick={scrollToTop}
              className="text-gray-500 hover:text-gray-900"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('form-section')}
              className="text-gray-500 hover:text-gray-900"
            >
              Form
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-500 hover:text-gray-900"
            >
              Contact Us
            </button>
          </nav>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden py-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={scrollToTop}
                className="text-gray-500 hover:text-gray-900 text-left px-2 py-1"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('form-section')}
                className="text-gray-500 hover:text-gray-900 text-left px-2 py-1"
              >
                Form
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-500 hover:text-gray-900 text-left px-2 py-1"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
