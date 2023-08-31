
  
  const initialState = {
    loading: false,
    error: null,
    approveQuestionSuccess: false,
    deleteQuestionSuccess: false,
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
     
  
      default:
        return state;
    }
  };
  
  export default adminReducer;
  