import Vue from "vue";
import axios from "axios";
import { urlParse } from "./util";

axios.defaults.baseURL = process.env.VUE_APP_API + "/2.0/op";
/* 拦截请求和响应 */
axios.interceptors.request.use(
	(config) => {
		// element ui Loading方法
		let url = config.url;
		/* eslint-disable */
		let index = url.lastIndexOf("/");
		let params = url.substring(index + 1, url.length);
		let para = params.match(/(\S*)\?/)[1];
		console.log(params, para);
		if (para !== "send-family-popup") {
			Vue.prototype.$loading();
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
axios.interceptors.response.use(
	(data) => {
		Vue.prototype.$loading.end();
		return data;
	},
	(error) => {
		Vue.prototype.$loading.end();
		return Promise.reject(error);
	}
);

const query = urlParse();
const defaultQuery = {
	zone: "sa",
	uid: query.userId || 1003303,
	token: query.token,
};

class Api {
	constructor(url, options) {
		this.url = this._addQuery(url);
		this.options = options || {};
		this.method = this.options.method || "get";
	}
	request(params) {
		const config = {
			url: this.url,
			method: this.method,
		};
		if (this.method === "get") {
			config.params = params;
		} else {
			config.data = params;
		}
		Object.assign(config, this.options);
		return axios.request(config);
	}

	_addQuery(url) {
		let query = "";
		Object.keys(defaultQuery).map((key) => {
			query += `&${key}=${defaultQuery[key]}`;
		});
		if (query) {
			query = "?" + query.slice(1);
		}
		return url + query;
	}
}

export const index = new Api("/new_host_challenge2/index");
