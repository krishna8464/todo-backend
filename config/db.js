const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.URL);

const { createClient } = require("redis");

const client = createClient({
    password: process.env.PASS,
    socket: {
        host: process.env.REDISHOST,
        port: 11307
    }
});

module.exports={
    connection,
    client
}