import Vehicle from "../models/vehicleModel";
import Basics from "../models/basicModel";
import Device from "../models/deviceModel";


export const BasicListenerUpdateVehicle = () => {
    Basics.afterUpdate(async(basics) => {
        try{
            const vehicle = await Vehicle.findOne({ where: { deviceId: basics.imei}})

        if (vehicle){
            console.log("found")
            await vehicle.update({
                latitude: basics.lat,
                longitude: basics.lng,
                altitude: basics.altitude
            })

            console.log("Vehicle updated successfully")
        }else{
            console.log("Vehicle not found for IMEI:", basics.imei)
        }
        }catch(err){
            console.log("ERROR: ", err)
        }
        

    })
}


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

