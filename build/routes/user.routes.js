"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = require("../controllers/User.controller");
const router = express_1.Router();
router.get('/users', [User_controller_1.userController.token, User_controller_1.userController.verificarAdmin], User_controller_1.userController.getUsers);
router.post('/add-user', [User_controller_1.userController.token, User_controller_1.userController.verificarAdmin], User_controller_1.userController.saveUser);
router.post('/login', User_controller_1.userController.login);
exports.default = router;
