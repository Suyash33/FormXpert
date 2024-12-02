import React from 'react';

export const NavLink = ({ href, children, mobile }) => {
  const isActive = window.location.pathname === href;
  
  const baseClasses = "transition-colors duration-200";
  const mobileClasses = mobile
    ? "block px-2 py-1 rounded-md"
    : "";
  const activeClasses = isActive
    ? "text-blue-600 font-medium"
    : "text-gray-500 hover:text-gray-900";

  return (
    <a
      href={href}
      className={`${baseClasses} ${mobileClasses} ${activeClasses}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </a>
  );
};
