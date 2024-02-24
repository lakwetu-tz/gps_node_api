import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from "sequelize-typescript";
import Vehicles from "./vehicleModel";
import Drivers from "./driverModel";

enum UserRole {
    USER = "user",
    SUPERUSER = "superuser",
    ADMIN = "admin",
    SUSPENDED = "SUSPENDED"
}

@Table({
    timestamps: true,
    tableName: "users",
    modelName: "Users"
})

class Users extends Model {
    @Column({
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
        type: DataType.BIGINT,
    })
    declare id: number

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare phone: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password: string;

    @Column({
        type: DataType.ENUM(...Object.values(UserRole)),
        allowNull: false
    })
    declare role: UserRole;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare refreshToken: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare image: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false 
    })
    declare deleted: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false 
    })
    declare sendNewletter: boolean;

    // other

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}

export { Users, UserRole };
