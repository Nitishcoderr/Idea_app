const express = require('express')

const serverConfig = require('./configs/server.config.js')
const dbConfig = require('./configs/db.config.js')
const mongoose = require('mongoose')
const userModel = require('./models/user.model.js')
const bcrypt = require('bcrypt')
const app = express()


/*
Logic to connect to mongodb and create an admin
Need to have the mongodb up and rrunning in your local machine
*/
mongoose.connect(dbConfig.DB_URL)
const db = mongoose.connection

db.on("error", () => {
    console.log("Error while connecting to DB");
})

db.once('open', () => {
    console.log("DB is Connected");

    init()
})

async function init() {
    /* Initialize the mongo db
    * Need to create the admin user */

    let admin = await userModel.findOne({
        userId: "admin"
    })
    if (admin) {
        console.log("Admin user already present");
        return;
    }
    
    admin = await userModel.create({
        name: "Nitish",
        userId: "admin",
        email: "admin@gmail.com",
        userType: "ADMIN",
        password: bcrypt.hashSync("Welcome",8)
    })
    console.log(admin);
}


app.listen(serverConfig.PORT, () => {
    console.log(`Server running on PORT https://localhost:${serverConfig.PORT}`);
})