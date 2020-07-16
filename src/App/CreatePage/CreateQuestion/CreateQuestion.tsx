import { QuizQuestion } from "../../QuizPage/Question/Question";
import React, { FormEvent, useState } from "react";

export function CreateQuestion(props: CreateQuestionProps) {
  const [word, setWord] = useState("");
  const [sentence, setSentence] = useState(undefined as string | undefined);

  const onWordChange = (e: FormEvent<HTMLInputElement>) => {
    const newWord = e.currentTarget.value;
    setWord(newWord);
    props.onUpdate(props.number, { word: newWord, sentence });
  };

  const onSentenceChange = (e: FormEvent<HTMLInputElement>) => {
    const newSentence = e.currentTarget.value;
    setSentence(newSentence);
    props.onUpdate(props.number, { sentence: newSentence, word });
  };

  return (
    <div className="row my-3">
      <div className="col-1">
        <span className="number-text text-muted">{ props.number + 1 })</span>
      </div>
      <div className="col-3">
        <input type="text" className="form-control form-control-lg" placeholder="Word" value={word} onChange={onWordChange}/>
      </div>
      <div className="col-8">
        <input type="text" className="form-control form-control-lg" placeholder="Example of word in a sentence (optional)" value={sentence} onChange={onSentenceChange}/>
      </div>
    </div>
  );
}

export interface CreateQuestionProps {
  number: number,
  onUpdate: (i: number, question: QuizQuestion) => any
}
