import React, { Component } from "react";
// import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
// import { browserHistory } from 'react-router'
import Home from "../pages/home/index";
import EditArticle from "../pages/article/EditArticle";
import ArticleList from "../pages/article/ArticleList";
import ArticleDetail from "../pages/article/ArticleDetail";
// import Convenient from '../pages/advertising/Convenient';
// import Dofu from '../pages/advertising/Dofu';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
class Empty extends Component {
  render() {
    return <div />;
  }
}
class CRouter extends Component {
  requireAuth = component => {
    const { admin } = this.props;
    if (admin.login) {
      return component;
    } else {
      return component;
      // this.props.history.push("/login");
      // return Empty;
    }
  };
  render() {
    const { admin } = this.props;
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/app/home/index"
            component={this.requireAuth(Home)}
          />
          <Route
            exact
            path="/app/article/EditArticle"
            component={this.requireAuth(EditArticle)}
          />
          <Route
            exact
            path="/app/article/ArticleList"
            component={this.requireAuth(ArticleList)}
          />
          <Route
            exact
            path="/app/article/ArticleDetail/:id"
            component={this.requireAuth(ArticleDetail)}
          />
          <Route render={() => <Redirect to="/404" />} />
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
)(CRouter);
