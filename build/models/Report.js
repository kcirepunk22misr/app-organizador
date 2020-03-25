"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fecha_1 = require("fecha");
const reportSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        default: '5e53d8777f40ae158784046f',
        required: [true, 'El ID del usuario es necesario']
    },
    inventoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Inventory',
        required: [true, 'El ID del inventario es necesario']
    },
    description: {
        type: String,
        default: 'Ningun Registro aun',
        required: [true, 'La descripcion es necesario']
    },
    createdAt: {
        type: String,
        required: true,
        default: fecha_1.format(new Date(), 'YYYY MM DD hh:mm:ssa')
    }
});
exports.default = mongoose_1.model('Report', reportSchema);
