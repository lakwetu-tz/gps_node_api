"use strict";
const gpsData = {
    imei: '350612079267488',
    data: [
        {
            utime: '2024-02-15 13:04:17',
            priority: 0,
            lat: -6.7866733,
            lng: 39.2742633,
            altitude: 0,
            angle: 0,
            speed: 0,
            satellite: 0
        },
        {
            utime: '2024-02-15 13:05:00',
            priority: 0,
            lat: -6.7863666,
            lng: 39.2740183,
            altitude: 21,
            angle: 130,
            speed: 6,
            satellite: 4
        },
        {
            utime: '2024-02-15 13:05:21',
            priority: 0,
            lat: -6.7863233,
            lng: 39.2739733,
            altitude: 0,
            angle: 0,
            speed: 0,
            satellite: 3
        },
        {
            utime: '2024-02-15 13:17:39',
            priority: 0,
            lat: -6.7863233,
            lng: 39.2739733,
            altitude: 0,
            angle: 0,
            speed: 0,
            satellite: 0
        },
        {
            utime: '2024-02-15 13:17:40',
            priority: 0,
            lat: -6.7863233,
            lng: 39.2739733,
            altitude: 0,
            angle: 0,
            speed: 0,
            satellite: 0
        },
        {
            utime: '2024-02-15 13:18:01',
            priority: 0,
            lat: -6.786355,
            lng: 39.2742549,
            altitude: 49,
            angle: 258,
            speed: 7,
            satellite: 5
        },
        {
            utime: '2024-02-15 13:18:03',
            priority: 0,
            lat: -6.7865466,
            lng: 39.2741533,
            altitude: 39,
            angle: 232,
            speed: 6,
            satellite: 5
        },
        {
            utime: '2024-02-15 13:18:04',
            priority: 0,
            lat: -6.7865516,
            lng: 39.27414,
            altitude: 38,
            angle: 256,
            speed: 6,
            satellite: 5
        },
        {
            utime: '2024-02-15 13:18:54',
            priority: 0,
            lat: -6.7864783,
            lng: 39.2740783,
            altitude: 29,
            angle: 256,
            speed: 0,
            satellite: 6
        },
        {
            utime: '2024-02-15 13:23:04',
            priority: 0,
            lat: -6.7865516,
            lng: 39.274175,
            altitude: 29,
            angle: 217,
            speed: 0,
            satellite: 4
        },
        {
            utime: '2024-02-15 13:24:10',
            priority: 0,
            lat: -6.7865516,
            lng: 39.274175,
            altitude: 0,
            angle: 0,
            speed: 0,
            satellite: 3
        },
        {
            utime: '2024-02-15 13:24:58',
            priority: 0,
            lat: -6.7865516,
            lng: 39.274175,
            altitude: 0,
            angle: 0,
            speed: 0,
            satellite: 0
        },
        {
            utime: '2024-02-15 13:25:23',
            priority: 0,
            lat: -6.7866566,
            lng: 39.2741783,
            altitude: 32,
            angle: 173,
            speed: 9,
            satellite: 5
        },
        {
            utime: '2024-02-15 13:25:25',
            priority: 0,
            lat: -6.786675,
            lng: 39.2741733,
            altitude: 36,
            angle: 127,
            speed: 10,
            satellite: 6
        },
        {
            utime: '2024-02-15 13:25:27',
            priority: 0,
            lat: -6.7866116,
            lng: 39.27412,
            altitude: 56,
            angle: 315,
            speed: 8,
            satellite: 7
        },
        {
            utime: '2024-02-15 13:25:52',
            priority: 0,
            lat: -6.7866583,
            lng: 39.27411,
            altitude: 79,
            angle: 247,
            speed: 8,
            satellite: 6
        },
        {
            utime: '2024-02-15 13:26:18',
            priority: 0,
            lat: -6.7866333,
            lng: 39.2740133,
            altitude: 70,
            angle: 239,
            speed: 0,
            satellite: 6
        },
        {
            utime: '2024-02-15 13:29:42',
            priority: 0,
            lat: -6.7866333,
            lng: 39.2740133,
            altitude: 0,
            angle: 0,
            speed: 0,
            satellite: 3
        },
        {
            utime: '2024-02-15 13:30:59',
            priority: 0,
            lat: -6.7867883,
            lng: 39.2738749,
            altitude: 48,
            angle: 81,
            speed: 0,
            satellite: 4
        }
    ]
};
// Function to find the object with the latest utime
const latestEntry = gpsData.data.reduce((latest, current) => {
    // Convert utime strings to Date objects for comparison
    const latestTime = new Date(latest.utime);
    const currentTime = new Date(current.utime);
    // Return the object with the latest utime
    return currentTime > latestTime ? current : latest;
}, gpsData.data[0]); // Initialize with the first entry
console.log("Object with the latest utime:", latestEntry);
