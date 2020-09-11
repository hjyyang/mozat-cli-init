/**
 * All Codes below are Lifetime Warranted by mozat since 15/8/17.
 */

/**
 * get URL Params
 *
 * USAGE:
 * let paramName = getUrlParams('paramName');
 * let { param1, param2 } = getUrlParams('param1', 'params2');
 *
 * @returns {Object, Array}
 */

import Vue from "vue";

let env = process.env.NODE_ENV;
console.log(env, "--------------------////////");

let myMixin = {
	methods: {
		iframeInsert(url) {
			const iframe = document.createElement("iframe");
			iframe.setAttribute("src", `loopsmozat://${url}`);
			iframe.style.height = 0;
			iframe.style.width = 0;
			iframe.style.position = "absolute";
			iframe.style.zIndex = -1000;
			iframe.style.display = "none";
			// console.log('iframe');
			document.body.appendChild(iframe);
			// after 1000ms. remove the iframe to make it looks clean.
			setTimeout(() => document.body.removeChild(iframe), 5000);
		},

		openSystemBrowser() {
			let url = "http%3a%2f%2finvader-download.mozat.me";
			this.iframeInsert("util/openSystemBrowser?url=" + url);
		},

		/* 跳转页面方法 openURL */
		openURL(url, title) {
			let encodeUrl = encodeURI(url);
			let encodeTitle = encodeURI(title);
			let URL = "util/openUrl?url=" + encodeUrl + "&title=" + encodeTitle;
			this.iframeInsert(URL);
		},

		/* 去直播 */
		goLive(type) {
			const url = `broadcast/goLive?type=${type}`;
			this.iframeInsert(url);
		},
		toast(text) {
			const encodeText = encodeURI(text);
			const url = "util/showShortTip?tipText=" + encodeText;
			this.iframeInsert(url);
		},

		getUrlParams(...args) {
			/* 这个函数的作用是将uerid和token分离出来 */
			function getByName(name) {
				const reg = new RegExp(`(^|&|\\?)${name}=([^&|#]*)`, "i");
				const param = window.location.href.substring(0).match(reg);
				if (param !== null) {
					return param[2];
				}
				return undefined;
			}

			if (arguments.length === 1) {
				return getByName(args[0]) || {};
			}
			const result = {};
			[...args].forEach((name) => {
				result[name] = getByName(name);
			});
			return result;
		},

		openGame(appid) {
			let url = `util/openGame?appid=${appid}&version=1`;
			this.iframeInsert(url);
		},

		/* 关闭当前页面 */
		closeWebView() {
			let url = "general/closeWindow";
			this.iframeInsert(url);
		},

		/**
		 * 判断手机操作系统。
		 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
		 * @returns {String}
		 */
		getMobileOperatingSystem() {
			let userAgent = navigator.userAgent || navigator.vendor || window.opera;

			// Windows Phone must come first because its UA also contains "Android"
			if (/windows phone/i.test(userAgent)) {
				return "Windows Phone";
			}

			if (/android/i.test(userAgent)) {
				return "Android";
			}

			// iOS detection from: http://stackoverflow.com/a/9039885/177710

			if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
				return "iOS";
			}

			return "unknown";
		},

		/* 跳转个人主页 */
		openChannelprofile(hostId) {
			const url = "general/openChannelprofile?uid=" + hostId;
			// console.log('跳转个人主页的链接：' + url);
			// Vue.prototype.$loading();
			// setTimeout(() => {
			//   Vue.prototype.$loading.end();
			// }, 2000)
			this.iframeInsert(url);
		},

		/* 跳转直播间 */
		openVideo(sid, cid) {
			const url = "broadcast/openVideo?cid=" + cid + "&sid=" + sid;
			Vue.prototype.$loading();
			setTimeout(() => {
				Vue.prototype.$loading.end();
			}, 2000);
			this.iframeInsert(url);
			// console.log('跳转直播间'+url);
		},
		/**
		 * 关注某个用户
		 * @param uid [type: Number] [用户id]
		 */
		followUser(uid) {
			const url = "account/follow?uid=" + uid;
			this.iframeInsert(url);
		},
		unFollowUser(uid) {
			const url = "account/unfollow?uid=" + uid;
			this.iframeInsert(url);
		},
		openAppPage(pageName, unlockType) {
			const url = "util/openAppPage?pageName=" + pageName + "&unlockType=" + unlockType;
			this.iframeInsert(url);
		},
	},
};

Vue.mixin(myMixin);
