import React from "react";
import axios from "axios";
import { Button, Modal } from "antd";
import CommentForm from "./CommentForm";

class ArticleDetail extends React.Component {
  state = {
    title: "",
    content: "",
    showModal: false
  };
  componentWillMount() {
    this.getArticleDetail();
  }
  getArticleDetail = async () => {
    const { id } = this.props.match.params;
    const res = await axios.get(`/article/${id}`);
    if (res.code === 1000) {
      const { title, content } = res.data;
      this.setState({
        title,
        content
      });
    }
  };
  changeModal = status => {
    this.setState({
      showModal: status
    });
  };
  render() {
    const { title, content, showModal } = this.state;
    const articleId = this.props.match.params.id;
    return (
      <section className="article">
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
