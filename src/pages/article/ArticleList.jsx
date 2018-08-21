import React from "react";
import axios from "axios";
import { Row, Col, Card, Pagination } from "antd";
import { Link } from "react-router-dom";

class ArticleList extends React.Component {
  state = {
    params: {
      page: 1,
      pageSize: 6
    },
    list: [],
    total: 0
  };
  componentWillMount() {
    this.geArticleList();
  }
  async geArticleList() {
    const params = { ...this.state.params };
    console.log(params);
    const res = await axios.get("/article", { params });
    if (res.code === 1000) {
      const { list, total } = res.data;
      this.setState({
        total,
        list
      });
    } else {
    }
  }
  changeListPage = page => {
    const { params } = this.state;
    params.page = page;
    this.setState({
      params
    });
    this.geArticleList();
  };
  render() {
    const { params, total, list } = this.state;
    const articleList = [];
    for (let item of list) {
      const contentDom = document.createElement("div");
      contentDom.innerHTML = item.content;
      let prevContent = contentDom.textContent;
      prevContent = prevContent.substring(0, 200) + "……";
      articleList.push(
        <Col span={8} style={{ margin: "10px 0" }} key={item.id}>
          <Link to={`/app/article/ArticleDetail/${item.id}`}>
            <Card
              title={item.title}
              bordered={false}
              bodyStyle={{ height: "200px" }}
            >
              {prevContent}
            </Card>
          </Link>
        </Col>
      );
    }
    return (
      <div>
        <div
          style={{
            background: "#ECECEC",
            padding: "20px 30px",
            marginBottom: "20px",
            height: "586px"
          }}
        >
          <Row gutter={16}>{articleList}</Row>
        </div>
        <Pagination
          showQuickJumper
          current={params.page}
          pageSize={params.pageSize}
          total={total}
          onChange={this.changeListPage}
        />
      </div>
    );
  }
}

export default ArticleList;
