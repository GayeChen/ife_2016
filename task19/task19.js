/**
 * Created by xiao on 2017/2/13.
 */

var $ = function (id) {
    return document.getElementById(id);
};

var t = null,
    list = [],
    data = [];

function inputCheck() {
    var inputNum = document.getElementById('inputNum'),
        regex = /^[0-9]*[1-9][0-9]*$/,
        value = inputNum.value.replace(/^\s+/g, "").replace(/\s+$/g, "");

    if (regex.test(value) && parseInt(value) <= 100 && parseInt(value) >= 10) {
        if (list.length >= 60) {
            alert('数据已达上限：60');
            inputNum.value = '';
            return;
        }
        return parseInt(value);
    } else {
        alert('请输入10-100之间的整数');
        inputNum.value = '';
        return;
    }
}

function rightIn() {
    if (inputCheck()) {
        list.push(inputCheck());
        render(list);
    }
}

/**
 * 随机产生60个数，放入数组list中，并将list渲染出来
 */
function randomGenerate() {
    list = [];
    for (var i = 0; i < 60; i++) {
        // var random = Math.ceil(Math.random() * 9) + '' + Math.floor(Math.random() * 10);
        // list.push(parseInt(random));
        var random = Math.round(Math.random()*90 + 10);
        list.push(random);
    }
    console.log(list);
    render(list);
}

//      数组list去重
function unique() {
    console.log('this is unique');
    console.log(list);
    data = [];
    var obj = {};
    for (var i = 0; i < list.length; i++) {
        var temp = list[i];
        if (obj[temp]) {
            list[i] = list[list.length - 1];
            list.length--;
            i--;
            data.push(list.concat());
            continue;
        }
        obj[temp] = temp;
    }
    console.log(data);

    visible(1000);
}

//      将数组中的每一项渲染出来；
function render(data) {
    var str = '',
        main = document.getElementsByClassName('main')[0],
        width = main.offsetWidth;

    for (var i = 0; i < data.length; i++) {
        str += "<div class='numQueue' style='left: " + 18 * i + "px;height: " + data[i] + "px' title='" + data[i] + "'></div>";
    }
    $('display').innerHTML = str;
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
    // this.parentNode.removeChild(this);
    list.splice(this.index, 1);
    render(list);
}

function visible(interval) {
    clearInterval(t);
    t = setInterval(function () {
        if (data.length) {
            render(data.shift());
        } else {
            clearInterval(t);
        }
    }, interval)
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

/**
 * 冒泡排序，每一次调换过程中，将数组的数状态存入另外一个数组data中，并将data可视化。
 */
function bubbleSort() {
    for (var i = 0; i < list.length - 1; i++) {
        for (var j = 0; j < list.length - 1 - i; j++) {
            if (list[j] > list[j + 1]) {
                var temp = list[j];
                list[j] = list[j + 1];
                list[j + 1] = temp;
                var newList = list.concat();
                data.push(newList);
            }
        }
    }

    visible(50);
}

function quickSort() {
    sort(list);
    clearInterval(t);
    t = setInterval(function () {
        if (data.length) {
            render(data.pop());
        } else {
            clearInterval(t);
        }
    }, 100)
}

/**
 *  快速排序核心，可视化有问题
 * @param arr
 * @returns {*}
 */
function sort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    var ind = Math.floor(arr.length/2);
    var mid = arr.splice(ind, 1);
    var left = [],
        right = [];

    for (var i = 0; i < arr.length; i++) {
        var cur = arr[i];
        if (cur < mid) {
            left.push(cur);
        } else {
            right.push(cur);
        }

    }

    // var res = left.concat([mid], right);
    data.push(left.concat([mid], right));
    return sort(left).concat([mid], sort(right));
}

window.onload = function () {
    var oBtns = document.getElementsByTagName('button');

    for (var i = 0; i < oBtns.length; i++) {
        console.log(oBtns[i].id);
        addEvent(oBtns[i], 'click', eval(oBtns[i].id));
    }
};

