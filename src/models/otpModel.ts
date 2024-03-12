import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    BeforeCreate
} from "sequelize-typescript";


@Table({
    timestamps: true,
    tableName: "otp",
    modelName: "OTP",
})
class OTP extends Model {
    @Column({
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
        type: DataType.BIGINT,
    })
    declare id: number

    @Column({
        type: DataType.STRING,
        unique: true
    })
    declare phone: string;
    
    @Column({
        type: DataType.STRING,
        unique: true
    })
    declare otp: string;


    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;

    @BeforeCreate
    static async sendSMS(phoneNumber: string, message: string): Promise<void> {
        try {
            // Replace `sendSMS` with your actual SMS sending function
            const smsResponse = await OTP.sendSMS(phoneNumber, message);
            console.log("SMS sent successfully: ", smsResponse);
        } catch (error) {
            console.error("Error occurred while sending SMS: ", error);
            throw error;
        }
    }
}

export default OTP;