import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WordButton from './components/WordButton';
import DifficultySelector from './components/DifficultySelector';

// Basit klasik shuffle fonksiyonu
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Seeded random üretimi için basit fonksiyon (deterministik)
function seededRandom(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return function() {
    hash = (hash * 9301 + 49297) % 233280;
    return hash / 233280;
  };
}

// Seeded shuffle: Belirli bir seed kullanarak diziyi karıştırır
function seededShuffle(array, seed) {
  const random = seededRandom(seed);
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
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
  const [showPrevModal, setShowPrevModal] = useState(false);
  const [prevSolution, setPrevSolution] = useState(null);

  const errorLimit = DIFFICULTY_SETTINGS[difficulty];

  // Günün tarihini YYYY-MM-DD formatında al (Daily mod için)
  const today = new Date().toISOString().split('T')[0];

  // Dünkü tarihi hesaplamak için:
  const getYesterdayDate = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  };

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

  // Bulmaca üretim fonksiyonu
  function generateGameWords() {
    const pool = allWordPool[difficultyMap[difficulty]];
    const groupKeys = pool.map(group => group.groupId);
    let selectedGroupKeys;
    if (mode === "Daily") {
      selectedGroupKeys = seededShuffle([...groupKeys], today).slice(0, 4);
    } else {
      selectedGroupKeys = shuffleArray([...groupKeys]).slice(0, 4);
    }
    let generatedWords = [];
    let idCounter = 1;
    selectedGroupKeys.forEach((groupId) => {
      const group = pool.find(g => g.groupId === groupId);
      let wordsForGroup;
      if (mode === "Daily") {
        wordsForGroup = seededShuffle([...group.words], today + groupId).slice(0, 4);
      } else {
        wordsForGroup = shuffleArray([...group.words]).slice(0, 4);
      }
      wordsForGroup.forEach((word) => {
        generatedWords.push({
          id: idCounter++,
          text: word,
          group: groupId,
          solved: false
        });
      });
    });
    return mode === "Daily" ? seededShuffle(generatedWords, today) : shuffleArray(generatedWords);
  }

  // Daily modunda, bugünkü bulmacayı localStorage'dan yükle veya üret
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

  // Oyun çözüldüğünde Daily moddaysa, çözümü localStorage'a kaydet
  useEffect(() => {
    if (mode === "Daily" && gameStatus === "won") {
      localStorage.setItem(`dailySolution_${today}`, JSON.stringify(words));
    }
  }, [gameStatus, mode, today, words]);

  // Previous Day's Answers için
  const openPreviousSolution = () => {
    const yesterday = getYesterdayDate();
    const storageKey = `dailySolution_${yesterday}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setPrevSolution(JSON.parse(stored));
      } catch (error) {
        console.error("Error parsing previous solution", error);
        setPrevSolution(null);
      }
    } else {
      setPrevSolution(null);
    }
    setShowPrevModal(true);
  };

  const closePrevModal = () => {
    setShowPrevModal(false);
  };

  // Kelime butonuna tıklama toggle'ı
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
          {/* Alt bilgi */}
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
          {/* Previous Day's Answers Button */}
          {mode === "Daily" && (
            <div className="mt-6 text-center">
              <button
                onClick={openPreviousSolution}
                className="py-2 px-4 rounded-md bg-blue-500 text-white font-bold transition-all duration-200 hover:scale-105"
              >
                Previous Day's Answers
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Footer: Privacy Policy, Email Contact, and Disclaimer */}
      <footer className="mt-8 text-center text-xs font-normal">
        <div>
          <a href="/privacy.html" className="text-blue-500 underline mr-4">
            Privacy Policy
          </a>
          <a href="mailto:info@quickwordgames.com" className="text-blue-500 underline">
            Email Contact
          </a>
        </div>
        <div className="mt-2 text-gray-500">
          Disclaimer: Words is an independent product and is not affiliated with, nor has it been authorized, sponsored, or otherwise approved by The New York Times Company. We encourage you to play the daily NYT Connections game on New York Times website.
        </div>
      </footer>
      {/* Pop-up: Hata limitleri dolduğunda ekranın ortasında çekici "New Game" butonu */}
      {gameStatus === "lost" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Game Over</h2>
            <button 
              onClick={startNewGame} 
              className="py-3 px-8 rounded-md bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold transform hover:scale-105 transition-all duration-300"
            >
              New Game
            </button>
          </div>
        </div>
      )}
      {/* Previous Day's Answers Modal */}
      {showPrevModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center max-w-[90%]">
            <h2 className="text-2xl font-bold mb-4">Previous Day's Answers ({getYesterdayDate()})</h2>
            {prevSolution ? (
              <div className="grid grid-cols-4 gap-2 md:gap-4">
                {prevSolution.map(word => (
                  <div key={word.id} className="w-full aspect-square flex items-center justify-center rounded-lg bg-gray-200 text-xs md:text-base font-bold uppercase overflow-hidden truncate">
                    {word.text}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-700">No solution available for yesterday.</div>
            )}
            <button onClick={closePrevModal} className="mt-4 py-2 px-4 rounded-md bg-blue-500 text-white font-bold">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;








