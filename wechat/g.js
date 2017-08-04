'use strict'
var sha1=require('sha1');
var getRawBody=require('Raw-body');
var Promise=require('bluebird');
var request=Promise.promisify(require('request'));
var Wechat=require('./wechat');
module.exports=function(opts){
    var wechat=new Wechat(opts);
    return function *next(){
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
            console.log(this.query);
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
            console.log(content);
        }
}
}