import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";

const DEFAULT_QUESTIONS = { 
"grade2": [
{ "id": 1, "question": "What planet do we live on?", "answer": "Earth" },
{ "id": 2, "question": "How many days are in a week?", "answer": "7" },
{ "id": 3, "question": "What is the color of the sky on a clear day?", "answer": "Blue" },
{ "id": 4, "question": "What do bees make?", "answer": "Honey" },
{ "id": 5, "question": "How many months are in a year?", "answer": "12" },
{ "id": 6, "question": "What shape has 3 sides?", "answer": "Triangle" },
{ "id": 7, "question": "What is 5 + 3?", "answer": "8" },
{ "id": 8, "question": "Which animal says 'meow'?", "answer": "Cat" },
{ "id": 9, "question": "What is the opposite of hot?", "answer": "Cold" },
{ "id": 10, "question": "Which star gives us light and heat?", "answer": "Sun" },
{ "id": 11, "question": "What do cows drink?", "answer": "Water" },
{ "id": 12, "question": "What is 10 - 4?", "answer": "6" },
{ "id": 13, "question": "Which animal is known as the 'King of the Jungle'?", "answer": "Lion" },
{ "id": 14, "question": "What is the color of a school bus?", "answer": "Yellow" },
{ "id": 15, "question": "How many legs does a spider have?", "answer": "8" },
{ "id": 16, "question": "What is 2 x 5?", "answer": "10" },
{ "id": 17, "question": "Which fruit is red and often used to make ketchup?", "answer": "Tomato" },
{ "id": 18, "question": "What is 20 divided by 4?", "answer": "5" },
{ "id": 19, "question": "Which bird cannot fly but can run fast?", "answer": "Ostrich" },
{ "id": 20, "question": "What do you use to write on a blackboard?", "answer": "Chalk" },
{ "id": 21, "question": "How many hours are in a day?", "answer": "24" },
{ "id": 22, "question": "What do plants need to grow?", "answer": "Sunlight, water, and air" },
{ "id": 23, "question": "What is the first letter of the alphabet?", "answer": "A" },
{ "id": 24, "question": "Which shape has 4 equal sides?", "answer": "Square" },
{ "id": 25, "question": "What is the opposite of day?", "answer": "Night" }
],
"grade3": [
{ "id": 1, "question": "What gas do humans need to breathe?", "answer": "Oxygen" },
{ "id": 2, "question": "How many continents are there?", "answer": "7" },
{ "id": 3, "question": "What is the largest mammal?", "answer": "Blue Whale" },
{ "id": 4, "question": "What is the capital of the United States?", "answer": "Washington, D.C." },
{ "id": 5, "question": "What is 15 + 12?", "answer": "27" },
{ "id": 6, "question": "What is the process by which plants make their food?", "answer": "Photosynthesis" },
{ "id": 7, "question": "Which planet is known as the Red Planet?", "answer": "Mars" },
{ "id": 8, "question": "What is 36 ÷ 6?", "answer": "6" },
{ "id": 9, "question": "What is the boiling point of water in Celsius?", "answer": "100" },
{ "id": 10, "question": "Which is the fastest land animal?", "answer": "Cheetah" },
{ "id": 11, "question": "Who was the first president of the United States?", "answer": "George Washington" },
{ "id": 12, "question": "What is 9 x 8?", "answer": "72" },
{ "id": 13, "question": "What do you call a baby frog?", "answer": "Tadpole" },
{ "id": 14, "question": "Which ocean is the largest?", "answer": "Pacific Ocean" },
{ "id": 15, "question": "What is 100 - 45?", "answer": "55" },
{ "id": 16, "question": "Which instrument has black and white keys?", "answer": "Piano" },
{ "id": 17, "question": "What is 11 x 11?", "answer": "121" },
{ "id": 18, "question": "What is the smallest planet in our solar system?", "answer": "Mercury" },
{ "id": 19, "question": "What organ pumps blood in the human body?", "answer": "Heart" },
{ "id": 20, "question": "What do you call a group of lions?", "answer": "Pride" },
{ "id": 21, "question": "What is the hardest natural substance?", "answer": "Diamond" },
{ "id": 22, "question": "What is 144 ÷ 12?", "answer": "12" },
{ "id": 23, "question": "Which gas do plants release during photosynthesis?", "answer": "Oxygen" },
{ "id": 24, "question": "Who wrote 'Charlotte's Web'?", "answer": "E.B. White" },
{ "id": 25, "question": "Which planet has rings around it?", "answer": "Saturn" }
]
};

