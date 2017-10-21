/**
 * Created by Administrator on 2017/10/19.
 */
let doc = document;
let getEles = (selector, context) => {
    return Array.from(((context && context) || doc).querySelectorAll(selector))
}

let isUndefined = (obj) => {
    //void 0输出undefined
    return obj === void 0
};

class Vquery {
    //constructor为构造方法，this只想实例对象
    constructor(selector, context) {
        //获得选中选中dom数组,判断当前选择的数组长度，多个标签数组通过get方法
        this.elements = getEles(selector, context).length === 1 ? getEles(selector, context)[0] : getEles(selector, context);
    }

    /*
     原本代码以数组形式获取dom,通过异步操遍历dom数组，
     现在限制dom数组操作,可获得dom数组，但需要使用get获得具体dom,
     optimizeCb (callback) {
     this.elements.forEach(callback)
     }
     */
    get(index = 0) {
        //返回dom数组里详细的某个dom
        this.elements = this.elements[index];
        return this.elements[index < 0 ? 0 : index];
    }

    html(sHtml) {
        if (isUndefined(sHtml)) {
            return this.elements.innerHTML
        }
        this.elements.innerHTML = sHtml;
    }

    addClass(iClass) {
        if (this.elements.className.split(' ').indexOf(iClass) === -1) {
            this.elements.className += ` ${iClass}`
        }
    }

    css(styles) {
        if (typeof styles === 'Object') {
            for (let key of styles.keys) {
                this.elements.style[key] = styles[key]
            }
        }
    }

    height(h) {
        if (isUndefined(h)) {
            return this.elements.offsetHeight
        }

        this.elements.style.height = h
    }

    scrolltop(top) {
        if (isUndefined(top)) {
            return this.elements.scrollTop
        }

        this.elements.scrollTop = top
    }

    scrollheight(height) {
        if (isUndefined(height)) {
            return this.elements.scrollHeight
        }

        this.elements.scrollHeight = height
    }
}

export default (selector,context) => {
    return new Vquery(selector,context)
}