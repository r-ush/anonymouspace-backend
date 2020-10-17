const express=require('express')
const {ref}=require("../firebase/firebase.utils");

const { uniqueNamesGenerator, colors, animals } = require('unique-names-generator');
 
const shortName = uniqueNamesGenerator({
  dictionaries: [ colors, animals],
  length: 2
});

const sendAllData= (req,res)=>{
    try
    {
        ref.once("value", function(snapshot) {
            const data = snapshot.val();
            res.status(200).send(data);
        })    
    }
    catch(e)
    {
        res.status(400).send("error")        
    }
}

const userAccount=(req,res)=>
{
    var chatcount=0;
    var screenTime=0;
    try
    {        
        var { uuid, firstName="namenotgiven", location="notgiven", randomimage="urlnotgiven"}=req.body;
        var displayName=shortName;
    
        ref.child("Users").child(uuid).once("value", function(snapshot)
        {
            if (snapshot.exists())
            {
                res.status(200).send(snapshot.val());
            }
            else
            {
                ref.child("Users").child(uuid).set({
                    chatcount,firstName,location,screenTime,displayName, randomimage
                });
                ref.child("Users").child(uuid).once("value", function(snapshot)
                {
                    res.status(200).send(snapshot.val());
                });
            }
        });
    }
    catch(e)
    {
        res.status(400).send("error");
    }
}

const sendUser= (req,res)=>
{
    try
    {
        const {uuid}=req.body;
        ref.child("Users").child(uuid).on("value", function(snapshot)
        {
            var data=snapshot.val();
            res.status(200).send(data);
        });            
    }
    catch(e)
    {
        res.status(400).send("error");
    }
}

const updateScreenTime = (req,res)=>
{
    try
    {
        const {uuid, screenTime }=req.body;

        var data;

        ref.child("Users").child(uuid).once("value", function(snapshot)
        {
            data=snapshot.val().screenTime;
            // console.log(data.screenTime);
        }).then((lol)=>console.log(lol.val().screenTime));
    
        //change to adding with previous value instead of just updating
        ref.child("Users").child(uuid).update({
            "screenTime":screenTime
        });
        res.status(200).send("success");
    }
    catch(e)
    {
        res.status(400).send("error");
    }
}

module.exports={
    sendAllData, userAccount, sendUser, updateScreenTime
}