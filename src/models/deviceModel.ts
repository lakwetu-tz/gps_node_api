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
    tableName: "device",
    modelName: "Device",
})
class Device extends Model {
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
    declare imei: string;

    @Column({
        type: DataType.STRING,
        unique: true
    })
    declare simCard: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare model: string;

    @Column({
        type: DataType.INTEGER, 
        allowNull: true
    })
    declare axisX: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare axisY: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare axisZ: number;

    @Column({
        type: DataType.INTEGER, 
        allowNull: true
    })
    declare batteryLevel: number;

    @Column({
        type: DataType.INTEGER, 
        allowNull: true
    })
    declare digitalInput: number;

    @Column({
        type: DataType.INTEGER, 
        allowNull: true
    })
    declare ecoScore: number;

    @Column({
        type: DataType.INTEGER, 
        allowNull: true
    })
    declare externalVoltage: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare gsmAreaCode: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare gsmCellId: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare gsmSignal: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare sleepMode: boolean;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare timestamp: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare totalOdometer: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare unplug: number;


    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}

export default Device;