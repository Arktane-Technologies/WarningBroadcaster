const logger = require("../loggerMiddleWare/logger")
const axios = require('axios');
const https=require("https");
const fs=require("fs");
var current = new Date()
const consoleLog = true;
const fileLog = true;
const logFileName = "combined"

// this is to set the https agent to allow to use https in axios actions
const httpsAgent = new https.Agent({
    rejectUnauthorized: true, // this when true only allows to have tls handshakes with the one with the certificate with it.
    // need this certificate authority to have access to the https requests
    ca: [fs.readFileSync('./SSLcredentials/cert.pem')],// this is to take in the certificate for authorization.

})


let axiosPostValidator = (url, body) => {

//    log(`${current.toLocaleString()}, AxiosPost , Validator function called `);
    return new Promise(function (resolve, reject) {
        axiosPost(url, body, 1, 5).then((response) =>
            resolve(response), (error) => { reject(error) })

    })
}

function axiosPost(url, body, currentCount, maxCount) {
    if(currentCount>1)
        log(`${current.toLocaleString()}, AxiosPost ,Retrying to reach the server attempt ${currentCount} `);

    return new Promise(function (resolve, reject) {
        if (currentCount <= maxCount) {
            axios.post(url, body,{httpsAgent}, {
                timeout: 3000, headers: {
                    'Content-Type': 'application/json',
                    'status': true,
                }
            })
                .then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        resolve(response);

                    } else if ((response.status >= 400 && response.status < 500) || (response.status >= 500 && response.status <= 499)) {
                        reject(response)
                    }
                })
                .catch((error) => {

                    if (error.code === 'ECONNRESET' || error.code === 'ECONNABORTED' || error.code === 'ECONNREFUSED') {
                        setTimeout(() => {
                            return axiosPost(url, body, currentCount + 1, maxCount).then((data) => { resolve(data) }, (data) => reject(data))
                                .catch(error => {
                                    console.log("Connection Reset", error);
                                });
                        }, 5000);
                    }

                    else {

                        reject(error)
                    }
                }
                )
        }
        else {
            reject({ status: false, msg: "Max retries reached" })
            log(`${current.toLocaleString()}, AxiosPost , Max retries reached. Could not completed the request`);
        }

    })
}

let axiosPutValidator = (url, body) => {

 //   log(`${current.toLocaleString()}, AxiosPut , Validator function called `);
    return new Promise(function (resolve, reject) {
        axiosPut(url, body, 1, 5).then((response) => resolve(response), (error) => {
            reject(error)

        })

    })
}

function axiosPut(url, body, currentCount, maxCount) {
    if(currentCount>1)
        log(`${current.toLocaleString()}, AxiosPut ,Retrying to reach the server attempt ${currentCount} `);

    return new Promise(function (resolve, reject) {
        if (currentCount <= maxCount) {
            axios.put(url, body,{httpsAgent}, {
                timeout: 3000, headers: {
                    'Content-Type': 'application/json',
                    'status': true,
                }
            })
                .then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        resolve(response);

                    } else if ((response.status >= 400 && response.status < 500) || (response.status >= 500 && response.status <= 499)) {
                        reject(response)
                    }
                })
                .catch((error) => {

                    if (error.code === 'ECONNRESET' || error.code === 'ECONNABORTED' || error.code === 'ECONNREFUSED') {
                        setTimeout(() => {
                            return axiosPut(url, body, currentCount + 1, maxCount).then((data) => { resolve(data) }, (data) => reject(data))
                                .catch(error => {
                                    console.log("Connection Reset", error);
                                });
                        }, 5000);
                    }

                    else {

                        reject(error)
                    }
                }
                )
        }
        else {
            reject({ status: false, msg: "Max retries reached" })
            log(`${current.toLocaleString()}, AxiosPut, Max retries reached. Could not completed the request `);
        }

    })
}
let axiosDeleteValidator = (url, body) => {

    log(`${current.toLocaleString()}, AxiosDelete , Validator function called `);
    return new Promise(function (resolve, reject) {
        axiosDelete(url, body, 1, 5).then((response) => resolve(response), (error) => {
            reject(error)

        })

    })
}

function axiosDelete(url, body, currentCount, maxCount) {
    if(currentCount>1)
        log(`${current.toLocaleString()}, AxiosDelete ,Retrying to reach the server attempt ${currentCount} `);

    return new Promise(function (resolve, reject) {
        if (currentCount <= maxCount) {
            axios.delete(url, body,{httpsAgent}, {
                timeout: 3000, headers: {
                    'Content-Type': 'application/json',
                    'status': true,
                }
            })
                .then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        resolve(response);

                    } else if ((response.status >= 400 && response.status < 500) || (response.status >= 500 && response.status <= 499)) {
                        reject(response)
                    }
                })
                .catch((error) => {

                    if (error.code === 'ECONNRESET' || error.code === 'ECONNABORTED' || error.code === 'ECONNREFUSED') {
                        setTimeout(() => {
                            return axiosDelete(url, body, currentCount + 1, maxCount).then((data) => { resolve(data) }, (data) => reject(data))
                                .catch(error => {
                                    console.log("Connection Reset", error);
                                });
                        }, 5000);
                    }

                    else {

                        reject(error)
                    }
                }
                )
        }
        else {
            reject({ status: false, msg: "Max retries reached" })
            log(`${current.toLocaleString()}, AxiosDelete , Max retries reached. Could not completed the request `);
        }

    })
}



let axiosGetValidator = (url) => {
//    log(`${current.toLocaleString()}, AxiosGet , Validator function called `);
    return new Promise(function (resolve, reject) {
        axiosGet(url, 1, 5).then((response) => resolve(response), (error) => {
            reject(error)

        })

    })
}

function axiosGet(url, currentCount, maxCount) {
    if(currentCount>1)
    log(`${current.toLocaleString()}, AxiosGet ,Retrying to reach the server attempt ${currentCount} `);

    return new Promise(function (resolve, reject) {
        if (currentCount <= maxCount) {
            axios.get(url, {httpsAgent},{
                timeout: 3000, headers: {
                    'Content-Type': 'application/json',
                    'status': true,
                }
            })
                .then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        resolve(response.data);

                    } else if ((response.status >= 400 && response.status < 500) || (response.status >= 500 && response.status <= 499)) {
                        reject(response.data)
                    }
                })
                .catch((error) => {

                    if (error.code === 'ECONNRESET' || error.code === 'ECONNABORTED' || error.code === 'ECONNREFUSED') {
                        setTimeout(() => {
                            return axiosGet(url, currentCount + 1, maxCount).then((data) => { resolve(data) }, (data) => reject(data))
                                .catch(error => {
                                    console.log("Connection Reset", error);
                                });
                        }, 5000);
                    }

                    else {

                        reject(error)
                    }
                }
                )
        }
        else {
            reject({ status: false, msg: "Max retries reached" })
            log(`${current.toLocaleString()}, AxiosGet , Max retries reached. Could not completed the request `);
        }

    })
}







// logger data

function log(data) {
    if (consoleLog)
        console.log(data);
    if (fileLog)
        logger.log(logFileName, data, "info");
}

module.exports = { axiosPostValidator, axiosGetValidator, axiosDeleteValidator, axiosPutValidator }



