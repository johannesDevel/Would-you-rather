import { showLoading, hideLoading } from "react-redux-loading";
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
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

export function handleSaveQuestionAnswer(info) {
  return (dispatch) => {
    dispatch(questionSaveQuestionAnswerAction(info));
    dispatch(userSaveQuestAnswerAction(info));

    return saveQuestionAnswer(info).catch((e) => {
      console.warn("Error in handleSaveQuestionAnswer", e);
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
      });
  };
}
