import { GET_ALL_QUESTIONS_SUCCESS, GET_QUESTION_SUCCESS,ASK_QUESTION_SUCCESS,
    ANSWER_QUESTION_SUCCESS,
    APPROVE_QUESTION_SUCCESS,
    DELETE_QUESTION_SUCCESS,
    RATE_ANSWER_SUCCESS, } from './faqAction';

  
  const initialState = {
    askQuestionSuccess: false,
    answerQuestionSuccess: false,
    approveQuestionSuccess: false,
    deleteQuestionSuccess: false,
    rateAnswerSuccess: false,
    answerLoading: false,
    answerError: null,
    questions:[],
    question:{}
  };
  
  const faqReducer = (state = initialState, action) => {
    switch (action.type) {
      case ASK_QUESTION_SUCCESS:
        return {
          ...state,
          askQuestionSuccess: true,
        };
      case ANSWER_QUESTION_SUCCESS:
        return {
          ...state,
          answerQuestionSuccess: true,
          answerLoading: false,
          answerError: null,
        };
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
      case RATE_ANSWER_SUCCESS:
        return {
          ...state,
          rateAnswerSuccess: true,
        };
        case GET_ALL_QUESTIONS_SUCCESS:
            return {
              ...state,
              questions: action.payload, // Store the fetched questions
            };
            case GET_QUESTION_SUCCESS:
                return {
                  ...state,
                  question: action.payload, // Store the fetched questions
                };
      default:
        return state;
    }
  };
  
  export default faqReducer;
  