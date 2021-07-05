function popSort1(array) {
    // 冒泡排序 从小到大，两个数组
    let len = array.length,
        i, j, temp
    result = [...array]
    for(i = 0; i < len; i++) {
        for(j = 0; j < len - 1; j++) {
            if (result[j] > result[j+1]) {
                temp = result[j+1]
                result[j + 1] = result[j]
                result[j] = temp
            }
            
        }
    }
    console.log('排序后的数组111', result);
}

function popSort2(array) {
  // 冒泡排序 从小到大
  let len = array.length,
    i, j, temp
  result = [...array]
  for (i = 0; i < len; i++) {
    for (j = len - 1; j > i; j--) {
      if (result[j] > result[j + 1]) {
        temp = result[j + 1]
        result[j + 1] = result[j]
        result[j] = temp
      }

    }
  }
  console.log('排序后的数组222', result);
}

var testA = 5;
var testFun = function() {
    return '测试数字' + testA
}


//导出方式1
// exports.popSort1 = popSort1;
// exports.popSort2 = popSort2;

//导出方式2
// module.exports.testA = testA;
// module.exports.testFun = testFun;

//导出方式3
/*module.exports={
    size:getSize,
    perimiter:getPerimter
};*/

// export {
//     popSort2,
//     testFun,
// }