import React from 'react';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { HomePage } from './HomePage/HomePage';
import { QuizPage } from './QuizPage/QuizPage';
import { CreatePage } from './CreatePage/CreatePage';

export function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <header>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container d-flex justify-content-between">
            <Link to="/" className="navbar-brand d-flex align-items-center">
              <strong>Spelling App</strong>
            </Link>
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
          <Route path="/create">
            <CreatePage />
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
    </BrowserRouter>
  );
}
