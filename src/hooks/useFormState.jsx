import { useState, useCallback } from 'react';

export const useFormState = () => {
  const [entries, setEntries] = useState([]);

  const addEntry = useCallback((data, formType) => {
    const newEntry = {
      ...data,
      id: crypto.randomUUID(),
      formType,
      timestamp: new Date().toISOString(),
    };
    setEntries((prev) => [...prev, newEntry]);
  }, []);

  const updateEntry = useCallback((updatedEntry) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
  }, []);

  const deleteEntry = useCallback((id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  return { entries, addEntry, updateEntry, deleteEntry };
};
