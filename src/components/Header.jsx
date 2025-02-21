import React, { useState } from 'react';

const Header = ({ mode, setMode, theme, setTheme }) => {
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    setThemeDropdownOpen(false);
  };

  const textColorClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-800';

  return (
    <>
      <header className="py-2 w-full border-b border-gray-300 px-4">
        <div className="max-w-[35rem] mx-auto flex items-center justify-between">
          {/* Sol taraf: Mod seçimi */}
          <div className="flex items-center space-x-2">
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className={`text-lg font-semibold ${textColorClass} bg-transparent outline-none`}
            >
              <option value="Daily">Daily</option>
              <option value="Challenge">Challenge</option>
              <option value="Zen">Zen</option>
            </select>
          </div>
          {/* Ortada: Boş bırakıldı */}
          <div></div>
          {/* Sağ taraf: Soru işareti ikonu ve Tema toggling */}
          <div className="flex items-center space-x-2">
            <button onClick={() => setShowHowToPlay(true)} className="focus:outline-none">
              {/* Minimalist Question Mark Icon (Tabler Icons) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 18h.01" />
                <path d="M9 9a3 3 0 1 1 6 0c0 1.5 -1.5 2.25 -2 2.5l-1 .5" />
              </svg>
            </button>
            <div className="relative">
              <button onClick={() => setThemeDropdownOpen(!themeDropdownOpen)} className="focus:outline-none">
                {theme === 'light' ? (
                  // Açık modda güneş ikonu
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414M16.95 16.95l1.414 1.414M7.05 7.05L5.636 5.636M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ) : (
                  // Koyu modda ay ikonu
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.293 13.293A8 8 0 116.707 2.707a8.001 8.001 0 0010.586 10.586z" />
                  </svg>
                )}
              </button>
              {themeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg">
                  <button onClick={toggleTheme} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {showHowToPlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm mx-auto text-center">
            <h2 className="text-xl font-bold mb-4">How to Play</h2>
            <p className="text-sm text-gray-700 mb-4">
              To play the game, select words that belong together to form a valid group.
              Click on a word to select it, and once four words are selected, if they all match, they lock in as a correct answer.
              Try to complete all groups with as few mistakes as possible.
            </p>
            <button onClick={() => setShowHowToPlay(false)} className="py-2 px-4 rounded-md bg-blue-500 text-white font-bold">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;




































