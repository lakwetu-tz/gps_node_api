
import express from "express";
import { createVehicle, getVehicleById, updateVehicle, deleteVehicle, getAllVehicles, getVehicleByUserId } from "../controllers/vehicleController";

const router = express.Router();


router.post("/create", createVehicle);

router.get("/get/:id", getVehicleById);

router.get("/user/:id", getVehicleByUserId);

router.get("/all", getAllVehicles);

router.put("/update/:id", updateVehicle);

router.delete("/delete/:id", deleteVehicle);

export default router;