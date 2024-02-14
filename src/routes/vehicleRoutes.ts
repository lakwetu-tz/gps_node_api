
import express from "express";
import { createVehicle, getVehicleById, updateVehicle, deleteVehicle, getAllVehicles } from "../controllers/vehicleController";

const router = express.Router();

// Create a new vehicle
router.post("/create", createVehicle);

// Get vehicle by ID
router.get("/get/:id", getVehicleById);

// Get vehicle by ID
router.get("/all", getAllVehicles);

// Update vehicle by ID
router.put("/update/:id", updateVehicle);

// Delete vehicle by ID
router.delete("/vehicles/:id", deleteVehicle);

export default router;