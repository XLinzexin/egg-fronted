import { type } from "./type";

export const globalDataAction = {
  set(data) {
    return {
      type: "SET_GLOBALDATA_INFO",
      data
    };
  },
  clear() {
    return {
      type: "CLEAR_GLOBALDATA_INFO"
    };
  }
};

export const adminAction = {
  set(data) {
    return {
      type: "SET_ADMIN_INFO",
      data
    };
  },
  clear() {
    return {
      type: "CLEAR_ADMIN_INFO"
    };
  }
};

export const formFilterAction = {
  set(data) {
    return {
      type: "SET_FORMFILTER_INFO",
      data
    };
  },
  clear() {
    return {
      type: "CLEAR_FORMFILTER_INFO"
    };
  }
};
export const formDataAction = {
  set(data) {
    return {
      type: "SET_FORMDATA_INFO",
      data
    };
  },
  clear() {
    return {
      type: "CLEAR_FORMDATA_INFO"
    };
  }
};

export const editorAction = {
  set(data) {
    return {
      type: "SET_EDITOR_INFO",
      data
    };
  },
  clear() {
    return {
      type: "CLEAR_EDITOR_INFO"
    };
  }
};
