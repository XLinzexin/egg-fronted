import React from "react";
import axios from "axios";
import { Button, Modal, Breadcrumb, message, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import CommentForm from "./component/CommentForm";
import CommentArea from "./component/CommentArea";

class ArticleDetail extends React.Component {
  state = {
    title: "",
    content: "",
    showModal: false,
    comment: [],
    isOwner: false
  };
  componentWillMount() {
    this.getArticleDetail();
  }
  getArticleDetail = async () => {
    const { id } = this.props.match.params;
    const res = await axios.get(`/article/${id}`);
    if (res.code === 1000) {
      const { title, content, comment, isOwner } = res.data;
      this.setState({
        title,
        content,
        comment,
        isOwner
      });
    }
  };
  changeModal = status => {
    this.setState({
      showModal: status
    });
  };
  deleteArticle = async () => {
    const { id } = this.props.match.params;
    const res = await axios.delete(`/article/${id}`);
    if (res.code === 1000) {
      message.success("删除成功！");
      this.props.history.replace("/app/article/ArticleList");
    } else {
      message.success("删除失败！");
    }
  };
  render() {
    const { title, content, comment, showModal, isOwner } = this.state;
    const articleId = this.props.match.params.id;
    return (
      <div className="article-detail">
        <header>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/app/article/ArticleList">文章列表</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>文章详情</Breadcrumb.Item>
          </Breadcrumb>
        </header>
        <article>
          <h1 className="topper">
            <div>{title}</div>
            <div className="action">
              {isOwner ? (
                <div>
                  <Link
                    to={{
                      pathname: "/app/article/EditArticle",
                      search: `?articleId=${articleId}`
                    }}
                  >
                    <Button type="primary">编辑</Button>
                  </Link>

                  <Popconfirm
                    placement="bottomRight"
                    title="确认删除该文章吗？"
                    onConfirm={this.deleteArticle}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button type="danger">删除</Button>
                  </Popconfirm>
                </div>
              ) : (
                ""
              )}
            </div>
          </h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <div className="comment-wrapper">
            <div className="go-comment">
              <Button
                onClick={() => {
                  this.changeModal(true);
                }}
              >
                到此一游
              </Button>
            </div>
            {comment.length > 0 ? (
              <CommentArea comment={comment} />
            ) : (
              <CommentArea comment={[]} />
            )}
          </div>
        </article>
        <Modal
          title="评论"
          visible={showModal}
          onCancel={() => {
            this.changeModal(false);
          }}
          destroyOnClose
          footer={null}
        >
          {showModal ? (
            <CommentForm articleId={articleId} onCommentFinish={() => {}} />
          ) : (
            ""
          )}
        </Modal>
        <style>{`
          .article-detail article{
            position: relative;
          }
          .article-detail .topper{
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .article-detail .action{
          }
          .article-detail .action button{
            margin-right:10px;
          }
          .article-detail .comment-wrapper{
            width:100%;
            margin-top:30px;
          }
          .article-detail .go-comment{
            text-align:center;
            background:#f4f4f4;
            padding:20px 0;
          }
        `}</style>
      </div>
    );
  }
}

export default ArticleDetail;
