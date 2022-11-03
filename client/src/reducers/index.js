import { combineReducers } from "redux";
import shipments from "./shipments";
import account from "./account";

export default combineReducers({
  shipments,
  account,
});
