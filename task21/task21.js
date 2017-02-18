/**
 * Created by xiao on 2017/2/15.
 */

var tagsList = [],
    hobbyList = [],
    $ = function (id) {
        return document.getElementById(id);
    };

/**
 * @param list
 * 当数组超过10个时，弹出第一个
 */
function limitedHandle(list) {
    if (list.length >= 10) {
        list.shift();
    }
}

/**
 *  如果val值符合要求,将其添加到list数组中,并在页面渲染出来
 * @param val
 * @param list
 * @param element
 */
function addSingleVal(val, list, element) {
    if (!isExist(val, list)) {
        limitedHandle(list);
        if (val) {
            list.push(val);
        }
        render(element, list);
    }
}

/**
 * 判断某个值value在数组list中是否存在,若存在返回true,否则返回false
 * @param value
 * @param list
 * @returns {boolean}
 */
function isExist(value, list) {
    for (var i = 0; i < list.length; i++) {
        if (value == list[i]) {
            return true;
        }
    }
    return false;
}

/**
 *  将list中的数据在指定dom元素element中通过innerHTML渲染出来，并重新绑定事件；
 * @param element
 * @param list
 */
function render(element, list) {
    var str = '';
    for (var i = 0; i < list.length; i++) {
        str += "<div class='show " + element.id + "'>" + list[i] + "</div>"
    }
    element.innerHTML = str;
    reBindEvent(element.id);
}

/**
 * 给某一类型的每一个显示div元素，添加一系列自定义属性来存储其信息，并对其不同类型事件绑定相应函数
 * @param str
 */
function reBindEvent(str) {
    var oDivs = document.getElementsByClassName(str);
    for (var i = 0; i < oDivs.length; i++) {
        oDivs[i].index = i;
        oDivs[i].txt = oDivs[i].innerText;
        oDivs[i].bg = oDivs[i].style.backgroundColor;
        // 给每个用来显示数据的div自定义一个属性存储其相对应数组名；
        oDivs[i].listName = oDivs[i].className.slice(5, -4) + 'List';

        // console.log('listName:' + oDivs[i].listName);
        addEvent(oDivs[i], 'mouseover', mouseOverHandle);
        addEvent(oDivs[i], 'mouseout', mouseOutHandle);
        addEvent(oDivs[i], 'click', clickHandle);
    }
}

function mouseOverHandle() {
    this.innerText = '点击删除' + this.innerText;
    this.style.backgroundColor = 'red';
}

function mouseOutHandle() {
    this.innerText = this.txt;
    this.style.backgroundColor = this.bg;
}

/**
 *   div显示元素被点击时需要删除，数组中相对应的数据，并且重新渲染页面；
 */
function clickHandle() {
    eval(this.listName).splice(this.index, 1);
    render(this.parentNode, eval(this.listName));
}

/**
 *
 * @param e
 */
function keyUpHandle(e) {
    var tagInput = $('tagInput');
    if (e.keyCode === 13) {
        addSingleVal(tagInput.value, tagsList, $('tagsShow'));
        tagInput.value = '';
    }
}

/**
 *  当tag输入框匹配正则时，做出进一步处理
 */
function tagHandle() {                                    // 不复用
    var regex = /[(\s)*\r\n\,\，\、\;\；\\]$/,
        tagInput = $('tagInput'),
        value = tagInput.value,
        tagsShow = $('tagsShow');
    if (value.match(regex)) {
        addSingleVal(value.slice(0, -1), tagsList, tagsShow);
        tagInput.value = '';
    }
}


function hobbyHandle() {
    var hobbyShow = document.getElementById('hobbyShow'),
        hobbyInput = $('hobbyInput'),
        value = hobbyInput.value,
        content = value.split(/[(\s)+\r\n\,\，\、\;\；]/);
    for (var i = 0; i < content.length; i++) {
        addSingleVal(content[i], hobbyList, hobbyShow);
        hobbyInput.value = '';
    }
}

/**
 *   兼容不同浏览器的事件绑定函数
 * @param element       元素
 * @param type          事件类型
 * @param handle        事件处理函数
 */
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
    var ensureHobby = $('ensureHobby');

    addEvent(document, 'keyup', keyUpHandle);
    addEvent(ensureHobby, 'click', hobbyHandle);
    setInterval(function () {
        tagHandle();
    }, 50);
};


/*function addTag(value, list) {                  //      很难复用
 var tagInput = $('tagInput'),
 tagsShow = $('tagsShow');
 // value = value.replace(/^\s+/g, "").replace(/(\s)*!/g, "");

 if (!isExist(value, list)) {
 limitedHandle(list);

 if (value) {
 list.push(value);
 }
 render(tagsShow, list);
 }

 tagInput.value = '';
 console.log('tagList:' + tagsList);
 }

 function addHobby(value, list) {                  //      很难复用
 var hobbyInput = $('hobbyInput'),
 hobbyShow = $('hobbyShow');
 // value = value.replace(/^\s+/g, "").replace(/(\s)*!/g, "");

 if (!isExist(value, list)) {
 limitedHandle(list);

 if (value) {
 list.push(value);
 }
 render(hobbyShow, list);
 }

 hobbyInput.value = '';
 console.log('hobbyList:'+ hobbyList);
 }*/


/*function unique(list) {
 var obj = {};
 for (var i = 0; i < list.length; i++) {
 var temp = list[i];
 if (obj[temp]) {
 list[i] = list[list.length - 1];
 list.length--;
 i--;
 continue;
 }
 obj[temp] = temp;
 }
 return list;
 }

 function dupLimitHandle(arr) {
 var left = arr.splice(0, 1);
 for (var i = 0; i < arr.length; i++) {
 var cur = arr[i];
 for (var j = 0; j < left.length; j++) {
 if (cur != left[j]) {
 left.push(cur);
 }
 }
 }

 if (left.length > 10) {
 left.splice(-10);
 }
 return left;
 }*/