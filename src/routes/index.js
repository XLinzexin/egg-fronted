import React, { Component } from "react";
// import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
// import { browserHistory } from 'react-router'
import Home from "../components/home/index";
// import Convenient from '../components/advertising/Convenient';
// import Dofu from '../components/advertising/Dofu';

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
          {/* <Route exact path="/app/advertising/Convenient" component={Convenient} />
                    <Route exact path="/app/advertising/Dofu" component={Dofu} /> */}
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
