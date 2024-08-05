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
const nsqjs_1 = __importDefault(require("nsqjs"));
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
const vehicleModel_1 = __importDefault(require("./models/vehicleModel"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.default.Server(server, {
    cors: {
        origin: '*',
    },
});
const port = process.env.PORT || 7000;
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
const extendedDataReader = new nsqjs_1.default.Reader('extended_data_topic', 'extend', {
    nsqdTCPAddresses: ['127.0.0.1:4150']
});
const basicDataReader = new nsqjs_1.default.Reader('basic_data_topic', 'basic', {
    nsqdTCPAddresses: ['127.0.0.1:4150']
});
extendedDataReader.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const touch = () => {
        if (!msg.hasResponded) {
            console.log('Touch [%s]', msg.id);
            msg.touch();
            setTimeout(touch, msg.timeUntilTimeout() - 1000);
        }
    };
    const finish = () => {
        // console.log('Finished message [%s]: %s', msg.id, msg.body.toString())
        msg.finish();
    };
    console.log('Message timeout is %f secs.', msg.timeUntilTimeout() / 1000);
    setTimeout(touch, msg.timeUntilTimeout() - 1000);
    // Finish the message after 2 timeout periods and 1 second.
    setTimeout(finish, msg.timeUntilTimeout() * 2 + 1000);
}));
basicDataReader.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = JSON.parse(msg.body.toString());
        const vehicle = yield vehicleModel_1.default.findOne({ where: { deviceId: data.imei } });
        if (!vehicle) {
            console.log("[ERROR] could not find any vehicle ");
        }
        const latestEntry = data.data.reduce((latest, current) => {
            const latestTime = new Date(latest.utime);
            const currentTime = new Date(current.utime);
            return currentTime > latestTime ? current : latest;
        }, data.data[0]);
        yield vehicleModel_1.default.update({
            latitude: latestEntry.lat,
            longitude: latestEntry.lng,
            angle: latestEntry.angle,
            speed: latestEntry.speed,
            altitude: latestEntry.altitude,
            status: "active"
        }, { where: { deviceId: data.imei } });
        if (vehicle) {
            console.log({ message: "open socket on vehicle update event... " });
            io.emit("vehicleUpdated", vehicle);
        }
        console.log("[INFO] Vehicle database updated successfully");
    }
    catch (error) {
        console.error("Error updating vehicle:", error);
    }
    // Process the message as needed
    const touch = () => {
        if (!msg.hasResponded) {
            console.log('Touch [%s]', msg.id);
            msg.touch();
            // Touch the message again a second before the next timeout.
            setTimeout(touch, msg.timeUntilTimeout() - 1000);
        }
    };
    const finish = () => {
        console.log('Finished message [%s]', msg.id);
        msg.finish();
    };
    console.log('Message timeout is %f secs.', msg.timeUntilTimeout() / 1000);
    setTimeout(touch, msg.timeUntilTimeout() - 1000);
    // Finish the message after 2 timeout periods and 1 second.
    setTimeout(finish, msg.timeUntilTimeout() * 2 + 1000);
}));
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.authenticate();
        console.log('[INFO] Database connection has been established successfully.');
        extendedDataReader.connect();
        console.log('[INFO] NSQ connection of extended topic established successfully');
        basicDataReader.connect();
        console.log('[INFO] NSQ connection of extended topic established successfully');
        console.log(`[OK] api running on ${port}`);
    }
    catch (error) {
        console.error('[ERROR] Unable to connect to NSQ:', error);
    }
}));
