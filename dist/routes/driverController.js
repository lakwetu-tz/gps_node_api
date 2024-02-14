"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const driverController_1 = require("../controllers/driverController");
const router = express_1.default.Router();
// Create a new driver
router.post("/drivers", driverController_1.createDriver);
// Get driver by ID
router.get("/drivers/:id", driverController_1.getDriverById);
// Update driver by ID
router.put("/drivers/:id", driverController_1.updateDriver);
// Delete driver by ID
router.delete("/drivers/:id", driverController_1.deleteDriver);
exports.default = router;
