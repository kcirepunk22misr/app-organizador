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
const Type_1 = __importDefault(require("../models/Type"));
const Group_1 = __importDefault(require("../models/Group"));
const Marca_1 = __importDefault(require("../models/Marca"));
const State_1 = __importDefault(require("../models/State"));
const Size_1 = __importDefault(require("../models/Size"));
const Color_1 = __importDefault(require("../models/Color"));
class PropertiesController {
    getTypes(req, res) {
        Type_1.default.find({}).exec((err, typeDB) => {
            if (err)
                return res.status(400).json({
                    ok: false,
                    message: 'Error al buscar los tipos de herramientas',
                    err
                });
            res.json({
                ok: true,
                types: typeDB
            });
        });
    }
    saveType(req, res) {
        let name = req.body.name;
        const type = new Type_1.default({
            name
        });
        type.save((err, typeDB) => {
            if (err)
                return res.status(500).json({
                    ok: false,
                    message: 'Error al crear tipos de herramientas',
                    err
                });
            res.status(201).json({
                ok: true,
                message: 'Tipo Guardado exitosamente',
                type: typeDB
            });
        });
    }
    getGroup(req, res) {
        Group_1.default.find({}).exec((err, groupDB) => {
            if (err)
                return res.status(400).json({
                    ok: false,
                    message: 'Error al buscar los grupos de herramientas',
                    err
                });
            res.json({
                ok: true,
                groups: groupDB
            });
        });
    }
    saveGroup(req, res) {
        let name = req.body.name;
        const grupo = new Group_1.default({
            name
        });
        grupo.save((err, groupDB) => {
            if (err)
                return res.status(500).json({
                    ok: false,
                    message: 'Error al crear grupo de herramientas',
                    err
                });
            res.status(201).json({
                ok: true,
                message: 'Grupo Guardado exitosamente',
                group: groupDB
            });
        });
    }
    getMarcas(req, res) {
        Marca_1.default.find({}).exec((err, marcasDB) => {
            if (err)
                return res.status(400).json({
                    ok: false,
                    message: 'Error al buscar las marcas de herramientas',
                    err
                });
            res.json({
                ok: true,
                marcas: marcasDB
            });
        });
    }
    saveMarca(req, res) {
        let name = req.body.name;
        const marca = new Marca_1.default({
            name
        });
        marca.save((err, marcaDB) => {
            if (err)
                return res.status(500).json({
                    ok: false,
                    message: 'Error al crear grupo de herramientas',
                    err
                });
            res.status(201).json({
                ok: true,
                message: 'Grupo Guardado exitosamente',
                marca: marcaDB
            });
        });
    }
    getStates(req, res) {
        State_1.default.find({}).exec((err, statesDB) => {
            if (err)
                return res.status(400).json({
                    ok: false,
                    err
                });
            res.json({
                ok: true,
                states: statesDB
            });
        });
    }
    saveState(req, res) {
        let estado = req.body.name;
        const state = new State_1.default({
            name: estado
        });
        state.save((err, stateDB) => {
            if (err)
                return res.status(500).json({
                    ok: true,
                    err
                });
            res.status(201).json({
                ok: true,
                state: stateDB
            });
        });
    }
    getSizes(req, res) {
        Size_1.default.find().exec((err, SizesDB) => {
            if (err)
                return res.status(400).json({
                    ok: false,
                    err
                });
            res.json({
                ok: true,
                sizes: SizesDB
            });
        });
    }
    saveSize(req, res) {
        let tamaño = req.body.name;
        const size = new Size_1.default({
            name: tamaño
        });
        size.save((err, sizesDB) => {
            if (err)
                return res.status(500).json({
                    ok: false,
                    err
                });
            res.json({
                ok: true,
                sizes: sizesDB
            });
        });
    }
    getColors(req, res) {
        Color_1.default.find().exec((err, colorsDB) => {
            if (err)
                return res.status(500).json({
                    ok: false,
                    err
                });
            res.json({
                ok: true,
                colors: colorsDB
            });
        });
    }
    saveColor(req, res) {
        let colorH = req.body.name;
        const color = new Color_1.default({
            name: colorH
        });
        color.save((err, colorsDB) => {
            if (err)
                return res.status(500).json({
                    ok: false,
                    err
                });
            res.json({
                ok: true,
                colors: colorsDB
            });
        });
    }
    deleteGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let groupBorrado = yield Group_1.default.where('_id').findOneAndRemove({ _id: id });
            res.json({
                group: groupBorrado
            });
        });
    }
    deleteType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let typeBorrado = yield Type_1.default.where('_id').findOneAndRemove({ _id: id });
            res.json({
                type: typeBorrado
            });
        });
    }
    deleteMarca(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let marcaBorrado = yield Marca_1.default.where('_id').findOneAndRemove({ _id: id });
            res.json({
                marca: marcaBorrado
            });
        });
    }
    deleteState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let stateBorrado = yield State_1.default.where('_id').findOneAndRemove({ _id: id });
            res.json({
                state: stateBorrado
            });
        });
    }
    deleteSize(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let sizeBorrado = yield Size_1.default.where('_id').findOneAndRemove({ _id: id });
            res.json({
                size: sizeBorrado
            });
        });
    }
    deleteColor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let colorBorrado = yield Color_1.default.where('_id').findOneAndRemove({ _id: id });
            res.json({
                color: colorBorrado
            });
        });
    }
}
exports.propertiesController = new PropertiesController();
