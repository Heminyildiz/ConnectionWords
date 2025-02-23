import React from 'react';

const Header = ({ mode, setMode, theme, setTheme }) => {
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
        {/* Sağ tarafta: Sadece Tema toggling */}
        <div className="relative">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="focus:outline-none"
          >
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
        </div>
      </div>
    </header>
  );
};

export default Header;





































