import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from "sequelize-typescript";

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
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    declare phone: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
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

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}

export { Users, UserRole };
