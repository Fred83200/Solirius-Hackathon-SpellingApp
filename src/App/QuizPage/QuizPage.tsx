import React, { useState } from "react";
import { Question, QuizQuestion } from "./Question/Question";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export function QuizPage() {
  const location = useLocation<{ quiz: Quiz }>();
  const locationQuiz = location.state && location.state.quiz;
  const [quiz] = useState(locationQuiz || generateRandomQuiz());
  const [results, setResults] = useState([] as WordResult[]);
  const [answers, setAnswers] = useState(new Array(quiz.questions.length) as string[]);

  const onClickMark = () => {
    setResults(markQuiz(quiz, answers));
  };

  const onUpdateAnswer = (i: number, answer: string) => {
    answers[i] = answer;
    setAnswers(answers);
  }

  return (
    <section className="container">
      <p className="my-3">Enter your answers below. Press the &#9654; button to hear the word.</p>
      { quiz.questions.map((q, i) => <Question key={i} question={q} number={i} result={results[i]} onUpdate={onUpdateAnswer}/>) }

      <div className="container text-center">
        <Link className="btn btn-secondary btn-lg my-3" to="/">Home</Link>
        <button className="btn btn-primary btn-lg my-3 ml-3" onClick={onClickMark}>Mark Answers</button>
      </div>
    </section>
  );
}

function generateRandomQuiz(): Quiz {
  return {
    questions: [
      { word: "fish", sentence: "I like to fish by the sea" },
      { word: "goat", sentence: "The hairy goat ran away" },
      { word: "chicken", sentence: "The chicken went beeerk" },
      { word: "pizza", sentence: "I put a pizza in the oven" },
      { word: "banana", sentence: "I slipped on the banana skin" },
      { word: "apple", sentence: "I shot an apple off my sisters head" }
    ]
  };
}

function markQuiz(quiz: Quiz, answers: string[]): number[] {
  return answers.map((answer, i) => checkAnswer(quiz.questions[i].word, answer));
}

function checkAnswer(word: string, answer: string): number {
  return answer
    .toLowerCase()
    .split("")
    .findIndex((char, i) => char !== word.charAt(i).toLowerCase());
}

export interface Quiz {
  questions: QuizQuestion[]
}

/**
 * Index of failure, or -1 if spelling is correct
 */
export type WordResult = number;