const express = require('express')
const hprose = require('hprose')
const app = express();
var client = new hprose.HttpClient("http://hprosedemo.me/hproseApi.php");
console.log(client);
app.all('*', (req, res, next) => {  //允许跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });

app.get('/', (req, res) => res.send('Hello World!'))
client.ready(function(dbClient) {   //dbClient 为远程服务代理对象
    app.get('/user/all',  function(req, res){
        dbClient.medoo.select('wy_user', '*', function(result){
            console.log("查询user表状态");
            console.log(result);
            res.json(result);
        });
    });
    
    app.get('/user/add',  function(req, res){
        dbClient.medoo.insert('wy_user', {'username':'hproseTest', 'password': '123456', 'email':'hp@admin.com'},
        function(result){
            console.log('插入成功！');
            res.json({code:1, msg:'插入成功！'});
        });
    });
    
    app.get('/user/update',  function(req, res){
        dbClient.medoo.update('wy_user', { 'password': '666666'}, {'username':'hproseTest'}).then(
            function(result){
                console.log('修改成功！');
                res.json({code:1, msg:'修改成功！'});
        });
    });
    
    app.get('/user/del',  function(req, res){
        dbClient.medoo.delete('wy_user', {'username':'hproseTest'})
            .then(function(result){
                console.log('删除成功！');
                res.json({code:1, msg:'删除成功！'});
            });
    });
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));

