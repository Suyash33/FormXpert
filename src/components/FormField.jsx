import React, { useEffect, useRef } from 'react';

const ErrorMessage = ({ error }) => (
  <p className="text-red-500 text-sm mt-1">{error}</p>
);

export const FormFieldComponent = ({ field, value, error, onChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (field.required && error && inputRef.current) {
      inputRef.current.focus();
    }
  }, [error, field.required]);

  const baseInputClasses = `
    mt-1 block w-full rounded-md shadow-sm
    ${error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
    }
  `;

  const renderField = () => {
    const inputId = `${field.label.replace(/\s+/g, '-').toLowerCase()}-input`;

    switch (field.type) {
      case 'dropdown':
        return (
          <select
            id={inputId}
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={baseInputClasses}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'password':
        return (
          <input
            id={inputId}
            ref={inputRef}
            type="password"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={baseInputClasses}
            autoComplete="off"
          />
        );

      default:
        return (
          <input
            id={inputId}
            ref={inputRef}
            type={field.type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={baseInputClasses}
          />
        );
    }
  };

  return (
    <div className="space-y-1">
      <label htmlFor={`${field.label.replace(/\s+/g, '-').toLowerCase()}-input`} className="block text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};
