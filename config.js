'use strict'

var path=require('path');
var util=require('./libs/utill');

var wechat_file=path.join(__dirname,'./config/wechat.txt');
var config = {
    wechat: {
        appID: 'wx001f3aa11c0dc5ab',
        appSecret: '6f50c44cfd0a8d24453eab8d8edf7117',
        token: 'weixin',
        getAccessToken: function (data) {
            return util.readFileAsync(wechat_file, data)
        },
        saveAccessToken: function (data) {
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file, data)
        },
    }
};
module.exports=config;