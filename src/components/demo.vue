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

		<button style="width: 100px;height:40px;" @click="testData">test</button>
		<transition-group name="list" tag="div">
			<div v-for="item in items" :key="item" class="item">{{ item }}</div>
		</transition-group>
        <JEditor v-model="value"></JEditor>
	</div>
</template>

<script>
import JEditor from "vue-jeditor";
import "vue-jeditor/dist/src/css/style.css";
export default {
	name: "demo",
	data() {
		return {
			dialogShow: false,
			title: "123",
			list: [1],
			loading: false,
			noMore: false,
			aaa: "second",
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            value: null
		};
	},
	components: {
        JEditor
    },
	computed: {
		disabled() {
			return this.loading || this.noMore;
		},
	},
	mounted() {
		// this.$loading();
	},
	methods: {
		testData() {
			this.items = [9, 8, 6, 1, 2, 4, 3, 5, 7];
		},
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
.list-move {
  transition: transform 1s;
}
.list-enter-active,
.list-leave-active {
	transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
	opacity: 0;
	transform: translateY(30px);
}
.test {
	width: 2rem;
}
.item{
    display: flex;
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