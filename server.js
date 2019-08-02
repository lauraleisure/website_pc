const express=require('express');
/*express实例化*/
const app=express();
const path=require('path');

//app.use使用中间件（插件）
/*解析表单数据*/
var bodyParser = require('body-parser');
// 解析表单提交的post数据格式： application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// 解析post提交的json形式的 数据格式 application/json
app.use(bodyParser.json());
app.use('/public',express.static(path.join(__dirname,'./public')));

/*监听3000端口，开启一个服务器*/
app.listen(3002,(req,res)=>{
    console.log('server start ');
})