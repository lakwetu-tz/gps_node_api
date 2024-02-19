import Device from "../models/deviceModel"

import express from "express"




const getDevice = async (req: express.Request, res: express.Response) => {
    const { id } = req.body;
    try {
        const device = await Device.findByPk(id);
        if (!device) {
            return res.status(404).json({ error: 'Device not found' });
        }
        return res.json(device);
    } catch (error) {
        console.error('Error fetching device by ID:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


const getAllDevices = async (req: express.Request, res: express.Response) => {
    try {
        const devices = await Device.findAll();
        return res.json(devices);
    } catch (error) {
        console.error('Error fetching devices:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


const createDevice = async (req: express.Request, res: express.Response) => {
    const { imei, model, simCard, name } = req.body;
        try {

            if (!imei || !simCard || !name || !model) {
                return res.status(400).json({ error: "missing value required" });
            }

            const existingImei = await Device.findOne({ where: { imei } });
            if (existingImei) {
                return res.status(400).json({ error: "imei already exists" });
            }

            const existingSimcard = await Device.findOne({ where: { simCard } });
            if (existingSimcard) {
                return res.status(400).json({ error: "simcard already exists" });
            }

            const device = await Device.create({ imei, model, name, simCard, status: "registered", mobileData: true})
            return res.status(201).json(device);
        } catch (error) {
            console.error('Error creating device:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
}



const updateDevice = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
        const { imei, model, mode } = req.body;
        try {
            const device = await Device.findByPk(id);
            if (!device) {
                return res.status(404).json({ error: 'Device not found' });
            }
            await device.update({ imei, model, mode });
            return res.json(device);
        } catch (error) {
            console.error('Error updating device:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
}


const deleteDevice = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    try {
        const device = await Device.findByPk(id);
        if (!device) {
            return res.status(404).json({ error: 'Device not found' });
        }
        await device.destroy();
        return res.status(204).send(); // No content response
    } catch (error) {
        console.error('Error deleting device:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export {getAllDevices, getDevice, createDevice, updateDevice, deleteDevice}