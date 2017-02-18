/**
 * Created by xiao on 2017/2/13.
 */

var list = [];

function inputCheck() {
    var inputNum = document.getElementById('inputNum');
    var regex = /^[0-9]*[1-9][0-9]*$/;
    var value = inputNum.value.replace(/^\s+/g, "").replace(/\s+$/g, "");

    if (regex.test(value)) {
        return parseInt(value);
    } else {
        alert('请输入整数');
        inputNum.value = '';
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

function render() {
    var display = document.getElementById('display');
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
        addEvent(numQueue[i], 'click', divClickHandle);
    }
}

function divClickHandle() {
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

window.onload = function () {
    var oBtns = document.getElementsByTagName('button');

    for (var i = 0; i < oBtns.length; i++) {
        console.log(oBtns[i].id);
        addEvent(oBtns[i], 'click', eval(oBtns[i].id));
    }
};




