import { setAuthedUser } from "../actions/authedUser";
import { saveQuestionAnswer, saveQuestion, getInitialData } from "../utils/api";
import {
  userSaveQuestAnswerAction,
  receiveUsers,
  saveQuestionUserAction,
} from "./users";

import {
  questionSaveQuestionAnswerAction,
  saveQuestionAction,
  receiveQuestions,
} from "./questions";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions, authedUser }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      // dispatch(setAuthedUser(authedUser));
    });
  };
}

export function handleSaveQuestionAnswer(info) {
  return (dispatch) => {
    dispatch(questionSaveQuestionAnswerAction(info));
    dispatch(userSaveQuestAnswerAction(info));

    return saveQuestionAnswer(info).catch((e) => {
      console.warn("Error in handleSaveQuestionAnswer", e);
      alert("There was an error saving the answer.");
    });
  };
}

export function handleSaveQuestion(info) {
  return (dispatch) => {
    return saveQuestion(info)
      .then((question) => {
        dispatch(saveQuestionAction(question));
        dispatch(saveQuestionUserAction(question));
      })
      .catch((e) => {
        console.warn("Error in handleSaveQuestion", e);
        alert("There was an error in saving the question");
      });
  };
}
