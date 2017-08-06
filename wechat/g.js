'use strict'
var sha1=require('sha1');
var getRawBody=require('Raw-body');
var Promise=require('bluebird');
var request=Promise.promisify(require('request'));
var Wechat=require('./wechat');
var util=require('./util');
module.exports=function(opts){
    // var wechat=new Wechat(opts);
    return function *next(){
        var that=this;
        var token=opts.token;
        var signature=this.query.signature;
        var nonce=this.query.nonce;
        var timestamp=this.query.timestamp;
        var echostr=this.query.echostr;
        var str=[token,timestamp,nonce].sort().join('');
        var sha=sha1(str);
        if(this.method==='GET'){
        if(sha===signature){
            this.body=echostr+'';

        }else{
            this.body='wrong'
        }
    }else if(this.method==='POST'){
            if(sha!==signature){
                this.body='wrong';
                return false;
            }
            var data=yield getRawBody(this.req,{
                length:this.length,
                limit:'1mb',
                encoding:this.charset
            })
            var  content=yield util.parseXMLAsync(data)

            var message=util.formateMessage(content.xml);

            if(message.MsgType==='event'){

                if(message.Event==='subscribe'){

                  var now=new Date().getTime();
                  that.status=200;
                  that.type='application/xml';
                 var reply ='<xml><ToUserName><![CDATA['+message.FromUserName+']]></ToUserName>'+
                      '<FromUserName><![CDATA['+message.ToUserName+']]></FromUserName>>'+
                      '<CreateTime>'+now+'</CreateTime><MsgType><![CDATA[text]]></MsgType>'+
                      '<Content><![CDATA[Hi,Imooc 童鞋！]]></Content></xml>';
                    that.body=reply;
                    return;
                }
            }else if(message.MsgType==='text'){
                var now=new Date().getTime();
                that.status=200;
                that.type='application/xml';
                var reply ='<xml><ToUserName><![CDATA['+message.FromUserName+']]></ToUserName>'+
                    '<FromUserName><![CDATA['+message.ToUserName+']]></FromUserName>>'+
                    '<CreateTime>'+now+'</CreateTime><MsgType><![CDATA[text]]></MsgType>'+
                    '<Content><![CDATA[Hi,Imooc 童鞋hahah！]]></Content></xml>';
                that.body=reply;
                return;
            }
        }
}
}