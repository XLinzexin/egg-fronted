import React from "react";
import { Input } from "antd";
import Editor from "../../common/Editor";
import { formDataAction } from "../../action";
import bindModel from "../../utils/bindModel";

class EditArticle extends React.Component {
  componentWillMount() {}
  componentWillReceiveProps(nextProps) {}
  render() {
    return (
      <div>
        <div className="section-form">
          <div className="section-form-item">
            <Input size="large" placeholder="文章标题" />
          </div>
          <div className="section-form-item">
            <Editor />
          </div>
        </div>

        <style>{``}</style>
      </div>
    );
  }
}

export default bindModel(EditArticle, ["editor", "formData"]);
