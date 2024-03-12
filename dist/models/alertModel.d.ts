import { Model } from "sequelize-typescript";
declare class Alerts extends Model {
    id: number;
    status: string;
    message: string;
    time: string;
    vehicleId: string;
    created_at: Date;
    updated_at: Date;
}
export default Alerts;
//# sourceMappingURL=alertModel.d.ts.map