import { Model } from "sequelize-typescript";
declare enum UserRole {
    USER = "user",
    SUPERUSER = "superuser",
    ADMIN = "admin",
    SUSPENDED = "SUSPENDED"
}
declare class Users extends Model {
    id: string;
    phone: string;
    username: string;
    password: string;
    role: UserRole;
    refreshToken: string;
    created_at: Date;
    updated_at: Date;
}
export { Users, UserRole };
//# sourceMappingURL=userModel.d.ts.map