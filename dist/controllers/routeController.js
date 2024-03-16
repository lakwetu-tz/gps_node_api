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
exports.assignDriverToRoute = exports.assignVehicleToRoute = exports.deleteRoute = exports.getRoutes = exports.getRouteById = exports.updateRoute = exports.createRoute = void 0;
const routeModel_1 = __importDefault(require("../models/routeModel"));
const vehicleModel_1 = __importDefault(require("../models/vehicleModel"));
const createRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, startLocation, endLocation, distance, time, description } = req.body;
        if (!name || !startLocation || endLocation) {
            return res.status(401).json({ message: 'Missing fields' });
        }
        const existingPlate = yield vehicleModel_1.default.findOne({ where: { plate: name } });
        if (!existingPlate) {
            return res.status(400).json({ message: 'Vehicle not found!' });
        }
        const route = yield routeModel_1.default.create({
            name,
            startLocation,
            endLocation,
            distance,
            time,
            description,
        });
        return res.status(201).json({ route });
    }
    catch (error) {
        console.error('Error creating route:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createRoute = createRoute;
const updateRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, startLocation, endLocation, distance, time, description } = req.body;
        const route = yield routeModel_1.default.findByPk(id);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }
        route.name = name;
        route.startLocation = startLocation;
        route.endLocation = endLocation;
        route.description = description;
        yield route.save();
        return res.status(200).json({ route });
    }
    catch (error) {
        console.error('Error updating route:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateRoute = updateRoute;
const getRouteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const route = yield routeModel_1.default.findByPk(id);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }
        return res.status(200).json({ route });
    }
    catch (error) {
        console.error('Error getting route by ID:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getRouteById = getRouteById;
const getRoutes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const route = yield routeModel_1.default.findAll();
        if (!route) {
            return res.status(404).json({ message: 'No routes created yet' });
        }
        return res.status(200).json({ route });
    }
    catch (error) {
        console.error('Error getting route by ID:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getRoutes = getRoutes;
const deleteRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedCount = yield routeModel_1.default.destroy({ where: { id } });
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Route not found' });
        }
        return res.status(200).json({ message: 'Route deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting route:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteRoute = deleteRoute;
const assignVehicleToRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { routeId, vehicleId } = req.body;
        const route = yield routeModel_1.default.findByPk(routeId);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }
        route.vehicleId = vehicleId;
        yield route.save();
        return res.status(200).json({ message: 'Vehicle assigned to route successfully' });
    }
    catch (error) {
        console.error('Error assigning vehicle to route:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.assignVehicleToRoute = assignVehicleToRoute;
const assignDriverToRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { routeId, driverId } = req.body;
        // Find the route by ID
        const route = yield routeModel_1.default.findByPk(routeId);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }
        // Assign the driver to the route
        route.driverId = driverId;
        yield route.save();
        return res.status(200).json({ message: 'Driver assigned to route successfully' });
    }
    catch (error) {
        console.error('Error assigning driver to route:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.assignDriverToRoute = assignDriverToRoute;
