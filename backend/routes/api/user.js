const express = require('express');
const router = express.Router();
const User = require('../../user.model');
const usersCtrl = require('../../controllers/user');

/*============= Public Routes ===============*/
router.post('/signup', usersCtrl.signup);
router.post('/', usersCtrl.login);

module.exports = router;