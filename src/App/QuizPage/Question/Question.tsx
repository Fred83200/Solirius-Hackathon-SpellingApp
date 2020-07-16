import React, { useState } from "react";
import "./Question.css";
import { WordResult } from "../QuizPage";

const RICIBs = require("react-individual-character-input-boxes2").default;

export function Question(props: QuestionProps) {
  const [soundPlaying, setSoundPlaying] = useState(false);
  const buttonChar = soundPlaying ? "■" : "▶";
  const markIcon = typeof props.result === "undefined"
    ? ""
    : props.result === -1
      ? "tick"
      : "cross";

  const onChange = (value: string) => {
    props.onUpdate(props.number, value);
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

  const inputProps = new Array(props.question.word.length)
    .fill({ placeholder: "_" })
    .map((o, i) => i === props.result ? { ...o, className: "box-red" } : o);

  return (
    <div className="input-group input-group-lg my-3">
      <span className="number-text text-muted">{ props.number + 1 })</span>
      <div className="input-group-prepend">
        <span className="input-group-text btn sound-playing" onClick={onClickPlay}>{buttonChar}</span>
      </div>

      <RICIBs
        amount={props.question.word.length}
        handleOutputString={onChange}
        inputRegExp={/^[a-zA-Z0-9_.-]*$/ }
        inputProps={ inputProps }
      />
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