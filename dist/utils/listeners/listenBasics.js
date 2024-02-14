"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicListenerUpdateVehicle = void 0;
const vehicleModel_1 = require("../../models/vehicleModel");
const basicModel_1 = require("../../models/basicModel");
const BasicListenerUpdateVehicle = () => {
    basicModel_1.default.afterUpdate((basics) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const vehicle = yield vehicleModel_1.default.findOne({ where: { deviceId: basics.imei } });
            if (vehicle) {
                console.log("found");
                yield vehicle.update({
                    latitude: basics.lat,
                    longitude: basics.lng,
                    altitude: basics.altitude
                });
                console.log("Vehicle updated successfully");
            }
            else {
                console.log("Vehicle not found for IMEI:", basics.imei);
            }
        }
        catch (err) {
            console.log("ERROR: ", err);
        }
    }));
};
exports.BasicListenerUpdateVehicle = BasicListenerUpdateVehicle;
// export const BasicListenerUpdateDevice = async () => {
//     Basics.afterUpdate(async (basics) => {
//         const device = await Device.findOne({ where: { imei: basics.imei }})
//         if (device){
//             await device.update({
//                 axis
//             }) 
//         }
//     })
//     // listern to the basic database whenever new request is received
//     // create and instance of the table 
//     // check if the request imei is the same as the imei c Device
//     const device = await Device.findOne({ where: { imei }})
//     if (device){
//         // update columns
//         console.log("device updated successfully")
//     } else{
//         // create device
//         console.log("device create successfully")
//     }
//     // if imei is the same update the its column based on the column of the basic
// }
