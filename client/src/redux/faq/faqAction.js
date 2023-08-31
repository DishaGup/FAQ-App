import axios from 'axios';
import { backend_url } from '../auth/authAction';

export const token =localStorage.getItem("token_faq")
//Action Types
export const ASK_QUESTION_SUCCESS = 'ASK_QUESTION_SUCCESS';
export const ANSWER_QUESTION_SUCCESS = 'ANSWER_QUESTION_SUCCESS';
export const ANSWER_QUESTION_LOADING = 'ANSWER_QUESTION_LOADING';
export const ANSWER_QUESTION_ERROR = 'ANSWER_QUESTION_ERROR';
export const GET_ALL_QUESTIONS_SUCCESS = 'GET_ALL_QUESTIONS_SUCCESS';
export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const BAN_USER_SUCCESS = 'BAN_USER_SUCCESS';
export const APPROVE_QUESTION_SUCCESS = 'APPROVE_QUESTION_SUCCESS';
export const DELETE_QUESTION_SUCCESS = 'DELETE_QUESTION_SUCCESS';
export const RATE_ANSWER_SUCCESS = 'RATE_ANSWER_SUCCESS';
//Async Actions
export const askQuestion = (title, content) => async (dispatch) => {
  try {
 
   
    const response = await axios.post(
      `${backend_url}/api/faq/ask`,
      { title, content },
      { headers: { Authorization: token } }
    );
   // console.log(response)
   dispatch(getAllQuestions())
  } catch (error) {
    console.log(error)
  }
};

export const answerQuestion = (questionId, content) => async (
  dispatch,
) => {
  try {
 
    const response = await axios.post(
      `${backend_url}/api/faq/answer/${questionId}`,
      { content },
     { headers: { Authorization:token } }
    );
    dispatch(getSingleQuestion(questionId))
   console.log(response)
  } catch (error) {
    console.log(error)
  }
};

// Action for getting all questions
export const getAllQuestions = () => async (dispatch) => {
    try {
     
      const response = await axios.get(`${backend_url}/api/faq/questions`,  { headers: { Authorization: token } });
     // console.log(response)
      dispatch({ type: GET_ALL_QUESTIONS_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };
  
  // Action for getting a single question
  export const getSingleQuestion = (questionId) => async (dispatch) => {
    try {
      const response = await axios.get(`${backend_url}/api/faq/question/${questionId}`,{ headers: { Authorization: token } });
      console.log(response)
      dispatch({ type: GET_QUESTION_SUCCESS, payload: response.data });
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
  
  // Action for rating an answer
  export const rateAnswer = (answerId,questionId) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${backend_url}/api/faq/answer/${answerId}/rate`,{ headers: { Authorization: token } }       
      );
      console.log(response)
      dispatch(getSingleQuestion(questionId));
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };
  

  
  
  
  
  