import React from 'react';

const WordButton = ({ word, onClick, isSelected }) => {
  // Sabit boyutlu kutu: w-28 (7rem), h-14 (3.5rem)
  const baseStyle = "w-28 h-14 flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out cursor-pointer text-base font-bold uppercase";
  // Eğer seçili ise, arka plan #C8CED6, değilse #E6E5E4
  const boxStyle = isSelected ? "bg-[#C8CED6]" : "bg-[#E6E5E4]";
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${boxStyle}`}>
      {word.text}
    </button>
  );
};

export default WordButton;






