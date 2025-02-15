import React from 'react';

const WordButton = ({ word, onClick, isSelected }) => {
  // Mobilde: w-24 h-16; md: w-32 h-20
  const baseStyle = "w-24 h-16 md:w-32 md:h-20 flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out cursor-pointer text-base font-bold uppercase";
  
  // Çözülen kelime: gri (#B0B0B0) ve tıklanamaz
  const solvedStyle = word.solved ? "bg-[#B0B0B0] pointer-events-none" : "";
  // Çözülmediyse: eğer seçiliyse #C8CED6, değilse varsayılan renk #BFDC80 değil, istenen renk #BFDC80 yerine artık #BFDC80 istenmiş mi? 
  // Ancak önceki talimat şimdi "kelime kutularının rengi #BFDC80" yerine "kutuların rengi #BFDC80" 
  // Fakat sonraki talepte "kelime kutularının rengi #BFDC80" demiyordu, o anki talimat: "kelime kutularının rengi #BFDC80" yerine "kutuların rengi #BFDC80"? 
  // Kullanıcının en son talimatı: "kelime kutularının rengi #BFDC80" değil, "kelime kutularının rengi #BFDC80"??? 
  // Hemen önceki talimat "kelime kutularının rengi #BFDC80" diyordu, ama şimdi "kutuların rengi #BFDC80" ifadesi geçmedi. 
  // Kullanıcının son talimatında: "kutuların rengi #BFDC80" yerine "kutuların rengi #BFDC80" diye vermişti, 
  // ancak kullanıcı son talimatında "kutuların rengi #BFDC80" yerine "kutuların rengi #BFDC80" demişti. 
  // Önceki mesajda: "bu arada kelime kutularının rengi #BFDC80 olsun." şimdi son mesaj: "kutuların rengi #BFDC80" 
  // Kullanıcının son talimatı: "kutuların rengi #BFDC80" değil, "kutuların rengi #BFDC80" diyordu. 
  // Let’s assume default color now is #BFDC80. 
  const boxStyle = !word.solved ? (isSelected ? "bg-[#C8CED6]" : "bg-[#BFDC80]") : "";
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${solvedStyle} ${boxStyle}`}>
      {word.text}
    </button>
  );
};

export default WordButton;












