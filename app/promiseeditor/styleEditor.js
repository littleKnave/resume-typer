/**
 * Created by Administrator on 2017/10/19.
 */
import Styles from '../config/style'
import $ from '../plugins/vQuery'
import Prism from 'prismjs'

let interval = null;
let styleArea = $('style');
let conserve = '';
let stylesWrap = $('#app .styles-wrap');
let stylePre = $('pre', stylesWrap.elements);
//编辑器当前高度
const MAX_HEIGHT = stylesWrap.height();

const styleEditor = (num) => {
    return new Promise((resolve, reject) => {
        let style = Styles[num];
        //每次执行前清零
        let position = 0;
        interval = setInterval(function () {
            //每次截取一个字符
            let char = style.slice(position, position = position + 1);
            conserve += char;
            //style标签和pre标签同时添加内容
            styleArea.html(conserve);
            stylePre.html(Prism.highlight(conserve, Prism.languages.css));
            //添加内容后判断滚动轴是否变化，保持显示最底部内容
            let top = stylesWrap.scrollheight() - MAX_HEIGHT;
            if (top > 0) {
                stylesWrap.scrolltop(top)
            }
            //如果编辑完，关闭定时器，执行下一步操作
            if (position === style.length) {
                clearInterval(interval);
                resolve()
            }
        }, 50);
    })
};

export {styleEditor}