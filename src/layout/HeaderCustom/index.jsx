import React, { Component } from "react";
import { Menu, Icon, Layout, Popover } from "antd";
import screenfull from "screenfull";
// import { gitOauthToken, gitOauthInfo } from '../../utils/axios';
import { queryString } from "../../utils";
import avater from "../../style/imgs/avater.jpg";
import SiderCustom from "../SiderCustom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {
  state = {
    user: "",
    visible: false
  };
  componentDidMount() {
    const QueryString = queryString();
    const _user = JSON.parse(localStorage.getItem("user")) || "测试";
    if (!_user && QueryString.hasOwnProperty("code")) {
    } else {
      this.setState({
        user: _user
      });
    }
  }
  screenFull = () => {
    if (screenfull.enabled) {
      screenfull.request();
    }
  };
  menuClick = e => {
    e.key === "logout" && this.logout();
  };
  logout = () => {
    localStorage.removeItem("user");
    this.props.history.push("/login");
  };
  popoverHide = () => {
    this.setState({
      visible: false
    });
  };
  handleVisibleChange = visible => {
    this.setState({ visible });
  };
  render() {
    const { globalData, path } = this.props;
    return (
      <Header
        style={{ background: "#fff", padding: 0, height: 65 }}
        className="custom-theme"
      >
        {globalData.isMobile ? (
          <Popover
            content={<SiderCustom path={path} popoverHide={this.popoverHide} />}
            trigger="click"
            placement="bottomLeft"
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}
          >
            <span style={{ padding: "20px" }} onClick={this.props.toggle}>
              <Icon type="bars" className="trigger custom-trigger" />
            </span>
          </Popover>
        ) : (
          <span style={{ padding: "20px" }} onClick={this.props.toggle}>
            <Icon
              className="trigger custom-trigger"
              type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
            />
          </span>
        )}
        <Menu
          mode="horizontal"
          style={{
            lineHeight: "64px",
            float: "right",
            background: "#fff",
            borderBottom: "1px solid #ddd"
          }}
          onClick={this.menuClick}
        >
          <Menu.Item key="full" onClick={this.screenFull}>
            <Icon type="arrows-alt" onClick={this.screenFull} />
          </Menu.Item>
          <SubMenu
            title={
              <span className="avatar">
                <img src={avater} alt="头像" className="avaterImg" />
                <i className="on bottom b-white" />
              </span>
            }
          >
            <MenuItemGroup title="用户中心">
              <Menu.Item key="setting:1">
                你好 - {this.props.user.userName}
              </Menu.Item>
              <Menu.Item key="setting:2">个人信息</Menu.Item>
              <Menu.Item key="logout">
                <span onClick={this.logout}>退出登录</span>
              </Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup title="设置中心">
              <Menu.Item key="setting:3">个人设置</Menu.Item>
              <Menu.Item key="setting:4">系统设置</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
      </Header>
    );
  }
}

const mapStateToProps = store => {
  const { globalData } = store;
  return { globalData };
};

export default withRouter(connect(mapStateToProps)(HeaderCustom));
