"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Report_controller_1 = require("../controllers/Report.controller");
const router = express_1.Router();
router.get('/reports/:id', Report_controller_1.reportController.getReport);
router.put('/update-state-report', Report_controller_1.reportController.updateState);
router.put('/update-report', Report_controller_1.reportController.updateReport);
exports.default = router;
