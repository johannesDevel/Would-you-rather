export const RECEIVE_USERS = 'RECEIVE_USERS';
export const USER_SAVE_QUESTION_ANSWER = 'USER_SAVE_QUESTION_ANSWER';
export const SAVE_QUESTION_USER = 'SAVE_QUESTION_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function userSaveQuestAnswerAction({ authedUser, qid, answer }) {
  return {
    type: USER_SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer
  }
}

export function saveQuestionUserAction({ id, author }) {
  return {
    type: SAVE_QUESTION_USER,
    id,
    author
  }
}