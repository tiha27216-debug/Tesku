'use client';

import { useState } from 'react';

const quizzes = {
  javascript: [
    {
      question: 'What is the output of typeof null?',
      options: ['null', 'object', 'undefined', 'error'],
      correct: 1,
    },
    {
      question: 'Which method adds elements to the end of an array?',
      options: ['push()', 'pop()', 'shift()', 'unshift()'],
      correct: 0,
    },
  ],
  html: [
    {
      question: 'What does HTML stand for?',
      options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
      correct: 0,
    },
  ],
  css: [
    {
      question: 'What does CSS stand for?',
      options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
      correct: 1,
    },
  ],
};

type QuizTopic = keyof typeof quizzes;

export function Quiz() {
  const [topic, setTopic] = useState<QuizTopic>('javascript');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const questions = quizzes[topic];
  const question = questions[currentQuestion];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === question.correct) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCurrentQuestion(0);
      setScore(0);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleReset = () => {
    setTopic('javascript');
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="space-y-4">
      <select
        value={topic}
        onChange={(e) => {
          setTopic(e.target.value as QuizTopic);
          handleReset();
        }}
        className="w-full bg-tertiary text-primary p-2 rounded text-sm border border-primary"
      >
        {Object.keys(quizzes).map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>

      <div className="bg-tertiary p-4 rounded">
        <p className="text-xs text-secondary mb-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
        <p className="font-semibold text-primary">{question.question}</p>
      </div>

      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showResult && handleAnswer(index)}
            disabled={showResult}
            className={`w-full p-3 rounded text-sm text-left transition-all ${
              selectedAnswer === index
                ? index === question.correct
                  ? 'bg-green-500/20 border-green-500'
                  : 'bg-red-500/20 border-red-500'
                : 'bg-tertiary border border-primary hover:border-accent'
            } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {option}
          </button>
        ))}
      </div>

      {showResult && (
        <div className="text-center">
          <p className="text-sm text-secondary mb-2">
            Score: {score} / {questions.length}
          </p>
          <button
            onClick={handleNext}
            className="w-full bg-accent text-white p-2 rounded text-sm font-medium hover:bg-accent-light transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish'}
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
