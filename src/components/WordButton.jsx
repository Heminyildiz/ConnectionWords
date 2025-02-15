import React from 'react';

const WordButton = ({ word, onClick, isSelected }) => {
  const baseStyle = "py-3 px-4 rounded-lg shadow transition-all duration-300 ease-in-out cursor-pointer text-lg font-medium";
  const normalStyle = "bg-white border border-gray-300 hover:bg-gray-100";
  const selectedStyle = "bg-blue-200 border-blue-400";
  
  // Renk kodları: her grup için farklı pastel tonlar
  const groupColors = {
    "1": "bg-red-200 border-red-400",
    "2": "bg-green-200 border-green-400",
    "3": "bg-blue-200 border-blue-400",
    "4": "bg-yellow-200 border-yellow-400",
    "5": "bg-purple-200 border-purple-400",
    "6": "bg-pink-200 border-pink-400",
  };
  const solvedStyle = word.solved ? (groupColors[word.group] || "bg-green-300 border-green-500") : "";

  let style = baseStyle;
  if (word.solved) {
    style += " " + solvedStyle + " cursor-default";
  } else if (isSelected) {
    style += " " + selectedStyle;
  } else {
    style += " " + normalStyle;
  }

  return (
    <button onClick={onClick} className={style} disabled={word.solved}>
      {word.text}
    </button>
  );
};

export default WordButton;



