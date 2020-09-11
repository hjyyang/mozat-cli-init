import Vue from "vue";
import App from "./App.vue";
import "./assets/css/main.scss";
import "./lib/mixin";
import "./lang";
// import router from "./router";
import VueLazyload from "vue-lazyload";

import JDialog from "./plug/Dialog";
import Loading from "./plug/Loading";

Vue.config.productionTip = false;

Vue.use(JDialog); //使用对话框，如项目中未用到对话框可注释
Vue.use(Loading);

Vue.use(VueLazyload, {
	preLoad: 1.3,
	error: require("./assets/image/defaule-img.png"),
	loading: require("./assets/image/defaule-img.png"),
	attempt: 1,
	filter: {
		progressive(listener) {
			const iswangsu = /wangsu-image.rings.tv/;
			if (iswangsu.test(listener.src)) {
				listener.src = listener.src + "?w=60";
			}
		},
	},
});

Vue.prototype.$i18n = true; //是否开启国际化（将根据lang目录下替换文案）
// Vue.prototype.$lang = "ar"; //固定使用哪种语言，开启国际化时无效

new Vue({
	render: (h) => h(App),
	// router,
}).$mount("#app");
