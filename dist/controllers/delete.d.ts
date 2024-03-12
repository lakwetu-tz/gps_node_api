interface EntryData {
    utime: string;
    priority: number;
    lat: number;
    lng: number;
    altitude: number;
    angle: number;
    speed: number;
    satellite: number;
}
interface GPSData {
    imei: string;
    data: EntryData[];
}
declare const gpsData: GPSData;
declare const latestEntry: EntryData;
//# sourceMappingURL=delete.d.ts.map