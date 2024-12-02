import React, { useState } from 'react';
import { DynamicForm } from './components/DynamicForm';
import { FormEntryTable } from './components/FormEntryTable';
import { NotificationManager } from './components/NotificationManager';
import { EditModal } from './components/EditModal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  const [formType, setFormType] = useState('userInfo');
  const [entries, setEntries] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);

  const handleFormSubmit = (data) => {
    const newEntry = {
      ...data,
      id: crypto.randomUUID(),
      formType,
      timestamp: new Date().toISOString(),
    };
    setEntries((prev) => [...prev, newEntry]);
    showNotification('Form submitted successfully!', 'success');
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
  };

  const handleSaveEdit = (updatedEntry) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry))
    );
    setEditingEntry(null);
    showNotification('Changes saved successfully!', 'success');
  };

  const handleDelete = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    showNotification('Entry deleted successfully!', 'success');
  };

  const showNotification = (message, type) => {
    const newNotification = {
      id: crypto.randomUUID(),
      message,
      type,
    };
    setNotifications((prev) => [...prev, newNotification]);
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 3000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow pt-16">
        <div id="form-section" className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Form Type
              </label>
              <select
                value={formType}
                onChange={(e) => setFormType(e.target.value)}
                className="w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="userInfo">User Information</option>
                <option value="address">Address Information</option>
                <option value="payment">Payment Information</option>
              </select>
            </div>

            <DynamicForm formType={formType} onSubmit={handleFormSubmit} />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Submitted Entries</h2>
            <FormEntryTable
              entries={entries}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>

      <Footer />

      <NotificationManager
        notifications={notifications}
        onClose={removeNotification}
      />

      {editingEntry && (
        <EditModal
          entry={editingEntry}
          onSave={handleSaveEdit}
          onClose={() => setEditingEntry(null)}
        />
      )}
    </div>
  );
}

export default App;
