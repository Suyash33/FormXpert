import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { FormFieldComponent } from './FormField';
import { fetchFormConfig } from '../data/mockApi';
import { validateForm } from '../utils/validation';

export const EditModal = ({ entry, onSave, onClose }) => {
  const [formData, setFormData] = useState({});
  const [fields, setFields] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (entry) {
      setFormData({ ...entry });
      loadFormConfig();
    }
  }, [entry]);

  const loadFormConfig = async () => {
    if (!entry) return;
    try {
      const config = await fetchFormConfig(entry.formType);
      setFields(config.fields);
    } catch (error) {
      console.error('Failed to load form configuration');
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field.name]: value }));
    if (errors[field.name]) {
      const newErrors = { ...errors };
      delete newErrors[field.name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(fields, formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0 && entry) {
      setIsSubmitting(true);
      try {
        const updatedEntry = {
          ...entry,
          ...formData,
          timestamp: new Date().toISOString(),
        };
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
        onSave(updatedEntry);
        onClose(); // Close the modal after saving
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!entry) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Entry</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.length === 0 ? (
            <div className="text-center">Loading form fields...</div>
          ) : (
            fields.map((field) => (
              <FormFieldComponent
                key={field.name}
                field={field}
                value={formData[field.name]?.toString() || ''}
                error={errors[field.name]}
                onChange={(value) => handleChange(field, value)}
              />
            ))
          )}

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                px-4 py-2 rounded-md text-white font-medium
                ${isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                }
              `}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
