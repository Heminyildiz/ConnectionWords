import React from 'react';

const Header = ({ errorCount, errorLimit, gameStatus }) => {
  return (
    <header className="py-3 border-b border-gray-300 w-full">
      <h1 className="text-2xl font-semibold text-center text-gray-800">
        ConnectionWords
      </h1>
    </header>
  );
};

export default Header;






