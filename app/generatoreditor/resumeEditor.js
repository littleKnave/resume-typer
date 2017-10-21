/**
 * Created by Administrator on 2017/10/19.
 */
import resume from '../config/resume'
import $ from '../plugins/vQuery'
import marked from 'marked'

let resumeWarp = $('#app .resume-wrap');
let resumeTag = $('.resume-tag',resumeWarp.elements);
let resumePre = $('pre',resumeWarp.elements);
let interval = null;
let conserve = '';
let className = 'htmlMode';

//添加文字
const resumeEditor = (callback) => {
    let position = 0;
    interval = setInterval(() => {
        let char = resume.slice(position,position = position + 1);
        conserve += char;
        resumePre.html(conserve);
        if(position === resume.length){
            clearInterval(interval);
            callback && callback();
        }
    },50)
};

//marked 模板显示
const resumeMarked = (callback) => {
    resumePre.css({
        display: 'none'
    });
    resumeWarp.addClass(className);
    resumeTag.html(marked(conserve));
    callback && callback();
};

export {resumeEditor, resumeMarked}