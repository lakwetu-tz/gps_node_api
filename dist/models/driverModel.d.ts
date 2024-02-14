import { Model } from "sequelize-typescript";
declare class Driver extends Model {
    id: string;
    firstName: string;
    lastName: string;
    licenseNumber: string;
    phoneNumber: string;
    created_at: Date;
    updated_at: Date;
}
export default Driver;
//# sourceMappingURL=driverModel.d.ts.map