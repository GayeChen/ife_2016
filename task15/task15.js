/**
 * Created by xiao on 2017/2/12.
 */

/**
 * getData()方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 *
 */

function getData() {
    /*
     data = [
     ["北京", 90],
     ["北京", 90]
     ……
     ]
     */

    var data = [],
        oUl = document.getElementById('source'),
        oLis = oUl.getElementsByTagName('li'),
        i,txt,city,aqi;

    for (i = 0; i < oLis.length; i++) {
        txt = oLis[i].innerText;
        city = txt.slice(0,2);
        aqi = txt.slice(-2);
        data.push([city, aqi]);
        console.log(city + ':' + aqi);
    }
    return data;
}

/**
 *  sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 * @param data
 */
function sortAqiData(data) {
    data.sort(function (x, y) {
        return y[1] - x[1];
    })
}


/**
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 * @param data
 */
function render(data) {
    var strContent = '',
        resort = document.getElementById('resort'),
        chineseNum = ["一","二","三","四","五","六","七","八","九","十"];

    data.forEach(function (element, index) {
        strContent += '<li>第' + chineseNum[index] + '名：' + element[0] + '空气质量：<b>' + element[1] + '</b></li>';
    });
    resort.innerHTML = strContent;
}

function btnHandle() {
    var aqiData = getData();
    sortAqiData(aqiData);
    render(aqiData);
}


window.onload = function () {
    var sortBtn = document.getElementById('sortBtn');
    sortBtn.onclick = function () {
        btnHandle()
    }; //開闢空間，將函數體裡面的代碼當做字符串保存到這個空間
    // sortBtn.onclick = btnHandle();  此種寫法會導致btnHandle被直接調用；

};


