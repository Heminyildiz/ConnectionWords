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
        {/* Sol tarafta: Mod seçimi */}
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
        {/* Ortadaki başlık kaldırıldı */}
        <div></div>
        {/* Sağ tarafta: Tema toggling */}
        <div className="relative">
          <button onClick={() => setThemeDropdownOpen(!themeDropdownOpen)} className="focus:outline-none">
            {theme === 'light' ? (
              // Açık moda güneş ikonu (Heroicons sun)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414M16.95 16.95l1.414 1.414M7.05 7.05L5.636 5.636M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              // Koyu mod için ay ikonu
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
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





























