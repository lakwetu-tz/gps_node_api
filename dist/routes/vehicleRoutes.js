"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehicleController_1 = require("../controllers/vehicleController");
const router = express_1.default.Router();
// Create a new vehicle
router.post("/create", vehicleController_1.createVehicle);
// Get vehicle by ID
router.get("/get/:id", vehicleController_1.getVehicleById);
// Get vehicle by ID
router.get("/all", vehicleController_1.getAllVehicles);
// Update vehicle by ID
router.put("/update/:id", vehicleController_1.updateVehicle);
// Delete vehicle by ID
router.delete("/vehicles/:id", vehicleController_1.deleteVehicle);
exports.default = router;
