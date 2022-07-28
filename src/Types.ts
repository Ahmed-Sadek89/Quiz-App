import React from 'react';
// api => https://the-trivia-api.com/api/questions?categories=film_and_tv,food_and_drink,sport_and_leisure&limit=10&region=EG&difficulty=easy

export type AllQuestions = {
    // id: string,
    // correctAnswer: string,
    // incorrectAnswers: string[],
    // question: string
    // there are ather propresties in api that unusable, if you want it call it
    id: string,
    correctAnswer: string,
    incorrectAnswers: string[],
    question: string,
    answers: string[]
}

export type questionsProps = {
    numberOfAnswers: number,
    questions:  AllQuestions[],
    setScore: React.Dispatch<React.SetStateAction<number>>,
    isAnswered: boolean,
    setIsAnswered: React.Dispatch<React.SetStateAction<boolean>>
}