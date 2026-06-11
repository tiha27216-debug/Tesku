'use client';

import { useState } from 'react';

const puzzles = {
  javascript: [
    {
      question: 'What is the output?',
      code: 'console.log(2 + "2");',
      options: ['4', '"22"', '22', 'error'],
      correct: 2,
      explanation: 'String concatenation occurs when adding a number to a string.',
    },
  ],
  nodejs: [
    {
      question: 'What does require() do?',
      code: 'const express = require("express");',
      options: ['Loads a module', 'Imports a file', 'Executes code', 'All of the above'],
      correct: 3,
      explanation: 'require() loads and executes a module, importing its exports.',
    },
  ],
  linux: [
    {
      question: 'What does this command do?',
      code: 'grep -r "pattern" .',
      options: ['Search files', 'Remove files', 'Copy files', 'List files'],
      correct: 0,
      explanation: 'grep -r recursively searches for "pattern" in the current directory.',
    },
  ],
};

type PuzzleTopic = keyof typeof puzzles;

export function CodePuzzle() {
  const [topic, setTopic] = useState<PuzzleTopic>('javascript');
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const puzzles_list = puzzles[topic];
  const puzzle = puzzles_list[currentPuzzle];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentPuzzle < puzzles_list.length - 1) {
      setCurrentPuzzle(currentPuzzle + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCurrentPuzzle(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setTopic('javascript');
    setCurrentPuzzle(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  return (
    <div className="space-y-4">
      <select
        value={topic}
        onChange={(e) => {
          setTopic(e.target.value as PuzzleTopic);
          handleReset();
        }}
        className="w-full bg-tertiary text-primary p-2 rounded text-sm border border-primary"
      >
        {Object.keys(puzzles).map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>

      <div className="bg-tertiary p-4 rounded">
        <p className="text-xs text-secondary mb-2">
          Puzzle {currentPuzzle + 1} of {puzzles_list.length}
        </p>
        <p className="font-semibold text-primary mb-3">{puzzle.question}</p>
        <div className="bg-black/30 p-3 rounded font-mono text-sm text-accent overflow-x-auto">
          {puzzle.code}
        </div>
      </div>

      <div className="space-y-2">
        {puzzle.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showExplanation && handleAnswer(index)}
            disabled={showExplanation}
            className={`w-full p-3 rounded text-sm text-left transition-all ${
              selectedAnswer === index
                ? index === puzzle.correct
                  ? 'bg-green-500/20 border-green-500'
                  : 'bg-red-500/20 border-red-500'
                : 'bg-tertiary border border-primary hover:border-accent'
            } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {option}
          </button>
        ))}
      </div>

      {showExplanation && (
        <div className="bg-tertiary p-3 rounded text-sm">
          <p className="text-secondary mb-2">
            {selectedAnswer === puzzle.correct ? '✓ Correct!' : '✗ Incorrect'}
          </p>
          <p className="text-secondary">{puzzle.explanation}</p>
          <button
            onClick={handleNext}
            className="w-full bg-accent text-white p-2 rounded text-sm font-medium hover:bg-accent-light transition-colors mt-3"
          >
            {currentPuzzle < puzzles_list.length - 1 ? 'Next Puzzle' : 'Finish'}
          </button>
        </div>
      )}

      <button
        onClick={handleReset}
        className="w-full bg-tertiary text-secondary p-2 rounded text-sm font-medium hover:text-accent transition-colors"
      >
        Reset
      </button>
    </div>
  );
}
