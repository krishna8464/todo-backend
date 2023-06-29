const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();


const PORT = process.env.PORT || 5000


const {connection , client} = require("./config/db");
const { logger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorhandler");
const { userroute } = require("./routes/Userroute");
const {taskroute} = require("./routes/Tasksroute");



app.use(express.json());
app.use(logger);
app.use(errorHandler);
app.use(cors({
    origin:"*"
}));

app.use("/",userroute);
app.use("/",taskroute);



// Handle invalid routes
app.use(logger,(req, res) => {
    res.status(404).send({ error: 'Not found' });
});


app.listen(PORT,async()=>{
    try {

        await client.connect();
        console.log('Redis:', client.isReady);
        
        await connection;
        console.log("Server is connected to DB");
    } catch (error) {
        console.log("Not able to connect to DB");
    }
    console.log(`The server is connected to ${PORT}`);
})