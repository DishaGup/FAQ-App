import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import authReducer  from "./auth/authReducer";
import faqReducer from "./faq/faqReducer";
import adminReducer from "./admin/adminReducer";
const rootReducer = combineReducers({
   authReducer,
   faqReducer,
   adminReducer
  });

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));


