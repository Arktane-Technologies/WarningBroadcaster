const axios = require("axios");
// url of the logger middleware component microservice
let url = "http://localhost:7000/api/logger"



module.exports.log = (initiator, message, level) => {
    
    // axios.post(url, {
    //     initiator: `${initiator}`,
    //     message: `${JSON.stringify(message)}`,
    //     level:`${level}`
    // }).then((response) => console.log(response.data))
    //     .catch((err) => console.log({message:"error in logging data to logger"}));
      axios.post(url, {
        initiator: `${initiator}`,
        message: `${JSON.stringify(message)}`,
        level:`${level}`
    }).catch((err) => console.log({message:"error in logging data to logger"}));
}
