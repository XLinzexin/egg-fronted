import React from "react";
import { Form, Icon, Input, Button } from "antd";
import bindModel from "../../utils/bindModel";
import axios from "axios";

const FormItem = Form.Item;

class Register extends React.Component {
  handleSubmit = () => {
    const { formData } = this.props;
    console.log(formData);
    const { name, password } = formData;
    axios.post("/user", { name, password }).then(res => {
      if (res.code == 1000) {
        this.props.history.push("/login");
      }
    });
  };
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="login">
        <div className="login-form">
          <div className="login-logo">
            <span>注册</span>
          </div>
          <Form onSubmit={this.handleSubmit} style={{ maxWidth: "300px" }}>
            <FormItem>
              <Input
                placeholder="请输入用户名"
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                {...getFieldProps(`name`, {
                  rules: [
                    {
                      required: true,
                      message: ""
                    }
                  ]
                })}
              />
            </FormItem>
            <FormItem>
              <Input
                placeholder="请输入密码"
                type="password"
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                {...getFieldProps(`password`, {
                  rules: [
                    {
                      required: true,
                      message: ""
                    }
                  ]
                })}
              />
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
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
export default bindModel(Register, "formData");
