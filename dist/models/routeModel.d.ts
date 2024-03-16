import { Model } from "sequelize-typescript";
declare class Routes extends Model {
    id: number;
    name: string;
    description: string;
    startLatitude: string;
    startLongitude: string;
    startLocation: string;
    currentLatitude: string;
    currentLongitude: string;
    currentLocation: string;
    endLatitude: string;
    endLongitude: string;
    endLocation: string;
    totalDistance: string;
    leftDistance: string;
    totalTime: string;
    leftTime: string;
    speed: string;
    driverId: string;
    userId: number;
    trips: number;
    vehicleId: string;
    created_at: Date;
    updated_at: Date;
}
export default Routes;
//# sourceMappingURL=routeModel.d.ts.map