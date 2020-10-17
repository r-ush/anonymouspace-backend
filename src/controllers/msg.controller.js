const express=require('express')
const {ref}=require("../firebase/firebase.utils");
const Filter = require('bad-words'),

filter = new Filter();
 
const sendMessage= async (req,res)=>
{
    var msg=req.body.msg;
    res.send(filter.clean(msg));

    var chatroomid=req.body.chatroomid;
    var uuid=req.body.uuid;
    var timestamp=Date.now();

    ref.child("Chatroom").child(chatroomid).on("value", function(snapshot)
    {
        if (snapshot.exists())
        {
            ref.child("Chatroom").child(chatroomid).child("messages").child(timestamp).set({
                "content":msg,
                "userid":uuid,
                timestamp
            });
        }
    })
}


module.exports={
    sendMessage
}