import React from 'react';

const difficulties = ["Kolay", "Orta", "Zor"];

const DifficultySelector = ({ currentDifficulty, onDifficultyChange }) => {
  return (
    <div className="flex space-x-4">
      {difficulties.map((level) => (
        <button
          key={level}
          onClick={() => onDifficultyChange(level)}
          className={`py-2 px-4 rounded-md border ${
            currentDifficulty === level
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-800"
          } transition-all duration-200 ease-in-out`}
        >
          {level}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;


