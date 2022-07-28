import { questionsProps, AllQuestions } from "../Types"

const Questions = ({ 
  numberOfAnswers,
  questions,
  setScore,
  isAnswered,
  setIsAnswered
}: questionsProps) => {

  console.log('questions component');


  const handleAnswering = (userAnswer: string, correctAnswer: string): void => {
    setIsAnswered(true)
    if ( userAnswer === correctAnswer ) {
      console.log('this is correct answer');
      setScore(prev => prev + 1)
    } else {
      console.log('this is not a correct answer')
    }
  }

  return (
    <div className='question-container'>
      <h3>
        Question {numberOfAnswers + 1}/10
      </h3>
      {
        questions !== [] ?
        questions?.slice(numberOfAnswers,numberOfAnswers + 1).map((index: AllQuestions) => (
          <div key={index.id}>
            <p>
              {index.question}
            </p>
            <div className='btn-answers'>
              {
                index.answers.map((i, k) => {
                  if ( isAnswered === false ) {
                    return(
                      <button 
                        className="buttonBeforeAnswering"
                        key={k} 
                        onClick={() => handleAnswering(i, index.correctAnswer)}
                        // disabled={true}
                      >
                        {i}
                      </button>
                    ) 
                  } else {
                    return(
                      <button 
                        className={`
                          buttonAfterAnswering 
                          ${i === index.correctAnswer && 'buttonAnswerCorrect'}
                          ${i !== index.correctAnswer && 'buttonAnswerInCorrect' }

                        `}
                        key={k} 
                        disabled={true}
                      >
                        {i}
                      </button>
                    ) 
                  }
                  
              })
              }
              
            </div>
          </div>
        ))
        :
        <h4 className="loading">Loading...</h4>
      }
    </div>
  )
}

export default Questions