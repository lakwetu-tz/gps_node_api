import { Model } from "sequelize-typescript";
declare class Devices extends Model {
    id: number;
    imei: string;
    simCard: string;
    name: string;
    model: string;
    status: string;
    mobileData: boolean;
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
export default Devices;
//# sourceMappingURL=deviceModel.d.ts.map