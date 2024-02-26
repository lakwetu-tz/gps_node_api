import { Model } from "sequelize-typescript";
declare class Routes extends Model {
    id: number;
    name: string;
    description: string;
    startLocation: string;
    endLocation: string;
    distance: number;
    duration: number;
    driverId: string;
    userId: number;
    trips: number;
    vehicleId: string;
    created_at: Date;
    updated_at: Date;
}
export default Routes;
//# sourceMappingURL=routeModel.d.ts.map