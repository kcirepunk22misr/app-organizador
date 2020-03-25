"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Report_1 = __importDefault(require("../models/Report"));
const Inventory_1 = __importDefault(require("../models/Inventory"));
class ReportController {
    getReport(req, res) {
        let id = req.params.id;
        Inventory_1.default.findById(id, 'report createdAtReport', (err, reportDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!reportDB) {
                return res.status(400).json({
                    ok: false,
                    message: 'El id no existe',
                    err
                });
            }
            res.json({
                report: reportDB
            });
        });
    }
    updateReport(req, res) {
        let body = req.body;
        let id = req.body._id;
        Inventory_1.default.findByIdAndUpdate(id, { report: body.report, createdAtReport: body.createdAtReport }, { new: true }, (err, inventoryDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!inventoryDB) {
                return res.status(400).json({
                    ok: false,
                    err,
                    mensaje: 'no existe el id'
                });
            }
            res.json({
                report: inventoryDB
            });
        });
        // Report.findOne({inventoryId: id}, (err, reportDB) => {
        //     if(err) {
        //         return res.status(500).json({
        //             ok: false,
        //             err
        //         });
        //     }
        //     reportDB.description = body.description;
        //     reportDB.createdAt = body.createdAt;
        //     reportDB.save((err, reportDB) => {
        //         if(err) {
        //             return res.status(500).json({
        //                 ok: false,
        //                 err
        //             });
        //         }
        //         res.json({
        //             report: reportDB
        //         });
        //     });
        // });
    }
    saveReport(req, res) {
        let body = req.body;
        const report = new Report_1.default({
            inventoryId: body.inventoryId,
            description: body.description
        });
        {
            report.save((err, reportDB) => {
                if (err)
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                res.json({
                    ok: true,
                    report: reportDB
                });
            });
        }
    }
    updateState(req, res) {
        let id = req.body.inventoryId;
        let state = req.body.state;
        Inventory_1.default.findByIdAndUpdate(id, { state }, { new: true, runValidators: true }, (err, InventorySave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                inventarios: InventorySave
            });
        });
    }
}
exports.reportController = new ReportController();
