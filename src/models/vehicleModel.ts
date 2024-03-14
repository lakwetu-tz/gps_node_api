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
        allowNull: true
    })
    declare color: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare driverId: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    declare userId: number;

    @Column({
        type: DataType.STRING(200),
        unique: true,
        validate: {
            notEmpty: true,
            len: [13, 13], 
        },
    })
    declare deviceId: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare model: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare make: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        validate: {
            isInt: true, // ensure year is an integer
            min: 1900, // arbitrary minimum year
            max: new Date().getFullYear(), // current year as maximum
        }
    })
    declare year: number;

    @Column({
        type: DataType.STRING,
        allowNull: true
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
    timespamp: any;
}

export default Vehicles;