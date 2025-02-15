import React from 'react';

const Header = ({ errorCount }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-2xl font-bold">ConnectionWords</h1>
      <span className="text-lg text-red-500">Hatalar: {errorCount}</span>
    </header>
  );
};

export default Header;
