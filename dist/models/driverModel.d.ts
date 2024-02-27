import { Model } from "sequelize-typescript";
declare class Drivers extends Model {
    id: number;
    firstName: string;
    lastName: string;
    licenseNumber: string;
    vehicleId: string;
    userId: number;
    phoneNumber: string;
    created_at: Date;
    updated_at: Date;
}
export default Drivers;
//# sourceMappingURL=driverModel.d.ts.map