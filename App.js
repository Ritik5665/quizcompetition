/* made by ritik raj from bca 5b */
// src/App.js
import React, { useState, useEffect } from 'react';
import './Quiz.css';
import { questions } from './data';

function App() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(30);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));

  useEffect(() => {
    if (submitted) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentQ, submitted]);

  const handleAnswer = (answer) => {
    if (userAnswers[currentQ] !== null) return;

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQ] = answer;
    setUserAnswers(updatedAnswers);

    if (answer === questions[currentQ].correct) {
      setScore((prev) => prev + 1);
    }

    setSelectedAns(answer);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setSelectedAns(null);
      setTimer(30);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ((prev) => prev - 1);
      setSelectedAns(null);
      setTimer(30);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="quiz-container">
      <h1>React Quiz App</h1>

      {submitted ? (
        <div className="score-section">
          <h2>Your Score: {score} / {questions.length}</h2>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQ + 1}</span> / {questions.length}
            </div>
            <div className="timer">Time Left: {timer}s</div>
            <div className="question-text">{questions[currentQ].question}</div>
          </div>

          <div className="answer-section">
            {questions[currentQ].options.map((option, idx) => {
              const isCorrect = option === questions[currentQ].correct;
              const userSelected = userAnswers[currentQ];
              let className = 'option';

              if (userSelected) {
                if (option === userSelected && isCorrect) className += ' correct';
                else if (option === userSelected && !isCorrect) className += ' incorrect';
                else if (option === questions[currentQ].correct) className += ' correct';
              }

              return (
                <button
                  key={idx}
                  className={className}
                  onClick={() => handleAnswer(option)}
                  disabled={userSelected !== null}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="controls">
            <button onClick={handlePrev} disabled={currentQ === 0}>
              Previous
            </button>
            <button onClick={handleNext} disabled={currentQ === questions.length - 1}>
              Next
            </button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
