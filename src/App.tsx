import {useState, useEffect} from 'react'
import Questions from "./Components/Questions";
import { AllQuestions } from './Types';


const App = () => {
  console.log('App component');

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [numberOfAnswers, setNumberOfAnswers] = useState<number>(0);
  const [questions, setQuestions] = useState<AllQuestions[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const handleStart = (): void => {
    setIsStarted(true)
    console.log('started');
  }
  const handleNumberOfAnswers = (): void => {
    setNumberOfAnswers(prev => prev + 1)
    setIsAnswered(false)
    console.log(numberOfAnswers);
    if(numberOfAnswers >= 9 ){
      setNumberOfAnswers(0)
      setIsStarted(false)
      setQuestions([])
    }
  }

  const getAllQuestions = async (): Promise<AllQuestions[]>  => {
    const data = await fetch('https://the-trivia-api.com/api/questions?categories=film_and_tv,food_and_drink,sport_and_leisure&limit=10&region=EG&difficulty=easy')
    return data.json()      
  }
  
  useEffect(() => {
    isStarted === true && 
    getAllQuestions().then(res => {
      // eslint-disable-next-line
      res.map((data: AllQuestions) => {
        setQuestions((prev: AllQuestions[]) => 
           [
            ...prev, {
              ...data,
              answers: [data.correctAnswer, ...data.incorrectAnswers].sort((a, b) => Math.random() - 0.5)
            }
          ]
        )
      })
    })
    // eslint-disable-next-line
  }, [isStarted])
  return (
    <div className="App">
      <h1 className="App-header">
        <a href='https://ahmed-sadek89.github.io/s-a-d-e-k/' rel="noreferrer" target={'_blank'} >
          SADEK QUIZ
        </a>
      </h1>
      {
        isStarted === false &&
        <>
          <button className="App-start-question" onClick={handleStart}>
            start
          </button>
          
        </>
      }
      <p className="App-score">
        score: {score}
      </p>
      {
        isStarted === true &&
        <>
          <Questions 
            numberOfAnswers={numberOfAnswers}
            questions={questions}
            setScore={setScore}
            isAnswered={isAnswered}
            setIsAnswered={setIsAnswered}
          />
          {
            isAnswered === true &&
            <button className="App-next-question" onClick={handleNumberOfAnswers}>
              next
            </button>
          }
          
        </>
      }
      
    </div>
  );
}

export default App;
