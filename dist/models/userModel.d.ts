import { Model } from "sequelize-typescript";
declare enum UserRole {
    USER = "user",
    SUPERUSER = "superuser",
    ADMIN = "admin",
    SUSPENDED = "SUSPENDED"
}
declare class Users extends Model {
    id: number;
    phone: string;
    username: string;
    password: string;
    role: UserRole;
    refreshToken: string;
    email: string;
    image: string;
    deleted: boolean;
    sendNewletter: boolean;
    created_at: Date;
    updated_at: Date;
}
export { Users, UserRole };
//# sourceMappingURL=userModel.d.ts.map