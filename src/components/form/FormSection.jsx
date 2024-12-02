import React, { useState } from 'react';
import FormSection from './components/sections/FormSection';

const App = () => {
  const [formType, setFormType] = useState('userInfo');
  const [entries, setEntries] = useState([]);

  const handleFormSubmit = (data) => {
    setEntries([...entries, data]);
  };

  const handleEdit = (entry) => {
    // Handle editing logic
  };

  const handleDelete = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleFormTypeChange = (type) => {
    setFormType(type);
  };

  return (
    <div>
      <FormSection
        formType={formType}
        entries={entries}
        onFormSubmit={handleFormSubmit}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onFormTypeChange={handleFormTypeChange}
      />
    </div>
  );
};

export default App;
