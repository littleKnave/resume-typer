/**
 * Created by Administrator on 2017/10/19.
 */
import resume from '../config/resume'
import $ from '../plugins/vQuery'
import marked from 'marked'

let resumeWarp = $('#app .resume-wrap');
let resumeTag = $('.resume-tag', resumeWarp.elements);
let resumePre = $('pre', resumeWarp.elements);
let interval = null;
let conserve = '';
let className = 'htmlMode';

//添加文字
const resumeEditor = () => {
    return new Promise((resolve, reject) => {
        let position = 0;
        interval = setInterval(() => {
            let char = resume.slice(position, position = position + 1);
            conserve += char;
            resumePre.html(conserve);
            if (position === resume.length) {
                clearInterval(interval);
                resolve()
            }
        }, 50)
    })
};

//marked 模板显示
const resumeMarked = () => {
    return new Promise((resolve, reject) => {
        resumePre.css({
            display: 'none'
        });
        resumeWarp.addClass(className);
        resumeTag.html(marked(conserve));
        resolve()
    })
};

export {resumeEditor, resumeMarked}