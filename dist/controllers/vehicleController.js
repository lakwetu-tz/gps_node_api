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
exports.deleteVehicle = exports.updateVehicle = exports.createVehicle = exports.getVehicleByUserId = exports.getVehicleById = exports.getAllVehicles = void 0;
const vehicleModel_1 = __importDefault(require("../models/vehicleModel")); // Assuming you have imported the Vehicle model
const userModel_1 = require("../models/userModel");
const deviceModel_1 = __importDefault(require("../models/deviceModel"));
const driverModel_1 = __importDefault(require("../models/driverModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
// Get all vehicles
const getAllVehicles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicles = yield vehicleModel_1.default.findAll();
        if (vehicles.length === 0) {
            // If no vehicles found, return a response indicating no vehicles found
            return res.status(404).json({ message: "No vehicles found" });
        }
        return res.status(200).json(vehicles);
    }
    catch (error) {
        console.error("Error fetching vehicles:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getAllVehicles = getAllVehicles;
// Get vehicle by ID
const getVehicleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const vehicle = yield vehicleModel_1.default.findByPk(id);
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found" });
        }
        return res.status(200).json(vehicle);
    }
    catch (error) {
        console.error("Error fetching vehicle by ID:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getVehicleById = getVehicleById;
// Get all vehicle based on the userId
const getVehicleByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield userModel_1.Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const vehicle = yield vehicleModel_1.default.findAll({ where: { userId: id } });
        if (!vehicle) {
            return res.status(403).json({ error: "No vehicle found" });
        }
        return res.status(200).json(vehicle);
    }
    catch (error) {
        console.error("Error fetching vehicle by ID:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getVehicleByUserId = getVehicleByUserId;
// Create a new vehicle
const createVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { make, plate, deviceId, password, userId } = req.body;
    try {
        // Validate VIN and model
        if (!password || !make || !deviceId || !plate) {
            return res.status(400).json({ error: "missing value required" });
        }
        const user = yield userModel_1.Users.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: "user number not found" });
        }
        // Check password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(402).json({ error: "Invalid password" });
        }
        const existingPlate = yield vehicleModel_1.default.findOne({ where: { plate } });
        if (existingPlate) {
            return res.status(403).json({ error: "number plate already exists" });
        }
        const existingImei = yield deviceModel_1.default.findOne({ where: { imei: deviceId } });
        if (!existingImei) {
            return res.status(404).json({ error: "Device not registerd" });
        }
        const existingDevice = yield vehicleModel_1.default.findOne({ where: { deviceId } });
        if (existingDevice) {
            return res.status(400).json({ error: "Device is registed and used " });
        }
        // Create the new vehicle
        const newVehicle = yield vehicleModel_1.default.create({ userId, make, plate, color: "white", status: "registered", deviceId });
        return res.status(201).json(newVehicle);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message.split('\n')[0] : 'Internal server error';
        console.error("Error message:", errorMessage);
        return res.json({ error: errorMessage });
    }
});
exports.createVehicle = createVehicle;
const updateVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId, driverId, deviceId, plate, make, color, model, type, year } = req.body;
    try {
        // Check if the vehicle exists
        const vehicle = yield vehicleModel_1.default.findByPk(id);
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found" });
        }
        if (userId !== undefined) {
            const user = yield userModel_1.Users.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
        }
        if (driverId !== undefined) {
            const driver = yield driverModel_1.default.findByPk(driverId);
            if (!driver) {
                return res.status(404).json({ error: "Driver not found" });
            }
        }
        if (deviceId !== undefined) {
            const device = yield deviceModel_1.default.findOne({ where: { imei: deviceId } });
            if (!device) {
                return res.status(404).json({ error: "Device not found" });
            }
        }
        const updatedFields = {};
        if (userId !== undefined)
            updatedFields.userId = userId;
        if (driverId !== undefined)
            updatedFields.driverId = driverId;
        if (deviceId !== undefined)
            updatedFields.deviceId = deviceId;
        if (plate !== undefined)
            updatedFields.plate = plate;
        if (make !== undefined)
            updatedFields.make = make;
        if (color !== undefined)
            updatedFields.color = color;
        if (model !== undefined)
            updatedFields.model = model;
        if (type !== undefined)
            updatedFields.type = type;
        if (year !== undefined)
            updatedFields.year = year;
        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ error: "No valid fields to update" });
        }
        // Update the vehicle
        const updates = yield vehicle.update(updatedFields);
        return res.status(200).json(updates);
    }
    catch (error) {
        console.error("Error updating vehicle:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateVehicle = updateVehicle;
// Delete an existing vehicle
const deleteVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Check if the vehicle exists
        const vehicle = yield vehicleModel_1.default.findByPk(id);
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found" });
        }
        // Delete the vehicle
        yield vehicle.destroy();
        return res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting vehicle:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteVehicle = deleteVehicle;
