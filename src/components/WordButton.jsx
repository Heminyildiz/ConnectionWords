import React from 'react';

const WordButton = ({ word, onClick, isSelected }) => {
  // Küçük boyutlu kutu: w-28 (7rem), h-16 (4rem)
  const baseStyle = "w-28 h-16 flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out cursor-pointer text-base font-bold uppercase";
  // Normalde arka plan #E6E5E4; seçili ise #C8CED6
  const boxStyle = isSelected ? "bg-[#C8CED6]" : "bg-[#E6E5E4]";
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${boxStyle}`}>
      {word.text}
    </button>
  );
};

export default WordButton;









