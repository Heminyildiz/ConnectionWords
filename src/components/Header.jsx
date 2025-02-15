import React, { useState } from 'react';

const Header = ({ mode, setMode, theme, setTheme }) => {
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    setThemeDropdownOpen(false);
  };

  return (
    <header className="py-2 w-full border-b border-gray-300">
      <div className="max-w-[35rem] mx-auto flex items-center justify-between">
        {/* Sol taraf: Mod seçimi */}
        <div className="flex items-center space-x-2">
          <svg 
            className="h-5 w-5 text-gray-700" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 11h10M7 15h10M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
          </svg>
          <select 
            value={mode} 
            onChange={(e) => setMode(e.target.value)}
            className="text-lg font-semibold text-gray-800 bg-transparent outline-none"
          >
            <option value="Daily">Daily</option>
            <option value="Endless">Endless</option>
          </select>
        </div>
        {/* Sağ taraf: Tema toggling */}
        <div className="relative">
          <button onClick={() => setThemeDropdownOpen(!themeDropdownOpen)} className="focus:outline-none">
            {theme === "light" ? (
              <svg className="h-6 w-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 15a5 5 0 100-10 5 5 0 000 10z"/>
                <path fillRule="evenodd" d="M10 1a1 1 0 011 1v2a1 1 0 11-2 0V2a1 1 0 011-1zm4.22 2.22a1 1 0 011.415 1.415l-1.414 1.414a1 1 0 11-1.415-1.415l1.414-1.414zM18 9a1 1 0 110 2h-2a1 1 0 110-2h2zm-2.22 5.78a1 1 0 011.415 0l1.414 1.414a1 1 0 01-1.415 1.415l-1.414-1.414a1 1 0 010-1.415zM10 16a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm-4.22-.22a1 1 0 010 1.415L4.366 18.61a1 1 0 01-1.415-1.415l1.414-1.414a1 1 0 011.415 0zM2 9a1 1 0 100 2h2a1 1 0 100-2H2zm2.22-5.78a1 1 0 011.415 1.415L4.22 6.05a1 1 0 11-1.415-1.415l1.414-1.414z" clipRule="evenodd"/>
              </svg>
            ) : (
              <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 116.707 2.707a8.001 8.001 0 0010.586 10.586z"/>
              </svg>
            )}
          </button>
          {themeDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg">
              {theme === "light" ? (
                <button onClick={toggleTheme} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Dark Mode
                </button>
              ) : (
                <button onClick={toggleTheme} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Light Mode
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

















