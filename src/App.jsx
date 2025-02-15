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
  const [mode, setMode] = useState("Endless"); // "Daily" or "Endless"
  const [theme, setTheme] = useState("light"); // "light" or "dark"

  const errorLimit = DIFFICULTY_SETTINGS[difficulty];

  // Günün tarihini YYYY-MM-DD formatında al
  const today = new Date().toISOString().split('T')[0];

  // JSON verisini yükle
  useEffect(() => {
    fetch("/words.json")
      .then(response => response.json())
      .then(data => setAllWordPool(data))
      .catch(err => console.error("Error loading JSON:", err));
  }, []);

  // Kelime havuzu yüklendiğinde veya mod/difficulty değiştiğinde yeni oyunu başlat
  useEffect(() => {
    if (allWordPool) {
      startNewGame();
    }
  }, [allWordPool, difficulty, mode]);

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

  // Bulmaca üretim fonksiyonu (her iki mod için aynı, ancak Daily modda localStorage kullanıyoruz)
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

  // Daily modu için localStorage'dan bugünkü bulmacayı yükle, yoksa üret ve sakla
  const getDailyPuzzle = () => {
    const storageKey = `dailyPuzzle_${today}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error("Error parsing daily puzzle from localStorage", error);
      }
    }
    const puzzle = generateGameWords();
    localStorage.setItem(storageKey, JSON.stringify(puzzle));
    return puzzle;
  };

  const startNewGame = () => {
    if (mode === "Daily") {
      // Daily modunda bugünkü bulmaca kullanılır
      const dailyPuzzle = getDailyPuzzle();
      setWords(dailyPuzzle);
    } else {
      setWords(generateGameWords());
    }
    setSelectedWordIds([]);
    setErrorCount(0);
    setGameStatus("playing");
    setTime(0);
  };

  // Tıklama toggle'ı: Eğer zaten seçiliyse, seçimi geri al; değilse ekle.
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
    if (gameStatus === "won" && mode === "Endless") {
      const timer = setTimeout(() => startNewGame(), 2000);
      return () => clearTimeout(timer);
    }
  }, [gameStatus, mode]);

  // Tema durumuna göre container sınıfı
  const containerClass = theme === "dark" 
    ? "bg-gray-900 text-white" 
    : "bg-[#F7F7F7] text-gray-800";

  return (
    <div className={`${containerClass} min-h-screen font-sans animate-fadeIn`}>
      <Header mode={mode} setMode={setMode} theme={theme} setTheme={setTheme} />
      <div className="px-4 py-4">
        <div className="w-full max-w-[35rem] mx-auto">
          {/* Üst çizgi */}
          <div className="h-px bg-gray-300 mb-2"></div>
          {/* Zaman sayacı */}
          <div className="flex justify-end mb-2">
            <span className="text-sm font-bold">{formatTime(time)}</span>
          </div>
          {/* Kelime grid */}
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {words.map(word => (
              <WordButton
                key={word.id}
                word={word}
                onClick={() => handleWordClick(word)}
                isSelected={selectedWordIds.includes(word.id)}
                theme={theme}
              />
            ))}
          </div>
          {/* Alt bilgi: Daily modunda, eğer bulmaca çözüldüyse pop-up mesajı göster; aksi halde */}
          <div className="mt-4 text-center">
            {mode === "Daily" ? (
              gameStatus === "won" ? (
                <div className="text-green-600 text-lg font-semibold">
                  You had solved it successfully!
                </div>
              ) : (
                <div className="text-lg font-semibold">
                  Mistakes remaining: {errorLimit - errorCount}
                </div>
              )
            ) : (
              <>
                <div className="text-lg font-semibold">
                  Mistakes remaining: {errorLimit - errorCount}
                </div>
                <div className="mt-6">
                  <DifficultySelector currentDifficulty={difficulty} onDifficultyChange={setDifficulty} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;


