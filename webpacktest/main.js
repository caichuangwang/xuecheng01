//引用model01.js的add方法
var {add} = require("./model01");
//引入vue.js文件
var Vue = require("./vue.min");

var VM = new Vue({
    el:"#app",
    data:{
        name:'黑马程序员',// 相当于是MVVM中的Model这个角色
        num1:0,
        num2:0,
        result:0,
        url:'http://www.itcast.cn'
    },
    methods:{
        change:function () {
            this.result = Number.parseInt(this.num1) + Number.parseInt(this.num2);
            //alert(this.result);
        }
    }
});