import { backend_url } from "../auth/authAction";
import axios from "axios";
import { token } from "../faq/faqAction";
export const ADMIN_ACTION_REQUEST = "ADMIN_ACTION_REQUEST";
export const ADMIN_ACTION_FAILURE = "ADMIN_ACTION_FAILURE";
export const BAN_USER_SUCCESS = "BAN_USER_SUCCESS";
export const APPROVE_QUESTION_SUCCESS = "APPROVE_QUESTION_SUCCESS";
export const DELETE_QUESTION_SUCCESS = "DELETE_QUESTION_SUCCESS";
export const GET_PENDING_ANSWERS_SUCCESS = "GET_PENDING_ANSWERS_SUCCESS";
export const GET_PENDING_QUESTION_SUCCESS = "GET_PENDING_QUESTION_SUCCESS";
export const APPROVE_ANSWER_SUCCESS = "APPROVE_ANSWER_SUCCESS";
export const GET_ALL_USERS_SUCCESS = "GET_ALL_USERS_SUCCESS";

export const role = localStorage.getItem("role_faq");
export const approveQuestion = (questionId) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${backend_url}/api/admin/approve/${questionId}`,
      {},
      { headers: { Authorization: token, Role: role } }
    );
    /// console.log(response)
    dispatch(getPendingQuestions());
  } catch (error) {
    //console.log(error);
    // Handle error
  }
};

// Action for deleting a question
export const deleteQuestion = (questionId) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `${backend_url}/api/admin/delete/${questionId}`,
      { headers: { Authorization: token, Role: role } }
    );
    console.log(response);
    dispatch({
      type: DELETE_QUESTION_SUCCESS,
      payload: response.data,
      Role: role,
    });
  } catch (error) {
    console.log(error);
    // Handle error
  }
};

// Action for banning a user
export const banUser = (userId) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${backend_url}/api/admin/ban/${userId}`,
      {},
      { headers: { Authorization: token, Role: role } }
    );
    dispatch({ type: BAN_USER_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    // Handle error
  }
};

// Action for getting pending answers
export const getPendingAnswers = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${backend_url}/api/admin/pending-answers`,
      { headers: { Authorization: token, Role: role } }
    );
    console.log(response);
    dispatch({ type: GET_PENDING_ANSWERS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADMIN_ACTION_FAILURE, payload: error.message });
  }
};

// Action for getting pending answers
export const getPendingQuestions = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${backend_url}/api/admin/pending-questions`,
      { headers: { Authorization: token, Role: role } }
    );
    console.log(response);
    dispatch({ type: GET_PENDING_QUESTION_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADMIN_ACTION_FAILURE, payload: error.message });
  }
};

// Action for approving an answer
export const approveAnswer = (answerId) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${backend_url}/api/admin/approve-answer/${answerId}`,
      {},
      { headers: { Authorization: token, Role: role } }
    );
    console.log(response);
    dispatch({ type: APPROVE_ANSWER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ADMIN_ACTION_FAILURE, payload: error.message });
  }
};

// Action for approving user registration
export const approveUserRegistration = (userId) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${backend_url}/api/admin/approve-user/${userId}`,
      {},
      { headers: { Authorization: token, Role: role } }
    );

    dispatch(getAllUsers());
  } catch (error) {
    dispatch({ type: ADMIN_ACTION_FAILURE, payload: error.message });
  }
};

// Action for approving user registration
export const getAllUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${backend_url}/api/user`, {
      headers: { Authorization: token, Role: role },
    });
    console.log(response);
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADMIN_ACTION_FAILURE, payload: error.message });
  }
};
