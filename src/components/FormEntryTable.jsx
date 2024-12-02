import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export const FormEntryTable = ({ entries, onEdit, onDelete }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No entries yet. Submit the form to see data here.
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Object.keys(entries[0]).map((key) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {key}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entries.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50">
              {Object.entries(entry).map(([key, value]) => (
                <td key={key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {value.toString()}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit(entry)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                  aria-label={`Edit entry ${entry.id}`}
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete entry ${entry.id}?`)) {
                      onDelete(entry.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-900"
                  aria-label={`Delete entry ${entry.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
