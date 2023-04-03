const express = require('express')
const logger = require('../loggerMiddleWare/logger')
const app = express();
const port = 1000
const axios = require('axios');

const consoleLog = true;
const fileLog = true;
const logFileName = "combined"






module.exports.errorCategory = async (req, res) => {
    try {
        let messege = req.body
        log(`\n\n${new Date().toLocaleString()}, Warning Broadcaster , ${messege.msg}\n`)
        res.status(200).send({messege:"Data recieved"})

    } catch (error) {
        res.send(error.messege)
    } 


}




// logger data

function log(data) {
    if (consoleLog)
        console.log(data);
    if (fileLog)
        logger.log(logFileName, data, "info");
}
