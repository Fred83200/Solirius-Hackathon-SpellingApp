import React, { useState } from "react";
import { Word } from "./Word/Word";

export function QuizPage(props: QuizPageProps) {
  const [quiz] = useState(props.quiz || generateRandomQuiz());
  const [results, setResults] = useState([] as boolean[]);

  return (
    <section className="container text-center">
      { quiz.words.map((w, i) => <Word key={i} word={w} number={i + 1} result={results[i]}/>) }
      <button className="btn btn-primary m-3">Mark</button>
    </section>
  )
}

function generateRandomQuiz(): Quiz {
  return {
    words: ["fish", "goat", "chicken", "pizza", "banana", "apple"]
  };
}

export interface QuizPageProps {
  quiz?: Quiz
}

export interface Quiz {
  words: string[]
}
