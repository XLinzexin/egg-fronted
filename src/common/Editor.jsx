import React from "react";
import LzEditor from "react-lz-editor";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { editorAction } from "../action";
class Editor extends React.Component {
  state = {
    responseList: []
  };
  receiveHtml = content => {
    const { editor, setStore } = this.props;
    editor.content = content;
    setStore(editorAction.set(editor));
  };
  componentWillUnmount() {
    const { setStore } = this.props;
    setStore(editorAction.clear());
  }
  render() {
    const { content } = this.props;
    const uploadProps = {
      action: "http://v0.api.upyun.com/devopee",
      onChange: this.onChange,
      listType: "picture",
      fileList: this.state.responseList,
      data: file => {},
      multiple: true,
      beforeUpload: this.beforeUpload,
      showUploadList: true
    };
    return (
      <div>
        <LzEditor
          active={true}
          importContent={content}
          cbReceiver={this.receiveHtml}
          uploadProps={uploadProps}
          lang="cn"
        />
        <br />
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
)(Editor);
