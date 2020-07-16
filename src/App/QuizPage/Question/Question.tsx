import React, {useState} from "react";
import "./Question.css";
import {WordResult} from "../QuizPage";
import AWS from "aws-sdk";

const RICIBs = require("react-individual-character-input-boxes2").default;

AWS.config.region = 'us-east-2';
AWS.config.credentials = new AWS.CognitoIdentityCredentials(
    {IdentityPoolId: 'us-east-2:d17e443c-5c74-4812-9b45-ffe150848407'});
const speechParams = {
    OutputFormat: 'mp3',
    Text: '',
    VoiceId: 'Joanna'
};
const signer = new AWS.Polly.Presigner();
const audio = new Audio();

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
    };


    const playAudio = (speech: string) => {
     return new Promise((resolve) => {
       speechParams.Text = speech;

       signer.getSynthesizeSpeechUrl(speechParams,  (error: Error, url: string) => {
         if (error) {
           console.log(error);
         } else {
           audio.src = url;
           audio.play();
           audio.onended = resolve;
         }
       })
     })
    };

    const onClickPlay = async () => {
      setSoundPlaying(!soundPlaying);
      if (!soundPlaying) {
          await playAudio(props.question.word);
          if (props.question.sentence) { await playAudio(props.question.sentence) };
      } else {
          audio.src = '';
      }
      setSoundPlaying(false);
    };

    const inputProps = new Array(props.question.word.length)
        .fill({placeholder: "_"})
        .map((o, i) => i === props.result ? {...o, className: "box-red"} : o);

    return (
        <div className="input-group input-group-lg my-3">
            <span className="number-text text-muted">{props.number + 1})</span>
            <div className="input-group-prepend">
                <span className="input-group-text btn sound-playing" onClick={onClickPlay}>{buttonChar}</span>
            </div>

            <RICIBs
                amount={props.question.word.length}
                handleOutputString={onChange}
                inputRegExp={/^[a-zA-Z0-9_.-]*$/}
                inputProps={inputProps}
            />
            <span>{markIcon}</span>
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
