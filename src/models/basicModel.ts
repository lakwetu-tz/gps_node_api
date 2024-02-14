import { Table, Column, Model, DataType, AfterCreate, AfterUpdate } from "sequelize-typescript";

@Table({
    tableName: "basics",
    modelName: "Basics",
    timestamps: false,
})
class Basics extends Model {
    @Column({
        type: DataType.STRING
    })
    declare imei: string;

    @Column({
        type: DataType.STRING,
    })
    declare timestamp: string;

    @Column({
        type: DataType.STRING,
    })
    declare priority: string;

    @Column({
        type: DataType.STRING
    })
    declare lat: number;

    @Column({
        type: DataType.STRING
    })
    declare lng: string;

    @Column({
        type: DataType.STRING,
    })
    declare altitude: string;

    @Column({
        type: DataType.STRING
    })
    declare angle: string;

    @Column({
        type: DataType.STRING
    })
    declare speed: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare satellite: string;

    @Column({
        type: DataType.STRING,
    })
    declare country: string;

    // @AfterCreate
    // static afterCreate(instance: Basics) {
    //     console.log(`A new record with ID ${instance.id} was created.`);
    // }

    // @AfterUpdate
    // static afterUpdate(instance: Basics) {
    //     console.log(`Record with ID ${instance.id} has been updated.`);
    // }
}
export default Basics