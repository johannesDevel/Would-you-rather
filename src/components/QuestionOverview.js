import React from "react";
import { Link, withRouter } from "react-router-dom";
import woman from "../pics/woman.png";
import nerd from "../pics/nerd.png";
import businessMan from "../pics/business-man.png";

function QuestionOverview(props) {
  const { question } = props;

  console.log(question);

  return (
    <div className="question">
      <div className="question-title">{question.author} asks:</div>
      <div className="question-content">
        <div>
          <img
            src={
              question.avatar === "woman"
                ? woman
                : question.avatar === "business-man"
                ? businessMan
                : nerd
            }
            alt="Avatar"
          />
        </div>
        <div className="question-overview-content">
          <p>Would you rather ...</p>
          <div>...{question.optionOne.text}...</div>
          <button>
            <Link to={`/question/${question.id}`}>View Poll</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(QuestionOverview);
