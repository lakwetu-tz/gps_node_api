import { Model } from "sequelize-typescript";
declare class Device extends Model {
    id: string;
    imei: string;
    simCard: string;
    name: string;
    model: string;
    axisX: number;
    axisY: number;
    axisZ: number;
    batteryLevel: number;
    digitalInput: number;
    ecoScore: number;
    externalVoltage: number;
    gsmAreaCode: number;
    gsmCellId: number;
    gsmSignal: number;
    sleepMode: boolean;
    timestamp: number;
    totalOdometer: number;
    unplug: number;
    created_at: Date;
    updated_at: Date;
}
export default Device;
//# sourceMappingURL=deviceModel.d.ts.map