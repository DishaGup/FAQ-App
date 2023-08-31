export const ADMIN_ACTION_REQUEST = 'ADMIN_ACTION_REQUEST';
export const ADMIN_ACTION_FAILURE = 'ADMIN_ACTION_FAILURE';
export const BAN_USER_SUCCESS = 'BAN_USER_SUCCESS';
export const APPROVE_QUESTION_SUCCESS = 'APPROVE_QUESTION_SUCCESS';
export const DELETE_QUESTION_SUCCESS = 'DELETE_QUESTION_SUCCESS';



  
export const approveQuestion = (questionId) => async (dispatch) => {
    try {
      const response = await axios.put(`${backend_url}/api/faq/approve/${questionId}`);
      dispatch({ type: APPROVE_QUESTION_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };
  
  // Action for deleting a question
  export const deleteQuestion = (questionId) => async (dispatch) => {
    try {
      const response = await axios.delete(`${backend_url}/api/faq/delete/${questionId}`);
      dispatch({ type: DELETE_QUESTION_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };
  
  
  // Action for banning a user
  export const banUser = (userId) => async (dispatch) => {
    try {
      const response = await axios.put(`${backend_url}/api/faq/ban/${userId}`);
      dispatch({ type: BAN_USER_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };
