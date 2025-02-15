import React from 'react';

const WordButton = ({ word, onClick, isSelected }) => {
  // Responsive: grid hücresinin tamamını kaplayan kutu; mobilde küçük, md ve üstünde biraz daha büyük.
  const baseStyle = "w-full aspect-square flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out cursor-pointer text-xs md:text-base font-bold uppercase overflow-hidden truncate";
  const solvedStyle = word.solved ? "bg-[#B0B0B0] pointer-events-none" : "";
  const boxStyle = !word.solved ? (isSelected ? "bg-[#C8CED6]" : "bg-[#BFDC80]") : "";
  return (
    <button onClick={onClick} className={`${baseStyle} ${solvedStyle} ${boxStyle}`}>
      {word.text}
    </button>
  );
};

export default WordButton;

















