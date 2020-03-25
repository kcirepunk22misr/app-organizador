"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Location_controller_1 = require("../controllers/Location.controller");
const routes = express_1.Router();
routes.get('/locacions', Location_controller_1.locationController.getLocations);
routes.post('/add-location', Location_controller_1.locationController.saveLocation);
exports.default = routes;
