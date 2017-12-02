////////
// 目录 //
////////

// 1. 深度克隆 deepClone
// 2. 数据类型检测 type
// 3. 数组去重 unique
// 4. 随机整数生成 randomInt







//////////////
// 深度克隆数据方法 //
//////////////

// var phone = {
//     name : 'iPhone6',    // String
//     price : 5888,    // Number
//     isPlus : false,    // Boolean
//     screen : [1366, 768],    // Array
//     camera : {back : '500px', front : '200px'},    // Object
//     use : function () {console.info('I can fly.')}    // Function
// };

// var myPhone;

function deepClone (orign,target) {
    var target = target;
    // 判断克隆对象的类型
    var type = typeof(orign);
    type = type.toLowerCase();
    // Null, Number, String, Boolean, Undefined, Function 类型 (浅度克隆, 递归出口)
    if (orign === null || type === 'number' || type === 'string' || type === 'boolean' || type === 'undefined' || type === 'function') {
        target = orign;
    }
    // Obeject 类型
    else {
        target = (orign instanceof Array) ? [] : {};
        for(var prop in orign) {
            target[prop] = clone(orign[prop], target[prop]);
        }
    }
    return target;
}









///////////////////////////
// 封装 type 方法, 区分每一种数据类型 //
///////////////////////////

function type (data) {
    // 首先使用 typeof 操作符
    var dataType = typeof(data);
    dataType = dataType.toLowerCase();
    // typeof 操作符无法分辨时执行以下操作
    if (dataType == 'object') {
        dataType = Object.prototype.toString.call(data).toLowerCase();
        dataType = dataType.slice(1, -1);    // 截取中括号内的字符
    }
    return dataType;
}










///////////////////
// 在原型链上编程, 数组去重 //
///////////////////

// 方法 1
// Array.prototype.unique = function () {
//     for (var i = 0; i < this.length; i++) {
//         for (var j = i + 1; j < this.length; j++) {
//             if (this[i] === this[j]) {
//                 for (var k = j; k + 1 < this.length; k++) {
//                     this[k] = this[k + 1];
//                 }
//                 this.pop();
//                 j--;
//             }
//         }
//     }
//     return this;
// }

// 方法 2
Array.prototype.unique = function () {
    var obj = {},
        newArr = [];
    for (var i = 0; i < this.length; i++) {
        if (!obj[this[i]]) {
            obj[this[i]] = true;
            newArr.push(this[i]);
        }
    }
    return newArr;
}










/////////////
// 随机整数生成器 //
/////////////
function randomInt (min, max) {
    return Math.floor((max - min + 1) * Math.random() + min);
}













/////////////////
// （兼容性）绑定事件方法 //
/////////////////
function addEvent (element, type, handler) {
    // 一般情况
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } 
    // IE
    else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    }
    // 其它
    else {
        element["on" + type] = handler
    }
}










////////////
// （兼容性）阻止事件冒泡 //
////////////
function stopBubble (event) {
    // 一般情况
    if (event.stopPropagation) {
        event.stopPropagation();
    }
    // IE
    else {
        event.cancelBubble = true;
    }
}