import React from 'react';

const WordButton = ({ word, onClick, isSelected }) => {
  // Sabit boyutlu kutu: genişlik ve yükseklik sabit, arka plan #E6E5E4, uppercase, bold, merkezi konumlandırılmış.
  const baseStyle = "w-32 h-16 flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out cursor-pointer text-xl font-bold uppercase";
  const boxStyle = "bg-[#E6E5E4]";
  const selectedStyle = isSelected ? "border-2 border-blue-500" : "";
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${boxStyle} ${selectedStyle}`}>
      {word.text}
    </button>
  );
};

export default WordButton;





