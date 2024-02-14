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
exports.deleteVehicle = exports.updateVehicle = exports.createVehicle = exports.getVehicleById = exports.getAllVehicles = void 0;
const vehicleModel_1 = __importDefault(require("../models/vehicleModel")); // Assuming you have imported the Vehicle model
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
// Create a new vehicle
const createVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vin, model, plate, color, deviceId } = req.body;
    try {
        // Validate VIN and model
        if (!vin || !plate || !color || !deviceId) {
            return res.status(400).json({ error: "missing value required" });
        }
        const existingVehicle = yield vehicleModel_1.default.findOne({ where: { vin } });
        if (existingVehicle) {
            return res.status(400).json({ error: "vin already exists" });
        }
        const existingPlate = yield vehicleModel_1.default.findOne({ where: { plate } });
        if (existingPlate) {
            return res.status(400).json({ error: "number plate already exists" });
        }
        // Create the new vehicle
        const newVehicle = yield vehicleModel_1.default.create({ vin, model, plate, color, status: "pending", deviceId });
        return res.status(201).json(newVehicle);
    }
    catch (error) {
        console.error("Error creating vehicle:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.createVehicle = createVehicle;
// Update an existing vehicle
const updateVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { vin, model } = req.body;
    try {
        // Check if the vehicle exists
        const vehicle = yield vehicleModel_1.default.findByPk(id);
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found" });
        }
        // Update the vehicle
        yield vehicle.update({ vin, model });
        return res.status(200).json(vehicle);
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
