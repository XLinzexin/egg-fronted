import React from "react";
import axios from "axios";
import { Button, Modal, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import CommentForm from "./component/CommentForm";
import CommentArea from "./component/CommentArea";

class ArticleDetail extends React.Component {
  state = {
    title: "",
    content: "",
    showModal: false,
    comment: []
  };
  componentWillMount() {
    this.getArticleDetail();
  }
  getArticleDetail = async () => {
    const { id } = this.props.match.params;
    const res = await axios.get(`/article/${id}`);
    if (res.code === 1000) {
      const { title, content, comment } = res.data;
      this.setState({
        title,
        content,
        comment
      });
    }
  };
  changeModal = status => {
    this.setState({
      showModal: status
    });
  };
  render() {
    const { title, content, comment, showModal } = this.state;
    const articleId = this.props.match.params.id;
    return (
      <section className="article">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/app/article/ArticleList">文章列表</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>文章详情</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{title}</h1>
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
        <style>
          {`
            .article{
            }
            .comment-wrapper{
              width:100%;
              margin-top:30px;
            }
            .go-comment{
              text-align:center;
              background:#f4f4f4;
              padding:20px 0;
            }
          `}
        </style>
      </section>
    );
  }
}

export default ArticleDetail;
