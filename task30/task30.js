/**
 * Created by xiao on 2017/2/18.
 */


String.prototype.gblen = function () {
    var len = 0;
    for (var i = 0; i < this.length; i++) {
        var curCode = this.charCodeAt(i);
        if (curCode > 127 || curCode == 94) {
            len += 2;
        } else {
            len++;
        }
    }
    console.log('字符长度' + len);
    return len;
};

function nameValidator() {
    var name = document.getElementById('name');
    var value = name.value;
    if (value) {
        if (value.gblen() >= 4 && value.gblen() <= 16) {
            return 'success';
        } else {
            return 'error';
        }
    } else {
        return 'primary';
    }
}

function passwordValidator() {
    var password = document.getElementById('password');
    var value = password.value;
    if (value) {
        if (value.gblen() >= 4 && value.gblen() <= 16) {
            return 'success';
        } else {
            return 'error';
        }
    } else {
        return 'primary';
    }
}
function passwordSureValidator() {
    var passwordSure = document.getElementById('passwordSure');
    var value = passwordSure.value;
    if (value) {
        if (value.gblen() >= 4 && value.gblen() <= 16) {
            return 'success';
        } else {
            return 'error';
        }
    } else {
        return 'primary';
    }
}
function telValidator() {
    var value = document.getElementById('tel').value;
    if (value) {
        if ((/^1[34578]\d{9}$/).test(value)) {
            return 'success';
        } else {
            return 'error';
        }
    } else {
        return 'primary';
    }
}
function emailValidator() {
    var value = document.getElementById('email').value;
    if (value) {
        if ((/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).test(value)) {
            return 'success';
        } else {
            return 'error';
        }
    } else {
        return 'primary';
    }
}

function overallValidator() {
    var oInputs = document.getElementsByClassName('bot'),
        passwordValue = document.getElementById('password').value,
        passwordSureValue = document.getElementById('passwordSure').value;
    for (var i = 0; i < oInputs.length; i++) {
        if (oInputs[i].formObj.validator() == 'error') {
            alert('输入有误');
            return 'error';
        }
    }
    if (passwordValue == passwordSureValue) {
        return 'success';
    } else {
        alert('两次密码输入不一致');
    }
}
function onfocusHandle() {
    var demands = document.getElementsByClassName('demand');
    demands[this.formObj.index].style.display = 'block';
}

function onblurHandle() {
    var demands = document.getElementsByClassName('demand');
    var str = this.formObj.validator();
    console.log(str);
    demands[this.formObj.index].innerText = this.formObj[str];
    demands[this.formObj.index].className = 'demand ' + str;
    this.className = 'bot ' + str;

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
    var oInputs = document.getElementsByClassName('bot'),
        labels = document.getElementsByTagName('label'),
        submit = document.getElementById('submit');
    for (var i = 0; i < oInputs.length; i++) {
        oInputs[i].formObj = {
            label: labels[i].innerText,
            index: i,
            validator: eval(oInputs[i].id + 'Validator'),
            success: '格式正确',
            error: '未通过',
            primary: labels[i].innerText + '不能为空'
        };

        /*var formObj = {
         label: '名称',                                  // 表单标签
         type: 'input',                                  // 表单类型
         validator: function () {

         },                                              // 表单验证规则
         primary: '必填，长度为4-16个字符',               // 填写规则提示rules
         success: '格式正确',                             // 验证通过提示
         error: '名称不能为空'                            // 验证失败提示fail
         };*/

        /* oInputs[i].index = i;
         oInputs[i].validator = eval(oInputs[i].id + 'Validator');
         oInputs[i].success = '格式正确';
         oInputs[i].error = '未通过';
         oInputs[i].primary = labels[i].innerText + '不能为空';*/
        addEvent(oInputs[i], 'focus', onfocusHandle);
        addEvent(oInputs[i], 'blur', onblurHandle);
    }
    addEvent(submit, 'click', overallValidator);
};
