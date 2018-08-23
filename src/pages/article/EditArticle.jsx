import React from "react";
import { Input, Form, Button, Icon, message, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
// import { Form, Icon, Input, Button, Checkbox } from "antd";
import Editor from "../../component/Editor";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const FormItem = Form.Item;

class EditArticle extends React.Component {
  constructor() {
    super();
  }
  state = {
    content: ``,
    articleId: null
  };
  componentWillMount() {
    const { articleId } = window.location.query();
    if (articleId) {
      this.setState({
        articleId
      });
      this.getArticleDetail();
    }
  }
  async getArticleDetail() {
    const { articleId } = window.location.query();
    if (articleId) {
      const res = await axios.get(`/article/${articleId}/content`);
      if (res.code === 1000) {
        const { content, title } = res.data;
        this.setState({
          content
        });
        this.props.form.setFieldsValue({
          title
        });
      }
    }
  }
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
          const { articleId } = window.location.query();
          if (articleId) {
            axios
              .put(`/article/${articleId}/content`, { title, content })
              .then(res => {
                if (res.code == 1000) {
                  message.success(res.msg);
                  this.props.history.replace(
                    `/app/article/ArticleDetail/${articleId}`
                  );
                }
              });
          } else {
            axios.post("/article", { title, content }).then(res => {
              if (res.code == 1000) {
                message.success("发布成功！");
                this.props.history.replace(
                  `/app/article/ArticleDetail/${res.data}`
                );
              }
            });
          }
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { content, articleId } = this.state;
    return (
      <div className="edit-article">
        <header>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/app/article/ArticleList">文章列表</Link>
            </Breadcrumb.Item>
            {articleId ? (
              <Breadcrumb.Item>
                <Link to={`/app/article/ArticleDetail/${articleId}`}>
                  文章详情
                </Link>
              </Breadcrumb.Item>
            ) : (
              ""
            )}
            <Breadcrumb.Item>
              {articleId ? "编辑文章" : "新建文章"}
            </Breadcrumb.Item>
          </Breadcrumb>
        </header>
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
              {articleId ? "修改" : "发布"}
            </Button>
          </FormItem>
        </Form>
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
