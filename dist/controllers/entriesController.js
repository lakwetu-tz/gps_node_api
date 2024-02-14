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
exports.entriesExtends = exports.entriesParams = void 0;
const vehicleModel_1 = __importDefault(require("../models/vehicleModel"));
const deviceModel_1 = __importDefault(require("../models/deviceModel"));
const entriesParams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        for (const entry of data.data) {
            const updatedVehicle = vehicleModel_1.default.update({
                latitude: entry.lat,
                longitude: entry.lng,
                angle: entry.angle,
                speed: entry.speed,
                altitude: entry.altitude,
                status: "active" // Assuming you want to set the status to "active"
            }, { where: { deviceId: data.imei } });
            yield Promise.all([updatedVehicle]);
        }
        const vehicle = yield vehicleModel_1.default.findOne({ where: { deviceId: data.imei } });
        // use socket to send the updated vehicle
        if (vehicle) {
            req.app.get("io").emit("vehicleUpdated", vehicle);
        }
    }
    catch (error) {
        return console.error("Error fetching users:", error);
    }
});
exports.entriesParams = entriesParams;
const entriesExtends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        // check imei of the data send 
        const vehicle = yield vehicleModel_1.default.findOne({ where: { deviceId: data.imei } });
        const device = yield deviceModel_1.default.findOne({ where: { imei: data.imei } });
        const vehicleUpdate = vehicleModel_1.default.update({
            ignition: data.ignition,
            movement: data.movement,
        }, { where: { deviceId: data.imei } });
        const deviceUpdate = deviceModel_1.default.update({
            axisX: data.axis_x,
            axisY: data.axis_y,
            axisZ: data.axis_z,
            batteryLevel: data.battery_level,
            digitalInput: data.digital_input,
            ecoScore: data.eco_score,
            externalVoltage: data.external_voltage,
            gsmAreaCode: data.gsm_area_code,
            gsmCellId: data.gsm_cell_id,
            gsmSignal: data.gsm_signal,
            sleepMode: data.sleep_mode,
            timestamp: data.timestamp,
            totalOdometer: data.total_odometer,
            unplug: data.unplug
        }, { where: { imei: data.imei } });
        yield Promise.all([vehicleUpdate, deviceUpdate]);
        req.app.get("io").emit("vehicleUpdated", vehicle);
        req.app.get("io").emit("deviceUpdated", device);
        console.log('Vehicle and device updated successfully');
        //     // Respond with a success message
        return console.log("updated complete");
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.entriesExtends = entriesExtends;
