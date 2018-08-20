import { createForm, createFormField } from "rc-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { formDataAction } from "../action";

const mapStateToProps = store => {
  return {
    formData: store.formData,
    admin: store.admin
  };
};
const mapDispatchToProps = dispatch => ({
  //把 dispatch 绑定到方法中，隐式调用
  setStore: bindActionCreators(data => data, dispatch)
});

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

const model = connect(
  mapStateToProps,
  mapDispatchToProps
);
const form = createForm({ mapPropsToFields, onFieldsChange });
export default function(Component) {
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
