import { shuffleArray } from "../utils/utils";

type Question = {
    category: string;
    difficulty : string;
    correct_answer : string;
    incorrect_answers : string[];
    question : string;
    type : string;
}

export type QuestionState = Question & {answers : string[]}

export enum Difficulty {
    EASY = "easy",
    MEIDUM = "medium",
    HARD = "hard"
}


export const fetchQuizQuestion = async (amount : number , difficulty : Difficulty): Promise<QuestionState[]> => {
    const endPoint : string = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    // double await | 1: await get data from sever | 2: wait convert json data
    const data = await (await fetch(endPoint)).json()

    // custome promise
    return (
        data.results.map((question : Question) =>{
            return {
                ...question,
                // add property all answers
                answers : shuffleArray([...question.incorrect_answers, question.correct_answer])
            }
        })
    )
}   
