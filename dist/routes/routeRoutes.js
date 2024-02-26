"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routeController_1 = require("../controllers/routeController");
const router = express_1.default.Router();
router.post('/create', routeController_1.createRoute);
router.get('/all', routeController_1.getRoutes);
router.put('/update/:id', routeController_1.updateRoute);
router.get('/get/:id', routeController_1.getRouteById);
router.delete('/delete/:id', routeController_1.deleteRoute);
router.post('/assign/vehicle', routeController_1.assignVehicleToRoute);
router.post('/assign/driver', routeController_1.assignDriverToRoute);
exports.default = router;
