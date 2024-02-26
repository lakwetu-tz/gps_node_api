import { Request, Response } from 'express';
import Routes from '../models/routeModel';


export const createRoute = async (req: Request, res: Response) => {
    try {
        const { name, startLocation, endLocation, distance, duration, description } = req.body;

        if (!name || !startLocation){
            return res.status(401).json({ message: 'Missing fields'})
        }

        const existingRoute = await Routes.findOne({ where: { name } });
        if (existingRoute) {
            return res.status(400).json({ message: 'Route already exists' });
        }

        const route = await Routes.create({
            name,
            startLocation,
            endLocation,
            distance,
            duration,
            description,
        });

        return res.status(201).json({ route });
    } catch (error) {
        console.error('Error creating route:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateRoute = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, startLocation, endLocation, distance, duration, description } = req.body;

        const route = await Routes.findByPk(id);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }


        route.name = name;
        route.startLocation = startLocation;
        route.endLocation = endLocation;
        route.distance = distance;
        route.duration = duration;
        route.description = description;

        await route.save();

        return res.status(200).json({ route });
    } catch (error) {
        console.error('Error updating route:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const getRouteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const route = await Routes.findByPk(id);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }

        return res.status(200).json({ route });
    } catch (error) {
        console.error('Error getting route by ID:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getRoutes = async (req: Request, res: Response) => {
    try {

        const route = await Routes.findAll();
        if (!route) {
            return res.status(404).json({ message: 'No routes created yet' });
        }

        return res.status(200).json({ route });
    } catch (error) {
        console.error('Error getting route by ID:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const deleteRoute = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedCount = await Routes.destroy({ where: { id } });
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Route not found' });
        }

        return res.status(200).json({ message: 'Route deleted successfully' });
    } catch (error) {
        console.error('Error deleting route:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const assignVehicleToRoute = async (req: Request, res: Response) => {
    try {
        const { routeId, vehicleId } = req.body;

        const route = await Routes.findByPk(routeId);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }

        route.vehicleId = vehicleId;
        await route.save();

        return res.status(200).json({ message: 'Vehicle assigned to route successfully' });
    } catch (error) {
        console.error('Error assigning vehicle to route:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const assignDriverToRoute = async (req: Request, res: Response) => {
    try {
        const { routeId, driverId } = req.body;

        // Find the route by ID
        const route = await Routes.findByPk(routeId);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }

        // Assign the driver to the route
        route.driverId = driverId;
        await route.save();

        return res.status(200).json({ message: 'Driver assigned to route successfully' });
    } catch (error) {
        console.error('Error assigning driver to route:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


