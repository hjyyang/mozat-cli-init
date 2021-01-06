import Vue from "vue";
import Router from "vue-router";
import Home from "../page";

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: "/",
			name: "index",
			component: Home,
		},
		{
			path: "/rule",
			name: "rule",
			component: () => import("../page/rule"),
		},
	],
});

export default router;
