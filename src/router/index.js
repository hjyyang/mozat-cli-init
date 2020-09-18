import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: "/",
			name: "index",
			component: () => import("../page"),
		},
		{
			path: "/rule",
			name: "rule",
			component: () => import("../page/rule"),
		},
	],
});

export default router;
