import { Request, Response } from "express";
import Vehicle from "../models/vehicleModel";
import Device from "../models/deviceModel";

interface EntryData {
    lat: number;
    lng: number;
    angle: number;
    speed: number;
    altitude: number;
    status: string;
}

export const entriesParams = async (req: Request, res: Response) => {
    const data: { data: EntryData[], imei: string } = req.body;
    try {
        for (const entry of data.data) {
            await Vehicle.update({
                latitude: entry.lat,
                longitude: entry.lng,
                angle: entry.angle,
                speed: entry.speed,
                altitude: entry.altitude,
                status: "active"
            }, { where: { deviceId: data.imei } });
        }

        const vehicle = await Vehicle.findOne({ where: { deviceId: data.imei } });
        if (vehicle) {
            req.app.get("io").emit("vehicleUpdated", vehicle);
        }
        
        console.log('Vehicle updated successfully');
        return res.status(200).json({ message: "Vehicle updated successfully" });
    } catch (error) {
        console.error("Error updating vehicle:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const entriesExtends = async (req: Request, res: Response) => {
    const data: any = req.body;
    try {
        const [vehicle, device] = await Promise.all([
            Vehicle.findOne({ where: { deviceId: data.imei } }),
            Device.findOne({ where: { imei: data.imei } })
        ]);

        if (vehicle && device) {
            await Promise.all([
                Vehicle.update({
                    ignition: data.ignition,
                    movement: data.movement
                }, { where: { deviceId: data.imei } }),
                Device.update({
                    axisX: data.axis_x,
                    axisY: data.axis_y,
                    axisZ: data.axis_z,
                    batteryLevel: data.battery_level,
                    digitalInput: data.digital_input,
                    ecoScore: data.eco_score,
                    externalVoltage: data.external_voltage,
                    gsmAreaCode: data.gsm_area_code,
                    gsmCellId: data.gsm_cell_id,
                    gsmSignal: data.gsm_signal,
                    sleepMode: data.sleep_mode,
                    timestamp: data.timestamp,
                    totalOdometer: data.total_odometer,
                    unplug: data.unplug
                }, { where: { imei: data.imei } })
            ]);
            
            req.app.get("io").emit("vehicleUpdated", vehicle);
            req.app.get("io").emit("deviceUpdated", device);

            console.log('Vehicle and device updated successfully');
            return res.status(200).json({ message: "Vehicle and device updated successfully" });
        } else {
            console.error("Vehicle or device not found");
            return res.status(404).json({ error: "Vehicle or device not found" });
        }
    } catch (error) {
        console.error("Error updating vehicle and device:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
