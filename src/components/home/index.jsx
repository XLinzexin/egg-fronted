import React, { Component } from "react";
import axios from "axios";
class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {};
  componentWillMount() {
    axios.get(`/user`).then(res => {
      console.log(res);
    });
  }
  render() {
    return <div />;
  }
}

export default Home;
