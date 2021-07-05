<template>
    <div>
        <!-- v-if -->
        <div class="firstTest">
            <div class="username" v-if="inputText === 'username'">
                <label for="">用户名</label>
                <input type="text" placeholder="请输入用户名" key="username-inpue">
            </div>
            <div class="email" v-else>
                <label for="">电子邮箱</label>
                <input type="text" placeholder="请输入邮箱地址" key="email-input">
            </div>
            <button @click="change">切换</button>
        </div>
         <div class="secondTest">
             <div class="username" v-if="secondInputText === 'username222'">
                <label for="">用户名</label>
                <input type="text" placeholder="请输入用户名">
            </div>
            <div class="email" v-else>
                <label for="">电子邮箱</label>
                <input type="text" placeholder="请输入邮箱地址">
            </div>
            <button @click="change222">切换</button>
         </div>
         <div class="vFor">
            <div v-for="(item, index) in items" :key="index">
                {{item.name}}
            </div>
            <div v-for="item of items" :key="item.index">
                {{item.name}}
            </div>
            <!-- 对象遍历 -->
            <div v-for="(value, index) in people" :key="index">{{value}}</div>
         </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            inputText: "username",
            secondInputText: "username222",
            items: [
                {
                    name: 'aaa',
                },
                {
                    name: 'bbb',
                },
                {
                    name: 'ccc',
                },
            ],
            people: {
                name: "王一博",
                age: 24,
                like: ["滑板", "街舞", "滑雪"],
                sex: "man",
            }
        }
    },
    methods: {
        change() {
            if (this.inputText === 'username') {
                this.inputText = "email"
            } else {
                this.inputText = 'username'
            }
        },
        change222() {
            if (this.secondInputText === 'username222') {
                this.secondInputText = "email222"
            } else {
                this.secondInputText = 'username222'
            }
        },
        
    },
}
</script>
<style lang="">
    .firstTest {
        margin-bottom: 150px;
    }
</style>