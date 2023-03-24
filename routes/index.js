const router = require("express").Router();
const error = require('../controller/warningBroadcaster')




router.post('/errorcategory',error.errorCategory)

module.exports=router;