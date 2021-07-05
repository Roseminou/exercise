/**
 * 基础数据类型
 * + number
 * + string
 * + boolean
 * + null
 * + undefined
 * + symbol
 * + bigint
 * 
 * 引用数据类型
 * + object
 *  + 普通对象 Map
 *  + 实例对象
 *  + 数组对象 Set
 *  + 正则对象
 *  + 日期对象
 *  + prototype原型对象
 *  +...
 * + function
 */
// Symbol([Value]): 创建唯一值
console.log(Symbol('A') == Symbol('A'));        // false

// let firstName = Symbol();
let firstName = "哈哈哈";
let person = {};
person[firstName] = "huochai";
console.log(person[firstName]); // "huochai"
console.log(firstName); // "huochai"

console.log('最大安全数字', Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log('最小安全数字', Number.MIN_SAFE_INTEGER); // -9007199254740991

let a = 9007199254740991n   // 类型为bigint

let res = parseFloat('left: 200px')
console.log('res', res, res == 'NaN'); // NaN 任何NaN都不相等
if (res === 200) {
    alert(200);
} else if (res === NaN) {
    alert(NaN)
} else if (typeof res === 'number') {
    alert('number')
} else {
    alert('Invalid Number')
}


// 数据类型检测 typeof 检测出来的类型值为字符串
console.log('null的类型', typeof null); // object 计算机底层存储以二进制存储，null存为二进制是000，000开头的都是对象，计算机混了
console.log('undefined的类型', typeof undefined);   // undefined
console.log('[]的类型', typeof []); // object


// 数据类型转换
/** 把其他数据类型转换为布尔
 * ! 转换为布尔值后取反
 * !! 转换为布尔类型
 *  Boolean(val)
 *  规则：只有0、null、undefined、空字符串  四个值会变为布尔的false，其余都是true
 * 
 * */ 

console.log(null == undefined); // true
console.log(null == 0); // false

 
console.log([] == false);
// 对象 == 布尔     都转换为数字（隐式转换）
// 对象转换为数字：先toString转换为字符串（应该是先给予valueOf获得原始值，没有原始值再去toString），再转换为数字的
// [] => '' => 0
// false => 0   true => 1
// 输出结果为true


/** 把其他类型转换为Number类型
 *  1. 特定需要转换为Number
 *  Number(val)
 *  parseInt/parseFloat(val)
 *  2. 隐式转换 （浏览器内部默认要先转换为Number类型在进行计算的）
 *      isNaN(val)
 *      数字运算
 *      在==比较的时候，有些值需要转为数字再进行比较
 * 
 */

console.log(Number(''));    // 0
console.log(Number('10'));  // 10
console.log(Number('10px'));    // NaN
console.log(Number(null));  //0
console.log(Number(undefined)); //NaN
// console.log(Number(Symbol(10)));    // 报错
console.log(Number(BigInt(10)));    // 10  



let arr = [1.12,3,4]
arr.map(a => {
    parseInt(a)
    console.log('遍历arr', parseInt(a));
})
    console.log('遍历arr', arr.map(parseInt));






