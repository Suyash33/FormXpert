import React from 'react';
import { FormInput, ArrowRight } from 'lucide-react';
import { scrollToSection } from '../../utils/scroll';

export const HomeSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <FormInput className="h-16 w-16 text-blue-600" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Dynamic Form Builder
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create, manage, and customize forms with our intuitive form builder. Perfect for collecting user information, addresses, and payment details.
        </p>
        <button
          onClick={() => scrollToSection('form')}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </section>
  );
};
