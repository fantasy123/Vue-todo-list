const STORAGE_KEY = 'todos-vuejs'

export default {
	fetch:function(){
		return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');//JSON字符串要解析为JS对象显示在页面上
	},
	save: function(items){
		window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items));//JS对象要序列化为JSON字符串存储起来
	}
}