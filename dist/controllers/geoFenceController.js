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
exports.listGeoFences = exports.getGeoFenceById = exports.deleteGeoFence = exports.updateGeoFence = exports.createGeoFence = void 0;
const geoFenceModel_1 = __importDefault(require("../models/geoFenceModel"));
// Create a new GeoFence
const createGeoFence = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const characters = '0123456789abcdef';
    let routeId = '';
    for (let i = 0; i < 16; i++) { // 4 hexadecimal characters to form 16 bits
        routeId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    console.log();
    try {
        const { name, latitude, longitude, radius, notifyOnEntry, notifyOnExit } = req.body;
        if (!name || !latitude || !longitude || !radius || !notifyOnEntry || !notifyOnExit) {
            return res.status(400).send('Missing fields');
        }
        const geoFenceName = yield geoFenceModel_1.default.findOne({ where: { name } });
        if (geoFenceName) {
            return res.status(401).send({ error: "Duplicate name" });
        }
        const newGeoFence = yield geoFenceModel_1.default.create({
            name,
            latitude,
            longitude,
            radius,
            notifyOnEntry,
            notifyOnExit,
            routeId
        });
        return res.json(newGeoFence);
    }
    catch (error) {
        console.error('Error updating GeoFence:', error);
        return res.status(500).send('Error updating GeoFence');
        // const errorMessage = error instanceof Error ? error.message.split('\n')[0] : 'Internal server error';
        // console.error("Error message:", errorMessage);
        // return res.json({ error: errorMessage })
    }
});
exports.createGeoFence = createGeoFence;
// Update an existing GeoFence
const updateGeoFence = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Assuming id is passed as a URL parameter
        const updateData = req.body;
        const [numberOfAffectedRows, [updatedGeoFence]] = yield geoFenceModel_1.default.update(updateData, {
            where: { id },
            returning: true, // This option is specific to PostgreSQL
        });
        if (numberOfAffectedRows > 0) {
            return res.json(updatedGeoFence);
        }
        else {
            return res.status(404).send('GeoFence not found');
        }
    }
    catch (error) {
        console.error('Error updating GeoFence:', error);
        return res.status(500).send('Error updating GeoFence');
    }
});
exports.updateGeoFence = updateGeoFence;
// Delete a GeoFence
const deleteGeoFence = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield geoFenceModel_1.default.destroy({
            where: { id }
        });
        if (deleted) {
            return res.send('GeoFence deleted');
        }
        else {
            return res.status(404).send('GeoFence not found');
        }
    }
    catch (error) {
        console.error('Error deleting GeoFence:', error);
        return res.status(500).send('Error deleting GeoFence');
    }
});
exports.deleteGeoFence = deleteGeoFence;
// Get a specific GeoFence by ID
const getGeoFenceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const geoFence = yield geoFenceModel_1.default.findByPk(id);
        if (geoFence) {
            return res.json(geoFence);
        }
        else {
            return res.status(404).send('GeoFence not found');
        }
    }
    catch (error) {
        console.error('Error fetching GeoFence:', error);
        return res.status(500).send('Error fetching GeoFence');
    }
});
exports.getGeoFenceById = getGeoFenceById;
// List all GeoFences
const listGeoFences = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const geoFences = yield geoFenceModel_1.default.findAll();
        return res.json(geoFences);
    }
    catch (error) {
        console.error('Error listing GeoFences:', error);
        return res.status(500).send('Error listing GeoFences');
    }
});
exports.listGeoFences = listGeoFences;
//  listening to geofencing
// listening for changes in the actively-monitored set of geofencing
// removing a single geofencing 
// remove all geofencing
// querying geofecing
// monitoring only 
