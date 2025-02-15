import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const words = [
  "Apple", "Banana", "Cherry", "Grape",
  "Dog", "Cat", "Horse", "Elephant",
  "Red", "Blue", "Green", "Yellow",
  "Piano", "Guitar", "Drums", "Violin"
];

const correctGroups = [
  ["Apple", "Banana", "Cherry", "Grape"],
  ["Dog", "Cat", "Horse", "Elephant"],
  ["Red", "Blue", "Green", "Yellow"],
  ["Piano", "Guitar", "Drums", "Violin"]
];

export default function ConnectionWords() {
  const [selectedWords, setSelectedWords] = useState([]);
  const [lockedGroups, setLockedGroups] = useState([]);
  const [mistakes, setMistakes] = useState(0);

  const handleSelect = (word) => {
    if (selectedWords.includes(word) || lockedGroups.flat().includes(word)) return;
    setSelectedWords([...selectedWords, word]);
  };

  const checkGroup = () => {
    if (selectedWords.length !== 4) return;

    const isCorrect = correctGroups.some(group =>
      group.every(word => selectedWords.includes(word))
    );

    if (isCorrect) {
      setLockedGroups([...lockedGroups, selectedWords]);
    } else {
      setMistakes(mistakes + 1);
    }
    setSelectedWords([]);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">ConnectionWords</h1>
      <div className="grid grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow-lg">
        {words.map((word) => (
          <button
            key={word}
            onClick={() => handleSelect(word)}
            className={`p-4 text-lg font-semibold border rounded-lg transition-all duration-200 ${selectedWords.includes(word) ? "bg-blue-500 text-white" : "bg-gray-100 text-black hover:bg-gray-200"} ${lockedGroups.flat().includes(word) ? "bg-green-500 text-white" : ""}`}
          >
            {word}
          </button>
        ))}
      </div>
      <button 
        onClick={checkGroup} 
        disabled={selectedWords.length !== 4} 
        className="mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md disabled:opacity-50 transition-all hover:bg-green-600"
      >
        Kontrol Et
      </button>
      <p className="mt-4 text-lg">Hata Sayısı: {mistakes}/4</p>
    </div>
  );
}


