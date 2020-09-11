<template>
	<transition name="fade">
		<div class="j-dialog" @touchmove.prevent v-show="visible" :style="styleVar()">
			<transition name="magnify">
				<div class="dialog-wrap" v-show="visible">
					<div class="colse" v-if="showClose" @click="handleClose"></div>
					<div class="dialog-body">
						<slot></slot>
						<div class="dialog-btn">
							<button v-if="showConfirm" @click="confirm">{{ confirmButtonText }}</button>
							<button v-if="showCancel" @click="cancel">{{ cancelButtonClass }}</button>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
export default {
	name: "JDialog",
	props: {
		visible: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			default: "",
		},
		modal: {
			type: Boolean,
			default: true,
		},
		showClose: {
			type: Boolean,
			default: true,
		},
		background: {
			type: String,
			default: "#ffffff",
		},
		confirmButtonText: {
			type: String,
			default: "confirm",
		},
		cancelButtonClass: {
			type: String,
			default: "cancel",
		},
		confirmCallback: Function,
		showConfirm: {
			type: Boolean,
			default: true,
		},
		cancelCallback: Function,
		showCancel: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		handleClose() {
			this.$emit("update:visible", false);
		},
		styleVar() {
			return `--background:${this.background};
                    --colseColor:#000;`;
		},
		async confirm() {
			this.handleClose();
			if (
				this.confirmCallback &&
				typeof this.confirmCallback === "function"
			) {
				await this.confirmCallback();
			}
		},
		async cancel() {
			this.handleClose();
			if (
				this.cancelCallback &&
				typeof this.cancelCallback === "function"
			) {
				await this.cancelCallback();
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.j-dialog {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	padding: 0.1rem;
	background-color: rgba($color: #000000, $alpha: 0.5);
}
.dialog-wrap {
	position: relative;
	max-width: 100%;
	background-color: var(--background);
}
.colse {
	position: absolute;
	right: 0.06rem;
	top: 0.06rem;
	width: 0.3rem;
	height: 0.22rem;
	&::before {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		width: 60%;
		height: 0.03rem;
		transform: rotate(45deg);
		border-radius: 0.2rem;
		background-color: var(--colseColor);
	}
	&::after {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		width: 60%;
		height: 0.03rem;
		transform: rotate(-45deg);
		border-radius: 0.2rem;
		background-color: var(--colseColor);
	}
}
.dialog-body {
	padding: 0.1rem;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
.magnify-enter-active {
	animation: magnify 0.3s ease-in-out;
}
.magnify-leave-active {
	animation: magnify 0.3s ease-in-out reverse;
}
@keyframes magnify {
	0% {
		transform: scale(0.8);
	}
	100% {
		transform: scale(1);
	}
}
</style>