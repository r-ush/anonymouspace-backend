const express=require('express')
const {ref}=require("../firebase/firebase.utils");
const Filter = require('bad-words'),

filter = new Filter();
 
console.log(filter.clean("Don't be an ash0le"));

const sendMessage= async (req,res)=>{
    var msg=req.body.msg;
    res.send(filter.clean(msg));
}



module.exports={
    sendMessage
}