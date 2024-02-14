import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
} from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "vehicle",
    modelName: "Vehicle",
})
class Vehicle extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        unique: true
    })
    declare vin: string;

    @Column({
        type: DataType.STRING,
        unique: true
    })
    declare deviceId: string

    @Column({
        type: DataType.STRING,
        unique: true
    })
    declare plate: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare color: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare model: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare status: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare latitude: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare longitude: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare altitude: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare angle: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare speed: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare ignition: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare movement: number;


    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}

export default Vehicle;