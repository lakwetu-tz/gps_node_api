import express from "express";
import { createDriver, getDriverById, updateDriver, deleteDriver } from "../controllers/driverController";

const router = express.Router();

// Create a new driver
router.post("/create", createDriver);

// Get driver by ID
router.get("/get/:id", getDriverById);

// Update driver by ID
router.put("/update/:id", updateDriver);

// Delete driver by ID
router.delete("/delete/:id", deleteDriver);

export default router;