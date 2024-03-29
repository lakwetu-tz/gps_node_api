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
const database_1 = __importDefault(require("./database"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const cookieParser = require('cookie-parser');
const deviceRoute_1 = __importDefault(require("./routes/deviceRoute"));
const vehicleRoute_1 = __importDefault(require("./routes/vehicleRoute"));
const driverRoute_1 = __importDefault(require("./routes/driverRoute"));
const usersRoute_1 = __importDefault(require("./routes/usersRoute"));
const entriesRoute_1 = __importDefault(require("./routes/entriesRoute"));
const routeRoute_1 = __importDefault(require("./routes/routeRoute"));
const alertRoute_1 = __importDefault(require("./routes/alertRoute"));
const geoFenceRoute_1 = __importDefault(require("./routes/geoFenceRoute"));
require("./database");
const socket_io_1 = __importDefault(require("socket.io"));
const logEvents_1 = require("./middleware/logEvents");
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.default.Server(server, {
    cors: {
        origin: '*',
    },
});
const port = process.env.PORT || 8000;
app.set("io", io);
app
    .disable("x-powered-by")
    .use((0, morgan_1.default)("dev"))
    .use(express_1.default.urlencoded({ extended: true }))
    .use(express_1.default.json())
    .use((0, cors_1.default)({ origin: '*' }))
    .use(cookieParser())
    .use(logEvents_1.logger)
    .use(errorHandler_1.errorHandler)
    .use("/api/v1/device", deviceRoute_1.default)
    .use("/api/v1/driver", driverRoute_1.default)
    .use("/api/v1/vehicle", vehicleRoute_1.default)
    .use("/api/v1/user", usersRoute_1.default)
    .use("/api/v1/entries", entriesRoute_1.default)
    .use("/api/v1/route", routeRoute_1.default)
    .use("/api/v1/alert", alertRoute_1.default)
    .use("/api/v1/geoFence", geoFenceRoute_1.default)
    .get("/healthz", (req, res) => { return res.json({ ok: true, environment: process.env.NODE_ENV }); });
io.on("connection", (socket) => {
    console.log("socket connected", socket.id);
    socket.on('disconnect', () => {
        console.log('Client disconnect:', socket.id);
    });
});
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.authenticate();
        console.log('Database connection has been established successfully.');
        console.log(`api running on ${port}`);
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}));
