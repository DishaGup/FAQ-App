import {
  APPROVE_QUESTION_SUCCESS,
  DELETE_QUESTION_SUCCESS,
  GET_ALL_USERS_SUCCESS,
  GET_PENDING_ANSWERS_SUCCESS,
  GET_PENDING_QUESTION_SUCCESS,
} from "./adminAction";

const initialState = {
  loading: false,
  error: null,
  approveQuestionSuccess: false,
  deleteQuestionSuccess: false,
  pendingQuestions: [],
  pendingAnswers: [],
  users: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPROVE_QUESTION_SUCCESS:
      return {
        ...state,
        approveQuestionSuccess: true,
      };
    case DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        deleteQuestionSuccess: true,
      };
    case GET_PENDING_QUESTION_SUCCESS:
      return {
        ...state,
        pendingQuestions: action.payload,
      };
    case GET_PENDING_ANSWERS_SUCCESS:
      return {
        ...state,
        pendingAnswers: action.payload,
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
      };
    default:
      return state;
  }
};

export default adminReducer;
