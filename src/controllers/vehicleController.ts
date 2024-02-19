import { Request, Response } from "express";
import Vehicle from "../models/vehicleModel"; // Assuming you have imported the Vehicle model
import { Users } from "../models/userModel";
import Devices from "../models/deviceModel";
import Drivers from "../models/driverModel";

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
    const { model, make, year, plate, color, type } = req.body;
    try {
        // Validate VIN and model
        if (!model || !make || !color || !year || !plate || !type ) {
            return res.status(400).json({ error: "missing value required" });
        }

        const existingPlate = await Vehicle.findOne({ where: { plate } });
        if (existingPlate) {
            return res.status(400).json({ error: "number plate already exists" });
        }

        // Create the new vehicle
        const newVehicle = await Vehicle.create({ year, model, make, plate, color, type, status: "registered", });
        return res.status(201).json(newVehicle);
    } catch (error) {
        console.error("Error creating vehicle:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const updateVehicle = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId, driverId, deviceId, plate, make, color, model, type, year } = req.body;
    try {

        // Check if the vehicle exists
        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found" });
        }

        if (userId !== undefined){
            const user = await Users.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
        }

        if (driverId !== undefined) {
            const driver = await Drivers.findByPk(driverId);
            if (!driver) {
                return res.status(404).json({ error: "Driver not found" });
            }
        }

        if (deviceId !== undefined) {
            const device = await Devices.findByPk(deviceId);
            if (!device) {
                return res.status(404).json({ error: "Device not found" });
            }
        }

        const updatedFields: any = {};
        if (userId !== undefined) updatedFields.userId = userId;
        if (driverId !== undefined) updatedFields.driverId = driverId;
        if (deviceId !== undefined) updatedFields.deviceId = deviceId;
        if (plate !== undefined) updatedFields.plate = plate;
        if (make !== undefined) updatedFields.make = make;
        if (color !== undefined) updatedFields.color = color;
        if (model !== undefined) updatedFields.model = model;
        if (type !== undefined) updatedFields.type = type;
        if (year !== undefined) updatedFields.year = year;
    

        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ error: "No valid fields to update" });
        }


        // Update the vehicle
        const updates = await vehicle.update(updatedFields);

        return res.status(200).json(updates);
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