const express=require('express')
const rot = require('rot');
const {ref}=require("../firebase/firebase.utils");
const Filter = require('bad-words'),

filter = new Filter();
 
const sendMessage= async (req,res)=>
{
    const { 
        msg="nomsgsent",
        chatroomid="nonegiven",
        uuid="nonegiven"
    }= req.body;
    var timestamp=Date.now();
    try
    {
        var filteredmsg=filter.clean(msg);
        var encrypedmsg=rot(filteredmsg, process.env.rotkey);

        ref.child("Users").child(uuid).once("value", function (snapshotuser)
        {
            // console.log(snapshotuser.val());
            ref.child("Chatroom").child(chatroomid).once("value", function(snapshotchat)
            {
                if (snapshotchat.exists())
                {
                    console.log(snapshotuser.val());
                    var data=snapshotchat.val();
                    ref.child("Chatroom").child(chatroomid).child("messages").child(timestamp).update({
                        "content":encrypedmsg,
                        "userid":uuid,
                        timestamp
                    });
                    res.status(200).send({user:snapshotuser.val(),message:true});
                }
            })
        });

    }
    catch(e)
    {
        console.log(e);
        res.status(400).send({message:false});
    }
};

module.exports={
    sendMessage
}