<template>
	<div id="app">
		<button @click="dialogShow=true">open</button>
		<j-dialog :visible.sync="dialogShow">
			<div class="test">this is content</div>
		</j-dialog>
		<j-loading :visible="loading" :size="10"></j-loading>
		{{ $t("title",{test: title,abc:"abc"}) }}
	</div>
</template>

<script>
export default {
	name: "App",
	data() {
		return {
			dialogShow: false,
			title: "123",
			loading: false,
		};
	},
	components: {},
	mounted() {},
	methods: {},
};
</script>

<style lang="scss" scoped>
.test {
	width: 2rem;
}
</style>