import React from 'react';

const WordButton = ({ word, onClick, isSelected }) => {
  // Mobilde: w-24 h-16; md: w-32 h-20; metin küçük ve sığacak şekilde
  const baseStyle = "w-24 h-16 md:w-32 md:h-20 flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out cursor-pointer text-xs md:text-base font-bold uppercase overflow-hidden truncate";
  
  // Eğer kelime çözüldüyse: gri (#B0B0B0) ve tıklanamaz
  const solvedStyle = word.solved ? "bg-[#B0B0B0] pointer-events-none" : "";
  
  // Çözülmediyse: seçiliyse #C8CED6, değilse varsayılan arka plan rengi #BFDC80
  const boxStyle = !word.solved ? (isSelected ? "bg-[#C8CED6]" : "bg-[#BFDC80]") : "";
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${solvedStyle} ${boxStyle}`}>
      {word.text}
    </button>
  );
};

export default WordButton;













