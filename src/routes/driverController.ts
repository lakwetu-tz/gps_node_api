import express from "express";
import { createDriver, getDriverById, updateDriver, deleteDriver } from "../controllers/driverController";

const router = express.Router();

// Create a new driver
router.post("/drivers", createDriver);

// Get driver by ID
router.get("/drivers/:id", getDriverById);

// Update driver by ID
router.put("/drivers/:id", updateDriver);

// Delete driver by ID
router.delete("/drivers/:id", deleteDriver);

export default router;