const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    title : {
        type : String,
        require : true,
    },
    desc : {
        type : String,
        require : true,
    },
    priority : {
        type : String,
        require : true,
    },
    userid : {
        type : String,
        require : true
    }
},
{ timestamps: true },
{ versionKey: false }
)

const TaskModel = mongoose.model("Tasks",TaskSchema);

module.exports={
    TaskModel
}