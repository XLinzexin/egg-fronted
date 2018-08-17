import { type, adminType } from './type';
import axios from 'axios';

const requestData = category => ({
    type: type.REQUEST_DATA,
    category
});
export const receiveData = (data, category) => ({
    type: type.RECEIVE_DATA,
    data,
    category
});
/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 */
export const fetchData = ({funcName, params, stateName}) => dispatch => {
    !stateName && (stateName = funcName);
    dispatch(requestData(stateName));
    // return http[funcName](params).then(res => dispatch(receiveData(res, stateName)));
};

export const getAdminInfo = (funcName,stateName) => dispatch =>{
    !stateName && (stateName = funcName);
    dispatch(requestData(stateName));
    return axios.get('/user').then((res)=>{
        dispatch(receiveData(res, stateName))
    })
}

export const adminAction = {
    set(data){
        return {
            type:"SET_ADMIN_INFO",
            data
        }
    },
    clear(){
        return {
            type:"CLEAR_ADMIN_INFO"
        }
    }
}



export const formFilterAction = {
    set(data){
        return {
            type:"SET_FORMFILTER_INFO",
            data
        }
    },
    clear(){
        return {
            type:"CLEAR_FORMFILTER_INFO"
        }
    }
}
export const formDataAction = {
    set(data){
        return {
            type:"SET_FORMDATA_INFO",
            data
        }
    },
    clear(){
        return {
            type:"CLEAR_FORMDATA_INFO"
        }
    }
}

