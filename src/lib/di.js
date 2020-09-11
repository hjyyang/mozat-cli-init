
const PAGE = 'init';
const TITLE = 'init';

class DI {
  constructor(btnName, id = 14225) {
    this.btnName = btnName;
    this.id = id
  }
  set(others = {}) {
    let userId = this.getUrlParams('userId'),
        sourceStr = this.getUrlParams('source');
    sourceStr = JSON.stringify(sourceStr) === '{}' ? 'notification' : sourceStr
    console.log(sourceStr, 'source');
    let params = others;
    if (this.btnName) {
      params.button_name = this.btnName;
    }
    params.source = params.source ? params.source : sourceStr;
    params.userId = userId;
    params.page = PAGE;
    params.title = TITLE;
    params.id = this.id;

    let url = 'util/statistical?point=' + JSON.stringify(params)
    console.log('埋点链接：' + url)
    this.iframeInsert(url)
  }
  getUrlParams(...args) {
    /* 这个函数的作用是将uerid和token分离出来 */
    function getByName(name) {
      const reg = new RegExp(`(^|&|\\?)${name}=([^&|#]*)`, 'i')
      const param = window.location.href.substring(0).match(reg)
      if (param !== null) {
        return param[2]
      }
      return undefined
    }

    if (arguments.length === 1) {
      return getByName(args[0]) || {}
    }
    const result = {};
    [...args].forEach((name) => {
      result[name] = getByName(name)
    })
    return result
  }
  iframeInsert(url) {
    const iframe = document.createElement('iframe')
    const URL = 'loopsmozat://' + url
    iframe.setAttribute('src', URL)
    iframe.style.height = 0
    iframe.style.width = 0
    iframe.style.position = 'absolute'
    iframe.style.zIndex = -1000
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    // console.log('iframeInsert完毕=>%s', URL);
    // after 1000ms. remove the iframe to make it looks clean.
    setTimeout(function() {
      document.body.removeChild(iframe)
    }, 1000)
  }
}

export const source = new DI(null, 14226);
export const gotoLive = new DI('goLive');
export const getReward = new DI('getReward');