function divideSeek(array, value) {
    let len = array.length, 
        point = 0,
        left = 0,
        right = len,
        index
    for(let i = 0; i < len; i++) {                              // 1到n-1
        point = Math.floor((left + right)/2)                    // 1 到 n/2^n
        if (value == array[point]) {                            
            index = i
            console.log('index---', i, array[point], point);
            break
        } else {
            if (value < array[point]) {
                right = point - 1
            } else {
                left ++
            }
            if (right == left) {
                break
            }

        }
    }
    return index
    // 最好情况 T(n) = 1
    // 最坏情况 T(n) = n/2^n
    // 时间复杂度 log(n)
}
// 二分法查找递归算法
function divideSeekDigui(array, left, right, key) {
    if (left>right) {
        return -1
    }
    let point = Math.floor((left+right)/2)
    if (key == array[point]) {
        return point
    } else if (key > array[point]) {
        left = point + 1
        return divideSeekDigui(array, left, right, key)
    } else {
        right = point - 1
        return divideSeekDigui(array, left, right, key)
    }
}

// 二分法查找
function find(arr, k) {
  let len = arr.length;
  let i = 0;
  let j = len - 1;
  while (i <= j) {
    let cur = i + Math.floor((j - i) / 2);
    if (arr[cur] === k) {
      return cur;
    } else if (arr[cur] < k) {
      i = ++cur;
    } else {
      j = --cur;
    }
  }
  return null;
}