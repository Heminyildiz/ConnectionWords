import React from 'react';

const DifficultySelector = ({ currentDifficulty, onDifficultyChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="font-medium text-gray-700">Zorluk Seviyesi:</label>
      <select 
        value={currentDifficulty} 
        onChange={(e) => onDifficultyChange(e.target.value)}
        className="py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Kolay">Kolay</option>
        <option value="Orta">Orta</option>
        <option value="Zor">Zor</option>
      </select>
    </div>
  );
};

export default DifficultySelector;

