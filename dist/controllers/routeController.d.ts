import { Request, Response } from 'express';
export declare const createRoute: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateRoute: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getRouteById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getRoutes: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteRoute: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const assignVehicleToRoute: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const assignDriverToRoute: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=routeController.d.ts.map