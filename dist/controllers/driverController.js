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
exports.deleteDriver = exports.updateDriver = exports.createDriver = exports.getDriverById = exports.getAllDrivers = void 0;
const driverModel_1 = __importDefault(require("../models/driverModel")); // Assuming you have imported the Driver model
// Get all drivers
const getAllDrivers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drivers = yield driverModel_1.default.findAll();
        return res.status(200).json(drivers);
    }
    catch (error) {
        console.error("Error fetching drivers:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getAllDrivers = getAllDrivers;
// Get driver by ID
const getDriverById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const driver = yield driverModel_1.default.findByPk(id);
        if (!driver) {
            return res.status(404).json({ error: "Driver not found" });
        }
        return res.status(200).json(driver);
    }
    catch (error) {
        console.error("Error fetching driver by ID:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getDriverById = getDriverById;
// Create a new driver
const createDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, licenseNumber, phoneNumber } = req.body;
    try {
        // Validate required fields
        if (!firstName || !lastName || !licenseNumber || !phoneNumber) {
            return res.status(400).json({ error: "All fields are required" });
        }
        // Create the new driver
        const newDriver = yield driverModel_1.default.create({ firstName, lastName, licenseNumber, phoneNumber });
        return res.status(201).json(newDriver);
    }
    catch (error) {
        console.error("Error creating driver:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.createDriver = createDriver;
// Update an existing driver
const updateDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { firstName, lastName, licenseNumber, phoneNumber } = req.body;
    try {
        // Check if the driver exists
        const driver = yield driverModel_1.default.findByPk(id);
        if (!driver) {
            return res.status(404).json({ error: "Driver not found" });
        }
        // Update the driver
        yield driver.update({ firstName, lastName, licenseNumber, phoneNumber });
        return res.status(200).json(driver);
    }
    catch (error) {
        console.error("Error updating driver:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateDriver = updateDriver;
// Delete an existing driver
const deleteDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Check if the driver exists
        const driver = yield driverModel_1.default.findByPk(id);
        if (!driver) {
            return res.status(404).json({ error: "Driver not found" });
        }
        // Delete the driver
        yield driver.destroy();
        return res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting driver:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteDriver = deleteDriver;
