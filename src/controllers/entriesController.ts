import { Request, Response } from "express";
import Vehicle from "../models/vehicleModel";
import Device from "../models/deviceModel";
import Alerts from "../models/alertModel";
import Routes from "../models/routeModel";

interface EntryData {
    utime: string;
    priority: number;
    lat: number;
    lng: number;
    altitude: number;
    angle: number;
    speed: number;
    satellite: number;
}

export const entriesParams = async (req: Request, res: Response) => {
    const data: { data: EntryData[], imei: string } = req.body;

    try {
        const vehicle = await Vehicle.findOne({ where: { deviceId: data.imei } });

        const latestEntry = data.data.reduce((latest, current) => {
            const latestTime = new Date(latest.utime);
            const currentTime = new Date(current.utime);
            return currentTime > latestTime ? current : latest;
        }, data.data[0]);

        await Vehicle.update({
            latitude: latestEntry.lat,
            longitude: latestEntry.lng,
            angle: latestEntry.angle,
            speed: latestEntry.speed,
            altitude: latestEntry.altitude,
            status: "active"
        }, { where: { deviceId: data.imei } });

        if (vehicle) {
            req.app.get("io").emit("vehicleUpdated", vehicle);
        }

        return res.status(200).json({ message: "Vehicle updated successfully" });
    } catch (error) {
        console.error("Error updating vehicle:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const entriesExtends = async (req: Request, res: Response) => {
    const data: any = req.body;
    try {
        const [vehicle, device ] = await Promise.all([
            Vehicle.findOne({ where: { deviceId: data.imei } }),
            Device.findOne({ where: { imei: data.imei } }),
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
                }, { where: { imei: data.imei } }),

            ]);

            req.app.get("io").emit("vehicleUpdated", vehicle);
            req.app.get("io").emit("deviceUpdated", device);

            console.log('Vehicle and device updated successfully');
            return res.status(200).json({ message: "Vehicle and device updated successfully" });
        }
        

    } catch (error) {
        console.error("Error updating vehicle and device:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
