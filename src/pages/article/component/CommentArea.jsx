import React from "react";
import axios from "axios";
import { List, Avatar, Button, Spin } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class CommentArea extends React.Component {
  state = {
    comment: []
  };
  componentWillMount() {
    const { comment } = this.props;
    this.setState(comment);
  }
  createDialogue() {}
  deleteComment = async id => {
    // const await axios.delete
  };
  render() {
    const { comment, admin } = this.props;
    console.log(admin);
    return (
      <div className="comment-area">
        <List
          // loading={loading}
          itemLayout="horizontal"
          // loadMore={loadMore}
          locale={{ emptyText: "暂无评论" }}
          dataSource={comment}
          renderItem={item => (
            <div className="comment-item">
              <List.Item
                actions={(() => {
                  const actions = [<a>回复</a>];
                  if (item.userId === admin.id) {
                    actions.push(
                      <a
                        onClick={() => {
                          this.deleteComment(item.id);
                        }}
                      >
                        删除
                      </a>
                    );
                  }
                  return actions;
                })()}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        color: "#ffffff",
                        backgroundColor: "#f56a00"
                      }}
                    >
                      U
                    </Avatar>
                  }
                />
                <div>{item.comment}</div>
              </List.Item>
              <div className="dialogue-item">
                <List
                  itemLayout="horizontal"
                  dataSource={item.dialogue}
                  locale={{ emptyText: "暂无回复" }}
                  renderItem={it => (
                    <List.Item actions={[<a>回复</a>, <a>删除</a>]}>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            style={{
                              color: "#f56a00",
                              backgroundColor: "#fde3cf"
                            }}
                          >
                            U
                          </Avatar>
                        }
                      />
                      <div>{it.dialogue}</div>
                    </List.Item>
                  )}
                />
              </div>
            </div>
          )}
        />
        <style>{`
          .comment-area .comment-item{
            border-top:1px solid #e8e8e8;
          }
          .comment-area .comment-item:last-child{
            border-bottom:1px solid #e8e8e8;
          }
          .comment-area .dialogue-item{
            padding:0 30px;
          }
        `}</style>
      </div>
    );
  }
}

// export default CommentArea;

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
)(CommentArea);
