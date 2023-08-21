const usersController = require("../controllers/users_controller");
const express = require('express');
const router = express.Router();

router.get('/home1', usersController.homeController1);
router.get('/home2', usersController.homeController2);


module.exports = router;