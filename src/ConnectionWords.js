import React, { useState } from "react";
<button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={checkGroup} disabled={selectedWords.length !== 4}>
import "tailwindcss/tailwind.css";

const initialWords = [
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
    setSelectedWords((prev) => [...prev, word]);
  };

  const checkGroup = () => {
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
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">ConnectionWords</h1>
      <div className="grid grid-cols-4 gap-2">
        {initialWords.map((word) => (
          <button
            key={word}
            onClick={() => handleSelect(word)}
            className={`p-3 border rounded-lg ${selectedWords.includes(word) ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {word}
          </button>
        ))}
      </div>
      <Button className="mt-4" onClick={checkGroup} disabled={selectedWords.length !== 4}>
        Kontrol Et
      </Button>
      <p className="mt-4">Hata Sayısı: {mistakes}/4</p>
    </div>
  );
}
