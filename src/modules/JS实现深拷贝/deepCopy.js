function deepCopy(newobj, oldobj) {
    for (let k in oldobj) {
        // 判断我们的属性值属于哪种数据类型
        // 1.获取属性值 oldobj[k]
        let item = oldobj[k];
        // 判断这个是否为数组
        if (item instanceof Array) {
            newobj[k] = [];
            deepCopy[newobj[k], item];
        } else if (item instanceof Object) {
            // 3. 判断这个值是否是对象
            newobj[k] = [];
            deepCopy[newobj[k], item];
        } else {
            // 4. 属于简单数据类型
            newobj[k] = item;
        }
    }
}