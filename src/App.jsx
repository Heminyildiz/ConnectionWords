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
  Kolay: 6,
  Orta: 4,
  Zor: 2,
};

const App = () => {
  const [wordPool, setWordPool] = useState([]);
  const [words, setWords] = useState([]);
  const [selectedWordIds, setSelectedWordIds] = useState([]);
  const [errorCount, setErrorCount] = useState(0);
  const [difficulty, setDifficulty] = useState("Orta");
  const [gameStatus, setGameStatus] = useState("playing"); // "playing", "won", "lost"

  const errorLimit = DIFFICULTY_SETTINGS[difficulty];

  // JSON dosyasını yükle
  useEffect(() => {
    fetch("/words.json")
      .then(response => response.json())
      .then(data => {
        setWordPool(data.wordGroups);
      })
      .catch(err => console.error("JSON yüklenirken hata:", err));
  }, []);

  // Kelime havuzu yüklendikten veya zorluk değiştiğinde yeni oyunu başlat
  useEffect(() => {
    if (wordPool.length) {
      startNewGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordPool, difficulty]);

  function generateGameWords() {
    const groupKeys = wordPool.map(group => group.groupId);
    const selectedGroupKeys = shuffleArray([...groupKeys]).slice(0, 4);
    let generatedWords = [];
    let idCounter = 1;
    selectedGroupKeys.forEach((groupId) => {
      const group = wordPool.find(g => g.groupId === groupId);
      const wordsForGroup = shuffleArray([...group.words]).slice(0, 4);
      wordsForGroup.forEach((word) => {
        generatedWords.push({
          id: idCounter++,
          text: word,
          group: groupId,
          solved: false,
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
  };

  const handleWordClick = (word) => {
    if (gameStatus !== "playing") return;
    if (word.solved || selectedWordIds.includes(word.id)) return;

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
        setTimeout(() => {
          setSelectedWordIds([]);
        }, 500);
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
      const timer = setTimeout(() => {
        startNewGame();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [gameStatus]);

  if (!wordPool.length) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <p>Kelime havuzu yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 font-sans animate-fadeIn">
      <Header
        errorCount={errorCount}
        errorLimit={errorLimit}
        gameStatus={gameStatus}
        difficulty={difficulty}
      />
      <div className="p-4 flex flex-col items-center">
        {gameStatus === "lost" && (
          <div className="mb-4 text-red-600 text-2xl font-bold">
            Oyun Bitti! Hata limitini aştınız.
          </div>
        )}
        {gameStatus === "won" && (
          <div className="mb-4 text-green-600 text-2xl font-bold">
            Tebrikler! Yeni kelimeler hazırlanıyor...
          </div>
        )}
        <div className="grid grid-cols-4 gap-4">
          {words.map(word => (
            <WordButton
              key={word.id}
              word={word}
              onClick={() => handleWordClick(word)}
              isSelected={selectedWordIds.includes(word.id)}
            />
          ))}
        </div>
        <div className="mt-6">
          <DifficultySelector
            currentDifficulty={difficulty}
            onDifficultyChange={setDifficulty}
          />
        </div>
      </div>
    </div>
  );
};

export default App;



