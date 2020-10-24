import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import woman from "../pics/woman.png";
import nerd from "../pics/nerd.png";
import businessMan from "../pics/business-man.png";

function QuestionOverview(props) {
  const [toQuestion, setToQuestion] = useState("");

  const { question } = props;

  if (toQuestion !== "") {
    return <Redirect to={toQuestion} />;
  }

  return (
    <div className="question">
      <div className="question-title">{question.author} asks:</div>
      <div className="question-content">
        <div className="avatar">
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
          <button onClick={() => setToQuestion(`/question/${question.id}`)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionOverview;
