// 模块化解决方案：
// 1. Node.js      CommonJS规范（服务器端模块化）是外国的一个国际组织，一个团伙打手搞出来的
// 2. Require.js   AMD规范（浏览器端模块化）是一个外国小伙搞出来的，
// 3. Sea.js       CMD规范 （浏览器端模块化）在国内比较流行，与require.js大同小异，不过全是中文文档）玉伯一个人搞出来的，超级厉害思密达
// 4. ES6          本身就是一个规范，牛！！！ （浏览器端模块化）也是一个国际组织搞出来的





// npm三大功能 安装、创建、发布



// Node.js模块化的2个核心功能
// 1. 能够找到并加载Js文件，使用require来加载（根据约定来查找加载模块，而在requireJS中是根据配置config来查找加载模块，约定优于配置）
// 2. 通过作用域（文件作用域）隔离解决冲突，通过导入导出突破隔离
// 第二个核心功能可以通过函数作用域模拟出来（通过传参的形式导入函数作用域中，
// 通过在函数内部 return+数据 的形式将数据导出到函数作用域外部）
// 第一个核心功能可以通过两种方法模拟出来
// 方法1. 使用浏览器来加载JS文件    
// 使用代码创建<script>标签设置该标签的src属性，然后将该标签添加到<head>标签中
// jQuery中有可以实现的方法 $.getScript
// 方法2. 使用ajax请求来加载JS文件


// 在Node.Js中组织代码的基本方法（可以让server.js项目代码更纯粹，看起来更美）
// 1. 创建一个模块(在本例子中，所创建的模块就是template.js)
// 2. 将相关代码放进去(相关代码就是在server.js中所要导入的代码，也是在template.js中所要导出的代码，
// 从而让server.js也就是bookStore这个项目依赖于express模块包和template.js模块，
// 而express模块又依赖于其它好多模块，template.js模块又依赖于art-template模块)
// 3.设置本模块（template.js）的导入和导出





// 1. 找到所要导入的模块
// const template = require('art-template');

// 2.  找到所要导出的代码
// template.config('cache',false); //在开发过程中，将'cache'改为false，在产品上线时将其改为true
// template.helper('currency',function(value,type,length){
//       type = type || '￥';
//       length = length || 2;
//       return type + value.toFixed(length)
// })

// 第一种方法  
// 思路：将所要导出的代码放入一个自调匿名函数中，且自调函数中设置返回值为要导出的内容template（即return template）
// const template = require('art-template');
// module.exports = (function (){
//     template.config('cache',false); //在开发过程中，将'cache'改为false，在产品上线时将其改为true
//     template.helper('currency',function(value,type,length){
//         type = type || '￥';
//         length = length || 2;
//         return type + value.toFixed(length)
//     })
//     return template;
// })();



// 第二种方法
// 思路：1.设置导入模块
const template = require('art-template');

// 2. 将相关代码放入导出模块中（相当于给导入的模块template换了一身新衣，
// 将相关代码放入后，导入的模块template已经变成了一个新的template模块）
template.config('cache',false); //在开发过程中，将'cache'改为false，在产品上线时将其改为true
template.helper('currency',function(value,type,length){
      type = type || '￥';
      length = length || 2;
      return type + value.toFixed(length)
})

// 3. 设置导出模块
module.exports = template;