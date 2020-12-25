import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Quizzes = () => {
  const [allQuiz, setAllQuiz] = useState([]);
  const url = `${process.env.REACT_APP_API_URL}/api/quiz/all`;
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
      setAllQuiz(data);
    } else {
      return Promise.reject(response);
    }
  };
  return (
    <main className="pageContainer">
      <h1 className="pageTitle">Coding Judge</h1>
      {allQuiz.map((item) => {
        return (
          <div className="allQuizWrapper" key={item.id}>
            <div className="quizButtonWrapper">
              <h3 className={`quiz-heading quiz-list-${item.id}`}>
                {item.name}
              </h3>
              <Link
                className={`start-quiz-button start-quiz-${item.id}`}
                to={`/quiz/${item.id}`}
              >
                Start
              </Link>
            </div>
            <p>{item.description}</p>
          </div>
        );
      })}
    </main>
  );
};

export default Quizzes;
