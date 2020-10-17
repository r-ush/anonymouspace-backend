const express=require('express')
const {ref}=require("../firebase/firebase.utils");
const Filter = require('bad-words'),

filter = new Filter();
 
const sendMessage= async (req,res)=>
{
    const { msg, chatroomid, uuid }= req.body;
    var timestamp=Date.now();

    try
    {
        var filteredmsg=filter.clean(msg);
        ref.child("Chatroom").child(chatroomid).once("value", function(snapshot)
        {
            if (snapshot.exists())
            {
                ref.child("Chatroom").child(chatroomid).child("messages").child(timestamp).update({
                    "content":filteredmsg,
                    "userid":uuid,
                    timestamp
                });
                res.status(200).send({message:true});
            }
        })    
    }
    catch(e)
    {
        res.status(400).send("error");
    }
}


module.exports={
    sendMessage
}