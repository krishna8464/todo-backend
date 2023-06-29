const express = require("express");
const taskroute = express.Router();

const { logger } = require("../middleware/logger");
const { authentication } = require("../middleware/authentication")
const { create , list , remove , update } = require("../controllers/taskcontroller") 

taskroute.post( "/create" , authentication , logger , create );
taskroute.get( "/getlist" , authentication , logger , list);
taskroute.delete( "/delete/:listid" , authentication , logger , remove );
taskroute.patch( "/update/:listid" , authentication , logger , update)

module.exports={
    taskroute
}