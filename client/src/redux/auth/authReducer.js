import {
  USER_LOGOUT_SUCCESS,
  USER_GET_REQUEST_PENDING,
  USER_LOGIN_REQUEST_SUCCESS,
  USER_REGISTER_REQUEST_SUCCESS,
  USER_GET_REQUEST_FAILURE,
} from "./authAction";

const initial = {
  loading: false,
  error: null,
  token: null,
  role: null,
  userID: null,
};

const authReducer = (state = initial, { type, payload }) => {
  switch (type) {
    case USER_GET_REQUEST_PENDING:
      // Set loading to true when a user request is pending
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_REQUEST_SUCCESS:
      // Update user details and token on successful user login request
      return {
        ...state,
        loading: false,
        token: payload.token,
        role: payload.role,
        userID: payload.userId,
        error: null,
      };

    case USER_REGISTER_REQUEST_SUCCESS:
      // Update bookmarked data on successful user data request
      return {
        ...state,
        loading: false,
        token: payload.token,
        role: payload.role,
        userID: payload.userId,
        error: null,
      };

    case USER_LOGOUT_SUCCESS:
      // Reset user details and token on successful user logout
      return {
        ...state,
        loading: false,
        error: null,
        token: null,
      };

    case USER_GET_REQUEST_FAILURE:
      // Update error message on user request failure
      return {
        ...state,
        loading: false,
        error: payload?.response?.data?.error || "An error occurred.",
      };

    default:
      return state;
  }
};
export default authReducer;
