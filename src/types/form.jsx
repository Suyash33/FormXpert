// Definition of a form field structure
const FormField = {
  name: '', // Field name (string)
  type: '', // Field type (e.g., 'text', 'number', 'date') (string)
  label: '', // Field label (string)
  required: false, // Whether the field is required (boolean)
  options: [], // Optional: Array of options for select fields (array of strings)
};

// Configuration for a form, containing an array of fields
const FormConfig = {
  fields: [], // Array of FormField objects
};

// Data for form submission, with keys as field names and values as field data
const FormData = {}; // Key-value pairs (string or number)

// Form entry object, extending FormData with additional metadata
const FormEntry = {
  ...FormData,
  id: '', // Unique identifier for the entry (string)
  formType: '', // Type of the form (string)
  timestamp: '', // Timestamp of the entry creation (string)
};
