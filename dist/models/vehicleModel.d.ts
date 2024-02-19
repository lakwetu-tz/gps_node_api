import { Model } from "sequelize-typescript";
declare class Vehicles extends Model {
    id: number;
    plate: string;
    color: string;
    driverId: string;
    userId: number;
    deviceId: string;
    model: string;
    make: string;
    year: number;
    type: string;
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
export default Vehicles;
//# sourceMappingURL=vehicleModel.d.ts.map