const express = require('express');
const router = express.Router();
const ValidateTokenHandler = require('../middleware/validateTokenHandler');
const { registeruser, loginuser, currentuser } = require('../controllers/usercontroller');
router.route('/register').post(registeruser);
router.route('/login').post(loginuser);
router.route('/current').get(ValidateTokenHandler, currentuser);

module.exports = router;