import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { createForm, createFormField, formShape } from "rc-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAdminInfo, adminAction, formDataAction } from "../../action";
import axios from "axios";

const FormItem = Form.Item;

class Register extends React.Component {
  componentWillMount() {}
  componentWillReceiveProps(nextProps) {}
  handleSubmit = e => {
    const { formData, setStore, admin } = this.props;
    console.log(formData);
    const { name, password } = formData;
    axios.post("/user", { name, password }).then(res => {
      if (res.code == 1000) {
        window.location.replace("#/login");
      }
    });
  };
  componentWillUnmount() {
    const { setStore } = this.props;
    setStore(formDataAction.clear());
  }
  render() {
    const { getFieldDecorator, getFieldProps, getFieldError } = this.props.form;
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

const mapStateToProps = store => {
  return {
    formData: store.formData,
    admin: store.admin
  };
};
const mapDispatchToProps = dispatch => ({
  //把 dispatch 绑定到方法中，隐式调用
  setStore: bindActionCreators(data => data, dispatch)
});

const mapPropsToFields = props => {
  let { formData } = props;
  let obj = {};
  for (let k in formData) {
    let item = formData[k];
    obj[k] = createFormField({
      value: item
    });
  }
  return obj;
};
const onFieldsChange = (props, fields) => {
  let { setStore, formData } = props;
  for (let k in fields) {
    let item = fields[k];
    formData[k] = item.value;
  }
  setStore(formDataAction.set(formData));
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm({ mapPropsToFields, onFieldsChange })(Register));