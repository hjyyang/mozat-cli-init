<template>
	<div class="home">
		<router-link to="/rule">go to rule</router-link>
		<ul>
			<li @click="tabClick(0)">A</li>
			<li @click="tabClick(1)">B</li>
			<li @click="tabClick(2)">C</li>
			<li @click="tabClick(3)">D</li>
		</ul>
		<div class="wrap">
			<div class="contaner" style="width: 200%;">
				<transition :name="transitionName" mode="out-in">
					<div class="item" style="background: pink;" v-show="currentIndex==0"></div>
				</transition>
				<transition :name="transitionName" mode="out-in">
					<div class="item" style="background: red;" v-show="currentIndex==1"></div>
				</transition>
				<transition :name="transitionName" mode="out-in">
					<div class="item" style="background: #eee;" v-show="currentIndex==2"></div>
				</transition>
				<transition :name="transitionName" mode="out-in">
					<div class="item" style="background: #ddd;" v-show="currentIndex==3"></div>
				</transition>
			</div>
			<p>12323</p>
			<button @click="testGoTo">test</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			transitionName: "",
			currentIndex: 0,
			timer: null,
		};
	},
	methods: {
		tabClick(index) {
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				if (this.currentIndex > index) {
					this.transitionName = "tab-slide-left";
				} else {
					this.transitionName = "tab-slide-right";
				}
				this.currentIndex = index;
			}, 100);
		},
		testGoTo() {
			window.history.go(-1);
		},
	},
};
</script>
<style lang="scss" scoped>
.home {
	height: 100vh;
	background-color: seashell;
}
ul {
	display: flex;
}
li {
	width: 50%;
	height: 40px;
	line-height: 40px;
	text-align: center;
	background-color: palegoldenrod;
}
.wrap {
	position: relative;
	height: 7rem;
	overflow-x: hidden;
}
.contaner {
	display: flex;
}
.item {
	width: 50%;
	height: 4rem;
}
</style>