import React, { useState } from "react";
import { connect } from "react-redux";
import "./App.css";
import { handleSaveQuestionAnswer } from "../actions/shared";
import { formatQuestion } from "../utils/api";

function QuestionUnanswered(props) {
  const [selectedOption, setSelectedOption] = useState("optionOne");

  const { question, author, dispatch, authedUser } = props;

  function submit() {
    dispatch(
      handleSaveQuestionAnswer({
        authedUser,
        qid: question.id,
        answer: selectedOption,
      })
    );
  }

  return (
    <div className="question">
      <div className="question-title">{author.name} asks:</div>

      <div className="question-content">
        <div className="avatar">
          <img src={author.avatarURL} alt="Avatar" />
        </div>
        <div>
          <p>Would you rather ...</p>
          <div>
            <div>
              <label>
                <input
                  type="radio"
                  value="optionOne"
                  checked={selectedOption === "optionOne"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                {question.optionOne.text}
              </label>
            </div>

            <div>
              <label>
                <input
                  type="radio"
                  value="optionTwo"
                  checked={selectedOption === "optionTwo"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                {question.optionTwo.text}
              </label>
            </div>
            <div>
              <button onClick={submit}>Submit</button>
            </div>
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
    authedUser,
    author,
  };
}

export default connect(mapStateToProps)(QuestionUnanswered);
