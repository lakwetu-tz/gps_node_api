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
    tableName: "vehicles",
    modelName: "Vehicles",
})
class Vehicles extends Model {
    @Column({
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
        type: DataType.BIGINT,
    })
    declare id: number;


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
        type: DataType.BIGINT,
        allowNull: true
    })
    declare driverId: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: true
    })
    declare userId: number;

    @Column({
        type: DataType.STRING(200),
        allowNull: true
    })
    declare deviceId: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare model: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare make: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare year: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare type: string;

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

    // others 

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}

export default Vehicles;