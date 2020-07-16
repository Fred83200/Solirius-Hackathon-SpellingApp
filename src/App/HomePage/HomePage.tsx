import { Link } from "react-router-dom";
import React from "react";
import "./HomePage.css";

export function HomePage() {
  return (
    <section className="jumbotron text-center">
      <div className="container">
        <p className="logo">A</p>
        <h1>Spelling App</h1>
        <p>Teach your child to read real good. Or is it gooderer?</p>
        <p>
          <Link to="/quiz" className="btn btn-primary my-2 mr-2">Quick Start</Link>
          <Link to="/create" className="btn btn-secondary my-2">Create Quiz</Link>
        </p>
      </div>
    </section>
  )
}
