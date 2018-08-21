import { combineReducers } from "redux";
import {
  globalDataType,
  adminType,
  formDataType,
  formFilterType,
  editorType
} from "../action/type";

const globalData = (state = {}, action) => {
  switch (action.type) {
    case globalDataType.SET_GLOBALDATA_INFO:
      return { ...action.data } || { ...state };
    case globalDataType.CLEAR_GLOBALDATA_INFO:
      return {};
    default:
      return { ...state };
  }
};

const admin = (
  state = {
    login: false
  },
  action
) => {
  switch (action.type) {
    case adminType.SET_ADMIN_INFO:
      return { ...state, ...action.data };
    case adminType.CLEAR_ADMIN_INFO:
      return { ...state };
    default:
      return { ...state };
  }
};

const formData = (state = {}, action) => {
  switch (action.type) {
    case formDataType.SET_FORMDATA_INFO:
      return { ...action.data } || { ...state };
    case formDataType.CLEAR_FORMDATA_INFO:
      return {};
    default:
      return { ...state };
  }
};

const formFilter = (state = {}, action) => {
  switch (action.type) {
    case formFilterType.SET_FORMFILTER_INFO:
      return { ...action.data } || { ...state };
    case formFilterType.CLEAR_FORMFILTER_INFO:
      return {};
    default:
      return { ...state };
  }
};

const editor = (state = {}, action) => {
  switch (action.type) {
    case editorType.SET_EDITOR_INFO:
      return { ...action.data } || { ...state };
    case editorType.CLEAR_EDITOR_INFO:
      return {};
    default:
      return { ...state };
  }
};

export default combineReducers({
  globalData,
  admin,
  formData,
  formFilter,
  editor
});
