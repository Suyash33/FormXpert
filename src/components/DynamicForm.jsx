import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { FormFieldComponent } from './FormField';
import { ProgressBar } from './ProgressBar';
import { fetchFormConfig } from '../data/mockApi';
import { validateForm } from '../utils/validation';

export const DynamicForm = ({ formType, onSubmit }) => {
  const [formConfig, setFormConfig] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadFormConfig();
  }, [formType]);

  const loadFormConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      const config = await fetchFormConfig(formType);
      setFormConfig(config);
      setFormData({});
      setErrors({});
    } catch (err) {
      setError('Failed to load form configuration');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formConfig) {
      const requiredFields = formConfig.fields.filter(field => field.required);
      const filledRequiredFields = requiredFields.filter(
        field => formData[field.name] && !errors[field.name]
      );
      setProgress((filledRequiredFields.length / requiredFields.length) * 100 || 0);
    }
  }, [formData, errors, formConfig]);

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
    if (!formConfig) return;

    const validationErrors = validateForm(formConfig.fields, formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
        onSubmit(formData);
        setFormData({});
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-600 p-4 bg-red-50 rounded-lg">
        <AlertCircle className="w-5 h-5" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <ProgressBar progress={progress} />

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {formConfig?.fields.map((field) => (
          <FormFieldComponent
            key={field.name}
            field={field}
            value={formData[field.name]?.toString() || ''}
            error={errors[field.name]}
            onChange={(value) => handleChange(field, value)}
          />
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full py-2 px-4 rounded-md text-white font-medium
            ${isSubmitting
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }
          `}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
};
