import React from "react";
import "./App.css";
import { connect } from "react-redux";
import QuestionUnanswered from "./QuestionUnanswered";
import QuestionAnswered from "./QuestionAnswered";

function checkAnswered(question, authedUser) {
  return (
    question.optionOne.votes.includes(authedUser) ||
    question.optionTwo.votes.includes(authedUser)
  );
}

function QuestionPage(props) {
  const { questionId, question, authedUser, questionFound } = props;

  return (
    <div className="question-page">
      {questionFound ? (
        checkAnswered(question, authedUser) ? (
          <QuestionAnswered questionId={questionId} />
        ) : (
          <QuestionUnanswered questionId={questionId} />
        )
      ) : (
        <div className="question-not-found">ERROR 404: Question not found</div>
      )}
    </div>
  );
}

function mapStateToProps({ authedUser, questions }, props) {
  const questionId = props.match.params.id;
  const questionFound = questions != null && [questionId] in questions;
  const question = questionFound ? questions[questionId] : null;

  return {
    questionId,
    authedUser,
    question,
    questionFound,
  };
}

export default connect(mapStateToProps)(QuestionPage);
