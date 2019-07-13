const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const usersCtrl = require('../../controllers/user');

/*============= Public Routes ===============*/
router.post('/signup', usersCtrl.signup);
router.post('/', usersCtrl.login);

module.exports = router;