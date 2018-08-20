import { createForm, createFormField } from "rc-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { formDataAction } from "../action";

export default function(Component, storeArray) {
  const mapStateToProps = store => {
    const obj = {};
    storeArray.forEach(item => {
      obj[item] = store[item];
    });
    return obj;
  };
  const mapDispatchToProps = dispatch => ({
    //把 dispatch 绑定到方法中，隐式调用
    setStore: bindActionCreators(data => data, dispatch)
  });
  const model = connect(
    mapStateToProps,
    mapDispatchToProps
  );
  const mapPropsToFields = props => {
    let { formData } = props;
    let obj = {};
    for (let k in formData) {
      let item = formData[k];
      obj[k] = createFormField({
        value: item
      });
    }
    return obj;
  };
  const onFieldsChange = (props, fields) => {
    let { setStore, formData } = props;
    for (let k in fields) {
      let item = fields[k];
      formData[k] = item.value;
    }
    setStore(formDataAction.set(formData));
  };

  const form = createForm({ mapPropsToFields, onFieldsChange });

  const componentWillUnmount = Component.prototype.componentWillUnmount;
  if (componentWillUnmount) {
    Component.prototype.componentWillUnmount = function() {
      const { setStore } = this.props;
      setStore(formDataAction.clear());
      componentWillUnmount.bind(this)();
    };
  } else {
    Component.prototype.componentWillUnmount = function() {
      const { setStore } = this.props;
      setStore(formDataAction.clear());
    };
  }
  return model(form(Component));
}
