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
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6">
      <h1 className="text-5xl font-extrabold mb-8 drop-shadow-lg">ConnectionWords</h1>
      <div className="grid grid-cols-4 gap-4 bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl">
        {words.map((word) => (
          <button
            key={word}
            onClick={() => handleSelect(word)}
            className={`p-5 text-xl font-semibold border rounded-xl transition-all duration-200 text-center shadow-md 
              ${selectedWords.includes(word) ? "bg-blue-500 text-white scale-105" : "bg-gray-100 text-black hover:bg-gray-200"} 
              ${lockedGroups.flat().includes(word) ? "bg-green-500 text-white" : ""}`}
          >
            {word}
          </button>
        ))}
      </div>
      <button 
        onClick={checkGroup} 
        disabled={selectedWords.length !== 4} 
        className="mt-8 px-8 py-4 bg-green-600 text-white text-lg font-bold rounded-lg shadow-lg disabled:opacity-50 transition-all hover:bg-green-700"
      >
        Kontrol Et
      </button>
      <p className="mt-6 text-xl">Hata Sayısı: <span className="font-bold">{mistakes}/4</span></p>
    </div>
  );
}



