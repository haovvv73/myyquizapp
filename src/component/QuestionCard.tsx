import React from 'react'
import { AnswerObject } from '../page/home/Home';

type QuestionCardProps = { 
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestion: number;
}

const QuestionCard: React.FC<QuestionCardProps> = (
    { question,answers,callback,userAnswer,questionNr,totalQuestion }
) => {
    return (
        <div>
            <p>
                Question : {questionNr} / {totalQuestion}
            </p>
            <p> {question} </p>
            <div>
                {answers.map((answer,index)=>{
                    return (
                        <div key={index} >
                            <button 
                                disabled={userAnswer ? true : false} 
                                value={answer}
                                onClick={callback}
                                style={{padding:'7px 30px',backgroundColor:'white',borderRadius:'10px',border:"1px solid aqua",margin:'4px',cursor:'pointer'}}
                            >
                                <span> {answer} </span>
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default QuestionCard
