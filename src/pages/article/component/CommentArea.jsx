import React from "react";
import { List, Avatar, Button, Spin } from "antd";

class CommentArea extends React.Component {
  state = {
    comment: []
  };
  componentWillMount() {
    const { comment } = this.props;
    this.setState(comment);
  }
  render() {
    const { comment } = this.props;
    const commentList = [];
    return (
      <div>
        <List
          // loading={loading}
          itemLayout="horizontal"
          // loadMore={loadMore}
          locale={{ emptyText: "暂无评论" }}
          dataSource={comment}
          renderItem={item => (
            <div className="comment-item">
              <List.Item actions={[<a>回复</a>, <a>赞</a>]}>
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
                    <List.Item actions={[<a>回复</a>, <a>赞</a>]}>
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
          .comment-item{
            border-top:1px solid #e8e8e8;
          }
          .comment-item:last-child{
            border-bottom:1px solid #e8e8e8;
          }
          .dialogue-item{
            padding:0 30px;
          }
        `}</style>
      </div>
    );
  }
}

export default CommentArea;
