import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WordButton from './components/WordButton';
import DifficultySelector from './components/DifficultySelector';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const DIFFICULTY_SETTINGS = {
  Easy: 6,
  Medium: 4,
  Hard: 2,
};

const difficultyMap = {
  Easy: "easy",
  Medium: "medium",
  Hard: "hard"
};

const App = () => {
  const [allWordPool, setAllWordPool] = useState(null);
  const [words, setWords] = useState([]);
  const [selectedWordIds, setSelectedWordIds] = useState([]);
  const [errorCount, setErrorCount] = useState(0);
  const [difficulty, setDifficulty] = useState("Medium");
  const [gameStatus, setGameStatus] = useState("playing"); // "playing", "won", "lost"
  const [time, setTime] = useState(0);

  const errorLimit = DIFFICULTY_SETTINGS[difficulty];

  // JSON verisini yükle
  useEffect(() => {
    fetch("/words.json")
      .then(response => response.json())
      .then(data => setAllWordPool(data))
      .catch(err => console.error("Error loading JSON:", err));
  }, []);

  // Kelime havuzu yüklendiğinde veya zorluk değiştiğinde yeni oyunu başlat
  useEffect(() => {
    if (allWordPool) startNewGame();
  }, [allWordPool, difficulty]);

  // Oyun oynanırken zaman sayacı (mm:ss formatında)
  useEffect(() => {
    if (gameStatus === "playing") {
      const interval = setInterval(() => setTime(prev => prev + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [gameStatus]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `Time: ${minutes}:${seconds}`;
  };

  function generateGameWords() {
    const pool = allWordPool[difficultyMap[difficulty]];
    const groupKeys = pool.map(group => group.groupId);
    const selectedGroupKeys = shuffleArray([...groupKeys]).slice(0, 4);
    let generatedWords = [];
    let idCounter = 1;
    selectedGroupKeys.forEach((groupId) => {
      const group = pool.find(g => g.groupId === groupId);
      const wordsForGroup = shuffleArray([...group.words]).slice(0, 4);
      wordsForGroup.forEach((word) => {
        generatedWords.push({
          id: idCounter++,
          text: word,
          group: groupId,
          solved: false
        });
      });
    });
    return shuffleArray(generatedWords);
  }

  const startNewGame = () => {
    setWords(generateGameWords());
    setSelectedWordIds([]);
    setErrorCount(0);
    setGameStatus("playing");
    setTime(0);
  };

  // Tıklama toggle'ı: Eğer zaten seçiliyse geri al; değilse ekle.
  const handleWordClick = (word) => {
    if (gameStatus !== "playing" || word.solved) return;
    if (selectedWordIds.includes(word.id)) {
      setSelectedWordIds(selectedWordIds.filter(id => id !== word.id));
      return;
    }
    const newSelected = [...selectedWordIds, word.id];
    setSelectedWordIds(newSelected);
    if (newSelected.length === 4) {
      const selectedWords = words.filter(w => newSelected.includes(w.id));
      const groupId = selectedWords[0].group;
      const allSameGroup = selectedWords.every(w => w.group === groupId);
      if (allSameGroup) {
        const updatedWords = words.map(w =>
          newSelected.includes(w.id) ? { ...w, solved: true } : w
        );
        setWords(updatedWords);
        setSelectedWordIds([]);
      } else {
        setErrorCount(prev => prev + 1);
        setTimeout(() => setSelectedWordIds([]), 500);
      }
    }
  };

  useEffect(() => {
    if (errorCount >= errorLimit) {
      setGameStatus("lost");
    } else if (words.length > 0 && words.every(w => w.solved)) {
      setGameStatus("won");
    }
  }, [errorCount, words, errorLimit]);

  useEffect(() => {
    if (gameStatus === "won") {
      const timer = setTimeout(() => startNewGame(), 2000);
      return () => clearTimeout(timer);
    }
  }, [gameStatus]);

  if (!allWordPool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading word pool...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] font-sans animate-fadeIn">
      <Header errorCount={errorCount} errorLimit={errorLimit} gameStatus={gameStatus} />
      <div className="px-4 py-4">
        <div className="w-full max-w-[35rem] mx-auto">
          {/* Üst çizgi */}
          <div className="h-px bg-gray-300 mb-2"></div>
          {/* Zaman sayacı */}
          <div className="flex justify-end mb-2">
            <span className="text-gray-700 text-sm font-bold">{formatTime(time)}</span>
          </div>
          {/* Kelime grid: 4 sütun, eşit boşluk */}
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {words.map(word => (
              <WordButton
                key={word.id}
                word={word}
                onClick={() => handleWordClick(word)}
                isSelected={selectedWordIds.includes(word.id)}
              />
            ))}
          </div>
          {/* Hata bilgisi / New Game butonu */}
          <div className="mt-4 text-center">
            {gameStatus === "lost" ? (
              <button onClick={startNewGame} className="py-2 px-4 rounded-md bg-blue-500 text-white font-bold">
                New Game
              </button>
            ) : (
              <div className="text-gray-700 text-lg font-semibold">
                Mistakes remaining: {errorLimit - errorCount}
              </div>
            )}
          </div>
          {/* Difficulty Selector */}
          <div className="mt-6">
            <DifficultySelector currentDifficulty={difficulty} onDifficultyChange={setDifficulty} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

















