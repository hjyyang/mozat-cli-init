import JDialog from "./src/component";

/* istanbul ignore next */
JDialog.install = function(Vue) {
	Vue.component(JDialog.name, JDialog);
};

export default JDialog;
