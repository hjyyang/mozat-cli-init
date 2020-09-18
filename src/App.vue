<template>
	<div id="app">
		<!-- <transition :name="transitionName">
			<router-view></router-view>
		</transition>-->
		<Demo />
	</div>
</template>

<script>
import Demo from "./components/demo";
export default {
	name: "App",
	data() {
		return {
			transitionName: "",
			back: false,
			historyState: 0,
		};
	},
	components: {
		Demo,
	},
	methods: {
		//返回上一页
		goBack() {
			let state = window.history.state
				? parseInt(window.history.state.key)
				: 0;
			// alert(this.historyState + "----" + state + "----back");
			if (this.historyState >= state) {
				//返回上一页
				this.transitionName = "slide-left";
				this.back = true;
			}
		},
	},
	mounted() {
		if (window.history) {
			window.addEventListener("popstate", this.goBack);
		}
	},
	beforeDestroy() {
		if (window.history) {
			window.removeEventListener("popstate", this.goBack);
		}
	},
	watch: {
		$route(to, form) {
			this.historyState =
				window.history && window.history.state
					? parseInt(window.history.state.key)
					: 0;
			// alert(this.historyState + "---router");
			if (!this.back && !!form.name) {
				this.transitionName = "slide-right";
			}
			this.back = false;
		},
	},
};
</script>

<style lang="scss">
a {
	display: block;
	width: 1.4rem;
	height: 0.6rem;
	line-height: 0.6rem;
	background-color: #eeeeee;
	text-align: center;
}
</style>