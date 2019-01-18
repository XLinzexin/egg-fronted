import React from "react";
import { Form, Icon, Input, Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";

const FormItem = Form.Item;

class Register extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { name, password } = values;
        axios.post("/user", { name, password }).then(res => {
          if (res.code == 1000) {
            this.props.history.push("/login");
          }
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <div className="login-form">
          <div className="login-logo">
            <span>注册</span>
          </div>
          <Form
            onSubmit={this.handleSubmit}
            className="section-form"
            style={{ maxWidth: "300px" }}
          >
            <FormItem className="section-form-item">
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "请输入账号!" }]
              })(
                <Input
                  prefix={<Icon type="name" style={{ fontSize: 13 }} />}
                  placeholder="账号"
                />
              )}
            </FormItem>
            <FormItem className="section-form-item">
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码!" }]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                注册
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
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
)(Form.create()(Register));
