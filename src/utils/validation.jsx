export const validateField = (field, value) => {
  if (field.required && !value) {
    return `${field.label} is required`;
  }

  switch (field.type) {
    case 'number':
      if (isNaN(Number(value))) {
        return `${field.label} must be a valid number`;
      }
      break;
    case 'text':
      if (typeof value === 'string' && value.trim().length < 2) {
        return `${field.label} must be at least 2 characters`;
      }
      break;
    case 'date':
      if (!isValidDate(value.toString())) {
        return `${field.label} must be a valid date`;
      }
      break;
    default:
      break;
  }

  return null;
};

export const validateForm = (fields, formData) => {
  const errors = {};

  fields.forEach((field) => {
    const error = validateField(field, formData[field.name]);
    if (error) {
      errors[field.name] = error;
    }
  });

  return errors;
};

const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};
