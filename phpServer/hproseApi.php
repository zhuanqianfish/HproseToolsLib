<?php
require_once("hprose/Hprose.php");
require_once("MedooPlus.php");
use MedooPlus\MedooPlus;
$dbConfig = [
    'database_type' => 'mysql',
    'database_name' => 'test1',
    'server' => 'localhost',
    'username' => 'root',
    'password' => 'root'    
];
use Hprose\Http\Server;

$server = new Server();
//$server->debug = true;
$server->setCrossDomainEnabled(true);//设置跨域
$server->addInstanceMethods(new MedooPlus( $dbConfig ), '', 'medoo');

$server->start();