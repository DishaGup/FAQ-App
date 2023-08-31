import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import authReducer  from "./auth/authReducer";
import faqReducer from "./faq/faqReducer";

const rootReducer = combineReducers({
   authReducer,
   faqReducer
  });

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));


