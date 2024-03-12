import { Model } from "sequelize-typescript";
declare class GeoFence extends Model {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
    location: string;
    raduis: number;
    notifyOnEntry: boolean;
    notifyOnExit: boolean;
    tags: string;
    routeId: string;
    vehicleId: string;
    type: string;
    created_at: Date;
    updated_at: Date;
}
export default GeoFence;
//# sourceMappingURL=geoFenceModel.d.ts.map