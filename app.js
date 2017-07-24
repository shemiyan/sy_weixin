// 'use strict'
var Koa=require('koa');
var sha1=require('sha1');
var config={
    wechat:{
        appID:'wx001f3aa11c0dc5ab',
        appSecret:'6f50c44cfd0a8d24453eab8d8edf7117',
        token:'weixin',
        REDIRECT_URI:'17470c57t9.iok.la',
        PAGE_ACCESS_TOKEN_URL: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET",
        PAGE_CODE_URL: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect",
        JS_SDK_TICKET_FILE: "/conf/JsSDKTicket",
        JS_SDK_TICKET_URL: "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi"
    }
};
var app=new Koa();
// module.exports=function(){
// const convert = require('koa-convert');

app.use(function *(next){
        console.log(this.query);
        console.log(this);
        var token=config.wechat.token;
        var signature=this.query.signature;
        var nonce=this.query.nonce;
        var timestamp=this.query.timestamp;
        var echostr=this.query.echostr;
        var str=[token,timestamp,nonce].sort().join('');
        var sha=sha1(str);
        if(sha===signature){
            this.body=echostr+'';
        }else{
            this.body='wrong'
        }
    });
// };
app.listen(8080);
console.log(1234);

