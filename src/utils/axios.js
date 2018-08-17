import axios from "axios";
import qs from "qs";
import tools from "./tools";
if (process.env.NODE_ENV === "development") {
  window.baseURL = axios.defaults.baseURL = `http://localhost:3003/app-admin`; //测试地址
} else {
  // axios.defaults.baseURL ="http://api.lexj.com/";   //正式地址
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
    let sessionId = sessionStorage.getItem("sessionId");
    if (sessionId) {
      config.headers.sessionId = sessionId;
    }
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      let contentType = config.headers["Content-Type"];
      if (contentType) {
        if (contentType.indexOf("text/plain") >= 0) {
          config.data = JSON.stringify(config.data);
        }
      } else {
        config.data = JSON.stringify(config.data);
      }
      console.log(contentType);
    }
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
    if (res.code == 10002) {
      window.location.replace("#/login");
    }
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
