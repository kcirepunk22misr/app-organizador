"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const locationSchema = new mongoose_1.Schema({
    escaparate: {
        type: String,
        required: false,
        unique: true
    },
    columna: {
        type: String,
        required: false,
        unique: true
    },
    fila: {
        type: String,
        required: false,
        unique: true
    }
});
exports.default = mongoose_1.model('Location', locationSchema);
