import { Request, Response } from "express";
import Vehicle from "../models/vehicleModel"; // Assuming you have imported the Vehicle model
import { Users } from "../models/userModel";
import Devices from "../models/deviceModel";
import Drivers from "../models/driverModel";
import bcrypt from "bcrypt";

class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

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

// Get all vehicle based on the userId
export const getVehicleByUserId = async(req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await Users.findByPk(id)
        if (!user){
            return res.status(404).json({ error: "User not found"})
        }

        const vehicle = await Vehicle.findAll({ where: { userId: id}})
        if (!vehicle){
            return res.status(403).json({ error: "No vehicle found"})
        }

        return res.status(200).json(vehicle)
    }catch(error){
        console.error("Error fetching vehicle by ID:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Create a new vehicle
export const createVehicle = async (req: Request, res: Response) => {
    const { make, plate, deviceId, password, userId } = req.body;
    
    try {
        // Validate VIN and model
        if (!password || !make || !deviceId || !plate ) {
            return res.status(400).json({ error: "missing value required" });
        }

        const user = await Users.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: "user number not found" });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(402).json({ error: "Invalid password" });
        }

        const existingPlate = await Vehicle.findOne({ where: { plate } });
        if (existingPlate) {
            return res.status(403).json({ error: "number plate already exists" });
        }

        const existingDevice = await Devices.findOne({ where: { imei: deviceId } });
        if (!existingDevice) {
            return res.status(404).json({ error: "Device not registerd" });
        }

        // Create the new vehicle
        const newVehicle = await Vehicle.create({ userId, make, plate, color: "white", status: "registered", deviceId });
        return res.status(201).json(newVehicle);
    } catch (error: unknown) {
   
        const errorMessage = error instanceof Error ? error.message.split('\n')[0] : 'Internal server error';
        console.error("Error message:", errorMessage);
        return res.json({ error: errorMessage })
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
            const device = await Devices.findOne({ where: { imei: deviceId }});
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