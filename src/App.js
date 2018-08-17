import React, { Component } from 'react';
import { Layout, notification, Icon } from 'antd';
import './style/index.less';
import SiderCustom from './layout/SiderCustom';
import HeaderCustom from './layout/HeaderCustom';
import { receiveData,getAdminInfo } from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from './routes';
import axios from 'axios';
const { Content, Footer } = Layout;

class App extends Component {
    state = {
        collapsed: false,
    };
    componentWillMount() {
        // const { receiveData } = this.props;
        this.getClientWidth();
        this.getUrlKey();
        window.onresize = () => {
            console.log('屏幕变化了');
            this.getClientWidth();
            // console.log(document.body.clientWidth);
        }
    }
    componentDidMount() {
    }
    getUrlKey(){
    }
    getClientWidth = () => {    // 获取当前浏览器宽度并设置responsive管理响应式
        const { receiveData } = this.props;
        const clientWidth = document.body.clientWidth;
        receiveData({isMobile: clientWidth <= 992}, 'responsive');
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        const { responsive,admin } = this.props;
        return (
            <Layout>
                {!responsive.data.isMobile && <SiderCustom collapsed={this.state.collapsed} />}
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={admin.data || {}} />
                    <Content style={{ margin: '0 16px', overflow: 'initial' }}>
                        <Routes admin={admin} />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                    </Footer>
                </Layout>
                
                {
                    responsive.data.isMobile && (   // 手机端对滚动很慢的处理
                        <style>
                        {`
                            #root{
                                height: auto;
                            }
                            #nprogress .spinner{
                                left: ${this.state.collapsed ? '70px' : '206px'};
                                right: 0 !important;
                            }
                            #menun .ant-menu-inline{
                                border:0;
                            }
                        `}
                        </style>
                    )
                }
            </Layout>
        );
    }
}

const mapStateToProps = store => {
    const { responsive = {data: {}} } = store.httpData;
    const  {admin,urlsKey} = store;
    return {admin,responsive,urlsKey};
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch),
    setStore: bindActionCreators((data) => data, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);