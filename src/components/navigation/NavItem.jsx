import React from 'react';

export const NavItem = ({ id, label, onClick, mobile }) => {
  const baseClasses = "text-gray-500 hover:text-gray-900 transition-colors duration-200";
  const mobileClasses = mobile ? "text-left px-2 py-1" : "";

  return (
    <button
      onClick={() => onClick(id)}
      className={`${baseClasses} ${mobileClasses}`}
    >
      {label}
    </button>
  );
};
