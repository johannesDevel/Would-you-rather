import React from "react";
import { Link, withRouter } from "react-router-dom";

function QuestionOverview(props) {
  const { question } = props;

  return (
    <div className="question">
      <div className="question-title">{question.author} asks:</div>
      <p>Would you rather ...</p>
      <div>...{question.optionOne.text}...</div>
      <button>
        <Link to={`/question/${question.id}`}>View Question</Link>
      </button>
    </div>
  );
}

export default withRouter(QuestionOverview);
