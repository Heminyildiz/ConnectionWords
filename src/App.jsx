import React, { useState } from 'react';
import Header from './components/Header';
import WordButton from './components/WordButton';

// Örnek kelime verileri
const wordsData = [
  { id: 1, text: "apple", correct: false },
  { id: 2, text: "banana", correct: true },
  { id: 3, text: "cherry", correct: false },
  { id: 4, text: "date", correct: false },
];

function App() {
  const [selectedWordId, setSelectedWordId] = useState(null);
  const [errorCount, setErrorCount] = useState(0);

  const handleWordClick = (word) => {
    if (selectedWordId !== null) return; // Zaten seçim yapılmışsa
    setSelectedWordId(word.id);
    if (!word.correct) {
      setErrorCount(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-100 animate-fadeIn font-sans">
      <Header errorCount={errorCount} />
      <div className="flex justify-center items-center p-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {wordsData.map((word) => (
            <WordButton
              key={word.id}
              word={word.text}
              isCorrect={selectedWordId === word.id ? word.correct : null}
              onClick={() => handleWordClick(word)}
              disabled={selectedWordId !== null}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
