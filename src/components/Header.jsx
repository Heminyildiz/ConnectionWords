import React from 'react';

const Header = ({ errorCount }) => {
  return (
    <header className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-700 to-blue-500 shadow-lg">
      <h1 className="text-3xl font-bold text-white">Connection Unlimited</h1>
      <div className="flex items-center">
        <span className="mr-2 text-white text-xl">Hatalar:</span>
        <span className="text-xl text-red-300">{errorCount}</span>
      </div>
    </header>
  );
};

export default Header;

