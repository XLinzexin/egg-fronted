import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";

const { TextArea } = Input;

const FormItem = Form.Item;

class CommentForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const { form, onCommentFinish } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { articleId } = this.props;
        const { comment } = values;
        axios.post(`/article/${articleId}/comment`, { comment }).then(res => {
          if (res.code == 1000) {
            onCommentFinish();
            message.success("发布成功！");
          } else {
            message.error(res.msg);
          }
        });
      }
    });
  };
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 10 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label={<span>评论内容:</span>}>
          {getFieldDecorator("comment", {
            rules: [
              { required: true, message: "请输入评论内容", whitespace: true }
            ]
          })(<TextArea rows={4} placeholder="评论内容" />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            留爪
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(CommentForm);
