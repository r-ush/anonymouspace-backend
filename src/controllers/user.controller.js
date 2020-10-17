const express=require('express')
const {ref}=require("../firebase/firebase.utils");

const sendAllData= async (req,res)=>{
    ref.once("value", function(snapshot) {
        var data = snapshot.val();   //Data is in JSON format.
        res.send(data);
    });
}

const userAccount=async (req,res)=>
{
    var uuid=req.body.uuid;
    var chatcount=0;
    var firstName=req.body.firstName;
    var location=req.body.location;
    var screenTime=0;
    var displayName="anonymous lmao"//use random generator

    ref.child("Users").child(uuid).on("value", function(snapshot)
    {
        if (snapshot.exists())
        {
            res.send(snapshot.val());
        }
        else
        {
            ref.child("Users").child(uuid).set({
                chatcount,firstName,location,screenTime,displayName
            });
            res.send(ref.child("Users").child(uuid));
        }
    });
}

module.exports={
    sendAllData, userAccount
}