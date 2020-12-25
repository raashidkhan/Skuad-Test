import React, { useState, useEffect } from 'react';

const Question = ({ id, mappings, setMappings, result, setResult }) => {
  const [quizData, setQuizData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [count, setCount] = useState(0);
  const [counter, setCounter] = useState(15);
  const url = `${process.env.REACT_APP_API_URL}/api/quiz-questions/all/${id}`;
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'auth-token': '19c4ff12-e027-4320-b844-2cda768714e8',
        'content-type': 'application/json',
      },
    }).catch(function (err) {
      console.warn('Error:', err);
    });

    if (response.ok) {
      const data = await response.json();
      setQuizData(data);
    } else {
      setErrorMessage(response.status);
      return Promise.reject(response);
    }
  };

  const nextQuestion = (id, submittedAnswer, question) => {
    setMappings((mappings) => [
      ...mappings,
      {
        ques_id: id,
        question: question,
        submitted_option: submittedAnswer,
      },
    ]);
    setCount(count + 1);
  };
  const submitAnswer = (id, submittedAnswer, question) => {
    setMappings((mappings) => [
      ...mappings,
      {
        ques_id: id,
        question: question,
        submitted_option: submittedAnswer,
      },
    ]);

    setResult(!result);
  };

  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setInterval(() => {
        setCounter((counter) => counter - 1);
      }, 1000);
    }
    if (counter === 0 && count <= quizData.questions.length) {
      handleAnswer(quizData.questions[count].id, '');
    }

    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [counter, count, quizData.questions]);
  const handleAnswer = (id, submittedAnswer, question) => {
    setCounter(15);

    if (count >= quizData.questions.length - 1) {
      submitAnswer(id, submittedAnswer, question);
    } else {
      nextQuestion(id, submittedAnswer, question);
    }
  };
  return (
    <>
      {quizData.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          {errorMessage ? errorMessage : 'Loading...'}
        </div>
      ) : (
        <div className="questionContainer">
          <h1 className="pageTitle">{quizData.name}</h1>
          <div className="time-bar">
            Time Remaining :{' '}
            {`0:${counter.toLocaleString(undefined, {
              minimumIntegerDigits: 2,
            })} / 0:15 seconds`}
          </div>
          <div className="questionWrapper">
            <div className="question question-css">
              {quizData.questions[count].name}
            </div>
            {quizData.questions[count].options.split(',').map((item, index) => {
              return (
                <div
                  className={`answer-value-${index + 1} answer-css`}
                  key={`${item}-${index}`}
                  onClick={() =>
                    handleAnswer(
                      quizData.questions[count].id,
                      item,
                      quizData.questions[count].name
                    )
                  }
                >
                  <span className="checkBox"></span>
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Question;
