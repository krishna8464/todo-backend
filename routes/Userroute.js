const express = require("express");
const userroute = express.Router();
const {
    signupValidator,
    signinValidator,
    validatorResult
} = require("../middleware/validator");

const { signupController , signinController } = require("../controllers/usercontroller");
const { logger } = require("../middleware/logger")

userroute.post("/signup", signupValidator , validatorResult , logger , signupController);
userroute.post("/login", signinValidator , validatorResult , logger , signinController);

module.exports={
    userroute
}

