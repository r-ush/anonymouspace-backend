const express=require('express')
const {ref}=require("../firebase/firebase.utils");

const { uniqueNamesGenerator, colors, animals } = require('unique-names-generator');
 
const shortName = uniqueNamesGenerator({
  dictionaries: [ colors, animals],
  length: 2
});

const sendAllData= async (req,res)=>{
    try
    {
        ref.once("value", function(snapshot) {
            const data = snapshot.val();
            res.send(data);
        })    
    }
    catch(e)
    {
        res.send("error")        
    }
}

const userAccount=async (req,res)=>
{
    var uuid=req.body.uuid;
    var chatcount=0;
    var firstName=req.body.firstName;
    var location=req.body.location;
    var screenTime=0;
    var displayName=shortName;
    var randomimage=req.body.randomimage;

    ref.child("Users").child(uuid).on("value", function(snapshot)
    {
        if (snapshot.exists())
        {
            res.send(snapshot.val());
        }
        else
        {
            ref.child("Users").child(uuid).set({
                chatcount,firstName,location,screenTime,displayName, randomimage
            });
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

const updateScreenTime = async (req,res)=>
{
    var uuid=req.body.uuid;
    var screenTime=req.body.screenTime;

    //change to adding with previous value instead of just updating
    ref.child("Users").child(uuid).update({
        "screenTime":screenTime
    })
    res.send("success");
}

module.exports={
    sendAllData, userAccount, sendUser, updateScreenTime
}