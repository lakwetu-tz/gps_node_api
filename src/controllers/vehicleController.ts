import { Request, Response } from "express";
import Vehicle from "../models/vehicleModel"; // Assuming you have imported the Vehicle model

// Get all vehicles
export const getAllVehicles = async (req: Request, res: Response) => {
    try {
        const vehicles = await Vehicle.findAll();

        if (vehicles.length === 0) {
            // If no vehicles found, return a response indicating no vehicles found
            return res.status(404).json({ message: "No vehicles found" });
        }

        return res.status(200).json(vehicles);
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Get vehicle by ID
export const getVehicleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found" });
        }
        return res.status(200).json(vehicle);
    } catch (error) {
        console.error("Error fetching vehicle by ID:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Create a new vehicle
export const createVehicle = async (req: Request, res: Response) => {
    const { vin, model, plate, color, deviceId } = req.body;
    try {
        // Validate VIN and model
        if (!vin || !plate || !color || !deviceId ) {
            return res.status(400).json({ error: "missing value required" });
        }


        const existingVehicle = await Vehicle.findOne({ where: { vin } });
        if (existingVehicle) {
            return res.status(400).json({ error: "vin already exists" });
        }

        const existingPlate = await Vehicle.findOne({ where: { plate } });
        if (existingPlate) {
            return res.status(400).json({ error: "number plate already exists" });
        }

        // Create the new vehicle
        const newVehicle = await Vehicle.create({ vin, model, plate, color, status: "pending", deviceId });
        return res.status(201).json(newVehicle);
    } catch (error) {
        console.error("Error creating vehicle:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Update an existing vehicle
export const updateVehicle = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { vin, model } = req.body;
    try {
        // Check if the vehicle exists
        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found" });
        }

        // Update the vehicle
        await vehicle.update({ vin, model });
        return res.status(200).json(vehicle);
    } catch (error) {
        console.error("Error updating vehicle:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Delete an existing vehicle
export const deleteVehicle = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Check if the vehicle exists
        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found" });
        }

        // Delete the vehicle
        await vehicle.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error("Error deleting vehicle:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};