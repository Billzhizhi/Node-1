// book.js就是一个模块， 1. 它是被封装的(文件作用域) 2. 自身拥有导出

// 想要突破文件作用域的限制，可以使用module.exports = obj, obj为一个导出的对象

module.exports = {
    "books": [
        {
            "bookName": "HTML 5与CSS 3权威指南 上册+下册 2本（第3版）",
            "author": "陆凌牛",
            "price": {
                "market": 89,
                "sale": 60.5
            },
            "publisher": "机械工业出版社",
            "ISBN": "9787111514435"
        },
        {
            "bookName": "JavaScript权威指南（第6版）",
            "author": "[美] David Flanagan 著；淘宝前端团队 译",
            "price": {
                "market": 139,
                "sale": 99
            },
            "publisher": "机械工业出版社",
            "ISBN": "9787111376613"
        }
    ]
}