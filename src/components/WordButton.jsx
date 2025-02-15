import React from 'react';

const WordButton = ({ word, onClick, isSelected }) => {
  const baseStyle = "py-3 px-4 rounded-lg shadow transition-all duration-300 ease-in-out cursor-pointer text-lg font-medium";
  const normalStyle = "bg-white border border-gray-300 hover:bg-gray-100";
  const selectedStyle = "bg-blue-200 border-blue-400";
  const solvedStyle = "bg-green-300 border-green-500 cursor-default";

  let style = baseStyle;
  if (word.solved) {
    style += " " + solvedStyle;
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


