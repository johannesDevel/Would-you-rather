import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/api";
import woman from "../pics/woman.png";
import nerd from "../pics/nerd.png";
import businessMan from "../pics/business-man.png";

function QuestionAnswered(props) {
  const { author, question, authedUser } = props;

  const optionOneVotes = question.optionOne.votes;
  const optionTwoVotes = question.optionTwo.votes;
  const allVotesSum = optionOneVotes.length + optionTwoVotes.length;

  function formatNumber(number) {
    return new Intl.NumberFormat("en-US", { style: "percent" }).format(number);
  }

  return (
    <div className="question">
      <div className="question-title">{`Asked by ${author.name}`}</div>

      <div className="question-content">
        <div className="avatar">
          <img
            src={
              author.avatarURL === "woman"
                ? woman
                : author.avatarURL === "business-man"
                ? businessMan
                : nerd
            }
            alt="Avatar"
          />
        </div>
        <div className="question-overview-content">
          <p>Results:</p>
          <div
            className={
              optionOneVotes.includes(authedUser)
                ? "question-answered-option selected-option"
                : "question-answered-option"
            }
          >
            <p>{`Would you rather ${question.optionOne.text}`}</p>
            <div>{`${formatNumber(
              optionOneVotes.length / allVotesSum
            )} voted for that option`}</div>
            <br />
            <div>{`${optionOneVotes.length} out of ${allVotesSum} votes`}</div>
          </div>
          <div
            className={
              optionTwoVotes.includes(authedUser)
                ? "question-answered-option selected-option"
                : "question-answered-option"
            }
          >
            <p>{`Would you rather ${question.optionTwo.text}`}</p>
            <div>{`${formatNumber(
              optionTwoVotes.length / allVotesSum
            )} voted for that option`}</div>
            <br />
            <div>{`${optionTwoVotes.length} out of ${allVotesSum} votes`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const question = questions[props.questionId];
  const author = users[question.author];
  const formatedQuestion = formatQuestion(question, author, authedUser);

  return {
    question: formatedQuestion,
    author,
    authedUser,
  };
}

export default connect(mapStateToProps)(QuestionAnswered);
