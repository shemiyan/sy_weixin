'use strict'
var Koa=require('koa');
var path=require('path');
var wechat=require('./wechat/g.js');
var util=require('./libs/utill.js');
var _dirname = path.resolve();
var wechat_file=path.join(_dirname,'./config/wechat.txt');

var config={
    wechat:{
        appID:'wx001f3aa11c0dc5ab',
        appSecret:'6f50c44cfd0a8d24453eab8d8edf7117',
        token:'weixin',
        getAccessToken:function(data){
            return util.readFileAsync(wechat_file,data)
        },
        saveAccessToken:function(data){
            data=JSON.stringify(data);
            return util.writeFileAsync(wechat_file,data)
        },
        // REDIRECT_URI:'17470c57t9.iok.la',
        // PAGE_ACCESS_TOKEN_URL: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET",
        // PAGE_CODE_URL: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect",
        // JS_SDK_TICKET_FILE: "/conf/JsSDKTicket",
        // JS_SDK_TICKET_URL: "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi"
    }
};
var app=new Koa();
// module.exports=function(){
// const convert = require('koa-convert');

app.use(wechat(config.wechat));
app.listen(80);
console.log(1234);

