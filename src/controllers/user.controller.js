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

const sendUser= async (req,res)=>
{
    var uuid=req.body.uuid;
    ref.child("Users").child(uuid).on("value", function(snapshot)
    {
        var data=snapshot.val();
        res.send(data);
    });
}

const updateScreenTime= async (req,res)=>
{
    var uuid=req.body.uuid;
    var screenTime=req.body.screenTime;

    //fix the if else statement
    if(ref.child("Users").child(uuid))
    {
        ref.child("Users").child(uuid).update({
            "screenTime":screenTime
        })
        res.send("success");
    }
    else
    {
        res.send("no user");

    }
}

module.exports={
    sendAllData, userAccount, sendUser, updateScreenTime
}