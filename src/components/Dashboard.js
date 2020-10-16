import React, { useState } from "react";
import { connect } from "react-redux";
import QuestionOverview from "./QuestionOverview";
import "./App.css";

function checkAnswered(question, authedUser) {
  return (
    question.optionOne.votes.includes(authedUser) ||
    question.optionTwo.votes.includes(authedUser)
  );
};

function Dashboard(props) {
  const [answered, setAnswered] = useState(false);

  return (
    <div className="dashboard">
      <button disabled={answered} onClick={() => setAnswered(true)}>
        Answered
      </button>

      <button disabled={!answered} onClick={() => setAnswered(false)}>
        Unanswered
      </button>

      <ul>
        {props.parsedQuestions
          .filter((question) => question.answered === answered)
          .map((question) => (
            <li key={question.id}>
              <QuestionOverview question={question} />
            </li>
          ))}
      </ul>
    </div>
  );
};

function mapStateToProps({ questions, authedUser }) {
  const parsedQuestions = Object.keys(questions).map((questionId) => {
    const question = questions[questionId];
    question.answered = checkAnswered(question, authedUser);
    return question;
  });

  return {
    authedUser,
    parsedQuestions,
  };
};

export default connect(mapStateToProps)(Dashboard);
