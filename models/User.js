const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        require : true,
    },
    password : {
        type : String,
        require : true,
    }
},
{ timestamps: true },
{ versionKey: false }
)

const UserModel = mongoose.model("User",UserSchema);

module.exports={
    UserModel
}