import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./App.css";
import { handleSaveQuestion } from "../actions/shared";

function NewQuestion(props) {
  const [optionTexts, setOptionTexts] = useState({
    optionOneText: "",
    optionTwoText: "",
    toHome: false
  });

  if (optionTexts.toHome) {
    return <Redirect to="/" />
  }

  function submit(e) {
    e.preventDefault();
    const { optionOneText } = optionTexts;
    const { optionTwoText } = optionTexts;
    const { dispatch, author } = props;

    dispatch(
      handleSaveQuestion({
        optionOneText,
        optionTwoText,
        author: author.id,
      })
    );
    setOptionTexts({ optionOneText: "", optionTwoText: "", toHome: true });
  }

  return (
    <div className="new-question">
      <h2>Create New Question</h2>
      <form onSubmit={submit}>
        <p>Complete the question</p>
        <p>Would you rather...</p>
        <textarea
          value={optionTexts.optionOneText}
          onChange={(e) =>
            setOptionTexts({ ...optionTexts, optionOneText: e.target.value })
          }
        ></textarea>
        <p>OR</p>
        <textarea
          value={optionTexts.optionTwoText}
          onChange={(e) =>
            setOptionTexts({ ...optionTexts, optionTwoText: e.target.value })
          }
        ></textarea>
        <div>
          <button
            type="submit"
            disabled={
              optionTexts.optionOneText === "" ||
              optionTexts.optionTwoText === ""
            }
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

function mapStateToProps({ authedUser, users }) {
  const author = users[authedUser];
  return { author };
}

export default connect(mapStateToProps)(NewQuestion);
