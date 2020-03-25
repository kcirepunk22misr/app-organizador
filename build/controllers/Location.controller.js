"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Location_1 = __importDefault(require("../models/Location"));
class LocationController {
    getLocations(req, res) {
        Location_1.default.find({}).exec((err, locationDB) => {
            if (err)
                return res.status(400).json({
                    ok: false,
                    err
                });
            res.json({
                ok: true,
                locacions: locationDB
            });
        });
    }
    saveLocation(req, res) {
        let body = req.body;
        const location = new Location_1.default({
            escaparate: body.escaparate,
            columna: body.columna,
            fila: body.fila
        });
        location.save((err, locationDB) => {
            if (err)
                return res.status(400).json({
                    ok: false,
                    err
                });
            res.status(201).json({
                ok: true,
                location: locationDB
            });
        });
    }
}
exports.locationController = new LocationController();
