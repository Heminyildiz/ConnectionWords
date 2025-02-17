import React, { useState } from 'react';

const Header = ({ mode, setMode, theme, setTheme }) => {
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    setThemeDropdownOpen(false);
  };

  const textColorClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-800';

  return (
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
        {/* Ortada: (başlık kaldırıldı) */}
        {/* Sağ taraf: Tema toggling */}
        <div className="relative">
          <button onClick={() => setThemeDropdownOpen(!themeDropdownOpen)} className="focus:outline-none">
            {theme === 'light' ? (
              // Eski Açık Mod (Light Mode) ikonu
              <svg className="h-6 w-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 15a5 5 0 100-10 5 5 0 000 10z"/>
              </svg>
            ) : (
              <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 116.707 2.707a8.001 8.001 0 0010.586 10.586z"/>
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
    </header>
  );
};

export default Header;




























