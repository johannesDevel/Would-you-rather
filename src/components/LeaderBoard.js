import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";

function LeaderBoard(props) {
  const { questionsSumUser } = props;

  useEffect(() => {
    console.log(questionsSumUser);
  });

  return (
    <div className="leader-board">
      {questionsSumUser.length > 0 && (
        <ul>
          {questionsSumUser.map((questionSum) => (
            <li key={questionSum.id}>
              <div className="leader-board-user">
                <div>
                  <div>
                    <img src={questionSum.avatar} alt="Avatar" />
                  </div>
                  <div className="leader-board-user-info">
                    <h3>{questionSum.name}</h3>
                    <p>{`Answered questions: ${questionSum.answeredSum}`}</p>
                    <p>{`Created questions: ${questionSum.createdSum}`}</p>
                  </div>
                </div>
                <div className="leader-board-user-score">
                  <div>
                    <p>Score</p>
                  </div>
                  <div>
                    <h2>{questionSum.sum}</h2>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function mapStateToProps({ users }) {
  const questionsSumUser = Object.keys(users).map((userId) => {
    const user = users[userId];
    const createdQuestions = user.questions;
    const answeredQuestions = Object.keys(user.answers);
    const questionsSum = [
      ...new Set([...createdQuestions, ...answeredQuestions]),
    ];

    return {
      id: user.id,
      name: user.name,
      avatar: user.avatarURL,
      createdSum: createdQuestions.length,
      answeredSum: answeredQuestions.length,
      sum: questionsSum.length,
    };
  });

  return {
    questionsSumUser,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
