import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import NotFound from "./pages/others/NotFound";
import Login from "./pages/others/Login";
import Register from "./pages/others/Register";
import App from "./App";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { adminAction } from "./action";
import "./utils/tools";

class Page extends Component {
  componentWillMount() {
    const { setStore } = this.props;
    const admin = window.localStorage.getItem("admin");
    if (admin) {
      setStore(adminAction.set(JSON.parse(admin)));
    }
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/app/home/index" push />}
          />
          <Route path="/app" component={App} />
          <Route path="/404" component={NotFound} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = store => {
  return {
    admin: store.admin
  };
};
const mapDispatchToProps = dispatch => ({
  //把 dispatch 绑定到方法中，隐式调用
  setStore: bindActionCreators(data => data, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
