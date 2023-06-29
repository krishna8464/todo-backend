const {UserModel} = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signupController = async (req,res) =>{
    //incoming user data
    const { username , email , password } = req.body;

    try {
        let user = await UserModel.find({email});
        if(user.length === 0){
            bcrypt.hash(password, 5,async(err,val)=>{
                if(err){
                    return res.status(400).json({
                        errorMessage: "some thing went wrong",
                    });
                }else{
                    const User = new UserModel({username,email,password:val});
                    await User.save()
                    res.json({
                        successMessage: "Registration success. Please signin.",
                      });
                }
            })
        }else{
            return res.status(400).json({
                errorMessage: "Email already exists",
            });
        }
    } catch (err) {
        console.log("signupController error: ", err);
        res.status(500).json({
        errorMessage: "Server error",
    });
    }
}


exports.signinController = async (req,res) => {
    const { email , password } = req.body;
    try {
        const user = await UserModel.find({email});
        if(user.length === 0){
            return res.status(400).json({
                errorMessage: "Invalid credentials",
              });
        }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({
        errorMessage: "Invalid credentials",
      });
    }
    const payload = {
        user: {
          _id: user[0]._id,
        },
      };
  
      jwt.sign(payload, process.env.KEY, (err, token) => {
        if (err) console.log("jwt error: ", err);
        const { _id, username, email } = user[0];
        res.json({
          token,
          user: { _id, username, email },
        });
      });
        
    } catch (err) {
    console.log("signinController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
    }
}