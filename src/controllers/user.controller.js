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
            res.status(200).send(data);
        })    
    }
    catch(e)
    {
        res.status(400).send("error")        
    }
}

const userAccount=async (req,res)=>
{
    const { uuid, firstName, location, randomimage}=req.body;
    var chatcount=0;
    var screenTime=0;
    var displayName=shortName;

    try
    {
        ref.child("Users").child(uuid).on("value", function(snapshot)
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
            }
        });
    
    }
    catch(e)
    {
        res.status(400).send("error");
    }

}

const sendUser= async (req,res)=>
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

const updateScreenTime = async (req,res)=>
{
    try
    {
        const {uuid, screenTime }=req.body;
    
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