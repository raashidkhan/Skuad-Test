import React, { useState } from 'react';
import Questions from './Question';
import Results from './Results';
const Quiz = ({ id }) => {
  const [result, setResult] = useState(false);
  const [mappings, setMappings] = useState([]);

  return (
    <main className="pageContainer">
      {result ? (
        <Results id={id} mappings={mappings} />
      ) : (
        <Questions
          id={id}
          mappings={mappings}
          setMappings={setMappings}
          result={result}
          setResult={setResult}
        />
      )}
    </main>
  );
};

export default Quiz;
