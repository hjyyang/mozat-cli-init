function scrollFunc(cb) {
	var timer = null;
	return function() {
		let el = this;
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			if (grounding(el)) {
				cb(el);
			}
		}, 18);
	};
}

function grounding(node) {
	const { el, container } = node[scope];
	if (el.getAttribute("infinite-scroll-disabled")) return false;
	let wrapH = container.clientHeight,
		scrollT = container.scrollTop,
		elH = el.clientHeight;
	if (wrapH + scrollT >= elH) {
		// console.log("is grounding");
		return true;
	}
}

function getScrollContainer(el) {
	if (el.parentNode && el.parentNode.nodeType == 1) {
		return el.parentNode;
	}
}

var scope = "JInfiniteScroll";
export default {
	name: "InfiniteScroll",
	inserted(el, binding, vnode) {
		const cb = binding.value;

		const vm = vnode.context;
		// only include vertical scroll
		const container = getScrollContainer(el);
		const onScroll = scrollFunc(cb).bind(el, cb);

		el[scope] = { el, vm, container, onScroll };

		container.addEventListener("scroll", onScroll);
	},
	unbind(el) {
		const { container, onScroll } = el[scope];
		if (container) {
			container.removeEventListener("scroll", onScroll);
		}
	},
};
