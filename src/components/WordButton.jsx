import React from 'react';

const WordButton = ({ word, onClick, isSelected }) => {
  // Sabit boyut: w-32 (8rem) genişlik, h-16 (4rem) yükseklik
  const baseStyle = "w-32 h-16 flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out cursor-pointer text-base font-bold uppercase";
  
  // Çözülen kelime: gri (#B0B0B0) ve tıklanamaz
  const solvedStyle = word.solved ? "bg-[#B0B0B0] pointer-events-none" : "";
  // Eğer kelime çözüldüyse değilse; seçiliyse (#C8CED6), normalde ise #D4B996
  const boxStyle = !word.solved ? (isSelected ? "bg-[#C8CED6]" : "bg-[#D4B996]") : "";
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${solvedStyle} ${boxStyle}`}>
      {word.text}
    </button>
  );
};

export default WordButton;











