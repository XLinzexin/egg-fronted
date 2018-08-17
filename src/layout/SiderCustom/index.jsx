import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import { menus } from './menus';
import SiderMenu from './SiderMenu';

const { Sider } = Layout;

class SiderCustom extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
        openKey: '',
        selectedKey: '',
        firstHide: true,        // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
    };
    componentDidMount() {
        this.setMenuOpen(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.onCollapse(nextProps.collapsed);
        this.setMenuOpen(nextProps)
    }
    setMenuOpen = props => {
        const { pathname } = props.location;
        this.setState({
            openKey: pathname.substr(0, pathname.lastIndexOf('/')),
            selectedKey: pathname
        });
    };
    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    };
    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
        const { popoverHide } = this.props;     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    };
    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };
    render() {
        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsed={this.props.collapsed}
                style={{ overflow: 'hidden', borderRight: "1px solid #ddd" }}
            >
                <div id="menun">
                    <div className="logo" />
                    <SiderMenu
                        menus={menus}
                        onClick={this.menuClick}
                        theme="light"
                        mode="inline"
                        selectedKeys={[this.state.selectedKey]}
                        openKeys={this.state.firstHide ? null : [this.state.openKey]}
                        onOpenChange={this.openMenu}
                    />
                </div>
            </Sider>
        )
    }
}

export default withRouter(SiderCustom);