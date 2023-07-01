const express = require('express')

const serverConfig = require('./configs/server.config.js')

const app = express()



app.listen(serverConfig.PORT,()=>{
    console.log(`Server running on PORT https://localhost:${serverConfig.PORT}`);
})