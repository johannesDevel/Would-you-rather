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
  const { questionId, answered } = props;

  return (
    <div className="question-page">
      {answered ? (
        <QuestionAnswered questionId={questionId} />
      ) : (
        <QuestionUnanswered questionId={questionId} />
      )}
    </div>
  );
}

function mapStateToProps({ authedUser, questions }, props) {
  const questionId = props.match.params.id;
  const question = questions[questionId];

  return {
    questionId,
    answered: checkAnswered(question, authedUser),
  };
}

export default connect(mapStateToProps)(QuestionPage);
