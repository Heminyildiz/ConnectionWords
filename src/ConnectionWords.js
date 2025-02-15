import React, { useState } from "react";

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
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>ConnectionWords</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
        {words.map((word) => (
          <button
            key={word}
            onClick={() => handleSelect(word)}
            style={{
              padding: "10px", 
              border: "1px solid black", 
              backgroundColor: selectedWords.includes(word) ? "lightblue" : "white"
            }}
          >
            {word}
          </button>
        ))}
      </div>
      <button onClick={checkGroup} disabled={selectedWords.length !== 4} style={{ marginTop: "10px", padding: "10px", backgroundColor: "blue", color: "white" }}>
        Kontrol Et
      </button>
      <p>Hata Sayısı: {mistakes}/4</p>
    </div>
  );
}

