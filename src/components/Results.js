import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Results = ({ id, mappings }) => {
  const [scoreResult, setScoreResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const url = `${process.env.REACT_APP_API_URL}/api/user/quiz-score`;

  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line
  }, []);
  const dataToSendArray = [];
  mappings.map((item) => {
    const ques_id = item.ques_id;
    const submitted_option = item.submitted_option;
    return dataToSendArray.push({
      ques_id,
      submitted_option,
    });
  });

  const fetchResults = async () => {
    let resultData = {
      quiz_id: id,
      mappings: dataToSendArray,
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'auth-token': '19c4ff12-e027-4320-b844-2cda768714e8',
        'content-type': 'application/json',
      },
      body: JSON.stringify(resultData),
    }).catch(function (err) {
      console.warn('Error:', err);
    });

    if (response.ok) {
      const data = await response.json();
      setScoreResult(data);
    } else {
      setErrorMessage(response.status);
      return Promise.reject(response);
    }

    // setScoreResult(data);
  };
  const getQuestion = (id) => {
    const current = mappings.filter((item) => {
      return item.ques_id === id;
    });
    return current;
  };

  return (
    <>
      {scoreResult.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          {errorMessage ? errorMessage : 'Loading...'}
        </div>
      ) : (
        <div className="resultContainer">
          <h1 className="pageTitle score"> Your Score :{scoreResult.score}</h1>
          <div className="answerWrapper">
            <h2 className="question-css">Answers</h2>
            {scoreResult.questions.map((item, index) => {
              const currentQuestion = getQuestion(item.ques_id);
              return (
                <div key={item.ques_id} className="answerDesc">
                  <div className={`question-${index + 1}`}>
                    {currentQuestion[0].question}
                  </div>
                  <div className={`submitted-answer-${index + 1}`}>
                    Your Answer:{item.submitted_option}
                  </div>
                  <div className={`correct-answer-${index + 1}`}>
                    CorrectAnswer: {item.correct_option}
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <Link to="/">Go Back</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Results;
