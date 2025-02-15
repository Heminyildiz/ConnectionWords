import React from 'react';

const WordButton = ({ word, isCorrect, onClick, disabled }) => {
  // Buton stilini seçim durumuna göre ayarlıyoruz
  let baseStyle = "py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out font-medium focus:outline-none";

  if (isCorrect === true) {
    baseStyle += " bg-gradient-to-r from-green-400 to-green-600 text-white";
  } else if (isCorrect === false) {
    baseStyle += " bg-gradient-to-r from-red-400 to-red-600 text-white";
  } else {
    baseStyle += " bg-white text-gray-800 border border-gray-300 hover:shadow-2xl hover:border-transparent";
  }

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={baseStyle}
    >
      {word}
    </button>
  );
};

export default WordButton;

