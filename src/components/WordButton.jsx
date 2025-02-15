import React from 'react';

const WordButton = ({ word, onClick, isSelected }) => {
  // Sabit boyut: w-36 (9rem), h-20 (5rem)
  const baseStyle = "w-36 h-20 flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out cursor-pointer text-lg font-bold uppercase";
  // Normalde arka plan #E6E5E4; seçili ise #C8CED6
  const boxStyle = isSelected ? "bg-[#C8CED6]" : "bg-[#E6E5E4]";
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${boxStyle}`}>
      {word.text}
    </button>
  );
};

export default WordButton;








