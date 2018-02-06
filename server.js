// server.js

// 如何共享node-modules文件或者express文件？
// 将要共享的文件放在共享区域的根目录中或者其上级文件夹中

// require是如何找到express模块的？
// 答：在当前目录中(本例中即server.js所在的目录）查找node_modules文件，如果查找不到，会向逐层向上级文件里查找，直到查找到为止
// 找到之后，找到express文件，在express文件里查找package.json文件，在package.json文件里查找main属性的值
// 如果查找不到main，就在package.json文件的同级文件中查找到index.js文件，在index.js文件里查找moudle.exports导出的内容，其实查找的基本过程已经结束。
// 若moudle.exports导出的内容内容为一个路径，它会继续逐步查找。比如显示结果为module.exports = require('./lib/express');那么此时require方法加载的是一个路径，需要去该路径里查找
// lib文件夹为index.js的同级文件，最终找到了express.js文件，而require('express')就是express.js文件里moudle.exports方法导出的内容

// 在node.js中每个文件都有一个独立的文件作用域
// 文件作用域之间互不影响、不能互相访问
// 但是node.js提供了导出机制，可以将文件内容导出，导出之后通过require来获取
// 这样在server.js中就可以访问express模块

// 服务器的功能
// 端口的监听、接受请求数据、处理请求数据、响应请求数据

// express模块的功能
// 对服务器的功能提供了友好的支持，可以实现端口的监听、？？？

// const与var的区别
// const在声明一个常量时需要将其赋值，不然该常量将永远为undefined
// var在声明一个变量时不需要将其赋值，在之后用到该变量时再赋值即可

// require方法同样也突破了文件作用域的限制，可将外部文件中的内容加载到当前文件夹中
// 如用require方法加载其他文件中的的模块，加载的模块就是其它文件中用module.exports方法导出的对象
// moudle.export拥有默认值，默认值是一个空对象

// 加载模块的方法
// 1.  require('模块名称')     如：require('express')
// 2.  require('模块的路径')   路径前必须加'./'或'../'  如：require('./data/book')

// 什么是模块？ 模块(moudle)为一个文件
// 1. 它是被封装的   2. 自身有导出

// 什么是模块包？ 模块包(moudle package)为一个文件夹，文件夹中至少有两个文件
// 1. 它至少拥有一个模块   2.  它具有元信息(元信息就是package.json,个人理解就是该模块配置信息)

// 绝对路径：凡是以'/'或'//'或'http'或'ftp'(协议)开头的都是绝对路径
// 绝对路径不会与绝对路径组合，但是可以与相对路径组合
//  绝对地址为/a/b/c   请求的资源路径为 index.css      则资源的绝对路径为/a/b/index.css
//  绝对地址为/a/b/c   请求的资源路径为 x/index.css    则资源的绝对路径为/a/b/x/index.css

// 如果使用的资源相对于根目录的位置是确定的，就使用绝对地址，否则就使用相对地址

const express = require('express');
const template = require('./template');
// console.log(template);
const data = require('book');

console.log(data);
// console.log(express);
const app = express();

// 使用template.__express来渲染处理".html"文件
//  template提供了开箱即用的.__express方法的模板
// 指定.html使用的解析引擎
app.engine('.html',template.__express);
// 给"view engine"设置项赋值为"html"
// 即指定使用html视图引擎
app.set('view engine','html');
app.use(express.static('www'));

// template.config('cache',false);配置模板的缓存，'cache'默认值为true，
// 将其设置为false，可以在开发调试过程中可以随时查看模板改变后的状态，而无需重启服务器
// 将其设置为false，禁用模板缓存，修改模板立即生效
// template.config('cache',false); //在开发过程中，将'cache'改为false，在产品上线时将其改为true
// template.helper('currency',function(value,type,length){
//       type = type || '￥';
//       length = length || 2;
//       return type + value.toFixed(length)
// })

// '/'为express.static('www')中绑定的静态文件夹www中的虚拟目录的根目录，表示为www/
// 即在浏览器地址栏中的域名地址后加上一个'/',然而对其并没有什么影响
// 如： 在浏览器地址栏中输入localhost:3000即可访问该服务器发送给浏览器的内容，       localhost:3000等于www
// '/'就是在3000后加上一个/,对域名地址没什么影响
app.get('/',(req,res) =>{
    // res.end()将响应内容发送到浏览器，并且结束响应
    // template('./templates/list',data)，参数1 是模板或模板路径，后缀名默认为.html，参数2 是要添加到页面上的数据对象
    // 服务端的template与浏览器端的template是一样的，不需要再引用template.js文件，直接用template()方法即可
    // 

    // res.end(template('./views/list',data))这种写法与res.render('list',data)大致一样

    //  将模板解析升级为视图呈现，可以将视图等价于模板，
    // 但是通过视图通常生成一个完整的页面，而模板既可以是一个完整的页面，也可以是页面的一部分
    res.render('list',data);
})
// '/user/add'为静态文件夹www中的一个虚拟目录，其路径为www/user/add，因为它是个虚拟目录，所以在www文件夹中并看不到，所以浏览器地址栏中应该输入localhost:3000/user/add
app.get('/user/add',(req,res) =>{
    res.render('list',data);
})

app.listen(3000,()=>console.log('我在飞....'))