import React from 'react';

const difficulties = ["Easy", "Medium", "Hard"];

const DifficultySelector = ({ currentDifficulty, onDifficultyChange }) => {
  return (
    <div className="flex justify-center space-x-4">
      {difficulties.map((level) => (
        <button
          key={level}
          onClick={() => onDifficultyChange(level)}
          className={`py-2 px-4 rounded-md ${
            currentDifficulty === level
              ? "bg-[#ff5757] text-white"
              : "bg-[#ebded4] text-gray-800"
          } transition-all duration-200 ease-in-out`}
        >
          {level}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;



















