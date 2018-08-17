import { combineReducers } from 'redux';
import { type, adminType, panesType, urlsKeyType, formDataType, formFilterType } from '../action/type';
const handleData = (state = { isFetching: true, data: {} }, action) => {
    switch (action.type) {
        case type.REQUEST_DATA:
            return { ...state, isFetching: true };
        case type.RECEIVE_DATA:
            return { ...state, isFetching: false, data: action.data };
        default:
            return { ...state };
    }
};
const httpData = (state = {}, action) => {
    switch (action.type) {
        case type.RECEIVE_DATA:
        case type.REQUEST_DATA:
            return {
                ...state,
                [action.category]: handleData(state[action.category], action)
            };
        default:
            return { ...state };
    }
};

const admin = (state = {
    login:false
}, action) => {
    switch (action.type) {
        case adminType.SET_ADMIN_INFO:
            return { ...state ,...action.data };
        case adminType.CLEAR_ADMIN_INFO:
            return { ...state };
        default:
            return { ...state };
    }
}




const panes = (state = {}, action) => {
    switch (action.type) {
        case panesType.INIT_PANES_INFO:
            return [...action.data] || [];
        case panesType.SET_PANES_INFO:
            state[action.index] = action.data
            return [...state];
        case panesType.CLEAR_PANES_INFO:
            return [];
        default:
            return [...state];
    }
}

const urlsKey = (state = {}, action) => {
    switch (action.type) {
        case urlsKeyType.INIT_URLSKEY_INFO:
            return [...action.data] || [];
        case urlsKeyType.SET_URLSKEY_INFO:
            state[action.index] = action.data
            return [...state];
        case urlsKeyType.CLEAR_URLSKEY_INFO:
            return [];
        default:
            return [...state];
    }
}

const formData = (state={},action) => {
    switch (action.type) {
        case formDataType.SET_FORMDATA_INFO:
            return {...action.data} || {...state};
        case formDataType.CLEAR_FORMDATA_INFO:
            return {};
        default:
            return {...state};
    }
}

const formFilter = (state={},action) =>{
    switch (action.type) {
        case formFilterType.SET_FORMFILTER_INFO:
            return {...action.data} || {...state};
        case formFilterType.CLEAR_FORMFILTER_INFO:
            return {};
        default:
            return {...state};
    }
}
export default combineReducers({
    httpData,
    admin,
    panes,
    urlsKey,
    formData,
    formFilter
});
