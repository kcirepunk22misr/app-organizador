"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../global/environment");
class UserController {
    login(req, res) {
        let body = req.body;
        User_1.default.findOne({ email: body.email }, (err, userDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar usuario'
                });
            }
            if (!userDB) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales incorrectas - email',
                    err
                });
            }
            if (!bcrypt_1.default.compareSync(String(body.password), userDB.password)) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales incorrectar - password',
                    err
                });
            }
            // Crear Token
            userDB.password = ':)';
            const token = jsonwebtoken_1.default.sign({
                user: userDB
            }, String(environment_1.SEED), {
                expiresIn: '24h'
            });
            res.status(200).json({
                ok: true,
                user: userDB,
                id: userDB._id,
                token
            });
        });
    }
    verificarAdmin(req, res, next) {
        let usuario = req.body.usuario;
        if (usuario.role === 'ADMIN_ROLE') {
            next();
            return;
        }
        else {
            return res.status(401).json({
                ok: false,
                message: 'Token no valido - no es administrador'
            });
        }
    }
    token(req, res, next) {
        let token = req.query.token;
        jsonwebtoken_1.default.verify(token, String(environment_1.SEED), (err, decode) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    message: 'Token no valido',
                    err
                });
            }
            req.body.usuario = decode.user;
            next();
        });
    }
    getUsers(req, res) {
        User_1.default.find().exec((err, userDB) => {
            if (err)
                return res.status(400).json({
                    ok: false,
                    message: 'Error al guardar el mensaje',
                    err
                });
            res.json({
                ok: true,
                usuarios: userDB
            });
        });
    }
    saveUser(req, res) {
        let body = req.body;
        const user = new User_1.default({
            firstName: body.firstName,
            lastName: body.lastName,
            sex: body.sex,
            email: body.email,
            password: bcrypt_1.default.hashSync(body.password, 10)
        });
        user.save((err, userDB) => {
            if (err)
                return res.status(400).json({
                    ok: false,
                    message: 'Error al guardar el usuario',
                    err
                });
            res.status(201).json({
                ok: true,
                user: userDB
            });
        });
    }
}
exports.userController = new UserController();
