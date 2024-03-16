"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehicleController_1 = require("../controllers/vehicleController");
const router = express_1.default.Router();
router.post("/create", vehicleController_1.createVehicle);
router.get("/get/:id", vehicleController_1.getVehicleById);
router.get("/user/:id", vehicleController_1.getVehicleByUserId);
router.get("/all", vehicleController_1.getAllVehicles);
router.put("/update/:id", vehicleController_1.updateVehicle);
router.delete("/delete/:id", vehicleController_1.deleteVehicle);
exports.default = router;
