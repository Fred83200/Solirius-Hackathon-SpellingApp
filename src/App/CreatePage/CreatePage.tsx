import React, { useState } from "react";
import { QuizQuestion } from "../QuizPage/Question/Question";
import { Link } from "react-router-dom";
import { CreateQuestion } from "./CreateQuestion/CreateQuestion";

export function CreatePage() {
  const [questions, setQuestions] = useState(new Array(5).fill({ word: "" }));

  const onUpdateAnswer = (i: number, question: QuizQuestion) => {
    questions[i] = question;
    setQuestions([...questions]);
  };

  const onAddAnother = () => {
    setQuestions([...questions, { word: "" }]);
  };

  const quiz = {
    questions: questions.filter(q => q.word !== "")
  };

  return (
    <section className="container">
      <p className="my-3">Enter words below for the quiz below. You can also add an example of the word in use.</p>
      { questions.map((q, i) => <CreateQuestion key={i} number={i} onUpdate={onUpdateAnswer}/>) }


      <div className="container text-center">
        <button className="btn btn-secondary btn-lg my-3" onClick={onAddAnother}>Add Another Question</button>
        <Link className="btn btn-primary btn-lg my-3 ml-3" to={{ pathname: "/quiz", state: { quiz } }}>Start Quiz</Link>
      </div>
    </section>
  );
}
