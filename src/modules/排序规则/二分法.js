function divideSort(arr) {
    // 二分法排序
    var len = arr.length;
    var left = 0,
      right = 0,
      point = 0; //定义三个标记位，point就是最中间的位置
    var nArr = [];
    nArr[0] = arr[0]; //定义一个数组后，把arr中第一个数先赋给nArr
    for (var i = 1; i < len; i++) {
      left = 0;
      var nLen = nArr.length;
      right = nLen;
      for (var j = 0; j < nLen; j++) {
        point = Math.floor((left + right) / 2); //取整
        if (nArr[point] < arr[i]) {
          left = point + 1; //注意必须加1
        } else {
          right = point;
        }
        if (right == left) { //如果right和left相等就表示找到了插入的位置 ，插入后，跳出循环
          nArr.splice(left, 0, arr[i]);
          break;
        }
      }
    }
    console.log(nArr);
    return nArr
}
function divideSort2(array) {
    let newArray,
        len = array.length,
        point = 0,
        left = 0,
        right = 0
    newArray[0] = array[0]
    // newArray数组中间跟array数组中的元素对比大小
    for(let i = 0; i < len; i++) {
        let newLen = newArray.length
        right = newLen
        for (let j = 0; j < newLen; j++) {
            point = Math.floor((left + right) / 2)
            if (newArray[point] < array[0]) {
                left = point + 1 
            } else {
                right = point
            }
            if (left == right) {
                newArray.splice(left, 0, array[i])
                break
            }
        }
    }
}