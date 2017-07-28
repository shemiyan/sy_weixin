'use strict'
var sha1=require('sha1');
var Promise=require('bluebird');
var request=Promise.promisify(require('request'));
var prefix='https://api.weixin.qq.com/cgi-bin/';
var api={
    accessToken:prefix+'token?grant_type=client_credential'
}
// var wechat=new wechat();
function wechat(opts) {
    var that = this;
    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken;
    this.getAccessToken()
        .then(function (data) {

            try {
                data = JSON.parse(data);

            } catch (e) {
                return that.updateAccessToken(data)
            }
            if (that.isValidAccessToken(data)) {
                Promise.resolve(data)
                // console.log(data+'www');
            } else {
                return that.updateAccessToken();
                // console.log(data+"eee");
            }
        }).then(function (data) {
        // console.log(data);
        that.access_token = data.access_token;
        that.expires_in = data.expires_in;
        that.saveAccessToken(data)
    });
};
wechat.prototype.isValidAccessToken=function(data){
    if(!data||!data.access_token||!data.expires_in){
        return false
    }
    var access_token=data.access_token;
    var expires_in=data.expires_in;
    var now=(new Date().getTime());
    if(now<expires_in){
        return true;
    }else{
        return false;
    }
};
wechat.prototype.updateAccessToken=function(data){
    // console.log(data);
    var appID=this.appID;
    var appSecret=this.appSecret;
    var url=api.accessToken+'&appid='+appID+'&secret='+appSecret;
    return new Promise(function(resolve,reject){
        request({
            url:url,json:true}).then(function(response){
            var data=response.body;
            var now=(new Date().getTime());
            var expires_in=now+(data.expires_in-20)*1000;
            data.expires_in=expires_in;
            resolve(data)
        })
    })
};
module.exports=function(opts){

    // wechat(opts);
    // var wechat=new wechat(opts);
    return function *next(){
        var token=opts.token;
        var signature=this.query.signature;
        var nonce=this.query.nonce;
        var timestamp=this.query.timestamp;
        var echostr=this.query.echostr;
        var str=[token,timestamp,nonce].sort().join('');
        var sha=sha1(str);

        if(sha===signature){
            this.body=echostr+'';
            console.log(this.query);
        }else{
            this.body='wrong'
        }
    }
}