import { Model } from "sequelize-typescript";
declare class OTP extends Model {
    id: number;
    phone: string;
    otp: string;
    created_at: Date;
    updated_at: Date;
    static sendSMS(phoneNumber: string, message: string): Promise<void>;
}
export default OTP;
//# sourceMappingURL=otpModel.d.ts.map