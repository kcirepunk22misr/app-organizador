"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Properties_controller_1 = require("../controllers/Properties.controller");
const User_controller_1 = require("../controllers/User.controller");
const router = express_1.Router();
// Tipos Routes
router.get('/types', Properties_controller_1.propertiesController.getTypes);
router.post('/add-type', User_controller_1.userController.token, Properties_controller_1.propertiesController.saveType);
router.delete('/delete-type/:id', Properties_controller_1.propertiesController.deleteType);
// Grupos Routes
router.get('/groups', Properties_controller_1.propertiesController.getGroup);
router.post('/add-group', User_controller_1.userController.token, Properties_controller_1.propertiesController.saveGroup);
router.delete('/delete-group/:id', Properties_controller_1.propertiesController.deleteGroup);
// Marcas Routes
router.get('/marcas', Properties_controller_1.propertiesController.getMarcas);
router.post('/add-marca', User_controller_1.userController.token, Properties_controller_1.propertiesController.saveMarca);
router.delete('/depete-marca/:id', Properties_controller_1.propertiesController.deleteMarca);
// Estado Routes
router.get('/states', Properties_controller_1.propertiesController.getStates);
router.post('/add-state', User_controller_1.userController.token, Properties_controller_1.propertiesController.saveState);
router.delete('/delete-state/:id', Properties_controller_1.propertiesController.deleteState);
// Tamaños Routes
router.get('/sizes', Properties_controller_1.propertiesController.getSizes);
router.post('/add-size', User_controller_1.userController.token, Properties_controller_1.propertiesController.saveSize);
router.delete('/delete-size/:id', Properties_controller_1.propertiesController.deleteSize);
// Color Routes
router.get('/colors', Properties_controller_1.propertiesController.getColors);
router.post('/add-color', User_controller_1.userController.token, Properties_controller_1.propertiesController.saveColor);
router.delete('/delete-color/:id', Properties_controller_1.propertiesController.deleteColor);
exports.default = router;
