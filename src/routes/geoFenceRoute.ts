
import express from "express";
import { createGeoFence, deleteGeoFence, getGeoFenceById, updateGeoFence, listGeoFences } from "../controllers/geoFenceController";

const router = express.Router();


router.post("/create", createGeoFence);

router.get("/get/:id", getGeoFenceById);

router.get("/all", listGeoFences);

router.put("/update/:id", updateGeoFence);

router.delete("/delete/:id", deleteGeoFence);

export default router;