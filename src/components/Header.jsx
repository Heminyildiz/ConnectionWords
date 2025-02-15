import React from 'react';

const Header = ({ errorCount, errorLimit, gameStatus, difficulty }) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-6 bg-gradient-to-r from-pink-200 to-blue-200 shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 md:mb-0">Connection Unlimited</h1>
      <div className="flex items-center space-x-4">
        <div className="text-gray-800 text-lg">
          Hatalar: {errorCount} / {errorLimit}
        </div>
        <div className="text-gray-800 text-lg">
          Durum: {gameStatus === "playing" ? "Devam ediyor" : gameStatus === "won" ? "Kazandınız!" : "Kaybettiniz"}
        </div>
      </div>
    </header>
  );
};

export default Header;



