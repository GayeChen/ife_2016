/**
 * Created by xiao on 2017/2/12.
 */

var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var strCity = removeSpaces($('#aqiCity').val()),
        strValue = removeSpaces($('#aqiValue').val());

    aqiData[strCity] = strValue;
    $('#aqiCity').val('');
    $('#aqiValue').val('');
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
        newData[data[city]] = aqiData[data[city]];
    }

    aqiData = newData;
    renderAqiList();
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var strContent = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
    for ( var city in aqiData) {
        strContent +=  '<tr><td>' + city + '</td><td>' + aqiData[city] + '</td><td><button name=' + city + '>删除</button></td></tr>';
    }
    $('#aqiTable').html(strContent);
}

function removeSpaces(str) {
    // return str.trim().replace(/\s+/g,"");
    return $.trim(str);
}

function cityCheck() {
    var regex =/^[a-zA-Z\u4E00-\u9FA5]+$/,
        aqiCity = $('#aqiCity').val();

    if(!removeSpaces(aqiCity).match(regex)) {
        alert("城市名为中文或者英文");
        return false;
    }
    return true;
}

function valueCheck() {
    var regex = /^[0-9]*[1-9][0-9]*$/,
        aqiValue = $('#aqiValue').val();
    if(!removeSpaces(aqiValue).match(regex)) {
        alert("空气质量请输入整数");
        return false;
    }
    return true;
}

$(document).ready(function () {

    /*$('#aqiCity').on('blur', function () {
        if ($('#aqiCity').val()) {
            return;
        } else if(!cityCheck()) {
            $('#aqiCity').val('');
            return;
        }
    });

    $('#aqiValue').on('blur', function () {
        if ($('#aqiValue').val()) {
            return;
        } else if(!valueCheck()) {
            $('#aqiValue').val('');
            return;
        }
    });*/

    $('#sortBtn').on('click', function () {
        sortAqiList();
    });

    $('#aqiTable').on('click', function (e) {
        e = e || window.event;
        delAqiData(e);
    });

    $('#addBtn').on('click', function () {
        if (cityCheck() && valueCheck()) {
            addAqiData();
        } else {
            return;
        }
    })
});



