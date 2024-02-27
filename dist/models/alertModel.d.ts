import { Model } from "sequelize-typescript";
declare class Alerts extends Model {
    id: number;
    type: string;
    status: string;
    deviceId: string;
    created_at: Date;
    updated_at: Date;
}
export default Alerts;
//# sourceMappingURL=alertModel.d.ts.map