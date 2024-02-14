import { Model } from "sequelize-typescript";
declare class Vehicle extends Model {
    id: string;
    vin: string;
    deviceId: string;
    plate: string;
    color: string;
    model: string;
    status: string;
    latitude: string;
    longitude: string;
    altitude: string;
    angle: string;
    speed: string;
    ignition: number;
    movement: number;
    created_at: Date;
    updated_at: Date;
}
export default Vehicle;
//# sourceMappingURL=vehicleModel.d.ts.map