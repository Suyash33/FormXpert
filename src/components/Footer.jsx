import React from 'react';
import { Github, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contact" className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:contact@example.com" className="hover:text-blue-600">
                  suyashbudhe1@gmail.com
                </a>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 mr-2" />
                <a href="tel:+1234567890" className="hover:text-blue-600">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Sangli, Maharashtra</span>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Follow Us</h2>
            <div className="flex space-x-6">
              <a
                href="https://github.com/Suyash33"
                aria-label="Follow us on GitHub"
                className="text-gray-400 hover:text-gray-500"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com/33_suyash"
                aria-label="Follow us on Twitter"
                className="text-gray-400 hover:text-gray-500"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} FormXpert. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
