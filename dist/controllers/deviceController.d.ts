/// <reference types="node" />
import express from "express";
declare const getDevice: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const getDeviceIMEI: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const getAllDevices: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const createDevice: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const updateDevice: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const deleteDevice: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export { getAllDevices, getDevice, createDevice, updateDevice, deleteDevice };
//# sourceMappingURL=deviceController.d.ts.map