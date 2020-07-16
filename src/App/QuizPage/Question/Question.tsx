import React, { FormEvent, useState } from "react";
import "./Question.css";
import { WordResult } from "../QuizPage";

export function Question(props: QuestionProps) {
  const [value, setValue] = useState("");
  const [soundPlaying, setSoundPlaying] = useState(false);
  const buttonChar = soundPlaying ? "■" : "▶";
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
    setSoundPlaying(!soundPlaying);

    // sound is playing, ignore the !
    if (!soundPlaying) {
      setTimeout(() => setSoundPlaying(false), 500);
      // play props.word + ". " props.sentence
    }
    else {
      // stop playback
    }
  };

  return (
    <div className="input-group input-group-lg my-3">
      <span className="number-text text-muted">{ props.number + 1 })</span>
      <div className="input-group-prepend">
        <span className="input-group-text btn sound-playing" onClick={onClickPlay}>{buttonChar}</span>
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