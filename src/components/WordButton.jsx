import React from 'react';

const WordButton = ({ word, isCorrect, onClick, disabled }) => {
  // Seçimin durumuna göre dinamik sınıf belirleme
  const getClass = () => {
    if (isCorrect === true) return "bg-green-500";
    if (isCorrect === false) return "bg-red-500";
    return "bg-blue-500 hover:bg-blue-600";
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-4 rounded-lg shadow transition duration-200 ease-in-out active:scale-95 text-white ${getClass()}`}
    >
      {word}
    </button>
  );
};

export default WordButton;
