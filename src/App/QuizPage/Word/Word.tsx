import React from "react";
import "./Word.css";

export function Word(props: WordProps) {
  const markIcon = typeof props.result === "undefined"
    ? ""
    : props.result
      ? "tick"
      : "cross";

  const placeholder = new Array(props.word.length).fill("_").join(" ");

  return (
    <div className="input-group input-group-lg my-3">
      <span className="number-text text-muted">{ props.number })</span>
      <div className="input-group-prepend">
        <span className="input-group-text">&#9654;</span>
      </div>
      <input type="text" className="form-control" placeholder={placeholder}/>
      <span>{ markIcon }</span>
    </div>
  );
}

interface WordProps {
  number: number,
  word: string,
  result?: boolean
}
