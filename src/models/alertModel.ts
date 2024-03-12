import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt
} from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "alert",
    modelName: "Alert",
})
class Alerts extends Model {
    @Column({
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
        type: DataType.BIGINT,
    })
    declare id: number

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare status: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare message: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare time: string;


    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare vehicleId: string;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}

export default Alerts;