import React from "react";
import { Link, withRouter } from "react-router-dom";

function QuestionOverview(props) {
  const { question } = props;

  return (
    <div className="question">
      <div className="question-title">{question.author} asks:</div>
      <div className="question-content">
        <div>
          <img src={question.avatar} alt="Avatar" />
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
