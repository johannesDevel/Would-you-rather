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
        <div>
          <p>Results:</p>
          <div className="question-answered-option">
            <p>{`Would you rather ${question.optionOne.text}`}</p>
            {optionOneVotes.includes(authedUser) && <div>Your Choice</div>}
            <div>{(optionOneVotes.length / allVotesSum) * 100}</div>
            <div>{`${optionOneVotes.length} out of ${allVotesSum} votes`}</div>
          </div>
          <div className="question-answered-option">
            <p>{`Would you rather ${question.optionTwo.text}`}</p>
            {optionTwoVotes.includes(authedUser) && <div>Your Choice</div>}
            <div>{(optionTwoVotes.length / allVotesSum) * 100}</div>
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
