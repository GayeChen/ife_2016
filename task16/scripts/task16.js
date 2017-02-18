/**
 * Created by xiao on 2017/2/12.
 */

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

var aqiData = {};

var cityHeader = ['每日','月平均','年平均'];

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var aqiCity = document.getElementById('aqiCity'),
        aqiValue = document.getElementById('aqiValue'),
        strCity = removeSpaces(aqiCity.value),
        strValue = removeSpaces(aqiValue.value);
    // aqiData[strCity] = strValue;
    if (cityCheck() && valueCheck()) {
        aqiData[strCity] = strValue;
    } else {
        return;
    }
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delAqiData(e) {
    var city = e.target.name;
    if (city in aqiData) {
        delete aqiData[city];
    }

    renderAqiList();
}

function sortAqiList() {
    var newData = {};
    var data = Object.keys(aqiData).sort(function(a,b)
    {
        return aqiData[a]-aqiData[b];
    });
    for (var city in data) {
        // console.log(data[city]);
        newData[data[city]] = aqiData[data[city]];
    }

    aqiData = newData;
    renderAqiList();
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqiTable = document.getElementById('aqiTable'),
        strContent = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
    for ( var city in aqiData) {
        strContent +=  '<tr><td>' + city + '</td><td>' + aqiData[city] + '</td><td><button name=' + city + '>删除</button></td></tr>';
    }
    aqiTable.innerHTML = strContent;
}

function removeSpaces(str) {
    return str.replace(/^\s+/g,"").replace(/\s+$/g,"");
}

function cityCheck() {
    var regex =/^[a-zA-Z\u4E00-\u9FA5]+$/,
        aqiCity = document.getElementById('aqiCity').value;

    if(!removeSpaces(aqiCity).match(regex)) {
       alert("城市名为中文或者英文");
       return false;
    }
    return true;
}

function valueCheck() {
    var regex = /^[0-9]*[1-9][0-9]*$/,
        aqiValue = document.getElementById('aqiValue').value;
    if(!removeSpaces(aqiValue).match(regex)) {
        alert("空气质量请输入整数");
        return false;
    }
    return true;
}

window.onload = function () {
    var addBtn = document.getElementById('addBtn'),
        sortBtn = document.getElementById('sortBtn'),
        aqiCity = document.getElementById('aqiCity'),
        aqiValue = document.getElementById('aqiValue'),
        aqiTable = document.getElementById('aqiTable');


    /*aqiCity.onblur = function () {
        if(!cityCheck()) {
            return;
        }
    };
    
    aqiValue.onblur = function () {
        if (!valueCheck()) {
            return;
        }
    };*/
    
    addBtn.onclick = function () {
        addAqiData();
    };

    sortBtn.onclick = function () {
        sortAqiList();
    };

    aqiTable.onclick = function (e) {
        e = e || window.event;
        delAqiData(e);
    }

};


/*1、Object.keys(obj)返回参数obj中可被枚举的所有自身属性的属性名组成的数组
*
* 2、
* */

