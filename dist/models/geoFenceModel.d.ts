import { Model } from "sequelize-typescript";
declare class GeoFence extends Model {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
    radius: number;
    notifyOnEntry: boolean;
    notifyOnExit: boolean;
    routeId: string;
    userId: string;
    created_at: Date;
    updated_at: Date;
}
export default GeoFence;
//# sourceMappingURL=geoFenceModel.d.ts.map