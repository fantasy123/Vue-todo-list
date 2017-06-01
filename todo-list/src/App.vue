<template>
  <div id="app">
        <p class="demonstrate">在此输入任务</p>
        <input type="text" v-model='inputVal' @keyup.enter='addNew(inputVal)'>

        <ul>
            <li v-for='item in items' :class='{finished:item.isFinished}' @click='toggleFinished(item)'>
                <span class="tick">√</span>
                {{item.label}}
                <button @click='rmCurrent($event)'>×</button>
            </li>
        </ul>
  </div>
</template>

<script>
    export default {
        data: function(){
            return {
                items:[],
                inputVal:''
            }
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
        position: relative;
        left: 2.8em;

        width: 8em;
        height: 2em;
        padding-left: .5em;
    }

    .demonstrate{
        padding-left: 4.2em;
        color: #ccc;
    }

    ul{
        list-style: none;
    }

    ul li{
        position: relative;
        width: 8em;
        height: 3em;
        line-height: 3em;
        margin: 0 auto;
        color: #ccc;
    }

    ul li .tick{
        display: none;
        position: absolute;
        left: 1.5em;
    }
    ul li button{
        position: absolute;
        right: 0;
        top: 13px;
        right: 8px;
        font-size: 15px;
    }

    .finished{
        color:blue;
    }

    .finished .tick{
        display: inline-block;
    }
</style>
