import React, { useState } from "react";
import { Question, QuizQuestion } from "./Question/Question";

export function QuizPage(props: QuizPageProps) {
  const [quiz] = useState(props.quiz || generateRandomQuiz());
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
        <button className="btn btn-primary btn-lg m-3" onClick={onClickMark}>Mark</button>
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

export interface QuizPageProps {
  quiz?: Quiz
}

export interface Quiz {
  questions: QuizQuestion[]
}

/**
 * Index of failure, or -1 if spelling is correct
 */
export type WordResult = number;