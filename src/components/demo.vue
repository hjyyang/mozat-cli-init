<template>
	<div class="demo">
		<button @click="dialogShow=true">open</button>
		<j-dialog :visible.sync="dialogShow">
			<div class="test">this is content</div>
		</j-dialog>
		{{ $t("title",{test: title,abc:"abc"}) }}
		<div class="infinite-list-wrapper">
			<ul v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
				<li v-for="(item,index) in list" :key="index">{{ item }}</li>
			</ul>
			<j-loading :visible="loading" :size="10"></j-loading>
			<p v-if="noMore">没有更多了</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "demo",
	data() {
		return {
			dialogShow: false,
			title: "123",
			list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			loading: false,
			noMore: false,
			aaa: "second",
		};
	},
	components: {},
	computed: {
		disabled() {
			return this.loading || this.noMore;
		},
	},
	mounted() {
		// this.$loading();
	},
	methods: {
		handleClick() {
			console.log(123);
		},
		load() {
			this.loading = true;
			setTimeout(() => {
				this.list.push(this.list.length + 1);
				this.list.push(this.list.length + 1);
				this.loading = false;
				if (this.list.length >= 20) {
					this.noMore = true;
				}
			}, 2000);
		},
	},
};
</script>

<style lang="scss" scoped>
.test {
	width: 2rem;
}
.infinite-list-wrapper {
	max-height: 3rem;
	overflow: auto;
	text-align: center;
}
li {
	height: 0.5rem;
	line-height: 0.5rem;
	margin-bottom: 0.05rem;
	background-color: rosybrown;
}
</style>