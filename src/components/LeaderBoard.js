import React from "react";
import { connect } from "react-redux";
import "./App.css";
import woman from "../pics/woman.png";
import nerd from "../pics/nerd.png";
import businessMan from "../pics/business-man.png";

function LeaderBoard(props) {
  const { questionsSumUser } = props;

  return (
    <div className="leader-board">
      {questionsSumUser.length > 0 && (
        <ul>
          {questionsSumUser.map((questionSum) => (
            <li key={questionSum.id}>
              <div className="leader-board-user">
                <div>
                  <div>
                    <img
                      src={
                        questionSum.avatar === "woman"
                          ? woman
                          : questionSum.avatar === "business-man"
                          ? businessMan
                          : nerd
                      }
                      alt="Avatar"
                    />
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
    const questionsSum = [...createdQuestions, ...answeredQuestions];

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
    questionsSumUser: questionsSumUser.sort((a, b) => b.sum - a.sum),
  };
}

export default connect(mapStateToProps)(LeaderBoard);
