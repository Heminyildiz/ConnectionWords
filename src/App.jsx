import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WordButton from './components/WordButton';
import DifficultySelector from './components/DifficultySelector';

// Kelime havuzu: Her anahtar bir grup ve değerleri o gruba ait kelimeler
const WORD_POOL = {
  1: ["apple", "banana", "cherry", "date", "fig", "grape", "melon"],
  2: ["car", "bus", "train", "plane", "bike", "ship", "scooter"],
  3: ["red", "blue", "green", "yellow", "purple", "orange", "pink"],
  4: ["cat", "dog", "mouse", "rabbit", "hamster", "parrot", "turtle"],
  5: ["spring", "summer", "autumn", "winter", "monsoon", "rainy", "dry"],
  6: ["piano", "guitar", "violin", "drum", "flute", "saxophone", "trumpet"]
};

// Zorluk ayarları: hata limiti
const DIFFICULTY_SETTINGS = {
  Kolay: 6,
  Orta: 4,
  Zor: 2,
};

function shuffleArray(array) {
  // Fisher-Yates karıştırma algoritması
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateGameWords() {
  // Mevcut gruplardan rastgele 4 tanesini seç
  const groupKeys = Object.keys(WORD_POOL);
  const selectedGroupKeys = shuffleArray([...groupKeys]).slice(0, 4);

  let words = [];
  let idCounter = 1;
  selectedGroupKeys.forEach((groupKey) => {
    // Seçilen gruptan rastgele 4 kelime seç
    const wordsForGroup = shuffleArray([...WORD_POOL[groupKey]]).slice(0, 4);
    wordsForGroup.forEach((word) => {
      words.push({
        id: idCounter++,
        text: word,
        group: groupKey,  // grubu sakla
        solved: false,
      });
    });
  });

  // Oluşan 16 kelimeyi karıştır
  return shuffleArray(words);
}

const App = () => {
  const [words, setWords] = useState([]);
  const [selectedWordIds, setSelectedWordIds] = useState([]);
  const [errorCount, setErrorCount] = useState(0);
  const [difficulty, setDifficulty] = useState("Orta");
  const [gameStatus, setGameStatus] = useState("playing"); // "playing", "won", "lost"

  const errorLimit = DIFFICULTY_SETTINGS[difficulty];

  useEffect(() => {
    startNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

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

    // 4 kelime seçildiyse, grubun doğruluğunu kontrol et
    if (newSelected.length === 4) {
      const selectedWords = words.filter(w => newSelected.includes(w.id));
      const groupId = selectedWords[0].group;
      const allSameGroup = selectedWords.every(w => w.group === groupId);

      if (allSameGroup) {
        // Doğru grup: seçilen kelimeleri kilitle
        const updatedWords = words.map(w => 
          newSelected.includes(w.id) ? { ...w, solved: true } : w
        );
        setWords(updatedWords);
        setSelectedWordIds([]);
        // Başarı animasyonu/sesi eklenebilir
      } else {
        // Yanlış seçim: hata sayısını artır
        setErrorCount(prev => prev + 1);
        // Hata animasyonu gösterilebilir
        setTimeout(() => {
          setSelectedWordIds([]);
        }, 500);
      }
    }
  };

  useEffect(() => {
    // Oyun bitiş durumlarını kontrol et
    if (errorCount >= errorLimit) {
      setGameStatus("lost");
    } else if (words.length > 0 && words.every(w => w.solved)) {
      setGameStatus("won");
    }
  }, [errorCount, words, errorLimit]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 font-sans animate-fadeIn">
      <Header 
        errorCount={errorCount} 
        errorLimit={errorLimit} 
        gameStatus={gameStatus} 
        onNewGame={startNewGame}
        difficulty={difficulty}
      />
      <div className="p-4 flex flex-col items-center">
        {gameStatus === "lost" && (
          <div className="mb-4 text-red-600 text-2xl font-bold">Oyun Bitti! Hata limitini aştınız.</div>
        )}
        {gameStatus === "won" && (
          <div className="mb-4 text-green-600 text-2xl font-bold">Tebrikler! Oyunu kazandınız!</div>
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

