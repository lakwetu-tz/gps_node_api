import { Request, Response } from "express";

import Vehicle from "../models/vehicleModel";
import Device from "../models/deviceModel";


export const entriesParams = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        for (const entry of data.data) {
                const updatedVehicle = Vehicle.update({
                    latitude: entry.lat,
                    longitude: entry.lng,
                    angle: entry.angle,
                    speed: entry.speed,
                    altitude: entry.altitude,
                    status: "active" // Assuming you want to set the status to "active"
                }, { where: { deviceId: data.imei}});

                await Promise.all([ updatedVehicle ])

                if (data.movement === 1) {
                    req.app.get("io").emit("notification", { type: "movement", deviceId: data.imei });
                }

                if (data.movement === 1) {
                    req.app.get("io").emit("notification", { type: "ignition", deviceId: data.imei });
                }
            }
            const vehicle = await Vehicle.findOne({ where: { deviceId: data.imei } })
            
        // use socket to send the updated vehicle

        if (vehicle) {
            req.app.get("io").emit("vehicleUpdated", vehicle);
        }

    } catch (error) {
        return console.error("Error fetching users:", error);
    }
}

export const entriesExtends = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        // check imei of the data send 
        const vehicle = await Vehicle.findOne({ where: { deviceId: data.imei } })
        const device = await Device.findOne({ where: { imei: data.imei } })

        
            const vehicleUpdate = Vehicle.update({
                ignition: data.ignition,
                movement: data.movement,
            }, {where: {deviceId: data.imei}});


            const deviceUpdate = Device.update({
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
            }, { where: { imei: data.imei}})

            await Promise.all([ vehicleUpdate, deviceUpdate])

            req.app.get("io").emit("vehicleUpdated", vehicle);
            req.app.get("io").emit("deviceUpdated", device);

            console.log('Vehicle and device updated successfully');

    //     // Respond with a success message
        return console.log("updated complete");
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
} 