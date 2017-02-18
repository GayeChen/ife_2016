/**
 * Created by xiao on 2017/2/13.
 */

var list = [];

function inputCheck() {
    var inputNum = document.getElementById('inputNum');
    var regex = /^[0-9]*[1-9][0-9]*$/;
    var value = inputNum.value.replace(/^\s+/g, "").replace(/\s+$/g, "");

    if (regex.test(value)) {
        return value;
    } else {
        alert('请输入整数');
        inputNum.value = '';
        return;
    }
}

function txtAreaCheck() {
    var inputNum = document.getElementById('inputNum');
    var value = inputNum.value.replace(/^\s+/g, "").replace(/\s+$/g, "").replace(/(\s+)/g, " ");
    var newList = [];

    if (value) {
        newList = value.split(/[\s\n\r\、\,\，]/);
        return newList;
    } else {
        alert('请输入内容');
        return;
    }
}

function queryValueCheck() {
    var query = document.getElementById('queryValue');
    var value = query.value.trim();
    if (value) {
        return value;
    } else {
        alert('请输入内容');
        return;
    }
}

function leftIn() {
    if (inputCheck()) {
        list.unshift(inputCheck());
        render();
    }
}

function rightIn() {
    if (inputCheck()) {
        list.push(inputCheck());
        render();
    }
}

function leftOut() {
    if (list.length) {
        list.shift();
        render();
    }
}

function rightOut() {
    if (list.length) {
        list.pop();
        render();
    }
}

function queryBtn() {
    var query = document.getElementById('queryValue');
    console.log('this is queryBtn');
    fuzzyMatch(queryValueCheck());
    addEvent(query, 'focus', queryFocusHandle);
}

function queryFocusHandle() {
    var numQueue = document.getElementsByClassName('numQueue');
    for (var i = 0; i < numQueue.length; i++) {
        numQueue[i].style.backgroundColor = 'red';
    }
}

/**
 *  在数组list中查找val，找到后将相应形式div的颜色变为红色，并将找到的个数count加一
 * @param val
 */
function fuzzyMatch(val) {
    var numQueue = document.getElementsByClassName('numQueue');
    var count = 0;
    for (var i = 0; i < list.length; i++) {
        if (list[i].indexOf(val) !== -1) {
            numQueue[i].style.backgroundColor = 'blue';
            count++;
        }
    }
    if (!count) {
        alert('未找到!');
    }
}


function addContent() {
    console.log('this is content');
    if (txtAreaCheck()) {
        list = list.concat(txtAreaCheck());
        render();
    }
}

function render() {
    var display = document.getElementById('display');
    console.log(list);
    var str = '';
    for (var i = 0; i < list.length; i++) {
        str += "<div class='numQueue'>" + list[i] + "</div>";
    }
    display.innerHTML = str;

    rebindEvent();
}

function rebindEvent() {
    var numQueue = document.getElementsByClassName('numQueue');
    for (var i = 0; i < numQueue.length; i++) {
        numQueue[i].index = i;
        addEvent(numQueue[i], 'click', clickHandle);
    }
}

function clickHandle() {
    list.splice(this.index, 1);
    render();
}

function addEvent(element, type, handle) {
    if (element.addEventListener) {
        element.addEventListener(type, handle);
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, handle);
    } else {
        element['on' + type] = handle;
    }
}

function ensureKeyHandle(e) {
    if (e.keyCode == 13) {
        addContent();
    }
}

window.onload = function () {
    var oBtns = document.getElementsByTagName('button');

    for (var i = 0; i < oBtns.length; i++) {
        addEvent(oBtns[i], 'click', eval(oBtns[i].id));
    }
    addEvent(document, 'keyup', ensureKeyHandle);
};


/* + 表示1个或多个
 * 表示0个或多个
 (\s+)表示连续的空格字符串                        (0-9)匹配'0-9'本身
 [\s*]表示空格或者*号 ,[]里为或者的关系            [0-9]+ 匹配数字
 {1,9}表示匹配的长度为1-9*/






