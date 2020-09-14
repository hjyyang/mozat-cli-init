<template>
	<div class="loadings" :class="{tobody: toBody}" v-show="isShow" :style="'--size:'+size+'px;'">
		<ul>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div>
</template>
<script>
export default {
	name: "JLoading",
	props: {
		visible: {
			type: Boolean,
			default: false,
		},
		size: {
			type: Number,
			default: 14,
		},
	},
	data() {
		return {
			isShow: false,
			hasAnimate: true,
			toBody: true,
		};
	},
	mounted() {
		if (this.$el.parentNode === null) {
			//使用vue原型链调用时，挂载时无父级节点
			this.toBody = true;
		} else {
			this.toBody = false;
		}
	},
	watch: {
		visible() {
			this.isShow = this.visible;
		},
	},
	computed: {
		/**
		 * 动画效果样式，没有返回空
		 * @return {String} 样式
		 */
		animateName() {
			return this.hasAnimate ? "opacity" : "";
		},
	},
	methods: {
		/**
		 * 开启动画效果
		 */
		opemAnimate() {
			this.hasAnimate = true;
		},
		/**
		 * 去除动画效果
		 * @return {Promise} 返回promise
		 */
		removeAnimate() {
			return new Promise((resolve) => {
				this.hasAnimate = false;
				resolve();
			});
		},
		/**
		 * 显示动画loading
		 */
		show() {
			this.isShow = true;
		},
		/**
		 * 隐藏动画loading
		 */
		hide() {
			this.isShow = false;
		},
	},
};
</script>

<style lang="scss" scoped>
.loadings {
	display: flex;
	align-items: center;
	justify-content: center;
	&.tobody {
		position: fixed;
		z-index: 20;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: rgba($color: #000000, $alpha: 0.5);
	}
	ul {
		display: flex;
	}
	li {
		width: var(--size);
		height: var(--size);
		margin: 0 5px;
		border-radius: 50%;
		background-color: #ea3080;
		transition: all 0.3s;
		&:nth-of-type(1) {
			animation: magnify 1.2s linear infinite reverse;
		}
		&:nth-of-type(2) {
			animation: magnify 1.2s linear infinite reverse;
			animation-delay: 0.2s;
		}
		&:nth-of-type(3) {
			animation: magnify 1.2s linear infinite reverse;
			animation-delay: 0.4s;
		}
	}
}
@keyframes magnify {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(0.2);
	}
	100% {
		transform: scale(1);
	}
}
</style>
