"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fecha_1 = require("fecha");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'El nombre es requerido'],
    },
    lastName: {
        type: String,
        required: [true, 'El Apellido es necesario'],
    },
    sex: {
        type: String,
        required: [true, 'El sexo es necesario'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria'],
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    img: {
        type: String,
        required: false,
    },
    createdAt: {
        type: String,
        required: true,
        default: fecha_1.format(new Date(), 'YYYY MM DD hh:mm:ssa')
    },
    active: {
        type: Boolean,
        default: true
    }
});
userSchema.plugin(mongoose_unique_validator_1.default, {
    message: '{PATH} debe de ser unico'
});
exports.default = mongoose_1.model('User', userSchema);
