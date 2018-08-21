import axios from "axios";
import { message } from "antd";
if (process.env.NODE_ENV === "development") {
  window.baseURL = axios.defaults.baseURL = `http://localhost:3003/app-admin`; //测试地址
} else {
  window.baseURL = axios.defaults.baseURL = ``; //正式地址
}
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers.delete["Content-Type"] =
  "application/json;charset=UTF-8";
axios.defaults.headers.put["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.withCredentials = true;

//(添加请求拦截器)F
axios.interceptors.request.use(
  config => {
    //在发送请求之前做某件事
    // let sessionId = sessionStorage.getItem("sessionId");
    // if (sessionId) {
    //   config.headers.sessionId = sessionId;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  response => {
    let res = response.data;
    if (res.code === 1002) {
      window.location.replace("#/login");
    } else if (res.code === 1001) {
      message.error(res.msg);
    }
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
