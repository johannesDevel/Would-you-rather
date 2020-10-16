import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA';

export function getInitialData() {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions
  }))
}

export function saveQuestion(info) {
  return _saveQuestion(info);
}

export function saveQuestionAnswer(info) {
  return _saveQuestionAnswer(info);
}

export const formatQuestion = (question, author, authedUser) => {
  const { id, optionOne, optionTwo, timestamp } = question;

  return {
    id,
    authedUser,
    optionOne,
    optionTwo,
    timestamp,
    author: author.name
  };
}