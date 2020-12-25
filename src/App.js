import React from 'react';
import './index.css';
import Quizzes from './components/Quizzes';
import Quiz from './components/Quiz';
import { Route, Switch } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          path="/quiz/:id"
          render={(props) => {
            return <Quiz id={props.match.params.id} {...props} />;
          }}
        />
        <Route path="/" exact component={Quizzes} />
      </Switch>
    </div>
  );
}

export default App;
