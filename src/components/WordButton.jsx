import React from 'react';

const WordButton = ({ word, onClick, isSelected }) => {
  // Temel stil: geniş, arka plan rengi #D4CAC5, uppercase, gölge yok
  const baseStyle = "py-4 px-6 rounded-lg transition-all duration-300 ease-in-out cursor-pointer text-lg font-medium uppercase";
  // Seçili veya çözüldüğünde ek stil uygulanabilir; burada basit tutuyoruz
  const selectedStyle = isSelected ? "border-2 border-blue-500" : "";
  // Tüm kutular için sabit arka plan rengi
  const boxStyle = "bg-[#D4CAC5]";

  return (
    <button onClick={onClick} className={`${baseStyle} ${boxStyle} ${selectedStyle}`}>
      {word.text}
    </button>
  );
};

export default WordButton;




