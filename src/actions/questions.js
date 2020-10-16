export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';
export const SAVE_QUESTION = 'SAVE_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function questionSaveQuestionAnswerAction({ authedUser, qid, answer }) {
    return {
      type: SAVE_QUESTION_ANSWER,
      authedUser,
      qid,
      answer
    }
}

export function saveQuestionAction({ id, author, optionOne, optionTwo, timestamp }) {
  return {
    type: SAVE_QUESTION,
    id,
    author,
    optionOne,
    optionTwo,
    timestamp
  }
}