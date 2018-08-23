import React, { Component } from "react";
import { Layout } from "antd";
import "./style/index.less";
import SiderCustom from "./layout/SiderCustom";
import HeaderCustom from "./layout/HeaderCustom";
import { globalDataAction } from "./action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Routes from "./routes";
const { Content } = Layout;

class App extends Component {
  state = {
    collapsed: false
  };
  componentWillMount() {
    this.getClientWidth();
    this.getUrlKey();
    window.onresize = () => {
      console.log("屏幕变化了");
      this.getClientWidth();
    };
  }
  componentDidMount() {}
  getUrlKey() {}
  getClientWidth = () => {
    // 获取当前浏览器宽度并设置responsive管理响应式
    const { setStore, globalData } = this.props;
    const clientWidth = document.body.clientWidth;
    console.log(globalData);
    globalData.isMobile = clientWidth <= 992;
    setStore(globalDataAction.set(globalData));
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    const { globalData, admin } = this.props;
    return (
      <Layout>
        {!globalData.isMobile && (
          <SiderCustom collapsed={this.state.collapsed} />
        )}
        <Layout style={{ flexDirection: "column", minHeight: "100vh" }}>
          <HeaderCustom
            toggle={this.toggle}
            collapsed={this.state.collapsed}
            user={admin.data || {}}
          />
          <Content
            style={{
              padding: "20px",
              overflow: "initial",
              position: "relative"
            }}
          >
            <Routes admin={admin} />
          </Content>
        </Layout>

        {globalData.isMobile && ( // 手机端对滚动很慢的处理
          <style>
            {`
              #root{
                height: auto;
              }
              #nprogress .spinner{
                left: ${this.state.collapsed ? "70px" : "206px"};
                right: 0 !important;
              }
              #menun .ant-menu-inline{
                border:0;
              }
            `}
          </style>
        )}
      </Layout>
    );
  }
}

const mapStateToProps = store => {
  const { admin, globalData } = store;
  return { admin, globalData };
};
const mapDispatchToProps = dispatch => ({
  setStore: bindActionCreators(data => data, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
