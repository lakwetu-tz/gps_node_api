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
    tableName: "geofence",
    modelName: "GeoFence",
})
class GeoFence extends Model {
    @Column({
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
        type: DataType.BIGINT,
    })
    declare id: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare latitude: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare longitude: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare radius: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    declare notifyOnEntry: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    declare notifyOnExit: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare routeId: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare userId: string;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;

   
}

export default GeoFence;