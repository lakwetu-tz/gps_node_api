
import express from "express";
import { createVehicle, getVehicleById, updateVehicle, deleteVehicle, getAllVehicles } from "../controllers/vehicleController";

const router = express.Router();


router.post("/create", createVehicle);

router.get("/get/:id", getVehicleById);

router.get("/all", getAllVehicles);

router.put("/update/:id", updateVehicle);

router.delete("/delete/:id", deleteVehicle);

export default router;