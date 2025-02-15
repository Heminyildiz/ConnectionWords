import React from 'react';

const WordButton = ({ word, onClick, isSelected }) => {
  // Sabit boyut: w-32 (8rem) genişlik, h-16 (4rem) yükseklik
  const baseStyle = "w-32 h-16 flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out cursor-pointer text-base font-bold uppercase";
  
  // Eğer kelime çözüldüyse, farklı renk göster (örneğin, gri) ve tıklanamaz
  const solvedStyle = word.solved ? "bg-[#B0B0B0] pointer-events-none" : "";
  // Çözülmediyse, seçili olup olmamasına göre arka plan rengi
  const boxStyle = !word.solved ? (isSelected ? "bg-[#C8CED6]" : "bg-[#E6E5E4]") : "";
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${solvedStyle} ${boxStyle}`}>
      {word.text}
    </button>
  );
};

export default WordButton;










