"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server/server"));
const Inventory_routes_1 = __importDefault(require("./Inventory.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const properties_routes_1 = __importDefault(require("./properties.routes"));
const Location_routes_1 = __importDefault(require("./Location.routes"));
const Report_routes_1 = __importDefault(require("./Report.routes"));
const routes = server_1.default.instance;
routes.app.use('/inventory', Inventory_routes_1.default);
routes.app.use('/user', user_routes_1.default);
routes.app.use('/properties', properties_routes_1.default);
routes.app.use('/location', Location_routes_1.default);
routes.app.use('/report', Report_routes_1.default);
exports.default = routes;
