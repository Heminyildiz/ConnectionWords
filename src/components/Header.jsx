import React from 'react';

const Header = ({ errorCount, errorLimit, gameStatus }) => {
  return (
    <header className="py-3 border-b border-gray-300 w-full relative">
      <h1 className="text-2xl font-semibold text-center text-gray-800">
        ConnectionWords
      </h1>
      {/* İnce çizgi: Gridin sol üst ve sağ üst kutularının hizasına denk gelecek şekilde */}
      <div className="mt-2 mx-auto" style={{width: '31rem', height: '1px', backgroundColor: '#ccc'}}></div>
    </header>
  );
};

export default Header;





