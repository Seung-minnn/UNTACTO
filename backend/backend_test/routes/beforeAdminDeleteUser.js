/beforeAdminDeleteUser.js*/
const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
const adminDeleteUserRouter = require('./adminDeleteUser');
const {	verifyTokenAdmin	} = require('./tokenAuth');

router.use(cookieParser());
router.delete('/',verifyTokenAdmin, adminDeleteUserRouter);
module.exports = router;
