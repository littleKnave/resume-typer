/**
 * Created by Administrator on 2017/10/16.
 */
//回调
// import {styleEditor} from './callbackeditor/styleEditor'
// import {resumeEditor, resumeMarked} from './callbackeditor/resumeEditor'

//Promise
import {styleEditor} from './promiseeditor/styleEditor'
import {resumeEditor, resumeMarked} from './promiseeditor/resumeEditor'
import co from 'co'

//Generator Thunk
// import {styleEditor} from './generatoreditor/styleEditor'
// import {resumeEditor, resumeMarked} from './generatoreditor/resumeEditor'
// import thunkify from 'thunkify'
// import co from 'co'
//
// let styleEditorThunk = thunkify(styleEditor);
// let resumeEditorThunk = thunkify(resumeEditor);
// let resumeMarkedThunk = thunkify(resumeMarked);


//1:回调方法,调用回调模块
// styleEditor(0, () => {
//     resumeEditor(() => {
//         styleEditor(1, () => {
//             resumeMarked(() => {
//                 styleEditor(2)
//             })
//         })
//     })
// });

//2：Promise方法，调用promise模块
// styleEditor(0).then(() => {
//     resumeEditor().then(() => {
//         styleEditor(1).then(() => {
//             resumeMarked().then(() => {
//                 styleEditor(2).then(() => {
//                     console.log('加载完成')
//                 })
//             })
//         })
//     })
// });

//Generator方法

//3：Generator写法一，thunk，调用Generator thunk模块，选择自动执行方法或co方法
// var gThunk= function* () {
//     yield styleEditorThunk(0);
//     yield resumeEditorThunk();
//     yield styleEditorThunk(1);
//     yield resumeMarkedThunk();
//     yield styleEditorThunk(2)
// };

//Generator,thunk自动执行方法一：使用自动执行器
// function runThunk(fn) {
//     //generator自动执行器
//     var gen = fn();
//
//     function next() {
//         var result = gen.next();
//         //判断Generator函数是否结束（result.done属性）
//         if(result.done) return;
//         result.value(next)
//     }
//     next();
// }
// runThunk(g);

//Generator,thunk自动执行方法二：使用co模块
// co(g);

//4:Generator写法二，promise，调用promise模块,根据then方法写自动执行器或co调用

var gPromise = function* () {
    yield styleEditor(0);
    yield resumeEditor();
    yield styleEditor(1);
    yield resumeMarked();
    yield styleEditor(2)
};
//Generator,promise自动执行方法一：使用自动执行器
function runPromise(fn) {
    var gen = fn();

    function next() {
        var result = gen.next();
        if(result.done) return result.value;
        result.value.then(() => {
            next()
        })
    }
    next();
}
runPromise(gPromise);
//Generator,promise自动执行方法二：使用co模块
// co(gPromise);



//5:async方法,函数调用promise模块,写法简单

// var asyncg = async function () {
//     await styleEditor(0);
//     await resumeEditor();
//     await styleEditor(1);
//     await resumeMarked();
//     await styleEditor(2)
// };
// asyncg();