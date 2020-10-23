import React, { useState } from "react";
import { connect } from "react-redux";
import QuestionOverview from "./QuestionOverview";
import "./App.css";

function checkAnswered(question, authedUser) {
  return (
    question.optionOne.votes.includes(authedUser) ||
    question.optionTwo.votes.includes(authedUser)
  );
}

function Dashboard(props) {
  const [answered, setAnswered] = useState(false);

  return (
    <div className="dashboard">
      <div>
        <button id="answeredButton" disabled={answered} onClick={() => setAnswered(true)}>
          Answered
        </button>

        <button id="unansweredButton" disabled={!answered} onClick={() => setAnswered(false)}>
          Unanswered
        </button>
      </div>

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
}

function mapStateToProps({ questions, authedUser, users }) {
  const parsedQuestions = Object.keys(questions).map((questionId) => {
    const question = questions[questionId];
    return {
      ...question,
      answered: checkAnswered(question, authedUser),
      avatar: users[question.author].avatarURL,
    };
  });

  return {
    authedUser,
    parsedQuestions: parsedQuestions.sort((a, b) => b.timestamp - a.timestamp),
  };
}

export default connect(mapStateToProps)(Dashboard);
