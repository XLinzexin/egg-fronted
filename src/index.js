import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import thunk from "redux-thunk"; //dispatch处理异步action时可以当作同步处理
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import { AppContainer } from "react-hot-loader";
import Page from "./Page";

import "./index.less";
import "./utils/axios";

// redux 注入操作
const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));

const render = Component => {
  // 增加react-hot-loader保持状态刷新操作，如果不需要可去掉并把下面注释的打开
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component store={store} />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

render(Page);

if (module.hot) {
  const orgError = console.error; // eslint-disable-line no-console
  console.error = (...args) => {
    // eslint-disable-line no-console
    if (
      args &&
      args.length === 1 &&
      typeof args[0] === "string" &&
      args[0].indexOf("You cannot change <Router routes>;") > -1
    ) {
      // React route changed
    } else {
      // Log the error as normally
      orgError.apply(console, args);
    }
  };
  module.hot.accept("./Page", () => {
    render(Page);
  });
}

registerServiceWorker();
