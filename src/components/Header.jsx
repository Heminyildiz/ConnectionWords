import React from 'react';

const Header = () => {
  return (
    <header className="py-2 flex items-center justify-center">
      <div className="flex items-center">
        <svg 
          className="h-5 w-5 text-gray-700 mr-1" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 11h10M7 15h10M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
        <h1 className="text-xl font-semibold text-gray-800">Connection Words</h1>
      </div>
    </header>
  );
};

export default Header;















