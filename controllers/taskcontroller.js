const { TaskModel } = require("../models/Tasks");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { authentication } = require("../middleware/authentication");
const { client } = require("../config/db");
const { Result, body } = require("express-validator");

exports.create = async (req,res) => {
    //incoming userdata
    console.log(req.body);

    const { title , desc , priority , userid } = req.body;

    try {
        const task = await TaskModel.find({title});
        if(task.length > 0){
            return res.status(400).json({
                errorMessage: "Task with the same title already exists",
            });
        };
        const newtask = new TaskModel(req.body);
        await newtask.save();
        let data  = await TaskModel.find({userid:req.body.userid});
        let stor = JSON.stringify(data);
        await client.set(req.body.userid,stor);

        // setting the expire time
        await client.expire(req.body.userid,60);
        res.json({ successMessage: `task created successfully` });
        
    } catch (error) {
        console.log("signinController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
        
    }
};

exports.list = async (req,res) => {
    try {
        let ans = await client.get(req.body.userid);
       if(!ans){
         let data  = await TaskModel.find({userid:req.body.userid});
         let stor = JSON.stringify(data)

         // setting the value
         await client.set(req.body.userid,stor);
         
         // setting the expire time
         await client.expire(req.body.userid,60);
         console.log("using 1")
         res.status(200).send(data)
       }else{
        let Result = JSON.parse(ans);
        console.log("useing 2")
        res.send(Result);
       }
    } catch (err) {
    console.log("getlistController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
    }
};

exports.remove = async ( req , res ) => {
    try {
        const listId = req.params.listid;
        const deletelist = await TaskModel.findByIdAndDelete({_id:listId});
        let data  = await TaskModel.find({userid:req.body.userid});
        let stor = JSON.stringify(data);
        await client.set(req.body.userid,stor);

        // setting the expire time
        await client.expire(req.body.userid,60);

        res.json({
            successMessage: "list item deleted succesfully",
          });
        
    } catch (error) {
    console.log("getlistController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
    }
};

exports.update = async ( req , res ) => {
    try {
        const listId = req.params.listid;
        let dat = req.body
        const updatelist = await TaskModel.findByIdAndUpdate({_id:listId}, req.body)
        console.log(updatelist)
        let data  = await TaskModel.find({userid:req.body.userid});
        let stor = JSON.stringify(data);
        await client.del(req.body.userid)
        await client.set(req.body.userid,stor);

        // setting the expire time
        await client.expire(req.body.userid,60);

        res.json({ successMessage: `${listId} was successfully edited` });
        
    } catch (error) {
        console.log("getlistController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
    }
}