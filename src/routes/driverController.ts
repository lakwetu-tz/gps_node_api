import express from "express";
import { createDriver, getDriverById, updateDriver, deleteDriver, getAllDrivers } from "../controllers/driverController";

const router = express.Router();

// Create a new driver
router.post("/create", createDriver);

router.get("/all", getAllDrivers)

router.get("/get/:id", getDriverById);

router.put("/update/:id", updateDriver);

// Delete driver by ID
router.delete("/delete/:id", deleteDriver);

export default router;