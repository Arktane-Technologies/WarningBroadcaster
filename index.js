const express = require("express");
const fs=require("fs");
const https=require("https");
const app = express()
app.use(express.json())
const port = 1000
app.use(express.json())



// main route
const routerFolder = require("./routes/index")

app.get("/", (req, res) => {
    res.send("get data.");
});
app.use("/api", routerFolder);


 
// server is listening to 4000 for DBRC
// adding https configs
const httpsConfigs = {
    key: fs.readFileSync('./SSLcredentials/key.pem'),
    cert: fs.readFileSync('./SSLcredentials/cert.pem')
};
const server = https.createServer(httpsConfigs, app);

server.listen(port, (error)=> {
    if (error) {
        console.log({ errorCategory: "errorCategory app is not running" })
    } else {
        console.log(`errorCategory app running on port ${port}`);
    }

});


