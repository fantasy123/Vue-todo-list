<template>
  <div id="app">
        <p class="demonstrate">在此输入任务</p>
        <input type="text" v-model='inputVal' @keyup.enter='addNew(inputVal)'>

        <ul>
            <li v-for='item in items' :class='{finished:item.isFinished}' @click='toggleFinished(item)'>
                <span class="content-wrap">
                    <span class="tick">√</span>
                    {{item.label}}
                    <button @click='rmCurrent($event)'>×</button>
                </span>
            </li>
        </ul>
  </div>
</template>

<script>
    import Store from './store';

    export default {
        data: function(){
            return {
                items:Store.fetch(),//将local storage里已存在的JSON字符串解析为JS对象添加到页面里
                inputVal:''
            }
        },
        watch:{
            items:function(items){
                Store.save(items);//将items数组序列化为JSON字符串保存到浏览器的一个文件中
            },
            deep:true
        },
        methods:{
            toggleFinished:function(obj){
                obj.isFinished=!obj.isFinished;
            },
            addNew:function(v){
                this.items.push(
                    {
                        label:v,
                        isFinished:false
                    }
                );

                this.inputVal='';
            },
            rmCurrent:function(e){
                let btn=e.target,   //方法以事件为唯一的参数,如果使用内联语句,语句可以访问一个 $event 属性
                    li=btn.parentNode;

                function removeSelf(dom){
                    dom.parentNode.removeChild(dom);
                }

                removeSelf(li);
            }
        }
    }
</script>

<style>
    #app {
        padding-top: 5em;
        text-align: center;
    }

    [type='text']{
        width: 8em;
        height: 2em;
        padding-left: .5em;
    }

    .demonstrate{
        color: #ccc;
    }

    ul{
        list-style: none;
    }

    ul li{
        height: 3em;
        line-height: 3em;
        margin: 0 auto;
        color: #ccc;
    }

    .content-wrap{
        position: relative;
        right: 1.2em;
    }

    ul li .tick{
        opacity: 0;
        left: 1.5em;
    }
    ul li button{
        right: 0;
        top: 13px;
        right: 8px;
        font-size: 15px;
    }

    .finished{
        color:blue;
    }

    .finished .tick{
        opacity: 1;
    }
</style>
