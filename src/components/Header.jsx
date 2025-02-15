import React from 'react';

const Header = ({ errorCount, errorLimit, gameStatus, onNewGame, difficulty }) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-6 bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-2 md:mb-0">Connection Unlimited</h1>
      <div className="flex items-center space-x-4">
        <div className="text-white text-lg">
          Hatalar: {errorCount} / {errorLimit}
        </div>
        <div className="text-white text-lg">
          Durum: {gameStatus === "playing" ? "Devam ediyor" : gameStatus === "won" ? "Kazandınız!" : "Kaybettiniz"}
        </div>
        <button 
          onClick={onNewGame}
          className="bg-white text-indigo-600 font-semibold py-2 px-4 rounded shadow hover:bg-gray-200 transition"
        >
          Yeni Oyun
        </button>
      </div>
    </header>
  );
};

export default Header;


