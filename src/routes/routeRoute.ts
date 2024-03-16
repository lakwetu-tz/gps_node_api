import express from 'express';
import {
    createRoute,
    updateRoute,
    getRouteById,
    deleteRoute,
    assignVehicleToRoute,
    assignDriverToRoute,
    getRoutes,
} from '../controllers/routeController'

const router = express.Router();

router.post('/create', createRoute);

router.get('/all', getRoutes);

router.put('/update/:id', updateRoute);

router.get('/get/:id', getRouteById);

router.delete('/delete/:id', deleteRoute);

router.post('/assign/vehicle', assignVehicleToRoute);

router.post('/assign/driver', assignDriverToRoute);

export default router;
