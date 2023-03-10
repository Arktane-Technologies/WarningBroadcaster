const router = require("express").Router();
const error = require('../controller/errorController')




router.post('/errorcategory',error.errorCategory)

module.exports=router;