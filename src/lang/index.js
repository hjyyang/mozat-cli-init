import Vue from "vue";
import { urlParse } from "../lib/util";
import En from "./en";
import Ar from "./ar";

function t(text, variate) {
	if (Vue.prototype.$i18n) {
		//使用国际化，根据url的lang改变文案
		const arg = urlParse();
		if (arg.lang && arg.lang == "ar") {
			return formatText(Ar, text, variate);
		} else {
			return formatText(En, text, variate);
		}
	}
}

function formatText(lang, text, variate) {
	let textArr = null,
		index = 0,
		cLang = lang;
	if (text.indexOf(".") != -1) {
		textArr = text.split(".");
	} else {
		if (lang[text]) {
			if (variate) {
				return replaceText(variate, lang[text]);
			}
			return lang[text];
		} else {
			throw "The text does not exist";
		}
	}
	while (index < textArr.length) {
		if (!cLang[textArr[index]]) {
			throw "The text does not exist";
		}
		if (cLang[textArr[index]] && typeof cLang[textArr[index]] == "object") {
			cLang = cLang[textArr[index]];
		}
		if (cLang[textArr[index]] && typeof cLang[textArr[index]] == "string") {
			if (variate) {
				return replaceText(variate, cLang[textArr[index]]);
			}
			return cLang[textArr[index]];
		}
		index++;
	}
}

function replaceText(attr, text) {
	for (let i in attr) {
		text = text.replace("$" + i + "$", attr[i]);
	}
	return text;
}

Vue.prototype.$t = t;
