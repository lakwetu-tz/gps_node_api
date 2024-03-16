import { Request, Response } from "express";
export declare const getAllVehicles: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getVehicleById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getVehicleByUserId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createVehicle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateVehicle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteVehicle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=vehicleController.d.ts.map