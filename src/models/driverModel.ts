import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, HasMany} from "sequelize-typescript";
import Vehicle from "./vehicleModel";

@Table({
    timestamps: true,
    tableName: "driver",
    modelName: "Driver",
})
class Driver extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
    })
    declare firstName: string;

    @Column({
        type: DataType.STRING,
    })
    declare lastName: string;

    @Column({
        type: DataType.STRING,
    })
    declare licenseNumber: string;

    @Column({
        type: DataType.STRING,
    })
    declare phoneNumber: string;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}

export default Driver;