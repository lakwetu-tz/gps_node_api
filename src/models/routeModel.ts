import { Table, Column, Model, DataType, CreatedAt, UpdatedAt} from "sequelize-typescript";


@Table({
    timestamps: true,
    tableName: "routes",
    modelName: "Routes",
})
class Routes extends Model {
    @Column({
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
        type: DataType.BIGINT,
    })
    declare id: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare description: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare startLatitude: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare startLongitude: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare startLocation: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare currentLatitude: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare currentLongitude: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare currentLocation: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare endLatitude: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare endLongitude: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare endLocation: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare totalDistance: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare leftDistance: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare totalTime: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare leftTime: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare speed: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare driverId: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: true
    })
    declare userId: number;

    @Column({
        type: DataType.BIGINT,
        allowNull: true
    })
    declare trips: number;

    @Column({
        type: DataType.BIGINT,
        allowNull: true
    })
    declare vehicleId: string;


    // default 

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}

export default Routes;

