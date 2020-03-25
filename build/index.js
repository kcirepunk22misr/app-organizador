"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
const server_1 = __importDefault(require("./server/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const colors_1 = __importDefault(require("colors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
dotenv_1.config();
const server = server_1.default.instance;
// CORS
server.app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});
// server.app.use(cors({origin: true, credentials: true}));
// middleware
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
server.app.use(morgan_1.default('dev'));
// Routes
require("./routes/router");
// uploads image
server.app.use('uploads', express_1.default.static(path_1.default.resolve('uploads')));
// Conecting MongoDB
try {
    mongoose_1.default.connect(String(process.env.MONGO_URI_NODE_ENV), {
        useNewUrlParser: true,
        useCreateIndex: true,
        autoIndex: false,
        useUnifiedTopology: true
    });
    console.log(`database: ${colors_1.default.green('Online')}`);
}
catch (error) {
    console.log(`database: ${colors_1.default.red('Offline')}`);
    throw new Error(error);
}
// Start Server
server.start(() => {
    console.log(`Server Status: ${colors_1.default.green('Online')}`);
});
