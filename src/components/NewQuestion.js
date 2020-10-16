import React, { useState } from "react";
import { connect } from "react-redux";
import "./App.css";
import { formatQuestion } from "../utils/api";
import { handleSaveQuestion } from "../actions/shared";

function NewQuestion(props) {
  const [optionTexts, setOptionTexts] = useState({
    optionOneText: "",
    optionTwoText: "",
  });

  function submit(e) {
    e.preventDefault();
    const { optionOneText } = optionTexts;
    const { optionTwoText } = optionTexts;
    const { dispatch, authedUser, author } = props;

    dispatch(
      handleSaveQuestion({
        optionOneText,
        optionTwoText,
        author: author.id,
      })
    );

    // console.log(formatedQuestion);

    setOptionTexts({ optionOneText: "", optionTwoText: "" });
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

  return {
    authedUser,
    author,
  };
}

export default connect(mapStateToProps)(NewQuestion);
