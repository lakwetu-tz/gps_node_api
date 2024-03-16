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
exports.deleteDevice = exports.updateDevice = exports.createDevice = exports.getDevice = exports.getAllDevices = exports.getDeviceIMEI = void 0;
const deviceModel_1 = __importDefault(require("../models/deviceModel"));
const getDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const device = yield deviceModel_1.default.findByPk(id);
        if (!device) {
            return res.status(404).json({ error: 'Device not found' });
        }
        return res.json(device);
    }
    catch (error) {
        console.error('Error fetching device by ID:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getDevice = getDevice;
const getDeviceIMEI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deviceId } = req.params;
    try {
        const device = yield deviceModel_1.default.findOne({ where: { imei: deviceId } });
        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }
        return res.json(device);
    }
    catch (err) {
        console.error("Error retrieving device:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getDeviceIMEI = getDeviceIMEI;
const getAllDevices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const devices = yield deviceModel_1.default.findAll();
        return res.json(devices);
    }
    catch (error) {
        console.error('Error fetching devices:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllDevices = getAllDevices;
const createDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { imei, model, simCard, name } = req.body;
    try {
        if (!imei || !simCard || !name || !model) {
            return res.status(400).json({ error: "missing value required" });
        }
        const existingImei = yield deviceModel_1.default.findOne({ where: { imei } });
        if (existingImei) {
            return res.status(400).json({ error: "imei already exists" });
        }
        const existingSimcard = yield deviceModel_1.default.findOne({ where: { simCard } });
        if (existingSimcard) {
            return res.status(400).json({ error: "simcard already exists" });
        }
        const device = yield deviceModel_1.default.create({ imei, model, name, simCard, status: "registered", mobileData: true });
        return res.status(201).json(device);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message.split('\n')[0] : 'Internal server error';
        console.error("Error message:", errorMessage);
        return res.json({ error: errorMessage });
    }
});
exports.createDevice = createDevice;
const updateDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { imei, model, mode } = req.body;
    try {
        const device = yield deviceModel_1.default.findByPk(id);
        if (!device) {
            return res.status(404).json({ error: 'Device not found' });
        }
        yield device.update({ imei, model, mode });
        return res.json(device);
    }
    catch (error) {
        console.error('Error updating device:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateDevice = updateDevice;
const deleteDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const device = yield deviceModel_1.default.findByPk(id);
        if (!device) {
            return res.status(404).json({ error: 'Device not found' });
        }
        yield device.destroy();
        return res.status(204).send(); // No content response
    }
    catch (error) {
        console.error('Error deleting device:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteDevice = deleteDevice;
