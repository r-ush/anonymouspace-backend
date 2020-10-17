const express=require('express')
const {ref}=require("../firebase/firebase.utils");

const sendAllData= async (req,res)=>{
    ref.once("value", function(snapshot) {
        var data = snapshot.val();   //Data is in JSON format.
        res.send(data);
    });
}

module.exports={
    sendAllData
}