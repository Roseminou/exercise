<template>
    <div>
        <p class="text">整体</p>
    </div>
</template>
<script>
import Vue from 'vue'
const componentsArray = require.context(
    // 要查找的文件路径
    './components',
    // 是否查找子目录
    true,
    // 要匹配文件的正则
    /.vue$/
)
export default {
    beforeMount() {
        console.log('this', this);
        componentsArray.keys().forEach(fileName => {
            // 获取组件配置
            const componentConfig = componentsArray(fileName)
        
            // 获取组件的 PascalCase 命名
            // 获取和目录深度无关的文件名 (获取组件的组件名)
            const componentName = fileName
                .split("/")
                .pop()
                .replace(/\.\w+$/, "");
            console.log('fileName---', fileName);

            // 全局注册组件
            Vue.component(
                componentName,
                // 如果这个组件选项是通过 `export default` 导出的，
                // 那么就会优先使用 `.default`，
                // 否则回退到使用模块的根。
                componentConfig.default || componentConfig
            )
        })
        
    },
    components: {
        
    },
    mounted() {
        console.log('注册组件', componentsArray);
        // 返回值是一个webpackContext函数(对象)
        // 注册组件 ƒ webpackContext(req) {
            //     return __webpack_require__(webpackContextResolve(req));
            // }
        // var map = {
        //     "./A.vue": "./src/modules/基础组件的自动全局化注册/components/A.vue",
        //     "./B.vue": "./src/modules/基础组件的自动全局化注册/components/B.vue",
        //     "./C.vue": "./src/modules/基础组件的自动全局化注册/components/C.vue"
        // };
        // function webpackContext(req) {
        //     return __webpack_require__(webpackContextResolve(req));
        // };
        // function webpackContextResolve(req) {
        //    // 生成map对象
        //     var id = map[req];
        //      // 抛出异常
        //     if(!(id + 1)) // check for number or string
        //         throw new Error("Cannot find module '" + req + "'.");
        //     return id;
        // };
        // webpackContext.keys = function webpackContextKeys() {
        //     return Object.keys(map);
        // };
        // webpackContext.resolve = webpackContextResolve;
        // module.exports = webpackContext;
        // webpackContext.id = "./src/modules/基础组件的自动全局化注册/components recursive .vue$";

    },
}
</script>
<style>
    
</style>