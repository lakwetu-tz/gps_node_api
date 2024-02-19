import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, HasMany, ForeignKey, BelongsTo} from "sequelize-typescript";
import Vehicles from "./vehicleModel";
import { Users } from "./userModel";

@Table({
    timestamps: true,
    tableName: "drivers",
    modelName: "Drivers",
})
class Drivers extends Model {
    @Column({
        primaryKey: true,
        type: DataType.BIGINT,
        allowNull: false
    })
    declare id: number;

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
        type: DataType.INTEGER,
        allowNull: false
    })
    declare vehicleId: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare userId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare phoneNumber: string;


    // default 

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}

export default Drivers;