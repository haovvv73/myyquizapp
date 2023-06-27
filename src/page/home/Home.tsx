import React, { useState } from 'react'
import { Difficulty, fetchQuizQuestion, QuestionState } from '../../api/HomeApi'
import QuestionCard from '../../component/QuestionCard'
import style from './HomeStyle.module.css'

export interface AnswerObject {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTION = 10

export default function Home() {

  const [number, setNumber] = useState(0)
  const [score, setScore] = useState(0)
  // array answer and question
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([])
  const [question, setQuestion] = useState<QuestionState[]>([])

  const [loading, setLoading] = useState(false)
  const [gameOver, setGameOver] = useState(true)

  // call api question start game 
  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)
    setScore(0)
    // get question from data 
    const newQuestions = await fetchQuizQuestion(TOTAL_QUESTION, Difficulty.EASY)

    // save
    setQuestion(newQuestions)
    setLoading(false)
    setNumber(0)
    setUserAnswer([])
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      const answer = e.currentTarget.value
      const correct = question[number].correct_answer === answer
      // cacl score
      if(correct) setScore(prev => prev + 10)
      // add answer of user
      const answerObject = {
        question: question[number],
        answer: answer,
        correct: correct,
        correctAnswer: question[number].correct_answer
      }
      setUserAnswer((prev) => {
        return [...prev, answerObject ] as AnswerObject[]
      })
    }
  }

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;
    if (nextQ === TOTAL_QUESTION) {
      setGameOver(true);
    } 
    setNumber(nextQ);
  }
  
  return (
    <div style={{ color: 'white' }}>
      <span>22/12/2022</span>
      <h1 style={{ textAlign: 'center' }} >Quiz App</h1>

      {gameOver || userAnswer.length === TOTAL_QUESTION ? (
        <button onClick={startTrivia} className={style.btnGrad} >
          start
        </button>
      ) : null}

      {!gameOver ? (
        <p style={{ textAlign: 'center' }}  >score : {score} </p>
      ) : null}

      {loading ? <p className={style.ldsDualRing} ></p> : null}

      <div style={{display:'flex',justifyContent:'center'}} >
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestion={TOTAL_QUESTION}
            question={question[number].question}
            answers={question[number].answers}
            userAnswer={userAnswer ? userAnswer[number] : undefined}
            callback={checkAnswer}
          />
        )}
      </div>


      {!gameOver && !loading && userAnswer.length === number + 1 && number !== TOTAL_QUESTION - 1 ? (
        <button onClick={nextQuestion} style={{
          padding: '8px 50px', backgroundColor: 'pink', border: '0px', borderRadius: '10px', margin: '0px auto', display: 'block', cursor: 'pointer'
        }}
        >
          <p>next question</p>
        </button>
      ) : null}

    </div>
  )
}
