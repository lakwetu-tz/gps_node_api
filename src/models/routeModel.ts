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
    declare startLocation: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare endLocation: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare distance: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare duration: number;

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

