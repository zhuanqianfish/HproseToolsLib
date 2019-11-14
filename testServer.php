<?php
require_once("hprose/Hprose.php");
require_once("MedooPlus.php");
use MedooPlus\MedooPlus;
$dbConfig = [
    'database_type' => 'mysql',
    'database_name' => 'node_weiyunyingx',
    'server' => 'localhost',
    'username' => 'node_weiyunyingx',
    'password' => 'YzkRKXfjXFTZa43H'    
];
$medoo = new MedooPlus( $dbConfig );


use Hprose\Http\Server;

function hello($name) {
    return "Hello $name!";
}


$server = new Server();
$server->debug = true;
$server->setCrossDomainEnabled(true);//设置跨域
$server->addFunction('hello');
$server->addInstanceMethods(new MedooPlus( $dbConfig ), '', 'medoo');

$server->start();

/*
客户端：
var client = new hprose.HttpClient("http://node.weiyunyingxiao.com/hprose/testServer.php");
  client.ready(function(dbClient) {   //dbClient 为远程服务代理对象
        dbClient.hello('world', function(res) {
            console.log(res);
        }, { mode: hprose.Normal, sync: true });

        var select = function(){    //查询当前表
            dbClient.medoo.select('wy_user', '*', function(result){
                console.log("查询user表状态");
                console.log(result);
            }, { sync: true });
        };
    });
*/