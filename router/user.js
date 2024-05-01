const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/auth').authenticate;
const userController = require('../controller/user');

router.post('/signup', userController.postSignup);

router.post('/login', userController.postLogin);

router.post('/enqueue', authMiddleware, userController.enqueueTask);

module.exports = router;