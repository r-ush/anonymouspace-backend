const express=require('express')
const {ref}=require("../firebase/firebase.utils");
const Filter = require('bad-words'),

filter = new Filter();
 
const sendMessage= async (req,res)=>
{
    var msg=req.body.msg;
    var chatroomid=req.body.chatroomid;
    var uuid=req.body.uuid;
    var timestamp=Date.now();

    try
    {
        var filteredmsg=filter.clean(msg);
        ref.child("Chatroom").child(chatroomid).on("value", function(snapshot)
        {
            if (snapshot.exists())
            {
                ref.child("Chatroom").child(chatroomid).child("messages").child(timestamp).set({
                    "content":filteredmsg,
                    "userid":uuid,
                    timestamp
                });
            }
        })    
    }
    catch(e)
    {
        res.send("error");
    }
}


module.exports={
    sendMessage
}