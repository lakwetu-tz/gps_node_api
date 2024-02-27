import { Request, Response } from "express";
import Driver from "../models/driverModel"; 

export const getAllDrivers = async (req: Request, res: Response) => {
    try {
        const drivers = await Driver.findAll();
        return res.status(200).json({ drivers });
    } catch (error) {
        console.error("Error fetching drivers:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getDriverById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const driver = await Driver.findByPk(id);
        if (!driver) {
            return res.status(404).json({ error: "Driver not found" });
        }
        return res.status(200).json({ driver });
    } catch (error) {
        console.error("Error fetching driver by ID:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Create a new driver
export const createDriver = async (req: Request, res: Response) => {
    const { firstName, lastName, licenseNumber, phoneNumber, userId } = req.body;
    try {
        if (!firstName || !lastName || !licenseNumber || !phoneNumber) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const driver = await Driver.create({ firstName, lastName, licenseNumber, phoneNumber, userId });
        return res.status(201).json({ driver });
    } catch (error) {
        console.error("Error creating driver:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const updateDriver = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName, licenseNumber, phoneNumber, vehicleId, userId } = req.body;
    try {
        const driver = await Driver.findByPk(id);
        if (!driver) {
            return res.status(404).json({ error: "Driver not found" });
        }
        await driver.update({ firstName, lastName, licenseNumber, phoneNumber, vehicleId, userId });
        return res.status(200).json({ driver });
    } catch (error) {
        console.error("Error updating driver:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteDriver = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const driver = await Driver.findByPk(id);
        if (!driver) {
            return res.status(404).json({ error: "Driver not found" });
        }

        await driver.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error("Error deleting driver:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};