"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Inventory_1 = __importDefault(require("../models/Inventory"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class InventoryController {
    getInventarios(req, res) {
        Inventory_1.default.find({ available: true }, 'name marca type group location state size color quantify createdAt img').exec((err, inventarioDB) => {
            if (err)
                return res.status(400).json({
                    ok: false,
                    err
                });
            res.json({
                ok: true,
                inventaios: inventarioDB
            });
        });
    }
    getInventoryById(req, res) {
        let id = req.params.id;
        Inventory_1.default.findById(id, 'name marca type group location state size color quantify img', (err, inventoryDB) => {
            if (err)
                return res.status(500).json({
                    ok: false,
                    err
                });
            if (!exports.inventoryController)
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El id de la herramienta no sirve',
                        err
                    }
                });
            res.json({
                ok: true,
                inventory: inventoryDB
            });
        });
    }
    updateTool(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.body._id;
            let tool = req.body.tools;
            const img = yield Inventory_1.default.findById(id);
            let urlImg = path_1.default.resolve(__dirname, '../../uploads');
            Inventory_1.default.findByIdAndUpdate(id, tool, { new: true }, (err, inventoryUpdate) => {
                if (err)
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                if (!inventoryUpdate)
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'El id no existe',
                            err
                        }
                    });
                console.log(tool);
                res.json({
                    ok: true,
                    inventario: inventoryUpdate
                });
            });
        });
    }
    deleteTools(req, res) {
        let id = req.body._id;
        Inventory_1.default.findByIdAndUpdate(id, { available: false }, { new: true }, (err, inventoryDelete) => {
            if (err)
                return res.status(500).json({
                    ok: false,
                    err
                });
            if (!inventoryDelete)
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El id no existe',
                        err
                    }
                });
            res.json({
                ok: true,
                iventario: inventoryDelete
            });
        });
    }
    search(req, res) {
        let busqueda = req.params.busqueda;
        let regex = new RegExp(busqueda, 'i');
        Inventory_1.default.find({ name: regex, available: true }, (err, inventoryDB) => {
            if (err)
                return res.status(500).json({
                    ok: false,
                    err
                });
            res.json({
                ok: true,
                tools: inventoryDB
            });
        });
    }
    getImage(req, res) {
        let img = req.params.img;
        const pathImagen = path_1.default.resolve(__dirname, `../../uploads/${img}`);
        if (fs_1.default.existsSync(pathImagen)) {
            res.sendFile(pathImagen);
        }
        else {
            res.json({
                ok: false,
                img: 'no image'
            });
        }
    }
    uploadImage(req, res) {
        let id = req.params.id;
        let imageName = req.file.filename;
        Inventory_1.default.findByIdAndUpdate(id, { img: imageName }, { new: true }, (err, imageDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                    aqui: 'aqui es el error'
                });
            }
            res.json({
                ok: true,
                inventaios: imageDB
            });
        });
        // Inventory.findById(id, {img: imageName}, {new: true}, (err, imgDB) => {
        //     if(err) {
        //         return res.status(400).json({
        //             ok: false,
        //             err
        //         });
        //     }
        //     res.json({
        //         ok: true,
        //         inventarios: imgDB
        //     });
        // });
    }
    saveTool(req, res) {
        let body = req.body;
        // 5e53d8777f40ae158784046f userId
        // 5e52f6c882193e25afe7ec4d tipoId
        // 5e52fd936a8e382b26474f92 gruposId
        // 5e54248a034f9726d526fa16 marcaId
        const inventory = new Inventory_1.default({
            name: body.name,
            userId: body.usuario._id,
            marca: body.marca,
            type: body.type,
            size: body.size,
            color: body.color,
            group: body.group,
            location: {
                escaparate: body.escaparate,
                columna: body.columna,
                fila: body.fila
            },
            state: body.state,
            quantify: body.quantify
        });
        inventory.save((err, inventoryDB) => {
            if (err)
                return res.status(400).json({
                    ok: false,
                    err
                });
            res.status(201).json({
                ok: true,
                inventarios: inventoryDB
            });
        });
    }
}
exports.inventoryController = new InventoryController();
