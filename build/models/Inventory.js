"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fecha_1 = require("fecha");
const inventorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario'],
        lowercase: true
    },
    createdAt: {
        type: String,
        required: true,
        default: fecha_1.format(new Date(), 'YYYY MM DD hh:mm:ssa')
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El id del usuario es necesario']
    },
    marca: {
        type: String,
        required: [true, 'Campo marca es obligatorio']
    },
    type: {
        type: String,
        required: [true, 'Campo tipo es obligatorio']
    },
    group: {
        type: String,
        required: [true, 'Campo grupo es obligatorio']
    },
    size: {
        type: String,
        required: [true, 'Campo tamaño es obligatorio']
    },
    color: {
        type: String,
        required: [true, 'Campo color es obligatorio']
    },
    location: {
        escaparate: {
            type: String,
            required: [true, 'EL escaparate es necesario']
        },
        columna: {
            type: String,
            required: [true, 'La columna es necesaria']
        },
        fila: {
            type: String,
            required: [true, 'La fila es necesaria']
        }
    },
    state: {
        type: String,
        required: [true, 'Campo estado es obligatorio']
    },
    quantify: {
        type: Number,
        required: [true, 'Campo cantidad es obligatorio']
    },
    img: {
        type: String,
        required: false
    },
    report: {
        type: String,
        default: 'No tiene ninguna novedad hasta el momento...',
        required: true
    },
    createdAtReport: {
        type: String,
        default: 'Ningun Registro',
        required: true
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    }
});
exports.default = mongoose_1.model('Inventory', inventorySchema);
