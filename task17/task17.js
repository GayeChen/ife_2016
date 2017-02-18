/**
 * Created by xiao on 2017/2/12.
 */

/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */
var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    currentCity: 0,
    currentGraTime: "day"
};

// 时间粒度和城市数组
var graTime = ['day', 'week', 'month'],
    city = Object.getOwnPropertyNames(aqiSourceData),
    colors = ['#ccc', '#505652', '#102720', '#CC5F57', '#5C17CC'],
    headers = {
        day: '每日',
        week: '周平均',
        month: '月平均'
    };

var $ = function (id) {
    return document.getElementById(id);
};

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear(),
        m = dat.getMonth() + 1,
        d = dat.getDate();

    m = ('0' + m).slice(-2);
    d = ('0' + d).slice(-2);
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var result = {},
        dat = new Date("2017-01-01"),
        datStr = '';
    for (var i = 1; i < 91; i++) {
        datStr = getDateStr(dat);
        result[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return result;
}

function getWidth(width, len) {
    var posObj = {};
    posObj.width = Math.floor(width / (len * 2));
    posObj.left = Math.floor(width / len);
    posObj.offsetLeft = (width - posObj.left * (len - 1) - posObj.width) / 2;
    return posObj;
}

/**
 * 渲染图表
 */
function renderChart() {
    var data = chartData[pageState.currentGraTime][city[pageState.currentCity]],
        i = 0,
        contentStr = '',
        width = $('aqiDisplay').offsetWidth,
        len = Object.keys(data).length;
    console.log("data:" + data);
    contentStr = "<div class='header'>" + city[pageState.currentCity] + "市2017年01-03月" + headers[pageState.currentGraTime] + "空气质量报告</div>";
    for (var datStr in data) {
        contentStr += "<div style='width: " + Math.floor(width / len) / 2 + "px;height: " + data[datStr] + "px; left: " + (i * Math.floor(width / len) + Math.floor(width / len) / 4) + "px; background-color: " + colors[Math.floor(data[datStr] / 100)] + "'title = " + datStr + ":" + data[datStr] + "></div>";

        i++;
    }

    $('aqiDisplay').innerHTML = contentStr;

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化

    // 设置对应数据

    // 调用图表渲染函数
    // renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化

    // 设置对应数据
    pageState.currentCity = $('citySelect').selectedIndex;
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var formGraTime = $('formGraTime'),
        oDivs = formGraTime.getElementsByTagName('div');
    for (var i = 0; i < oDivs.length; i++) {
        oDivs[i].index = i;
        oDivs[i].onclick = function () {
            for (var j = 0; j < oDivs.length; j++) {
                oDivs[j].className = '';
            }
            pageState.currentGraTime = graTime[this.index];
            renderChart();
            console.log(graTime[this.index]);
            console.log(pageState);
            this.className = 'selected';
        }
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var citySelect = $('citySelect'),
        contentStr = '';
    for (var city in aqiSourceData) {
        contentStr += "<option value=" + city + ">" + city + "</option>";
    }
    citySelect.innerHTML = contentStr;

    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    citySelect.onchange = function () {
        console.log(citySelect.selectedIndex);
        citySelectChange();
    }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中

    var week = {}, wCountAqi = 0, singleWeek = {},
        month = {}, mCountAqi = 0, singleMonth = {},
        singleCity = {}, datStr = [];
    for (var city in aqiSourceData) {
        singleCity = aqiSourceData[city];
        console.log(city);
        datStr = Object.getOwnPropertyNames(singleCity);
        var currentMonthStr = datStr[0].slice(5, 7);
        var wCountDay = 0, weekInit = 4;
        //weekInit：2017-01-01的前一天为周几？ 当前月的第几天？每过七天清空一次

        for (var i = 0; i < datStr.length; i++, weekInit++) {
            wCountAqi += singleCity[datStr[i]];
            mCountAqi += singleCity[datStr[i]];
            wCountDay++;

            //条件为：周末/月末/最后一天
            if ((weekInit + 1) % 7 == 0 || i == datStr.length - 1 || datStr[i + 1].slice(5, 7) !== currentMonthStr) {
                var weekKey = datStr[i].slice(0, 7) + "月第" + (Math.floor(weekInit / 7) + 1) + "周";
                singleWeek[weekKey] = Math.floor(wCountAqi / wCountDay);

                //当前天为本月月末并且不是最后一天
                if (i != datStr.length - 1 && datStr[i + 1].slice(5, 7) !== currentMonthStr) {
                    weekInit = wCountDay % 7
                }
                wCountDay = 0;
                wCountAqi = 0;

                //当前天为月末或者最后一天
                if (i == datStr.length - 1 || datStr[i + 1].slice(5, 7) !== currentMonthStr) {
                    //如果不是最后一天，修改当前月为下一天的月份
                    currentMonthStr = i == datStr.length - 1 ? datStr[i].slice(5, 7) : datStr[i + 1].slice(5, 7);
                    var monthKey = datStr[i].slice(0, 7);
                    var mCountDay = datStr[i].slice(-2);
                    singleMonth[monthKey] = Math.floor(mCountAqi / mCountDay);
                    mCountAqi = 0;
                }
            }
        }

        week[city] = singleWeek;
        month[city] = singleMonth;
        singleWeek = {};
        singleMonth = {};
    }

    chartData.day = aqiSourceData;
    chartData.week = week;
    chartData.month = month;
    console.log(chartData);
    renderChart();
}

/**
 * 初始化函数
 */
window.onload = function () {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
};

/*
 datStr[i+1].slice(5, 7) !== currentMonthStr要放在条件最后一条*/
