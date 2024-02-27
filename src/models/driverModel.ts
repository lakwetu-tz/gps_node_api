import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "drivers",
    modelName: "Drivers",
})
class Drivers extends Model {
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
    declare firstName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare lastName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare licenseNumber: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare vehicleId: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    declare userId: number;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare phoneNumber: string;


    // default 

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}

export default Drivers;