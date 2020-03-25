"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const stateSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El estado es necesario']
    }
});
exports.default = mongoose_1.model('State', stateSchema);
