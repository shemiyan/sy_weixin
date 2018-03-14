'use strict'
var Koa = require('koa');
var path = require('path');
var wechat = require('./wechat/g.js');
var util = require('./libs/utill.js');
var config=require('./config');
var weixin=require('./weixin');
var _dirname = path.resolve();
var wechat_file = path.join(_dirname, './config/wechat.txt');
var app = new Koa();
// module.exports=function(){
// const convert = require('koa-convert');

app.use(wechat(config.wechat,weixin.reply));
app.listen(80);
 console.log(1234);

