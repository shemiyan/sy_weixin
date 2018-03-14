'use strict'

exports.reply=function* (next){
     var message=this;

     if(message.MsgType==='event'){
         if(message.Event==='subscribe'){

             if(message.EventKey){
                 console.log('扫二维码进来：'+message.EventKey+' '+message.ticket);
             }
             console.log('已关注');
             this.body='哈哈，你订阅了我的号\r\n'+'消息ID'+message.FromUserName;
         }else if(message.Event==='unsubscribe'){
             console.log('无情取关');
             this.body='';

         }
     }else{

     }
}