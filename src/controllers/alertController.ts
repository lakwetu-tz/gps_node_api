import Alerts from "../models/alertModel";
import { Request, Response } from "express";

export const getAllAlerts = async (req: Request, res: Response) => {
    try {
        const drivers = await Alerts.findAll();
        return res.status(200).json({ drivers });
    } catch (error) {
        console.error("Error fetching drivers:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};