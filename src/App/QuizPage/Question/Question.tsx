import React, { FormEvent, useState } from "react";
import "./Question.css";
import { WordResult } from "../QuizPage";

export function Question(props: QuestionProps) {
  const [value, setValue] = useState("");
  const markIcon = typeof props.result === "undefined"
    ? ""
    : props.result === -1
      ? "tick"
      : "cross";

  const placeholder = new Array(props.question.word.length).fill("_").join(" ");

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    props.onUpdate(props.number, e.currentTarget.value);
  }

  const onClickPlay = () => {
    // play props.word + ". " props.sentence
  };

  return (
    <div className="input-group input-group-lg my-3">
      <span className="number-text text-muted">{ props.number + 1 })</span>
      <div className="input-group-prepend">
        <span className="input-group-text btn" onClick={onClickPlay}>&#9654;</span>
      </div>
      <input type="text" className="form-control" placeholder={placeholder} value={value} onChange={onChange}/>
      <span>{ markIcon }</span>
    </div>
  );
}

export interface QuestionProps {
  number: number,
  question: QuizQuestion,
  result?: WordResult
  onUpdate: (number: number, answer: string) => any
}

export interface QuizQuestion {
  word: string,
  sentence?: string
}