import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";
import { HomePage } from './HomePage/HomePage';
import { QuizPage } from './QuizPage/QuizPage';

export function App() {
  return (
    <HashRouter>
      <header>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container d-flex justify-content-between">
            <a href="/" className="navbar-brand d-flex align-items-center">
              <strong>Spelling App</strong>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader"
                    aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </header>
      <main role="main">
        <Switch>
          <Route path="/quiz">
            <QuizPage />
          </Route>
          <Route path="/users">
            {/*<CreatePage />*/}
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </main>
      <footer>
        <div className="container">
          &copy; Solirius Hackathon Winners 2020
        </div>
      </footer>
    </HashRouter>
  );
}
