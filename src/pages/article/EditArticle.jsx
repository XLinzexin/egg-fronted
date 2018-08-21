import React from "react";
import { Input, Form, Button, Icon, message } from "antd";
// import { Form, Icon, Input, Button, Checkbox } from "antd";
import Editor from "../../common/Editor";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const FormItem = Form.Item;

class EditArticle extends React.Component {
  state = {
    content: ``
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { editor } = this.props;
        const content = editor.content;
        const { title } = values;
        if (!content) {
          message.warning("请输入文章内容");
        } else {
          axios.post("/article", { title, content }).then(res => {
            if (res.code == 1000) {
            }
          });
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { content } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="section-form">
          <FormItem className="section-form-item">
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "请输入文章标题!" }]
            })(
              <Input
                size="large"
                prefix={<Icon type="" style={{ fontSize: 13 }} />}
                placeholder="文章标题"
              />
            )}
          </FormItem>
          <FormItem>
            <Editor content={content} />
          </FormItem>

          <FormItem className="section-form-item">
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </FormItem>
        </Form>

        <style>{``}</style>
      </div>
    );
  }
}

const mapStateToProps = store => {
  const { editor } = store;
  return { editor };
};
const mapDispatchToProps = dispatch => ({
  setStore: bindActionCreators(data => data, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(EditArticle));