export default function App() {
  const [grade, setGrade] = useState("2");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [allQuestions, setAllQuestions] = useState(DEFAULT_QUESTIONS);

  const [scoreEnabled, setScoreEnabled] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    let active = true;
    async function load() {
      const tryPaths = ["/questions.json", "./questions.json"];
      for (const p of tryPaths) {
        try {
          const res = await fetch(p, { cache: "no-store" });
          if (res.ok) {
            const data = await res.json();
            if (active && data && (data.grade2 || data["2"])) {
              const normalized = {
                grade2: data.grade2 || data["2"],
                grade3: data.grade3 || data["3"],
              };
              setAllQuestions(normalized);
              break;
            }
          }
        } catch (_) {}
      }
    }
    load();
    return () => { active = false; };
  }, []);

  const questions = grade === "2" ? (allQuestions.grade2 || []) : (allQuestions.grade3 || []);
  const currentQuestion = questions.length > 0 ? questions[currentIndex] : null;

  const handleNext = () => {
    if (!questions.length) return;
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  const handleAnswer = (selectedAnswer) => {
    if (!scoreEnabled || !currentQuestion) return;
    const correct = selectedAnswer === currentQuestion.answer;
    if (correct) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
    setFlipped(true);
  };

  // Helper: generate plausible wrong answers for multiple choice
  const getOptions = (correct) => {
    const options = [correct];
    while (options.length < 4) {
      const randomQ = questions[Math.floor(Math.random() * questions.length)].answer;
      if (!options.includes(randomQ)) options.push(randomQ);
    }
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-yellow-200 to-green-200 flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 py-6 px-4 shadow-2xl">
        <h1 className="text-5xl font-black text-white text-center drop-shadow-lg">
          Kids Flashcards! 🌟📚✨
        </h1>
        <p className="text-xl font-bold text-yellow-100 text-center mt-2">
          Learn • Play • Grow 🚀
        </p>
      </div>
      
      {/* Decorative Line */}
      <div className="w-full h-2 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400"></div>
      
      {/* Fixed Score Display in Top Right Corner */}
      {scoreEnabled && (
        <div className="fixed top-36 right-4 z-50 flex flex-row gap-3">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 p-3 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse">
            <div className="text-center">
              <div className="text-2xl font-black text-white mb-1">🏆</div>
              <div className="text-xl font-black text-white">{score}</div>
              <div className="text-xs font-bold text-yellow-100">SCORE</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-3 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 animate-bounce">
            <div className="text-center">
              <div className="text-2xl font-black text-white mb-1">🔥</div>
              <div className="text-xl font-black text-white">{streak}</div>
              <div className="text-xs font-bold text-purple-100">STREAK</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col items-center p-6 pt-8">
        {/* Big Flashy Score Display */}

        {/* Grade Selector & Score Toggle */}
        <div className="mb-4 flex flex-row items-center gap-6 bg-white/80 p-4 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2">
            <label className="text-lg font-bold text-purple-700">Grade:</label>
            <select
              value={grade}
              onChange={(e) => { setGrade(e.target.value); setCurrentIndex(0); setFlipped(false); }}
              className="p-2 rounded-lg border-2 border-purple-400 bg-white text-purple-700 font-semibold shadow-md"
            >
              <option value="2">2nd</option>
              <option value="3">3rd</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold text-purple-700">Scoring:</label>
            <input 
              type="checkbox" 
              checked={scoreEnabled} 
              onChange={(e) => setScoreEnabled(e.target.checked)}
              className="w-5 h-5 accent-purple-600"
            />
          </div>
        </div>

      {/* Flashcard */}
      {currentQuestion && (
        <div className="w-80 h-48 perspective cursor-pointer" onClick={() => setFlipped(!flipped)}>
          <div className={`relative w-full h-full duration-700 transform-style-preserve-3d ${flipped ? "rotate-y-180 animate-wiggle" : "animate-bounce-slow"}`}>
            <div className="absolute w-full h-full backface-hidden bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-2xl flex items-center justify-center p-6 shadow-2xl">
              <p className="text-xl font-bold text-center">{currentQuestion.question}</p>
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-2xl flex items-center justify-center p-6 shadow-2xl">
              <p className="text-xl font-bold text-center">{currentQuestion.answer}</p>
            </div>
          </div>
        </div>
      )}

      {/* Multiple choice options */}
      {scoreEnabled && currentQuestion && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          {getOptions(currentQuestion.answer).map((opt, idx) => (
            <button key={idx} onClick={() => handleAnswer(opt)} className="px-4 py-2 bg-yellow-400 rounded-lg shadow-lg font-semibold hover:scale-105 transition-transform">
              {opt}
            </button>
          ))}
        </div>
      )}


        {/* Next Button */}
        <button onClick={handleNext} className="mt-6 px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform text-lg" disabled={!currentQuestion}>
          Next Card 👉
        </button>
      </div>

      <style>{` .perspective { perspective: 1000px; } .transform-style-preserve-3d { transform-style: preserve-3d; } .backface-hidden { backface-visibility: hidden; } .rotate-y-180 { transform: rotateY(180deg); } @keyframes wiggle { 0%, 100% { transform: rotateY(180deg) rotateZ(0deg); } 25% { transform: rotateY(180deg) rotateZ(3deg); } 75% { transform: rotateY(180deg) rotateZ(-3deg); } } .animate-wiggle { animation: wiggle 0.6s ease-in-out; } @keyframes bounceSlow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } } .animate-bounce-slow { animation: bounceSlow 2s infinite; } `}</style>
    </div>
  );
}

